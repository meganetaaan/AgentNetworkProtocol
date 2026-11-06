# 上流既存テスト38失敗の調査

調査日：2026-11-06。比較対象は翻訳前の基準コミット `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066` と、調査開始時のブランチHEAD `11c5214f2854aa3d0681784cce1d6a99e1ef95f8`。原文、既存テスト、既存スクリプトは一切変更していません。

**同じ条件で両方とも131件中93成功・38失敗となり、38件すべての失敗名と診断内容が一致しました。** 基準スナップショットの全498ファイルは現在の対応ファイルと生バイト・SHA-256が同一です。日本語版や3体会話デモによる回帰は、この3テストの比較では検出されませんでした。

機械可読な全件証拠は [upstream-test-investigation.json](reviews/upstream-test-investigation.json)。各失敗の期待pattern、実値、test/assert行、原文所在、診断ハッシュ、および全原文ファイルの対照ハッシュを含みます。全文TAPは大きいためGit外の作業フォルダーに保持し、公開レポートには複製しません。

## 比較方法

未存在を確認した `../upstream-test-baseline` に `git archive` のZIPを展開しました。Node.js v24.19.0 / Windows、テストの実行順とオプションをそろえています。

```sh
node --test --test-isolation=none --test-reporter=tap tests/release-doc-entrypoints.test.mjs tests/did-oauth-draft.test.mjs tests/update_contributors.test.js
```

| 条件 | 基準コミット | 現ブランチ | 失敗名・診断の一致 |
| --- | --- | --- | --- |
| sandbox | 131件／成功93／失敗38 | 131件／成功93／失敗38 | 38件すべて一致 |
| child-process-enabled | 131件／成功93／失敗38 | 131件／成功93／失敗38 | 38件すべて一致 |

診断の比較では、各checkoutの絶対パスを同じ印に置換し、duration_msだけを除きました。期待値、実際の値、エラー、assertの位置、スタックは比較対象に残しています。sandbox実行では1件が子プロセスの `spawn EPERM` で止まるため、同じ2回の試験を子プロセス許可下でも実施しました。そのときも38件で、環境エラーに隠れていた `4 !== 2` の期待不一致を確認しています。

## 原因

### ANP-05のVC節が空になっている

英語版 [05-anp-did-authorization-protocol-specification.md:785](../05-anp-did-authorization-protocol-specification.md) と中国語版 [chinese/05-ANP-基于DID的授权协议.md:785](../chinese/05-ANP-基于DID的授权协议.md) は、どちらも次の構造です。第11節には規範の段落も例もありません。

```text
<a id="vc-authorization"></a>
## 11. VC-based authorization

## 12. Errors
```

一方、原文第14節（英中とも830行付近）は、存在しない11.3、11.4、11.6の出示・検証順・holder binding・session規則に依存した適合性条件を残しています。先頭の草案版はv0.7のままで、VC Profileも広告されています。これは翻訳の欠落ではなく、基準コミットの英中原文自体の不整合です。第11節を本版から意図的に除外したのか、本文の欠落なのかという編集意図までは推測しません。

| 直接観測した差 | テストへの影響 |
| --- | --- |
| anchor数は27期待に対して23。vc-oauth-composition、vc-direct-presentation、vc-organization-agents、errorsが不在 | 構造同期テスト1件が最初のassertで停止 |
| ANPPresentationRequest、VerifiablePresentation、ANPAgentRoleCredentialのJSON例がすべて不在 | 5件がpresentation.verifiableCredentialのTypeErrorで停止。5種類の暗号実装が壊れた意味ではない |
| VC規範文を要求する30種類の逐語patternが原文と一致しない | 権限・失効・holder・challenge・sessionなどの文書回帰テスト30件が失敗 |
| errors anchorがないのでindexOf()が-1になる | slice(start,-1)が第12〜16節まで含み、881行の将来拡張のclient_idをVC節の禁止語だと誤検出する1件 |

