import { randomUUID } from 'node:crypto';
import { createServer, request, type Server } from 'node:https';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { generate } from 'selfsigned';
import {
  buildAnpMessageService, createDidDocument, createProof, generateRfc9421OriginProof,
  PROOF_TYPE_DATA_INTEGRITY, CRYPTOSUITE_EDDSA_JCS_2022,
  parseImSignatureInput, validateDidDocumentBinding, verifyRfc9421OriginProof,
  type DidDocument, type DidDocumentBundle, type Rfc9421OriginProof,
} from '@awiki/anp-typescript-sdk';

export const GROUP_PROFILE = 'anp.group.base.v2';
export const CORE_PROFILE = 'anp.core.binding.v1';
const SCHEME = 'anp-rfc9421-origin-proof-v1';
const MAX_BYTES = 64 * 1024;
type ObjectValue = Record<string, unknown>;
export type Meta = ObjectValue & {
  profile: string; security_profile: string; operation_id: string;
  sender_did?: string; target?: { kind: string; did: string };
  message_id?: string; content_type?: string; created_at?: string;
};
export type Rpc = {
  jsonrpc: '2.0'; id?: string; method: string;
  params: { meta: Meta; body: ObjectValue; auth?: { scheme: string; origin_proof: Rfc9421OriginProof } };
};
export type Reply = { jsonrpc: '2.0'; id: string | null; result?: ObjectValue; error?: {
  code: number; message: string; data?: { anp_code: string; retryable: boolean };
} };
export type Trace = { direction: string; endpoint: string; message: unknown };
export type Heard = { sender: string; text: string; seq: string; messageId: string };

