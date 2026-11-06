> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [03-did-wba-method-design-specification.md](../03-did-wba-method-design-specification.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# did:wba メソッド仕様

- 文書ID: ANP-03
- タイトル: Did:WBA メソッド仕様
- ステータス: リリース済み
- バージョン: 1.2
- 原文言語: English / このページは日本語参考訳
- 適用性: この仕様は、ANP での Web ベースの分散 ID、クロスプラットフォーム認証、およびエージェント通信シナリオに適用されます。

> ANP 1.2 リリース ノート: 共通 DID 認証は ANP-02 によって定義されています。 DID メソッドと命名規則は、独自の仕様に残ります。中国の鏡は、 [やった：wba方法规范](chinese/03-did-wba方法规范.md).

## 要約

Did:wba DID メソッドは、クロスプラットフォームの ID 認証とエージェント通信のニーズを満たすように設計された Web ベースの分散型識別子 (DID) 仕様です。このメソッドは、did:web に基づいて拡張および最適化され、did:wba と名付けられ、互換性を維持し、エージェント シナリオへの適応性を強化しています。

この仕様では、パス タイプ Did:wba のデフォルト スキームは、DID パス内にバインドされた公開キーのフィンガープリントを運び、DID とユーザー自身の秘密キーの間のバインディング関係を強化します。 **デフォルトプロファイル** の現在のバージョンは次のとおりです。

- `e1_`: 新しい展開に推奨される Ed25519 公開キーをバインドし、W3C 標準のデータ整合性 EdDSA 証明を直接統合できます。

ウォレットエコシステムおよび既存の secp256k1 実装と互換性を持たせるために、この仕様では付録 A で追加の **デフォルト以外の互換性拡張プロファイル** を定義します。

- `k1_`: 主にウォレット エコシステムおよび既存の Web3 キー システムとの互換性のために使用される secp256k1 公開キーをバインドします。

一般的な HTTP/JSON 認証は現在、次のように定義されています。 [ANP-02](02-anp-did-authentication-protocol-specification.md);この仕様は WBA メソッドのルールを規定します。ネイティブ Web バインディング、命名、およびメッセージングの構成については、「」で説明されています。 [付録 B](appendix-b-compatibility-with-native-did-web.md).

## 1. はじめに

### 1.1 序文

Did:wba DID メソッドの仕様は、Decentralized Identifiers V1.0 で指定された要件に準拠しています。 [[DIDコア](https://www.w3.org/TR/did-core/)].

この仕様は、WBA ドキュメント、バインディング、ライフサイクル ルールを定義するために Did:web に基づいて構築されており、ANP-02 を介して共通認証に接続されています。

Did:web メソッドはネイティブ Web ベースの DID ユースケース向けに設計されており、エージェントの通信シナリオに完全には適合しない方法で進化する可能性があること、およびこの仕様で対象を絞った変更が導入されていることを考慮すると、それらの変更について元の作成者と合意に達するのは長期的なプロセスになるでしょう。したがって、新しいメソッド名を使用することにしました。

将来的には、did:wba仕様をdid:web仕様に統合する可能性も排除せず、この目標の実現を推進していきます。

Did:wba によって参照される Did:web メソッド仕様は、次の場所で入手できます。 [https://w3c-ccg.github.io/did-method-web](https://w3c-ccg.github.io/did-method-web), バージョンは 2024 年 7 月 31 日付けです。管理を容易にするために、did:wba で現在使用されている Did:web メソッド仕様のコピーもアーカイブしました。 [Did:web メソッドの仕様](../references/did_web-method-specification.html).

### 1.2 設計原則

Did:wba アプローチを設計するとき、私たちの中心原則は、分散化を達成しながら、既存の成熟したテクノロジーと完全な Web インフラストラクチャを最大限に活用することでした。 Did:wba を使用すると、電子メールのような機能を実現できます。各プラットフォームは独自のアカウント システムを一元的な方法で実装します。同時に、各プラットフォームを相互接続できます。

パスタイプ DID の場合、この仕様では、「DID パスでバインドされた公開キーのフィンガープリントを運ぶ」ことをデフォルトのスキームとして定義しています。この主な目的は、ユーザーが自分の秘密キーを実際に制御できるようにし、DID とユーザーが実際に制御する公開キーとの間に安定した独立検証可能なバインド関係を形成できるようにすることです。プラットフォームが DID ドキュメントのエスクロー サービスを維持している場合でも、ユーザーまたは検証者はそれが DID 自体に対して期待される公開キーに対応していることを検証できるため、プラットフォームが暗黙的に ID 公開キーを置き換えるリスクが軽減されます。

標準の相互運用性とエコロジカルな互換性のバランスを取るために、現在のバージョンでは「**主要仕様のデフォルトは e1_、互換性のある拡張機能は k1_**」の構造を採用しています。

- `e1_`: Ed25519 公開キーをバインドします。新しい展開に推奨されます。このプロファイルは、W3C Data Integrity EdDSA 標準と直接統合でき、did:wba の長期的な標準化メインラインとして適しています。
- `k1_`: メイン仕様のデフォルトスキームとしてではなく、ウォレットエコシステム、既存のWeb3キーシステム、およびsecp256k1に依存する実装と互換性のある拡張性として付録Aでsecp256k1公開キーをバインドします。

公開キー フィンガープリント パス スキームの当然の結果として、バインディング キーが変更されると、パス タイプ DID も変更されます。したがって、did:wba は、DID 文字列に「安定したユーザー可読 ID」を直接適用するのではなく、ネーム サービス スキーム (WNS/ハンドルなど) を通じて安定した参照の問題を解決します。DID は「検証可能な暗号 ID」を担当し、ネーム サービスは「安定した人間が判読できる名前」を担当します。

バインディング キーの変更後にサブジェクトの連続性を保持する必要があるパス タイプ DID の場合、最後のバインディング フィンガープリント セグメントの前のパスは、 **安定したサブジェクトパス**。たとえば、次の安定したサブジェクト パスは、 `did:wba:example.com:user:alice:e1_<fingerprint>` です `example.com:user:alice`。安定したサブジェクト パスは別の DID ではないため、独立して解決することはできません。継続的な主題を識別するために使用されると、 MUST 永久に不変、リサイクル不可、再割り当て不可のままです。

同じ安定したサブジェクト パスを持つ 2 つの完全な DID は、依然として 2 つの異なる DID です。パスの一致は、主題の連続性を判断するための必要な条件にすぎません。検証者は、この仕様に従って `successorDid` 文書チェーンと対応する DID 文書 `proof` を検証した後でのみ、DID を同じ継続サブジェクトとして扱うことができます。

さらに、さまざまなタイプの識別子システムで DID のサポートを追加し、集中型、連合型、および分散型の識別子システム間に相互運用可能なブリッジを作成できます。これは、既存の集中識別子システムを完全に再構築する必要がなく、システム間の相互運用性を実現するためにそのベースにのみ DID を作成できることを意味し、技術的な実装の困難さが大幅に軽減されます。

<a id="wba-method-rules"></a>
## 2. did:wba DIDメソッドの仕様

### 2.1 メソッド名

この DID メソッドを識別するために使用される名前文字列は `wba` です。この方法を使用する DID は、プレフィックス `did:wba` で始まる必要があります。 DID 仕様によれば、この文字列は小文字である必要があります。 DID の残りの部分 (プレフィックスの後) を以下に指定します。

### 2.2 メソッド固有の識別子

メソッド固有の識別子は、TLS によって保護された完全修飾ドメイン名 (FQDN) であり、オプションで DID ドキュメントへのパスが含まれます。有効なドメイン名の構文を説明する正式な規則は、次のとおりです。 [(RFC1035)](https://www.rfc-editor.org/rfc/rfc1035), [(RFC1123)](https://www.rfc-editor.org/rfc/rfc1123)、そして [(RFC2181)](https://www.rfc-editor.org/rfc/rfc2181).

メソッド固有の識別子は、最新の TLS サービス認証ルールに従ってサーバー証明書と一致する必要があります。ドメイン名の一致 MUST DNS 識別子 (`dNSName`) 証明書の `subjectAltName` 拡張子。実装 MUST NOT サービス ID 照合の基礎として共通名 (CN) に依存します。メソッド固有の識別子には IP アドレスを含めることはできません。ポート番号を含めることはできますが、パスとの競合を防ぐために、ホストとポートの間のコロンをパーセントでエンコードする必要があります。ディレクトリとサブディレクトリは、区切り文字としてスラッシュの代わりにコロンを使用して、オプションで含めることができます。

Did:wba は 2 つの形式をサポートします。

1. 裸のドメイン名 DID: ドメイン名サブジェクト全体を識別するために使用され、クロスドメインのサービス間の HTTP ID 認証などのドメインレベルのサービス ID にも使用できます。
2. パスタイプ DID: ドメイン名の下で特定のユーザー、エージェント、またはサブアイデンティティを識別するために使用されます。

新しく作成されたパスタイプ Did:wba の場合、この仕様では、デフォルトのスキームとして「パスの最後のセグメントがバインディング公開キーのフィンガープリントを保持する」と定義されています。フィンガープリント セグメントの前のパス セグメントは、`user:alice`、`agents:billing` など、実装者によって定義されます。

ABNF は次のように定義されます。

```abnf
base64url-char = ALPHA / DIGIT / "-" / "_"
path-segment   = 1*(ALPHA / DIGIT / "-" / "_" / ".")
e1-fingerprint = "e1_" 43base64url-char

wba-root-did = "did:wba:" domain-name
wba-path-did = "did:wba:" domain-name 1*(":" path-segment) ":" e1-fingerprint
wba-did      = wba-root-did / wba-path-did
```

> 説明:
> 1. 主な仕様のデフォルト パス プロファイルは、 `e1_`.  
> 2. 実装が secp256k1 パス バインディングと互換性がある必要がある場合は、を参照してください。 `k1_` 互換性のある拡張子は付録 A に記載されています。

#### ネイキッドドメイン名DIDの使い方

`did:wba:{domain}` の使用法は `did:web:{domain}` と似ています。主なルールは次のとおりです。

1. 解決方法は、did:web のネイキッド ドメイン名エントリと一致しています。
`did:wba:example.com` は `https://example.com/.well-known/did.json` に対応します
2. ネイキッド ドメイン名 DID は、特定のユーザーやサブ ID ではなく、主に「ドメイン名サブジェクト全体」または「ドメイン レベルのサービス ID」を表現するために使用されます。
3. ANP のクロスドメインのサービス間呼び出しでは、 `ANPMessageService` 外部 HTTP ID 認証のために独自の DID を宣言する必要があるため、 **SHOULD** ネイキッド ドメイン名 DID を好みます。
4. ネイキッド ドメイン名 DID には、 `e1_` パス バインディング フィンガープリントのため、この仕様のパス バインディング検証ルールは、 `e1_` パス タイプ DID は適用されません。
5. 認証のリクエストは次のとおりです [ANP-02 共通 HTTP 認証と WBA バインディング](../02-anp-did-authentication-protocol-specification.md#wba-binding)。ベアドメイン形式では、ダイジェスト、署名範囲、認証目的、時間、または再生要件が免除されません。ネイティブ Web は ANP-02 Web バインディングを使用します。

ANP でネイティブ `did:web` が上記のプロセスにどのように参加するかについて詳しくは、付録 B を参照してください。

### 2.2.1 デフォルトのパス スキーム: `e1_` 公開鍵のフィンガープリントをバインドします

新しく作成されたパス タイプの場合、did:wba、最後のパス セグメント MUST になる `e1_` バインディング公開鍵指紋セグメント。 `e1_` は、バインディング キーが Ed25519 公開キーであり、DID が主要な仕様のデフォルト プロファイルを採用していることを示します。

推奨される構造は次のとおりです。

```plaintext
did:wba:{domain}:{namespace...}:{e1-fingerprint}
```

例:

```plaintext
did:wba:example.com
did:wba:example.com:user:alice:e1_<fingerprint>
did:wba:example.com%3A3000:user:alice:e1_<fingerprint>
```

既存の展開と互換性を持たせるために、パーサー MAY は、フィンガープリント セグメントのない履歴パスタイプ DID の解析をサポートしています。ただし、新しく作成されたパスタイプ DID SHOULD は、この仕様で定義されているデフォルトのスキームを採用します。

### 2.2.2 `e1_` フィンガープリント生成方法 (推奨)

`e1_` フィンガープリントは、パスタイプ DID を Ed25519 バインディング公開キーに関連付けるために使用されます。生成方法は以下の通りです。

1. DID バインディング キーを選択します。バインディングキー MUST 次の条件を満たしていること。
   -  は Ed25519 公開鍵です。
   - 代表者 `Multikey` / `publicKeyMultibase` DID 文書内。
   - によって認可されました `authentication` DID ドキュメントの関係。

2. Ed25519を変換する `publicKeyMultibase` 同等の公開鍵 JWK に変換します。同等の JWK は、RFC 7638 で要求される必要なフィールドのみを保持します。

```json
{
  "crv": "Ed25519",
  "kty": "OKP",
  "x": "..."
}
```

具体的には:

- `publicKeyMultibase` マルチベースのbase58-btcエンコードである必要がありますEd25519 `Multikey`;
-  デコード後、Ed25519 公開キーの元の 32 バイトが取得されます。
- `x` これは、この 32 バイトの公開キーの Base64url (パディングなし) 表現です。

3. 次の規則に従って JWK サムプリント入力を生成します。 [RFC 7638](https://www.rfc-editor.org/rfc/rfc7638):
   - 必要なフィールドのみを保持します。
   - フィールド名は辞書順に並べ替えられます。
   - 余分な空白を含まない JSON 文字列を使用します。
   -  UTF-8 エンコードを使用します。

4. 手順 3 で取得した UTF-8 バイト シーケンスに対して SHA-256 ハッシュを実行し、32 バイトのダイジェスト値を取得します。

5. Base64url は 32 バイトのダイジェスト値をエンコードし、末尾の文字列を削除します。 `=` パディング。エンコード結果の長さは 43 文字に固定されます。

6. を追加します。 `e1_` 最終的なパスセグメントを取得するには、エンコード結果の前にプレフィックスを付けます。

注:

1. の `e1_` プレフィックスはハッシュ出力の一部ではなく、プロファイルのプレフィックスです。
2. サムプリント値を使用することをお勧めします。 `e1_` プレフィックスとして `kid` または、DID パスと検証方法の識別の間の直観的な対応を容易にする検証方法の一部。
3. 新しい展開 SHOULD を優先的に使用します `e1_` プロフィール。

### 2.2.3 安定したサブジェクトパス

バインディング フィンガープリント パス スキームを使用するパス タイプ DID の場合、安定したサブジェクト パスは、ドメイン名と、最後のバインディング フィンガープリント セグメントの前のすべてのパス セグメントで構成されます。

```text
did:wba:example.com:user:alice:e1_<fingerprint>
        └──── stable subject path: example.com:user:alice ────┘
```

安定したサブジェクト パス MUST は次の要件を満たしています。

1. 継続的な主題に割り当てられると、 MUST NOT 変更、リサイクル、または別の主題に再割り当てされる。
2. ルート バインディング キーの変更によって新しい DID が生成されると、古い DID と新しい DID の安定したサブジェクト パスが作成されます。 MUST 同一であること。
3. 検証者 MUST NOT 2 つの DID は同じ安定したサブジェクト パスを持っているという理由だけで同じサブジェクトに属していると結論付けます。
4. 主題の連続性 MUST 古い DID 文書を検証することにより、セクション 2.5.2 から 2.5.5 に従って検証されます。 `successorDid`、ドキュメント全体 `proof`、および新しい DID のバインディング フィンガープリント。

### 2.4 主要資料と文書処理

ほとんどの Web サーバーがコンテンツをレンダリングする方法により、特定の Did:wba ドキュメントがメディア タイプ application/json で提供される可能性があります。 Did.json という名前のドキュメントが取得された場合は、次の処理ルールに従う必要があります。

1. @context が JSON ドキュメントのルートに存在する場合、ドキュメントは JSON-LD ルールに従って処理される必要があります。処理できない場合、または文書処理が失敗した場合は、did:wba 文書として拒否する必要があります。

2. もし `@context` が JSON ドキュメントのルートに存在し、ドキュメントは JSON-LD を通じて正常に処理され、コンテキストには次のものが含まれます。 `https://www.w3.org/ns/did/v1`に応じて、さらに処理して DID ドキュメントにすることができます。 [[DID コア仕様のセクション 6.3.2](https://www.w3.org/TR/did-core/#consumption-0)].

3. @context が存在しない場合、DID 処理は、で指定された通常の JSON ルールに従って実行されます。 [[Did-core 仕様セクション 6.2.2](https://www.w3.org/TR/did-core/#consumption)].

4. 外部リソース、外部 DID、または `serviceEndpoint` MUST 絶対 URI を使用します。

5. 同じ DID ドキュメントの内部検証メソッドへの参照 MAY 相対 DID URL (例: `#key-1`);パーサーがそのような参照を処理するときは、ドキュメント ルート DID に基づいて展開する必要があります。

> 注: これには、キーマテリアルやその他のメタデータに埋め込まれた外部 URL が含まれており、キーの難読化攻撃を防ぎます。

### 2.5 DID 文書の説明

DID コアとは別に、関連仕様は時間の経過とともに進化する可能性があります。このセクションでは、認証に使用される DID ドキュメントのサブセットを示します。システム間の相互運用性を向上させるには、必須としてマークされたすべてのフィールドがすべてのシステムでサポートされる必要がありますが、オプションとしてマークされたフィールドは選択的にサポートされる可能性があります。他の標準で定義されているがここにリストされていないフィールドも、選択的にサポートされる場合があります。

**推奨される e1 パスタイプの DID ドキュメントの例は次のとおりです:**

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

**フィールドの説明**:

- **@context**: 必須フィールド。JSON-LD コンテキストは、ドキュメントの理解性と相互運用性を確保するために DID ドキュメントで使用されるセマンティクスとデータ モデルを定義します。 `https://www.w3.org/ns/did/v1` が必要です。標準の Ed25519 プルーフを使用する e1 ドキュメントの場合、 `https://w3id.org/security/data-integrity/v2` そして `https://w3id.org/security/multikey/v1` も必要です。他は必要に応じて追加されます。

- **ID**: 必須フィールド。IP は伝送できませんが、ポートは伝送できます。ポートを運ぶときは、コロンを次のようにエンコードする必要があります。 `%3A`。後でコロンを使用してパスを分割します。新しく作成されたパス DID の場合、最後のパス セグメント MUST なる `e1_<fingerprint>`.

- **としても知られています**: DID Core によって定義されるオプションのフィールド。ルート バインディング キーの変更により新しい DID が生成されると、新しい DID ドキュメントが作成されます。 MAY このフィールドを使用して、その直接の前任者 DID を参照します。 `alsoKnownAs` 逆関連性の主張のみを表現しており、それ自体は主題の連続性の暗号学的証明を構成しません。

- **無効化された**: DID ドキュメントを直接取得するために定義されたオプションの Did:wba 拡張フィールド。の値 `true` 完全な DID が新しい認証やビジネス ルーティングには使用されなくなり、その DID ドキュメントは履歴の検証や後続の検索に引き続き利用できることを示します。

- **後継者になりました**: Did:wba によって定義されるオプションの拡張フィールド。その価値 MUST 置き換えられた DID からその直接の後継 DID を指す完全な DID 文字列である必要があります。それ MUST NOT 中間の DID をスキップし、後続の DID を直接指すように書き換えられます。

- **検証方法**: DID サブジェクトの検証に使用される公開キー情報を定義する検証メソッドの配列を含む必須フィールド。エンドツーエンド暗号化 (E2EE) 通信をサポートする必要があるシナリオの場合、 `verificationMethod` 鍵を分離するには、署名鍵と鍵合意鍵の両方を含める必要があります。署名キーは ID 認証とドキュメント アサーションに使用されます。キー合意キー (例: `X25519KeyAgreementKey2019`）は、上位層プロトコルの鍵ネゴシエーションや機密情報の受信に使用されます。どちらのタイプのキーもそれぞれ独自の役割を果たし、単一のキーが漏洩しても、身元認証と通信の機密性が同時に影響を受けることはありません。

デフォルトのパス スキームを使用するパス タイプ DID の場合、 MUST 少なくとも 1 つの Ed25519 であること `Multikey` で `verificationMethod` バインディング キーとして使用されており、同等の公開キー JWK の RFC 7638 サムプリントは、最後のものとまったく同じです。 `e1_` DID パスのフィンガープリント セグメント。

- **サブフィールド**:
    - **id**: 検証方法の一意の識別子。
    - **type**: 検証方法のタイプ。
    - **controller**: この検証方法の DID を制御します。
    - **publicKeyJwk**: JSON Web キー形式を使用した公開キー情報。
    - **publicKeyMultibase**: マルチベース形式を使用した公開鍵情報。

- **認証**: 必須フィールド。認証に使用される検証方法をリストします。文字列またはオブジェクトを指定できます。デフォルトのパス スキームを使用するパス タイプ DID の場合、バインディング キー MUST によって認可される `authentication` 関係。デフォルトでは、クロスプラットフォーム認証では、このバインディング キーを使用した署名が優先されます。

- **アサーションメソッド**: アサーションを表現するために使用される検証方法をリストするオプションのフィールド。 e1 プロファイルを持ち、標準 DID 文書証明、バインディング キーまたは Ed25519 を使用する DID の場合 `Multikey` 証明を生成するために使用される MUST によって認可される `assertionMethod`.

- **鍵合意**: 鍵の合意に使用される公開鍵情報を定義するオプションのフィールドで、2 つの DID 間の暗号化通信に使用できます。検証方法では通常、鍵交換に使用できる X25519KeyAgreementKey2019 などの鍵合意アルゴリズムが使用されます。 `keyAgreement` 文字列参照 (次のエントリを指す) にすることができます。 `verificationMethod`) または埋め込みオブジェクト。エンドツーエンド暗号化 (E2EE) シナリオの場合、このフィールドは、上位層プロトコルにキー ネゴシエーション マテリアルを提供するために使用されます。上位層プロトコルには、ダイレクト メッセージングのエンドツーエンド暗号化プロファイル、グループ エンドツーエンド暗号化プロファイル、または将来定義されるその他のセキュリティ オーバーレイを使用できます。この仕様はハードコードではありません `keyAgreement` 特定のアルゴリズムプロセスに組み込まれます。通常、新しいデプロイメントには次のものが含まれます。 `X25519KeyAgreementKey2019` または意味的に同等の X25519 エントリ。ない場合 `keyAgreement` DID ドキュメントに記載されていない場合、または上位層プロトコルで使用可能なネゴシエーション エントリがない場合は、エージェントが関連する E2EE 機能をサポートしていないことを意味します。

- **サブフィールド**:
    - **id**: 鍵合意方式の一意の識別子。
    - **type**: 鍵共有方式のタイプ。
    - **controller**: キーのネゴシエーション方法を制御する DID。
    - **publicKeyMultibase**: マルチベース形式の公開鍵情報。

- **service**: DID サブジェクトに関連付けられたサービスのリストを定義するオプションのフィールド。
  - **id**: サービスの一意の識別子。
  - **type**: サービスのタイプ。現在、次のタイプがサポートされています。
    - `AgentDescription`: エージェント説明サービス。 `serviceEndpoint` に準拠した文書を指します。 [ANP エージェントの説明 プロトコル仕様](07-anp-agent-description-protocol-specification.md).
    - `ANPHandleService`: ハンドル バインディング サービス。WNS (WBA ネーム スペース) の双方向バインディング検証に使用されます。 `serviceEndpoint` MUST ハンドルプロバイダーのドメインの下にある逆参照可能な絶対 HTTPS URI である必要があります。詳細については、 [ANP DID:WBA 名前空間の仕様](04-anp-did-wba-name-space-specification.md).
      - DID 保有者がハンドルを開示する意思がある場合、 `serviceEndpoint` SHOULD そのハンドルの標準解決エンドポイントを直接使用します (例: `https://example.com/.well-known/handle/alice`).
      - DID 保有者が DID 文書でハンドルを開示したくない場合、 `serviceEndpoint` MAY DID 確認エンドポイントを指します (例: `https://example.com/.well-known/handle/by-did?did=...`)、少なくとも `did` そして `confirmed = true`.
      - 返送された書類に以下の内容が含まれている場合 `handle` 入力ハンドルと正確に一致すると、検証者はその特定のハンドルの正確な逆検証を完了できます。
      - 返された文書に確認情報のみが含まれている場合、検証者は提供者関係のみを確認できます。それ MUST NOT 特に特定のハンドルの確認が必要なセキュリティが重要なシナリオでは、その結果だけを、特定のハンドルがバインドされていることが検証されたことを意味するものとして扱います。
    - `ANPMessageService`: ANP のインスタント メッセージング用の統合サービス エンドポイント。 DID サブジェクトが ANP インスタント メッセージング プロトコルに参加している場合、 `serviceEndpoint` **MAY** ユニファイド ANP メッセージング エンドポイントを指します。ダイレクト メッセージング、グループ メッセージング、キー マテリアル アクセス、添付ファイル制御、およびその他の機能は、この単一のサービス エンドポイントによって実行されます。具体的なメソッドと機能の説明は、ANP プロファイル 2 および関連プロファイルに従います。サービスがクロスドメインのサービス間の呼び出しに参加する必要がある場合、サービス エントリ **SHOULD** 追加で宣言する `serviceDid`、サービスが外部の HTTP リクエスト署名で使用する DID を示します。 Did:wba デプロイメントの場合、ネイキッド ドメイン名 DID ( `did:wba:example.com` または `did:wba:example.com%3A8800`) 通常は使用する必要があります。
  - **serviceEndpoint**: サービスのエンドポイント URL。
  - **serviceDid**: オプションのフィールド。サービスがクロスドメインのサービス間の呼び出しに参加する場合は、このフィールドを宣言することをお勧めします。その値は DID URL ではなく DID 文字列である必要があり、ピアに「この外側の HTTP リクエストの署名を検証するためにどの DID の公開キーを使用する必要があるか」を伝えます。

- **証拠**：デフォルトの場合 `e1_` プロフィール、 `proof` は必須フィールドです。他のプロファイルの場合、このフィールドが表示されるかどうかは、対応するプロファイル ルールによって決まります。 `proof` DID ドキュメントの完全性証明を表現するために使用され、証明の生成後に DID ドキュメントが改ざんされていないことを証明し、証明の作成時に署名者が対応する秘密キーを管理していたことを示します。 Proof 自体は、DID メソッドの解析プロセスのみを置き換えるものではなく、また、Proof 自体が DID メソッドの解析プロセスのみを置き換えるものでもありません。 `id` 一貫性チェック。
  - デフォルトの e1 プロファイルの場合、このバージョンでは次のように定義されます。 `DataIntegrityProof` + `eddsa-jcs-2022` W3C 標準に基づいたプルーフ プロファイル。

> 注:
>
> 1. 公開鍵情報は現在 2 つの形式をサポートしています。 `publicKeyJwk` そして `publicKeyMultibase`。参照 [https://www.w3.org/TR/did-extensions-properties/#verification-method-properties](https://www.w3.org/TR/did-extensions-properties/#verification-method-properties) 詳細については。
> 2. 検証方法のタイプの定義については、を参照してください。 [https://www.w3.org/TR/did-extensions-properties/#verification-method-types](https://www.w3.org/TR/did-extensions-properties/#verification-method-types). e1 バインディング キーの場合、 `Multikey` が推奨されます。

> 6.  エンドツーエンドの暗号化通信をサポートする必要があるシナリオでは、キー分離設計を採用することをお勧めします。つまり、署名/アサーション キーとキー合意キーは個別に管理されます。署名/アサーション キーはキー合意には関与せず、キー合意キーは署名に関与しません。これらのマテリアルの具体的な用途は、上位層のダイレクト メッセージング E2EE、グループ E2EE、およびその他のプロファイルによって定義されます。
> 7. デフォルトのパス スキームを使用して新しく作成されたパス タイプ DID の場合、バインディング キー MUST を満たす：
> - を使用して表されます `Multikey` / `publicKeyMultibase`;
> - によって認可された `authentication` 関係。
> - 同等の公開鍵 JWK の RFC 7638 サムプリントは、最後のものとまったく同じです。 `e1_` DID パスのフィンガープリント セグメント。
> 8. 実装で secp256k1 パス バインディングをサポートする必要がある場合は、付録 A を参照してください。 `k1_` 互換性のある拡張機能。

### 2.5 DIDメソッドの操作

#### 2.5.1 作成(登録)

Did:wba メソッド仕様では、特定の HTTP API 操作は指定されていませんが、プログラムによる登録と管理は、Web 環境の要件に従って定義する各実装に委ねられています。

DID を作成するには、次の手順が必要です。

1. ドメイン名の使用をドメイン名登録事業者に申請します。
2. DNS クエリ サービスにホスティング サービスの場所と IP アドレスを保存します。
3. パスタイプの DID を作成する場合は、まず Ed25519 バインディング キーを生成し、 `e1_` セクション 2.2.2 による指紋セグメント。
4. 適切なキーペアを含む DID ドキュメント JSON-LD ファイルを作成し、 `did.json` 配下のファイル `.well-known` ドメイン名全体を表す URL、またはドメイン名で複数の DID を解決する必要がある場合は指定されたパスの下。

たとえば、ドメイン名 `example.com` の場合、`did.json` は次の URL で利用できます。

```plaintext
Example: Creating a DID
did:wba:example.com
 -> https://example.com/.well-known/did.json
```

ネイキッド ドメイン名 DID の作成およびホスティング方法は、did:web のネイキッド ドメイン名エントリと一致しています。ドメイン名の所有者は、`/.well-known/did.json` で対応する DID ドキュメントを提供するだけでよく、DID はドメイン名サブジェクト ID またはドメインレベルのサービス ID として使用できます。

ネイキッド ドメイン名の代わりにオプションのパスが指定され、デフォルトのパス スキームが使用される場合、 `did.json` のパスの下で利用可能になります `e1_` 指紋セグメント:

```plaintext
Example 5: Creating a path-based DID with the default path scheme
did:wba:example.com:user:alice:e1_<fingerprint>
 -> https://example.com/user/alice/e1_<fingerprint>/did.json
```

ドメイン名でオプションのポートが指定されている場合は、パスとの競合を防ぐために、ホストとポートの間のコロンをパーセントでエンコードする必要があります。

```plaintext
Example 6: Creating a DID with an optional path and port
did:wba:example.com%3A3000:user:alice:e1_<fingerprint>
 -> https://example.com:3000/user/alice/e1_<fingerprint>/did.json
```

> 説明:
> 実装で secp256k1 を使用したバインディング パス DID が必要な場合は、付録 A を参照してください。 `k1_` 互換性のある拡張子。

#### 2.5.2 読み取り（解析）

`did:wba` DID から DID ドキュメントを解析するには、次の手順を実行する必要があります。

- 交換する `:` と `/` メソッド固有の識別子で完全修飾ドメイン名とオプションのパスを取得します。
- ドメイン名にポートが含まれている場合、コロンをパーセントでデコードします。
- 先頭に追加して HTTPS URL を生成する `https://` 予想される DID ドキュメントの場所に移動します。
- URL にパスが指定されていない場合は、 `/.well-known` が追加されています。
- 追加 `/did.json` をクリックして URL を完成させます。
- 「」で説明されているセキュリティ要件を強制する安全な HTTPS 接続を正常にネゴシエートできるプロキシを使用して、URL への HTTP GET リクエストを実行します。 [セクション 2.6 セキュリティとプライバシーに関する考慮事項](https://w3c-ccg.github.io/did-method-web/#security-and-privacy-considerations).
- ことを確認します。 `id` 解析された DID ドキュメントの一致する `did:wba` DID が解析されています。
- のために `e1_` メイン仕様で定義されているパスタイプ DID が設定されていない `deactivated = true`、次の厳密な結合関係 MUST 検証される:
  - DID ドキュメントのトップレベル `proof` 存在しなければなりません。
  - `proof` 通過しなければなりません `DataIntegrityProof` + `eddsa-jcs-2022` 検証。
  - が指摘する検証方法は、 `proof.verificationMethod` MUST Ed25519になる `Multikey` (または意味的に同等の Ed25519 検証メソッド表現);
  - に対応する Ed25519 公開キーを使用して RFC 7638 サムプリントを計算します。 `proof.verificationMethod`、結果は最後のものと完全に一致する必要があります。 `e1_` DID パスのフィンガープリント セグメント。
- のために `e1_` 設定する DID `deactivated = true`:
  - 検証者 MUST フィンガープリントが DID パスと一致する元のバインディング キーが文書内でまだ見つかります。 `e1_` 指紋;
  - 文書に次の内容が含まれている場合 `successorDid`、検証者 MUST 古い DID と新しい DID が同じ安定したサブジェクト パスを持っていることを確認します。
  - ドキュメント全体の場合 `proof` 元のバインディング キーで署名されている場合、移行は検証済みとして扱われる場合があります。
  - ドキュメント全体の場合 `proof` 事前承認された回復キーによって署名されている場合、検証者が非アクティブ化前から信頼できる DID ドキュメントをすでに保持しており、信頼できるドキュメントが回復キーを事前承認していることを確認できる場合にのみ、移行は回復検証済みとして扱われます。 `assertionMethod`;
  - トップレベルがない場合 `proof` 存在する、スタンドアロンのホップ検証機能 MAY 読む `successorDid` として `unverified` 移行のヒント。認証された同一オリジン HTTPS を通じてすべてのドキュメントを取得し、すべてのダイレクト ホップを検証し、最終的なアクティブに到達したリゾルバー `e1_` 有効な拘束力のある証拠を持つ DID MAY 署名されていないホップを次のように報告します `provider_asserted`。孤立した `successorDid` または、認証された完全なチェーンコンテキストなしで提供されたドキュメントは残ります `unverified`.
- HTTP GET リクエスト中に DNS 解決を実行する場合、クライアントは次を使用する必要があります。 [[RFC8484](https://w3c-ccg.github.io/did-method-web/#bib-rfc8484)] 解決される身元の追跡を防ぐため。
- アクティブな方のために `e1_` DID、上記の証明検証はローカル ポリシーの切り替えの影響を受けず、解析が成功するための必要条件です。
- 他のプロファイルの場合、ローカル ポリシーで DID 文書証明検証が有効になっており、文書に次の内容が含まれている場合 `proof`、対応するプロファイル ルールに従って検証する必要があります。

ベアドメイン DID の場合、メソッド解決では次を使用します。 `/.well-known/did.json` そして小切手 `id` 一貫性; E1 パス バインディングの検証は適用されません。リクエストは個別に認証されます。 [ANP-02 共通認証と WBA バインディング](../02-anp-did-authentication-protocol-specification.md#wba-binding);この段落では、簡略化された検証フローを定義するものではありません。

> 説明:
> 実装でもサポートされている場合は、 `k1_` 付録 A の互換性のある拡張機能、解析とバインディングの検証 `k1_` DID は付録 A に従って実行されます。

#### 2.5.3 アップデート

DID ドキュメントを更新するには、DID に対応する `did.json` ファイルを更新する必要があります。

デフォルトのパス スキームを使用したパス タイプ Did:wba の場合、DID パスの最後にバインドされたキー フィンガープリントが変更されない限り、DID 自体は変更されませんが、DID ドキュメントの他の内容は変更される可能性があります (新しい検証キーの追加、古いキーの取り消し、サービス エンドポイントの更新など)。

バインディング キーが変更されると、パス タイプ DID MUST が新しい DID に変更されます。古い DID と新しい DID は 2 つの異なる DID ですが、次のルールに基づいて同じ継続サブジェクトの移行関係を確立できます。

1. 新しい DID MUST 古い DID とまったく同じ安定したサブジェクト パスを持ちます。
2. 新しい DID ドキュメント MUST 作成され、公開されます。新しい文書 MAY の直接の先行する DID を参照する `alsoKnownAs`;
3. 古い DID ドキュメント MUST 取得および設定可能な状態を維持する `deactivated = true` そして `successorDid = <new DID>`;
4. `successorDid` MUST 直接の次世代 DID のみを指します。その後の回転では、 `successorDid` 以前の DID の MUST NOT 書き換えられる。
5. 古い DID ドキュメントのドキュメント全体 `proof` カバーする必要があります `deactivated`, `successorDid`、およびその他すべてのドキュメント プロパティ。新しい DID ドキュメントにはドキュメント全体にわたる `proof` 新しいバインディング キーによって生成されます。
6. WNS/Handle などの上位層のネーム サービスも同時に新しい DID に更新する必要がありますが、ネーム サービスのマッピングは上記の移行証明に代わるものではありません。

この仕様は、プログラムによる管理インターフェイスを定義するものではありません。同時ローテーションによって複数の後続が生成されるのを防ぐために、実装 SHOULD 現在の完全な DID に対してアトミック比較アンドスワップを実行します (たとえば、 `expected_current_did`) 安定したサブジェクト パスのみに基づいて更新を送信するのではなく。

> 注:
>
> 1. git などのバージョン管理システムや GitHub Actions などの継続的統合システムを使用して、DID ドキュメントの更新を管理します。これにより、認証と監査履歴のサポートを提供できます。
> 2. HTTP API 更新プロセスでは、特定の HTTP API が指定されていませんが、プログラムによる登録と管理は各実装者に任せ、ニーズに応じて定義します。

#### 2.5.4 非アクティブ化（撤回）

永久に非アクティブ化され、後継 DID がない ID の場合、`did.json` ファイルは削除されるか、その他の方法で一般に公開されなくなる場合があります。

バインディングキーのローテーションにより新しい DID に置き換えられたパスタイプ Did:wba の場合、古い DID ドキュメント MUST NOT 削除される。それ MUST 取得および設定可能な状態を維持する `deactivated = true` そして `successorDid` 過去の署名の検証と後継者の検索をサポートします。ここで、 `deactivated` これは、この完全な DID が新しい認証とルーティングに使用されなくなったことのみを意味します。それは継続する主体が存在しなくなったという意味ではありません。

#### 2.5.5 DID 文書証明

トップレベルかどうか `proof` フィールドが表示されます `did:wba` DID ドキュメントは、プロファイルとドキュメントの状態によって異なります。デフォルトを使用するアクティブなドキュメントの場合 `e1_` プロフィール、 `proof` が必要です。非アクティブ化された `e1_` 移行書類 `successorDid` 以下に定義されているバインディング、リカバリ、認証プロバイダ、および未検証のブランチに従います。そのため、そのトップレベルは `proof` MAY 欠席すること。他のプロファイルの場合は、DID ドキュメント MAY トップレベルが含まれる `proof` 文書の完全性の証明を提供するフィールド。このフィールドは、証明の生成後に DID ドキュメントが改ざんされていないことを証明するために使用され、証明の作成時に署名者が対応する秘密キーを管理していたことを示します。 Proof 自体は DID メソッドの解析に代わるものではなく、また、 `id` 独自の一貫性チェック。

デフォルトの場合 `e1_` プロフィール、 `proof` マスター仕様で定義されたプロファイル MUST 以下に準拠します:

- 検証可能な認証情報データの整合性 1.0
- データ整合性 EdDSA 暗号スイート v1.0

`proof` オブジェクトには次のフィールドが含まれます。

- `type`: 必須フィールドです。に固定 `DataIntegrityProof`
- `cryptosuite`: 必須フィールドです。に固定 `eddsa-jcs-2022`
- `created`: 必須フィールドです。プルーフ作成時刻 (XML スキーマ日時形式)
- `verificationMethod`: 必須フィールドです。 Ed25519 を指す完全な DID URL `Multikey` 証明の生成に使用される DID ドキュメント内
- `proofPurpose`: 必須フィールドです。に固定 `assertionMethod`
- `proofValue`: 必須フィールドです。 Base58-btc マルチベースを使用します (`z...`) エンコーディング
- `domain`: オプションのフィールド
- `challenge`: オプションのフィールド

追加の制約:

1. アクティブな方のために `e1_` 文書、 `proof.verificationMethod` MUST を使用してください `e1_` バインディング キー、統合 DID パス バインディング、公開キー バインディング、およびドキュメントの整合性証明。非アクティブ化されたドキュメントの場合、 `successorDid`、代わりに、によって事前に承認された回復キーを使用する場合があります。 `assertionMethod` 信頼できる非アクティブ化前の文書に記載されていますが、 MUST NOT 非アクティブ化時にのみ導入されたキーを使用します。
2. アクティブな方のために `e1_` ドキュメント、および古いバインディング キーによる連続性を主張する非アクティブ化された遷移の場合、パーサー MUST に対応する Ed25519 公開鍵を使用して RFC 7638 サムプリントを再計算します。 `proof.verificationMethod` そしてそれが最後のものと完全に一致していることを確認します `e1_` DID パスのフィンガープリント セグメント。代わりに回復証明 MUST キーマテリアルで検証され、 `assertionMethod` 信頼できる非アクティブ化前の文書からの承認。回復キーが一致する必要はありません。 `e1_` 結合指紋。
3. の生成と検証 `proof` しなければなりません（MUST) の標準アルゴリズムプロセスに従います。 `eddsa-jcs-2022`となり、アルゴリズムの詳細はこの仕様によって書き換えられることはなくなります。

アクティブな `e1_` `did:wba` DID ドキュメントを解析する場合、証拠検証はオプションの拡張チェックではなく、パス バインディング セマンティクスの一部です。 `proof` が欠落している場合、証明検証は失敗するか、`proof.verificationMethod` が `e1_` バインディング フィンガープリントと一致しない場合、MUST の解析は失敗します。

`e1_` DID の場合、`proof` がなくてもアクティブな DID ドキュメントを解析できる緩和モードはありません。

設定されている古い DID ドキュメントの場合 `deactivated = true` そして `successorDid`、トップレベル `proof` 削除後も完全な文書に対する文書全体のプルーフが残ります。 `proof`:

- 古い DID のバインディング キーで署名すると、結果は強力な暗号化の継続性を提供します。
- 古い DID によって認証された回復キーによって署名された場合 `assertionMethod` 非アクティブ化する前に、検証者は MUST 以前に信頼された国家からの事前の許可を確認します。
- トップレベルなら `proof` 存在します、それは MUST 古い拘束力のある証明または事前承認された回復証明のいずれかとして検証します。不正な形式、不正な証明、または暗号的に無効な証明 MUST 移行を無効にし、 MUST NOT プロバイダ アサーションまたは未検証のヒントにダウングレードされる。
- 古い秘密キーも事前に承認された回復キーも利用できない場合、トップレベルの `proof` MAY 欠席すること。スタンドアロンのホップ検証器 MUST そのホップを次のようにレポートします `unverified`。完全なチェーン リゾルバー MAY 次のように報告する `provider_asserted` 認証された同一オリジン HTTPS を通じて先行者とすべての後続者を取得し、すべてのホップで安定したサブジェクト パスと直接後継者関係を検証し、最終的なアクティブに到達した後にのみ、 `e1_` 拘束力証明が検証される DID。失敗したチェーンまたは不完全なチェーン MUST NOT 生産する `provider_asserted`.

移行保証には、正確に次の意味があります。

- `verified`: 先行者の元のバインディング キーは、ドキュメント全体の非アクティブ化と直接後継者の関係に署名します。
- `recovery_verified`: によって事前に認証された回復キー `assertionMethod` 信頼できる非アクティブ化前の文書でその関係に署名します。
- `provider_asserted`: 認証された同一オリジン HTTPS プロバイダーの解決により、証明有効なアクティブ DID への構造的に有効なチェーン全体が完了するか、アイデンティティ プロバイダーが、個別に認証された回復/移行権限チャネルを通じて同じ先行者から後続者へのファクトを提供します。この保証は DID 文書のプロパティではなく、 MUST NOT に昇進する `verified` または `recovery_verified`;
- `unverified`: 孤立したものだけ `successorDid`, `alsoKnownAs`、ハンドル/WNS マッピング、HTTP 409 ヒント、スタンドアロンの署名されていないホップ、不完全なチェーン、または認証されたプロバイダーの来歴のないドキュメントが利用可能です。

`e1_` 以外のプロファイルの場合、実装 MAY は、対応するプロファイル ルールまたはローカル ポリシーに従って、次の 2 つのモードのいずれかを選択します。

1. リラックス モード: DID ドキュメントに次の内容が含まれていない場合 `proof`、解析は引き続き続行できます。
2. 厳密モード: ローカル ポリシーで証明が必要な場合、 `proof` DIDドキュメント内 MUST 検証失敗とみなされます。
**規範的注記**:

DID の場合、 `e1_` プロファイルでは、この仕様ではトップレベルの `proof` DID ドキュメントのデータ整合性証明メカニズムは W3C 標準を使用します。その証明データ モデル、証明構成、文書変換、ハッシュ化、証明シリアル化、および検証ルールは次のとおりです。 [検証可能な資格情報データの整合性 1.0](https://www.w3.org/TR/vc-data-integrity/) そして [データの整合性 EdDSA 暗号スイート v1.0](https://www.w3.org/TR/vc-di-eddsa/) それぞれ。この仕様は、did:wba シナリオにおける証明の使用場所、フィールド要件、検証関係のみを制限し、基礎となる暗号アルゴリズムを繰り返し定義するものではありません。競合が発生した場合は、上流の W3C 仕様が優先されます。

### 2.6 セキュリティとプライバシーに関する考慮事項

セキュリティとプライバシーに関する考慮事項については、以下を参照してください。 [[Did:Web メソッド仕様セクション 2.6](https://w3c-ccg.github.io/did-method-web/#security-and-privacy-considerations)]。実装者は、デフォルトのパス スキームでのバインディング キーの変更によって引き起こされる DID ローテーションや、ネーム サービスの同期の問題にもさらに注意を払う必要があります。

このバージョンでは、独立して検証可能なログは必要ありません。完全な解決が成功すると、クライアントは SHOULD ホップ保証が有効な後続エッジのみをキャッシュします。 `verified` または `recovery_verified`. `provider_asserted` そして `unverified` エッジ MUST NOT その検証済みエッジキャッシュを入力します。無効な最終プルーフ、サイクル、およびホップ制限の失敗を含む、キャッシュコミットステップ前の検証失敗。 MUST NOT 失敗したチェーンのプレフィックス エッジをその中に残します。キャッシュされた検証済みエッジと新しく観察されたエッジの場合 `successorDid` 同じ古い DID に同意しない、移行チェーンにサイクルが含まれているか、後続の DID に別の安定したサブジェクト パスがある、クライアント MUST 移行を拒否し、競合を上位層に報告します。

新しい展開 SHOULD を好む `e1_` 標準証明の相互運用性を向上させるためのプロファイル。実装がウォレット エコシステムおよび既存の secp256k1 実装と互換性がある必要がある場合は、を参照してください。 `k1_` 互換性のある拡張子は付録 A に記載されています。

## 3. did:wba メソッドと HTTP プロトコルに基づくクロスプラットフォーム ID 認証

共通認証は次のように定義されています。 [ANP-02 第3章](../02-anp-did-authentication-protocol-specification.md#http-binding)。 WBA のメソッド規則は第 2 章に残ります。リクエスト形式、検証フロー、および実装ポリシーは、リリース前の認証設計から維持されます。

<a id="wba-auth-binding"></a>
### 3.1 リクエスト認証の WBA 方式の制約

ANP-02 は、共通のリクエスト形式と署名検証を定義します。 This section supplies WBA method requirements without applying them to other DID methods.

#### 3.1.1 認証キーの選択

のために `did:wba` E1 プロファイルを使用するクライアント SHOULD デフォルトでは、最後のに対応するバインディング キーを使用して署名します。 `e1_` DID パスのフィンガープリント セグメント。サーバーが他のものを許可している場合 `authentication` 検証メソッドの場合、これはローカル認可ポリシーに属し、DID のバインディング セマンティクスを変更しません。

> 説明:
> 実装でもサポートされている場合は、 `k1_` 互換性のある拡張子 [付録 A](appendix-a-did-wba-k1-compatibility-extension.md)、次に、その認証署名 `k1_` DID は次のように実行できます。 [付録 A](appendix-a-did-wba-k1-compatibility-extension.md).

#### 3.1.2 Method state and identity binding

**DID文書を読む**: DID に基づいて DID ドキュメントを解析します。原稿がセットされている場合 `deactivated = true`、サーバー MUST NOT 新しい認証には引き続きその DID を使用します。文書に次の内容が含まれている場合 `successorDid`、サーバーは、で定義された DID に置き換えられたエラーを返す必要があります。 [この章の 409 応答](../03-did-wba-method-design-specification.md#http-superseded).

   - のために `did:wba` E1 DID、DID バインディング関係は、に対応する Ed25519 公開キーに基づいて検証する必要があります。 `proof.verificationMethod` Ed25519 キーをランダムに選択する代わりに、 `authentication`:
     - `proof` 存在して通過する必要があります `eddsa-jcs-2022` 検証。
     - この公開キーを使用して RFC 7638 サムプリントを再計算し、その結果を MUST 前回とまったく同じである `e1_` DID パスのフィンガープリント セグメント。

> 説明:
> 実装でもサポートされている場合は、 `k1_` 互換性のある拡張子 [付録 A](appendix-a-did-wba-k1-compatibility-extension.md)、次にバインディング検証と認証検証 `k1_` DID は次のように実行されます。 [付録 A](appendix-a-did-wba-k1-compatibility-extension.md).

<a id="http-superseded"></a>
### 3.2 WBA HTTP 409 DID 置き換えられた応答

リクエストの対象となる DID または認証に使用される DID が `deactivated = true` に設定され、後続の DID がある場合、サーバーは `409 Conflict` を返す場合があります。

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

応答の `currentDid` は未確認のヒントにすぎません。クライアント MUST NOT このフィールドに基づいて直接再試行してください。代わりに、古い DID ドキュメントを取得する必要があります。検証する `deactivated`, `successorDid`、およびドキュメント全体 `proof`;次に、現在のアクティブな DID が見つかるまで、各後続 DID を順番に解決します。クライアントは、リクエストを再度送信する前に、現在の DID を使用して新しい署名を生成する必要があります。透明な `301` / `302` リダイレクトはこの検証プロセスを置き換えるべきではありません。

## 4. did:wba メソッドと JSON 形式のデータ伝送に基づくクロスプラットフォーム ID 認証プロセス

認証メタデータの搬送は次のように定義されます。 [ANP-02 第4章](../02-anp-did-authentication-protocol-specification.md#json-carriage)、そのフィールド、シリアル化規則、コンポーネント マッピング、および検証フローを保持します。

## 5 人間による認証とインテリジェントエージェントによる自動認証を区別する

参照 [ANP-02 第5章](../02-anp-did-authentication-protocol-specification.md#5-authentication-and-application-authorization).

## 6 プライバシー保護ポリシー

参照 [ANP-02 第6章](../02-anp-did-authentication-protocol-specification.md#6-privacy-considerations).

安定した外部参照が必要でありながら、基になる DID をローテーションする必要があるシナリオの場合は、ネーム サービス (WNS/ハンドルなど) と組み合わせて使用することをお勧めします。ハンドルは安定したままで人間が判読できるため、バインディング キーの変更に応じて基になる Did:wba をローテーションできます。

## 7 セキュリティに関するヒント

参照 [ANP-02 第7章](../02-anp-did-authentication-protocol-specification.md#security-privacy)。メソッド固有のルールは、ここでも引き続き第 2 章を参照します。この抽出では、セキュリティ ポリシー要件は追加されません。

WBA 固有のセキュリティ要件:

   - のために `did:wba` デフォルトのパス スキームを使用する場合、バインディング キーはハードウェア分離、HSM、またはシステム エンクレーブを使用して保持するのが最適です。
   - のために `did:wba` バインディング キーを使用すると、クロスプラットフォーム認証ではデフォルトでそのキーが優先されます。
   - 新しいWBAの展開 SHOULD を好む `e1_` プロフィール。
   - バインディング キーが変更されると、パスタイプ DID も変更されるため、上位レベルのネーム サービス マッピングは同期して更新される必要があります。
   - アクティブな方のために `did:wba` E1 DID、パーサー MUST 検証する `DataIntegrityProof`。非アクティブ化された `e1_` 移行ドキュメントは、バインディング、リカバリ、プロバイダーによってアサートされた、および未検証のルールに従います。 [セクション 2.5.5](../03-did-wba-method-design-specification.md#wba-method-rules)。他のプロファイルの場合、実装で DID 文書証明検証が有効になっている場合、 SHOULD 検証する `proof` 対応するプロファイルルールに従って。
   - WBAの安定したサブジェクトパス MUST NOT リサイクルまたは再割り当てされます。検証者 MUST NOT 最後のバインディング フィンガープリント セグメントを削除するだけで 2 つの DID をマージできます。
   - フォローする場合 `successorDid` WBA方式では検証者 MUST チェーンの長さを制限し、サイクルを検出し、安定したサブジェクト パスが異なるチェーン、または同じ古い DID に複数の後継者があるチェーンを拒否します。

## 8. ユースケース

1. ** ユースケース 1: ユーザーがアシスタントを通じて他の Web サイト上のファイルにアクセスする**

アリスは、example.com Web サイトにファイルを保存し、後でアシスタントを通じてアクセスしたいと考えています。これを行うために、Alice はまずスマート アシスタント上で Did:wba メソッドに基づいて DID を作成し、example.com にログインし、DID を自分のアカウントに関連付け、DID にファイルへのアクセス許可を付与します。セットアップが完了すると、アシスタントは DID を使用して example.com にログインできるようになり、認証後にアシスタントがアリスの保存ファイルにアクセスできるようになります。この DID は、アシスタントがさまざまなプラットフォーム上のファイルにアクセスできるように、他の Web サイトに対して構成することもできます。

2. **ユースケース 2: ユーザーがスマート アシスタントを通じて他のプラットフォーム サービスの API を呼び出す**

アリスは、スマート アシスタントを通じて example という名前のサードパーティ サービス API を呼び出したいと考えています。まず、Alice はスマート アシスタント上の Did:wba メソッドに基づいて DID を作成し、その DID を使用してサンプル プラットフォームの関連サービスを注文します。このサンプル サービスは、DID による ID 認証を完了し、購入者がアリスであることを確認し、彼女の DID を記録します。認証に合格した後、Alice は DID を使用して、スマート アシスタントを通じてサンプル サービスの API を呼び出し、操作を実行できます。

> 現在の使用例では、サーバーに対するクライアントの ID 認証が列挙されていません。実際、このプロセスも機能します。

## 9. 概要

この仕様は、WBA ドキュメント、バインディング、ライフサイクル ルールを定義するために Did:web に基づいて構築されており、ANP-02 を介して共通認証に接続されています。

このバージョンではさらに、パスタイプ DID のデフォルト スキームを「バインドされた公開キーのフィンガープリントを DID パスに運ぶ」と定義しており、主な仕様ではデフォルトで `e1_` プロファイルが使用されます。

- `e1_`: 新しい展開に推奨される Ed25519 公開キーをバインドし、W3C 標準のデータ整合性 EdDSA 証明を直接統合できます。

ウォレットエコシステムおよび既存の secp256k1 実装と互換性を持たせるために、この仕様では付録 A で `k1_` 互換拡張機能を追加定義しています。

バインディング キーの変更によって新しい DID が生成される場合、この仕様では永続的に安定したサブジェクト パスを継続アンカーとして使用し、古い DID ドキュメントの `successorDid` およびドキュメント全体の `proof` を介した前方移行を証明します。新しい DID 文書は、`alsoKnownAs` を通じて古い DID について反対の申し立てを行う可能性があります。共有された安定したサブジェクト パスだけでは、DID の同等性は証明されません。

一般的な HTTP/JSON リクエスト認証とオプションのトークンの唯一の規範的な定義は ANP-02 です。

将来の WBA の改訂では、メソッドの機能と文書サービス宣言が進化する可能性があります。共通認証とトークン拡張は、ANP-02 を通じて進化します。

---

## 付録 A: `k1_` 互換性拡張機能 (デフォルト以外)

参考資料 [付録 A: Did:WBA `k1_` 互換性拡張機能](appendix-a-did-wba-k1-compatibility-extension.md)

## 付録 B: ネイティブ `did:web` 互換性

参考資料 [付録 B: ネイティブとの互換性 `did:web`](appendix-b-compatibility-with-native-did-web.md)

## 参考資料

1. **DIDコア**。分散型識別子 (DID) v1.0。マヌ・スポニー;エイミー・ガイ。マルクス・サバデッロ。ドラモンド・リード。 W3C。 2022 年 7 月 19 日。W3C 勧告。から取得 [https://www.w3.org/TR/did-core/](https://www.w3.org/TR/did-core/)

2. **やった:ウェブ**。から取得 [https://w3c-ccg.github.io/did-method-web/](https://w3c-ccg.github.io/did-method-web/)

3. **RFC 7638**。 JSON Web キー (JWK) のサムプリント。 M・ジョーンズ;崎村直也IETF。 2015 年 9 月。インターネット標準トラック。から取得 [https://www.rfc-editor.org/rfc/rfc7638](https://www.rfc-editor.org/rfc/rfc7638)

4. **RFC 8785**。 JSON 正規化スキーム (JCS)。 A. ラングレン。 B. ジョーダン; S.エルトマン。 IETF。 2020 年 6 月。情報。から取得 [https://www.rfc-editor.org/rfc/rfc8785](https://www.rfc-editor.org/rfc/rfc8785)

5. **RFC 1035**。ドメイン名 - 実装と仕様。 P.モカペトリス。 IETF。 1987 年 11 月。インターネット標準。から取得 [https://www.rfc-editor.org/rfc/rfc1035](https://www.rfc-editor.org/rfc/rfc1035)

6. **RFC 1123**。インターネット ホストの要件 - アプリケーションとサポート。 R. ブレーデン編IETF。 1989 年 10 月。インターネット標準。から取得 [https://www.rfc-editor.org/rfc/rfc1123](https://www.rfc-editor.org/rfc/rfc1123)

7. **RFC 2119**。 RFC で要件レベルを示すために使用されるキーワード。 S.ブラッドナー。 IETF。 1997 年 3 月。現在のベストプラクティス。から取得 [https://www.rfc-editor.org/rfc/rfc2119](https://www.rfc-editor.org/rfc/rfc2119)

8. **RFC 2181**。 DNS仕様の明確化。 R.エルツ; R・ブッシュ。 IETF。 1997 年 7 月。標準案。から取得 [https://www.rfc-editor.org/rfc/rfc2181](https://www.rfc-editor.org/rfc/rfc2181)

9. **RFC 8174**。 RFC 2119 キーワードにおける大文字と小文字のあいまいさ。 B.レイバ。 IETF。 2017 年 5 月。現在のベストプラクティス。から取得 [https://www.rfc-editor.org/rfc/rfc8174](https://www.rfc-editor.org/rfc/rfc8174)

10. **RFC 8484**。 HTTPS (DoH) 経由の DNS クエリ。 P. ホフマン; P.マクマナス。 IETF。 2018 年 10 月。標準案。から取得 [https://www.rfc-editor.org/rfc/rfc8484](https://www.rfc-editor.org/rfc/rfc8484)

11. **RFC 7519**。 JSON Web トークン (JWT)。 M・ジョーンズ; J. ブラッドリー;崎村直也IETF。 2015 年 5 月。インターネット標準トラック。から取得 [https://www.rfc-editor.org/rfc/rfc7519](https://www.rfc-editor.org/rfc/rfc7519)

12. **RFC 9110**。 HTTP セマンティクス。 R. フィールディング編; M.ノッティンガム編; J.レシュケ編IETF。 2022 年 6 月。インターネット標準。から取得 [https://www.rfc-editor.org/rfc/rfc9110](https://www.rfc-editor.org/rfc/rfc9110)

13. **RFC 9421**。 HTTP メッセージの署名。 A.バックマン。 M.プロロック。 A. スポニーです。 IETF。 2024 年 2 月。インターネット標準トラック。から取得 [https://www.rfc-editor.org/rfc/rfc9421](https://www.rfc-editor.org/rfc/rfc9421)

14. **RFC 9530**。ダイジェストフィールド。 R・ポリ; L.パルデュー。 IETF。 2024 年 2 月。インターネット標準トラック。から取得 [https://www.rfc-editor.org/rfc/rfc9530](https://www.rfc-editor.org/rfc/rfc9530)

15. **RFC 9525**。 TLS のサービス ID。 P.サンタンドレ; R.ボニカ。 J. ホッジス。 IETF。 2023 年 11 月。インターネット標準トラック。から取得 [https://www.rfc-editor.org/rfc/rfc9525](https://www.rfc-editor.org/rfc/rfc9525)

16. **DID の使用例**。分散型識別子の使用例。ジョー・アンドリュー;キム・ハミルトン・ダフィー。ライアン・グラント。エイドリアン・グロッパー。 W3C。 2021 年 6 月 24 日。W3C ノート。から取得 [https://www.w3.org/TR/did-use-cases/](https://www.w3.org/TR/did-use-cases/)

17. **DID 拡張機能**。分散型識別子拡張。オリー・スティール。マヌ・スポニー。 W3C。 2021 年 6 月 24 日。W3C ノート。から取得 [https://www.w3.org/TR/did-extensions/](https://www.w3.org/TR/did-extensions/)

18. **DID 拡張プロパティ**。分散型識別子拡張プロパティ。オリー・スティール。マヌ・スポニー。 W3C。 2021 年 6 月 24 日。W3C ノート。から取得 [https://www.w3.org/TR/did-extensions-properties/](https://www.w3.org/TR/did-extensions-properties/)

19. **DID 拡張メソッド**。分散型識別子拡張メソッド。オリー・スティール。マヌ・スポニー。 W3C。 2021 年 6 月 24 日。W3C ノート。から取得 [https://www.w3.org/TR/did-extensions-methods/](https://www.w3.org/TR/did-extensions-methods/)

20. **DID 拡張子の解決**。分散型識別子拡張子の解決。オリー・スティール。マヌ・スポニー。 W3C。 2021 年 6 月 24 日。W3C ノート。から取得 [https://www.w3.org/TR/did-extensions-resolution/](https://www.w3.org/TR/did-extensions-resolution/)

21. **コントローラーのドキュメント**。コントローラーのドキュメント。マヌ・スポニー;マルクス・サバデッロ。 W3C。 2021 年 6 月 24 日。W3C ノート。から取得 [https://www.w3.org/TR/controller-document/](https://www.w3.org/TR/controller-document/)

22. **VC データの完全性**。検証可能な資格情報データの整合性 1.0。 W3C。から取得 [https://www.w3.org/TR/vc-data-integrity/](https://www.w3.org/TR/vc-data-integrity/)

23. **VC-DI-EDDSA**。データの整合性 EdDSA 暗号スイート v1.0。 W3C。から取得 [https://www.w3.org/TR/vc-di-eddsa/](https://www.w3.org/TR/vc-di-eddsa/)

24. **VC-DI-ECDSA**。データ整合性 ECDSA 暗号スイート v1.0。 W3C。から取得 [https://www.w3.org/TR/vc-di-ecdsa/](https://www.w3.org/TR/vc-di-ecdsa/)

25. **CID-1.0**。制御された識別子 v1.0。 W3C。から取得 [https://www.w3.org/TR/cid-1.0/](https://www.w3.org/TR/cid-1.0/)

## 著作権表示

著作権 (c) 2024 ANP コミュニティ
このファイルは、 [Apache ライセンス 2.0](../LICENSE)この著作権表示を保持する限り、自由に使用および変更できます。
