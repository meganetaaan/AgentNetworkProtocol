> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [chinese/message/09-消息Mention扩展.md](../../../chinese/message/09-消息Mention扩展.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANPプロフィール9:メッセージ

- 文書ID: ANP-P9
- タイトル:メッセージの言及延長
- ステータス: リリース
- バージョン: 1.2
- 仕様セット: ANP のメッセージング 1.2
- 原文言語: Chinese / このページは日本語参考訳
- 結合版: v1 延長;独立した定義無し `meta.profile`
- 応用性: このプロフィールは人間および機械で読まれる設定の使用のために拡大されるAMPのグループ メッセージの入力負荷を定義します。このメッセージング1.2は集中を調節します、それあります `anp.group.base.v2`、`anp.group.e2ee.v2` , 構造化されたJSONアプリケーションのロードのシーンを運ぶ.
- 依存関係:
  - `anp.core.binding.v1`
  - 特定のE2EEグループ以外のメッセージを使用する `anp.group.base.v2`
  - グループ E2EE メッセージを使用して、依存するメッセージを使用します。 `anp.group.e2ee.v2`

---

## 1. 目的:

このProfile は、AMP グループ メッセージの入力に対して最小限の相互運用性式を定義します。

人目に見えるインターフェイスを表現するために使用する構造化されたアプリケーションオブジェクトです。

```text
@alice
@product-agent
@all
@agents
@humans
```

DIDやグループ選択などの機械で読みやすいターゲットにタイを配します。

このプロファイル標準:

1. グループのメッセージにJSON構造の負荷を入力で適用する。
2. メンションオブジェクトの最小フィールド。
3. 初回サポート対象タイプ:`human`、`agent` とりあえず `group_selector`；
4. グループセレクターがリリース1でサポート`all`、`agents` とりあえず `humans`；
5. `mentions` (a) 外部AMP メッセージの整合性メカニズムによって覆われていることを確認する場所の場所の位置;
6. 送信者証明書と検証モデルを入力グループメッセージで送信します。

このプロファイルは定義しません。

- 新しいJPON-RPCの方法論;
- のために `group.send` または `group.e2ee.send` 新しいアウターレイヤー `meta.profile`；
- 新規のコンタクトタイプ。メッセージ間の区別のみ。
- メッセージのみを識別するための新しいペイロード `protocol` (a) 印;
- (i) 専用入力送信者フィールド;
- ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
- サービスレベルのメンション許可モデル;
- サービスプラス `@all`、`@agents` または `@humans`；
- (a) 状態、サービスレシート、通知配達またはユーザーフリーの設定を読んで下さい;
- 「合意を支える試薬」などの機能選択器。
- オーバーオール `owner`、`admin`、`member` (b) 自己定義されたグループガバナンスの役割;
- メッセージのテキストはメッセージの構文にあります。

---

このプロファイルは適用されます `did:wba`、`did:web` ほかの DID メソッドをサポート。識別解像度と認証の遵守 [プチスイム](../../../chinese/message/02-身份与发现.md#method-validation)。

## 2. 用語と規範的な関与

### 2.1 仮説キーワード

このテキスト **MUST**、**MUST NOT**、**REQUIRED**、**SHALL**、**SHALL NOT**、**SHOULD**、**SHOULD NOT**、**RECOMMENDED**、**NOT RECOMMENDED**、**MAY**、**OPTIONAL** 資本金を基準とする規範的な要件として解釈される。

### 2.2 用語集

- **メンション**: 構造アプリケーションレイヤーは、メッセージで言及したターゲットを識別するために使われます。
- **メンションベアリンググループメッセージ**: 構造化されたJSONペイロードは、このRefileにマッチするトップレイヤーが含まれています `mentions` _その他組織
- **表面同期**: 人間の目に見えるテキストの形態、例えば。 `@alice` または `@agents`サーフェスの構文はプロトコルのアイデンティティではありません。
- **メンションターゲット**:機械で読みやすいターゲットを計測。DID、Angent DID、グループ選択が可能です。
- **グループセレクターメンション**: グループレンジャーが選択したイベントの数など `all`、`agents` または `humans`。
- **ターミナル側検証**: 受取人、ユーザーエージェント、またはエージェントのランタイムによるローカル検証と処理は、申請ペイロードの受領または復号化時に行われます。この用語には、機器レベルや端末プロトコルIDが含まれていません。
- **グループホストサービス**：`anp.group.base.v2` . このプロファイルでは、定義の構文は確認できません。

---

## 3. デザイン原則

### 3.1 `@` インターフェイスの構文ではなく、アイデンティティです。

キャラクター `@` その後のテキストは、ヒューマンインターフェイスの構文のみです。

単一のターゲット言及のプロトコルIDは、対象DIDです。

```json
{
  "target": {
    "kind": "agent",
    "did": "did:wba:example.com:agent:product-assistant"
  }
}
```

グループセレクタープロセスのプロトコル ID は、外部グループメッセージのコンテキストで動作する自己識別値です。

```json
{
  "target": {
    "kind": "group_selector",
    "selector": "agents"
  }
}
```

### 3.2 メンツは独立したスダーを運ぶことができません

組織図 **MUST NOT** 組織図 `sender`、`sender_did`、`from` または `actor_did` . . .

外部AMPグループメッセージの送信者は常に外部AMPグループの送信者です。

- グループベース `params.meta.sender_did`；
- グループE2EE `params.meta.sender_did` ブログには、グローバルE2EEメッセージの動画も掲載しています。

### 独立したプログラムのない3.3メートル

組織図 **MUST NOT** 組織図 `proof`、`signature`、`auth`、`origin_proof` または同等の値のローカル証拠フィールド。

非E2EEグループベースでは、入力で読み込みます **MUST** でん `params.body` 内側に、そうである `auth.origin_proof` とりあえず。 `Signed Request Object` オーバーライト。

グループE2EEのため、言及と読みます **MUST** 暗号化前の内部フィールドオブジェクトがあります。

### 3.4 v1 サービスエンドの約束の承認を定義しない

このプロファイルv1は、権限の排他的な許可ポリシーを定義しません。

送信者が該当する baseProfile に従って外部グループメッセージを送信する権利がある場合、デフォルトでは、送信者は、言及レベルで任意のサポートされた言及ターゲットを含めることができます。

- 個々の人間の DID;
- 個々の無縁DID;
- `@all`；
- `@agents`；
- `@humans`。

サーバー、リレーサービス、イングレッシブサービスおよびグループホストサービス **MUST NOT** 送信者認証、ターゲットの均質性、対象結合、コンテント形状、グループ送信権限などのプロファイルの外側層で必要な検証を継続します。

規則は、ペイロードのサイズ制限、イミオンオブジェクトの数の明確に記録された天井、速度制限、アンチアブラス戦略、アンチスキャブ戦略、変形性負荷拒否または保護を提供するための拒否などの通常のトラフィック制御を制限しません。そのようなコントロールはDTPの一部であり、Immmentの排他的な義務ではありません。

### 3.5 グループセレクターはグループガバナンスの役割ではありません

セルフバリュー `all`、`agents` とりあえず `humans` **MUST NOT** ガバナンスの役割のP4グループとして解釈されます。

P4 クラスタのガバナンスの役割は、次のものを維持します。

```text
owner
admin
member
```

認定された役割ではなく、グループオブザーバーです。

### 3.6 測定対象はデバイスではなく

単一行先は、P4 のメンバーとして、人間またはエージェント DID、グループ選択管理を識別します。各形式はデバイスや MLS リーフを識別します。同じ DID の複数のデバイスまたはリーフがメンション対象となります。

P6 Monopoly は、グループ E2EE メッセージのデバイスを送受信するホストです。 **MUST NOT** 機器の自己体のこれらの外側層をコピー、余計なまたは圧倒します。

### 3.7 歴史の言及とDIDの移行

履歴ターゲットは、メッセージが受け入れられる間に正確なIDを保持します。 DIDの変更後、グループホスト、リレーまたはクライアント **MUST NOT** 署名された履歴または暗号化された履歴を書き込み

製品を受け取ります **MAY** 過去のDIDから現在のDIDに移行を検証し、ローカルビジネス戦略のリターンを受けた後、現在のアイデンティティと歴史表示や通知を関連付けるP2を押します。この関連付けは、ペイロードを変更することなく、ローカルにのみ存在します。新規作成管理 **MUST** ターゲットの現在のフルIDを使用します。

---

## 4. プロフィール タイ モデル

### 4.1 延長マーク

専用のペイロードプログラム名は必須ではありません。

JSON ペイロードを構成するときは、このプロファイルでサポートされているグループメッセージの読み込み位置にあり、このプロファイルに一致するトップレベルが含まれています `mentions` ペイロードは、入力したピロードです。

スタッフ **MUST NOT** リクエストまたはトップフロアに頼る `protocol` ステートメントを認識するフィールド。

構造化されている場合は、JSON は最上階を支払います `mentions` array は、この Profile がそのペイロードに反映されません。

### 4.2 外層と `meta.profile` 関係性

ベンジャー **MUST NOT** 外部グループメッセージの操作を構成 `params.meta.profile`。

外部グループメッセージ操作をそのままにしておくと、例えば:

- 非グループ E2EE `group.send` 利用条件 `anp.group.base.v2`；
- `group.e2ee.send` 利用条件 `anp.group.e2ee.v2`。

### 4.3 コンテンツタイプ

構造化負荷とmemention **MUST** 通常のJSON負荷荷重を使用してください。

非E2EEグループベースの場合:

```text
"meta": {
  "content_type": "application/json"
}
```

グループE2Eの内包:

```json
{
  "application_content_type": "application/json"
}
```

受賞作品 **MUST NOT** メッセージを入力したメッセージから区別する唯一の理由で、新しいコンテンツタイプを定義します。

---

## 5. メンションでメッセージオブジェクト

### 5.1 推奨構造

メンションによるメッセージの読み込みには、以下の最小構造があります。

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

### 5.2トップレベルフィールド

| フィールド | リクエスト | 仕様 | サーマニティック |
|---|---:|---|---|
| `text` | **MUST** | 文字列 | 文書の履歴テキストを含む人間の読みやすいテキスト。 |
| `mentions` | **MUST** | 配列 | このメッセージの構成されたセッションオブジェクト。 |
| `annotations` | **MAY** | オブジェクト | 拡張メタデータを適用する。ルート、セキュリティ、または許可には使用されません。 |

メッセージが構造化されていない場合、 送信者 **SHOULD NOT** 上部の層を含んで下さい `mentions` フィールドと、外部レイヤープロファイルの一般的なコンテンツモデルを使用する必要があります。

メンションプロセッサ **MAY** 認識されていないトップレベルフィールドを無視します。

### 5.3 `mentions` レイ

`mentions` **MUST** 配列です。

各要素 **MUST** セクション5.4で参照するためのオブジェクトの定義です。

同じメッセージには、最新の記事のリストが含まれている。`mentions[*].id` バリュー **MUST** 唯一の。

`mentions` 注文について **SHOULD** 膜表面を使って `text` 見た目の同じ順序です。

---

### 5.4 メンションオブジェクト

最小催事:

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

フィールドは、次のものが必要です。

| フィールド | リクエスト | 仕様 | サーマニティック |
|---|---:|---|---|
| `id` | **MUST** | 文字列 | メッセージ ローカルのメッセージ識別子、グローバルに意味がありません。 |
| `range` | **MUST** | オブジェクト | ここまで見ます。 `text` 範囲。 |
| `target` | **MUST** | オブジェクト | 機械読みやすいメンションターゲット。 |
| `mention_role` | **MAY** | 文字列 | _その他組織 **MUST** プレス `addressee` 説明。 |

組織図 **MUST NOT** 含まれる:

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
- `device_id` または MLS のリーフ識別子。

---

### 5.5 メンション範囲

範囲の目的:

```json
{
  "start": 0,
  "end": 7,
  "unit": "unicode_code_point"
}
```

フィールドは、次のものが必要です。

| フィールド | リクエスト | 仕様 | サーマニティック |
|---|---:|---|---|
| `start` | **MUST** | 非負の整数 | `text` . . . |
| `end` | **MUST** | 非負の整数 | `text` . . . |
| `unit` | **MUST** | 文字列 | v1 中 **MUST** あり あり `unicode_code_point`。 |

ルール:

1. `start` **MUST** より少しより `end`。
2. `end` **MUST NOT** 以上 `text` , Unicode のポイント数.
3. JSON パーセドに基づく範囲 `text` 文字列の正確な値は、UIが統一されたり、翻訳されたり、Markdownレンダリングされる前に計算されます。
4. `range` サブストリングは、言及履歴です。 v1 は意図的に入力オブジェクト内の文字列を繰り返しません。
5. 端末が範囲を検証できない場合、ターミナル **MUST** このメメンションオブジェクトをトリガーレベルで無視しますが、 **MAY** オリジナルディスプレイで続行 `text`。

---

### 5.6 メンションターゲット

#### 5.6.1 個人的人的ターゲット

```json
{
  "kind": "human",
  "did": "did:wba:example.com:user:alice",
  "display_name": "Alice"
}
```

ルール:

- `kind` **MUST** あり あり `human`。
- `did` **MUST** 存在と存在 **MUST** だ。
- `display_name` **MAY** 送信者として存在する名前のスナップショット。
- `display_name` **MUST NOT** 本人または承諾の証拠として使用される。

#### 5.6.2 個人

```json
{
  "kind": "agent",
  "did": "did:wba:example.com:agent:product-assistant",
  "display_name": "Product Assistant"
}
```

ルール:

- `kind` **MUST** あり あり `agent`。
- `did` **MUST** 存在と存在 **MUST** だ。
- `display_name` **MAY** 送信者として存在する名前のスナップショット。
- エージェントの機能のディスカバリー、エージェント防衛解析とプロファイルクエリはこのプロフィールの一部ではありません。

#### 5.6.3 グループセレクターターゲット

```json
{
  "kind": "group_selector",
  "selector": "agents"
}
```

ルール:

- `kind` **MUST** あり あり `group_selector`。
- `selector` **MUST** 以下は、次の値の1つです。
  - `all`
  - `agents`
  - `humans`
- いつ? `kind = "group_selector"` できるかどうかはわかりません。`did` **MUST NOT** 是非お越し下さい。
- セクターの役割は、外面メッセージのコンテキストで識別されるグループです。
- セレクター **MUST NOT** ガバナンスの役割のP4グループとして解釈されます。

---

### 5.7 メンションの役割

`mention_role` フィールドはオプションのフィールドです。

v1 の許可された値:

| バリュー | サーマニティック |
|---|---|
| `addressee` | セッションの対象は、注意の受取人です。デフォルト値です。 |
| `cc` | イオンの目的は、単にコピーまたは引用され、必ずしも行動を必要としない必要があります。 |

ルール:

- 省略した場合は `mention_role`受取人。 **MUST** プレス `addressee` 説明。
- 存在する場合 `mention_role`値引き **MUST** このセクションの許容値の1つです。
- `mention_role` **MUST NOT** グループガバナンスの役割として使用されます。
- `mention_role` **MUST NOT** グループをオーバーライドするには、許可または任意の外部層プロファイル承認規則を送信してください。

---

## 6. グループセレクター

### 6.1 `@all`

`@all` 次の単語で:

```json
{
  "target": {
    "kind": "group_selector",
    "selector": "all"
  }
}
```

末端の側面の解釈:

```text
外层群上下文中的所有 active 群成员
```

### 6.2 `@agents`

`@agents` 次の単語で:

```json
{
  "target": {
    "kind": "group_selector",
    "selector": "agents"
  }
}
```

末端の側面の解釈:

```text
本地应用 roster 或 profile 层分类为 agent 的 active 群成员
```

### 6.3 `@humans`

`@humans` 次の単語で:

```json
{
  "target": {
    "kind": "group_selector",
    "selector": "humans"
  }
}
```

末端の側面の解釈:

```text
本地应用 roster 或 profile 层分类为 human 的 active 群成员
```

### 6.4 セレクター パーシング スナイパー

グループメッセージ、ターミナル **SHOULD** 利用可能な場合、グループ状態のスナップショット解析グループセルフーター。

グループベースとグループE2EEでは、通常は受諾されたメッセージコンテキストで返送または配信されます。 `group_state_version`。

端末がエンドの正確なマッチを持たない場合、 **MAY** ローカルで利用可能な最高のグループの状態に基づいてセルフポートをパースし、その結果をベストの努力としてタグ付けします。

### 6.5 のMeberの親切な源

会員として分類される `human` または `agent` アプリケーションレイヤーのロスターまたはプロファイルプロパティです。

Ben Profile は、この新しい P4 を定義しません。 `group_member` フィールド。

受賞作品 **MUST NOT** のみに基づく `owner`、`admin` または `member` P4 ガバナンスの役割の延期 `human` または `agent`。

---

## 7. ルールを置きます

### 7.1 非E2EEグループベース

あり。 `anp.group.base.v2` ダウンダウン `group.send`：

- `params.meta.content_type` **MUST** あり あり `application/json`；
- `params.body.payload` **MUST** (a) 入力でオブジェクトを読み込みます。
- `params.auth.origin_proof` グループベースで要求される送信者の証明書です。
- `params.meta.sender_device_id` とりあえず `params.meta.recipient_device_id` **MUST NOT** (a) プレゼントする。
- グループホストは、既存のグループベース検証を実行します。
- グループホスト **MUST NOT** 自己資本の独占許可または起動を実行します。

事例:

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

### 7.2 グループ E2EE

あり。 `anp.group.e2ee.v2` ダウンダウン `group.e2ee.send`：

- アウター `params.meta.content_type` そのまま `application/anp-group-cipher+json`；
- アウター `params.body` ロード `group_cipher_object`；
- 入力のあるオブジェクト **MUST** MLS の `PrivateMessage` 暗号化前の内部 `Group Application Plaintext.payload`；
- インナー `application_content_type` **MUST** あり あり `application/json`。

この暗号化された配達に必要なメッセージまたは受信機のデバイスフィールドは、P6外形寸法アプリケーションに保持され、Metionペイロードには所属しません。

事例:

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

グループホストは、外部レイヤーのCiphertextオブジェクトを表示します。グループE2EEおよびグループベースルールに従って認証およびソートを行います `group.e2ee.send` リクエストが、暗号化されたかどうか確認または検証しません。 `mentions` 配列。

### 7.3 通知の受信

ANPサービスが使用される場合 `group.incoming` グループE2EE配信パスがメッセージで送信される場合:

- 負荷を送信します **MUST** (a) 受信した元のメッセージの構文と同じ。
- 外部ファイルで元のファイルが可能 `auth.origin_proof` メモ、サービスへのコピー **SHOULD** 元の送信者に端のmementionペイロードを結合するために不玉のコピーを含んで下さい;
- メッセージの転送やプッシュ時の中間サービス **MUST NOT** 再書き込み `mentions`。
- グループベースは、DID のアドレスをまだ確認し、グループ E2EE は P6 を運ぶセルフポートフィールドだけに従う。

---

## 8. パスワードに拘束されるSender証明書

### 8.1 非E2EEグループベース

外部E2EEグループベースでは、入力メッセージの送信者はアウターレイヤーから `auth.origin_proof` それを証明して下さい。

被写体が外部メッセージであることを確認

```text
params.meta.sender_did
```

`mentions` 配列は保護されます。 `Signed Request Object` ・・・ `body` 会員様

### 8.2 グループ E2EE

グループE2EEのため、`group.e2ee.send` 外部寸法方式とグループE2Eを本場ベースとしたメッセージを使用します。

`mentions` MLSによって保護される内部配列 `Group Application Plaintext` . それは、端末またはエージェントのランタイム復号化後に検証される見えないです。

### 8.3 ローカル証拠に言及しない

v1 中 **MUST NOT** 地域署名や証明の要求。

スタッフ **MUST** 入力オブジェクトに埋め込まれる要素 `proof`、`signature`、`origin_proof` または `auth` フィールドは、このプロファイルと互換性がないと考えられています。

---

## 9. 検証・加工

### 9.1 サービスエンド処理

サーバー、中継サービス、イングレッシブ サービスおよびグループ ホスト サービス:

1. **MUST** 外部レイヤーAPPメッセージをアウター層で処理するProfile;
2. **MUST** 既存の送信者認証、円筒同等物、ターゲットバインディング、セキュリティプロファイル、ペイロードキャリッジ検証のための外部レベルのプロジェクトファイル要件を実行します。
3. 通りにニュースが入ります。**MUST** グループベース/グループE2EEに応じてグループ配送許可を実行します。
4. **MUST NOT** (a) 国の行動計画の開発のための独占的な義務の実装;
5. **MUST NOT** 受付ステージにて、 `@all`、`@agents` または `@humans` DID でメンバーのリストを拡大する。
6. **MUST NOT** 特定の政府のプロファイルDIDまたは自己カバーが覆われていることをサービスがわからないので、メッセージは拒否されます。
7. **MUST** 入力負荷を無許可に保ちます。

ルールは、サーバーが一般的な外位プロファイルまたは利用理由の共通メッセージを拒否するのを防ぐものではありません。例えば、無効なJSON-RPC形状、無効な物質タイプ非サポート、無効な起源証拠、失敗したグループ送信権、無効な暗号文オブジェクト、サイズの競合、ペイロード制限、明確に言及オブジェクトの数を記録し、速度制限、アンチアブストラクション、アンチスパム戦略、サービス保護の拒否。

### 9.2 ターミナル側検証

エンド、クライアント、ユーザーエージェント、またはエージェントのランタイム **MUST** 申請書の受取または復号化後に文書の検証を実行します。

最小の内線検証手順は以下の通りです。

1. 言及の動作をトリガーする前に、外部層のソースの対象者を検証または使用してください。
2. 日本で初めて、何が起きたのかを調べようとしていたんです。
3. ファイルを適用する前に、トップレイヤーを含むペイロードをチェック `mentions` 配列。
4. 検査検査 `text` 文字列です。
5. 検査検査 `mentions` まああ、
6. 各入力オブジェクトが1つだけを持っていることを確認してください `id`。
7. それぞれチェックしてください。 `range` えー。 `text` 有効。
8. 検査検査 `target.kind` あり。 `human`、`agent` または `group_selector` ワン。
9. 場合 `target.kind = "human"` または `target.kind = "agent"`チェック `target.did` そこ。
10. 場合 `target.kind = "group_selector"`チェック `target.selector` あり。 `all`、`agents` または `humans` ワン。
11. 存在する場合 `mention_role`値をチェックする `addressee` または `cc` ワン。
12. ローカル戦略に応じてレンダリング、通知またはエージェントのランタイム動作を行います。

端子側で言及オブジェクトが確認されていない場合、端末 **SHOULD** この入力オブジェクトをトリガー、通知、またはエージェントのアクティベーションレベルで無視しますが、 **MAY** オリジナルのメッセージテキストを表示し続けます。

### 9.3 許可の解釈

v1は、メンションの独占許可ポリシーには存在しません。

下記の条件が満たされた場合ターミナル **MUST** ワイヤープロトコルレベルに許されるように決定を検討してください。

1. (a) 外部のメッセージは、該当するAMP Messageプロジェクトに従って受け入れられるか、または配信されています。
2. このプロファイルでテキストオブジェクトが有効です。

ターミナル **MAY** 中断や現在のセーバーの通知、スパム対策など、ローカルユーザーの好みを適用します。 これらのローカル設定はプロトコルレベルのセッションの承認ではありません。 **MUST NOT** 政府は国の状況に関する情報を発信することができました。

---

## 10. 事例:

### 10.1 グループで、すべての人のメンバーをイメンション

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

### 10.2 グループメンション個人男性で

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

### グループで10.3

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

ターミナル **MUST NOT** 対象となる文章のみが決定対象の判断に使用されます。

例えば、テキスト `@Alice` アリスをマークするのに十分ではありません。ターミナルはそれに応じて構造化する必要があります `mentions[*].target` オブジェクト。

### 11.2 表示名は同一ではありません

`target.display_name` お名前の写真を撮るだけ。

アイデンティティの決定 **MUST** 単一目的の言及に基づくDID、またはグループ自己管理に基づいてセクターの構文。

### 11.3 サービスのレベルの承認無し

V1 の言及検証はターミナルの側面にあるため、サーバーは、その側で確認できないメッセージを受信し、配信することができます。

ターミナルランタイム **MUST** 無効な言及オブジェクトによってトリガーされる特権の行為を避けます。

### 11.4 E2EE プライバシー

グループ E2EE モードでは、入力オブジェクトは暗号化されたプランテキストです。

サーバとグループホストサービスは、暗号化やプライバシー保護に明確に導入されている将来の拡張通知のヒントがない限り、通信のチェックやインデックスを期待しないでください。

このプロファイルv1は、そのようなヒントを定義しません。

### 11.5 再生と繰り返し処理

このプロファイルは、保護を再生するための排他的な式を定義しません。

外位から再生・繰り返し成功 `operation_id`、`message_id`、E2EE セッションの状態またはグループ化セキュリティ機能。

---

## 12. プライバシーに関する考慮事項

### 12.1 最小メタデータ

メンテーションターゲットは、社会的注意パターンを明らかにする可能性があります。

受賞作品 **SHOULD** ウィル `mentions` 保護されたペイロードの位置をこのプロフィールによって要求し、 **SHOULD NOT** 言及ターゲットから外側のレイヤーにメタダットをコピーします。

### 12.2 グループ自己優先

`@agents` または `@humans` グループセルフポートを待機して、送信者のターゲットオーディエンスを公開するのを待ちますが、メッセージロードで拡張されたメンバーDIDリストを公開することを避けます。

受賞作品 **SHOULD** 送信時に 1 つの DID に展開するのではなく、自己 ector を保ちます。

---

## 13. 最小相互運用性要件

このファイルの作成を少なくともマッチします MUST サポート:

1. 拡張タグとして構造化されたJSONグループメッセージペイロードのトップレベル `mentions`；
2. `text` アクセサリー `mentions` (a) 被写体の構造;
3. `human`、`agent` とりあえず `group_selector` 言及ターゲットの3つのタイプ;
4. `all`、`agents` とりあえず `humans` 3つのグループセルフストア;
5. `unicode_code_point` 言及の範囲;
6. 網膜オブジェクト形状と範囲の検証の終了;
7. ローカル入力フィールドを使用しないでください。
8. メンションのローカル証拠分野を使用しないで下さい;
9. 非E2EE `application/json` グループメッセージ、入力の負荷はあります `params.body.payload`；
10. グループ E2EE メッセージ、入力の負荷は内部です `Group Application Plaintext.payload`；
11. (a) 送信者の証明書の構文を保持し、AMP メッセージファイルの許可を送信します。
12. v1 はサービスエンドの解釈を実行したり、セルフセレクトを行わない。
13. Metion ターゲットは DID またはグループ セルフを使用しており、デバイスは P6 メッセージを読み込むためにバインドします。
14. 歴史DIDは変更されず、現在のDIDへの接続はP2の移行によって検証され、ローカルビジネス戦略で受け入れられなければなりません。

---

## 14. 将来の拡張

将来のバージョンは以下のように定義できます。

- この記事のテキストは英語で利用できます。
- E2EE メッセージ通知がヒットしました。
- (a) 専用通知配信戦略;
- 特定の合意をサポートする能力選択計のメーター、例えば、エージェント;
- (a) 高リスクの操作
- - 豊富なテキストやより体ベースの文書
- 十字グループか外的な参照;
- 人体/エージェントの分類のための標準的なロスター分野。

これらの機能は、v1 に組み込まれていない意図的に非公開です。
