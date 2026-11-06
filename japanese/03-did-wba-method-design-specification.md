<!-- translation-review: machine-fully-reviewed; scope=source lines 1-665; inventory=japanese/reviews/core-review.json; full prose compared against source -->
> 日本語参考訳（機械翻訳を原文と全文照合し、意味・用語を校閲済み）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [03-did-wba-method-design-specification.md](../03-did-wba-method-design-specification.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# did:wba メソッド仕様

- 文書ID: ANP-03
- タイトル: did:wbaメソッド仕様
- ステータス: リリース済み
- バージョン: 1.2
- 原文言語: English / このページは日本語参考訳
- 適用性: この仕様は、ANP での Web ベースの分散 ID、クロスプラットフォーム認証、およびエージェント通信シナリオに適用されます。

> ANP 1.2リリースノート: 共通のDID認証はANP-02が定義します。DIDメソッドと命名の規則は、それぞれを所管する仕様にあります。中国語の対応文書は[did:wbaメソッド仕様](chinese/03-did-wba方法规范.md)です。

## 要約

Did:wba DID メソッドは、クロスプラットフォームの ID 認証とエージェント通信のニーズを満たすように設計された Web ベースの分散型識別子 (DID) 仕様です。このメソッドは、did:web に基づいて拡張および最適化され、did:wba と名付けられ、互換性を維持し、エージェント シナリオへの適応性を強化しています。

この仕様では、パス タイプ Did:wba のデフォルト スキームは、DID パス内にバインドされた公開キーのフィンガープリントを運び、DID とユーザー自身の秘密キーの間のバインディング関係を強化します。 **デフォルトプロファイル** の現在のバージョンは次のとおりです。

- `e1_`: 新しい展開に推奨される Ed25519 公開キーをバインドし、W3C 標準のデータ整合性 EdDSA 証明を直接統合できます。

ウォレットエコシステムおよび既存の secp256k1 実装と互換性を持たせるために、この仕様では付録 A で追加の **デフォルト以外の互換性拡張プロファイル** を定義します。

- `k1_`: 主にウォレット エコシステムおよび既存の Web3 キー システムとの互換性のために使用される secp256k1 公開キーをバインドします。

共通のHTTP/JSON認証は現在[ANP-02](02-anp-did-authentication-protocol-specification.md)が定義し、この仕様はWBAメソッドの規則を提供します。ネイティブWebとのバインディング、命名、メッセージングとの組み合わせは[付録B](appendix-b-compatibility-with-native-did-web.md)で説明します。

## 1. はじめに

### 1.1 序文

did:wba DIDメソッド仕様は、Decentralized Identifiers V1.0 [[DID-CORE](https://www.w3.org/TR/did-core/)]の要件に従います。

この仕様は、WBA ドキュメント、バインディング、ライフサイクル ルールを定義するために Did:web に基づいて構築されており、ANP-02 を介して共通認証に接続されています。

Did:web メソッドはネイティブ Web ベースの DID ユースケース向けに設計されており、エージェントの通信シナリオに完全には適合しない方法で進化する可能性があること、およびこの仕様で対象を絞った変更が導入されていることを考慮すると、それらの変更について元の作成者と合意に達するのは長期的なプロセスになるでしょう。したがって、新しいメソッド名を使用することにしました。

将来的には、did:wba仕様をdid:web仕様に統合する可能性も排除せず、この目標の実現を推進していきます。

did:wbaが参照するdid:webメソッド仕様は[https://w3c-ccg.github.io/did-method-web](https://w3c-ccg.github.io/did-method-web)の2024年7月31日付の版です。管理しやすいよう、現在did:wbaが使用するコピーも[did:webメソッド仕様](../references/did_web-method-specification.html)として保存しています。

### 1.2 設計原則

Did:wba アプローチを設計するとき、私たちの中心原則は、分散化を達成しながら、既存の成熟したテクノロジーと完全な Web インフラストラクチャを最大限に活用することでした。 Did:wba を使用すると、電子メールのような機能を実現できます。各プラットフォームは独自のアカウント システムを一元的な方法で実装します。同時に、各プラットフォームを相互接続できます。

パス型DIDについて、この仕様は「DIDパスに結合先の公開鍵フィンガープリントを含める」ことを既定方式とします。主な目的は、ユーザーが自分の秘密鍵を実際に管理でき、DIDとユーザーが実際に管理する公開鍵との間に、安定した独立検証可能な結び付きを形成することです。プラットフォームがDID Documentをホスティングしていても、ユーザーや検証者はDID自体に照らして想定の公開鍵に対応することを確認できるため、プラットフォームが本人性を表す公開鍵を黙って差し替えるリスクを軽減します。

標準の相互運用性とエコシステムとの互換性を両立するため、現行版は「**本体仕様の既定をe1_とし、互換性拡張でk1_をサポートする**」構造を採用します。

- `e1_`: Ed25519 公開キーをバインドします。新しい展開に推奨されます。このプロファイルは、W3C Data Integrity EdDSA 標準と直接統合でき、did:wba の長期的な標準化メインラインとして適しています。
- `k1_`: メイン仕様のデフォルトスキームとしてではなく、ウォレットエコシステム、既存のWeb3キーシステム、およびsecp256k1に依存する実装と互換性のある拡張性として付録Aでsecp256k1公開キーをバインドします。

公開キー フィンガープリント パス スキームの当然の結果として、バインディング キーが変更されると、パス タイプ DID も変更されます。したがって、did:wba は、DID 文字列に「安定したユーザー可読 ID」を直接適用するのではなく、ネーム サービス スキーム (WNS/ハンドルなど) を通じて安定した参照の問題を解決します。DID は「検証可能な暗号 ID」を担当し、ネーム サービスは「安定した人間が判読できる名前」を担当します。

結合鍵の変更後も主体の継続性を保つ必要があるパス型DIDでは、末尾の結合フィンガープリントセグメントより前のパスを**安定主体パス**と呼びます。例えば`did:wba:example.com:user:alice:e1_<fingerprint>`の安定主体パスは`example.com:user:alice`です。これは別のDIDではなく、単独では解決できません。継続する主体の識別に一度使ったら、永久に不変、再利用不可、再割り当て不可でなければなりません（MUST）。

同じ安定主体パスを持つ完全なDIDが2つあっても、それらは異なるDIDです。パスの一致は主体の継続性を判定するための必要条件にすぎません。検証者はこの仕様に従って`successorDid`のDocumentチェーンと対応するDID Documentの`proof`を検証した後でのみ、同じ継続する主体として扱えます。

また、さまざまな識別子システムがDIDへの対応を追加すれば、集中型・連合型・分散型のシステム間を相互接続できます。既存の集中型識別子システムを全面的に作り直す必要はなく、その上にDIDを作成するだけでシステム間の相互運用性を実現でき、実装の難しさを大きく軽減します。

<a id="wba-method-rules"></a>
## 2. did:wba DIDメソッドの仕様

### 2.1 メソッド名

この DID メソッドを識別するために使用される名前文字列は `wba` です。この方法を使用する DID は、プレフィックス `did:wba` で始まる必要があります。 DID 仕様によれば、この文字列は小文字である必要があります。 DID の残りの部分 (プレフィックスの後) を以下に指定します。

### 2.2 メソッド固有の識別子

メソッド固有の識別子は、TLS によって保護された完全修飾ドメイン名 (FQDN) であり、オプションで DID ドキュメントへのパスが含まれます。有効なドメイン名の構文を説明する正式な規則は、次のとおりです。 [(RFC1035)](https://www.rfc-editor.org/rfc/rfc1035), [(RFC1123)](https://www.rfc-editor.org/rfc/rfc1123)、そして [(RFC2181)](https://www.rfc-editor.org/rfc/rfc2181).

メソッド固有識別子は、現代のTLSサービス認証規則に従ってサーバー証明書と一致する必要があります。ドメイン名の照合は証明書の`subjectAltName`拡張のDNS識別子（`dNSName`）に基づかなければならず（MUST）、実装はサービスの本人性照合にCommon Name（CN）を使ってはいけません（MUST NOT）。メソッド固有識別子にIPアドレスを含めてはいけません。ポート番号は含められますが、パスとの衝突を防ぐため、ホストとポート間のコロンをパーセントエンコードする必要があります。ディレクトリやサブディレクトリを任意で含められ、区切りにはスラッシュの代わりにコロンを使います。

Did:wba は 2 つの形式をサポートします。

1. ベアドメインDID: ドメイン全体の主体を識別します。クロスドメインのサービス間HTTP認証など、ドメイン単位のサービス識別にも使えます。
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
> 1. 本体仕様の既定パスプロファイルが定義するのは`e1_`だけです。  
> 2. secp256k1によるパス結合との互換性が必要な実装については、付録Aの`k1_`互換性拡張を参照してください。

#### ベアドメインDIDの使い方

`did:wba:{domain}` の使用法は `did:web:{domain}` と似ています。主なルールは次のとおりです。

1. 解決方法は、did:web のネイキッド ドメイン名エントリと一致しています。
`did:wba:example.com` は `https://example.com/.well-known/did.json` に対応します
2. ネイキッド ドメイン名 DID は、特定のユーザーやサブ ID ではなく、主に「ドメイン名サブジェクト全体」または「ドメイン レベルのサービス ID」を表現するために使用されます。
3. ANPのクロスドメインのサービス間呼び出しで、`ANPMessageService`が外側のHTTP認証用に自身のDIDを宣言する場合、ベアドメインDIDを優先するべきです（**SHOULD**）。
4. ベアドメインDIDは`e1_`のパス結合フィンガープリントを含まないため、この仕様の`e1_`パス型DID向けのパス結合検証規則は適用されません。
5. リクエスト認証は[ANP-02の共通HTTP認証とWBAバインディング](02-anp-did-authentication-protocol-specification.md#wba-binding)に従います。ベアドメイン形式でも、ダイジェスト、署名対象、認証用途、時間、リプレイ防止の要件は免除されません。ネイティブWebはANP-02のWebバインディングを使います。

ANP でネイティブ `did:web` が上記のプロセスにどのように参加するかについて詳しくは、付録 B を参照してください。

### 2.2.1 デフォルトのパス スキーム: `e1_` 公開鍵のフィンガープリントをバインドします

新しく作成するパス型did:wbaでは、最後のパスセグメントを`e1_`結合公開鍵フィンガープリントセグメントにしなければなりません（MUST）。`e1_`は結合鍵がEd25519公開鍵であり、DIDが本体仕様の既定プロファイルを採用することを示します。

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

既存の導入環境との互換性のため、パーサーはフィンガープリントセグメントのない旧来のパス型DIDの解析に対応してもかまいません（MAY）。ただし、新しく作成するパス型DIDはこの仕様の既定方式を採用するべきです（SHOULD）。

### 2.2.2 `e1_` フィンガープリント生成方法 (推奨)

`e1_` フィンガープリントは、パスタイプ DID を Ed25519 バインディング公開キーに関連付けるために使用されます。生成方法は以下の通りです。

1. DIDの結合鍵を選択します。結合鍵は次の条件を満たさなければなりません（MUST）。
   - Ed25519公開鍵であること。
   - DID Document内で`Multikey` / `publicKeyMultibase`として表現されていること。
   - DID Documentの`authentication`関係で認可されていること。

2. Ed25519の`publicKeyMultibase`を等価な公開鍵JWKに変換します。このJWKにはRFC 7638が必要とするフィールドだけを残します。

```json
{
  "crv": "Ed25519",
  "kty": "OKP",
  "x": "..."
}
```

具体的には:

- `publicKeyMultibase`は、Multibaseのbase58-btcでエンコードしたEd25519の`Multikey`である必要があります。
-  デコード後、Ed25519 公開キーの元の 32 バイトが取得されます。
- `x` これは、この 32 バイトの公開キーの Base64url (パディングなし) 表現です。

3. [RFC 7638](https://www.rfc-editor.org/rfc/rfc7638)の規則に従ってJWK Thumbprintの入力を生成します。
   - 必要なフィールドのみを保持します。
   - フィールド名は辞書順に並べ替えられます。
   - 余分な空白を含まない JSON 文字列を使用します。
   -  UTF-8 エンコードを使用します。

4. 手順 3 で取得した UTF-8 バイト シーケンスに対して SHA-256 ハッシュを実行し、32 バイトのダイジェスト値を取得します。

5. 32バイトのダイジェスト値をbase64urlエンコードし、末尾の`=`パディングを除きます。結果は43文字固定です。

6. エンコード結果の先頭に`e1_`プレフィックスを付け、最終パスセグメントを得ます。

注:

1. の `e1_` プレフィックスはハッシュ出力の一部ではなく、プロファイルのプレフィックスです。
2. DIDパスと検証メソッド識別子の対応が分かりやすいよう、`e1_`プレフィックスを除いたサムプリント値を検証メソッドの`kid`またはフラグメントに使うことを推奨します。
3. 新規導入では`e1_`プロファイルを優先して使うべきです（SHOULD）。

### 2.2.3 安定主体パス

結合フィンガープリントをパスに含める方式のパス型DIDでは、安定主体パスはドメイン名と、末尾の結合フィンガープリントセグメントより前の全パスセグメントから構成されます。

```text
did:wba:example.com:user:alice:e1_<fingerprint>
        └──── stable subject path: example.com:user:alice ────┘
```

安定主体パスは次の要件を満たさなければなりません（MUST）。

1. 継続する主体に一度割り当てたら、変更、再利用、他の主体への再割り当てをしてはいけません（MUST NOT）。
2. ルート結合鍵の変更により新しいDIDを生成する場合、新旧DIDの安定主体パスは同一でなければなりません（MUST）。
3. 検証者は、安定主体パスが同じという理由だけで2つのDIDが同じ主体に属すると結論付けてはいけません（MUST NOT）。
4. 主体の継続性は§2.5.2～§2.5.5に従い、旧DID Documentの`successorDid`、Document全体の`proof`、新DIDの結合フィンガープリントを検証して確認しなければなりません（MUST）。

### 2.4 鍵情報とDocumentの処理

多くのWebサーバーのコンテンツ配信方式により、did:wbaのDocumentがapplication/jsonのメディアタイプで提供される可能性があります。did.jsonという名のDocumentを取得した場合、次の処理規則に従うべきです。

1. JSON文書のルートに@contextがある場合、JSON-LDの規則に従って処理するべきです。処理できない場合や処理が失敗した場合は、did:wbaのDocumentとして受け入れるべきではありません。

2. JSON文書のルートに`@context`があり、JSON-LDとして正常に処理でき、そのコンテキストに`https://www.w3.org/ns/did/v1`が含まれる場合、[[DID Core仕様§6.3.2](https://www.w3.org/TR/did-core/#consumption-0)]に従ってさらにDID Documentとして処理できます。

3. @contextがない場合、[[DID Core仕様§6.2.2](https://www.w3.org/TR/did-core/#consumption)]で規定する通常のJSONの規則でDID処理を実施します。

4. 外部リソース、外部DID、`serviceEndpoint`への参照には絶対URIを使わなければなりません（MUST）。

5. 同じDID Document内の検証メソッドへの参照には、`#key-1`などの相対DID URLを使ってもかまいません（MAY）。パーサーはそのような参照を処理するとき、DocumentのルートDIDに基づいて展開する必要があります。

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

- **id**: 必須フィールド。IPアドレスは含められませんが、ポート番号は含められます。その場合コロンは`%3A`にエンコードします。それ以降はコロンでパスを区切ります。新しく作成するパス型DIDの最終セグメントは`e1_<fingerprint>`でなければなりません（MUST）。

- **alsoKnownAs**: DID Coreが定義する任意フィールド。ルート結合鍵の変更で新DIDを生成する場合、新DID Documentはこのフィールドで直前のDIDを参照してもかまいません（MAY）。`alsoKnownAs`は逆方向の関連付けの主張を表すだけで、それ自体は主体の継続性の暗号学的証明にはなりません。

- **deactivated**: DID Documentを直接取得する場合のために定義された、did:wbaの任意拡張フィールド。`true`は、この完全なDIDを新規認証や業務ルーティングには使わなくなったことを示します。そのDID Documentは過去の検証や後継DIDの検索のために引き続き利用できます。

- **successorDid**: did:wbaが定義する任意の拡張フィールド。値は、置き換えられたDIDから直接の後継DIDを指す完全なDID文字列でなければなりません（MUST）。途中のDIDを飛ばして、さらに後の後継DIDを直接指すように書き換えてはいけません（MUST NOT）。

- **verificationMethod**: 必須フィールド。検証メソッドの配列を含み、DID主体の検証に使う公開鍵情報を定義します。エンドツーエンド暗号化（E2EE）通信が必要な場合、鍵を分離するため`verificationMethod`に署名鍵と鍵合意鍵の両方を含めるべきです。署名鍵は本人性の認証とDocumentの主張に使います。鍵合意鍵（`X25519KeyAgreementKey2019`など）は、上位プロトコルの鍵交換や機密情報の受信に使います。両者の役割を分けるため、単一の鍵の漏洩で本人性認証と通信の機密性が同時に損なわれることを防げます。

既定のパス方式を使うパス型DIDでは、`verificationMethod`内に結合鍵として少なくとも1つのEd25519 `Multikey`が存在し、その等価な公開鍵JWKのRFC 7638サムプリントが、DIDパス末尾の`e1_`フィンガープリントセグメントと完全に一致しなければなりません（MUST）。

- **サブフィールド**:
    - **id**: 検証方法の一意の識別子。
    - **type**: 検証方法のタイプ。
    - **controller**: この検証メソッドを管理するDID。
    - **publicKeyJwk**: JSON Web キー形式を使用した公開キー情報。
    - **publicKeyMultibase**: マルチベース形式を使用した公開鍵情報。

- **authentication**: 必須フィールド。認証に使う検証メソッドを列挙し、文字列またはオブジェクトを指定できます。既定のパス方式を使うパス型DIDでは、結合鍵が`authentication`関係で認可されていなければなりません（MUST）。既定ではクロスプラットフォーム認証の署名にこの結合鍵を優先するべきです。

- **assertionMethod**: 主張を表明するための検証メソッドを列挙する任意フィールド。e1プロファイルで標準のDID Document証明を使う場合、証明生成に使う結合鍵またはEd25519 `Multikey`は`assertionMethod`で認可されていなければなりません（MUST）。

- **keyAgreement**: 鍵合意に使う公開鍵情報を定義する任意フィールドで、2つのDID間の暗号化通信に使えます。通常、検証メソッドにはX25519KeyAgreementKey2019など鍵交換可能な鍵合意アルゴリズムを使います。`keyAgreement`には文字列参照（`verificationMethod`内のエントリーを指すもの）または埋め込みオブジェクトを指定できます。E2EEでは上位プロトコルに鍵交換用情報を提供します。上位プロトコルには直接メッセージングE2EEプロファイル、グループE2EEプロファイル、将来定義するセキュリティオーバーレイなどがあり、この仕様は`keyAgreement`を特定のアルゴリズム手順に固定しません。新規導入では通常、`X25519KeyAgreementKey2019`または意味的に等価なX25519エントリーを含めるべきです。DID Documentに`keyAgreement`がない場合や上位プロトコルが使用可能な鍵交換エントリーがない場合、そのエージェントは該当するE2EE機能をサポートしていません。

- **サブフィールド**:
    - **id**: 鍵合意方式の一意の識別子。
    - **type**: 鍵共有方式のタイプ。
    - **controller**: キーのネゴシエーション方法を制御する DID。
    - **publicKeyMultibase**: マルチベース形式の公開鍵情報。

- **service**: DID サブジェクトに関連付けられたサービスのリストを定義するオプションのフィールド。
  - **id**: サービスの一意の識別子。
  - **type**: サービスのタイプ。現在、次のタイプがサポートされています。
    - `AgentDescription`: エージェント記述サービス。`serviceEndpoint`は[ANPエージェント記述プロトコル仕様](07-anp-agent-description-protocol-specification.md)に従う文書を指します。
    - `ANPHandleService`: WNS（WBA Name Space）の双方向の結合検証に使うHandle結合サービス。`serviceEndpoint`はHandleプロバイダーのドメイン配下にある、参照先を取得可能な絶対HTTPS URIでなければなりません（MUST）。詳細は[ANP DID:WBA名前空間仕様](04-anp-did-wba-name-space-specification.md)を参照してください。
      - DID保有者がHandleを公開してよい場合、`serviceEndpoint`にはそのHandleの標準解決エンドポイント（`https://example.com/.well-known/handle/alice`など）を直接使うべきです（SHOULD）。
      - DID保有者がDID Document内でHandleを公開したくない場合、`serviceEndpoint`はDID確認エンドポイント（`https://example.com/.well-known/handle/by-did?did=...`など）を指してもかまいません（MAY）。このエンドポイントは少なくとも`did`と`confirmed = true`を返します。
      - 返された文書に`handle`が含まれ、それが入力したHandleと完全に一致する場合、検証者はその特定のHandleについて正確な逆方向検証を完了できます。
      - 返された文書に確認情報しかない場合、検証者が確認できるのはプロバイダーとの関係だけです。特に特定のHandleの確認が必要なセキュリティ上重要な場面では、この結果だけで特定のHandleとの結合が検証されたと扱ってはいけません（MUST NOT）。
    - `ANPMessageService`: ANPのインスタントメッセージング用統合サービスエンドポイント。DID主体がANPインスタントメッセージングに参加する場合、`serviceEndpoint`はその統合メッセージングエンドポイントを指してもかまいません（**MAY**）。直接メッセージング、グループメッセージング、鍵情報へのアクセス、添付ファイル制御などをこの単一エンドポイントで扱います。具体的メソッドと機能宣言はANP Profile 2および関連プロファイルに従います。クロスドメインのサービス間呼び出しに参加する場合、サービスエントリーは外側のHTTPリクエスト署名に使うDIDを示す`serviceDid`も宣言するべきです（**SHOULD**）。did:wba環境では通常、`did:wba:example.com`または`did:wba:example.com%3A8800`などのベアドメインDIDを使うべきです。
  - **serviceEndpoint**: サービスのエンドポイント URL。
  - **serviceDid**: オプションのフィールド。サービスがクロスドメインのサービス間の呼び出しに参加する場合は、このフィールドを宣言することをお勧めします。その値は DID URL ではなく DID 文字列である必要があり、ピアに「この外側の HTTP リクエストの署名を検証するためにどの DID の公開キーを使用する必要があるか」を伝えます。

- **proof**: 既定の`e1_`プロファイルでは`proof`は必須です。他のプロファイルでこのフィールドが現れるかどうかは各プロファイルの規則に従います。`proof`はDID Documentの完全性を証明し、証明生成後にDocumentが改ざんされていないことと、証明作成時に署名者が対応する秘密鍵を管理していたことを示します。証明だけでDIDメソッドの解析手順や`id`の一致確認を置き換えることはできません。
  - 既定のe1プロファイルについて、この版はW3C標準に基づく`DataIntegrityProof` + `eddsa-jcs-2022`証明プロファイルを定義します。

> 注:
>
> 1. 公開鍵情報は現在`publicKeyJwk`と`publicKeyMultibase`の2形式に対応します。詳細は[https://www.w3.org/TR/did-extensions-properties/#verification-method-properties](https://www.w3.org/TR/did-extensions-properties/#verification-method-properties)を参照してください。
> 2. 検証メソッドの型は[https://www.w3.org/TR/did-extensions-properties/#verification-method-types](https://www.w3.org/TR/did-extensions-properties/#verification-method-types)を参照してください。e1結合鍵には`Multikey`を推奨します。

> 6.  エンドツーエンドの暗号化通信をサポートする必要があるシナリオでは、キー分離設計を採用することをお勧めします。つまり、署名/アサーション キーとキー合意キーは個別に管理されます。署名/アサーション キーはキー合意には関与せず、キー合意キーは署名に関与しません。これらのマテリアルの具体的な用途は、上位層のダイレクト メッセージング E2EE、グループ E2EE、およびその他のプロファイルによって定義されます。
> 7. 既定のパス方式で新しく作成するパス型DIDの結合鍵は、次を満たさなければなりません（MUST）。
> - `Multikey` / `publicKeyMultibase`で表現されること。
> - `authentication`関係で認可されること。
> - 等価な公開鍵JWKのRFC 7638サムプリントがDIDパス末尾の`e1_`フィンガープリントセグメントと完全に一致すること。
> 8. secp256k1のパス結合に対応する場合、付録Aの`k1_`互換性拡張を参照してください。

### 2.5 DIDメソッドの操作

#### 2.5.1 作成(登録)

Did:wba メソッド仕様では、特定の HTTP API 操作は指定されていませんが、プログラムによる登録と管理は、Web 環境の要件に従って定義する各実装に委ねられています。

DID を作成するには、次の手順が必要です。

1. ドメイン名の使用をドメイン名登録事業者に申請します。
2. DNS クエリ サービスにホスティング サービスの場所と IP アドレスを保存します。
3. パス型DIDを作成する場合、まずEd25519結合鍵を生成し、§2.2.2に従って`e1_`フィンガープリントセグメントを計算します。
4. 適切な鍵ペアを含むDID DocumentのJSON-LDファイルを作成します。ドメイン全体を表す場合は`.well-known`のURL配下に`did.json`を保存し、ドメイン配下で複数のDIDを解決する場合は指定パスに保存します。（訳注: 原文は「鍵ペア」と記していますが、§2.5で公開鍵情報を掲載すると説明している箇所とは表現が一致していません。）

たとえば、ドメイン名 `example.com` の場合、`did.json` は次の URL で利用できます。

```plaintext
Example: Creating a DID
did:wba:example.com
 -> https://example.com/.well-known/did.json
```

ネイキッド ドメイン名 DID の作成およびホスティング方法は、did:web のネイキッド ドメイン名エントリと一致しています。ドメイン名の所有者は、`/.well-known/did.json` で対応する DID ドキュメントを提供するだけでよく、DID はドメイン名サブジェクト ID またはドメインレベルのサービス ID として使用できます。

ベアドメインではなく任意のパスを指定し、既定のパス方式を使う場合、`did.json`は`e1_`フィンガープリントセグメントを含むパスで利用できます。

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
> secp256k1を使ったパス型DIDの結合が必要な実装については、付録Aの`k1_`互換性拡張を参照してください。

#### 2.5.2 読み取り（解析）

`did:wba` DID から DID ドキュメントを解析するには、次の手順を実行する必要があります。

- メソッド固有識別子内の`:`を`/`に置き換え、完全修飾ドメイン名と任意のパスを得ます。
- ドメイン名にポートが含まれている場合、コロンをパーセントでデコードします。
- 想定するDID Documentの場所の先頭に`https://`を付けてHTTPS URLを生成します。
- URL にパスが指定されていない場合は、 `/.well-known` が追加されています。
- `/did.json`を付けてURLを完成させます。
- [§2.6 セキュリティとプライバシーの考慮事項](https://w3c-ccg.github.io/did-method-web/#security-and-privacy-considerations)のセキュリティ要件を満たす安全なHTTPS接続を確立できるプロキシを使い、そのURLにHTTP GETリクエストを行います。
- 解析したDID Documentの`id`が、解析対象の`did:wba` DIDと一致することを検証します。
- 本体仕様が定義する`e1_`パス型DIDで、`deactivated = true`が設定されていない場合、次の厳密な結合関係を検証しなければなりません（MUST）。
  - DID Documentのトップレベルに`proof`が存在すること。
  - `proof`が`DataIntegrityProof` + `eddsa-jcs-2022`による検証に成功すること。
  - `proof.verificationMethod`が指す検証メソッドがEd25519 `Multikey`（または意味的に等価なEd25519検証メソッド表現）でなければなりません（MUST）。
  - `proof.verificationMethod`に対応するEd25519公開鍵でRFC 7638サムプリントを計算し、DIDパス末尾の`e1_`フィンガープリントセグメントと完全に一致する必要があります。
- `deactivated = true`を設定した`e1_` DIDの場合:
  - 検証者は、DIDパスの`e1_`フィンガープリントと一致する元の結合鍵を、引き続きDocument内で見つけなければなりません（MUST）。
  - Documentに`successorDid`も含まれる場合、検証者は新旧DIDの安定主体パスが同じことを検証しなければなりません（MUST）。
  - Document全体の`proof`が元の結合鍵で署名されている場合、移行を検証済みとして扱えます。
  - Document全体の`proof`が事前認可された回復鍵で署名されている場合、検証者が無効化前の信頼できるDID Documentを既に持ち、そこで回復鍵が`assertionMethod`に事前認可されていたと確認できる場合に限り、移行を回復による検証済みとして扱えます。
  - トップレベルの`proof`がない場合、単一ホップの検証者は`successorDid`を`unverified`な移行の手掛かりとして読んでもかまいません（MAY）。認証済みの同一オリジンHTTPSで全Documentを取得し、全ての直接ホップを検証し、結合証明が有効な最終の有効状態の`e1_` DIDに到達したリゾルバーは、その未署名ホップを`provider_asserted`と報告してもかまいません（MAY）。認証された完全チェーンの文脈なしで提供された単独の`successorDid`またはDocumentは、引き続き`unverified`です。
- HTTP GET中にDNSを解決するとき、解決対象の本人性が追跡されるのを防ぐため、クライアントは[[RFC8484](https://w3c-ccg.github.io/did-method-web/#bib-rfc8484)]を使用するべきです。
- 有効状態の`e1_` DIDについて、上記の証明検証はローカルポリシーの切り替えに左右されず、解析成功の必要条件です。
- 他のプロファイルでは、ローカルポリシーでDID Document証明の検証が有効であり、Documentに`proof`が含まれる場合、対応するプロファイルの規則で検証するべきです。

ベアドメインDIDでは`/.well-known/did.json`を使って解決し、`id`の一致を確認します。E1のパス結合検証は適用しません。リクエストは別途[ANP-02の共通認証とWBAバインディング](02-anp-did-authentication-protocol-specification.md#wba-binding)で認証します。この段落は検証を省略するフローを定義するものではありません。

> 説明:
> 実装が付録Aの`k1_`互換性拡張にも対応する場合、`k1_` DIDの解析と結合検証は付録Aに従って行います。

#### 2.5.3 アップデート

DID ドキュメントを更新するには、DID に対応する `did.json` ファイルを更新する必要があります。

デフォルトのパス スキームを使用したパス タイプ Did:wba の場合、DID パスの最後にバインドされたキー フィンガープリントが変更されない限り、DID 自体は変更されませんが、DID ドキュメントの他の内容は変更される可能性があります (新しい検証キーの追加、古いキーの取り消し、サービス エンドポイントの更新など)。

結合鍵が変わる場合、パス型DIDも新しいDIDに変更しなければなりません（MUST）。新旧DIDは異なるDIDですが、次の規則により同じ継続する主体の移行関係を確立できます。

1. 新DIDの安定主体パスは旧DIDと完全に同一でなければなりません（MUST）。
2. 新しいDID Documentを作成・公開しなければなりません（MUST）。新Documentは`alsoKnownAs`で直前のDIDを参照してもかまいません（MAY）。
3. 旧DID Documentは取得可能なままにし、`deactivated = true`および`successorDid = <new DID>`を設定しなければなりません（MUST）。
4. `successorDid`は直接の次世代DIDだけを指さなければなりません（MUST）。さらに鍵をローテーションするとき、過去のDIDの`successorDid`を書き換えてはいけません（MUST NOT）。
5. 旧DID Document全体の`proof`は`deactivated`、`successorDid`、その他全プロパティをカバーするべきです。新DID DocumentのDocument全体の`proof`は新結合鍵で生成します。
6. WNS/Handleなどの上位の名前サービスも同時に新DIDへ更新するべきですが、その名前の対応付けは上記の移行証明を置き換えません。

この仕様はプログラムから使う管理インターフェースを定義しません。同時のローテーションで複数の後継が生じるのを防ぐため、安定主体パスだけに基づいて更新を送信するのでなく、現在の完全なDID（`expected_current_did`など）に対する不可分な比較交換を実行するべきです（SHOULD）。

> 注:
>
> 1. git などのバージョン管理システムや GitHub Actions などの継続的統合システムを使用して、DID ドキュメントの更新を管理します。これにより、認証と監査履歴のサポートを提供できます。
> 2. HTTP API 更新プロセスでは、特定の HTTP API が指定されていませんが、プログラムによる登録と管理は各実装者に任せ、ニーズに応じて定義します。

#### 2.5.4 非アクティブ化（撤回）

後継DIDがなく永久に無効化する識別情報については、`did.json`を削除するなどして公開を終了できます。

結合鍵のローテーションで新DIDに置き換えられたパス型did:wbaでは、旧DID Documentを削除してはいけません（MUST NOT）。過去の署名検証と後継検索のため、取得可能なままにし、`deactivated = true`と`successorDid`を設定しなければなりません（MUST）。ここでの`deactivated`はその完全なDIDを新規認証とルーティングに使わなくなることだけを意味し、継続する主体が消滅したことは意味しません。

#### 2.5.5 DID 文書証明

`did:wba` DID Documentのトップレベルに`proof`が現れるかはプロファイルとDocument状態によります。既定の`e1_`プロファイルで有効状態のDocumentでは`proof`は必須です。`successorDid`を持つ無効化済み`e1_`移行Documentは、以下の結合鍵、回復、認証済みProvider、未検証の分岐に従い、トップレベルの`proof`がなくてもかまいません（MAY）。他のプロファイルでは、Documentの完全性を証明するトップレベルの`proof`を含めてもかまいません（MAY）。これは証明生成後にDocumentが改ざんされていないことと、作成時に署名者が対応する秘密鍵を管理していたことを示します。証明だけでDIDメソッドの解析や`id`の一致確認を置き換えることはできません。

既定の`e1_`プロファイルでは、本体仕様が定義する`proof`プロファイルは次に適合しなければなりません（MUST）。

- Verifiable Credential Data Integrity 1.0
- Data Integrity EdDSA Cryptosuites v1.0

`proof` オブジェクトには次のフィールドが含まれます。

- `type`: 必須。`DataIntegrityProof`固定。
- `cryptosuite`: 必須。`eddsa-jcs-2022`固定。
- `created`: 必須フィールドです。プルーフ作成時刻 (XML スキーマ日時形式)
- `verificationMethod`: 必須。証明生成に使うDID Document内のEd25519 `Multikey`を指す完全なDID URL。
- `proofPurpose`: 必須。`assertionMethod`固定。
- `proofValue`: 必須。base58-btc multibase（`z...`）エンコードを使います。
- `domain`: オプションのフィールド
- `challenge`: オプションのフィールド

追加の制約:

1. 有効状態の`e1_` Documentでは、`proof.verificationMethod`に`e1_`結合鍵を使い、DIDパス結合、公開鍵結合、Document完全性証明を統一しなければなりません（MUST）。`successorDid`を持つ無効化済みDocumentでは、信頼できる無効化前のDocumentの`assertionMethod`で事前認可された回復鍵を代わりに使えます。ただし、無効化時に初めて導入された鍵を使ってはいけません（MUST NOT）。
2. 有効状態の`e1_` Documentと旧結合鍵で継続性を主張する無効化移行では、パーサーは`proof.verificationMethod`に対応するEd25519公開鍵でRFC 7638サムプリントを再計算し、DIDパス末尾の`e1_`フィンガープリントセグメントと完全一致することを検証しなければなりません（MUST）。回復証明の場合は、信頼できる無効化前のDocumentの鍵情報と`assertionMethod`の認可で検証しなければなりません（MUST）。回復鍵は`e1_`結合フィンガープリントと一致する必要はありません。
3. `proof`の生成・検証は`eddsa-jcs-2022`の標準アルゴリズム手順に従わなければなりません（MUST）。この仕様でアルゴリズムの詳細を再定義しません。

有効状態の`e1_` `did:wba` DID Documentを解析するとき、証明検証は任意の追加確認ではなく、パス結合の意味論の一部です。`proof`の欠落、証明検証の失敗、`proof.verificationMethod`と`e1_`結合フィンガープリントの不一致のいずれかがある場合、解析は失敗しなければなりません（MUST）。

`e1_` DID の場合、`proof` がなくてもアクティブな DID ドキュメントを解析できる緩和モードはありません。

`deactivated = true`と`successorDid`を設定した旧DID Documentでは、トップレベルの`proof`は、`proof`を除いたDocument全体に対する証明です。

- 古い DID のバインディング キーで署名すると、結果は強力な暗号化の継続性を提供します。
- 無効化前に旧DIDが`assertionMethod`で認可していた回復鍵で署名されている場合、検証者は以前の信頼済み状態からその事前認可を確認しなければなりません（MUST）。
- トップレベルの`proof`がある場合、旧結合鍵による証明または事前認可された回復証明として検証に成功しなければなりません（MUST）。形式不正、未認可、暗号学的に無効な証明がある場合は移行を無効にしなければならず（MUST）、プロバイダーの主張や未検証の手掛かりに格下げしてはいけません（MUST NOT）。
- 旧秘密鍵も事前認可された回復鍵も利用できない場合、トップレベルの`proof`はなくてもかまいません（MAY）。単一ホップの検証者はそのホップを`unverified`と報告しなければなりません（MUST）。完全チェーンのリゾルバーは、認証済みの同一オリジンHTTPSで前任と全後継を取得し、各ホップの安定主体パスと直接後継関係を検証し、結合証明が有効な最終の有効状態の`e1_` DIDに到達した後に限り、`provider_asserted`と報告してもかまいません（MAY）。失敗または不完全なチェーンから`provider_asserted`を生成してはいけません（MUST NOT）。

移行保証には、正確に次の意味があります。

- `verified`: 先行者の元のバインディング キーは、ドキュメント全体の非アクティブ化と直接後継者の関係に署名します。
- `recovery_verified`: 信頼できる無効化前のDocumentの`assertionMethod`で事前認可された回復鍵が、その関係に署名している。
- `provider_asserted`: 認証済みの同一オリジンHTTPSによるProvider解決で、構造的に有効な完全チェーンをたどり、証明が有効な有効状態のDIDに到達したか、または本人性Providerが別途認証された回復・移行の権限チャネルで同じ前任・後継関係を提供した。この保証はDID Documentのプロパティではなく、`verified`または`recovery_verified`に格上げしてはいけません（MUST NOT）。
- `unverified`: 単独の`successorDid`、`alsoKnownAs`、Handle/WNSの対応付け、HTTP 409の手掛かり、単一の未署名ホップ、不完全チェーン、または認証されたProvider由来でないDocumentしか得られていない。

`e1_`以外のプロファイルでは、実装は当該プロファイルの規則またはローカルポリシーに従って、次の2モードのいずれかを選んでもかまいません（MAY）。

1. 緩和モード: DID Documentに`proof`がなくても解析を続けられます。
2. 厳格モード: ローカルポリシーが証明を要求する場合、DID Documentの`proof`の欠落を検証失敗としなければなりません（MUST）。
**規範的注記**:

`e1_`プロファイルを使うDIDについて、この仕様はDID Documentのトップレベルの`proof`にW3C標準のData Integrity証明を要求します。証明データモデル、証明設定、文書変換、ハッシュ、証明シリアライズ、検証規則は[Verifiable Credential Data Integrity 1.0](https://www.w3.org/TR/vc-data-integrity/)および[Data Integrity EdDSA Cryptosuites v1.0](https://www.w3.org/TR/vc-di-eddsa/)に従います。この仕様はdid:wbaでの証明の使用箇所、フィールド要件、検証関係だけを制約し、基礎となる暗号アルゴリズムを重複定義しません。矛盾する場合は上流のW3C仕様が優先します。

### 2.6 セキュリティとプライバシーに関する考慮事項

セキュリティとプライバシーに関する考慮事項については、以下を参照してください。 [[Did:Web メソッド仕様セクション 2.6](https://w3c-ccg.github.io/did-method-web/#security-and-privacy-considerations)]。実装者は、デフォルトのパス スキームでのバインディング キーの変更によって引き起こされる DID ローテーションや、ネーム サービスの同期の問題にもさらに注意を払う必要があります。

この版は独立検証可能なログを要求しません。完全な解決が成功した後、クライアントはホップ保証が`verified`または`recovery_verified`の後継エッジだけをキャッシュするべきです（SHOULD）。`provider_asserted`と`unverified`のエッジをこの検証済みエッジキャッシュに入れてはいけません（MUST NOT）。最終証明の無効、循環、ホップ上限超過など、キャッシュ確定前に検証が失敗した場合、失敗チェーンの先頭部分のエッジをキャッシュに残してはいけません（MUST NOT）。同じ旧DIDについてキャッシュ済みの検証済みエッジと新しく取得した`successorDid`が異なる場合、移行チェーンに循環がある場合、後継DIDの安定主体パスが異なる場合、クライアントは移行を拒否し、上位層に競合を報告しなければなりません（MUST）。

新規導入では標準証明の相互運用性を高めるため`e1_`プロファイルを優先するべきです（SHOULD）。ウォレットエコシステムや既存のsecp256k1実装との互換性が必要な場合、付録Aの`k1_`互換性拡張を参照してください。

## 3. did:wba メソッドと HTTP プロトコルに基づくクロスプラットフォーム ID 認証

共通認証は[ANP-02第3章](02-anp-did-authentication-protocol-specification.md#http-binding)が定義します。WBAメソッドの規則は第2章にあります。リクエスト形式、検証フロー、実装ポリシーはリリース前の認証設計から保持されています。

<a id="wba-auth-binding"></a>
### 3.1 リクエスト認証の WBA 方式の制約

ANP-02は共通のリクエスト形式と署名検証を定義します。この節はWBAメソッドの要件を提供し、他のDIDメソッドに適用するものではありません。

#### 3.1.1 認証キーの選択

E1プロファイルを使う`did:wba`では、クライアントは既定でDIDパス末尾の`e1_`フィンガープリントセグメントに対応する結合鍵で署名するべきです（SHOULD）。サーバーが他の`authentication`検証メソッドを許すかはローカルの認可ポリシーに属し、DIDの結合の意味論は変わりません。

> 説明:
> [付録A](appendix-a-did-wba-k1-compatibility-extension.md)の`k1_`互換性拡張にも対応する場合、`k1_` DIDの認証署名を[付録A](appendix-a-did-wba-k1-compatibility-extension.md)に従って行えます。

#### 3.1.2 メソッドの状態と本人性の結合

**DID Documentの読み取り**: DIDに基づいてDocumentを解析します。`deactivated = true`が設定されている場合、そのDIDを新規認証に使い続けてはいけません（MUST NOT）。`successorDid`が含まれる場合、サーバーは[本章の409応答](#http-superseded)で定義するDID置き換えエラーを返すべきです。

   - `did:wba` E1 DIDの結合関係は、`authentication`からEd25519鍵を任意に選ぶのでなく、`proof.verificationMethod`に対応するEd25519公開鍵に基づいて検証する必要があります。
     - `proof`が存在し、`eddsa-jcs-2022`による検証に成功する必要があります。
     - この公開鍵でRFC 7638サムプリントを再計算し、DIDパス末尾の`e1_`フィンガープリントセグメントと完全一致しなければなりません（MUST）。

> 説明:
> [付録A](appendix-a-did-wba-k1-compatibility-extension.md)の`k1_`互換性拡張にも対応する場合、`k1_` DIDの結合検証・認証検証を[付録A](appendix-a-did-wba-k1-compatibility-extension.md)に従って行います。

<a id="http-superseded"></a>
### 3.2 WBAのHTTP 409 DID置き換え応答

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

応答の`currentDid`は未検証の手掛かりにすぎません。クライアントはこの値だけで直接再試行してはいけません（MUST NOT）。旧DID Documentを取得して`deactivated`、`successorDid`、Document全体の`proof`を検証し、現在の有効なDIDが見つかるまで後継DIDを順に解決する必要があります。再送前に現在のDIDで新しい署名を生成するべきです。透過的な`301` / `302`リダイレクトでこの検証を置き換えるべきではありません。

## 4. did:wba メソッドと JSON 形式のデータ伝送に基づくクロスプラットフォーム ID 認証プロセス

認証メタデータの搬送は[ANP-02第4章](02-anp-did-authentication-protocol-specification.md#json-carriage)が定義し、フィールド、シリアライズ規則、構成要素の対応付け、検証フローを保持します。

## 5 人間による認可とエージェントによる自動認可の区別

[ANP-02第5章](../02-anp-did-authentication-protocol-specification.md#5-authentication-and-application-authorization)を参照してください。

## 6 プライバシー保護ポリシー

[ANP-02第6章](../02-anp-did-authentication-protocol-specification.md#6-privacy-considerations)を参照してください。

安定した外部参照が必要でありながら、基になる DID をローテーションする必要があるシナリオの場合は、ネーム サービス (WNS/ハンドルなど) と組み合わせて使用することをお勧めします。ハンドルは安定したままで人間が判読できるため、バインディング キーの変更に応じて基になる Did:wba をローテーションできます。

## 7 セキュリティに関するヒント

[ANP-02第7章](02-anp-did-authentication-protocol-specification.md#security-privacy)を参照してください。メソッド固有の規則は引き続き本仕様第2章に従います。この切り出しはセキュリティポリシー要件を追加しません。

WBA 固有のセキュリティ要件:

   - 既定パス方式の`did:wba`では、ハードウェア分離、HSM、システムエンクレーブで結合鍵を保管することが最適です。
   - 結合鍵を使う`did:wba`では、クロスプラットフォーム認証に既定でその鍵を優先するべきです。
   - 新規のWBA導入では`e1_`プロファイルを優先するべきです（SHOULD）。
   - バインディング キーが変更されると、パスタイプ DID も変更されるため、上位レベルのネーム サービス マッピングは同期して更新される必要があります。
   - 有効状態の`did:wba` E1 DIDでは、パーサーは`DataIntegrityProof`を検証しなければなりません（MUST）。無効化済み`e1_`移行Documentは[§2.5.5](03-did-wba-method-design-specification.md#wba-method-rules)の結合鍵、回復、プロバイダーの主張、未検証の規則に従います。他のプロファイルでDID Document証明の検証を有効にする場合、対応するプロファイル規則で`proof`を検証するべきです（SHOULD）。
   - WBAの安定主体パスを再利用・再割り当てしてはいけません（MUST NOT）。検証者は、末尾の結合フィンガープリントセグメントを取り除くだけで2つのDIDを同一として統合してはいけません（MUST NOT）。
   - WBAメソッドで`successorDid`をたどる場合、検証者はチェーンの長さを制限し、循環を検出し、安定主体パスが異なるチェーンや、同じ旧DIDに複数の後継があるチェーンを拒否しなければなりません（MUST）。

## 8. ユースケース

1. ** ユースケース 1: ユーザーがアシスタントを通じて他の Web サイト上のファイルにアクセスする**

アリスは、example.com Web サイトにファイルを保存し、後でアシスタントを通じてアクセスしたいと考えています。これを行うために、Alice はまずスマート アシスタント上で Did:wba メソッドに基づいて DID を作成し、example.com にログインし、DID を自分のアカウントに関連付け、DID にファイルへのアクセス許可を付与します。セットアップが完了すると、アシスタントは DID を使用して example.com にログインできるようになり、認証後にアシスタントがアリスの保存ファイルにアクセスできるようになります。この DID は、アシスタントがさまざまなプラットフォーム上のファイルにアクセスできるように、他の Web サイトに対して構成することもできます。

2. **ユースケース 2: ユーザーがスマート アシスタントを通じて他のプラットフォーム サービスの API を呼び出す**

アリスはスマートアシスタントを通じてexampleという第三者サービスのAPIを呼び出したいと考えています。まずアシスタント上でdid:wbaのDIDを作成し、そのDIDを使ってexampleプラットフォームの関連サービスを購入します。exampleはDIDによる認証を行い、購入者がアリスであることを確認してDIDを記録します。認証後、アリスはそのDIDでアシスタントからexampleのAPIを呼び出し、操作を実行できます。

> 現在の使用例では、サーバーに対するクライアントの ID 認証が列挙されていません。実際、このプロセスも機能します。

## 9. 概要

この仕様は、WBA ドキュメント、バインディング、ライフサイクル ルールを定義するために Did:web に基づいて構築されており、ANP-02 を介して共通認証に接続されています。

このバージョンではさらに、パスタイプ DID のデフォルト スキームを「バインドされた公開キーのフィンガープリントを DID パスに運ぶ」と定義しており、主な仕様ではデフォルトで `e1_` プロファイルが使用されます。

- `e1_`: 新しい展開に推奨される Ed25519 公開キーをバインドし、W3C 標準のデータ整合性 EdDSA 証明を直接統合できます。

ウォレットエコシステムおよび既存の secp256k1 実装と互換性を持たせるために、この仕様では付録 A で `k1_` 互換拡張機能を追加定義しています。

結合鍵の変更で新しいDIDが生じる場合、この仕様は恒久的な安定主体パスを継続性の基点とし、旧DID Documentの`successorDid`とDocument全体の`proof`で前方への移行を証明します。新DID Documentは`alsoKnownAs`で旧DIDへの逆方向の主張ができます。安定主体パスの共有だけではDIDの同等性は証明できません。

一般的な HTTP/JSON リクエスト認証とオプションのトークンの唯一の規範的な定義は ANP-02 です。

将来の WBA の改訂では、メソッドの機能と文書サービス宣言が進化する可能性があります。共通認証とトークン拡張は、ANP-02 を通じて進化します。

---

## 付録 A: `k1_` 互換性拡張機能 (デフォルト以外)

参考資料 [付録 A: Did:WBA `k1_` 互換性拡張機能](appendix-a-did-wba-k1-compatibility-extension.md)

## 付録 B: ネイティブ `did:web` 互換性

参考資料 [付録 B: ネイティブとの互換性 `did:web`](appendix-b-compatibility-with-native-did-web.md)

## 参考資料

1. **DIDコア**。分散型識別子 (DID) v1.0。マヌ・スポニー;エイミー・ガイ。マルクス・サバデッロ。ドラモンド・リード。 W3C。 2022 年 7 月 19 日。W3C 勧告。から取得 [https://www.w3.org/TR/did-core/](https://www.w3.org/TR/did-core/)

2. **did:web**。[https://w3c-ccg.github.io/did-method-web/](https://w3c-ccg.github.io/did-method-web/)から取得。

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

20. **DID Extension Resolution**。分散型識別子拡張の解決。Orie Steele、Manu Sporny。W3C、2021年6月24日、W3C Note。[https://www.w3.org/TR/did-extensions-resolution/](https://www.w3.org/TR/did-extensions-resolution/)から取得。

21. **コントローラーのドキュメント**。コントローラーのドキュメント。マヌ・スポニー;マルクス・サバデッロ。 W3C。 2021 年 6 月 24 日。W3C ノート。から取得 [https://www.w3.org/TR/controller-document/](https://www.w3.org/TR/controller-document/)

22. **VC-DATA-INTEGRITY**。Verifiable Credential Data Integrity 1.0。W3C。[https://www.w3.org/TR/vc-data-integrity/](https://www.w3.org/TR/vc-data-integrity/)から取得。

23. **VC-DI-EDDSA**。データの整合性 EdDSA 暗号スイート v1.0。 W3C。から取得 [https://www.w3.org/TR/vc-di-eddsa/](https://www.w3.org/TR/vc-di-eddsa/)

24. **VC-DI-ECDSA**。データ整合性 ECDSA 暗号スイート v1.0。 W3C。から取得 [https://www.w3.org/TR/vc-di-ecdsa/](https://www.w3.org/TR/vc-di-ecdsa/)

25. **CID-1.0**。制御された識別子 v1.0。 W3C。から取得 [https://www.w3.org/TR/cid-1.0/](https://www.w3.org/TR/cid-1.0/)

## 著作権表示

著作権 (c) 2024 ANP コミュニティ
このファイルは[Apache License 2.0](../LICENSE)の下で公開されています。この著作権表示を保持する限り、自由に使用・変更できます。
