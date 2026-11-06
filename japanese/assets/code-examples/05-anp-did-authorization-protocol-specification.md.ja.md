# 05-anp-did-authorization-protocol-specification.md のコード例・図ラベルの日本語補足

原文: [05-anp-did-authorization-protocol-specification.md](../../../05-anp-did-authorization-protocol-specification.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:130-137/line:2

原文:

````text
Agent needs to perform a protected operation
````

日本語補足（agent-reviewed）:

````text
Agentが保護された操作を実行する必要がある
````

## fence:130-137/line:3

原文:

````text
ANP-02 request authentication<br/>receiver applies local policy
````

日本語補足（agent-reviewed）:

````text
ANP-02の要求認証<br/>受信側がローカルポリシーを適用
````

## fence:130-137/line:4

原文:

````text
No, authorization is needed
````

日本語補足（agent-reviewed）:

````text
いいえ、認可が必要
````

## fence:130-137/line:5

原文:

````text
OAuth Profile<br/>authorization code or client credentials
````

日本語補足（agent-reviewed）:

````text
OAuth Profile<br/>認可コードまたはクライアント資格情報
````

## fence:130-137/line:5

原文:

````text
Resource-side policy, user authorization or verified information
````

日本語補足（agent-reviewed）:

````text
リソース側のポリシー、ユーザーの認可、または検証済み情報
````

## fence:130-137/line:6

原文:

````text
VC Profile<br/>delegation or role direct presentation
````

日本語補足（agent-reviewed）:

````text
VC Profile<br/>委任またはroleの直接提示
````

## fence:130-137/line:6

原文:

````text
A portable delegation or role credential is needed
````

日本語補足（agent-reviewed）:

````text
持ち運べる委任credentialまたはrole credentialが必要
````

## fence:141-165/line:2

原文:

````text
Agent control boundary
````

日本語補足（agent-reviewed）:

````text
Agentの管理境界
````

## fence:141-165/line:3

原文:

````text
Agent runtime<br/>runtime authentication key
````

日本語補足（agent-reviewed）:

````text
Agent実行環境<br/>実行時認証鍵
````

## fence:141-165/line:4

原文:

````text
Held delegation credential
````

日本語補足（agent-reviewed）:

````text
保有する委任credential
````

## fence:141-165/line:6

原文:

````text
DID-document hosting boundary
````

日本語補足（agent-reviewed）:

````text
DID Documentのホスティング境界
````

## fence:141-165/line:7

原文:

````text
Agent DID document<br/>authentication key and metadata digest
````

日本語補足（agent-reviewed）:

````text
AgentのDID Document<br/>認証鍵とメタデータのダイジェスト
````

## fence:141-165/line:9

原文:

````text
Metadata hosting boundary
````

日本語補足（agent-reviewed）:

````text
メタデータのホスティング境界
````

## fence:141-165/line:10

原文:

````text
Standard CIMD and JWKS
````

日本語補足（agent-reviewed）:

````text
標準CIMDおよびJWKS
````

## fence:141-165/line:12

原文:

````text
Credential issuer boundary
````

日本語補足（agent-reviewed）:

````text
credential発行者の境界
````

## fence:141-165/line:13

原文:

````text
User or organization<br/>issuing key and status list
````

日本語補足（agent-reviewed）:

````text
ユーザーまたは組織<br/>発行鍵とstatus list
````

## fence:141-165/line:15

原文:

````text
Resource owner
````

日本語補足（agent-reviewed）:

````text
リソース所有者
````

## fence:141-165/line:15

原文:

````text
Authorization server
````

日本語補足（agent-reviewed）:

````text
認可サーバー
````

## fence:141-165/line:16

原文:

````text
issues delegation credential
````

日本語補足（agent-reviewed）:

````text
委任credentialを発行する
````

## fence:141-165/line:17

原文:

````text
Optional DID binding: URL, keys and pinned digest
````

日本語補足（agent-reviewed）:

````text
任意のDID binding: URL、鍵、固定したダイジェスト
````

## fence:141-165/line:18

原文:

````text
Standard metadata and client public keys
````

日本語補足（agent-reviewed）:

````text
標準メタデータとclientの公開鍵
````

## fence:141-165/line:19

原文:

````text
client assertion and OAuth grant
````

日本語補足（agent-reviewed）:

````text
client assertionとOAuth grant
````

## fence:141-165/line:20

原文:

````text
issuer DID and credential status
````

日本語補足（agent-reviewed）:

````text
issuerのDIDとcredentialの状態
````

## fence:141-165/line:21

原文:

````text
resource-specific token
````

日本語補足（agent-reviewed）:

````text
対象リソース専用のトークン
````

## fence:141-165/line:22

原文:

````text
Resource server or peer Agent<br/>deterministic policy
````

日本語補足（agent-reviewed）:

````text
リソースサーバーまたは相手Agent<br/>決定的なポリシー
````

## fence:141-165/line:22

原文:

````text
token and action, or direct VP
````

日本語補足（agent-reviewed）:

````text
トークンとaction、または直接のVP
````

## fence:141-165/line:23

原文:

````text
issuer trust / token status
````

日本語補足（agent-reviewed）:

````text
issuerへの信頼／トークンの状態
````

## fence:263-274/line:2

原文:

````text
CIMD URL client request
````

日本語補足（agent-reviewed）:

````text
CIMD URL clientの要求
````

## fence:263-274/line:2

原文:

````text
Validate CIMD and local admission
````

日本語補足（agent-reviewed）:

````text
CIMDとローカルな受入れ条件を検証する
````

## fence:263-274/line:4

原文:

````text
Validate DID, URL, metadata digest and key policy
````

日本語補足（agent-reviewed）:

````text
DID、URL、メタデータのダイジェスト、鍵ポリシーを検証する
````

## fence:263-274/line:5

原文:

````text
Verify fresh standard client assertion
````

日本語補足（agent-reviewed）:

````text
新しい標準client assertionを検証する
````

## fence:263-274/line:7

原文:

````text
Reject without mode fallback
````

日本語補足（agent-reviewed）:

````text
モードのフォールバックを行わず拒否する
````

## fence:263-274/line:8

原文:

````text
Check independent grant, user, resource and scope
````

日本語補足（agent-reviewed）:

````text
独立したgrant、ユーザー、リソース、scopeを検査する
````

## fence:263-274/line:9

原文:

````text
Issue resource-specific token
````

日本語補足（agent-reviewed）:

````text
対象リソース専用のトークンを発行する
````

## fence:386-398/line:2

原文:

````text
Client assertion for a CIMD URL
````

日本語補足（agent-reviewed）:

````text
CIMD URLに対するclient assertion
````

## fence:386-398/line:2

原文:

````text
Select accepted JWKS key and authentication policy
````

日本語補足（agent-reviewed）:

````text
受け入れるJWKS鍵と認証ポリシーを選択する
````

## fence:386-398/line:4

原文:

````text
Validate current DID, URL, digest and actual key
````

日本語補足（agent-reviewed）:

````text
現在のDID、URL、ダイジェスト、実際の鍵を検証する
````

## fence:386-398/line:5

原文:

````text
Verify JWT signature, claims and freshness
````

日本語補足（agent-reviewed）:

````text
JWT署名、claim、鮮度を検証する
````

## fence:386-398/line:7

原文:

````text
Reject without fallback
````

日本語補足（agent-reviewed）:

````text
フォールバックせず拒否する
````

## fence:386-398/line:8

原文:

````text
Enforce replay controls
````

日本語補足（agent-reviewed）:

````text
replay防止を強制する
````

## fence:386-398/line:9

原文:

````text
Evaluate grant and requested resource permissions
````

日本語補足（agent-reviewed）:

````text
grantと、要求されたリソースへの権限を評価する
````

## fence:386-398/line:10

原文:

````text
Issue token
````

日本語補足（agent-reviewed）:

````text
トークンを発行する
````

## fence:433-468/line:2

原文:

````text
User / system browser
````

日本語補足（agent-reviewed）:

````text
ユーザー／システムのブラウザー
````

## fence:433-468/line:4

原文:

````text
Resource server
````

日本語補足（agent-reviewed）:

````text
リソースサーバー
````

## fence:433-468/line:5

原文:

````text
Authorization server
````

日本語補足（agent-reviewed）:

````text
認可サーバー
````

## fence:433-468/line:6

原文:

````text
Public CIMD / JWKS / DID hosts
````

日本語補足（agent-reviewed）:

````text
公開CIMD／JWKS／DIDのホスト
````

## fence:433-468/line:7

原文:

````text
Request resource without token
````

日本語補足（agent-reviewed）:

````text
トークンなしでリソースを要求する
````

## fence:433-468/line:8

原文:

````text
401 and resource_metadata
````

日本語補足（agent-reviewed）:

````text
401とresource_metadata
````

## fence:433-468/line:9

原文:

````text
Validate issuer, CIMD and selected capabilities
````

日本語補足（agent-reviewed）:

````text
issuer、CIMD、選択した機能を検証する
````

## fence:433-468/line:10

原文:

````text
Open authorize URL (CIMD URL, resource, state, S256)
````

日本語補足（agent-reviewed）:

````text
authorize URLを開く（CIMD URL、resource、state、S256）
````

## fence:433-468/line:11

原文:

````text
Standard authorization request
````

日本語補足（agent-reviewed）:

````text
標準の認可要求
````

## fence:433-468/line:12

原文:

````text
Fetch CIMD and accepted JWKS
````

日本語補足（agent-reviewed）:

````text
CIMDと受け入れるJWKSを取得する
````

## fence:433-468/line:13

原文:

````text
Standard metadata and public keys
````

日本語補足（agent-reviewed）:

````text
標準メタデータと公開鍵
````

## fence:433-468/line:14

原文:

````text
Advertised DID-bound processing
````

日本語補足（agent-reviewed）:

````text
広告されたDID-bound処理
````

## fence:433-468/line:15

原文:

````text
Resolve and method-validate associated DID
````

日本語補足（agent-reviewed）:

````text
関連DIDを解決し、メソッドの規則で検証する
````

## fence:433-468/line:16

原文:

````text
Service URL, digest and allowed keys
````

日本語補足（agent-reviewed）:

````text
サービスURL、ダイジェスト、許可された鍵
````

## fence:433-468/line:17

原文:

````text
Verify binding before accepting metadata
````

日本語補足（agent-reviewed）:

````text
メタデータを受け入れる前にbindingを検証する
````

## fence:433-468/line:19

原文:

````text
Apply admission and approve callback
````

日本語補足（agent-reviewed）:

````text
受入れ条件を適用し、callbackを承認する
````

## fence:433-468/line:20

原文:

````text
Authenticate user and request scoped consent
````

日本語補足（agent-reviewed）:

````text
ユーザーを認証し、scopeを限定した同意を求める
````

## fence:433-468/line:21

原文:

````text
Approve or deny
````

日本語補足（agent-reviewed）:

````text
承認または拒否
````

## fence:433-468/line:22

原文:

````text
User approves
````

日本語補足（agent-reviewed）:

````text
ユーザーが承認する
````

## fence:433-468/line:23

原文:

````text
Code and state, iss when selected
````

日本語補足（agent-reviewed）:

````text
codeとstate、選択した場合はiss
````

## fence:433-468/line:24

原文:

````text
Approved HTTPS or loopback callback
````

日本語補足（agent-reviewed）:

````text
承認済みのHTTPSまたはloopback callback
````

## fence:433-468/line:25

原文:

````text
Validate session and pinned issuer strategy
````

日本語補足（agent-reviewed）:

````text
sessionと固定したissuer方針を検証する
````

## fence:433-468/line:26

原文:

````text
Code, exact callback, verifier, fresh assertion, target binding
````

日本語補足（agent-reviewed）:

````text
code、正確なcallback、verifier、新しいassertion、宛先binding
````

## fence:433-468/line:27

原文:

````text
Verify current key/binding, assertion, code and grant
````

日本語補足（agent-reviewed）:

````text
現在の鍵／binding、assertion、code、grantを検証する
````

## fence:433-468/line:28

原文:

````text
Resource-specific access token
````

日本語補足（agent-reviewed）:

````text
対象リソース専用のアクセストークン
````

## fence:433-468/line:29

原文:

````text
Token and permitted action
````

日本語補足（agent-reviewed）:

````text
トークンと許可されたaction
````

## fence:433-468/line:30

原文:

````text
Validate token, current authorization and operation policy
````

日本語補足（agent-reviewed）:

````text
トークン、現在の認可、操作ポリシーを検証する
````

## fence:433-468/line:31

原文:

````text
User denies
````

日本語補足（agent-reviewed）:

````text
ユーザーが拒否する
````

## fence:433-468/line:32

原文:

````text
Error on approved callback, state, iss when selected
````

日本語補足（agent-reviewed）:

````text
承認済みcallbackでエラー、state、選択した場合はiss
````

## fence:433-468/line:33

原文:

````text
Validate error binding and stop
````

日本語補足（agent-reviewed）:

````text
エラーのbindingを検証して停止する
````

## fence:497-511/line:2

原文:

````text
Upstream caller
````

日本語補足（agent-reviewed）:

````text
上流の呼出し元
````

## fence:497-511/line:3

原文:

````text
Agent A<br/>inbound RS and downstream client
````

日本語補足（agent-reviewed）:

````text
Agent A<br/>受信側RS兼、下流へのclient
````

## fence:497-511/line:4

原文:

````text
Authorization server accepted by B<br/>independent B grant and policy
````

日本語補足（agent-reviewed）:

````text
Bが受け入れる認可サーバー<br/>Bに対する独立したgrantとポリシー
````

## fence:497-511/line:5

原文:

````text
Service B<br/>validate audience and permissions
````

日本語補足（agent-reviewed）:

````text
サービスB<br/>audienceと権限を検証する
````

## fence:497-511/line:6

原文:

````text
B rejects an A-targeted token<br/>no token exchange in v1
````

日本語補足（agent-reviewed）:

````text
BはA宛てのトークンを拒否する<br/>v1ではトークン交換を行わない
````

## fence:497-511/line:7

原文:

````text
A-targeted token
````

日本語補足（agent-reviewed）:

````text
A宛てのトークン
````

## fence:497-511/line:8

原文:

````text
Fresh client assertion and independent B grant
````

日本語補足（agent-reviewed）:

````text
新しいclient assertionとBへの独立したgrant
````

## fence:497-511/line:9

原文:

````text
B-targeted access token
````

日本語補足（agent-reviewed）:

````text
B宛てのアクセストークン
````

## fence:497-511/line:10

原文:

````text
B-targeted token and permitted operation
````

日本語補足（agent-reviewed）:

````text
B宛てのトークンと許可された操作
````

## fence:497-511/line:11

原文:

````text
Forwarding an A-targeted token to B
````

日本語補足（agent-reviewed）:

````text
A宛てのトークンをBへ転送する
````

## fence:774-783/line:3

原文:

````text
Revalidate DID policy, CIMD and JWKS as applicable
````

日本語補足（agent-reviewed）:

````text
該当するDIDポリシー、CIMD、JWKSを再検証する
````

## fence:774-783/line:3

原文:

````text
Runtime key only
````

日本語補足（agent-reviewed）:

````text
実行時の鍵のみ
````

## fence:774-783/line:4

原文:

````text
Retain eligible grants, reject removed keys once observed
````

日本語補足（agent-reviewed）:

````text
適格なgrantを保持し、削除された鍵を観測した時点で拒否する
````

## fence:774-783/line:4

原文:

````text
Valid and policy permits
````

日本語補足（agent-reviewed）:

````text
有効で、ポリシーが許可する
````

## fence:774-783/line:5

原文:

````text
Reject without stale-key or mode fallback
````

日本語補足（agent-reviewed）:

````text
古い鍵や別モードへフォールバックせず拒否する
````

## fence:774-783/line:6

原文:

````text
New OAuth client, no automatic grant transfer
````

日本語補足（agent-reviewed）:

````text
新しいOAuth client。grantの自動移転はしない
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
Enhanced mode requires explicit rebinding
````

日本語補足（agent-reviewed）:

````text
強化モードでは明示的なbindingのやり直しが必要
````

## fence:774-783/line:7

原文:

````text
DID at same URL
````

日本語補足（agent-reviewed）:

````text
同じURLにあるDID
````

## fence:774-783/line:8

原文:

````text
Block affected issuance and apply revocation policy
````

日本語補足（agent-reviewed）:

````text
影響する発行を止め、失効ポリシーを適用する
````
