<!-- translation-method: agent-full; source=references/did_web-method-specification.html; scope=saved-document-visible-text; code=rendered-pre-blocks-verbatim -->
# did:web メソッド仕様（保存HTMLの全文参考訳）

原文: [リポジトリ内の保存HTML](../../../../references/did_web-method-specification.html)。これは**2024年7月31日付の非公式草案**の訳です。現在の仕様へ内容を更新していません。保存ページのスクリプトやスタイルは実行せず、文書の表示本文を静的に抽出しました。JSONなど10個の`pre`ブロックは原文の表示テキストをそのまま挿入しています。ブラウザー拡張が注入したUIや実行用データは仕様本文に含めません。

保存ページの操作表示: 「目次へ移動」「サイドバーを折りたたむ」、ReSpec、「SpecRefを検索」「定義を検索」「35.2.0について」「エクスポート」。

## 文書情報

did:web メソッド仕様。非公式草案、2024年7月31日。

- 最新公開版: なし。
- 最新編集者草案: https://w3c-ccg.github.io/did-method-web/
- 履歴: コミット履歴。
- 編集者: Michael Prorock（mesur.io）、Oliver Terbu（Consensys）。
- 著者: Christian Gribneau（Ology Newswire, Inc.）、Michael Prorock（mesur.io）、Orie Steele（Transmute）、Oliver Terbu（Consensys）、Mike Xu（Consensys）、Dmitri Zagidulin（Digital Bazaar）。
- フィードバック: GitHubの`w3c-ccg/did-method-web`。プルリクエスト、新しいissue、未解決issue。
- Copyright © 2024 文書の編集者・著者。本文はCreative Commons Attribution 4.0 International Public Licenseの下で提供され、追加条件が適用される場合があります。

## 概要

分散台帳を対象とするDIDは、大規模な普及を促すのに十分な、意味があり信頼できるアイデンティティ関連データを立ち上げるうえで、実務上の大きな課題に直面しています。本書はWebドメインがすでに持つ評判を利用する、新しいDIDメソッドを提案します。

## この文書の位置づけ

この文書は、仕様となる可能性のある文書の草案です。いかなる種類の公式な位置づけもなく、どの標準化団体の支持や合意も表しません。

## 目次

概要、この文書の位置づけ、1 はじめに（1.1 序文、1.2 適合性、1.3 例）、2 Web DIDメソッド仕様（2.1 対象システム、2.2 メソッド名、2.3 メソッド固有識別子、2.4 鍵素材と文書の取り扱い、2.5 DIDメソッド操作、2.6 セキュリティとプライバシーの考慮事項）、付録A 参照実装、付録B 参考文献。

操作の内訳は、2.5.1 作成・登録、2.5.2 読み取り・解決、2.5.3 更新、2.5.4 無効化・失効です。考慮事項の内訳は、認証と認可、DNSのセキュリティとプライバシー、DID文書の完全性検証、転送中のセキュリティ、国際化ドメイン名、任意パス、CORSポリシーです。参考文献は規範的参考文献と参考情報に分かれます。

## 1 はじめに

### 1.1 序文

Web DIDメソッド仕様は、Decentralized Identifiers v1.0仕様［DID-CORE］で定める要件に適合します。DIDおよびDIDメソッド仕様の詳細は［DID-PRIMER］も参照してください。

### 1.2 適合性

非規範的と明記した節に加え、この仕様のすべての執筆指針、図、例、注記は非規範的です。この仕様のそれ以外の部分は規範的です。

本書のMAY、MUST、MUST NOT、SHOULDは、ここに示すようにすべて大文字で記載される場合に限り、BCP 14［RFC2119］［RFC8174］に従って解釈します。

### 1.3 例

例1: JSON Web Keyを使用するdid:web DID文書。

