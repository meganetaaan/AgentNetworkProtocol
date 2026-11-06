> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [deprecated/04-end-to-end-encrypted-communication-technology-protocol-based-on-did.md](../../deprecated/04-end-to-end-encrypted-communication-technology-protocol-based-on-did.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# エンドツーエンド暗号化された通信技術プロトコルに基づく

## 1. 背景:

エンドツーエンド暗号化(E2EE)は、送信者と受信者の間で情報が暗号化され、インターネットサービスプロバイダ、マンインザミドル攻撃者、およびサーバー自体を含む第三者によるプレーンテキストコンテンツへの不正なアクセスを防ぐための通信を暗号化する方法です。

で に の に の に の に の に の に の に の に の に の に の に の に は の に の に の に の に の に の に の に の に の に の に の と い す の に の は ? [エージェントネットワークプロトコル技術ホワイトペーパー](01-AgentNetworkProtocol%20Technical%20White%20Paper.md)DIDに基づくエンドツーエンドの暗号化通信技術を提案しました。 このドキュメントでは、その技術の実装固有の詳細を説明します。

## 2. ソリューション概要

このソリューションは、TLSやブロックチェーンなどの高セキュリティ技術を活用し、実践的に検証されています。 これらの技術の組み合わせにより、DIDに基づくエンドツーエンド暗号化通信方式を採用し、2つの異なるプラットフォームでユーザー間の安全な暗号化通信に適しています。

弊社では、WebSocketプロトコルのトップにあるDIDベースのメッセージルーティング機構と短期キーネゴシエーションメカニズムをセットしました。 DIDを保持する当事者は、DID文書と独自の秘密鍵で公鍵を使用することができます。 ECDHE(エリプティックカーブディフィールマンエフェメラルド)を使用して短期キーの交渉を実行します。 続いて、メッセージは、その有効期間内のネガティブキーを使用して暗号化され、安全な通信を保証します。 ECDHEは、サードパーティのメッセージプロキシのような仲介を通じてメッセージを転送しても、悪意のある暗号化はできません。

インターネット上で広く使用されているため、WebSocketプロトコルを選択し、利用可能なインフラが多岐に渡り、ソリューションの早期導入に不可欠です。 また、WebSocketの上部にあるエンドツーエンド暗号化方式を設計しているため、冗長暗号化と復号化プロセスを回避するWebSocket Secureプロトコルを使用する必要はありません。

弊社の現在のソリューションは、アプリケーションレイヤー暗号化を使用してトランスポート層の暗号化を交換します。 プロトコルの採用が困難に陥りながら、既存のインフラを活用します。

全体的なプロセスは、次の図で示されます。

![エンドツーエンド暗号化](../../images/end-to-end-encryption-process.png)

**注意:** サードパーティのメッセージサービスは存在しません。ユーザーは独自のメッセージサービスを利用することができます。

現在、双方向プロトコルであるため、WebSocketプロトコルのみをサポートしています。 今後、HTTPプロトコルをサポートし、より多くのシナリオに拡大する予定です。 また、輸送層でのエンドツーエンド暗号化方式の導入を検討し、より多くのシナリオでの使用を有効にします。

## 3. 暗号化されたコミュニケーション プロセス

2つの異なるプラットフォームからユーザーが存在すると仮定すると、A(DID-A)とB(DID-B)の1つが1つである。 A と B の両方が、それぞれにそれぞれのパブリックキーを含む DID SERVER から DID 文書を取得できます。

暗号化された通信を実行するには、AとBは、短期鍵作成プロセスを開始する必要があります。 短期鍵を作成するプロセスは、TLS が一時的な暗号化キーを生成する方法と似ています。 このキーは有効期間を持ち、期限が切れる前に、鍵の生成と更新を行うための短期鍵作成プロセスを再開始する必要があります。

A と B が交渉された短期キーを保持したら、A が B にメッセージを送信したい場合、キーを使用してメッセージを暗号化し、メッセージサーバーを通じてプロトコルを送信して B に送ることができます。 メッセージを受信すると、B はメッセージ内のキー ID を使用して、保存された短期鍵を見つけて暗号化されたメッセージを復号化します。 対応するキーが見つからなかったり、期限が切れてしまった場合は、A にエラーメッセージが送信され、短期鍵の更新プロセスが開始されます。 短期鍵の更新後、再度メッセージが届きます。

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

## 4. 短期キー交渉プロセス

短期鍵を作成するプロセスは、ELLHE(エリプティックカーブ・ディフィールマン・エフェメラルド)を使用して、TLS 1.3の主要交換プロセスと類似しています。楕円曲線に基づく主要な交換プロトコルです。 暗号化キーとエピヘムアルキーを組み合わせた、非安全なネットワーク上での暗号化キーを安全に交換する、エリプト曲線暗号法(ECC)を組み合わせたDiffie-Hellman鍵交換プロトコルのバリエーションです。

### ECDHEプロセスの短い記述:

1. **主要な組の生成:**
   - クライアントとサーバーの両方が、プライベートキーや公開鍵を含む一時的な楕円曲線キーペアを生成します。

2. **公共のキー交換:**
   - クライアントは生成された公開鍵をサーバーに送信します。
   - サーバは生成された公開鍵をクライアントに送信します。

3. **共有秘密の計算:**
   - クライアントは、共有秘密を計算するために、そのプライベートキーとサーバーの受信した公開鍵を使用します。
   - サーバは、秘密鍵とクライアントの受信した公開鍵を使用して共有秘密を計算します。
   - 楕円曲線のDiffie-Hellmanアルゴリズムの特性上、両計算は同じ共有秘密になります。

### TLSプロセスの違い:

- プロセス全体に3つのメッセージのみが含まれます。 `SourceHello`, `DestinationHello`と `Finished`, TLS 対応 `ClientHello`, `ServerHello`と `Finished`. . . クライアントとサーバーの代わりにソースと宛先のみがプロセスに含まれています。
- ほかのメッセージ `EncryptedExtensions`, `Certificate`と `CertificateVerify` 必要ありません。 具体的に:
  - `EncryptedExtensions` 現在、暗号化拡張機能の送信は不要ですが、後で追加して頂く場合がございます。
  - `Certificate` とりあえず `CertificateVerify` これらのメッセージは、主にサーバーの公開鍵が安全であることを確認するため、不要なです。 DIDアドレスと公鍵関係により、DIDの対応する公開鍵の正しさを検証します。各DIDは、公正なキーとその逆に正確に1つのパブリックキーに対応しています。
- `Finished` もはやハッシュをなくし、ハンドシェイクメッセージを暗号化するので `SourceHello` とりあえず `DestinationHello` 既にメッセージの完全性を保障する署名を含み。
- `Source` とりあえず `Destination` 複数の短期鍵の交渉を同時に開始できるので、異なる種類のメッセージを暗号化すると同時に複数のキーが同時に存在できるようにします。

### 全体的なプロセス図:

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

## 5. プロトコル定義

プロトコルは、WebSocketに基づいて設計され、JSON形式を使用します。 DID ユーザのメッセージ受信アドレスは、エンドポイントタイプで「サービス」フィールドの下に DID ドキュメントに保存されます。 `messageService`. . . (DID の全ての方法設計仕様書を参照)

### 5.1 SourceHello メッセージ

とりあえず `SourceHello` 暗号化された通信ハンシェイクを開始するためにメッセージが使用されます。 ソースのアイデンティティ情報、公開鍵、サポートされている暗号化パラメータ、セッションID、バージョン情報、メッセージの完全性および認証を確保するためのメッセージ署名を含みます。

**メッセージの例:**
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

- **コンテンツ**: 文字列、現在のプロトコルのバージョン番号。
- **型 号**: 文字列、メッセージタイプ、例えば「SourceHello」。
- **タイムスタンプ**: メッセージを送信する時間、ISO 8601はミリ秒の精密とUTCタイムスタンプをフォーマットしました。
- **メッセージID**: 独自のメッセージID、16文字のランダム文字列。
- **sessionId セッション**: 文字列、セッションID、16文字のランダムな文字列、単一短期セッション交渉内で有効。
- **ソースID**: 文字列、メッセージのソース、すなわち送信者のDID。 常に送信者のIDを
- **目的地ディッド**: 文字列、宛先終了、すなわち、受信機のDID。 常に受信機のDID。
- **検証方法**: 送信者の公開鍵は、DID に対応する。
  - **id の**: 文字列、認証方法ID。
  - **型 号**: 文字列、DID 仕様で定義する公開鍵の種類。
  - **パブリックキーレックス**: 文字列、公開鍵の16進数表現。
- **ランダム**: 文字列、32文字のランダムな文字列で、ハンドシェイクプロセスのユニークさを確保し、キー交換に参加します。
- **サポートバージョン**: 送信者がサポートするプロトコルバージョンのリストであるArray。
- **CIpherSuites(シーファースイート)**: サポートされている暗号スイートのリストであるArray。 現在、TLS 対応のサポート_ツイート_128_ギムス_SHA256.
- **支援グループ**: 配列、サポートされた楕円曲線グループのリスト。
- **キーシェア**: 配列は、複数の公開鍵交換情報を含む。
  - **団体名**: 弦、楕円曲線グループが使われます。 secp256r1 は、現在サポートしています。
  - **キー交換**: 文字列、送信者によって生成されたキー交換に使用される公開鍵の16進数を表す。
  - **有効期限**: 数値、秒単位で最終暗号化キーの有効期間。 重要な満了による交渉の失敗を防ぐため、他の当事者に妥当性期間を伝達します。
- **証拠の証拠**:
  - **型 号**: 文字列、署名の型。
  - **作成者**: 文字列、署名の作成時間、ISO 8601は、2番目の精度でUTCタイムスタンプをフォーマットしました。
  - **検証方法**: 署名に使用する検証方法のID、トップレベルを参照 `verificationMethod` フィールド。
  - **プルーフバリュー**: 送信者の秘密鍵を使用してメッセージの署名、メッセージの完全性を確保します。

#### 5.1.2 証拠の生成プロセス

1. **あらゆる分野を構成 `sourceHello` インフォメーション**, 除外する `proofValue` フィールドの `proof` 辞書。
2. **メッセージを変換することなく `proofValue` JSON 文字列へ**commasとコロンを分離器として使用して、キーをソートします。
3. **JSON 文字列を UTF-8 バイトにエンコードする**.
4. **ECDSA アルゴリズムと SHA-256 のプライベートキーを使用してバイトデータを署名する**.
5. **生成されたシグネチャ値を生成した値を、 `proofValue` フィールドの `proof` JSON メッセージの辞書**.

**Python の例:**
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

#### 5.1.3 SourceHelloメッセージの検証

1. **メッセージのパース**: 受信機は、 `SourceHello` 各フィールドをメッセージと抽出します。
2. **DIDとパブリックキーの検証**: 読む `sourceDid` と、公鍵から `verificationMethod`. . . DID のすべてのメソッド設計仕様で定義されている DID 生成方法を使用して、パブリックキーから DID を生成し、それが一致していることを確認します。 `sourceDid`.
3. **署名を確認する**: 対応する公開鍵を使用する `sourceDid` 署名を検証する `proof` フィールド。
4. **他のフィールドを検証**: ランダム性をチェック `random` 再再生攻撃を防ぐためのフィールド。 チェック `created` 署名時刻が期限切れになったことを確実にするために、証拠のフィールド。

### 5.2 宛先ヘロ メッセージ

とりあえず `DestinationHello` 重要な交換ハンスケークを開始するために、宛先からメッセージが送信されます。 宛先のアイデンティティ情報、公開鍵、交渉された暗号化パラメータ、セッションID、バージョン情報、メッセージの完全性と認証を確保するためのメッセージ署名を含みます。

**メッセージの例:**
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

フィールドの領域 `DestinationHello` メッセージをよく似ているのは、 `SourceHello` 連絡する 重要な違いは以下を含みます。

- **選択バージョン**: 選択したプロトコルバージョン番号。
- **CIpherSuite(シーファースイート)**: 選択した暗号スイート。 現在、TLS 対応のサポート_ツイート_128_ギムス_SHA256.
- **キーシェア**:
  - **団体名**: 弦、楕円曲線グループが使われます。 secp256r1 は、現在サポートしています。
  - **キー交換**: 文字列、宛先によって生成されたキー交換に使用される公開鍵の16進数表現。
  - **有効期限**: 番号、宛先によって設定されたキーの有効期間。 有効期間が経過した値を超えた場合 `SourceHello`、キーの交渉者は、引き続き独自の有効期間を使用し、その妥当性期間が期限切れた後、この鍵で暗号化されたメッセージを受け取りを拒否し、交渉を再開するためのエラーを送信することができます。

**メッセージの例:**
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

### 5.3 完了メッセージ

TLS 1.3では、TLSのコンテンツ `Finished` メッセージは、HMAC(ハッシュベースメッセージ認証コード)で処理されたすべてのハンドシェイクメッセージのハッシュです。これにより、両当事者のハンズレイクメッセージが改ざんされていないことを確実にし、再プレイ攻撃を防ぎます。

プロセスでは、 `sourceHello` とりあえず `destinationHello` メッセージは署名を運ぶので、メッセージが改ざんできないようにします。 第一次目的 `Finished` 攻撃を再生するのを防ぐため、プロセス内のメッセージは、そのプロセスで行われます。 具体的には、両方のランダムな数字を連結します `sourceHello` とりあえず `destinationHello` メッセージは、キー ID を取得するためにそれらをハッシュし、このキー ID を交渉されたキーに暗号化し、それに含まれている `Finished` 連絡する メッセージの復号化により、キー ID が一致しているかどうかを検証でき、再再生攻撃を防ぐことができます。

**メッセージの例:**
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

- **コンテンツ**: 文字列、現在のプロトコルのバージョン番号。
- **型 号**: 文字列、メッセージタイプ。
- **タイムスタンプ**: メッセージを送信する時間、ISO 8601はミリ秒の精密とUTCタイムスタンプをフォーマットしました。
- **メッセージID**: 独自のメッセージID、16文字のランダム文字列。
- **sessionId セッション**: 文字列、セッションID、使用 `sessionId` から `sourceHello` 連絡する
- **ソースID**: 文字列、メッセージのソース、すなわち送信者のDID。 常に送信者のIDを
- **目的地ディッド**: 文字列、宛先終了、すなわち、受信機のDID。 常に受信機のDID。
- **認証データ**: 検証データ AES-GCMモードは `iv` とりあえず `tag`.
  - **イーブ**: 初期化ベクトル、ランダムまたは擬似ランダムバイトのシーケンス、通常、AES-GCMモードの12バイト(96ビット)。
  - **ツイート**: AES-GCM モードによって生成された認証タグは、データの完全性と信頼性を検証するために使われます。 通常 16 バイト (128 ビット).
  - **暗号テキスト**: 暗号化されたデータを、短期暗号化キーIDを保有 詳細な生成方法については、5.2.3.2節を参照してください。

#### 認証データを生成するための 5.3.2 方法

交渉された短期暗号化キーを使用して次のJSONを暗号化して取得します `ciphertext`:

```json
{
    "secretKeyId":"0123456789abcdef"
}
```

**Python の例:**
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

`secretKeyId` 短期暗号化キー ID は、 `sourceDid` とりあえず `destinationDid`. . . 暗号化されたメッセージを送る際、暗号化のためにどのキーが使用されるかを示すためにこのキーIDが含まれている。 鍵 ID は、キーの有効期間内でのみ有効で、鍵が切れる時に破棄しなければなりません。

**secretKeyId を生成する方法:**

1. **サブカテゴリー** ランダムな数字から `sourceHello` とりあえず `destinationHello` 単一の文字列に、 `sourceHello` 最初と `destinationHello` 分離器なしで2番目に、。
2. **文字列をエンコードする** UTF-8 を使用してバイトのシーケンスに。
3. **初期化HKDF (HMACベース抽出物および実証キーの派生機能)** ハッシュアルゴリズム、塩(デフォルト)、空のコンテキスト情報としてSHA-256を使用。 **Python の例:**

    ```python
    hkdf = HKDF(
        algorithm=hashes.SHA256(),  # Ensure using the hash algorithm instance from the cryptography library
        length=8,  # Generate an 8-byte key
        salt=None,
        info=b'',  # Optional context information to distinguish keys for different purposes
        backend=default_backend()  # Use the default cryptographic backend
    )
    ```

4. **8バイトのシーケンスを生成** 利用する `derive` 入力バイトのシーケンスからHKDF の方法。
5. **派生した8バイトのシーケンスをエンコードする** 16文字の16文字の16進数文字列に、 `secretKeyId`.

**secretKeyId を生成する Python の例:**
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

#### 5.3.3 完了メッセージの確認

交渉された短期暗号化キーを使用して、メッセージ内の暗号化されたデータを解読し、抽出します `secretKeyId`. . . ローカル生成されたマッチを検証する `secretKeyId`.

### 5.4 短期暗号化キーの生成方法

ソースと目的地の両方が両方所有したら `sourceHello` とりあえず `destinationHello`短期暗号化キーを計算することができます。

短期鍵を作成するプロセスは、ELLHE(エリプティックカーブ・ディフィールマン・エフェメラルド)を使用して、TLS 1.3の主要交換プロセスと類似しています。楕円曲線に基づく主要な交換プロトコルです。

1. **他のパーティーの公開鍵を入手:**
   - 相手の楕円曲線のパブリックキーを六角形の文字列から抽出します()`keyExchange`).

