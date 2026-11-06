# chinese/deprecated/02-did-all方法规范.md のコード例・図ラベルの日本語補足

原文: [chinese/deprecated/02-did-all方法规范.md](../../../../../chinese/deprecated/02-did-all方法规范.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:220-245/line:1

原文:

````text
1. 创建DID文档的所有字段，排除proofValue字段
````

日本語補足（agent-reviewed）:

````text
1. proofValueフィールドを除く、DID文書の全フィールドを作成
````

## fence:220-245/line:4

原文:

````text
其他必要的字段
````

日本語補足（agent-reviewed）:

````text
その他の必須フィールド
````

## fence:220-245/line:10

原文:

````text
proofValue 字段除外
````

日本語補足（agent-reviewed）:

````text
proofValueフィールドを除く
````

## fence:220-245/line:14

原文:

````text
2. 将DID文档转换为JSON字符串，按键排序，并使用逗号和冒号作为分隔符
````

日本語補足（agent-reviewed）:

````text
2. DID文書をJSON文字列へ変換し、キーで並べ替え、カンマとコロンを区切りに使用
````

## fence:220-245/line:17

原文:

````text
3. 将JSON字符串编码为UTF-8字节
````

日本語補足（agent-reviewed）:

````text
3. JSON文字列をUTF-8バイト列へ符号化
````

## fence:220-245/line:20

原文:

````text
4. 使用私钥和ECDSA算法对字节数据进行签名
````

日本語補足（agent-reviewed）:

````text
4. 秘密鍵とECDSAアルゴリズムを使ってバイトデータへ署名
````

## fence:220-245/line:23

原文:

````text
5. 将签名值添加到DID文档的proof字段中
````

日本語補足（agent-reviewed）:

````text
5. 署名値をDID文書のproofフィールドへ追加
````

## fence:289-298/line:2:column:10

原文:

````text
Authorization: Bearer <你的apikey>
````

日本語補足（technical-retained）:

````text
Authorization: Bearer <你的apikey>
````

注: HTTPヘッダーの構文と資格情報のプレースホルダーを保持。「你的apikey」は「あなたのapikey」を意味する。

## fence:322-335/line:4:column:123

原文:

````text
invalid apikey
````

日本語補足（agent-reviewed）:

````text
無効なapikey
````

## fence:341-350/line:2:column:10

原文:

````text
Authorization: Bearer <你的token>
````

日本語補足（technical-retained）:

````text
Authorization: Bearer <你的token>
````

注: HTTPヘッダーの構文と資格情報のプレースホルダーを保持。「你的token」は「あなたのtoken」を意味する。
