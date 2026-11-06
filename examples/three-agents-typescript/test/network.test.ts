import assert from 'node:assert/strict';
import { request } from 'node:https';
import { test } from 'node:test';
import { randomUUID } from 'node:crypto';
import { generateRfc9421OriginProof, parseImSignatureInput } from '@awiki/anp-typescript-sdk';
import { createDemo, Endpoint, RpcFailure, runConversation } from '../src/network.ts';

test('serviceDid is covered by valid E1 self-proofs and anchors group.create target', async () => {
  const demo = await createDemo();
  try {
    for (const endpoint of demo.endpoints) {
      const document = await demo.transport.resolve(endpoint.did);
      const service = document.service!.find(entry => entry.type === 'ANPMessageService');
      assert.equal(service!.serviceDid, endpoint.did);
      assert.equal(service!.serviceEndpoint, endpoint.rpcUrl);
    }
    const create = demo.transport.trace.find(entry => entry.direction === 'POST' &&
      (entry.message as { method?: string })?.method === 'group.create')!.message as {
        params: { meta: { target: { kind: string; did: string } } } };
    assert.deepEqual(create.params.meta.target, { kind: 'service', did: demo.host.endpoint.serviceDid });
    const wrongTarget = demo.agents[0].endpoint.sign('group.create',
      { kind: 'service', did: demo.agents[0].endpoint.serviceDid }, {});
    await assert.rejects(demo.transport.rpc(demo.host.endpoint.rpcUrl, wrongTarget),
      (error: unknown) => error instanceof RpcFailure && error.anpCode === 'anp.invalid_target_binding');
  } finally { await demo.close(); }
});

test('three personalities exchange nine actual HTTPS/P4 messages in the same order', async () => {
  const result = await runConversation();
  assert.equal(result.mode, 'scripted-no-model-api');
  assert.equal(new Set(result.transcript.map(line => line.personality)).size, 3);
  assert.equal(result.transcript.length, 9);
  assert.deepEqual(result.transcript.map(line => line.seq), ['2', '3', '4', '5', '6', '7', '8', '9', '10']);
  for (const inbox of result.inboxes) {
    assert.deepEqual(inbox.messages.map(message => message.text), result.transcript.map(line => line.text));
  }
  const posts = result.wire.filter(entry => entry.direction === 'POST');
  assert.equal(posts.filter(entry => (entry.message as { method: string }).method === 'group.send').length, 9);
  assert.equal(posts.filter(entry => (entry.message as { method: string }).method === 'group.incoming').length, 27);
  assert.ok(result.wire.some(entry => entry.direction === 'GET' && entry.endpoint.endsWith('/did.json')));
  assert.ok(result.wire.every(entry => entry.endpoint.startsWith('https://localhost:')));
  assert.ok(!JSON.stringify(result.wire).includes('PRIVATE KEY'));
});

test('signature rejects altered payload, another sender, and expired proof', async () => {
  const demo = await createDemo();
  try {
    const [agent, other] = demo.agents;
    const signed = agent.endpoint.sign('group.send', { kind: 'group', did: agent.groupDid }, { text: 'original' }, { message_id: randomUUID(), content_type: 'text/plain' });
    const tampered = structuredClone(signed); tampered.params.body.text = 'tampered';
    await assert.rejects(demo.transport.rpc(demo.host.endpoint.rpcUrl, tampered), (error: unknown) => error instanceof RpcFailure && error.anpCode === 'group.invalid_origin_proof');
    const spoofed = structuredClone(signed); spoofed.params.meta.sender_did = other.endpoint.did;
    await assert.rejects(demo.transport.rpc(demo.host.endpoint.rpcUrl, spoofed), (error: unknown) => error instanceof RpcFailure && error.anpCode === 'group.invalid_origin_proof');
    const expired = agent.endpoint.sign('group.send', { kind: 'group', did: agent.groupDid }, { text: 'expired' }, { message_id: randomUUID(), content_type: 'text/plain' }, Math.floor(Date.now() / 1000) - 120);
    await assert.rejects(demo.transport.rpc(demo.host.endpoint.rpcUrl, expired), (error: unknown) => error instanceof RpcFailure && error.anpCode === 'group.invalid_origin_proof');
    assert.equal(demo.host.group!.seq, 1n);
  } finally { await demo.close(); }
});

