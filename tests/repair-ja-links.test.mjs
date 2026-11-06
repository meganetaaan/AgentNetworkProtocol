import test from 'node:test';
import assert from 'node:assert/strict';
import { repairDocument } from '../scripts/repair-ja-links.mjs';

const header = '> 日本語参考訳（機械翻訳・未校閲）。\n> 原文: [original](../../original.md)\n\n';

test('repairs URLs alone and preserves generated header, labels, titles, and example bytes', () => {
  const source = '[Original](/docs/source.md "Original title") ![Figure](/images/test.png)\n```text\n[fake](keep.md)\n```';
  const body = '[日本語](../../../../bad.md "翻訳済みタイトル") ![画像](wrong.png)\n```text\n[fake](keep.md)\n```';
  const result = repairDocument('docs/start.md', source, header + body);
  assert.equal(result.status, 'repairable');
  assert.equal(result.repaired, header + '[日本語](source.md "翻訳済みタイトル") ![画像](../../images/test.png)\n```text\n[fake](keep.md)\n```');
  assert.equal(repairDocument('docs/start.md', source, result.repaired).status, 'already-normalized');
});

test('restores exact external URLs and points fragments and non-Markdown assets to originals', () => {
  const source = '[External](https://example.org/a%20b?q=1&x=2) [Fragment](../README.md#section) [JSON](data.json)';
  const body = '[外部](https://wrong.example) [節](../README.md#section) [JSON](data.json)';
  const result = repairDocument('docs/start.md', source, header + body);
  assert.equal(result.repaired, header + '[外部](https://example.org/a%20b?q=1&x=2) [節](../../README.md#section) [JSON](../../docs/data.json)');
});

test('handles nested path parentheses, angle wrapped spaces, reference definitions and HTML attrs', () => {
  const source = '[Old](paper(2004).md) [Space](<some paper.md>)\n[ref]: ../README.md "Title"\n<img src="/images/a.png?x=1&amp;y=2" />';
  const body = '[旧](bad.md) [空白](<bad.md>)\n[参照]: wrong.md "タイトル"\n<img src="wrong.png" />';
  const result = repairDocument('docs/start.md', source, header + body);
  assert.equal(result.repaired, header + '[旧](paper%282004%29.md) [空白](<some%20paper.md>)\n[参照]: ../README.md "タイトル"\n<img src="../../images/a.png?x=1&amp;y=2" />');
});

test('never rewrites hand translations or mismatched link structures', () => {
  assert.equal(repairDocument('a.md', '[A](a.md)', '[日本語](x.md)').status, 'hand-translation-skipped');
  const mismatch = repairDocument('a.md', '[A](a.md) [B](b.md)', header + '[日本語](x.md)');
  assert.equal(mismatch.status, 'link-count-mismatch-skipped');
  assert.deepEqual(mismatch.patches, []);
  assert.equal(repairDocument('a.md', '![A](a.png)', header + '[日本語](x.md)').status, 'link-kind-mismatch-skipped');
});
