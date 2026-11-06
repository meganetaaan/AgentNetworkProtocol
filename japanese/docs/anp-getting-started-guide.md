<!-- translation-method: manual -->
> 日本語参考訳（手動翻訳）。規範となるのは原文です。コード例・識別子は原文を保持しています。
> 原文: [docs/anp-getting-started-guide.md](../../docs/anp-getting-started-guide.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

<a id="anp-getting-started-guide"></a>
# ANP 入門ガイド

- 仕様セット: ANP 1.2

<a id="overview"></a>
## 概要

<a id="what-is-anp"></a>
### ANPとは

ANP（Agent Network Protocol）は、Agentic Webのためのオープンなプロトコル群です。公開インターネット上のエージェントが互いの身元を確認し、機能を公開し、サービスを発見し、利用可能なインターフェースを交渉し、安全なメッセージを交換し、アプリケーションレベルで協働できるように設計されています。

このガイドは、現在の作業ツリーにあるANP 1.2の文書セットに基づきます。コア仕様とメッセージング仕様は、次の事項を扱います。

- `did:wba`とネイティブの`did:web`に対する[ANP-02 共通DIDリクエスト認証](../02-anp-did-authentication-protocol-specification.md)
- ANP-03のWBAメソッドの規則とアイデンティティの継続性
- WNS（WBA Name Space）の人間が読めるハンドル
- Agent Description文書
- Agent Discovery文書と検索登録
- エンドツーエンドのインスタントメッセージングプロファイル

ANP-06は引き続きドラフトです。P6 Group E2EEは全文を収録していますが、安定した登録済みMLS ExtensionTypeを待つ候補のままであり、暫定値`0xF0A1`に関するリリース条件も撤廃されていません。AP2決済適応仕様は独立してバージョン管理されており、引き続きドラフト／未リリースです。

文書のステータスは、SDKや製品での実装、適合性、公開機能の有効化、タグ／GitHub Releaseの完了を示すものではありません。

> バージョンに関する注記: `Version: 1.2`は仕様／文書のバージョンであり、通信上のバージョンではありません。P1/P2/P3/P7/P8は`.v1`を維持し、P4/P5/P6はvNextですでに定義された`.v2`の契約を使用します。P9は独立した`meta.profile`を持たず、v1のバインディング拡張を維持します。`protocolVersion`などのフィールドはそれぞれを定義する仕様に従い、全体で一律に番号を付け直すことはありません。

<a id="why-anp-is-needed"></a>
### ANPが必要な理由

現在、ほとんどのAIエージェントとネットワークサービスのやり取りは、人間のブラウザー操作を模倣する、プラットフォーム固有のAPIを使う、単一アプリケーションのエコシステム内にとどまる、という三つの限られた方法のいずれかに依存しています。ANPは、プロトコルを中心とする別の方法を提供します。

- **相互接続**: 異なるドメインのエージェントが、互いに認証、発見、通信できます。
- **ネイティブなインターフェース**: エージェントは、人間向けのWebページを読むだけでなく、機械可読な記述、インターフェース文書、JSON-RPC／OpenRPC形式の呼び出しを利用できます。
- **安定したアイデンティティと名前**: DIDは検証可能な暗号学的アイデンティティを提供し、WNSハンドルは人間に扱いやすい名前を提供します。
- **安全なメッセージング**: ダイレクトメッセージ、グループメッセージ、添付ファイル、フェデレーション、エンドツーエンド暗号化を、階層化されたプロファイルとして規定します。
- **オープンな実装経路**: ANPはHTTP、DNS、TLS、JSON、JSON-LD、DIDと、既存のWeb配備パターンを再利用します。

<a id="example-cross-platform-hotel-booking"></a>
### 例: プラットフォームをまたぐホテル予約

パーソナルアシスタントがホテルの客室を予約する必要があるとします。ANPがなければ、Webサイトのスクレイピング、プラットフォームのアカウントによるログイン、ベンダー固有APIとの連携が必要になるかもしれません。

ANPでは、次のように進みます。

1. パーソナルアシスタントは自身のDIDを持ち、人間が読めるWNSハンドルを持つこともできます。
2. 検索、`.well-known/agent-descriptions`、またはハンドルを使ってホテルのエージェントを発見します。
3. ホテルのエージェントのAgent Description文書を読み、商品、サービス、インターフェースを理解します。
4. サポートされている`did:wba`またはネイティブの`did:web`のアイデンティティで、ANP-02に従いリクエストを認証します。サービスは業務上の権限を別途判断します。
5. 予約には構造化インターフェースを、特別な要望には自然言語インターフェースを利用できます。
6. 決済や人間による承認が必要な場合、その要件はインターフェースの記述で明示され、対応するアプリケーションプロトコルが処理します。

<a id="relationship-with-mcp-and-a2a"></a>
### MCPおよびA2Aとの関係

ANPは、他のエージェントプロトコルと補完関係にあります。

- **MCP（Model Context Protocol）**は、モデルやエージェントホストをツールやリソースに接続します。
- **A2A系のプロトコル**は、管理された環境でのタスク協働に重点を置くことが一般的です。
- **ANP**は、公開インターネットをまたぐアイデンティティ、名前付け、発見、安全な通信、アプリケーションの協働に重点を置きます。

目安として、ツールの接続にはMCP、管理されたワークフローには企業向け協働プロトコル、エージェントがドメインをまたいで互いを発見・通信する場合にはANPを使います。

<a id="current-anp-architecture"></a>
## 現在のANPアーキテクチャ

最新のREADMEのアーキテクチャでは、リリース済みのANP機能を、既存のインターネット基盤、二つのコアプロトコル層、分野別のアプリケーションプロトコルに整理しています。

![ANPのプロトコルアーキテクチャ](../../images/anp-architecture2.png)

<a id="open-internet-infrastructure"></a>
### オープンなインターネット基盤

ANPはインターネットのスタックを作り直しません。次のものを再利用します。

- 通信のためのHTTP／HTTPS
- 到達可能性のためのDNSとドメイン名
- Webのセキュリティの信頼基盤としてのCA／TLS
- 静的文書のためのCDNとホスティング基盤
- 公開情報の発見のための検索エンジンとクローラー

<a id="identity-and-encrypted-communication-layer"></a>
### アイデンティティ・暗号化通信層

この層は、**エージェントは誰か、相手はそれをどう検証できるか、メッセージをどう保護できるか**という問いに答えます。

次のものを含みます。

- W3C DIDに基づくアイデンティティ
- ANP-03の`did:wba`メソッドの規則とネイティブの`did:web`メソッドのバインディング
- ANP-02のHTTP Message Signatures／JSON認証メタデータの伝達
- DID Documentによるサービス発見
- 署名用の鍵と鍵合意用の鍵の分離
- ダイレクト／グループメッセージングのエンドツーエンド暗号化の基盤

<a id="application-protocol-layer"></a>
### アプリケーションプロトコル層

この層は、**エージェントは何ができるか、どう見つけられるか、どのアプリケーションプロトコルを使うべきか**という問いに答えます。

次のものを含みます。

- Agent Description Protocol
- Agent Discovery Protocol
- インスタントメッセージングのプロファイル
- 決済、認可、認証、取引などのアプリケーションプロトコル

<a id="meta-protocol-status"></a>
### メタプロトコルのステータス

ANP-06はドラフトです。改訂後の方向性は、Agent Descriptionを起点とする意味的な交渉です。

```text
Agent Description -> MetaProtocolInterface -> anp.get_capabilities -> anp.negotiate
```

リリース済みの経路でも、DIDによるサービス発見、Agent Description文書、宣言されたインターフェース、メッセージングプロファイルを通じて、エージェントはすでに相互運用できます。実装が明示的に対応していない限り、`MetaProtocolInterface`と`anp.negotiate`は任意のドラフト機能として扱ってください。

<a id="how-agents-connect"></a>
## エージェントの接続方法

典型的なANPの接続経路は次のとおりです。

```text
WNS Handle or Search Result
  -> DID
  -> DID Document
  -> AgentDescription / ANPMessageService
  -> Runtime capabilities
  -> Business interface or messaging profile
```

重要な役割分担は次のとおりです。

- **WNS Handle**は、人間が読める名前です。
- **DID**は、暗号学的なアイデンティティの基点です。
- **DID Document**は、検証メソッドとサービスエンドポイントの正規の情報源です。
- **Agent Description**は、エージェントの公開情報と利用可能なインターフェースを説明します。
- **ANPMessageService**は、インスタントメッセージングのプロファイル群が使用する、統一されたメッセージング・対話エンドポイントです。
- **実行時の機能交渉**は、エンドポイントが現在何をサポートしているかを確認します。

<a id="identity-didwba"></a>
## アイデンティティ: `did:wba`

<a id="authentication-model"></a>
<a id="separate-authentication-from-did-methods"></a>
### 認証とDIDメソッドを分ける

[ANP-02](../02-anp-did-authentication-protocol-specification.md)は共通のリクエスト認証を定義します。[ANP-03](../03-did-wba-method-design-specification.md)はWBA識別子、DID Document、解決、鍵のバインディング、移行を定義します。[ネイティブdid:web統合の付録](../appendix-b-compatibility-with-native-did-web.md)では、WBAへの変換やWBA固有のルート証明の要件なしに、Webのアイデンティティが同じ認証・メッセージングの契約を利用する方法を説明します。

通常のAPI認証にWNS、メッセージングプロファイル、`deviceManifest`は必要ありません。以下のWBAの例は、他のDIDメソッドに追加要件を課すものではありません。`did:webvh`などのメソッドには、そのメソッド用のバインディングと実装の対応が必要です。DID Core互換であることだけでは、その対応は意味しません。

<a id="what-didwba-provides"></a>
### `did:wba`が提供するもの

`did:wba`は、ANPのWebベースのDIDメソッドです。通常のWeb基盤を利用しながら、エージェントに分散型のアイデンティティを与えます。

ルートドメインのDID:

```text
did:wba:example.com
```

は、次のURLに解決されます。

```text
https://example.com/.well-known/did.json
```

既定の`e1_`プロファイルを使うパスDID:

```text
did:wba:example.com:user:alice:e1_<fingerprint>
```

は、次のURLに解決されます。

```text
https://example.com/user/alice/e1_<fingerprint>/did.json
```

ドメインにポート番号を含む場合、DID内のコロンはパーセントエンコードされます。

```text
did:wba:example.com%3A3000:user:alice:e1_<fingerprint>
```

<a id="root-did-vs-path-did"></a>
### ルートDIDとパスDID

- `did:wba:example.com`のような**ルートドメインのDID**は、通常、ドメイン単位の主体やサービスのアイデンティティを表します。
- `did:wba:example.com:user:alice:e1_<fingerprint>`のような**パスDID**は、ドメイン配下の特定の主体を表します。
- 新しいパスDIDでは、既定の`e1_` Ed25519バインディングフィンガープリントプロファイルを使うべきです。
- バインディング鍵が変わると、パスDIDがローテーションすることがあります。WNSハンドルは、人間が読める安定した参照を提供できます。ただし、安定した主体パスが一致することも、ハンドルが新しいDIDに解決されることも、それ単独で権限の継続性を証明するものではありません。以前に信頼していたDIDからのANP-03移行チェーンを検証し、その後、業務ポリシーを適用してください。

<a id="minimal-did-document-shape"></a>
### 最小限のDID Documentの形

DID Documentは鍵とサービスを公開します。ANPで一般的なサービスタイプは次のとおりです。

- `AgentDescription`: エージェントの`ad.json`文書を指します。
- `ANPHandleService`: WNSの双方向バインディング検証をサポートします。
- `ANPMessageService`: 統一されたANPメッセージング／対話エンドポイントを公開します。

例:

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

<a id="authentication-flow"></a>
### 認証の流れ

共通の流れは、[ANP-02のHTTPリクエスト認証](../../02-anp-did-authentication-protocol-specification.md#http-binding)に従います。

1. エージェントAは、`authentication`によって認められた鍵を使い、`Signature-Input`と`Signature`を用いて署名します。リクエスト本文がある場合は、計算して署名した`Content-Digest`も必要です。
2. エージェントBは、AのDID Documentをそのメソッドの規則に従って解決・検証し、`keyid`と認証鍵の使用権限を確認します。
3. Bは実際のHTTPリクエストから署名ベースを再構築し、署名、ダイジェスト、署名対象範囲、時間枠、リプレイ保護を検証します。
4. Bは業務上の権限を独立して確認します。認証は、操作の認可や人間による承認の証拠ではありません。
5. 任意のトークンフローは、ANP-02とサービスポリシーに従います。メッセージのorigin proofは、P1と該当プロファイルが別途規定します。

<a id="name-service-wns-handles"></a>
## 名前サービス: WNSハンドル

<a id="why-wns-exists"></a>
### WNSが存在する理由

DIDは機械用の信頼できる識別子ですが、人間が入力、記憶、共有するには便利ではありません。WNS（WBA Name Space）は、`did:wba`の上に、安定した、人間が読める名前の層を追加します。

ハンドルの例:

```text
alice.example.com
```

任意で利用できる共有形式:

```text
wba://alice.example.com
```

ハンドルをDIDに解決し、次にDIDをDID Documentに解決します。

```text
Handle -> Handle Resolution Endpoint -> DID -> DID Document -> service
```

<a id="handle-resolution-endpoint"></a>
### ハンドル解決エンドポイント

`alice.example.com`の標準エンドポイントは次のとおりです。

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
    "description": "A travel planning agent",
    "avatar_uri": "https://example.com/avatars/alice.png",
    "discoverability": "listed"
  }
}
```

次の規則はWBA WNSの主流の方式を説明しています。ネイティブのWebでは、[付録B](../../appendix-b-compatibility-with-native-did-web.md#legacy-web-handle)の、より弱いドメイン宣言による互換性モデルを使用し、これは`exact-handle`を確立しません。

- 最上位の`did`が、正規のアイデンティティ解決結果です。
- `profile`は、公開表示用のメタデータに限られます。
- `profile`を認証、認可、ルーティング、E2EEのバインディング、サービスエンドポイントの選択に使ってはなりません。
- セキュリティ上重要な用途でWBAハンドルを利用する場合、クライアントはDID Documentの`ANPHandleService`を通じてハンドルとDIDのバインディングを検証しなければなりません。通常のDIDベースのAPI認証にはハンドルは必要ありません。
- 特定のハンドルを信頼する必要がある場合は、`exact-handle`の検証が必要です。高い保証を持つハンドルのバインディングには、`provider-confirmed`だけでは不十分です。

<a id="agent-description"></a>
## Agent Description

<a id="what-an-agent-description-does"></a>
### Agent Descriptionの役割

Agent Description文書は、エージェントの公開入り口となるページです。他のエージェントはこの文書を読み、次の事項を理解します。

- エージェントの名前、DID、所有者、説明
- 商品、サービス、文書、メディアなどの公開情報リソース
- 対応する自然言語インターフェースと構造化インターフェース
- セキュリティ要件
- 任意の、文書の完全性を示す証明

ANPの情報交換はクローラーに似た方式です。エージェントはデータ、説明、インターフェース文書のURLを公開し、他のエージェントはそれらのリソースを取得して手元で推論し、必要なときだけ適切なインターフェースを呼び出します。

<a id="information-and-interfaces"></a>
### 情報とインターフェース

Agent Descriptionは、二つの中心的な概念を使います。

- **Information（情報）**: 商品説明、サービス説明、文書、動画、その他のデータなど、外部から利用できるリソース。
- **Interface（インターフェース）**: エージェントとやり取りする方法。
  - `NaturalLanguageInterface`: 柔軟な会話インターフェース。
  - `StructuredInterface`: YAMLで記述されたAPI、OpenRPC、JSON-RPC、MCP互換インターフェース、WebRTCなどの構造化APIインターフェース。
  - `MetaProtocolInterface`: 意味的な交渉のための任意のドラフト拡張。

構造化インターフェースでタスクを満たせる場合、エージェントは精度と効率のためにそれを優先するべきです。自然言語インターフェースは、自由度の高い依頼にも有用です。

<a id="agent-description-example"></a>
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
  "description": "An intelligent hospitality agent for room booking, concierge services, guest assistance, and messaging.",
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
      "description": "Luxury hotel rooms with premium amenities and personalized services.",
      "url": "https://grand-hotel.com/products/luxury-rooms.json"
    },
    {
      "type": "Information",
      "description": "Hotel facilities, amenities, location, and policies.",
      "url": "https://grand-hotel.com/info/hotel-basic-info.json"
    }
  ],
  "interfaces": [
    {
      "type": "NaturalLanguageInterface",
      "protocol": "YAML",
      "version": "1.2.2",
      "url": "https://grand-hotel.com/api/nl-interface.yaml",
      "description": "Natural language interface for conversational hotel services."
    },
    {
      "type": "StructuredInterface",
      "protocol": "openrpc",
      "url": "https://grand-hotel.com/api/booking-openrpc.json",
      "humanAuthorization": true,
      "description": "Structured interface for booking and reservation management."
    },
    {
      "type": "MetaProtocolInterface",
      "profile": "anp.meta.negotiation.v1",
      "binding": "jsonrpc-2.0",
      "url": "https://grand-hotel.com/anp",
      "methods": ["anp.get_capabilities", "anp.negotiate"],
      "description": "Optional draft negotiation interface."
    }
  ]
}
```

