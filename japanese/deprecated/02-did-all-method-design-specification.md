> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [deprecated/02-did-all-method-design-specification.md](../../deprecated/02-did-all-method-design-specification.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# された:すべての方法設計指定

> !!!**注意:** 仕様はサポートしておりません。 最新DID方式をご利用下さい。 [行なった:wba](../03-did:wba%20Method%20Design%20Specification.md).

## 背景:
DID規格に基づくクロスプラットフォームのアイデンティティ認証とエンドツーエンド暗号化通信技術に関する記事では、クロスプラットフォームのアイデンティティ認証問題を解決するため、コンソーシアムブロックチェーンに似た新しいDIDメソッドをご提案します。 つまり、このメソッドの標準をサポートするすべてのサービスプロバイダは、外部にDID関連サービスを提供することができるということです。

このドキュメントは、W3C DID 仕様に基づいて、DID 生成、解像度、および DID 文書への特別な変更を含むすべてのメソッドの設計の詳細を記述します。

このドキュメントでは、W3C DID に関する背景知識に既に精通していると仮定しています。 いない場合は、関連記事を読んで、このドキュメントの参照を参照することができます。

ここに提案した全ての方法は、W3C規格の拡張と修正をすることで、解決に向けた課題に適応させます。

## 1. DID メソッド全(アライアンス)

DID メソッドは、分散型識別子(DID)を実装し、DID の作成、解決、更新、およびリムークする方法を指定します。 各 DID メソッドは、特定のブロックチェーンや分散型ネットワークに関連付けられており、そのネットワークと相互作用するための特定のルールを定義します。

既存のDIDメソッドは、ブロックチェーン技術が現段階でスケーラビリティと商用化の重要な課題をベースとしています。 Web ベースの DID メソッドは、ドメイン名に深く結び付けられ、Web サービスプロバイダが DID 関連の操作をサポートし、ウェブサービスプロバイダーに複雑性を付加する必要が深まっています。

コンソーシアムブロックチェーンと同様に、すべての(アライアンス)と呼ばれる新しいDIDメソッドをご提案します。 つまり、このメソッドの標準をサポートするすべてのサービスプロバイダは、外部にDID関連サービスを提供することができるということです。 DID ユーザーは、価格、サービスレベル、評判などに基づいて 1 つ以上のサービスプロバイダを選ぶことができます。 このメソッドをサポートするすべてのサービスプロバイダは、サービスドメイン名をブロックチェーン上の特定のメモリに書き込むことで、全てのユーザーがサービスプロバイダーの完全なリストを取得できるようにします。

また、DID の作成者は DID ドキュメントのホスティングサービスのドメイン名を指定できます。DID の解決者に対して、特定のサービスプロバイダから DID 文書を取得するか、ユーザ自身が設定したサーバーを 取得することを示します。

最後に、すべてのメソッドの操作はHTTPSなどの標準的なWebプロトコルを使用しており、既存のWebインフラストラクチャーを有効活用できます。

## 2. あらゆる方法のコアデザイン哲学

すべてのメソッドのコア設計は、DID 文書の不全性を確保するために暗号技術を使用し、システムの配布を確実にするためにアライアンスノードを使用することです。

### 2.1 暗号化を使用して、DID文書の誤認性を確保

基礎技術がブロックチェーンや分散型レジャー技術を使用している場合、DID文書の不変性は、コンセンサス機構、暗号化技術、および分散ストレージにより保証することができます。 中央ノードとして単一のノードが見える「同盟」技術アプローチを採用しています。 中央ノードを信頼する以外では、DID ドキュメントが改ざんされていないことを確認することは技術的に不可能です。

DID の生成仕様を設計し、DID が DID ホルダーの公開鍵と 1 つ対 1 に対応するため、パブリックキーを使用して文書に署名します。 このように、DID ドキュメントが一元化されたノードに送信される場合でも、文書の不変性を確実にするために技術的な手段があります。

### DID作成とホスティングプロセス:

- まず、非対称暗号化プライベートキーと公開鍵を生成し、現在 secp256r1 アルゴリズムを使用します。
- ビットコインのアドレス生成プロセスと同様に、パブリックキーに基づいてDIDに固有の識別子を生成します。
- ユーザーは、DID、公開鍵、その他の情報に基づいてDID文書を作成して、秘密鍵を使用して署名します。
- 最後に、署名情報は DID ドキュメントに保存され、サードパーティのサービスノードがホストされます。

### 他のユーザーのためのDIDの決断および確認プロセス:

- DID の解像度要求をサードパーティのサービスノードに送信し、DID ドキュメントをダウンロードします。
- DIDと公開鍵の通信をDID生成仕様に従って確認します。 一つ対1対応の場合、公開鍵が正しい。
- パブリックキーを使用して、DID ドキュメントの署名を検証します。 署名が正しい場合は、文書は改ざんされていない。

そのため、DID文書の作成と検証プロセスが完了します。

### 2.2 DIDサービスの分散保証

DID サービスの全ての方法は、より柔軟なアプローチを採用しています。 まず、ブロックチェーンのような現在の技術のスケーラビリティの問題を回避するために、各ノードは、最高のサービス体験を提供することを集中化しています。 次に、ユーザーは複数のオプションがあります。つまり、独自のDIDサービスを設定したり、サードパーティのDIDサービスを使用して、複数のDIDサービスを同時に使用したり、それらの間で切り替えたりすることができます。

### 2.3 コアプロセス

すべてのメソッドでDIDを作成、解決、更新、および再実行するすべての操作はHTTPSを使用します。 コアプロセスは以下の通りです。

![方法のコアフロー](../../images/did-all-core-flow.png)

1. User A は、最初に、ブロックチェーンなどの分散ストレージから全てのメソッドのサードパーティサービスドメイン名のリストを読み込み、または自己構築された DID サービスを使用します。
2. DID と DID ドキュメントを作成し、複数のノードを選択し、DID 文書をホストする HTTP リクエストを開始します。
3. ユーザーBは、ブロックチェーンのような分散ストレージからのすべてのメソッドサービスドメインの名前のリストも読みます。
4. ポーリングまたは同時クエリを使用して、サービスドメインノードからDIDドキュメントを照会します。

## 3. DID ドキュメント デザイン

DID ドキュメントの現在のバージョンは、W3C で定義されているすべてのフィールドを使用していません。 DID ドキュメントは、現在 W3C 仕様のサブセットです。

### DID 文書の例:

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

以下は、全ての方法の各フィールドの使用に関する焦点を当てたものです。

### 3.1 id

事例: `"did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www@example.com:443"`

- `did`: 分散型識別子を示す DID 接頭辞。
- `all`: DID メソッドは、DID の解決と操作に関するルールを指定します。
- `14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www`: ビットコインアドレスに類似した独自の識別子。
- `@example.com:443`: DID ドキュメントをホスティングするサービスのドメイン名とポートを示すオプションのフィールド。 DID ホルダーは、サービスをセルフホストするか、サードパーティのサービスを使用するか、ブロックチェーン上で記録された第三者サービスを使用するためにこのフィールドを省略することができます。 ポートが提供されていない場合、デフォルトのHTTPとHTTPSポートが使用されます。

DID の固有の識別子は、公開鍵(つまり、 `publicKeyHex` でん `verificationMethod`)、文書の不全を保障します。 生成プロセスは次の通りです。

1. **プライベートキーを生成**
   
安全なランダム番号ジェネレータを使用して、256ビット(32バイト)のプライベートキーを生成します。

2. **公開鍵を生成**
   
秘密鍵を暗号化するために、Secp256r1曲線で楕円曲線のデジタル署名アルゴリズム(ECDSA)を使用して、公開鍵を生成します。 公開鍵は非圧縮形式(プレフィックス) `0x04`, 続いて x と y 座標).

