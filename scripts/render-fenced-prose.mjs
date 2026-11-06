// Japanese annotations live beside the examples, never in executable/wire source.
import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..'), assets = path.join(root, 'japanese/assets');
const inventory = JSON.parse(await fs.readFile(path.join(assets, 'fenced-prose-inventory.json'), 'utf8'));
const dictionary = new Map(), shards = (await fs.readdir(assets)).filter(name => /^fenced-prose-translations-\d+\.json$/.test(name));
for (const name of shards) {
  const shard = JSON.parse(await fs.readFile(path.join(assets, name), 'utf8'));
  for (const unit of shard.units) {
    if (dictionary.has(unit.original)) throw new Error('Duplicate phrase translation: ' + unit.original.slice(0, 60));
    dictionary.set(unit.original, unit);
  }
}
const reuse = JSON.parse(await fs.readFile(path.join(assets, 'fenced-prose-reuse-review.json'), 'utf8'));
for (const unit of reuse.overrides) dictionary.set(unit.original, unit);
const fullBlocks = JSON.parse(await fs.readFile(path.join(assets, 'fenced-prose-extra-full-blocks-guides.json'), 'utf8'));
const plainBlocks = JSON.parse(await fs.readFile(path.join(assets, 'plain-fenced-block-translations.json'), 'utf8'));
const resolved = [], pending = [];
for (const unit of inventory.units) {
  let chosen = dictionary.get(unit.original);
  if (unit.original === fullBlocks.supersedes_fragment) {
    chosen = { translation: 'これは引用符抽出の誤りによる断片です。同じコードブロックの指示文全文を、後掲の全文補足訳で確認してください。', status: 'invalid-fragment-covered-by-full-block' };
  }
  if (!chosen && unit.translation) chosen = { translation: unit.translation, status: 'agent-reviewed-exact-text-reuse' };
  if (!chosen || !chosen.translation) { pending.push(unit); continue; }
  resolved.push({ ...unit, translation: chosen.translation, translation_status: chosen.status, reason: chosen.reason ?? chosen.note ?? null });
}
const groups = new Map();
for (const unit of resolved) { if (!groups.has(unit.source)) groups.set(unit.source, []); groups.get(unit.source).push(unit); }
const supplementalContexts = new Set();
for (const block of [...plainBlocks.units, ...fullBlocks.units]) for (const context of block.contexts) {
  const locator = context.locator ?? `fence:${context.start}-${context.end}/full-block`;
  const bounds = /fence:(\d+)-(\d+)/.exec(locator);
  const identity = context.source + '\0' + (context.start ?? bounds?.[1] ?? locator) + '\0' + (context.end ?? bounds?.[2] ?? '') + '\0' + block.original;
  if (supplementalContexts.has(identity)) continue;
  supplementalContexts.add(identity);
  if (!groups.has(context.source)) groups.set(context.source, []);
  groups.get(context.source).push({ ...block, ...context, locator, translation_status: block.status });
}
const documents = [];
for (const [source, units] of groups) {
  const target = path.join(assets, 'code-examples', source + '.ja.md');
  const originalLink = path.relative(path.dirname(target), path.join(root, source)).replaceAll('\\', '/').replaceAll(' ', '%20').replaceAll('(', '%28').replaceAll(')', '%29');
  const lines = [`# ${source} のコード例・図ラベルの日本語補足`, '', `原文: [${source}](${originalLink})。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。`, ''];
  for (const unit of units) {
    lines.push(`## ${unit.locator}`, '', '原文:', '', '````text', unit.original, '````', '', `日本語補足（${unit.translation_status}）:`, '', '````text', unit.translation, '````', '');
    if (unit.reason) lines.push('注: ' + unit.reason, '');
  }
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, lines.join('\n'), 'utf8');
  documents.push({ source, sidecar: path.relative(root, target).replaceAll('\\', '/'), units: units.length });
}
const report = { source_commit: inventory.source_commit, policy: inventory.policy, source_blocks: inventory.blocks.length, candidates: inventory.units.length, resolved_units: resolved.length, pending_units: pending.length, pending, full_block_unique_supplements: plainBlocks.units.length, full_block_source_contexts: plainBlocks.covered_source_blocks, full_block_pending: plainBlocks.pending_source_blocks, invalid_extraction_fragments_covered_by_full_prompt: resolved.filter(unit => unit.translation_status === 'invalid-fragment-covered-by-full-block').length, documents };
await fs.writeFile(path.join(assets, 'fenced-prose-translation-report.json'), JSON.stringify(report, null, 2) + '\n');
await fs.mkdir(path.join(assets, 'code-examples'), { recursive: true });
await fs.writeFile(path.join(assets, 'code-examples/README.md'), '# コード例・図ラベルの日本語補足\n\n元のコード例を保ったまま、人向け文章を別の対訳にしました。技術値は保持し、抽出誤りは全文補足訳で置き換えます。\n\n' + documents.map(item => `- [${item.source}](${path.relative(path.join(assets, 'code-examples'), path.join(root, item.sidecar)).replaceAll('\\', '/')})`).join('\n') + '\n');
console.log(JSON.stringify({ source_blocks: report.source_blocks, candidate_units: report.candidates, resolved_units: report.resolved_units, pending_units: report.pending_units, sidecars: documents.length }));
process.exitCode = pending.length ? 1 : 0;
