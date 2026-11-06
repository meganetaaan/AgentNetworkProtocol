<!-- translation-review: machine-fully-reviewed; scope=full-document-source-lines-1-850; inventory=japanese/reviews/messaging-overlays-review.json -->
> 日本語参考訳（機械翻訳から全文を意味校閲済み）。規範となるのは原文です。本文・見出し・表・条件・否定を原文と照合し、コード例・識別子・規範キーワードを保持しています。独立した二次校閲や実装適合性の検証は未実施です。
> 原文: [message/09-message-mentions.md](../../message/09-message-mentions.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP Profile 9：メッセージのメンション拡張

- 文書ID：ANP-P9
- タイトル：メッセージのメンション拡張
- 状態：リリース済み
- バージョン：1.2
- 仕様セット：ANP Messaging 1.2
- 原文言語：English
- バインディングのバージョン：v1拡張。独立した`meta.profile`は定義しません。
- 適用範囲：ANPグループメッセージで、人が読めるメンションと機械可読なメンションを表現するためのアプリケーションペイロード拡張を定義します。このMessaging 1.2仕様セットでは、運ばれるアプリケーションペイロードが構造化JSONである場合に、`anp.group.base.v2`および`anp.group.e2ee.v2`と組み合わせて使用します。
- 依存関係：
  - `anp.core.binding.v1`
  - 非E2EEのグループメッセージで使う場合：`anp.group.base.v2`
  - E2EEのグループメッセージで使う場合：`anp.group.e2ee.v2`

---

## 1. 目的

このProfileは、ANPグループメッセージにおけるメンションの、相互運用に必要な最小限の表現を定義します。

メンションは、次のような人に見える表記を、

```text
@alice
@product-agent
@all
@agents
@humans
```

DIDやグループセレクターなどの機械可読な対象へ結び付ける、構造化されたアプリケーション層のオブジェクトです。

このProfileは次を標準化します。

1. メンションを含むグループメッセージのペイロードのJSON構造。
2. メンションオブジェクトの最小限のフィールド。
3. 初版で対応する対象の種類：`human`、`agent`、`group_selector`。
4. 初版で対応するグループセレクター：`all`、`agents`、`humans`。
5. メンションを内包するANPメッセージの完全性保護の対象となるようにする、`mentions`の必須配置。
6. メンションを含むグループメッセージの送信者証明と検証のモデル。

このProfileは次を定義しません。

- 新しいJSON-RPCメソッド。
- `group.send`または`group.e2ee.send`に使う、新しい外側の`meta.profile`値。
- メンション専用の新しいコンテンツ型。
- メンション専用の新しいペイロード`protocol`マーカー。
- 新しいメンション固有の送信者フィールド。
- 新しいメンション固有の証明や署名。
- サーバー側のメンション認可モデル。
- サーバー側での`@all`、`@agents`、`@humans`の展開。
- 既読状態、配信受領証、通知配信、利用者のミュート設定。
- 「プロトコルXに対応するエージェント」などの、機能に基づくセレクター。
- `owner`、`admin`、`member`を超える独自のグループガバナンス役割。
- 個別メッセージにおけるメンションの意味。

---

このProfileは`did:wba`、`did:web`、その他の対応するDIDメソッドに適用されます。アイデンティティの解決と検証は[P2](../../message/02-identity-and-discovery.md#method-validation)に従います。

## 2. 用語と規範上の表記

### 2.1 規範キーワード

本書の**MUST**、**MUST NOT**、**REQUIRED**、**SHALL**、**SHALL NOT**、**SHOULD**、**SHOULD NOT**、**RECOMMENDED**、**NOT RECOMMENDED**、**MAY**、**OPTIONAL**は、大文字表記に従って規範的要件として解釈します。

### 2.2 用語

- **メンション（Mention）**：メッセージ内で言及する対象を識別する、構造化されたアプリケーション層オブジェクト。
- **メンションを含むグループメッセージ（Mention-bearing Group Message）**：構造化JSONペイロードのトップレベルに、このProfileに従う`mentions`配列を含むグループアプリケーションメッセージ。
- **表面構文（Surface Syntax）**：`@alice`や`@agents`など、人に見えるメンションの表記。表面構文はプロトコル上のアイデンティティではありません。
- **メンション対象（Mention Target）**：機械可読なメンションの対象。人間のDID、エージェントのDID、グループセレクターのいずれかです。
- **グループセレクターのメンション（Group Selector Mention）**：`all`、`agents`、`humans`など、グループをスコープとするセレクターを対象とするメンション。
- **端末側検証（Terminal-side Validation）**：受信側クライアント、ユーザーエージェント、エージェントの実行環境が、アプリケーションペイロードの受信または復号後に行うローカルの検証と処理。この用語によって、デバイス単位や端末単位のプロトコルアイデンティティが導入されるわけではありません。
- **グループHostサービス（Group Host Service）**：`anp.group.base.v2`が定義するグループサービス。このProfileではメンションの意味を検証しません。

---

## 3. 設計原則

### 3.1 `@`は表面構文であり、アイデンティティではない

文字`@`とそれに続くテキストは、人向けインターフェースの構文にすぎません。

単一対象のメンションのプロトコルアイデンティティは、対象DIDです。

```json
{
  "target": {
    "kind": "agent",
    "did": "did:wba:example.com:agent:product-assistant"
  }
}
```

グループセレクターのメンションのプロトコルアイデンティティは、それを内包するグループメッセージをスコープとするセレクター値です。

```json
{
  "target": {
    "kind": "group_selector",
    "selector": "agents"
  }
}
```

### 3.2 メンションは独立した送信者を持たない

メンションオブジェクトに、`sender`、`sender_did`、`from`、`actor_did`などの送信者フィールドを含めてはなりません（**MUST NOT**）。

メンションを含むグループメッセージの送信者は、常に、それを内包するANPグループメッセージの送信者です。

- Group Baseでは`params.meta.sender_did`。
- Group E2EEでは`params.meta.sender_did`とGroup E2EEメッセージ認証コンテキスト。

### 3.3 メンションは独立した証明を持たない

メンションオブジェクトに`proof`、`signature`、`auth`、`origin_proof`、または同等のメンション内の証明フィールドを含めてはなりません（**MUST NOT**）。

非E2EEのGroup Baseでは、メンションを含むペイロードを`params.body`の内側に配置し、`auth.origin_proof`が結び付ける`Signed Request Object`の対象にしなければなりません（**MUST**）。

Group E2EEでは、暗号化する前に、メンションを含むペイロードを対応する内側の平文オブジェクト内に配置しなければなりません（**MUST**）。

### 3.4 v1ではメンション認可はサーバー側の責務ではない

このProfileは、v1でメンション固有の権限ポリシーを定義しません。

適用されるベースProfileの下で、それを内包するグループメッセージの送信が許可されていれば、送信者はメンション層で、対応するどのメンション対象も含めることができます。

- 単一の人間のDID。
- 単一のエージェントのDID。
- `@all`;
- `@agents`;
- `@humans`.

サーバー、中継サービス、入口サービス、グループHostサービスは、メンションの対象、セレクター、役割だけを理由にメッセージを拒否してはなりません（**MUST NOT**）。引き続き、送信者認証、冪等性、対象へのバインディング、コンテンツの構造規則、グループ送信権限など、内包側Profileが要求する既存の検査のみを実施します。

この規則は、ペイロードサイズ制限、明記されたメンションオブジェクト数の上限、レート制限、不正利用対策、スパム対策、不正形式ペイロードの拒否、サービス拒否攻撃対策といった通常の運用上の制御を妨げません。これらの制御は運用ポリシーであり、メンション固有の認可ではありません。

### 3.5 グループセレクターはグループガバナンスの役割ではない

セレクター値`all`、`agents`、`humans`をP4のグループガバナンスの役割と解釈してはなりません（**MUST NOT**）。

P4のグループガバナンスの役割は、引き続き次のとおりです。

```text
owner
admin
member
```

このProfileのグループセレクターはメンションの対象であり、認可上の役割ではありません。

### 3.6 メンションの対象はデバイスの対象ではない

単一対象のメンションは人間またはエージェントのDIDを識別し、グループセレクターのメンションはP4の業務メンバーの集合を識別します。いずれもデバイスやMLS Leafを識別するものではありません。一つのDIDに属する複数のデバイスやLeafも、メンション上は一つの主体のままです。

内包側のGroup E2EEメッセージにある送信・受信デバイスのバインディングは、P6だけが管理します。メンションオブジェクトは、その外側のデバイスセレクターをコピー、推論、上書きしてはなりません（**MUST NOT**）。

### 3.7 過去のメンションとDIDの移行

過去のメンション対象は、受け入れられたメッセージに記載された正確なDIDのままです。グループHost、中継、クライアントは、そのDIDが変わった後も、署名済みまたは暗号化された過去のメンションペイロードを書き換えてはなりません（**MUST NOT**）。

受信側の製品は、過去のDIDから現在のDIDへのP2の移行を検証し、返されたassuranceを業務ポリシーが受け入れた後で、過去の表記や通知動作を現在のアイデンティティに関連付けてもかまいません（**MAY**）。この関連付けはローカルなもので、ペイロードを変更しません。新しく作成するメンションは、現在の完全な対象DIDを使わなければなりません（**MUST**）。

---

## 4. Profileのバインディングモデル

### 4.1 拡張マーカー

このProfileは、専用のペイロードプロトコル名を要求しません。

構造化JSONペイロードが、対応するグループメッセージのペイロード位置の一つで運ばれ、トップレベルにこのProfileに従う`mentions`配列を含むとき、そのペイロードはメンションを含むものとされます。

受信側は、メンションを認識するためにトップレベルの`protocol`フィールドを必須としたり、それに依存したりしてはなりません（**MUST NOT**）。

構造化JSONペイロードのトップレベルに`mentions`配列がない場合、このProfileはそのペイロードに適用されません。

### 4.2 外側の`meta.profile`との関係

このProfileは、内包側のグループメッセージ操作の外側の`params.meta.profile`を置き換えてはなりません（**MUST NOT**）。

内包側のグループメッセージ操作は、元のProfile名を維持します。例えば次のとおりです。

- Group E2EEを使わない`group.send`では`anp.group.base.v2`。
- `group.e2ee.send`では`anp.group.e2ee.v2`。

### 4.3 コンテンツ型

メンションを含む構造化ペイロードは、通常のJSONペイロードの運搬方法を使わなければなりません（**MUST**）。

非E2EEのGroup Baseでは次のとおりです。

```text
"meta": {
  "content_type": "application/json"
}
```

Group E2EEの内側の平文では次のとおりです。

```json
{
  "application_content_type": "application/json"
}
```

実装は、メンションを含むメッセージとその他の構造化JSONアプリケーションペイロードを区別するためだけに、新しいコンテンツ型を定義してはなりません（**MUST NOT**）。

---

## 5. メンションを含むメッセージオブジェクト

### 5.1 推奨する構造

メンションを含むメッセージペイロードは、最低限、次の構造を持ちます。

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
| `text` | **MUST** | string | メンションの表面構文を含む、人が読めるメッセージ本文。 |
| `mentions` | **MUST** | array | このメッセージ内の構造化メンションオブジェクト。 |
| `annotations` | **MAY** | object | アプリケーション拡張のメタデータ。ルーティング、セキュリティ、認可には使いません。 |

メッセージに構造化メンションの意味がない場合、送信者はトップレベルの`mentions`フィールドを含めるべきではなく（**SHOULD NOT**）、内包側Profileの通常のコンテンツモデルを使うべきです。

メンション処理系は、認識できないトップレベルのフィールドを無視してもかまいません（**MAY**）。

### 5.3 `mentions`配列

`mentions`は配列でなければなりません（**MUST**）。

各要素は、5.4節が定義するメンションオブジェクトでなければなりません（**MUST**）。

`mentions[*].id`の値は、同一メッセージペイロード内で一意でなければなりません（**MUST**）。

`mentions`の順序は、メンションの表記が`text`に出現する順序に従うべきです（**SHOULD**）。

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
| `id` | **MUST** | string | メッセージ内でのみ有効なメンション識別子。グローバルな意味は持ちません。 |
| `range` | **MUST** | object | `text`内のメンション表記の範囲。 |
| `target` | **MUST** | object | 機械可読なメンション対象。 |
| `mention_role` | **MAY** | string | メンションの役割。省略時、受信側は`addressee`と解釈しなければなりません（**MUST**）。 |

メンションオブジェクトに次を含めてはなりません（**MUST NOT**）。

- `sender`;
- `sender_did`;
- `from`;
- `actor_did`;
- `auth`;
- `origin_proof`;
- `proof`;
- `signature`;
- `sender_device_id`;
- `recipient_device_id`;
- `device_id`またはMLS Leafの識別子。

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
| `start` | **MUST** | 非負整数 | `text`内の開始オフセット。この位置を含みます。 |
| `end` | **MUST** | 非負整数 | `text`内の終了オフセット。この位置は含みません。 |
| `unit` | **MUST** | string | v1では`unicode_code_point`でなければなりません（**MUST**）。 |

規則：

1. `start`は`end`より小さくなければなりません（**MUST**）。
2. `end`は`text`のUnicodeコードポイント数を超えてはなりません（**MUST NOT**）。
3. 範囲は、JSON解析後、UIでの正規化・翻字・Markdown描画を行う前の、`text`の正確なJSON文字列値に対して計算します。
4. `range`が示す部分文字列がメンションの表記です。v1では、表記文字列をメンションオブジェクト内に意図的に重複保存しません。
5. 端末が範囲を検証できない場合、メンションに伴う動作を起動する目的では、そのメンションオブジェクトを無視しなければなりません（**MUST**）。ただし、元の`text`を表示することは認められます（**MAY**）。

---

### 5.6 メンションの対象

#### 5.6.1 単一の人間を対象とする場合

```json
{
  "kind": "human",
  "did": "did:wba:example.com:user:alice",
  "display_name": "Alice"
}
```

規則：

- `kind`は`human`でなければなりません（**MUST**）。
- `did`は存在しなければならず（**MUST**）、DIDでなければなりません（**MUST**）。
- `display_name`は、送信側での表示のスナップショットとして存在してもかまいません（**MAY**）。
- `display_name`をアイデンティティや認可の証拠として使ってはなりません（**MUST NOT**）。

#### 5.6.2 単一のエージェントを対象とする場合

```json
{
  "kind": "agent",
  "did": "did:wba:example.com:agent:product-assistant",
  "display_name": "Product Assistant"
}
```

規則：

- `kind`は`agent`でなければなりません（**MUST**）。
- `did`は存在しなければならず（**MUST**）、DIDでなければなりません（**MUST**）。
- `display_name`は、送信側での表示のスナップショットとして存在してもかまいません（**MAY**）。
- エージェントの機能発見、Agent Descriptionの解決、profileの検索は、このProfileの範囲外です。

#### 5.6.3 グループセレクターを対象とする場合

```json
{
  "kind": "group_selector",
  "selector": "agents"
}
```

規則：

- `kind`は`group_selector`でなければなりません（**MUST**）。
- `selector`は次のいずれかでなければなりません（**MUST**）。
  - `all`
  - `agents`
  - `humans`
- `kind = "group_selector"`の場合、`did`が現れてはなりません（**MUST NOT**）。
- セレクターのスコープは、内包側のグループメッセージのコンテキストが識別するグループです。
- セレクターをP4のグループガバナンスの役割として解釈してはなりません（**MUST NOT**）。

---

### 5.7 メンションの役割

`mention_role`フィールドは省略可能です。

v1で認められる値：

| 値 | 意味 |
|---|---|
| `addressee` | メンションされた対象に、注意を向けることを意図しています。これが既定値です。 |
| `cc` | メンションされた対象を写しの送付先や参照先としますが、必ずしも行動を期待するわけではありません。 |

規則：

- `mention_role`が省略されている場合、受信側は`addressee`と解釈しなければなりません（**MUST**）。
- `mention_role`が存在する場合、この節で認められた値のいずれかでなければなりません（**MUST**）。
- `mention_role`をグループガバナンスの役割として使ってはなりません（**MUST NOT**）。
- `mention_role`を使い、グループ送信権限や内包側Profileの認可規則を上書きしてはなりません（**MUST NOT**）。

---

## 6. グループセレクターの意味

### 6.1 `@all`

`@all`は次のように表現します。

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
all active group members in the enclosing group context
```

### 6.2 `@agents`

`@agents`は次のように表現します。

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
active group members that the local application roster or profile layer classifies as agents
```

### 6.3 `@humans`

`@humans`は次のように表現します。

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
active group members that the local application roster or profile layer classifies as humans
```

### 6.4 セレクター解決のスナップショット

グループメッセージでは、受け入れられたメッセージに対応するグループ状態のスナップショットが利用できる場合、端末はそのスナップショットに対してグループセレクターを解決するべきです（**SHOULD**）。

Group BaseとGroup E2EEでは、通常、受け入れられたメッセージのコンテキストとともに返される、または配信される`group_state_version`がこれに当たります。

端末がその正確なグループ状態スナップショットを持たない場合、利用できる最善のローカルグループ状態でセレクターを解決し、結果をベストエフォートとして示してもかまいません（**MAY**）。

### 6.5 メンバー種別の情報源

メンバーの`human`または`agent`への分類は、アプリケーション層のroster（メンバー一覧）またはprofileの属性です。

このProfileは、この分類のために新しいP4の`group_member`フィールドを定義しません。

実装は、`owner`、`admin`、`member`などのP4ガバナンスの役割だけから`human`や`agent`を推論してはなりません（**MUST NOT**）。

---

## 7. 配置規則

### 7.1 E2EEを使わないGroup Base

`anp.group.base.v2`の`group.send`では、次の規則に従います。

- `params.meta.content_type`は`application/json`でなければなりません（**MUST**）。
- `params.body.payload`で、メンションを含むメッセージオブジェクトを運ばなければなりません（**MUST**）。
- `params.auth.origin_proof`は、Group Baseが要求する送信者証明です。
- `params.meta.sender_device_id`および`params.meta.recipient_device_id`が現れてはなりません（**MUST NOT**）。
- グループHostは、既存のGroup Baseの検査を適用します。
- グループHostは、メンション固有の認可やセレクター展開を行ってはなりません（**MUST NOT**）。

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

`anp.group.e2ee.v2`の`group.e2ee.send`では、次の規則に従います。

- 外側の`params.meta.content_type`は`application/anp-group-cipher+json`のままです。
- 外側の`params.body`で`group_cipher_object`を運びます。
- メンションを含むオブジェクトは、MLSの`PrivateMessage`で暗号化する前に、内側の`Group Application Plaintext.payload`内へ配置しなければなりません（**MUST**）。
- 内側の`application_content_type`は`application/json`でなければなりません（**MUST**）。

この暗号化配信に必要な送信・受信デバイスのフィールドは、P6の外側のエンベロープに置いたままとし、メンションペイロードの一部にはしません。

暗号化前の内側の平文の例：

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

グループHostが見るのは外側の暗号文オブジェクトです。Group E2EEおよびGroup Baseの規則に従って`group.e2ee.send`要求を認証し、順序付けますが、暗号化された`mentions`配列を検査・検証しません。

### 7.3 受信通知

ANPサービスが、`group.incoming`または対応するGroup E2EE配信経路を使って、メンションを含むグループメッセージをプッシュする場合：

- プッシュするペイロードは、受け入れられた元のメッセージと意味的に等価なままでなければなりません（**MUST**）。
- 内包側Profileが元の`auth.origin_proof`を通知へコピーすることを認める場合、サービスは損失のないコピーを含めるべきです（**SHOULD**）。これにより、端末側の検証で、メンションを含むペイロードを元の送信者に結び付けられます。
- 中間サービスは、メッセージの転送やプッシュ時に`mentions`を書き換えてはなりません（**MUST NOT**）。
- Group Baseの配信は引き続きDIDを宛先とし、Group E2EEのデバイス配信は、内包側のP6セレクターフィールドだけに従います。

---

## 8. 送信者証明と暗号学的バインディング

### 8.1 非E2EEのGroup Base

非E2EEのGroup Baseでは、メンションを含むメッセージの送信者は、内包側の`auth.origin_proof`によって証明されます。

検証対象は、内包側メッセージの送信者です。

```text
params.meta.sender_did
```

`mentions`配列は、`Signed Request Object`の`body`メンバー内にあるため保護されます。

### 8.2 Group E2EE

Group E2EEでは、`group.e2ee.send`は、内包側Profileのorigin proofと、グループE2EEの認証済みメッセージの意味に従います。

`mentions`配列は、MLSで保護された内側の`Group Application Plaintext`内にあります。グループHostには見えず、端末やエージェント実行環境が復号後に初めて検証します。

### 8.3 メンション内の証明は不要

v1では、検証者はメンション内の署名や証明を要求してはなりません（**MUST NOT**）。

受信側は、メンションオブジェクト内に埋め込まれた`proof`、`signature`、`origin_proof`、`auth`の各フィールドを、このProfileでは無効として扱わなければなりません（**MUST**）。

---

## 9. 検証と処理

### 9.1 サーバー側の処理

サーバー、中継サービス、入口サービス、グループHostサービスは、次に従います。

1. 内包側のANPグループメッセージを、そのProfileに従って処理しなければなりません（**MUST**）。
2. 内包側Profileが要求する、既存の送信者認証、冪等性、対象へのバインディング、security profile、ペイロードの運搬方法の検査を実施しなければなりません（**MUST**）。
3. グループメッセージでは、Group Base／Group E2EEが要求するグループ送信権限を適用しなければなりません（**MUST**）。
4. メンション固有の認可を行ってはなりません（**MUST NOT**）。
5. メッセージの受け入れ処理の一部として、`@all`、`@agents`、`@humans`をメンバーDIDの一覧へ展開してはなりません（**MUST NOT**）。
6. メンション対象のDIDをサーバーが知らない、またはセレクターの範囲が広いという理由だけで、メッセージを拒否してはなりません（**MUST NOT**）。
7. メンションを含むペイロードを、無断で変更せず保持しなければなりません（**MUST**）。

この規則は、JSON-RPC構造の不正、未対応のコンテンツ型、無効なorigin proof、グループ送信権限の検査失敗、無効な暗号文オブジェクト、冪等性の競合、ペイロードサイズ上限、明記されたメンションオブジェクト数の上限、レート制限、不正利用対策ポリシー、スパム対策、サービス拒否攻撃対策など、通常の内包側Profile上または運用上の理由による、サーバーのメッセージ拒否を妨げません。

### 9.2 端末側の検証

このProfileに対応する端末、クライアント、ユーザーエージェント、エージェント実行環境は、アプリケーションペイロードの受信または復号後に、メンションを検証しなければなりません（**MUST**）。

端末側の最小限の検証手順は次のとおりです。

1. メンションによる動作を起動する前に、内包側Profileの認証済み送信者コンテキストを検証するか、それに依拠する。
2. JSONペイロードを解析する。
3. このProfileを適用する前に、ペイロードのトップレベルに`mentions`配列があることを確認する。
4. `text`が文字列であることを確認する。
5. `mentions`が配列であることを確認する。
6. 各メンションオブジェクトが一意の`id`を持つことを確認する。
7. 各`range`が`text`に対して有効であることを確認する。
8. `target.kind`が`human`、`agent`、`group_selector`のいずれかであることを確認する。
9. `target.kind = "human"`または`target.kind = "agent"`の場合、`target.did`の存在を確認する。
10. `target.kind = "group_selector"`の場合、`target.selector`が`all`、`agents`、`humans`のいずれかであることを確認する。
11. `mention_role`が存在する場合、`addressee`または`cc`のいずれかであることを確認する。
12. ローカルポリシーに従って、ローカルの描画、通知、エージェント実行環境の動作を適用する。

メンションオブジェクトが端末側の検証に失敗した場合、端末は、動作の起動、通知、エージェントの有効化の目的ではそのオブジェクトを無視するべきですが（**SHOULD**）、元のメッセージ本文を表示してもかまいません（**MAY**）。

### 9.3 メンション権限の解釈

v1には、メンション固有の権限ポリシーはありません。

次の条件を満たす場合、端末は、メンションをwireプロトコル層で許可されたものとして扱わなければなりません（**MUST**）。

1. 内包側のグループメッセージが、適用されるANP Message Profileの下で受け入れられた、または配信されたこと。かつ、
2. メンションオブジェクトが、このProfileの構文上有効であること。

端末は、ミュート、通知頻度の制限、スパム対策などのローカルな利用者設定を適用してもかまいません（**MAY**）。これらのローカル設定は、プロトコル層のメンション認可ではなく、ANPメッセージそのものの拒否として表現してはなりません（**MUST NOT**）。

---

## 10. 例

### 10.1 グループ内のすべての人間へのメンション

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

### 10.2 グループ内の一人の人間へのメンション

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

### 10.3 グループ内の一つのエージェントへのメンション

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

### 11.1 メンションの偽装

端末は、見えるテキストだけでメンションの対象を決定してはなりません（**MUST NOT**）。

例えば、テキスト`@Alice`だけではAliceを識別できません。端末は、対応する構造化オブジェクト`mentions[*].target`を使う必要があります。

### 11.2 表示名はアイデンティティではない

`target.display_name`は表示用のスナップショットにすぎません。

アイデンティティの判断は、単一対象のメンションではDIDに、グループセレクターのメンションではセレクターの意味に基づかなければなりません（**MUST**）。

### 11.3 サーバー側のメンション認可はない

v1では端末側でメンションを検証するため、サーバーが受け入れて配信したメッセージでも、その後にメンションオブジェクトが端末側の検証に失敗する場合があります。

端末とエージェント実行環境は、無効なメンションオブジェクトから特権的な動作を起動しないようにしなければなりません（**MUST**）。

### 11.4 E2EEのプライバシー

Group E2EEモードでは、メンションオブジェクトは暗号化される平文の内側にあります。

暗号化された通知ヒントやプライバシーを保護する通知ヒントを明示的な将来拡張が導入しない限り、サーバーとグループHostサービスは、メンション対象を検査・索引化できると想定すべきではありません。

このProfileは、v1でそのようなヒントを定義しません。

### 11.5 リプレイと重複の処理

このProfileは、メンション固有のリプレイ防止を定義しません。

リプレイと重複の処理は、`operation_id`、`message_id`、E2EEセッション状態、グループの順序付けの意味を通じて、内包側のANP Message Profileから継承します。

---

## 12. プライバシー上の考慮事項

### 12.1 最小限のメタデータ

メンション対象から、社会的な注意の向け方の傾向が明らかになる場合があります。

実装は、このProfileが要求する保護されたペイロード位置の内側に`mentions`を保持するべきであり（**SHOULD**）、メンション対象を外側のメタデータへ重複記載するべきではありません（**SHOULD NOT**）。

### 12.2 グループセレクターのプライバシー

`@agents`や`@humans`などのグループセレクターから、送信者が想定する相手が分かる場合がありますが、メッセージペイロードに展開済みのメンバーDID一覧を露出させずに済みます。

実装は、送信時に個々のDIDへ展開せず、セレクターを保持するべきです（**SHOULD**）。

---

## 13. 相互運用の最小要件

このProfileに適合する実装は、少なくとも次に対応しなければなりません（MUST）。

1. 構造化JSONグループメッセージのペイロードにおける拡張マーカーとしての、トップレベルの`mentions`。
2. `text`と`mentions`から成るメッセージオブジェクト構造。
3. `human`、`agent`、`group_selector`の各kindのメンション対象。
4. グループセレクター値`all`、`agents`、`humans`。
5. `unicode_code_point`によるメンション範囲。
6. メンションオブジェクトの構造と範囲に対する端末側の検証。
7. メンション内に送信者フィールドを持たないこと。
8. メンション内に証明フィールドを持たないこと。
9. 非E2EEの`application/json`グループメッセージで、`params.body.payload`内にメンションを含むペイロードを配置すること。
10. Group E2EEメッセージで、内側の`Group Application Plaintext.payload`内にメンションを含むペイロードを配置すること。
11. 内包側のANP Message Profileの既存の送信者証明と送信権限の意味を維持すること。
12. v1ではサーバー側のメンション認可やセレクター展開を行わないこと。
13. DIDおよびグループセレクターのメンション対象を扱い、デバイスのバインディングは内包側のP6メッセージに任せること。
14. 過去のメンションのDIDを変更せず、現在のDIDとの関連付けにはP2の移行検証とローカルの業務ポリシーによる受け入れを必要とすること。

---

## 14. 将来の拡張

将来の版では、次が定義される可能性があります。

- 個別メッセージでのメンションの意味。
- E2EEメッセージのメンション通知ヒント。
- メンション固有の通知配信ポリシー。
- 特定のプロトコルに対応するエージェントなどの、機能セレクターによるメンション。
- リスクの高い操作に対する、メンション単位の人間による認可。
- リッチテキストや複数の本文へのメンションの位置付け。
- グループをまたぐ、または外部へのメンション参照。
- 人間／エージェントの分類を表す標準rosterフィールド。

これらの機能は、意図的にv1の範囲外としています。
