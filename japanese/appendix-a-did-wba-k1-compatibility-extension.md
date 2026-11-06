<!-- translation-review: machine-fully-reviewed; scope=source lines 1-214; inventory=japanese/reviews/core-review.json; full prose compared against source -->
> 日本語参考訳（機械翻訳を原文と全文照合し、意味・用語を校閲済み）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [appendix-a-did-wba-k1-compatibility-extension.md](../appendix-a-did-wba-k1-compatibility-extension.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# 付録A: did:wbaの`k1_`互換性拡張

- 状態: Released（公開済み）
- バージョン: 1.2
- 原文言語: English / このページは日本語参考訳

### A.1 適用範囲

本付録は、ウォレットのエコシステムや既存のsecp256k1実装との互換性のため、`k1_`パスバインディングプロファイルを定義します。`k1_`は本仕様の既定方式には含まれません。新しい配備では、本仕様の`e1_`プロファイルを優先するべきです（SHOULD）。

### A.2 `k1_`パスの構文

実装が本付録を有効化した場合、パス型DIDの最後のパスセグメントとして、次を使用できます。

```plaintext
k1_<fingerprint>
```

付録AのABNF拡張は、次のとおりです。

```abnf
k1-fingerprint = "k1_" 43base64url-char
wba-k1-path-did = "did:wba:" domain-name 1*(":" path-segment) ":" k1-fingerprint
```

事例:

```plaintext
did:wba:example.com:user:alice:k1_<fingerprint>
did:wba:example.com%3A3000:user:alice:k1_<fingerprint>
```

### A.3 `k1_`フィンガープリントの生成方法

`k1_`フィンガープリントは、パスDIDと、バインディングに使用するsecp256k1公開鍵を関連付けます。生成方法は、次のとおりです。

1. DIDのバインディング鍵を選びます。この鍵は、次の条件を満たさなければなりません（MUST）。
   - secp256k1 公開鍵です。
   - DID文書内で、`publicKeyJwk`として表されていること。
   - DID文書の`authentication`関係で権限を与えられていること。

2. 結合キーに対応するJWKの公開鍵オブジェクトを取得し、RFC 7638で必要なフィールドのみを保持します。

```json
{
  "crv": "secp256k1",
  "kty": "EC",
  "x": "...",
  "y": "..."
}
```

3. 次の規則に従って JWK サムプリント入力を生成します。 [RFC 7638](https://www.rfc-editor.org/rfc/rfc7638):
   - 必要なフィールドだけを保持する。
   - フィールド名を辞書順に並べます。
   - 余分空白なしでJSON文字列を使用します。
   - UTF-8 エンコーディングを使用してください。

4. 手順3で得たUTF-8バイト列をSHA-256でハッシュ化し、32バイトのダイジェストを得ます。

5. 32バイトのダイジェストをbase64urlでエンコードし、末尾の`=`パディングを取り除きます。エンコード結果の長さは43文字に固定されます。

6. エンコード結果の先頭に`k1_`を付け、最終的なパスセグメントを得ます。

### A.4 `k1_` DID Documentの制約

`k1_`プロファイルを使用するDIDのDID Documentは、少なくとも次の条件を満たす必要があります。

1. `id` 要求された DID と同じです。
2. `verificationMethod`内に、バインディング鍵となるsecp256k1の`publicKeyJwk`が少なくとも1つ存在すること。
3. バインディング鍵は、`authentication`関係で権限を与えられていなければなりません（MUST）。
4. バインディング鍵のRFC 7638 thumbprintは、DIDパスの最後の`k1_`フィンガープリントセグメントと厳密に一致しなければなりません（MUST）。

k1バインディングの検証メソッドの推奨形式は、次のとおりです。

```json
{
  "id": "did:wba:example.com:user:alice:k1_<fingerprint>#key-1",
  "type": "EcdsaSecp256k1VerificationKey2019",
  "controller": "did:wba:example.com:user:alice:k1_<fingerprint>",
  "publicKeyJwk": {
    "crv": "secp256k1",
    "kty": "EC",
    "x": "...",
    "y": "...",
    "kid": "<fingerprint>"
  }
}
```

### A.5 `k1_`のDID Document Proof（互換性拡張）

`k1_`プロファイルを使用するDIDに対し、本付録は**標準外で任意のsecp256k1 DID Document Proofプロファイル**を定義します。ウォレットのエコシステムや既存のsecp256k1実装に、DID Documentの完全性証明の機能を提供するためのものです。

このProofプロファイルは、本仕様の本流が定義するW3C標準の相互運用範囲には含まれません。本節への対応を選ぶ実装は、本節の規則に従って`k1_`のDID Document Proofを生成・検証するべきです。本節に対応しない実装は、`k1_` DID Documentの`proof`フィールドを無視してもかまいません（MAY）。

#### A.5.1 Proofオブジェクトのフィールド

`k1_` DID ドキュメントに最上位の `proof` フィールドが含まれる場合、`proof` オブジェクトには次のフィールドが含まれます。

- `type`: 必須。`DataIntegrityProof`に固定します。
- `cryptosuite`: 必須。`didwba-jcs-ecdsa-secp256k1-2025`に固定します。
- `created`: 必須フィールドです。プルーフ作成時刻 (XML スキーマ日時形式)
- `verificationMethod`: 必須。Proof生成に使用する、DID Document内のsecp256k1検証メソッドを指す完全なDID URLです。
- `proofPurpose`: 必須。`assertionMethod`に固定します。
- `proofValue`: 必須。署名値です。エンコード規則は本節の後段を参照してください。
- `domain`: オプションのフィールド
- `challenge`: オプションのフィールド

追加の制約:

1. DIDのバインディングと文書の完全性証明を統一するため、`k1_`バインディング鍵を直接`proof.verificationMethod`に使うことを推奨します（SHOULD）。
2. `proof.verificationMethod`が指す検証メソッドは、実際に`proofValue`を生成した秘密鍵と1対1に対応する必要があります。

#### A.5.2 Proofの生成手順

`k1_`プロファイルを使用し、DID Document Proofを生成する必要がある実装は、次の手順に従うべきです。

1. 署名対象のDID Documentをコピーし、トップレベルの`proof`フィールドを取り除いて、`unsecuredDocument`を得ます。
2. 以下を含む証明オプション オブジェクトを構築します。
   - `type`
   - `cryptosuite`
   - `created`
   - `verificationMethod`
   - `proofPurpose`
   - 任意 `domain`
   - 任意 `challenge`
3. DID DocumentとProofオプションを、それぞれJCSで正規化します。
4. 両方の SHA-256 ハッシュ値を計算します。
5. `hash(proofOptions) || hash(document)`の順に連結し、署名対象のバイト列を得ます。
6. `verificationMethod`に対応するsecp256k1秘密鍵を使い、バイト列に対してECDSA + SHA-256署名を行い、DERエンコードされた署名を得ます。
7. DERエンコードされた署名を、固定長64バイトの`R || S`に変換します。
8. `R || S`をパディングなしのbase64urlでエンコードし、`proofValue`に格納します。
9. 生成した`proof`オブジェクトを、DID Documentのトップレベルに戻します。

#### A.5.3 Proofの検証手順

`k1_`プロファイルを使用し、DID Document Proofを検証する必要がある実装は、次の手順に従うべきです。

1. DID Documentのトップレベルの`proof`を読み取ります。
2. 次のフィールドが存在するかどうかを確認します。
   - `type`
   - `cryptosuite`
   - `created`
   - `verificationMethod`
   - `proofPurpose`
   - `proofValue`
3. チェック:
   - `type`が`DataIntegrityProof`か。
   - `cryptosuite`が`didwba-jcs-ecdsa-secp256k1-2025`か。
   - `proofPurpose`が`assertionMethod`か。
4. DID Documentから`proof`を取り除き、検証対象の文書を得ます。
5. `proof`から`proofValue`を取り除き、Proofオプションを得ます。
6. 文書と証明オプションに対してそれぞれ JCS 正規化を実行します。
7.  SHA-256 ハッシュを個別に計算し、次のように連結します。
   - `hash(proofOptions) || hash(document)`
8. `verificationMethod`が指すsecp256k1公開鍵を解析します。
9. `proofValue`をbase64urlでデコードし、64バイトの`R || S`を復元します。
10. `R || S`を、ECDSA署名の検証に使用できる署名表現に変換します。
11. 対応するsecp256k1公開鍵で、連結した検証対象バイト列のECDSA + SHA-256署名を検証します。
12. 署名検証に成功すれば、Proofの検証は成功です。それ以外は失敗です。

#### A.5.4 解析戦略

`k1_` DIDでは、Proofの検証は、既定では任意の追加的な完全性検査です。ただし、ローカルポリシーで有効化した場合、`proof.verificationMethod`に対応するsecp256k1公開鍵を使って、Proof検証とDIDバインディング検証の両方を完了する必要があります。

実装は、次の2つのモードのいずれかを選んでもかまいません（MAY）。

1. 緩和モード: DID Documentに`proof`がなくても、解決を続行できます。
2. 厳格モード: ローカルポリシーが`k1_`文書にProofを要求する場合、`proof`が欠けたDID Documentを検証失敗として扱わなければなりません（MUST）。

厳格なProof検査を有効化した実装は、追加で次の項目を検査しなければなりません（MUST）。

1. `proof.verificationMethod`が指す検証メソッドの型が、`EcdsaSecp256k1VerificationKey2019`であること。
2. この検証メソッドに対応するsecp256k1公開鍵からRFC 7638 thumbprintを再計算し、DIDパスの最後の`k1_`フィンガープリントセグメントと厳密に一致すること。
3. バインディング検証のために、Proofに使っていないDID Document内の別のsecp256k1鍵を、`proof.verificationMethod`の代わりに使用してはなりません。

`didwba-jcs-ecdsa-secp256k1-2025`への対応を宣言していない実装は、`k1_` DID Document内のこのProofを無視してもかまいません（MAY）。

注: 本付録の`k1_` DID Document Proofは、did:wbaの互換性拡張であり、secp256k1バインディング鍵を使う場合の文書の完全性証明に使用します。W3C標準の相互運用Proofではありません。本仕様が推奨する標準Proof方式は、引き続き`e1_`プロファイルの`DataIntegrityProof` + `eddsa-jcs-2022`です。

### A.6 `k1_`の識別認証

実装が本付録を有効化した場合、`k1_` DIDは、本付録のWBA `k1_`メソッド制約に従いつつ、[ANP-02第3章](../02-anp-did-authentication-protocol-specification.md#http-binding)のクロスプラットフォームHTTP認証フローを使用できます。

認証要件は、次のとおりです。

1. 既定では、クライアントは`k1_`パスに結び付いたsecp256k1バインディング鍵で署名するべきです（SHOULD）。
2. `keyid`は、DID文書内のsecp256k1バインディング検証メソッドを指さなければなりません（MUST）。
3. 署名アルゴリズムは、secp256k1曲線のECDSA + SHA-256です。
4. 署名出力は、固定長の`r || s`バイト列によるエンコードを使用します。
5. サーバーは、検証時に次の項目を同時に確認しなければなりません（MUST）。
   - `keyid`が指す検証メソッドが存在すること。
   - その検証メソッドが`authentication`に含まれること。
   - その検証メソッドのthumbprintが、`k1_`フィンガープリントセグメントと一致すること。

### A.7 `k1_` DID Document Proofの相互運用上の注意

本付録は、did:wba独自の**`k1_`互換Proofプロファイル**を定義します（A.5参照）。secp256k1のバインディングで、任意のDID Document完全性証明を提供するためのものです。W3C標準の`eddsa-jcs-2022`という本流のProofではなく、did:wbaの互換性拡張です。

したがって:

1. `k1_` DID Documentは、トップレベルの`proof`を含めなくてもかまいません（MAY）。
2. Proof検証を有効化する実装は、A.5の`didwba-jcs-ecdsa-secp256k1-2025`規則に従って実行するべきです。
3. Proof検証を有効化しない実装は、`k1_`文書内のProofを無視してもかまいません（MAY）。
4. Proof検証を有効化した場合、バインディング検証のために、Proofに使っていないDID Document内の別のsecp256k1鍵を、`proof.verificationMethod`の代わりに使用してはなりません。

### A.8 `k1_`の作成、解決、更新

- 作成: secp256k1バインディング鍵を生成し、`k1_`フィンガープリントセグメントを計算して、対応するパスに`did.json`を保存します。
- 解決: 本仕様の一般的な解決手順に加えて、A.3とA.4に従って`k1_`バインディング関係を検証します。
- 更新: `k1_`バインディング鍵が変わらない限り、DID自体も変わりません。バインディング鍵が変わる場合、DIDを変更しなければなりません（MUST）。
- 廃止: ローテーションは、古い DID を非アクティブ化し、新しい DID を作成することで実現できます。安定した参照関係は、上位層のネーム サービスによって維持されます。
