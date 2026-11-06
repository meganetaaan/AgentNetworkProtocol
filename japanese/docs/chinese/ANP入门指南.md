<!-- translation-review: partial; scope: original source lines 603; complete manual translation of these lines only; remaining text machine-unreviewed -->
> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [docs/chinese/ANP入门指南.md](../../../docs/chinese/ANP入门指南.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP導入ガイド

- ノルム: ANP 1.2

## 総合案内

### ANPとは?

ANP(エージェントネットワークプロトコル)の目標は、インターネット上の知的情報を相互に識別し、能力を公開し、サービスを発見し、利用可能なインターフェイスに相談し、セキュリティメッセージを交換し、アプリケーションレベルでコラボレーションできるようにすることです。

このページでは、現在使用している作業エリアのAMP 1.2ドキュメントをコアとメッセージ仕様でカバーしています。

- [AMP-02 一般 DID リクエスト認証](../../chinese/02-ANP-基于DID的身份认证协议.md)支援サービス `did:wba` 出産時 `did:web`
- ANP-03 WBA 方法論規則とアイデンティティ継続
- WNS (WBA 名前 スペース) 人間の読むことできるハンドル
- スマート 説明 文書
- スマートスは文書や検索登録を見つけました
- エンドツーエンドのインスタントメッセージプロファイル

メタアグリーメント ANP-06 はまだドラフトにあります。 P6 グループ E2EE のテキストはディレクトリに含まれていますが、候補、暫定 MLS ExtensionType を残します `0xF0A1` 安定した登録しきい値が解除されていない。収支文書のAP2支払いは、原案/非公開で独立して利用できます。

ドキュメントのステータスは、適合認証、オープンアクセス機能、タグ/GitHubリリースによってSDKや製品が達成、発見または完了していることを表しません。

> バージョンの説明:`Version: 1.2` 指示/ドキュメント版を、ワイヤー版ではなく表現します。 P1/P2/P3/P7/P8予約 `.v1`,VNextの定義を持つP4/P5/P6 `.v2`;独立を定義しないでv1結合延長を保持するP9 `meta.profile`. 例 `protocolVersion` フレーズは次のように解釈されます。

### なぜ ANP が必要なのですか?

今日、ほとんどのAIインテリジェントはネットワークサービスとの相互作用の3つの限られたモードに依然依存しています。 ヒューマンブラウザのシミュレーション、プラットフォーム固有のAPIの使用、または単一のアプリケーションエコロジーにとどまります。 ANPはプロトコル優先への代替パスを提供しています:

- **接続性**: 異なるドメインやプラットフォームのスマートボディは、それぞれに認証、発見、コミュニケーションをとり得る。
- **ネイティブインターフェイス**スマートは、機械で読みやすい説明、インターフェイス文書、JPON-RPC/OpenRPPCスタイルコールを人指向のWebページのみを読む代わりに使用できます。
- **アイデンティティとネーミングの安定化**: DIDは、検証できるCDC IDを提供します。WNSハンドルは、人間の使用に適した名前を提供します。
- **セキュリティメッセージ**: プライベートチャット、グループ会話、添付ファイル、連邦およびエンドツーエンドの暗号化はレイヤードプロファイルによって定義されます。
- **達成するためのオープンパス**: ANP は HTTP、DNS、TLS、JSON、JSON-LD、DID、既存の Web デプロイメントを再利用できます。

### 例: クロスプラットフォームホテル予約

個人的なスマートアシスタントはホテルを予約することになっています。AMPがない場合、Webページを登る必要があります。プラットフォームアカウントを介してログインするか、特定のサプライヤーのAPIにアクセスしてください。

ANP を使用した後:

1. パーソナルアシスタントは、独自のDIDを持ち、人間が読みやすいWNSハンドルを持つこともできます。
2. 探すことができます。`.well-known/agent-descriptions` またはハンドルはホテルの知性を発見しました。
3. エージェントの防衛文書をホテルの知能ボディに読み、製品、サービス、インターフェースを理解しています。
4. ANP-02 を使用して、リクエストを認証し、実際のサポート方法で検証します。 `did:wba` または元の。 `did:web` アイデンティティ;特定の操作を許可しないかどうかは、サービス委任戦略によって決定されます。
5. 構造化されたインターフェイスを使用して、予約や自然言語のインターフェイスを特別なニーズに対処できます。
6. 決済または手動の承認が必要な場合は、対応するアプリケーションプロトコルによりインターフェイスの説明を指定し処理します。

### MCP、A2A との ANP 関係

AMP は他のスマート ボディのプロトコルと補完します。

- **MCP(モデルコンテキストプロトコル)**: ツール、リソースで接続モデルまたはエージェントホスト。
- **A2A スタイルプロトコル**: 作業の共同プロセスを制御環境に集中します。
- **アクセシビリティ**インターネット上でのオープンなアイデンティティ、ネーミング、発見、安全なコミュニケーションおよびアプリケーションレベルのコラボレーションに焦点を当てます。

シンプルな判断は、接続ツールのMCP、管理されたワークフローのためのエンタープライズコラボレーション協定、およびクロスドメイン検出と通信インテリジェンスのためのANPによって行われます。

## 現在のAMPの構造

最新 README の構造は、AMP が既に有効化されており、特定の領域の 2 つのコアプロトコルレイヤーとアプリケーションプロトコルを既存のインターネットインフラに整理できるようになりました。

![ANPプロトコル構造](../../../images/anp-architecture2.png)

### インターネットインフラのオープン

ANPはインターネットプロトコルバーを再構築しませんが、再使用しています。

- 伝達のための基礎としてHTTP/ HTTPS
- アクセシビリティのためのDNSとドメイン名
- CA / TLS を Web 安全ルートとして
- CDN および静的文書を運ぶためのインフラのホスティング
- 検索エンジンや爬虫類は、公共の発見をしています。

### アイデンティティと暗号化された通信層

このレベルの回答:**スマートボディ、最後にどのように動作するか、メッセージが保護されているのか?**

以下が含まれます:

- W3C DID ベースのアイデンティティ
- ANP-03. の特長 `did:wba` 方法論のルール、オリジナルの `did:web` 方法結合
- HTTPメッセージ 署名/ JSON認証情報が ANP-02 にロードされる
- DDドキュメントサービスディスカバリー
- 交渉されるキーから分離された印のキー
- プライベートとコミュニティに続く暗号化の基本

### プロトコルレイヤーを適用

このレベルの回答:**インテリジェントな身体の仕組み、それらがどのように見つけられ、どのアプリケーションプロトコルが使用されるべきか**

以下が含まれます:

- スマート 説明プロトコル
- スマートディスカバリープロトコル
- インスタントメッセージプロファイル
- 支払い、承認、認証、取引などの申請契約書

### メタプロトコルのステータス

ANP-06はまだドラフトです。 更新されたオリエンテーションは、エージェントの説明によって駆動される意味論的協議です:

```text
Agent Description -> MetaProtocolInterface -> anp.get_capabilities -> anp.negotiate
```

公開されたパスでは、スマートボディは既にDIDサービス、エージェント防衛文書、宣言インターフェイス、およびメッセージファイル相互運用を通じて見つけることができます。 明示的にサポートされていない限り、インテリジェンスは `MetaProtocolInterface` とりあえず `anp.negotiate` 任意起草容量として考慮される。

## 知能を繋ぐ方法は?

典型的なAMPの接続は次のとおりです:

```text
WNS Handle 或搜索结果
  -> DID
  -> DID Document
  -> AgentDescription / ANPMessageService
  -> 运行时能力
  -> 业务接口或消息 Profile
```

いくつかのレベルが区別される:

- **WNSハンドル** 人間に読まれた名前です。
- **ダイド** パスワードIDアンカーです。
- **DID ドキュメント** 検証方法とサービスのエンドポイントの権威あるソースです。
- **エージェントの説明** スマートボディおよび利用可能なインターフェイスのオープン情報について説明します。
- **ANPMessageサービス** インスタントメッセージの通知と対話型ピアです。
- **タイムツータイムの容量相談** 相手の現在の容量を真摯にサポートするように確認します。

## アイデンティティ:`did:wba`

<a id="authentication-model"></a>
### DID メソッドから認証を分散させる

[アクア・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アレイ・アワーズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アベイ](../../chinese/02-ANP-基于DID的身份认证协议.md) 認証の一般的なリクエストを定義する。[ANP-03の特長](../../chinese/03-did-wba方法规范.md) WBA 識別子、DID 文書、透析、キーバインディングおよびマイグレーション規則を定義します。[元の: Web の統合の付録](../../chinese/附录B：与原生did-web-的兼容.md) Web ID は、WBA に変換したり、WBA に固有のルートの証拠要件を持つことなく、同じ認証とメッセージ契約を直接使用する方法を説明しています。

通常の API 認証は WNS、メッセージ、または `deviceManifest`. WBAの下の例は他のDIDメソッドに追加の制限はありません。`did:webvh` たとえば、対応するメソッドでサポートし、DID Coreの互換性から不一致することはできません。

### `did:wba` オファーは何ですか?

`did:wba` 通常のWebインフラを引き続き使用しながら、インテリジェントな人々を集中したアイデンティティを与えます。

裸体ドメイン DID:

```text
did:wba:example.com
```

に続く:

```text
https://example.com/.well-known/did.json
```

デフォルトを使う `e1_` プロフィールDIDへの道:

```text
did:wba:example.com:user:alice:e1_<fingerprint>
```

に続く:

```text
https://example.com/user/alice/e1_<fingerprint>/did.json
```

ドメイン名がポートを含んでいる場合、DID のコロンはパーセンテージ番号コードを必要とします。

```text
did:wba:example.com%3A3000:user:alice:e1_<fingerprint>
```

### 名付けられたドメイン名のIDとパスID

- **Naked ドメイン名 DID**(if) `did:wba:example.com`) 通常、ドメイン名のレベルの被験者またはサービスステータスを示します。
- **パスID**(if) `did:wba:example.com:user:alice:e1_<fingerprint>`) は、ドメイン名の特定件名に示します。
- 新しいパス DID はデフォルトを使用する必要があります `e1_` Ed25519 は、指紋をファイルに結合します。
- キーが変更されると、DID は回転する可能性があります。WNS ハンドルは安定した人間読みやすい参照を提供することができます。同じ安定化の主なパスまたはハンドルは新しい DID に解決します。これは独立して権威の継続性を証明できません。ANP-03 移行チェーンの事前信頼性のある DID 検証後に、運用戦略によって処理する必要があります。