export class RpcFailure extends Error {
  code: number;
  anpCode?: string;
  constructor(code: number, anpCode: string | undefined, message = anpCode ?? 'Invalid request') {
    super(message); this.code = code; this.anpCode = anpCode;
  }
}
function object(value: unknown): value is ObjectValue {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function fail(code: number, anpCode: string, message?: string): never {
  throw new RpcFailure(code, anpCode, message);
}
function assertRpc(value: unknown): asserts value is Rpc {
  if (Array.isArray(value)) fail(1004, 'anp.batch_not_supported');
  if (!object(value) || value.jsonrpc !== '2.0' || typeof value.method !== 'string') {
    throw new RpcFailure(-32600, undefined);
  }
  if ('id' in value && (typeof value.id !== 'string' || !value.id)) fail(1000, 'anp.invalid_request_id');
  if (!object(value.params) || !object(value.params.meta) || !object(value.params.body)) {
    fail(1003, 'anp.invalid_params_shape');
  }
  const meta = value.params.meta;
  if (![CORE_PROFILE, GROUP_PROFILE].includes(String(meta.profile))) fail(1001, 'anp.unsupported_profile');
  if (meta.security_profile !== 'transport-protected') fail(1002, 'anp.unsupported_security_profile');
  if (typeof meta.operation_id !== 'string' || !meta.operation_id) fail(1003, 'anp.invalid_params_shape');
  if ('sender_device_id' in meta || 'recipient_device_id' in meta) fail(1003, 'anp.invalid_params_shape');
}
function errorReply(id: string | null, error: unknown): Reply {
  const e = error instanceof RpcFailure ? error : new RpcFailure(-32603, undefined, 'Internal error');
  return { jsonrpc: '2.0', id, error: { code: e.code, message: e.message,
    ...(e.anpCode ? { data: { anp_code: e.anpCode, retryable: false } } : {}) } };
}
function didUrl(did: string): string {
  if (!did.startsWith('did:wba:')) fail(1005, 'anp.unauthorized');
  const [authority, ...parts] = did.slice(8).split(':');
  return `https://${decodeURIComponent(authority)}/${parts.map(encodeURIComponent).join('/')}/did.json`;
}

/** Test-only trust root; never disables certificate or hostname verification. */
export class LocalTransport {
  ca: string;
  key: string;
  trace: Trace[] = [];
  allowedOrigins = new Set<string>();
  constructor(ca: string, key: string) { this.ca = ca; this.key = key; }
  async json(urlText: string, message?: unknown): Promise<unknown> {
    const url = new URL(urlText);
    if (!this.allowedOrigins.has(url.origin)) throw new Error('Origin is outside the local demo allowlist');
    this.trace.push({ direction: message === undefined ? 'GET' : 'POST', endpoint: urlText, message: message ?? null });
    return new Promise((resolve, reject) => {
      const body = message === undefined ? undefined : JSON.stringify(message);
      const req = request(url, { ca: this.ca, rejectUnauthorized: true, method: body ? 'POST' : 'GET',
        headers: body ? { 'content-type': 'application/json', 'content-length': Buffer.byteLength(body) } : {},
        timeout: 5000 }, (res) => {
        const chunks: Buffer[] = []; let size = 0;
        res.on('data', (chunk: Buffer) => { size += chunk.length; if (size > MAX_BYTES) res.destroy(new Error('Response too large')); else chunks.push(chunk); });
        res.on('error', reject);
        res.on('end', () => {
          try {
            if (res.statusCode === 204) { resolve(null); return; }
            if (res.statusCode !== 200) throw new Error(`HTTP ${res.statusCode}`);
            const value: unknown = JSON.parse(Buffer.concat(chunks).toString('utf8'));
            this.trace.push({ direction: 'RESPONSE', endpoint: urlText, message: value }); resolve(value);
          } catch (error) { reject(error); }
        });
      });
      req.on('timeout', () => req.destroy(new Error('Request timed out'))); req.on('error', reject);
      req.end(body);
    });
  }
  async rpc(url: string, message: Rpc): Promise<ObjectValue> {
    const response = await this.json(url, message) as Reply;
    if (message.id === undefined) return {};
    if (!response || response.jsonrpc !== '2.0' || response.id !== message.id) throw new Error('Response id mismatch');
    if (response.error) throw new RpcFailure(response.error.code, response.error.data?.anp_code, response.error.message);
    if (!object(response.result)) throw new Error('Result is missing');
    return response.result;
  }
  async resolve(did: string): Promise<DidDocument> {
    const document = await this.json(didUrl(did)) as DidDocument;
    if (document.id !== did || !validateDidDocumentBinding(document)) fail(1005, 'anp.unauthorized', 'Invalid DID binding');
    return document;
  }
}

type Handler = (message: Rpc) => Promise<ObjectValue | void>;
export class Endpoint {
  server: Server;
  bundle!: DidDocumentBundle;
  documents = new Map<string, DidDocument>();
  origin = '';
  handler: Handler = async () => { throw new RpcFailure(-32601, undefined, 'Method not found'); };
  transport: LocalTransport;
  constructor(transport: LocalTransport) {
    this.transport = transport;
    this.server = createServer({ key: transport.key, cert: transport.ca }, (req, res) => { void this.handle(req, res); });
  }
  get did(): string { return this.bundle.didDocument.id; }
  get rpcUrl(): string { return `${this.origin}/rpc`; }
  get serviceDid(): string {
    const service = this.bundle.didDocument.service?.find(entry => entry.type === 'ANPMessageService' && entry.serviceEndpoint === this.rpcUrl);
    if (!service || typeof service.serviceDid !== 'string') throw new Error('Message service identity missing');
    return service.serviceDid;
  }
  async start(slug: string): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      this.server.once('error', reject); this.server.listen(0, '127.0.0.1', () => resolve());
    });
    const address = this.server.address();
    if (!address || typeof address === 'string') throw new Error('Missing TCP address');
    this.origin = `https://localhost:${address.port}`;
    this.transport.allowedOrigins.add(this.origin);
    this.bundle = createDidDocument('localhost', { port: address.port, pathSegments: ['agents', slug], enableE2ee: false });
    // The self-referencing service DID is known after E1 identity generation.
    // Re-sign the complete document so its self-proof also covers serviceDid.
    this.bundle.didDocument = createProof({ ...this.bundle.didDocument,
      service: [buildAnpMessageService(this.did, this.rpcUrl, {
        serviceDid: this.did, profiles: [CORE_PROFILE, GROUP_PROFILE], securityProfiles: ['transport-protected'],
      })] }, this.bundle.keys['key-1'].privateKeyPem, `${this.did}#key-1`, {
        proofType: PROOF_TYPE_DATA_INTEGRITY, cryptosuite: CRYPTOSUITE_EDDSA_JCS_2022,
        proofPurpose: 'assertionMethod',
      }) as DidDocument;
  }
  sign(method: string, target: { kind: string; did: string }, body: ObjectValue, extra: ObjectValue = {}, time = Math.floor(Date.now() / 1000)): Rpc {
    const meta = { profile: GROUP_PROFILE, security_profile: 'transport-protected', operation_id: randomUUID(),
      sender_did: this.did, target, created_at: new Date(time * 1000).toISOString(), ...extra } as Meta;
    const originProof = generateRfc9421OriginProof(method, meta, body, this.bundle.keys['key-1'].privateKeyPem,
      `${this.did}#key-1`, { created: time, expires: time + 60, nonce: randomUUID() });
    return { jsonrpc: '2.0', id: randomUUID(), method, params: { meta, body, auth: { scheme: SCHEME, origin_proof: originProof } } };
  }
  async close(): Promise<void> {
    this.server.closeAllConnections();
    await new Promise<void>((resolve, reject) => this.server.close(error => error ? reject(error) : resolve()));
  }
  private async handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
    if (req.method === 'GET') {
      const document = [this.bundle.didDocument, ...this.documents.values()].find(doc => req.url === new URL(didUrl(doc.id)).pathname);
      if (document) { res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(document)); return; }
    }
    if (req.method === 'GET' && req.url === '/ad.json') {
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ protocolType: 'ANP', protocolVersion: '1.0.0', type: 'AgentDescription',
        url: `${this.origin}/ad.json`, did: this.did, name: this.did.split(':').at(-2),
        description: 'Local ANP subset learning demo; scripted conversation; not full P4 conformance',
        interfaces: [{ type: 'StructuredInterface', protocol: 'JSON-RPC', url: this.rpcUrl }] })); return;
    }
    if (req.method !== 'POST' || req.url !== '/rpc') { res.writeHead(404); res.end(); return; }
    let message: unknown;
    try {
      let size = 0; const chunks: Buffer[] = [];
      for await (const chunk of req) { size += chunk.length; if (size > MAX_BYTES) { res.writeHead(413); res.end(); return; } chunks.push(chunk); }
      try { message = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
      catch { throw new RpcFailure(-32700, undefined, 'Parse error'); }
      assertRpc(message);
      if (message.id === undefined && !['group.incoming', 'group.state_changed'].includes(message.method)) {
        fail(1003, 'anp.invalid_params_shape', 'Control operations require id');
      }
      const result = await this.handler(message);
      if (message.id === undefined) { res.writeHead(204); res.end(); return; }
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ jsonrpc: '2.0', id: message.id, result: result ?? {} }));
    } catch (error) {
      if (object(message) && !('id' in message) && message.jsonrpc === '2.0') { res.writeHead(204); res.end(); return; }
      const id = object(message) && typeof message.id === 'string' ? message.id : null;
      res.setHeader('content-type', 'application/json'); res.end(JSON.stringify(errorReply(id, error)));
    }
  }
}