3. **計算の公共キーハッシュ**
   
公開鍵の2つのハッシュ操作を実行します。
   
   - SHA-256 を使って公開鍵をハッシュして、SHA-256 ハッシュ値を生成する。
   
   - SHA-256ハッシュ値をRIPEMD-160でハッシュして、公開鍵ハッシュを生成します。

4. **ネットワークプレフィックスの追加**
   
1バイトのバージョン番号を追加します。`0x00`) 公開鍵のハッシュの前に、アドレスタイプを示す。

5. **計算チェックサム**
   
結果に次の2つのSHA-256ハッシュ操作を実行し、チェックサムとして最初の4バイトをとります。

6. **id を生成します。**
   
バージョン番号、公開鍵ハッシュ、チェックサムの連結、Base58Checkエンコーディングを使用して最終生成を行います。 `id`.

### 3.2 検証方法

とりあえず `verificationMethod` 署名を検証するために使用される公開鍵情報が含まれています。 W3C規格では、このフィールドには複数のエントリが含まれている場合がありますが、現在では1つしかなく、 `controller` フィールドは DID そのものです。

- `id`: 公開鍵のユニークな識別子。
- `type`: 公開鍵の種類はこちら `EcdsaSecp256r1VerificationKey2019`. . . 現在、このメソッドのみがサポートされています。
- `controller`: この公開鍵をコントロールするDID、現在 DID ドキュメント自体。
- `publicKeyHex`: 六角形の公開鍵。

