# chinese/deprecated/01-AgentNetworkProtocol技术白皮书(20041204).md のコード例・図ラベルの日本語補足

原文: [chinese/deprecated/01-AgentNetworkProtocol技术白皮书(20041204).md](../../../../../chinese/deprecated/01-AgentNetworkProtocol技术白皮书%2820041204%29.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:160-192

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

## fence:211-229

原文:

````text
Client (A)                                          Server (B)
   |                                                    |
   |  ---------------- SourceHello ---------------->    |
   |                                                    |
   |         (Include public key and signature)         |
   |                                                    |
   |                                                    |
   |  <------------- DestinationHello ------------      |
   |                                                    |
   |         (Include public key and signature)         |
   |                                                    |
   |                                                    |
   |  -------- Finished (Include verify_data) ------->  |
   |                                                    |
   |  <-------- Finished (Include verify_data) -------- |
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
