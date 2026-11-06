> 日本語参考訳（手動翻訳）。原文の歴史的な説明を訳したもので、現行仕様を表すものではありません。規範となるのは原文です。
> 原文: [deprecated/05-message-service-protocol-based-on-did.md](../../deprecated/05-message-service-protocol-based-on-did.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# did:allメソッドに基づくメッセージサービスプロトコル

## 1. 背景

DIDに基づく、プラットフォームをまたぐ本人認証とエンドツーエンド暗号化通信の技術についての記事で、DIDを使って本人認証とエンドツーエンド暗号化通信を行う方法を紹介しました。短期鍵を交渉して暗号化通信を行う際、2人のDID利用者は、互いを見つけ、ハンドシェイクメッセージや暗号化メッセージを送り合える必要があります。本稿では、DID利用者が互いを発見し、メッセージを送る方法を説明します。

## 1. 処理の流れとアーキテクチャ

全体の構造を次の図に示します。

![DIDに基づくメッセージ通信のアーキテクチャ](/images/message-flow-architecture.png)

上の図は、DIDに基づくメッセージ通信の全体構造を示しています。主に次の3者が登場します。

- User Server：利用者のバックエンドサービス。利用者のDID文書を管理し、メッセージの送受信を支援します。
- DID Server：DID文書のホスティングサービス。DIDの作成、照会などのサービスを担当します。
- Message Proxy：メッセージプロキシ。利用者にメッセージ送受信サービスを提供します。

DID allメソッドの設計仕様で述べたように、DIDのホスティングサービス（DID Server）とメッセージサービス（Message Proxy）の利用は任意であり、自前のサービスを使うこともできます。ただし、処理の流れは基本的に同じです。

## 2. User ServerとMessage Proxyの接続

User Serverは、利用するメッセージサービス事業者を選べます。選択後、事業者のWebサイトでAPIキーとサービスエンドポイントを申請します。APIキーはUser ServerとMessage Proxyとの接続認証に使います。サービスエンドポイントはDID文書に記載でき、このDIDがそのエンドポイントのメッセージサービスを使うことを示します。

メッセージサービスでは、一般的にWSSの長時間接続を使います。そのためUser ServerがMessage Proxyへ能動的に接続し、ハートビートを維持する必要があります。

User ServerはMessage Proxyへの接続後、この接続のルーティング情報（DID文書内のrouter。これ自体もDID）と関連する署名を提示して、その経路の所有権を示す必要があります。routerは、この接続が扱うルーティング情報をMessage Proxyに伝えるためのものです。Proxyは、ルーティング情報、WSS接続、DIDを関連付けます。それ以降、このDID宛てのすべてのメッセージは、このWSS接続を通じてServerへ送られます。この設計の利点は、ServerがProxyに接続した後、全DIDをProxyへ送信せず、少数のrouterを登録するだけでよいことです。大量のDIDを扱う場合に特に役立ちます。

1つのルーティング情報を複数のWSS接続に関連付けることもでき、送信時の負荷分散はProxyが行います。

routerの登録、関連付け、DIDに基づくメッセージ送信の流れは次のとおりです。

![router登録、関連付け、DIDに基づくメッセージ送信の流れ](/images/message-did-register-flow.png)

## 3. Message Proxyの認証方式

Message ProxyはAPIキーでUser Serverを認証します。全体の処理は、User ServerがDID Serverへ接続するときの認証処理（DID allメソッド設計仕様）と似ています。

### 3.1 WSS HTTPリクエストのパラメーター

リクエストヘッダー：
- Content-Type: application/json
- Authorization：API Key認証とトークン認証の両方に対応します。

### 3.2 WSS HTTPの利用者認証

インターフェースの呼び出しでは、次の2つの認証方法に対応します。
1. API Keyによる認証
2. 認証トークンによる認証

#### 3.2.1 API Keyの取得

サービス事業者のAPI Keysページにログインし、最新の利用者API Keyを取得します。API Keyは「利用者識別子id」と「署名鍵secret」で構成され、形式は{id}.{secret}です。

#### 3.2.2 API Keyを使うリクエスト

利用者は、HTTPのAuthorizationヘッダーにAPI Keyを設定する必要があります。

#### 3.2.3 JWTを組み立てたトークンによるリクエスト

利用者は、対応するJWT関連のユーティリティークラスを読み込み、以下のようにJWTのヘッダーとペイロードを組み立てる必要があります。

1. ヘッダーの例

```json
{
  "alg": "HS256",
  "sign_type": "SIGN"
}
```
- alg：署名に使うアルゴリズムを示します。既定はHMAC SHA256（HS256と表記）です。
- sign_type：トークンの種類を示します。JWTトークンでは一律にSIGNと記載します。

2. ペイロードの例

```json
{
  "api_key": "{ApiKey.id}",
  "exp": 1682503829130,
  "timestamp": 1682503820130
}
```
- api_key：利用者識別子idを示します。利用者のAPI Keyの{id}部分です。
- exp：生成するJWTの有効期限です。クライアントが制御し、単位はミリ秒です。
- timestamp：現在のタイムスタンプをミリ秒単位で示します。

例：Pythonで認証トークンを組み立てる処理

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

3. HTTPリクエストヘッダーへの認証トークンの設定
利用者は、生成した認証トークンをHTTPのAuthorizationヘッダーに設定する必要があります。
  - Authorization: Bearer <your_token>

## 4. Message Proxy同士の接続

特に、異なるプラットフォームが異なるサービスを利用する場合、サービスのProxy同士も接続する必要があります。サービス同士はWSSで接続でき、接続後に各サービスのエンドポイントを互いに通知して、ルーティングを容易にします。

## 5. メッセージの送受信処理

本節では、利用者Aが利用者BのDIDを使って、Bへメッセージを正しく送る方法を説明します。
全体の流れを次の図に示します。

![メッセージ送受信の流れ](/images/message-send-receive-flow.png)

処理の説明：
1. 利用者AはWeChat、SMS、オフラインなどの手段で利用者BのDIDを取得し、AのServerを通じてBへメッセージを送るリクエストを開始します。
2. 利用者AのServerは、Bへのメッセージ送信リクエストを受け、BのDIDを含めたリクエストをA ServerのMessage Proxyへ送ります。
3. AのMessage Proxyはメッセージ送信リクエストを受けると、BのDIDを使ってDID ServerにBのDID文書を照会し、Bのメッセージサービスエンドポイントを取得します。その後の接続を速くするため、BのDID文書をキャッシュします。
4. AのMessage Proxyは、Bのメッセージサービスエンドポイント（BのMessage Proxy）へ接続して、メッセージを送ります。
5. BのMessage Proxyはリクエストを受け、BのDIDからDID文書を検索して、Bのメッセージのルーティング情報（DID文書のrouterフィールド）を取得します。その情報に基づいてB ServerのWSS接続を調べ、メッセージを転送します。
6. BのServerはメッセージを受信して検証・処理し、Bへ送ります。
7. その後、BからAへ送るメッセージも、AからBへ送るのと同じ流れに従います。

注：新しいDIDへ初めてアクセスするときは、キャッシュがなく照会に時間がかかる場合があります。その後のアクセスではキャッシュを直接利用できるため、遅延が小さくなります。

## 6. プロトコル定義

DIDに基づくエンドツーエンド暗号化通信技術で説明したように、このプロトコルはWSSで伝送し、JSON形式を使います。

### 6.1 メッセージサービス登録メッセージ

利用者のServerがMessage Proxyに登録する際に使います。登録時には複数のrouterを含められます。各routerにはrouterのDID、作成日時、nonce（リプレイ攻撃を防ぐための値）、署名が含まれます。署名の対象は、そのrouterのJSONサブオブジェクトです。

注：これは全件指定のインターフェースであり、すべてのrouterを含める必要があります。登録メッセージに含まれないrouterは削除されます。

例：

```json
{
  "version": "1.0",
  "type": "register",
  "timestamp": "2024-05-27T12:00:00.123Z",
  "messageId": "randomstring",
  "routers": [
    {
      "router": "did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www",
      "nonce": "randomNonceValue1",
      "proof": {
        "type": "EcdsaSecp256r1Signature2019",
        "created": "2024-05-27T10:51:55Z",
        "verificationMethod": "did:example:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www#keys-1",
        "proofValue": "z58DAdFfa9SkqZMVPxAQpic7ndSayn1PzZs6ZjWp1CktyGesjuTSwRdoWhAfGFCF5bppETSTojQCrfFPP2oumHKtz"
      }
    },
    {
      "router": "did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www",
      "nonce": "randomNonceValue1",
      "proof": {
        "type": "EcdsaSecp256r1Signature2019",
        "created": "2024-05-27T10:51:55Z",
        "verificationMethod": "did:example:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www#keys-1",
        "proofValue": "z58DAdFfa9SkqZMVPxAQpic7ndSayn1PzZs6ZjWp1CktyGesjuTSwRdoWhAfGFCF5bppETSTojQCrfFPP2oumHKtz"
      }
    }
  ]
}
```

#### 6.1.1 フィールドの説明

- version：プロトコルのバージョン。
- type：リクエストの種類。router登録リクエストであることを示し、値は"register"です。
- timestamp：リクエストを送った時刻。ミリ秒精度のISO 8601形式のUTC時刻文字列です。
- messageId：一意なメッセージID。16文字のランダムな文字列です。
- routers：複数のrouterオブジェクトを含む配列です。各routerオブジェクトは、次のフィールドを含みます。
  - router：routerを識別するDID。
  - nonce：各リクエストの一意性を確保し、リプレイ攻撃を防ぐためのランダムな値。32バイトの文字列です。
  - proof：DIDに基づくエンドツーエンド暗号化通信技術のSourceHelloにあるproofフィールドと同じです。現在のrouterだけに署名します。

#### 6.1.2 proofの署名を生成する手順

処理は、DIDに基づくエンドツーエンド暗号化通信技術のsourceHelloメッセージへの署名方法と基本的に同じです。異なるのは、ここでの署名が単一のrouterだけを保護する点です。

- 署名対象のrouterオブジェクトを、proofValueフィールドを除き、カンマとコロンを区切りとして使い、キー順に並べたJSON文字列へ変換します。
- JSON文字列をUTF-8のバイト列へ符号化します。
- 楕円曲線デジタル署名アルゴリズム（EcdsaSecp256r1Signature2019）とSHA-256ハッシュアルゴリズムを使って、そのバイト列に署名します。
- 生成した署名値proofValueを、メッセージJSONのproof辞書内にあるproofValueフィールドへ追加します。

```python
# 1. Create all fields of the json message, excluding proofValue field
router = {
    # Other necessary fields
    "proof": {
        "type": "EcdsaSecp256r1Signature2019",
        "created": "2024-05-27T10:51:55Z",
        "verificationMethod": "did:example:123456789abcdefghi#keys-1"
        # Excluding proofValue field
    }
}

# 2. Convert to JSON string, sort by keys, and use commas and colons as separators
router_str = JSON.stringify(router, separators=(',', ':'), sort_keys=True)

# 3. Encode JSON string as UTF-8 bytes
router_bytes = UTF8.encode(router_str)

# 4. Sign byte data using private key and ECDSA algorithm
signature = ECDSA.sign(router_bytes, private_key, algorithm=SHA-256)

# 5. Add signature value to proof field in json message
router["proof"]["proofValue"] = Base64.urlsafe_encode(signature)
```

#### 6.1.3 proofの署名を検証する処理

routerのDIDに従ってDID文書を取得し、verificationMethodに基づいて文書から対応する公開鍵を取得します。その公開鍵と、前述の署名処理に従って署名を検証します。

#### 6.1.4 nonceの生成と検証手順

nonceの目的は、リプレイ攻撃を防ぐことです。

1. nonceの生成：クライアントは乱数または一意な識別子（nonce）を生成します。リクエストごとに新しいnonceを使うべきです。
2. nonceの記録：サーバーはリクエストを処理するときにnonceを記録します。
3. nonceの検証：サーバーは一定期間内にそのnonceが使われていないかを検証します。使われていればリクエストを拒否します。

#### 6.1.5 タイムスタンプの検証

- タイムスタンプ：リクエストにタイムスタンプを含め、生成時刻を示します。
- 有効性の確認：サーバーは、タイムスタンプが妥当な時間範囲内、例えば5分以内にあるかを確認します。この範囲を外れたリクエストは拒否します。

### 6.2 Message Proxy同士の接続

Proxy Aが対象DIDのメッセージサービスエンドポイントBを解決すると、エンドポイントBへWSS接続を開始できます。その後は登録をせずに直接メッセージを送れますが、接続を維持するためにハートビートが必要です。
BがAへメッセージを送るときは、先に確立したAからBへの接続を使わず、新しいWSS接続を確立できます。
したがって、1つの接続は、その接続を開始した側がメッセージを送るためだけに使います。

### 6.3 ハートビート維持メッセージ

ハートビートメッセージは接続開始側から送ります。サーバーは、キープアライブメッセージのない接続を定期的（60秒）に削除します。

例：
```json
{
  "version": "1.0",
  "type": "heartbeat",
  "timestamp": "2024-06-04T12:34:56Z",
  "messageId": "randomstring",
  "message": "ping"
}
```

#### 6.3.1 フィールドの説明

- version：プロトコルのバージョン。
- type：リクエストの種類。ハートビートリクエストであることを示し、値は"heartbeat"です。
- timestamp：リクエストを送った時刻。ミリ秒精度のISO 8601形式のUTC時刻文字列です。
- messageId：一意なメッセージID。16文字のランダムな文字列です。
- message：リクエストで送るハートビートメッセージは"ping"、応答メッセージは"pong"です。

### 6.4 暗号化通信メッセージ

2人の利用者がDIDを通じて短期暗号鍵を交渉した後、messageメッセージで暗号化メッセージを送れます。

例：
```json
{
  "version": "1.0",
  "type": "message",
  "timestamp": "2024-06-04T12:34:56.123Z",
  "messageId": "randomstring",
  "sourceDid": "did:example:987654321abcdefghi",
  "destinationDid": "did:example:123456789abcdefghi",
  "secretKeyId": "abc123session",
  "encryptedData": {
    "iv": "iv_encoded_base64",
    "tag": "tag_encoded_base64",
    "ciphertext": "ciphertext_encoded_base64"
  }
}
```

#### 6.4.1 プロトコルのフィールド

- version：文字列。現在のプロトコルのバージョン番号。
- type：文字列。メッセージの種類。
- timestamp：メッセージの送信時刻。ミリ秒精度のISO 8601形式のUTC時刻文字列です。
- messageId：一意なメッセージID。16文字のランダムな文字列です。
- sourceDid：文字列。メッセージの送信元または送信者のDID。ここには常に送信者自身のDIDを設定します。
- destinationDid：文字列。メッセージの送信先または受信者のDID。ここには常に受信者のDIDを設定します。
- secretKeyId：短期暗号鍵のID。これにより、事前に交渉した対称暗号アルゴリズム、暗号鍵などの情報を探せます。型は文字列です。詳細はDIDに基づくエンドツーエンド暗号化通信技術を参照してください。
- encryptedData：暗号化データ。暗号アルゴリズムによって異なるデータを含む場合があります。以下はTLS_AES_128_GCM_SHA256暗号スイートで必要なデータで、iv（初期化ベクトル）、tag（認証タグ。暗号アルゴリズムによる）を含みます。ciphertext（暗号文）は、すべての暗号アルゴリズムに存在します。
  - iv：初期化ベクトル。ランダムまたは擬似ランダムなバイト列で、AES-GCMモードでは通常12バイト（96ビット）です。
  - tag：AES-GCMモードが生成する認証コード。データの完全性と真正性を検証します。通常16バイト（128ビット）です。
  - ciphertext：暗号化データ。暗号文をBase64で符号化し、その結果をUTF-8文字列へ変換します。
  - encryptedDataの生成方法は、finishedメッセージのverifyDataを生成する方法と同じです。DIDに基づくエンドツーエンド暗号化通信技術を参照してください。

### 6.5 応答メッセージ

すべてのWSSメッセージには共通の応答メッセージがあります。その主な目的は、短期鍵交渉メッセージ、WSS登録メッセージ、暗号化通信メッセージなどの処理中に発生した例外を通知することです。このメッセージは、WSSのJSONメッセージの受信確認に使うべきではありません。アプリケーション層がメッセージを送り、相手が正しく受信したかを確認する必要がある場合は、アプリケーション層のプロトコルに保護の仕組みを設計する必要があります。

```json
{
  "version": "1.0",
  "type": "response",
  "timestamp": "2024-06-04T12:34:56.123Z",
  "messageId": "randomstring",
  "sourceDid": "did:example:987654321abcdefghi",
  "destinationDid": "did:example:123456789abcdefghi",
  "originalType": "register",
  "originalMessageId": "randomstring",
  "code": 200,
  "detail": "invalid json"
}
```

#### 6.5.1 フィールドの説明

- originalType：元のメッセージの種類。
- originalMessageId：元のメッセージのID。
- code：エラーコード。基本的な設計はHTTPのエラーコードに似ています。一般的なエラーは次のとおりです。
  - 200：正常。
  - 404：DIDが見つからない。
  - 403：認証に失敗した。
  - 4000：ENCRYPTION_ERROR：暗号化中にエラーが発生した。
  - 4001：DECRYPTION_ERROR：復号中にエラーが発生した。
  - 4002：INVALID_ENCRYPTION_KEY：暗号鍵が無効、または一致しない。
  - 4003：INVALID_DECRYPTION_KEY：復号鍵が無効、または一致しない。
  - 4004：ENCRYPTION_KEY_EXPIRED：暗号鍵の有効期限が切れた。
  - 4005：DECRYPTION_KEY_EXPIRED：復号鍵の有効期限が切れた。
- detail：エラーの詳細な説明。

### 6.6 DID更新通知

DIDの内部フィールドが変更された場合、またはDIDに対応する秘密鍵が漏えいし、元のDID文書を廃止する必要がある場合は、DID通知メッセージを送り、関連する他のDIDに対して、DID文書を速やかに再照会するよう通知する必要があります。
潜在的な悪意ある攻撃に対抗するため、DID更新通知は、次版で対応する予定のDID文書の複数署名方式と同時に導入する予定です。これにより、1つの鍵が漏えいしても、関係者へ安全に通知できます。

## 著作権表示

Copyright (c) 2024 ANP Community  
このファイルは[MIT License](../../LICENSE)の下で公開されています。自由に利用・変更できますが、この著作権表示を保持しなければなりません。