### 3.3認証

とりあえず `authentication` フィールドは、 `verificationMethod` 認証に用いられるID 方法としては、一時的には含まれません。 `id` から `verificationMethod` 上記項目に記入した項目

### 3.4 サービス

とりあえず `service` DID 文書のフィールドは、DID の主題または関連するエンティティティと通信する方法を表現するために使われます。 サービスは、分散型アイデンティティ管理サービスを含むDIDの主題を促進し、さらなる発見、認証、承認、または相互作用のために、任意のタイプすることができます。

現在、コアサービス定義は2つあります。

- **メッセージサービス**
  
  - **メッセージサービス**: 別のユーザーがこのユーザーと通信したい場合、メッセージは、 `serviceEndpoint` サービスの内。
  
  - **サービスエンドポイント**: 現在、WSSリンクで他のプロトコルをサポートしていません。 エンドツーエンド暗号化用のWSS通信プロトコルの詳細な設計は、暗号化設計文書にあります。
  
  - **ルーター**: DID の値がカスタムフィールドです。 DIDが属するルータDIDを示すため、高通貨システムにとってこのフィールドは重要です。 第三者のメッセージサービスにWSS接続を開始すると、この接続で複数のユーザーに対して同時にメッセージを送受信できます。 一度にすべてのユーザーの登録は、長期処理につながる可能性があります。 代わりに、ルーターを登録すると、メッセージサービスはWSS接続でルータのDIDを自動的に関連付けることができます。

- **ドキュメントサービス**
  
  - **任意分野**: このDID文書がホストされているサービスエンドポイントを指示し、複数のエントリを許可します。
  
  - **目的:**: DID の検証機能が、DID のドキュメントが DID サービスプロバイダに一致するかどうかを確認することを可能にします。DID サービスプロバイダーが不正な手段で DID 文書を取得しているか確認することができます。

### 3.5 証拠

とりあえず `proof` フィールドは、DID文書の完全性を検証するために使用されるDID文書の署名情報を格納します。

- `type`: 署名の種類、ここの使い方 `EcdsaSecp256r1Signature2019`.
- `created`: 署名の作成時間、ISO 8601 は UTC タイムスタンプを書式化しました。
- `proofPurpose`: 署名の目的は、ここに示します `assertionMethod`.
- `verificationMethod`: 署名を検証するために使用される認証方法 ID は、これに対応する `id` で、 `verificationMethod` フィールド。
- `proofValue`: 署名値。

### 署名された生成プロセス:

1. **DID 文書のすべてのフィールドを構成します。**, 除外する `proofValue` フィールド `proof`.
2. **DID ドキュメントを JSON 文字列に変換** commasとコロンを区切りに、キーをソートします。
3. **JSON 文字列を UTF-8 バイトにエンコードする**.
4. **SHA-256ハッシュアルゴリズムでプライベートキーとECDSAを使用してバイトデータを署名する**.
5. **署名値を付加する `proofValue` フィールドの `proof` DID ドキュメントの辞書**.

