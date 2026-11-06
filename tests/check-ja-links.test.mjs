import test from 'node:test';
import assert from 'node:assert/strict';
import { extractLinks, resolveLocal, classifyTarget } from '../scripts/check-ja-links.mjs';

test('reads nested path parentheses, image targets, titles, and angle-wrapped spaces', () => {
  const links = extractLinks('[archive](old/paper(20041204).md) ![figure](../images/a.png "title") [space](<old/some paper.md>)');
  assert.deepEqual(links.map(link => link.destination), ['old/paper(20041204).md', '../images/a.png', 'old/some paper.md']);
  assert.equal(links[1].kind, 'image');
});

test('handles nested labels and parentheses inside quoted titles', () => {
  const links = extractLinks('[outer [nested]](a.md "title ) is harmless") [second](b.md \'title ( too\')');
  assert.deepEqual(links.map(link => link.destination), ['a.md', 'b.md']);
});

test('does not mistake fenced examples, inline code, or comments for links', () => {
  const source = ['```json', '{"fake":"[fake](bad.md)"}', '```', '`[code](bad.md)`', '<!-- [comment](bad.md) -->', '[real](good.md)'].join('\n');
  assert.deepEqual(extractLinks(source).map(link => link.destination), ['good.md']);
});

test('handles tilde fences, HTML attributes, reference definitions and missing explicit references', () => {
  const links = extractLinks('~~~text\n[bad](bad.md)\n~~~\n<img src="../a.png" />\n<a href="../b.md#one">B</a>\n[label][doc]\n[doc]: ../c.md "C"\n[unknown][missing]');
  assert.deepEqual(links.filter(link => link.kind !== 'undefined-reference').map(link => link.destination).sort(), ['../a.png', '../b.md#one', '../c.md']);
  assert.equal(links.find(link => link.kind === 'undefined-reference').reference, 'missing');
});

test('resolves URL encoding, query strings, same-document fragments and original-source links', () => {
  assert.deepEqual(resolveLocal('japanese/docs/a.md', '../chinese/%E6%B5%8B%E8%AF%95.md?view=1#part'), { target: 'japanese/chinese/测试.md', fragment: 'part' });
  assert.deepEqual(resolveLocal('japanese/docs/a.md', '../../docs/a.md#original'), { target: 'docs/a.md', fragment: 'original' });
  assert.deepEqual(resolveLocal('japanese/docs/a.md', '#part'), { target: 'japanese/docs/a.md', fragment: 'part' });
  assert.equal(resolveLocal('japanese/docs/a.md', 'https://example.org/a.md'), null);
  assert.equal(resolveLocal('japanese/docs/a.md', 'mailto:a@example.org'), null);
});

test('distinguishes inherited source failures, pending mirrors and new translation failures', () => {
  const context = { source: 'docs/a.md', baselineTargets: new Set(['docs/missing.md', 'docs/next.md']), baselineFiles: new Set(['docs/a.md', 'docs/next.md']), currentExists: false };
  assert.equal(classifyTarget({ ...context, target: 'japanese/docs/missing.md' }), 'upstream-broken');
  assert.equal(classifyTarget({ ...context, target: 'japanese/docs/next.md' }), 'pending-translation-target');
  assert.equal(classifyTarget({ ...context, target: 'japanese/docs/typo.md' }), 'newly-broken');
  assert.equal(classifyTarget({ ...context, target: 'japanese/docs', }), 'pending-translation-target');
  assert.equal(classifyTarget({ ...context, target: 'docs/next.md', currentExists: true }), 'resolved');
});