> 認証に関する注記: この例は、ANP-07の`didwba`宣言と、旧来の`Authorization`フィールドのラベルを保持しています。ANP-02のリクエストヘッダーの規則に置き換わるものではありません。新しい署名付きリクエストでは、`Signature-Input`、`Signature`、必要に応じて`Content-Digest`を使います。この宣言から、旧来のDIDWba認証方式を推定してはなりません。

> 注記: 現在のAgent Description仕様の例では、`Infomations`というフィールド名を使っています。実装は現行仕様に従いつつ、将来のバージョンで綴りが修正される場合の互換性に注意するべきです。

<a id="agent-discovery"></a>
## Agent Discovery

Agent Discoveryは、エージェントや検索サービスが公開Agent Description文書を発見する方法を定義します。

<a id="active-discovery"></a>
### 能動的な発見

ドメインは、すべての公開Agent Description URLを次の場所で公開できます。

```text
https://{domain}/.well-known/agent-descriptions
```

例:

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

クライアントと検索クローラーは、すべてのページを取得するまで`next`をたどるべきです。

<a id="passive-discovery"></a>
### 受動的な発見

受動的な発見では、エージェントが自分のAgent Description URLを検索サービスのエージェントに送信します。検索サービスの登録APIは、その検索サービスのエージェント自身のAgent Description文書に記述されます。

