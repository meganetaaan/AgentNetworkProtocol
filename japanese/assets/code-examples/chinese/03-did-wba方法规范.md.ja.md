# chinese/03-did-wba方法规范.md のコード例・図ラベルの日本語補足

原文: [chinese/03-did-wba方法规范.md](../../../../chinese/03-did-wba方法规范.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:175-178

原文:

````text
did:wba:example.com:user:alice:e1_<fingerprint>
        └──── 稳定主体路径：example.com:user:alice ────┘
````

日本語補足（agent-reviewed）:

````text
did:wba:example.com:user:alice:e1_<fingerprint>
安定した主体のパス：example.com:user:alice
````

## fence:349-353

原文:

````text
示例：创建DID
did:wba:example.com
 -> https://example.com/.well-known/did.json
````

日本語補足（agent-reviewed）:

````text
例：DIDの作成
did:wba:example.com
 → https://example.com/.well-known/did.json
````

## fence:359-363

原文:

````text
示例5：使用默认路径方案创建路径型 DID
did:wba:example.com:user:alice:e1_<fingerprint>
 -> https://example.com/user/alice/e1_<fingerprint>/did.json
````

日本語補足（agent-reviewed）:

````text
例5：既定のパス方式を使った、パス型DIDの作成
did:wba:example.com:user:alice:e1_<fingerprint>
 → https://example.com/user/alice/e1_<fingerprint>/did.json
````

## fence:367-371

原文:

````text
示例6：使用可选路径和端口创建DID
did:wba:example.com%3A3000:user:alice:e1_<fingerprint>
 -> https://example.com:3000/user/alice/e1_<fingerprint>/did.json
````

日本語補足（agent-reviewed）:

````text
例6：任意のパスとポートを使ったDIDの作成
did:wba:example.com%3A3000:user:alice:e1_<fingerprint>
 → https://example.com:3000/user/alice/e1_<fingerprint>/did.json
````
