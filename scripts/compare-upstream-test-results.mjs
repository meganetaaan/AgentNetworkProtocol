// Compare public upstream fixtures and TAP evidence without changing upstream files.
// Generate bounded review artifacts; keep the full TAP logs outside the repository.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const parent = path.dirname(root);
const baseline = path.join(parent, 'upstream-test-baseline');
const read = file => fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '').replaceAll('\r\n', '\n');
const sha = value => createHash('sha256').update(value).digest('hex');
const enFile = '05-anp-did-authorization-protocol-specification.md';
const cnFile = 'chinese/05-ANP-基于DID的授权协议.md';
const testFile = 'tests/did-oauth-draft.test.mjs';
const tests = ['tests/release-doc-entrypoints.test.mjs', testFile, 'tests/update_contributors.test.js'];
const testText = read(path.join(root, testFile));
const lineOf = (text, fragment) => text.slice(0, text.indexOf(fragment)).split('\n').length;
const texts = { en: read(path.join(root, enFile)), cn: read(path.join(root, cnFile)) };

function normalizeDiagnostic(block, checkout) {
  const variants = [checkout, checkout.replaceAll('\\', '\\\\'), checkout.replaceAll('\\', '/')].sort((a, b) => b.length - a.length);
  let output = block.replace(/^  duration_ms:.*\n/gm, '');
  for (const variant of variants) output = output.split(variant).join('<checkout>');
  return output.trim();
}

