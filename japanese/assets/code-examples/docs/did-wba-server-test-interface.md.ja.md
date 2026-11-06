# docs/did-wba-server-test-interface.md のコード例・図ラベルの日本語補足

原文: [docs/did-wba-server-test-interface.md](../../../../docs/did-wba-server-test-interface.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:112-117/line:2:column:67

原文:

````text
Nonce has already been used. Please provide a new nonce.
````

日本語補足（agent-reviewed）:

````text
Nonceは既に使用されています。新しいnonceを指定してください。
````

## fence:170-181/line:6:column:20

原文:

````text
DID did:wba:example.com%3A8800:user:alice Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature_of_nonce_timestamp_service_did)>
````

日本語補足（technical-retained）:

````text
DID did:wba:example.com%3A8800:user:alice Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature_of_nonce_timestamp_service_did)>
````

注: HTTP認証・暗号処理・メソッド引数の技術構文またはプレースホルダーを保持。

## fence:203-214/line:6:column:20

原文:

````text
DID did:wba:example.com%3A8800:user:alice Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature_of_nonce_timestamp_service_did)>
````

日本語補足（technical-retained）:

````text
DID did:wba:example.com%3A8800:user:alice Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature_of_nonce_timestamp_service_did)>
````

注: HTTP認証・暗号処理・メソッド引数の技術構文またはプレースホルダーを保持。

## fence:203-214/line:8:column:20

原文:

````text
Invalid credentials provided.
````

日本語補足（agent-reviewed）:

````text
指定された資格情報は無効です。
````

## fence:112-117

原文:

````text
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer error="invalid_nonce", error_description="Nonce has already been used. Please provide a new nonce.", nonce="xyz987"
Content-Type: application/json
Content-Length: 0
````

日本語補足（technical-retained）:

````text
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer error="invalid_nonce", error_description="Nonce has already been used. Please provide a new nonce.", nonce="xyz987"
Content-Type: application/json
Content-Length: 0
````

注: HTTP 401応答の構文と値を保持。Nonce has already been used. Please provide a new nonce.は「Nonceは既に使用されています。新しいnonceを指定してください」。
