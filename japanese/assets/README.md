# Markdown以外の日本語補足

原本のバイナリ、コード、JSON/YAML、識別子、署名対象データは変更せず、参照用の対訳・ラベル対応表を追加しています。対象は基準コミット`0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`に含まれる全266非Markdownファイルです。画像のOCR実行と、全文の目視照合は区別しています。

- [全266ファイルの棚卸し](non-markdown-inventory.json)
- [画像212件の台帳](images-inventory.json)と[画像の対訳](images/README.md)
- [PDF4件・PowerPoint2件の対訳](documents/README.md)と[ページ別台帳](documents-inventory.json)
- [コード・JSON・YAML内の文章の日本語対応表](code/README.md)
- [コード例内の文章の日本語対訳](code-examples/README.md)と[検証台帳](fenced-prose-translation-report.json)：元の1338コード例を保持し、説明・表示文2782項目とプレーンな説明ブロック76種を照合・補足しています。
- [追加したTypeScriptデモのコメント・表示文](code/task-demo-messages.ja.md)
- [Mermaid原図の日本語ラベル版](diagrams/README.md)
- [保存HTML版did:web仕様の全文参考訳](texts/references/did-web-method-specification.ja.md)
- [Apache License 2.0の日本語参考訳](texts/LICENSE.ja.md)
- [プロトコルスタック図の日本語](texts/standard/pic/stack.ja.md)

拡張子のない原文ブログも対象です。

- [MCP Registryの記事](texts/blogs/cn/03-解读：MCP注册中心是什么，未来发展方向.ja.md)
- [豆包モバイルアシスタントの記事](texts/blogs/cn/09-豆包手机助手.ja.md)
- [豆包モバイルアシスタントの記事・別稿](texts/blogs/cn/09-豆包手机助手2.ja.md)

`agent-reviewed`は原文の該当文章を読んで訳した項目、`technical-retained`はコード・識別子などのため原文を保持した項目です。画像やスライドでは、抽出本文の翻訳と、微小文字・図全体の視覚確認は別の状態で記録します。原画像が空、切れている、読み取れない場合は推測で補いません。全件完了の可否は各台帳の未完・欠損項目を確認してください。

## 検証の再実行

Python補助処理で使用した依存の版は[scripts/requirements-ja-assets.txt](../../scripts/requirements-ja-assets.txt)に固定しています。TypeScriptデモには不要です。既存の対訳の検証は翻訳モデルやAPIキーを使いません。初回のパッケージ導入にはネットワークが必要です。

```sh
uv venv --python 3.12 ../ja-translate-venv
uv pip install --python ../ja-translate-venv/Scripts/python.exe -r scripts/requirements-ja-assets.txt
uv run --no-project --python ../ja-translate-venv/Scripts/python.exe python scripts/extract-document-text.py --check
uv run --no-project --python ../ja-translate-venv/Scripts/python.exe python scripts/extract-image-text.py --verify
node scripts/check-ja-corpus.mjs
```

上のパスはWindowsの実行環境に合わせた例です。Linux／macOSでは仮想環境のPythonを`../ja-translate-venv/bin/python`へ読み替えます。抽出の再実行は日本語の全文校閲を自動で再現する処理ではありません。
