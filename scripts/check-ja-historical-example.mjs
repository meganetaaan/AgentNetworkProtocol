// This one historical Chinese source omits two JSON fence terminators.
// Validate the actual examples independently from the malformed Markdown fences.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const historicalExampleSource = 'chinese/deprecated/05-基于did的消息服务协议.md';
const expectedKinds = ['json', 'json', 'python', 'json', 'python', 'json', 'json', 'json'];
const normalize = text => text.replaceAll('\r\n', '\n');
const hash = text => createHash('sha256').update(text, 'utf8').digest('hex');

function extractExamples(text) {
  const normalized = normalize(text);
  const examples = [];
  // These six original JSON objects start/end at column zero. Nested object
  // delimiters are indented; JSON.parse also verifies each bounded object.
  for (const match of normalized.matchAll(/^\{\n[\s\S]*?^\}/gm)) {
    JSON.parse(match[0]);
    examples.push({ kind: 'json', offset: match.index, content: match[0] });
  }
  // The two Python programs have stable literal boundaries even though the
  // source's earlier JSON Markdown fences are malformed. Do not parse or fix
  // these historical programs; their original formatting is intentionally kept.
  for (const match of normalized.matchAll(/^import time\n[\s\S]*?^    \)\n|^# 1\. [^\n]*\nrouter = \{[\s\S]*?^router\["proof"\]\["proofValue"\] = Base64\.urlsafe_encode\(signature\)/gm)) {
    examples.push({ kind: 'python', offset: match.index, content: match[0].replace(/\n$/, '') });
  }
  return examples.sort((a, b) => a.offset - b.offset);
}

/**
 * Check only the known historical CN message-service document's eight examples.
 * Line ending normalization is the only allowed change inside example content.
 * Returns a structured result; callers must still restrict the exception to
 * historicalExampleSource and run their normal source-integrity checks.
 */
export function checkHistoricalExample(sourceText, translationText) {
  const errors = [];
  let original, translated;
  try { original = extractExamples(sourceText); }
  catch (error) { return { ok: false, errors: ['Original example extraction failed: ' + error.message] }; }
  try { translated = extractExamples(translationText); }
  catch (error) { return { ok: false, errors: ['Translated example extraction failed: ' + error.message] }; }

  for (const [label, examples] of [['original', original], ['translation', translated]]) {
    if (JSON.stringify(examples.map(example => example.kind)) !== JSON.stringify(expectedKinds)) {
      errors.push(label + ' must contain exactly six JSON and two Python examples in the known order');
    }
  }
  for (let i = 0; i < Math.max(original.length, translated.length); i++) {
    if (!original[i] || !translated[i] || original[i].kind !== translated[i].kind || original[i].content !== translated[i].content) {
      errors.push('Example ' + (i + 1) + ' changed');
    }
  }

  // The repaired translation must put exactly these unchanged examples in its
  // eight valid fenced blocks. No arbitrary fence-content differences qualify.
  const fenced = [...normalize(translationText).matchAll(/^```(json|python)\n([\s\S]*?)^```\r?$/gm)];
  if (fenced.length !== expectedKinds.length) errors.push('Translation must have exactly eight repaired example fences');
  for (let i = 0; i < fenced.length; i++) {
    if (fenced[i][1] !== expectedKinds[i] || fenced[i][2].replace(/\n$/, '') !== original[i]?.content) {
      errors.push('Repaired fence ' + (i + 1) + ' does not contain its unchanged original example');
    }
  }
  return {
    ok: errors.length === 0,
    errors,
    jsonExamples: translated.filter(example => example.kind === 'json').length,
    pythonExamples: translated.filter(example => example.kind === 'python').length,
    exampleHashes: original.map(example => ({ kind: example.kind, sha256: hash(example.content) })),
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const result = checkHistoricalExample(
    readFileSync(path.join(root, historicalExampleSource), 'utf8'),
    readFileSync(path.join(root, 'japanese', historicalExampleSource), 'utf8'),
  );
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.ok ? 0 : 1;
}