export async function verifyOrigin(transport: LocalTransport, message: Rpc): Promise<string> {
  try {
    const { meta, body, auth } = message.params;
    if (!auth || auth.scheme !== SCHEME || typeof meta.sender_did !== 'string') throw new Error('Missing origin proof');
    const input = auth.origin_proof.signatureInput;
    if (!/^sig1=\("@method" "@target-uri" "content-digest"\);created=\d+;expires=\d+;nonce="[A-Za-z0-9_-]+";keyid="[^"\r\n]+"$/.test(input)) throw new Error('Unsupported signature input');
    const parsed = parseImSignatureInput(input); const now = Math.floor(Date.now() / 1000);
    if (!parsed.created || !parsed.expires || parsed.created > now + 5 || parsed.created < now - 60 || parsed.expires < now || parsed.expires > parsed.created + 60) throw new Error('Expired or invalid proof window');
    if (!parsed.nonce || auth.origin_proof.signature.split('=', 1)[0] !== 'sig1') throw new Error('Invalid proof label or nonce');
    const document = await transport.resolve(meta.sender_did);
    verifyRfc9421OriginProof(auth.origin_proof, message.method, meta, body, { didDocument: document, options: { expectedSignerDid: meta.sender_did } });
    return `${parsed.keyid}:${parsed.nonce}`;
  } catch { fail(3008, 'group.invalid_origin_proof'); }
}