```python
# 1. Create all fields of the DID document, excluding the proofValue field
did_document = {
    "id": "did:example:123456789abcdefghi",
    # Other necessary fields
    "proof": {
        "type": "EcdsaSecp256r1Signature2019",
        "created": "2024-05-27T10:51:55Z",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "did:example:123456789abcdefghi#keys-1"
        # Exclude proofValue field
    }
}

# 2. Convert the DID document to a JSON string, sorted by keys, using commas and colons as separators
did_document_str = JSON.stringify(did_document, separators=(',', ':'), sort_keys=True)

# 3. Encode the JSON string into UTF-8 bytes
did_document_bytes = UTF8.encode(did_document_str)

# 4. Sign the byte data using the private key and ECDSA with SHA-256
signature = ECDSA.sign(did_document_bytes, private_key, algorithm=SHA-256)

# 5. Add the signature value to the proofValue field in the proof dictionary of the DID document
did_document["proof"]["proofValue"] = Base64.urlsafe_encode(signature)
```

### 3.6非推奨

DIDが非推奨であったかどうかを示すために使用されるカスタムフィールドです。

DID ドキュメントがこのフィールドと `status` 値が `deactivated`つまり、このDID文書が非推奨であることを示しています。 場合 `newDid` 存在して、このDIDに対応した新しいDIDです。

## 4. DID ドキュメント検証

DID ドキュメント生成プロセスに基づいて、DID 文書検証プロセスは次のようになります。

1. **DIDの正しい状態を確認します**.
2. **公開鍵を抽出する**: マッチする公開鍵を抽出 `verificationMethod` DID ドキュメントからフィールドを生成します。 現在、ひとつの価値観しかありません。
3. **DIDと公開鍵の対応を検証** DID生成プロセスに従って。
4. **署名の正しいさを検証する** 代表的な生成プロセスに基づく。

そのため、DIDが正しい限り、DID文書の完全性は改ざんされていないことを確認することができます。

## 5. DID HTTP インターフェイス

### 5.1認証プロセス

ユーザーが独自の DID サーバーを使用している場合、リクエストを認証しないと選択できます。 それ以外の場合は、複数のプラットフォームから API キーを適用する呼び出し側が必要です。

#### 5.1.1 HTTPリクエストパラメータ

サービスは、標準的なHTTPコールをサポートしています。

**リクエストヘッダー:**

- `Content-Type`: `application/json`
- `Authorization`: APIキーとトークン認証方法をサポート。

#### 5.1.2 HTTP ユーザ認証

インターフェイスを呼び出すと、2つの認証方法がサポートされています。

1. **認証用のAPIキーをパス**
2. **認証トークンを認証に渡す**

##### 5.1.2.1 APIキーの取得

DID サービスプロバイダの API キーページにログインして、最新の生成されたユーザー API キーを取得します。 APIキーには、"user ID" と "signature Key Secret" の両方が含まれているため、次のように書式化されます。 `{id}.{secret}`.

##### 5.1.2.2 APIキーを使用してリクエストを要求する

ユーザーは、APIキーを API キーに置く必要があります。 `Authorization` HTTPリクエストのヘッダ。

**事例紹介**: カールリクエストの API キーパラメーターの例

```bash
curl --location 'https://open.bigmodel.cn/api/paas/v4/chat/completions' \
--header 'Authorization: Bearer <YourAPIKey>' \
--header 'Content-Type: application/text' \
--data '{
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www@example.com:443",
  ......
}'
```

##### 5.1.2.3 JWT組み立てトークンを使用して要求を作る

ユーザ側は、対応するJWT関連のユーティリティクラスを組み込んでJWTの実装が必要 `header` とりあえず `payload` 部品は以下です。

1. **ヘッダー例**

   ```json
   {"alg": "HS256","sign_type": "SIGN"}
   ```
   - `alg`: 署名に使用するアルゴリズムを示し、HMAC SHA256にデフォルトで設定します()`HS256`).
   - `sign_type`: トークンの種類を、JWTトークンと均一に書き込まれたトークンを指す `SIGN`.

2. **ペイロード例**

   ```json
   {"api_key": "{ApiKey.id}","exp": 1682503829130,"timestamp": 1682503820130}
   ```
   - `api_key`: ユーザ識別子 ID を、これは `{id}` ユーザーの API キーの一部。
   - `exp`: 生成されたJWTの有効期限をクライアントが管理するミリ秒単位で示します。
   - `timestamp`: ミリ秒単位で現在のタイムスタンプをインディケートします。

