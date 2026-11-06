// Translate public documentation; never load secrets or translate wire examples.
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const base = '0837cfdfaf4ddcf834f0890ddaf34fc4c824e066';
const cacheRoot = path.resolve(root, '..', 'ja-translation-cache');
await fs.mkdir(cacheRoot, { recursive: true });
const sources = execFileSync('git', ['ls-tree', '-r', '--name-only', '-z', base], { cwd: root }).toString().split('\0').filter(x => /\.md$/i.test(x));
const filter = process.argv.find(x => x.startsWith('--prefix='))?.slice(9);
const targetSources = sources.filter(x => !filter || x.startsWith(filter));
const hash = x => createHash('sha256').update(x).digest('hex');
const localBackend = process.env.JA_TRANSLATION_LOCAL_URL;

function localLink(target, source, destination) {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(target) || !target.trim()) return target;
  const match = /^(.*?)([?#].*)?$/.exec(target);
  const originalPath = match[1] || path.basename(source);
  const absolute = originalPath.startsWith('/') ? path.resolve(root, originalPath.slice(1)) : path.resolve(root, path.dirname(source), originalPath);
  const suffix = match[2] || '';
  // Fragment links stay on the original: translated headings have different anchors.
  const mirror = !suffix && /\.md$/i.test(originalPath) && !path.relative(root, absolute).startsWith('..');
  const resolved = mirror ? path.join(root, 'japanese', path.relative(root, absolute)) : absolute;
  return path.relative(path.dirname(destination), resolved).replaceAll('\\', '/') + suffix;
}

async function request(text) {
  const key = hash(text);
  const cached = path.join(cacheRoot, key + '.json');
  try { return JSON.parse(await fs.readFile(cached, 'utf8')).translation; } catch {}
  if (localBackend) {
    const response = await fetch(localBackend, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text }), signal: AbortSignal.timeout(300000) });
    if (!response.ok) throw new Error('Local translation HTTP ' + response.status);
    const { translation } = await response.json();
    await fs.writeFile(cached, JSON.stringify({ translation, backend: 'argos-local' }), 'utf8');
    return translation;
  }
  throw new Error('Start the optional local backend and set JA_TRANSLATION_LOCAL_URL; external translation fallback is disabled');
}

async function separated(entry) {
  // If a translator moves/drops a placeholder, translate prose segments alone.
  // Restoration then cannot alter any code or structural token.
  const parts = entry.text.split(/(⟦P\d{5}⟧)/g);
  const needed = parts.map((text, index) => ({ text, index })).filter(p => !/^⟦P\d{5}⟧$/.test(p.text) && /[A-Za-z\u3400-\u9fff]/u.test(p.text));
  const input = needed.map((p, i) => `⟦S${String(i).padStart(5, '0')}⟧\n${p.text.trim()}\n`).join('');
  const output = input ? await request(input) : '';
  const markers = [...output.matchAll(/⟦S(\d{5})⟧/g)];
  const valid = markers.length === needed.length && markers.every((m, i) => +m[1] === i);
  for (let i = 0; i < needed.length; i++) {
    const { text, index } = needed[i];
    const translated = valid ? output.slice(markers[i].index + markers[i][0].length, markers[i + 1]?.index ?? output.length).trim() : (await request(text.trim())).trim();
    parts[index] = /^\s*/.exec(text)[0] + translated + /\s*$/.exec(text)[0];
  }
  return parts.join('');
}