type Group = { did: string; owner: string; members: Set<string>; version: string; seq: bigint; profile: ObjectValue; policy: ObjectValue };
export class GroupHost {
  endpoint: Endpoint;
  transport: LocalTransport;
  group?: Group;
  seen = new Map<string, { fingerprint: string; result: ObjectValue }>();
  nonces = new Map<string, string>();
  tail: Promise<unknown> = Promise.resolve();
  constructor(endpoint: Endpoint, transport: LocalTransport) {
    this.endpoint = endpoint; this.transport = transport;
    endpoint.handler = message => {
      const pending = this.tail.then(() => this.accept(message));
      this.tail = pending.catch(() => {}); return pending;
    };
  }
  async accept(message: Rpc): Promise<ObjectValue> {
    const { meta, body } = message.params;
    if (message.method === 'anp.get_capabilities') {
      if (meta.profile !== CORE_PROFILE) fail(1001, 'anp.unsupported_profile');
      return { service_did: this.endpoint.did, supported_profiles: [CORE_PROFILE, 'anp.identity.discovery.v1', GROUP_PROFILE],
        supported_security_profiles: ['transport-protected'], supported_content_types: ['text/plain'],
        limits: { max_request_bytes: String(MAX_BYTES), max_message_bytes: '4096' },
        supported_methods: ['anp.get_capabilities', 'group.create', 'group.get_info', 'group.send'],
        implementation_status: 'educational subset, not full P4 conformance' };
    }
    if (!['group.create', 'group.get_info', 'group.send'].includes(message.method)) throw new RpcFailure(-32601, undefined, 'Method not found');
    if (meta.profile !== GROUP_PROFILE) fail(1001, 'anp.unsupported_profile');
    const expected = message.method === 'group.create' ? { kind: 'service', did: this.endpoint.serviceDid } : { kind: 'group', did: this.group?.did };
    if (!meta.target || meta.target.kind !== expected.kind || meta.target.did !== expected.did) fail(1014, 'anp.invalid_target_binding');
    const nonce = await verifyOrigin(this.transport, message);
    const fingerprint = message.params.auth!.origin_proof.contentDigest;
    const key = `${meta.sender_did}:${meta.target.did}:${message.method}:${meta.operation_id}`;
    const previous = this.seen.get(key);
    if (previous) {
      if (previous.fingerprint !== fingerprint) fail(1008, 'anp.idempotency_conflict');
      return previous.result;
    }
    if (this.nonces.has(nonce)) fail(3008, 'group.invalid_origin_proof', 'Nonce replay');
    let result: ObjectValue;
    if (message.method === 'group.create') {
      if (this.group) fail(1006, 'anp.forbidden', 'This demo hosts one group');
      if (!object(body.group_policy) || body.group_policy.admission_mode !== 'admin-add' || !Array.isArray(body.initial_members)) fail(1003, 'anp.invalid_params_shape');
      const permissions = body.group_policy.permissions;
      if (!object(permissions) || permissions.send !== 'member' || body.group_policy.message_security_profile !== 'transport-protected') fail(1003, 'anp.invalid_params_shape', 'This demo accepts member-send transport-protected groups only');
      const members = new Set([meta.sender_did!]);
      for (const member of body.initial_members) {
        if (!object(member) || typeof member.member_did !== 'string') fail(1003, 'anp.invalid_params_shape');
        if (member.role !== undefined && member.role !== 'member') fail(1003, 'anp.invalid_params_shape', 'Only member initial roles are implemented');
        await this.transport.resolve(member.member_did); members.add(member.member_did);
      }
      const groupBundle = createDidDocument('localhost', { port: Number(new URL(this.endpoint.origin).port),
        pathSegments: ['groups', randomUUID()], enableE2ee: false,
        services: [buildAnpMessageService('#message', this.endpoint.rpcUrl, { serviceDid: this.endpoint.did,
          profiles: [CORE_PROFILE, GROUP_PROFILE], securityProfiles: ['transport-protected'] })] });
      this.endpoint.documents.set(groupBundle.didDocument.id, groupBundle.didDocument);
      this.group = { did: groupBundle.didDocument.id, owner: meta.sender_did!, members, version: '1', seq: 1n,
        profile: object(body.group_profile) ? body.group_profile : {}, policy: body.group_policy };
      result = { group_did: this.group.did, group_state_version: '1', group_event_seq: '1',
        creator_did: meta.sender_did, created_at: new Date().toISOString() };
    } else {
      const group = this.group!;
      if (!group.members.has(meta.sender_did!)) fail(3000, 'group.not_member');
      if (message.method === 'group.get_info') {
        result = { group_did: group.did, group_state_version: group.version, group_profile: group.profile,
          ...(body.include_policy ? { group_policy: group.policy } : {}),
          ...(body.include_member_list ? { member_list: [...group.members].map(did => ({ agent_did: did, role: did === group.owner ? 'owner' : 'member', status: 'active' })) } : {}),
          member_count: String(group.members.size) };
      } else {
        if (meta.content_type !== 'text/plain') fail(1009, 'anp.unsupported_content_type');
        if (typeof meta.message_id !== 'string' || !meta.message_id || typeof body.text !== 'string' || 'payload' in body || 'payload_b64u' in body) fail(1003, 'anp.invalid_params_shape');
        if (Buffer.byteLength(body.text) > 4096) fail(1003, 'anp.invalid_params_shape');
        group.seq += 1n;
        result = { accepted: true, group_did: group.did, group_state_version: group.version,
          group_event_seq: group.seq.toString(), message_id: meta.message_id, operation_id: meta.operation_id, accepted_at: new Date().toISOString() };
        this.seen.set(key, { fingerprint, result }); this.nonces.set(nonce, key);
        for (const did of group.members) {
          const document = await this.transport.resolve(did);
          const service = document.service?.find(s => s.type === 'ANPMessageService');
          if (!service || typeof service.serviceEndpoint !== 'string') throw new Error('Message endpoint missing');
          const notification: Rpc = { jsonrpc: '2.0', method: 'group.incoming', params: {
            meta: { ...meta, target: { kind: 'agent', did } }, auth: message.params.auth,
            body: { ...body, group_did: group.did, group_state_version: group.version, group_event_seq: result.group_event_seq, accepted_at: result.accepted_at } } };
          await this.transport.rpc(service.serviceEndpoint, notification);
        }
      }
    }
    this.seen.set(key, { fingerprint, result }); this.nonces.set(nonce, key);
    return result;
  }
}

