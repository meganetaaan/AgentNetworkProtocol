<!-- translation-review: full; source=chinese/deprecated/deprecated-09-ANP-端到端即时消息协议规范.md -->
> 日本語参考訳（原文全文照合・校閲済み）。保存されたDraftの旧IMです。E2EEは直接通信のみ、群は平文、認証optional/none、サーバー間は対象外という当時の設計を保持しており、現行プロファイルとは異なります。
> 原文: [chinese/deprecated/deprecated-09-ANP-端到端即时消息协议规范.md](../../../chinese/deprecated/deprecated-09-ANP-端到端即时消息协议规范.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP端末間インスタントメッセージ仕様（Draft）

注：まだ草案であり、さらに最適化・改訂する予定です。

## 概要

HTTPとJSON-RPC 2.0によるIMを定義します。直接通信、グループ、端末間暗号化（E2EE）に対応し、`did:wba`とDID WBA認証を使います。

[旧04暗号仕様](04-基于did的端到端加密通信技术协议.md)と[旧05メッセージサービス](05-基于did的消息服务协议.md)のWebSocket方式を置き換えます。暗号の中心的な処理を保ち、転送をHTTP + JSON-RPC 2.0に統一します。

## 1. 背景

### 1.1 従来方式

初期には、二つの仕様がありました。
- **04 暗号通信**：WebSocket上のSourceHello、DestinationHello、Finishedと、ECDHEの短期鍵合意。
- **05 メッセージサービス**：WebSocketの配送・転送、Message Proxy接続、router登録、生存確認。

複雑すぎたため、単純な方式を実装します。

### 1.2 動機

1. **単純で信頼できる**：HTTPは広く普及し、どの言語や環境にも成熟したライブラリがあります。
2. **標準**：JSON-RPC 2.0は、要求・応答とエラーを統一します。
3. **状態を持たない**：長期接続を維持せず、サーバーを単純化します。
4. **拡張**：RESTfulの認証、制限、監視と統合しやすい方式です。
5. **ファイアウォール**：ほとんどの網で、HTTP/HTTPSが使えます。

### 1.3 関係

本09仕様は、04と05を置き換えます。
- **04**：ECDHE、AES-GCM、署名の中心は同じで、独立したWebSocketメッセージを、JSON-RPCの`send`の`content`内へ移します。
- **05**：長期接続からHTTP呼び出しへ変え、Proxyやrouter登録を除きます。

## 2. 全体像

### 2.1 構造

メッセージサーバーの中継モデルです。

```plaintext
+-------+          +----------------+          +----------------+          +-------+
|       |  HTTP    |                |   HTTP   |                |  HTTP    |       |
| Agent | <------> | Message Server | <------> | Message Server | <------> | Agent |
|  (A)  | JSON-RPC |     (A's)      |          |     (B's)      | JSON-RPC |  (B)  |
+-------+          +----------------+          +----------------+          +-------+
```

- **Agent**：`did:wba`で識別する送受信者です。
- **Message Server**：保存、受信箱、グループなどを提供します。
- Agentと所属サーバーはHTTP JSON-RPC 2.0で通信します。
- サーバー同士の通信は、本仕様の対象外です。

### 2.2 主な特徴

| 項目 | 内容 |
| --- | --- |
| 転送 | HTTP + JSON-RPC 2.0 |
| 形式 | `application/json` |
| 身元 | `did:wba`（分散型識別子） |
| 認証 | DID WBA。[方式仕様](03-did-wba方法规范-2026-03-28.md)を参照 |
| メッセージ | 直接・グループ |
| E2EE | ECDHE。直接通信のみ |

### 2.3 原則

1. **単純**：HTTP、JSON-RPC、JSONという成熟した標準を使います。
2. **安全**：E2EEの暗号メッセージを透過的に転送し、サーバーは内容を読めません。
3. **開放**：DIDで、場所とドメインを越えて接続します。
4. **実用**：完全なメッセージ管理を、実際の用途向けに提供します。

## 3. 身元と認証

### 3.1 DID形式

`did:wba`を使います。[方式仕様](03-did-wba方法规范-2026-03-28.md)も参照してください。

**利用者**：

```
did:wba:{domain}:user:{username}
```

例：`did:wba:example.com:user:alice`

**グループ**：

```
did:wba:{domain}:group:{group_id}
```

例：`did:wba:example.com:group:group_dev`

存在しないDIDには、`-32002`（資源がない）を返します。

### 3.2 認証

ANP共通のDID WBAを使います。[詳細](03-did-wba方法规范-2026-03-28.md)を参照してください。

## 4. JSON-RPC 2.0による転送

### 4.1 要求と応答

すべてのAPIを、HTTP POSTで呼びます。

**要求**：

```json
{
  "jsonrpc": "2.0",
  "method": "method_name",
  "params": { ... },
  "id": 1
}
```

**成功**：

```json
{
  "jsonrpc": "2.0",
  "result": { ... },
  "id": 1
}
```

**エラー**：

```json
{
  "jsonrpc": "2.0",
  "error": {
    "code": -32000,
    "message": "错误描述",
    "data": null
  },
  "id": 1
}
```

### 4.2 エラーコード

標準に、業務のコードを追加します。

| コード | 意味 | 説明 |
| --- | --- | --- |
| -32700 | JSON解析エラー | 本文が有効なJSONでない |
| -32600 | 不正な要求 | JSON-RPC 2.0に適合しない |
| -32601 | 方法がない | 未定義の名前 |
| -32602 | パラメーター不正 | E2EEの制約を含む検証失敗 |
| -32603 | 内部エラー | サーバー内の問題 |
| -32000 | 未認証 | 必要な有効な資格情報がない |
| -32001 | 権限なし | 認証済みだが操作できない |
| -32002 | 資源なし | DIDやメッセージがない |
| -32003 | 資源の競合 | 既存または状態が競合 |
| -32004 | 業務検証エラー | 業務規則に適合しない |
| -32005 | 頻度制限 | 要求が多すぎる |

### 4.3 転送方法

- HTTP/HTTPS POST
- `Content-Type: application/json`
- UTF-8

どのインターフェースも、JSON-RPC 2.0のJSONオブジェクトを本文にします。

## 5. エージェント記述への統合

ADでE2EE IMを宣言し、自動発見とやり取りを可能にします。組み込みのプロトコル型として扱います。[AD仕様](../07-ANP-智能体描述协议规范.md)を参照してください。

### 5.1 宣言

`interfaces`に項目を加えます。組み込みなので、外部の`url`ではなく、`content`に宛先と能力を直接記述します。

**ADの例**：

```json
{
  "protocolType": "ANP",
  "protocolVersion": "1.0.0",
  "type": "AgentDescription",
  "name": "示例聊天智能体",
  "did": "did:wba:example.com:user:alice",
  "interfaces": [
    {
      "type": "StructuredInterface",
      "protocol": "ANP-E2EE-IM",
      "version": "1.0",
      "description": "ANP E2EE 即时消息协议，支持私聊、群聊和端到端加密通信。",
      "content": {
        "endpoints": [
          {
            "path": "/api/v1/messages/rpc",
            "description": "消息服务端点，用于发送、接收和管理消息，包括 E2EE 加密消息"
          },
          {
            "path": "/api/v1/groups/rpc",
            "description": "群组服务端点，用于群组管理和群组消息"
          }
        ],
        "e2ee": {
          "supported_versions": ["1.0"],
          "cipher_suites": ["TLS_AES_128_GCM_SHA256"],
          "supported_groups": ["secp256r1"],
          "description": "E2EE 能力：ECDHE 密钥交换、AES-GCM 加密，仅支持私聊"
        }
      }
    }
  ]
}
```

### 5.2 フィールド

**インターフェース**：

| フィールド | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| type | string | 必須 | `"StructuredInterface"` |
| protocol | string | 必須 | `"ANP-E2EE-IM"` |
| version | string | 必須 | `"1.0"`など |
| description | string | 任意 | 人が読める説明 |
| content | object | 必須 | 宛先とE2EEの能力の直接記述 |

**content.endpointsの要素**：

| フィールド | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| path | string | 必須 | `/api/v1/messages/rpc`など |
| description | string | 任意 | 機能の説明 |

**content.e2ee**：

| フィールド | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| supported_versions | array | 必須 | 対応するE2EE版 |
| cipher_suites | array | 必須 | `["TLS_AES_128_GCM_SHA256"]`など |
| supported_groups | array | 必須 | `["secp256r1"]`などの曲線 |
| description | string | 任意 | 人が読める能力の説明 |

## 6. メッセージサービスAPI

二つの宛先に、10個のJSON-RPCメソッドを定義します。

### 6.1 メッセージ

**宛先**：`POST /api/v1/messages/rpc`

#### 6.1.1 send――送信

直接・群の送信に加え、E2EEのハンドシェイクと暗号文も運びます。

**認証**：optional。認証済みなら、senderの一致を検証します。

| パラメーター | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| sender_did | string | 必須 | 送信者DID |
| sender_name | string | 任意 | 名前 |
| receiver_did | string | 条件付き | 直接通信。group_didと排他 |
| group_did | string | 条件付き | 群。receiver_didと排他 |
| content | string | 必須 | 通常は平文、E2EEはJSONを文字列化 |
| type | string | 任意 | 既定は`text` |
| timestamp | datetime | 任意 | クライアントの送信時刻 |

**type**：

| 値 | 区分 | 説明 |
| --- | --- | --- |
| `text` | 通常 | テキスト |
| `image` | 通常 | 画像 |
| `file` | 通常 | ファイル |
| `e2ee_hello` | E2EE | SourceHelloまたはDestinationHello |
| `e2ee_finished` | E2EE | 完了確認 |
| `e2ee` | E2EE | 暗号文 |
| `e2ee_error` | E2EE | エラー |

**制約**：
- `e2ee_hello`、`e2ee_finished`、`e2ee`、`e2ee_error`は、**直接通信だけ**です。
- `receiver_did`が必須で、`group_did`は使えません。
- 違反は`-32602`です。

**直接要求**：

```json
{
  "jsonrpc": "2.0",
  "method": "send",
  "params": {
    "sender_did": "did:wba:example.com:user:alice",
    "receiver_did": "did:wba:example.com:user:bob",
    "content": "你好",
    "type": "text"
  },
  "id": 1
}
```

**群要求**：

```json
{
  "jsonrpc": "2.0",
  "method": "send",
  "params": {
    "sender_did": "did:wba:example.com:user:alice",
    "group_did": "did:wba:example.com:group:group_dev",
    "content": "大家好"
  },
  "id": 1
}
```

**応答**：

```json
{
  "jsonrpc": "2.0",
  "result": {
    "id": "msg_001",
    "sender_did": "did:wba:example.com:user:alice",
    "sender_name": null,
    "receiver_did": "did:wba:example.com:user:bob",
    "group_did": null,
    "content": "你好",
    "type": "text",
    "sent_at": null,
    "created_at": "2024-01-15T10:30:01"
  },
  "id": 1
}
```

E2EEの例は第8節です。

#### 6.1.2 get_detail――詳細

指定したメッセージを取得します。**認証：none**。

| パラメーター | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| message_id | string | 必須 | メッセージID |

**要求**：

```json
{
  "jsonrpc": "2.0",
  "method": "get_detail",
  "params": {
    "message_id": "msg_001"
  },
  "id": 1
}
```

**応答**：

```json
{
  "jsonrpc": "2.0",
  "result": {
    "id": "msg_001",
    "sender_did": "did:wba:example.com:user:alice",
    "sender_name": null,
    "receiver_did": "did:wba:example.com:user:bob",
    "group_did": null,
    "content": "你好",
    "type": "text",
    "sent_at": null,
    "created_at": "2024-01-15T10:30:01"
  },
  "id": 1
}
```

#### 6.1.3 get_inbox――受信箱

現在の利用者の受信箱を照会します。**認証：optional**。

| パラメーター | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| user_did | string | 必須 | 現在の利用者 |
| since | datetime | 任意 | この時刻より後 |
| skip | int | 任意 | 飛ばす数。既定0 |
| limit | int | 任意 | 件数。既定50、最大100 |

**要求**：

```json
{
  "jsonrpc": "2.0",
  "method": "get_inbox",
  "params": {
    "user_did": "did:wba:example.com:user:bob"
  },
  "id": 1
}
```

**応答**：

```json
{
  "jsonrpc": "2.0",
  "result": {
    "messages": [
      {
        "id": "msg_001",
        "sender_did": "did:wba:example.com:user:alice",
        "sender_name": "Alice",
        "sender_avatar": "https://example.com/avatar/alice.png",
        "receiver_did": "did:wba:example.com:user:bob",
        "group_did": null,
        "group_name": null,
        "content": "你好",
        "type": "text",
        "sent_at": null,
        "created_at": "2024-01-15T10:30:00",
        "is_read": false
      }
    ],
    "total": 1,
    "has_more": false
  },
  "id": 1
}
```

#### 6.1.4 mark_read――既読

指定したメッセージを既読にします。**認証：optional**。

| パラメーター | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| user_did | string | 必須 | 現在の利用者 |
| message_ids | array | 必須 | 既読にする一覧 |

**要求**：

```json
{
  "jsonrpc": "2.0",
  "method": "mark_read",
  "params": {
    "user_did": "did:wba:example.com:user:bob",
    "message_ids": ["msg_001", "msg_002"]
  },
  "id": 1
}
```

**応答**：

```json
{
  "jsonrpc": "2.0",
  "result": {
    "updated_count": 2
  },
  "id": 1
}
```

#### 6.1.5 get_history――履歴

直接または群の履歴を取得します。**認証：optional**。

| パラメーター | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| user_did | string | 必須 | 現在の利用者 |
| peer_did | string | 条件付き | 直接の相手。group_didと排他 |
| group_did | string | 条件付き | 群。peer_didと排他 |
| since | datetime | 任意 | 差分取得の開始時刻 |
| skip | int | 任意 | 飛ばす数。既定0 |
| limit | int | 任意 | 件数。既定50 |

**直接の履歴**：

```json
{
  "jsonrpc": "2.0",
  "method": "get_history",
  "params": {
    "user_did": "did:wba:example.com:user:alice",
    "peer_did": "did:wba:example.com:user:bob"
  },
  "id": 1
}
```

**群の履歴**：

```json
{
  "jsonrpc": "2.0",
  "method": "get_history",
  "params": {
    "user_did": "did:wba:example.com:user:alice",
    "group_did": "did:wba:example.com:group:group_dev"
  },
  "id": 1
}
```

**応答**：

```json
{
  "jsonrpc": "2.0",
  "result": {
    "messages": [
      {
        "id": "msg_001",
        "sender_did": "did:wba:example.com:user:alice",
        "sender_name": "Alice",
        "receiver_did": "did:wba:example.com:user:bob",
        "group_did": null,
        "content": "你好",
        "type": "text",
        "sent_at": null,
        "created_at": "2024-01-15T10:30:00"
      }
    ],
    "total": 1
  },
  "id": 1
}
```

#### 6.1.6 get_batch_history――群の履歴を一括取得

複数の群をまとめて取得します。**認証：optional**。

| パラメーター | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| user_did | string | 必須 | 現在の利用者 |
| queries | array | 必須 | 各群の`[{group_did, since?}]` |
| limit | int | 任意 | 各群の上限。既定20 |

**要求**：

```json
{
  "jsonrpc": "2.0",
  "method": "get_batch_history",
  "params": {
    "user_did": "did:wba:example.com:user:alice",
    "queries": [
      {"group_did": "did:wba:example.com:group:group_1"},
      {"group_did": "did:wba:example.com:group:group_2", "since": "2024-01-15T00:00:00"}
    ],
    "limit": 20
  },
  "id": 1
}
```

**応答**：

```json
{
  "jsonrpc": "2.0",
  "result": {
    "groups": [
      {
        "group_id": "group_1",
        "messages": [...],
        "total": 5
      },
      {
        "group_id": "group_2",
        "messages": [...],
        "total": 3
      }
    ]
  },
  "id": 1
}
```

#### 6.1.7 delete_inbox――受信箱から削除

指定したメッセージを削除します。**認証：optional**。

| パラメーター | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| user_did | string | 必須 | 現在の利用者 |
| message_ids | array | 必須 | 削除する一覧 |

**要求**：

```json
{
  "jsonrpc": "2.0",
  "method": "delete_inbox",
  "params": {
    "user_did": "did:wba:example.com:user:bob",
    "message_ids": ["msg_001"]
  },
  "id": 1
}
```

**応答**：

```json
{
  "jsonrpc": "2.0",
  "result": {
    "deleted_count": 1
  },
  "id": 1
}
```

### 6.2 グループ

**宛先**：`POST /api/v1/groups/rpc`

#### 6.2.1 list――公開群の一覧

プラットフォームのすべての公開群を得ます。**認証：none**。

| パラメーター | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| skip | int | 任意 | 飛ばす数。既定0 |
| limit | int | 任意 | 件数。既定50、最大100 |

**要求**：

```json
{
  "jsonrpc": "2.0",
  "method": "list",
  "params": {},
  "id": 1
}
```

**応答**：

```json
{
  "jsonrpc": "2.0",
  "result": {
    "groups": [
      {
        "did": "did:wba:example.com:group:group_dev",
        "name": "开发群",
        "description": "开发者交流群",
        "avatar": null,
        "is_public": true,
        "created_at": "2024-01-15T10:00:00"
      }
    ],
    "total": 1
  },
  "id": 1
}
```

#### 6.2.2 get_detail――群の詳細

指定した群を調べます。**認証：none**。

| パラメーター | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| group_did | string | 必須 | 群DID |

**要求**：

```json
{
  "jsonrpc": "2.0",
  "method": "get_detail",
  "params": {
    "group_did": "did:wba:example.com:group:group_dev"
  },
  "id": 1
}
```

**応答**：

```json
{
  "jsonrpc": "2.0",
  "result": {
    "did": "did:wba:example.com:group:group_dev",
    "name": "开发群",
    "description": "开发者交流群",
    "avatar": null,
    "is_public": true,
    "created_at": "2024-01-15T10:00:00"
  },
  "id": 1
}
```

#### 6.2.3 get_messages――群のメッセージ

指定群の一覧を取得します。**認証：none**。

| パラメーター | 型 | 必須 | 説明 |
| --- | --- | --- | --- |
| group_did | string | 必須 | 群DID |
| limit | int | 任意 | 件数。既定50、最大100 |
| since | datetime | 任意 | この時刻より後 |

**要求**：

```json
{
  "jsonrpc": "2.0",
  "method": "get_messages",
  "params": {
    "group_did": "did:wba:example.com:group:group_dev",
    "limit": 20
  },
  "id": 1
}
```

**応答**：

```json
{
  "jsonrpc": "2.0",
  "result": {
    "messages": [
      {
        "id": "msg_010",
        "sender_did": "did:wba:example.com:user:alice",
        "sender_name": "Alice",
        "receiver_did": null,
        "group_did": "did:wba:example.com:group:group_dev",
        "content": "大家好",
        "type": "text",
        "sent_at": null,
        "created_at": "2024-01-15T10:30:00"
      }
    ],
    "total": 1
  },
  "id": 1
}
```

## 7. メッセージの種類

### 7.1 通常

| 型 | 説明 | content |
| --- | --- | --- |
| `text` | テキスト | 平文 |
| `image` | 画像 | URLまたはBase64 |
| `file` | ファイル | URLまたはメタデータ |

### 7.2 E2EE

すべて、`send`の`content`でJSONの文字列として運び、サーバーは**解析も変更もせず**透過的に転送します。

| type | 説明 | contentの構造 |
| --- | --- | --- |
| `e2ee_hello` | 開始 | `e2ee_type`で区別するSourceHello/DestinationHello |
| `e2ee_finished` | 完了 | Finished。`session_id`と`verify_data` |
| `e2ee` | 暗号文 | `secret_key_id`、`original_type`、`encrypted`（AES-GCM） |
| `e2ee_error` | エラー | `error_code`と`secret_key_id` |

詳細は8.3節です。

## 8. E2EEプロトコル

### 8.1 概要

ECDHEで、二つのAgentの通信を暗号化します。中心の暗号は、[旧04](04-基于did的端到端加密通信技术协议.md)と同じです。

- **直接のみ**：群のE2EEはありません。
- **透過的な転送**：`send`の`content`を、サーバーは解析・変更しません。
- **統一した転送**：`send`の`type`で、開始と暗号文を区別します。

### 8.2 ハンドシェイク

`send`でメッセージを交換し、鍵合意後に暗号通信します。

```plaintext
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
```

1. **AliceのSourceHello**：`send`で`type=e2ee_hello`を送り、公開鍵、対応パラメーター、署名をcontentに含めます。
2. **BobのDestinationHelloとFinished**：選択したパラメーターを`type=e2ee_hello`で、完了を`type=e2ee_finished`で、二つ送ります。
3. **AliceのFinished**：共有鍵を計算し、完了を送ります。
4. **活性化**：BobがAliceの完了を処理すると、双方の合意が完了します。
5. **暗号通信**：`type=e2ee`を相互に送ります。

### 8.3 E2EE content

すべて`send`の`content`で、JSONの文字列として運びます。

#### 8.3.1 SourceHello（e2ee_type=source_hello）

開始側が、本人情報、公開鍵、対応パラメーターを送ります。

| フィールド | 型 | 説明 |
| --- | --- | --- |
| e2ee_type | string | `"source_hello"` |
| version | string | バージョン |
| session_id | string | 16文字の乱数ID |
| source_did | string | 送信者 |
| destination_did | string | 受信者 |
| random | string | 一意性と交換に使う32文字の乱数 |
| supported_versions | array | 対応版 |
| cipher_suites | array | 対応暗号 |
| supported_groups | array | 対応曲線 |
| key_shares | array | 交換用公開鍵 |
| verification_method | object | 送信者DIDの公開鍵 |
| proof | object | 署名 |

**key_sharesの要素**：

| フィールド | 型 | 説明 |
| --- | --- | --- |
| group | string | `secp256r1`など |
| expires | number | 秒単位の期間 |
| key_exchange | string | 16進の交換用公開鍵 |

**verification_method**：

| フィールド | 型 | 説明 |
| --- | --- | --- |
| id | string | 検証方法ID |
| type | string | `EcdsaSecp256r1VerificationKey2019`など |
| public_key_hex | string | 16進の公開鍵 |

**proof**：

| フィールド | 型 | 説明 |
| --- | --- | --- |
| type | string | `EcdsaSecp256r1Signature2019`など |
| created | string | ISO 8601 UTC時刻 |
| verification_method | string | 署名の検証方法 |
| proof_value | string | Base64URLの署名 |

**文字列化前のcontent**：

```json
{
  "e2ee_type": "source_hello",
  "version": "1.0",
  "session_id": "abc123session",
  "source_did": "did:wba:example.com:user:alice",
  "destination_did": "did:wba:example.com:user:bob",
  "random": "b7e4b4d5f6c4e4f7a6b4c8d2e48f37a6c6c6f6d7b7a6e4b4d5f6c4e4f7a6b4c8d2e48f37a6c6c6f6d7b7a6e4b4d5f6c4e4f7a6",
  "supported_versions": ["1.0"],
  "cipher_suites": ["TLS_AES_128_GCM_SHA256"],
  "supported_groups": ["secp256r1"],
  "key_shares": [
    {
      "group": "secp256r1",
      "expires": 86400,
      "key_exchange": "04a34b..."
    }
  ],
  "verification_method": {
    "id": "did:wba:example.com:user:alice#keys-1",
    "type": "EcdsaSecp256r1VerificationKey2019",
    "public_key_hex": "04a34b..."
  },
  "proof": {
    "type": "EcdsaSecp256r1Signature2019",
    "created": "2024-05-27T10:51:55Z",
    "verification_method": "did:wba:example.com:user:alice#keys-1",
    "proof_value": "eyJhbGci..."
  }
}
```

**`send`要求**：

```json
{
  "jsonrpc": "2.0",
  "method": "send",
  "params": {
    "sender_did": "did:wba:example.com:user:alice",
    "receiver_did": "did:wba:example.com:user:bob",
    "content": "{\"e2ee_type\":\"source_hello\",\"version\":\"1.0\",\"session_id\":\"abc123\",\"source_did\":\"did:wba:example.com:user:alice\",\"destination_did\":\"did:wba:example.com:user:bob\",\"random\":\"...\",\"supported_versions\":[\"1.0\"],\"cipher_suites\":[\"TLS_AES_128_GCM_SHA256\"],\"supported_groups\":[\"secp256r1\"],\"key_shares\":[{\"group\":\"secp256r1\",\"expires\":86400,\"key_exchange\":\"...\"}],\"verification_method\":{\"id\":\"...\",\"type\":\"EcdsaSecp256r1VerificationKey2019\",\"public_key_hex\":\"...\"},\"proof\":{\"type\":\"EcdsaSecp256r1Signature2019\",\"created\":\"...\",\"verification_method\":\"...\",\"proof_value\":\"...\"}}",
    "type": "e2ee_hello"
  },
  "id": 1
}
```

#### 8.3.2 DestinationHello（e2ee_type=destination_hello）

受信側が、選択したパラメーターを返します。SourceHelloとの違いは次です。

| フィールド | 型 | 説明 |
| --- | --- | --- |
| e2ee_type | string | `"destination_hello"` |
| version | string | バージョン |
| session_id | string | SourceHelloと同じ |
| source_did | string | この応答の送信者 |
| destination_did | string | SourceHelloの送信者 |
| random | string | 32文字の乱数 |
| selected_version | string | 選んだ版。単数 |
| cipher_suite | string | 選んだ暗号。単数 |
| key_share | object | 選んだ交換情報。単数 |
| verification_method | object | 送信者DIDの公開鍵 |
| proof | object | 署名 |

**文字列化前のcontent**：

```json
{
  "e2ee_type": "destination_hello",
  "version": "1.0",
  "session_id": "abc123session",
  "source_did": "did:wba:example.com:user:bob",
  "destination_did": "did:wba:example.com:user:alice",
  "random": "e4b4d5f6c4e4f7a6b4c8d2e48f37a6c6c6f6d7b7a6e4b4d5f6c4e4f7a6b4c8d2e48f37a6c6c6f6d7b7a6e4b4d5f6c4e4f7a6",
  "selected_version": "1.0",
  "cipher_suite": "TLS_AES_128_GCM_SHA256",
  "key_share": {
    "group": "secp256r1",
    "expires": 86400,
    "key_exchange": "04b56c..."
  },
  "verification_method": {
    "id": "did:wba:example.com:user:bob#keys-1",
    "type": "EcdsaSecp256r1VerificationKey2019",
    "public_key_hex": "04b56c..."
  },
  "proof": {
    "type": "EcdsaSecp256r1Signature2019",
    "created": "2024-05-27T10:52:00Z",
    "verification_method": "did:wba:example.com:user:bob#keys-1",
    "proof_value": "eyJhbGci..."
  }
}
```

#### 8.3.3 Finished

完了を確認し、再送攻撃を防ぎます。

| フィールド | 型 | 説明 |
| --- | --- | --- |
| session_id | string | SourceHelloと同じ |
| verify_data | object | AES-GCMの検証データ |

**verify_data**：

| フィールド | 型 | 説明 |
| --- | --- | --- |
| iv | string | Base64の初期化ベクトル |
| tag | string | Base64の認証タグ |
| ciphertext | string | Base64の暗号文。平文は`{"secretKeyId":"..."}` |

**文字列化前のcontent**：

```json
{
  "session_id": "abc123session",
  "verify_data": {
    "iv": "dGVzdGl2MTIzNDU2",
    "tag": "dGVzdHRhZzEyMzQ1Njc4",
    "ciphertext": "ZW5jcnlwdGVkZGF0YQ=="
  }
}
```

#### 8.3.4 暗号メッセージ

合意した短期鍵で暗号化します。

| フィールド | 型 | 説明 |
| --- | --- | --- |
| secret_key_id | string | 16桁の16進ID |
| original_type | string | `text`、`image`などの元の型 |
| encrypted | object | AES-GCMのデータ |

**encrypted**：

| フィールド | 型 | 説明 |
| --- | --- | --- |
| iv | string | Base64の初期化ベクトル |
| tag | string | Base64の認証タグ |
| ciphertext | string | Base64の暗号文 |

**文字列化前のcontent**：

```json
{
  "secret_key_id": "0123456789abcdef",
  "original_type": "text",
  "encrypted": {
    "iv": "dGVzdGl2MTIzNDU2",
    "tag": "dGVzdHRhZzEyMzQ1Njc4",
    "ciphertext": "ZW5jcnlwdGVkbWVzc2FnZQ=="
  }
}
```

**send要求**：

```json
{
  "jsonrpc": "2.0",
  "method": "send",
  "params": {
    "sender_did": "did:wba:example.com:user:alice",
    "receiver_did": "did:wba:example.com:user:bob",
    "content": "{\"secret_key_id\":\"0123456789abcdef\",\"original_type\":\"text\",\"encrypted\":{\"iv\":\"...\",\"tag\":\"...\",\"ciphertext\":\"...\"}}",
    "type": "e2ee"
  },
  "id": 1
}
```

#### 8.3.5 E2EEエラー

鍵の期限切れや不在を知らせ、再合意させます。

| フィールド | 型 | 説明 |
| --- | --- | --- |
| error_code | string | `key_expired`または`key_not_found` |
| secret_key_id | string | 対象の鍵 |

**文字列化前のcontent**：

```json
{
  "error_code": "key_expired",
  "secret_key_id": "0123456789abcdef"
}
```

### 8.4 鍵合意

ECDHEで、TLS 1.3に似た交換を行います。

| 項目 | 対応値 |
| --- | --- |
| 暗号 | `TLS_AES_128_GCM_SHA256` |
| 曲線 | `secp256r1` |

#### 8.4.1 共有鍵

1. **相手の公開鍵**：Helloの`key_shares`/`key_share`の`key_exchange`から、16進の曲線公開鍵を取得します。
2. **共有秘密**：自分の秘密鍵と相手の公開鍵で、ECDHを計算します。
3. **長さ**：`TLS_AES_128_GCM_SHA256`なら128ビット／16バイトです。

#### 8.4.2 短期の暗号鍵

HKDFで、共有秘密から実際の鍵を導きます。

```python
from cryptography.hazmat.primitives.kdf.hkdf import HKDF, HKDFExpand
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend

hash_algorithm = hashes.SHA256()
backend = default_backend()

# 1. HKDF 提取阶段：从共享秘密提取伪随机密钥
hkdf_extract = HKDF(
    algorithm=hash_algorithm,
    length=hash_algorithm.digest_size,
    salt=b'\x00' * hash_algorithm.digest_size,
    info=b'',
    backend=backend
)
extracted_key = hkdf_extract.derive(shared_secret)

# 2. 生成握手流量密钥
def derive_secret(secret: bytes, label: bytes, messages: bytes) -> bytes:
    hkdf_expand = HKDFExpand(
        algorithm=hash_algorithm,
        length=hash_algorithm.digest_size,
        info=hkdf_label(hash_algorithm.digest_size, label, messages),
        backend=backend
    )
    return hkdf_expand.derive(secret)

source_hello_random = source_hello["random"].encode('utf-8')
destination_hello_random = destination_hello["random"].encode('utf-8')

source_data_traffic_secret = derive_secret(
    extracted_key, b"s ap traffic",
    source_hello_random + destination_hello_random
)
destination_data_traffic_secret = derive_secret(
    extracted_key, b"d ap traffic",
    source_hello_random + destination_hello_random
)

# 3. 扩展生成实际加密密钥
source_data_key = HKDF(
    algorithm=hash_algorithm,
    length=key_length,  # 16 字节 (AES-128)
    salt=None,
    info=hkdf_label(32, b"key", source_data_traffic_secret),
    backend=backend
).derive(source_data_traffic_secret)

destination_data_key = HKDF(
    algorithm=hash_algorithm,
    length=key_length,
    salt=None,
    info=hkdf_label(32, b"key", destination_data_traffic_secret),
    backend=backend
).derive(destination_data_traffic_secret)
```

`source_data_key`が開始側、`destination_data_key`が受信側の暗号鍵です。Sourceは`source_data_key`で暗号化し、Destinationは`source_data_key`で復号します。逆方向も同様です。

#### 8.4.3 secretKeyId

`secret_key_id`は、どの短期鍵を使ったかを示し、鍵の期間中だけ有効です。

1. Helloの`random`を、SourceHello、DestinationHelloの順に区切りなしでつなぎます。
2. UTF-8にします。
3. HKDFで8バイトを導きます。
4. 16文字の16進表現にします。

```python
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend

def generate_secret_key_id(source_random: str, destination_random: str) -> str:
    content = source_random + destination_random
    random_bytes = content.encode('utf-8')

    hkdf = HKDF(
        algorithm=hashes.SHA256(),
        length=8,  # 生成 8 字节
        salt=None,
        info=b'',
        backend=default_backend()
    )

    derived_key = hkdf.derive(random_bytes)
    return derived_key.hex()  # 16 个十六进制字符
```

#### 8.4.4 AES-GCM

`TLS_AES_128_GCM_SHA256`で暗号化します。

```python
import os
import base64
from typing import Dict
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend

def encrypt_aes_gcm(data: bytes, key: bytes) -> Dict[str, str]:
    """AES-128-GCM 加密"""
    if len(key) != 16:
        raise ValueError("Key must be 128 bits (16 bytes).")

    iv = os.urandom(12)  # GCM 推荐 12 字节 IV

    encryptor = Cipher(
        algorithms.AES(key),
        modes.GCM(iv),
        backend=default_backend()
    ).encryptor()

    ciphertext = encryptor.update(data) + encryptor.finalize()
    tag = encryptor.tag

    return {
        "iv": base64.b64encode(iv).decode('utf-8'),
        "tag": base64.b64encode(tag).decode('utf-8'),
        "ciphertext": base64.b64encode(ciphertext).decode('utf-8')
    }
```

### 8.5 署名と検証

#### 8.5.1 proofValue

両方のHelloに署名し、完全性と本人性を確保します。

1. `proof`内の`proof_value`以外の全項目を作ります。
2. カンマとコロンを区切りとするJSON文字列にし、**鍵を並べ替えます**。
3. UTF-8にします。
4. ECDSA + SHA-256で署名します。
5. Base64URLにして`proof_value`へ入れます。

```python
import json
import base64

# 1. 构造消息，排除 proof_value 字段
msg = {
    "e2ee_type": "source_hello",
    # ... 其他字段
    "proof": {
        "type": "EcdsaSecp256r1Signature2019",
        "created": "2024-05-27T10:51:55Z",
        "verification_method": "did:wba:example.com:user:alice#keys-1"
        # proof_value 除外
    }
}

# 2. 转换为排序的 JSON 字符串
msg_str = json.dumps(msg, separators=(',', ':'), sort_keys=True)

# 3. 编码为 UTF-8 字节
msg_bytes = msg_str.encode('utf-8')

# 4. 使用 ECDSA + SHA-256 签名
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import ec

signature = private_key.sign(msg_bytes, ec.ECDSA(hashes.SHA256()))

# 5. Base64URL 编码
msg["proof"]["proof_value"] = base64.urlsafe_b64encode(signature).decode('utf-8')
```

#### 8.5.2 Helloの検証

1. **解析**：各項目を取得します。
2. **DIDと公開鍵**：`source_did`と`verification_method`を読み、方式の規則で公開鍵からDIDを作り、`source_did`と一致するか確認します。
3. **署名**：`source_did`の鍵で`proof`を確認します。
4. **そのほか**：`random`の一意性と、`proof`の`created`の期限を確認します。

## 9. 安全性

### 9.1 転送

すべてのAPIはHTTPSで、暗号化と完全性を保つべきです。

### 9.2 本人確認

DID WBAに従います。[詳細](03-did-wba方法规范-2026-03-28.md)を参照してください。認証済みの送信では、`sender_did`との一致を確認します。

### 9.3 E2EE

- **透過的な転送**：`content`はサーバーにとって不透明で、暗号化した内容を読めません。
- **前方秘匿性**：毎回新しいECDHE鍵を作り、長期鍵が漏れても過去は復号できません。
- **期間**：期限が切れれば、再合意が必須です。

### 9.4 再送攻撃

- **random**：両Helloの`random`で、毎回の一意性を保ちます。
- **secretKeyId**：Finishedの`secret_key_id`で、合意を確認します。
- **時刻**：`proof`の`created`が、妥当な範囲か確認します。

## 10. 制限

### 10.1 直接E2EEのみ

一対一だけで、群のE2EEはありません。群は平文で転送します。将来はMLSなどを導入する可能性があります。

### 10.2 大きなファイル

JSONの`content`は動画などには非効率です。`content`でURLと復号鍵を送り、HTTPSで別に取得することを勧めます。

## 11. まとめと展望

HTTP + JSON-RPC 2.0と`did:wba`で、直接・群・E2EEのIMを定義しました。ADとの統合で、能力の標準宣言、自動発見、相互運用を実現し、WebSocketより単純さ、互換性、拡張性を高めます。

今後は、次を進めます。
1. **群E2EE**：暗号方式の探索。
2. **オフライン**：配信と同期の改善。
3. **メッセージの型**：音声・映像通話の信号など。
4. **サーバー間**：連合プロトコルの定義。

## 参考文献

- RFC 7159：JSONデータ交換形式
- [JSON-RPC 2.0仕様](https://www.jsonrpc.org/specification)
- [ANP技術白書](01-AgentNetworkProtocol技术白皮书(20041204).md)
- [DID:WBA方式](03-did-wba方法规范-2026-03-28.md)
- [旧04暗号通信](04-基于did的端到端加密通信技术协议.md)
- [旧05メッセージサービス](05-基于did的消息服务协议.md)

## 著作権表示

Copyright (c) 2024 ANP Community
このファイルは[MITライセンス](../../../LICENSE)で公開されています。自由に利用・変更できますが、この表示を保持してください。