### 最小限のDID文書フォーム

AMP では、以下のサービスタイプが共通です。

- `AgentDescription`: スマートボディへのポイント `ad.json` ドキュメント。
- `ANPHandleService`: WNS 双方向の結合認証をサポート
- `ANPMessageService`: AMP メッセージ/インタラクティブエンドポイントを均一に表示する露光

事例:

```json
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/data-integrity/v2",
    "https://w3id.org/security/multikey/v1"
  ],
  "id": "did:wba:example.com:user:alice:e1_<fingerprint>",
  "verificationMethod": [
    {
      "id": "did:wba:example.com:user:alice:e1_<fingerprint>#key-1",
      "type": "Multikey",
      "controller": "did:wba:example.com:user:alice:e1_<fingerprint>",
      "publicKeyMultibase": "z6Mk..."
    },
    {
      "id": "did:wba:example.com:user:alice:e1_<fingerprint>#key-x25519-1",
      "type": "X25519KeyAgreementKey2019",
      "controller": "did:wba:example.com:user:alice:e1_<fingerprint>",
      "publicKeyMultibase": "z9h..."
    }
  ],
  "authentication": [
    "did:wba:example.com:user:alice:e1_<fingerprint>#key-1"
  ],
  "assertionMethod": [
    "did:wba:example.com:user:alice:e1_<fingerprint>#key-1"
  ],
  "keyAgreement": [
    "did:wba:example.com:user:alice:e1_<fingerprint>#key-x25519-1"
  ],
  "service": [
    {
      "id": "did:wba:example.com:user:alice:e1_<fingerprint>#ad",
      "type": "AgentDescription",
      "serviceEndpoint": "https://example.com/agents/alice/ad.json"
    },
    {
      "id": "did:wba:example.com:user:alice:e1_<fingerprint>#handle",
      "type": "ANPHandleService",
      "serviceEndpoint": "https://example.com/.well-known/handle/alice"
    },
    {
      "id": "did:wba:example.com:user:alice:e1_<fingerprint>#anp",
      "type": "ANPMessageService",
      "serviceEndpoint": "https://example.com/anp",
      "serviceDid": "did:wba:example.com"
    }
  ],
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2025-01-01T00:00:00Z",
    "verificationMethod": "did:wba:example.com:user:alice:e1_<fingerprint>#key-1",
    "proofPurpose": "assertionMethod",
    "proofValue": "z..."
  }
}
```