これらは計37件です。regex不一致だけで、同じ意味を持つ記述が他の場所にも全くないことまでは証明しません。例えば第14節には役割ごとの適合性やsession検証の概要が残ります。ただし、参照される第11節の定義と具体例が空であることは直接確認でき、文言の微調整だけで解決する状態ではありません。

### vNextの追加を既存テストが数えていない

残る1件は [tests/did-oauth-draft.test.mjs:217](../tests/did-oauth-draft.test.mjs) の `vnext_drafts_checked === 2` です。[scripts/check-release-docs.mjs:29](../scripts/check-release-docs.mjs) は、英中の白書2件に加え、英中のP4草案2件も検査して4件を返します。実際のvnext配下にもP4草案が存在します。同じテストの223–224行のディレクトリ期待にもこの2ファイルがなく、件数assertを通しても後段に未到達の不一致があります。

この差は草案の実体とチェッカーが一致し、テスト期待が追加前の状態であることを示します。原文を削除して2件に戻す理由にはなりません。

## 全38件の所在と期待・実際

全件の所属は `tests/did-oauth-draft.test.mjs`。defはテスト定義またはguardデータ行、assertは実際に停止した行です。原文所在は、vNext行を除いて英中ANP-05の785–788行（空の第11節）を参照してください。各行の詳しい英中期待regexと実値はJSONに保持しています。

| ID | 失敗名 | test行（def／assert） | 期待と実際 |
| --- | --- | --- | --- |
| 3 | bilingual sections, explicit anchors and wire examples stay synchronized | 57／58 | anchor 27を期待／23。第11節本文と4 anchorが欠落 |
| 12 | release checker validates authorization and white paper drafts without redundant snapshots | 209／217 | vNext 2件を期待／4件。P4英中の追加をテストが未反映 |
| 62 | VC delegation credential example follows the Section 11.2 shape | 621／623 | VC/VPのJSON例を期待／selectorがundefinedで参照失敗 |
| 63 | VC presentation binds holder and subject to the direct presentation transaction | 648／651 | VC/VPのJSON例を期待／selectorがundefinedで参照失敗 |
| 64 | v0.6 removes VC exchange wire fields and keeps RFC 8693 informative | 666／675 | errorsで節を切る期待／anchor不在で16節まで誤読 |
| 65 | VC direct presentation request carries a fresh challenge and a covered permission | 682／684 | VC/VPのJSON例を期待／selectorがundefinedで参照失敗 |
| 66 | examples distinguish supported role credentials from the type requested in this transaction | 701／704 | VC/VPのJSON例を期待／selectorがundefinedで参照失敗 |
| 67 | organization role credential authorizes by action URI, not by resource or role name | 712／714 | VC/VPのJSON例を期待／selectorがundefinedで参照失敗 |
| 68 | VC requirement and deletion regression: a role name alone is never authority | 738／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 69 | VC requirement and deletion regression: unmapped role actions fail closed | 741／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 70 | VC requirement and deletion regression: role credentials cannot create rights the issuer does not hold | 744／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 71 | VC requirement and deletion regression: role-credential issuers must be confirmed as the organization acting as principal | 747／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 74 | VC requirement and deletion regression: self-issued delegation is invalid | 756／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 75 | VC requirement and deletion regression: unknown constraints fail closed | 759／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 76 | VC requirement and deletion regression: unavailable status fails closed | 762／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 77 | VC requirement and deletion regression: issuer authority is confirmed by the verifier, not by the credential | 765／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 78 | VC requirement and deletion regression: status lists must carry and satisfy validUntil | 768／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 79 | VC requirement and deletion regression: issuing authority cannot be derived from credentials the issuer holds | 771／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 80 | VC requirement and deletion regression: challenges are consumed only after holder binding | 774／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 81 | VC requirement and deletion regression: the Agent signs only for the verifier it is dealing with | 777／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 82 | VC requirement and deletion regression: direct presentation is bound to the stored transaction | 780／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 83 | VC requirement and deletion regression: a single-operation presentation cannot become a session | 783／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 84 | VC requirement and deletion regression: amount limits never guess the amount or convert currency | 786／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 85 | VC requirement and deletion regression: attached credentials are not holder-bound and grant no authority | 789／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 86 | VC requirement and deletion regression: VC conformance applies by role rather than to all of Section 11 | 792／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 88 | VC requirement and deletion regression: the presentation request advertises the exact supported VC profile | 798／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 89 | VC requirement and deletion regression: unsupported presentation profiles cannot be silently downgraded | 801／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 90 | VC requirement and deletion regression: the verifier generates and stores the presentation challenge | 804／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 91 | VC requirement and deletion regression: holder identity is bound to the carrying transport authentication | 807／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 94 | VC requirement and deletion regression: direct presentation cannot bypass an OAuth interface | 816／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 96 | VC requirement and deletion regression: the authorization type must be accepted by the stored presentation transaction | 822／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 97 | VC requirement and deletion regression: a different supported credential type cannot substitute for the requested type | 825／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 98 | VC requirement and deletion regression: accepted credential types are retained with the challenge | 828／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 99 | VC requirement and deletion regression: sessions retain the accepted entries and per-entry constraints | 831／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 100 | VC requirement and deletion regression: every subsequent session request authenticates its bound holder | 834／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 101 | VC requirement and deletion regression: session authorization rechecks dynamic parameters on every operation | 837／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 102 | VC requirement and deletion regression: sessions have fixed finite lifetimes and renew only through a fresh presentation | 840／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |
| 103 | VC requirement and deletion regression: personal data access requires an independently confirmed resource-side basis | 843／850 | 指定のVC規範文を期待／英中の逐語patternが不一致 |

