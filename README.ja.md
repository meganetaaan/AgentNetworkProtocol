# ANPを日本語で学ぶ

このブランチは、[AgentNetworkProtocol](https://github.com/agent-network-protocol/AgentNetworkProtocol)の日本語参考訳と、Roundtableを使用しないTypeScript製3エージェント会話デモを追加します。

- [日本語README](japanese/README.md)
- [入門ガイド](japanese/docs/anp-getting-started-guide.md)
- [P1/P4の読み方と会話デモの位置づけ](japanese/reading-guide.md)
- [メッセージング仕様の索引](japanese/message/README.md)
- [3人格の会話デモ・実行方法](examples/three-agents-typescript/README.md)
- [翻訳・検証の作業記録](japanese/work-report.md)
- [全件の翻訳棚卸し](japanese/translation-inventory.json)
- [P1/P4の部分校閲範囲と限界](japanese/translation-review.md)

## 翻訳の範囲と読み方

基準は上流コミット`0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`です。基準に含まれる全232件のMarkdown（大文字`.MD`、英語・中国語、ブログ・研究メモ・旧仕様を含む）を、`japanese/`以下に元と同じパスで収録しています。原文ファイルは変更していません。

全件を人手校閲したものではありません。冒頭に「機械翻訳・未校閲」と記したページと、エージェントが全文翻訳・確認したページがあります。個別の生成方法と検査結果は棚卸しJSONで確認できます。機械訳は不自然な文章や意味の誤りが残り得るため、仕様を実装するときは原文を照合してください。コード、識別子、URL、規範キーワードは原文を保持する方針です。

`japanese/`自体は翻訳資料の置き場で、実行コードではありません。画像・PDF・図の中の文字、コード・テスト・JSON/YAMLデータ、ライセンス原文は書き換えていません。これらの全ファイルも棚卸しに保持対象として列挙しています。コードフェンス内の説明・Mermaid図のラベルも、例を壊さないため原文のままです。

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

Node.js 24以上が必要です。会話本文は固定台詞と直前の発言を参照するローカルルールで作ります。実モデルによる自律会話ではなく、モデルAPIも呼びません。ANPが会話内容や発言順を決めているわけでもありません。音声出力は含みません。

SDKの高水準グループAPIは現行P4 v2に一致しないため、公式SDKの認証・署名プリミティブを使い、限定的なHostとクライアントを追加実装しています。P4 v2の完全適合や外部実装との相互運用を主張しません。対応範囲・未対応機能・実行証跡はデモのREADMEに記載しています。