**事例紹介**: Python のトークンアセンブリプロセス

```python
import time
import jwt

def generate_token(apikey: str, exp_seconds: int):
    try:
        id, secret = apikey.split(".")
    except Exception as e:
        raise Exception("invalid apikey", e)
    payload = {
        "api_key": id,
        "exp": int(round(time.time() * 1000)) + exp_seconds * 1000,
        "timestamp": int(round(time.time() * 1000)),
    }
    return jwt.encode(
        payload,
        secret,
        algorithm="HS256",
        headers={"alg": "HS256", "sign_type": "SIGN"},
    )
```

3. **HTTP リクエストヘッダに認証トークンを配置する**

生成された認証トークンを、生成した認証トークンを、 `Authorization` HTTPリクエストのヘッダ:

- `Authorization`: `Bearer <YourToken>`

**事例紹介**: カルルリクエストのトークンパラメータの例

```bash
curl --location 'https://open.bigmodel.cn/api/paas/v4/chat/completions' \
--header 'Authorization: Bearer <YourToken>' \
--header 'Content-Type: application/json' \
--data '{
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www@example.com:443",
  ......
}'
```

### 5.2 DID文書の作成

- **リクエスト方法**: ポスト
- **リクエスト URL**: `https://example.com/v1/did`
- **リクエストヘッダー**:
  - `Content-Type`: `application/text`
- **リクエストボディ**: DID 文書の JSON 表現を含む

**リクエストボディ例**

```json
{
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www@example.com:443",
  ......
}
```

### 5.3 DID文書の更新

- **リクエスト方法**: プット
- **リクエスト URL**: `https://example.com/v1/did`
- **リクエストヘッダー**:
  - `Content-Type`: `application/text`
- **リクエストボディ**: DID 文書の完全な JSON 表現が更新されるように構成します

**注意:**: DID ドキュメントの特定フィールドを更新し、DID 文書は非推奨化できます。

### 5.4 DID文書のクエリ

- **リクエスト方法**: GET
- **リクエスト URL**: `https://example.com/v1/did/{did}`
- **リクエストヘッダー**:
  - `Accept`: `application/text`

### 5.5 DID ドキュメントの削除

- **リクエスト方法**: ドレス
- **リクエスト URL**: `https://example.com/v1/did/{did}`
- **リクエストヘッダー**:
  - `Authorization`: `Bearer <token>`

## 6. 例外的なプロセス

DID 文書に対応した秘密鍵は重要である。 プライベートキーが侵害されると、DID 文書のセキュリティ、DID 文書の偽造、エンドツーエンド暗号化のセキュリティを削減することができます。 今後マルチサインなどの保護機構を徐々に追加できるのですが、システム全体でDIDの更新をサポートしているのは重要なことです。

ユーザーが DID プライベート キーが侵害されたことを検出した場合、DID サービスプロバイダにリクエストを送信して、DID ドキュメントのステータスを変更し、新しく適用された DID を設定することで DID を変更することができます。 DID のメッセージサービスを通じて、DID に関連付けられている他の DID を通知して、DID 文書を更新します。

また、次のバージョンでは、DID文書のセキュリティを強化するためにマルチ署名メカニズムを追加予定です。

## リファレンス

[1] W3C DID (分散型識別子)の指定、 [https://www.w3.org/TR/did-core/](https://www.w3.org/TR/did-core/)

[2] TLS (輸送層の保証) 1.3 の指定、 [https://www.rfc-editor.org/info/rfc8446](https://www.rfc-editor.org/info/rfc8446)

[3] W3C のディド: デジタル・アイデンティティの標準の権限の構造を再定義する、 [https://yurenju.blog/posts/2024-01-01_w3c-dids-redefining-identity-authority/](https://yurenju.blog/posts/2024-01-01_w3c-dids-redefining-identity-authority/)


## コンテンツの著作権について
社会貢献活動の推進に関する基本方針 _ ANPコミュニティ
このファイルは、以下のとおりです。 [MITライセンス](../../deprecated/LICENSE). . . 無料で利用して変更することができますが、この著作権表示を保ちなければなりません。