async function translateDocument(source) {
  const destination = path.join(root, 'japanese', source);
  const repair = process.argv.includes('--repair-machine');
  try {
    const existing = await fs.readFile(destination, 'utf8');
    if (!repair || !existing.startsWith('> 日本語参考訳（機械翻訳') || existing.includes('<!-- translation-review:')) return 'existing';
  } catch {}
  const original = await fs.readFile(path.join(root, source), 'utf8');
  const lines = original.replace(/\r\n/g, '\n').split('\n');
  let fence = null;
  const items = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = /^\s*(`{3,}|~{3,})/.exec(line);
    if (match) { if (!fence) fence = match[1][0]; else if (fence === match[1][0]) fence = null; continue; }
    if (fence || !/[A-Za-z\u3400-\u9fff]/u.test(line) || /^\s*<!--.*-->\s*$/.test(line)) continue;
    const tokens = [];
    const protect = value => { const token = `⟦P${String(tokens.length).padStart(5, '0')}⟧`; tokens.push(value); return token; };
    let text = line;
    // Protect code, link destinations, HTML tags, reference URLs, and normative keywords.
    text = text.replace(/(`+)([^`]*?)\1/g, protect);
    text = text.replace(/\]\(([^)]*)\)/g, (_, target) => `](${localLink(target, source, destination)})`);
    text = text.replace(/\]\(([^)]*)\)/g, protect);
    text = text.replace(/<[^>]+>/g, protect);
    text = text.replace(/https?:\/\/[^\s<>]+/g, protect);
    text = text.replace(/\b(?:MUST NOT|SHALL NOT|SHOULD NOT|NOT RECOMMENDED|MUST|SHALL|SHOULD|MAY|REQUIRED|RECOMMENDED|OPTIONAL)\b/g, protect);
    // Preserve Markdown structure and indentation as immutable tokens.
    text = text.replace(/^(?:\s*(?:#{1,6}\s+|>\s*|[-+*]\s+|\d+[.)]\s+))+/, protect);
    text = text.replace(/\*{1,3}|_{1,3}|\||\[|\]/g, protect);
    if (!/[A-Za-z\u3400-\u9fff]/u.test(text.replace(/⟦P\d+⟧/g, ''))) continue;
    items.push({ line: i, text, tokens });
  }
  // Keep chunks comfortably below public endpoint URI limits.
  const batches = [];
  let batch = [], size = 0;
  for (const item of items) {
    const nextSize = encodeURIComponent(item.text).length + 40;
    if (size + nextSize > 6500 && batch.length) { batches.push(batch); batch = []; size = 0; }
    batch.push(item); size += nextSize;
  }
  if (batch.length) batches.push(batch);
  for (const entries of batches) {
    const input = entries.map((e, i) => `⟦L${String(i).padStart(5, '0')}⟧\n${e.text}\n`).join('');
    let output = await request(input);
    const markers = [...output.matchAll(/⟦L(\d{5})⟧/g)];
    const validMarkers = markers.length === entries.length && markers.every((m, i) => +m[1] === i);
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      let translated = validMarkers ? output.slice(markers[i].index + markers[i][0].length, markers[i + 1]?.index ?? output.length).trim() : await separated(entry);
      const occurrences = [...translated.matchAll(/⟦P(\d{5})⟧/g)].map(m => +m[1]);
      if (occurrences.length !== entry.tokens.length || occurrences.some((value, k) => value !== k)) translated = await separated(entry);
      for (let depth = 0; depth <= entry.tokens.length && /⟦P\d{5}⟧/.test(translated); depth++) {
        translated = translated.replace(/⟦P(\d{5})⟧/g, (_, n) => entry.tokens[+n]);
      }
      lines[entry.line] = translated;
    }
  }
  const header = `> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。\n> 原文: [${source}](${path.relative(path.dirname(destination), path.join(root, source)).replaceAll('\\', '/')}) / 基準コミット: \`${base}\`\n\n`;
  await fs.mkdir(path.dirname(destination), { recursive: true });
  try {
    if (repair) {
      try { const current = await fs.readFile(destination, 'utf8'); if (!current.startsWith('> 日本語参考訳（機械翻訳') || current.includes('<!-- translation-review:')) return 'existing'; } catch {}
    }
    await fs.writeFile(destination, header + lines.join('\n'), { encoding: 'utf8', flag: repair ? 'w' : 'wx' });
  } catch (e) { if (e.code !== 'EEXIST') throw e; return 'existing'; }
  return 'translated';
}

let next = 0, failed = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (next < targetSources.length) {
    const source = targetSources[next++];
    try { const result = await translateDocument(source); console.log(JSON.stringify({ source, result })); }
    catch (error) { failed++; console.log(JSON.stringify({ source, error: error.message })); }
  }
}));
console.log(JSON.stringify({ files: targetSources.length, failed }));
process.exitCode = failed ? 1 : 0;