```text
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    "https://w3id.org/security/suites/jws-2020/v1"
  ],
  "id": "did:web:example.com",
  "verificationMethod": [
    {
      "id": "did:web:example.com#key-0",
      "type": "JsonWebKey2020",
      "controller": "did:web:example.com",
      "publicKeyJwk": {
        "kty": "OKP",
        "crv": "Ed25519",
        "x": "0-e2i2_Ua1S5HbTYnVB0lj2Z2ytXu2-tYmDFf8f5NjU"
      }
    },
    {
      "id": "did:web:example.com#key-1",
      "type": "JsonWebKey2020",
      "controller": "did:web:example.com",
      "publicKeyJwk": {
        "kty": "OKP",
        "crv": "X25519",
        "x": "9GXjPGGvmRq9F6Ng5dQQ_s31mfhxrcNZxRGONrmH30k"
      }
    },
    {
      "id": "did:web:example.com#key-2",
      "type": "JsonWebKey2020",
      "controller": "did:web:example.com",
      "publicKeyJwk": {
        "kty": "EC",
        "crv": "P-256",
        "x": "38M1FDts7Oea7urmseiugGW7tWc3mLpJh6rKe7xINZ8",
        "y": "nDQW6XZ7b_u2Sy9slofYLlG03sOEoug3I0aAPQ0exs4"
      }
    },
  ],
  "authentication": [
    "did:web:example.com#key-0",
    "did:web:example.com#key-2"
  ],
  "assertionMethod": [
    "did:web:example.com#key-0",
    "did:web:example.com#key-2"
  ],
  "keyAgreement": [
    "did:web:example.com#key-1", 
    "did:web:example.com#key-2"
  ]
}
```

例2: Ethereumアドレスを使用するdid:web DID文書。

```text
{
  "@context": ["https://www.w3.org/ns/did/v1", "https://w3id.org/security/suites/secp256k1recovery-2020/v2"],
  "id": "did:web:example.com",
  "verificationMethod": [{
      "id": "did:web:example.com#address-0",
      "type": "EcdsaSecp256k1RecoveryMethod2020",
      "controller": "did:web:example.com",
      "blockchainAccountId": "eip155:1:0x89a932207c485f85226d86f7cd486a89a24fcc12"
  }],
  "authentication": [
      "did:web:example.com#address-0"
  ]
}
```

## 2 Web DIDメソッド仕様

### 2.1 対象システム

Web DIDメソッドの対象システムは、DIDに指定されたドメインをDomain Name System（DNS）で解決したときのホスト名です。ホストが指定されていなければドメイン名です。

### 2.2 メソッド名

このDIDメソッドを識別する名前文字列は`web`です。このメソッドを使用するDIDは、接頭辞`did:web`で始まらなければなりません（MUST）。DID仕様に従い、この文字列は小文字でなければなりません（MUST）。接頭辞以降のDIDの残りの部分は、以下で定めます。

### 2.3 メソッド固有識別子

メソッド固有識別子は、TLS/SSL証明書で保護された完全修飾ドメイン名と、任意のDID文書へのパスです。有効なドメイン名の構文を表す形式的な規則は［RFC1035］［RFC1123］［RFC2181］に記載されています。

メソッド固有識別子はSSL/TLS証明書のcommon nameと一致しなければならず（MUST）、IPアドレスを含めてはなりません（MUST NOT）。ポートを含めてもかまいません（MAY）が、パスとの衝突を防ぐため、コロンはパーセントエンコードしなければなりません（MUST）。ディレクトリとサブディレクトリは任意に含めてもかまいません（MAY）。区切りはスラッシュではなくコロンを使用します。

```text
web-did = "did:web:" domain-name
web-did = "did:web:" domain-name * (":" path)
```

例3: WebメソッドDIDの例。

```text
did:web:w3c-ccg.github.io

did:web:w3c-ccg.github.io:user:alice

did:web:example.com%3A3000
```

### 2.4 鍵素材と文書の取り扱い

多くのWebサーバーがコンテンツを提示する方法から、個々のdid:web文書が`application/json`のメディア型で提供される可能性は高いと考えられます。取得した文書が`did.json`という名前であれば、次の処理規則を適用することが望まれます。

- JSON文書のルートに`@context`がある場合は、JSON-LDの規則に従って文書を処理することが望まれます。それができない場合、または文書の処理に失敗した場合、その文書をdid:web文書として扱う対象から除外することが望まれます。
- JSON文書のルートに`@context`があり、JSON-LD処理に成功し、コンテキスト`https://www.w3.org/ns/did/v1`を含む場合は、［did-core］の6.3.2節に従ってDID文書としてさらに処理できます。
- `@context`がない場合は、［did-core］の6.2.2節で定めるDID処理の通常のJSON規則に従って処理することが望まれます。

