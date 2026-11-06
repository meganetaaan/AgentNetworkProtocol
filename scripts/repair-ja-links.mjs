// Restore machine-translated link destinations from immutable upstream documents.
// Existing prose, labels, examples, titles, and hand translations are not changed.
import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { extractLinks, resolveLocal, readBaseline } from './check-ja-links.mjs';

const root = path.resolve(import.meta.dirname, '..');
const machinePrefix = '> 日本語参考訳（機械翻訳';
const base = '0837cfdfaf4ddcf834f0890ddaf34fc4c824e066';
const encodeUnsafe = value => value.replace(/[ %?#<>"'()]/g, character => '%' + character.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0'));

export function normalizedDestination(source, link, originalText) {
  if (!link.destination.trim()) return originalText.slice(link.destinationStart, link.destinationEnd);
  const local = resolveLocal(source, link.destination);
  // An external URL must keep its original escapes and entity spelling exactly.
  if (!local) return originalText.slice(link.destinationStart, link.destinationEnd);
  const suffixOffset = link.destination.search(/[?#]/);
  const suffix = suffixOffset < 0 ? '' : link.destination.slice(suffixOffset);
  const hasFragment = link.destination.includes('#');
  const insideRepository = local.target !== '..' && !local.target.startsWith('../');
  const target = !hasFragment && /\.md$/i.test(local.target) && insideRepository ? 'japanese/' + local.target : local.target;
  let href = encodeUnsafe(path.posix.relative(path.posix.dirname('japanese/' + source), target)) + suffix;
  if (link.kind.startsWith('html-')) href = href.replaceAll('&', '&amp;');
  return href;
}

export function repairDocument(source, original, current) {
  if (!current.startsWith(machinePrefix)) return { status: 'hand-translation-skipped', patches: [] };
  const separator = /\r?\n\r?\n/.exec(current);
  if (!separator) return { status: 'ambiguous-header-skipped', patches: [] };
  const bodyOffset = separator.index + separator[0].length;
  const body = current.slice(bodyOffset);
  const links = text => extractLinks(text, { includeRanges: true }).filter(link => link.kind !== 'undefined-reference').sort((a, b) => a.destinationStart - b.destinationStart);
  const before = links(original), after = links(body);
  if (before.length !== after.length) return { status: 'link-count-mismatch-skipped', patches: [], source_link_count: before.length, translation_link_count: after.length };
  if (before.some((link, index) => link.kind !== after[index].kind)) return { status: 'link-kind-mismatch-skipped', patches: [], source_kinds: before.map(link => link.kind), translation_kinds: after.map(link => link.kind) };
  const patches = [];
  for (let index = 0; index < before.length; index++) {
    const expected = normalizedDestination(source, before[index], original);
    const translated = after[index];
    const observed = body.slice(translated.destinationStart, translated.destinationEnd);
    if (observed === expected) continue;
    patches.push({ start: bodyOffset + translated.destinationStart, end: bodyOffset + translated.destinationEnd, before: observed, after: expected, line: 1 + (current.slice(0, bodyOffset + translated.destinationStart).match(/\n/g) || []).length, kind: translated.kind });
  }
  let repaired = current;
  for (const patch of [...patches].reverse()) repaired = repaired.slice(0, patch.start) + patch.after + repaired.slice(patch.end);
  return { status: patches.length ? 'repairable' : 'already-normalized', patches, repaired };
}

async function writeIfUnchanged(target, expected, repaired) {
  const temporary = target + '.link-repair-' + randomUUID() + '.tmp';
  try {
    await fs.writeFile(temporary, repaired, { encoding: 'utf8', flag: 'wx' });
    if (await fs.readFile(target, 'utf8') !== expected) return false;
    // Atomic replacement prevents readers from seeing a partially repaired document.
    // The translation generator creates new paths with wx, leaving these paths alone.
    await fs.rename(temporary, target);
    return true;
  } finally {
    await fs.unlink(temporary).catch(error => { if (error.code !== 'ENOENT') throw error; });
  }
}

export async function repairJapaneseLinks(args = process.argv.slice(2)) {
  const write = args.includes('--write');
  const prefix = args.find(argument => argument.startsWith('--prefix='))?.slice('--prefix='.length) ?? '';
  const limitArgument = args.find(argument => argument.startsWith('--limit='))?.slice('--limit='.length);
  const limit = limitArgument === undefined ? Infinity : Number(limitArgument);
  if (!(limit > 0) || (!Number.isSafeInteger(limit) && limit !== Infinity)) throw new Error('--limit must be a positive integer');
  const baseline = readBaseline();
  const report = {
    base_commit: base,
    generated_at: new Date().toISOString(),
    mode: write ? 'write' : 'dry-run',
    prefix,
    limit: Number.isFinite(limit) ? limit : null,
    guarantees: ['Only files with the machine-translation header are eligible.', 'The generated source header is excluded from repair.', 'Only parsed link URL character spans are changed; labels, prose and examples remain byte-for-byte unchanged.', 'Link count or kind mismatches are skipped without guessing.', 'Original content is rechecked immediately before atomic replacement; a concurrent change is skipped.'],
    documents: [],
  };
  let eligible = 0, repairable = 0, written = 0, linksChanged = 0, missing = 0, skippedManual = 0, ambiguous = 0, concurrent = 0;
  for (const [source, original] of baseline.texts) {
    if (!source.startsWith(prefix)) continue;
    const target = path.join(root, 'japanese', source);
    let current;
    try { current = await fs.readFile(target, 'utf8'); }
    catch (error) { if (error.code === 'ENOENT') { missing++; continue; } throw error; }
    const result = repairDocument(source, original, current);
    if (result.status === 'hand-translation-skipped') { skippedManual++; continue; }
    eligible++;
    if (result.status.endsWith('-skipped')) {
      ambiguous++;
      const { repaired, ...detail } = result;
      report.documents.push({ source, ...detail });
      continue;
    }
    if (result.status === 'already-normalized') continue;
    repairable++;
    linksChanged += result.patches.length;
    const detail = { source, status: write ? 'written' : 'would-repair', patches: result.patches };
    if (write) {
      if (await writeIfUnchanged(target, current, result.repaired)) written++;
      else { detail.status = 'concurrent-update-skipped'; concurrent++; }
    }
    report.documents.push(detail);
    if (repairable >= limit) break;
  }
  report.summary = {
    mode: report.mode,
    eligible_machine_documents_checked: eligible,
    hand_translation_documents_skipped: skippedManual,
    translation_documents_not_yet_generated: missing,
    repairable_documents: repairable,
    link_destination_edits: linksChanged,
    written_documents: written,
    ambiguous_documents_skipped: ambiguous,
    concurrent_updates_skipped: concurrent,
    limited: repairable >= limit,
  };
  await fs.mkdir(path.join(root, 'japanese'), { recursive: true });
  await fs.writeFile(path.join(root, 'japanese', 'link-repair-report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report.summary, null, 2));
  process.exitCode = ambiguous || concurrent ? 1 : 0;
  return report;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await repairJapaneseLinks();
