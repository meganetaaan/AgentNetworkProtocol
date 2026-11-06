# scripts/add_copyright.py の人向け文章の日本語対応表

原文: [scripts/add_copyright.py](../../../../scripts/add_copyright.py)。元ファイルのキー、コード、診断文字列、署名対象データは変更していません。この文書は実行するコードや送信するJSONの代替ではありません。

原文SHA-256: `e1ba2e5b5817085ca3e58bdf7a8fdb25d8caa9a300f94dfc0b28d3a0028ba5c6`

プログラムの抽出結果に加え、人が読む設定値・説明・コメントの抽出漏れを確認して補っています。技術値はそのまま保持し、保持理由を併記します。

## line:1

原文:

````text
!/usr/bin/env python3
````

技術値を原文のまま保持します。

````text
実行環境を指定するshebangであり、人向け本文ではありません。パスとインタープリター指定を保持します。
````

## line:6

原文:

````text
Check if file is in chinese directory or has cn in name
````

日本語:

````text
ファイルがchineseディレクトリ内にあるか、名前にcnを含むかを確認する。
````

## line:14

原文:

````text
Skip if copyright notice already exists
````

日本語:

````text
著作権表示がすでに存在する場合は、スキップする。
````

## line:18

原文:

````text
Prepare copyright notice based on language
````

日本語:

````text
言語に応じて著作権表示を用意する。
````

## line:32

原文:

````text
Add copyright notice to the end of file
````

日本語:

````text
ファイル末尾に著作権表示を追加する。
````

## line:42

原文:

````text
Walk through all directories
````

日本語:

````text
すべてのディレクトリをたどる。
````

## line:44

原文:

````text
Skip venv directory
````

日本語:

````text
venvディレクトリをスキップする。
````

## line:36

原文:

````text
f"Added copyright notice to {filepath}"
````

日本語:

````text
f"{filepath}に著作権表示を追加しました"
````

## line:20

原文:

````text

## 版权声明  
Copyright (c) 2024 ANP Community  
本文件依据 [Apache License 2.0](./LICENSE) 发布，您可以自由使用和修改，但必须保留本版权声明。

````

日本語:

````text

## 著作権表示  
Copyright (c) 2024 ANP Community  
このファイルは[Apache License 2.0](./LICENSE)に基づいて公開されています。自由に利用・改変できますが、この著作権表示を保持しなければなりません。

````

## line:26

原文:

````text

## Copyright Notice
Copyright (c) 2024 ANP Community  
This file is released under the [Apache License 2.0](./LICENSE). You are free to use and modify it, but you must retain this copyright notice.

````

日本語:

````text

## 著作権表示
Copyright (c) 2024 ANP Community  
このファイルは[Apache License 2.0](./LICENSE)に基づいて公開されています。自由に利用・改変できますが、この著作権表示を保持しなければなりません。

````

## line:39

原文:

````text
f"Error processing {filepath}: {str(e)}"
````

日本語:

````text
f"{filepath}の処理でエラーが発生しました: {str(e)}"
````

## line:15

原文:

````text
版权声明
````

技術値を原文のまま保持します。

````text
既存の中国語著作権見出しを検索する完全一致パターンです。意味は「著作権表示」ですが、検索用の値は保持します。
````

## line:15

原文:

````text
Copyright Notice
````

技術値を原文のまま保持します。

````text
既存の英語著作権見出しを検索する完全一致パターンです。意味は「著作権表示」ですが、検索用の値は保持します。
````

## line:36

原文:

````text
Added copyright notice to 
````

日本語:

````text
著作権表示を追加しました: 
````

## line:39

原文:

````text
Error processing 
````

日本語:

````text
処理中のエラー: 
````