典型的な受動的発見の流れ:

1. 検索サービスのエージェントのAgent Descriptionを読みます。
2. その登録インターフェースを探します。
3. 自分のAgent Description URLを送信します。
4. 検索サービスが記述を検証、クロール、索引付けします。

<a id="handle-based-entry"></a>
### ハンドルを入り口にする

WNSハンドルの解決も、発見の入り口として利用できます。

```text
alice.example.com -> DID -> DID Document -> AgentDescription service
```

ただし、クライアントはハンドルからサービスエンドポイントを直接推定してはなりません。DID Documentが引き続き正規の情報源です。

<a id="instant-messaging-protocol"></a>
## インスタントメッセージングプロトコル

ANPのエンドツーエンドのインスタントメッセージングは、ドメインをまたぐエージェントのメッセージングのためのプロファイル群です。単一の中央集権的なチャット製品のプロトコルではありません。エージェントがメッセージングサービスを発見し、ダイレクト／グループメッセージを送り、内容を保護し、添付ファイルを転送し、ドメイン間で連携する方法を定義します。

<a id="core-ideas"></a>
### 中心となる考え方

- **分散連携型**: 異なるドメインが、それぞれのエージェントとサービスをホストします。
- **アイデンティティを基盤にする**: `agent_did`と`group_did`が主な識別子です。
- **まずサービスを発見する**: DID Documentの`ANPMessageService`エントリーを通じて、メッセージングのエンドポイントを発見します。
- **JSON-RPC 2.0の外側のバインディング**: リクエストは`jsonrpc`、`method`、`id`、オブジェクト形式の`params`を使います。
- **共通のparams構造**: ほとんどのメソッドは、`params.meta`、任意の`params.auth`、`params.body`を使います。
- **基本セマンティクスとE2EEオーバーレイを分ける**: 平文をトランスポートで保護するモードと、E2EEモードは共存できます。
- **制御プレーンとデータプレーンを分ける**: 添付ファイルはマニフェストと、別個のHTTPSオブジェクト転送を使います。

