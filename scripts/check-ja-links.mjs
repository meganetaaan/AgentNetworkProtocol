// Check local targets without modifying translated documents or original files.
import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const base = '0837cfdfaf4ddcf834f0890ddaf34fc4c824e066';
const slash = value => value.replaceAll('\\', '/');
const normalRef = value => value.trim().replace(/\s+/g, ' ').toLowerCase();

function maskedMarkup(input) {
  // Keep offsets and line numbers stable while hiding examples and code spans.
  const blank = text => text.replace(/[^\r\n]/g, ' ');
  let fence = null;
  const lines = input.split(/(?<=\n)/);
  let text = lines.map(line => {
    const marker = /^\s{0,3}(`{3,}|~{3,})/.exec(line);
    if (fence) {
      if (marker && marker[1][0] === fence.character && marker[1].length >= fence.length && /^\s*$/.test(line.slice(marker[0].length))) fence = null;
      return blank(line);
    }
    if (marker) {
      fence = { character: marker[1][0], length: marker[1].length };
      return blank(line);
    }
    return line;
  }).join('');
  text = text.replace(/<!--[\s\S]*?-->/g, blank);
  text = text.replace(/(`+)([^`]|`(?!\1))*?\1/g, blank);
  return text;
}

function unescapeDestination(value) {
  return value.replace(/\\([!"#$%&'()*+,\-./:;<=>?@[\]\\^_`{|}~ ])/g, '$1')
    .replace(/&amp;/gi, '&').replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

function destinationParts(raw) {
  const text = raw.trim();
  const leading = raw.length - raw.trimStart().length;
  if (text.startsWith('<')) {
    const end = text.indexOf('>');
    if (end >= 0) return { value: unescapeDestination(text.slice(1, end)), start: leading + 1, end: leading + end };
  }
  // Existing historical documents sometimes have unescaped spaces in a path.
  // Preserve those paths, while removing a standard optional link title.
  const value = text.replace(/\s+(?:"[\s\S]*"|'[\s\S]*'|\([^\n]*\))\s*$/, '').trim();
  return { value: unescapeDestination(value), start: leading, end: leading + value.length };
}

export function extractLinks(input, { includeRanges = false } = {}) {
  const text = maskedMarkup(input);
  const links = [], references = new Map();
  const lineAt = offset => 1 + (text.slice(0, offset).match(/\n/g) || []).length;
  const add = (href, offset, kind, extra = {}) => links.push({ destination: href, line: lineAt(offset), kind, ...extra });
  const addRaw = (raw, rawOffset, offset, kind, extra = {}) => {
    const parsed = destinationParts(raw);
    add(parsed.value, offset, kind, { ...extra, ...(includeRanges ? { destinationStart: rawOffset + parsed.start, destinationEnd: rawOffset + parsed.end } : {}) });
  };

  for (const match of text.matchAll(/^ {0,3}\[([^\]\n]+)\]:[ \t]*(.*)$/gm)) {
    const id = normalRef(match[1]);
    if (match[1].startsWith('^')) continue;
    references.set(id, destinationParts(match[2]).value);
    addRaw(match[2], match.index + match[0].length - match[2].length, match.index, 'reference-definition', { reference: id });
  }

  for (let start = 0; start < text.length; start++) {
    if (text[start] !== '[' || (start && text[start - 1] === '\\')) continue;
    let end = start + 1, level = 1;
    for (; end < text.length; end++) {
      if (text[end] === '\\') { end++; continue; }
      if (text[end] === '[') level++;
      else if (text[end] === ']') { level--; if (level === 0) break; }
    }
    if (end >= text.length) continue;
    const image = start > 0 && text[start - 1] === '!';
    const label = text.slice(start + 1, end);
    if (text[end + 1] === '(') {
      let close = end + 2, parentheses = 1, inAngle = false, quote = null;
      for (; close < text.length; close++) {
        const char = text[close];
        if (char === '\\') { close++; continue; }
        if (quote) { if (char === quote) quote = null; continue; }
        if (!inAngle && parentheses === 1 && (char === '"' || char === "'") && /\s/.test(text[close - 1])) { quote = char; continue; }
        if (char === '<') inAngle = true;
        if (char === '>') inAngle = false;
        if (!inAngle && char === '(') parentheses++;
        else if (!inAngle && char === ')') { parentheses--; if (parentheses === 0) break; }
      }
      if (close < text.length) {
        addRaw(text.slice(end + 2, close), end + 2, start, image ? 'image' : 'markdown');
        start = close;
      }
    } else if (text[end + 1] === '[') {
      const referenceEnd = text.indexOf(']', end + 2);
      if (referenceEnd < 0) continue;
      const id = normalRef(text.slice(end + 2, referenceEnd) || label);
      if (!references.has(id)) add('', start, 'undefined-reference', { reference: id });
      start = referenceEnd;
    } else if (references.has(normalRef(label))) {
      // The corresponding reference definition already supplies its target.
      start = end;
    }
  }

  for (const tag of text.matchAll(/<[A-Za-z][^>]*>/g)) {
    for (const attribute of tag[0].matchAll(/\b(src|href)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)) {
      const raw = attribute[2] ?? attribute[3] ?? attribute[4];
      const quoted = attribute[2] !== undefined || attribute[3] !== undefined;
      const valueOffset = tag.index + attribute.index + attribute[0].length - raw.length - (quoted ? 1 : 0);
      add(unescapeDestination(raw), tag.index + attribute.index, `html-${attribute[1].toLowerCase()}`, includeRanges ? { destinationStart: valueOffset, destinationEnd: valueOffset + raw.length } : {});
    }
  }
  return links;
}

export function resolveLocal(document, href) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) return null;
  const hashAt = href.indexOf('#');
  const fragment = hashAt < 0 ? '' : href.slice(hashAt + 1);
  const withoutFragment = hashAt < 0 ? href : href.slice(0, hashAt);
  let pathname = withoutFragment.split('?')[0];
  try { pathname = decodeURIComponent(pathname); } catch { /* Keep malformed input visible in the report. */ }
  const target = pathname ? path.posix.normalize(pathname.startsWith('/') ? pathname.slice(1) : path.posix.join(path.posix.dirname(document), slash(pathname))) : document;
  return { target: target.replace(/^\.\//, ''), fragment };
}

export function classifyTarget({ target, source, baselineTargets, baselineFiles, currentExists }) {
  if (currentExists) return 'resolved';
  const originalTarget = target.startsWith('japanese/') ? target.slice('japanese/'.length) : target;
  const originalDirectory = [...baselineFiles].some(file => file.startsWith(originalTarget.replace(/\/$/, '') + '/'));
  if (target.startsWith('japanese/') && ((baselineFiles.has(originalTarget) && /\.md$/i.test(originalTarget)) || originalDirectory)) return 'pending-translation-target';
  if (source && baselineTargets.has(originalTarget) && !baselineFiles.has(originalTarget) && !originalDirectory) return 'upstream-broken';
  return 'newly-broken';
}

export function readBaseline() {
  const git = (args, options = {}) => execFileSync('git', args, { cwd: root, maxBuffer: 40 * 1024 * 1024, ...options });
  const entries = git(['ls-tree', '-r', '-z', base]).toString('utf8').split('\0').filter(Boolean).map(row => {
    const tab = row.indexOf('\t');
    const metadata = row.slice(0, tab).split(' ');
    return { oid: metadata[2], file: row.slice(tab + 1) };
  });
  const markdown = entries.filter(entry => /\.md$/i.test(entry.file));
  const batch = git(['cat-file', '--batch'], { input: markdown.map(entry => entry.oid).join('\n') + '\n' });
  const texts = new Map();
  let offset = 0;
  for (const entry of markdown) {
    const end = batch.indexOf(10, offset);
    const size = Number(batch.subarray(offset, end).toString().split(' ')[2]);
    if (!Number.isSafeInteger(size) || size < 0) throw new Error(`Invalid Git blob size for ${entry.file}`);
    texts.set(entry.file, batch.subarray(end + 1, end + 1 + size).toString('utf8'));
    offset = end + 1 + size + 1;
  }
  return { files: new Set(entries.map(entry => entry.file)), texts };
}

async function markdownFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => entry.isDirectory() ? markdownFiles(path.join(directory, entry.name)) : /\.md$/i.test(entry.name) ? [path.join(directory, entry.name)] : []));
  return nested.flat();
}

export async function checkJapaneseLinks() {
  const baseline = readBaseline();
  const baselineLinks = new Map(), baselineIssues = [];
  for (const [source, text] of baseline.texts) {
    const targets = new Set();
    const undefinedReferences = new Set();
    for (const link of extractLinks(text)) {
      if (link.kind === 'undefined-reference') { undefinedReferences.add(link.reference); continue; }
      const local = resolveLocal(source, link.destination);
      if (!local) continue;
      targets.add(local.target);
      if (!baseline.files.has(local.target) && ![...baseline.files].some(file => file.startsWith(local.target.replace(/\/$/, '') + '/'))) baselineIssues.push({ document: source, ...link, target: local.target });
    }
    baselineLinks.set(source, { targets, undefinedReferences });
  }

  const report = {
    base_commit: base,
    generated_at: new Date().toISOString(),
    scope: 'Local file/directory targets in Japanese Markdown, reference definitions, and HTML src/href attributes; fenced examples, inline code and comments excluded.',
    fragment_policy: 'Links to translated headings can change their anchors. Nonempty fragment destinations inside japanese/ are reported separately for review; fragment existence is not guessed.',
    limitations: ['No external URL requests.', 'Fragment IDs and GitHub heading slug generation are not validated.', 'Reference definitions spanning multiple lines and nested Markdown inside raw HTML are best-effort.', 'A report generated during translation is a snapshot; pending targets require a rerun after completion.'],
    baseline_upstream_broken: baselineIssues,
    upstream_broken: [],
    newly_broken: [],
    pending_translation_targets: [],
    translated_fragment_targets: [],
    summary: {},
  };
  const documents = await markdownFiles(path.join(root, 'japanese'));
  let checked = 0, external = 0, resolved = 0;
  const exists = target => {
    const absolute = path.resolve(root, target);
    const relative = path.relative(root, absolute);
    return relative !== '..' && !relative.startsWith('..' + path.sep) && fsSync.existsSync(absolute);
  };
  for (const absolute of documents) {
    const document = slash(path.relative(root, absolute));
    const candidateSource = document.slice('japanese/'.length);
    const source = baseline.texts.has(candidateSource) ? candidateSource : null;
    const original = baselineLinks.get(source);
    const text = await fs.readFile(absolute, 'utf8');
    for (const link of extractLinks(text)) {
      if (link.kind === 'undefined-reference') {
        checked++;
        const record = { document, source, ...link };
        report[original?.undefinedReferences.has(link.reference) ? 'upstream_broken' : 'newly_broken'].push(record);
        continue;
      }
      const local = resolveLocal(document, link.destination);
      if (!local) { external++; continue; }
      checked++;
      const status = classifyTarget({ target: local.target, source, baselineTargets: original?.targets ?? new Set(), baselineFiles: baseline.files, currentExists: exists(local.target) });
      const record = { document, source, ...link, target: local.target, ...(local.fragment ? { fragment: local.fragment } : {}) };
      if (status === 'resolved') resolved++;
      else report[status === 'upstream-broken' ? 'upstream_broken' : status === 'newly-broken' ? 'newly_broken' : 'pending_translation_targets'].push(record);
      if (local.fragment && local.target.startsWith('japanese/') && /\.md$/i.test(local.target)) report.translated_fragment_targets.push({ ...record, target_status: status });
    }
  }
  const missingSources = [...baseline.texts.keys()].filter(source => !exists('japanese/' + source));
  report.summary = {
    baseline_markdown_sources: baseline.texts.size,
    japanese_markdown_documents: documents.length,
    missing_translation_documents: missingSources.length,
    local_links_checked: checked,
    resolved_local_links: resolved,
    external_links_skipped: external,
    baseline_upstream_broken_links: baselineIssues.length,
    translated_upstream_broken_links: report.upstream_broken.length,
    newly_broken_links: report.newly_broken.length,
    pending_translation_target_links: report.pending_translation_targets.length,
    translated_fragment_target_warnings: report.translated_fragment_targets.length,
    snapshot_complete: missingSources.length === 0,
  };
  report.missing_translation_documents = missingSources;
  const target = path.join(root, 'japanese', 'link-report.json');
  await fs.writeFile(target, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report.summary, null, 2));
  // Historical upstream errors and in-progress targets are reported, not introduced failures.
  process.exitCode = report.newly_broken.length ? 1 : 0;
  return report;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await checkJapaneseLinks();
