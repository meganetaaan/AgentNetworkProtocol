# 原文との照合・用語校閲

基準は`0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`です。初期の機械訳を原文の段落・表・見出しと照合し、全文を読んだ文書だけを`full`と記録します。現在の全体件数と未完一覧は[翻訳台帳](translation-inventory.json)を参照してください。

担当別の記録には対象パス、原文の行範囲、完了範囲、修正理由、コード・識別子の検証を収録しています。[統合校閲索引](reviews/review-index.json)で、各文書の現在の状態から根拠となる担当台帳へ進めます。

- [英語の現行仕様・vNext](reviews/core-review.json)
- [P5・P6・P8・P9の現行英語仕様](reviews/messaging-overlays-review.json)
- [中国語仕様・ガイド](reviews/chinese-review.json)
- [中国語の旧仕様](reviews/chinese-deprecated-review.json)
- [中国語の旧P1・P4](reviews/core-deprecated-review.json)
- [中国語の現行名前空間・認可仕様](reviews/core-chinese-review.json)
- [中国語vNext白書・P4](reviews/chinese-vnext-review.json)
- [旧P5の英中両版](reviews/deprecated-p5-review.json)
- [中国語の研究・参考資料](reviews/chinese-assets-review.json)
- [入門・ANP-05検証・運営・付録・決済草案の追加校閲](reviews/root-guides-review.json)
- [決済草案の独立した追加意味レビュー](reviews/payment-independent-review.json)
- [中国語現行白書の独立した追加意味レビュー](reviews/whitepaper-independent-review.json)
- [ブログと拡張子のない記事](reviews/blogs-review.json)
- [旧仕様・標準化資料・管理文書](reviews/history-review.json)
- [画像の照合範囲](assets/images/review-handoff.md)
- [PDF・PPTXの本文と図の確認](assets/documents-inventory.json)

`full`は担当エージェントが原文の全文を照合したという作業記録です。初期にエージェントが全文訳した52文書も全体台帳では全文扱いです。人間の専門翻訳者による独立した監修、暗号学的安全性、規範への完全適合を意味しません。移管元台帳には古い状態が残る場合があり、担当先と文書先頭の最終状態を優先します。

担当台帳の訳文SHAは校閲時点のスナップショットです。追加レビューと日本語資料のLF改行統一後の最終SHAは[翻訳台帳](translation-inventory.json)と統合校閲索引を正とします。原文のバイト列は改行も含めて保持しています。

## 主な意味の修正

初期訳には否定消失、条件の逆転、規範強度の誤り、数値の欠落、暗号・認証用語の誤訳がありました。「任意項目を省略しなければならない」という要求、受理と既読・永続化の区別、Hostの受理receiptと送信者のOrigin Proof、状態バージョンとイベント順序、否認可能性、グループ暗号の候補状態などを原文へ戻しています。

P4の共通規則では非federated成功時のreceiptは`SHOULD`、クロスドメインで結果を信頼する場合はreceipt＋proofが`MUST`です。個別メソッドの`MAY`だけを読んで共通要件を弱めないようにしています。ANP-05のDraft・未リリース、P6のcandidate、旧仕様や歴史記事の当時の前提も保持します。

原文自身の矛盾や欠損は修正しません。ANP-05第11節が空、P5のエラー範囲表記と表の不一致、P4のサンプル名と規範名の相違などは、必要に応じて訳注と台帳に記録します。古い記事を現行の実装状況へ書き換えていません。

## 構造と参照の保全

コードフェンス・引用内フェンス・インラインコード・URL・識別子・規範キーワードを原文と比較します。ANP-05検証ガイドのAUTHZ識別子136セルも原順序で検証します。これらの機械検証は、意味の照合の代用にはしていません。

原文例はそのまま残し、文字列・コメント・プロンプト・図のラベルの和訳を[コード例補足](assets/code-examples/README.md)と[コード・データ補足](assets/code/README.md)へ収録しました。資料の欠損は[非Markdown台帳](assets/non-markdown-inventory.json)、全498ファイルの対訳先とSHAは[全体検証](corpus-verification.json)にまとめています。
