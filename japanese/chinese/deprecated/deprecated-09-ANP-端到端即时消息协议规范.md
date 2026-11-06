> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [chinese/deprecated/deprecated-09-ANP-端到端即时消息协议规范.md](../../../chinese/deprecated/deprecated-09-ANP-端到端即时消息协议规范.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# インスタントメッセージプロトコル(ドラフト)を終わらせるANP-end

コメント: 現在の規範は、さらに改良と重複して、まだドラフトバージョンです。

## インフォメーション

この命令は、プライベートチャット、グループ会話、エンドツーエンド暗号化(E2EE)通信をサポートするHTTPおよびJSON-RPC 2.0に基づいてライブメッセージプロトコルであるAMPエンドツーエンドのインスタントメッセージプロトコルを定義します。 `did:wba` 本人確認のため、ID WBA認証機構が使用しています。

オリジナルに代わる規範です。 [04 - DIDベースのエンドツーエンド暗号化通信技術プロトコル](chinese/message/04-基于did的端到端加密通信技术协议.md) とりあえず [05 - DID ベースの情報サービス契約](chinese/message/05-基于did的消息服务协议.md) . 転送層プロトコルは、E2EEコア暗号化ロジックの保存に基づいて、HTTP + JSON-RPC 2.0に調和しています。

## 1. 背景:

### 1.1 既存の合意書の見直し

ANPプロジェクトは、初期段階で情報のための2つのプロトコルを設計しました。

- **04 - DIDベースのエンドツーエンド暗号化通信技術プロトコル**: E2EE暗号化通信プログラムをWebSocketに基づいて定義します。, SouseHelloを含みます, DestiningHello, 完成ハンドシェイクと短期鍵の相談メカニズムは、ECDHEに基づいて行われます.
- **05 - DID ベースの情報サービス契約**_: メッセージプロキシ接続、ルーター登録、ハートツーハート保護などを含むWebSocketベースのニュースルートと伝送メカニズムを定義します。

オリジナルの実現は複雑で、簡単なプログラムでした。

### 1.2 デザインのモチベーション

HTTP + JSON-RPC 2.0 プログラムは、以下の利点があります。

1. **シンプルで信頼性のある**: HTTPは、プログラミング言語やプラットフォームで成熟したHTTPクライアントライブラリを備えた最も広くサポートされているアプリケーションレイヤープロトコルです。
2. **標準化**JSON-RPC 2.0 は、均一なリクエスト/応答形式とエラーコードシステムを定義する成熟したリモートプロセスコールプロトコルです。
3. **ステータスなし**: HTTP リクエストレスポンスモデルは自然に非状態であり、サービス終了の実現を簡素化するために長い接続を必要としません。
4. **拡大しやすい**: HTTP ベースのプログラムは、認証、フロー制限、および監視インフラを RESTful エコシステムに簡単に統合できます。
5. **防火壁に優しい。**: HTTP/HTTPS トラフィックはほとんどのネットワーク環境で未処理です。

### 1.3 合意に基づく合意の既に合意された関係

この命令(09)は元の04および05の議定書を取り替えます:

- **代替04(E2EEプロトコル)**E2EEコア暗号化ロジックは同じまま(EDCHEキーコンサルテーション、AES-GCM暗号化、シグネチャ認証)が保存されますが、WebSocketインディペンデントメッセージからJSON-RPCへ転送モードを変更しました。 `send` 方法 `content` フィールドは E2EE プロトコルデータを読み込みます。
- **代替05(情報サービス契約)**送信されたメッセージは、WebSocketからHTTP JSON-RPCコールへの長い接続に送られ、メッセージプロキシ、ルーター登録などを削除します。

## 2. プログラムの概要

### 2.1 構造の設計

全体構造はメッセージサーバのtransitモデルを使用します。

```plaintext
+-------+          +----------------+          +----------------+          +-------+
|       |  HTTP    |                |   HTTP   |                |  HTTP    |       |
| Agent | <------> | Message Server | <------> | Message Server | <------> | Agent |
|  (A)  | JSON-RPC |     (A's)      |          |     (B's)      | JSON-RPC |  (B)  |
+-------+          +----------------+          +----------------+          +-------+
```

- **エージェント**: 送信者とメッセージの受信者 `did:wba` (c) 識別。
- **メッセージサーバ**: メッセージストレージ、受信トレイ管理、クラスター管理など、エージェントのメッセージとディスパッチサービス。
- エージェントは、HTTP JSON-RPC 2.0プロトコルを介して独自のメッセージサーバーと通信します。
- メッセージサーバ間の通信契約は、この規範の範囲外です。

### 2.2 中心の特徴

| スタッフ | 注釈 |
|------|------|
| **プロトコルの転送** | 日系通信機器(JSON-RPC 2.0) |
| **コンテンツ形式** | `application/json` |
| **アイデンティティ** | `did:wba` (分散型識別子) |
| **認証方法** | DID WBA認証(詳細) [DID: WBA の方法設計仕様](03-did-wba-method-design-specification.md)） |
| **メッセージの種類** | プライベートチャット、グループ会話。 |
| **E2EEサポート** | CCDHE(プライベートのみ)に基づくエンドツーエンド暗号化 |

### 2.3 デザイン原則

1. **シンプルさ**: 成熟した、広く支持される標準合意(HTTP、JSON-RPC 2.0、JSON)の使用。
2. **セキュリティー**: エンドツーエンド暗号化、サービスによる暗号化されたメッセージの透明転送をサポートし、秘密を読めない。
3. **営業部**: 横断面コミュニケーションを支えるIDベースの同一証明。
4. **実用性**: APIの設計は実用的な適用のために、完全なメッセージ管理を含んでいます。

## 3. アイデンティティと認証

### 3.1 DID識別フォーマット

このプロトコルの使用 `did:wba` 本人確認の方法(詳細) [DID WBA 方法論設計標準](03-did-wba-method-design-specification.md)）。

**ユーザーIDフォーマット:**

```
did:wba:{domain}:user:{username}
```

事例:`did:wba:example.com:user:alice`

**グループDIDフォーマット:**

```
did:wba:{domain}:group:{group_id}
```

事例:`did:wba:example.com:group:group_dev`

DIDが存在しない場合、サービスがエラーコードを返す `-32002`(リソースが存在しません)。

### 3.2 認定方法

このプロトコルはAMP ベースの DID WBA 認証機構を使用します。 [DID: WBA の方法設計仕様](03-did-wba-method-design-specification.md)。

## 4. JSON-RPC 2.0 トランスファープロトコル

### 4.1 リクエスト/応答の形式

全ての API は、JSON-RPC 2.0 プロトコルを使用して HTTP POST で呼び出されます。

**リクエスト形式:**

```json
{
  "jsonrpc": "2.0",
  "method": "method_name",
  "params": { ... },
  "id": 1
}
```

**応答の形式を成功させる:**

```json
{
  "jsonrpc": "2.0",
  "result": { ... },
  "id": 1
}
```

**エラー応答フォーマット:**

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

### 4.2 エラーコードの定義

このプロトコルは、JSON-RPC 2.0 の標準的なエラーコードを使用し、ビジネスエラーコードを拡張します。

| エラーコード | 意味する | 注釈 |
|--------|------|------|
| -32700 | JSON 解析エラー | 法令・規範の遵守は、JSON が要求するものではありません。 |
| -32600 | 無効な要求 | リクエストはJSON-RPC 2.0形式に一致しません |
| -32601 | 方法が存在しません | 要求されたメソッドは定義されません |
| -32602 | 変数の検証は失敗しました | 無効なパラメータ要求(E2EE結合検証を含む) |
| -32603 | 内部エラー | 内部サービスエラー |
| -32000 | 認定資格なし | 認証が必要なが、有効な文書を提供していない |
| -32001 | 許可なし | 認定が、動作を実行するために許可されていない |
| -32002 | リソースが存在しません | 要求されたリソース(DD、情報など)は存在しません。 |
| -32003 | リソースのコンフリクト | リソースの既存または競合 |
| -32004 | 業務検証エラー | 練習ルールの検証は承認されていません |
| -32005 | 限定フロー | リクエストも頻繁に、サービスに制限されています。 |

### 4.3 伝達モード

- **契約条件**:HTTP/HTTPS POST
- **コンテンツの種類**：`Content-Type: application/json`
- **キャラクターエンコーディング**:UTF-8 の

全てのインターフェースはHTTP POSTで呼び出され、JSON-RPC 2.0のJSONオブジェクトです。

## 5. スマートボディはプロトコルの統合について説明

このセクションでは、E2EE インスタンスのメッセージング機能が Smart Description に書かれている方法について説明します。AD ドキュメントは、他のインテリジェンスボディを自動的に検出し、E2EE IM サービスとやり取りできるようにします。ANP E2EEIM プロトコルは、スマート ボディの説明プロトコルフレームワーク(完全な AD 仕様の詳細)に組み込みのプロトコルタイプとして含まれています。[スマート 説明プロトコル](chinese/07-ANP-智能体描述协议规范.md)）。

### 5.1 E2EE IMは、AD文書で宣言されたサポート

ANP E2EE IMプロトコルをサポートするスマートボディは、AD文書にする必要があります `interfaces` array には、対応するエントリが含まれています。E2EE IM プロトコルは AMP 組み込みプロトコルであるため、インターフェイスの説明が使用されます。 `content` パスではなくインラインターミナルと機能ステートメントを作成するフィールド `url` 外部ファイルを引用します。

**AD ドキュメントの例:**

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

### 5.2 フィールドの説明

**インターフェイス レベル分野:**

| フィールド | 仕様 | 記入する | 注釈 |
|------|------|------|------|
| 型 号 | 文字列 | あり。 | 固定式 `"StructuredInterface"` |
| プロトコル | 文字列 | あり。 | 固定式 `"ANP-E2EE-IM"`, 本契約を識別する |
| コンテンツ | 文字列 | あり。 | プロトコルバージョン番号(例: `"1.0"`） |
| 説明: | 文字列 | あり あり | インターフェイスの読みやすい記述 |
| コンテンツ | オブジェクト | あり。 | インライン記述 エンドポイントおよびE2EEの機能 |

**コンテンツ。要素をエンドポイントします。**

| フィールド | 仕様 | 記入する | 注釈 |
|------|------|------|------|
| パス | 文字列 | あり。 | API のピアパス (例: g) `/api/v1/messages/rpc`） |
| 説明: | 文字列 | あり あり | エンドポイント機能の説明 |

**お問い合わせ:**

| フィールド | 仕様 | 記入する | 注釈 |
|------|------|------|------|
| 対応機種_コンテンツ | 配列 | あり。 | サポートされている E2EE プロトコルのバージョンの一覧 |
| サイファー_スイート | 配列 | あり。 | サポートされている暗号化パッケージのリスト(例:g) `["TLS_AES_128_GCM_SHA256"]`） |
| 対応機種_団体名 | 配列 | あり。 | サポートされている楕円曲線グループ(例:g)のリスト `["secp256r1"]`） |
| 説明: | 文字列 | あり あり | E2EEの機能の読みやすい記述 |

## 6. メッセージサービス API の定義

本契約は、サービス終了点を2つに分散した10 JSON-RPCメソッドを定義します。

### 6.1 メッセージインターフェイス

**終了:** `POST /api/v1/messages/rpc`

#### 6.1.1 送信 - メッセージを送信する

メッセージ(プライベートチャットやグループチャット)を送信し、E2EEハンドシェイクと暗号化されたメッセージを送信する均一な方法もあります。

**認証:** 最適な(認定されたユーザーは送信者本人確認を行います)

**パラメーター:**

| パラメーター | 仕様 | 記入する | 注釈 |
|------|------|------|------|
| 送信者_行なった | 文字列 | あり。 | 入札ID |
| 送信者_お名前(名) | 文字列 | あり あり | 送信者名 |
| 受信機_行なった | 文字列 | 条件: | 受精者 DID (ピシシャン、グループ)_残念ながら、プッシュアップのビットが少なかったですか? |
| 団体名_行なった | 文字列 | 条件: | グループID(通信、受信機)_残念ながら、プッシュアップのビットが少なかったですか? |
| コンテンツ | 文字列 | あり。 | メッセージ内容(メッセージが明確で、E2EEメッセージはJSONシリアル化された文字列です) |
| 型 号 | 文字列 | あり あり | メッセージタイプ、デフォルト `text` |
| タイムスタンプ | 日报社(7月27日) | あり あり | クライアントはタイムスタンプを送信します |

**任意タイプ:**

| 型 号 | コンテンツ | 注釈 |
|------|------|------|
| `text` | ノーマル | テキストメッセージ |
| `image` | ノーマル | フォトギャラリー |
| `file` | ノーマル | ファイルメッセージ |
| `e2ee_hello` | イージー・エスピー | ハンドシェイク(sourceHello or DestinyHello) |
| `e2ee_finished` | イージー・エスピー | シェイクハンド、確認。 |
| `e2ee` | イージー・エスピー | メッセージを開かせる |
| `e2ee_error` | イージー・エスピー | E2EE エラー通知 |

**E2EE の境界:**
- E2EEメッセージ(タイプとして) `e2ee_hello`、`e2ee_finished`、`e2ee`、`e2ee_error`）**会話のプライベートな方だけ。**
- 必ず指定してください `receiver_did`, は指定できません `group_did`
- _その他組織 `-32602` 変数の検証は失敗しました

**リクエスト例(プライベート):**

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

**事例のリクエスト(グループ会話)**

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

**応答例:**

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

E2EEメッセージのリクエスト例はセクション8で示します。

#### 6.1.2 取得_詳細 — 詳細情報を入手

フォルダを削除できません: %s: このようなフォルダーはありません

**認証:** なし

**パラメーター:**

| パラメーター | 仕様 | 記入する | 注釈 |
|------|------|------|------|
| インフォメーション_id の | 文字列 | あり。 | メッセージID |

**リクエスト例:**

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

**応答例:**

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

#### 6.1.3 取得_inbox - クエリ受信トレイ

現行のユーザーから受信トレイメッセージの問い合わせ

**認証:** 任意

**パラメーター:**

| パラメーター | 仕様 | 記入する | 注釈 |
|------|------|------|------|
| ユーザ名_行なった | 文字列 | あり。 | 現在のユーザID |
| からこそ | 日报社(7月27日) | あり あり | 今回も後日のみ戻り |
| ツイート | サインイン | あり あり | 棒のカウントをスキップして下さい、デフォルト 0 |
| 制限なし | サインイン | あり あり | 棒の数、デフォルト 50、最高 100 を戻して下さい |

**リクエスト例:**

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

**応答例:**

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

#### 6.1.4 マーク_読みます — タグの読み込み

マークは、メッセージを読み取りとして指定します。

**認証:** 任意

**パラメーター:**

| パラメーター | 仕様 | 記入する | 注釈 |
|------|------|------|------|
| ユーザ名_行なった | 文字列 | あり。 | 現在のユーザID |
| インフォメーション_アイドル | 配列 | あり。 | 読み取りメッセージIDリストとしてマークするには |

**リクエスト例:**

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

**応答例:**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "updated_count": 2
  },
  "id": 1
}
```

#### 6.1.5 得て下さい_歴史 — セッション履歴の取得

国の状況に関する情報源です。

**認証:** 任意

**パラメーター:**

| パラメーター | 仕様 | 記入する | 注釈 |
|------|------|------|------|
| ユーザ名_行なった | 文字列 | あり。 | 現在のユーザID |
| パートナー_行なった | 文字列 | 条件: | ユーザID(プライベートチャット、グループ)を反対する_残念ながら、プッシュアップのビットが少なかったですか? |
| 団体名_行なった | 文字列 | 条件: | グループDID(グループチャット、ピア)_残念ながら、プッシュアップのビットが少なかったですか? |
| からこそ | 日报社(7月27日) | あり あり | クエリ開始時間 |
| ツイート | サインイン | あり あり | 棒のカウントをスキップして下さい、デフォルト 0 |
| 制限なし | サインイン | あり あり | 戻りバー番号、デフォルト50 |

**たとえばリクエスト(プライベート履歴):**

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

**たとえばリクエスト(グループ履歴):**

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

**応答例:**

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

#### 6.1.6 得_バッチ_歴史 — バッチアクセスグループチャット履歴

日本で初めて、グループの歴史について多くの情報を得ることができます。

**認証:** 任意

**パラメーター:**

| パラメーター | 仕様 | 記入する | 注釈 |
|------|------|------|------|
| ユーザ名_行なった | 文字列 | あり。 | 現在のユーザID |
| ソリューション | 配列 | あり。 | クエリパラメータのグループ `[{group_did, since?}]` |
| 制限なし | サインイン | あり あり | グループごとのバーの天井を返す、デフォルト 20 |

**リクエスト例:**

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

**応答例:**

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

#### 6.1.7 削除_受信トレイ — 受信トレイメッセージの削除

指定したメッセージを受信トレイから削除します。

**認証:** 任意

**パラメーター:**

| パラメーター | 仕様 | 記入する | 注釈 |
|------|------|------|------|
| ユーザ名_行なった | 文字列 | あり。 | 現在のユーザID |
| インフォメーション_アイドル | 配列 | あり。 | 削除するメッセージのリスト |

**リクエスト例:**

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

**応答例:**

```json
{
  "jsonrpc": "2.0",
  "result": {
    "deleted_count": 1
  },
  "id": 1
}
```

### 6.2 クラスタインターフェイス

**終了:** `POST /api/v1/groups/rpc`

#### 6.2.1 リスト - グループを開く

プラットフォームですべてのオープングループを取得します。

**認証:** なし

**パラメーター:**

| パラメーター | 仕様 | 記入する | 注釈 |
|------|------|------|------|
| ツイート | サインイン | あり あり | 棒のカウントをスキップして下さい、デフォルト 0 |
| 制限なし | サインイン | あり あり | 棒の数、デフォルト 50、最高 100 を戻して下さい |

**リクエスト例:**

```json
{
  "jsonrpc": "2.0",
  "method": "list",
  "params": {},
  "id": 1
}
```

**応答例:**

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

#### 6.2.2 取得_詳細 — グループの詳細を取得する

指定したグループの詳細を取得します。

**認証:** なし

**パラメーター:**

| パラメーター | 仕様 | 記入する | 注釈 |
|------|------|------|------|
| 団体名_行なった | 文字列 | あり。 | グループID |

**リクエスト例:**

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

**応答例:**

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

#### 6.2.3 取得_メッセージ — グループメッセージを取得する

フォルダを削除できません: %s: このようなフォルダーはありません

**認証:** なし

**パラメーター:**

| パラメーター | 仕様 | 記入する | 注釈 |
|------|------|------|------|
| 団体名_行なった | 文字列 | あり。 | グループID |
| 制限なし | サインイン | あり あり | 棒の数、デフォルト 50、最高 100 を戻して下さい |
| からこそ | 日报社(7月27日) | あり あり | 今回も後日のみ戻り |

**リクエスト例:**

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

**応答例:**

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

## 7. メッセージタイプ定義

### 7.1 一般的なメッセージタイプ

| 仕様 | 注釈 | コンテンツ |
|------|------|-------------|
| `text` | テキストメッセージ | テキストを表現する |
| `image` | フォトギャラリー | 映像 URL または Base64 エンコーディング |
| `file` | ファイルメッセージ | URL またはファイルメタデータ |

### 7.2 E2EE メッセージタイプ

E2EEメッセージが全て通過しました。 `send` 方法 `content` フィールド転送、入力内容がJSONの連鎖文字列です。サービスエンド**行わない**えー。**変更しないでください** 内容、直接および透明に先に。

| 型 号 | 注釈 | コンタクト構造 |
|------|------|-------------|
| `e2ee_hello` | メッセージをシェイクします。 | SourceHello または DestinyHello (投稿済み) `e2ee_type` 分野 機能 |
| `e2ee_finished` | シェイクハンド、確認。 | 仕上げ `session_id` とりあえず `verify_data`） |
| `e2ee` | メッセージを開かせる | ハム・ハット `secret_key_id`、`original_type`、`encrypted`(AES-GCM シークレット) |
| `e2ee_error` | E2EE エラー通知 | ハム・ハット `error_code` とりあえず `secret_key_id` |

E2EE構造の詳細な定義については、セクション8.3を参照してください。

## 8. エンドツーエンド暗号化(E2EE)プロトコル

### 8.1 全般

このプロトコルのエンドツーエンド暗号化方式は、ECDHE(エリプティックカーブ・ディフィールマン・エフェメラルド)キー交換契約に基づいており、2つのエージェント間の暗号化通信をサポートしています。 コア暗号化アルゴリズムと [04 - DIDベースのエンドツーエンド暗号化通信技術プロトコル](chinese/message/04-基于did的端到端加密通信技术协议.md) めちゃくちゃ。

**主特徴:**

- **会話のプライベートな方だけ。**:E2EE メッセージはグループチャットシーンをサポートしていません
- **サービスの透明な前進**: 埋め込まれたすべてのE2EEデータ `send` 方法 `content` フィールド、サービスエンドは暗号化されたデータを解釈または変更しません
- **ユニファイド転送**: E2EEハンズキーと暗号化されたメッセージはすべて渡されます `send` 方法 `type` フィールドの分岐タイプ

### 8.2 E2EEハンドシェイクプロセス

E2EE、手打ちを通す。 `send` メソッドは、ハンドシェイクメッセージを交換し、暗号化された通信フェーズにキーの相談を完了することです。

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

**ハンドシェイクプロセス記述:**

1. **アリスは SourceHello を送信します。**: アリスはE2EEハンシェイクを約束し、パス `send` 方法 送信 `type=e2ee_hello` メッセージは、sourceHelloデータ(パブリックキー、サポートされている暗号化パラメータ、署名など)を入力します。
2. **Bob 応答 DestinyHello + 終了しました**: ボブは、SuceHelloを受信した後に暗号化パラメータを選択します。 `send` メソッド 応答 Destinyhello (プレゼンテーション)`type=e2ee_hello`)および終了する(`type=e2ee_finished`2つのメッセージ
3. **アリスは入ってきます。**: アリスは、完了したメッセージを送信するためにDesteinmentHelloを受信した後に共有キーを計算します。
4. **セッションの有効化**: アリスのメッセージ処理をしたボブ、キーネゴシエーションが完成し、セッションが活性化しました。
5. **暗号化された通信**: 両者で使用 `type=e2ee` このメッセージを暗号化することはできません。指定された受信者はありません

### 8.3 E2EE構造の定義

E2EEデータはすべて通過します。 `send` 方法 `content` フィールド転送(JSON シーケンス文字列)。

#### 8.3.1 SourceHello(e2ee) ソース_type=source の型_ヒエロ)

E2EEセッションスポンサーが、ID情報、公開鍵、サポートされた暗号化パラメータを含む。

**フィールド定義:**

| フィールド | 仕様 | 注釈 |
|------|------|------|
| e2ee(イーツー)_型 号 | 文字列 | 固定式 `"source_hello"` |
| コンテンツ | 文字列 | プロトコルバージョン番号 |
| セッション_id の | 文字列 | セッションID、16ビットランダム文字列 |
| ソース_行なった | 文字列 | 入札ID |
| 目的地_行なった | 文字列 | 受精性 DID |
| ランダム | 文字列 | ユニークな手触りと鍵交換への参加を確実にするために、32ビットランダムな文字列 |
| 対応機種_コンテンツ | 配列 | サポートされているプロトコルバージョンの一覧 |
| サイファー_スイート | 配列 | サポートされている暗号化パッケージのリスト |
| 対応機種_団体名 | 配列 | エルプシーカーブグループをサポート |
| キーワード_株式について | 配列 | 主要取引所の公開鍵情報リスト |
| 認証_メソッド | オブジェクト | 送信者の DID の公開鍵 |
| 証拠の証拠 | オブジェクト | メッセージを開かせる |

**キーワード_要素構造を共有する:**

| フィールド | 仕様 | 注釈 |
|------|------|------|
| 団体名 | 文字列 | 楕円曲線グループ(例:g) `secp256r1`） |
| 有効期限 | 番号番号 | 主有効性(秒) |
| キーワード_交換式 | 文字列 | 鍵交換用のパブリックキー(16進数) |

**認証_方法構造:**

| フィールド | 仕様 | 注釈 |
|------|------|------|
| id の | 文字列 | 認証方法 ID |
| 型 号 | 文字列 | パブリックキータイプ(例:g) `EcdsaSecp256r1VerificationKey2019`） |
| パブリック_キーワード_六角形 | 文字列 | 公共のキーのヘキサデシマル |

**証拠の構造:**

| フィールド | 仕様 | 注釈 |
|------|------|------|
| 型 号 | 文字列 | 署名の種類(例: `EcdsaSecp256r1Signature2019`） |
| 作成者 | 文字列 | 署名作成時間(ISO 8601 UTC) |
| 認証_メソッド | 文字列 | id 署名に使用する認証方法 |
| 証拠の証拠_値引き | 文字列 | 署名値(base64URLエンコーディング) |

**コンテンツ例(シーケンシング前のJSON):**

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

**リクエストを送る:**

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

#### 8.3.2 宛先ヘロ(e2ee)_type=宛先_ヒエロ)

E2EE セッションの受信者によって返される, 選択した暗号化パラメータを含む.

**フィールド定義:**

SouceHello と同様、違いは:

| フィールド | 仕様 | 注釈 |
|------|------|------|
| e2ee(イーツー)_型 号 | 文字列 | 固定式 `"destination_hello"` |
| コンテンツ | 文字列 | プロトコルバージョン番号 |
| セッション_id の | 文字列 | SourceHello でセッションを使用する_id の |
| ソース_行なった | 文字列 | 送信者 DID (DestinationHello sender) |
| 目的地_行なった | 文字列 | 受信者 DID (SsourceHello 送信機) |
| ランダム | 文字列 | 32ビットランダム文字列 |
| 選択する_コンテンツ | 文字列 | 選択されたプロトコルバージョン(solite) |
| サイファー_スイート | 文字列 | 選択された暗号化パッケージ(非デジタル) |
| キーワード_シェア | オブジェクト | 選択したキーの情報(奇数)の交換 |
| 認証_メソッド | オブジェクト | 送信者の DID の公開鍵 |
| 証拠の証拠 | オブジェクト | メッセージを開かせる |

**コンテンツ例(シーケンシング前のJSON):**

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

#### 8.3.3 完了

ハンドシェイクは、攻撃の再発を防ぐための情報の確認を完了します。

**フィールド定義:**

| フィールド | 仕様 | 注釈 |
|------|------|------|
| セッション_id の | 文字列 | セッションID、 SourceHello でのセッション使用_id の |
| 認証_データのデータ | オブジェクト | 検証データ(AES-GCM暗号化) |

**認証_データ構造:**

| フィールド | 仕様 | 注釈 |
|------|------|------|
| イーブ | 文字列 | 初期化ベクター(Base64エンコーディング) |
| ツイート | 文字列 | 認証ラベル(Base64エンコーディング) |
| 暗号テキスト | 文字列 | 暗号化されたデータ(Base64エンコーディング)、明示的に `{"secretKeyId":"..."}` |

**コンテンツ例(シーケンシング前のJSON):**

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

#### 8.3.4 暗号化されたメッセージ

下記のメッセージでは、このメッセージを暗号化できません。

**フィールド定義:**

| フィールド | 仕様 | 注釈 |
|------|------|------|
| 秘密の秘境_キーワード_id の | 文字列 | 短期暗号化キーID(16ヘキサデシマ文字) |
| オリジナル_型 号 | 文字列 | オリジナルメッセージタイプ(例:g) `text`、`image`） |
| 暗号化 | オブジェクト | AES-GCM暗号化データ |

**暗号化された構造:**

| フィールド | 仕様 | 注釈 |
|------|------|------|
| イーブ | 文字列 | 初期化ベクター(Base64エンコーディング) |
| ツイート | 文字列 | 認証ラベル(Base64エンコーディング) |
| 暗号テキスト | 文字列 | 暗号化された符号化されたテキスト(Base64の符号化) |

**コンテンツ例(シーケンシング前のJSON):**

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

**リクエストを送る:**

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

#### 8.3.5 E2EE エラーメッセージ

鍵が切れたり見つけられなかったりすると、相手がキーの相談を再開するようにします。

**フィールド定義:**

| フィールド | 仕様 | 注釈 |
|------|------|------|
| エラー_郵便番号 | 文字列 | エラータイプ:`key_expired`(鍵が切れる) `key_not_found`(鍵が見つからない場合) |
| 秘密の秘境_キーワード_id の | 文字列 | 関連するキーID |

**コンテンツ例(シーケンシング前のJSON):**

```json
{
  "error_code": "key_expired",
  "secret_key_id": "0123456789abcdef"
}
```

### 8.4 主な相談プロセス

主要な相談プロセスは、ECDHE(エリプトカーブディフィー・ヘルマン電子)に基づいており、TLS 1.3の暗号化キーの交換に不可欠です。

**サポートされている暗号化パラメータ:**

| パラメーター | 現在のサポート値 |
|------|-----------|
| パスワードパッケージ | `TLS_AES_128_GCM_SHA256` |
| エリプスカーブ | `secp256r1` |

#### 8.4.1 共有鍵生成

1. **お互いの公開鍵を手に入れよう**挨拶の反対側から `key_shares`/`key_share` メディス `key_exchange` フィールド。
2. **共有秘密を生成**: ローカルのプライベートで共有秘密を生成し、ECDHアルゴリズムによる公開鍵を対向します。
3. **主長さを決定**: パスワードパッケージに基づくキーの長さを決定()`TLS_AES_128_GCM_SHA256` 対応する128ビット/ 16バイト)

#### 8.4.2 短期暗号化キー生成

HKDF(HMACベース輸出および取引キー開発ファンド)を使用して、共有秘密から実際の暗号化キーを作成する:

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

のは、 `source_data_key` ホストの暗号化への鍵はキーではありません。`destination_data_key` 受信者のための暗号化キー。メッセージを送信するときにソースを使用する `source_data_key` 暗号化、使用 `source_data_key` 復号化、逆転。

#### 8.4.3 秘密鍵IDメソッド

`secret_key_id` ソースと宛先の間には、メッセージの特定のために暗号化するキーが鍵となる、短期暗号化キー ID です。キー ID は、キーの有効期間のみ有効です。

生成ステップ:

1. ソースヘロとデスティニーヘッロの `random` フィールドクラッタ(sourceHello前、DestinyHello後、接続なし)
2. スペルをUTF-8エンコーディングでバイトに変換
3. HKDF を使用して 8 バイトを生成します
4. 8バイトから16個の16個の16個の16個の16個の16個の16個の16個の16個の16個の16個の16個の16個の16個の16個の16個の16個の16個の16個の16個の16個の16個の16個の16個の16個の16個の16個のxadecimal文字をエンコードする

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

#### 8.4.4 AES-GCM暗号化/デクラフィケーション

利用条件 `TLS_AES_128_GCM_SHA256` メッセージを開かせる

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

### 8.5 署名と認証

#### 8.5.1 証拠価値生成プロセス

SourceHelloとDesttiningHelloメッセージの両方には、その完全性と認証を確実にするために署名が必要です。

**生成ステップ:**

1. メッセージをすべてのフィールドに構成します。`proof` メディス `proof_value` フィールドを除く
2. JSON を JSON 文字列に変換し、コンマとコロンを分離器として使用し、**注文キー**
3. JSON 文字列を UTF-8 バイトにエンコーディング
4. ECDSA + SHA-256 で署名
5. 署名する価値のベース64URLを書かせるエンコーダー `proof_value` フィールド

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

#### SourceHello/DestinationHelloメッセージの8.5.2検証

1. **メッセージを開かせる**: フィールドを抽出します。
2. **有効なDIDおよび公共のキー**: 読む `source_did` とりあえず `verification_method` DID方式の生成方法を使用して、公鍵でDIDを生成し、かどうかを確認する `source_did` めちゃくちゃ。
3. **署名を認証する**: 使用法 `source_did` 公鍵の対応、認証 `proof` フィールドの正しい署名です。
4. **他のフィールドを認証**: 検査 `random` 再アライメント攻撃を防ぐフィールドのランダム性; 検査 `proof` ・・・ `created` 署名が期限切れにならないようフィールド。

## 9. セキュリティの考慮事項

### 9.1 伝送セキュリティ

すべての API エンドポイントは HTTPS プロトコルを使用して、通信中にデータの暗号化された送信と完全性を確保します。

### 9.2 識別の保証

本人はAMP DID WBA認証機構に基づいています。 [DID: WBA の方法設計仕様](03-did-wba-method-design-specification.md). 認証されたユーザーからメッセージを送信する際のサービスチェック `sender_did` 認証による一貫性

### 9.3 E2EEセキュリティ

- **サービスの透明な前進**E2EEからのメッセージ `content` フィールドは、暗号化されたコンテンツを読み込むことができないサービス終了に透明ではありません。
- **セキュリティーの確保**: ECDHE 一時的な鍵交換を使用して、各セッションは、長期キーが漏れても新しいキーペアと過去の通信を復号化できません。
- **重要有効期間**: 短期鍵は、明確な有効期間を持ち、有効期限が切れた後に再交渉する必要があります。

### 9.4 応答攻撃

- **ランドームフィールド**:SourceHelloとDestinyhello `random` フィールドは、各手がかりの痛みを確実にします。
- **secretKeyId 検証**_その他組織 `secret_key_id`, キーの相談の完全性を検証するため.
- **タイムスタンプの検証**：`proof` メディス `created` フィールドは、署名の時刻が制限されているかをチェックするために使われます。

## 10. 制限事項

### 10.1 E2EE 専用

E2EE プロジェクトは現在、2つのエージェント間で1対1の暗号化された通信のみをサポートしており、グループチャットシーンの下のエンドツーエンドの暗号化に対応していません。 グループチャット メッセージは、サービスによって明示的に送信されます。 グループE2EEプログラムは将来(例えばMLSプロトコル)で導入される場合があります。

### 10.2 大きいファイル転送効率

連絡はJSONで行います。 `content` 大きいファイルの伝達(例えばビデオ)のために有効でない分野の移動。 `content` と、受信者はHTTPSプロトコルによってファイルを個別にダウンロードします。

## 11. 概要と展望

この命令はHTTP+JSON-RPC 2.0に基づいて即刻メッセージ プロトコルを定義します、と `did:wba` 識別目的のために、プライベートチャット、グループ会話、エンドツーエンド暗号化された通信がサポートされています。 スマートボディの説明プロトコルの統合により、インテリジェントなボディは、自動検出と相互運用性を達成するために標準化された方法でE2EE IM機能を宣言することができます。 このプロトコルは、元のWebSocketプログラムよりもはるかにシンプルで互換性があり、スケーラブルです。

今後の作業の方向性は次のとおりです。

1. **グループE2EE**: グループチャットシーンの下のエンドツーエンド暗号化方式を探索
2. **オフラインメッセージ**: オフラインメッセージの配信と同期を完璧に
3. **メッセージタイプ延長**: より有益なメッセージの種類(例えば、音声ビジュアルコールオーダー)のサポート
4. **サーバ間で相互接続**: メッセージサーバー間の連邦合意を定義する

## リファレンス

- [RFC 7159の特長] JavaScript オブジェクトの表記 (JSON) データ交換形式
- [JSON-RPC 2.0 仕様](https://www.jsonrpc.org/specification)
- [ANPの技術の白いペーパー](01-agentnetworkprotocol-technical-white-paper.md)
- [DID: WBA の方法設計仕様](03-did-wba-method-design-specification.md)
- [04 - DIDベースのエンドツーエンド暗号化通信技術プロトコル](chinese/message/04-基于did的端到端加密通信技术协议.md)
- [05 - DID ベースの情報サービス契約](chinese/message/05-基于did的消息服务协议.md)

## 公益社団法人 一般社団法人 日本版著作権協会

社会貢献活動の推進に関する基本方針 _ ANPコミュニティ
この文書の基礎 [MITライセンス](../../../chinese/deprecated/LICENSE) 公開、あなたは自由にこの著作権宣言を使用および変更することができます。
