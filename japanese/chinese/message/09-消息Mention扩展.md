<!-- translation-review: full; source=chinese/message/09-消息Mention扩展.md; basis=complete source-based manual translation of every prose paragraph and reading of all source examples -->
> 日本語参考訳（機械翻訳を基に原文全文を照合済み）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [chinese/message/09-消息Mention扩展.md](../../../chinese/message/09-消息Mention扩展.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP Profile 9：メッセージ Mention 拡張

- 文書番号：ANP-P9
- タイトル：メッセージ Mention 拡張
- 状態：公開済み（Released）
- バージョン：1.2
- 仕様セット：ANP Messaging 1.2
- 原文言語：中国語（このファイルは日本語参考訳）。
- バインディングのバージョン：v1 拡張。独立した `meta.profile` は定義しません。
- 適用範囲：本 Profile は、ANP グループメッセージの mention アプリケーションペイロード拡張を定義し、人間可読と機械可読の mention を同時に表します。本 Messaging 1.2 仕様セットでは、`anp.group.base.v2`、`anp.group.e2ee.v2` と組み合わせ、構造化 JSON アプリケーションペイロードを運ぶ場面で使います。
- 依存関係：
  - `anp.core.binding.v1`
  - 非 E2EE グループメッセージを使う場合、`anp.group.base.v2` に依存します。
  - Group E2EE メッセージを使う場合、`anp.group.e2ee.v2` に依存します。

---

## 1. 目的

本 Profile は、ANP グループメッセージにおける mention の、最小の相互運用表現を定義します。

Mention は、以下のような人に見えるインターフェース表現を、

```text
@alice
@product-agent
@all
@agents
@humans
```

DID やグループセレクターなどの、機械可読な対象に束縛する、構造化アプリケーション層オブジェクトです。

本 Profile は、以下を標準化します。

1. mention を含むグループメッセージの、アプリケーションペイロード JSON 構造。
2. mention オブジェクトの最小フィールド。
3. 初版がサポートする対象型：`human`、`agent`、`group_selector`。
4. 初版がサポートするグループセレクター：`all`、`agents`、`humans`。
5. 外側の ANP メッセージの完全性機構の保護対象となる、`mentions` の配置場所。
6. mention を含むグループメッセージの、送信者証明と検証モデル。

本 Profile は、以下を定義しません。

- 新しい JSON-RPC メソッド。
- `group.send` または `group.e2ee.send` 用の、新しい外側の `meta.profile`。
- mention メッセージを区別するためだけの、新しい content type。
- mention メッセージを区別するためだけの、新しい payload の `protocol` マーカー。
- mention 専用の sender フィールド。
- mention 専用の proof または signature。
- サーバー側の mention 権限モデル。
- サーバー側での、`@all`、`@agents`、`@humans` の展開。
- 既読状態、到達受領通知、通知の配信、またはユーザーの通知抑制設定。
- 「あるプロトコルをサポートする agents」のような、能力セレクター。
- `owner`、`admin`、`member` 以外の、独自のグループ管理の役割。
- 私聊メッセージの mention の意味論。

---

本 Profile は、`did:wba`、`did:web`、およびその他のサポートする DID メソッドに適用します。アイデンティティの解決と検証は、[P2](../../../chinese/message/02-身份与发现.md#method-validation) に従います。

## 2. 用語と規範的な取り決め

### 2.1 規範的キーワード

本文の **MUST**、**MUST NOT**、**REQUIRED**、**SHALL**、**SHALL NOT**、**SHOULD**、**SHOULD NOT**、**RECOMMENDED**、**NOT RECOMMENDED**、**MAY**、**OPTIONAL** は、大文字で記されている場合、規範的要件として解釈します。

### 2.2 用語

- **Mention**：メッセージで言及した対象を識別する、構造化アプリケーション層オブジェクト。
- **Mention-bearing Group Message**：構造化 JSON ペイロード内に、本 Profile に従うトップレベルの `mentions` 配列を含む、グループのアプリケーションメッセージ。
- **Surface Syntax**：`@alice` や `@agents` のような、人間に見える mention のテキスト表現。surface syntax は、プロトコル上のアイデンティティではありません。
- **Mention Target**：mention の機械可読な対象。human DID、agent DID、またはグループセレクターです。
- **Group Selector Mention**：`all`、`agents`、`humans` のような、グループスコープのセレクターを対象とする mention。
- **Terminal-side Validation**：受信クライアント、ユーザーエージェント、または Agent runtime が、アプリケーションペイロードの受信または復号の後に実行する、ローカルな検証・処理。この用語は、デバイス単位や端末単位のプロトコルアイデンティティを導入しません。
- **Group Host Service**：`anp.group.base.v2` が定義するグループサービス。本 Profile では、mention の意味論を検証しません。

---

## 3. 設計原則

### 3.1 `@` はインターフェースの構文であり、アイデンティティではない

文字 `@` と、それに続くテキストは、人間向けインターフェースの構文にすぎません。

単一対象の mention のプロトコルアイデンティティは、対象 DID です。

```json
{
  "target": {
    "kind": "agent",
    "did": "did:wba:example.com:agent:product-assistant"
  }
}
```

グループセレクター mention のプロトコルアイデンティティは、外側のグループメッセージのコンテキストに適用する、selector の値です。

```json
{
  "target": {
    "kind": "group_selector",
    "selector": "agents"
  }
}
```

### 3.2 Mentions は、独立した sender を持たない

mention オブジェクトは、`sender`、`sender_did`、`from`、`actor_did` などの送信者フィールドを含めてはなりません（**MUST NOT**）。

mention を含むグループメッセージの送信者は、常に外側の ANP グループメッセージの送信者です。

- Group Base は、`params.meta.sender_did` を使います。
- Group E2EE は、`params.meta.sender_did` と、Group E2EE のメッセージ認証コンテキストを使います。

### 3.3 Mentions は、独立した proof を持たない

mention オブジェクトは、`proof`、`signature`、`auth`、`origin_proof`、または同等の mention 内の証明フィールドを含めてはなりません（**MUST NOT**）。

非 E2EE の Group Base では、mention を含むペイロードは、`auth.origin_proof` が束縛する `Signed Request Object` の保護対象となるよう、`params.body` 内に置かなければなりません（**MUST**）。

Group E2EE では、mention を含むペイロードは、暗号化前の対応する inner plaintext オブジェクト内に置かなければなりません（**MUST**）。

### 3.4 v1 は、サーバー側の mention 認可を定義しない

本 Profile v1 は、mention 専用の権限ポリシーを定義しません。

送信者が、適用される基本 Profile に従い、外側のグループメッセージを送信する権限を持つ場合、mention 層では、デフォルトで、サポートする任意の mention 対象を含められます。

- 単一の human DID。
- 単一の agent DID。
- `@all`；
- `@agents`；
- `@humans`。

サーバー、relay service、ingress service、および Group Host Service は、mention target、mention selector、または mention role だけを理由として、メッセージを拒否してはなりません（**MUST NOT**）。外側の Profile がすでに要求する、送信者認証、冪等性、target binding、content shape、グループ送信権限などの検証だけを引き続き実行します。

この規則は、payload サイズ制限、明文化された mention オブジェクト数の上限、レート制限、不正利用防止、スパム対策、不正形式のペイロードの拒否、サービス拒否攻撃への防御など、通常の運用管理を制限しません。これらは運用ポリシーであり、mention 専用の認可ではありません。

### 3.5 グループセレクターは、グループ管理の役割ではない

selector 値の `all`、`agents`、`humans` を、P4 のグループ管理の役割として解釈してはなりません（**MUST NOT**）。

P4 のグループ管理の役割は、引き続き以下です。

```text
owner
admin
member
```

本 Profile の group selector は、mention target であり、認可の役割ではありません。

### 3.6 Mention target は、デバイスの target ではない

単一対象の Mention は、human または Agent の DID を識別します。group-selector Mention は、P4 の業務メンバーの集合を識別します。いずれも、デバイスや MLS Leaf を識別しません。同じ DID の複数のデバイスや Leaf も、1 つの Mention 主体です。

Group E2EE メッセージの送信または受信デバイスの束縛は、P6 だけが規定します。Mention オブジェクトは、これらの外側のデバイス selector を複製、推定、または上書きしてはなりません（**MUST NOT**）。

### 3.7 過去の Mention と DID 移行

過去の Mention target は、メッセージの受理時に含まれた、正確な DID を保持します。DID の変更後、Group Host、relay、またはクライアントは、署名済みまたは暗号化済みの過去の Mention payload を書き換えてはなりません（**MUST NOT**）。

受信側製品は、P2 に従って過去の DID から現在の DID への移行を検証し、ローカルの業務ポリシーが返された assurance を受け入れた後、過去の表示や通知の動作を現在のアイデンティティに関連付けてもかまいません（**MAY**）。この関連付けはローカルだけに存在し、payload を変更しません。新規の Mention は、対象の現在の完全な DID を使わなければなりません（**MUST**）。

---

## 4. Profile のバインディングモデル

### 4.1 拡張のマーカー

本 Profile は、専用の payload protocol name を要求しません。

構造化 JSON payload が、本 Profile がサポートするグループメッセージのペイロード位置にあり、かつ、本 Profile に従うトップレベルの `mentions` 配列を含む場合、その payload は、mention を含む payload です。

受信者は、mention の識別に、トップレベルの `protocol` フィールドを要求したり依存したりしてはなりません（**MUST NOT**）。

構造化 JSON payload が、トップレベルの `mentions` 配列を含まない場合、本 Profile は、その payload に適用しません。

### 4.2 外側の `meta.profile` との関係

本 Profile は、外側のグループメッセージ操作の `params.meta.profile` に代わってはなりません（**MUST NOT**）。

外側のグループメッセージ操作は、既存の Profile 名を維持します。例は、以下のとおりです。

- 非 Group E2EE の `group.send` は、`anp.group.base.v2` を使います。
- `group.e2ee.send` は、`anp.group.e2ee.v2` を使います。

### 4.3 コンテンツ型

mention を含む構造化ペイロードは、通常の JSON ペイロードを使って運ばなければなりません（**MUST**）。

非 E2EE の Group Base では、以下を使います。

```text
"meta": {
  "content_type": "application/json"
}
```

Group E2EE の inner plaintext では、以下を使います。

```json
{
  "application_content_type": "application/json"
}
```

実装は、mention を含むメッセージを区別するためだけに、新しい content type を定義してはなりません（**MUST NOT**）。

---

## 5. Mention を含むメッセージオブジェクト

### 5.1 推奨構造

mention を含むメッセージペイロードの最小構造は、以下のとおりです。

```json
{
  "text": "@agents please summarize this discussion.",
  "mentions": [
    {
      "id": "men_1",
      "range": {
        "start": 0,
        "end": 7,
        "unit": "unicode_code_point"
      },
      "target": {
        "kind": "group_selector",
        "selector": "agents"
      },
      "mention_role": "addressee"
    }
  ]
}
```

### 5.2 トップレベルのフィールド

| フィールド | 要件 | 型 | 意味 |
|---|---:|---|---|
| `text` | **MUST** | string | mention の surface syntax を含む、人間可読なメッセージテキスト。 |
| `mentions` | **MUST** | array | このメッセージ内の構造化 mention オブジェクト。 |
| `annotations` | **MAY** | object | アプリケーション拡張メタデータ。ルーティング、セキュリティ、認可には使わない。 |

メッセージに構造化 mention の意味論がない場合、送信者は、トップレベルの `mentions` フィールドを含めるべきではなく（**SHOULD NOT**）、外側の Profile の通常の内容モデルを使うべきです。

mention 処理系は、認識できないトップレベルのフィールドを無視してもかまいません（**MAY**）。

### 5.3 `mentions` 配列

`mentions` は、配列でなければなりません（**MUST**）。

各要素は、第 5.4 節が定義する mention オブジェクトでなければなりません（**MUST**）。

同じメッセージペイロード内で、`mentions[*].id` の値は、一意でなければなりません（**MUST**）。

`mentions` の順序は、mention surface が `text` に現れる順序と一致することが望まれます（**SHOULD**）。

---

### 5.4 Mention オブジェクト

最小の mention オブジェクトは、以下のとおりです。

```json
{
  "id": "men_1",
  "range": {
    "start": 0,
    "end": 7,
    "unit": "unicode_code_point"
  },
  "target": {
    "kind": "group_selector",
    "selector": "agents"
  },
  "mention_role": "addressee"
}
```

フィールドの要件：

| フィールド | 要件 | 型 | 意味 |
|---|---:|---|---|
| `id` | **MUST** | string | メッセージ内のローカルな mention 識別子。グローバルな意味は持たない。 |
| `range` | **MUST** | object | `text` 内の mention surface の範囲。 |
| `target` | **MUST** | object | 機械可読な mention 対象。 |
| `mention_role` | **MAY** | string | mention の役割。省略時、受信者は `addressee` として解釈しなければならない（**MUST**）。 |

mention オブジェクトは、以下を含めてはなりません（**MUST NOT**）。

- `sender`；
- `sender_did`；
- `from`；
- `actor_did`；
- `auth`；
- `origin_proof`；
- `proof`；
- `signature`；
- `sender_device_id`；
- `recipient_device_id`；
- `device_id` または MLS Leaf の識別子。

---

### 5.5 Mention の range

range オブジェクトは、以下のとおりです。

```json
{
  "start": 0,
  "end": 7,
  "unit": "unicode_code_point"
}
```

フィールドの要件：

| フィールド | 要件 | 型 | 意味 |
|---|---:|---|---|
| `start` | **MUST** | non-negative integer | `text` 内の開始オフセット。この位置を範囲に含む。 |
| `end` | **MUST** | non-negative integer | `text` 内の終了オフセット。この位置を範囲に含まない。 |
| `unit` | **MUST** | string | v1 では、`unicode_code_point` でなければならない（**MUST**）。 |

規則：

1. `start` は、`end` より小さくなければならない（**MUST**）。
2. `end` は、`text` の Unicode code point 数を超えてはならない（**MUST NOT**）。
3. range は、JSON 解析後の `text` 文字列の正確な値に基づき、UI の正規化、転写、または Markdown レンダリングより前に計算する。
4. `range` が識別する部分文字列が、mention surface そのものである。v1 は、意図的に mention オブジェクト内で surface 文字列を繰り返さない。
5. 端末が range を検証できない場合、mention による動作の起動において、その mention オブジェクトを無視しなければならない（**MUST**）。ただし、元の `text` を引き続き表示してもかまわない（**MAY**）。

---

### 5.6 Mention の target

#### 5.6.1 単一の human target

```json
{
  "kind": "human",
  "did": "did:wba:example.com:user:alice",
  "display_name": "Alice"
}
```

規則：

- `kind` は、`human` でなければなりません（**MUST**）。
- `did` が存在しなければならず（**MUST**）、DID でなければなりません（**MUST**）。
- `display_name` が、送信側の表示名のスナップショットとして存在してもかまいません（**MAY**）。
- `display_name` を、アイデンティティや認可の証拠として使ってはなりません（**MUST NOT**）。

#### 5.6.2 単一の agent target

```json
{
  "kind": "agent",
  "did": "did:wba:example.com:agent:product-assistant",
  "display_name": "Product Assistant"
}
```

規則：

- `kind` は、`agent` でなければなりません（**MUST**）。
- `did` が存在しなければならず（**MUST**）、DID でなければなりません（**MUST**）。
- `display_name` が、送信側の表示名のスナップショットとして存在してもかまいません（**MAY**）。
- Agent の能力発見、Agent Description の解析、および profile の照会は、本 Profile の範囲外です。

#### 5.6.3 グループセレクターの target

```json
{
  "kind": "group_selector",
  "selector": "agents"
}
```

規則：

- `kind` は、`group_selector` でなければなりません（**MUST**）。
- `selector` は、以下のいずれかの値でなければなりません（**MUST**）。
  - `all`
  - `agents`
  - `humans`
- `kind = "group_selector"` の場合、`did` が現れてはなりません（**MUST NOT**）。
- selector のスコープは、外側のグループメッセージのコンテキストが識別するグループです。
- selector を、P4 のグループ管理の役割として解釈してはなりません（**MUST NOT**）。

---

### 5.7 Mention の role

`mention_role` フィールドは、任意のフィールドです。

v1 が許す値は、以下のとおりです。

| 値 | 意味 |
|---|---|
| `addressee` | mention 対象が、注意を向ける相手である。デフォルト値。 |
| `cc` | mention 対象は、単にコピー先または参照先であり、必ずしも行動を求められない。 |

規則：

- `mention_role` を省略した場合、受信者は `addressee` として解釈しなければなりません（**MUST**）。
- `mention_role` が存在する場合、その値は、本節が許す値のいずれかでなければなりません（**MUST**）。
- `mention_role` を、グループ管理の役割として使ってはなりません（**MUST NOT**）。
- `mention_role` で、グループ送信権限や、外側の Profile の認可規則を上書きしてはなりません（**MUST NOT**）。

---

## 6. Group Selector の意味論

### 6.1 `@all`

`@all` は、以下のように表します。

```json
{
  "target": {
    "kind": "group_selector",
    "selector": "all"
  }
}
```

端末側での解釈：

```text
外层群上下文中的所有 active 群成员
```

### 6.2 `@agents`

`@agents` は、以下のように表します。

```json
{
  "target": {
    "kind": "group_selector",
    "selector": "agents"
  }
}
```

端末側での解釈：

```text
本地应用 roster 或 profile 层分类为 agent 的 active 群成员
```

### 6.3 `@humans`

`@humans` は、以下のように表します。

```json
{
  "target": {
    "kind": "group_selector",
    "selector": "humans"
  }
}
```

端末側での解釈：

```text
本地应用 roster 或 profile 层分类为 human 的 active 群成员
```

### 6.4 Selector 解決のスナップショット

グループメッセージでは、端末は、利用可能であれば、メッセージの受理時に関連付けられた group state snapshot に基づき、group selector を解決することが望まれます（**SHOULD**）。

Group Base と Group E2EE では、通常、これは受理済みメッセージのコンテキスト内で返されるか配信される、`group_state_version` です。

対応する正確な group state snapshot がない場合、端末は、ローカルで利用可能な最良のグループ状態に基づいて selector を解決し、結果を best-effort と記録してもかまいません（**MAY**）。

### 6.5 Member kind の情報源

メンバーを `human` または `agent` に分類することは、アプリケーション層の roster または profile の属性です。

本 Profile は、このための新しい P4 の `group_member` フィールドを定義しません。

実装は、`owner`、`admin`、`member` などの P4 の管理上の役割だけから、`human` または `agent` を推定してはなりません（**MUST NOT**）。

---

## 7. 配置規則

### 7.1 非 E2EE の Group Base

`anp.group.base.v2` の `group.send` では、以下を適用します。

- `params.meta.content_type` は、`application/json` でなければなりません（**MUST**）。
- `params.body.payload` は、mention を含むメッセージオブジェクトを格納しなければなりません（**MUST**）。
- `params.auth.origin_proof` は、Group Base が要求する送信者証明です。
- `params.meta.sender_device_id` と `params.meta.recipient_device_id` が現れてはなりません（**MUST NOT**）。
- Group Host は、既存の Group Base の検証を実行します。
- Group Host は、mention 専用の認可や selector の展開を実行してはなりません（**MUST NOT**）。

例：

```json
{
  "jsonrpc": "2.0",
  "id": "req-group-mention-001",
  "method": "group.send",
  "params": {
    "meta": {
      "profile": "anp.group.base.v2",
      "security_profile": "transport-protected",
      "sender_did": "did:wba:example.com:user:alice",
      "target": {
        "kind": "group",
        "did": "did:wba:groups.example.com:team:waic-demo"
      },
      "operation_id": "msg-group-mention-001",
      "message_id": "msg-group-mention-001",
      "created_at": "2026-06-14T12:00:00Z",
      "content_type": "application/json"
    },
    "auth": {
      "scheme": "anp-rfc9421-origin-proof-v1",
      "origin_proof": {
        "contentDigest": "sha-256=:BASE64_SHA256_DIGEST:",
        "signatureInput": "sig1=(\"@method\" \"@target-uri\" \"content-digest\");created=1781438400;expires=1781438460;nonce=\"n-002\";keyid=\"did:wba:example.com:user:alice#key-1\"",
        "signature": "sig1=:BASE64_SIGNATURE:"
      }
    },
    "body": {
      "payload": {
        "text": "@agents please summarize yesterday's meeting.",
        "mentions": [
          {
            "id": "men_1",
            "range": {
              "start": 0,
              "end": 7,
              "unit": "unicode_code_point"
            },
            "target": {
              "kind": "group_selector",
              "selector": "agents"
            },
            "mention_role": "addressee"
          }
        ]
      }
    }
  }
}
```

### 7.2 Group E2EE

`anp.group.e2ee.v2` の `group.e2ee.send` では、以下を適用します。

- 外側の `params.meta.content_type` は、`application/anp-group-cipher+json` を維持します。
- 外側の `params.body` は、`group_cipher_object` を格納します。
- mention を含むオブジェクトは、MLS の `PrivateMessage` で暗号化する前に、内側の `Group Application Plaintext.payload` に置かなければなりません（**MUST**）。
- 内側の `application_content_type` は、`application/json` でなければなりません（**MUST**）。

この暗号化配信に必要な送信・受信デバイスのフィールドは、すべて P6 の外側の envelope に維持し、Mention payload には属しません。

暗号化前の inner plaintext の例：

```json
{
  "application_content_type": "application/json",
  "thread_id": "thr-001",
  "payload": {
    "text": "@all please review the agenda.",
    "mentions": [
      {
        "id": "men_1",
        "range": {
          "start": 0,
          "end": 4,
          "unit": "unicode_code_point"
        },
        "target": {
          "kind": "group_selector",
          "selector": "all"
        }
      }
    ]
  }
}
```

Group Host が見るのは、外側の ciphertext object です。Group E2EE と Group Base の規則に従い、`group.e2ee.send` 要求を認証して順序付けますが、暗号化された `mentions` 配列は検査も検証もしません。

### 7.3 受信通知

ANP service が、`group.incoming` または対応する Group E2EE 配信経路で、mention を含むグループメッセージをプッシュ配信する場合、以下を適用します。

- プッシュ配信のペイロードは、受理済みの元のメッセージと意味的に同等でなければなりません（**MUST**）。
- 外側の Profile が、元の `auth.origin_proof` の notification への複製を許す場合、service は、端末側で mention ペイロードを元の送信者に束縛できるよう、損失のないコピーを含めることが望まれます（**SHOULD**）。
- 中間サービスは、メッセージの転送やプッシュ配信で、`mentions` を書き換えてはなりません（**MUST NOT**）。
- Group Base の配信は、引き続き DID を宛先とし、Group E2EE のデバイス配信は、運搬する P6 の selector フィールドだけに従います。

---

## 8. 送信者証明と暗号学的束縛

### 8.1 非 E2EE の Group Base

非 E2EE の Group Base では、mention を含むメッセージの送信者を、外側の `auth.origin_proof` で証明します。

検証する主体は、外側のメッセージの sender です。

```text
params.meta.sender_did
```

`mentions` 配列は、`Signed Request Object` の `body` メンバー内にあるため、保護されます。

### 8.2 Group E2EE

Group E2EE では、`group.e2ee.send` は、外側の Profile の origin proof と、Group E2EE の authenticated message の意味論を使います。

`mentions` 配列は、MLS で保護された内側の `Group Application Plaintext` にあります。Group Host からは見えず、端末または Agent runtime が復号した後だけ、検証します。

### 8.3 mention 内の独立した proof はない

v1 では、検証者は、mention 内の独立した signature や proof を要求してはなりません（**MUST NOT**）。

受信者は、mention オブジェクト内に埋め込まれた `proof`、`signature`、`origin_proof`、または `auth` フィールドを、本 Profile に不適合として扱わなければなりません（**MUST**）。

---

## 9. 検証と処理

### 9.1 サーバー側の処理

サーバー、relay service、ingress service、および Group Host Service は、以下に従います。

1. 外側の Profile に従って、外側の ANP グループメッセージを処理しなければならない（**MUST**）。
2. 外側の Profile が要求する、既存の送信者認証、冪等性、target binding、security profile、および payload carriage の検証を実行しなければならない（**MUST**）。
3. グループメッセージでは、Group Base / Group E2EE の要件に従い、グループ送信権限を適用しなければならない（**MUST**）。
4. mention 専用の認可を実行してはならない（**MUST NOT**）。
5. メッセージの受理段階で、`@all`、`@agents`、または `@humans` を、メンバー DID のリストに展開してはならない（**MUST NOT**）。
6. サーバーがある mention target DID を知らないことや、selector の対象範囲が広いことだけを理由に、メッセージを拒否してはならない（**MUST NOT**）。
7. mention を含むペイロードが、無認可で変更されないよう保持しなければならない（**MUST**）。

この規則は、通常の外側の Profile または運用上の理由による、サーバーのメッセージ拒否を妨げません。例として、無効な JSON-RPC shape、未サポートの content type、無効な origin proof、グループ送信権限の不成立、無効な ciphertext object、冪等性の競合、payload サイズ制限、明文化された mention オブジェクト数の上限、レート制限、不正利用防止、スパム対策、またはサービス拒否攻撃への防御があります。

### 9.2 端末側の検証

本 Profile をサポートする端末、クライアント、ユーザーエージェント、または Agent runtime は、アプリケーションペイロードの受信または復号の後に、mention を検証しなければなりません（**MUST**）。

最小の端末側検証手順は、以下のとおりです。

1. mention の動作を起動する前に、外側の Profile の authenticated sender context を検証するか、それに依拠する。
2. JSON payload を解析する。
3. 本 Profile を適用する前に、payload がトップレベルの `mentions` 配列を含むことを確認する。
4. `text` が string であることを確認する。
5. `mentions` が array であることを確認する。
6. 各 mention オブジェクトが、一意の `id` を持つことを確認する。
7. 各 `range` が、`text` に対して有効であることを確認する。
8. `target.kind` が、`human`、`agent`、`group_selector` のいずれかであることを確認する。
9. `target.kind = "human"` または `target.kind = "agent"` の場合、`target.did` が存在することを確認する。
10. `target.kind = "group_selector"` の場合、`target.selector` が、`all`、`agents`、`humans` のいずれかであることを確認する。
11. `mention_role` が存在する場合、その値が、`addressee` または `cc` のいずれかであることを確認する。
12. ローカルポリシーに従い、レンダリング、通知、または Agent runtime の動作を実行する。

ある mention オブジェクトが端末側検証に合格しない場合、端末は、起動、通知、または Agent の活性化において、そのオブジェクトを無視することが望まれます（**SHOULD**）。ただし、元のメッセージテキストを引き続き表示してもかまいません（**MAY**）。

### 9.3 Mention の権限の解釈

v1 には、mention 専用の権限ポリシーはありません。

以下の条件を満たす場合、端末は、wire-protocol 層で、mention を許可されたものとして扱わなければなりません（**MUST**）。

1. 外側のグループメッセージが、適用される ANP Message Profile に従って受理または配信されていること。かつ、
2. mention オブジェクトが、本 Profile で構文的に有効であること。

端末は、通知抑制、通知のレート制限、スパム対策などの、ローカルユーザー設定を適用してもかまいません（**MAY**）。これらの設定は、プロトコル層の mention 認可ではなく、ANP メッセージ自体の拒否として表してはなりません（**MUST NOT**）。

---

## 10. 例

### 10.1 グループの、すべての人間メンバーへの mention

```json
{
  "text": "@humans please confirm your attendance.",
  "mentions": [
    {
      "id": "men_1",
      "range": {
        "start": 0,
        "end": 7,
        "unit": "unicode_code_point"
      },
      "target": {
        "kind": "group_selector",
        "selector": "humans"
      }
    }
  ]
}
```

### 10.2 グループの、単一の human への Mention

```json
{
  "text": "@张三 please review this.",
  "mentions": [
    {
      "id": "men_1",
      "range": {
        "start": 0,
        "end": 3,
        "unit": "unicode_code_point"
      },
      "target": {
        "kind": "human",
        "did": "did:wba:example.com:user:zhangsan",
        "display_name": "张三"
      },
      "mention_role": "cc"
    }
  ]
}
```

### 10.3 グループの、単一の agent への Mention

```json
{
  "text": "@InvoiceBot extract the invoice fields.",
  "mentions": [
    {
      "id": "men_1",
      "range": {
        "start": 0,
        "end": 11,
        "unit": "unicode_code_point"
      },
      "target": {
        "kind": "agent",
        "did": "did:wba:example.com:agent:invoice-bot",
        "display_name": "InvoiceBot"
      },
      "mention_role": "addressee"
    }
  ]
}
```

---

## 11. セキュリティ上の考慮事項

### 11.1 Mention のなりすまし

端末は、可視テキストだけで mention 対象を判断してはなりません（**MUST NOT**）。

たとえば、テキスト `@Alice` だけでは、Alice を識別できません。端末は、対応する構造化 `mentions[*].target` オブジェクトを使わなければなりません。

### 11.2 Display name はアイデンティティではない

`target.display_name` は、表示名のスナップショットにすぎません。

アイデンティティの判断は、単一対象 mention の DID、または group selector mention の selector の意味論に基づかなければなりません（**MUST**）。

### 11.3 サーバー側の mention 認可はない

v1 の mention 検証は端末側にあるため、サーバーが、後で端末側の mention 検証に合格できないメッセージを受理して配信する場合があります。

端末と Agent runtime は、無効な mention オブジェクトによって、特権動作が起動されることを避けなければなりません（**MUST**）。

### 11.4 E2EE のプライバシー

Group E2EE モードでは、mention オブジェクトは、暗号化された plaintext 内にあります。

サーバーと Group Host Service は、将来の拡張が、暗号化またはプライバシー保護された通知 hint を明示的に導入する場合を除き、mention target の検査や索引付けを期待するべきではありません。

本 Profile v1 は、そのような hint を定義しません。

### 11.5 Replay と重複処理

本 Profile は、mention 専用の replay protection を定義しません。

Replay と重複処理は、外側の ANP Message Profile から引き継ぎ、`operation_id`、`message_id`、E2EE session state、または group ordering semantics によって行います。

---

## 12. プライバシー上の考慮事項

### 12.1 メタデータの最小化

Mention target は、社会的な関心の向け方を露呈する場合があります。

実装は、`mentions` を、本 Profile が要求する保護された payload 位置に維持することが望まれ（**SHOULD**）、mention target を外側の metadata に複製するべきではありません（**SHOULD NOT**）。

### 12.2 Group selector のプライバシー

`@agents` や `@humans` などの group selector は、送信者が想定する受け手を露呈する場合があります。ただし、展開したメンバー DID リストを、メッセージペイロードで開示することを避けられます。

実装は、送信時に selector を単一の DID へ展開せず、保持することが望まれます（**SHOULD**）。

---

## 13. 最小相互運用要件

本 Profile に適合する実装は、少なくとも以下をサポートしなければなりません（MUST）。

1. 構造化 JSON グループメッセージ payload の拡張マーカーとしての、トップレベルの `mentions`。
2. `text` と `mentions` によるメッセージオブジェクト構造。
3. `human`、`agent`、`group_selector` の、3 種類の mention target。
4. `all`、`agents`、`humans` の、3 つの group selector 値。
5. `unicode_code_point` の mention range。
6. mention オブジェクトの shape と range の、端末側検証。
7. mention 内に、独立した sender フィールドを使わないこと。
8. mention 内に、独立した proof フィールドを使わないこと。
9. 非 E2EE の `application/json` グループメッセージで、mention を含むペイロードを `params.body.payload` に置くこと。
10. Group E2EE メッセージで、mention を含むペイロードを、内側の `Group Application Plaintext.payload` に置くこと。
11. 外側の ANP Message Profile の、送信者証明と送信権限の意味論を保持すること。
12. v1 では、サーバー側で mention 認可や selector 展開をしないこと。
13. Mention target は、DID または group selector を使い、デバイス束縛を、運搬する P6 メッセージに委ねること。
14. 過去の Mention DID を不変に維持すること。現在の DID への関連付けは、先に P2 移行検証を完了し、ローカルの業務ポリシーに受け入れられなければならない。

---

## 14. 将来の拡張

将来のバージョンでは、以下を定義できます。

- 私聊メッセージの mention の意味論。
- E2EE メッセージの mention notification hint。
- mention 専用の通知配信ポリシー。
- 特定のプロトコルをサポートする agents などの、能力セレクター mention。
- 高リスク操作の、mention-level human authorization。
- リッチテキストや複数の body に対する mention anchoring。
- グループ間または外部の mention 参照。
- human / agent 分類の、標準の roster フィールド。

これらの能力は、意図的に v1 の対象外にしています。
