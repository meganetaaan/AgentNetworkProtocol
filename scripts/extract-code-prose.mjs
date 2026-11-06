// Parse original JS/TS as data; never import or execute source being inventoried.
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
const root = path.resolve(import.meta.dirname, '..');
const require = createRequire(path.join(root, 'examples/three-agents-typescript/package.json'));
const ts = require('typescript');
const assets = path.join(root, 'japanese/assets');
const input = JSON.parse(await fs.readFile(path.join(assets, 'code-prose-candidates.json'), 'utf8'));
const inventory = JSON.parse(await fs.readFile(path.join(assets, 'non-markdown-inventory.json'), 'utf8'));
const sources = inventory.files.filter(item => /\.(?:mjs|js|ts)$/.test(item.source)).map(item => item.source);
const natural = text => !/^(?:https?|did|urn|data):/.test(text) && (/[\u3400-\u9fff\u3040-\u30ff]/u.test(text) || /[A-Za-z]+[ \t]+[A-Za-z]+/.test(text));
input.units = input.units.filter(item => !sources.includes(item.source));
for (const source of sources) {
  const text = await fs.readFile(path.join(root, source), 'utf8');
  const ast = ts.createSourceFile(source, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  const found = [], seen = new Set();
  const append = (offset, original, kind) => {
    if (!natural(original)) return;
    const { line, character } = ast.getLineAndCharacterOfPosition(offset);
    const locator = `line:${line + 1}:column:${character + 1}`;
    const identity = source + '\0' + locator + '\0' + original;
    if (seen.has(identity)) return;
    seen.add(identity);
    found.push({ source, locator, kind, original, id: createHash('sha256').update(identity).digest('hex').slice(0, 20), translation: null, status: 'pending-human-translation' });
  };
  const walk = node => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) append(node.getStart(ast), node.text, 'javascript-string-candidate');
    else if (ts.isTemplateExpression(node)) append(node.getStart(ast), node.getText(ast), 'javascript-template-candidate');
    ts.forEachChild(node, walk);
  };
  walk(ast);
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.Standard, text);
  for (let kind = scanner.scan(); kind !== ts.SyntaxKind.EndOfFileToken; kind = scanner.scan()) {
    if ([ts.SyntaxKind.SingleLineCommentTrivia, ts.SyntaxKind.MultiLineCommentTrivia].includes(kind)) append(scanner.getTokenPos(), scanner.getTokenText().replace(/^\/\/?\*?\s*|\*\/$/g, '').trim(), 'javascript-comment');
  }
  input.units.push(...found.sort((a, b) => Number(a.locator.match(/\d+/)[0]) - Number(b.locator.match(/\d+/)[0])));
  const record = inventory.files.find(item => item.source === source);
  record.extraction = 'TypeScript compiler AST and token scanner; no original module execution';
  record.candidate_units = found.length;
}
await fs.writeFile(path.join(assets, 'code-prose-candidates.json'), JSON.stringify(input, null, 2) + '\n');
await fs.writeFile(path.join(assets, 'non-markdown-inventory.json'), JSON.stringify(inventory, null, 2) + '\n');
console.log(JSON.stringify({ parsed_sources: sources.length, prose_candidates_total: input.units.length }));
