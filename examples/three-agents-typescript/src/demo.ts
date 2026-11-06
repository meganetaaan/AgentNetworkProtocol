import { mkdir, writeFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';
import { runConversation } from './network.ts';
import { DEFAULT_MODEL, OpenAIComposer, readExistingKey } from './openai.ts';

const { values } = parseArgs({ options: { model: { type: 'string' }, 'env-file': { type: 'string' }, rounds: { type: 'string' } } });
if (values['env-file'] && !values.model) throw new Error('--env-file requires explicit --model mode');
const rounds = Number(values.rounds ?? 3);
let composer: OpenAIComposer | undefined;
if (values.model) {
  composer = new OpenAIComposer(await readExistingKey(values['env-file']), values.model || DEFAULT_MODEL);
  console.log(`Mode: live-openai-responses. Model ${composer.model}; up to ${rounds * 3} billed requests; at most 256 output tokens per request.`);
} else console.log('Mode: scripted-no-model-api. Real localhost HTTPS + ANP envelopes; no model requests.');
const result = { ...await runConversation(rounds, composer ? (agent, round, names) => composer!.compose(agent, round, names) : undefined),
  ...(composer ? { modelUsage: composer.summary() } : {}) };
await mkdir('artifacts', { recursive: true });
const artifact = composer ? 'artifacts/live-transcript.json' : 'artifacts/transcript.json';
await writeFile(artifact, JSON.stringify(result, null, 2) + '\n');
for (const entry of result.transcript) console.log(`[${entry.seq}] ${entry.name} (${entry.personality}): ${entry.text}`);
console.log(`Verified: ${result.inboxes.length} agents received ${result.transcript.length} messages each.`);
if (composer) console.log(JSON.stringify({ modelUsage: composer.summary() }));
console.log(`Public wire evidence: ${artifact} (API credentials and ephemeral private keys are never written).`);
