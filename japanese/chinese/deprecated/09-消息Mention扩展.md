<!-- translation-review: full; source=chinese/deprecated/09-消息Mention扩展.md -->
> 日本語参考訳（原文全文照合・校閲済み）。旧版のメンション拡張です。中国語原文の状態はdraftで、英語版のReleasedとは異なります。v1識別子とコード例は保持しています。
> 原文: [chinese/deprecated/09-消息Mention扩展.md](../../../chinese/deprecated/09-消息Mention扩展.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP Profile 9：メッセージのメンション拡張

- 文書ID：ANP-P9
- 題名：メッセージのメンション拡張
- 状態：draft（草案）
- バージョン：1.1
- 原文言語：Chinese。このページは日本語参考訳です
- 適用範囲：ANPのグループメッセージに、人が読める形式と機械可読な形式のメンションを表すための、アプリケーションpayloadの拡張を定義します。運ぶpayloadが構造化JSONである場合の`anp.group.base.v1`と`anp.group.e2ee.v1`に適用します。
- 依存関係：
  - `anp.core.binding.v1`
  - グループの非E2EEメッセージで使う場合は`anp.group.base.v1`
  - グループのE2EEメッセージで使う場合は`anp.group.e2ee.v1`

---

## 1. 目的

ANPグループメッセージのメンションについて、相互運用に必要な最小の表現を定義します。

メンションは、例えば次のように人が目にする表記を、

```text
@alice
@product-agent
@all
@agents
@humans
```

DIDやグループセレクターなどの機械可読な対象へ結び付ける、構造化されたアプリケーション層のオブジェクトです。

このProfileは、次を標準化します。

1. メンションを含むグループメッセージpayloadのJSON構造。
2. メンションオブジェクトの最小限のフィールド。
3. 初版で対応する対象の種類：`human`、`agent`、`group_selector`。
4. 初版で対応するグループセレクター：`all`、`agents`、`humans`。
5. 外側のANPメッセージの完全性保護の対象となるために必要な、`mentions`の配置。
6. メンションを含むグループメッセージの、送信者の証明と検証のモデル。

このProfileは、次を定義しません。

- 新しいJSON-RPCメソッド。
- `group.send`または`group.e2ee.send`の、新しい外側の`meta.profile`値。
- メンションだけのための新しいコンテンツ型。
- メンションだけのための新しいpayloadの`protocol`マーカー。
- メンション固有の新しい送信者フィールド。
- メンション固有の新しいproofや署名。
- サーバー側のメンション認可モデル。
- サーバー側での`@all`、`@agents`、`@humans`の展開。
- 既読状態、配送受領証、通知の配送、利用者のミュート設定。
- 「プロトコルXに対応するエージェント」など、機能に基づくセレクター。
- `owner`、`admin`、`member`以外の独自のグループ管理上の役割。
- ダイレクトメッセージのメンションの意味。

---

## 2. 用語と規範上の表記規則

### 2.1 規範キーワード

本稿の**MUST**、**MUST NOT**、**REQUIRED**、**SHALL**、**SHALL NOT**、**SHOULD**、**SHOULD NOT**、**RECOMMENDED**、**NOT RECOMMENDED**、**MAY**、**OPTIONAL**は、大文字表記に従う規範上の要件として解釈します。

### 2.2 用語

- **メンション**：メッセージ中で言及する対象を識別する、構造化されたアプリケーション層のオブジェクト。
- **メンションを含むグループメッセージ**：構造化JSON payloadのトップレベルに、このProfileに適合する`mentions`配列を含むグループアプリケーションメッセージ。
- **表示構文**：`@alice`や`@agents`など、人が目にするメンションのテキスト表現。表示構文はプロトコル上の識別子ではありません。
- **メンション対象**：機械可読な対象。人のDID、Agent DID、グループセレクターのいずれかです。
- **グループセレクターのメンション**：`all`、`agents`、`humans`のように、対象がグループ内に限定されたセレクターであるメンション。
- **端末側の検証**：受信クライアント、ユーザーエージェント、Agent実行環境が、アプリケーションpayloadを受信または復号した後にローカルで行う検証・処理。新たなデバイス単位・端末単位のプロトコル識別子を導入する用語ではありません。
- **Group Host Service**：`anp.group.base.v1`が定義するグループサービス。このProfileではメンションの意味を検証しません。

---

## 3. 設計原則

### 3.1 `@`は表示構文であり、識別子ではない

`@`という文字とその後のテキストは、人向けのインターフェースの構文にすぎません。

単一対象へのメンションの、プロトコル上の識別子は対象のDIDです。

```json
{
  "target": {
    "kind": "agent",
    "did": "did:wba:example.com:agent:product-assistant"
  }
}
```

グループセレクターのメンションの識別子は、外側のグループメッセージを範囲とするセレクターの値です。

```json
{
  "target": {
    "kind": "group_selector",
    "selector": "agents"
  }
}
```

### 3.2 メンションは独立した送信者を持たない

メンションオブジェクトに、`sender`、`sender_did`、`from`、`actor_did`などの送信者フィールドを含めては**なりません（MUST NOT）**。

メンションを含むグループメッセージの送信者は、常に外側のANPグループメッセージの送信者です。

- Group Baseでは`params.meta.sender_did`。
- Group E2EEでは、`params.meta.sender_did`とGroup E2EEメッセージの認証コンテキスト。

### 3.3 メンションは独立したproofを持たない

メンションオブジェクトに、`proof`、`signature`、`auth`、`origin_proof`、またはそれに相当するメンション固有のproofフィールドを含めては**なりません（MUST NOT）**。

非E2EEのGroup Baseでは、メンションを含むpayloadを`params.body`内に置き、`auth.origin_proof`に結び付けられた`Signed Request Object`の保護対象にしなければ**なりません（MUST）**。

Group E2EEでは、暗号化前の対応する内部平文オブジェクトに、メンションを含むpayloadを置かなければ**なりません（MUST）**。

### 3.4 v1ではメンション認可をサーバー側で扱わない

このProfileのv1は、メンション固有の権限方針を定義しません。

適用されるBase Profileが外側のグループメッセージの送信を許す場合、メンション層では、対応するどの対象も含められます。

- 単一の人のDID。
- 単一のAgent DID。
- `@all`;
- `@agents`;
- `@humans`.

サーバー、中継サービス、入口サービス、Group Host Serviceは、メンション対象、セレクター、メンションの役割だけを理由にメッセージを拒否しては**なりません（MUST NOT）**。外側のProfileが要求する送信者認証、冪等性、対象へのバインディング、内容の構造、グループ送信権限などの既存の検査を、引き続き適用します。

この規則は、payloadサイズの上限、文書化されたメンション件数の上限、レート制限、乱用・スパム対策、不正な構造のpayloadの拒否、サービス拒否攻撃への対策といった、通常の運用上の制御を妨げません。これらは運用方針であり、メンション固有の認可ではありません。

### 3.5 グループセレクターは管理上の役割ではない

セレクター値の`all`、`agents`、`humans`を、P4グループの管理上の役割と解釈しては**なりません（MUST NOT）**。

P4の管理上の役割は引き続き次のとおりです。

```text
owner
admin
member
```

このProfileのグループセレクターはメンションの対象であり、認可の役割ではありません。

---

## 4. Profileのバインディングモデル

### 4.1 拡張マーカー

このProfileは、専用のpayloadプロトコル名を要求しません。

対応するグループメッセージpayloadの配置のいずれかで運ばれ、トップレベルにこのProfileに適合する`mentions`配列を含む構造化JSON payloadは、メンションを含むものです。

受信側は、メンションを認識するために、トップレベルの`protocol`フィールドを要求したり、それに依存したりしては**なりません（MUST NOT）**。

トップレベルに`mentions`配列がない構造化JSON payloadには、このProfileを適用しません。

### 4.2 外側の`meta.profile`との関係

このProfileで、外側のグループメッセージ操作の`params.meta.profile`を置き換えては**なりません（MUST NOT）**。

外側のグループメッセージ操作は、例えば次の元のProfile名を維持します。

- Group E2EEを使わない`group.send`では`anp.group.base.v1`。
- `group.e2ee.send`では`anp.group.e2ee.v1`。

### 4.3 コンテンツ型

メンションを含む構造化payloadは、通常のJSON payloadの運搬形式を使わなければ**なりません（MUST）**。

非E2EEのGroup Base：

```json
"meta": {
  "content_type": "application/json"
}
```

Group E2EEの内部平文：

```json
{
  "application_content_type": "application/json"
}
```

メンションを含むメッセージと他の構造化JSONアプリケーションpayloadを区別するという理由だけで、新しいコンテンツ型を定義しては**なりません（MUST NOT）**。

---

## 5. メンションを含むメッセージオブジェクト

### 5.1 推奨構造

メンションを含むメッセージpayloadの最小の構造は次のとおりです。

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
| `text` | **MUST** | 文字列 | メンションの表示構文を含む、人が読めるメッセージ本文。 |
| `mentions` | **MUST** | 配列 | このメッセージに含む、構造化されたメンションオブジェクト。 |
| `annotations` | **MAY** | オブジェクト | アプリケーションの拡張メタデータ。ルーティング、安全性、認可には使いません。 |

メッセージが構造化されたメンションの意味を持たない場合、送信者はトップレベルの`mentions`を含めるべきでは**なく（SHOULD NOT）**、代わりに外側のProfileの通常の内容モデルを使うべきです。

メンション処理側は、認識しないトップレベルのフィールドを無視しても**かまいません（MAY）**。

### 5.3 `mentions`配列

`mentions`は配列でなければ**なりません（MUST）**。

各要素は5.4節のメンションオブジェクトでなければ**なりません（MUST）**。

`mentions[*].id`の値は、同じメッセージpayload内で一意でなければ**なりません（MUST）**。

`mentions`は、`text`にメンションの表示が現れる順番に並べるべきです（**SHOULD**）。

---

### 5.4 メンションオブジェクト

最小のメンションオブジェクトは次のとおりです。

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
| `id` | **MUST** | 文字列 | メッセージ内だけで有効なメンション識別子。全体に共通する意味はありません。 |
| `range` | **MUST** | オブジェクト | `text`内のメンション表示の範囲。 |
| `target` | **MUST** | オブジェクト | 機械可読なメンション対象。 |
| `mention_role` | **MAY** | 文字列 | メンションの役割。省略時は、受信側は`addressee`と解釈しなければなりません（**MUST**）。 |

メンションオブジェクトに、次を含めては**なりません（MUST NOT）**。

- `sender`;
- `sender_did`;
- `from`;
- `actor_did`;
- `auth`;
- `origin_proof`;
- `proof`;
- `signature`.

---

### 5.5 メンションの範囲

範囲オブジェクトは次のとおりです。

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
| `start` | **MUST** | 非負整数 | `text`内の開始位置。この位置を含みます。 |
| `end` | **MUST** | 非負整数 | `text`内の終了位置。この位置を含みません。 |
| `unit` | **MUST** | 文字列 | v1では`unicode_code_point`でなければなりません（**MUST**）。 |

規則：

1. `start`は`end`未満でなければ**なりません（MUST）**。
2. `end`は、`text`のUnicodeコードポイント数を超えては**なりません（MUST NOT）**。
3. 範囲は、JSONの解析後、UIでの正規化、文字の転写、Markdown表示の前に、`text`の正確なJSON文字列値に対して計算します。
4. `range`で指定する部分文字列が、メンションの表示です。v1では、表示文字列をメンションオブジェクト内に重複して保持しません。
5. 範囲を検証できない端末は、そのメンションを起動処理の対象から除外しなければ**なりません（MUST）**。ただし、元の`text`を表示しても**かまいません（MAY）**。

---

### 5.6 メンション対象

#### 5.6.1 単一の人を対象とする場合

```json
{
  "kind": "human",
  "did": "did:wba:example.com:user:alice",
  "display_name": "Alice"
}
```

規則：

- `kind`は`human`でなければ**なりません（MUST）**。
- `did`は存在しなければならず（**MUST**）、DIDでなければ**なりません（MUST）**。
- `display_name`は、送信側での表示名の記録として存在しても**かまいません（MAY）**。
- `display_name`を、識別や認可の証拠として使っては**なりません（MUST NOT）**。

#### 5.6.2 単一のエージェントを対象とする場合

```json
{
  "kind": "agent",
  "did": "did:wba:example.com:agent:product-assistant",
  "display_name": "Product Assistant"
}
```

規則：

- `kind`は`agent`でなければ**なりません（MUST）**。
- `did`は存在しなければならず（**MUST**）、DIDでなければ**なりません（MUST）**。
- `display_name`は、送信側での表示名の記録として存在しても**かまいません（MAY）**。
- エージェントの機能発見、Agent Descriptionの解決、プロフィールの検索は、このProfileの範囲外です。

#### 5.6.3 グループセレクターを対象とする場合

```json
{
  "kind": "group_selector",
  "selector": "agents"
}
```

規則：

- `kind`は`group_selector`でなければ**なりません（MUST）**。
- `selector`は次のいずれかでなければ**なりません（MUST）**。
  - `all`
  - `agents`
  - `humans`
- `kind = "group_selector"`の場合、`did`を含めては**なりません（MUST NOT）**。
- セレクターの範囲は、外側のグループメッセージのコンテキストが識別するグループです。
- セレクターを、P4グループの管理上の役割と解釈しては**なりません（MUST NOT）**。

---

### 5.7 メンションの役割

`mention_role`フィールドは任意です。

v1で認める値：

| 値 | 意味 |
|---|---|
| `addressee` | 注意を向けてもらう対象として意図している相手。既定値です。 |
| `cc` | 共有または参照の対象ですが、必ずしも行動を期待する相手ではありません。 |

規則：

- `mention_role`の省略時、受信側は`addressee`と解釈しなければ**なりません（MUST）**。
- `mention_role`がある場合、この節で認めた値のいずれかでなければ**なりません（MUST）**。
- `mention_role`を、グループの管理上の役割として使っては**なりません（MUST NOT）**。
- `mention_role`によって、グループ送信権限や外側のProfileの認可規則を上書きしては**なりません（MUST NOT）**。

---

## 6. グループセレクターの意味

### 6.1 `@all`

`@all`は次のように表します。

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

`@agents`は次のように表します。

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

`@humans`は次のように表します。

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

### 6.4 セレクター解決用のスナップショット

グループメッセージでは、そのメッセージが受理された時点のグループ状態のスナップショットを利用できる場合、その状態に対してグループセレクターを解決するべきです（**SHOULD**）。

Group BaseとGroup E2EEでは、通常、受理済みメッセージのコンテキストとともに返される、または配送される`group_state_version`です。

端末にその正確なスナップショットがない場合、利用できる最善のローカル状態で解決し、ベストエフォートの結果だと明示しても**かまいません（MAY）**。

### 6.5 メンバーの種類の情報源

メンバーが`human`か`agent`かの分類は、アプリケーション層の名簿やプロフィールの属性です。

この分類のための新しいP4 `group_member`フィールドは、このProfileでは定義しません。

実装は、`owner`、`admin`、`member`などP4の管理上の役割だけから、`human`または`agent`を推定しては**なりません（MUST NOT）**。

---

## 7. 配置規則

### 7.1 E2EEを使わないGroup Base

`anp.group.base.v1`の`group.send`では：

- `params.meta.content_type`は`application/json`でなければ**なりません（MUST）**。
- `params.body.payload`は、メンションを含むメッセージオブジェクトを運ばなければ**なりません（MUST）**。
- `params.auth.origin_proof`が、Group Baseの要求する送信者の証明です。
- Group Hostは既存のGroup Baseの検査を適用します。
- Group Hostは、メンション固有の認可やセレクターの展開をしては**なりません（MUST NOT）**。

例：

```json
{
  "jsonrpc": "2.0",
  "id": "req-group-mention-001",
  "method": "group.send",
  "params": {
    "meta": {
      "profile": "anp.group.base.v1",
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

`anp.group.e2ee.v1`の`group.e2ee.send`では：

- 外側の`params.meta.content_type`は、引き続き`application/anp-group-cipher+json`です。
- 外側の`params.body`は`group_cipher_object`を運びます。
- メンションを含むオブジェクトを、MLS `PrivateMessage`で暗号化する前に、内部の`Group Application Plaintext.payload`へ置かなければ**なりません（MUST）**。
- 内部の`application_content_type`は`application/json`でなければ**なりません（MUST）**。

暗号化前の内部平文の例：

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

Group Hostが見るのは外側の暗号文オブジェクトです。Group E2EEとGroup Baseの規則に従って`group.e2ee.send`を認証して順序付けますが、暗号化された`mentions`配列を調べたり検証したりはしません。

### 7.3 受信通知

ANPサービスが`group.incoming`または対応するGroup E2EEの配送経路で、メンションを含むグループメッセージをプッシュする場合：

- プッシュするpayloadは、受理済みの元メッセージと意味的に同じでなければ**なりません（MUST）**。
- 外側のProfileが元の`auth.origin_proof`の通知への複製を認める場合、端末側でpayloadと元の送信者を結び付けて検証できるよう、欠損のないコピーを含めるべきです（**SHOULD**）。
- 中間サービスは、転送やプッシュ時に`mentions`を書き換えては**なりません（MUST NOT）**。

---

## 8. 送信者の証明と暗号学的なバインディング

### 8.1 非E2EEのGroup Base

非E2EEのGroup Baseでは、メンションを含むメッセージの送信者は、外側の`auth.origin_proof`で証明します。

検証対象は、外側のメッセージの送信者です。

```text
params.meta.sender_did
```

`mentions`配列は`Signed Request Object`の`body`内にあるため、保護されます。

### 8.2 Group E2EE

Group E2EEでは、`group.e2ee.send`は外側のProfileのorigin proofと、グループE2EEの認証済みメッセージの意味を利用します。

`mentions`配列はMLSが保護する内部の`Group Application Plaintext`内にあります。Group Hostには見えず、端末やAgent実行環境が復号した後にだけ検証します。

### 8.3 メンション固有のproofを持たない

v1の検証側は、メンション固有の署名やproofを要求しては**なりません（MUST NOT）**。

受信側は、メンションオブジェクトに埋め込まれた`proof`、`signature`、`origin_proof`、`auth`を、このProfileでは無効と扱わなければ**なりません（MUST）**。

---

## 9. 検証と処理

### 9.1 サーバー側の処理

サーバー、中継サービス、入口サービス、Group Host Serviceは：

1. 外側のANPグループメッセージを、そのProfileに従って処理しなければ**なりません（MUST）**。
2. 外側のProfileが要求する既存の送信者認証、冪等性、対象バインディング、セキュリティプロファイル、payload運搬の検査を実行しなければ**なりません（MUST）**。
3. Group Base／Group E2EEが要求する、グループメッセージの送信権限を適用しなければ**なりません（MUST）**。
4. メンション固有の認可を実行しては**なりません（MUST NOT）**。
5. メッセージの受理処理で`@all`、`@agents`、`@humans`をメンバーDIDの一覧へ展開しては**なりません（MUST NOT）**。
6. メンション対象のDIDをサーバーが知らない、またはセレクターの範囲が広いという理由だけで拒否しては**なりません（MUST NOT）**。
7. メンションを含むpayloadを、無断で変更せずに保持しなければ**なりません（MUST）**。

この規則は、通常のProfile上・運用上の理由による拒否を妨げません。例えば、不正なJSON-RPC構造、未対応コンテンツ型、無効なorigin proof、グループ送信権限違反、不正な暗号文、冪等性の衝突、payloadサイズ制限、文書化されたメンション数上限、レート制限、乱用・スパム対策、サービス拒否攻撃への対策などです。

### 9.2 端末側の検証

対応する端末、クライアント、ユーザーエージェント、Agent実行環境は、アプリケーションpayloadを受信または復号した後にメンションを検証しなければ**なりません（MUST）**。

端末側で必要な最小の検証手順：

1. メンションの動作を起動する前に、外側のProfileが認証した送信者コンテキストを検証するか、それに依拠する。
2. JSON payloadを解析する。
3. このProfileを適用する前に、トップレベルに`mentions`配列があることを確認する。
4. `text`が文字列であることを確認する。
5. `mentions`が配列であることを確認する。
6. 各メンションオブジェクトの`id`が一意であることを確認する。
7. 各`range`が`text`に対して有効であることを確認する。
8. `target.kind`が`human`、`agent`、`group_selector`のいずれかであることを確認する。
9. `target.kind = "human"`または`target.kind = "agent"`なら、`target.did`が存在することを確認する。
10. `target.kind = "group_selector"`なら、`target.selector`が`all`、`agents`、`humans`のいずれかであることを確認する。
11. `mention_role`がある場合、`addressee`または`cc`であることを確認する。
12. ローカル方針に従い、表示、通知、Agent実行環境の動作を適用する。

端末側の検証に失敗したメンションオブジェクトは、起動、通知、Agentの有効化では無視するべきです（**SHOULD**）。ただし、元のメッセージ本文は表示しても**かまいません（MAY）**。

### 9.3 メンション権限の解釈

v1には、メンション固有の権限方針はありません。

端末は、次の両方を満たすメンションを、通信プロトコル層では許可済みと扱わなければ**なりません（MUST）**。

1. 外側のグループメッセージが、該当するANP Message Profileに従って受理または配送されている。
2. メンションオブジェクトが、このProfileの構文上有効である。

端末はミュート、通知の頻度制限、スパム対策など、ローカルな利用者設定を適用しても**かまいません（MAY）**。これらはプロトコル層のメンション認可ではなく、ANPメッセージ自体の拒否として表しては**なりません（MUST NOT）**。

---

## 10. 例

### 10.1 グループ内の全員のうち人を対象にする

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

### 10.2 グループ内の1人を対象にする

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

### 10.3 グループ内の1体のエージェントを対象にする

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

## 11. セキュリティに関する考慮事項

### 11.1 メンションのなりすまし

端末は、表示されるテキストだけでメンション対象を判断しては**なりません（MUST NOT）**。

例えば、`@Alice`というテキストだけではAliceを識別できません。対応する構造化された`mentions[*].target`オブジェクトを使う必要があります。

### 11.2 表示名は識別子ではない

`target.display_name`は、表示名の記録にすぎません。

識別の判断は、単一対象ではDID、グループセレクターではその意味に基づかなければ**なりません（MUST）**。

### 11.3 サーバー側でメンションを認可しない

v1のメンション検証は端末側で行うため、サーバーが受理・配送したメッセージのメンションオブジェクトが、後から端末側の検証に失敗することがあります。

端末やAgent実行環境は、無効なメンションオブジェクトから特権的な動作を起動しないようにしなければ**なりません（MUST）**。

### 11.4 E2EEのプライバシー

Group E2EEでは、メンションオブジェクトは暗号化された平文の中にあります。

将来の拡張で暗号化またはプライバシーを保護する通知ヒントを明示的に導入しない限り、サーバーやGroup Host Serviceは対象を調べたり索引化したりできると想定するべきではありません。

このProfileのv1は、そのようなヒントを定義しません。

### 11.5 リプレイと重複の処理

メンション固有のリプレイ対策は定義しません。

リプレイ・重複の処理は、`operation_id`、`message_id`、E2EEのセッション状態、グループの順序付けの意味を通じて、外側のANP Message Profileから引き継ぎます。

---

## 12. プライバシーに関する考慮事項

### 12.1 最小限のメタデータ

メンション対象から、人間関係における注意の向け方が分かる可能性があります。

実装は、このProfileが要求する保護済みpayloadの位置に`mentions`を保持するべきであり（**SHOULD**）、外側のメタデータに対象を重複して記載するべきではありません（**SHOULD NOT**）。

### 12.2 グループセレクターのプライバシー

`@agents`や`@humans`から、送信者の意図する相手は分かる可能性がありますが、メンバーDIDを展開した一覧をpayloadで公開せずに済みます。

実装は、送信時に個別のDIDへ展開する代わりに、セレクターを保持するべきです（**SHOULD**）。

---

## 13. 最小限の相互運用要件

適合する実装は、少なくとも次に対応しなければなりません（MUST）。

1. 構造化JSONグループメッセージpayloadの拡張マーカーとしての、トップレベルの`mentions`。
2. `text`と`mentions`によるメッセージオブジェクト。
3. `human`、`agent`、`group_selector`の対象種類。
4. `all`、`agents`、`humans`のグループセレクター。
5. `unicode_code_point`単位のメンション範囲。
6. 端末側でのメンションオブジェクトの構造・範囲の検証。
7. メンション固有の送信者フィールドを持たないこと。
8. メンション固有のproofフィールドを持たないこと。
9. 非E2EEの`application/json`グループメッセージでは、`params.body.payload`内に配置すること。
10. Group E2EEでは、内部の`Group Application Plaintext.payload`内に配置すること。
11. 外側のANP Message Profileの既存の送信者証明・送信権限の意味を保持すること。
12. v1ではサーバー側のメンション認可やセレクター展開を行わないこと。

---

## 14. 将来の拡張

将来の版では、次を定義する可能性があります。

- ダイレクトメッセージのメンションの意味。
- E2EEメッセージのメンション通知ヒント。
- メンション固有の通知配送方針。
- 特定プロトコルに対応するAgentなど、機能セレクターのメンション。
- 高リスク行為についての、メンション単位の人間による認可。
- リッチテキストや複数の本文に対応する、メンション位置の結び付け。
- グループをまたぐ、または外部の対象へのメンション参照。
- 人／エージェント分類用の標準的な名簿フィールド。

これらの機能は、意図的にv1の範囲外としています。
