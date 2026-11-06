import assert from 'node:assert/strict';
import { test } from 'node:test';
import { OpenAIComposer, OpenAIRequestError } from '../src/openai.ts';
import { createDemo, runConversation } from '../src/network.ts';

test('mocked Responses API gets distinct personas and only each agent ANP inbox, while actual ANP transport is preserved', async () => {
  const bodies: { instructions: string; input: { role: string; content: string }[]; max_output_tokens: number; store: boolean }[] = [];
  const fakeFetch = (async (url, options) => {
    assert.equal(url, 'https://api.openai.com/v1/responses');
    const body = JSON.parse(String(options?.body)); bodies.push(body);
    const name = /あなたは([^。]+)。/.exec(body.instructions)![1];
    return new Response(JSON.stringify({ id: `mock-${bodies.length}`, model: body.model, status: 'completed',
      output: [{ type: 'reasoning' }, { type: 'message', content: [{ type: 'output_text', text: `${name}のテスト発言${bodies.length}` }] }],
      usage: { input_tokens: 100, output_tokens: 20, total_tokens: 120 } }), { status: 200 });
  }) as typeof fetch;
  const composer = new OpenAIComposer('test-credential-not-real', undefined, fakeFetch);
  const result = await runConversation(3, (agent, round, names) => composer.compose(agent, round, names));
  assert.equal(result.transcript.length, 9);
  assert.ok(bodies[0].instructions.includes('楽観的な発想家'));
  assert.ok(bodies[1].instructions.includes('慎重な検証者'));
  assert.ok(bodies[2].instructions.includes('共感を重視する調整役'));
  assert.equal(bodies[0].input.length, 2);
  assert.equal(bodies[1].input[1].content, 'ひかり: ひかりのテスト発言1');
  assert.equal(bodies[3].input[1].role, 'assistant');
  assert.equal(bodies[4].input[2].role, 'assistant');
  assert.ok(bodies.every(body => body.max_output_tokens === 256 && body.store === false));
  assert.equal(composer.summary().attempts, 9);
  assert.equal(composer.summary().inputTokens, 900);
  assert.equal(composer.summary().outputTokens, 180);
  assert.ok(!JSON.stringify(composer).includes('test-credential-not-real'));
  for (const inbox of result.inboxes) assert.equal(inbox.messages.length, 9);
});

test('model failure exposes safe status only and never retries or returns raw error bodies', async () => {
  const demo = await createDemo(); let calls = 0;
  try {
    const fakeFetch = (async () => {
      calls += 1;
      return new Response('a server error body that must never be logged', { status: 401, headers: { 'x-request-id': 'req-test' } });
    }) as typeof fetch;
    const composer = new OpenAIComposer('test-credential-not-real', undefined, fakeFetch);
    await assert.rejects(composer.compose(demo.agents[0], 0, new Map()), (error: unknown) =>
      error instanceof OpenAIRequestError && error.status === 401 && error.requestId === 'req-test' && !error.message.includes('server error body'));
    assert.equal(calls, 1);
    assert.equal(composer.calls.length, 0);
  } finally { await demo.close(); }
});

test('empty or incomplete model response stops without an automatic paid retry', async () => {
  const demo = await createDemo(); let calls = 0;
  try {
    const fakeFetch = (async () => {
      calls += 1;
      return new Response(JSON.stringify({ status: 'incomplete', output: [], usage: { input_tokens: 10, output_tokens: 256 } }));
    }) as typeof fetch;
    const composer = new OpenAIComposer('test-credential-not-real', undefined, fakeFetch);
    await assert.rejects(composer.compose(demo.agents[0], 0, new Map()), /incomplete or contained no text/);
    assert.equal(calls, 1);
    assert.equal(composer.summary().outputTokens, 256);
  } finally { await demo.close(); }
});