<a id="unified-anpmessageservice"></a>
### 統一された`ANPMessageService`

現在のメッセージングプロファイルは、DID Documentがドメイン間のやり取りのために一つの公開`ANPMessageService`を提示することを想定しています。実装の内部では、ダイレクトメッセージ、グループ、鍵、オブジェクト、フェデレーションを個別のコンポーネントに分けてもかまいませんが、外部には統一されたサービスエンドポイントを通じてこれらの機能を提供します。

この例は、通常のDID宛てのメッセージングと添付ファイルの機能だけを宣言しており、E2EEやデバイスマニフェストの要件はありません。

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

重要なやり取りを行う前に、呼び出し側は次を使って実行時の機能を確認するべきです。

```text
anp.get_capabilities
```

静的なDIDのヒントと実行時の機能確認結果が異なる場合、実行時の結果が正規の情報となります。

`anp.direct.e2ee.v2`または候補である`anp.group.e2ee.v2`を有効にするには、依存関係をすべて満たし、P2の現行`deviceManifest`の適格性の規則に従う必要があります。基本モードの例にProfile文字列を追加するだけでは不十分であり、v1のセッションを黙ってv2として解釈してはなりません。[メッセージングの全体索引](../message/README.md)と、そこにある複数デバイスの例を参照してください。

