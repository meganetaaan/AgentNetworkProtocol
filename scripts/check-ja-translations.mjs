// Offline inventory and preservation checks for the Japanese documentation mirror.
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { historicalExampleSource, checkHistoricalExample } from './check-ja-historical-example.mjs';
import { markdownFencedBlocks } from './markdown-fenced-blocks.mjs';
const root = path.resolve(import.meta.dirname, '..');
const base = '0837cfdfaf4ddcf834f0890ddaf34fc4c824e066';
const git = args => execFileSync('git', args, { cwd: root }).toString();
const files = git(['ls-tree', '-r', '--name-only', '-z', base]).split('\0').filter(Boolean);
const sources = files.filter(p => /\.md$/i.test(p));
const initialProvenance = new Map(JSON.parse(git(['show', '11c5214:japanese/translation-inventory.json'])).documents.map(item => [item.source, item.method]));
const changed = git(['diff', '--name-only', '-z', base]).split('\0').filter(p => files.includes(p));
const sha = text => createHash('sha256').update(text).digest('hex');
const normalize = text => text.replaceAll('\r\n', '\n');
const fences = text => markdownFencedBlocks(text).map(block => block.text);
const tokens = text => [...text.matchAll(/(`+)([^`\n]*?)\1/g)].map(m => m[0]).sort();
const normative = text => [...text.matchAll(/\b(?:MUST NOT|SHALL NOT|SHOULD NOT|NOT RECOMMENDED|MUST|SHALL|SHOULD|MAY|REQUIRED|RECOMMENDED|OPTIONAL)\b/g)].map(m => m[0]).sort();
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const errors = changed.map(p => `Original changed: ${p}`), warnings = [], documents = [];
for (const source of sources) {
  const original = await fs.readFile(path.join(root, source), 'utf8');
  const destination = 'japanese/' + source;
  let translated;
  try { translated = await fs.readFile(path.join(root, destination), 'utf8'); }
  catch { errors.push(`Missing: ${source}`); documents.push({ source, destination, status: 'missing', source_sha256: sha(original) }); continue; }
  const initiallyAgent = initialProvenance.get(source) === 'agent-translated-or-reviewed';
  const machine = !initiallyAgent;
  const fullyReviewed = /^<!-- translation-review:\s*(?:machine-fully-reviewed|full)(?:;|\s*-->)/.test(translated);
  const partlyReviewed = machine && !fullyReviewed && translated.includes('<!-- translation-review:');
  const hasReferenceHeader = /^(?:<!-- translation-review:[^]*?-->\s*)?> 日本語参考訳/.test(translated);
  const body = hasReferenceHeader ? translated.slice(translated.indexOf('\n\n') + 2) : translated;
  const exactFences = equal(fences(original), fences(body));
  const historicalRepair = source === historicalExampleSource ? checkHistoricalExample(original, body) : null;
  const available = new Map();
  for (const token of tokens(body)) available.set(token, (available.get(token) ?? 0) + 1);
  const inline = tokens(original).every(token => { const count = available.get(token) ?? 0; available.set(token, count - 1); return count > 0; });
  const keywords = equal(normative(original), normative(body));
  const protocolIds = [...new Set(original.match(/\b(?:ANP-(?:P[1-9]|[0-9]{2})|AUTHZ-[A-Z0-9_-]+)\b/g) ?? [])];
  const missingIds = protocolIds.filter(id => !body.includes(id));
  if (!exactFences && !historicalRepair?.ok) errors.push(`Fenced examples changed: ${source}`);
  if (!inline) warnings.push(`Inline code differs: ${source}`);
  if (!keywords) warnings.push(`Normative keyword counts differ: ${source}`);
  if (missingIds.length) errors.push(`Protocol identifiers missing: ${source}: ${missingIds.join(', ')}`);
  if (/⟦[PL]\d+⟧|ZXQ[PL]\d+QXZ/.test(body)) errors.push(`Unrestored placeholder: ${source}`);
  documents.push({ source, destination, status: 'translated', initial_translation_method: initialProvenance.get(source), semantic_review_status: initiallyAgent || fullyReviewed ? 'full' : partlyReviewed ? 'partial' : 'unreviewed', method: initiallyAgent ? 'agent-translated-or-reviewed' : fullyReviewed ? 'machine-fully-reviewed' : partlyReviewed ? 'machine-partially-reviewed' : 'machine-unreviewed', source_sha256: sha(original), translation_sha256: sha(translated), fenced_examples_exact: exactFences, historical_fence_repair: historicalRepair, inline_code_preserved: inline, normative_keyword_counts_exact: keywords, protocol_identifiers_present: !missingIds.length, missing_protocol_identifiers: missingIds });
}
const assets = files.filter(p => !sources.includes(p)).map(source => ({ source, disposition: /\.(?:png|jpe?g|gif|webp|svg|ico|pdf|pptx?)$/i.test(source) ? 'original-binary-asset-retained' : 'original-code-data-or-support-file-retained' }));
const report = { base_commit: base, generated_at: new Date().toISOString(), markdown_sources: sources.length, translated: documents.filter(x => x.status === 'translated').length, agent_translated: documents.filter(x => x.method === 'agent-translated-or-reviewed').length, machine_unreviewed: documents.filter(x => x.method === 'machine-unreviewed').length, machine_partially_reviewed: documents.filter(x => x.method === 'machine-partially-reviewed').length, machine_fully_reviewed: documents.filter(x => x.method === 'machine-fully-reviewed').length, semantic_full: documents.filter(x => x.semantic_review_status === 'full').length, original_files_unchanged: changed.length === 0, errors, warnings, documents, retained_non_markdown_files: assets };
await fs.mkdir(path.join(root, 'japanese'), { recursive: true });
await fs.writeFile(path.join(root, 'japanese', 'translation-inventory.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ markdown_sources: report.markdown_sources, translated: report.translated, agent_translated: report.agent_translated, machine_unreviewed: report.machine_unreviewed, machine_partially_reviewed: report.machine_partially_reviewed, machine_fully_reviewed: report.machine_fully_reviewed, semantic_full: report.semantic_full, original_files_unchanged: report.original_files_unchanged, errors: report.errors, warnings: report.warnings }, null, 2));
process.exitCode = errors.length ? 1 : 0;
