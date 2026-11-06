# 日本語訳と3エージェント会話の作業記録

上流は[AgentNetworkProtocol](https://github.com/agent-network-protocol/AgentNetworkProtocol)、forkは[meganetaaan/AgentNetworkProtocol](https://github.com/meganetaaan/AgentNetworkProtocol)、作業ブランチは`docs/ja-anp-three-agents`です。基準は`0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`。既存forkがないことを確認して作成しました。PR・マージ・上流への書込みは行っていません。

## 翻訳範囲

全498ファイルを棚卸ししています。原文498ファイルを保持し、232 Markdownを`japanese/<元のパス>`へ、266非Markdownの文章を対訳・ラベル表へ収録しました。英中の異なる版、現行仕様、vNext、deprecated、歴史的な記事をそれぞれ保持しています。

最終結果は全232件の全文校閲完了、部分校閲・未校閲0件です。[翻訳台帳](translation-inventory.json)と[検証結果](verification-results.json)、全498ファイルのSHAと対訳先を示す[全体検証](corpus-verification.json)に記録しています。初回公開時の52件の全文訳、17件の部分校閲、163件の未校閲機械訳から、全文照合と用語校閲を完了しました。各文書先頭と[校閲記録](translation-review.md)に範囲と根拠があります。エージェントによる照合であり、人間の専門翻訳者による監修ではありません。

[非Markdown補足](assets/README.md)は画像212パス／209画像、PDF4件75ページ、PPTX2件24スライド、コード・データ39件、保存HTML1件、拡張子のない記事3件、Mermaid2件、文字図1件、LICENSE、設定1件を対象とします。実行コードや署名対象例を書き換えず、コード内の説明文・表示文字も別資料に訳しました。元のコードフェンス1338個を保持し、人向け文章2782項目とプレーンな説明ブロック76種を補足しています。

画像の可読文章は全件照合しました。空SVG、元図で切れた文章、写真の遮蔽や極小文字は推測しません。画像8種の技術コード完全転記は未確認で、原画素を正とします。PDF/PPTXは99単位の抽出本文と発表者ノートを訳し、図内の可読文章を補いました。ネイティブPowerPoint描画と独立した二次校閲の有無は[資料台帳](assets/documents-inventory.json)に分けて記録しています。

## 翻訳と検証の方法

初期の機械訳は公開Google翻訳経路を一部使用し、HTTP 429で停止後、Argos配布モデルをCTranslate2でローカル実行しました。その後に原文を読み、否定・規範強度・数値・用語・参照を段落単位で補正しています。モデルAPIを翻訳処理へ追加呼出ししていません。

ローカルモデルは英日`translate-en_ja-1_1`（アーカイブSHA-256 `16300cc4eaa85320520cabcf433b63d01be40ef6966251de72043a083408f716`）と中英`translate-zh_en-1_9`（`62e7af5a3a48b530e47b7b3e5c78c2de79073ecd815750d2bf3ab35b4a67da2d`）です。配布元は[Argos公式索引](https://github.com/argosopentech/argospm-index/blob/main/index.json)。環境・モデル・初期機械訳キャッシュはGitへ含めません。`scripts/local-ja-translation.py`と`scripts/translate-ja.mjs`は初期訳の補助であり、現在の校閲済み文章を自動生成するものではありません。

```sh
node scripts/check-ja-translations.mjs
node scripts/check-ja-historical-example.mjs
node scripts/check-ja-links.mjs
node scripts/restore-ja-case-ids.mjs --check
node scripts/check-ja-corpus.mjs
node --test --test-isolation=none tests/check-ja-links.test.mjs tests/repair-ja-links.test.mjs tests/restore-ja-case-ids.test.mjs tests/quoted-example-preservation.test.mjs
```

これらは原文保全・コード例・インライン識別子・規範キーワード・安定したAUTHZ番号136件・ローカルリンクを調べます。意味の正確さは別途原文照合を要します。旧中国語メッセージ仕様1件の壊れたフェンスだけは既存の例外で、6 JSON例と2 Python例の内容一致を別検証します。元から壊れているリンクは新規破損と分けて報告します。

## 会話デモ

[TypeScriptデモ](../examples/three-agents-typescript/README.md)はRoundtableを使用しません。公式`@awiki/anp-typescript-sdk@0.9.5`のE1 DID・署名機能を使用し、localhostの4 HTTPSエンドポイントでDID公開・取得、P1 JSON-RPC、署名付き`group.create`／`group.send`、`group.incoming`を実送受信します。SDKの高水準IMは現行P4 v2と異なるため、対応範囲を限定したHostとクライアントを実装しました。完全なP4適合・外部実装との相互運用を主張しません。

人格は発想家「ひかり」、検証者「まこと」、調整役「なごみ」です。通常の`npm run demo`は固定台詞による無料のscripted実行。明示的な`--model`では、各体の人格指示と、その体がANPで実受信した履歴をOpenAI Responses APIへ渡します。発話順の決定と文章生成はアプリケーションの役割です。音声出力・物理的な音声排他は実装していません。

ユーザーが既存キーの流用を承認した後、既存envからメモリ内へ読み、実モデル`gpt-5.6-terra`で一度実行しました。9 API要求で9発言を生成し、9送信・27通知・各体9件の受信内容と順序が一致しました。使用量は入力5,011／出力710 tokens。通常単価による推計$0.018542で、請求確定額ではありません。キーを表示・新規保存・コピーせず、公開サンプルにキーや秘密鍵がないことも確認しています。

型チェックと10テストは成功しました。うち3件はAPI境界をfake応答で検証するテストで、実API呼出しと区別しています。[実行記録](../examples/three-agents-typescript/verification.md)、[実モデルの会話](../examples/three-agents-typescript/sample-live-conversation.json)を参照してください。追加の有料反復実行は行っていません。

## 上流検証

上流のリリース文書チェック・ANP-02ベクトルチェック・ベクトル生成の既存fixture照合は成功します。既存131テストは93成功・38失敗で、基準と作業側の失敗名・正規化診断が全件一致しました。

37件は基準のANP-05第11節にVC要件・例がないことなど、1件はvNext文書数を2件とする古いテスト期待が原因です。元の498ファイルはバイト単位でも一致しており、この作業で仕様やテスト期待を書き換えて通していません。[原因と比較記録](upstream-test-investigation.md)に証拠があります。

環境はWindows、Node.js 24.19.0です。参照先の外部`awiki-harness`は存在せず、ローカル仕様・既存CI相当・追加テストで検証しました。製品E2Eや外部ネットワーク適合の受入証拠はありません。sandboxの子プロセス制限`spawn EPERM`は非隔離テストまたは許可された通常実行で解消しており、自動承認レビューの拒否ではありません。