export type Personality = { slug: string; name: string; stance: string; lines: string[] };
export const PERSONALITIES: Personality[] = [
  { slug: 'hikari', name: 'ひかり', stance: '楽観的な発想家', lines: [
    '3体で街の案内をしたいです。得意な話題を分担したら、初めて来た人も楽しめそう！',
    'まず一つの観光スポットで試しましょう。利用者の反応を見て、小さく改善したいです。',
    '立ち止まった人だけに案内するのもいいですね。楽しい体験を一緒につくりましょう！' ] },
  { slug: 'makoto', name: 'まこと', stance: '慎重な検証者', lines: [
    '楽しさには賛成ですが、3体が同時に話すと聞き取りづらくなります。順番と中断時の動作を確かめたいです。',
    '実験なら成功条件を決めましょう。案内の理解度と、利用者が中断できた割合を記録するのはどうでしょう。',
    '会話の送受信と音声の制御は別の課題です。今回はテキストの順序が一致することを検証しましょう。' ] },
  { slug: 'nagomi', name: 'なごみ', stance: '共感を重視する調整役', lines: [
    'わくわくする提案と、聞きやすさへの配慮を両方大切にしたいです。利用者が話し始めたら耳を傾けましょう。',
    '数字に加えて、困った場面を本人の言葉で聞いてみたいです。安心して使えたかも振り返りましょう。',
    'では、小さな実験から始めることに合意ですね。発想、検証、利用者への配慮を3体で分担しましょう。' ] },
];
export class ConversationAgent {
  endpoint: Endpoint;
  personality: Personality;
  inbox: Heard[] = [];
  groupDid = '';
  constructor(endpoint: Endpoint, personality: Personality) {
    this.endpoint = endpoint; this.personality = personality;
    endpoint.handler = async message => {
      if (message.method !== 'group.incoming' || message.id !== undefined) throw new RpcFailure(-32601, undefined, 'Method not found');
      const { meta, body, auth } = message.params;
      if (meta.target?.did !== endpoint.did || meta.target.kind !== 'agent' || meta.profile !== GROUP_PROFILE || body.group_did !== this.groupDid) fail(1014, 'anp.invalid_target_binding');
      const { group_did: _group, group_state_version: _version, group_event_seq: seq, accepted_at: _at, ...originalBody } = body;
      const original: Rpc = { jsonrpc: '2.0', method: 'group.send', params: {
        meta: { ...meta, target: { kind: 'group', did: this.groupDid } }, body: originalBody, auth } };
      await verifyOrigin(endpoint.transport, original);
      if (typeof seq !== 'string' || !/^\d+$/.test(seq)) fail(1003, 'anp.invalid_params_shape');
      if (this.inbox.some(entry => entry.messageId === meta.message_id)) return;
      const last = this.inbox.at(-1);
      if (last && BigInt(seq) <= BigInt(last.seq)) fail(1003, 'anp.invalid_params_shape');
      this.inbox.push({ sender: meta.sender_did!, text: String(body.text), seq, messageId: meta.message_id! });
    };
  }
  compose(round: number): string {
    const previous = this.inbox.at(-1);
    const lastStatement = previous?.text.split('を受けて。').at(-1) ?? '';
    const acknowledgement = previous ? `「${lastStatement.slice(0, 18)}…」を受けて。` : '';
    return acknowledgement + this.personality.lines[round];
  }
}

