<!-- translation-review: full; scope: entire original source; method: manual-source-comparison -->
> 日本語参考訳（原文全文照合・校閲済み）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [chinese/docs/did-wba服务端测试接口.md](../../../chinese/docs/did-wba服务端测试接口.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# did:wba サーバーのテスト用インターフェイス

did:wba のテストを簡単にするため、テスト用サーバーを開発しました。アップロード、取得、DID 機能のテストのために、複数の HTTP インターフェイスを設けています。

テストサーバーのドメインは `agent-network-protocol.com` と `pi-unlimited.com` です。どちらも利用できます。以下では `agent-network-protocol.com` を例にします。

ローカルで DID 文書を生成してサーバーにアップロードすると、利用可能な DID を作成できます。

例えば、アップロード先が `https://agent-network-protocol.com/wba/user/2i3dg4dtf908cde0/did.json` なら、生成される DID は `did:wba:agent-network-protocol.com:wba:user:2i3dg4dtf908cde0` です。

## 1. JSON ファイルのアップロード（PUT リクエスト）

### リクエスト先
`https://agent-network-protocol.com/wba/user/2i3dg4dtf908cde0/did.json`

注意：
- "2i3dg4dtf908cde0" は一意な識別子です。衝突を避けるため、16 文字のランダムな文字列を推奨します。
- id がサーバーに既に存在する場合は、409 Conflict を返します。
- このインターフェイスは当面テスト専用です。1 つの IP から PUT できるファイルは最大 50 個です。

### リクエスト形式の例
```plaintext
PUT /wba/user/2i3dg4dtf908cde0/did.json HTTP/1.1
Host: agent-network-protocol.com
Content-Type: application/json
Content-Length: <文件长度>

<DID文档json>
```

## 2. JSON ファイルの取得（GET リクエスト）

### リクエスト先
`https://agent-network-protocol.com/wba/user/2i3dg4dtf908cde0/did.json`

### リクエスト形式の例
```plaintext
GET /wba/user/2i3dg4dtf908cde0/did.json HTTP/1.1
Host: agent-network-protocol.com
```

### レスポンス形式の例
```plaintext
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: <文件长度>

<DID文档json>
```

### エラーレスポンス
- 404 Not Found：指定されたリソースが存在しません。

## 3. did:wba 認証の正常系テスト

ユーザーの did:wba 認証が正常に動作するかを調べる、サーバー側のテスト用インターフェイスです。

### リクエスト先
`https://agent-network-protocol.com/wba/test`

### リクエスト形式の例
```plaintext
GET /wba/test HTTP/1.1
Host: agent-network-protocol.com
Authorization: DID did:wba:example.com%3A8800:user:alice Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature_of_nonce_timestamp_service_did)>
```

HTTP リクエストヘッダーの Authorization フィールドは、did:wba メソッド仕様に従って署名します。
トークンによる認証フローを試す場合は、最初のリクエストに対してサーバーが返した token を Authorization に記載します。例：

```plaintext
Authorization: Bearer <token>
```

### レスポンス形式の例
```plaintext
HTTP/1.1 200 OK
Authorization: Bearer <token>
Content-Type: application/text
Content-Length: <文件长度>

OK
```

最初のリクエストに対して返される Authorization フィールドには、後続の HTTP リクエストで使用する token が含まれます。

### エラーレスポンス
- 403 Forbidden：認証・認可に失敗しました。



## 4. did:wba 認証の 401 テスト

did:wba 認証でサーバーが 401 を返した際、クライアントが正しく処理できるかを調べる、サーバー側のテスト用インターフェイスです。

### リクエスト先
`https://agent-network-protocol.com/wba/test401`

### リクエスト形式の例
```plaintext
GET /wba/test401 HTTP/1.1
Host: agent-network-protocol.com
Authorization: DID did:wba:example.com%3A8800:user:alice Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature_of_nonce_timestamp_service_did)>
```

HTTP リクエストヘッダーの Authorization フィールドは、did:wba メソッド仕様に従って署名します。
トークンによる認証フローを試す場合は、最初のリクエストに対してサーバーが返した token を Authorization に記載します。例：

```plaintext
Authorization: Bearer <token>
```

### レスポンス形式の例
```plaintext
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer error="invalid_nonce", error_description="Nonce has already been used. Please provide a new nonce.", nonce="xyz987"
Content-Type: application/json
Content-Length: 0
```

WWW-Authenticate フィールドには、後続の HTTP リクエストの署名に使用する nonce が含まれます。

## 5. DID 文書と秘密鍵の生成インターフェイス

### リクエスト先
`https://agent-network-protocol.com/wba/demo/generate`

### リクエスト形式の例
```plaintext
GET /wba/demo/generate HTTP/1.1
Host: agent-network-protocol.com
```

### レスポンス形式の例
```plaintext
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: <文件长度>

{
  "did_document": "<DID文档json>",
  "private_key": "<私钥pem格式>"
}
```

### 注意事項
- DID 文書や秘密鍵には特殊文字が含まれる場合があります。JSON で正しく送信できるよう、特殊文字のエスケープを推奨します。
- JSON 内の二重引用符（`"`）やバックスラッシュ（`\`）などの特殊文字は、バックスラッシュでエスケープする必要があります。
- DID 文書や秘密鍵に改行（`\n`）が含まれる場合も、エスケープが必要です。
- テキスト以外の文字を含むデータは、完全性を保つため Base64 エンコードを推奨します。

## 6. 認証インターフェイス

### リクエスト先
`https://agent-network-protocol.com/wba/demo/auth`

### リクエスト形式の例
```plaintext
POST /wba/demo/auth HTTP/1.1
Host: agent-network-protocol.com
Content-Type: application/json
Content-Length: <文件长度>

{
  "did_document": "<DID文档json>",
  "private_key": "<私钥pem格式>",
  "auth_url": "<身份验证url>"
}
```

### レスポンス形式の例
```plaintext
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: <文件长度>

{
  "authorization": "DID did:wba:example.com%3A8800:user:alice Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature_of_nonce_timestamp_service_did)>",
  "auth_code": 200,
  "error_message": null,
  "access_token": "<token>"
}
```

## 7. 認証 401 インターフェイス

### リクエスト先
`https://agent-network-protocol.com/wba/demo/auth401`

### リクエスト形式の例
```plaintext
POST /wba/demo/auth401 HTTP/1.1
Host: agent-network-protocol.com
Content-Type: application/json
Content-Length: <文件长度>

{
  "did_document": "<DID文档json>",
  "private_key": "<私钥pem格式>",
  "auth_url": "<身份验证url>"
}
```

### レスポンス形式の例
```plaintext
HTTP/1.1 401 Unauthorized
Content-Type: application/json
Content-Length: <文件长度>

{
  "authorization": "DID did:wba:example.com%3A8800:user:alice Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature_of_nonce_timestamp_service_did)>",
  "auth_code": 401,
  "error_message": "Invalid credentials provided.",
  "access_token": "<token>"
}
```






## 著作権表示
Copyright (c) 2024 ANP Community  
本書は [MIT ライセンス](../../../chinese/docs/LICENSE) に基づき公開されています。自由に利用・変更できますが、この著作権表示を保持しなければなりません。
