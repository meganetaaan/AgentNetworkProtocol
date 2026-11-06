// Keep the original language metadata distinct from the language of this mirror.
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '..');
const base = '0837cfdfaf4ddcf834f0890ddaf34fc4c824e066';
const files = execFileSync('git', ['ls-tree', '-r', '--name-only', '-z', base], { cwd: root }).toString().split('\0').filter(p => /\.md$/i.test(p));
const changed = [], skipped = [];
for (const source of files) {
  const target = path.join(root, 'japanese', source);
  let translated;
  try { translated = await fs.readFile(target, 'utf8'); } catch { continue; }
  if (!translated.startsWith('> 日本語参考訳（機械翻訳') || translated.includes('<!-- translation-review:')) continue;
  const original = (await fs.readFile(path.join(root, source), 'utf8')).replaceAll('\r\n', '\n').split('\n');
  const candidates = original.slice(0, 35).map((line, index) => ({ index, match: /^\s*-\s*(?:Language|语言)\s*[:：]\s*(.+)$/i.exec(line) })).filter(item => item.match);
  if (!candidates.length) continue;
  const offset = translated.indexOf('\n\n') + 2;
  const body = translated.slice(offset).replaceAll('\r\n', '\n').split('\n');
  if (body.length !== original.length) { skipped.push(source); continue; }
  for (const { index, match } of candidates) body[index] = '- 原文言語: ' + match[1] + ' / このページは日本語参考訳';
  const updated = translated.slice(0, offset) + body.join('\n');
  if (updated !== translated) { await fs.writeFile(target, updated, 'utf8'); changed.push(source); }
}
console.log(JSON.stringify({ changed, skipped_line_count_mismatch: skipped }, null, 2));