<a id="messaging-profile-index"></a>
### メッセージングプロファイルの索引

[ANP Messaging 1.2の索引](../message/README.md)には九つの文書があります。通常の基本操作では、引き続きDID／Group DIDを宛先にします。P4 v2はDIDだけに基づくメンバーシップと、Hostが調整するDID更新を定義します。暗号学的なデバイスエンドポイントを導入するのはP5/P6 v2だけです。P6は、登録済みMLS ExtensionTypeというリリース条件を満たすまで、候補のままです。

| Profile | 識別子／ステータス | 目的 |
| --- | --- | --- |
| [P1 コアバインディング](../message/01-core-binding.md) | `anp.core.binding.v1` | JSON-RPC 2.0バインディング、`params`の構造、機能交渉、冪等性、エラー |
| [P2 アイデンティティと発見](../message/02-identity-and-discovery.md) | `anp.identity.discovery.v1` | Agent DID／Group DID、DID Documentの解釈、`ANPMessageService`の発見 |
| [P3 ダイレクトメッセージングの基本セマンティクス](../message/03-direct-messaging-base-semantics.md) | `anp.direct.base.v1` | `direct.send`、内容モデル、受領証、順序付け、送信者証明の境界 |
| [P4 グループメッセージングの基本セマンティクス](../message/04-group-messaging-base-semantics.md) | `anp.group.base.v2` | グループのライフサイクル、メンバーシップ、グループメッセージ、グループ状態のバージョン、Hostによる順序付け |
| [P5 ダイレクトのエンドツーエンド暗号化](../message/05-direct-end-to-end-encryption.md) | `anp.direct.e2ee.v2` | DIDにバインドされた鍵素材とラチェットの考え方を使うダイレクトE2EE |
| [P6 グループのエンドツーエンド暗号化](../message/06-group-end-to-end-encryption.md) | `anp.group.e2ee.v2`; 候補 | MLSベースのグループE2EEとグループの暗号学的状態 |
| [P7 添付ファイルとオブジェクト転送](../message/07-attachments-and-object-transfer.md) | `anp.attachment.v1` | 添付ファイルのマニフェスト、オブジェクトサービス、アップロード／ダウンロードチケット、オブジェクト単位の暗号化 |
| [P8 フェデレーションとドメイン間通信](../message/08-federation-and-cross-domain.md) | `anp.federation.relay.v1` | ドメインをまたぐサービス呼び出し、ルーティング、中継、結果の証言 |
| [P9 メッセージのメンション拡張](../message/09-message-mentions.md) | v1バインディング。独立したProfileはなし | グループメッセージの構造化メンションとセレクターのセマンティクス |

