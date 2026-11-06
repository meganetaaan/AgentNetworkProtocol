> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [chinese/deprecated/02-did-all方法规范.md](../../../chinese/deprecated/02-did-all方法规范.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# された:すべての方法設計指定

> !!!**注意:** 一時的に停止します。最新のDIDメソッドを使用してください[行なった:wba](../03-did:wba方法规范.md)。

## 背景:
DIDベースのクロスプラットフォームのアイデンティティとエンドツーエンド暗号化通信技術では、クロスプラットフォーム識別の問題に対処するため、ブロックチェーンにおける類似のアライアンスである新しいDID方法論(同盟)を提案しました。このメソッド標準をサポートするすべてのサービスプロバイダは、外部の世界にサービスを提供できます。

これにより、DID文書の生成、解像度、特別修正を含むすべての方法設計を詳述するW3C DIDコードに基づいて行われます。

この記事では、すでにW3C DIDのバックグラウンド知識を持っていると仮定し、記事や文献に利用可能な言及がない場合。

ここに提案されているAll-Methodsには、W3C規格の拡張と適応が考慮される問題があります。

## 1. DDメソッドアライアンス

DID メソッド (DDMethod) は、DID の作成、解釈、更新、およびキャンセル方法を提供する、集中された識別子 (Decentrazed Identifier, DID) の達成方法です。各 DID メソッドは、特定のブロックチェーンまたは DEC ネットワークにリンクされ、そのネットワークとのやり取りのための特定のルールを定義します。

既存の定義された DID メソッドの大部分は、ブロックチェーン設計に基づいており、ブロックチェーン技術フェーズに限定され、拡張、商品化、ランディングに非常に大きな問題があります。 Web ベースの DID アプローチは、ドメインの名前の深さに縛られ、Web サービスプロバイダが DID 関連の操作をサポートしていることを要求しています。これは、Web サービスプロバイダーにとって複雑です。

当社では、同行のブロックチェーンにリンクする新しいDID方法論(同盟)を提案しています。つまり、このメソッドの標準をサポートするすべてのサービスプロバイダは、外部の世界へのサービスを提供できます。DIDユーザーは、すべてのサービスプロバイダーの価格、レベルのサービス、評判などに応じて1つ以上のサービスを選ぶことができます。このアプローチをサポートしている全てのサービスは、ブロックチェーンの特定のメモリに独自のサービスドメイン名を記述して、すべてのすべてのサービス利用者が完全なサービスリストを提供することを保証します。

DID の作成者は、DID ドキュメントのホスティングサービスドメインで DID を指定して、 DD クエリーを通知し、特定のサーバーやユーザーが構築したサーバに DID 文書にアクセスすることができます。

最後に、Allメソッドは、既存のWebインフラストラクチャを利用するすべてのアプローチを有効にするには、httpsなどの標準的なWebプロトコルを使用して動作します。

## 2. コアデザインアイデア

すべての方法論の設計の核は、パスワード技術を使用してDIDファイルの取り外しや、Sybdenumノードによるシステム分布を保証することです。

### 2.1 DIDファイルが改ざんされていないことを確認するパスワード

ボトムテクノロジーがブロックチェーンや分散予約を使用している場合、コンセンサスメカニズム、暗号化技術、分散ストレージに基づいてDIDファイルを非溶融させることができます。アライアンスの技術的なアプローチを使用して、単一のノードは実際に中央ノードとして表示するようにします。これは、DID文書がトラストセンターを除いて改ざんされていないことを技術的に検証することは不可能です。

DID 製造仕様を設計し、公鍵の DID と DID ホルダーの公開鍵にマッチしてドキュメントを署名します。この DID ファイルが任意の中央ノードに送信される場合でも、その処理が不動であることを保証する技術的手段があります。

DID 作成、ホスティングプロセスは次の通りです。

- まず、非対称暗号化用のプライベートキーと公開鍵を生成し、secp256r1アルゴリズムを使用します。

- DID の識別子は公開鍵から生成され、生成プロセスはビットコインのアドレスの作成と一致しています。

- DID、公開鍵などの情報をもとにDID文書を作成して、秘密鍵に署名します。

- 署名情報は、最終的にはDIDファイルに配置され、トリップアートトライトサービスノードにホストされます。

他のユーザーは、DID プロセスを解釈し検証します。

- DID の解像度リクエストをトリサービスノードに起動し、DID ドキュメントをダウンロードします。

- DIDと公開鍵の通信をDID生成基準に従って有効化し、正しく対応する場合。

- パブリックキーを使用して、DID ドキュメントの署名を検証し、署名が正しい場合は、文書が改ざんされていないことを示します。

そのため、DID文書の作成と検証プロセスが完了します。


### 2.2 DIDサービスの配布保証
DID サービスは、より柔軟なアプローチをとります。まず、ブロックチェーンなどの技術拡張の現在の問題を回避するために、私たちは、最高のサービスエクスペリエンスを提供する一元化された単一ノードを持っています。第二に、ユーザーは独自の DID サービスを構築したり、3 方向 DID サービスを使用するか、複数の DID を同時に使用したり、複数のサービス間で切り替える方法のいずれか、さまざまなオプションを持っています。

### 2.3 コアプロセス
DIDの作成、解像度、更新、および解除などのすべての操作は、https ベースのアプローチに基づいて行われます。コアプロセスは次のとおりです。

![すべてのコア方法論プロセス](../../../images/did-all-core-flow.png)

1. User A は、ブロックチェーンなどの分散ストレージからのすべてのメソッドの 3 つのサービスドメインの名前を最初に読み込んだり、自己構築された DID サービスを使用する。

2. DID と DID のドキュメントを作成、それぞれ 1 つ以上選択し、HTTP リクエストを開始し、DID 文書をホストします。

3. ユーザーBは、ブロックチェーンなどの分散ストレージからのすべてのメソッドサービスドメインの名前のリストも読みます。

4. 丸か同時クエリを使用して、サービスドメインノードからDIDドキュメントを要求します。


## 3. DID ドキュメント デザイン
DID ドキュメントの現在のバージョンは、W3C フィールド全体で使用せず、DID 文書は現在 W3C ルールのサブセットです。

DID ドキュメントの例:
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

フィールドの全てのアプローチの使用は、以下に強調されます。

### 3.1 id
例:「did:all: 14qQsnEPZy2wcpRuLy2xeR737ptkE2Wwww@example.com:443」

- 行なわれた: DID 接頭辞、 まともな識別子 ( 度重度の識別子) を示す;

- 全部: 指定された DID の解釈と操作のコードを持つ、 ド メソッドです。

- 14qQsnEPZy2wcpRuLy2xeR737ptkE2Wwww: ビットコインのようなアドレスによって生成される唯一の識別子です。

- @example.com:443: このDIDのドキュメントホスティングサービスを提供するドメイン名とポートであるオプションフィールド。 DIDホルダーは、セルフビルドまたはフリーダイヤルサービスで文書をホストするか、このフィールドに記入しないか、ブロックチェーンで記録されたトリアングレーションの使用を示すことができます。 ポートオプションは、デフォルトポートhttpとhttpsポートを使用して利用できます。

公開鍵(つまり、文明法の公開鍵)に基づいて行われた唯一の識別子は、文書が改ざんされていないことを保証します。

1. プライベートキーを生成

256ビット(32バイト)の秘密鍵は、安全なランダム番号ジェネレーターで生成されます。

2. 公開鍵を生成

楕円曲線のデジタル署名アルゴリズム(ECDCSA)とsecp256r1カーブを使用して秘密鍵を暗号化し、公開鍵を作成します。パブリックキーは非圧縮形式(0x04にプレフィックスし、Xとy座標)です。

3. パブリックキーハッシュの計算

公開鍵の計算で次の2つのステップを実行します。

   - SHA-256アルゴリズムを使用して、SH-256 の公鍵に利用し、SHA-256 hashi値を生成します。

   - SHA-256ハッシュ用のRIPEMD-160アルゴリズムで公開鍵ハッシュを生成するHASH。

4. ネットワークプレフィックスの追加

バイトのバージョン番号をパブリックキーに追加します。 0x00 を使用します。

5. チェックサムを計算する

結果は、チェックサムとして使用される最初の4バイトでSHA-256の橋という次の2つのステップで計算されます。

6. _その他組織

+Hush キー+ 選択して接続し、Base58Check コードを使用して最終的な ID を生成します。

### 3.2 検証方法
serviceMethod には、W3C に複数の署名を検証するための公開鍵情報が含まれています。現在 1 つだけあり、コントローラフィールド自体も持っています。

- id: 公開鍵のユニークな識別子。

- type: EcdsaSecp256r1VerificationKey2019 で使われている公開鍵型。このアプローチは時間内にサポートされます。

- 管理者:この公開鍵のDIDを制御し、現在 DID文書の発行完了を行います。

- PublicKeyHex: 公開鍵のヘキサデシマルコード。

### 3.3認証
つまり、認証方法の使い方はidであり、上記の技術メソッドフィールドのみが、当社の方法論に暫定的に満たされていることを意味します。

### 3.4 サービス
サービスは、DIDが管理サービスを含む、より詳細な検出、認証、承認または相互作用を促進したいサービスの任意のタイプであることができます。

コアサービス定義には2つのコアがあります。

- メッセージサービス

  - 別のユーザーがユーザーと通信したい場合、サービスエンドポイントを使用してメッセージを送信できるメッセージサービスです。

  - ServiceEndpoint は、現在、他のプロトコルをサポートしていない WSS リンクです。WSS プロトコルの設計では、設計文書のエンドツーエンド暗号化の詳細を説明します。

  - ルーターは、DIDであるカスタムフィールド、その値です。このフィールドは、ハイ・シンメトリーシステムにとって重要なのがDIDに属するルータDIDです。システムがWSS接続を開始したときに、この接続上の複数のユーザーを同時に受けることができ、すべてのユーザーが一度登録された場合、これは超過時間につながる可能性があります。これにより、情報サービスは自動的にDDとWSSをリンクするルータの登録を意味します。

- ドキュメントサービス

  - この DID ドキュメントがホスティングされているサービスエンドポイントを表すオプションフィールドは、複数の方法で使用できます。

  - DID認証のロールは、DID 文書と DID サービスプロバイダが不正な DID ファイルを取得しているかどうかを違法手段でテストすることで、DID のドキュメントと DID サービスプロバイダーのマッチかどうかを確認することです。

### 3.5 証拠
証拠は、DID文書の完全性検証を実行するために、DID文書の署名情報を保存します。https://www.w3.org/TR/vc-data-integrity/#defn-domain

- タイプ: 署名タイプ、ここにEcdsaSecp256r1Signature2019です。 ドキュメントで定義します https://www.w3.org/TR/vc-data-model/ 媒体。

- 作成:署名が作成されました。ISO 8601形式のUTC時間文字列です。

- 証拠購入:署名の目的は、ここで「assertionMethod」と指定します。

- VerificationMethod: 署名の認証 ID は、Vesal Method フィールドで ID に対応する。

- 証拠価値: 署名値。

署名する価値の生成プロセス:

- 証拠の校正フィールドを除き、DID 文書のすべてのフィールドを構成します。

- DID ドキュメントを JSON 文字列に変換し、コンマとコロンを分離器として使用し、キーでソートします。

- JSON 文字列を UTF-8 バイトにエンコードします。

- EcdsaSecp256r1Signature2019 および SHA-256HY アルゴリズムを使用して、バイトデータが署名されます。

- DD ドキュメント辞書の ProofValue フィールドに、結果的に示す値を追加します。
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

### 3.6非推奨
DIDが放棄されたかどうかを示すカスタムフィールドです。
DID ドキュメントが存在し、ステータス値が無効化されている場合は、DID 文書が放棄されることを意味します。 newDid が存在している場合、新しい DID は DID に対応します。

## 4. DID ドキュメントの検証
DID ドキュメント生成プロセスによると、DID 文書の検証プロセスは次の通りです。

1. DIDの正しい状態を確認します。

2. 公開鍵を抽出: 検証メソッドフィールドに一致する DID ドキュメントから公開鍵を抽出します。現在 1 つの値のみが存在しています。

3. DD生成プロセスに応じてDIDと公開鍵のマッチングを検証します。

4. 生成プロセスに基づいて署名の妥当性を検証します。
そのため、DIDが正しい限り、DID文書が完成して変更されたかどうかを確認することができます。

## 5. DID http インターフェイス

### 5.1 品質保証のプロセス
ユーザーが自己構築した DID サーバーを使用している場合は、委任の権利を要求しないかを選択できます。そうしないと、呼び出し側は複数のプラットフォームから API キーを適用する必要があります。

#### 5.1.1 HTTPリクエストパラメータ
サービスは標準的なHTTPコールをサポートしています。
リクエストヘッダ

- コンテンツタイプ: application/json

- 認可: API キーとトークンの両方をサポート

#### 5.1.2 HTTP ユーザアクセス
インターフェイスを呼び出すと2種類の保証がサポートされています。

1. 認証用のAPIキーをパス

2. 認定の権利

##### 5.1.2.1 アクセスAPIキー
DIID サーバー API キーの最新バージョンの API キーのページにログインします。 APIキーは、{id} の形式に「ユーザー ID id」と「シークレットキー」の両方を格納します。 {secret}.

##### 5.1.2.2 APIキーのリクエスト
ユーザーは、オートレーションヘッダの HTTP のヘッダーに API キーを配置する必要があります。
例:curl リクエストの API キーパラメーターの例
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

##### 5.1.3.3 JWTアセンブリトークンの使用後のリクエスト
ユーザーは、対応するJWT関連ツールバーを導入し、ヘッダを組み立て、JWTのペイロードセクションを以下のように設定する必要があります。

1. **事例:**

   ```json
   {"alg": "HS256","sign_type": "SIGN"}
   ```
   - **エルゴ**: プロパティは、シグネチャ、デフォルトHMAC SHA256(HS256として書き込む)に使用されるアルゴリズムです。
   - **サインイン_型 号**: プロパティはトークンの種類を表し、JWTトークンはSIGNとして書かれています。

2. **ペイロード例**

   ```json
   {"api_key": "{ApiKey.id}","exp": 1682503829130,"timestamp": 1682503820130}
   ```
   - **api(アピ)_キーワード**: プロパティは、ユーザ API キーの {id} の一部をユーザー ID 、つまりユーザ ID を表します。
   - **エクスクルーシブ**: 生成されたJWTが終了した時、クライアントはミリ秒単位で制御するプロパティを表します。
   - **タイムスタンプ**: プロパティはミリ秒単位で現在の時刻のスタンプを表します。

**事例紹介**: Python言語のSecularトークンアセンブリ

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

3. **HTTPでリクエストされたヘッダにトークンを配置する**
ユーザーは、HTTP 組織ヘッダのヘッダーに生成された権利トークンを配置する必要があります。
- 認可:ベアラー <你的token>
例:curl リクエストのトークンパラメータの例
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
- 方法: 要求のポスト
- リクエスト URL:https://example.com/v1/did
- 要求ヘッダー:
  - コンテンツタイプ: アプリケーション/テキスト
- リクエスト: JSON は DID ドキュメントを含むことを示します。
リクエスト例
```json
{
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www@example.com:443",
  ......
}
```

### 5.3 DID文書の更新
- 方法: リクエスト
- リクエスト URL:https://example.com/v1/did
- 要求ヘッダー:
  - コンテンツタイプ: アプリケーション/テキスト
- リクエスト: JSON は、完全な DID ドキュメントを更新する必要があることを示します。
備考: DID文書の特定のフィールドを更新し、DID文書を破棄

### 5.4 DID ドキュメントのクエリ
- 方法: GET
- リクエスト URL:https://example.com/v1/did/{did}
- 要求ヘッダー:
  - 受け入れ: アプリケーション/テキスト
### 5.5 DID ドキュメントの削除
- リクエスト方法: DELETE
- リクエスト URL:https://example.com/v1/did/{did}
- 要求ヘッダー:
  - 認可:ベアラー <token>

## 6. 異常なプロセス
DID ドキュメントが対応する秘密鍵は重要な重要性であり、プライベートキーが漏れた場合、DID ファイルのセキュリティや DID 文書の改ざん、エンドツーエンド暗号化のセキュリティの低下などの深刻な問題につながることができます。また、複数の署名のような保護メカニズムをゆっくりと追加することができますが、システム全体が DID 更新をサポートすることが重要です。

ユーザーがプライベートキーで漏れを見つけた場合、DID文書の状態の変更を要求して、新しいアプリケーションを設定することができます。

同時に、次のバージョンでは、DIDファイルをより安全にする複数のシグネチャメカニズムを追加予定です。

## リファレンス
[1] W3C DID (集中された識別子)の規則、[https://www.w3.org/TR/did-core/](https://www.w3.org/TR/did-core/)

[2] TLS(トランスポート層セキュリティ)1.3は標準であり、それだけでできるのは1人だけです。[https://www.rfc-editor.org/info/rfc8446](https://www.rfc-editor.org/info/rfc8446)

[3] W3C DID: パワー構造を解体するためのデジタルアイデンティティ基準[https://yurenju.blog/posts/2024-01-01_w3c-dids-redefining-identity-authority/](https://yurenju.blog/posts/2024-01-01_w3c-dids-redefining-identity-authority/)

## 公益社団法人 一般社団法人 日本版著作権協会
社会貢献活動の推進に関する基本方針 _ ANPコミュニティ
この文書の基礎 [MITライセンス](../../../chinese/deprecated/LICENSE) 公開、あなたは自由にこの著作権宣言を使用および変更することができます。  
