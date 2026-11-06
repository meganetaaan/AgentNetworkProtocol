# 画像の翻訳・校閲結果

基準は `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`。原画像を変更せず、212パス／209画像の対訳Markdown・抽出JSON・確認台帳を作成した。元画像のSHA-256は212パスすべてGit基準と一致している。

ラスター180画像すべてを実際に目視し、可読の人向け文章・図中文字・コメントを日本語訳と照合した。SVGは30パス／28画像の全文XMLラベルを訳文照合した。1つのSVGは原資料が空のファイルである。

| 確認範囲 | 原画像パス | 重複除外 |
| --- | ---: | ---: |
| 全可視文字を目視し対訳を照合したラスター | 162 | 161 |
| 全XML文字ラベルを対訳照合したSVG | 30 | 28 |
| 原図で隠れ・切れがあるが、可視文字は対訳済み | 8 | 8 |
| 人向け文章・コメントは対訳済み、技術コードの完全転記は未確認 | 7 | 7 |
| 技術コードのみで翻訳する説明文はない。原画素保持 | 1 | 1 |
| 可読文章は対訳済み、遮蔽・不鮮明な原文字が残る商品写真 | 3 | 3 |
| 空のSVG | 1 | 1 |

未校閲の機械訳ラベルは0件。旧機械訳キャッシュは成果物から除いた。`scripts/extract-image-text.py --render` はモデルやネットワークなしで対訳を再生成できる。

`raster-visual-review.json` に目視結果・原SHA・訂正・追加訳・確認範囲を保存した。原OCRの`source`は残し、訂正は`transcribed_source`で区別する。写真やスライドは不完全なOCR断片を保持し、手動の全文文字起こし、または目視で対応を確認したPDF本文と図中文字の対訳へ案内する。原図の重複番号やSever等の誤記を勝手に直していない。

W3Cの24枚のJPEGは、すべて同番号のPDFページとその手動日本語訳との対応を目視確認した。対応本文はPDFテキスト層から再利用し、図中文字を手動補足。本文の訳は`japanese/assets/documents/blogs/ANP-Presentation-at-W3C-WebAgents-cg.pdf.ja.md`へリンクし、画素比較と目視確認の記録は`document-slide-correspondence.json`に保存した。他担当の文書台帳は変更していない。

コード転記未確認の8画像は、`images/did-identity-authentication.png`、`blogs/images/did-wba-flow.png`、`blogs/images/first-web-agent.png`、`blogs/images/mcp-server-api-key-example.png`、W3Cスライド9・10・12・17。可視の人向け説明・コード内コメントや自然言語の値は対訳した。公開鍵・URL・JSONキー・括弧等をOCRから完全復元したとは主張せず、原画素を正として参照する。コードだけの1画像はMCPサーバーの設定例であり、認証値はプレースホルダーのまま保持する。

原資料の限界は各対訳と`verification-results.json`の`source_pixel_limitations`に記録した。隠れたE2Eの下の文字、画面右端や下端の文章、コード画像の途中で切れたdescription、手で覆われた瓶ラベル、写真中の薄い小文字、手書きサイン、レーダー図の薄い目盛数字などは推測しない。読める広告本文・脚注・比較条件・人物名は対訳済み。商品広告の栄養・品質・受賞・売上の主張は原広告として訳し、現在の事実として保証していない。

`verification-results.json`に元画像のSHA比較、対訳ID、和訳欄、ローカルリンク等の検査を保存。`review-checkpoint.json`の`pending`は空。完全転記未確認や原資料の限界を持つものは`partial_or_source_defect`に分離した。確認範囲を隠して全画像の完全な文字転記を主張するものではない。

更新時は`--render`、引数なし、`--verify`の順に実行する。Pythonは`../ja-translate-venv/Scripts/python.exe`、UVキャッシュは`../uv-cache`。実モデルAPI・APIキー・有料モデルを使用していない。この担当はcommit/pushしていない。PDF追加10ページのローカルOCRは`../document-ocr/`に別途提供し、画像212パスの集計から除外した。
