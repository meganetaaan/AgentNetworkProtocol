<!-- translation-method: manual -->
> 日本語参考訳（手動翻訳）。規範となるのは原文です。コード例・識別子は原文を保持しています。
> 原文: [docs/did-wba-server-test-interface.md](../../docs/did-wba-server-test-interface.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

<a id="didwba-server-test-interface"></a>
# did:wbaサーバーテストインターフェース

> 翻訳者注: この資料は、原文の旧認証方式と公開テスト用インターフェースの説明を保持した翻訳です。現行ANP-02の署名方式は[HTTPリクエスト認証](../../02-anp-did-authentication-protocol-specification.md#http-binding)を参照してください。掲載エンドポイントの現在の稼働状況は検証していません。

did:wbaのテストを容易にするため、DID機能のアップロード、取得、テストのための複数のHTTPエンドポイントを持つテストサーバーを開発しました。

テストサーバーのドメインは`agent-network-protocol.com`です（将来、`agent-network-protocol.com`に変更予定です）。

DID文書を手元で生成し、サーバーにアップロードすることで、利用可能なDIDを作成できます。

例えば、パス`https://agent-network-protocol.com/wba/user/2i3dg4dtf908cde0/did.json`にアップロードした場合、生成されるDIDは`did:wba:agent-network-protocol.com:wba:user:2i3dg4dtf908cde0`になります。

<a id="1-upload-json-file-put-request"></a>
## 1. JSONファイルのアップロード（PUTリクエスト）

<a id="request-path"></a>
### リクエスト先パス
`https://agent-network-protocol.com/wba/user/2i3dg4dtf908cde0/did.json`

注記:
- 「2i3dg4dtf908cde0」は一意の識別子です。衝突を避けるため、16文字のランダムな文字列を使うことを推奨します。
- そのIDがサーバーにすでに存在する場合、409 Conflictを返します。
- このインターフェースは現在テスト専用であり、IPアドレスごとに50ファイルという制限があります。

<a id="request-format-example"></a>
### リクエスト形式の例
```plaintext
PUT /wba/user/2i3dg4dtf908cde0/did.json HTTP/1.1
Host: agent-network-protocol.com
Content-Type: application/json
Content-Length: <file_length>

<DID_document_json>
```

<a id="2-retrieve-json-file-get-request"></a>
## 2. JSONファイルの取得（GETリクエスト）

<a id="request-path-1"></a>
### リクエスト先パス
`https://agent-network-protocol.com/wba/user/2i3dg4dtf908cde0/did.json`

<a id="request-format-example-1"></a>
### リクエスト形式の例
```plaintext
GET /wba/user/2i3dg4dtf908cde0/did.json HTTP/1.1
Host: agent-network-protocol.com
```

<a id="response-format-example"></a>
### 応答形式の例
```plaintext
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: <file_length>

<DID_document_json>
```

<a id="error-response"></a>
### エラー応答
- 404 Not Found: 指定したリソースが存在しません。

<a id="3-test-didwba-authentication-normal-functionality"></a>
## 3. did:wba認証の正常系機能のテスト

利用者のdid:wba認証が正しく動作するかを検証するための、サーバーのテストエンドポイントを提供します。

<a id="request-path-2"></a>
### リクエスト先パス
`https://agent-network-protocol.com/wba/test`

<a id="request-format-example-2"></a>
### リクエスト形式の例
```plaintext
GET /wba/test HTTP/1.1
Host: agent-network-protocol.com
Authorization: DID did:wba:example.com%3A8800:user:alice Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature_of_nonce_timestamp_service_did)>
```

HTTPリクエストヘッダーのAuthorizationフィールドは、did:wbaメソッド仕様に従って署名するべきです。
トークン検証のフローでは、サーバーへの初回リクエストで返されたトークンをAuthorizationに設定します。例:

```plaintext
Authorization: Bearer <token>
```

<a id="response-format-example-1"></a>
### 応答形式の例
```plaintext
HTTP/1.1 200 OK
Authorization: Bearer <token>
Content-Type: application/text
Content-Length: <file_length>

OK
```

初回リクエストでは、Authorizationフィールドに、以後のHTTPリクエスト用のトークンが含まれます。

<a id="error-response-1"></a>
### エラー応答
- 403 Forbidden: 認証に失敗しました。

<a id="4-test-didwba-authentication-401-functionality"></a>
## 4. did:wba認証の401応答の機能のテスト

did:wba認証でサーバーから返される401応答をクライアントが正しく処理できるかをテストするため、サーバーのテストエンドポイントを提供します。

<a id="request-path-3"></a>
### リクエスト先パス
`https://agent-network-protocol.com/wba/test401`

<a id="request-format-example-3"></a>
### リクエスト形式の例
```plaintext
GET /wba/test401 HTTP/1.1
Host: agent-network-protocol.com
Authorization: DID did:wba:example.com%3A8800:user:alice Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature_of_nonce_timestamp_service_did)>
```

HTTPリクエストヘッダーのAuthorizationフィールドは、did:wbaメソッド仕様に従って署名するべきです。
トークン検証のフローでは、サーバーへの初回リクエストで返されたトークンをAuthorizationに設定します。例:

```plaintext
Authorization: Bearer <token>
```

<a id="response-format-example-2"></a>
### 応答形式の例
```plaintext
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer error="invalid_nonce", error_description="Nonce has already been used. Please provide a new nonce.", nonce="xyz987"
Content-Type: application/json
Content-Length: 0
```

WWW-Authenticateフィールドには、以後のHTTPリクエストの署名に使うnonceが含まれます。

<a id="5-generate-did-document-and-private-key-interface"></a>
## 5. DID文書と秘密鍵を生成するインターフェース

<a id="request-path-4"></a>
### リクエスト先パス
`https://agent-network-protocol.com/wba/demo/generate`

<a id="request-format-example-4"></a>
### リクエスト形式の例
```plaintext
GET /wba/demo/generate HTTP/1.1
Host: agent-network-protocol.com
```

<a id="response-format-example-3"></a>
### 応答形式の例
```plaintext
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: <file_length>

{
  "did_document": "<DID_document_json>",
  "private_key": "<private_key_pem_format>"
}
```

<a id="notes"></a>
### 注記
- DID文書や秘密鍵の処理では、特殊文字が含まれることがあります。JSON経由で正しくデータを送信するため、特殊文字をエスケープすることを推奨します。
- JSONの二重引用符（`"`）やバックスラッシュ（`\`）などの特殊文字は、バックスラッシュでエスケープする必要があります。
- DID文書や秘密鍵が改行文字（`\n`）を含む場合、それらもエスケープする必要があります。
- 非テキスト文字を含むデータには、データの完全性を確保するため、Base64エンコードの利用を推奨します。

<a id="6-authentication-interface"></a>
## 6. 認証インターフェース

<a id="request-path-5"></a>
### リクエスト先パス
`https://agent-network-protocol.com/wba/demo/auth`

<a id="request-format-example-5"></a>
### リクエスト形式の例
```plaintext
POST /wba/demo/auth HTTP/1.1
Host: agent-network-protocol.com
Content-Type: application/json
Content-Length: <file_length>

{
  "did_document": "<DID_document_json>",
  "private_key": "<private_key_pem_format>",
  "auth_url": "<authentication_url>"
}
```

<a id="response-format-example-4"></a>
### 応答形式の例
```plaintext
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: <file_length>

{
  "authorization": "DID did:wba:example.com%3A8800:user:alice Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature_of_nonce_timestamp_service_did)>",
  "auth_code": 200,
  "error_message": null,
  "access_token": "<token>"
}
```

<a id="7-authentication-401-interface"></a>
## 7. 認証の401応答インターフェース

<a id="request-path-6"></a>
### リクエスト先パス
`https://agent-network-protocol.com/wba/demo/auth401`

<a id="request-format-example-6"></a>
### リクエスト形式の例
```plaintext
POST /wba/demo/auth401 HTTP/1.1
Host: agent-network-protocol.com
Content-Type: application/json
Content-Length: <file_length>

{
  "did_document": "<DID_document_json>",
  "private_key": "<private_key_pem_format>",
  "auth_url": "<authentication_url>"
}
```

<a id="response-format-example-5"></a>
### 応答形式の例
```plaintext
HTTP/1.1 401 Unauthorized
Content-Type: application/json
Content-Length: <file_length>

{
  "authorization": "DID did:wba:example.com%3A8800:user:alice Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature_of_nonce_timestamp_service_did)>",
  "auth_code": 401,
  "error_message": "Invalid credentials provided.",
  "access_token": "<token>"
}
```

<a id="copyright-notice"></a>
## 著作権表示
Copyright (c) 2024 ANP Community  
このファイルは[MIT License](../../LICENSE)に基づいて公開されています。自由に利用・改変できますが、この著作権表示を保持しなければなりません。

> 翻訳者注: 上記のMITという表示は原文をそのまま訳したものです。リンク先のリポジトリルートのLICENSEはApache License 2.0であり、原文にはライセンス表示とリンク先の不一致があります。
