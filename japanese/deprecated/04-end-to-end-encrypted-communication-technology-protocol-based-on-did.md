<!-- translation-review: full; source=deprecated/04-end-to-end-encrypted-communication-technology-protocol-based-on-did.md; method=full-original-to-translation-semantic-comparison -->
> 日本語参考訳（原文全体を段落ごとに意味照合済み）。歴史的な廃止文書です。WebSocket Secure不要、DIDと鍵の一対一関係、Finishedの構成などは当時の主張を保持しており、現行ANPの要件や本実装の安全性を示しません。コード例・フィールド名・大小文字は原文を保持します。規範となるのは原文です。
> 原文: [deprecated/04-end-to-end-encrypted-communication-technology-protocol-based-on-did.md](../../deprecated/04-end-to-end-encrypted-communication-technology-protocol-based-on-did.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# DIDに基づくエンドツーエンド暗号化通信技術のプロトコル

## 1. 背景

エンドツーエンド暗号化（E2EE）は、送信者から受信者までの伝送中、情報を暗号化したままにする通信の暗号化方式です。インターネットサービス提供者、中間者攻撃者、サーバー自身を含む第三者が、許可なく平文の内容へアクセスすることを防ぎます。

[AgentNetworkProtocol技術白書](01-agentnetworkprotocol-technical-white-paper(20041204).md)で、DIDに基づくエンドツーエンド暗号化通信技術を提案しました。本書はその実装の詳細を説明します。

## 2. 方式の概要

本方式は、TLSやブロックチェーンなど、実用上検証されてきた安全性の高い技術を利用します。それらを組み合わせ、異なる2つのプラットフォームの利用者間で安全に暗号化通信する、DIDに基づく方式を設計しました。

WebSocketの上に、DIDに基づくメッセージルーティングと短期鍵の合意の仕組みを設けます。DIDを持つ双方が、DID文書の公開鍵と自分の秘密鍵を使い、ECDHE（Elliptic Curve Diffie-Hellman Ephemeral）で短期鍵を合意できます。合意した鍵の有効期間中は、その鍵でメッセージを暗号化して安全に通信します。ECDHEによって、第三者のメッセージ代理などを経由しても、悪意を持って復号されないようにします。

WebSocketを選んだのは、インターネットで広く使われ、利用できる基盤が多いためです。これは初期普及に重要です。また、その上にE2EEを設計したため、WebSocket Secureを使う必要はなく、冗長な暗号化・復号処理を避けられます。

現在の方式は、本質的にはアプリケーション層の暗号化で伝送層の暗号化を置き換えます。既存基盤を使いつつ、導入の難しさを軽減します。

全体の処理は次の図のとおりです。

![エンドツーエンド暗号化](../../images/end-to-end-encryption-process.png)

**注：**第三者のメッセージサービスが存在するとは限りません。利用者が自分のサービスを使うこともできます。

現在は双方向通信ができるWebSocketだけに対応しています。将来はHTTPにも対応し、用途を広げる予定です。また、より広い場面で使えるよう、伝送層でこのE2EE方式を実装することも検討しています。

## 3. 暗号化通信の手順

異なる2つのプラットフォームの利用者A（DID-A）とB（DID-B）を考えます。双方がDID SERVERから、相手の公開鍵を含むDID文書を取得できます。

暗号化通信の前に、AとBは短期鍵の生成を開始する必要があります。TLSの一時的な暗号鍵生成に似た処理です。鍵には有効期間があり、失効前に生成手順を再開して更新する必要があります。

合意した短期鍵を双方が持つと、Aはその鍵で暗号化し、メッセージ送信プロトコルによりサーバー経由でBへ送信できます。Bはメッセージの鍵IDから保存済みの短期鍵を探して復号します。鍵がないか失効していれば、Aへエラーで更新開始を通知します。短期鍵の更新後、再びメッセージを送ります。

```plaintext
Client (A)                                      Client (B)
|                                                 |
| -- Initiate Short-term Key Creation Process --> |
|                                                 |
|      (Create Temporary Encryption Key)          |
|                                                 |
| <---- Temporary Key Created ----                |
|                                                 |
|       (Key has an expiration time)              |
|                                                 |
|      (Monitor Key Validity)                     |
|                                                 |
|   (Before expiration, restart creation process) |
|                                                 |
| (A and B now have a negotiated short-term key)  |
|                                                 |
| ---- Encrypted Message ---->                    |
|                                                 |
|     (Encrypt message using short-term key)      |
|     (Send via message server)                   |
|                                                 |
| <---- Receive Encrypted Message ----            |
|                                                 |
|     (Find stored key using key ID)              |
|     (Decrypt message)                           |
|      (If key not found or expired)              |
|                                                 |
| <---- or Error Message ----                     |
|                                                 |
|      (Notify A to update short-term key)        |
|                                                 |
```

## 4. 短期鍵の合意手順

短期鍵の生成は、TLS 1.3の鍵交換に似ています。楕円曲線に基づくECDHE（Elliptic Curve Diffie-Hellman Ephemeral）を使います。これはDiffie-Hellman鍵交換の一種で、楕円曲線暗号（ECC）と一時的な鍵を組み合わせ、安全でないネットワーク上でも暗号鍵を安全に交換して通信します。

### ECDHE手順の概要

1. **鍵ペアの生成：**
   - クライアントとサーバーがそれぞれ、秘密鍵と公開鍵からなる一時的な楕円曲線鍵ペアを生成します。

2. **公開鍵の交換：**
   - クライアントが自分の生成した公開鍵をサーバーへ送ります。
   - サーバーが自分の生成した公開鍵をクライアントへ送ります。

3. **共有秘密の計算：**
   - クライアントは自分の秘密鍵と、受け取ったサーバーの公開鍵で共有秘密を計算します。
   - サーバーは自分の秘密鍵と、受け取ったクライアントの公開鍵で共有秘密を計算します。
   - 楕円曲線Diffie-Hellmanの性質により、双方が同じ共有秘密を得ます。

### TLSとの違い

- 全体は`SourceHello`、`DestinationHello`、`Finished`の3メッセージだけで、TLSの`ClientHello`、`ServerHello`、`Finished`に対応します。本方式ではクライアント・サーバーではなく、送信元・宛先と呼びます。
- `EncryptedExtensions`、`Certificate`、`CertificateVerify`などは不要です。具体的には次のとおりです。
  - `EncryptedExtensions`は現在不要ですが、暗号拡張情報の伝達のため将来追加する可能性があります。
  - `Certificate`と`CertificateVerify`は、主にサーバー公開鍵の安全性を確保するメッセージなので不要です。DIDアドレスと公開鍵の関係で正しさを検証します。各DIDがちょうど1つの公開鍵に対応し、逆も同様です。
- `SourceHello`と`DestinationHello`に完全性を保証する署名があるため、`Finished`ではもはやハンドシェイクメッセージをハッシュ化・暗号化しません。
- `Source`と`Destination`は複数の短期鍵合意を同時に開始でき、複数鍵を同時に持って異なる種類のメッセージを暗号化できます。

### 全体の手順図

```plaintext
Client (A)                                          Server (B)
   |                                                    |
   |  ---------------- SourceHello ---------------->    |
   |                                                    |
   |                  (Includes public key and signature)|
   |                                                    |
   |                                                    |
   |  <------------- DestinationHello ------------      |
   |                                                    |
   |                  (Includes public key and signature)|
   |                                                    |
   |                                                    |
   |  -------- Finished (Includes verify_data) -------> |
   |                                                    |
   |  <-------- Finished (Includes verify_data) --------|
   |                                                    |
   |                                                    |
```

## 5. プロトコルの定義

WebSocket上でJSON形式を使うプロトコルです。DID利用者のメッセージ受信アドレスは、DID文書のserviceフィールドに、エンドポイント種別`messageService`として格納します（did:allメソッド設計仕様を参照）。

### 5.1 SourceHelloメッセージ

`SourceHello`は、暗号化通信のハンドシェイクを開始します。送信元のID情報、公開鍵、対応する暗号パラメーター、セッションID、バージョン情報、完全性と認証のためのメッセージ署名を含みます。

**メッセージ例：**
```json
{
  "version": "1.0",
  "type": "sourceHello",
  "timestamp": "2024-05-27T12:00:00.123Z",
  "messageId": "randomstring",
  "sessionId": "abc123session",
  "sourceDid": "did:example:123456789abcdefghi",
  "destinationDid": "did:example:987654321abcdefghi",
  "verificationMethod": {
    "id": "did:example:987654321abcdefghi#keys-1",
    "type": "EcdsaSecp256r1VerificationKey2019",
    "publicKeyHex": "04a34b4c8d2e48f37a6c6c6f6d7b7a6e4b4d5f6c4e4f7a6b4c8d2e48f37a6c6c6f6d7b7a6e4b4d5f6c4e4f7a6"
  },
  "random": "b7e4b4d5f6c4e4f7a6b4c8d2e48f37a6c6c6f6d7b7a6e4b4d5f6c4e4f7a6b4c8d2e48f37a6c6c6f6d7b7a6e4b4d5f6c4e4f7a6",
  "supportedVersions": ["1.0", "0.9"],
  "cipherSuites": [
    "TLS_AES_128_GCM_SHA256",
    "TLS_AES_256_GCM_SHA384",
    "TLS_CHACHA20_POLY1305_SHA256"
  ],
  "supportedGroups": [
    "secp256r1",
    "secp384r1",
    "secp521r1"
  ],
  "keyShares": [
    {
      "group": "secp256r1",
      "expires": 864000,
      "keyExchange": "0488b21e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      "group": "secp384r1",
      "expires": 864000,
      "keyExchange": "0488b21e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    }
  ],
  "proof": {
    "type": "EcdsaSecp256r1Signature2019",
    "created": "2024-05-27T10:51:55Z",
    "verificationMethod": "did:example:987654321abcdefghi#keys-1",
    "proofValue": "eyJhbGciOiJFUzI1NksifQ..myEaggpdg0-GflPHibRZWfDEdDOqzZzBcBM5TKvaUzCUSv1_7anUvtgdFXMd12E_qM6RmAAaSWWBGwLY-Srvyg"
  }
}
```

#### 5.1.1 フィールドの説明

- **version**：文字列。現在のプロトコルのバージョン番号。
- **type**：文字列。SourceHelloなどのメッセージ種別。
- **timestamp**：送信時刻。ミリ秒精度のISO 8601形式UTCタイムスタンプ。
- **messageId**：一意なメッセージID。16文字のランダム文字列。
- **sessionId**：文字列。16文字のランダムなセッションIDで、1回の短期セッション合意中に有効。
- **sourceDid**：文字列。送信元DIDで、常に送信者自身のDID。
- **destinationDid**：文字列。宛先DIDで、常に受信者のDID。
- **verificationMethod**：送信者のDIDに対応する公開鍵。
  - **id**：文字列。検証メソッドID。
  - **type**：文字列。DID仕様が定義する公開鍵の種別。
  - **publicKeyHex**：文字列。公開鍵の16進表現。
- **random**：文字列。32文字のランダム文字列で、ハンドシェイクの一意性を確保し、鍵交換に使う。
- **supportedVersions**：配列。送信者が対応するプロトコル版の一覧。
- **cipherSuites**：配列。対応する暗号スイート一覧。現在はTLS_AES_128_GCM_SHA256に対応。
- **supportedGroups**：配列。対応する楕円曲線群の一覧。
- **keyShares**：配列。複数の公開鍵交換情報を含む。
  - **group**：文字列。使用する楕円曲線群。現在はsecp256r1に対応。
  - **keyExchange**：文字列。送信元が生成した鍵交換用公開鍵の16進表現。
  - **expires**：数値。最終暗号鍵の有効期間（秒）。失効による合意失敗を防ぐため、相手へ有効期間を伝える。
- **proof**：
  - **type**：文字列。署名の種別。
  - **created**：文字列。署名の生成時刻。秒精度のISO 8601形式UTCタイムスタンプ。
  - **verificationMethod**：署名に使った検証メソッドのID。最上位の`verificationMethod`を参照。
  - **proofValue**：送信者の秘密鍵によるメッセージ署名。完全性を確保する。

#### 5.1.2 proofValueの生成手順

1. `proof`辞書の`proofValue`を除き、**`sourceHello`のすべてのフィールドを構成**します。
2. **`proofValue`を含まないメッセージをJSON文字列へ変換**します。カンマとコロンを区切りに使い、キーをソートします。
3. **JSON文字列をUTF-8バイト列へ符号化**します。
4. **ECDSA、秘密鍵、SHA-256を使ってバイト列へ署名**します。
5. **署名値をJSONメッセージの`proof`辞書の`proofValue`へ加えます。**

**Pythonの例：**
```python
# 1. Create all fields of the JSON message, excluding the proofValue field
msg = {
    # Other necessary fields
    "proof": {
        "type": "EcdsaSecp256r1Signature2019",
        "created": "2024-05-27T10:51:55Z",
        "verificationMethod": "did:example:123456789abcdefghi#keys-1"
        # Exclude proofValue field
    }
}

# 2. Convert msg to a JSON string, sorted by keys, using commas and colons as separators
msg_str = JSON.stringify(msg, separators=(',', ':'), sort_keys=True)

# 3. Encode the JSON string to UTF-8 bytes
msg_bytes = UTF8.encode(msg_str)

# 4. Sign the byte data using ECDSA and SHA-256
signature = ECDSA.sign(msg_bytes, private_key, algorithm=SHA-256)

# 5. Add the signature value to the proofValue field in the proof dictionary of the JSON message
msg["proof"]["proofValue"] = Base64.urlsafe_encode(signature)
```

#### 5.1.3 SourceHelloの検証

1. **メッセージの解析**：`SourceHello`を解析し、各フィールドを取り出します。
2. **DIDと公開鍵の検証**：`sourceDid`と`verificationMethod`の公開鍵を読み、did:allメソッド設計仕様の生成方法で公開鍵からDIDを生成して、`sourceDid`との一致を確認します。
3. **署名の検証**：`sourceDid`に対応する公開鍵で、`proof`の署名を検証します。
4. **その他の検証**：リプレイ防止のため`random`のランダム性を調べ、proofの`created`から署名が失効していないことを確認します。

### 5.2 DestinationHelloメッセージ

`DestinationHello`は、宛先が鍵交換のハンドシェイクを開始するために送ります。宛先のID情報、公開鍵、合意した暗号パラメーター、セッションID、版情報、完全性と認証のための署名を含みます。

**メッセージ例：**
```json
{
  "version": "1.0",
  "type": "destinationHello",
  "timestamp": "2024-05-27T12:00:00Z",
  "messageId": "randomstring",
  "sessionId": "abc123session",
  "sourceDid": "did:example:987654321abcdefghi",
  "destinationDid": "did:example:123456789abcdefghi",
  "verificationMethod": {
    "id": "did:example:987654321abcdefghi#keys-1",
    "type": "EcdsaSecp256r1VerificationKey2019",
    "publicKeyHex": "04a34b4c8d2e48f37a6c6c6f6d7b7a6e4b4d5f6c4e4f7a6b4c8d2e48f37a6c6c6f6d7b7a6e4b4d5f6c4e4f7a6"
  },
  "random": "e4b4d5f6c4e4f7a6b4c8d2e48f37a6c6c6f6d7b7a6e4b4d5f6c4e4f7a6b4c8d2e48f37a6c6c6f6d7b7a6e4b4d5f6c4e4f7a6",
  "selectedVersion": "1.0",
  "cipherSuite": "TLS_AES_128_GCM_SHA256",
  "keyShare": {
    "group": "secp256r1",
    "expires": 864000,
    "keyExchange": "0488b21e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  },
  "proof": {
    "type": "EcdsaSecp256r1Signature2019",
    "created": "2024-05-27T10:51:55Z",
    "verificationMethod": "did:example:987654321abcdefghi#keys-1",
    "proofValue": "eyJhbGciOiJFUzI1NksifQ..myEaggpdg0-GflPHibRZWfDEdDOqzZzBcBM5TKvaUzCUSv1_7anUvtgdFXMd12E_qM6RmAAaSWWBGwLY-Srvyg"
  }
}
```

#### 5.2.1 フィールドの説明

`DestinationHello`のフィールドは`SourceHello`とほぼ同様です。主な違いは次のとおりです。

- **selectedVersion**：選んだプロトコルのバージョン番号。
- **cipherSuite**：選んだ暗号スイート。現在はTLS_AES_128_GCM_SHA256に対応。
- **keyShare**：
  - **group**：文字列。使用する楕円曲線群。現在はsecp256r1に対応。
  - **keyExchange**：文字列。宛先が生成した鍵交換用公開鍵の16進表現。
  - **expires**：数値。宛先が設定する鍵の有効期間。`SourceHello`より長くても、鍵合意者は自分の有効期間を維持できます。自身の有効期間が切れたら、その鍵で暗号化されたメッセージを拒否し、再合意を求めるエラーを送れます。

**メッセージ例：**
```json
{
  "version": "1.0",
  "type": "destinationHello",
  "timestamp": "2024-05-27T12:00:00Z",
  "messageId": "randomstring",
  "sessionId": "abc123session",
  "sourceDid": "did:example:987654321abcdefghi",
  "destinationDid": "did:example:123456789abcdefghi",
  "verificationMethod": {
    "id": "did:example:987654321abcdefghi#keys-1",
    "type": "EcdsaSecp256r1VerificationKey2019",
    "publicKeyHex": "04a34b4c8d2e48f37a6c6c6f6d7b7a6e4b4d5f6c4e4f7a6b4c8d2e48f37a6c6c6f6d7b7a6e4b4d5f6c4e4f7a6"
  },
  "random": "e4b4d5f6c4e4f7a6b4c8d2e48f37a6c6c6f6d7b7a6e4b4d5f6c4e4f7a6b4c8d2e48f37a6c6c6f6d7b7a6e4b4d5f6c4e4f7a6",
  "selectedVersion": "1.0",
  "cipherSuite": "TLS_AES_128_GCM_SHA256",
  "keyShare": {
    "group": "secp256r1",
    "expires": 864000,
    "keyExchange": "0488b21e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
  },
  "proof": {
    "type": "EcdsaSecp256r1Signature2019",
    "created": "2024-05-27T10:51:55Z",
    "verificationMethod": "did:example:987654321abcdefghi#keys-1",
    "proofValue": "eyJhbGciOiJFUzI1NksifQ..myEaggpdg0-GflPHibRZWfDEdDOqzZzBcBM5TKvaUzCUSv1_7anUvtgdFXMd12E_qM6RmAAaSWWBGwLY-Srvyg"
  }
}
```

### 5.3 Finishedメッセージ

TLS 1.3の`Finished`の内容は、それまでのハンドシェイクメッセージのハッシュをHMACで処理したものです。双方のメッセージが改変されていないことを確保し、リプレイ攻撃を防ぎます。

本方式では`sourceHello`と`destinationHello`が署名を持ち、改変を防ぎます。`Finished`の主目的はリプレイ攻撃の防止です。`sourceHello`と`destinationHello`の乱数を連結・ハッシュ化して鍵IDを得て、合意した鍵でそのIDを暗号化して`Finished`に含めます。復号後に鍵IDが一致するかを調べ、リプレイを防げます。

**メッセージ例：**
```json
{
  "version": "1.0",
  "type": "finished",
  "timestamp": "2024-05-27T12:00:00Z",
  "messageId": "randomstring",
  "sessionId": "abc123session",
  "sourceDid": "did:example:987654321abcdefghi",
  "destinationDid": "did:example:123456789abcdefghi",
  "verifyData": {
    "iv": "iv_encoded",
    "tag": "tag_encoded",
    "ciphertext": "ciphertext_encoded"
  }
}
```

#### 5.3.1 フィールドの説明

- **version**：文字列。現在のプロトコルのバージョン番号。
- **type**：文字列。メッセージ種別。
- **timestamp**：送信時刻。ミリ秒精度のISO 8601形式UTCタイムスタンプ。
- **messageId**：一意なメッセージID。16文字のランダム文字列。
- **sessionId**：文字列。`sourceHello`の`sessionId`を使用。
- **sourceDid**：文字列。送信元DIDで、常に送信者自身のDID。
- **destinationDid**：文字列。宛先DIDで、常に受信者のDID。
- **verifyData**：検証データ。AES-GCMでは`iv`と`tag`を含む。
  - **iv**：初期化ベクトル。ランダムまたは疑似ランダムのバイト列で、AES-GCMでは通常12バイト（96ビット）。
  - **tag**：AES-GCMが生成する認証タグ。完全性と真正性を検証する。通常16バイト（128ビット）。
  - **ciphertext**：短期暗号鍵IDを含む暗号化データ。生成方法は第5.3.2節を参照。

#### 5.3.2 verifyDataの生成方法

合意した短期暗号鍵で次のJSONを暗号化し、`ciphertext`を得ます。

```json
{
    "secretKeyId":"0123456789abcdef"
}
```

**Pythonの例：**
```python
# TLS_AES_128_GCM_SHA256 encryption function
def encrypt_aes_gcm_sha256(data: bytes, key: bytes) -> Dict[str, str]:
    # Ensure key length is 16 bytes (128 bits)
    if len(key) != 16:
        raise ValueError("Key must be 128 bits (16 bytes).")
    
    # Generate random IV
    iv = os.urandom(12)  # Recommended IV length for GCM is 12 bytes
    
    # Create cipher object
    encryptor = Cipher(
        algorithms.AES(key),
        modes.GCM(iv),
        backend=default_backend()
    ).encryptor()
    
    # Encrypt data
    ciphertext = encryptor.update(data) + encryptor.finalize()
    
    # Get authentication tag
    tag = encryptor.tag
    
    # Encode to Base64
    iv_encoded = base64.b64encode(iv).decode('utf-8')
    tag_encoded = base64.b64encode(tag).decode('utf-8')
    ciphertext_encoded = base64.b64encode(ciphertext).decode('utf-8')
    
    # Create JSON object
    encrypted_data = {
        "iv": iv_encoded,
        "tag": tag_encoded,
        "ciphertext": ciphertext_encoded
    }
        
    return encrypted_data
```

`secretKeyId`は、`sourceDid`と`destinationDid`の間の短期暗号鍵IDです。以降の暗号メッセージへ含め、どの鍵で暗号化したかを示します。その鍵の有効期間中だけ有効で、鍵の失効後は破棄する必要があります。

**secretKeyIdの生成方法：**

1. `sourceHello`と`destinationHello`の乱数を、`sourceHello`が先、`destinationHello`が後になるよう、区切りなしで1つの文字列へ**連結**します。
2. UTF-8で**文字列をバイト列へ符号化**します。
3. SHA-256をハッシュ方式に使い、saltなし（既定）、空のコンテキスト情報で**HKDF（HMACに基づく抽出・展開鍵導出関数）を初期化**します。**Pythonの例：**

    ```python
    hkdf = HKDF(
        algorithm=hashes.SHA256(),  # Ensure using the hash algorithm instance from the cryptography library
        length=8,  # Generate an 8-byte key
        salt=None,
        info=b'',  # Optional context information to distinguish keys for different purposes
        backend=default_backend()  # Use the default cryptographic backend
    )
    ```

4. HKDFの`derive`を入力バイト列へ適用し、**8バイトの列を導出**します。
5. **導出した8バイトを16文字の16進文字列へ符号化**し、`secretKeyId`とします。

**secretKeyIdを生成するPythonの例：**
```python
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend

def generate_16_char_from_random_num(random_num1: str, random_num2: str):
    content = random_num1 + random_num2
    random_bytes = content.encode('utf-8')
    
    # Use HKDF to derive an 8-byte key
    hkdf = HKDF(
        algorithm=hashes.SHA256(),  # Ensure using the hash algorithm instance from the cryptography library
        length=8,  # Generate an 8-byte key
        salt=None,
        info=b'',  # Optional context information to distinguish keys for different purposes
        backend=default_backend()  # Use the default cryptographic backend
    )
    
    derived_key = hkdf.derive(random_bytes)
    
    # Encode the derived key to a hexadecimal string
    derived_key_hex = derived_key.hex()
    
    return derived_key_hex
```

#### 5.3.3 Finishedの検証

合意した短期暗号鍵でメッセージの暗号データを復号し、`secretKeyId`を取り出します。ローカルで生成した`secretKeyId`と一致するか確認します。

### 5.4 短期暗号鍵の生成方法

送信元と宛先の双方が`sourceHello`と`destinationHello`を持つと、短期暗号鍵を計算できます。

TLS 1.3の鍵交換に似た処理で、楕円曲線に基づく鍵交換方式ECDHE（Elliptic Curve Diffie-Hellman Ephemeral）を使います。

1. **相手の公開鍵の取得：**
   - 16進文字列（`keyExchange`）から相手の楕円曲線公開鍵を取り出します。

2. **共有秘密の生成：**
   - ローカルの秘密鍵と相手の公開鍵を用い、ECDHで共有秘密を生成します。秘密鍵を直接送らずに、双方が同じ共有秘密を計算できます。

3. **鍵長の決定：**
   - 選んだ暗号スイートに応じて必要な長さを決めます。たとえばTLS_AES_128_GCM_SHA256なら128ビット（16バイト）です。

4. **暗号化・復号鍵の生成：**
   - **HKDFの抽出段階を初期化：**
     - 指定したハッシュ方式（SHA-256など）と、全バイトがゼロの初期saltで抽出器を初期化し、共有秘密から疑似ランダム鍵を導きます。
   - **疑似ランダム鍵の抽出：**
     - 抽出段階で共有秘密を抽出鍵へ変換し、後続鍵の導出の基礎とします。
   - **ハンドシェイクトラフィック鍵の生成：**
     - 抽出鍵、固定ラベル（s ap trafficとd ap traffic）、`sourceHello`と`destinationHello`の連結乱数文字列を組み合わせ、送信元・宛先のハンドシェイク鍵を生成します。

    ```python
    def derive_secret(secret: bytes, label: bytes, messages: bytes) -> bytes:
        hkdf_expand = HKDFExpand(
            algorithm=hash_algorithm,
            length=hash_algorithm.digest_size,
            info=hkdf_label(hash_algorithm.digest_size, label, messages),
            backend=backend
        )
        return hkdf_expand.derive(secret)

    # Generate handshake traffic secrets
    source_data_traffic_secret = derive_secret(extracted_key, b"s ap traffic", source_hello_random + destination_hello_random)
    destination_data_traffic_secret = derive_secret(extracted_key, b"d ap traffic", source_hello_random + destination_hello_random)
    ```

   - **展開して実際のハンドシェイク鍵を生成：**
     - HKDFの展開段階で、トラフィック鍵から実際の暗号鍵を導きます。HKDFラベル（key）と必要な鍵長を使います。

    ```python
    # Expand to generate actual handshake keys
    source_data_key = HKDF(
            algorithm=hash_algorithm,
            length=key_length,  # 256-bit key for AES-256
            salt=None,
            info=hkdf_label(32, b"key", source_data_traffic_secret),
            backend=backend
        ).derive(source_data_traffic_secret)

    destination_data_key = HKDF(
            algorithm=hash_algorithm,
            length=key_length,  # 256-bit key for AES-256
            salt=None,
            info=hkdf_label(32, b"key", destination_data_traffic_secret),
            backend=backend
        ).derive(destination_data_traffic_secret)
    ```

## 6. 制限

現在は暗号データをWebSocket上のJSONとして送るため、映像ファイルなどの大きなバイナリデータには非効率です。この方式はテキストや制御指示のメッセージだけに使うことを推奨します。大きな映像などは、URLと復号鍵をWebSocketのJSONメッセージで送り、受信者がHTTPSなどの別のプロトコルでダウンロードして復号することを提案します。

将来は、伝送効率の問題に対応するWebSocket上のバイナリプロトコルを設計する予定です。

## 7. まとめと展望

本方式はDIDに基づくE2EE通信を提案します。TLSやブロックチェーンなどの高安全性技術を組み合わせ、DIDに基づく短期鍵合意を設計しました。両端利用者の安全な通信を確保し、第三者による許可のない平文アクセスを防ぎます。

具体的には、WebSocketの上でE2EE通信を実装し、ECDHEで短期鍵を合意して、仲介を通じて転送しても第三者が復号できないようにします。暗号通信、短期鍵合意、`SourceHello`・`DestinationHello`・`Finished`の生成と検証を含むプロトコル定義を説明しました。

現在の版は既存基盤を使うためWebSocketに基づきますが、将来はTCPやUDPの伝送層を用いたE2EE方式を導入し、効率と適用範囲を高める予定です。

異なるプラットフォームの利用者間で安全かつ効率的に暗号化通信し、分散型ID認証の信頼できる技術基盤を提供することを目指します。今後は既存プロトコルの最適化、安全性機能の追加、用途の拡大に取り組みます。


## 著作権表示
Copyright (c) 2024 ANP Community  
このファイルは[MITライセンス](../../deprecated/LICENSE)で公開されています。自由に使用・変更できますが、この著作権表示を保持する必要があります。
