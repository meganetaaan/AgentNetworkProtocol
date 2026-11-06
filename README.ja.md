# ANPを日本語で学ぶ

このブランチは、[AgentNetworkProtocol](https://github.com/agent-network-protocol/AgentNetworkProtocol)の日本語参考訳と、Roundtableを使用しないTypeScript製3エージェント会話デモを追加します。

- [日本語README](japanese/README.md)
- [入門ガイド](japanese/docs/anp-getting-started-guide.md)
- [P1/P4の読み方と会話デモの位置づけ](japanese/reading-guide.md)
- [メッセージング仕様の索引](japanese/message/README.md)
- [3人格の会話デモ・実行方法](examples/three-agents-typescript/README.md)
- [翻訳・検証の作業記録](japanese/work-report.md)
- [全件の翻訳棚卸し](japanese/translation-inventory.json)
- [原文照合・用語校閲の記録](japanese/translation-review.md)
- [全498ファイルの保全・対訳先検証](japanese/corpus-verification.json)
- [画像・PDF・スライド・コード内文章の日本語補足](japanese/assets/README.md)
- [上流テスト38件の失敗原因と比較検証](japanese/upstream-test-investigation.md)

## 翻訳の範囲と読み方

基準は上流コミット`0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`です。基準に含まれる全232件のMarkdown（大文字`.MD`、英語・中国語、ブログ・研究メモ・旧仕様を含む）を、`japanese/`以下に元と同じパスで収録しています。原文ファイルは変更していません。

全232文書について、初期の機械訳も含めて原文を全文照合し、日本語と用語を校閲しました。各文書冒頭と翻訳台帳に記録しています。エージェントによる校閲であり、人間の専門翻訳者による監修ではありません。仕様を実装するときは原文も照合してください。コード、識別子、URL、規範キーワードは保持しています。

画像・PDF・スライド・図、コード・テスト・JSON/YAML・LICENSEも全件棚卸しし、文章を[日本語の対訳資料](japanese/assets/README.md)に補っています。原本や実行例を保持し、コメント・表示文・プロンプト・Mermaidラベルも別資料で訳しています。元から空・切れ・不可読の文字と、ネイティブPowerPoint描画などの未確認範囲は台帳に明記しています。

Released、Draft、candidate、deprecatedの区別と元の版番号は、訳でも保持します。歴史資料の古い方式や主張を、現在の推奨と読み替えないでください。見出しの翻訳によってアンカーが変わるため、節へのリンクは必要に応じて原文の該当節へ案内します。

## 3体の会話

「ひかり（発想家）」「まこと（検証者）」「なごみ（調整役）」が話します。Group Hostと3体はそれぞれlocalhost HTTPSで待ち受け、DID解決と公式SDKによるOrigin Proofの生成・検証を行います。ANPの`group.create`、`group.send`、`group.incoming`を実際に送受信します。

```sh
cd examples/three-agents-typescript
npm ci --ignore-scripts --no-audit --no-fund
npm run typecheck
npm test
npm run demo
```

Node.js 24以上が必要です。既定の会話本文は固定台詞と直前の発言を参照するローカルルールで作り、モデルAPIを呼びません。`--model gpt-5.6-terra`を指定すると、既存のOpenAI APIキーで各Agentの人格指示とANP受信履歴から発言を生成します。この実モデルモードでも9発言・全3体の受信一致を検証しました。APIの利用料金が発生し、キーそのものを引数へ渡してはいけません。具体的な安全な実行方法はデモREADMEを参照してください。会話内容の生成と発言順の決定は、ANPとは別のアプリケーション処理です。音声出力は含みません。

SDKの高水準グループAPIは現行P4 v2に一致しないため、公式SDKの認証・署名プリミティブを使い、限定的なHostとクライアントを追加実装しています。P4 v2の完全適合や外部実装との相互運用を主張しません。対応範囲・未対応機能・実行証跡はデモのREADMEに記載しています。