test('idempotent retry returns the same acceptance; conflicting operation and nonce reuse fail', async () => {
  const demo = await createDemo();
  try {
    const agent = demo.agents[0];
    const extra = { message_id: randomUUID(), content_type: 'text/plain' };
    const signed = agent.endpoint.sign('group.send', { kind: 'group', did: agent.groupDid }, { text: 'once' }, extra);
    const first = await demo.transport.rpc(demo.host.endpoint.rpcUrl, signed);
    const retried = structuredClone(signed); retried.id = randomUUID();
    assert.deepEqual(await demo.transport.rpc(demo.host.endpoint.rpcUrl, retried), first);
    assert.equal(agent.inbox.length, 1);
    const conflict = agent.endpoint.sign('group.send', { kind: 'group', did: agent.groupDid }, { text: 'different' }, { ...extra, operation_id: signed.params.meta.operation_id });
    await assert.rejects(demo.transport.rpc(demo.host.endpoint.rpcUrl, conflict), (error: unknown) => error instanceof RpcFailure && error.anpCode === 'anp.idempotency_conflict');
    const replay = agent.endpoint.sign('group.send', { kind: 'group', did: agent.groupDid }, { text: 'replay' }, { message_id: randomUUID(), content_type: 'text/plain' });
    const old = parseImSignatureInput(signed.params.auth!.origin_proof.signatureInput);
    replay.params.auth!.origin_proof = generateRfc9421OriginProof(replay.method, replay.params.meta, replay.params.body,
      agent.endpoint.bundle.keys['key-1'].privateKeyPem, `${agent.endpoint.did}#key-1`, { created: old.created, expires: old.expires, nonce: old.nonce });
    await assert.rejects(demo.transport.rpc(demo.host.endpoint.rpcUrl, replay), (error: unknown) => error instanceof RpcFailure && error.anpCode === 'group.invalid_origin_proof');
    assert.equal(demo.host.group!.seq, 2n);
    assert.equal(demo.host.group!.version, '1');
  } finally { await demo.close(); }
});

test('concurrent accepted messages get unique ordered sequences and preserve state version', async () => {
  const demo = await createDemo();
  try {
    const messages = demo.agents.map(agent => agent.endpoint.sign('group.send', { kind: 'group', did: agent.groupDid },
      { text: agent.personality.name }, { message_id: randomUUID(), content_type: 'text/plain' }));
    const results = await Promise.all(messages.map(message => demo.transport.rpc(demo.host.endpoint.rpcUrl, message)));
    assert.deepEqual(results.map(result => result.group_event_seq).sort(), ['2', '3', '4']);
    assert.ok(results.every(result => result.group_state_version === '1'));
    assert.deepEqual(demo.agents[0].inbox.map(entry => entry.seq), ['2', '3', '4']);
    for (const agent of demo.agents.slice(1)) assert.deepEqual(agent.inbox, demo.agents[0].inbox);
    const info = await demo.transport.rpc(demo.host.endpoint.rpcUrl, demo.agents[0].endpoint.sign('group.get_info',
      { kind: 'group', did: demo.host.group!.did }, { include_member_list: true }));
    assert.equal(info.member_count, '3');
    assert.equal((info.member_list as { role: string }[]).filter(member => member.role === 'owner').length, 1);
    assert.equal((await demo.transport.resolve(demo.host.group!.did)).id, demo.host.group!.did);
  } finally { await demo.close(); }
});

test('P1 validation rejects batches, numeric ids, v1 profile, and non-member send', async () => {
  const demo = await createDemo();
  const outsider = new Endpoint(demo.transport);
  try {
    await outsider.start('outsider');
    const signed = outsider.sign('group.send', { kind: 'group', did: demo.host.group!.did }, { text: 'outsider' }, { message_id: randomUUID(), content_type: 'text/plain' });
    await assert.rejects(demo.transport.rpc(demo.host.endpoint.rpcUrl, signed), (error: unknown) => error instanceof RpcFailure && error.anpCode === 'group.not_member');
    const batch = await demo.transport.json(demo.host.endpoint.rpcUrl, [signed]) as { error: { code: number } };
    assert.equal(batch.error.code, 1004);
    const numeric = await demo.transport.json(demo.host.endpoint.rpcUrl, { ...signed, id: 1 }) as { error: { code: number } };
    assert.equal(numeric.error.code, 1000);
    const oldProfile = structuredClone(signed); oldProfile.params.meta.profile = 'anp.group.base.v1';
    await assert.rejects(demo.transport.rpc(demo.host.endpoint.rpcUrl, oldProfile), (error: unknown) => error instanceof RpcFailure && error.anpCode === 'anp.unsupported_profile');
  } finally { await outsider.close(); await demo.close(); }
});

test('HTTPS certificate verification is enabled and arbitrary origins are refused', async () => {
  const demo = await createDemo();
  try {
    await assert.rejects(demo.transport.json('https://example.com/did.json'), /outside the local demo allowlist/);
    await assert.rejects(new Promise((resolve, reject) => {
      const req = request(`${demo.host.endpoint.origin}/ad.json`, res => { res.resume(); resolve(res.statusCode); });
      req.on('error', reject); req.end();
    }), (error: unknown) => error instanceof Error && /self.signed|certificate/i.test(error.message));
  } finally { await demo.close(); }
});
