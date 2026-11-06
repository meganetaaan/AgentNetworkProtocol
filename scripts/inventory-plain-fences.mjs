// Plain fenced prompts and diagrams need a separate completeness pass.
import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const input = JSON.parse(await fs.readFile(path.join(root, 'japanese/assets/fenced-prose-inventory.json'), 'utf8'));
const candidates = [];
for (const block of input.blocks.filter(item => ['plaintext', 'text', '', 'plain', 'markdown'].includes(item.language))) {
  const text = (await fs.readFile(path.join(root, block.source), 'utf8')).replaceAll('\r\n', '\n').split('\n').slice(block.source_start, block.source_end - 1).join('\n');
  const meaningful = text.split('\n').filter(line => (/[A-Za-z]+ [A-Za-z]+ [A-Za-z]+/.test(line) || /[\u3400-\u9fff]{2}/u.test(line)) && !/^\s*(?:[{}\[\]"]|(?:GET|POST|HTTP\/|Content-|Authorization:))/.test(line));
  if (meaningful.length) candidates.push({ source: block.source, start: block.source_start, end: block.source_end, language: block.language, text, completeness_review: 'pending-human-classification' });
}
await fs.writeFile(path.join(root, 'japanese/assets/plain-fenced-block-candidates.json'), JSON.stringify({ policy: 'Supplemental prompt/ASCII diagram completeness candidates; extraction is not translation or review completion.', blocks: candidates }, null, 2) + '\n');
console.log(JSON.stringify({ blocks: candidates.length, characters: candidates.reduce((n, item) => n + item.text.length, 0) }));