did:web文書内にDID URLが現れる場合は常に、絶対URLでなければなりません。

注: これには、埋め込まれた鍵素材やその他のメタデータ内のURLも含まれます。この規則は鍵の混同攻撃を防ぎます。

### 2.5 DIDメソッド操作

#### 2.5.1 作成（登録）

did:webメソッド操作のHTTP APIは、意図的に規定していません。プログラムからの登録・管理は、各実装で定義するか、それぞれのWeb環境の要件に基づいて定義します。

DIDは、次の手順で作成します。

1. ドメイン名登録事業者にドメイン名の使用を申請します。
2. ホスティングサービスの所在であるIPアドレスを、DNS検索サービスに登録します。
3. Koblitz曲線などを用いた適切な鍵ペアを含むDID文書のJSON-LDファイルを作成します。ドメイン全体を表す場合はwell-known URLに`did.json`を保存します。同じドメインで多数のDIDを解決する場合は、指定したパスに保存します。

たとえば、ドメイン名`w3c-ccg.github.io`の`did.json`は次のURLで取得できます。

例4: DIDの作成。

```text
did:web:w3c-ccg.github.io
 -> https://w3c-ccg.github.io/.well-known/did.json
```

ドメイン単独ではなく任意パスを指定する場合、`did.json`はその指定パスで取得できます。

例5: 任意パスを持つDIDの作成。

```text
did:web:w3c-ccg.github.io:user:alice
 -> https://w3c-ccg.github.io/user/alice/did.json
```

ドメインに任意ポートを指定する場合、ホストとポートを分けるコロンは、パスとの衝突を防ぐためパーセントエンコードしなければなりません（MUST）。

例6: 任意パスとポートを持つDIDの作成。

```text
did:web:example.com%3A3000:user:alice
 -> https://example.com:3000/user/alice/did.json
```

#### 2.5.2 読み取り（解決）

Web DIDからDID文書を解決するには、次の手順を実行しなければなりません（MUST）。

1. メソッド固有識別子の`:`を`/`に置き換えて、完全修飾ドメイン名と任意パスを得ます。
2. ドメインにポートが含まれる場合、コロンをパーセントデコードします。
3. `https://`を前に付け、DID文書の想定位置を表すHTTPS URLを生成します。
4. URLにパスが指定されていない場合は、`/.well-known`を付加します。
5. `/did.json`を付加してURLを完成させます。
6. 安全なHTTPS接続を正常にネゴシエートでき、2.6節のセキュリティとプライバシーの考慮事項で示すセキュリティ要件を適用するエージェントを使用して、そのURLへHTTP GET要求を行います。
7. 解決したDID文書のIDが、解決対象のWeb DIDと一致することを検証します。
8. HTTP GET要求に伴うDNS解決では、解決対象のアイデンティティが追跡されることを防ぐため、クライアントは［RFC8484］を利用することが望まれます（SHOULD）。

#### 2.5.3 更新

DID文書を更新するには、`did.json`を更新する必要があります。DIDそのものは変わりませんが、新しい検証鍵やサービスエンドポイントを追加するなど、DID文書の内容は変更できることに注意してください。

注: gitなどのバージョン管理システムと、GitHub Actionsなどの継続的インテグレーションシステムでDID文書の更新を管理すると、認証と監査履歴を支援できます。

注（HTTP API）: 更新処理のHTTP APIは規定していません。プログラムからの登録・管理は、各実装で定義します。

#### 2.5.4 無効化（失効）

DID文書を削除するには、`did.json`を取り除くか、その他の手段で一般からアクセスできない状態にする必要があります。

### 2.6 セキュリティとプライバシーの考慮事項

この節は非規範的です。

#### 2.6.1 認証と認可

このDIDメソッドでは、DID文書の書き込み、削除、作成に関する認証・認可メカニズムを規定していません。did:web文書は他のWebリソースと同様に、実装側で保護します。

Webコンテンツの更新や管理について、個々の脅威環境の必要性に応じ、業界のベストプラクティスに従ってWeb環境を安全にする責任は実装者にあります。

#### 2.6.2 DNSの考慮事項

##### 2.6.2.1 DNSのセキュリティに関する考慮事項

