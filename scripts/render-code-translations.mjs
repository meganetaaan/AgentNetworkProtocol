// Render a non-executable Japanese glossary; original keys, values and code stay unchanged.
import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
const root = path.resolve(import.meta.dirname, '..');
const directory = path.join(root, 'japanese/assets');
const load = async file => JSON.parse(await fs.readFile(path.join(directory, file), 'utf8'));
const candidates = await load('code-prose-candidates.json');
const structured = await load('code-translations-structured.json');
const additional = await load('code-prose-additional-structured.json');
const javascript = await load('code-translations-javascript.json');
const originalById = new Map(candidates.units.map(item => [item.id, item]));
const translated = new Map();
for (const item of [...structured.units, ...additional.units]) {
  if (translated.has(item.id)) throw new Error('Duplicate translation unit ' + item.id);
  const existing = originalById.get(item.id);
  if (existing && (existing.original !== item.original || existing.source !== item.source || existing.locator !== item.locator)) throw new Error('Translation/source mismatch ' + item.id);
  translated.set(item.id, { ...existing, ...item });
}
for (const [source, values] of Object.entries(javascript.files)) {
  const sourceUnits = candidates.units.filter(item => item.source === source);
  if (sourceUnits.length !== values.length) throw new Error(`Translation count mismatch for ${source}: ${sourceUnits.length} != ${values.length}`);
  for (let i = 0; i < sourceUnits.length; i++) {
    const item = sourceUnits[i];
    const retained = values[i] === null;
    translated.set(item.id, { ...item, translation: retained ? item.original : values[i], status: retained ? 'technical-retained' : 'agent-reviewed', ...(retained ? { reason: '内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。' } : {}) });
  }
}
const missing = candidates.units.filter(item => !translated.has(item.id));
if (missing.length) throw new Error('Untranslated candidate units: ' + missing.map(item => item.id).join(', '));
const units = [...translated.values()];
for (const item of units) {
  const id = createHash('sha256').update(item.source + '\0' + item.locator + '\0' + item.original).digest('hex').slice(0, 20);
  if (id !== item.id || !item.translation) throw new Error('Invalid translated unit: ' + item.id);
}
const groups = new Map();
for (const item of units) { if (!groups.has(item.source)) groups.set(item.source, []); groups.get(item.source).push(item); }
const documents = [];
for (const [source, sourceUnits] of groups) {
  const target = path.join(directory, 'code', source + '.ja.md');
  const link = path.relative(path.dirname(target), path.join(root, source)).replaceAll('\\', '/').replaceAll(' ', '%20').replaceAll('(', '%28').replaceAll(')', '%29');
  const raw = await fs.readFile(path.join(root, source));
  const lines = [`# ${source} の人向け文章の日本語対応表`, '', `原文: [${source}](${link})。元ファイルのキー、コード、診断文字列、署名対象データは変更していません。この文書は実行するコードや送信するJSONの代替ではありません。`, '', `原文SHA-256: \`${createHash('sha256').update(raw).digest('hex')}\``, '', 'プログラムの抽出結果に加え、人が読む設定値・説明・コメントの抽出漏れを確認して補っています。技術値はそのまま保持し、保持理由を併記します。', ''];
  for (const item of sourceUnits) {
    lines.push(`## ${item.locator}`, '', '原文:', '', '````text', item.original, '````', '', item.status === 'technical-retained' ? '技術値を原文のまま保持します。' : '日本語:', '', '````text', item.status === 'technical-retained' ? (item.reason ?? '識別子または実行上の値のため、変更しません。') : item.translation, '````', '');
  }
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, lines.join('\n'), 'utf8');
  documents.push({ source, sidecar: path.relative(root, target).replaceAll('\\', '/'), units: sourceUnits.length, source_sha256: createHash('sha256').update(raw).digest('hex') });
}
const report = { source_commit: candidates.source_commit, policy: 'Source code and wire data are retained. Japanese explanatory sidecars only. Compiler/structured parsing plus source completeness audit; no original code execution.', candidate_units: candidates.units.length, additional_units: additional.units.length, all_units: units.length, agent_reviewed: units.filter(item => item.status === 'agent-reviewed').length, technical_retained: units.filter(item => item.status === 'technical-retained').length, pending_units: 0, documents, units };
await fs.writeFile(path.join(directory, 'code-translations.json'), JSON.stringify(report, null, 2) + '\n');
await fs.writeFile(path.join(directory, 'code', 'README.md'), '# コード・設定内の人向け文章\n\n原文を変更せず、説明・コメント・表示文の日本語を対応表にしました。キー、パス、暗号用テスト値、HTTPヘッダーなどは技術値として保持します。\n\n' + documents.map(item => `- [${item.source}](${path.relative(path.join(directory, 'code'), path.join(root, item.sidecar)).replaceAll('\\', '/')}): ${item.units}項目`).join('\n') + '\n');
console.log(JSON.stringify({ documents: documents.length, units: units.length, pending: 0, agent_reviewed: report.agent_reviewed, technical_retained: report.technical_retained }));
