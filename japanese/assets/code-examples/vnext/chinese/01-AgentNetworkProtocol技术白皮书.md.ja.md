# vnext/chinese/01-AgentNetworkProtocol技术白皮书.md のコード例・図ラベルの日本語補足

原文: [vnext/chinese/01-AgentNetworkProtocol技术白皮书.md](../../../../../vnext/chinese/01-AgentNetworkProtocol技术白皮书.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:135-149/line:3

原文:

````text
智能体 A（调用方）
````

日本語補足（agent-reviewed）:

````text
エージェントA（呼び出し元）
````

## fence:135-149/line:4

原文:

````text
搜索智能体或目标域名
````

日本語補足（agent-reviewed）:

````text
検索エージェントまたは宛先ドメイン名
````

## fence:135-149/line:5

原文:

````text
智能体 B（服务方）
````

日本語補足（agent-reviewed）:

````text
エージェントB（サービス提供側）
````

## fence:135-149/line:6

原文:

````text
智能体发现：检索，或读取 .well-known/agent-descriptions
````

日本語補足（agent-reviewed）:

````text
エージェントの発見：検索、または.well-known/agent-descriptionsの読み取り
````

## fence:135-149/line:7

原文:

````text
返回智能体描述（AD）的 URL
````

日本語補足（agent-reviewed）:

````text
エージェント記述（AD）のURLを返す
````

## fence:135-149/line:8

原文:

````text
读取 AD，沿链接按需获取 Information
````

日本語補足（agent-reviewed）:

````text
ADを読み、必要なリンクをたどってInformationを取得
````

## fence:135-149/line:9

原文:

````text
在本地结合用户上下文做出判断
````

日本語補足（agent-reviewed）:

````text
利用者のコンテキストを使ってローカルで判断
````

## fence:135-149/line:10

原文:

````text
以 DID 签名调用 Interface（ANP-02 认证）
````

日本語補足（agent-reviewed）:

````text
DID署名付きでInterfaceを呼び出す（ANP-02認証）
````

## fence:135-149/line:11

原文:

````text
解析并验证 A 的 DID 文档，独立判断权限
````

日本語補足（agent-reviewed）:

````text
AのDID文書を解決・検証し、権限を独立して判断
````

## fence:135-149/line:12

原文:

````text
返回结果
````

日本語補足（agent-reviewed）:

````text
結果を返す
````

## fence:135-149/line:13

原文:

````text
通过 ANP 消息持续沟通（可选端到端加密）
````

日本語補足（agent-reviewed）:

````text
ANPメッセージで継続してやり取り（エンドツーエンド暗号化は任意）
````

## fence:224-246/line:2

原文:

````text
组织 A（a.example）
````

日本語補足（agent-reviewed）:

````text
組織A（a.example）
````

## fence:224-246/line:4

原文:

````text
智能体 Alice
````

日本語補足（agent-reviewed）:

````text
エージェントAlice
````

## fence:224-246/line:5

原文:

````text
DID 文档<br/>由组织 A 自行托管
````

日本語補足（agent-reviewed）:

````text
DID文書<br/>組織Aが自らホスト
````

## fence:224-246/line:8

原文:

````text
组织 B（b.example）
````

日本語補足（agent-reviewed）:

````text
組織B（b.example）
````

## fence:224-246/line:10

原文:

````text
智能体 Bob
````

日本語補足（agent-reviewed）:

````text
エージェントBob
````

## fence:224-246/line:11

原文:

````text
DID 文档<br/>由组织 B 自行托管
````

日本語補足（agent-reviewed）:

````text
DID文書<br/>組織Bが自らホスト
````

## fence:224-246/line:14

原文:

````text
个人开发者（c.example）
````

日本語補足（agent-reviewed）:

````text
個人開発者（c.example）
````

## fence:224-246/line:16

原文:

````text
智能体 Carol
````

日本語補足（agent-reviewed）:

````text
エージェントCarol
````

## fence:224-246/line:17

原文:

````text
DID 文档<br/>由开发者自行托管
````

日本語補足（agent-reviewed）:

````text
DID文書<br/>開発者が自らホスト
````

## fence:224-246/line:20

原文:

````text
DID 相互认证
````

日本語補足（agent-reviewed）:

````text
DIDによる相互認証
````

## fence:224-246/line:21

原文:

````text
DID 相互认证
````

日本語補足（agent-reviewed）:

````text
DIDによる相互認証
````

## fence:272-282/line:2

原文:

````text
DID：did:wba:example.com:user:alice:e1_指纹
````

日本語補足（technical-retained）:

````text
DID：did:wba:example.com:user:alice:e1_指纹
````

注: 例示DIDの技術表記とフィンガープリントのプレースホルダーを保持。「指纹」はフィンガープリントを意味する。

## fence:272-282/line:3

原文:

````text
绑定公钥（Ed25519）
````

日本語補足（agent-reviewed）:

````text
バインディング公開鍵（Ed25519）
````

## fence:272-282/line:4

原文:

````text
DID 文档：认证密钥、服务端点、设备声明
````

日本語補足（agent-reviewed）:

````text
DID文書：認証鍵、サービスエンドポイント、デバイス宣言
````

## fence:272-282/line:5

原文:

````text
每一次请求的签名
````

日本語補足（agent-reviewed）:

````text
各要求への署名
````

## fence:272-282/line:6

原文:

````text
绑定一：公钥指纹必须与 DID 一致
````

日本語補足（agent-reviewed）:

````text
バインディング1：公開鍵のフィンガープリントはDIDと一致しなければならない
````

## fence:272-282/line:7

原文:

````text
绑定二：签署文档级 DataIntegrityProof
````

日本語補足（agent-reviewed）:

````text
バインディング2：文書単位のDataIntegrityProofに署名
````

## fence:272-282/line:8

原文:

````text
绑定三：授权认证密钥为请求签名
````

日本語補足（agent-reviewed）:

````text
バインディング3：認証鍵に要求への署名を認可
````

## fence:272-282/line:9

原文:

````text
托管服务器
````

日本語補足（agent-reviewed）:

````text
ホスティングサーバー
````

## fence:272-282/line:9

原文:

````text
若改写文档：没有绑定私钥就无法生成有效证明
````

日本語補足（agent-reviewed）:

````text
文書を書き換えた場合、バインディング秘密鍵なしでは有効な証明を生成できない
````

## fence:316-330/line:3

原文:

````text
智能体 A 的客户端
````

日本語補足（agent-reviewed）:

````text
エージェントAのクライアント
````

## fence:316-330/line:4

原文:

````text
智能体 B 的服务端
````

日本語補足（agent-reviewed）:

````text
エージェントBのサーバー
````

## fence:316-330/line:5

原文:

````text
智能体 A 的 DID 托管服务
````

日本語補足（agent-reviewed）:

````text
エージェントAのDIDホスティングサービス
````

## fence:316-330/line:6

原文:

````text
首次 HTTP 请求：Signature-Input、Signature、Content-Digest
````

日本語補足（agent-reviewed）:

````text
初回HTTP要求：Signature-Input、Signature、Content-Digest
````

## fence:316-330/line:7

原文:

````text
按 DID 方法解析 A 的 DID 文档
````

日本語補足（agent-reviewed）:

````text
DIDメソッドに従ってAのDID文書を解決
````

## fence:316-330/line:8

原文:

````text
DID 文档
````

日本語補足（agent-reviewed）:

````text
DID文書
````

## fence:316-330/line:9

原文:

````text
验证文档（did:wba 需验证指纹与文档证明）
````

日本語補足（agent-reviewed）:

````text
文書を検証（did:wbaではフィンガープリントと文書証明の検証が必要）
````

## fence:316-330/line:10

原文:

````text
验证签名覆盖、密钥用途、时间与防重放
````

日本語補足（agent-reviewed）:

````text
署名の対象範囲、鍵の用途、時刻、リプレイ防止を検証
````

## fence:316-330/line:11

原文:

````text
独立判断业务权限
````

日本語補足（agent-reviewed）:

````text
業務の権限を独立して判断
````

## fence:316-330/line:12

原文:

````text
响应，并通过 Authentication-Info 返回 access token
````

日本語補足（agent-reviewed）:

````text
応答し、Authentication-Infoを通じてaccess tokenを返す
````

## fence:316-330/line:13

原文:

````text
后续请求携带 access token
````

日本語補足（agent-reviewed）:

````text
以降の要求にaccess tokenを含める
````

## fence:373-393/line:2

原文:

````text
服务域 a.example
````

日本語補足（agent-reviewed）:

````text
サービスドメインa.example
````

## fence:373-393/line:4

原文:

````text
智能体 Alice
````

日本語補足（agent-reviewed）:

````text
エージェントAlice
````

## fence:373-393/line:5

原文:

````text
消息服务 A
````

日本語補足（agent-reviewed）:

````text
メッセージサービスA
````

## fence:373-393/line:8

原文:

````text
服务域 b.example
````

日本語補足（agent-reviewed）:

````text
サービスドメインb.example
````

## fence:373-393/line:10

原文:

````text
消息服务 B
````

日本語補足（agent-reviewed）:

````text
メッセージサービスB
````

## fence:373-393/line:11

原文:

````text
智能体 Bob
````

日本語補足（agent-reviewed）:

````text
エージェントBob
````

## fence:373-393/line:14

原文:

````text
服务域 c.example
````

日本語補足（agent-reviewed）:

````text
サービスドメインc.example
````

## fence:373-393/line:15

原文:

````text
Group Host<br/>维护成员关系，为群事件排序
````

日本語補足（agent-reviewed）:

````text
グループのHost<br/>メンバー関係を維持し、グループイベントを順序付ける
````

## fence:373-393/line:17

原文:

````text
按 Bob 的 DID 发现消息服务，跨域投递私聊
````

日本語補足（agent-reviewed）:

````text
BobのDIDからメッセージサービスを発見し、ドメインをまたいで個別チャットを配信
````

## fence:373-393/line:18

原文:

````text
群操作与群消息
````

日本語補足（agent-reviewed）:

````text
グループ操作とグループメッセージ
````

## fence:373-393/line:19

原文:

````text
群操作与群消息
````

日本語補足（agent-reviewed）:

````text
グループ操作とグループメッセージ
````

## fence:423-433/line:2

原文:

````text
预期的接收方 DID（包含公钥指纹）
````

日本語補足（agent-reviewed）:

````text
期待する受信者のDID（公開鍵のフィンガープリントを含む）
````

## fence:423-433/line:3

原文:

````text
与指纹一致的绑定公钥
````

日本語補足（agent-reviewed）:

````text
フィンガープリントが一致するバインディング公開鍵
````

## fence:423-433/line:4

原文:

````text
经 DataIntegrityProof 验证的 DID 文档
````

日本語補足（agent-reviewed）:

````text
DataIntegrityProofで検証したDID文書
````

## fence:423-433/line:5

原文:

````text
文档中授权的设备及其通信密钥（Device Manifest）
````

日本語補足（agent-reviewed）:

````text
文書で認可されたデバイスと通信鍵（Device Manifest）
````

## fence:423-433/line:6

原文:

````text
按 E2EE Profile 验证的建链材料与会话
````

日本語補足（agent-reviewed）:

````text
E2EE Profileに従って検証した接続確立用素材とセッション
````

## fence:423-433/line:7

原文:

````text
只有接收方设备能够解密的消息
````

日本語補足（agent-reviewed）:

````text
受信デバイスだけが復号できるメッセージ
````

## fence:423-433/line:9

原文:

````text
消息服务器
````

日本語補足（agent-reviewed）:

````text
メッセージサーバー
````

## fence:423-433/line:9

原文:

````text
替换任何一环的密钥，都会使验证失败
````

日本語補足（agent-reviewed）:

````text
どの段階で鍵をすり替えても検証が失敗
````

## fence:515-529/line:2

原文:

````text
调用方智能体
````

日本語補足（agent-reviewed）:

````text
呼び出し元エージェント
````

## fence:515-529/line:3

原文:

````text
目标域名
````

日本語補足（agent-reviewed）:

````text
宛先ドメイン名
````

## fence:515-529/line:4

原文:

````text
服务方智能体
````

日本語補足（agent-reviewed）:

````text
サービス提供エージェント
````

## fence:515-529/line:5

原文:

````text
搜索智能体
````

日本語補足（agent-reviewed）:

````text
検索エージェント
````

## fence:515-529/line:6

原文:

````text
主动发现
````

日本語補足（agent-reviewed）:

````text
能動的な発見
````

## fence:515-529/line:8

原文:

````text
CollectionPage：AD 的 URL 列表（可通过 next 分页）
````

日本語補足（agent-reviewed）:

````text
CollectionPage：ADのURL一覧（nextでページ分割可能）
````

## fence:515-529/line:9

原文:

````text
被动发现
````

日本語補足（agent-reviewed）:

````text
受動的な発見
````

## fence:515-529/line:10

原文:

````text
调用注册接口，提交自己的 AD URL
````

日本語補足（agent-reviewed）:

````text
登録インターフェースを呼び出し、自身のAD URLを送信
````

## fence:515-529/line:11

原文:

````text
抓取 AD 并建立索引
````

日本語補足（agent-reviewed）:

````text
ADを取得して索引を作成
````

## fence:515-529/line:12

原文:

````text
检索需要的能力
````

日本語補足（agent-reviewed）:

````text
必要な機能を検索
````

## fence:515-529/line:13

原文:

````text
返回匹配的 AD URL
````

日本語補足（agent-reviewed）:

````text
一致するAD URLを返す
````

## fence:554-564/line:2

原文:

````text
智能体 A
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
エージェント A
````

## fence:554-564/line:3

原文:

````text
智能体 B
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
エージェント B
````

## fence:554-564/line:4

原文:

````text
读取 AD，找到 MetaProtocolInterface
````

日本語補足（agent-reviewed）:

````text
ADを読み、MetaProtocolInterfaceを特定
````

## fence:554-564/line:6

原文:

````text
当前支持的接口、Profile、安全模式与 Schema
````

日本語補足（agent-reviewed）:

````text
現在対応しているインターフェース、Profile、セキュリティモード、Schema
````

## fence:554-564/line:7

原文:

````text
anp.negotiate：提出交互方案与约束
````

日本語補足（agent-reviewed）:

````text
anp.negotiate：やり取りの計画と制約を提案
````

## fence:554-564/line:8

原文:

````text
接受，或给出替代方案
````

日本語補足（agent-reviewed）:

````text
受け入れるか、代案を提示
````

## fence:554-564/line:9

原文:

````text
按协商结果进行业务交互
````

日本語補足（agent-reviewed）:

````text
交渉結果に従って業務上のやり取りを実施
````

## fence:636-657/line:3

原文:

````text
采购智能体
````

日本語補足（agent-reviewed）:

````text
調達エージェント
````

## fence:636-657/line:4

原文:

````text
搜索智能体
````

日本語補足（agent-reviewed）:

````text
検索エージェント
````

## fence:636-657/line:5

原文:

````text
供应商智能体
````

日本語補足（agent-reviewed）:

````text
供給者エージェント
````

## fence:636-657/line:6

原文:

````text
采购负责人
````

日本語補足（agent-reviewed）:

````text
調達責任者
````

## fence:636-657/line:7

原文:

````text
检索符合条件的供应商
````

日本語補足（agent-reviewed）:

````text
条件に合う供給者を検索
````

## fence:636-657/line:8

原文:

````text
若干供应商的 AD URL
````

日本語補足（agent-reviewed）:

````text
複数の供給者のAD URL
````

## fence:636-657/line:9

原文:

````text
读取 AD 与相关产品的 Information
````

日本語補足（agent-reviewed）:

````text
ADと関連商品のInformationを読み取る
````

## fence:636-657/line:10

原文:

````text
在本地结合预算与内部标准比较方案
````

日本語補足（agent-reviewed）:

````text
予算と社内基準を組み合わせ、ローカルで案を比較
````

## fence:636-657/line:11

原文:

````text
消息（端到端加密）：询问交期与定制条件
````

日本語補足（agent-reviewed）:

````text
メッセージ（エンドツーエンド暗号化）：納期とカスタマイズ条件を問い合わせる
````

## fence:636-657/line:12

原文:

````text
消息：报价与交付方案
````

日本語補足（agent-reviewed）:

````text
メッセージ：見積もりと納品計画
````

## fence:636-657/line:13

原文:

````text
请求批准订单
````

日本語補足（agent-reviewed）:

````text
注文の承認を要求
````

## fence:636-657/line:14

原文:

````text
批准
````

日本語補足（agent-reviewed）:

````text
承認
````

## fence:636-657/line:15

原文:

````text
以 DID 认证调用订购接口
````

日本語補足（agent-reviewed）:

````text
DID認証付きで発注インターフェースを呼び出す
````

## fence:636-657/line:16

原文:

````text
请求出示代理凭证
````

日本語補足（agent-reviewed）:

````text
委任資格情報の提示を要求
````

## fence:636-657/line:17

原文:

````text
出示企业签发的采购角色凭证
````

日本語補足（agent-reviewed）:

````text
企業が発行した調達役割の資格情報を提示
````

## fence:636-657/line:18

原文:

````text
订单确认
````

日本語補足（agent-reviewed）:

````text
注文確認
````

## fence:636-657/line:19

原文:

````text
通过支付协议完成付款
````

日本語補足（agent-reviewed）:

````text
決済プロトコルを通じて支払いを完了
````

## fence:636-657/line:20

原文:

````text
消息与附件：进度与发货单据
````

日本語補足（agent-reviewed）:

````text
メッセージと添付ファイル：進捗と発送書類
````
