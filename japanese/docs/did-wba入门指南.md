<!-- translation-review: full; source=docs/did-wba入门指南.md; basis=entire original read and manually compared paragraph by paragraph -->
> 日本語参考訳（機械翻訳を基に原文全文を照合済み）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [docs/did-wba入门指南.md](../../docs/did-wba入门指南.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# DID:WBA 入門ガイド

- 仕様セット：ANP 1.2

このガイドは WBA アイデンティティの作成、解決、要求認証を紹介します。共通認証は [ANP-02](../chinese/02-ANP-基于DID的身份认证协议.md)、WBA メソッドの規則は [ANP-03](../chinese/03-did-wba方法规范.md) に従います。本ガイドが別の仕様を定義するものではありません。

## DID とは

DID（Decentralized Identifier、分散型識別子）は主体を識別します。DID Document は、主体を検証する公開鍵、検証メソッド、サービスの入り口を公開できます。資料の信頼の根拠、解決、ライフサイクルの規則は DID メソッドが定義します。DID 文字列だけから支配権や業務上の権限を推定してはなりません。

## DID:WBA の紹介

`did:wba`（Web-Based Agent）は、ドメイン名、HTTPS、DID Document で Web のアイデンティティを解決します。既定のパス型 DID には、公開鍵指紋の結合、文書の証明、アイデンティティの連続性の規則を定義します。自分で文書をホストしても、アイデンティティ提供サービスを使ってもかまいません。秘密鍵を公開文書サーバーに保管させるべきではありません。

ANP 1.2 は、**ANP-03 が WBA メソッドを、ANP-02 が共通の HTTP/JSON 要求認証を扱う**ように責任を分けます。ネイティブな `did:web` は、[Web メソッドのバインディングと統合の付録](../chinese/附录B：与原生did-web-的兼容.md)に従って同じ認証方式を使えます。WBA に変換する必要はなく、WBA 固有のルート proof を要求してもなりません。

通常の API 認証は WNS、メッセージング Profile、`deviceManifest` を要求しません。メッセージとデバイスの適格性は、それぞれの Profile が定義します。仕様の存在は、SDK、サービス、製品への対応済みを意味しません。

## DID:WBA の形式

ドメイン名だけの形式と、既定のパス型形式は、次のとおりです。

```text
did:wba:example.com
did:wba:example.com:user:alice:e1_<fingerprint>
did:wba:example.com%3A3000:user:alice:e1_<fingerprint>
```

`<fingerprint>` はプレースホルダーで、実際の値は ANP-03 に従って Ed25519 結合公開鍵から計算します。`%3A3000` はポートを表します。新しい既定のパス型 DID の最後の要素には、`e1_` 結合指紋が必要です。`k1_` は[付録 A の既定ではない互換拡張](../chinese/附录A：did-wba-k1_兼容扩展.md)であり、既定の E1 規則と混ぜるべきではありません。

対応する文書の URL：

```text
https://example.com/.well-known/did.json
https://example.com/user/alice/e1_<fingerprint>/did.json
https://example.com:3000/user/alice/e1_<fingerprint>/did.json
```

## DID:WBA の作成

1. ホストするドメインと主体のパスを決め、クライアント側で安全に鍵を生成・保存します。公開 DID Document には公開鍵だけを含め、秘密鍵や鍵ペア全体は含めません。
2. 既定のパス型 DID では、ANP-03 に従って Ed25519 公開鍵の指紋を計算し、完全な DID を作ります。継続して識別する主体には、回収・再割り当てできない安定した主体パスを割り当てます。
3. DID Document を作り、検証メソッドと `authentication` などの用途を宣言します。有効な E1 文書には、ANP-03 が要求する `DataIntegrityProof` を生成します。
4. DID に対応する URL に HTTPS で公開し、解決、指紋、文書 proof、鍵の用途を検証します。

### DID Document の構造

次は既定の E1 文書の構造だけを示します。指紋、公開鍵、時刻、署名は実際の計算結果に置き換える必要があり、暗号学的なテストベクトルとして使えません。

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

`id` は解決要求の DID と一致する必要があります。`verificationMethod` は公開の検証資料を提供し、`authentication` は要求認証に使う鍵を認可します。`@context` の有無と処理は、ANP-03 の JSON/JSON-LD 規則に従い、すべての表現で必須というわけではありません。有効な E1 文書は、メソッドの proof とパス指紋の検証要件を満たす必要があります。

`keyAgreement`、`service`、`deviceManifest` は、使う能力の仕様に従って宣言します。この通常認証の例だけから、メッセージや E2EE への対応を推定してはなりません。

`humanAuthorization` は DID の検証関係ではありません。[ANP-07](../chinese/07-ANP-智能体描述协议规范.md) の同名フィールドは、インターフェース単位の人間による認可要件を宣言するだけです。要求は引き続き ANP-02 に従い、`authentication` が認可する鍵を使います。認証署名そのものは、人間が操作を承認した証拠にはなりません。

## 解決と検証

[ANP-03 のメソッド規則](../../chinese/03-did-wba方法规范.md#wba-method-rules)に従って、完全な DID から HTTPS URL を作り、パスとエンコードされたポートを正しく処理します。JSON の取得に加え、TLS のサービス識別、文書の `id`、鍵の関係、適用するメソッドの証明も検証するべきです。

有効な E1 文書では `eddsa-jcs-2022` proof を検証し、`proof.verificationMethod` の公開鍵で指紋を再計算して、DID の末尾と比較します。ドメイン名だけの形式では E1 パス指紋は不要ですが、メソッドと要求認証の要件は必要です。

### 安定した主体パスと移行

結合鍵の変更で、新しい DID が生まれる場合があります。同じ安定主体パス、`alsoKnownAs`、Handle が新 DID を指すことのいずれも、単独では連続性を証明しません。それまで信頼していた DID から出発し、ANP-03 の移行チェーンと証明を検証してから、業務ポリシーが権限やメンバー関係の継続を判断します。

無効化された DID を、新たな認証に使い続けてはなりません。WBA 固有の [HTTP 409 DID 置き換え済み応答](../../chinese/03-did-wba方法规范.md#http-superseded)と再試行は ANP-03 に従います。

## ANP-02 によるプラットフォーム間の認証

現在の HTTP リクエスト認証は [ANP-02 HTTP バインディング](../../chinese/02-ANP-基于DID的身份认证协议.md#http-binding)を使います。署名は `Signature-Input` と `Signature` で運び、本文があれば `Content-Digest` も計算して署名対象に含めます。

次は仕様のプレースホルダーを使って要求の形を示したもので、そのまま送れる有効な要求ではありません。時刻は実際の要求に合わせ、digest と signature は実際の要求から計算する必要があります。

```text
POST /orders HTTP/1.1
Host: api.example.com
Content-Type: application/json
Content-Digest: sha-256=:BASE64_SHA256_DIGEST:
Signature-Input: sig1=("@method" "@target-uri" "@authority" "content-digest");created=1733402096;expires=1733402156;nonce="abc123";keyid="did:wba:example.com:user:alice:e1_<fingerprint>#key-1"
Signature: sig1=:BASE64_SIGNATURE:
```

サーバーの検証手順：

1. ヘッダー、署名対象、本文のダイジェストを確認し、完全な DID URL の `keyid` から主体 DID と検証メソッドを得ます。
2. WBA メソッドで DID Document を解決・検証し、選択した鍵が `authentication` で認可されていることを確認します。
3. 実際の HTTP 要求から RFC 9421 の署名ベース文字列を再構築し、対応するアルゴリズムで検証します。従来の独自 JCS 要求文字列で、この署名ベースを置き換えることはできません。
4. 時刻範囲、チャレンジ、リプレイ防止を確認し、別に業務権限を検査します。
5. [ANP-02 の任意の Token フロー](../../chinese/02-ANP-基于DID的身份认证协议.md#access-tokens)で Access Token を返せます。JWT は推奨形式であり、すべての実装の必須要件ではありません。

JSON による認証情報の格納は [ANP-02 第 4 章](../../chinese/02-ANP-基于DID的身份认证协议.md#json-carriage)を参照してください。メッセージの発信者証明と E2EE オブジェクト証明は、引き続き P1 と所属するメッセージング Profile が定義するもので、通常の HTTP 署名と混同しません。

## 次に学ぶ内容

1. まず [ANP-02：DID ベース認証](../chinese/02-ANP-基于DID的身份认证协议.md)。
2. 次に [ANP-03：did:wba メソッド仕様](../chinese/03-did-wba方法规范.md)、または[ネイティブな did:web の統合付録](../chinese/附录B：与原生did-web-的兼容.md)。
3. 命名が必要なら [ANP-04：WNS](../chinese/04-ANP-基于DID-WBA的命名空间规范.md)、能力を公開するなら [ANP-07](../chinese/07-ANP-智能体描述协议规范.md)。
4. メッセージングが必要なら [Messaging 1.2 一覧](../chinese/message/README.md)。全体像は [ANP 入門ガイド](chinese/ANP入门指南.md)を参照。

## まとめ

WBA メソッドの検証、共通の要求認証、業務の認可は別の層です。ANP-03 で資料を検証し、ANP-02 で要求を検証した後、業務ポリシーで操作権限を判断します。文書のパス、名前、一度の認証成功から、追加の認可を推定してはなりません。