### 識別プロセス

共通のプロセスへの [ANP-02 HTTP 認証のリクエスト](../../../chinese/02-ANP-基于DID的身份认证协议.md#http-binding) どの位は適用可能です:

1. スマートAの使用 `authentication` 認証方式は、秘密鍵の署名に対応します。 `Signature-Input` とりあえず `Signature` 携帯;メッセージが利用可能なときに圧倒的にカウントし、署名 `Content-Digest`。
2. DID ドキュメントの解析と検証、該当する DID メソッドを使用してチェック `keyid` 鍵の使用を認証します。
3. B 署名ベース文字列を再確立する、シグネチャの確認、抽象化、シグネチャカバレッジ、タイムウィンドウのリセット、保護を検証するための実際のHTTPリクエスト。
4. B 運用機関の独立審査;認定の成功は、人的認可が取得された運用上の義務や証拠に相当するものではありません。
5. オプションのトークンプロセスが使用される場合、フォローアップリクエストはAMP-02およびサービス戦略で使用されます。メッセージ送信者はP1と独自のプロファイルでまだ検証されていることを認証します。

## 名前 サービス:WNS のハンドル

### なぜWNSが必要なのですか?

DIDは信頼できる機械識別子ですが、人間の入力、記憶およびdisseminationを促進しません。 WNS (WBA 名前空間)はあります `did:wba` 安定した人間可読性ネーミング層を提供します。

ハンドルの例:

```text
alice.example.com
```

差別の代替形態:

```text
wba://alice.example.com
```

DID としてパースするハンドル、DID は DID 文書に解析します:

```text
Handle -> Handle Resolution Endpoint -> DID -> DID Document -> service
```

### ハンドル パーシング ピア

あり。 `alice.example.com`、標準的なエンドポイントはです:

```text
https://example.com/.well-known/handle/alice
```

応答例:

```json
{
  "handle": "alice.example.com",
  "did": "did:wba:example.com:user:alice:e1_<fingerprint>",
  "status": "active",
  "updated": "2025-01-01T00:00:00Z",
  "versionId": "42",
  "ttl": 300,
  "profile": {
    "type": "DIDSubjectProfile",
    "subject_did": "did:wba:example.com:user:alice:e1_<fingerprint>",
    "subject_type": "agent",
    "handle": "alice.example.com",
    "display_name": "Alice Agent",
    "description": "一个旅行规划智能体",
    "avatar_uri": "https://example.com/avatars/alice.png",
    "discoverability": "listed"
  }
}
```

WBAメインラインWNSのルールは以下の通りです。オリジナルWebでは、[付録B](../../../chinese/附录B：与原生did-web-的兼容.md#legacy-web-handle)弱面積宣言対応モデルのこのことから決定できない `exact-handle`：

- アウター `did` 権威あるアイデンティティの結果です。
- `profile` メタデータの公開表示だけ。
- `profile` 識別、承認、ルート、E2EEの結合またはサービスエンドポイントの選択には使用されません。
- セキュリティの機密操作にWBAハンドルを使用する場合は、DID文書を渡す必要があります `ANPHandleService` DID へのハンドルのバインディングを確認します。通常の DDDI API 認証は、ハンドルを必要としません。
- 信頼のハンドルが必要 `exact-handle` 検証;のみ `provider-confirmed` 品質保証の結合を満たすことは十分ではないです。

## スマート 説明

### エージェント防衛の役割

エージェント防衛は、スマートのための公開エントリページです。他のスマートは理解するためにそれを読んで:

- スマートな名前、DID、所有者および記述
- 製品の情報、サービス、文書、メディアなどの情報源
- 自然言語インターフェイスと構造化されたインターフェースをサポート
- セキュリティ要件
- 任意文書の整合性証拠

AnAP 情報インタラクションモードは、爬虫類と似ています。データ、説明、インターフェース文書を公開するスマート ボディの URL です。他のインテリジェントなボディは、これらのリソースを引き出し、ローカルの推論と必要なときにのみ適切なインターフェイスを呼び出すことができます。

### 情報とインターフェイス

エージェントの防衛は、二つのコアコンセプトを使用します。

- **インフォメーション**製品説明、サービスの説明、文書化、ビデオなどの外部リソースが利用できます。
- **インターフェース**: スマートボディとやり取りする方法
  - `NaturalLanguageInterface`: 柔軟な対話インターフェイス。
  - `StructuredInterface`: YAML の API、OpenRPC、JSON-RPC、MCP 互換インターフェース、WebRTC などの構造化された API インターフェイス。
  - `MetaProtocolInterface`: 対人協議のためのオプションの草案延長。

構造化されたインターフェイスがタスクを満たすために利用できる場合、インテリジェントは構造化されたインターフェイスを優先的に使用し、正確さおよび効率性のために。

### 事例紹介

```json
{
  "protocolType": "ANP",
  "protocolVersion": "1.0.0",
  "type": "AgentDescription",
  "url": "https://grand-hotel.com/agents/hotel-assistant/ad.json",
  "name": "Grand Hotel Assistant",
  "did": "did:wba:grand-hotel.com:service:hotel-assistant:e1_<fingerprint>",
  "owner": {
    "type": "Organization",
    "name": "Grand Hotel Management Group",
    "url": "https://grand-hotel.com"
  },
  "description": "面向房间预订、礼宾服务、住客协助和消息通信的智能酒店助手。",
  "created": "2024-12-31T12:00:00Z",
  "securityDefinitions": {
    "didwba_sc": {
      "scheme": "didwba",
      "in": "header",
      "name": "Authorization"
    }
  },
  "security": "didwba_sc",
  "Infomations": [
    {
      "type": "Product",
      "description": "提供高级设施和个性化服务的豪华酒店客房。",
      "url": "https://grand-hotel.com/products/luxury-rooms.json"
    },
    {
      "type": "Information",
      "description": "酒店设施、便利设施、位置和政策信息。",
      "url": "https://grand-hotel.com/info/hotel-basic-info.json"
    }
  ],
  "interfaces": [
    {
      "type": "NaturalLanguageInterface",
      "protocol": "YAML",
      "version": "1.2.2",
      "url": "https://grand-hotel.com/api/nl-interface.yaml",
      "description": "用于酒店服务对话的自然语言接口。"
    },
    {
      "type": "StructuredInterface",
      "protocol": "openrpc",
      "url": "https://grand-hotel.com/api/booking-openrpc.json",
      "humanAuthorization": true,
      "description": "用于预订和预约管理的结构化接口。"
    },
    {
      "type": "MetaProtocolInterface",
      "profile": "anp.meta.negotiation.v1",
      "binding": "jsonrpc-2.0",
      "url": "https://grand-hotel.com/anp",
      "methods": ["anp.get_capabilities", "anp.negotiate"],
      "description": "可选的草案协商接口。"
    }
  ]
}
```

> 認証に注意してください。例えば、AMP-07 `didwba` 宣言と歴史 `Authorization` フィールドラベル、AMP-02ヘッダルールを交換することなく。新しいシグネチャリクエストが使用されます `Signature-Input`、`Signature` および適用 `Content-Digest`, このステートメントから古いDIDWba協会の署名スキームを課さない.

> Note: 現在のスマートボディ説明例ではフィールド名を使用します `Infomations`. これは、現在の規範に従って行うべきであり、将来のバージョンへの可能な変更と互換性があります。

## スマートディスカバリー

Smarts は、オープンエージェントの説明文書を見つけるためにスマートと検索サービスを定義する方法を調べます。

### 確かにそうではありません。

ドメイン名は、次のパスですべての公開URLを発行することができます。

```text
https://{domain}/.well-known/agent-descriptions
```

事例:

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "did": "https://w3id.org/did#",
    "ad": "https://agent-network-protocol.com/ad#"
  },
  "@type": "CollectionPage",
  "url": "https://example.com/.well-known/agent-descriptions",
  "items": [
    {
      "@type": "ad:AgentDescription",
      "name": "Hotel Assistant",
      "@id": "https://example.com/agents/hotel-assistant/ad.json"
    },
    {
      "@type": "ad:AgentDescription",
      "name": "Customer Support Agent",
      "@id": "https://example.com/agents/support/ad.json"
    }
  ],
  "next": "https://example.com/.well-known/agent-descriptions?page=2"
}
```

クライアントと検索爬虫類は、 `next` 次のページがないまで取得してください。

### パッシブ・ディスカバリー

パッシブ検出では、スマートな人は、エージェントの防御URLを検索サービスインテリジェンスに自発的に提出します。 検索サービスの登録APIは、検索サービスの独自のエージェント開発文書によって記述されます。

典型的なプロセス:

1. サーチサービスのインテリジェンスを読み取り、エージェントの説明
2. 登録インターフェースを見つけます。
3. エージェントの防衛URLをそれぞれ提出します。
4. サービスの検索、この説明をキャプチャし、インデックス化します。

### ハンドルベースの入口

WNS ハンドルの解像度は、発見のためのエントリ ポイントとしても使用できます。

```text
alice.example.com -> DID -> DID Document -> AgentDescription service
```

ただし、クライアントは、ハンドルから直接サービスエンドポイントを除外することはできません。 DID 文書は、権限のあるソースのままです。

## 組織図

AMP-end インスタント メッセージングは、クロスドメイン スマート ボディ メッセージ通信に使用できる一連のデータです。それは単心チャット製品プロトコルではありませんが、インテリジェントなボディがニュース サービスをどのように見つけているかを定義し、プライベートチャットとグループチャットを送信し、コンテンツを保護し、添付ファイルやクロスフェデラーを送信します。

### コア思考

- **中央ではなく、フェデレーション。**: 異なるドメインは、独自のスマートボディとサービスをホストしています。
- **アイデンティティ優先度**：`agent_did` とりあえず `group_did` は、最初の識別子です。
- **サービス検出優先**DID 文書のメッセージ・ピア `ANPMessageService` 設立年月日
- **JSON-RPC 2.0 外部バインディング**: 利用のお願い `jsonrpc`、`method`、`id` オブジェクトフォーム `params`。
- **ジェネリック・パラムフォーム**: ほとんどの方法が使われます `params.meta`ソリューション `params.auth` とりあえず `params.body`。
- **E2EE オーバーレイによるセマンティックの分離**: 保護を伝達する明示的かつエンドツーエンドの暗号化モードのみが共存できます。
- **データ平面から分離された制御面**: 添付ファイルは、Manifestと独立したHTTPSオブジェクトを使用して送信されます。

### ハーモナイズ `ANPMessageService`

現在のMessageProfileは、DID文書がクロスドメインの相互作用のために公開を露出することを期待しています `ANPMessageService`. プライベートな会話、クラスター、キー、オブジェクト、および連邦コンポーネントの内部化が達成できますが、統一されたサービス終了点の後に外部機能が低下します。

次の例では、通常のDIDアドレスメッセージと添付機能のみがE2EEではなく、機器マニフェストは必要ありません。

```json
{
  "id": "did:wba:example.com:user:alice:e1_<fingerprint>#message",
  "type": "ANPMessageService",
  "serviceEndpoint": "https://example.com/anp",
  "serviceDid": "did:wba:example.com",
  "profiles": [
    "anp.core.binding.v1",
    "anp.identity.discovery.v1",
    "anp.direct.base.v1",
    "anp.attachment.v1"
  ],
  "securityProfiles": [
    "transport-protected"
  ]
}
```

重要なインタラクションの前に、発信者は実行中の時間機能を確認する必要があります。

```text
anp.get_capabilities
```

DID静的ヒントは、性能結果に矛盾する時に結果を判断するために使われます。

有効活用 `anp.direct.e2ee.v2` または候補者 `anp.group.e2ee.v2` 、P2との完全な依存は満たされなければなりません `deviceManifest` Qualificationルール; 上記例はプロフィール文字列を指定できません。また、v1セッションをv2として考慮することができます。[完全なメッセージの索引](../../chinese/message/README.md)多等例の一例です。

### インスタントメッセージプロファイルインデックス

[ANPメッセージング1.2指数](../../chinese/message/README.md) ドキュメントは9つが含まれています。通常ベース操作は、DID/グループDIDアドレスを維持します。P4 v2は、DIDのみのメンバーを定義し、DIDの更新を座標化された投稿、P5/P6 v2を編集します。パスワードデバイスのエンドポイントのみが導入されます。P6は候補のままで、安定した分布はMLS ExportType登録の閾値を満たしなければなりません。

| プロフィール | 識別/ステータス | 役割・役割 |
| --- | --- | --- |
| [P1 コア結合](../../chinese/message/01-核心绑定.md) | `anp.core.binding.v1` | JSON-RPC 2.0 結合,`params` 構造・容量相談・ソリウム等、誤差モデル |
| [P2 アイデンティティとディスカバリー](../../chinese/message/02-身份与发现.md) | `anp.identity.discovery.v1` | エージェント/グループID、DID文書 `ANPMessageService` 新着情報 |
| [P3 プライベートセマンティック](../../chinese/message/03-私聊基础语义.md) | `anp.direct.base.v1` | `direct.send`、内容モデル、応答、分類および送り装置の境界の証拠 |
| [P4グループ基本セマティクス](../../chinese/message/04-群组基础语义.md) | `anp.group.base.v2` | グループライフサイクル、会員関係、グループメッセージ、グループステータスバージョン、ホストソート |
| [P5 プライベート・ツー・パイロット暗号化](../../chinese/message/05-私聊端到端加密.md) | `anp.direct.e2ee.v2` | DIDを使用して鍵素材とラチェット思考E2EEを結合するプライベートチャット |
| [P6グループ対エンド暗号化](../../chinese/message/06-群组端到端加密.md) | `anp.group.e2ee.v2`;選択 | MLS ベースのグループ E2EE とグループパスワードの状態 |
| [P7 添付ファイルとオブジェクト転送](../../chinese/message/07-附件与对象传输.md) | `anp.attachment.v1` | 添付ファイル マニフェスト、オブジェクトサービス、アップロード/ダウンロードチケットとオブジェクト暗号化 |
| [P8 連邦およびクロスボーダー](../../chinese/message/08-联邦与跨域.md) | `anp.federation.relay.v1` | 横断的なサービスコール、ルート、リレーおよび結果の証人 |
| [P9 メッセージの言及延長](../../chinese/message/09-消息Mention扩展.md) | v1 結合;独立しない | 構造グループメッセージ |

推奨読書注文:AMP-02および適用方法の結合、読みます P1/P2、P3/P4、P5/P6、必要に応じて読んでください。

## プロトコルSDK:AgentConnect

Ananp のオープンソース SDK と AgentConnect で参照の実化メンテナンス:

- [https://github.com/agent-network-protocol/AgentConnect](https://github.com/agent-network-protocol/AgentConnect)

AgentConnect は、識別、認証、認証、WNS、エイジ防衛、OpenRPC/JSON-RPC、クライミング、AP2、E2EE、およびイラストサポートを提供します。

次の表は、現在の登録フォームやAMP 1.2 適合リストではない 2026-06-27 用の SDK パッケージのナビゲーションスナップショットのみを保持します。実際のパッケージ名、バージョン、プロファイルのサポート、および有効状態は、SDK リポジトリに基づいており、対応する達成:

| 語学学校 | パッケージ/モジュール | スタート方法 | ステータス |
| --- | --- | --- | --- |
| フィードバック | `anp` | `pip install anp` または `pip install "anp[api]"` | 安定した進水SDK |
| おすすめ | `github.com/agent-network-protocol/anp/golang` | `go get github.com/agent-network-protocol/anp/golang@latest` | 安定した進水SDK |
| コース | `anp` | `cargo add anp` | 安定した進水SDK |
| ダーツ | `anp` | `dart pub add anp` | 公開SDK |
| 型スクリプト | `@anp/typescript-sdk` ワークスペース | から `typescript/ts_sdk` ソースビルド | プレビュー/ローカルソース |
| リファレンス | `com.agentconnect:anp4j` そしてばねのブーツ始動機 | から `java` ソースビルド | ローカルSDK |

### OpenAmp を使用して最小限の Python スマートボディを作成します。

```bash
pip install "anp[api]"
```

```python
from fastapi import FastAPI
from anp.openanp import AgentConfig, anp_agent, interface

