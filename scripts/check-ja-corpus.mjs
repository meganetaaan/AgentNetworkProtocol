// Join the independent inventories; verify original bytes and sidecar coverage.
// This checks recorded coverage, not the linguistic quality of a translation.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const read = name => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
const sha = name => createHash('sha256').update(fs.readFileSync(path.join(root, name))).digest('hex');
const md = read('japanese/translation-inventory.json');
const nonmd = read('japanese/assets/non-markdown-inventory.json');
const images = read('japanese/assets/images-inventory.json');
const imageChecks = read('japanese/assets/images/verification-results.json');
const documents = read('japanese/assets/documents-inventory.json');
const code = read('japanese/assets/code-translations.json');
const fences = read('japanese/assets/fenced-prose-translation-report.json');
const errors = [...md.errors, ...imageChecks.errors];
const sources = new Set();
const checks = [];
for (const file of [...md.documents, ...nonmd.files]) {
  if (sources.has(file.source)) errors.push(`Duplicate source: ${file.source}`);
  sources.add(file.source);
  const originalMatches = sha(file.source) === file.source_sha256;
  if (!originalMatches) errors.push(`Original bytes changed: ${file.source}`);
  const sidecars = [];
  let disposition;
  if (file.destination) {
    sidecars.push(file.destination);
    disposition = `markdown-semantic-review-${file.semantic_review_status}`;
  } else if (file.category === 'image') {
    const image = images.assets.find(item => item.source === file.source);
    if (!image) errors.push(`Image inventory missing: ${file.source}`);
    else {
      sidecars.push('japanese/assets/' + image.sidecar);
      disposition = image.translation_status;
    }
  } else if (file.category === 'paged-document') {
    const document = documents.documents.find(item => item.source === file.source);
    if (!document) errors.push(`Document inventory missing: ${file.source}`);
    else {
      sidecars.push(document.sidecar, document.structured_sidecar);
      disposition = document.extracted_text_translation_status;
    }
  } else if (file.sidecar) {
    sidecars.push(file.sidecar);
    disposition = file.translation_status ?? 'agent-reviewed-sidecar';
  } else if (file.category === 'machine-configuration' || file.translation_status === 'source-inspected-no-human-prose') {
    disposition = 'technical-file-no-human-prose';
  } else errors.push(`Coverage missing: ${file.source}`);
  for (const sidecar of sidecars) if (!fs.existsSync(path.join(root, sidecar))) errors.push(`Missing sidecar: ${sidecar}`);
  checks.push({ source: file.source, original_sha256_matches: originalMatches, disposition, sidecars });
}
if (sources.size !== 498 || md.documents.length !== 232 || nonmd.files.length !== 266) errors.push('Baseline source counts differ');
if (code.pending_units || fences.pending_units || fences.full_block_pending || imageChecks.visible_prose_review_pending_unique_images) errors.push('Asset prose review remains pending');
const pendingMarkdown = md.documents.filter(item => item.semantic_review_status !== 'full').map(item => ({ source: item.source, status: item.semantic_review_status }));
const report = {
  base_commit: md.base_commit,
  generated_at: new Date().toISOString(),
  original_files: sources.size,
  original_sha256_checks: checks.length,
  originals_unchanged: !errors.some(item => item.startsWith('Original bytes changed:')),
  markdown: { sources: 232, translated: md.translated, full_semantic_review: md.semantic_full, pending: pendingMarkdown },
  non_markdown: { sources: 266, image_paths: images.total, unique_images: images.unique_images, image_labels: imageChecks.unique_labels, readable_image_prose_pending: imageChecks.visible_prose_review_pending_unique_images, paged_documents: documents.document_count, pages_and_slides: documents.extracted_text_translation_units, code_prose_units: code.all_units, code_prose_pending: code.pending_units, example_prose_units: fences.candidates, example_prose_pending: fences.pending_units, plain_example_full_blocks: fences.full_block_unique_supplements },
  limits: {
    image_source_pixels: imageChecks.source_pixel_limitations,
    image_technical_code_transcription_unverified: imageChecks.technical_code_transcription_unverified_unique_images,
    paged_document_visual_verification: documents.full_document_translation_and_visual_verification_complete,
    paged_document_remaining_work: documents.remaining_work,
    independent_human_translation_review: false,
  },
  all_recorded_readable_prose_reviewed: pendingMarkdown.length === 0 && code.pending_units === 0 && fences.pending_units === 0 && imageChecks.visible_prose_review_pending_unique_images === 0,
  errors,
  checks,
};
fs.writeFileSync(path.join(root, 'japanese/corpus-verification.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ sources: sources.size, semantic_full: md.semantic_full, markdown_pending: pendingMarkdown.length, non_markdown: 266, original_bytes_unchanged: report.originals_unchanged, errors }, null, 2));
process.exitCode = errors.length ? 1 : 0;
