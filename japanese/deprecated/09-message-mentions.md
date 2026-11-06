> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [deprecated/09-message-mentions.md](../../deprecated/09-message-mentions.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANPプロファイル9:メッセージの言及延長

- 文書ID: ANP-P9
- タイトル:メッセージの言及延長
- ステータス: リリース
- バージョン: 1.1
- 原文言語: English / このページは日本語参考訳
- 応用性: このプロファイルは、ANP グループ メッセージの人読みと機械読み取り可能な言及を表現するためのアプリケーションペイロード拡張を定義します。 対象に適用される `anp.group.base.v1` とりあえず `anp.group.e2ee.v1` 運送申請書の積み荷がJSONを構成されるとき。
- 依存関係:
  - `anp.core.binding.v1`
  - `anp.group.base.v1` グループ非E2EEメッセージで使用した場合
  - `anp.group.e2ee.v1` グループE2EEメッセージで使用する場合

---

## 1. 目的:

このプロファイルは、ANPグループメッセージの言及の最小相互運用可能な表現を定義します。

言及は、次のような人目に見えない表面フォームを結合する構造化されたアプリケーション層オブジェクトです。

```text
@alice
@product-agent
@all
@agents
@humans
```

DIDやグループセレクターなどの機械で読みやすいターゲットに。

このプロフィールは標準化します:

1. 言及ベアリンググループメッセージのペイロードのJSON形状。
2. 言及オブジェクトの最小フィールド。
3. 第一バージョンの対応対象種: `human`, `agent`と `group_selector`;
4. 第一バージョンのグループセレクターをサポート: `all`, `agents`と `humans`;
5. 必須配置 `mentions` ANPメッセージの完全性メカニズムを囲むことによって覆われているように;
6. メンション・ベアリングのグループ メッセージに対する送信者防止と検証モデル。

このプロファイルは定義しません。

- JSON-RPC の新しいメソッド
- 新たな外形 `meta.profile` 値の `group.send` または `group.e2ee.send`;
- 言及するだけ新しいコンテンツタイプ。
- 新規ペイロード `protocol` 言及のためのマーカーだけ;
- 新しい言及固有の送信者フィールド。
- 新しい言及固有の証拠または署名;
- サーバ側の言及認証モデル;
- サーバー側の拡張 `@all`, `@agents`, または `@humans`;
- ステータス、配送レシート、通知配信、またはユーザーミュートの設定をお読みください。
- 「プロトコルXをサポートするエージェント」などの機能ベースのセレクタ。
- カスタムグループガバナンスは、を超えての役割を構成します `owner`, `admin`と `member`;
- 直接メッセージング言及のセマティクス.

---

## 2. 用語集と定款

### 2.1 仮説キーワード

この記事では、 **MUST**, **MUST NOT**, **REQUIRED**, **SHALL**, **SHALL NOT**, **SHOULD**, **SHOULD NOT**, **RECOMMENDED**, **NOT RECOMMENDED**, **MAY**, **OPTIONAL** 資本金を基準とした規範的な要件として解釈されます。

### 2.2 用語集

- **メンション**: メッセージで言及したターゲットを識別する構造化されたアプリケーションレイヤーオブジェクト。
- **メンションベアリンググループメッセージ**: JSON ペイロードを構成したグループアプリケーションメッセージがトップレベル `mentions` このプロファイルに合わせる配列。
- **表面同期**: 人目に見えないテキストの表現は、例えば `@alice` または `@agents`. . . 表面構文はプロトコルのアイデンティティではありません。
- **メンションターゲット**: 言及の機械で読みやすいターゲット。 人体DID、エージェントDID、グループセレクターのどちらかが選択可能です。
- **グループセレクターメンション**: 対象はグループスコープのセレクターである、など `all`, `agents`, または `humans`.
- **ターミナル側検証**: 受取人、ユーザーエージェント、またはエージェントの実行時間で実行されるローカル検証と処理は、アプリケーションペイロードを受信または復号化します。 端末レベルのプロトコルIDや端末レベルのプロトコルを実装しない。
- **グループホストサービス**: 定義するグループサービス `anp.group.base.v1`. . . このプロフィールでは、言及のセマティクスを検証しません。

---

## 3. デザイン原則

### 3.1 `@` 表面構文ではなく、アイデンティティ

キャラクター `@` ヒューマンインターフェースの構文だけを追記するテキストです。

単一ターゲットの言及のプロトコルIDは、対象DIDです。

```json
{
  "target": {
    "kind": "agent",
    "did": "did:wba:example.com:agent:product-assistant"
  }
}
```

グループセレクターの言及のプロトコルIDは、グループメッセージのエンクロージャーにスコープ付けされたセレクター値です。

```json
{
  "target": {
    "kind": "group_selector",
    "selector": "agents"
  }
}
```

### 3.2 メンションは独立した送信者を運ぶことができません

言及オブジェクト **MUST NOT** 送信者フィールドを、例えば含んでいます `sender`, `sender_did`, `from`, または `actor_did`.

常時、グループメッセージの送信者は、常に ANP グループメッセージを隠すための送信者です。

- `params.meta.sender_did` グループベース用
- `params.meta.sender_did` グループE2EEメッセージ認証コンテキストをグループE2EEにプラス。

### 3.3 メンションは独立した証拠を運んでいません

言及オブジェクト **MUST NOT** 含まれるもの `proof`, `signature`, `auth`, `origin_proof`、または同等の言及ローカル証拠フィールド。

非E2EEグループベース、言及ベアリングのペイロードのため **MUST** 内側に `params.body` カバーされるように `Signed Request Object` 境界線 `auth.origin_proof`.

グループE2EE、言及ベアリングのペイロード **MUST** 暗号化の前に、対応する内部のプレーンテキストオブジェクトの中にあります。

### 3.4 メンション認証はv1サーバ側の問題ではありません

このプロファイルは、v1 の言及固有の許可ポリシーを定義しません。

送信者が該当するベースプロファイルの下にグループメッセージを閉じることを可能にする場合、送信者は、サポートされている言及ターゲットを含むために、言及層で許可されます。

- 単一の人間の DID;
- 単一の代理店のDID;
- `@all`;
- `@agents`;
- `@humans`.

サーバー、中継サービス、イングレッシブサービス、グループホストサービス **MUST NOT** 言及ターゲット、言及セレクター、または言及ロールのためにのみメッセージを拒否します。 送信者認証、出典、ターゲット結合、コンテンツ形状ルール、グループ送信権限など、エンクロージャープロファイルで必要な既存のチェックのみを継続します。

この規則は、ペイロードサイズの制限、文書化された最大の言及オブジェクトカウント、レートの制限、アンチアブラス制御、スパムコントロール、誤字ペイロード拒否、またはサービス保護などの通常の運用執行を防止しません。 このような執行は、言及固有の許可ではなく、運用ポリシーです。

### 3.5 グループセレクターは、ガバナンスの役割をグループ化していません

セレクタの値 `all`, `agents`と `humans` **MUST NOT** P4グループガバナンスの役割として解釈される。

P4グループガバナンスの役割は、次のものを維持します。

```text
owner
admin
member
```

このプロファイルのグループセレクターは、認可の役割ではなく、言及対象です。

---

## 4. プロフィールの結合モデル

### 4.1 延長マーカー

このプロファイルは、専用のペイロードプロトコル名を必要としません。

構造化されたJSONペイロードは、サポートされているグループメッセージのペイロードの場所の一つで実行され、トップレベルの `mentions` このプロファイルに合わせる配列。

受信機 **MUST NOT** 要求するか、またはトップレベルに頼って下さい `protocol` 言及を認識するフィールド。

構造化されたJSONペイロードがトップレベルを含まない場合 `mentions` array は、このプロファイルがそのペイロードには適用されません。

### 4.2 外との関係 `meta.profile`

プロフィール **MUST NOT** 外側を交換する `params.meta.profile` グループメッセージの操作をエンクロージャーする。

グループメッセージの操作を囲むと、元のプロファイル名がそのままにします。

- `anp.group.base.v1` のり `group.send` グループE2EEなし。
- `anp.group.e2ee.v1` のり `group.e2ee.send`.

### 4.3 コンテンツタイプ

メンションベアリング構造のペイロード **MUST** 通常のJSONペイロードキャリッジを使用します。

非E2EEグループベースの場合:

```json
"meta": {
  "content_type": "application/json"
}
```

グループ E2EE の内部のプレーンテキストのため:

```json
{
  "application_content_type": "application/json"
}
```

導入事例 **MUST NOT** 別の構造化されたJSONアプリケーションペイロードから言及ベアリングメッセージを区別するために、新しいコンテンツタイプを独自に定義します。

---

## 5. メンション・ベアリングメッセージのオブジェクト

### 5.1 推奨構造

言及ベアリングメッセージペイロードには、以下の最小構造があります。

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

### 5.2トップレベルのフィールド

| フィールド | 条件 | 仕様 | サーマネティックス |
|---|---:|---|---|
| `text` | **MUST** | 文字列 | 言及面の構文を含む、人読み可能なメッセージテキスト。 |
| `mentions` | **MUST** | 配列 | このメッセージのオブジェクトを構造化しました。 |
| `annotations` | **MAY** | オブジェクト | アプリケーションの拡張メタデータ。 ルーティング、セキュリティ、または許可には使用されません。 |

メッセージを構造化されていない場合、送信者 **SHOULD NOT** 上位レベルを含める `mentions` フィールドは、代わりに、エンクロージャプロファイルの通常のコンテンツモデルを使用する必要があります。

認識されていないトップレベルフィールド **MAY** 言及プロセッサによって無視される。

### 5.3 `mentions` 配列

`mentions` **MUST** 配列になります。

各要素 **MUST** セクション5.4で定義されているように、言及オブジェクトになります。

`mentions[*].id` 値の数値 **MUST** 同じメッセージのペイロード内で一意にしてください。

注文 `mentions` **SHOULD** 表面に言及する順序に従う `text`.

---

### 5.4 メンションオブジェクト

最低の言及オブジェクトは:

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

分野条件:

| フィールド | 条件 | 仕様 | サーマネティックス |
|---|---:|---|---|
| `id` | **MUST** | 文字列 | メッセージローカルの言及識別子。 グローバルなセマンティックスは存在しません。 |
| `range` | **MUST** | オブジェクト | 言及の表面の範囲 `text`. |
| `target` | **MUST** | オブジェクト | 機械読みやすい言及ターゲット。 |
| `mention_role` | **MAY** | 文字列 | メンションの役割。 省略された場合、受信機 **MUST** それを解釈するように `addressee`. |

言及オブジェクト **MUST NOT** 含まれるもの:

- `sender`;
- `sender_did`;
- `from`;
- `actor_did`;
- `auth`;
- `origin_proof`;
- `proof`;
- `signature`.

---

### 5.5 メンション範囲

範囲オブジェクトは:

```json
{
  "start": 0,
  "end": 7,
  "unit": "unicode_code_point"
}
```

分野条件:

| フィールド | 条件 | 仕様 | サーマネティックス |
|---|---:|---|---|
| `start` | **MUST** | 非負の整数 | 包括的なスタートオフセット `text`. |
| `end` | **MUST** | 非負の整数 | 排他的な端のオフセット `text`. |
| `unit` | **MUST** | 文字列 | v1 では、 **MUST** は、 `unicode_code_point`. |

ルール:

1. `start` **MUST** より少し `end`.
2. `end` **MUST NOT** Unicode のコードポイント数を上回る `text`.
3. 範囲は、JSON 文字列の正確な値に対して計算されます。 `text` JSON が解析した後、UI の正規化、翻訳、または Markdown レンダリングの前に。
4. 特定されたサブストリング `range` 言及表面です。 表面文字列は、v1の言及オブジェクトで意図的に複製されていない。
5. 端末が範囲を検証できない場合は、 **MUST** 言及オブジェクトに言及するという無視します。 言及トリガーの目的, しかし、それは **MAY** 元の表示をまだ `text`.

---

### 5.6 メンションターゲット

#### 5.6.1 単一の人ターゲット

```json
{
  "kind": "human",
  "did": "did:wba:example.com:user:alice",
  "display_name": "Alice"
}
```

ルール:

- `kind` **MUST** なる `human`.
- `did` **MUST** 存在し、 **MUST** は、DID です。
- `display_name` **MAY** 送信者側表示スナップショットとして存在します。
- `display_name` **MUST NOT** アイデンティティまたは認可証拠として使用される。

#### 5.6.2 単一代理店ターゲット

```json
{
  "kind": "agent",
  "did": "did:wba:example.com:agent:product-assistant",
  "display_name": "Product Assistant"
}
```

ルール:

- `kind` **MUST** なる `agent`.
- `did` **MUST** 存在し、 **MUST** は、DID です。
- `display_name` **MAY** 送信者側表示スナップショットとして存在します。
- エージェント機能の発見、エージェントの説明の解像度、プロファイルの検索は、このプロファイルの外にあります。

#### 5.6.3 グループセレクターターゲット

```json
{
  "kind": "group_selector",
  "selector": "agents"
}
```

ルール:

- `kind` **MUST** なる `group_selector`.
- `selector` **MUST** 以下のいずれかです。
  - `all`
  - `agents`
  - `humans`
- `did` **MUST NOT** いつか出現 `kind = "group_selector"`.
- セレクタスコープは、グループメッセージのコンテキストを囲むことで識別されるグループです。
- セレクター **MUST NOT** P4グループガバナンスの役割として解釈される。

---

### 5.7 メンションの役割

とりあえず `mention_role` フィールドはオプションです。

v1 で値を許可:

| バリュー | サーマネティックス |
|---|---|
| `addressee` | 記載されたターゲットは、注目の受取人です。 これはデフォルトです。 |
| `cc` | 記載されたターゲットはコピーまたは参照されますが、必ずしも行動するつもりはありません。 |

ルール:

- 場合 `mention_role` 省略、受信機 **MUST** それを解釈するように `addressee`.
- 場合 `mention_role` プレゼント、 **MUST** このセクションの許可された値の1つになります。
- `mention_role` **MUST NOT** グループガバナンスの役割として使用されます。
- `mention_role` **MUST NOT** グループ送信権限をオーバーライドしたり、プロファイル承認規則を隠すために使用してください。

---

## 6. グループセレクターのセマティクス

### 6.1 `@all`

`@all` は次のように表されます。

```json
{
  "target": {
    "kind": "group_selector",
    "selector": "all"
  }
}
```

ターミナル側通訳:

```text
all active group members in the enclosing group context
```

### 6.2 `@agents`

`@agents` は次のように表されます。

```json
{
  "target": {
    "kind": "group_selector",
    "selector": "agents"
  }
}
```

ターミナル側通訳:

```text
active group members that the local application roster or profile layer classifies as agents
```

### 6.3 `@humans`

`@humans` は次のように表されます。

```json
{
  "target": {
    "kind": "group_selector",
    "selector": "humans"
  }
}
```

ターミナル側通訳:

```text
active group members that the local application roster or profile layer classifies as humans
```

### 6.4 セレクターの解像度スナップショット

グループメッセージ、端末 **SHOULD** スナップショットが利用できるときに、グループの状態のスナップショットに関連付けられたグループセレクターを解決します。

グループベースとグループE2EEでは、これは通常、 `group_state_version` 受信したメッセージのコンテキストで返送または配信されます。

端末がそのグループの状態のスナップショットを持たない場合、 **MAY** 選択者を最適なローカルグループの状態に解決し、結果がベスト・フィーフトとしてマークします。

### 6.5 メンバーの種類のソース

会員の分類は、 `human` または `agent` アプリケーションレイヤーのロスターまたはプロファイル属性です。

このプロファイルは新しいP4を定義しません `group_member` この分類のフィールド。

導入事例 **MUST NOT** インフォメーション `human` または `agent` P4 ガバナンスの役割からのみ `owner`, `admin`, または `member`.

---

## 7. プレースメントルール

### 7.1 E2EEのないグループベース

のために `group.send` とりあえず `anp.group.base.v1`:

- `params.meta.content_type` **MUST** なる `application/json`;
- `params.body.payload` **MUST** 言及ベアリングメッセージオブジェクトを運ぶ。
- `params.auth.origin_proof` グループベースで必要な送信者証拠です。
- グループホストは、既存のグループベースチェックを適用します。
- グループホスト **MUST NOT** 言及固有の許可またはセレクタの拡張を実行します。

事例:

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

### 7.2 グループ E2EE

のために `group.e2ee.send` とりあえず `anp.group.e2ee.v1`:

- 外側の `params.meta.content_type` 残留期間 `application/anp-group-cipher+json`;
- 外側の `params.body` ミッション `group_cipher_object`;
- 言及ベアリングオブジェクト **MUST** 内側に置かれる `Group Application Plaintext.payload` MLS の前に `PrivateMessage` 暗号化;
- 内側の `application_content_type` **MUST** は、 `application/json`.

暗号化前の内部のプレーンテキストの例:

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

グループホストは、外部の暗号文オブジェクトを表示します。 認証と注文 `group.e2ee.send` グループE2EEおよびグループベースルールに従って、暗号化されたチェックや検証は行いません。 `mentions` 配列。

### 7.3 通知の受信

ANPサービスが言及するグループメッセージをプッシュするときは、 `group.incoming` または対応するグループE2EE配達パス:

- 押しられたペイロード **MUST** 受け入れられた元のメッセージと著しく同等に残して下さい;
- 囲いのプロフィールが元のことを可能にする場合 `auth.origin_proof` 通知にコピーされるため、サービス **SHOULD** ターミナル側の検証が元の送信者に言及軸受けペイロードを結合できるように、損失のないコピーを含んで下さい;
- 中間サービス **MUST NOT** 再書き込み `mentions` メッセージを転送したり、プッシュするとき。

---

## 8. 証拠と暗号結合をベンダー

### 8.1 非E2EEグループベース

非E2EEグループベースでは、言及のメッセージの送信者がエンクロージャによって証明されます `auth.origin_proof`.

確認の対象は、メッセージ送信者を囲むことです。

```text
params.meta.sender_did
```

とりあえず `mentions` 配列は内部にあるため保護されます `body` 会員の皆さま `Signed Request Object`.

### 8.2 グループ E2EE

グループE2EEのため、 `group.e2ee.send` 原点の証拠およびグループE2EEは、メッセージのセマンティックスを囲むプロフィールの認証しました。

とりあえず `mentions` 配列はMLS保護された内部にあります `Group Application Plaintext`. . . グループホストに表示されず、端末やエージェントのランタイムで復号化した後にのみ検証されます。

### 8.3 言及ローカル証拠無し

検証者 **MUST NOT** v1 で言及ローカル署名または証拠が必要です。

受信機 **MUST** どんな治療も `proof`, `signature`, `origin_proof`, または `auth` フィールドは、このプロファイルの無効として言及オブジェクトの中に埋め込まれています。

---

## 9. 検証と処理

### 9.1 サーバー側処理

サーバー、中継サービス、イングレッシブサービス、グループホストサービス:

1. **MUST** エンクロージャープロファイルに応じてANPグループメッセージを囲むように処理する。
2. **MUST** 既存の送信者認証、暗証番号、ターゲットバインディング、セキュリティプロファイル、およびエンクロージャープロファイルによって必要なペイロードキャリッジチェックを実行します。
3. グループメッセージの場合、 **MUST** グループベース/グループE2EEのグループ送信権限を強制します。
4. **MUST NOT** 言及固有の許可を実行します。
5. **MUST NOT** 拡張機能 `@all`, `@agents`, または `@humans` 会員IDにメッセージの受諾の一部としてリストを記述します。
6. **MUST NOT** 言及ターゲット DID がサーバーに不明な場合やセレクターが広いため、メッセージのみを拒否します。
7. **MUST** 不法な変更なしで、言及ベアリングのペイロードを保存します。

このルールは、サーバーが通常の囲いプロファイルまたは動作上の理由のためにメッセージを拒絶するのを防ぐものではありません。例えば、無効なJSON-RPC形状、サポートされていないコンテンツタイプ、無効な起源の証拠、失敗したグループ送信権限、無効な暗号文オブジェクト、不当な競合、ペイロードサイズの制限、文書化された最大の言及オブジェクトカウント、レート制限、アンチアブソースポリシー、スパムコントロール、または拒否サービス保護。

### 9.2ターミナルサイド検証

このページのコンテンツは、このプロフィールをサポートする端末、クライアント、ユーザーエージェント、またはエージェントランタイムです。 **MUST** 申請書のペイロードを受け取ったか復号化した後に言及検証を実行します。

ターミナル側の最小検証手順は次のとおりです。

1. 言及の動作をトリガーする前に、プロファイルの認証された送信者コンテキストを囲むか、または依存します。
2. JSON ペイロードを解析します。
3. ペイロードがトップレベルであることをチェック `mentions` このプロファイルを適用する前に配列。
4. チェックする `text` 文字列です。
5. チェックする `mentions` 配列です。
6. 各言及オブジェクトにユニークなものがあることを確認してください `id`.
7. チェック `range` 有効です `text`.
8. チェック `target.kind` の 1 つ `human`, `agent`, または `group_selector`.
9. 場合 `target.kind = "human"` または `target.kind = "agent"`, チェックする `target.did` 存在します。
10. 場合 `target.kind = "group_selector"`, チェックする `target.selector` の 1 つ `all`, `agents`, または `humans`.
11. 場合 `mention_role` 存在している、それが1つであることを確認してください `addressee` または `cc`.
12. ローカルのレンダリング、通知、またはエージェントのランタイム動作をローカルポリシーに従って適用します。

言及オブジェクトがターミナル側検証に失敗した場合、端末 **SHOULD** トリガー、通知、またはエージェントの有効化の目的でオブジェクトを無視しますが、 **MAY** 元のメッセージテキストをまだ表示します。

### 9.3 メンション許可解釈

v1では、言及固有の許可ポリシーはありません。

ターミナル **MUST** ワイヤープロトコルレイヤーで許可されているように、以下の場合に言及を扱います。

1. グループのメッセージの送信は、該当するANP Message Profileで受け付けまたは配信されました。
2. 言及オブジェクトは、このプロファイルの下で有効です。

ターミナル **MAY** ミュート、通知の回転、またはスパムコントロールなどのローカルユーザーの好みを適用します。 このようなローカル環境設定はプロトコルレベルの言及権限ではなく、 **MUST NOT** ANPメッセージ自体の拒絶として表されます。

---

## 10. 事例紹介

### 10.1 グループですべての人間を言及する

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

### 10.2 グループで一人の人間を鍛え

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

### 10.3 グループで単一のエージェントをメンションする

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

## 11. セキュリティの考慮事項

### 11.1 メンションスプーフィング

ターミナル **MUST NOT** 参照対象を判断するために、可視テキストだけを使用してください。

例えば、テキスト `@Alice` アリスを識別するのに十分ではありません。 端末は、対応する構造物を使用する必要があります。 `mentions[*].target` オブジェクト。

### 11.2 表示名は同一ではありません

`target.display_name` 画面のスナップショットだけです。

アイデンティティ決定 **MUST** シングルターゲットの言及やグループセレクターの言及のためのセレクターセマティクスに基づいている.

### 11.3 サーバー側の言及の許可無し

言及検証は v1 のターミナル側であるため、サーバーは、オブジェクトが後でターミナル側のバリデーションに失敗するメッセージを受信し、配信することができます。

ターミナルとエージェントのランタイム **MUST** 無効な言及オブジェクトから特権的な行動をトリガーすることを避けます。

### 11.4 E2EE プライバシー

グループ E2EE モードでは、言及オブジェクトは暗号化されたプレーンテキスト内にあります。

サーバーおよびグループホストサービスは、明示的な将来の拡張が暗号化されたりプライバシー保護された通知ヒントを導入しない限り、言及ターゲットを検査またはインデックス化することを期待しないでください。

このプロファイルは、v1 でそのようなヒントを定義しません。

### 11.5 再再生と重複処理

このプロファイルは、言及固有の再生保護を定義しません。

再生と重複処理は、ANPメッセージプロファイルを囲むことから継承されます `operation_id`, `message_id`, E2EEセッション状態, またはグループオーダーのセマティクス.

---

## 12. プライバシーに関する考慮事項

### 12.1 最小メタデータ

メンションターゲットは、社会的注意パターンを明らかにすることができます。

導入事例 **SHOULD** とりあえず `mentions` このプロフィールによって要求される保護されたペイロードの位置の中および **SHOULD NOT** 外部メタデータに言及ターゲットを複製します。

### 12.2 グループセレクターのプライバシー

団体セレクターなど `@agents` または `@humans` 送信者の意図したオーディエンスを明らかにするかもしれませんが、メッセージペイロードで拡張されたメンバーのDIDリストを公開することを避けます。

導入事例 **SHOULD** 選択者を、送信時に個々のIDに拡張するのではなく保存します。

---

## 13. 最小相互運用性要件

このページの先頭へ MUST 少なくともサポート:

1. 最上位レベル `mentions` 構造化されたJSONグループメッセージのペイロードの延長マーカーとして;
2. `text` プラス `mentions` メッセージオブジェクト構造;
3. 種類の言及ターゲット `human`, `agent`と `group_selector`;
4. グループセレクターの値 `all`, `agents`と `humans`;
5. `unicode_code_point` 言及範囲;
6. 言及オブジェクト形状と範囲のターミナルサイド検証。
7. ローカル送信者フィールドなし。
8. ローカルの証拠フィールドなし。
9. 内側の言及ベアリングペイロードの配置 `params.body.payload` ノンE2EEの場合 `application/json` グループメッセージ;
10. 内面の常識に耐えるペイロードの配置 `Group Application Plaintext.payload` グループ E2EE メッセージの場合
11. ANPメッセージプロファイルを囲むから、既存の送信者防止および送達権限のセマティクスの保存。
12. v1 のサーバー側の言及許可またはセレクタ拡張は行いません。

---

## 14. 将来の拡張

将来のバージョンは、次の定義を定義することができます。

- 直接メッセージング言及の皮下;
- E2EEメッセージのメンション通知のヒント。
- メンション固有の通知配送ポリシー;
- 特定のプロトコルをサポートするエージェントなど、機能選択器言及。
- 高リスク行動のための人格レベルの人権の承認;
- 豊富なテキストまたは複数のボディ言及の固定;
- クロスグループまたは外部の言及参照;
- 人体/エージェントの分類のための標準的なロスター分野。

これらの機能は、意図的にv1の外で行われます。
