# PDF・PPTXの日本語対訳

4 PDF・75ページと2 PPTX・24スライドの抽出本文を全文手動翻訳しました。図の補足訳、原コード画像、発表者ノート、原文対照をページ／スライドごとに収録しています。歴史的な資料であり、現在仕様への更新ではありません。

PPTX埋込画像15点を確認し、画像本文3スライド分などを追加翻訳しました。PDF全75ページの概観と111点の埋込画像プレビューも確認しました。PPTXのネイティブ描画、原画素で判読できない微小文字、二次校閲の未実施は、[台帳](../documents-inventory.json)で区別しています。全資料の視覚的な翻訳検証完了を主張するものではありません。

抽出・保持の検証はリポジトリルートで実行できます。APIキーは使いません。初回の依存パッケージ取得にはネットワーク接続が必要です。

```sh
uv run --with pymupdf==2.1 --with python-pptx==1.0.2 python scripts/extract-document-text.py --check
```

`--check`を外すと原本から文字抽出とローカル確認用のPDF描画を再実行します。手動の日本語訳を自動的に再生成するものではありません。検証は原本ハッシュ、単位対応、抽出原文・リンク・ノート・保持画像の一致を対象とし、日本語の意味や視覚的な網羅性の独立した校閲ではありません。

- [blogs/ANP-Presentation-at-W3C-WebAgents-cg.pdf](<blogs/ANP-Presentation-at-W3C-WebAgents-cg.pdf.ja.md>) — 24ページ
- [standard/IETF124/AI Agents Communication Use Cases and Requirements(v3)-chinatelecom.pdf](<standard/IETF124/AI Agents Communication Use Cases and Requirements(v3)-chinatelecom.pdf.ja.md>) — 14ページ
- [standard/IETF124/Framwork for AI Agent Network-ANP.pdf](<standard/IETF124/Framwork for AI Agent Network-ANP.pdf.ja.md>) — 27ページ
- [standard/IETF124/Multi-Access+Collaboration+Requirements+for+AI+Agent+Protocol-chinaunicom.pdf](<standard/IETF124/Multi-Access+Collaboration+Requirements+for+AI+Agent+Protocol-chinaunicom.pdf.ja.md>) — 10ページ
- [standard/IETF124/1-Agenda.pptx](<standard/IETF124/1-Agenda.pptx.ja.md>) — 15スライド
- [standard/IETF124/slides-124-Telecom-AI-Agent-usecases-reqs-chinamobile.pptx](<standard/IETF124/slides-124-Telecom-AI-Agent-usecases-reqs-chinamobile.pptx.ja.md>) — 9スライド

追加の図中文字の訳と原画像SHAは、[追加確認記録](visual-follow-up.json)に収録しています。PPTXの画像参照スライドにはレイアウト／マスター経由の参照も含み、実際の描画結果の保証ではありません。
