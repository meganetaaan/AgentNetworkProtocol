# scripts/rename_images.py の人向け文章の日本語対応表

原文: [scripts/rename_images.py](../../../../scripts/rename_images.py)。元ファイルのキー、コード、診断文字列、署名対象データは変更していません。この文書は実行するコードや送信するJSONの代替ではありません。

原文SHA-256: `8a7b74c6eb0b63b1e597513d5b8dde75f8755288cce348cca2c78b0d6608006e`

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

## line:15

原文:

````text
Sort files naturally
````

日本語:

````text
ファイルを自然順で並べ替える。
````

## line:18

原文:

````text
Rename files
````

日本語:

````text
ファイル名を変更する。
````

## line:6

原文:

````text
Sort strings containing numbers in natural order.
````

日本語:

````text
数字を含む文字列を自然な順序に並べ替えます。
````

## line:7

原文:

````text
Sort strings containing numbers in natural order.
````

日本語:

````text
数字を含む文字列を自然な順序に並べ替えます。
````

## line:24

原文:

````text
f"Renamed {old_name} to {new_name}"
````

日本語:

````text
f"{old_name}を{new_name}に変更しました"
````
