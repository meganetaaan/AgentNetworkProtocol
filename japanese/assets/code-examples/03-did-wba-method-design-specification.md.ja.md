# 03-did-wba-method-design-specification.md のコード例・図ラベルの日本語補足

原文: [03-did-wba-method-design-specification.md](../../../03-did-wba-method-design-specification.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:175-178

原文:

````text
did:wba:example.com:user:alice:e1_<fingerprint>
        └──── stable subject path: example.com:user:alice ────┘
````

日本語補足（agent-reviewed）:

````text
did:wba:example.com:user:alice:e1_<fingerprint>
安定した主体のパス：example.com:user:alice
````

## fence:348-352

原文:

````text
Example: Creating a DID
did:wba:example.com
 -> https://example.com/.well-known/did.json
````

日本語補足（agent-reviewed）:

````text
例：DIDの作成
did:wba:example.com
 → https://example.com/.well-known/did.json
````

## fence:358-362

原文:

````text
Example 5: Creating a path-based DID with the default path scheme
did:wba:example.com:user:alice:e1_<fingerprint>
 -> https://example.com/user/alice/e1_<fingerprint>/did.json
````

日本語補足（agent-reviewed）:

````text
例5：既定のパス方式を使った、パスに基づくDIDの作成
did:wba:example.com:user:alice:e1_<fingerprint>
 → https://example.com/user/alice/e1_<fingerprint>/did.json
````

## fence:366-370

原文:

````text
Example 6: Creating a DID with an optional path and port
did:wba:example.com%3A3000:user:alice:e1_<fingerprint>
 -> https://example.com:3000/user/alice/e1_<fingerprint>/did.json
````

日本語補足（agent-reviewed）:

````text
例6：任意のパスとポートを使ったDIDの作成
did:wba:example.com%3A3000:user:alice:e1_<fingerprint>
 → https://example.com:3000/user/alice/e1_<fingerprint>/did.json
````
