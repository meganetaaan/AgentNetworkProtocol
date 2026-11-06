// Restore stable validation-case identifiers only; this is not a semantic review.
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const sources = [
  'docs/anp-05-validation-guide.md',
  'docs/chinese/anp-05-validation-guide.md',
];
const sourceCell = /^(\s*\|\s*)(AUTHZ-[A-Z0-9_-]+)(\s*\|)/;
const targetCell = /^(\s*\|)([^|]*)(\|[^\r\n]*)(\r\n|\n|\r|$)$/;
const machineHeader = /^(?:\uFEFF)?(?:<!-- translation-review:[\s\S]*?-->\s*)?> 日本語参考訳（機械翻訳[^\r\n]*\r?\n> 原文:[^\r\n]*\r?\n\r?\n/;
const lines = text => text.match(/[^\r\n]*(?:\r\n|\n|\r|$)/g).filter(Boolean);
const counts = ids => Object.fromEntries([...new Set(ids)].sort().map(id => [id, ids.filter(value => value === id).length]));
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/** Verify reviewed translations without offering a replacement or changing metadata. */
export function verifyCaseIds(original, translated) {
  const sourceIds = lines(original).flatMap(line => sourceCell.exec(line)?.[2] ?? []);
  const targetIds = lines(translated).flatMap(line => sourceCell.exec(line)?.[2] ?? []);
  const actualCounts = counts([...translated.matchAll(/\bAUTHZ-[A-Z0-9_-]+\b/g)].map(match => match[0]));
  const expectedCounts = counts([...original.matchAll(/\bAUTHZ-[A-Z0-9_-]+\b/g)].map(match => match[0]));
  const ok = equal(sourceIds, targetIds) && equal(expectedCounts, actualCounts);
  return { source_cases: sourceIds.length, source_counts: counts(sourceIds), status: ok ? 'already-correct' : 'needs-repair', verified_cases: ok ? sourceIds.length : 0, translation_counts: counts(targetIds), read_only_verification: true };
}

/** Return a replacement only after correspondence and identifier counts pass. */
export function repairCaseIds(original, translated) {
  const originalLines = lines(original);
  const cases = originalLines.flatMap((line, index) => {
    const match = sourceCell.exec(line);
    return match ? [{ index, id: match[2] }] : [];
  });
  const sourceCounts = counts(cases.map(item => item.id));
  const evidence = { source_cases: cases.length, source_counts: sourceCounts };
  if (!cases.length) return { ...evidence, status: 'skipped-no-source-cases' };
  const header = machineHeader.exec(translated)?.[0];
  if (!header) return { ...evidence, status: 'skipped-non-machine-or-unknown-header' };
  const body = translated.slice(header.length);
  const translatedLines = lines(body);
  if (originalLines.length !== translatedLines.length) {
    return { ...evidence, status: 'skipped-body-line-count-mismatch', source_lines: originalLines.length, translation_lines: translatedLines.length };
  }
  let changed = 0;
  for (const { index, id } of cases) {
    const match = targetCell.exec(translatedLines[index]);
    if (!match) return { ...evidence, status: 'skipped-corresponding-row-not-table', line: index + 1 };
    const whitespace = /^(\s*)[\s\S]*?(\s*)$/.exec(match[2]);
    const restored = match[1] + whitespace[1] + id + whitespace[2] + match[3] + match[4];
    if (restored !== translatedLines[index]) changed++;
    translatedLines[index] = restored;
  }
  const repairedBody = translatedLines.join('');
  const tableCounts = counts(translatedLines.flatMap(line => sourceCell.exec(line)?.[2] ?? []));
  const allCounts = counts([...repairedBody.matchAll(/\bAUTHZ-[A-Z0-9_-]+\b/g)].map(match => match[0]));
  if (!equal(sourceCounts, tableCounts) || !equal(sourceCounts, allCounts)) {
    return { ...evidence, status: 'skipped-identifier-count-mismatch', translation_table_counts: tableCounts, translation_all_counts: allCounts };
  }
  // Every changed line must differ only inside its first table cell.
  const caseIndices = new Set(cases.map(item => item.index));
  const beforeLines = lines(body);
  const outsideCellsUnchanged = beforeLines.every((line, index) => {
    if (!caseIndices.has(index)) return line === translatedLines[index];
    const before = targetCell.exec(line), after = targetCell.exec(translatedLines[index]);
    return before[1] === after[1] && before[3] === after[3] && before[4] === after[4];
  });
  if (!outsideCellsUnchanged) throw new Error('Identifier repair changed content outside a case-ID cell.');
  return {
    ...evidence,
    status: changed ? 'repaired' : 'already-correct',
    changed_cells: changed,
    verified_cases: cases.length,
    translation_counts: tableCounts,
    outside_id_cells_unchanged: true,
    metadata_unchanged: true,
    text: header + repairedBody,
  };
}

export async function run({ root = path.resolve(import.meta.dirname, '..'), check = false } = {}) {
  const files = [];
  for (const source of sources) {
    const original = await fs.readFile(path.join(root, source), 'utf8');
    const destination = 'japanese/' + source;
    let translated;
    try { translated = await fs.readFile(path.join(root, destination), 'utf8'); }
    catch (error) {
      if (error.code !== 'ENOENT') throw error;
      files.push({ source, destination, status: 'pending-translation', source_cases: lines(original).filter(line => sourceCell.test(line)).length });
      continue;
    }
    const result = check ? verifyCaseIds(original, translated) : repairCaseIds(original, translated);
    if (result.status === 'repaired' && !check) {
      if (await fs.readFile(path.join(root, destination), 'utf8') !== translated) {
        files.push({ source, destination, status: 'skipped-concurrent-change', source_cases: result.source_cases });
        continue;
      }
      await fs.writeFile(path.join(root, destination), result.text, 'utf8');
    }
    const { text, ...evidence } = result;
    files.push({ source, destination, ...evidence, ...(check && result.status === 'repaired' ? { status: 'needs-repair' } : {}) });
  }
  return {
    operation: 'stable-case-identifier-repair-only-not-semantic-translation-review',
    check_only: check,
    source_case_total: files.reduce((sum, file) => sum + file.source_cases, 0),
    verified_case_total: files.reduce((sum, file) => sum + (file.verified_cases ?? 0), 0),
    complete: files.every(file => ['repaired', 'already-correct'].includes(file.status)),
    files,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const check = process.argv.includes('--check');
  const report = await run({ check });
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = report.files.some(file => file.status.startsWith('skipped-') || file.status === 'needs-repair' || (check && file.status === 'pending-translation')) ? 1 : 0;
}
