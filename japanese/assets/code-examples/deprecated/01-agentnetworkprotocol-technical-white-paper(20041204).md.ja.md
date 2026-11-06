# deprecated/01-agentnetworkprotocol-technical-white-paper(20041204).md のコード例・図ラベルの日本語補足

原文: [deprecated/01-agentnetworkprotocol-technical-white-paper(20041204).md](../../../../deprecated/01-agentnetworkprotocol-technical-white-paper%2820041204%29.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:168-186

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