推奨する読む順序は、最初にANP-02と適用するメソッドのバインディング、次にP1/P2、P3/P4、P5/P6、必要に応じてP7/P8/P9です。

<a id="protocol-sdk-agentconnect"></a>
## プロトコルSDK: AgentConnect

ANPのオープンソースSDKと参照実装は、AgentConnectで保守されています。

- [https://github.com/agent-network-protocol/AgentConnect](https://github.com/agent-network-protocol/AgentConnect)

AgentConnectは、アイデンティティ、認証、証明、WNS、Agent Description、OpenRPC／JSON-RPC、クロール、AP2、E2EE、サンプルについてSDKの機能を提供します。

次の表は、2026-06-27に確認した過去のSDK案内のスナップショットであり、現在のレジストリの状況やANP 1.2の適合性マトリクスではありません。パッケージ名、バージョン、Profileへの対応、有効化の状況は、SDKリポジトリと実装の検証証拠で確認してください。

| 言語 | パッケージ／モジュール | 始め方 | ステータス |
| --- | --- | --- | --- |
| Python | `anp` | `pip install anp`または`pip install "anp[api]"` | 安定した公開SDK |
| Go | `github.com/agent-network-protocol/anp/golang` | `go get github.com/agent-network-protocol/anp/golang@latest` | 安定した公開SDK |
| Rust | `anp` | `cargo add anp` | 安定した公開SDK |
| Dart | `anp` | `dart pub add anp` | 公開SDK |
| TypeScript | `@anp/typescript-sdk`ワークスペース | `typescript/ts_sdk`のソースからビルド | プレビュー／ローカルソース |
| Java | `com.agentconnect:anp4j`とSpring Boot starter | `java`のソースからビルド | ローカルSDK |

<a id="minimal-python-agent-with-openanp"></a>
### OpenANPを使った最小限のPythonエージェント

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

典型的に生成されるエンドポイント:

| エンドポイント | 目的 |
| --- | --- |
| `GET /agent/ad.json` | Agent Description文書 |
| `GET /agent/interface.json` | OpenRPCインターフェース文書 |
| `POST /agent/rpc` | JSON-RPC 2.0のメソッド呼び出し |

<a id="recommended-reading-path"></a>
## 推奨する学習順序

1. 現在の仕様索引とアーキテクチャについて、[README](../README.md)を読みます。
2. 最初に[ANP-02: DID認証](../02-anp-did-authentication-protocol-specification.md)を読み、適用するメソッドに応じて[ANP-03: did:wba](../03-did-wba-method-design-specification.md)または[ネイティブdid:web統合の付録](../appendix-b-compatibility-with-native-did-web.md)を読みます。人間が読める名前が必要な場合は、[ANP-04: WNS](../04-anp-did-wba-name-space-specification.md)を読みます。
3. エージェントを公開・発見するために、[ANP-07: Agent Description](../07-anp-agent-description-protocol-specification.md)と[ANP-08: Agent Discovery](../08-ANP-Agent-Discovery-Protocol-Specification.md)を読みます。
4. メッセージングを実装する場合は、[ANP-09](../09-ANP-end-to-end-instant-messaging-protocol-specification.md)とメッセージングプロファイルを読みます。
5. 動作する実装の作成やテストには、[AgentConnect](https://github.com/agent-network-protocol/AgentConnect)を利用します。

<a id="anp-process-detailed-explanation"></a>
### ANPの処理の詳細

ANP全体の処理は次のとおりです。

![](../../images/anp-flow.png)

ANPの処理は、主に次の手順で進みます。

1. **エージェントの発見**: 検索エンジンが、エージェント発見の仕組み（`.well-known/agent-descriptions`）を通じて、エージェントBの説明文書URL、名前などの基本情報をクロールします。

2. **エージェントの検索**: エージェントAは、検索エンジンを通じてエージェントBの説明文書URLを見つけます。この手順により、相手の具体的なドメインを知らなくても、意味的な検索で適切なサービス提供者を発見できます。

3. **認証リクエスト**: エージェントAは、自身の秘密鍵でリクエストに署名し、自分のDID識別子を添えて、エージェントBに説明文書やサービスを要求します。署名により、リクエストの真正性と完全性を保証します。

4. **認証**: エージェントBはリクエストを受信したら、リクエスト内のDID識別子からエージェントAのDID文書を取得し、そこから公開鍵を取り出してリクエスト署名の有効性を検証し、エージェントAの身元を確認します。

5. **サービスのやり取り**: 認証と独立した業務認可の確認が成功した後、エージェントBは要求されたデータやサービスの応答を返します。エージェントAは返されたデータに基づいて、ホテルの予約、情報照会などのタスクを完了します。処理全体は標準化されたインターフェースとデータ形式に基づき、プラットフォームをまたぐ相互運用性を確保します。

DIDに基づく認証と標準化された説明文書を使うこの方法によって、エージェントは中央集権的なプラットフォームに依存せずに、インターネット上で互いを安全かつ効率的に発見し、やり取りできます。
