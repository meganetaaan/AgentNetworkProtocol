# chinese/docs/did-wba服务端测试接口.md のコード例・図ラベルの日本語補足

原文: [chinese/docs/did-wba服务端测试接口.md](../../../../../chinese/docs/did-wba服务端测试接口.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:114-119/line:2:column:67

原文:

````text
Nonce has already been used. Please provide a new nonce.
````

日本語補足（agent-reviewed）:

````text
Nonceは既に使用されています。新しいnonceを指定してください。
````

## fence:135-144/line:6:column:19

原文:

````text
<DID文档json>
````

日本語補足（technical-retained）:

````text
<DID文档json>
````

注: 技術プレースホルダーを保持。DID文档jsonは「DID文書のJSON」を意味する。

## fence:135-144/line:7:column:18

原文:

````text
<私钥pem格式>
````

日本語補足（technical-retained）:

````text
<私钥pem格式>
````

注: 技術プレースホルダーを保持。私钥pem格式は「PEM形式の秘密鍵」を意味する。

## fence:158-169/line:7:column:19

原文:

````text
<DID文档json>
````

日本語補足（technical-retained）:

````text
<DID文档json>
````

注: 技術プレースホルダーを保持。DID文档jsonは「DID文書のJSON」を意味する。

## fence:158-169/line:8:column:18

原文:

````text
<私钥pem格式>
````

日本語補足（technical-retained）:

````text
<私钥pem格式>
````

注: 技術プレースホルダーを保持。私钥pem格式は「PEM形式の秘密鍵」を意味する。

## fence:158-169/line:9:column:15

原文:

````text
<身份验证url>
````

日本語補足（technical-retained）:

````text
<身份验证url>
````

注: 技術プレースホルダーを保持。身份验证urlは「身元認証URL」を意味する。

## fence:172-183/line:6:column:20

原文:

````text
DID did:wba:example.com%3A8800:user:alice Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature_of_nonce_timestamp_service_did)>
````

日本語補足（technical-retained）:

````text
DID did:wba:example.com%3A8800:user:alice Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature_of_nonce_timestamp_service_did)>
````

注: HTTP認証・暗号処理・メソッド引数の技術構文またはプレースホルダーを保持。

## fence:191-202/line:7:column:19

原文:

````text
<DID文档json>
````

日本語補足（technical-retained）:

````text
<DID文档json>
````

注: 技術プレースホルダーを保持。DID文档jsonは「DID文書のJSON」を意味する。

## fence:191-202/line:8:column:18

原文:

````text
<私钥pem格式>
````

日本語補足（technical-retained）:

````text
<私钥pem格式>
````

注: 技術プレースホルダーを保持。私钥pem格式は「PEM形式の秘密鍵」を意味する。

## fence:191-202/line:9:column:15

原文:

````text
<身份验证url>
````

日本語補足（technical-retained）:

````text
<身份验证url>
````

注: 技術プレースホルダーを保持。身份验证urlは「身元認証URL」を意味する。

## fence:205-216/line:6:column:20

原文:

````text
DID did:wba:example.com%3A8800:user:alice Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature_of_nonce_timestamp_service_did)>
````

日本語補足（technical-retained）:

````text
DID did:wba:example.com%3A8800:user:alice Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature_of_nonce_timestamp_service_did)>
````

注: HTTP認証・暗号処理・メソッド引数の技術構文またはプレースホルダーを保持。

## fence:205-216/line:8:column:20

原文:

````text
Invalid credentials provided.
````

日本語補足（agent-reviewed）:

````text
指定された資格情報は無効です。
````

## fence:22-29

原文:

````text
PUT /wba/user/2i3dg4dtf908cde0/did.json HTTP/1.1
Host: agent-network-protocol.com
Content-Type: application/json
Content-Length: <文件长度>

<DID文档json>
````

日本語補足（technical-retained）:

````text
PUT /wba/user/2i3dg4dtf908cde0/did.json HTTP/1.1
Host: agent-network-protocol.com
Content-Type: application/json
Content-Length: <文件长度>

<DID文档json>
````

注: HTTP PUT要求の構文と値を保持。<文件长度>はファイル長、<DID文档json>はDID文書のJSONを示すプレースホルダー。

## fence:43-49

原文:

````text
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: <文件长度>

<DID文档json>
````

日本語補足（technical-retained）:

````text
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: <文件长度>

<DID文档json>
````

注: HTTP成功応答の構文と値を保持。<文件长度>はファイル長、<DID文档json>はDID文書のJSONを示すプレースホルダー。

## fence:114-119

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
