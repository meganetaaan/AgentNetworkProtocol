# deprecated/02-did-all-method-design-specification.md のコード例・図ラベルの日本語補足

原文: [deprecated/02-did-all-method-design-specification.md](../../../../deprecated/02-did-all-method-design-specification.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:206-231/line:1

原文:

````text
1. Create all fields of the DID document, excluding the proofValue field
````

日本語補足（agent-reviewed）:

````text
1. proofValueフィールドを除く、DID文書の全フィールドを作成
````

## fence:206-231/line:4

原文:

````text
Other necessary fields
````

日本語補足（agent-reviewed）:

````text
その他の必須フィールド
````

## fence:206-231/line:10

原文:

````text
Exclude proofValue field
````

日本語補足（agent-reviewed）:

````text
proofValueフィールドを除く
````

## fence:206-231/line:14

原文:

````text
2. Convert the DID document to a JSON string, sorted by keys, using commas and colons as separators
````

日本語補足（agent-reviewed）:

````text
2. DID文書をJSON文字列へ変換し、キーで並べ替え、カンマとコロンを区切りに使用
````

## fence:206-231/line:17

原文:

````text
3. Encode the JSON string into UTF-8 bytes
````

日本語補足（agent-reviewed）:

````text
3. JSON文字列をUTF-8バイト列へ符号化
````

## fence:206-231/line:20

原文:

````text
4. Sign the byte data using the private key and ECDSA with SHA-256
````

日本語補足（agent-reviewed）:

````text
4. 秘密鍵とECDSA、SHA-256を使ってバイトデータへ署名
````

## fence:206-231/line:23

原文:

````text
5. Add the signature value to the proofValue field in the proof dictionary of the DID document
````

日本語補足（agent-reviewed）:

````text
5. 署名値をDID文書のproof辞書内のproofValueフィールドへ追加
````

## fence:316-336/line:8

原文:

````text
invalid apikey
````

日本語補足（agent-reviewed）:

````text
無効なapikey
````
