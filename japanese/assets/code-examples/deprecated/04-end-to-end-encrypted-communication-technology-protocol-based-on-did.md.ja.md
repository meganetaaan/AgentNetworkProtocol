# deprecated/04-end-to-end-encrypted-communication-technology-protocol-based-on-did.md のコード例・図ラベルの日本語補足

原文: [deprecated/04-end-to-end-encrypted-communication-technology-protocol-based-on-did.md](../../../../deprecated/04-end-to-end-encrypted-communication-technology-protocol-based-on-did.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:210-233/line:1

原文:

````text
1. Create all fields of the JSON message, excluding the proofValue field
````

日本語補足（agent-reviewed）:

````text
1. proofValueフィールドを除く、JSONメッセージの全フィールドを作成
````

## fence:210-233/line:3

原文:

````text
Other necessary fields
````

日本語補足（agent-reviewed）:

````text
その他の必須フィールド
````

## fence:210-233/line:8

原文:

````text
Exclude proofValue field
````

日本語補足（agent-reviewed）:

````text
proofValueフィールドを除く
````

## fence:210-233/line:12

原文:

````text
2. Convert msg to a JSON string, sorted by keys, using commas and colons as separators
````

日本語補足（agent-reviewed）:

````text
2. msgをJSON文字列へ変換し、キーで並べ替え、カンマとコロンを区切りに使用
````

## fence:210-233/line:15

原文:

````text
3. Encode the JSON string to UTF-8 bytes
````

日本語補足（agent-reviewed）:

````text
3. JSON文字列をUTF-8バイト列へ符号化
````

## fence:210-233/line:18

原文:

````text
4. Sign the byte data using ECDSA and SHA-256
````

日本語補足（agent-reviewed）:

````text
4. ECDSAとSHA-256を使ってバイトデータへ署名
````

## fence:210-233/line:21

原文:

````text
5. Add the signature value to the proofValue field in the proof dictionary of the JSON message
````

日本語補足（agent-reviewed）:

````text
5. 署名値をJSONメッセージのproof辞書内のproofValueフィールドへ追加
````

## fence:370-406/line:1

原文:

````text
TLS_AES_128_GCM_SHA256 encryption function
````

日本語補足（agent-reviewed）:

````text
TLS_AES_128_GCM_SHA256暗号化関数
````

## fence:370-406/line:3

原文:

````text
Ensure key length is 16 bytes (128 bits)
````

日本語補足（agent-reviewed）:

````text
鍵長が16バイト（128ビット）であることを確認
````

## fence:370-406/line:7

原文:

````text
Generate random IV
````

日本語補足（agent-reviewed）:

````text
ランダムなIVを生成
````

## fence:370-406/line:8

原文:

````text
Recommended IV length for GCM is 12 bytes
````

日本語補足（agent-reviewed）:

````text
GCMの推奨IV長は12バイト
````

## fence:370-406/line:10

原文:

````text
Create cipher object
````

日本語補足（agent-reviewed）:

````text
暗号化オブジェクトを作成
````

## fence:370-406/line:17

原文:

````text
Encrypt data
````

日本語補足（agent-reviewed）:

````text
データを暗号化
````

## fence:370-406/line:20

原文:

````text
Get authentication tag
````

日本語補足（agent-reviewed）:

````text
認証tagを取得
````

## fence:370-406/line:23

原文:

````text
Encode to Base64
````

日本語補足（agent-reviewed）:

````text
Base64へ符号化
````

## fence:370-406/line:28

原文:

````text
Create JSON object
````

日本語補足（agent-reviewed）:

````text
JSONオブジェクトを作成
````

## fence:370-406/line:5

原文:

````text
Key must be 128 bits (16 bytes).
````

日本語補足（agent-reviewed）:

````text
鍵は128ビット（16バイト）でなければなりません。
````

## fence:430-454/line:9

原文:

````text
Use HKDF to derive an 8-byte key
````

日本語補足（agent-reviewed）:

````text
HKDFを使って8バイトの鍵を導出
````

## fence:430-454/line:11

原文:

````text
Ensure using the hash algorithm instance from the cryptography library
````

日本語補足（agent-reviewed）:

````text
cryptographyライブラリのハッシュアルゴリズムのインスタンスを使用していることを確認
````

## fence:430-454/line:12

原文:

````text
Generate an 8-byte key
````

日本語補足（agent-reviewed）:

````text
8バイトの鍵を生成
````

## fence:430-454/line:14

原文:

````text
Optional context information to distinguish keys for different purposes
````

日本語補足（agent-reviewed）:

````text
用途の異なる鍵を区別するための任意のコンテキスト情報
````

## fence:430-454/line:15

原文:

````text
Use the default cryptographic backend
````

日本語補足（agent-reviewed）:

````text
既定の暗号化バックエンドを使用
````

## fence:430-454/line:20

原文:

````text
Encode the derived key to a hexadecimal string
````

日本語補足（agent-reviewed）:

````text
導出した鍵を16進数文字列へ符号化
````

## fence:483-496/line:10

原文:

````text
Generate handshake traffic secrets
````

日本語補足（agent-reviewed）:

````text
ハンドシェイクのトラフィック秘密情報を生成
````

## fence:483-496/line:11:column:64

原文:

````text
s ap traffic
````

日本語補足（technical-retained）:

````text
s ap traffic
````

注: 鍵導出のラベルとして使われる技術文字列を保持。

## fence:483-496/line:12:column:69

原文:

````text
d ap traffic
````

日本語補足（technical-retained）:

````text
d ap traffic
````

注: 鍵導出のラベルとして使われる技術文字列を保持。

## fence:501-518/line:1

原文:

````text
Expand to generate actual handshake keys
````

日本語補足（agent-reviewed）:

````text
展開して実際のハンドシェイク鍵を生成
````

## fence:35-67

原文:

````text
Client (A)                                      Client (B)
|                                                 |
| -- Initiate Short-term Key Creation Process --> |
|                                                 |
|      (Create Temporary Encryption Key)          |
|                                                 |
| <---- Temporary Key Created ----                |
|                                                 |
|       (Key has an expiration time)              |
|                                                 |
|      (Monitor Key Validity)                     |
|                                                 |
|   (Before expiration, restart creation process) |
|                                                 |
| (A and B now have a negotiated short-term key)  |
|                                                 |
| ---- Encrypted Message ---->                    |
|                                                 |
|     (Encrypt message using short-term key)      |
|     (Send via message server)                   |
|                                                 |
| <---- Receive Encrypted Message ----            |
|                                                 |
|     (Find stored key using key ID)              |
|     (Decrypt message)                           |
|      (If key not found or expired)              |
|                                                 |
| <---- or Error Message ----                     |
|                                                 |
|      (Notify A to update short-term key)        |
|                                                 |
````

日本語補足（agent-reviewed）:

````text
登場主体：クライアントA、クライアントB。

1. A→B：短期鍵の作成処理を開始。
2. 一時的な暗号化鍵を作成。
3. B→A：一時鍵を作成済み。
4. 鍵には有効期限がある。
5. 鍵の有効性を監視。
6. 有効期限の前に作成処理を再開。
7. AとBは、交渉済みの短期鍵を保持した状態になる。
8. A→B：暗号化メッセージ。
9. 短期鍵でメッセージを暗号化。
10. メッセージサーバーを介して送信。
11. B→A：暗号化メッセージの受信（原図の左向き矢印に対応）。
12. 鍵IDを使って保存済みの鍵を検索。
13. メッセージを復号。
14. 鍵が見つからない、または期限切れの場合。
15. B→A：または、エラーメッセージ。
16. Aに短期鍵の更新を通知。
````

## fence:98-116

原文:

````text
Client (A)                                          Server (B)
   |                                                    |
   |  ---------------- SourceHello ---------------->    |
   |                                                    |
   |                  (Includes public key and signature)|
   |                                                    |
   |                                                    |
   |  <------------- DestinationHello ------------      |
   |                                                    |
   |                  (Includes public key and signature)|
   |                                                    |
   |                                                    |
   |  -------- Finished (Includes verify_data) -------> |
   |                                                    |
   |  <-------- Finished (Includes verify_data) --------|
   |                                                    |
   |                                                    |
````

日本語補足（agent-reviewed）:

````text
登場主体：クライアントA、サーバーB。

1. A→B：SourceHello。公開鍵と署名を含む。
2. B→A：DestinationHello。公開鍵と署名を含む。
3. A→B：Finished。verify_dataを含む。
4. B→A：Finished。verify_dataを含む。
````