function parseTap(file, checkout) {
  const text = read(file);
  const records = [];
  for (const block of text.split(/(?=^# Subtest: )/m)) {
    const status = /^(not ok|ok) (\d+) - (.+)$/m.exec(block);
    if (!status) continue;
    const location = /^  location: '([^\n]+)'$/m.exec(block)?.[1];
    const stackLocation = /\/tests\/did-oauth-draft\.test\.mjs:(\d+):(\d+)\)/.exec(block);
    const firstError = /^  error: (.*)$/m.exec(block);
    const error = firstError?.[1] === '|-' ? block.slice(firstError.index + firstError[0].length).split('\n').map(line => line.trim()).find(Boolean) : firstError?.[1];
    const normalized = normalizeDiagnostic(block, checkout);
    records.push({
      id: Number(status[2]), name: status[3], passed: status[1] === 'ok',
      testFile: location ? location.slice(location.lastIndexOf('tests\\\\') >= 0 ? location.lastIndexOf('tests\\\\') : 0).replaceAll('\\\\', '/') : null,
      assertionLine: stackLocation ? Number(stackLocation[1]) : null,
      error: error ?? null,
      diagnosticSha256: sha(normalized),
    });
  }
  const field = name => Number(new RegExp('^# ' + name + ' (\\d+)$', 'm').exec(text)?.[1]);
  return { tests: field('tests'), pass: field('pass'), fail: field('fail'), records, tapSha256: sha(fs.readFileSync(file)) };
}

const runPairs = [
  { mode: 'sandbox', current: 'upstream-tests-current.tap', baseline: 'upstream-tests-baseline-lf.tap' },
  { mode: 'child-process-enabled', current: 'upstream-tests-current-escalated.tap', baseline: 'upstream-tests-baseline-escalated.tap' },
].map(run => {
  const current = parseTap(path.join(parent, run.current), root);
  const previous = parseTap(path.join(parent, run.baseline), baseline);
  const currentFailed = current.records.filter(record => !record.passed);
  const baselineFailed = previous.records.filter(record => !record.passed);
  return {
    mode: run.mode, command: 'node --test --test-isolation=none --test-reporter=tap ' + tests.join(' '),
    currentLog: '../' + run.current, baselineLog: '../' + run.baseline,
    current, baseline: previous,
    failedNamesEqual: JSON.stringify(currentFailed.map(record => record.name)) === JSON.stringify(baselineFailed.map(record => record.name)),
    perFailureDiagnosticsEqual: currentFailed.every((record, index) => record.diagnosticSha256 === baselineFailed[index]?.diagnosticSha256),
  };
});

const originalFiles = fs.readdirSync(baseline, { recursive: true, withFileTypes: true }).filter(entry => entry.isFile()).map(entry => path.relative(baseline, path.join(entry.parentPath, entry.name)).replaceAll('\\', '/')).sort();
const fileEvidence = originalFiles.map(file => {
  const oldBytes = fs.readFileSync(path.join(baseline, file));
  const currentBytes = fs.existsSync(path.join(root, file)) ? fs.readFileSync(path.join(root, file)) : null;
  return { file, baselineBytes: oldBytes.length, currentBytes: currentBytes?.length ?? null,
    baselineSha256: sha(oldBytes), currentSha256: currentBytes ? sha(currentBytes) : null, identical: !!currentBytes?.equals(oldBytes) };
});

const sourceDetails = Object.entries(texts).map(([language, text]) => {
  const start = text.indexOf('## 11.');
  const end = text.indexOf('## 12.');
  const section = text.slice(start, end);
  const anchors = [...text.matchAll(/<a id="([^"]+)"><\/a>/g)].map(match => match[1]);
  const code = [...text.matchAll(/^```([^\n]*)\n([\s\S]*?)^```\s*$/gm)];
  const json = code.filter(match => match[1] === 'json').map(match => JSON.parse(match[2]));
  return { language, file: language === 'en' ? enFile : cnFile, section11HeadingLine: lineOf(text, '## 11.'), section12HeadingLine: lineOf(text, '## 12.'), section11Excerpt: section,
    section11HasOnlyHeading: section.trim() === section.split('\n')[0], anchors, anchorCount: anchors.length,
    absentAnchors: ['vc-oauth-composition', 'vc-direct-presentation', 'vc-organization-agents', 'errors'].filter(anchor => !anchors.includes(anchor)),
    jsonExampleCount: json.length,
    vcExamplesPresent: {
      presentationRequest: json.some(value => value.type === 'ANPPresentationRequest'),
      presentation: json.some(value => Array.isArray(value.type) && value.type.includes('VerifiablePresentation')),
      roleCredential: json.some(value => Array.isArray(value.type) && value.type.includes('ANPAgentRoleCredential')),
    },
    mermaidDiagramCount: code.filter(match => match[1] === 'mermaid').length,
  };
});

// Evaluate only the test's literal data table of names and regular expressions,
// never the test module or callbacks. This preserves the exact checked patterns.
const guardsStart = testText.indexOf('const vcGuards = ') + 'const vcGuards = '.length;
const guardsEnd = testText.indexOf('\n];\nfor (const [name, enPattern', guardsStart) + 2;
const guards = Function('"use strict"; return (' + testText.slice(guardsStart, guardsEnd) + ');')();
const guardPrefix = 'VC requirement and deletion regression: ';
const failures = runPairs.find(run => run.mode === 'child-process-enabled').current.records.filter(record => !record.passed).map(record => {
  const result = { ...record, baselineDiagnosticSha256: runPairs[1].baseline.records.find(item => item.name === record.name)?.diagnosticSha256,
    translationRelationship: '基準コミットと現ブランチの入力・テストがバイト単位で同一。日本語訳・追加デモに依存しない。' };
  if (record.id === 3) {
    return { ...result, category: 'missing-vc-section-and-anchors', testDefinitionLine: 57,
      expected: { explicitAnchors: 27, requiredVcAnchors: ['vc-oauth-composition', 'vc-direct-presentation', 'vc-organization-agents'] },
      actual: { explicitAnchors: 23, missingAnchors: sourceDetails[0].absentAnchors, mermaidDiagramCount: sourceDetails[0].mermaidDiagramCount },
      sourceEvidence: [{ file: enFile, line: 785 }, { file: cnFile, line: 785 }],
      diagnosis: '両言語で第11節の本文と子節のanchorが消え、errors anchorもない。先頭のanchor数assertで停止するため、後続の図・コード整合assertは実行されない。' };
  }
  if (record.id === 12) {
    return { ...result, category: 'stale-vnext-inventory-expectation', testDefinitionLine: 209,
      expected: { vnextDraftsChecked: 2, englishDirectory: ['01-agentnetworkprotocol-technical-white-paper.md', 'README.md', 'chinese'], chineseDirectory: ['01-AgentNetworkProtocol技术白皮书.md', 'README.md'] },
      actual: { vnextDraftsChecked: 4, englishDirectory: fs.readdirSync(path.join(root, 'vnext')).sort(), chineseDirectory: fs.readdirSync(path.join(root, 'vnext/chinese')).sort() },
      sourceEvidence: [{ file: 'scripts/check-release-docs.mjs', line: 29 }, { file: 'vnext/p4-group-messaging-base-semantics.md', line: 1 }, { file: 'vnext/chinese/P4-群组基础语义.md', line: 1 }],
      diagnosis: 'checkerは白書英中2件にP4英中2件を加えて4件を数える。テストは追加前の2件とディレクトリ内容を期待する。sandboxではこのassert前にspawn EPERMになるが、子プロセス許可下では4 !== 2という実際の期待不一致を確認した。' };
  }
  if ([62, 63, 65, 66, 67].includes(record.id)) {
    return { ...result, category: 'missing-vc-wire-examples', testDefinitionLine: record.id === 62 ? 621 : record.id === 63 ? 648 : record.id === 65 ? 682 : record.id === 66 ? 701 : 712,
      expected: { selector: 'JSON type includes VerifiablePresentation; also ANPPresentationRequest and ANPAgentRoleCredential for the dependent assertions', propertyRead: 'presentation.verifiableCredential' },
      actual: { presentation: 'undefined', presentationRequest: 'undefined', roleCredential: 'undefined', exception: 'TypeError: Cannot read properties of undefined (reading verifiableCredential)' },
      sourceEvidence: [{ file: testFile, line: 612 }, { file: enFile, line: 786 }],
      diagnosis: 'vcSamples()のJSONスキーマ検索に対応するVC/VP例が存在しない。5件は別々の暗号・権限検証の失敗ではなく、同じ欠落fixtureの参照で停止している。' };
  }
  if (record.id === 64) {
    const text = texts.en;
    const end = text.indexOf('<a id="errors"></a>');
    const section = text.slice(text.indexOf('<a id="vc-authorization"></a>'), end);
    const found = /`jti`|client_assertion|client_id/.exec(section);
    return { ...result, category: 'missing-anchor-causes-section-slice-overrun', testDefinitionLine: 666,
      expected: { sectionEndAnchor: 'errors', forbiddenWithinVcSection: '`jti`|client_assertion|client_id' },
      actual: { errorsAnchorIndex: end, matchedWord: found?.[0] ?? null, matchedSourceLine: found ? text.slice(0, text.indexOf('<a id="vc-authorization"></a>') + found.index).split('\n').length : null, sectionSliceIncludesSections: ['12', '13', '14', '15', '16'] },
      sourceEvidence: [{ file: testFile, line: 675 }, { file: enFile, line: 788 }, { file: enFile, line: 881 }],
      diagnosis: 'errors anchorがないためindexOf()=-1。slice(start,-1)が第16節まで含み、将来のOAuth client_id説明をVC節内だと誤認して拒否する。token-exchange wireを本版へ再導入した証拠ではない。' };
  }
  const name = record.name.slice(guardPrefix.length);
  const guard = guards.find(item => item[0] === name);
  if (!record.name.startsWith(guardPrefix) || !guard) throw new Error('Unclassified failure: ' + record.name);
  return { ...result, category: 'missing-vc-normative-text', testDefinitionLine: lineOf(testText, "['" + name + "'"),
    expected: { englishPattern: guard[1].source, chinesePattern: guard[2].source },
    actual: { englishPatternMatches: guard[1].test(texts.en), chinesePatternMatches: guard[2].test(texts.cn), section11: 'Heading only, zero normative paragraphs' },
    sourceEvidence: [{ file: enFile, line: 786 }, { file: cnFile, line: 786 }, { file: enFile, line: 830 }],
    diagnosis: '要求するVC規則の逐語パターンが少なくとも片方の原文で不在。第11節は空だが、第14節は11.3/11.4/11.6の検証・出示規則を参照したまま。regex不一致だけであらゆる同等記述の不存在まで証明するものではない。' };
});

const smoke = { release: ['current', 'baseline'].map(side => ({ side, command: 'node scripts/check-release-docs.mjs', report: JSON.parse(read(path.join(parent, 'upstream-release-' + side + '.json'))) })),
  vectors: ['current', 'baseline'].map(side => ({ side, command: 'node scripts/check-anp02-vectors.mjs', report: JSON.parse(read(path.join(parent, 'upstream-vectors-' + side + '.log'))) })),
  deterministicRegeneration: ['current', 'baseline'].map(side => ({ side, command: 'node scripts/generate-anp02-vectors.mjs', output: read(path.join(parent, 'upstream-regenerate-' + side + '.log')).trim(), writesFiles: false })) };
const categories = Object.fromEntries([...new Set(failures.map(failure => failure.category))].map(category => [category, failures.filter(failure => failure.category === category).length]));
const report = {
  investigationDate: '2026-11-06', baselineCommit: '0837cfdfaf4ddcf834f0890ddaf34fc4c824e066', investigatedHead: '11c5214f2854aa3d0681784cce1d6a99e1ef95f8',
  environment: { platform: process.platform, node: process.version, testIsolation: 'none', gitCoreAutocrlfObserved: 'input', baselineMethod: 'git archive --format=zip BASE, then Expand-Archive into a previously absent sibling directory' },
  originalIntegrity: { files: fileEvidence.length, identicalFiles: fileEvidence.filter(file => file.identical).length, differences: fileEvidence.filter(file => !file.identical), combinedBaselineManifestSha256: sha(fileEvidence.map(file => file.file + '\0' + file.baselineSha256).join('\n')), combinedCurrentManifestSha256: sha(fileEvidence.map(file => file.file + '\0' + file.currentSha256).join('\n')), filesEvidence: fileEvidence },
  sourceDetails, runPairs, categories, failures, smoke,
  interpretation: { all38PreexistInBase: runPairs.every(run => run.failedNamesEqual && run.perFailureDiagnosticsEqual) && fileEvidence.every(file => file.identical),
    caveat: 'These are documentation regression assertions, not 38 independent runtime or cryptographic implementation failures. A standalone release checker PASS does not establish completeness of Section 11.',
    noOriginalEdits: true, generatorPolicy: 'generate-anp02-vectors.mjs without --write only reconstructs and compares in memory. Check-only mode passed in both checkouts. The --write mode was not run.' },
};

const publicDir = path.join(root, 'japanese/reviews');
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'upstream-test-investigation.json'), JSON.stringify(report, null, 2) + '\n');

