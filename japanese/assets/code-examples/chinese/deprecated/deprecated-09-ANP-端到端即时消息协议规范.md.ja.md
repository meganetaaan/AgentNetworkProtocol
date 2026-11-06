# chinese/deprecated/deprecated-09-ANP-端到端即时消息协议规范.md のコード例・図ラベルの日本語補足

原文: [chinese/deprecated/deprecated-09-ANP-端到端即时消息协议规范.md](../../../../../chinese/deprecated/deprecated-09-ANP-端到端即时消息协议规范.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:133-143//error/message

原文:

````text
错误描述
````

日本語補足（agent-reviewed）:

````text
エラーの説明
````

## fence:181-215//name

原文:

````text
示例聊天智能体
````

日本語補足（agent-reviewed）:

````text
チャットエージェントの例
````

## fence:181-215//interfaces/0/description

原文:

````text
ANP E2EE 即时消息协议，支持私聊、群聊和端到端加密通信。
````

日本語補足（agent-reviewed）:

````text
ANP E2EEインスタントメッセージングプロトコル。個別チャット、グループチャット、エンドツーエンド暗号化通信に対応します。
````

## fence:181-215//interfaces/0/content/endpoints/0/description

原文:

````text
消息服务端点，用于发送、接收和管理消息，包括 E2EE 加密消息
````

日本語補足（agent-reviewed）:

````text
メッセージを送受信・管理するためのメッセージサービスエンドポイント。E2EE暗号化メッセージも含みます。
````

## fence:181-215//interfaces/0/content/endpoints/1/description

原文:

````text
群组服务端点，用于群组管理和群组消息
````

日本語補足（agent-reviewed）:

````text
グループ管理とグループメッセージのためのグループサービスエンドポイント
````

## fence:181-215//interfaces/0/content/e2ee/description

原文:

````text
E2EE 能力：ECDHE 密钥交换、AES-GCM 加密，仅支持私聊
````

日本語補足（agent-reviewed）:

````text
E2EE機能：ECDHE鍵交換、AES-GCM暗号化。個別チャットのみ対応。
````

## fence:676-694//result/groups/0/name

原文:

````text
开发群
````

日本語補足（agent-reviewed）:

````text
開発グループ
````

## fence:676-694//result/groups/0/description

原文:

````text
开发者交流群
````

日本語補足（agent-reviewed）:

````text
開発者交流グループ
````

## fence:723-736//result/name

原文:

````text
开发群
````

日本語補足（agent-reviewed）:

````text
開発グループ
````

## fence:723-736//result/description

原文:

````text
开发者交流群
````

日本語補足（agent-reviewed）:

````text
開発者交流グループ
````

## fence:1149-1205/line:8

原文:

````text
1. HKDF 提取阶段：从共享秘密提取伪随机密钥
````

日本語補足（agent-reviewed）:

````text
1. HKDFの抽出段階：共有秘密から疑似ランダム鍵を抽出
````

## fence:1149-1205/line:18

原文:

````text
2. 生成握手流量密钥
````

日本語補足（agent-reviewed）:

````text
2. ハンドシェイクのトラフィック鍵を生成
````

## fence:1149-1205/line:40

原文:

````text
3. 扩展生成实际加密密钥
````

日本語補足（agent-reviewed）:

````text
3. 展開して実際の暗号化鍵を生成
````

## fence:1149-1205/line:43

原文:

````text
16 字节 (AES-128)
````

日本語補足（agent-reviewed）:

````text
16バイト（AES-128）
````

## fence:1220-1239/line:11

原文:

````text
生成 8 字节
````

日本語補足（agent-reviewed）:

````text
8バイトを生成
````

## fence:1220-1239/line:18

原文:

````text
16 个十六进制字符
````

日本語補足（agent-reviewed）:

````text
16文字の16進数
````

## fence:1245-1273/line:12

原文:

````text
GCM 推荐 12 字节 IV
````

日本語補足（agent-reviewed）:

````text
GCMでは12バイトのIVを推奨
````

## fence:1245-1273/line:7

原文:

````text
AES-128-GCM 加密
````

日本語補足（agent-reviewed）:

````text
AES-128-GCM暗号化
````

## fence:1245-1273/line:8

原文:

````text
AES-128-GCM 加密
````

日本語補足（agent-reviewed）:

````text
AES-128-GCM暗号化
````

## fence:1245-1273/line:10

原文:

````text
Key must be 128 bits (16 bytes).
````

日本語補足（agent-reviewed）:

````text
鍵は128ビット（16バイト）でなければなりません。
````

## fence:1289-1319/line:4

原文:

````text
1. 构造消息，排除 proof_value 字段
````

日本語補足（agent-reviewed）:

````text
1. proof_valueフィールドを除いてメッセージを構築
````

## fence:1289-1319/line:7

原文:

````text
... 其他字段
````

日本語補足（agent-reviewed）:

````text
…その他のフィールド
````

## fence:1289-1319/line:12

原文:

````text
proof_value 除外
````

日本語補足（agent-reviewed）:

````text
proof_valueを除く
````

## fence:1289-1319/line:16

原文:

````text
2. 转换为排序的 JSON 字符串
````

日本語補足（agent-reviewed）:

````text
2. 並べ替えたJSON文字列へ変換
````

## fence:1289-1319/line:19

原文:

````text
3. 编码为 UTF-8 字节
````

日本語補足（agent-reviewed）:

````text
3. UTF-8バイト列へ符号化
````

## fence:1289-1319/line:22

原文:

````text
4. 使用 ECDSA + SHA-256 签名
````

日本語補足（agent-reviewed）:

````text
4. ECDSA + SHA-256で署名
````

## fence:1289-1319/line:28

原文:

````text
5. Base64URL 编码
````

日本語補足（agent-reviewed）:

````text
5. Base64URLへ符号化
````

## fence:830-863

原文:

````text
Alice                           Message Server                          Bob
  |                                   |                                   |
  |  send(type=e2ee_hello)            |                                   |
  |  content=SourceHello              |                                   |
  |---------------------------------->|  send(type=e2ee_hello)            |
  |                                   |  content=SourceHello              |
  |                                   |---------------------------------->|
  |                                   |                                   |
  |                                   |  send(type=e2ee_hello)            |
  |                                   |  content=DestinationHello         |
  |  send(type=e2ee_hello)            |<----------------------------------|
  |  content=DestinationHello         |                                   |
  |<----------------------------------|  send(type=e2ee_finished)         |
  |                                   |  content=Finished                 |
  |  send(type=e2ee_finished)         |<----------------------------------|
  |  content=Finished                 |                                   |
  |<----------------------------------|                                   |
  |                                   |                                   |
  |  send(type=e2ee_finished)         |                                   |
  |  content=Finished                 |                                   |
  |---------------------------------->|  send(type=e2ee_finished)         |
  |                                   |  content=Finished                 |
  |                                   |---------------------------------->|
  |                                   |                                   |
  |           [双方会话激活，开始加密通信]                                    |
  |                                   |                                   |
  |  send(type=e2ee)                  |                                   |
  |  content=加密消息                  |                                   |
  |---------------------------------->|  send(type=e2ee)                  |
  |                                   |  content=加密消息                  |
  |                                   |---------------------------------->|
  |                                   |                                   |
````

日本語補足（agent-reviewed）:

````text
登場主体：Alice、メッセージサーバー（Message Server）、Bob。

1. Alice→メッセージサーバー：send(type=e2ee_hello)、content=SourceHello。
2. メッセージサーバー→Bob：send(type=e2ee_hello)、content=SourceHello。
3. Bob→メッセージサーバー：send(type=e2ee_hello)、content=DestinationHello。
4. メッセージサーバー→Alice：send(type=e2ee_hello)、content=DestinationHello。
5. Bob→メッセージサーバー：send(type=e2ee_finished)、content=Finished。
6. メッセージサーバー→Alice：send(type=e2ee_finished)、content=Finished。
7. Alice→メッセージサーバー：send(type=e2ee_finished)、content=Finished。
8. メッセージサーバー→Bob：send(type=e2ee_finished)、content=Finished。
9. 双方のセッションがアクティブになり、暗号化通信を開始。
10. Alice→メッセージサーバー：send(type=e2ee)、contentは暗号化メッセージ。
11. メッセージサーバー→Bob：send(type=e2ee)、contentは暗号化メッセージ。
````