@anp_agent(AgentConfig(
    name="Calculator",
    did="did:wba:example.com:calculator:e1_<fingerprint>",
    prefix="/agent",
    description="A simple calculator agent",
))
class CalculatorAgent:
    @interface
    async def add(self, a: int, b: int) -> int:
        return a + b

app = FastAPI(title="Calculator Agent")
app.include_router(CalculatorAgent.router())
```

共通の自動生成のエンドポイント:

| ピーラー | 目的: |
| --- | --- |
| `GET /agent/ad.json` | エージェントの説明文書 |
| `GET /agent/interface.json` | OpenRPCインターフェイス文書 |
| `POST /agent/rpc` | JSON-RPC 2.0 メソッド呼び出し |

## 推奨パス

1. 読書 [代表取締役社長](../../README.cn.md) 現行の規範的なインデックスと構造を知る。
2. まずはお読みください。 [ANP-02: 同定IDに基づく同一証明](../../chinese/02-ANP-基于DID的身份认证协议.md)もう一度読んでください。 [ANP-03:did:wba の](../../chinese/03-did-wba方法规范.md) または[元の: Web の統合の付録](../../chinese/附录B：与原生did-web-的兼容.md);人の名前を読み取ることができる後読み取るために必須 [ANP-04:WNS(アヌ・フン)](../../chinese/04-ANP-基于DID-WBA的命名空间规范.md)。
3. 読書 [ANP-07: スマートボディの説明](../../chinese/07-ANP-智能体描述协议规范.md) とりあえず [ANP-08: スマートディスカバリー](../../chinese/08-ANP-智能体发现协议规范.md) スマートボディの公開と検索
4. メッセージング機能を構築する場合は、[ANP-09](../../chinese/09-ANP-端到端即时消息协议规范.md)と各メッセージングProfileを読んでください。
5. 利用条件 [エージェントコネクト](https://github.com/agent-network-protocol/AgentConnect) ビルドまたはテストを実行します。

### ANPプロセスの詳細

AMP プロセス全体は次の通りです。

![](../../../images/anp-flow.png)

ANP プロセスは、次の主要な手順で構成されています。

1. **スマートディスカバリー**: 検索エンジンは、スマートボディを介してメカニズムを発見 ()`.well-known/agent-descriptions`) 説明文書のURL、名前など基本的な情報を含むスマートBに関する情報をクライミングする

2. **スマート検索**Smart A は、検索エンジンでスマート B の記述文書の URL を見つけます。このステップでは、インテリジェントな機能により、他のドメインの名前を知らないことなく、セマティック検索による適切なサービスプロバイダを見つけることができます。

3. **認証リクエスト**Smart A は、独自の秘密鍵を使用してリクエストに署名し、独自の DID 識別子を運ぶためらし、スマート B が文書やサービスを説明するように要求します。署名により、要求の信頼性と完全性が保証されます。

4. **組織図**: スマートBは、要求されたDID識別子に基づいて、スマートAのDID文書を受け取り、パブリックキーを抽出し、リクエストの署名を検証して、スマートAのアイデンティティを確認します。

5. **サービスインタラクション**スマート A は、ホテルの予約や情報検索などの返されたデータに基づいてタスクを完了します。このプロセスは、標準化されたインターフェイスと相互プラットフォームの相互運用性を確保するためのデータフォーマットに基づいています。

このIDベースの認証と標準化された説明文書は、インテリジェントなボディが集中管理プラットフォームに依存することなく、インターネット上で安全かつ効率的に検出および対話することができます。