export async function createDemo() {
  const pems = await generate([{ name: 'commonName', value: 'localhost' }], { algorithm: 'sha256', keyType: 'ec', curve: 'P-256',
    notBeforeDate: new Date(Date.now() - 60_000), notAfterDate: new Date(Date.now() + 86_400_000),
    extensions: [{ name: 'basicConstraints', cA: true }, { name: 'keyUsage', digitalSignature: true, keyCertSign: true },
      { name: 'subjectAltName', altNames: [{ type: 2, value: 'localhost' }] }] });
  const transport = new LocalTransport(pems.cert, pems.private);
  const endpoints: Endpoint[] = [];
  try {
    const hostEndpoint = new Endpoint(transport); endpoints.push(hostEndpoint); await hostEndpoint.start('host');
    const host = new GroupHost(hostEndpoint, transport);
    const agents: ConversationAgent[] = [];
    for (const personality of PERSONALITIES) {
      const endpoint = new Endpoint(transport); endpoints.push(endpoint); await endpoint.start(personality.slug);
      agents.push(new ConversationAgent(endpoint, personality));
    }
    const capabilities: Rpc = { jsonrpc: '2.0', id: randomUUID(), method: 'anp.get_capabilities', params: {
      meta: { profile: CORE_PROFILE, security_profile: 'transport-protected', operation_id: randomUUID() }, body: {} } };
    const supported = await transport.rpc(hostEndpoint.rpcUrl, capabilities);
    if (!(supported.supported_profiles as string[]).includes(GROUP_PROFILE)) throw new Error('P4 v2 missing');
    const create = agents[0].endpoint.sign('group.create', { kind: 'service', did: hostEndpoint.serviceDid }, {
      group_profile: { display_name: '3つの視点で街の案内を考える', discoverability: 'private' },
      group_policy: { message_security_profile: 'transport-protected', bootstrap_security_profile: 'transport-protected', admission_mode: 'admin-add',
        permissions: { send: 'member', add: 'admin', remove: 'admin', update_profile: 'admin', update_policy: 'owner' } },
      initial_members: agents.slice(1).map(agent => ({ member_did: agent.endpoint.did, role: 'member' })) });
    const created = await transport.rpc(hostEndpoint.rpcUrl, create);
    for (const agent of agents) agent.groupDid = String(created.group_did);
    return { transport, host, agents, endpoints,
      close: async () => { await Promise.all(endpoints.map(endpoint => endpoint.close())); } };
  } catch (error) { await Promise.allSettled(endpoints.map(endpoint => endpoint.close())); throw error; }
}

export async function runConversation(rounds = 3) {
  const demo = await createDemo();
  const transcript: { name: string; personality: string; text: string; seq: string }[] = [];
  try {
    for (let round = 0; round < rounds; round++) {
      for (const agent of demo.agents) {
        const text = agent.compose(round);
        const message = agent.endpoint.sign('group.send', { kind: 'group', did: agent.groupDid },
          { text, thread_id: 'city-guide' }, { message_id: randomUUID(), content_type: 'text/plain' });
        const result = await demo.transport.rpc(demo.host.endpoint.rpcUrl, message);
        transcript.push({ name: agent.personality.name, personality: agent.personality.stance, text, seq: String(result.group_event_seq) });
      }
    }
    return { mode: 'scripted-no-model-api', transcript, wire: demo.transport.trace, inboxes: demo.agents.map(agent => ({ name: agent.personality.name, messages: agent.inbox })) };
  } finally { await demo.close(); }
}