2. **共有秘密を生成します。:**
   - ローカルの秘密鍵と他のパーティーの公開鍵を使用して、ECDH(エリプティックカーブディフィー・ヘルマン)アルゴリズムを介して共有シークレットを生成します。 これにより、両当事者は、プライベートキーを直接送信することなく同じ共有シークレットを計算することができます。

3. **主長さを決定して下さい:**
   - 選択した暗号スイートに基づいて、必要な暗号化キーの長さを決定します。 例えば、TLS_ツイート_128_ギムス_SHA256は128ビット(16バイト)のキー長に対応しています。

4. **暗号化と復号化キーを生成します。**
   - **HKDFの抽出段階を初期化して下さい:**
     - まず、指定されたハッシュアルゴリズム(SHA-256)と初期塩値(全ゼロバイト)でHKDF抽出器を初期化します。 HKDF抽出器は、共有秘密から擬似主を導き出すために使用されます。
   - **エキスのPseudorandomのキー:**
     - HKDF抽出フェーズで、共有秘密を抽出したキーに変換します。 この抽出されたキーは、後続のキーを導き出すための基礎として機能します。
   - **ハンドシェイクトラフィックキーを生成します。**
     - ソースと宛先ハンドシェイクキーを生成します。 これらのキーは、抽出されたキー、特定のラベル(「s ap Traffic」と「d ap Traffic」)を組み合わせ、連結されたランダム文字列をから結合します。 `sourceHello` とりあえず `destinationHello`.

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

   - **実際のハンドシェイクキーを生成するために拡大します。**
     - HKDF拡張フェーズを使用して、ハンドシェイクのトラフィックキーから実際の暗号化キーを導き出します。 このプロセスは、HKDF ラベル(「キー」)と目的のキーの長さを使用します。

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

