import { mkdir, writeFile } from 'node:fs/promises';
import { runConversation } from './network.ts';

const result = await runConversation();
await mkdir('artifacts', { recursive: true });
await writeFile('artifacts/transcript.json', JSON.stringify(result, null, 2) + '\n');
console.log('Mode: scripted-no-model-api. Real localhost HTTPS + ANP envelopes; no model requests.');
for (const entry of result.transcript) console.log(`[${entry.seq}] ${entry.name} (${entry.personality}): ${entry.text}`);
console.log(`Verified: ${result.inboxes.length} agents received ${result.transcript.length} messages each.`);
console.log('Public wire evidence: artifacts/transcript.json (ephemeral private keys are never written).');
