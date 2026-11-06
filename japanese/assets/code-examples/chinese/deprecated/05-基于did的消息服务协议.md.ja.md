# chinese/deprecated/05-基于did的消息服务协议.md のコード例・図ラベルの日本語補足

原文: [chinese/deprecated/05-基于did的消息服务协议.md](../../../../../chinese/deprecated/05-基于did的消息服务协议.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:88-101/line:4:column:123

原文:

````text
invalid apikey
````

日本語補足（agent-reviewed）:

````text
無効なapikey
````

## fence:190-213/line:1

原文:

````text
1. 创建json消息的所有字段，排除proofValue字段
````

日本語補足（agent-reviewed）:

````text
1. proofValueフィールドを除く、jsonメッセージの全フィールドを作成
````

## fence:190-213/line:3

原文:

````text
其他必要的字段
````

日本語補足（agent-reviewed）:

````text
その他の必須フィールド
````

## fence:190-213/line:8

原文:

````text
proofValue 字段除外
````

日本語補足（agent-reviewed）:

````text
proofValueフィールドを除く
````

## fence:190-213/line:12

原文:

````text
2. 转换为JSON字符串，按键排序，并使用逗号和冒号作为分隔符
````

日本語補足（agent-reviewed）:

````text
2. JSON文字列へ変換し、キーで並べ替え、カンマとコロンを区切りに使用
````

## fence:190-213/line:15

原文:

````text
3. 将JSON字符串编码为UTF-8字节
````

日本語補足（agent-reviewed）:

````text
3. JSON文字列をUTF-8バイト列へ符号化
````

## fence:190-213/line:18

原文:

````text
4. 使用私钥和ECDSA算法对字节数据进行签名
````

日本語補足（agent-reviewed）:

````text
4. 秘密鍵とECDSAアルゴリズムを使ってバイトデータへ署名
````

## fence:190-213/line:21

原文:

````text
5. 将签名值添加到json消息的proof字段中
````

日本語補足（agent-reviewed）:

````text
5. 署名値をjsonメッセージのproofフィールドへ追加
````

## fence:65-76

原文:

````text
{
  "alg": "HS256",
  "sign_type": "SIGN"
}
- alg: 属性表示签名使用的算法，默认为 HMAC SHA256（写为HS256）。
- sign_type: 属性表示令牌的类型，JWT 令牌统一写为 SIGN 。

2. payload 示例


````

日本語補足（agent-reviewed）:

````text
{
  "alg": "HS256",
  "sign_type": "SIGN"
}
- alg：署名に使うアルゴリズムを示す属性。既定値はHMAC SHA256（HS256と表記）。
- sign_type：トークンの種類を示す属性。JWTトークンは一律にSIGNと表記。

2. payloadの例


````
