> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [chinese/docs/did-wba服务端测试接口.md](../../../chinese/docs/did-wba服务端测试接口.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# wba サービスエンド テスト インターフェイス

d:wbaテストの将来は実行が簡単です。テスト用のサービス終了を開発したので、アップロード、アクセス、DD機能のテスト用に複数のHTTPインターフェイスを設計しました。

サービスエンドのテスト ドメインの名前は:`agent-network-protocol.com`，`pi-unlimited.com`どちらでも使えます。`agent-network-protocol.com`事例紹介

ローカルにDIDドキュメントを生成し、サーバーにアップロードして、使用可能なDIDを作成できます。

例えばアップロードしたパスは、`https://agent-network-protocol.com/wba/user/2i3dg4dtf908cde0/did.json`作成したDIDは、`did:wba:agent-network-protocol.com:wba:user:2i3dg4dtf908cde0`。

## 1. JSON ファイルをアップロード(PUTリクエスト)

### リクエストパス
`https://agent-network-protocol.com/wba/user/2i3dg4dtf908cde0/did.json`

注意:
- 「2i3dg4dtf9008cde0」は、将来の紛争防止のための唯一のマークであり、16はランダムな文字列として推奨されます。
- 既にサービス終了時にidが存在している場合、あなたは409告白を返します。
- このインターフェイスは、IPごとの最大50ファイルで、テスト目的のために一時的に使用されます。

### フォーマットリクエスト例
```plaintext
PUT /wba/user/2i3dg4dtf908cde0/did.json HTTP/1.1
Host: agent-network-protocol.com
Content-Type: application/json
Content-Length: <文件长度>

<DID文档json>
```

## 2. JSONファイルを取得する(リクエストをGET)

### リクエストパス
`https://agent-network-protocol.com/wba/user/2i3dg4dtf908cde0/did.json`

### フォーマットリクエスト例
```plaintext
GET /wba/user/2i3dg4dtf908cde0/did.json HTTP/1.1
Host: agent-network-protocol.com
```

### 応答形式例
```plaintext
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: <文件长度>

<DID文档json>
```

### エラー応答
- 未発見:指定のリソースが存在しません。

## 3. 試験ID:wbaの同一証明の正常

ユーザのdo:wba IDの正常性をテストするためにサービスエンドのテストインターフェイスが提供されました。

### リクエストパス
`https://agent-network-protocol.com/wba/test`

### フォーマットリクエスト例
```plaintext
GET /wba/test HTTP/1.1
Host: agent-network-protocol.com
Authorization: DID did:wba:example.com%3A8800:user:alice Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature_of_nonce_timestamp_service_did)>
```

http リクエストの見出しにあるオートレーションフィールドは、do:wba メソッドノームに従って署名されます。
トークンを検証すると、自動処理のリクエストが初めて返されます。例:

```plaintext
Authorization: Bearer <token>
```

### 応答形式例
```plaintext
HTTP/1.1 200 OK
Authorization: Bearer <token>
Content-Type: application/text
Content-Length: <文件长度>

OK
```

最初に、オートレーションフィールドが含まれているので、このトークンは http リクエストにフォローアップする。

### エラー応答
- 403 禁止: 停電の故障



## 4. 試験ID:wbaの同一証明401

サービスエンドのテストインターフェイスは、サービスエンドが401に戻ったときに、ユーザーのdoed:wba識別が適切に処理されるかどうかをテストするために提供されました。

### リクエストパス
`https://agent-network-protocol.com/wba/test401`

### フォーマットリクエスト例
```plaintext
GET /wba/test401 HTTP/1.1
Host: agent-network-protocol.com
Authorization: DID did:wba:example.com%3A8800:user:alice Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature_of_nonce_timestamp_service_did)>
```

http リクエストの見出しにあるオートレーションフィールドは、do:wba メソッドノームに従って署名されます。
トークンを検証すると、自動処理のリクエストが初めて返されます。例:

```plaintext
Authorization: Bearer <token>
```

### 応答形式例
```plaintext
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer error="invalid_nonce", error_description="Nonce has already been used. Please provide a new nonce.", nonce="xyz987"
Content-Type: application/json
Content-Length: 0
```

WWW-Authentity フィールドは、その後の http リクエストシグネチャに使われる nance を含む。

## 5. DID 文書と秘密鍵インターフェイスを生成

### リクエストパス
`https://agent-network-protocol.com/wba/demo/generate`

### フォーマットリクエスト例
```plaintext
GET /wba/demo/generate HTTP/1.1
Host: agent-network-protocol.com
```

### 応答形式例
```plaintext
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: <文件长度>

{
  "did_document": "<DID文档json>",
  "private_key": "<私钥pem格式>"
}
```

### 注意点
- DID 文書や秘密鍵を処理する際は、特殊な文字を含むことができます。JSON を通じてデータが正しく送信できるようにするため、変換用に特別文字が提案されます。
- 二重引用符などのJSONの特殊文字(`"`) とバックスラッシュ ()`\`)バックスラッシュで転置する必要があります。
- DID 文書または秘密鍵が行の休憩を含んでいる場合(`\n`移行も必要です。
- テキスト以外の文字を含むデータについては、データの完全性を確保するためにBase64コードが使用されることを推奨します。

## 6. 認証インターフェイス

### リクエストパス
`https://agent-network-protocol.com/wba/demo/auth`

### フォーマットリクエスト例
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

### 応答形式例
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

## 7. 同一証明 401 インターフェイス

### リクエストパス
`https://agent-network-protocol.com/wba/demo/auth401`

### フォーマットリクエスト例
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

### 応答形式例
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






## 公益社団法人 一般社団法人 日本版著作権協会
社会貢献活動の推進に関する基本方針 _ ANPコミュニティ
この文書の基礎 [MITライセンス](../../../chinese/docs/LICENSE) 公開、あなたは自由にこの著作権宣言を使用および変更することができます。  
