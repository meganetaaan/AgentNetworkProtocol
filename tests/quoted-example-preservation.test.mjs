import test from 'node:test';
import assert from 'node:assert/strict';
import { markdownFencedBlocks } from '../scripts/markdown-fenced-blocks.mjs';
import { quotedExamples } from '../scripts/restore-quoted-examples.mjs';

test('quoted JSON and its language tag remain a preserved example', () => {
  const source = '> ```json\n> {"type":"AgentDescription"}\n> ```';
  assert.equal(quotedExamples(source)[0].text, source);
  assert.notEqual(quotedExamples(source.replace('json', '日本語'))[0].text, source);
});
test('short nested fences and quote markers do not terminate an outer example', () => {
  const source = '````markdown\n> ```text\n> sample\n> ```\n````';
  assert.equal(markdownFencedBlocks(source).length, 1);
  assert.equal(markdownFencedBlocks(source)[0].text, source);
  assert.equal(quotedExamples(source).length, 0);
});
test('multiple blockquote levels, tildes and unclosed examples are recorded', () => {
  const source = '> > ~~~text\n> > keep\n> > ~~~\n\n```json\n{}';
  const blocks = markdownFencedBlocks(source);
  assert.equal(blocks.length, 2);
  assert.equal(blocks[0].quoteDepth, 2);
  assert.equal(blocks[0].closed, true);
  assert.equal(blocks[1].closed, false);
});
