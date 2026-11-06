<!-- translation-review: full; source=chinese/deprecated/02-did-all方法规范.md -->
> 日本語参考訳（原文全文照合・校閲済み）。サポート終了済みの歴史仕様です。原文の暗号処理に関する主張、独自のJWT時刻、壊れたPython例を変更していません。
> 原文: [chinese/deprecated/02-did-all方法规范.md](../../../chinese/deprecated/02-did-all方法规范.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# did:allメソッド設計仕様

> !!!**注：** この仕様のサポートは終了しています。最新のDIDメソッド[did:wba](../03-did-wba方法规范.md)を使ってください。

## 背景
DID標準に基づく、プラットフォームをまたぐ認証とエンドツーエンド暗号化通信についての記事で、相互認証の問題を解決するため、コンソーシアム型ブロックチェーンに似たall（Alliance）という新しいDIDメソッドを提案しました。これは、このメソッドの標準に対応するすべてのサービス事業者が、DID関連のサービスを外部に提供できるという意味です。

本書はW3C DID仕様に基づき、DIDの生成・解決・DID文書に加える独自の変更など、allメソッドの設計を詳しく説明します。

本書は、読者がW3C DIDの基礎知識を持つことを前提にしています。必要に応じて関連記事や本書の参考文献をご覧ください。

ここで提案するallメソッドは、解決しようとする問題に合わせ、W3C標準を一部拡張・変更しています。

## 1. DIDメソッドall（Alliance）

DIDメソッドは分散型識別子（DID）を実現する方法であり、DIDをどのように作成、解決、更新、失効させるかを定めます。各メソッドは特定のブロックチェーンまたは分散ネットワークと関連付けられ、そのネットワークとのやり取りの規則を定義します。

既存のDIDメソッドの多くはブロックチェーンに基づいて設計されており、その技術の現状から、拡張性や商用化に大きな課題があります。WebベースのDIDメソッドはドメイン名と深く結び付き、Web事業者にDID操作への対応を求めるため、複雑さが増します。

そこで、コンソーシアム型ブロックチェーンに似た、all（Alliance）という新しいメソッドを提案します。このメソッドの標準に対応する事業者は、DID関連のサービスを外部へ提供できます。利用者は、価格、サービス水準、評判などから1つ以上の事業者を選べます。対応事業者は、ブロックチェーン上の特定の記憶領域にサービスのドメイン名を記録でき、利用者全員が事業者の完全な一覧を取得できるようにします。

DIDの作成者は、DID文書をホストするサービスのドメイン名をDID内に指定することもできます。これにより、特定の事業者または利用者自身のサーバーから文書を取得するよう、DIDの解決側へ指示できます。

また、allメソッドのすべての操作はHTTPSなど標準のWebプロトコルを使うため、既存のWeb基盤を利用できます。

## 2. allメソッドの中核となる設計思想

allメソッドの中核は、暗号技術でDID文書の改ざん防止を確保し、Allianceノードでシステムの分散性を確保することです。

### 2.1 暗号技術によるDID文書の改ざん防止

基盤がブロックチェーンや分散台帳であれば、合意形成、暗号技術、分散保存でDID文書の改ざん防止を図れます。しかし、このAlliance方式では、単一のノードは中央ノードと見なせます。中央ノードを信頼する以外の技術的な方法では、そのままでは文書が改ざんされていないと確認できません。

そこで、DIDと保持者の公開鍵が1対1に対応する生成規則を設け、公開鍵を使って文書に署名します。こうすれば、任意の中央ノードへ文書を送っても、その改ざん防止を確かめる技術的な手段を持てます。

### DIDの作成とホスティングの流れ

- まず非対称暗号の秘密鍵と公開鍵を生成します。現時点ではsecp256r1を使います。
- Bitcoinのアドレス生成に似た処理で、公開鍵からDID内の一意な識別子を生成します。
- DID、公開鍵などを使ってDID文書を作成し、秘密鍵で署名します。
- 署名情報もDID文書に保存し、第三者のサービスノードでホストします。

### 他の利用者によるDID解決と検証の流れ

- 第三者のサービスノードへ解決リクエストを送り、DID文書を取得します。
- 生成規則に従いDIDと公開鍵の対応を調べます。1対1に対応すれば、その公開鍵は正しいものです。
- 公開鍵で文書内の署名を検証します。署名が正しければ、文書は改ざんされていません。

以上でDID文書の作成・検証の流れが完了します。

### 2.2 DIDサービスの分散性の確保

allメソッドのDIDサービスは柔軟な方法を採ります。第1に、現在のブロックチェーンなどの拡張性の課題を避け、最良の利用体験を提供するため、各ノード自体は中央集権的なサービスとします。第2に、利用者はサービスを自前で運営する、第三者を利用する、複数の第三者を同時に使って切り替える、といった選択肢を持ちます。

### 2.3 主要な処理

allメソッドでDIDを作成、解決、更新、失効させる操作は、すべてHTTPSを使います。主要な流れは次のとおりです。

![allメソッドの主要な流れ](../../../images/did-all-core-flow.png)

1. 利用者Aがブロックチェーンなどの分散保存先からallメソッドの事業者ドメイン名一覧を読み出すか、自前のDIDサービスを使います。
2. DIDとDID文書を作成し、1つ以上のノードを選び、文書をホストするHTTPリクエストを開始します。
3. 利用者Bも分散保存先からallメソッドのサービスドメイン名一覧を読み出します。
4. ポーリングまたは並行照会によって、サービスのドメインノードからDID文書を照会します。

## 3. DID文書の設計

現バージョンのDID文書は、W3Cが定義するすべてのフィールドを使ってはいません。現在の文書はW3C仕様の部分集合です。

### DID文書の例

```json
{
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www@example.com:443",
  "verificationMethod": [
    {
      "id": "did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www@example.com:443#keys-1",
      "type": "EcdsaSecp256r1VerificationKey2019",
      "controller": "did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www@example.com:443",
      "publicKeyHex": "04b11e73474896ad9e4b1a2d5a1190d5b25a916eb62f3d1db155bb64dc046bfb3868457a1912c8f9fcd603ff5b1078f883f6bf6b9f0dee60bad9e57e7fec9b439d"
    }
  ],
  "authentication": [
    "did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www@example.com:443#keys-1"
  ],
  "service": [
    {
      "id": "did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www@example.com:443#communication",
      "type": "messageService",
      "router": "did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www@example.com:443",
      "serviceEndpoint": "wss://example.com/endpoint"
    },
    {
      "id": "did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www@example.com:443#didservice",
      "type": "didDocumentService",
      "serviceEndpoint": ["https://example.com/endpoint","https://example.com/endpoint"]
    }
  ],
  "proof": {
    "type": "EcdsaSecp256r1Signature2019",
    "created": "2024-05-27T10:51:55Z",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www@example.com:443#keys-1",
    "proofValue": "z58DAdFfa9SkqZMVPxAQpic7ndSayn1PzZs6ZjWp1CktyGesjuTSwRdoWhAfGFCF5bppETSTojQCrfFPP2oumHKtz"
  },
  "deprecation": {
    "status": "deactivated",
    "newDid": "did:example:new123456789"
  }
}
```

以下では、allメソッドにおける各フィールドの使い方を説明します。

### 3.1 Id

例：`"did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www@example.com:443"`

- `did`：分散型識別子を表す接頭辞。
- `all`：解決・操作の規則を指定するDIDメソッド。
- `14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www`：Bitcoinアドレスに似た方法で生成する一意な識別子。
- `@example.com:443`：文書をホストするサービスのドメイン名とポートを示す任意のフィールド。保持者は自前または第三者のサービスを選べます。省略すると、ブロックチェーンに記録した第三者サービスを使います。ポートを省くと、HTTP・HTTPSの既定ポートを使います。

DIDの一意な識別子は公開鍵、すなわち`verificationMethod`の`publicKeyHex`から生成し、文書の改ざん防止を確保します。生成手順は次のとおりです。

1. **秘密鍵の生成**
   
   安全な乱数生成器で、256ビット（32バイト）の秘密鍵を生成します。

2. **公開鍵の生成**
   
   Secp256r1曲線の楕円曲線デジタル署名アルゴリズム（ECDSA）で秘密鍵を暗号化し、公開鍵を生成します。公開鍵は非圧縮形式で、接頭辞`0x04`にx・y座標が続きます。

3. **公開鍵ハッシュの計算**
   
   公開鍵に、次の2段階のハッシュ処理を行います。
   
   - SHA-256で公開鍵をハッシュします。
   
   - そのSHA-256ハッシュ値をRIPEMD-160でハッシュして、公開鍵ハッシュを得ます。

4. **ネットワーク接頭辞の追加**
   
   アドレスの種類を示す1バイトのバージョン番号（`0x00`）を、公開鍵ハッシュの前に付けます。

5. **チェックサムの計算**
   
   結果にSHA-256を2回適用し、先頭4バイトをチェックサムとします。

6. **idの生成**
   
   バージョン番号、公開鍵ハッシュ、チェックサムを連結し、Base58Checkで符号化して最終的な`id`を生成します。

### 3.2 verificationMethod

`verificationMethod`は署名の検証に使う公開鍵情報を含みます。W3C標準では複数の項目を含められますが、ここでは現時点で1つだけとし、`controller`はDID自体とします。

- `id`：公開鍵の一意な識別子。
- `type`：公開鍵の種類。ここでは`EcdsaSecp256r1VerificationKey2019`だけに対応します。
- `controller`：公開鍵を制御するDID。現時点では文書自身のDIDです。
- `publicKeyHex`：16進数で符号化した公開鍵。

### 3.3 authentication

`authentication`は、認証に使う`verificationMethod`のIDを指定します。このメソッドでは、暫定的に前述の`verificationMethod`内の`id`だけを含めます。

### 3.4 service

DID文書の`service`は、DIDの主体や関連する実体と通信する方法を表します。DID主体が公開したい任意の種類のサービスを記載でき、分散型の識別管理も含め、発見、認証、認可、対話に利用します。

現在は、2つの主要なサービスを定義します。

- **messageService**
  
  - **メッセージサービス**：他の利用者は、サービスの`serviceEndpoint`を使ってメッセージを送れます。
  
  - **serviceEndpoint**：現時点ではWSSリンクであり、他のプロトコルには対応しません。エンドツーエンド暗号化用のWSS通信の詳細は、暗号設計文書にあります。
  
  - **router**：値がDIDである独自フィールド。所属するrouter DIDを示し、多数の処理を並行するシステムで重要です。第三者のメッセージサービスへの1本のWSS接続で、複数の利用者のメッセージを受信できます。全利用者を一度に登録すると時間がかかるため、代わりにrouterを登録し、サービスがそのDIDをWSS接続へ自動的に結び付けます。

- **didDocumentService**
  
  - **任意フィールド**：文書をホストするエンドポイントを示し、複数を指定できます。
  
  - **目的**：DID検証側が文書とサービス事業者の対応を確認できるようにします。例えば、不正な方法で事業者が文書を入手していないかを検証します。

### 3.5 proof

`proof`はDID文書の署名情報を保持し、文書の完全性の検証に使います。詳しい定義：https://www.w3.org/TR/vc-data-integrity/#defn-domain

- `type`：署名の種類。ここでは`EcdsaSecp256r1Signature2019`。https://www.w3.org/TR/vc-data-model/ で定義されています。
- `created`：署名の作成時刻。ISO 8601形式のUTCタイムスタンプ。
- `proofPurpose`：署名の目的。ここでは`assertionMethod`。
- `verificationMethod`：署名検証に使う検証メソッドのID。`verificationMethod`内の`id`に対応します。
- `proofValue`：署名の値。

### 署名の生成手順

1. `proof`内の`proofValue`を除き、**DID文書の全フィールドを構築**します。
2. カンマとコロンを区切りとし、キーを並べ替えて、**文書をJSON文字列に変換**します。
3. **JSON文字列をUTF-8のバイト列に符号化**します。
4. **秘密鍵とECDSA、SHA-256で、そのバイト列に署名**します。
5. **署名値をDID文書の`proof`辞書内の`proofValue`フィールドへ追加**します。

```python
# 1. 创建DID文档的所有字段，排除proofValue字段
did_document = {
    "id": "did:example:123456789abcdefghi",
    # 其他必要的字段
    "proof": {
        "type": "EcdsaSecp256r1Signature2019",
        "created": "2024-05-27T10:51:55Z",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "did:example:123456789abcdefghi#keys-1"
        # proofValue 字段除外
    }
}

# 2. 将DID文档转换为JSON字符串，按键排序，并使用逗号和冒号作为分隔符
did_document_str = JSON.stringify(did_document, separators=(',', ':'), sort_keys=True)

# 3. 将JSON字符串编码为UTF-8字节
did_document_bytes = UTF8.encode(did_document_str)

# 4. 使用私钥和ECDSA算法对字节数据进行签名
signature = ECDSA.sign(did_document_bytes, private_key, algorithm=SHA-256)

# 5. 将签名值添加到DID文档的proof字段中
did_document["proof"]["proofValue"] = Base64.urlsafe_encode(signature)
```

### 3.6 deprecation

DIDが廃止済みかどうかを示す独自フィールドです。

このフィールドがあり、`status`が`deactivated`なら、文書は廃止済みです。`newDid`が存在する場合、それはこのDIDに対応する新しいDIDです。

## 4. DID文書の検証

文書の生成手順に基づき、次のように検証します。

1. **DIDが正しいことを確認**します。
2. **公開鍵を取り出します**。DID文書の`verificationMethod`に対応する公開鍵を取り出します。現時点では値は1つです。
3. 生成手順に従い、**DIDと公開鍵の対応を検証**します。
4. 署名の生成手順に従い、**署名の正しさを検証**します。

これにより、DID自体が正しければ、文書の完全性を検証し、改ざんされていないことを確認できます。

## 5. DIDのHTTPインターフェース

### 5.1 認証の流れ

自前のDIDサーバーを使う利用者は、リクエストを認証しないことも選べます。それ以外の場合、呼び出し側は複数のプラットフォームにAPIキーを申請する必要があります。

#### 5.1.1 HTTPリクエストのパラメーター

サービスは標準のHTTP呼び出しに対応します。

**リクエストヘッダー：**

- `Content-Type`: `application/json`
- `Authorization`：API Key認証とトークン認証に対応します。

#### 5.1.2 HTTPの利用者認証

呼び出しには、2つの認証方法があります。

1. **API Keyを渡して認証する。**
2. **認証トークンを渡して認証する。**

##### 5.1.2.1 API Keyの取得

DID事業者のAPI Keysページにログインし、生成済みの最新の利用者API Keyを取得します。キーは「利用者識別子id」と「署名鍵secret」で構成され、形式は`{id}.{secret}`です。

##### 5.1.2.2 API Keyでリクエストする

HTTPリクエストの`Authorization`ヘッダーへAPI Keyを設定します。

**例**：curlリクエスト内のAPIキーパラメーター

```bash
curl --location 'https://open.bigmodel.cn/api/paas/v4/chat/completions' \
--header 'Authorization: Bearer <你的apikey>' \
--header 'Content-Type: application/text' \
--data '{
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www@example.com:443",
  ......
}'
```

##### 5.1.2.3 JWTを組み立てたトークンでリクエストする

対応するJWTユーティリティーを読み込み、以下のようにJWTの`header`と`payload`を組み立てます。

1. **ヘッダーの例**

   ```json
   {"alg": "HS256","sign_type": "SIGN"}
   ```
   - `alg`：署名アルゴリズム。既定はHMAC SHA256（`HS256`）。
   - `sign_type`：トークンの種類。JWTでは一律に`SIGN`と表記します。

2. **ペイロードの例**

   ```json
   {"api_key": "{ApiKey.id}","exp": 1682503829130,"timestamp": 1682503820130}
   ```
   - `api_key`：利用者識別子id。API Keyの`{id}`部分です。
   - `exp`：クライアントが管理する、生成JWTの有効期限。単位はミリ秒です。
   - `timestamp`：現在時刻のミリ秒単位のタイムスタンプ。

**例**：Pythonでトークンを組み立てる処理

```python
import time
import jwt
 
def generate_token(apikey: str, exp_seconds: int):try:id, secret = apikey.split(".")except Exception as e:raise Exception("invalid apikey", e)
    payload = {"api_key": id,"exp": int(round(time.time() * 1000)) + exp_seconds * 1000,"timestamp": int(round(time.time() * 1000)),
    }
 return jwt.encode(
        payload,
        secret,
        algorithm="HS256",
        headers={"alg": "HS256", "sign_type": "SIGN"},
    )
```

3. **HTTPリクエストヘッダーへの認証トークンの設定**

生成したトークンを、HTTPリクエストの`Authorization`ヘッダーに設定します。

- `Authorization`: `Bearer <YourToken>`

**例**：curlリクエスト内のトークンパラメーター

```bash
curl --location 'https://open.bigmodel.cn/api/paas/v4/chat/completions' \
--header 'Authorization: Bearer <你的token>' \
--header 'Content-Type: application/json' \
--data '{
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www@example.com:443",
  ......
}'
```

### 5.2 DID文書の作成

- **リクエストメソッド**：POST
- **リクエストURL**： `https://example.com/v1/did`
- **リクエストヘッダー**：
  - `Content-Type`: `application/text`
- **リクエスト本文**：DID文書のJSON表現。

**リクエスト本文の例**

```json
{
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www@example.com:443",
  ......
}
```

### 5.3 DID文書の更新

- **リクエストメソッド**：PUT
- **リクエストURL**： `https://example.com/v1/did`
- **リクエストヘッダー**：
  - `Content-Type`: `application/text`
- **リクエスト本文**：更新するDID文書のJSON表現全体。

**注**：文書の特定のフィールドを更新することで、文書を廃止できます。

### 5.4 DID文書の照会

- **リクエストメソッド**：GET
- **リクエストURL**： `https://example.com/v1/did/{did}`
- **リクエストヘッダー**：
  - `Accept`: `application/text`

### 5.5 DID文書の削除

- **リクエストメソッド**：DELETE
- **リクエストURL**： `https://example.com/v1/did/{did}`
- **リクエストヘッダー**：
  - `Authorization`: `Bearer <token>`

## 6. 例外時の処理

DID文書に対応する秘密鍵は極めて重要です。漏えいすると、文書の安全性低下、文書の偽造、エンドツーエンド暗号化の安全性低下につながります。将来、複数署名などの保護を段階的に追加できるとしても、システム全体でDID更新に対応することが不可欠です。

DIDの秘密鍵が漏えいしたと分かった利用者は、サービス事業者にDIDの変更を要求できます。文書を廃止済みの状態にし、新たに申請したDIDを設定します。同時に、DIDメッセージサービスで関連する他のDIDに通知し、それぞれがDID文書を更新できるようにします。

次版では、文書の安全性を高める複数署名の仕組みを追加する予定です。

## 参考文献

[1] W3C DID（分散型識別子）仕様：[https://www.w3.org/TR/did-core/](https://www.w3.org/TR/did-core/)

[2] TLS（Transport Layer Security）1.3仕様：[https://www.rfc-editor.org/info/rfc8446](https://www.rfc-editor.org/info/rfc8446)

[3] W3C DIDs：デジタル識別標準の権限構造の再定義：[https://yurenju.blog/posts/2024-01-01_w3c-dids-redefining-identity-authority/](https://yurenju.blog/posts/2024-01-01_w3c-dids-redefining-identity-authority/)


## 著作権表示
Copyright (c) 2024 ANP Community  
このファイルは[MIT License](../../../LICENSE)の下で公開されています。自由に利用・変更できますが、この著作権表示を保持しなければなりません。
