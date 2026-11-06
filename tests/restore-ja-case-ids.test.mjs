import assert from 'node:assert/strict';
import test from 'node:test';
import { repairCaseIds, verifyCaseIds } from '../scripts/restore-ja-case-ids.mjs';

const header = '> 日本語参考訳（機械翻訳・未校閲）。\n> 原文: [guide](source.md)\n\n';
const source = '# Guide\n\n| ID | Scenario |\n| --- | --- |\n| AUTHZ-01 | **MUST NOT** alter `wire_name`. |\n| AUTHZ-EDGE_A | Reject. |\n';
const body = '# 案内\n\n| 会員ID | シナリオ |\n| --- | --- |\n| オートHZ-01 | **MUST NOT** `wire_name`を変更する。 |\n| 任意に変形 | 拒否。 |\n';

test('restores corresponding IDs and preserves prose, code, keywords and metadata', () => {
  const review = '<!-- translation-review: partial; retained -->\n';
  const result = repairCaseIds(source, review + header + body);
  assert.equal(result.status, 'repaired');
  assert.equal(result.verified_cases, 2);
  assert.equal(result.changed_cells, 2);
  assert.equal(result.text, review + header + body.replace('オートHZ-01', 'AUTHZ-01').replace('任意に変形', 'AUTHZ-EDGE_A'));
  assert.equal(result.outside_id_cells_unchanged, true);
  assert.equal(result.metadata_unchanged, true);
  assert.equal(repairCaseIds(source, result.text).status, 'already-correct');
});

test('keeps existing CRLF endings byte-for-byte', () => {
  const result = repairCaseIds(source.replaceAll('\n', '\r\n'), (header + body).replaceAll('\n', '\r\n'));
  assert.equal(result.status, 'repaired');
  assert.equal(result.text, (header + body).replace('オートHZ-01', 'AUTHZ-01').replace('任意に変形', 'AUTHZ-EDGE_A').replaceAll('\n', '\r\n'));
});

test('refuses misaligned or malformed rows without returning replacement text', () => {
  const mismatch = repairCaseIds(source, header + body + '\n');
  assert.equal(mismatch.status, 'skipped-body-line-count-mismatch');
  assert.equal(mismatch.text, undefined);
  const malformed = repairCaseIds(source, header + body.replace('| オートHZ-01 |', 'not a table'));
  assert.equal(malformed.status, 'skipped-corresponding-row-not-table');
  assert.equal(malformed.text, undefined);
});

test('rejects extra stable-ID occurrences and does not reclassify manual translations', () => {
  const extra = repairCaseIds(source, header + body.replace('拒否。', 'AUTHZ-01を拒否。'));
  assert.equal(extra.status, 'skipped-identifier-count-mismatch');
  assert.equal(extra.text, undefined);
  const manual = repairCaseIds(source, '<!-- translation-method: manual -->\n' + header + body);
  assert.equal(manual.status, 'skipped-non-machine-or-unknown-header');
});

test('verifies a reviewed translation read-only and detects swapped rows', () => {
  const reviewed = '<!-- translation-review: full -->\n' + body.replace('オートHZ-01', 'AUTHZ-01').replace('任意に変形', 'AUTHZ-EDGE_A');
  assert.equal(verifyCaseIds(source, reviewed).verified_cases, 2);
  assert.equal(verifyCaseIds(source, reviewed).text, undefined);
  const swapped = reviewed.replace('AUTHZ-01', 'TEMP').replace('AUTHZ-EDGE_A', 'AUTHZ-01').replace('TEMP', 'AUTHZ-EDGE_A');
  assert.equal(verifyCaseIds(source, swapped).status, 'needs-repair');
});