DNSには、did:webメソッドへの能動的なセキュリティ攻撃やプライバシー攻撃につながる攻撃経路が多数あります。実装者は、適切なDNS設定によってこれらの懸念に対処することが重要です。たとえばDNS over HTTPSを通じてDNS解決を適切に保護しなければ、能動的な攻撃者が中間者攻撃でDNS解決結果を傍受し、不正なDID文書を持つ悪意あるサーバーを指すようにできます。

また、実装者はDNSレコードの偽装にも注意することが望まれます。悪意あるDNSサーバーが返すレコードが真正でなければ、別のDID文書を持つ悪意あるサーバーを指すことが可能になります。この種の問題を防ぐ方法として、RFC4033、RFC4034、RFC4035で定めるDNSSECの利用が挙げられます。

##### 2.6.2.2 DNSのプライバシーに関する考慮事項

did:webメソッドはWebサーバーの解決にDNSを利用するため、did:web識別子のすべての解決がDNS事業者に追跡される可能性があります。DID文書はWebサーバーに保存されるため、DID文書リソースを取得するたびに、そのWebサーバーも解決を追跡できます。

DID文書を解決する依拠当事者への追跡を軽減するには、信頼するユニバーサルリゾルバーを使って集団に紛れるプライバシー（herd privacy）を得ること、VPNサービスを使うこと、TORネットワーク経由で解決することなどを検討することが望まれます。新たに登場しつつある別の解決策として、`draft-pauly-dprive-oblivious-doh-03`も役立ちます。

#### 2.6.3 DID文書の完全性検証

Hashlinksなどの追加メカニズムを、DID文書の完全性保護・検証を支援する目的で利用してもかまいません（MAY）。その場合は、DID文書のハッシュを信頼できるストアまたは分散ストアに記録できます。文書の取得者は、取得したハッシュと手元のDID文書から計算したハッシュを比較し、DID文書が改ざんされていないことを確認できます。

#### 2.6.4 転送中のセキュリティ

did:web文書の配信では、NIST SP 800-52 Rev. 2またはその後継の指針に従わなければなりません（MUST）。TLS設定の強化には、OWASPのTransport Layer Protection Cheat Sheet［OWASP-TRANSPORT］の最新の推奨にも従うことを推奨します。

暗号期間、すなわち特定の鍵の使用が認められる期間、またはシステム・アプリケーションの鍵が有効であり続けられる期間については、NIST SP 800-57を参照してください。

TLS設定は少なくともSHA256を使用しなければならず（MUST）、運用環境の必要性に応じ、SHA384、POLY1305、またはより強い方式を使用することが望まれます（SHOULD）。削除操作はドメイン名登録事業者やDNS検索サービスが実行してもかまいません（MAY）。

執筆時点では、TLS 1.2以上を、強い暗号スイートだけを使い、十分大きい鍵長を使うよう設定することが望まれます（SHOULD）。推奨は変化し得るため、最新の推奨のみを使用することが望まれます。ただし、経験則として次の組み合わせは妥当な出発点です。

- 鍵交換には、強い曲線`{X25519, brainpoolP384r1, NIST P-384, brainpoolP256r1, NIST P-256}`のいずれかを使うECDHEを使用します。
- バルク暗号化には、256ビット鍵のAESGCMまたはChaCha20を使用します。
- 署名には、強い曲線`{brainpoolP384r1, NIST P-384, brainpoolP256r1, NIST P-256}`のいずれかを使うECDSA、または少なくとも3072のRSAを使用します。
- MACにはAuthenticated Encryption with Associated Data（AEAD）を使用します。

原文が執筆時点の強いSSL/TLS設定例として示すものは次のとおりです。値は原文のままです。

```text
ECDHE-ECDSA-AES256-GCM-SHA384, TLSv1.2, Kx=ECDH, Au=ECDSA, Enc=AESGCM(256), Mac=AEAD
ECDHE-RSA-AES256-GCM-SHA384, TLSv1.2, Kx=ECDH, Au=RSA Enc=AESGCM(256), Mac=AEAD
ECDHE-ECDSA-CHACHA20-POLY1305, TLSv1.2, Kx=ECDH, Au=ECDSA, Enc=ChaCha20-Poly1305, Mac=AEAD
ECDHE-RSA-CHACHA20-POLY1305, TLSv1.2, Kx=ECDH, Au=RSA, Enc=ChaCha20-Poly1305, Mac=AEAD
ECDHE-RSA-AES256-GCM-SHA384, TLSv1.2, Kx=ECDH, Au=RSA, Enc=AESGCM(256), Mac=AEAD
ECDHE-ECDSA-AES256-GCM-SHA384, TLSv1.2, Kx=ECDH, Au=ECDSA, Enc=AESGCM(256), Mac=AEAD
```

