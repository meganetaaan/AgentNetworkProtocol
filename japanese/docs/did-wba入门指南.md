<!-- translation-review: partial; scope: original source lines 87, 130; complete manual translation of these lines only; remaining text machine-unreviewed -->
> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [docs/did-wba入门指南.md](../../docs/did-wba入门指南.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# DID: WBA入門ガイド

- ノルム: ANP 1.2

これにより、WBA IDの認証や解像度、要求を記述します。 [アクア・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アレイ・アワーズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アベイ](../chinese/02-ANP-基于DID的身份认证协议.md) はい、WBA法則 [ANP-03の特長](../chinese/03-did-wba方法规范.md) はい。このガイドは別の規範ではありません。

## DIDとは?

DID(以下、Identifier, Decentrazed Identifier)は、被験者を識別するために使われます。DID文書は、被写体、認証方法、サービスエントリの確認のための公開鍵として公開することができます。特定の身元資料の信頼性、解像度、ライフサイクル規則は、DIDの方法論および制御またはビジネス権限によって定義され、DID文字列単独で推定されることはできません。

## did: WBAのプロフィール

`did:wba`(Web-Based Agen) は、ドメイン名、HTTPS および DID ドキュメンテーションを使用して Web ID 分析を提供し、デフォルトのパス DD のキー指紋、文書認証、アイデンティティ継続規則を定義します。デプロイメントは、アイデンティティ文書の自己管理またはアイデンティティ サーバーを使用するか、プライベート キーは公開ドキュメントサーバーに残らないものとします。

ANP 1.2 は 2 つのタイプの責任を分けます:**ANP-03 WBA法の制御、認証のためのANP-02一般HTTP/JSON要求**- 実の子供ではない。 `did:web` ボタン式 [Web 方法論 テインと統合アペンディクス](../chinese/附录B：与原生did-web-的兼容.md) WBA に換算するのと同じ認証機構を必要としず、WBA に固有のルートルールを満たす必要はありません。

通常の API 認証は WNS、メッセージ、または `deviceManifest`. 各プロフィールで情報や機器の資格が定義されます。また、SDK、サービス、製品のサポートには定評のある存在は限りません。

## DID: WBA のフォーマット

nudityドメイン名は、次のフォームに含まれています。

```text
did:wba:example.com
did:wba:example.com:user:alice:e1_<fingerprint>
did:wba:example.com%3A3000:user:alice:e1_<fingerprint>
```

`<fingerprint>` プレースホルダーは、実際の値はEd25519バインディング公開キーからANP-03によって計算されます。`%3A3000` ポートを表す;新しいデフォルトパスの最後の段落 DID は、 `e1_` 指紋をスタンプします。`k1_` 所属する[付録 A 非デフォルト互換性拡張](../chinese/附录A：did-wba-k1_兼容扩展.md), デフォルト E1 ルールと混同しないでください。

対応するドキュメントアドレスは:

```text
https://example.com/.well-known/did.json
https://example.com/user/alice/e1_<fingerprint>/did.json
https://example.com:3000/user/alice/e1_<fingerprint>/did.json
```

## DIDを作成する方法:WBA

1. ホスティングドメイン名とメインパスを決定し、クライアント上でキーの生成と保存を保証します。パブリックDDDドキュメントには、秘密鍵ペアや完了キーペアなしで公開鍵のみが含まれています。
2. デフォルトパスタイプDIDでは、AMP-03はEd25519公開鍵の指紋を計算し、完全なDIDを構築するために使われます。 連続識別を必要とする主題のために回復不可能で非再配布されていない安定したメインパスが割り当てられます。
3. DID ドキュメントを指示して認証方法とその宣言を行います。 `authentication` 例:AMP-03 で必要なアクティブ E1 ドキュメント生成 `DataIntegrityProof`。
4. HTTPS をこの DID アドレスにリリースし、解像度、指紋、ドキュメントの証拠とキーの使用を検証します。

### DID 文書構造

以下は、E1 ドキュメントのデフォルトの構造的表示のみで、パスワードテストベクターとしてではなく、指紋、公開鍵、時間、署名値に置き換える必要があるものすべてです。

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
      "publicKeyMultibase": "z<ed25519-public-key>"
    }
  ],
  "authentication": [
    "did:wba:example.com:user:alice:e1_<fingerprint>#key-1"
  ],
  "assertionMethod": [
    "did:wba:example.com:user:alice:e1_<fingerprint>#key-1"
  ],
  "proof": {
    "type": "DataIntegrityProof",
    "cryptosuite": "eddsa-jcs-2022",
    "created": "2026-09-18T00:00:00Z",
    "verificationMethod": "did:wba:example.com:user:alice:e1_<fingerprint>#key-1",
    "proofPurpose": "assertionMethod",
    "proofValue": "z<signature>"
  }
}
```

`id` 解像度を求めるDIDにマッチします。`verificationMethod` (b) 公に利用できる認証材料を提供して下さい;`authentication` 認証は認証キーを要求します。`@context` アクティブ E1 ドキュメントは、その方法の要件を満たし、証拠とルーティングを要求しなければなりません。

`keyAgreement`、`service` とりあえず `deviceManifest` 採用した容量の標準的な要件は、上記の一般的な認証例から情報やE2EEサポートが劣らないことを宣言することです。

`humanAuthorization`はDIDの検証関係ではありません。[ANP-07](../chinese/07-ANP-智能体描述协议规范.md)の同名フィールドは、インターフェース単位の人間による承認要件だけを宣言します。リクエストでは引き続き、ANP-02に従って`authentication`で認められた鍵を使います。認証署名そのものは、人間がその操作を承認済みであることを証明しません。

## 解析と検証方法

プレス [ANP-03 方法規則](../../chinese/03-did-wba方法规范.md#wba-method-rules) パスとエンコードポートを正しく処理するために、完全なDID HTTPS URLを構成します。 JSONの取得に加えて、TLSサービスのアイデンティティ、文書を確認します `id`、主要な関係および適用方法の証拠。

アクティブE1文書を検証する `eddsa-jcs-2022` 証拠、また使用される `proof.verificationMethod` 公開鍵は、DIDの最後に比べ指紋に対して再計算されます。nudityドメイン名はE1パスプリントを必要としませんが、メソッドや認証要件が必要です。

### ステディの主なパスと移行

境界キーを置換して新しいDIDを作成します。同じ安定したメインパス、`alsoKnownAs` または、独立して継続性を証明しない新しいDIDにポイントを処理する。 検証は、以前の信頼性のDIDから始まり、ANP-03による移行チェーンと認証を確認し、権限、メンバーシップ、またはその他の操作戦略によって継続されているかどうかを決定しなければならない。

新規認証を継続してDIDを無効にする。WBA固有の [HTTP 409 DID はレスポンスに置換されました](../../chinese/03-did-wba方法规范.md#http-superseded) プロセスを再テストすると、ANP-03に基づいている。

## AMP-02 ベースのクロスプラットフォームのアイデンティティ

現在のHTTPリクエスト認証の使用法 [ANP-02 HTTP の結合](../../chinese/02-ANP-基于DID的身份认证协议.md#http-binding). 署名は `Signature-Input` とりあえず `Signature` load;メッセージが存在するときに計算する `Content-Digest` 署名のカバレッジにも含まれています。

以下は、要求の形式を記述し、直接送信できる有効なリクエストではない標準的なプレースホルダースタイルです。実際のリクエストに基づいて生成されなければならない時間と真の要求に基づいて計算される必要があります。

```text
POST /orders HTTP/1.1
Host: api.example.com
Content-Type: application/json
Content-Digest: sha-256=:BASE64_SHA256_DIGEST:
Signature-Input: sig1=("@method" "@target-uri" "@authority" "content-digest");created=1733402096;expires=1733402156;nonce="abc123";keyid="did:wba:example.com:user:alice:e1_<fingerprint>#key-1"
Signature: sig1=:BASE64_SIGNATURE:
```

サービスエンド検証ステップ:

1. ヘッダーのリクエスト、署名のカバレッジ、メッセージのサマリーをチェックする。 DID URL を完全から確認 `keyid` 認証方法で対象のDIDを取得します。
2. WBA による DID 文書の解析、検証、および選択したキーの確認 `authentication` 権威の委任。
3. 対応するアルゴリズムを使用して、実際にHTTPでRFC 9421署名文字列を再構築します。 古いカスタムJCSリクエストは、この署名文字列を古いものに置き換えることができません。
4. タイムウィンドウ、実装のためのチャレンジと保護、独立して運用権威をチェックします。
5. サービスは、サービス提供の [ANP-02 任意トークン・プロセス](../../chinese/02-ANP-基于DID的身份认证协议.md#access-tokens) アクセストークンを返します。JWTは、すべての必須要件を達成していない推奨フォーマットです。

JSON認証情報 読み込み [ANP-02 第4章](../../chinese/02-ANP-基于DID的身份认证协议.md#json-carriage). ソース証明書とE2EEオブジェクト証明書は、通常のHTTP署名と混同しないP1および独自のメッセージプロファイルによって定義されています。

## フォローアップ学習

1. まずはお読みください。 [ANP-02: 同定IDに基づく同一証明](../chinese/02-ANP-基于DID的身份认证协议.md)。
2. もう一度読んでください。 [ANP-03: ド:wba方法論的仕様](../chinese/03-did-wba方法规范.md)または[元の: Web の統合の付録](../chinese/附录B：与原生did-web-的兼容.md)。
3. 名前付けが必要な場合は[ANP-04: WNS](../chinese/04-ANP-基于DID-WBA的命名空间规范.md)を読み、機能を公開する場合は[ANP-07](../chinese/07-ANP-智能体描述协议规范.md)を読んでください。
4. から [メッセージを送信する 1.2 インデックス](../chinese/message/README.md) スタート; 完全な概要のため [ANP導入ガイド](chinese/ANP入门指南.md)。

## インフォメーション

WBA法学的検証、一般的な要求認証および運用許可は異なるレベルです。 AMP-03認証のアイデンティティ材料、AMP-02認証リクエスト、および対応する事業戦略により、運用権限を判断します。 追加の承認は文書パス、名前または1つの認証成功から推定されることはありません。
