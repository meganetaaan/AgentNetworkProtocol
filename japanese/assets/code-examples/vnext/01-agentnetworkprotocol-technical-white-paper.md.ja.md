# vnext/01-agentnetworkprotocol-technical-white-paper.md のコード例・図ラベルの日本語補足

原文: [vnext/01-agentnetworkprotocol-technical-white-paper.md](../../../../vnext/01-agentnetworkprotocol-technical-white-paper.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:135-149/line:3

原文:

````text
Agent A (caller)
````

日本語補足（agent-reviewed）:

````text
エージェントA（呼び出し元）
````

## fence:135-149/line:4

原文:

````text
Search agent or target domain
````

日本語補足（agent-reviewed）:

````text
検索エージェントまたは宛先ドメイン
````

## fence:135-149/line:5

原文:

````text
Agent B (service provider)
````

日本語補足（agent-reviewed）:

````text
エージェントB（サービス提供者）
````

## fence:135-149/line:6

原文:

````text
Agent discovery: search, or read .well-known/agent-descriptions
````

日本語補足（agent-reviewed）:

````text
エージェントの発見：検索、または.well-known/agent-descriptionsの読み取り
````

## fence:135-149/line:7

原文:

````text
Return Agent Description (AD) URLs
````

日本語補足（agent-reviewed）:

````text
エージェント記述（AD）のURLを返す
````

## fence:135-149/line:8

原文:

````text
Read AD and selectively follow links to Information
````

日本語補足（agent-reviewed）:

````text
ADを読み、必要なリンクをたどってInformationを取得
````

## fence:135-149/line:9

原文:

````text
Decide locally using the user's context
````

日本語補足（agent-reviewed）:

````text
利用者のコンテキストを使ってローカルで判断
````

## fence:135-149/line:10

原文:

````text
Invoke Interface with a DID signature (ANP-02 authentication)
````

日本語補足（agent-reviewed）:

````text
DID署名付きでInterfaceを呼び出す（ANP-02認証）
````

## fence:135-149/line:11

原文:

````text
Resolve and validate A's DID Document#59; evaluate permissions independently
````

日本語補足（agent-reviewed）:

````text
AのDID Documentを解決・検証#59; 権限を独立して評価
````

## fence:135-149/line:12

原文:

````text
Return result
````

日本語補足（agent-reviewed）:

````text
結果を返す
````

## fence:135-149/line:13

原文:

````text
Continue through ANP messages (optional E2EE)
````

日本語補足（agent-reviewed）:

````text
ANPメッセージで継続してやり取り（E2EEは任意）
````

## fence:224-246/line:2

原文:

````text
Organization A (a.example)
````

日本語補足（agent-reviewed）:

````text
組織A（a.example）
````

## fence:224-246/line:4

原文:

````text
Agent Alice
````

日本語補足（agent-reviewed）:

````text
エージェントAlice
````

## fence:224-246/line:5

原文:

````text
DID Document<br/>Hosted by Organization A
````

日本語補足（agent-reviewed）:

````text
DID Document<br/>組織Aがホスト
````

## fence:224-246/line:8

原文:

````text
Organization B (b.example)
````

日本語補足（agent-reviewed）:

````text
組織B（b.example）
````

## fence:224-246/line:10

原文:

````text
Agent Bob
````

日本語補足（agent-reviewed）:

````text
エージェントBob
````

## fence:224-246/line:11

原文:

````text
DID Document<br/>Hosted by Organization B
````

日本語補足（agent-reviewed）:

````text
DID Document<br/>組織Bがホスト
````

## fence:224-246/line:14

原文:

````text
Individual developer (c.example)
````

日本語補足（agent-reviewed）:

````text
個人開発者（c.example）
````

## fence:224-246/line:16

原文:

````text
Agent Carol
````

日本語補足（agent-reviewed）:

````text
エージェントCarol
````

## fence:224-246/line:17

原文:

````text
DID Document<br/>Hosted by the developer
````

日本語補足（agent-reviewed）:

````text
DID Document<br/>開発者がホスト
````

## fence:224-246/line:20

原文:

````text
Mutual DID authentication
````

日本語補足（agent-reviewed）:

````text
DIDによる相互認証
````

## fence:224-246/line:21

原文:

````text
Mutual DID authentication
````

日本語補足（agent-reviewed）:

````text
DIDによる相互認証
````

## fence:272-282/line:3

原文:

````text
Binding public key (Ed25519)
````

日本語補足（agent-reviewed）:

````text
バインディング公開鍵（Ed25519）
````

## fence:272-282/line:4

原文:

````text
DID Document: authentication keys, service endpoints, device declarations
````

日本語補足（agent-reviewed）:

````text
DID Document：認証鍵、サービスエンドポイント、デバイス宣言
````

## fence:272-282/line:5

原文:

````text
Signature on each request
````

日本語補足（agent-reviewed）:

````text
各要求への署名
````

## fence:272-282/line:6

原文:

````text
Binding 1: the public-key fingerprint must match the DID
````

日本語補足（agent-reviewed）:

````text
バインディング1：公開鍵のフィンガープリントはDIDと一致しなければならない
````

## fence:272-282/line:7

原文:

````text
Binding 2: sign the document-wide DataIntegrityProof
````

日本語補足（agent-reviewed）:

````text
バインディング2：文書全体のDataIntegrityProofに署名
````

## fence:272-282/line:8

原文:

````text
Binding 3: authorize authentication keys to sign requests
````

日本語補足（agent-reviewed）:

````text
バインディング3：認証鍵に要求への署名を認可
````

## fence:272-282/line:9

原文:

````text
Hosting server
````

日本語補足（agent-reviewed）:

````text
ホスティングサーバー
````

## fence:272-282/line:9

原文:

````text
Cannot produce a valid proof for a modified document without the binding private key
````

日本語補足（agent-reviewed）:

````text
バインディング秘密鍵がなければ、変更した文書の有効な証明を生成できない
````

## fence:316-330/line:3

原文:

````text
Agent A's client
````

日本語補足（agent-reviewed）:

````text
エージェントAのクライアント
````

## fence:316-330/line:4

原文:

````text
Agent B's server
````

日本語補足（agent-reviewed）:

````text
エージェントBのサーバー
````

## fence:316-330/line:5

原文:

````text
Agent A's DID hosting service
````

日本語補足（agent-reviewed）:

````text
エージェントAのDIDホスティングサービス
````

## fence:316-330/line:6

原文:

````text
First HTTP request: Signature-Input, Signature, Content-Digest
````

日本語補足（agent-reviewed）:

````text
初回HTTP要求：Signature-Input、Signature、Content-Digest
````

## fence:316-330/line:7

原文:

````text
Resolve A's DID Document under its method
````

日本語補足（agent-reviewed）:

````text
AのDID Documentを、そのメソッドに従って解決
````

## fence:316-330/line:8

原文:

````text
DID Document
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
DID文書
````

## fence:316-330/line:9

原文:

````text
Validate document (did:wba requires fingerprint and document-proof checks)
````

日本語補足（agent-reviewed）:

````text
文書を検証（did:wbaはフィンガープリントと文書証明の検証が必要）
````

## fence:316-330/line:10

原文:

````text
Check signature coverage, key purpose, time, and replay protection
````

日本語補足（agent-reviewed）:

````text
署名の対象範囲、鍵の用途、時刻、リプレイ防止を確認
````

## fence:316-330/line:11

原文:

````text
Evaluate business permissions independently
````

日本語補足（agent-reviewed）:

````text
業務の権限を独立して評価
````

## fence:316-330/line:12

原文:

````text
Respond and return an access token through Authentication-Info
````

日本語補足（agent-reviewed）:

````text
応答し、Authentication-Infoを通じてアクセストークンを返す
````

## fence:316-330/line:13

原文:

````text
Subsequent requests carry the access token
````

日本語補足（agent-reviewed）:

````text
以降の要求にアクセストークンを含める
````

## fence:373-393/line:2

原文:

````text
Service domain a.example
````

日本語補足（agent-reviewed）:

````text
サービスドメインa.example
````

## fence:373-393/line:4

原文:

````text
Agent Alice
````

日本語補足（agent-reviewed）:

````text
エージェントAlice
````

## fence:373-393/line:5

原文:

````text
Messaging Service A
````

日本語補足（agent-reviewed）:

````text
メッセージングサービスA
````

## fence:373-393/line:8

原文:

````text
Service domain b.example
````

日本語補足（agent-reviewed）:

````text
サービスドメインb.example
````

## fence:373-393/line:10

原文:

````text
Messaging Service B
````

日本語補足（agent-reviewed）:

````text
メッセージングサービスB
````

## fence:373-393/line:11

原文:

````text
Agent Bob
````

日本語補足（agent-reviewed）:

````text
エージェントBob
````

## fence:373-393/line:14

原文:

````text
Service domain c.example
````

日本語補足（agent-reviewed）:

````text
サービスドメインc.example
````

## fence:373-393/line:15

原文:

````text
Group Host<br/>Maintains membership and orders group events
````

日本語補足（agent-reviewed）:

````text
グループのHost<br/>メンバーシップを維持し、グループイベントを順序付ける
````

## fence:373-393/line:17

原文:

````text
Discover messaging service from Bob's DID; deliver direct messages across domains
````

日本語補足（agent-reviewed）:

````text
BobのDIDからメッセージングサービスを発見し、ドメインをまたいで個別メッセージを届ける
````

## fence:373-393/line:18

原文:

````text
Group operations and messages
````

日本語補足（agent-reviewed）:

````text
グループ操作とグループメッセージ
````

## fence:373-393/line:19

原文:

````text
Group operations and messages
````

日本語補足（agent-reviewed）:

````text
グループ操作とグループメッセージ
````

## fence:423-433/line:2

原文:

````text
Expected recipient DID (containing the public-key fingerprint)
````

日本語補足（agent-reviewed）:

````text
期待する受信者のDID（公開鍵のフィンガープリントを含む）
````

## fence:423-433/line:3

原文:

````text
Fingerprint-matched binding public key
````

日本語補足（agent-reviewed）:

````text
フィンガープリントが一致するバインディング公開鍵
````

## fence:423-433/line:4

原文:

````text
DID Document verified through DataIntegrityProof
````

日本語補足（agent-reviewed）:

````text
DataIntegrityProofで検証したDID Document
````

## fence:423-433/line:5

原文:

````text
Document-authorized devices and communication keys (Device Manifest)
````

日本語補足（agent-reviewed）:

````text
文書で認可されたデバイスと通信鍵（Device Manifest）
````

## fence:423-433/line:6

原文:

````text
Establishment material and sessions verified under the E2EE Profile
````

日本語補足（agent-reviewed）:

````text
E2EE Profileに従って検証した確立用素材とセッション
````

## fence:423-433/line:7

原文:

````text
Messages decryptable only by recipient devices
````

日本語補足（agent-reviewed）:

````text
受信デバイスだけが復号できるメッセージ
````

## fence:423-433/line:9

原文:

````text
Messaging server
````

日本語補足（agent-reviewed）:

````text
メッセージングサーバー
````

## fence:423-433/line:9

原文:

````text
Key substitution at any link causes verification to fail
````

日本語補足（agent-reviewed）:

````text
どの段階で鍵をすり替えても検証が失敗
````

## fence:515-529/line:2

原文:

````text
Caller agent
````

日本語補足（agent-reviewed）:

````text
呼び出し元エージェント
````

## fence:515-529/line:3

原文:

````text
Target domain
````

日本語補足（agent-reviewed）:

````text
宛先ドメイン
````

## fence:515-529/line:4

原文:

````text
Service provider agent
````

日本語補足（agent-reviewed）:

````text
サービス提供エージェント
````

## fence:515-529/line:5

原文:

````text
Search agent
````

日本語補足（agent-reviewed）:

````text
検索エージェント
````

## fence:515-529/line:6

原文:

````text
Active discovery
````

日本語補足（agent-reviewed）:

````text
能動的な発見
````

## fence:515-529/line:8

原文:

````text
CollectionPage: AD URLs (paginated through next)
````

日本語補足（agent-reviewed）:

````text
CollectionPage：ADのURL（nextでページ分割）
````

## fence:515-529/line:9

原文:

````text
Passive discovery
````

日本語補足（agent-reviewed）:

````text
受動的な発見
````

## fence:515-529/line:10

原文:

````text
Invoke registration interface and submit its AD URL
````

日本語補足（agent-reviewed）:

````text
登録インターフェースを呼び出し、自身のAD URLを送信
````

## fence:515-529/line:11

原文:

````text
Retrieve AD and build index
````

日本語補足（agent-reviewed）:

````text
ADを取得して索引を作成
````

## fence:515-529/line:12

原文:

````text
Search for required capabilities
````

日本語補足（agent-reviewed）:

````text
必要な機能を検索
````

## fence:515-529/line:13

原文:

````text
Return matching AD URLs
````

日本語補足（agent-reviewed）:

````text
一致するAD URLを返す
````

## fence:554-564/line:2

原文:

````text
Agent A
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
エージェントA
````

## fence:554-564/line:3

原文:

````text
Agent B
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
エージェントB
````

## fence:554-564/line:4

原文:

````text
Read AD and locate MetaProtocolInterface
````

日本語補足（agent-reviewed）:

````text
ADを読み、MetaProtocolInterfaceを特定
````

## fence:554-564/line:6

原文:

````text
Currently supported interfaces, Profiles, security modes, and schemas
````

日本語補足（agent-reviewed）:

````text
現在対応しているインターフェース、Profile、セキュリティモード、スキーマ
````

## fence:554-564/line:7

原文:

````text
anp.negotiate: propose an interaction plan and constraints
````

日本語補足（agent-reviewed）:

````text
anp.negotiate：やり取りの計画と制約を提案
````

## fence:554-564/line:8

原文:

````text
Accept or propose an alternative
````

日本語補足（agent-reviewed）:

````text
受け入れるか、代案を提示
````

## fence:554-564/line:9

原文:

````text
Perform business interaction under the negotiated result
````

日本語補足（agent-reviewed）:

````text
交渉結果に従って業務上のやり取りを実施
````

## fence:636-657/line:3

原文:

````text
Procurement agent
````

日本語補足（agent-reviewed）:

````text
調達エージェント
````

## fence:636-657/line:4

原文:

````text
Search agent
````

日本語補足（agent-reviewed）:

````text
検索エージェント
````

## fence:636-657/line:5

原文:

````text
Supplier agent
````

日本語補足（agent-reviewed）:

````text
供給者エージェント
````

## fence:636-657/line:6

原文:

````text
Procurement approver
````

日本語補足（agent-reviewed）:

````text
調達の承認者
````

## fence:636-657/line:7

原文:

````text
Search for suitable suppliers
````

日本語補足（agent-reviewed）:

````text
適切な供給者を検索
````

## fence:636-657/line:8

原文:

````text
Supplier AD URLs
````

日本語補足（agent-reviewed）:

````text
供給者のAD URL
````

## fence:636-657/line:9

原文:

````text
Read AD and product Information
````

日本語補足（agent-reviewed）:

````text
ADと商品のInformationを読み取る
````

## fence:636-657/line:10

原文:

````text
Compare options locally using budget and internal standards
````

日本語補足（agent-reviewed）:

````text
予算と社内基準を使い、ローカルで選択肢を比較
````

## fence:636-657/line:11

原文:

````text
E2EE message: ask about lead time and customization
````

日本語補足（agent-reviewed）:

````text
E2EEメッセージ：納期とカスタマイズを問い合わせる
````

## fence:636-657/line:12

原文:

````text
Message: quote and delivery plan
````

日本語補足（agent-reviewed）:

````text
メッセージ：見積もりと納品計画
````

## fence:636-657/line:13

原文:

````text
Request order approval
````

日本語補足（agent-reviewed）:

````text
注文承認を要求
````

## fence:636-657/line:15

原文:

````text
Invoke ordering interface with DID authentication
````

日本語補足（agent-reviewed）:

````text
DID認証付きで発注インターフェースを呼び出す
````

## fence:636-657/line:16

原文:

````text
Request a delegation credential
````

日本語補足（agent-reviewed）:

````text
委任資格情報を要求
````

## fence:636-657/line:17

原文:

````text
Present the enterprise-issued procurement role credential
````

日本語補足（agent-reviewed）:

````text
企業が発行した調達役割の資格情報を提示
````

## fence:636-657/line:18

原文:

````text
Confirm order
````

日本語補足（agent-reviewed）:

````text
注文を確認
````

## fence:636-657/line:19

原文:

````text
Complete payment through the payment protocol
````

日本語補足（agent-reviewed）:

````text
決済プロトコルを通じて支払いを完了
````

## fence:636-657/line:20

原文:

````text
Messages and attachments: progress and shipping documents
````

日本語補足（agent-reviewed）:

````text
メッセージと添付ファイル：進捗と発送書類
````
