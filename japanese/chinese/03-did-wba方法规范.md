<!-- translation-review: full; source=chinese/03-did-wba方法规范.md; basis=complete source-based manual translation of all prose, references and reading of all examples -->
> 日本語参考訳（機械翻訳を基に原文全文を照合済み）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [chinese/03-did-wba方法规范.md](../../chinese/03-did-wba方法规范.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# did:wba メソッド仕様

- 文書番号：ANP-03
- タイトル：did:wba メソッド仕様
- 状態：公開済み
- バージョン：1.2
- 原文言語：中国語（このファイルは日本語参考訳）。
- 適用範囲：本仕様は、ANP の Web に基づく分散型アイデンティティ、プラットフォーム間の認証、およびエージェント通信の場面に適用します。

> ANP 1.2 の公開説明：汎用の DID 認証は ANP-02 が定義します。DID メソッドと命名規則は、引き続きそれぞれの仕様が規定します。英語版は、[did:wba メソッド仕様](../03-did-wba-method-design-specification.md)です。

## 要旨

wba DID メソッドは、プラットフォーム間認証とエージェント通信の需要を満たすための、Web に基づく分散型識別子（DID）の仕様です。did:web を拡張・最適化して did:wba と名付け、互換性を維持しながら、エージェント向けの適合性を高めます。

本仕様では、パス付き did:wba のデフォルト方式として、DID パスに束縛公開鍵の指紋を含め、DID とユーザー自身が保持する秘密鍵の関係を強化します。現在のバージョンの**デフォルト profile**は、以下です。

- `e1_`：Ed25519 公開鍵に束縛します。新しい配置に推奨し、W3C 標準の Data Integrity EdDSA proof と直接統合できます。

ウォレットのエコシステムと、既存の secp256k1 実装との互換性のため、本仕様は、付録 A に、**デフォルトではない互換拡張 profile**も定義します。

- `k1_`：secp256k1 公開鍵に束縛します。主に、ウォレットのエコシステムと既存の Web3 鍵体系との互換性に使います。

汎用の HTTP/JSON 認証は、現在 [ANP-02](02-ANP-基于DID的身份认证协议.md) が定義し、本仕様は WBA メソッドの規則を提供します。ネイティブ Web のメソッドバインディング、命名、およびメッセージの組合せは、[付録 B](附录B：与原生did-web-的兼容.md)を参照してください。

## 1. はじめに

### 1.1 前書き

wba DID メソッド仕様は、分散型識別子 V1.0 [[DID-CORE](https://www.w3.org/TR/did-core/)] が定める要件に従います。

本仕様は、did:web を基に、WBA の文書、束縛、およびライフサイクルの規則を定義し、ANP-02 を通じて汎用認証に接続します。

did:web メソッドは、主にネイティブ Web DID の場面を対象とするため、その将来の発展がエージェント通信に完全に適するとは限りません。また、本仕様は、エージェント通信向けに特化した変更を行っています。これらの変更について、元の著者と合意することも長期的な過程になるため、新しいメソッド名を使うことにしました。

将来、did:wba 仕様を did:web 仕様に統合する可能性も排除せず、この目標の実現を働きかけます。

did:wba が参照する did:web メソッド仕様は、[https://w3c-ccg.github.io/did-method-web](https://w3c-ccg.github.io/did-method-web) の、2024 年 7 月 31 日版です。管理を容易にするため、現在 did:wba が使用する did:web 仕様のバックアップを用意しています：[did:web メソッド仕様](../../references/did_web-method-specification.html)。

### 1.2 設計原則

did:wba の設計の中心原則は、成熟した既存技術と整った Web 基盤を十分に利用しながら、分散化も実現することです。did:wba は、email のように、各プラットフォームが自身のアカウント体系を集中的に実装しつつ、プラットフォーム間で相互接続・相互運用できるようにします。

パス付き DID では、DID パスに束縛公開鍵の指紋を含めることを、デフォルト方式と定めます。主な目的は、ユーザーが自身の秘密鍵を実際に掌握し、DID と実際に制御する公開鍵との間に、安定した独立検証可能な束縛を形成することです。プラットフォームが DID 文書をホストする場合も、ユーザーや検証者は、DID 自体から、期待する公開鍵に対応するかを検証でき、プラットフォームがアイデンティティ公開鍵を暗黙に置換するリスクを下げられます。

標準の相互運用性とエコシステムの互換性の均衡を取るため、現在のバージョンは、**主仕様のデフォルトは e1_、互換拡張は k1_ をサポート**という構造を採ります。

- `e1_`：Ed25519 公開鍵に束縛し、新しい配置に推奨します。W3C Data Integrity EdDSA 標準と直接統合でき、did:wba の長期の標準化の主要経路に適します。
- `k1_`：secp256k1 公開鍵に束縛します。主仕様のデフォルトにはせず、ウォレットのエコシステム、既存の Web3 鍵体系、および secp256k1 に依存する実装向けの、付録 A の拡張能力とします。

公開鍵指紋をパスに含める方式では、束縛鍵が変わると、パス付き DID も変わります。したがって、did:wba は、「安定したユーザー可読の識別子」を DID 文字列自体に担わせず、WNS/Handle などの名前サービスで、安定した参照を実現します。DID は「検証可能な暗号学的アイデンティティ」、名前サービスは「安定した人間可読の名前」を担当します。

束縛鍵の変更後も主体の継続性が必要なパス付き DID では、最後の束縛指紋 segment より前のパスを、**安定主体パス**と呼びます。たとえば、`did:wba:example.com:user:alice:e1_<fingerprint>` の安定主体パスは、`example.com:user:alice` です。別の DID ではなく、単独では解決できません。継続する主体の識別に使い始めたら、永久に変更、回収、または再割当をしてはなりません（MUST）。

安定主体パスが同じでも、2 つの完全な DID は、依然として異なる DID です。同じパスであることは、主体の継続性を判断する必要条件にすぎません。検証者は、本仕様に従って `successorDid` の文書チェーンと、対応する DID Document の `proof` を検証した後だけ、同じ継続主体とみなせます。

また、さまざまな識別子システムに DID サポートを追加し、集中型、連合型、分散型の識別子システム間に、相互運用の橋を架けられます。既存の集中型識別子システムを全面的に再構築せず、既存基盤に DID を作成するだけで、システム間の相互運用を実現でき、技術導入の難度を大きく下げられます。

<a id="wba-method-rules"></a>
## 2. WBA DID メソッド仕様

### 2.1 メソッド名

この DID メソッドの識別に使う名前文字列は、wba です。このメソッドの DID は、did:wba という接頭辞で始まらなければなりません。DID 仕様に従い、この文字列は小文字でなければなりません。接頭辞以降の残りの部分は、以下で規定します。

### 2.2 メソッド固有識別子

メソッド固有識別子は、TLS で保護された完全修飾ドメイン名（FQDN）で、任意に DID 文書のパスを含められます。有効なドメイン名構文の形式規則は、[RFC 1035](https://www.rfc-editor.org/rfc/rfc1035)、[RFC 1123](https://www.rfc-editor.org/rfc/rfc1123)、[RFC 2181](https://www.rfc-editor.org/rfc/rfc2181)を参照してください。

メソッド固有識別子は、現代の TLS サービスアイデンティティ検証規則に従い、サーバー証明書と一致しなければなりません。ドメイン名の照合は、証明書の `subjectAltName` 拡張の DNS 識別子（`dNSName`）に基づかなければならず（MUST）、Common Name（CN）に依存してはなりません（MUST NOT）。メソッド固有識別子は、IP アドレスを含めてはなりません。ポート番号は含められますが、パスとの衝突を防ぐため、ホストとポートの間のコロンをパーセントエンコードしなければなりません。ディレクトリとサブディレクトリは任意で含められ、スラッシュの代わりにコロンで区切ります。

did:wba は、2 種類の形式をサポートします。

1. 裸のドメイン名 DID：ドメイン全体の主体を識別します。ドメイン間サービス HTTP 認証などの、ドメイン単位のサービスアイデンティティにも使えます。
2. パス付き DID：ドメインに属する、特定のユーザー、エージェント、またはサブアイデンティティを識別します。

**新規作成するパス付き did:wba** では、「最後のパス segment に束縛公開鍵の指紋を含める」ことを、デフォルト方式とします。指紋より前の path segment は、`user:alice`、`agents:billing` など、実装者が定義します。

ABNF の定義は、以下のとおりです。

```abnf
base64url-char = ALPHA / DIGIT / "-" / "_"
path-segment   = 1*(ALPHA / DIGIT / "-" / "_" / ".")
e1-fingerprint = "e1_" 43base64url-char

wba-root-did = "did:wba:" domain-name
wba-path-did = "did:wba:" domain-name 1*(":" path-segment) ":" e1-fingerprint
wba-did      = wba-root-did / wba-path-did
```

> 説明：  
> 1. 主仕様のデフォルトのパス profile は、`e1_` だけを定義します。  
> 2. secp256k1 のパス束縛との互換性が必要な実装は、付録 A の `k1_` 互換拡張を参照してください。

#### 裸のドメイン名 DID の使い方

`did:wba:{domain}` の使い方は、`did:web:{domain}` と似ており、主な規則は以下です。

1. 解決方法は、did:web の裸のドメイン名入口と同じです。  
   `did:wba:example.com` は、`https://example.com/.well-known/did.json` に対応します。
2. 裸のドメイン名 DID は、特定のユーザーやサブアイデンティティではなく、主に「ドメイン全体の主体」または「ドメイン単位のサービスアイデンティティ」を表します。
3. ANP のドメイン間サービス呼出しで、`ANPMessageService` が、外側の HTTP 認証に使う DID を宣言する場合、裸のドメイン名 DID を優先することが望まれます（**SHOULD**）。
4. 裸のドメイン名 DID は、`e1_` のパス束縛指紋を含まないため、本仕様の `e1_` パス付き DID のパス束縛検証規則は適用しません。
5. 要求認証は、[ANP-02 の汎用 HTTP 認証と WBA バインディング](../../chinese/02-ANP-基于DID的身份认证协议.md#wba-binding)に従います。裸のドメイン形式でも、ダイジェスト、署名対象、認証用途、時間、およびリプレイの要件は免除しません。ネイティブ Web は、ANP-02 の Web バインディングを使います。

ネイティブ `did:web` が、ANP で同じ方法によりこの手順に参加する方法は、付録 B を参照してください。

### 2.2.1 デフォルトのパス方式：`e1_` 束縛公開鍵指紋

新規作成するパス付き did:wba では、最後の path segment は、`e1_` 束縛公開鍵指紋 segment でなければなりません（MUST）。`e1_` は、束縛鍵が Ed25519 公開鍵であり、その DID が主仕様のデフォルト profile を採用することを表します。

推奨構造は、以下のとおりです。

```plaintext
did:wba:{domain}:{namespace...}:{e1-fingerprint}
```

例：

```plaintext
did:wba:example.com
did:wba:example.com:user:alice:e1_<fingerprint>
did:wba:example.com%3A3000:user:alice:e1_<fingerprint>
```

既存の配置との互換性のため、resolver は、指紋 segment のない過去のパス付き DID の解決をサポートしてもかまいません（MAY）。ただし、新規作成するパス付き DID は、本仕様のデフォルト方式を採用することが望まれます（SHOULD）。

### 2.2.2 `e1_` 指紋の生成方法（推奨）

`e1_` 指紋は、パス付き DID を、Ed25519 束縛公開鍵に関連付けます。生成方法は、以下のとおりです。

1. DID 束縛鍵を選択する。束縛鍵は、以下をすべて満たさなければならない（MUST）。
   - Ed25519 公開鍵である。
   - DID 文書で、`Multikey` / `publicKeyMultibase` として表現する。
   - DID 文書の `authentication` 関係で認可されている。

2. その Ed25519 `publicKeyMultibase` を、同等の公開鍵 JWK に変換する。同等の JWK は、RFC 7638 が要求する必要なフィールドだけを保持する。

```json
{
  "crv": "Ed25519",
  "kty": "OKP",
  "x": "..."
}
```

各値について、以下を適用します。

- `publicKeyMultibase` は、Multibase base58-btc でエンコードした Ed25519 `Multikey` でなければなりません。
- デコード後、Ed25519 公開鍵の生の 32 バイトを得ます。
- `x` は、その 32 バイト公開鍵の、padding なしの base64url 表現です。

3. [RFC 7638](https://www.rfc-editor.org/rfc/rfc7638) の規則で、JWK Thumbprint 入力を作成する。
   - 必要なフィールドだけを保持する。
   - フィールド名を辞書順に並べる。
   - 余分な空白のない JSON 文字列を使う。
   - UTF-8 でエンコードする。

4. 手順 3 の UTF-8 バイト列に SHA-256 ハッシュを適用し、32 バイトのダイジェストを得る。

5. 32 バイトのダイジェストを base64url エンコードし、末尾の `=` padding を除く。エンコード結果の長さは、43 文字に固定される。

6. エンコード結果の前に `e1_` 接頭辞を付け、最終パス segment とする。

説明：

1. `e1_` 接頭辞は、ハッシュ出力の一部ではなく、profile の接頭辞です。
2. `e1_` 接頭辞なしの thumbprint 値を、検証メソッドの `kid` または fragment とすることを推奨します。これにより、DID パスと検証メソッド識別子が、分かりやすく対応します。
3. 新しい配置では、`e1_` profile を優先することが望まれます（SHOULD）。

### 2.2.3 安定主体パス

束縛指紋パス方式を使うパス付き DID では、安定主体パスは、ドメイン名と、最後の束縛指紋 segment より前のすべてのパス segment から成ります。

```text
did:wba:example.com:user:alice:e1_<fingerprint>
        └──── 稳定主体路径：example.com:user:alice ────┘
```

安定主体パスは、以下を満たさなければなりません（MUST）。

1. ある継続主体に割り当てたら、変更、回収、または他の主体への再割当をしてはならない（MUST NOT）。
2. ルート束縛鍵が変わって新 DID が生成される場合、新旧 DID の安定主体パスは、完全に一致しなければならない（MUST）。
3. 検証者は、安定主体パスが同じという理由だけで、2 つの DID が同じ主体に属すると判断してはならない（MUST NOT）。
4. 主体の継続性は、第 2.5.2～2.5.5 節に従い、旧 DID Document の `successorDid`、文書全体の `proof`、および新 DID の束縛指紋を検証しなければならない（MUST）。

### 2.4 鍵材料と文書処理

多くの Web サーバーのコンテンツ提供方法から、did:wba 文書は、application/json のメディア型で配信される場合が多いと考えられます。did.json という文書を取得した場合、以下の処理規則に従うべきです。

1. JSON 文書のルートに @context がある場合、JSON-LD 規則で処理するべきです。処理不能または処理失敗の場合、did:wba 文書として拒否するべきです。

2. JSON 文書のルートに @context があり、JSON-LD 処理に成功し、コンテキスト `https://www.w3.org/ns/did/v1` を含む場合、さらに [did-core 仕様第 6.3.2 節](https://www.w3.org/TR/did-core/#consumption-0)に従い、DID 文書として処理できます。

3. @context がない場合、[did-core 仕様第 6.2.2 節](https://www.w3.org/TR/did-core/#consumption)の通常の JSON 規則で DID を処理するべきです。

4. 外部リソース、外部 DID、または `serviceEndpoint` への参照には、絶対 URI を使わなければなりません（MUST）。

5. 同じ DID Document 内の検証メソッドへの参照には、`#key-1` などの相対 DID URL を使ってもかまいません（MAY）。resolver は、これらの参照を展開する際、文書のルート DID を基準にしなければなりません。

> 注意：埋込みの鍵材料や他のメタデータにある外部 URL も対象です。これにより、鍵の混同攻撃を防げます。

### 2.5 DID 文書の説明

DID core 仕様に加え、関連する仕様も時間とともに発展する場合があります。本節は、認証用 DID 文書のサブセットを示します。システム間の互換性を高めるため、必須と記すフィールドは、すべてのシステムでサポートしなければなりません。任意と記すフィールドと、ここにない他の標準のフィールドは、選択してサポートできます。

**推奨する e1 パス付き DID 文書の例は、以下のとおりです。**

```json
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/data-integrity/v2",
    "https://w3id.org/security/multikey/v1",
    "https://w3id.org/security/suites/x25519-2019/v1"
  ],
  "id": "did:wba:example.com%3A8800:user:alice:e1_<fingerprint>",
  "verificationMethod": [
    {
      "id": "did:wba:example.com%3A8800:user:alice:e1_<fingerprint>#key-1",
      "type": "Multikey",
      "controller": "did:wba:example.com%3A8800:user:alice:e1_<fingerprint>",
      "publicKeyMultibase": "z6Mk..."
    },
    {
      "id": "did:wba:example.com%3A8800:user:alice:e1_<fingerprint>#key-x25519-1",
      "type": "X25519KeyAgreementKey2019",
      "controller": "did:wba:example.com%3A8800:user:alice:e1_<fingerprint>",
      "publicKeyMultibase": "z9hFgmPVfmBZwRvFEyniQDBkz9LmV7gDEqytWyGZLmDXE"
    }
  ],
  "authentication": [
    "did:wba:example.com%3A8800:user:alice:e1_<fingerprint>#key-1"
  ],
  "assertionMethod": [
    "did:wba:example.com%3A8800:user:alice:e1_<fingerprint>#key-1"
  ],
  "keyAgreement": [
    "did:wba:example.com%3A8800:user:alice:e1_<fingerprint>#key-x25519-1"
  ],
  "service": [
    {
      "id": "did:wba:example.com%3A8800:user:alice:e1_<fingerprint>#ad",
      "type": "AgentDescription",
      "serviceEndpoint": "https://agent-network-protocol.com/agents/example/ad.json"
    },
    {
      "id": "did:wba:example.com%3A8800:user:alice:e1_<fingerprint>#handle",
      "type": "ANPHandleService",
      "serviceEndpoint": "https://example.com/.well-known/handle/alice"
    },
    {
      "id": "did:wba:example.com%3A8800:user:alice:e1_<fingerprint>#anp",
      "type": "ANPMessageService",
      "serviceEndpoint": "https://example.com/anp",
      "serviceDid": "did:wba:example.com%3A8800"
    }
  ],
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2025-01-01T00:00:00Z",
    "verificationMethod": "did:wba:example.com%3A8800:user:alice:e1_<fingerprint>#key-1",
    "proofPurpose": "assertionMethod",
    "proofValue": "z..."
  }
}
```

**フィールドの説明**：

- **@context**：必須。JSON-LD コンテキストは、DID 文書の意味とデータモデルを定義し、文書の理解可能性と相互運用性を確保します。`https://www.w3.org/ns/did/v1` は必須です。標準の Ed25519 proof を使う e1 文書では、`https://w3id.org/security/data-integrity/v2` と `https://w3id.org/security/multikey/v1` も必須です。他は必要に応じて加えます。

- **id**：必須。IP を含めてはなりませんが、ポートは含められます。ポートがある場合、コロンを `%3A` にエンコードします。その後のパスは、コロンで区切ります。新規作成するパス付き DID では、最後の path segment は、`e1_<fingerprint>` でなければなりません（MUST）。

- **alsoKnownAs**：DID Core の任意のフィールド。ルート束縛鍵の変更で新 DID を生成する際、新 DID Document は、このフィールドで直接の前身 DID を参照してもかまいません（MAY）。`alsoKnownAs` は、逆方向の関連付けの主張だけを表し、単独で主体の継続性の暗号学的証明にはなりません。

- **deactivated**：did:wba が、DID Document の直接取得モードで定義する、任意の拡張フィールド。`true` は、その完全な DID を新しい認証と業務ルーティングに使うことを停止したものの、文書を過去の検証や後継の照会に、なお使えることを表します。

- **successorDid**：did:wba の任意の拡張フィールド。値は完全な DID 文字列でなければならず（MUST）、置き換えられた DID から、直接の後継 DID を指します。途中の DID を飛ばして、さらに後の後継に書き換えてはなりません（MUST NOT）。

- **verificationMethod**：必須。検証メソッドの配列で、DID 主体の検証用公開鍵情報を定義します。E2EE 通信をサポートする場面では、鍵を分離するため、`verificationMethod` に、署名鍵と鍵共有鍵の両方を含める**べき**です。署名鍵は、認証と文書のアサーションに使います。`X25519KeyAgreementKey2019` などの鍵共有鍵は、上位プロトコルの鍵共有や機密情報の受信に使います。役割を分けることで、1 つの鍵の漏洩が、認証と通信の機密性の両方に同時に影響することを防ぎます。

  デフォルトのパス方式のパス付き DID では、`verificationMethod` に、少なくとも 1 つの Ed25519 `Multikey` を束縛鍵として含め、その同等の公開鍵 JWK の RFC 7638 thumbprint が、DID パスの最後の `e1_` 指紋 segment と完全に一致しなければなりません（MUST）。

  - **子フィールド**：
    - **id**：検証メソッドの一意の識別子。
    - **type**：検証メソッドの型。
    - **controller**：その検証メソッドを制御する DID。
    - **publicKeyJwk**：JSON Web Key 形式の公開鍵情報。
    - **publicKeyMultibase**：Multibase 形式の公開鍵情報。

- **authentication**：必須。認証用検証メソッドの一覧で、文字列またはオブジェクトにできます。デフォルトのパス方式のパス付き DID では、束縛鍵が `authentication` 関係で認可されていなければなりません（MUST）。デフォルトで、プラットフォーム間認証の署名には、この束縛鍵を優先するべきです。

- **assertionMethod**：任意。アサーション用の検証メソッドを列挙します。e1 profile を使い、標準 DID Document proof を使う DID では、束縛鍵または、その proof を生成する Ed25519 `Multikey` が、`assertionMethod` によって認可されていなければなりません（MUST）。

- **keyAgreement**：任意。鍵共有用公開鍵情報を定義し、2 つの DID 間の暗号化通信に使えます。通常、X25519KeyAgreementKey2019 などの鍵交換用の鍵共有アルゴリズムを使います。`keyAgreement` は、`verificationMethod` エントリを指す文字列参照、または埋込みオブジェクトにできます。E2EE では、上位プロトコルに鍵共有材料を提供します。上位プロトコルは、私聊 E2EE Profile、Group E2EE Profile、または将来のセキュリティ Overlay であり、本仕様は、`keyAgreement` を特定のアルゴリズム手順に固定**しません**。新しい配置は、通常、`X25519KeyAgreementKey2019` または意味的に同等の X25519 エントリを含める**べき**です。DID 文書に `keyAgreement` がないか、上位プロトコルが使える鍵共有エントリがない場合、そのエージェントは、対応する E2EE 能力をサポートしないことを表します。

  - **子フィールド**：
    - **id**：鍵共有メソッドの一意の識別子。
    - **type**：鍵共有メソッドの型。
    - **controller**：その鍵共有メソッドを制御する DID。
    - **publicKeyMultibase**：Multibase 形式の公開鍵情報。

- **service**：任意。DID 主体に関連付けられたサービスの一覧を定義します。
  - **id**：サービスの一意の識別子。
  - **type**：サービス型。現在サポートする型は、以下です。
    - `AgentDescription`：エージェント記述サービス。`serviceEndpoint` は、[ANP エージェント記述プロトコル仕様](07-ANP-智能体描述协议规范.md)に従う文書を指します。
    - `ANPHandleService`：Handle 束縛サービス。WNS（WBA Name Space）の双方向の束縛検証に使います。`serviceEndpoint` は、Handle Provider のドメインにある、参照解決可能な HTTPS の絶対 URI でなければなりません（MUST）。[ANP-04 DID-WBA に基づく名前空間仕様](04-ANP-基于DID-WBA的命名空间规范.md)を参照してください。
      - DID 保持者が Handle を公開したい場合、`serviceEndpoint` は、その Handle の標準 Resolution Endpoint（`https://example.com/.well-known/handle/alice` など）を直接使うことが望まれます（SHOULD）。
      - DID 保持者が DID Document で Handle を公開したくない場合、`serviceEndpoint` は、`did` と `confirmed = true` を少なくとも返す DID Confirmation Endpoint（`https://example.com/.well-known/handle/by-did?did=...` など）を指してもかまいません（MAY）。
      - 応答文書が `handle` を含み、入力 Handle と完全に一致する場合、検証者は、特定の Handle の正確な逆方向検証を完了できます。
      - 応答が確認情報だけの場合、検証者が確認できるのは provider 関係だけであり、それだけで「特定 Handle の検証済み束縛」とみなしてはなりません。特に、特定 Handle の確認が必要な、セキュリティ上重要な場面には使えません。

    - `ANPMessageService`：ANP インスタントメッセージの統一サービス入口。DID 主体が ANP インスタントメッセージプロトコルに参加する場合、`serviceEndpoint` は、その統一 ANP メッセージエンドポイントを指してもかまいません（**MAY**）。私聊、グループ会話、鍵材料へのアクセス、添付制御などの能力を、この単一入口が運びます。メソッドと能力宣言は、ANP Profile 2 と関連 Profile に従います。ドメイン間サービス呼出しに参加する場合、外側の HTTP 要求署名に使う DID を表す `serviceDid` も宣言することが望まれます（**SHOULD**）。did:wba 配置では、通常、`did:wba:example.com` や `did:wba:example.com%3A8800` のような、裸のドメイン名 DID を使うべきです。
  - **serviceEndpoint**：サービスのエンドポイント URL。
  - **serviceDid**：任意。ドメイン間サービス呼出しに参加する場合、宣言を推奨します。値は DID URL ではなく DID 文字列とし、「外側の HTTP 要求署名の検証に、どの DID の公開鍵を使うか」を相手に伝えます。

- **proof**：デフォルトの `e1_` profile では、`proof` は必須です。他の profile での有無は、その規則で決めます。`proof` は DID Document の完全性を証明し、生成後に文書が改ざんされていないことと、生成時に署名者が対応する秘密鍵を制御したことを示します。proof 自体は、DID method の解決や、`id` の一致検査の代わりにはなりません。
  - デフォルトの e1 profile では、本バージョンは、W3C 標準の `DataIntegrityProof` + `eddsa-jcs-2022` の proof profile を定義します。

> 注意：
>
> 1. 公開鍵情報は、現在 `publicKeyJwk` と `publicKeyMultibase` の 2 形式をサポートします。[検証メソッドのプロパティ](https://www.w3.org/TR/did-extensions-properties/#verification-method-properties)を参照してください。
> 2. 検証メソッド型の定義は、[検証メソッドの型](https://www.w3.org/TR/did-extensions-properties/#verification-method-types)を参照してください。e1 束縛鍵には、`Multikey` を推奨します。

> 6. E2EE 通信をサポートする場面では、署名/アサーション鍵と鍵共有鍵を分離して管理する設計を推奨します。署名/アサーション鍵を鍵共有に使わず、鍵共有鍵を署名に使いません。これらの材料の具体的な用途は、上位の私聊 E2EE、Group E2EE などの Profile が、それぞれ定義します。
> 7. デフォルトのパス方式で新規作成するパス付き DID の束縛鍵は、以下を満たさなければなりません（MUST）。
>    - `Multikey` / `publicKeyMultibase` で表す。
>    - `authentication` 関係で認可されている。
>    - 同等の公開鍵 JWK の RFC 7638 thumbprint が、DID パスの最後の `e1_` 指紋 segment と完全に一致する。
> 8. secp256k1 のパス束縛をサポートする実装は、付録 A の `k1_` 互換拡張を参照してください。

### 2.5 DID メソッドの操作

#### 2.5.1 作成（登録）

did:wba メソッド仕様は、具体的な HTTP API 操作を指定せず、プログラムからの登録と管理は、各実装が自身の Web 環境の要件に応じて定義します。

DID の作成には、以下の手順が必要です。

1. ドメイン登録業者に、ドメインの使用を申請する。
2. DNS 照会サービスに、ホスティングサービスの所在と IP アドレスを登録する。
3. パス付き DID を作成する場合、先に Ed25519 束縛鍵を生成し、第 2.2.2 節に従って `e1_` 指紋 segment を計算する。
4. 適切な鍵対を含む DID 文書の JSON-LD ファイルを作成する。ドメイン全体を表す場合、`did.json` を `.well-known` URL に保存する。同じドメインで複数の DID を解決する場合は、指定したパスに保存する。

たとえば、ドメイン `example.com` では、`did.json` は、以下の URL で取得可能になります。

```plaintext
示例：创建DID
did:wba:example.com
 -> https://example.com/.well-known/did.json
```

裸のドメイン名 DID の作成・ホスティング方法は、did:web の裸のドメイン名入口と同じです。ドメイン所有者が `/.well-known/did.json` に対応する DID 文書を提供すれば、その DID を、ドメイン主体のアイデンティティや、ドメイン単位のサービスアイデンティティに使えます。

裸のドメイン名でなく任意のパスを指定し、デフォルトのパス方式を使う場合、`did.json` は、`e1_` 指紋 segment を含むパスで取得可能になります。

```plaintext
示例5：使用默认路径方案创建路径型 DID
did:wba:example.com:user:alice:e1_<fingerprint>
 -> https://example.com/user/alice/e1_<fingerprint>/did.json
```

ドメイン名に任意のポートを指定する場合、パスとの衝突を防ぐため、ホストとポートの間のコロンを、パーセントエンコードしなければなりません。

```plaintext
示例6：使用可选路径和端口创建DID
did:wba:example.com%3A3000:user:alice:e1_<fingerprint>
 -> https://example.com:3000/user/alice/e1_<fingerprint>/did.json
```

> 説明：  
> secp256k1 束縛のパス付き DID を使う実装は、付録 A の `k1_` 互換拡張を参照してください。

#### 2.5.2 読取り（解決）

did:wba DID から DID 文書を解決するため、以下を実行しなければなりません。

- メソッド固有識別子の `:` を `/` に置換し、完全修飾ドメイン名と任意のパスを得る。
- ドメイン名がポートを含む場合、コロンをパーセントデコードする。
- 想定する DID 文書の所在の前に `https://` を付け、HTTPS URL を作成する。
- URL にパスがない場合、`/.well-known` を追加する。
- `/did.json` を追加し、URL を完成させる。
- 安全な HTTPS 接続を確立でき、[第 2.6 節のセキュリティとプライバシーの考慮事項](https://w3c-ccg.github.io/did-method-web/#security-and-privacy-considerations)の要件を強制するエージェントで、その URL に HTTP GET を行う。
- 解決した DID 文書の ID が、解決対象の did:wba DID と一致することを検証する。
- 主仕様の、`deactivated = true` を設定していない `e1_` パス付き DID では、以下の厳密な束縛関係を検証しなければならない（MUST）。
  - DID Document のトップレベルに `proof` が存在すること。
  - `proof` が、`DataIntegrityProof` + `eddsa-jcs-2022` の検証に合格すること。
  - `proof.verificationMethod` が指す検証メソッドは、Ed25519 `Multikey` または意味的に同等の Ed25519 検証メソッド表現でなければならない（MUST）。
  - `proof.verificationMethod` に対応する Ed25519 公開鍵で RFC 7638 thumbprint を計算し、結果が、DID パスの最後の `e1_` 指紋 segment と完全に一致しなければならない（MUST）。
- `deactivated = true` を設定した `e1_` DID では、以下を適用する。
  - 検証者は、DID パスの `e1_` 指紋と一致する元の束縛鍵を、なお文書内で見つけなければならない（MUST）。
  - 文書が `successorDid` も含む場合、新旧 DID の安定主体パスが同じであることを検証しなければならない（MUST）。
  - 文書全体の `proof` が元の束縛鍵で署名されている場合、その移行を検証済みとみなせる。
  - 文書全体の `proof` が事前認可の回復鍵で署名されている場合、検証者が無効化前の信頼済み DID Document をすでに保持し、その文書の `assertionMethod` で回復鍵が事前認可されていたと確認できる場合だけ、回復検証に合格した移行とみなせる。
  - トップレベルの `proof` がない場合、standalone hop 検証者は、`successorDid` を `unverified` の移行ヒントとして読んでもかまわない（MAY）。resolver は、認証済みの同一オリジンの HTTPS で各文書を取得し、各直接 hop を検証し、最終的に binding proof が有効な active `e1_` DID に到達した後だけ、無署名 hop を `provider_asserted` と報告してもかまわない（MAY）。孤立した `successorDid` や、この認証済み完全チェーンのコンテキストがない文書は、なお `unverified` である。
- HTTP GET 中に DNS 解決を行う際、クライアントは、解決中のアイデンティティを追跡されることを防ぐため、[RFC 8484](https://w3c-ccg.github.io/did-method-web/#bib-rfc8484) を使うべきである。
- active な `e1_` DID では、上記の proof 検証は、ローカルポリシーの切替に左右されず、解決成功の必要条件である。
- 他の profile では、ローカルポリシーが DID Document proof の検証を有効にし、文書が `proof` を含む場合、対応する profile の規則で検証するべきである。

裸のドメイン名 DID では、メソッド解決に `/.well-known/did.json` を使い、`id` の一致を検査します。`e1_` のパス束縛検証は適用しません。要求認証は、別途 [ANP-02 の WBA バインディングと汎用認証](../../chinese/02-ANP-基于DID的身份认证协议.md#wba-binding)に従います。本段落は、簡略化した署名検証手順を定義しません。

> 説明：  
> 付録 A の `k1_` 互換拡張もサポートする実装では、`k1_` DID の解決と束縛検証は、付録 A に従います。

#### 2.5.3 更新

DID 文書の更新には、その DID に対応する `did.json` ファイルを更新します。

デフォルトのパス方式を使うパス付き did:wba では、最後の束縛鍵指紋が変わらない限り、DID 自体は不変です。DID 文書の他の内容は、新しい検証鍵の追加、古い鍵の失効、サービスエンドポイントの更新など、変更できます。

束縛鍵が変わる場合、そのパス付き DID は、新しい DID に変えなければなりません（MUST）。新旧は異なる DID ですが、以下の規則で、同じ継続主体の移行関係を確立できます。

1. 新 DID は、旧 DID と完全に同じ安定主体パスを持たなければならない（MUST）。
2. 新 DID Document を作成・公開しなければならず（MUST）、新文書は、`alsoKnownAs` で直接の前身 DID を参照してもかまわない（MAY）。
3. 旧 DID Document を取得可能なまま維持し、`deactivated = true` と `successorDid = <new DID>` を設定しなければならない（MUST）。
4. `successorDid` は、直接の次世代 DID だけを指さなければならない（MUST）。その後の再ローテーションで、より古い DID の `successorDid` を書き換えてはならない。
5. 旧 DID Document 全体の `proof` は、`deactivated`、`successorDid`、および他のすべてのプロパティを保護対象とするべきである。新 DID Document は、新しい束縛鍵で、文書全体の `proof` を生成する。
6. WNS/Handle など上位の名前サービスを、新 DID に同期更新するべきである。ただし、名前サービスの対応付け自体は、移行証明に代わらない。

プログラム管理インターフェースは、本仕様では定義しません。並行ローテーションで複数の後継 DID が生じることを防ぐため、実装は、安定主体パスだけで更新を提出せず、現在の完全な DID（`expected_current_did` など）による、原子的な比較交換を行うことが望まれます（SHOULD）。

> 注意：
>
> 1. git のようなバージョン管理と、GitHub Actions のような継続的インテグレーションで DID 文書の更新を管理すれば、認証と監査履歴を支援できます。
> 2. HTTP API 更新処理の具体的な API は指定せず、プログラムからの登録・管理は、各実装が需要に応じて定義します。

#### 2.5.4 無効化（失効）

完全に無効化し、後継 DID がないアイデンティティでは、`did.json` を削除するか、他の方法で公開取得できなくできます。

束縛鍵のローテーションで新 DID に置き換えられたパス付き did:wba では、旧 DID Document を削除してはなりません（MUST NOT）。過去の署名検証と後継照会をサポートするため、取得可能なまま維持し、`deactivated = true` と `successorDid` を設定しなければなりません（MUST）。ここで `deactivated` は、その完全な DID を新しい認証とルーティングに使わないことだけを表し、継続主体の消滅を意味しません。

#### 2.5.5 DID Document proof

did:wba DID Document のトップレベルの `proof` の有無は、profile と文書の状態に依存します。デフォルトの `e1_` profile の active 文書では、`proof` は必須です。`successorDid` を設定した無効化済み `e1_` transition 文書は、以下の binding、recovery、認証済み Provider、unverified の分岐で扱うため、トップレベルの `proof` がなくてもかまいません（MAY）。他の profile では、文書の完全性証明のため、トップレベルの `proof` を含めてもかまいません（MAY）。これは、proof 生成後に文書が改ざんされていないことと、生成時に署名者が対応する秘密鍵を制御したことを示します。DID method の解決や、`id` の一致検査の代わりにはなりません。

デフォルトの `e1_` profile では、主仕様の `proof` profile は、以下に従わなければなりません（MUST）。

- 検証可能クレデンシャルのデータ完全性 1.0（Verifiable Credential Data Integrity 1.0）。
- Data Integrity EdDSA 暗号スイート v1.0（Data Integrity EdDSA Cryptosuites v1.0）。

`proof` オブジェクトは、以下のフィールドを含みます。

- `type`：必須。`DataIntegrityProof` に固定。
- `cryptosuite`：必須。`eddsa-jcs-2022` に固定。
- `created`：必須。XML Schema datetime 形式の proof 作成時刻。
- `verificationMethod`：必須。proof 生成用の DID Document 内の Ed25519 `Multikey` を指す、完全な DID URL。
- `proofPurpose`：必須。`assertionMethod` に固定。
- `proofValue`：必須。base58-btc multibase（`z...`）でエンコード。
- `domain`：任意。
- `challenge`：任意。

追加の制約：

1. active な `e1_` 文書では、DID パス束縛、公開鍵束縛、文書完全性証明を統一するため、`proof.verificationMethod` は、`e1_` 束縛鍵を使わなければならない（MUST）。無効化済みで `successorDid` を含む文書では、無効化前の信頼済み文書の `assertionMethod` が事前認可した recovery key も使える。ただし、無効化時に追加した key は使えない。
2. active な `e1_` 文書と、旧 binding key による継続性を主張する無効化済み transition では、resolver は、`proof.verificationMethod` の Ed25519 公開鍵で RFC 7638 thumbprint を再計算し、DID パスの最後の `e1_` 指紋 segment と完全に一致することを検証しなければならない（MUST）。recovery proof は、無効化前の信頼済み文書の key material と、`assertionMethod` の認可で検証しなければならない（MUST）。recovery key に、`e1_` binding 指紋との一致は要求しない。
3. `proof` の生成と検証は、`eddsa-jcs-2022` の標準アルゴリズム手順に従わなければならない（MUST）。本仕様は、アルゴリズムの詳細を再定義しない。

active な `e1_` did:wba DID Document の解決では、proof の検証は任意の追加検査ではなく、パス束縛の意味論の一部です。`proof` の欠落、`proof` の検証失敗、または `proof.verificationMethod` と `e1_` 束縛指紋の不一致がある場合、解決は失敗しなければなりません（MUST）。

`e1_` DID では、「active DID Document に `proof` がなくても解決を続ける」という寛容モードはありません。

`deactivated = true` と `successorDid` を設定した旧 DID Document では、トップレベルの `proof` は、引き続き、`proof` を除いた文書全体を対象とする証明です。

- 旧 DID の束縛鍵で署名した場合、検証結果は、強い暗号学的継続性です。
- 旧 DID が無効化前に `assertionMethod` で認可した回復鍵で署名した場合、検証者は、以前の信頼済み状態に基づいて、その事前認可を確認しなければなりません（MUST）。
- トップレベルの `proof` がある場合、旧 binding proof または事前認可の recovery proof として検証しなければなりません（MUST）。不正形式、無認可、または暗号学的検証失敗の proof は、transition を無効にしなければならず（MUST）、provider assertion や unverified hint にダウングレードしてはなりません（MUST NOT）。
- 旧秘密鍵と事前認可の回復鍵が両方とも使えない場合、トップレベルの `proof` がなくてもかまいません（MAY）。standalone hop 検証者は、その hop を `unverified` と報告しなければなりません（MUST）。完全チェーン resolver は、認証済み同一オリジンの HTTPS で predecessor と各 successor を取得し、各 hop の安定主体パスと直接後継関係を検証し、最終的に binding proof が有効な active `e1_` DID に到達した後だけ、`provider_asserted` を報告してもかまいません（MAY）。失敗または不完全なチェーンから、`provider_asserted` を生成してはなりません（MUST NOT）。

移行 assurance の意味は、以下の 4 つだけです。

- `verified`：predecessor の元の binding key が、無効化と直接後継関係を含む文書全体に署名した。
- `recovery_verified`：無効化前の信頼済み文書の `assertionMethod` が事前認可した recovery key が、その関係に署名した。
- `provider_asserted`：認証済みの同一オリジンの HTTPS Provider が、完全で構造的に有効な移行チェーンを解決し、有効な proof を持つ active DID に到達した。または、アイデンティティ Provider が、独立して認証された recovery/transition の権威あるチャネルを通じ、同じ predecessor→successor の事実を提供した。この assurance は、DID Document の属性ではなく、`verified` や `recovery_verified` に格上げしてはならない（MUST NOT）。
- `unverified`：孤立した `successorDid`、`alsoKnownAs`、Handle/WNS の対応付け、HTTP 409 hint、standalone の無署名 hop、不完全なチェーン、または認証済み Provider の出所がない文書しかない。

非 `e1_` profile では、実装は、対応する profile 規則やローカルポリシーに従い、以下のいずれかのモードを選んでもかまいません（MAY）。

1. 寛容モード：DID Document に `proof` がなくても、解決を続けられます。
2. 厳密モード：ローカルポリシーが proof を要求する場合、DID Document に `proof` がなければ、検証失敗とみなさなければなりません（MUST）。
**規範的な説明**：

`e1_` profile の DID では、本仕様は、DID Document のトップレベルの `proof` に、W3C 標準の Data Integrity proof 機構を要求します。その proof データモデル、proof configuration、document transformation、hashing、proof serialization、および verification の規則は、それぞれ [Verifiable Credential Data Integrity 1.0](https://www.w3.org/TR/vc-data-integrity/) と [Data Integrity EdDSA Cryptosuites v1.0](https://www.w3.org/TR/vc-di-eddsa/) に従います。本仕様は、did:wba での proof の配置、フィールド要件、および検証関係だけを制約し、基礎暗号アルゴリズムを重ねて定義しません。競合時は、上流の W3C 仕様に従います。

### 2.6 セキュリティとプライバシーの考慮事項

セキュリティとプライバシーの考慮事項は、[did:web メソッド仕様第 2.6 節](https://w3c-ccg.github.io/did-method-web/#security-and-privacy-considerations)を参照してください。実装者は、さらに、デフォルトのパス方式で、束縛鍵変更によって生じる DID ローテーションと、名前サービスの同期にも注意するべきです。

本バージョンは、独立した検証可能ログを要求しません。完全な解決が成功した後、クライアントは、hop assurance が `verified` または `recovery_verified` の後継辺だけをキャッシュすることが望まれます（SHOULD）。`provider_asserted` と `unverified` の辺を、この検証済み辺キャッシュに入れてはなりません（MUST NOT）。最終の active 文書の proof 無効、ループ、hop 上限超過など、cache commit より前の検証失敗で、失敗チェーンの先頭部分の辺を残してはなりません（MUST NOT）。同じ旧 DID のキャッシュ済み検証辺と、新たな `successorDid` が異なる場合、移行チェーンがループする場合、または後継 DID の安定主体パスが変わる場合、その移行を拒否し、上位層に競合を報告しなければなりません（MUST）。

新しい配置は、標準 proof の相互運用性を高めるため、`e1_` profile を優先することが望まれます（SHOULD）。ウォレットのエコシステムと既存の secp256k1 実装との互換性が必要な場合、付録 A の `k1_` 互換拡張を参照してください。

## 3. did:wba メソッドと HTTP に基づく、プラットフォーム間認証

本章の汎用認証は、[ANP-02 第 3 章](../../chinese/02-ANP-基于DID的身份认证协议.md#http-binding)を参照してください。WBA メソッドの規則は、引き続き第 2 章が定義します。要求形式、検証手順、および実装ポリシーは、公開前の認証設計から変わりません。

<a id="wba-auth-binding"></a>
### 3.1 WBA 要求認証のメソッド制約

汎用要求形式と署名検証手順は、ANP-02 が定義します。本節は WBA メソッド要件を提供し、他の DID メソッドに一般化しません。

#### 3.1.1 認証鍵の選択

E1 profile の `did:wba` では、デフォルトで、クライアントは、DID パスの最後の `e1_` 指紋 segment に対応する**束縛鍵**で署名することが望まれます（SHOULD）。サーバーが他の `authentication` 検証メソッドを許すことは、ローカル認可ポリシーであり、DID の束縛の意味論を変更しません。

> 説明：  
> [付録 A](附录A：did-wba-k1_兼容扩展.md)の `k1_` 互換拡張もサポートする実装は、`k1_` DID の認証署名を、[付録 A](附录A：did-wba-k1_兼容扩展.md)に従って行えます。

#### 3.1.2 メソッドの状態とアイデンティティの束縛

**DID 文書の読取り**：DID から文書を解決します。`deactivated = true` が設定されている場合、サーバーは、その DID で新しい認証を続けてはなりません（MUST NOT）。文書に `successorDid` がある場合、[本章の 409 応答](../../chinese/03-did-wba方法规范.md#http-superseded)に従い、DID 置換済みエラーを返すべきです。

   - `did:wba` の `e1_` DID では、`authentication` から任意の Ed25519 key を選ぶのではなく、`proof.verificationMethod` に対応する Ed25519 公開鍵に基づき、DID 束縛を検証しなければなりません（MUST）。
     - `proof` が存在し、`eddsa-jcs-2022` の検証に合格すること。
     - その公開鍵で RFC 7638 thumbprint を再計算し、DID パスの最後の `e1_` 指紋 segment と完全に一致しなければなりません（MUST）。

> 説明：  
> [付録 A](附录A：did-wba-k1_兼容扩展.md)の `k1_` 互換拡張もサポートする実装では、`k1_` DID の束縛検証と認証検証は、[付録 A](附录A：did-wba-k1_兼容扩展.md)に従います。

<a id="http-superseded"></a>
### 3.2 WBA の HTTP 409 DID Superseded 応答

要求の宛先 DID または認証用 DID に `deactivated = true` が設定され、後継 DID がある場合、サーバーは、`409 Conflict` を返せます。

```http
HTTP/1.1 409 Conflict
Content-Type: application/json
Cache-Control: no-store
```

```json
{
  "code": "did_superseded",
  "requestedDid": "did:wba:example.com:user:alice:e1_<old-fingerprint>",
  "currentDid": "did:wba:example.com:user:alice:e1_<current-fingerprint>",
  "stableSubjectId": "example.com:user:alice"
}
```

応答の `currentDid` は、未検証のヒントにすぎません。クライアントは、このフィールドに直接依存して再試行してはならず（MUST NOT）、旧 DID Document を取得し、`deactivated`、`successorDid`、文書全体の `proof` を検証し、現在の active DID に至るまで、後継 DID を順番に解決するべきです。その後、現在の DID で署名を再生成して要求を行うべきであり、この検証手順の代わりに、透過的な `301` / `302` リダイレクトを使うべきではありません。

## 4. did:wba と JSON データ格納による、プラットフォーム間認証の流れ

本章の認証情報の格納は、[ANP-02 第 4 章](../../chinese/02-ANP-基于DID的身份认证协议.md#json-carriage)を参照してください。既存のフィールド、シリアライズ規則、構成要素の対応付け、および検証手順を維持します。

## 5. 人間による認可と、エージェントの自動認可の区別

[ANP-02 第 5 章](../../chinese/02-ANP-基于DID的身份认证协议.md#5-身份认证与应用授权)を参照してください。

## 6. プライバシー保護の方針

[ANP-02 第 6 章](../../chinese/02-ANP-基于DID的身份认证协议.md#6-隐私保护)を参照してください。

安定した外部参照が必要で、基礎の DID はローテーション可能にしたい場合、WNS/Handle などの名前サービスとの組合せを推奨します。Handle は安定して人間可読のまま、基礎の did:wba は、束縛鍵の変更とともにローテーションできます。

## 7. セキュリティの提案

[ANP-02 第 7 章](../../chinese/02-ANP-基于DID的身份认证协议.md#security-privacy)を参照してください。メソッド固有の規則は、引き続き本仕様第 2 章を参照し、この分割でセキュリティポリシー要件は追加しません。

WBA メソッド固有のセキュリティ要件：

   - デフォルトのパス方式の `did:wba` では、束縛鍵を、ハードウェア分離、HSM、またはシステムのセキュア領域に保管することが適切です。
   - 束縛鍵を使う `did:wba` では、デフォルトで、プラットフォーム間認証の署名に束縛鍵を優先するべきです。
   - 新しい WBA 配置は、`e1_` profile を優先することが望まれます（SHOULD）。
   - 束縛鍵が変わると、パス付き DID も変わるため、上位の名前サービスの対応付けも同期更新する**べき**です。
   - active な `did:wba` の E1 DID では、resolver は `DataIntegrityProof` を検証しなければなりません（MUST）。無効化済みの `e1_` transition 文書は、[第 2.5.5 節](../../chinese/03-did-wba方法规范.md#wba-method-rules)の binding、recovery、provider-asserted、unverified の規則で扱います。他の profile で、実装が DID Document proof 検証を有効にする場合、対応する profile 規則で `proof` を検証することが望まれます（SHOULD）。
   - WBA の安定主体パスを回収または再割当してはなりません（MUST NOT）。検証者は、最後の束縛指紋 segment を除くだけで、2 つの DID を統合してはなりません（MUST NOT）。
   - WBA メソッドに従い `successorDid` をたどる検証者は、チェーン長を制限し、ループを検出し、安定主体パスの不一致や、同じ旧 DID に複数の後継がある場合を拒否しなければなりません（MUST）。

## 8. ユースケース

1. **ユースケース 1：知的アシスタントで、他の Web サイトのファイルにアクセス**

Alice は example.com にファイルを保存し、後で知的アシスタントからアクセスしたいと考えます。まずアシスタントで did:wba に基づく DID を作成し、example.com にログインし、その DID を自身のアカウントに関連付け、ファイルアクセス権を与えます。設定後、アシスタントは、その DID で example.com にログインできます。認証後、example.com は、Alice のファイルへのアクセスを許可します。この DID を他のサイトにも設定し、異なるプラットフォームのファイルにアクセスさせることもできます。

2. **ユースケース 2：知的アシスタントで、他のプラットフォームのサービス API を呼び出す**

Alice は、知的アシスタントで、example という第三者サービスの API を使いたいと考えます。まずアシスタントで did:wba に基づく DID を作成し、その DID で example プラットフォームのサービスを購読します。example は、DID で認証し、購入者が Alice であると確認し、DID を記録します。認証後、Alice は、アシスタントでその DID を使い、example サービスの API を呼び出して操作できます。

> これらの例は、クライアントによるサーバーの認証を示していませんが、その手順も実行できます。

## 9. まとめ

本仕様は、did:web を基に、WBA の文書、束縛、およびライフサイクルの規則を定義し、ANP-02 を通じて汎用認証に接続します。

本版は、さらに、パス付き DID のデフォルト方式を「DID パスに束縛公開鍵指紋を含める」ものと定め、主仕様では、`e1_` profile をデフォルトとします。

- `e1_`：Ed25519 公開鍵に束縛します。新しい配置に推奨し、W3C 標準の Data Integrity EdDSA proof と直接統合できます。

ウォレットのエコシステムと既存の secp256k1 実装との互換性のため、本仕様は、付録 A に `k1_` 互換拡張も定義します。

束縛鍵変更で新 DID を生成する場合、本仕様は、永久の安定主体パスを継続性の基点とし、旧 DID Document の `successorDid` と文書全体の `proof` で前向きの移行を証明します。新 DID Document は、`alsoKnownAs` で旧 DID を逆方向に宣言できます。安定主体パスが同じこと自体は、DID の同一性証明にはなりません。

汎用の HTTP/JSON 要求認証と任意の Token の、唯一の規範的定義は、ANP-02 にあります。

将来の WBA 改訂は、メソッドの能力と文書のサービス宣言を発展させられます。汎用認証と Token 拡張は、ANP-02 を通じて発展させます。

---

## 付録 A：`k1_` 互換拡張（デフォルトではない）

参考文書：[付録 A：did-wba-k1_ 互換拡張](附录A：did-wba-k1_兼容扩展.md)。

## 付録 B：ネイティブ `did:web` の互換方式

参考文書：[付録 B：ネイティブ did:web との互換性](附录B：与原生did-web-的兼容.md)。

## 参考文献

1. **DID-CORE**。分散型識別子（DID）v1.0。Manu Sporny、Amy Guy、Markus Sabadello、Drummond Reed。W3C。2022 年 7 月 19 日。W3C 勧告。[参照先](https://www.w3.org/TR/did-core/)。

2. **did:web**。[参照先](https://w3c-ccg.github.io/did-method-web/)。

3. **RFC 7638**。JSON Web Key（JWK）Thumbprint。M. Jones、N. Sakimura。IETF。2015 年 9 月。インターネット標準化過程。[参照先](https://www.rfc-editor.org/rfc/rfc7638)。

4. **RFC 8785**。JSON 正規化方式（JCS）。A. Rundgren、B. Jordan、S. Erdtman。IETF。2020 年 6 月。情報提供。[参照先](https://www.rfc-editor.org/rfc/rfc8785)。

5. **RFC 1035**。ドメイン名：実装と仕様。P. Mockapetris。IETF。1987 年 11 月。インターネット標準。[参照先](https://www.rfc-editor.org/rfc/rfc1035)。

6. **RFC 1123**。インターネットホストの要件：アプリケーションとサポート。R. Braden 編。IETF。1989 年 10 月。インターネット標準。[参照先](https://www.rfc-editor.org/rfc/rfc1123)。

7. **RFC 2119**。RFC で要件レベルを示すためのキーワード。S. Bradner。IETF。1997 年 3 月。現時点の最良慣行。[参照先](https://www.rfc-editor.org/rfc/rfc2119)。

8. **RFC 2181**。DNS 仕様の明確化。R. Elz、R. Bush。IETF。1997 年 7 月。標準化提案。[参照先](https://www.rfc-editor.org/rfc/rfc2181)。

9. **RFC 8174**。RFC 2119 のキーワードにおける、大文字と小文字の曖昧さ。B. Leiba。IETF。2017 年 5 月。現時点の最良慣行。[参照先](https://www.rfc-editor.org/rfc/rfc8174)。

10. **RFC 8484**。HTTPS 経由の DNS 照会（DoH）。P. Hoffman、P. McManus。IETF。2018 年 10 月。標準化提案。[参照先](https://www.rfc-editor.org/rfc/rfc8484)。

11. **RFC 7519**。JSON Web Token（JWT）。M. Jones、J. Bradley、N. Sakimura。IETF。2015 年 5 月。インターネット標準化過程。[参照先](https://www.rfc-editor.org/rfc/rfc7519)。

12. **RFC 9110**。HTTP の意味論。R. Fielding、M. Nottingham、J. Reschke 編。IETF。2022 年 6 月。インターネット標準。[参照先](https://www.rfc-editor.org/rfc/rfc9110)。

13. **RFC 9421**。HTTP メッセージ署名。A. Backman、M. Prorock、A. Sporny。IETF。2024 年 2 月。インターネット標準化過程。[参照先](https://www.rfc-editor.org/rfc/rfc9421)。

14. **RFC 9530**。ダイジェストフィールド。R. Polli、L. Pardue。IETF。2024 年 2 月。インターネット標準化過程。[参照先](https://www.rfc-editor.org/rfc/rfc9530)。

15. **RFC 9525**。TLS におけるサービスアイデンティティ。P. Saint-Andre、R. Bonica、J. Hodges。IETF。2023 年 11 月。インターネット標準化過程。[参照先](https://www.rfc-editor.org/rfc/rfc9525)。

16. **DID Use Cases**。分散型識別子のユースケース。Joe Andrieu、Kim Hamilton Duffy、Ryan Grant、Adrian Gropper。W3C。2021 年 6 月 24 日。W3C ノート。[参照先](https://www.w3.org/TR/did-use-cases/)。

17. **DID Extensions**。分散型識別子の拡張。Orie Steele、Manu Sporny。W3C。2021 年 6 月 24 日。W3C ノート。[参照先](https://www.w3.org/TR/did-extensions/)。

18. **DID Extension Properties**。分散型識別子の拡張プロパティ。Orie Steele、Manu Sporny。W3C。2021 年 6 月 24 日。W3C ノート。[参照先](https://www.w3.org/TR/did-extensions-properties/)。

19. **DID Extension Methods**。分散型識別子の拡張メソッド。Orie Steele、Manu Sporny。W3C。2021 年 6 月 24 日。W3C ノート。[参照先](https://www.w3.org/TR/did-extensions-methods/)。

20. **DID Extension Resolution**。分散型識別子の拡張解決。Orie Steele、Manu Sporny。W3C。2021 年 6 月 24 日。W3C ノート。[参照先](https://www.w3.org/TR/did-extensions-resolution/)。

21. **Controller Document**。制御者文書。Manu Sporny、Markus Sabadello。W3C。2021 年 6 月 24 日。W3C ノート。[参照先](https://www.w3.org/TR/controller-document/)。

22. **VC-DATA-INTEGRITY**。検証可能クレデンシャルのデータ完全性 1.0。W3C。[参照先](https://www.w3.org/TR/vc-data-integrity/)。

23. **VC-DI-EDDSA**。Data Integrity EdDSA 暗号スイート v1.0。W3C。[参照先](https://www.w3.org/TR/vc-di-eddsa/)。

24. **VC-DI-ECDSA**。Data Integrity ECDSA 暗号スイート v1.0。W3C。[参照先](https://www.w3.org/TR/vc-di-ecdsa/)。

25. **CID-1.0**。制御された識別子 v1.0。W3C。[参照先](https://www.w3.org/TR/cid-1.0/)。

## 著作権表示

Copyright (c) 2024 ANP Community  
本ファイルは [Apache License 2.0](../../LICENSE) に基づいて公開します。自由に使用・変更できますが、この著作権表示を保持しなければなりません。
