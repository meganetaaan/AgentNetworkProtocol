# chinese/deprecated/04-基于did的端到端加密通信技术协议.md のコード例・図ラベルの日本語補足

原文: [chinese/deprecated/04-基于did的端到端加密通信技术协议.md](../../../../../chinese/deprecated/04-基于did的端到端加密通信技术协议.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:210-233/line:1

原文:

````text
1. 创建json消息的所有字段，排除proofValue字段
````

日本語補足（agent-reviewed）:

````text
1. proofValueフィールドを除く、jsonメッセージの全フィールドを作成
````

## fence:210-233/line:3

原文:

````text
其他必要的字段
````

日本語補足（agent-reviewed）:

````text
その他の必須フィールド
````

## fence:210-233/line:8

原文:

````text
proofValue 字段除外
````

日本語補足（agent-reviewed）:

````text
proofValueフィールドを除く
````

## fence:210-233/line:12

原文:

````text
2. 将msg转换为JSON字符串，按键排序，并使用逗号和冒号作为分隔符
````

日本語補足（agent-reviewed）:

````text
2. msgをJSON文字列へ変換し、キーで並べ替え、カンマとコロンを区切りに使用
````

## fence:210-233/line:15

原文:

````text
3. 将JSON字符串编码为UTF-8字节
````

日本語補足（agent-reviewed）:

````text
3. JSON文字列をUTF-8バイト列へ符号化
````

## fence:210-233/line:18

原文:

````text
4. 使用私钥和ECDSA算法对字节数据进行签名
````

日本語補足（agent-reviewed）:

````text
4. 秘密鍵とECDSAアルゴリズムを使ってバイトデータへ署名
````

## fence:210-233/line:21

原文:

````text
5. 将签名值添加到json消息的proof字段中
````

日本語補足（agent-reviewed）:

````text
5. 署名値をjsonメッセージのproofフィールドへ追加
````

## fence:387-423/line:1

原文:

````text
TLS_AES_128_GCM_SHA256加密函数
````

日本語補足（agent-reviewed）:

````text
TLS_AES_128_GCM_SHA256暗号化関数
````

## fence:387-423/line:3

原文:

````text
确保密钥长度为16字节（128位）
````

日本語補足（agent-reviewed）:

````text
鍵長が16バイト（128ビット）であることを確認
````

## fence:387-423/line:7

原文:

````text
生成随机IV
````

日本語補足（agent-reviewed）:

````text
ランダムなIVを生成
````

## fence:387-423/line:8

原文:

````text
对于GCM，推荐的IV长度是12字节
````

日本語補足（agent-reviewed）:

````text
GCMの推奨IV長は12バイト
````

## fence:387-423/line:10

原文:

````text
创建加密对象
````

日本語補足（agent-reviewed）:

````text
暗号化オブジェクトを作成
````

## fence:387-423/line:17

原文:

````text
加密数据
````

日本語補足（agent-reviewed）:

````text
データを暗号化
````

## fence:387-423/line:20

原文:

````text
获取tag
````

日本語補足（agent-reviewed）:

````text
tagを取得
````

## fence:387-423/line:23

原文:

````text
编码为Base64
````

日本語補足（agent-reviewed）:

````text
Base64へ符号化
````

## fence:387-423/line:28

原文:

````text
创建JSON对象
````

日本語補足（agent-reviewed）:

````text
JSONオブジェクトを作成
````

## fence:387-423/line:5

原文:

````text
Key must be 128 bits (16 bytes).
````

日本語補足（agent-reviewed）:

````text
鍵は128ビット（16バイト）でなければなりません。
````

## fence:432-440/line:2

原文:

````text
确保使用的是cryptography库中的哈希算法实例
````

日本語補足（agent-reviewed）:

````text
cryptographyライブラリのハッシュアルゴリズムのインスタンスを使用していることを確認
````

## fence:432-440/line:3

原文:

````text
生成8字节的密钥
````

日本語補足（agent-reviewed）:

````text
8バイトの鍵を生成
````

## fence:432-440/line:5

原文:

````text
可选的上下文信息，用于区分不同用途的密钥
````

日本語補足（agent-reviewed）:

````text
用途の異なる鍵を区別するための任意のコンテキスト情報
````

## fence:432-440/line:6

原文:

````text
使用默认的加密后端
````

日本語補足（agent-reviewed）:

````text
既定の暗号化バックエンドを使用
````

## fence:447-471/line:9

原文:

````text
使用HKDF派生8字节的随机数
````

日本語補足（agent-reviewed）:

````text
HKDFを使って8バイトの乱数を導出
````

## fence:447-471/line:11

原文:

````text
确保使用的是cryptography库中的哈希算法实例
````

日本語補足（agent-reviewed）:

````text
cryptographyライブラリのハッシュアルゴリズムのインスタンスを使用していることを確認
````

## fence:447-471/line:12

原文:

````text
生成8字节的密钥
````

日本語補足（agent-reviewed）:

````text
8バイトの鍵を生成
````

## fence:447-471/line:14

原文:

````text
可选的上下文信息，用于区分不同用途的密钥
````

日本語補足（agent-reviewed）:

````text
用途の異なる鍵を区別するための任意のコンテキスト情報
````

## fence:447-471/line:15

原文:

````text
使用默认的加密后端
````

日本語補足（agent-reviewed）:

````text
既定の暗号化バックエンドを使用
````

## fence:447-471/line:20

原文:

````text
将派生的密钥编码为十六进制字符串
````

日本語補足（agent-reviewed）:

````text
導出した鍵を16進数文字列へ符号化
````

## fence:496-509/line:10

原文:

````text
Generate handshake traffic secrets
````

日本語補足（agent-reviewed）:

````text
ハンドシェイクのトラフィック秘密情報を生成
````

## fence:514-531/line:1

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

## fence:100-118

原文:

````text
Client (A)                                          Server (B)
   |                                                    |
   |  ---------------- SourceHello ---------------->    |
   |                                                    |
   |                  (包含公钥和签名)                    |
   |                                                    |
   |                                                    |
   |  <------------- DestinationHello ------------      |
   |                                                    |
   |                  (包含公钥和签名)                    |
   |                                                    |
   |                                                    |
   |  -------- Finished (包含verify_data) ------->       |
   |                                                    |
   |  <-------- Finished (包含verify_data) --------      |
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
