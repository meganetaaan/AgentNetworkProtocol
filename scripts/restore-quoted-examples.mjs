// Restore quoted fenced examples as source data, never translating or executing them.
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { markdownFencedBlocks } from './markdown-fenced-blocks.mjs';
const root = path.resolve(import.meta.dirname, '..');
export function quotedExamples(text) {
  return markdownFencedBlocks(text).filter(block => block.quoteDepth > 0 && block.closed);
}
async function main() {
const inventory = JSON.parse(await fs.readFile(path.join(root, 'japanese/translation-inventory.json'), 'utf8'));
const report = { policy: 'Only quoted fenced example spans are restored; original files and surrounding Japanese prose are unchanged.', files: [], errors: [], written: 0 };
for (const doc of inventory.documents) {
  const original = await fs.readFile(path.join(root, doc.source), 'utf8');
  const before = quotedExamples(original);
  if (!before.length) continue;
  const target = path.join(root, doc.destination), observed = await fs.readFile(target, 'utf8');
  const after = quotedExamples(observed);
  if (before.length !== after.length) { report.errors.push({ source: doc.source, source_blocks: before.length, translation_blocks: after.length }); continue; }
  const lines = observed.replaceAll('\r\n', '\n').split('\n');
  let changes = 0;
  for (let index = before.length - 1; index >= 0; index--) {
    if (before[index].text === after[index].text) continue;
    lines.splice(after[index].start, after[index].end - after[index].start + 1, ...before[index].text.split('\n')); changes++;
  }
  if (changes) {
    if (await fs.readFile(target, 'utf8') !== observed) { report.errors.push({ source: doc.source, reason: 'concurrent update; skipped' }); continue; }
    await fs.writeFile(target, lines.join('\n'), 'utf8'); report.written++;
  }
  report.files.push({ source: doc.source, quoted_blocks: before.length, restored_blocks: changes, source_code_sha256: before.map(item => createHash('sha256').update(item.text).digest('hex')) });
}
await fs.mkdir(path.join(root, 'japanese/reviews'), { recursive: true });
await fs.writeFile(path.join(root, 'japanese/reviews/quoted-example-preservation.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ quoted_documents: report.files.length, restored_documents: report.written, errors: report.errors }));
process.exitCode = report.errors.length ? 1 : 0;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