## 6. 制限事項

現在のソリューションには、制限がいくつかあります。 例えば、暗号化されたデータはWebSocket上でJSONとして送信されます。 大量のバイナリデータが送信されると、効率が低い。 テキストのみで使用して、指示メッセージを制御することをお勧めします。 映像ファイルのような大きなバイナリデータでは、WebSocket JSON メッセージを介してビデオのURLと復号化キーを送信することをお勧めします。 受信機は、HTTPSなどの別のプロトコルを介してビデオファイルをダウンロードし、それを復号化することができます。

今後、WebSocketに基づくバイナリプロトコルをデータ伝送効率の問題に取り組む予定です。

## 7. 概要と展望

DIDに基づくエンドツーエンド暗号化通信技術を提案します。 TLSやブロックチェーンなどの高セキュリティ技術を組み合わせることで、DIDベースの短期鍵交渉機構を設計しました。 これにより、利用者同士の双方のエンド間の安全な通信が確保され、第三者が不正な文脈コンテンツにアクセスできないよう防止します。

具体的には、WebSocketプロトコルの上部にあるエンドツーエンド暗号化された通信を実行し、短期鍵交渉のためにECDHE(エリプティックカーブ・ディフィールマン・エフェメラルド)を利用することで、そのメッセージがインターメディアを通じて転送しても復号化できないようにします。 暗号化された通信プロセス、短期鍵交渉プロセス、およびプロトコル定義の詳細を記載しています。 `SourceHello`, `DestinationHello`と `Finished` メッセージ。

現在のバージョンは、既存のインフラを活用するためのWebSocketプロトコルに基づいていますが、今後TCPやUDPの輸送層に基づいてエンドツーエンドの暗号化方式を導入し、伝送効率とアプリケーションスコープをさらに高める予定です。

このスキームでは、異なるプラットフォームでユーザー間で安全で効率的な暗号化通信を実現し、分散型アイデンティティ認証のための信頼できる技術基盤を提供します。 将来の作業には、既存のプロトコルの最適化、セキュリティ機能の追加、およびより多くのアプリケーションシナリオへの拡張が含まれます。


## コンテンツの著作権について
社会貢献活動の推進に関する基本方針 _ ANPコミュニティ
このファイルは、以下のとおりです。 [MITライセンス](../../deprecated/LICENSE). . . 無料で利用して変更することができますが、この著作権表示を保ちなければなりません。
