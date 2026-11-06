# 02-anp-did-authentication-protocol-specification.md のコード例・図ラベルの日本語補足

原文: [02-anp-did-authentication-protocol-specification.md](../../../02-anp-did-authentication-protocol-specification.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:40-58/line:6

原文:

````text
First Request
````

日本語補足（agent-reviewed）:

````text
最初の要求
````

## fence:40-58/line:15

原文:

````text
Subsequent Requests
````

日本語補足（agent-reviewed）:

````text
以後の要求
````

## fence:201-203/line:1:column:96

原文:

````text
orders.read orders.write
````

日本語補足（agent-reviewed）:

````text
orders.read orders.write（権限scopeの識別子を原文のまま保持）
````

## fence:242-246/line:1:column:96

原文:

````text
Signature verification failed.
````

日本語補足（agent-reviewed）:

````text
署名の検証に失敗しました。
````

## fence:294-312/line:6

原文:

````text
Initial Request
````

日本語補足（agent-reviewed）:

````text
初回の要求
````

## fence:294-312/line:15

原文:

````text
Subsequent Requests
````

日本語補足（agent-reviewed）:

````text
以後の要求
````

## fence:242-246

原文:

````text
WWW-Authenticate: DIDWba realm="api.example.com", error="invalid_signature", error_description="Signature verification failed.", nonce="xyz987"
Accept-Signature: sig1=("@method" "@target-uri" "@authority" "content-digest");created;expires;nonce;keyid
Cache-Control: no-store
````

日本語補足（technical-retained）:

````text
WWW-Authenticate: DIDWba realm="api.example.com", error="invalid_signature", error_description="Signature verification failed.", nonce="xyz987"
Accept-Signature: sig1=("@method" "@target-uri" "@authority" "content-digest");created;expires;nonce;keyid
Cache-Control: no-store
````

注: HTTP認証チャレンジと署名要件の例を技術構文・値ごと保持。error_descriptionのSignature verification failed.は「署名の検証に失敗しました」。Cache-Control: no-storeは保存禁止を示す。
