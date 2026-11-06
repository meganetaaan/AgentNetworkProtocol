# standard/W3C-proposal/DID-OAuth-Integration-Solution-cn.md のコード例・図ラベルの日本語補足

原文: [standard/W3C-proposal/DID-OAuth-Integration-Solution-cn.md](../../../../../standard/W3C-proposal/DID-OAuth-Integration-Solution-cn.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:36-57/line:3:column:9

原文:

````text
主体是谁
````

日本語補足（agent-reviewed）:

````text
主体は誰か
````

## fence:36-57/line:10:column:9

原文:

````text
主体能做什么
````

日本語補足（agent-reviewed）:

````text
主体が何をできるか
````

## fence:203-244/line:5

原文:

````text
Resource Server<br/>(标准OAuth RS)
````

日本語補足（agent-reviewed）:

````text
Resource Server<br/>（標準OAuth RS）
````

## fence:203-244/line:6

原文:

````text
OAuth AS<br/>(标准OAuth AS)
````

日本語補足（agent-reviewed）:

````text
OAuth AS<br/>（標準OAuth AS）
````

## fence:203-244/line:7

原文:

````text
DID-auth<br/>(OIDC Provider)
````

日本語補足（agent-reviewed）:

````text
DID-auth<br/>（OIDC Provider）
````

## fence:203-244/line:10

原文:

````text
GET /api/resource<br/>(无Authorization头)
````

日本語補足（agent-reviewed）:

````text
GET /api/resource<br/>（Authorizationヘッダーなし）
````

## fence:203-244/line:12

原文:

````text
检查token：不存在
````

日本語補足（agent-reviewed）:

````text
tokenを確認：存在しない
````

## fence:203-244/line:14

原文:

````text
401 Unauthorized<br/>WWW-Authenticate: DPoP realm="anp",<br/>  as_uri="https://as.example.com"
````

日本語補足（technical-retained）:

````text
401 Unauthorized<br/>WWW-Authenticate: DPoP realm="anp",<br/>  as_uri="https://as.example.com"
````

注: プロトコルの要求・応答・ヘッダー・scope・識別子の技術表記を保持。人向け本文ではなくコード例の値。

## fence:203-244/line:16

原文:

````text
标准OAuth发现流程<br/>解析WWW-Authenticate
````

日本語補足（agent-reviewed）:

````text
標準OAuth発見フロー<br/>WWW-Authenticateを解析
````

## fence:203-244/line:18

原文:

````text
POST /token<br/>(尝试获取Access Token)
````

日本語補足（agent-reviewed）:

````text
POST /token<br/>（Access Tokenの取得を試行）
````

## fence:203-244/line:22

原文:

````text
AS告知需要从DID-auth认证<br/>(AS可配置多个IdP)
````

日本語補足（agent-reviewed）:

````text
ASがDID-authでの認証が必要と通知<br/>（ASに複数のIdPを設定可能）
````

## fence:203-244/line:26

原文:

````text
验证VP<br/>提取VC claims<br/>生成ID Token
````

日本語補足（agent-reviewed）:

````text
VPを検証<br/>VC claimsを抽出<br/>ID Tokenを生成
````

## fence:203-244/line:28

原文:

````text
ID Token (标准JWT)
````

日本語補足（agent-reviewed）:

````text
ID Token（標準JWT）
````

## fence:203-244/line:30

原文:

````text
POST /token<br/>grant_type=token-exchange<br/>subject_token=<ID Token><br/>subject_token_type=id_token
````

日本語補足（technical-retained）:

````text
POST /token<br/>grant_type=token-exchange<br/>subject_token=<ID Token><br/>subject_token_type=id_token
````

注: プロトコルの要求・応答・ヘッダー・scope・識別子の技術表記を保持。人向け本文ではなくコード例の値。

## fence:203-244/line:32

原文:

````text
验证ID Token<br/>(通过DID-auth的jwks)<br/>提取vc_claims<br/>构造RAR
````

日本語補足（agent-reviewed）:

````text
ID Tokenを検証<br/>（DID-authのjwksを使用）<br/>vc_claimsを抽出<br/>RARを構築
````

## fence:203-244/line:34

原文:

````text
Access Token + Refresh Token<br/>(标准OAuth响应)
````

日本語補足（agent-reviewed）:

````text
Access Token＋Refresh Token<br/>（標準OAuth応答）
````

## fence:203-244/line:38

原文:

````text
验证Access Token<br/>(标准OAuth验证)
````

日本語補足（agent-reviewed）:

````text
Access Tokenを検証<br/>（標準OAuth検証）
````

## fence:255-292/line:5

原文:

````text
Resource Server
````

日本語補足（agent-reviewed）:

````text
リソースサーバー
````

## fence:255-292/line:6

原文:

````text
OAuth AS
````

日本語補足（technical-retained）:

````text
OAuth AS
````

注: プロトコルの要求・応答・ヘッダー・scope・識別子の技術表記を保持。人向け本文ではなくコード例の値。

## fence:255-292/line:11

原文:

````text
验证token签名：✓<br/>检查exp：已过期 ✗
````

日本語補足（agent-reviewed）:

````text
tokenの署名を検証：✓<br/>expを確認：期限切れ ✗
````

## fence:255-292/line:13

原文:

````text
401 Unauthorized<br/>error="invalid_token",<br/>error_description="token expired"
````

日本語補足（technical-retained）:

````text
401 Unauthorized<br/>error="invalid_token",<br/>error_description="token expired"
````

注: HTTP応答例のerror値を保持。token expiredは「トークンの有効期限切れ」を意味する。

## fence:255-292/line:15

原文:

````text
标准OAuth刷新流程
````

日本語補足（agent-reviewed）:

````text
標準OAuth更新フロー
````

## fence:255-292/line:19

原文:

````text
Refresh Token有效
````

日本語補足（agent-reviewed）:

````text
Refresh Tokenが有効
````

## fence:255-292/line:20

原文:

````text
新的Access Token<br/>(标准OAuth响应)
````

日本語補足（agent-reviewed）:

````text
新しいAccess Token<br/>（標準OAuth応答）
````

## fence:255-292/line:23

原文:

````text
Refresh Token也过期
````

日本語補足（agent-reviewed）:

````text
Refresh Tokenも期限切れ
````

## fence:255-292/line:24

原文:

````text
400 Bad Request<br/>{<br/>  "error": "invalid_grant",<br/>  "idp_uri": "https://did-auth.example.com"<br/>}
````

日本語補足（technical-retained）:

````text
400 Bad Request<br/>{<br/>  "error": "invalid_grant",<br/>  "idp_uri": "https://did-auth.example.com"<br/>}
````

注: プロトコルの要求・応答・ヘッダー・scope・識別子の技術表記を保持。人向け本文ではなくコード例の値。

## fence:255-292/line:26

原文:

````text
需要重新认证
````

日本語補足（agent-reviewed）:

````text
再認証が必要
````

## fence:255-292/line:28

原文:

````text
POST /token<br/>(重新DID认证)
````

日本語補足（agent-reviewed）:

````text
POST /token<br/>（DID再認証）
````

## fence:255-292/line:29

原文:

````text
新ID Token
````

日本語補足（agent-reviewed）:

````text
新しいID Token
````

## fence:255-292/line:31

原文:

````text
POST /token<br/>(Token Exchange)
````

日本語補足（agent-reviewed）:

````text
POST /token<br/>（トークン交換）
````

## fence:255-292/line:32

原文:

````text
新Access Token + Refresh Token
````

日本語補足（agent-reviewed）:

````text
新しいAccess Token＋Refresh Token
````

## fence:303-338/line:3

原文:

````text
Web Application
````

日本語補足（agent-reviewed）:

````text
Webアプリケーション
````

## fence:303-338/line:4

原文:

````text
DID-auth<br/>(OIDC Provider)
````

日本語補足（agent-reviewed）:

````text
DID-auth<br/>（OIDC Provider）
````

## fence:303-338/line:5

原文:

````text
OAuth AS
````

日本語補足（technical-retained）:

````text
OAuth AS
````

注: プロトコルの要求・応答・ヘッダー・scope・識別子の技術表記を保持。人向け本文ではなくコード例の値。

## fence:303-338/line:6

原文:

````text
Resource Server
````

日本語補足（agent-reviewed）:

````text
リソースサーバー
````

## fence:303-338/line:8

原文:

````text
访问需认证的页面
````

日本語補足（agent-reviewed）:

````text
認証が必要なページへアクセス
````

## fence:303-338/line:10

原文:

````text
重定向到/authorize<br/>(标准OIDC Authorization Code Flow)
````

日本語補足（agent-reviewed）:

````text
/authorizeへリダイレクト<br/>（標準OIDC Authorization Code Flow）
````

## fence:303-338/line:12

原文:

````text
显示DID钱包连接页面
````

日本語補足（agent-reviewed）:

````text
DIDウォレット接続ページを表示
````

## fence:303-338/line:14

原文:

````text
打开钱包，签名VP
````

日本語補足（agent-reviewed）:

````text
ウォレットを開き、VPに署名
````

## fence:303-338/line:16

原文:

````text
提交VP
````

日本語補足（agent-reviewed）:

````text
VPを送信
````

## fence:303-338/line:18

原文:

````text
验证VP
````

日本語補足（agent-reviewed）:

````text
VPを検証
````

## fence:303-338/line:20

原文:

````text
重定向回调<br/>code=<authorization_code>
````

日本語補足（agent-reviewed）:

````text
コールバックへリダイレクト<br/>code=<authorization_code>
````

## fence:303-338/line:24

原文:

````text
ID Token + Access Token<br/>(标准OIDC响应)
````

日本語補足（agent-reviewed）:

````text
ID Token＋Access Token<br/>（標準OIDC応答）
````

## fence:303-338/line:26

原文:

````text
POST /token<br/>grant_type=token-exchange<br/>subject_token=<ID Token>
````

日本語補足（technical-retained）:

````text
POST /token<br/>grant_type=token-exchange<br/>subject_token=<ID Token>
````

注: プロトコルの要求・応答・ヘッダー・scope・識別子の技術表記を保持。人向け本文ではなくコード例の値。

## fence:303-338/line:28

原文:

````text
Access Token (OAuth)
````

日本語補足（agent-reviewed）:

````text
アクセストークン（OAuth）
````

## fence:303-338/line:30

原文:

````text
API请求<br/>Authorization: DPoP <token>
````

日本語補足（agent-reviewed）:

````text
API要求<br/>Authorization: DPoP <token>
````

## fence:303-338/line:32

原文:

````text
Protected Resource
````

日本語補足（agent-reviewed）:

````text
保護対象リソース
````

## fence:303-338/line:34

原文:

````text
显示结果
````

日本語補足（agent-reviewed）:

````text
結果を表示
````

## fence:369-389/line:4

原文:

````text
OAuth AS
````

日本語補足（technical-retained）:

````text
OAuth AS
````

注: プロトコルの要求・応答・ヘッダー・scope・識別子の技術表記を保持。人向け本文ではなくコード例の値。

## fence:369-389/line:5

原文:

````text
DID-auth<br/>(OIDC IdP)
````

日本語補足（agent-reviewed）:

````text
DID-auth<br/>（OIDC IdP）
````

## fence:369-389/line:6

原文:

````text
1. 生成 PKCE<br/>code_verifier + code_challenge
````

日本語補足（agent-reviewed）:

````text
1. PKCEを生成<br/>code_verifier + code_challenge
````

## fence:369-389/line:9

原文:

````text
HTTP 库跟随重定向
````

日本語補足（agent-reviewed）:

````text
HTTPライブラリがリダイレクトをたどる
````

## fence:369-389/line:10

原文:

````text
GET /authorize + VP参数<br/>或 POST /authorize {vp: ...}<br/>⭐ 直接在请求中携带 DID 签名/VP
````

日本語補足（agent-reviewed）:

````text
GET /authorize＋VPパラメーター<br/>またはPOST /authorize {vp: ...}<br/>⭐ 要求にDID署名／VPを直接含める
````

## fence:369-389/line:11

原文:

````text
验证 VP：<br/>✓ DID 签名有效<br/>✓ VC issuer 可信<br/>✓ VC 未撤销
````

日本語補足（agent-reviewed）:

````text
VPを検証：<br/>✓ DID署名が有効<br/>✓ VC issuerが信頼できる<br/>✓ VCが取り消されていない
````

## fence:369-389/line:13

原文:

````text
HTTP 库跟随重定向
````

日本語補足（agent-reviewed）:

````text
HTTPライブラリがリダイレクトをたどる
````

## fence:369-389/line:15

原文:

````text
后台调用 DID-auth /token<br/>用 idp_code 换 ID Token<br/>验证 ID Token<br/>生成 AS 自己的 code
````

日本語補足（agent-reviewed）:

````text
バックエンドでDID-auth /tokenを呼び出す<br/>idp_codeをID Tokenに交換<br/>ID Tokenを検証<br/>AS独自のcodeを生成
````

## fence:369-389/line:17

原文:

````text
⭐ 截获此 302<br/>不真的访问 redirect_uri<br/>从 Location 提取 code
````

日本語補足（agent-reviewed）:

````text
⭐ この302を捕捉<br/>redirect_uriへ実際にはアクセスせず<br/>Locationからcodeを抽出
````

## fence:369-389/line:18

原文:

````text
POST /token<br/>grant_type=authorization_code<br/>code=as_code<br/>code_verifier=原始值<br/>client_id=did-agent-public<br/>redirect_uri=https://localhost/callback
````

日本語補足（agent-reviewed）:

````text
POST /token<br/>grant_type=authorization_code<br/>code=as_code<br/>code_verifier=元の値<br/>client_id=did-agent-public<br/>redirect_uri=https://localhost/callback
````

## fence:369-389/line:19

原文:

````text
Access Token + Refresh Token
````

日本語補足（agent-reviewed）:

````text
Access Token＋Refresh Token
````

## fence:392-419/line:4

原文:

````text
生成 PKCE
````

日本語補足（agent-reviewed）:

````text
PKCEを生成
````

## fence:392-419/line:9

原文:

````text
在 /authorize 请求中携带
````

日本語補足（agent-reviewed）:

````text
/authorize要求に含める
````

## fence:392-419/line:19

原文:

````text
在 /token 请求中携带 code_verifier
````

日本語補足（agent-reviewed）:

````text
/token要求にcode_verifierを含める
````

## fence:392-419/line:25

原文:

````text
必须
````

日本語補足（agent-reviewed）:

````text
必須
````

## fence:448-479/line:3

原文:

````text
配置 HTTP 客户端
````

日本語補足（agent-reviewed）:

````text
HTTPクライアントを設定
````

## fence:448-479/line:5

原文:

````text
手动处理重定向链
````

日本語補足（agent-reviewed）:

````text
リダイレクトチェーンを手動で処理
````

## fence:448-479/line:9

原文:

````text
检查是否是最终重定向（到 redirect_uri）
````

日本語補足（agent-reviewed）:

````text
最終リダイレクト（redirect_uri宛て）かを確認
````

## fence:448-479/line:11

原文:

````text
截获！从 URL 提取 code
````

日本語補足（agent-reviewed）:

````text
捕捉し、URLからcodeを抽出
````

## fence:448-479/line:16

原文:

````text
如果是到 DID-auth，需要附带 VP
````

日本語補足（agent-reviewed）:

````text
DID-auth宛ての場合はVPの添付が必要
````

## fence:448-479/line:25

原文:

````text
用 code 换 token
````

日本語補足（agent-reviewed）:

````text
codeをtokenへ交換
````

## fence:558-564/line:5:column:21

原文:

````text
The access token expired
````

日本語補足（agent-reviewed）:

````text
アクセストークンの有効期限が切れました
````

## fence:579-589/line:6:column:24

原文:

````text
Authentication with identity provider required
````

日本語補足（agent-reviewed）:

````text
アイデンティティプロバイダーでの認証が必要です
````

## fence:773-778/line:1:column:11

原文:

````text
谁
````

日本語補足（agent-reviewed）:

````text
誰か
````

## fence:773-778/line:3:column:22

原文:

````text
read write
````

日本語補足（technical-retained）:

````text
read write
````

注: プロトコルの要求・応答・ヘッダー・scope・識別子の技術表記を保持。人向け本文ではなくコード例の値。

## fence:782-789/line:1:column:17

原文:

````text
谁的什么属性
````

日本語補足（agent-reviewed）:

````text
誰のどの属性か
````

## fence:948-978/line:4

原文:

````text
OAuth Client
````

日本語補足（agent-reviewed）:

````text
OAuthクライアント
````

## fence:948-978/line:6

原文:

````text
DID-auth (OIDC Provider)
````

日本語補足（agent-reviewed）:

````text
DID-auth（OIDCプロバイダー）
````

## fence:948-978/line:7

原文:

````text
OAuth Authorization Server
````

日本語補足（agent-reviewed）:

````text
OAuth認可サーバー
````

## fence:948-978/line:8

原文:

````text
Resource Server
````

日本語補足（agent-reviewed）:

````text
リソースサーバー
````

## fence:948-978/line:11

原文:

````text
Authorization / Token Request (client_id, ...)
````

日本語補足（agent-reviewed）:

````text
認可／トークン要求（client_idなど）
````

## fence:948-978/line:12

原文:

````text
Authn required (idp_uri = DIDAuth)
````

日本語補足（agent-reviewed）:

````text
認証が必要（idp_uri = DIDAuth）
````

## fence:948-978/line:15

原文:

````text
Start DID-auth (authorize or direct token)
````

日本語補足（agent-reviewed）:

````text
DID-authを開始（認可または直接のトークン要求）
````

## fence:948-978/line:16

原文:

````text
Request DID signature + VC/Personhood (optional)
````

日本語補足（agent-reviewed）:

````text
DID署名＋VC/Personhoodを要求（任意）
````

## fence:948-978/line:17

原文:

````text
Verifiable Presentation (VP)
````

日本語補足（agent-reviewed）:

````text
Verifiable Presentation（VP）
````

## fence:948-978/line:18

原文:

````text
ID Token (JWT) incl. vc_claims + client_id + cnf
````

日本語補足（agent-reviewed）:

````text
ID Token（JWT）：vc_claims＋client_id＋cnfを含む
````

## fence:948-978/line:21

原文:

````text
Token Exchange (subject_token = ID Token)
````

日本語補足（agent-reviewed）:

````text
トークン交換（subject_token = ID Token）
````

## fence:948-978/line:22

原文:

````text
Verify ID Token (jwks_uri), bind client pre-reg
````

日本語補足（agent-reviewed）:

````text
ID Tokenを検証（jwks_uri）し、クライアントの事前登録をバインド
````

## fence:948-978/line:23

原文:

````text
Map vc_claims -> RAR (authorization_details)
````

日本語補足（agent-reviewed）:

````text
vc_claimsをRAR（authorization_details）へ対応付ける
````

## fence:948-978/line:24

原文:

````text
Access Token (DPoP-bound) + Refresh Token
````

日本語補足（agent-reviewed）:

````text
アクセストークン（DPoPにバインド）＋Refresh Token
````

## fence:948-978/line:27

原文:

````text
DPoP Proof + Access Token
````

日本語補足（agent-reviewed）:

````text
DPoP Proof＋Access Token
````

## fence:948-978/line:28

原文:

````text
Validate token + validate DPoP + enforce RAR/UMA
````

日本語補足（agent-reviewed）:

````text
tokenを検証＋DPoPを検証＋RAR/UMAを適用
````

## fence:948-978/line:29

原文:

````text
Protected Resource
````

日本語補足（agent-reviewed）:

````text
保護対象リソース
````

## fence:7-28

原文:

````text
┌─────────────────────────────────────────────────────────┐
│                    OAuth 生态                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Client     │  │     AS       │  │     RS       │  │
│  │  (不变)      │  │  (不变)      │  │  (不变)      │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│         │                 │                  │           │
│         │                 │                  │           │
│         │          ┌──────▼──────┐           │           │
│         │          │   Authn层   │           │           │
│         └─────────►│  (可插拔)   │           │           │
│                    └──────────────┘           │           │
│                          │                    │           │
│                    ┌─────▼──────┐             │           │
│                    │ DID-auth   │             │           │
│                    │ (OIDC IdP) │             │           │
│                    └────────────┘             │           │
└─────────────────────────────────────────────────────────┘

关键：DID-auth是OAuth认证层的一个可选实现，不改变OAuth的授权架构
````

日本語補足（agent-reviewed）:

````text
OAuthのエコシステム
- Client（クライアント）：変更なし。
- AS（認可サーバー）：変更なし。
- RS（リソースサーバー）：変更なし。
- Authn層（認証層）：差し替え可能。図ではClientとASからこの層につながる。
- Authn層の下にDID-auth（OIDC IdP）がつながる。

要点：DID-authはOAuth認証層の任意の実装の一つであり、OAuthの認可アーキテクチャを変更しません。
````

## fence:36-57

原文:

````text
┌─────────────────────────────────────────┐
│         Authn Layer (认证层)             │
│  职责：确认"主体是谁"                     │
│  实现：密码/OIDC/SAML/DID-auth          │
│  输出：认证凭证（如ID Token）            │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Authz Layer (授权层)             │
│  职责：决定"主体能做什么"                 │
│  实现：OAuth AS (token颁发)              │
│  输出：Access Token + Refresh Token      │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      Resource Access (资源访问)          │
│  职责：执行访问控制                       │
│  实现：Resource Server                   │
│  验证：Access Token + 策略               │
└─────────────────────────────────────────┘
````

日本語補足（agent-reviewed）:

````text
Authn Layer（認証層）
- 責務：「主体は誰か」を確認する。
- 実装：パスワード／OIDC／SAML／DID-auth。
- 出力：認証資格情報（例：ID Token）。
 ↓
Authz Layer（認可層）
- 責務：「主体が何をできるか」を決定する。
- 実装：OAuth AS（tokenの発行）。
- 出力：Access Token + Refresh Token。
 ↓
Resource Access（リソースアクセス）
- 責務：アクセス制御を実行する。
- 実装：Resource Server。
- 検証：Access Token＋ポリシー。
````

## fence:159-183

原文:

````text
┌────────────────────────────────────────────────────┐
│              DID-auth (OIDC Provider)              │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │  标准OIDC端点                                 │ │
│  │  ├── /.well-known/openid-configuration       │ │
│  │  ├── /token (ID Token颁发)                   │ │
│  │  ├── /jwks (公钥端点)                        │ │
│  │  └── /authorize (浏览器场景)                 │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │  DID/VC/VP验证能力                           │ │
│  │  ├── DID解析                                 │ │
│  │  ├── VP签名验证                              │ │
│  │  ├── VC签名验证                              │ │
│  │  ├── Personhood VC验证                       │ │
│  │  └── VC撤销检查                              │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  输出：标准ID Token (JWT)                          │
│        包含vc_claims (已验证的VC内容)              │
└────────────────────────────────────────────────────┘
````

日本語補足（agent-reviewed）:

````text
DID-auth（OIDC Provider）

標準OIDCエンドポイント：
- /.well-known/openid-configuration
- /token：ID Tokenの発行。
- /jwks：公開鍵エンドポイント。
- /authorize：ブラウザーを使う場面。

DID/VC/VPの検証機能：
- DIDの解決。
- VPの署名検証。
- VCの署名検証。
- Personhood VCの検証。
- VCの取り消し確認。

出力：標準ID Token（JWT）。
vc_claims（検証済みのVC内容）を含みます。
````

## fence:351-367

原文:

````text
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  核心思路：                                              │
│                                                         │
│  • Agent 用 HTTP 库处理 302 重定向（模拟浏览器）        │
│  • IdP (DID-auth) 支持在请求中直接接受 VP 认证          │
│  • Agent 截获最终重定向，从 URL 提取 code               │
│  • 使用标准 Authorization Code 换取 Access Token        │
│                                                         │
│  优势：                                                  │
│  ✅ 兼容性最强（几乎所有 AS 都支持 Auth Code Flow）     │
│  ✅ 不需要 AS 支持 Token Exchange                       │
│  ✅ 安全性由 IdP 的 DID/VC 验证保证                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
````

日本語補足（agent-reviewed）:

````text
中心となる考え方：
- エージェントがHTTPライブラリを使って302リダイレクトを処理する（ブラウザーの動作を模擬）。
- IdP（DID-auth）が、要求内でVP認証を直接受け付けることに対応する。
- エージェントが最後のリダイレクトを捕捉し、URLからcodeを抽出する。
- 標準Authorization Codeを使ってAccess Tokenに交換する。

利点：
✅ 最も高い互換性（ほぼすべてのASがAuth Code Flowに対応）。
✅ ASがToken Exchangeに対応する必要がない。
✅ IdPのDID/VC検証によって安全性を保証。
````

## fence:421-446

原文:

````text
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  DID-auth /authorize 端点需要支持：                      │
│                                                         │
│  方式 A：GET 请求带 VP 参数                             │
│  GET /authorize?                                        │
│    response_type=code&                                  │
│    client_id=xxx&                                       │
│    vp_token=<base64url编码的VP>&                       │
│    redirect_uri=...                                     │
│                                                         │
│  方式 B：POST 请求带 JSON body                          │
│  POST /authorize                                        │
│  Content-Type: application/json                         │
│  {                                                      │
│    "response_type": "code",                            │
│    "client_id": "xxx",                                 │
│    "vp": { ... VP内容 ... },                           │
│    "redirect_uri": "..."                               │
│  }                                                      │
│                                                         │
│  验证通过后直接返回 302，不返回 HTML                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
````

日本語補足（agent-reviewed）:

````text
DID-authの/authorizeエンドポイントは、次に対応する必要があります。

方式A：VPパラメーター付きのGET要求。
GET /authorize?
  response_type=code&
  client_id=xxx&
  vp_token=<base64url编码的VP>&
  redirect_uri=...

<base64url编码的VP>は「base64urlで符号化したVP」を示すプレースホルダーです。

方式B：JSON body付きのPOST要求。
POST /authorize
Content-Type: application/json
{
  "response_type": "code",
  "client_id": "xxx",
  "vp": { ... VP内容 ... },
  "redirect_uri": "..."
}

VP内容は「VPの内容」を示すプレースホルダーです。

検証に合格したら、HTMLを返さず302を直接返します。
````

## fence:496-518

原文:

````text
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  安全屏障转移：                                          │
│                                                         │
│  传统 OAuth：                                           │
│    安全依赖 → AS 的 client 注册 + client_secret        │
│                                                         │
│  本方案：                                                │
│    安全依赖 → IdP 的 DID/VC 验证                       │
│                                                         │
│  client_id 的作用降级为：                               │
│    • 满足 AS 形式要求                                   │
│    • 绑定 redirect_uri（AS 验证用）                    │
│    • 配置 PKCE 要求                                     │
│                                                         │
│  真正的身份验证：                                        │
│    ✓ DID 私钥签名（密码学不可伪造）                    │
│    ✓ VC 颁发方验证（权威机构背书）                     │
│    ✓ VC 撤销检查（动态准入控制）                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
````

日本語補足（agent-reviewed）:

````text
安全性を支える境界の移動：

従来のOAuth：
安全性の依存先→ASでのクライアント登録＋client_secret。

この方式：
安全性の依存先→IdPでのDID/VC検証。

client_idの役割を次へ限定：
- ASの形式上の要件を満たす。
- redirect_uriをバインドする（ASでの検証用）。
- PKCE要件を設定する。

実際のアイデンティティ検証：
✓ DID秘密鍵による署名（暗号学的に偽造不可能）。
✓ VC発行者の検証（権威ある機関の裏付け）。
✓ VCの取り消し確認（動的な受け入れ制御）。
````

## fence:535-548

原文:

````text
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  优先使用 Token Exchange：                               │
│    AS 支持 RFC 8693 时                                  │
│    流程更简单，代码更少                                  │
│                                                         │
│  使用模拟 Auth Code Flow：                              │
│    AS 不支持 Token Exchange 时                          │
│    需要最大兼容性时                                      │
│    如 AWS Cognito 等受限环境                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
````

日本語補足（agent-reviewed）:

````text
Token Exchangeを優先する場合：
- ASがRFC 8693に対応しているとき。
- フローが単純になり、コード量が減る。

模擬的なAuth Code Flowを使う場合：
- ASがToken Exchangeに対応していないとき。
- 最大限の互換性が必要なとき。
- 例えば、AWS Cognitoなどの制約のある環境。
````

## fence:773-778

原文:

````text
传统OAuth只知道"谁"：
用户登录 → AS只知道sub="alice"
         → 授予固定scope="read write"
         → 无法根据用户属性动态调整权限
````

日本語補足（agent-reviewed）:

````text
従来のOAuthは「誰か」しか認識しない：
利用者がログイン→ASが知るのはsub="alice"だけ。
 → 固定のscope="read write"を付与。
 → 利用者の属性に応じて権限を動的に調整できない。
````

## fence:782-789

原文:

````text
有了VC Claims，AS知道"谁的什么属性"：
用户提交VP → DID-auth验证VC
           → 提取：personhood=verified, kyc_level=2
           → 这些信息进入ID Token
           → AS根据这些可信属性构造RAR
           → 动态授予细粒度权限
````

日本語補足（agent-reviewed）:

````text
VC Claimsがあれば、ASは「誰のどの属性か」を認識する：
利用者がVPを送信→DID-authがVCを検証。
 → personhood=verified, kyc_level=2を抽出。
 → この情報がID Tokenに入る。
 → ASがこれらの信頼できる属性に基づいてRARを構築。
 → 細かい単位の権限を動的に付与。
````

## fence:876-888

原文:

````text
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  传统OAuth的安全模型：                                   │
│    client_id + client_secret（或mTLS）                 │
│    → 防止未授权client获取token                          │
│                                                         │
│  DID-OAuth集成方案的安全模型：                           │
│    client_id（形式要求）+ DID/VC验证（实质安全）        │
│    → 安全重心从client凭据转移到主体身份验证              │
│                                                         │
└─────────────────────────────────────────────────────────┘
````

日本語補足（agent-reviewed）:

````text
従来のOAuthのセキュリティモデル：
client_id + client_secret（またはmTLS）。
 → 認可されていないクライアントによるtoken取得を防ぐ。

DID-OAuth統合方式のセキュリティモデル：
client_id（形式上の要件）＋DID/VC検証（実質的な安全性）。
 → セキュリティの重点が、クライアント資格情報から主体のアイデンティティ検証へ移る。
````

## fence:1029-1046

原文:

````text
┌─────────────────────────────────────────┐
│      现有OAuth AS (如Keycloak)         │
│  ┌───────────────────────────────────┐  │
│  │  Identity Provider配置            │  │
│  │  ├── Google (OIDC)                │  │
│  │  ├── Azure AD (OIDC)              │  │
│  │  ├── SAML IdP                     │  │
│  │  └── DID-auth (OIDC) ← 新增      │  │
│  └───────────────────────────────────┘  │
│                                         │
│  配置方式：                              │
│  - 添加OIDC Provider                    │
│  - 配置issuer URL                       │
│  - 配置jwks_uri                         │
│  - 映射vc_claims到用户属性              │
└─────────────────────────────────────────┘
````

日本語補足（agent-reviewed）:

````text
既存のOAuth AS（例：Keycloak）

Identity Providerの設定：
- Google（OIDC）。
- Azure AD（OIDC）。
- SAML IdP。
- DID-auth（OIDC）←新規追加。

設定方法：
- OIDC Providerを追加。
- issuer URLを設定。
- jwks_uriを設定。
- vc_claimsを利用者の属性へ対応付ける。
````

## fence:1143-1152

原文:

````text
┌─────────────────────────────────────────┐
│  DID-auth = 标准OIDC Provider           │
│           + DID/VC/VP验证能力           │
│                                         │
│  定位：OAuth认证层的可插拔实现           │
│  输出：标准ID Token                     │
│  集成：通过OIDC标准协议                  │
└─────────────────────────────────────────┘
````

日本語補足（agent-reviewed）:

````text
DID-auth＝標準OIDC Provider＋DID/VC/VPの検証機能。

位置づけ：OAuth認証層の差し替え可能な実装。
出力：標準ID Token。
統合：OIDC標準プロトコルを通じて行う。
````
