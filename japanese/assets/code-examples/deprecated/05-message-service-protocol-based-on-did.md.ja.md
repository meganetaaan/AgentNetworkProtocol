# deprecated/05-message-service-protocol-based-on-did.md のコード例・図ラベルの日本語補足

原文: [deprecated/05-message-service-protocol-based-on-did.md](../../../../deprecated/05-message-service-protocol-based-on-did.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:89-111/line:8

原文:

````text
invalid apikey
````

日本語補足（agent-reviewed）:

````text
無効なapikey
````

## fence:201-224/line:1

原文:

````text
1. Create all fields of the json message, excluding proofValue field
````

日本語補足（agent-reviewed）:

````text
1. proofValueフィールドを除く、jsonメッセージの全フィールドを作成
````

## fence:201-224/line:3

原文:

````text
Other necessary fields
````

日本語補足（agent-reviewed）:

````text
その他の必須フィールド
````

## fence:201-224/line:8

原文:

````text
Excluding proofValue field
````

日本語補足（agent-reviewed）:

````text
proofValueフィールドを除く
````

## fence:201-224/line:12

原文:

````text
2. Convert to JSON string, sort by keys, and use commas and colons as separators
````

日本語補足（agent-reviewed）:

````text
2. JSON文字列へ変換し、キーで並べ替え、カンマとコロンを区切りに使用
````

## fence:201-224/line:15

原文:

````text
3. Encode JSON string as UTF-8 bytes
````

日本語補足（agent-reviewed）:

````text
3. JSON文字列をUTF-8バイト列へ符号化
````

## fence:201-224/line:18

原文:

````text
4. Sign byte data using private key and ECDSA algorithm
````

日本語補足（agent-reviewed）:

````text
4. 秘密鍵とECDSAアルゴリズムを使ってバイトデータへ署名
````

## fence:201-224/line:21

原文:

````text
5. Add signature value to proof field in json message
````

日本語補足（agent-reviewed）:

````text
5. 署名値をjsonメッセージのproofフィールドへ追加
````