#### 2.6.5 国際化ドメイン名

［DID-CORE］の識別子構文は、メソッド名およびメソッド固有識別子にUnicodeを許可しません。Unicode文字を含むドメイン名やパス要素に依存するDID URLへの対応を実装するときは注意することが望まれます。UTS-46とIDNA 2008も参照してください。

#### 2.6.6 任意パスに関する考慮事項

ドメイン単独ではなく、DID文書への任意パスを使って文書を解決する場合、署名されたデータでの検証は、そのパスが指すファイルを管理する主体が秘密鍵を持つことを証明します。ドメイン運営者が秘密鍵を持つことを証明するものではありません。

例:

```text
did:web:example.com:u:bob
```

解決先のDID文書:

```text
https://example.com/u/bob/did.json
```

この場合、`example.com`がユーザーBobにそのDIDの管理を任せている可能性があり、管理の証明が指すのはBobであって、`example.com`全体ではありません。

#### 2.6.7 クロスオリジンリソース共有（CORS）ポリシーの考慮事項

Webブラウザー内で動くクライアントアプリケーションがDID解決を行えるよう、提供するDID文書ファイルは任意のオリジンからアクセス可能であることが望まれます。これを有効にするには、DID文書のHTTP応答に次のヘッダーを含められます。

```text
Access-Control-Allow-Origin: *
```

## 付録A 参照実装

この節は非規範的です。

`uport-project/https-did-resolver`のコードは、このDIDメソッドの参照実装を示すことを目的としています。他の実装も、互換性を宣言する前に、`/src/__tests__`で説明するテストスイートに合格することを確認することが望まれます。

`transmute-industries/restricted-resolver`のコードは、この仕様を実装しています。`reinkrul/java-did-resolvers`のコードは、Javaライブラリーとしてこの仕様を実装しています。

## 付録B 参考文献

### B.1 規範的参考文献

- ［DID-CORE］『分散型識別子（DID）v1.0』。Manu Sporny、Amy Guy、Markus Sabadello、Drummond Reed。W3C、2022年7月19日、W3C勧告。https://www.w3.org/TR/did-core/
- ［RFC1035］『ドメイン名―実装と仕様』。P. Mockapetris。IETF、1987年11月、Internet Standard。https://www.rfc-editor.org/rfc/rfc1035
- ［RFC1123］『インターネットホストの要件―アプリケーションとサポート』。R. Braden編。IETF、1989年10月、Internet Standard。https://www.rfc-editor.org/rfc/rfc1123
- ［RFC2119］『RFCで要件レベルを示すために用いるキーワード』。S. Bradner。IETF、1997年3月、Best Current Practice。https://www.rfc-editor.org/rfc/rfc2119
- ［RFC2181］『DNS仕様の明確化』。R. Elz、R. Bush。IETF、1997年7月、Proposed Standard。https://www.rfc-editor.org/rfc/rfc2181
- ［RFC8174］『RFC 2119のキーワードにおける大文字と小文字の曖昧さ』。B. Leiba。IETF、2017年5月、Best Current Practice。https://www.rfc-editor.org/rfc/rfc8174
- ［RFC8484］『HTTPSによるDNSクエリー（DoH）』。P. Hoffman、P. McManus。IETF、2018年10月、Proposed Standard。https://www.rfc-editor.org/rfc/rfc8484

### B.2 参考情報

- ［DID-PRIMER］『DID入門』。Drummond Reed、Manu Sporny。Rebooting the Web of Trust 2017。https://github.com/WebOfTrustInfo/rebooting-the-web-of-trust-fall2017/blob/master/topics-and-advance-readings/did-primer.md
- ［OWASP-TRANSPORT］『トランスポート層保護チートシート』。https://www.owasp.org/index.php/Transport_Layer_Protection_Cheat_Sheet

保存ページ末尾の操作表示: 「上へ」。
