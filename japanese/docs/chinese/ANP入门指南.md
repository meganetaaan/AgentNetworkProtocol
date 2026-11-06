<!-- translation-review: full; scope: entire original source; paragraph-by-paragraph agent review; source code unchanged -->
> 日本語参考訳（原文全文をエージェントが照合）。規範となるのは原文です。コード例・識別子は保持しています。
> 原文: [docs/chinese/ANP入门指南.md](../../../docs/chinese/ANP入门指南.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP入門ガイド

- 仕様セット：ANP 1.2

## 概要

### ANPとは

ANP（Agent Network Protocol）はAgentic Webに向けたオープンなプロトコルスタックです。オープンなインターネット上のエージェントが互いの身元を確認し、能力を公開し、サービスを発見し、利用可能なインターフェースを交渉し、安全なメッセージを交換し、アプリケーション層で協働できることを目指します。

本ガイドは現在のワークスペースのANP 1.2文書セットに対応し、コア仕様とメッセージ仕様の次の内容を扱います。

- [ANP-02：汎用DIDリクエスト認証](../../chinese/02-ANP-基于DID的身份认证协议.md)。`did:wba`とネイティブ`did:web`に対応
- ANP-03のWBAメソッド規則とアイデンティティの継続性
- WNS（WBA Name Space）の人間が読めるHandle
- エージェント記述文書
- エージェント発見文書と検索サービスへの登録
- エンドツーエンドのインスタントメッセージProfile

メタプロトコルANP-06は引き続き草案です。P6グループE2EEは全文が一覧に含まれていますが、依然として候補であり、暫定MLS ExtensionType `0xF0A1`の安定した登録という条件は撤廃されていません。AP2決済アダプター文書は独立して版管理され、草案／未リリースのままです。

仕様文書の状態は、SDKや製品が実装済み、適合検証済み、公開の能力発見に対応済み、またはtag／GitHub Release作成済みであることを意味しません。

> バージョンについて：`Version: 1.2`は仕様／文書の版であり、wireの版ではありません。P1/P2/P3/P7/P8は`.v1`を維持し、P4/P5/P6は既存vNext定義の`.v2`を採用します。P9はv1 bindingの拡張であり、独立した`meta.profile`を定義しません。例の`protocolVersion`などは所属する仕様に従って解釈し、一律に番号を変更しません。

### ANPが必要な理由

現在、多くのAIエージェントとネットワークサービスのやり取りは、人間のブラウザー操作の模倣、プラットフォーム専用APIの使用、単一アプリケーションのエコシステム内での完結という3つの制約された方式に依存しています。ANPはプロトコルを起点とする別の方法を提供します。

- **相互接続**：異なるドメインやプラットフォームのエージェントが相互に認証し、発見し、通信できます。
- **ネイティブなインターフェース**：人間向けWebページの読取りだけに限らず、機械可読な記述、インターフェース文書、JSON-RPC／OpenRPC形式の呼出しを利用できます。
- **安定したアイデンティティと名前**：DIDは検証可能な暗号学的アイデンティティを、WNS Handleは人間が使いやすい名前を提供します。
- **安全なメッセージ**：個別・グループのチャット、添付、フェデレーション、エンドツーエンド暗号化を階層化されたProfileで定義します。
- **オープンな実装経路**：HTTP、DNS、TLS、JSON、JSON-LD、DIDと既存のWeb配備方式を再利用します。

### 例：プラットフォームをまたぐホテル予約

個人向けアシスタントがホテルを予約するとします。ANPがなければ、Webページのクロール、プラットフォームのアカウントでのログイン、または特定業者の専用APIへの接続が必要になるかもしれません。

ANPを利用すると、次のようになります。

1. 個人アシスタントは自身のDIDを持ち、人間が読めるWNS Handleを持つこともできます。
2. 検索、`.well-known/agent-descriptions`、またはHandleでホテルのエージェントを発見します。
3. ホテルのAgent Description文書を読み、商品・サービス・インターフェースを把握します。
4. ANP-02でリクエストを認証し、実際に対応するメソッドに従って`did:wba`またはネイティブ`did:web`の身元を検証します。具体的な業務操作を許可するかどうかは、別途サービスの認可ポリシーで判断します。
5. 構造化インターフェースで予約を完了でき、特別な要望には自然言語インターフェースも使えます。
6. 決済や人間の認可が必要なら、インターフェース記述に明示し、対応するアプリケーションプロトコルで処理します。

### ANPとMCP・A2Aの関係

ANPと他のエージェントプロトコルは補完関係にあります。

- **MCP（Model Context Protocol）**：モデルやAgent Hostとツール・リソースを接続します。
- **A2A系プロトコル**：通常、管理された環境内のタスク協働フローに重点を置きます。
- **ANP**：オープンなインターネットでのアイデンティティ、命名、発見、安全な通信、アプリケーション層の協働に重点を置きます。

簡単な目安は、ツールへの接続にはMCP、管理されたワークフローには企業向け協働プロトコル、ドメインをまたぐエージェントの発見・通信にはANP、というものです。

## 現在のANPアーキテクチャ

最新READMEのアーキテクチャは、ANPのリリース済み能力を、既存のインターネット基盤、2つのコアプロトコル層、具体的な領域のアプリケーションプロトコルとして整理しています。

![ANPプロトコルのアーキテクチャ](../../../images/anp-architecture2.png)

### オープンなインターネット基盤

ANPはインターネットのプロトコルスタックを作り直さず、次を再利用します。

- 転送基盤としてのHTTP／HTTPS
- 到達性の基盤としてのDNSとドメイン名
- Webの信頼の基点としてのCA／TLS
- 静的文書を配信するCDNとホスティング基盤
- 公開の発見を行う検索エンジンとクローラー

### アイデンティティと暗号化通信の層

この層は、**エージェントは誰か、相手はどう検証するか、メッセージはどう保護されるか**に答えます。

次を含みます。

- W3C DIDに基づくアイデンティティ
- ANP-03の`did:wba`メソッド規則とネイティブ`did:web`のメソッドバインディング
- ANP-02のHTTP Message Signatures／JSONによる認証情報の伝達
- DID Documentによるサービス発見
- 署名鍵と鍵合意鍵の分離
- 個別・グループチャットのエンドツーエンド暗号化の基礎機能

### アプリケーションプロトコル層

この層は、**エージェントは何ができるか、どう発見されるか、どのアプリケーションプロトコルを使うか**に答えます。

次を含みます。

- エージェント記述プロトコル
- エージェント発見プロトコル
- インスタントメッセージProfile
- 決済・認可・認証・取引などのアプリケーションプロトコル

### メタプロトコルの状態

ANP-06は引き続き草案です。更新後の方向性は、Agent Descriptionを起点とする意味的な交渉です。

```text
Agent Description -> MetaProtocolInterface -> anp.get_capabilities -> anp.negotiate
```

リリース済みの経路では、DIDのサービス発見、Agent Description文書、宣言されたインターフェース、メッセージProfileを使って相互運用できます。実装が対応を明示しない限り、`MetaProtocolInterface`と`anp.negotiate`は任意の草案機能として扱います。

## エージェントの接続方法

典型的なANPの接続経路は次のとおりです。

```text
WNS Handle 或搜索结果
  -> DID
  -> DID Document
  -> AgentDescription / ANPMessageService
  -> 运行时能力
  -> 业务接口或消息 Profile
```

次の階層を区別する必要があります。

- **WNS Handle**は人間が読める名前です。
- **DID**は暗号学的アイデンティティの基点です。
- **DID Document**は検証メソッドとサービスエンドポイントの権威ある情報源です。
- **Agent Description**はエージェントの公開情報と利用可能なインターフェースを説明します。
- **ANPMessageService**はインスタントメッセージProfileが使う統一メッセージ・対話エンドポイントです。
- **実行時の能力交渉**で、その時点でエンドポイントが実際に対応する能力を確認します。

## アイデンティティ：`did:wba`

<a id="authentication-model"></a>
### まず認証とDIDメソッドを区別する

[ANP-02](../../chinese/02-ANP-基于DID的身份认证协议.md)は汎用のリクエスト認証を、[ANP-03](../../chinese/03-did-wba方法规范.md)はWBAの識別子、DID Document、解決、鍵のバインディング、移行規則を定義します。[ネイティブdid:web統合付録](../../chinese/附录B：与原生did-web-的兼容.md)は、WebアイデンティティがWBAへ変換せず、WBA固有のルートproof要件も課されずに、同じ認証・メッセージ契約を直接使う方法を説明します。

通常のAPI認証にWNS、メッセージProfile、`deviceManifest`は必要ありません。以下のWBA例は他のDIDメソッドへの追加制限ではありません。`did:webvh`などには対応するメソッドバインディングと実装の対応が必要であり、DID Core互換性から推定できません。

### `did:wba`が提供するもの

`did:wba`はANPのWebベースDIDメソッドです。通常のWeb基盤を使い続けながら、エージェントに分散型のアイデンティティを与えます。

ドメイン名だけのDID：

```text
did:wba:example.com
```

解決先：

```text
https://example.com/.well-known/did.json
```

既定の`e1_` Profileを使うパス型DID：

```text
did:wba:example.com:user:alice:e1_<fingerprint>
```

解決先：

```text
https://example.com/user/alice/e1_<fingerprint>/did.json
```

ドメイン名にポートを含む場合、DID内のコロンはパーセントエンコードが必要です。

```text
did:wba:example.com%3A3000:user:alice:e1_<fingerprint>
```

### ドメイン名だけのDIDとパス型DID

- **ドメイン名だけのDID**（例：`did:wba:example.com`）は、通常、ドメイン単位の主体やサービスのアイデンティティを表します。
- **パス型DID**（例：`did:wba:example.com:user:alice:e1_<fingerprint>`）は、ドメイン内の具体的な主体を表します。
- 新しいパス型DIDは、既定の`e1_` Ed25519バインディング指紋Profileを使うべきです。
- バインディング鍵が変わると、パス型DIDが更新される場合があります。WNS Handleは人間が読める安定した参照を提供できます。ただし、安定した主体パスが同じ、またはHandleが新DIDへ解決されるだけでは、権限の継続性を独立に証明できません。以前から信頼するDIDを起点にANP-03の移行チェーンを検証し、その後、業務ポリシーに従って処理する必要があります。

### 最小のDID Documentの形

DID Documentは鍵とサービスを公開します。ANPで一般的なサービス型には次があります。

- `AgentDescription`：エージェントの`ad.json`文書を指します。
- `ANPHandleService`：WNSの双方向バインディング検証に対応します。
- `ANPMessageService`：統一されたANPメッセージ／対話エンドポイントを公開します。

例：

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

### アイデンティティ認証の流れ

一般的な手順は[ANP-02 HTTPリクエスト認証](../../../chinese/02-ANP-基于DID的身份认证协议.md#http-binding)を正とします。

1. エージェントAは、`authentication`で許可された検証メソッドに対応する秘密鍵で署名し、`Signature-Input`と`Signature`で伝達します。本文がある場合は`Content-Digest`を計算し、署名の対象に含めます。
2. エージェントBは、適用するDIDメソッドに従ってAのDID Documentを解決・検証し、`keyid`と認証鍵の用途を確認します。
3. Bは実際のHTTPリクエストから署名基底文字列を再構成し、署名、ダイジェスト、署名対象の範囲、有効時間枠、リプレイ対策を検証します。
4. Bは業務上の権限を独立に判断します。認証成功は操作の認可を意味せず、人間の認可を得た証明にもなりません。
5. 任意のTokenフローを採用する場合、後続リクエストはANP-02とサービスのポリシーに従ってTokenを使います。メッセージ原発信者の証明は、引き続きP1と所属Profileに従って別途検証します。

## 名前サービス：WNS Handle

### WNSが必要な理由

DIDは信頼できる機械用識別子ですが、人間の入力・記憶・共有には不便です。WNS（WBA Name Space）は`did:wba`の上に、人間が読める安定した命名層を提供します。

Handleの例：

```text
alice.example.com
```

任意の共有形式：

```text
wba://alice.example.com
```

HandleをDIDへ、さらにDIDをDID Documentへ解決します。

```text
Handle -> Handle Resolution Endpoint -> DID -> DID Document -> service
```

### Handleの解決エンドポイント

`alice.example.com`の標準エンドポイントは次です。

```text
https://example.com/.well-known/handle/alice
```

応答例：

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

以下はWBA本流のWNS規則です。ネイティブWebは[付録B](../../../chinese/附录B：与原生did-web-的兼容.md#legacy-web-handle)の、より弱いドメイン宣言互換モデルを使うため、それをもって`exact-handle`と判定できません。

- 外側の`did`が、権威あるアイデンティティの結果です。
- `profile`は公開表示用のメタデータにすぎません。
- `profile`を認証、認可、ルーティング、E2EEバインディング、サービスエンドポイント選択に使ってはいけません。
- セキュリティ上重要な操作でWBA Handleを使う場合、DID Documentの`ANPHandleService`でHandleとDIDのバインディングを検証する必要があります。通常のDID API認証にHandleは必要ありません。
- 特定のHandleを信頼する必要がある場合は`exact-handle`検証が必要です。`provider-confirmed`だけでは高い保証のバインディングを満たしません。

## エージェント記述

### Agent Descriptionの役割

Agent Description文書はエージェントの公開入口です。他のエージェントはこれを読み、次を把握します。

- エージェントの名前、DID、所有者、説明
- 商品・サービス・文書・メディアなどの公開情報リソース
- 対応する自然言語インターフェースと構造化インターフェース
- セキュリティ要件
- 任意の文書完全性proof

ANPの情報交換モデルはクローラーに似ています。エージェントはデータ・記述・インターフェース文書のURLを公開し、他のエージェントはそれらを取得してローカルで推論し、必要な場合だけ適切なインターフェースを呼び出します。

### 情報とインターフェース

Agent Descriptionは次の2つの中心概念を使います。

- **Information**：商品説明、サービス説明、文書、動画など、外部から利用できるリソース。
- **Interface**：エージェントとやり取りする方法。
  - `NaturalLanguageInterface`：柔軟な会話インターフェース。
  - `StructuredInterface`：YAMLで記述されたAPI、OpenRPC、JSON-RPC、MCP互換インターフェース、WebRTCなどの構造化APIインターフェース。
  - `MetaProtocolInterface`：意味的な交渉のための任意の草案拡張。

構造化インターフェースでタスクを満たせる場合、精度と効率を上げるため、それを優先するべきです。自由な形式のリクエストには、引き続き自然言語インターフェースが適します。

### Agent Descriptionの例

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

> 認証について：例はANP-07の`didwba`宣言と、その中の歴史的な`Authorization`フィールドラベルを保持しています。ANP-02のリクエストヘッダー規則に代わるものではありません。新しい署名付きリクエストは`Signature-Input`、`Signature`、該当する`Content-Digest`を使います。この宣言から旧DIDWba Authorization署名方式を導かないでください。

> 注意：現行のエージェント記述仕様の例は`Infomations`というフィールド名を使います。実装は現在有効な仕様に従い、将来の版で綴りが修正される可能性にも備えてください。

## エージェント発見

エージェント発見は、エージェントと検索サービスが公開Agent Description文書を見つける方法を定義します。

### 能動的な発見

ドメインは次のパスで、すべての公開Agent Description URLを掲載できます。

```text
https://{domain}/.well-known/agent-descriptions
```

例：

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

クライアントと検索クローラーは、次のページがなくなるまで`next`をたどって取得するべきです。

### 受動的な発見

受動的な発見では、エージェントが自分のAgent Description URLを検索サービスのエージェントへ送信します。検索サービスの登録APIは、その検索サービス自身のAgent Description文書で記述します。

典型的な手順：

1. 検索サービスのエージェントのAgent Descriptionを読みます。
2. 登録インターフェースを見つけます。
3. 自分のAgent Description URLを送信します。
4. 検索サービスがその記述を検証・取得し、索引に登録します。

### Handleを入口にする

WNS Handleの解決も、発見の入口になります。

```text
alice.example.com -> DID -> DID Document -> AgentDescription service
```

ただしクライアントは、Handleからサービスエンドポイントを直接推定してはいけません。DID Documentが引き続き権威ある情報源です。

## インスタントメッセージプロトコル

ANPのエンドツーエンド・インスタントメッセージは、ドメインをまたぐエージェント間メッセージのためのProfile群です。単一の集中型チャット製品のプロトコルではなく、メッセージサービスの発見、個別・グループメッセージの送信、内容の保護、添付の転送、ドメイン間フェデレーションを定義します。

### 中心となる考え方

- **集中管理ではなくフェデレーション**：各ドメインが自分のエージェントとサービスをホストします。
- **アイデンティティを優先**：`agent_did`と`group_did`を第一の識別子とします。
- **サービス発見を優先**：DID Documentの`ANPMessageService`でメッセージエンドポイントを発見します。
- **JSON-RPC 2.0の外側バインディング**：リクエストは`jsonrpc`、`method`、`id`、オブジェクト形式の`params`を使います。
- **共通のparams形式**：多くのメソッドは`params.meta`、任意の`params.auth`、`params.body`を使います。
- **基礎意味論とE2EE Overlayを分離**：転送時だけ保護する平文モードと、エンドツーエンド暗号化モードが共存できます。
- **制御プレーンとデータプレーンを分離**：添付はManifestと独立したHTTPSオブジェクト転送を使います。

### 統一された`ANPMessageService`

現行メッセージProfileは、ドメイン間のやり取りのために、DID Documentが公開の`ANPMessageService`を1つ公開することを想定します。内部では個別・グループ・鍵・オブジェクト・フェデレーションの要素を分離しても、外部向けの能力は統一サービスエンドポイントの後ろにまとめます。

次の例は通常のDID宛てメッセージと添付能力だけを宣言し、E2EEを宣言しないため、デバイスManifestは必要ありません。

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

重要なやり取りの前に、呼出し側は次のメソッドで実行時の能力を確認するべきです。

```text
anp.get_capabilities
```

DIDの静的ヒントと実行時の能力結果が一致しない場合、実行時の結果を正とします。

`anp.direct.e2ee.v2`または候補の`anp.group.e2ee.v2`を有効にする場合、すべての依存関係とP2の現行`deviceManifest`資格規則を満たす必要があります。上のBase例にProfile文字列を1つ加えるだけでは足りず、v1セッションを黙ってv2として扱うこともできません。[メッセージの全索引](../../chinese/message/README.md)と複数デバイスの例を参照してください。

### インスタントメッセージProfile索引

[ANP Messaging 1.2索引](../../chinese/message/README.md)は9文書を含みます。通常のBase操作はDID／Group DID宛てを維持します。P4 v2はDIDのみのメンバーとHostが調整するDID更新を定義し、暗号学的なデバイスエンドポイントはP5/P6 v2で初めて導入します。P6は依然候補であり、安定版のリリースにはMLS ExtensionTypeの登録条件を満たす必要があります。

| Profile | 識別子／状態 | 役割 |
| --- | --- | --- |
| [P1 コアバインディング](../../chinese/message/01-核心绑定.md) | `anp.core.binding.v1` | JSON-RPC 2.0バインディング、`params`構造、能力交渉、冪等性、エラーモデル |
| [P2 アイデンティティと発見](../../chinese/message/02-身份与发现.md) | `anp.identity.discovery.v1` | Agent DID／Group DID、DID Documentの解釈規則、`ANPMessageService`の発見 |
| [P3 個別メッセージ基礎意味論](../../chinese/message/03-私聊基础语义.md) | `anp.direct.base.v1` | `direct.send`、内容モデル、receipt、順序、送信者証明の境界 |
| [P4 グループメッセージ基礎意味論](../../chinese/message/04-群组基础语义.md) | `anp.group.base.v2` | グループのライフサイクル、メンバーシップ、メッセージ、状態バージョン、Hostによる順序付け |
| [P5 個別メッセージE2EE](../../chinese/message/05-私聊端到端加密.md) | `anp.direct.e2ee.v2` | DIDに結び付いた鍵素材とRatchetの考え方による個別メッセージのE2EE |
| [P6 グループE2EE](../../chinese/message/06-群组端到端加密.md) | `anp.group.e2ee.v2`；候補 | MLSによるグループE2EEとグループ暗号状態 |
| [P7 添付とオブジェクト転送](../../chinese/message/07-附件与对象传输.md) | `anp.attachment.v1` | 添付Manifest、オブジェクトサービス、アップロード／ダウンロードticket、オブジェクト単位の暗号化 |
| [P8 フェデレーションとドメイン間通信](../../chinese/message/08-联邦与跨域.md) | `anp.federation.relay.v1` | ドメインをまたぐサービス呼出し、ルーティング、中継、結果の立会い証明 |
| [P9 メッセージMention拡張](../../chinese/message/09-消息Mention扩展.md) | v1 binding；独立Profileなし | 構造化グループメッセージのmentionとselectorの意味論 |

推奨順序は、ANP-02と適用するメソッドバインディング、P1/P2、P3/P4、P5/P6、最後に必要に応じてP7/P8/P9です。

## プロトコルSDK：AgentConnect

ANPのオープンソースSDKと参照実装はAgentConnectで管理しています。

- [https://github.com/agent-network-protocol/AgentConnect](https://github.com/agent-network-protocol/AgentConnect)

AgentConnectは、アイデンティティ、認証、proof、WNS、Agent Description、OpenRPC／JSON-RPC、クロール、AP2、E2EEと各種例を支援します。

次の表は2026-06-27時点のSDKパッケージ案内のスナップショットです。現在のレジストリ状態やANP 1.2適合一覧ではありません。実際のパッケージ名、版、対応Profile、有効化状態は、SDKリポジトリと各実装の検証を正としてください。

| 言語 | パッケージ／モジュール | 始め方 | 状態 |
| --- | --- | --- | --- |
| Python | `anp` | `pip install anp`または`pip install "anp[api]"` | 安定版SDK |
| Go | `github.com/agent-network-protocol/anp/golang` | `go get github.com/agent-network-protocol/anp/golang@latest` | 安定版SDK |
| Rust | `anp` | `cargo add anp` | 安定版SDK |
| Dart | `anp` | `dart pub add anp` | リリース済みSDK |
| TypeScript | `@anp/typescript-sdk` workspace | `typescript/ts_sdk`のソースからビルド | プレビュー／ローカルソース |
| Java | `com.agentconnect:anp4j`とSpring Boot starter | `java`のソースからビルド | ローカルSDK |

### OpenANPで最小のPythonエージェントを作る

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

よく自動生成されるエンドポイント：

| エンドポイント | 用途 |
| --- | --- |
| `GET /agent/ad.json` | Agent Description文書 |
| `GET /agent/interface.json` | OpenRPCインターフェース文書 |
| `POST /agent/rpc` | JSON-RPC 2.0メソッド呼出し |

## 推奨する読み進め方

1. [README.cn](../../README.cn.md)で現在の仕様索引とアーキテクチャを確認します。
2. まず[ANP-02：DIDに基づく認証](../../chinese/02-ANP-基于DID的身份认证协议.md)を読み、次にメソッドに応じて[ANP-03：did:wba](../../chinese/03-did-wba方法规范.md)か[ネイティブdid:web統合付録](../../chinese/附录B：与原生did-web-的兼容.md)を読みます。人間が読める命名が必要なら、[ANP-04：WNS](../../chinese/04-ANP-基于DID-WBA的命名空间规范.md)へ進みます。
3. [ANP-07：エージェント記述](../../chinese/07-ANP-智能体描述协议规范.md)と[ANP-08：エージェント発見](../../chinese/08-ANP-智能体发现协议规范.md)を読み、エージェントを公開・発見します。
4. メッセージ機能を作る場合、[ANP-09](../../chinese/09-ANP-端到端即时消息协议规范.md)と各メッセージProfileを読みます。
5. [AgentConnect](https://github.com/agent-network-protocol/AgentConnect)で動作する実装を構築・テストします。

### ANPの流れの詳細

ANP全体の流れは次のとおりです。

![](../../../images/anp-flow.png)

主な手順は次のとおりです。

1. **エージェント発見**：検索エンジンが発見機構（`.well-known/agent-descriptions`）を使い、エージェントBの記述文書URL、名前などの基本情報をクロールします。

2. **エージェント検索**：エージェントAが検索エンジンでBの記述文書URLを見つけます。具体的なドメイン名を知らなくても、意味的な検索で適切なサービス提供者を見つけられます。

3. **認証リクエスト**：Aは自分の秘密鍵でリクエストに署名し、自分のDIDを添えてBへ記述文書やサービスを要求します。署名はリクエストの真正性と完全性を保証します。

4. **アイデンティティ認証**：Bはリクエスト内のDIDでAのDID文書を取得し、公開鍵を取り出して署名の有効性を検証し、Aの身元を確認します。

5. **サービスのやり取り**：認証と、独立した業務認可の確認に通ると、Bが要求されたデータやサービス応答を返します。Aはそのデータでホテル予約や情報照会などを完了します。全体が標準化されたインターフェースとデータ形式に基づくため、プラットフォーム間の相互運用性が確保されます。

DIDによる認証と標準化された記述文書により、エージェントは集中型プラットフォームに依存せず、インターネットで安全かつ効率的に互いを発見し、やり取りできます。
