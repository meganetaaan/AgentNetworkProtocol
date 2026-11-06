// Link the current mirror status to independent review records, including transfers.
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const directory = path.join(root, 'japanese/reviews');
const inventory = JSON.parse(fs.readFileSync(path.join(root, 'japanese/translation-inventory.json'), 'utf8'));
const ledgers = fs.readdirSync(directory).filter(name => name.endsWith('.json') && name !== 'review-index.json').flatMap(name => {
  const data = JSON.parse(fs.readFileSync(path.join(directory, name), 'utf8'));
  const entries = data.documents ?? data.files;
  return Array.isArray(entries) ? [{ file: 'japanese/reviews/' + name, entries }] : [];
});
const missingEvidence = [];
const documents = inventory.documents.map(document => {
  const evidence = ledgers.flatMap(ledger => ledger.entries.filter(entry => entry.source === document.source).map(entry => ({
    ledger: ledger.file,
    recorded_status: entry.status ?? entry.semantic_status ?? entry.semantic_review_status ?? entry.review_status ?? 'structural-check-only',
    source_sha256_matches: entry.source_sha256 ? entry.source_sha256 === document.source_sha256 : null,
  })));
  const initialAgentTranslation = document.initial_translation_method === 'agent-translated-or-reviewed';
  const fullEvidence = evidence.some(item => ['full', 'machine-fully-reviewed'].includes(item.recorded_status) && item.source_sha256_matches !== false);
  if (document.semantic_review_status === 'full' && !initialAgentTranslation && !fullEvidence) missingEvidence.push(document.source);
  return { source: document.source, destination: document.destination, current_semantic_review_status: document.semantic_review_status, source_sha256: document.source_sha256, translation_sha256: document.translation_sha256, initial_agent_translation: initialAgentTranslation, initial_provenance_commit: initialAgentTranslation ? '11c5214f2854aa3d0681784cce1d6a99e1ef95f8' : null, evidence };
});
const report = {
  base_commit: inventory.base_commit,
  generated_at: new Date().toISOString(),
  policy: 'Current status comes from the mirror inventory. Older delegated or partial entries remain historical; a matching full record or initial agent-translation provenance is required. This index does not independently certify linguistic quality.',
  documents: documents.length,
  full: documents.filter(document => document.current_semantic_review_status === 'full').length,
  missing_full_review_evidence: missingEvidence,
  entries: documents,
};
fs.writeFileSync(path.join(directory, 'review-index.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ documents: report.documents, full: report.full, missing_full_review_evidence: missingEvidence }, null, 2));
process.exitCode = missingEvidence.length ? 1 : 0;