const inline = value => '`' + String(value).replaceAll('`', "'").replaceAll('|', '\\|') + '`';
const link = (file, line) => '[' + file + ':' + line + '](../' + file + ')';
const summaries = {
  'missing-vc-section-and-anchors': 'anchor 27を期待／23。第11節本文と4 anchorが欠落',
  'stale-vnext-inventory-expectation': 'vNext 2件を期待／4件。P4英中の追加をテストが未反映',
  'missing-vc-wire-examples': 'VC/VPのJSON例を期待／selectorがundefinedで参照失敗',
  'missing-anchor-causes-section-slice-overrun': 'errorsで節を切る期待／anchor不在で16節まで誤読',
  'missing-vc-normative-text': '指定のVC規範文を期待／英中の逐語patternが不一致',
};
const lines = [
  '# 上流既存テスト38失敗の調査', '',
  '調査日：2026-11-06。比較対象は翻訳前の基準コミット ' + inline(report.baselineCommit) + ' と、調査開始時のブランチHEAD ' + inline(report.investigatedHead) + '。原文、既存テスト、既存スクリプトは一切変更していません。', '',
  '**同じ条件で両方とも131件中93成功・38失敗となり、38件すべての失敗名と診断内容が一致しました。** 基準スナップショットの全' + fileEvidence.length + 'ファイルは現在の対応ファイルと生バイト・SHA-256が同一です。日本語版や3体会話デモによる回帰は、この3テストの比較では検出されませんでした。', '',
  '機械可読な全件証拠は [upstream-test-investigation.json](reviews/upstream-test-investigation.json)。各失敗の期待pattern、実値、test/assert行、原文所在、診断ハッシュ、および全原文ファイルの対照ハッシュを含みます。全文TAPは大きいためGit外の作業フォルダーに保持し、公開レポートには複製しません。', '',
  '## 比較方法', '',
  '未存在を確認した ' + inline('../upstream-test-baseline') + ' に ' + inline('git archive') + ' のZIPを展開しました。Node.js ' + process.version + ' / Windows、テストの実行順とオプションをそろえています。', '',
  '```sh', runPairs[0].command, '```', '',
  '| 条件 | 基準コミット | 現ブランチ | 失敗名・診断の一致 |', '| --- | --- | --- | --- |',
  ...runPairs.map(run => '| ' + run.mode + ' | ' + run.baseline.tests + '件／成功' + run.baseline.pass + '／失敗' + run.baseline.fail + ' | ' + run.current.tests + '件／成功' + run.current.pass + '／失敗' + run.current.fail + ' | ' + (run.failedNamesEqual && run.perFailureDiagnosticsEqual ? '38件すべて一致' : '要確認') + ' |'), '',
  '診断の比較では、各checkoutの絶対パスを同じ印に置換し、duration_msだけを除きました。期待値、実際の値、エラー、assertの位置、スタックは比較対象に残しています。sandbox実行では1件が子プロセスの ' + inline('spawn EPERM') + ' で止まるため、同じ2回の試験を子プロセス許可下でも実施しました。そのときも38件で、環境エラーに隠れていた ' + inline('4 !== 2') + ' の期待不一致を確認しています。', '',
  '## 原因', '',
  '### ANP-05のVC節が空になっている', '',
  '英語版 ' + link(enFile, 785) + ' と中国語版 ' + link(cnFile, 785) + ' は、どちらも次の構造です。第11節には規範の段落も例もありません。', '',
  '```text', '<a id="vc-authorization"></a>', '## 11. VC-based authorization', '', '## 12. Errors', '```', '',
  '一方、原文第14節（英中とも830行付近）は、存在しない11.3、11.4、11.6の出示・検証順・holder binding・session規則に依存した適合性条件を残しています。先頭の草案版はv0.7のままで、VC Profileも広告されています。これは翻訳の欠落ではなく、基準コミットの英中原文自体の不整合です。第11節を本版から意図的に除外したのか、本文の欠落なのかという編集意図までは推測しません。', '',
  '| 直接観測した差 | テストへの影響 |', '| --- | --- |',
  '| anchor数は27期待に対して23。vc-oauth-composition、vc-direct-presentation、vc-organization-agents、errorsが不在 | 構造同期テスト1件が最初のassertで停止 |',
  '| ANPPresentationRequest、VerifiablePresentation、ANPAgentRoleCredentialのJSON例がすべて不在 | 5件がpresentation.verifiableCredentialのTypeErrorで停止。5種類の暗号実装が壊れた意味ではない |',
  '| VC規範文を要求する30種類の逐語patternが原文と一致しない | 権限・失効・holder・challenge・sessionなどの文書回帰テスト30件が失敗 |',
  '| errors anchorがないのでindexOf()が-1になる | slice(start,-1)が第12〜16節まで含み、881行の将来拡張のclient_idをVC節の禁止語だと誤検出する1件 |', '',
  'これらは計37件です。regex不一致だけで、同じ意味を持つ記述が他の場所にも全くないことまでは証明しません。例えば第14節には役割ごとの適合性やsession検証の概要が残ります。ただし、参照される第11節の定義と具体例が空であることは直接確認でき、文言の微調整だけで解決する状態ではありません。', '',
  '### vNextの追加を既存テストが数えていない', '',
  '残る1件は ' + link(testFile, 217) + ' の ' + inline('vnext_drafts_checked === 2') + ' です。' + link('scripts/check-release-docs.mjs', 29) + ' は、英中の白書2件に加え、英中のP4草案2件も検査して4件を返します。実際のvnext配下にもP4草案が存在します。同じテストの223–224行のディレクトリ期待にもこの2ファイルがなく、件数assertを通しても後段に未到達の不一致があります。', '',
  'この差は草案の実体とチェッカーが一致し、テスト期待が追加前の状態であることを示します。原文を削除して2件に戻す理由にはなりません。', '',
  '## 全38件の所在と期待・実際', '',
  '全件の所属は ' + inline(testFile) + '。defはテスト定義またはguardデータ行、assertは実際に停止した行です。原文所在は、vNext行を除いて英中ANP-05の785–788行（空の第11節）を参照してください。各行の詳しい英中期待regexと実値はJSONに保持しています。', '',
  '| ID | 失敗名 | test行（def／assert） | 期待と実際 |', '| --- | --- | --- | --- |',
  ...failures.map(failure => '| ' + failure.id + ' | ' + failure.name.replaceAll('|', '\\|') + ' | ' + failure.testDefinitionLine + '／' + failure.assertionLine + ' | ' + summaries[failure.category] + ' |'), '',
  'この38件の全入力は翻訳前後で同一で、japanese配下もexamples/three-agents-typescript配下もこれらのテストの読取対象ではありません。診断ハッシュも38件すべて基準と一致しています。', '',
  '## 独立スモーク検証', '',
  '| コマンド | 基準コミット | 現ブランチ | 意味 |', '| --- | --- | --- | --- |',
  '| node scripts/check-release-docs.mjs | PASS / errors[] / vNext 4件 | 同じ結果 | 定義済みの文書・境界ガードは通る。ただし空のVC節を完全性欠落として検知していない |',
  '| node scripts/check-anp02-vectors.mjs | PASS / 正例32・負例80・identity10 | 同じ結果 | オフラインfixtureの整合性・暗号バイト検査。OAuth/VC実装の動作検証ではない |', '',
  '| node scripts/generate-anp02-vectors.mjs | PASS / no files written | 同じ結果 | --writeなしの既定動作はメモリ内の決定的再生成と既存fixtureの比較。書込みモードは未実行 |', '',
  'generate-anp02-vectors.mjsの末尾を確認し、--writeなしではファイルを書き直さないことを確認したうえで、両checkoutで実行しました。API呼び出し、キー変更、上流文書修復、既存テスト修正、commit、pushはこの調査では行っていません。', '',
  '## 翻訳とは別に提案する修正', '',
  '1. ANP-05の編集責任者が第11節の対象範囲を確定し、現行草案に残す場合は、VC Profileが参照する本文、3種類の例、規範検証順と4 anchorを英中で整合させる。本版の範囲から外すなら、Profile広告・第14節・検証ガイドも合わせて明示的に改訂する。日本語訳だけに架空の規範を補わない。',
  '2. vNextの検査対象一覧を仕様・チェッカー・テストで照合し、P4草案を含む実際の4件とディレクトリ構造を検証するようテスト設計を更新する。単に失敗した数字を置換するのでなく、期待する文書集合を決定して検査する。',
  '3. 文書チェッカーに、広告済みProfileが参照する節の本文・例・anchorの欠落を検知する検査を検討する。テスト側もsliceの開始・終了anchorが実在することを先にassertし、欠落時のエラーを明確にする。',
  '4. 元の38件を個別の失敗証拠として残し、本文・期待の責任ある修正後に同じ比較を再実行する。現在のPASSスモークをVC完全性や実装適合性の証明に使わない。', '',
  '再生成：Git外に残した同名のbaseline/current TAP・スモークログがある状態で ' + inline('node scripts/compare-upstream-test-results.mjs') + ' を実行します。スクリプトは既存原文を読み取り、調査用MarkdownとJSONだけを書き出します。', '',
];
fs.writeFileSync(path.join(root, 'japanese/upstream-test-investigation.md'), lines.join('\n'));
console.log(JSON.stringify({ originalFiles: report.originalIntegrity.files, identicalFiles: report.originalIntegrity.identicalFiles,
  runPairs: runPairs.map(run => ({ mode: run.mode, failedNamesEqual: run.failedNamesEqual, perFailureDiagnosticsEqual: run.perFailureDiagnosticsEqual })),
  categories, all38PreexistInBase: report.interpretation.all38PreexistInBase }, null, 2));
if (!report.interpretation.all38PreexistInBase || failures.length !== 38) process.exitCode = 1;
