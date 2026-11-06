> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [chinese/deprecated/04-基于did的端到端加密通信技术协议.md](../../../chinese/deprecated/04-基于did的端到端加密通信技术协议.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# id-to-end暗号化通信プロトコルに基づく

## 1. 背景:

エンドツーエンド暗号化通信(エンドツーエンド暗号化、ショートE2EE)は、送信者と受信終了の間の伝達中に情報が暗号化され続けることを確実にするために、通信を暗号化する手段であり、これにより、不正なコンテンツが第三者にアクセスされるのを防ぐことができます(ネットワークサービスプロバイダ、仲介者、サーバー自体を含みます)。

あり。[エージェントネットワークプロトコル技術ホワイトペーパー](01-AgentNetworkProtocol技术白皮书.md)テキストの1つで、DIDベースのエンドツーエンド暗号化通信技術を提案し、この技術が達成される方法について詳しく説明します。

## 2. プログラムの概要

プログラムは、TLS、ブロックチェーンなどの練習で既にテスト済みの高セキュリティ技術に引き込まれています。これらの技術は組み合わされ、DIDベースのエンドツーエンド暗号化通信プログラムが2つの異なるプラットフォームのユーザー間の安全な暗号化通信のために設計されています。

当社は、ID の当事者が DID ファイル内の秘密鍵を使用できる Websocket 合意と短期キー協議に基づいてニュース ルーターを設計しました。また、ECDHE (Elliptic Curve Diffie-Hellman Ephemeral) を使用して、鍵の有効期間中に重要なメッセージの暗号化による通信を確保します。ECDHE は、そのような情報が、Triangular Agent などの不正な通知であっても、その情報が偽りなく侵害されることを保証します。

インターネット上で非常に広く使用されているため、Websocketプロトコルを選択し、早期の拡張に不可欠である利用可能なインフラの大きな取引があります。 同時に、再分類の問題が回避されるように、Websocketセキュリティ協定を再び使用する必要はありません。

弊社の現在のプログラムは、既存のインフラに基づく合意を促進しやすくなる、アプリケーションレベルの暗号化で送信レイヤーの暗号化を置き換えることに不可欠です。

全体的なプロセスは以下に示されます:

![エンドツーエンド暗号化](../../../images/end-to-end-encryption-process.png)

コメント: メッセージサービスには3人のパーティーが存在しないため、ユーザーは自分のニュースサービスを使用することができます。

今後、Websocketの合意は2方向の合意であり、今後 http プロトコルのサポートを検討するからです。また、トランスファーレベルにエンドツーエンド暗号化プログラムが達成されるため、より多くのシーンで使用できることを検討します。

## 3. 暗号化された通信プロセス

プラットフォームの2人の場合、A(DD-A)、B(ID-B)、A、Bは、DIDの各ドキュメントにアクセスでき、また、文書には公開鍵が含まれている。

暗号化された通信を行うには、AとBは短期鍵プロセスの作成を開始する必要があります。短期鍵を作成するプロセスは、TLSの一時的な暗号化用に類似しています。これは1つの有効期間を持ち、その周辺で期限切れになる前に短期鍵プロセスの作成を再起動し、新しいキーを生成して更新する必要があります。

A と B が交渉される短期鍵を持っているとき、A はメッセージを B に送信したい場合、メッセージの送信プロトコルを使用して B にメッセージを送信できます。メッセージサービスによって、メッセージ送信プロトコルを経由してメッセージを送ることができます。B の受領後、保存された短期キーは、メッセージ内のキー ID に従って発見され、暗号化されたメッセージは復号化されます。対応するキーが見つからなかったり、キーが期限切れてしまった場合は、間違ったメッセージが送信され、A を短期間にわたって更新し、鍵が更新された後にキーを更新したことを通知します。

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

## 4. 短期キー相談プロセス

短期鍵作成プロセスは、EDCHE(エリプト・カーブ・ディフィールマン・エフェメラルド)を使用して、TLS1.3の暗号化キー交換に本質的に類似しています。これは、Diffie-Hellmanの主要交換プロトコルのバリエーションに属している楕円曲線に基づく重要な交換合意です。これにより、暗号化キーの安全な交換のための一時的なキー(Ephemeral Key)と楕円曲線パスワード(ECC)を組み合わせ、通信ネットワークの確保を実現します。

CCDHEプロセスの簡単な説明:

1. 主組の生成:
  - クライアントとサーバーは、プライベートキーや公開鍵を含む一時的な楕円曲線キーペアをそれぞれ生成します。

2. 公共のキー交換:
  - クライアントは、サーバーに生成する公開鍵を送信します。
  - サーバはクライアントに生成する公開鍵を送信します。

3. 共有鍵の計算:
  - クライアントは、共有キーを独自の秘密鍵とサーバーから送信される公開鍵を使用して計算します。
  - サーバは、共有キーをクライアントから送信する秘密鍵と公開鍵を用いて計算します。
  - これらの2つの計算の結果は、Diffie-Hellmanアルゴリズムの性質上同じ共有キーです。

プロセスは TLS プロセスと異なっています:

- TLSの ClientHello と SeverHello に相当する、SonceHello、Detininghello、Finished は3つのメッセージのみが利用できます。当社のプロセスではクライアントやサービスがないので、ソースと目的だけではありません。

- EnrichptedExtensions、証明書、証明書などの他のソースは必要ありません。
  - 暗号化された拡張子は、時間内に利用できませんが、暗号化拡張機能のパスに追加される場合があります。
  - 証明書、証明書の確認は不要です。これらのメッセージの主な目的は、サービスの公開鍵が安全であることを保証することですので、対応するDIDアドレスと公鍵の手段によって、DID-to-publicキーの正しさを検証します。これは、1つのパブリックキーで決定されるためであり、1つのDIDのみです。1つのDIDは、その鍵が1つだけあることを判断します。

- 署名がすでにSourseHelloとDestinyhelloに含まれているため、ハングークをハスリングして暗号化しなくなったので、メッセージの完全性を保証します。

- Source and Destination は複数の短期鍵の相談を同時に起動でき、さまざまな種類のメッセージ暗号化で使用できるキーがいくつかあります。

フローチャート全体は以下の通りです。
```plaintext
Client (A)                                          Server (B)
   |                                                    |
   |  ---------------- SourceHello ---------------->    |
   |                                                    |
   |                  (包含公钥和签名)                    |
   |                                                    |
   |                                                    |
   |  <------------- DestinationHello ------------      |
   |                                                    |
   |                  (包含公钥和签名)                    |
   |                                                    |
   |                                                    |
   |  -------- Finished (包含verify_data) ------->       |
   |                                                    |
   |  <-------- Finished (包含verify_data) --------      |
   |                                                    |
   |                                                    |
```

## 5. 契約定義

弊社の合意は、Websocket design, json フォーマットに基づいています。DID ユーザーのメッセージ受信アドレスは、メッセージサービス用のエンドポイントの「サービス」タイプで DID ドキュメントに保存されます。(DD メソッドデザインコードを参照してください)

### 5.1 SourceHelloのソース

SourceHello メッセージは、暗号化された通信のハンズケークを起動するために使われます。 ソース識別情報、公開鍵、サポートされている暗号化パラメータ、セッションID、バージョン情報、およびメッセージの署名が含まれて、その完全性と認証を保証します。

メッセージ例
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

- version: 文字列、現在のプロトコルに使われるバージョン番号。
- type: 文字列、"SourceHello" などのメッセージタイプ。
- Timestamp: ISO 8601形式のUTC時間文字列、ミリ秒単位で送信されたメッセージ
-  messageId: メッセージの正式な、16個のランダム文字列
- セッションId:文字列、セッションID、16ビットのランダムな文字列は、短期セッション協議で有効
- SourceDID は文字列のソースで、常に送信者 ' s 自身の DID に埋めます。
- DestinyDid: 文字列、目的の終了は、メッセージの受信者の DID です。これは常にここに記入されます。
- ServiceMethod: 送信者への公開鍵 ' s 独自の DID
  - Id: 文字列、バリデーションメソッド
  - type: 文字列、公開鍵の種類、DID 仕様定義を参照してください。
  - PublicKeyHex: 文字列, 公共鍵の16進数として表現.
- (a) 鍵交換は、キー交換です。
- サポートされているバージョン: array、 send-end でサポートされるプロトコルのリスト。
- Cipher Suites: array、サポートされている暗号化パッケージのリスト。 TLS の現在のサポート_ツイート_128_ギムス_SHA256。
- 対応グループ:配列、サポートされた楕円曲線グループ。
- KeyShares: 複数のキーと交換された公開鍵情報を含む配列。
  - グループ: 文字列, 楕円曲線グループを使用して. 現在のサポート secp256r1
  - KeyExchange: 文字列は、この端で16桁のキー交換公開鍵を生成します。
  - 終了: 数値、最終暗号化キーを生成するための有効な期間 = 秒単位。 有効性のミューチュアル通知は、協議の失敗に結果はありません
- 証拠:
  - type: 文字列、署名の種類。
  - 作成:ISO 8601の文字列、署名作成時間、UTC時間の文字列、正確秒単位。
  - VerificationMethod: 署名に使用される認証方法の ID です。 json レベル I フィールドが id を検索して検証メソッドを id に検索します。
  - 証拠: SourceDid の秘密鍵を使用してメッセージを署名して、その完全性を確保します。

#### 5.1.2 証拠を生成するためのプロセス
- sourceHello のすべてのフィールドを、校正の ProofValue フィールド以外のメッセージに構成します。
- jsonをJSON文字列に変換し、コンマとコロンを分離器として使用して、キーでソートします。
- JSON 文字列を UTF-8 バイトにエンコードします。
- EcdsaSecp256r1Signature2019 および SHA-256HY アルゴリズムを使用して、バイトデータが署名されます。
- 結果のシグネチャ値の ProofValue をメッセージ json 辞書の ProofValue フィールドに追加します。

```python
# 1. 创建json消息的所有字段，排除proofValue字段
msg = {
    # 其他必要的字段
    "proof": {
        "type": "EcdsaSecp256r1Signature2019",
        "created": "2024-05-27T10:51:55Z",
        "verificationMethod": "did:example:123456789abcdefghi#keys-1"
        # proofValue 字段除外
    }
}

# 2. 将msg转换为JSON字符串，按键排序，并使用逗号和冒号作为分隔符
msg_str = JSON.stringify(msg, separators=(',', ':'), sort_keys=True)

# 3. 将JSON字符串编码为UTF-8字节
msg_bytes = UTF8.encode(msg_str)

# 4. 使用私钥和ECDSA算法对字节数据进行签名
signature = ECDSA.sign(msg_bytes, private_key, algorithm=SHA-256)

# 5. 将签名值添加到json消息的proof字段中
msg["proof"]["proofValue"] = Base64.urlsafe_encode(signature)
```

#### SourceHello メッセージの 5.1.3 検証

1. メッセージの解析: SouceHello メッセージを解析する受信機, フィールドを抽出.
2. 有効な DID とパブリック キー: sourceDid と serviceMethod の公開鍵を読み込み、DID メソッドを使用して、public キーで DID を生成することで、 SourceDid と一貫性のあるかどうかを確認します。
3. 署名を検証: sourceDid に対応するパブリックキーを使用して、証拠フィールドのシグネチャが正しいかどうかを確認します。
4. 他のフィールドを確認します。ランダルフィールドのランダム性をチェックして、再生攻撃を防止します。 署名が期限切れていないことを確認するために、プレオブの所定のフィールドを確認してください。

### 5.2 デスティネテッロニュース

DestiningHelloは、目的の最後に送信されたキー交換のためのハンズンメッセージです。これにより、目的のアイデンティティ情報、公開鍵、相談、セッションID、バージョン情報、およびメッセージを署名して、その完全性と認証を確実にします。

メッセージ例
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

デスティネッロのフィールドは基本的にソセヘロのものと同じです。

- version: 文字列、現在のプロトコルに使われるバージョン番号。
- type: 文字列、"SourceHello" などのメッセージタイプ。
- Timestamp: ISO 8601形式のUTC時間文字列、ミリ秒単位で送信されたメッセージ
-  messageId: メッセージの正式な、16個のランダム文字列
- セッションId: 文字列、セッションID、sourceHelloメッセージからメッセージを使用する
- SourceDID は文字列のソースで、常に送信者 ' s 自身の DID に埋めます。
- DestinyDid: 文字列、目的の終了は、メッセージの受信者の DID です。これは常にここに記入されます。
- ServiceMethod: 送信者への公開鍵 ' s 独自の DID
  - Id: 文字列、バリデーションメソッド
  - type: 文字列、公開鍵の種類、DID 仕様定義を参照してください。
  - PublicKeyHex: 文字列, 公共鍵の16進数として表現.
- (a) 鍵交換は、キー交換です。
- 自己選択版:選択したプロトコルバージョン番号
- Cipher Suite: 選択された暗号化パッケージ、現在 TLS をサポート_ツイート_128_ギムス_SHA256。
- KeyShare: 目的の最後にキー交換に使用される情報。
  - グループ: 文字列, 楕円曲線グループを使用して. 現在のサポート secp256r1
  - KeyExchange: 文字列は、この端で16桁のキー交換公開鍵を生成します。
  - 期限: 数値、目的の最後に設定されたキーの有効期間。 有効期間が sourceHello でそれを超える場合、キー共著者は自身の有効性を引き続き使用し、キー自身によって設定されたキーの有効期限の後にメッセージを暗号化することを拒否し、協議を再始動させるエラーを送信することができます。
- 証拠:
  - type: 文字列、署名の種類。
  - 作成:ISO 8601の文字列、署名作成時間、UTC時間の文字列、正確秒単位。
  - VerificationMethod: 署名に使用される認証方法の ID です。 json レベル I フィールドが id を検索して検証メソッドを id に検索します。
  - 証拠: SourceDid の秘密鍵を使用してメッセージを署名して、その完全性を確保します。

メッセージ例
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

### 5.3 完成からの情報

TLS1.3では、完成したメッセージの内容は、以前のハンドシェイクのHashi値で、HMAC(HASH ' s メッセージ認証コードに基づく)によって処理され、ハンドシェイクが攻撃の再発を防止するために改ざんされていないことを確実にしました。

プロセスでは、sourceHelloと宛先の両方で、メッセージが改ざんできないようにするために署名を持っています。 プロセスの終了したメッセージの主な役割は、クラッシュ処理の後、ランダムな数字を組み合わせて、キードを与え、受信者に暗号化されることによって、深刻な攻撃を防ぐことです。 この方法は、不正なキー ID が攻撃の再割り当てを防ぐために同一であるかを判断することができます。

メッセージ例
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
- version: 文字列、現在のプロトコルに使われるバージョン番号。
- type: 文字列、メッセージタイプ。
- Timestamp: ISO 8601形式のUTC時間文字列、ミリ秒単位で送信されたメッセージ
-  messageId: メッセージの正式な、16個のランダム文字列
- セッションId: 文字列、セッションID、sourceHelloメッセージからメッセージを使用する
- SourceDID は文字列のソースで、常に送信者 ' s 自身の DID に埋めます。
- DestinyDid: 文字列、目的の終了は、メッセージの受信者の DID です。これは常にここに記入されます。
- VerifyData: データ検証、AES-GCM モードは iv と タグを運ぶ。
  - iv:初期化ベクトル、初期化ベクター、ランダムまたは擬似ランドバイトシリーズ、通常はAES-GCMモードの12バイト(96)。
  - タグ: AES-GMモードは、データの完全性と信頼性を検証するための認証コードを生成します。
  - Ciphertext: 短期暗号化キードでデータを暗号化します。生成の詳細な方法については、 5.3.2 を参照してください。

#### 5.3.2 生成データの検証

プロセス交渉から以下のjsonsの短期暗号化キーを使用して、Tippertextを取得します。

```json
{
    "secretKeyId":"0123456789abcdef"
}
```

VerifyData は、Python コードの例を生成します。

```python
# TLS_AES_128_GCM_SHA256加密函数
def encrypt_aes_gcm_sha256(data: bytes, key: bytes) -> Dict[str, str]:
    # 确保密钥长度为16字节（128位）
    if len(key) != 16:
        raise ValueError("Key must be 128 bits (16 bytes).")
    
    # 生成随机IV
    iv = os.urandom(12)  # 对于GCM，推荐的IV长度是12字节
    
    # 创建加密对象
    encryptor = Cipher(
        algorithms.AES(key),
        modes.GCM(iv),
        backend=default_backend()
    ).encryptor()
    
    # 加密数据
    ciphertext = encryptor.update(data) + encryptor.finalize()
    
    # 获取tag
    tag = encryptor.tag
    
    # 编码为Base64
    iv_encoded = base64.b64encode(iv).decode('utf-8')
    tag_encoded = base64.b64encode(tag).decode('utf-8')
    ciphertext_encoded = base64.b64encode(ciphertext).decode('utf-8')
    
    # 创建JSON对象
    encrypted_data = {
        "iv": iv_encoded,
        "tag": tag_encoded,
        "ciphertext": ciphertext_encoded
    }
        
    return encrypted_data
```

キーは、メッセージが送信されるときに実行されるsourceDidとdestiningDidの間の短期暗号化キーです。このキーは、キーの'sの有効期間のみ有効であり、破棄する必要があります。

キーID(secretKeyId)生成方法:
- sourceHello と originHello のランダムな数字を文字列、sourceHello の前に、estinationHello に崩壊します。
- UTF-8 エンコーディングを使用して文字列をバイトに変換
- HMAC(ハッシュベースメッセージ評価コード)に基づく主要な派生物機能であるHKDF (HMACベースのエクスポートおよびエキスパートキー開発ファンド)を初期化し、橋アルゴリズムとしてSHA-256を設計する。塩値なし、塩分量なしのデフォルト使用;コンテキスト情報空のデフォルトの暗号化バックエンドを使用する; Pythonの執行コード:

```python
hkdf = HKDF(
    algorithm=hashes.SHA256(),  # 确保使用的是cryptography库中的哈希算法实例
    length=8,  # 生成8字节的密钥
    salt=None,
    info=b'',  # 可选的上下文信息，用于区分不同用途的密钥
    backend=default_backend()  # 使用默认的加密后端
)
```

- HKDFのDédiveメソッドを使用すると、入力したバイトから8バイトバイトバイトバイトバイトバイトシリーズを生成できます。
- 文字列から16個の16個の16個の16個の16個の16個の16個の16個の16個の16個の16バイトのシーケンスをエンコードする。

SecretKeyId 生成ステップの Python コード:

```python
from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend

def generate_16_char_from_random_num(random_num1: str, random_num2: str):
    content = random_num1 + random_num2
    random_bytes = content.encode('utf-8')
    
    # 使用HKDF派生8字节的随机数
    hkdf = HKDF(
        algorithm=hashes.SHA256(),  # 确保使用的是cryptography库中的哈希算法实例
        length=8,  # 生成8字节的密钥
        salt=None,
        info=b'',  # 可选的上下文信息，用于区分不同用途的密钥
        backend=default_backend()  # 使用默认的加密后端
    )
    
    derived_key = hkdf.derive(random_bytes)
    
    # 将派生的密钥编码为十六进制字符串
    derived_key_hex = derived_key.hex()
    
    return derived_key_hex
```

#### 5.3.3 完了メッセージの検証
交渉された短期暗号化キーを使用して、暗号化されたデータをメッセージを復号化し、メッセージからsecretKeyIdを抽出し、ローカル生成されたsecretKeyIdと一致するかどうかを決定します。

### 5.4 短期暗号化キーメソッドを生成

ソースとデスティニングの両端が両方のソースと宛先にアクセスできるときに、短期暗号化キーを計算できます。

短期鍵作成プロセスは、ELLPES1.3の暗号化キー交換プロセスに本質的に似ています。楕円曲線に基づく主要な交換プロトコルとして、ECDHE(エリプティックカーブディフィー・ヘレマンエフェメラルド)を使用します。

1. 他の人の公開鍵を入手してください。
  1. ヘリテージの弦(keyExchange)から楕円曲線のパブリックキーを抽出します。
2. 共有秘密を生成します。
  1. ローカルの秘密鍵と他の公開鍵を使用して、ECDHアルゴリズムを介して共有シークレットを生成します。 このステップは、両方の当事者が秘密の同じ共有を直接転送することなく計算することができることを保証します。
3. 主長さを定める:
  1. 選択したパスワードパッケージ(暗号スーツ)に基づいて生成する必要がある暗号化キーの長さを決定します。例えば、TLS_ツイート_128_ギムス_SHA256に対応したキーの長さは128(16バイト)です。
4. 暗号化と復号化キーの生成
  1. HKDF抽出フェーズの初期化:
    1. まず、HKDF抽出器は指定された橋のアルゴリズム(SHA-256)と初期塩値(フルバイト)を用いて初期化されます。 HKDF抽出器は、共有秘密から偽の秘密鍵を抽出するために使われます。
  2. 偽の秘密鍵を抽出する:
    1. 共有秘密は、HKDF抽出フェーズを介して出金キーに変換されます。 抽出キーは、キーのその後の配信のための基礎として機能します。
  3. ハンドシェイクキーを生成します。
    1. ソースと宛先のハンドシェイクキーを生成します。 これらのキーは、抽出キー、特定のラベル(「sap traffec」および「dap Traffic」)とソースと目的の端のランダムな文字列融合を組み合わせます。

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

4. 実際の暗号化キーを生成するために拡大します。
    1. HKDF拡張機能を使用して、より実践的な暗号化キーをハンズクから生成します。このプロセスはHKDFラベル(「キー」)とスピンオフキーの長さを使用します。

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

たとえば、暗号化されたデータは、Websocket上でjson経由で送信されるというような、現在のスキームには制限があります。これは、ビデオファイルなどの大きなバイナリデータが送信される場合に非効率的です。テキストとコマンド制御の伝送だけをお勧めし、ビデオファイルなど、大バイナリの場合、Websocketでjsonにビデオファイルを送信するURLや、他のプロトコルを介してビデオファイルをダウンロードしたり、httpsのような他のプロトコルを介してビデオファイルをダウンロードしたり、それらを復号化したりすることをお勧めします。

後段でデータ転送効率の問題に対処するために、websocketに基づいてバイナリ形式プロトコルを設計します。

## 7. 概要と展望

DIDベースの暗号化通信技術を提案するプログラムです。短期DIDベースのキーコンサルテーション機構は、TLSやブロックチェーンなどの高セキュリティ技術を組み合わせて設計されており、両端のユーザー間のコミュニケーションのセキュリティを確保し、第三者が不正なコンテンツにアクセスすることを防止します。

具体的には、プログラムはウェブソケットプロトコル上でエンドツーエンド暗号化された通信を達成し、短期鍵の協議のためにECDHE(エリクソンカーブDeffie-Hellman Electronic)を使用して、たとえメッセージが仲介を通じて中継されないようにするために、短期キーの相談をしています。 私たちは、詳細な暗号化通信プロセス、短期キーの相談プロセス、およびプロトコルの定義、SeuceHelloの生成と検証、Designhello、Finishedメッセージを含む。

現在のバージョンは、既存のインフラの使用を容易にするためのWebsocketプロトコルに基づいていますが、将来的にはTCPやUDP転送レイヤーに基づいてエンドツーエンドの暗号化プログラムを導入し、さらにトランスミッションの効率とアプリケーションを改善します。

このパッケージでは、さまざまなプラットフォームのユーザー間で安全で効率的な暗号化された通信を促進し、非集中的な識別のための信頼できる技術的基盤を提供します。フォローアップには、既存の合意の最適化、よりセキュリティ機能の追加、より多くのアプリケーションへの拡張が含まれます。

## 公益社団法人 一般社団法人 日本版著作権協会
社会貢献活動の推進に関する基本方針 _ ANPコミュニティ
この文書の基礎 [MITライセンス](../../../chinese/deprecated/LICENSE) 公開、あなたは自由にこの著作権宣言を使用および変更することができます。  