この38件の全入力は翻訳前後で同一で、japanese配下もexamples/three-agents-typescript配下もこれらのテストの読取対象ではありません。診断ハッシュも38件すべて基準と一致しています。

## 独立スモーク検証

| コマンド | 基準コミット | 現ブランチ | 意味 |
| --- | --- | --- | --- |
| node scripts/check-release-docs.mjs | PASS / errors[] / vNext 4件 | 同じ結果 | 定義済みの文書・境界ガードは通る。ただし空のVC節を完全性欠落として検知していない |
| node scripts/check-anp02-vectors.mjs | PASS / 正例32・負例80・identity10 | 同じ結果 | オフラインfixtureの整合性・暗号バイト検査。OAuth/VC実装の動作検証ではない |

| node scripts/generate-anp02-vectors.mjs | PASS / no files written | 同じ結果 | --writeなしの既定動作はメモリ内の決定的再生成と既存fixtureの比較。書込みモードは未実行 |

generate-anp02-vectors.mjsの末尾を確認し、--writeなしではファイルを書き直さないことを確認したうえで、両checkoutで実行しました。API呼び出し、キー変更、上流文書修復、既存テスト修正、commit、pushはこの調査では行っていません。

## 翻訳とは別に提案する修正

1. ANP-05の編集責任者が第11節の対象範囲を確定し、現行草案に残す場合は、VC Profileが参照する本文、3種類の例、規範検証順と4 anchorを英中で整合させる。本版の範囲から外すなら、Profile広告・第14節・検証ガイドも合わせて明示的に改訂する。日本語訳だけに架空の規範を補わない。
2. vNextの検査対象一覧を仕様・チェッカー・テストで照合し、P4草案を含む実際の4件とディレクトリ構造を検証するようテスト設計を更新する。単に失敗した数字を置換するのでなく、期待する文書集合を決定して検査する。
3. 文書チェッカーに、広告済みProfileが参照する節の本文・例・anchorの欠落を検知する検査を検討する。テスト側もsliceの開始・終了anchorが実在することを先にassertし、欠落時のエラーを明確にする。
4. 元の38件を個別の失敗証拠として残し、本文・期待の責任ある修正後に同じ比較を再実行する。現在のPASSスモークをVC完全性や実装適合性の証明に使わない。

再生成：Git外に残した同名のbaseline/current TAP・スモークログがある状態で `node scripts/compare-upstream-test-results.mjs` を実行します。スクリプトは既存原文を読み取り、調査用MarkdownとJSONだけを書き出します。
