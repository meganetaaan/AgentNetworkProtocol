# 検証記録

検証日：2026-11-06。Windows PowerShell、Node.js v24.19.0、npm 11.17.0。

| コマンド | 結果 |
| --- | --- |
| `npm.cmd install --ignore-scripts --no-audit --no-fund` | 成功。32パッケージを導入。`package-lock.json`生成 |
| `npm.cmd run typecheck` | 成功。TypeScriptエラーなし |
| `npm.cmd test` | 成功。10テスト、10成功、0失敗。うち3件のモデルAPI応答はfakeで、実API検証とは区別 |
| `npm.cmd run demo` | scripted成功。3人格で9発言、全3体が各9メッセージを同じ順序で受信。API呼出しなし |
| `npm.cmd run demo -- --model gpt-5.6-terra --env-file <既存envファイル>` | live成功。実モデル9要求で9発言、全3体の受信内容と順序が一致 |

最終ネットワークテストの内容：

```text
PASS serviceDid is covered by valid E1 self-proofs and anchors group.create target
PASS three personalities exchange nine actual HTTPS/P4 messages in the same order
PASS signature rejects altered payload, another sender, and expired proof
PASS idempotent retry returns the same acceptance; conflicting operation and nonce reuse fail
PASS concurrent accepted messages get unique ordered sequences and preserve state version
PASS P1 validation rejects batches, numeric ids, v1 profile, and non-member send
PASS HTTPS certificate verification is enabled and arbitrary origins are refused
PASS mocked Responses API gets distinct personas and only each agent ANP inbox, while actual ANP transport is preserved
PASS model failure exposes safe status only and never retries or returns raw error bodies
PASS empty or incomplete model response stops without an automatic paid retry
tests 10 / pass 10 / fail 0
```

デモの実際のwire記録は`artifacts/transcript.json`に生成され、今回の実行では181記録、255,185 bytesでした。内訳には9回の`group.send`、27回の`group.incoming`、DIDの実HTTPS取得、要求応答を含みます。グループ作成のイベント番号は`1`、9発言の番号は`2`〜`10`、状態バージョンは`1`です。時刻や署名鍵の更新により次の実行の記録サイズは変わり得ます。秘密鍵はこの記録に含まれません。

最初の`node --test`は実行環境の子プロセス起動制限により`spawn EPERM`になりました。テスト内容は実行されていません。その後`--test-isolation=none`を指定し、テストの実行と成功を確認しました。自動承認レビューによる拒否ではありません。

レビューでHostの`ANPMessageService.serviceDid`が未指定だった点を修正しました。主体DIDをサービスに明示し、変更後のDocumentを公式SDKで再署名します。追加テストは全4エンドポイントのHTTPS解決・E1自己証明の有効性、`group.create`の対象との一致、異なるサービスDIDを対象にした要求の拒否を確認します。

## 実モデルの検証結果

ユーザーが既存キーの再利用を明示承認した後、既存envファイルからキーをメモリ内へ読み込んで実行しました。キーの新規作成・保存・コピー・出力は行っていません。scriptedモードは引き続きモデル呼出し0回です。

| 項目 | live実行の結果 |
| --- | --- |
| 接続 | OpenAI Responses API、`https://api.openai.com/v1/responses` |
| モデル | `gpt-5.6-terra`（各応答のmodelでも確認） |
| 実モデル要求 | 9回成功、失敗・再試行なし |
| 会話 | 独立した人格指示と各AgentがANPで受け取った履歴から3体×3巡、9発言を生成 |
| 入力 / 出力 | 5,011 / 710 tokens |
| 出力制限 | 1要求あたり最大256 tokens、reasoning effortはnone |
| 料金推計 | $0.018542。公開された通常入力$2/百万tokens、出力$12/百万tokensで計算。請求確定額ではなく、キャッシュ等による差があり得る |
| ANP | `group.send` 9回、`group.incoming` 27回、全3体が各9発言を同順・同内容で受信 |
| 状態 | イベント番号2〜10、メッセージ送信による状態バージョン変更なし |
| 記録 | `artifacts/live-transcript.json`。181 wire記録、263,137 bytes。認証ヘッダーは収録しない |

実モデルの会話は、発想家の役割分担案に対して検証者が比較条件を提案し、調整役が利用者の負担を減らす案を加え、最後に小規模実験へまとめる流れになりました。これは一回の実行例で、人格一貫性や会話品質の一般的な評価を保証するものではありません。発言順は依然としてアプリケーションのループが決めます。

公開用の抜粋[sample-live-conversation.json](sample-live-conversation.json)には会話、API応答ID、モデルとtoken使用量、配信一致の検証結果を収録しました。秘密鍵・APIキー・ローカルのキー保存先は含めていません。生成したlive記録・サンプル・実装ファイルについて、実キーの文字列と秘密鍵のPEM開始行が含まれないことも値を表示せず確認しました。

仕様確認と単価の根拠はOpenAI公式の[テキスト生成](https://developers.openai.com/api/docs/guides/text)、[会話状態](https://developers.openai.com/api/docs/guides/conversation-state)、[gpt-5.6-terraモデル](https://developers.openai.com/api/docs/models/gpt-5.6-terra)です。確認日は2026-11-06です。

この検証はlocalhost上の教育用サブセットを対象としています。公開ネットワーク、異なる実装との接続、P4全必須メソッド、E2EE、永続化、障害復旧、音声再生、物理的な音声の重なりは検証対象外です。外部`awiki-harness`がチェックアウトにないため、その製品受入証拠もありません。制限の詳細は[README](README.md#機能範囲と制限)を参照してください。
