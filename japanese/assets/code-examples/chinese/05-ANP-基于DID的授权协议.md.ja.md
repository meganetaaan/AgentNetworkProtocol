# chinese/05-ANP-基于DID的授权协议.md のコード例・図ラベルの日本語補足

原文: [chinese/05-ANP-基于DID的授权协议.md](../../../../chinese/05-ANP-基于DID的授权协议.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:130-137/line:2

原文:

````text
Agent 要执行受保护操作
````

日本語補足（agent-reviewed）:

````text
エージェントが保護された操作を実行しようとしている
````

## fence:130-137/line:3

原文:

````text
ANP-02 请求认证<br/>接收方按本地策略处理
````

日本語補足（agent-reviewed）:

````text
ANP-02による要求認証<br/>受信側がローカルポリシーに従って処理
````

## fence:130-137/line:3

原文:

````text
是
````

日本語補足（agent-reviewed）:

````text
はい
````

## fence:130-137/line:4

原文:

````text
否，需要授权
````

日本語補足（agent-reviewed）:

````text
いいえ、認可が必要
````

## fence:130-137/line:5

原文:

````text
OAuth Profile<br/>授权码或客户端凭据
````

日本語補足（agent-reviewed）:

````text
OAuth Profile<br/>認可コードまたはクライアント資格情報
````

## fence:130-137/line:5

原文:

````text
资源方策略、用户授权或已验证信息
````

日本語補足（agent-reviewed）:

````text
リソース側のポリシー、利用者の認可、または検証済み情報
````

## fence:130-137/line:6

原文:

````text
VC Profile<br/>委托或角色凭证直接出示
````

日本語補足（agent-reviewed）:

````text
VC Profile<br/>委任資格情報または役割資格情報を直接提示
````

## fence:130-137/line:6

原文:

````text
需要携带外部的委托或角色凭证
````

日本語補足（agent-reviewed）:

````text
外部の委任資格情報または役割資格情報の携行が必要
````

## fence:141-165/line:2

原文:

````text
Agent 控制边界
````

日本語補足（agent-reviewed）:

````text
エージェントの制御境界
````

## fence:141-165/line:3

原文:

````text
Agent 运行实例<br/>运行期认证密钥
````

日本語補足（agent-reviewed）:

````text
エージェントの実行インスタンス<br/>実行時の認証鍵
````

## fence:141-165/line:4

原文:

````text
持有的委托凭证
````

日本語補足（agent-reviewed）:

````text
保持する委任資格情報
````

## fence:141-165/line:6

原文:

````text
DID 文档托管边界
````

日本語補足（agent-reviewed）:

````text
DID文書のホスティング境界
````

## fence:141-165/line:7

原文:

````text
Agent DID 文档<br/>认证密钥与元数据摘要
````

日本語補足（agent-reviewed）:

````text
エージェントのDID文書<br/>認証鍵とメタデータのダイジェスト
````

## fence:141-165/line:9

原文:

````text
元数据托管边界
````

日本語補足（agent-reviewed）:

````text
メタデータのホスティング境界
````

## fence:141-165/line:10

原文:

````text
标准 CIMD 与 JWKS
````

日本語補足（agent-reviewed）:

````text
標準CIMDとJWKS
````

## fence:141-165/line:12

原文:

````text
凭证签发方边界
````

日本語補足（agent-reviewed）:

````text
資格情報発行者の境界
````

## fence:141-165/line:13

原文:

````text
用户或组织<br/>签发密钥与状态列表
````

日本語補足（agent-reviewed）:

````text
利用者または組織<br/>発行鍵と状態リスト
````

## fence:141-165/line:15

原文:

````text
资源所有者
````

日本語補足（agent-reviewed）:

````text
リソース所有者
````

## fence:141-165/line:15

原文:

````text
授权服务器
````

日本語補足（agent-reviewed）:

````text
認可サーバー
````

## fence:141-165/line:15

原文:

````text
同意 / 撤销
````

日本語補足（agent-reviewed）:

````text
同意／取り消し
````

## fence:141-165/line:16

原文:

````text
签发委托凭证
````

日本語補足（agent-reviewed）:

````text
委任資格情報を発行
````

## fence:141-165/line:17

原文:

````text
可选 DID 绑定：URL、密钥与固定摘要
````

日本語補足（agent-reviewed）:

````text
任意のDIDバインディング：URL、鍵、固定ダイジェスト
````

## fence:141-165/line:18

原文:

````text
标准元数据与客户端公钥
````

日本語補足（agent-reviewed）:

````text
標準メタデータとクライアント公開鍵
````

## fence:141-165/line:19

原文:

````text
客户端断言与 OAuth 授权凭据
````

日本語補足（agent-reviewed）:

````text
クライアントアサーションとOAuth認可資格情報
````

## fence:141-165/line:20

原文:

````text
签发方 DID 与凭证状态
````

日本語補足（agent-reviewed）:

````text
発行者のDIDと資格情報の状態
````

## fence:141-165/line:21

原文:

````text
限定资源的令牌
````

日本語補足（agent-reviewed）:

````text
リソースを限定したトークン
````

## fence:141-165/line:22

原文:

````text
资源服务器或对端 Agent<br/>确定性策略
````

日本語補足（agent-reviewed）:

````text
リソースサーバーまたは相手のエージェント<br/>決定的なポリシー
````

## fence:141-165/line:22

原文:

````text
令牌与操作，或直接出示 VP
````

日本語補足（agent-reviewed）:

````text
トークンと操作、またはVPの直接提示
````

## fence:141-165/line:23

原文:

````text
签发者信任 / 令牌状态
````

日本語補足（agent-reviewed）:

````text
発行者への信頼／トークンの状態
````

## fence:263-274/line:2

原文:

````text
CIMD URL 客户端请求
````

日本語補足（agent-reviewed）:

````text
CIMD URLのクライアント要求
````

## fence:263-274/line:2

原文:

````text
验证 CIMD 与本地准入
````

日本語補足（agent-reviewed）:

````text
CIMDとローカルの受け入れ条件を検証
````

## fence:263-274/line:4

原文:

````text
验证 DID、URL、元数据摘要与密钥策略
````

日本語補足（agent-reviewed）:

````text
DID、URL、メタデータのダイジェスト、鍵ポリシーを検証
````

## fence:263-274/line:4

原文:

````text
是
````

日本語補足（agent-reviewed）:

````text
はい
````

## fence:263-274/line:5

原文:

````text
验证新的标准客户端断言
````

日本語補足（agent-reviewed）:

````text
新しい標準クライアントアサーションを検証
````

## fence:263-274/line:5

原文:

````text
否
````

日本語補足（agent-reviewed）:

````text
いいえ
````

## fence:263-274/line:6

原文:

````text
通过
````

日本語補足（agent-reviewed）:

````text
合格
````

## fence:263-274/line:7

原文:

````text
拒绝，不切换模式
````

日本語補足（agent-reviewed）:

````text
拒否し、モードを切り替えない
````

## fence:263-274/line:7

原文:

````text
失败
````

日本語補足（agent-reviewed）:

````text
失敗
````

## fence:263-274/line:8

原文:

````text
检查独立授权、用户、资源与 scope
````

日本語補足（agent-reviewed）:

````text
独立した認可、利用者、リソース、scopeを確認
````

## fence:263-274/line:9

原文:

````text
签发限定资源的令牌
````

日本語補足（agent-reviewed）:

````text
リソースを限定したトークンを発行
````

## fence:263-274/line:9

原文:

````text
批准
````

日本語補足（agent-reviewed）:

````text
承認
````

## fence:263-274/line:10

原文:

````text
拒绝
````

日本語補足（agent-reviewed）:

````text
拒否
````

## fence:386-398/line:2

原文:

````text
CIMD URL 的客户端断言
````

日本語補足（agent-reviewed）:

````text
CIMD URLのクライアントアサーション
````

## fence:386-398/line:2

原文:

````text
选择已接受 JWKS 密钥与认证策略
````

日本語補足（agent-reviewed）:

````text
受け入れ済みのJWKS鍵と認証ポリシーを選択
````

## fence:386-398/line:4

原文:

````text
验证当前 DID、URL、摘要及实际密钥
````

日本語補足（agent-reviewed）:

````text
現在のDID、URL、ダイジェスト、実際の鍵を検証
````

## fence:386-398/line:4

原文:

````text
是
````

日本語補足（agent-reviewed）:

````text
はい
````

## fence:386-398/line:5

原文:

````text
验证 JWT 签名、声明与新鲜度
````

日本語補足（agent-reviewed）:

````text
JWTの署名、クレーム、鮮度を検証
````

## fence:386-398/line:5

原文:

````text
否
````

日本語補足（agent-reviewed）:

````text
いいえ
````

## fence:386-398/line:6

原文:

````text
通过
````

日本語補足（agent-reviewed）:

````text
合格
````

## fence:386-398/line:7

原文:

````text
拒绝，不回退
````

日本語補足（agent-reviewed）:

````text
拒否し、フォールバックしない
````

## fence:386-398/line:7

原文:

````text
失败
````

日本語補足（agent-reviewed）:

````text
失敗
````

## fence:386-398/line:8

原文:

````text
执行防重放控制
````

日本語補足（agent-reviewed）:

````text
リプレイ防止制御を実施
````

## fence:386-398/line:9

原文:

````text
评估授权与目标资源权限
````

日本語補足（agent-reviewed）:

````text
認可と対象リソースの権限を評価
````

## fence:386-398/line:10

原文:

````text
签发令牌
````

日本語補足（agent-reviewed）:

````text
トークンを発行
````

## fence:386-398/line:10

原文:

````text
批准
````

日本語補足（agent-reviewed）:

````text
承認
````

## fence:386-398/line:11

原文:

````text
拒绝
````

日本語補足（agent-reviewed）:

````text
拒否
````

## fence:433-468/line:2

原文:

````text
用户 / 系统浏览器
````

日本語補足（agent-reviewed）:

````text
利用者／システムブラウザー
````

## fence:433-468/line:4

原文:

````text
资源服务器
````

日本語補足（agent-reviewed）:

````text
リソースサーバー
````

## fence:433-468/line:5

原文:

````text
授权服务器
````

日本語補足（agent-reviewed）:

````text
認可サーバー
````

## fence:433-468/line:6

原文:

````text
公开 CIMD / JWKS / DID 托管方
````

日本語補足（agent-reviewed）:

````text
公開CIMD／JWKS／DIDのホスト
````

## fence:433-468/line:7

原文:

````text
不带令牌请求资源
````

日本語補足（agent-reviewed）:

````text
トークンなしでリソースを要求
````

## fence:433-468/line:8

原文:

````text
401 与 resource_metadata
````

日本語補足（agent-reviewed）:

````text
401とresource_metadata
````

## fence:433-468/line:9

原文:

````text
验证 issuer、CIMD 及所选能力
````

日本語補足（agent-reviewed）:

````text
issuer、CIMD、選択した機能を検証
````

## fence:433-468/line:10

原文:

````text
打开授权 URL（CIMD URL、resource、state、S256）
````

日本語補足（agent-reviewed）:

````text
認可URLを開く（CIMD URL、resource、state、S256）
````

## fence:433-468/line:11

原文:

````text
标准授权请求
````

日本語補足（agent-reviewed）:

````text
標準認可要求
````

## fence:433-468/line:12

原文:

````text
获取 CIMD 及已接受 JWKS
````

日本語補足（agent-reviewed）:

````text
CIMDと受け入れ済みJWKSを取得
````

## fence:433-468/line:13

原文:

````text
标准元数据及公钥
````

日本語補足（agent-reviewed）:

````text
標準メタデータと公開鍵
````

## fence:433-468/line:14

原文:

````text
已声明 DID 绑定处理
````

日本語補足（agent-reviewed）:

````text
宣言されたDIDバインディングの処理
````

## fence:433-468/line:15

原文:

````text
解析关联 DID 并进行方法验证
````

日本語補足（agent-reviewed）:

````text
関連するDIDを解決し、メソッドの検証を実施
````

## fence:433-468/line:16

原文:

````text
service URL、摘要及获准密钥
````

日本語補足（agent-reviewed）:

````text
service URL、ダイジェスト、承認された鍵
````

## fence:433-468/line:17

原文:

````text
接受元数据前验证绑定
````

日本語補足（agent-reviewed）:

````text
メタデータを受け入れる前にバインディングを検証
````

## fence:433-468/line:19

原文:

````text
执行准入并批准回调
````

日本語補足（agent-reviewed）:

````text
受け入れ処理を実施し、コールバックを承認
````

## fence:433-468/line:20

原文:

````text
认证用户并请求范围明确的同意
````

日本語補足（agent-reviewed）:

````text
利用者を認証し、範囲を明確にした同意を求める
````

## fence:433-468/line:21

原文:

````text
批准或拒绝
````

日本語補足（agent-reviewed）:

````text
承認または拒否
````

## fence:433-468/line:22

原文:

````text
用户批准
````

日本語補足（agent-reviewed）:

````text
利用者が承認
````

## fence:433-468/line:23

原文:

````text
code、state，以及选用时的 iss
````

日本語補足（agent-reviewed）:

````text
code、state、および選択した場合のiss
````

## fence:433-468/line:24

原文:

````text
获准 HTTPS 或 loopback 回调
````

日本語補足（agent-reviewed）:

````text
承認されたHTTPSまたはloopbackコールバック
````

## fence:433-468/line:25

原文:

````text
验证会话及固定的 issuer 策略
````

日本語補足（agent-reviewed）:

````text
セッションと固定されたissuerポリシーを検証
````

## fence:433-468/line:26

原文:

````text
code、精确回调、verifier、新断言及目标绑定
````

日本語補足（agent-reviewed）:

````text
code、厳密なコールバック、verifier、新しいアサーション、対象のバインディング
````

## fence:433-468/line:27

原文:

````text
验证当前密钥/绑定、断言、code 及授权
````

日本語補足（agent-reviewed）:

````text
現在の鍵／バインディング、アサーション、code、認可を検証
````

## fence:433-468/line:28

原文:

````text
限定资源的访问令牌
````

日本語補足（agent-reviewed）:

````text
リソースを限定したアクセストークン
````

## fence:433-468/line:29

原文:

````text
令牌及获准操作
````

日本語補足（agent-reviewed）:

````text
トークンと承認された操作
````

## fence:433-468/line:30

原文:

````text
验证令牌、当前授权及操作策略
````

日本語補足（agent-reviewed）:

````text
トークン、現在の認可、操作ポリシーを検証
````

## fence:433-468/line:31

原文:

````text
用户拒绝
````

日本語補足（agent-reviewed）:

````text
利用者が拒否
````

## fence:433-468/line:32

原文:

````text
获准回调上的错误、state，以及选用时的 iss
````

日本語補足（agent-reviewed）:

````text
承認されたコールバック上のエラー、state、および選択した場合のiss
````

## fence:433-468/line:33

原文:

````text
验证错误绑定并停止
````

日本語補足（agent-reviewed）:

````text
エラーのバインディングを検証して停止
````

## fence:497-511/line:2

原文:

````text
上游调用方
````

日本語補足（agent-reviewed）:

````text
上流の呼び出し元
````

## fence:497-511/line:3

原文:

````text
Agent A<br/>入站 RS 与下游客户端
````

日本語補足（agent-reviewed）:

````text
エージェントA<br/>受信側RSと下流のクライアント
````

## fence:497-511/line:4

原文:

````text
B 接受的授权服务器<br/>独立的 B 授权与策略
````

日本語補足（agent-reviewed）:

````text
Bが受け入れる認可サーバー<br/>Bの独立した認可とポリシー
````

## fence:497-511/line:5

原文:

````text
服务 B<br/>验证受众与权限
````

日本語補足（agent-reviewed）:

````text
サービスB<br/>受信対象と権限を検証
````

## fence:497-511/line:6

原文:

````text
B 拒绝面向 A 的令牌<br/>v1 不定义令牌交换
````

日本語補足（agent-reviewed）:

````text
BはA向けのトークンを拒否<br/>v1はトークン交換を定義しない
````

## fence:497-511/line:7

原文:

````text
面向 A 的令牌
````

日本語補足（agent-reviewed）:

````text
A向けのトークン
````

## fence:497-511/line:8

原文:

````text
新客户端断言与独立的 B 授权
````

日本語補足（agent-reviewed）:

````text
新しいクライアントアサーションとBの独立した認可
````

## fence:497-511/line:9

原文:

````text
面向 B 的访问令牌
````

日本語補足（agent-reviewed）:

````text
B向けのアクセストークン
````

## fence:497-511/line:10

原文:

````text
面向 B 的令牌与获准操作
````

日本語補足（agent-reviewed）:

````text
B向けのトークンと承認された操作
````

## fence:497-511/line:11

原文:

````text
把面向 A 的令牌转发给 B
````

日本語補足（agent-reviewed）:

````text
A向けのトークンをBへ転送
````

## fence:774-783/line:3

原文:

````text
按需重新验证 DID 策略、CIMD 与 JWKS
````

日本語補足（agent-reviewed）:

````text
必要に応じてDIDポリシー、CIMD、JWKSを再検証
````

## fence:774-783/line:3

原文:

````text
仅运行期密钥
````

日本語補足（agent-reviewed）:

````text
実行時の鍵のみ
````

## fence:774-783/line:4

原文:

````text
保留适用授权，观察到移除后拒绝旧密钥
````

日本語補足（agent-reviewed）:

````text
適用される認可を保持し、削除を確認したら旧鍵を拒否
````

## fence:774-783/line:4

原文:

````text
有效且策略允许
````

日本語補足（agent-reviewed）:

````text
有効かつポリシーで許可
````

## fence:774-783/line:5

原文:

````text
拒绝，不回退旧密钥或模式
````

日本語補足（agent-reviewed）:

````text
拒否し、旧鍵や旧モードへ戻らない
````

## fence:774-783/line:5

原文:

````text
无效
````

日本語補足（agent-reviewed）:

````text
無効
````

## fence:774-783/line:6

原文:

````text
新 OAuth 客户端，不自动转移授权
````

日本語補足（agent-reviewed）:

````text
新しいOAuthクライアント。認可を自動移行しない
````

## fence:774-783/line:6

原文:

````text
CIMD URL
````

日本語補足（agent-reviewed）:

````text
CIMDのURL
````

## fence:774-783/line:7

原文:

````text
增强模式要求明确重新绑定
````

日本語補足（agent-reviewed）:

````text
拡張モードでは明示的な再バインディングが必要
````

## fence:774-783/line:7

原文:

````text
同一 URL 的 DID
````

日本語補足（agent-reviewed）:

````text
同じURLのDID
````

## fence:774-783/line:8

原文:

````text
阻止受影响签发并执行撤销策略
````

日本語補足（agent-reviewed）:

````text
影響する発行を阻止し、取り消しポリシーを実施
````

## fence:774-783/line:8

原文:

````text
泄露
````

日本語補足（agent-reviewed）:

````text
漏えい
````
