# TypeScript会話デモの表示・診断文

対象は今回追加した[デモ](../../../examples/three-agents-typescript/README.md)の`src/demo.ts`、`src/openai.ts`、`src/network.ts`とテスト名です。元の表示文やwireエラーコードは変更せず、日本語の意味を対応付けています。モデルへの人格指示と会話本文はすでに日本語です。

## 実行時の表示

| 原文の表示 | 日本語 |
| --- | --- |
| Mode: scripted-no-model-api. Real localhost HTTPS + ANP envelopes; no model requests. | 模擬会話モード。localhostのHTTPSとANPエンベロープは実通信し、モデル要求は行いません。 |
| Mode: live-openai-responses. Model …; up to … billed requests; at most 256 output tokens per request. | 実モデルモード。指定モデルを使い、表示回数までの有料要求を行います。各要求の出力上限は256トークンです。 |
| Verified: … agents received … messages each. | 検証済み: 表示された数のAgentが、それぞれ同じ件数のメッセージを受信しました。 |
| Public wire evidence: … (API credentials and ephemeral private keys are never written). | 公開可能なwire記録の保存先を示します。API資格情報と一時的な秘密鍵は書き込みません。 |
| modelUsage | モデルの使用記録。JSONのキー、モデル名、応答ID、トークン数は機械可読の原表記を保持します。 |

`[seq] name (personality): text`は「イベント番号、名前、人格、発言」の順です。`scripted-no-model-api`と`live-openai-responses`はモードの識別子なので、置き換えません。

## モデル接続・引数の診断

| 原文 | 日本語 |
| --- | --- |
| --env-file requires explicit --model mode | `--env-file`には明示的な`--model`モード指定が必要です。 |
| Existing OPENAI_API_KEY was not found; no model request was sent | 既存の`OPENAI_API_KEY`が見つからず、モデル要求は送っていません。 |
| Existing OPENAI_API_KEY is required | 既存の`OPENAI_API_KEY`が必要です。 |
| Invalid model name | モデル名が不正です。 |
| The nine-request model budget has been reached | モデル要求の上限である9回に達しました。 |
| The model input budget has been reached | モデル入力の上限に達しました。 |
| OpenAI network request failed; no automatic retry was made | OpenAIへのネットワーク要求に失敗しました。自動再試行はしていません。 |
| OpenAI request failed with HTTP …; no automatic retry was made | OpenAI要求が表示されたHTTP状態で失敗しました。自動再試行はしていません。 |
| OpenAI returned invalid JSON | OpenAIの応答が有効なJSONではありません。 |
| OpenAI response was incomplete or contained no text; no automatic retry was made | OpenAI応答が未完了か、本文を含みません。自動再試行はしていません。 |
| OpenAI text exceeded the ANP demo message limit | モデルの文章がANPデモのメッセージ上限を超えました。 |
| Rounds must be an integer from 1 to 3 | 巡回数は1から3までの整数で指定してください。 |

モデルキーは承認済みの既存ファイルまたはプロセス環境から読むだけで、別ファイルへコピーしたり表示したりしません。各要求はそのAgentが独立してANP受信箱で受け取った履歴だけを使います。APIの生エラー本文は資格情報の断片を含む場合があるため、ログへ出しません。これらは`openai.ts`のコメントの日本語対応です。

## ANP・HTTPSの診断

| 原文 | 日本語 |
| --- | --- |
| Invalid request | 不正な要求です。 |
| Internal error | 内部エラーです。 |
| Origin is outside the local demo allowlist | 接続先originが、このローカルデモの許可リストにありません。 |
| HTTP … | HTTP状態コード。番号は原表記を保持します。 |
| Response id mismatch | 応答IDが要求に一致しません。 |
| Result is missing | 応答にresultがありません。 |
| Invalid DID binding | DIDの結合が不正です。 |
| Method not found | メソッドが見つかりません。 |
| Message service identity missing | メッセージサービスのidentityがありません。 |
| Missing TCP address | TCPアドレスを取得できません。 |
| Parse error | 解析エラーです。 |
| Control operations require id | 制御操作にはidが必要です。 |
| Missing origin proof | origin proofがありません。 |
| Unsupported signature input | 対応していない署名入力です。 |
| Expired or invalid proof window | proofの有効期間が期限切れか不正です。 |
| Invalid proof label or nonce | proofのラベルまたはnonceが不正です。 |
| Nonce replay | nonceの再利用です。 |
| This demo hosts one group | このデモがホストするグループは一つだけです。 |
| This demo accepts member-send transport-protected groups only | このデモは、memberが送信でき、transport-protectedを使うグループだけを受け入れます。 |
| Only member initial roles are implemented | 初期roleはmemberだけを実装しています。 |
| Message endpoint missing | メッセージのエンドポイントがありません。 |
| P4 v2 missing | P4 v2が提供されていません。 |

`anp.*`、`group.*`のエラー識別子や数値コードはプロトコル値であり、日本語へ置き換えません。証明書・ホスト名検証を無効にしないテスト専用の信頼ルートを使うこと、E1 identity生成後に判明する自己参照`serviceDid`を含めて文書の自己証明を再署名することも、`network.ts`のコメントに対応する説明です。

## テスト名の意味

1. `serviceDid`が有効なE1自己証明で保護され、`group.create`の対象を固定する。
2. 3人格が実際のHTTPS/P4通信で9メッセージを交換し、同じ順序で受け取る。
3. 本文改ざん、別送信者への差替え、期限切れproofを署名検証で拒否する。
4. 冪等な再送には同じ受理結果を返し、操作ID衝突とnonce再利用を拒否する。
5. 同時送信されたメッセージに一意で順序付けられた番号を割り当て、状態版を維持する。
6. P1の検査でbatch、数値ID、v1 Profile、非memberの送信を拒否する。
7. HTTPS証明書の検証を有効にし、許可していない接続先を拒否する。
8. fakeのResponses APIに別々の人格と各AgentのANP受信履歴だけを渡し、ANP通信自体は実際に行う。
9. モデル失敗時には安全な状態情報だけを公開し、再試行も生エラー本文の返却もしない。
10. 空または未完のモデル応答では停止し、有料要求を自動再試行しない。

8〜10はfake応答のテストであり、実モデル9要求の実行証拠とは別です。
