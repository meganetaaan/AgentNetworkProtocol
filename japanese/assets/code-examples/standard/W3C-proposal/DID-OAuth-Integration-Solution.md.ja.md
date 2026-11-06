# standard/W3C-proposal/DID-OAuth-Integration-Solution.md のコード例・図ラベルの日本語補足

原文: [standard/W3C-proposal/DID-OAuth-Integration-Solution.md](../../../../../standard/W3C-proposal/DID-OAuth-Integration-Solution.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:209-250/line:5

原文:

````text
Resource Server<br/>(Standard OAuth RS)
````

日本語補足（agent-reviewed）:

````text
Resource Server<br/>（標準OAuth RS）
````

## fence:209-250/line:6

原文:

````text
OAuth AS<br/>(Standard OAuth AS)
````

日本語補足（agent-reviewed）:

````text
OAuth AS<br/>（標準OAuth AS）
````

## fence:209-250/line:7

原文:

````text
DID-auth<br/>(OIDC Provider)
````

日本語補足（agent-reviewed）:

````text
DID-auth<br/>（OIDC Provider）
````

## fence:209-250/line:10

原文:

````text
GET /api/resource<br/>(No Authorization header)
````

日本語補足（agent-reviewed）:

````text
GET /api/resource<br/>（Authorizationヘッダーなし）
````

## fence:209-250/line:12

原文:

````text
Check token: doesn't exist
````

日本語補足（agent-reviewed）:

````text
tokenを確認：存在しない
````

## fence:209-250/line:14

原文:

````text
401 Unauthorized<br/>WWW-Authenticate: DPoP realm="anp",<br/>  as_uri="https://as.example.com"
````

日本語補足（technical-retained）:

````text
401 Unauthorized<br/>WWW-Authenticate: DPoP realm="anp",<br/>  as_uri="https://as.example.com"
````

注: プロトコルの要求・応答・ヘッダー・scope・識別子の技術表記を保持。人向け本文ではなくコード例の値。

## fence:209-250/line:16

原文:

````text
Standard OAuth discovery flow<br/>Parse WWW-Authenticate
````

日本語補足（agent-reviewed）:

````text
標準OAuth発見フロー<br/>WWW-Authenticateを解析
````

## fence:209-250/line:18

原文:

````text
POST /token<br/>(Attempt to get Access Token)
````

日本語補足（agent-reviewed）:

````text
POST /token<br/>（Access Tokenの取得を試行）
````

## fence:209-250/line:22

原文:

````text
AS indicates need for DID-auth authentication<br/>(AS can configure multiple IdPs)
````

日本語補足（agent-reviewed）:

````text
ASがDID-authでの認証が必要と通知<br/>（ASに複数のIdPを設定可能）
````

## fence:209-250/line:26

原文:

````text
Verify VP<br/>Extract VC claims<br/>Generate ID Token
````

日本語補足（agent-reviewed）:

````text
VPを検証<br/>VC claimsを抽出<br/>ID Tokenを生成
````

## fence:209-250/line:28

原文:

````text
ID Token (Standard JWT)
````

日本語補足（agent-reviewed）:

````text
ID Token（標準JWT）
````

## fence:209-250/line:30

原文:

````text
POST /token<br/>grant_type=token-exchange<br/>subject_token=<ID Token><br/>subject_token_type=id_token
````

日本語補足（technical-retained）:

````text
POST /token<br/>grant_type=token-exchange<br/>subject_token=<ID Token><br/>subject_token_type=id_token
````

注: プロトコルの要求・応答・ヘッダー・scope・識別子の技術表記を保持。人向け本文ではなくコード例の値。

## fence:209-250/line:32

原文:

````text
Verify ID Token<br/>(via DID-auth's jwks)<br/>Extract vc_claims<br/>Construct RAR
````

日本語補足（agent-reviewed）:

````text
ID Tokenを検証<br/>（DID-authのjwksを使用）<br/>vc_claimsを抽出<br/>RARを構築
````

## fence:209-250/line:34

原文:

````text
Access Token + Refresh Token<br/>(Standard OAuth response)
````

日本語補足（agent-reviewed）:

````text
Access Token＋Refresh Token<br/>（標準OAuth応答）
````

## fence:209-250/line:38

原文:

````text
Verify Access Token<br/>(Standard OAuth verification)
````

日本語補足（agent-reviewed）:

````text
Access Tokenを検証<br/>（標準OAuth検証）
````

## fence:261-298/line:5

原文:

````text
Resource Server
````

日本語補足（agent-reviewed）:

````text
リソースサーバー
````

## fence:261-298/line:6

原文:

````text
OAuth AS
````

日本語補足（technical-retained）:

````text
OAuth AS
````

注: プロトコルの要求・応答・ヘッダー・scope・識別子の技術表記を保持。人向け本文ではなくコード例の値。

## fence:261-298/line:11

原文:

````text
Verify token signature: ✓<br/>Check exp: expired ✗
````

日本語補足（agent-reviewed）:

````text
tokenの署名を検証：✓<br/>expを確認：期限切れ ✗
````

## fence:261-298/line:13

原文:

````text
401 Unauthorized<br/>error="invalid_token",<br/>error_description="token expired"
````

日本語補足（technical-retained）:

````text
401 Unauthorized<br/>error="invalid_token",<br/>error_description="token expired"
````

注: HTTP応答例のerror値を保持。token expiredは「トークンの有効期限切れ」を意味する。

## fence:261-298/line:15

原文:

````text
Standard OAuth refresh flow
````

日本語補足（agent-reviewed）:

````text
標準OAuth更新フロー
````

## fence:261-298/line:19

原文:

````text
Refresh Token valid
````

日本語補足（agent-reviewed）:

````text
Refresh Tokenが有効
````

## fence:261-298/line:20

原文:

````text
New Access Token<br/>(Standard OAuth response)
````

日本語補足（agent-reviewed）:

````text
新しいAccess Token<br/>（標準OAuth応答）
````

## fence:261-298/line:23

原文:

````text
Refresh Token also expired
````

日本語補足（agent-reviewed）:

````text
Refresh Tokenも期限切れ
````

## fence:261-298/line:24

原文:

````text
400 Bad Request<br/>{<br/>  "error": "invalid_grant",<br/>  "idp_uri": "https://did-auth.example.com"<br/>}
````

日本語補足（technical-retained）:

````text
400 Bad Request<br/>{<br/>  "error": "invalid_grant",<br/>  "idp_uri": "https://did-auth.example.com"<br/>}
````

注: プロトコルの要求・応答・ヘッダー・scope・識別子の技術表記を保持。人向け本文ではなくコード例の値。

## fence:261-298/line:26

原文:

````text
Need to re-authenticate
````

日本語補足（agent-reviewed）:

````text
再認証が必要
````

## fence:261-298/line:28

原文:

````text
POST /token<br/>(Re-authenticate with DID)
````

日本語補足（agent-reviewed）:

````text
POST /token<br/>（DID再認証）
````

## fence:261-298/line:29

原文:

````text
New ID Token
````

日本語補足（agent-reviewed）:

````text
新しいID Token
````

## fence:261-298/line:31

原文:

````text
POST /token<br/>(Token Exchange)
````

日本語補足（agent-reviewed）:

````text
POST /token<br/>（トークン交換）
````

## fence:261-298/line:32

原文:

````text
New Access Token + Refresh Token
````

日本語補足（agent-reviewed）:

````text
新しいAccess Token＋Refresh Token
````

## fence:309-344/line:3

原文:

````text
Web Application
````

日本語補足（agent-reviewed）:

````text
Webアプリケーション
````

## fence:309-344/line:4

原文:

````text
DID-auth<br/>(OIDC Provider)
````

日本語補足（agent-reviewed）:

````text
DID-auth<br/>（OIDC Provider）
````

## fence:309-344/line:5

原文:

````text
OAuth AS
````

日本語補足（technical-retained）:

````text
OAuth AS
````

注: プロトコルの要求・応答・ヘッダー・scope・識別子の技術表記を保持。人向け本文ではなくコード例の値。

## fence:309-344/line:6

原文:

````text
Resource Server
````

日本語補足（agent-reviewed）:

````text
リソースサーバー
````

## fence:309-344/line:8

原文:

````text
Access authenticated page
````

日本語補足（agent-reviewed）:

````text
認証が必要なページへアクセス
````

## fence:309-344/line:10

原文:

````text
Redirect to /authorize<br/>(Standard OIDC Authorization Code Flow)
````

日本語補足（agent-reviewed）:

````text
/authorizeへリダイレクト<br/>（標準OIDC Authorization Code Flow）
````

## fence:309-344/line:12

原文:

````text
Display DID wallet connection page
````

日本語補足（agent-reviewed）:

````text
DIDウォレット接続ページを表示
````

## fence:309-344/line:14

原文:

````text
Open wallet, sign VP
````

日本語補足（agent-reviewed）:

````text
ウォレットを開き、VPに署名
````

## fence:309-344/line:16

原文:

````text
Submit VP
````

日本語補足（agent-reviewed）:

````text
VPを送信
````

## fence:309-344/line:18

原文:

````text
Verify VP
````

日本語補足（agent-reviewed）:

````text
VPを検証
````

## fence:309-344/line:20

原文:

````text
Redirect callback<br/>code=<authorization_code>
````

日本語補足（agent-reviewed）:

````text
コールバックへリダイレクト<br/>code=<authorization_code>
````

## fence:309-344/line:24

原文:

````text
ID Token + Access Token<br/>(Standard OIDC response)
````

日本語補足（agent-reviewed）:

````text
ID Token＋Access Token<br/>（標準OIDC応答）
````

## fence:309-344/line:26

原文:

````text
POST /token<br/>grant_type=token-exchange<br/>subject_token=<ID Token>
````

日本語補足（technical-retained）:

````text
POST /token<br/>grant_type=token-exchange<br/>subject_token=<ID Token>
````

注: プロトコルの要求・応答・ヘッダー・scope・識別子の技術表記を保持。人向け本文ではなくコード例の値。

## fence:309-344/line:28

原文:

````text
Access Token (OAuth)
````

日本語補足（agent-reviewed）:

````text
アクセストークン（OAuth）
````

## fence:309-344/line:30

原文:

````text
API request<br/>Authorization: DPoP <token>
````

日本語補足（agent-reviewed）:

````text
API要求<br/>Authorization: DPoP <token>
````

## fence:309-344/line:32

原文:

````text
Protected Resource
````

日本語補足（agent-reviewed）:

````text
保護対象リソース
````

## fence:309-344/line:34

原文:

````text
Display result
````

日本語補足（agent-reviewed）:

````text
結果を表示
````

## fence:385-405/line:4

原文:

````text
OAuth AS
````

日本語補足（technical-retained）:

````text
OAuth AS
````

注: プロトコルの要求・応答・ヘッダー・scope・識別子の技術表記を保持。人向け本文ではなくコード例の値。

## fence:385-405/line:5

原文:

````text
DID-auth<br/>(OIDC IdP)
````

日本語補足（agent-reviewed）:

````text
DID-auth<br/>（OIDC IdP）
````

## fence:385-405/line:6

原文:

````text
1. Generate PKCE<br/>code_verifier + code_challenge
````

日本語補足（agent-reviewed）:

````text
1. PKCEを生成<br/>code_verifier + code_challenge
````

## fence:385-405/line:9

原文:

````text
HTTP library follows redirect
````

日本語補足（agent-reviewed）:

````text
HTTPライブラリがリダイレクトをたどる
````

## fence:385-405/line:10

原文:

````text
GET /authorize + VP params<br/>or POST /authorize {vp: ...}<br/>⭐ Directly carry DID signature/VP in request
````

日本語補足（agent-reviewed）:

````text
GET /authorize＋VPパラメーター<br/>またはPOST /authorize {vp: ...}<br/>⭐ 要求にDID署名／VPを直接含める
````

## fence:385-405/line:11

原文:

````text
Verify VP:<br/>✓ DID signature valid<br/>✓ VC issuer trusted<br/>✓ VC not revoked
````

日本語補足（agent-reviewed）:

````text
VPを検証：<br/>✓ DID署名が有効<br/>✓ VC issuerが信頼できる<br/>✓ VCが取り消されていない
````

## fence:385-405/line:13

原文:

````text
HTTP library follows redirect
````

日本語補足（agent-reviewed）:

````text
HTTPライブラリがリダイレクトをたどる
````

## fence:385-405/line:15

原文:

````text
Backend calls DID-auth /token<br/>Exchange idp_code for ID Token<br/>Verify ID Token<br/>Generate AS's own code
````

日本語補足（agent-reviewed）:

````text
バックエンドでDID-auth /tokenを呼び出す<br/>idp_codeをID Tokenに交換<br/>ID Tokenを検証<br/>AS独自のcodeを生成
````

## fence:385-405/line:17

原文:

````text
⭐ Intercept this 302<br/>Don't actually visit redirect_uri<br/>Extract code from Location
````

日本語補足（agent-reviewed）:

````text
⭐ この302を捕捉<br/>redirect_uriへ実際にはアクセスせず<br/>Locationからcodeを抽出
````

## fence:385-405/line:18

原文:

````text
POST /token<br/>grant_type=authorization_code<br/>code=as_code<br/>code_verifier=original value<br/>client_id=did-agent-public<br/>redirect_uri=https://localhost/callback
````

日本語補足（agent-reviewed）:

````text
POST /token<br/>grant_type=authorization_code<br/>code=as_code<br/>code_verifier=元の値<br/>client_id=did-agent-public<br/>redirect_uri=https://localhost/callback
````

## fence:385-405/line:19

原文:

````text
Access Token + Refresh Token
````

日本語補足（agent-reviewed）:

````text
Access Token＋Refresh Token
````

## fence:411-441/line:5

原文:

````text
Generate PKCE
````

日本語補足（agent-reviewed）:

````text
PKCEを生成
````

## fence:411-441/line:11

原文:

````text
Carry in /authorize request
````

日本語補足（agent-reviewed）:

````text
/authorize要求に含める
````

## fence:411-441/line:22

原文:

````text
Carry code_verifier in /token request
````

日本語補足（agent-reviewed）:

````text
/token要求にcode_verifierを含める
````

## fence:474-510/line:4

原文:

````text
Configure HTTP client
````

日本語補足（agent-reviewed）:

````text
HTTPクライアントを設定
````

## fence:474-510/line:5

原文:

````text
Don't auto-follow last redirect
````

日本語補足（agent-reviewed）:

````text
最後のリダイレクトを自動でたどらない
````

## fence:474-510/line:7

原文:

````text
Manually handle redirect chain
````

日本語補足（agent-reviewed）:

````text
リダイレクトチェーンを手動で処理
````

## fence:474-510/line:12

原文:

````text
Check if this is final redirect (to redirect_uri)
````

日本語補足（agent-reviewed）:

````text
最終リダイレクト（redirect_uri宛て）かを確認
````

## fence:474-510/line:14

原文:

````text
Intercepted! Extract code from URL
````

日本語補足（agent-reviewed）:

````text
捕捉し、URLからcodeを抽出
````

## fence:474-510/line:20

原文:

````text
If redirecting to DID-auth, need to attach VP
````

日本語補足（agent-reviewed）:

````text
DID-auth宛ての場合はVPの添付が必要
````

## fence:474-510/line:30

原文:

````text
Exchange code for token
````

日本語補足（agent-reviewed）:

````text
codeをtokenへ交換
````

## fence:601-607/line:5:column:21

原文:

````text
The access token expired
````

日本語補足（agent-reviewed）:

````text
アクセストークンの有効期限が切れました
````

## fence:622-632/line:6:column:24

原文:

````text
Authentication with identity provider required
````

日本語補足（agent-reviewed）:

````text
アイデンティティプロバイダーでの認証が必要です
````

## fence:815-820/line:3:column:32

原文:

````text
read write
````

日本語補足（technical-retained）:

````text
read write
````

注: プロトコルの要求・応答・ヘッダー・scope・識別子の技術表記を保持。人向け本文ではなくコード例の値。

## fence:824-831/line:1:column:26

原文:

````text
who's what attributes
````

日本語補足（agent-reviewed）:

````text
誰のどの属性か
````

## fence:986-1016/line:4

原文:

````text
OAuth Client
````

日本語補足（agent-reviewed）:

````text
OAuthクライアント
````

## fence:986-1016/line:6

原文:

````text
DID-auth (OIDC Provider)
````

日本語補足（agent-reviewed）:

````text
DID-auth（OIDCプロバイダー）
````

## fence:986-1016/line:7

原文:

````text
OAuth Authorization Server
````

日本語補足（agent-reviewed）:

````text
OAuth認可サーバー
````

## fence:986-1016/line:8

原文:

````text
Resource Server
````

日本語補足（agent-reviewed）:

````text
リソースサーバー
````

## fence:986-1016/line:11

原文:

````text
Authorization / Token Request (client_id, ...)
````

日本語補足（agent-reviewed）:

````text
認可／トークン要求（client_idなど）
````

## fence:986-1016/line:12

原文:

````text
Authn required (idp_uri = DIDAuth)
````

日本語補足（agent-reviewed）:

````text
認証が必要（idp_uri = DIDAuth）
````

## fence:986-1016/line:15

原文:

````text
Start DID-auth (authorize or direct token)
````

日本語補足（agent-reviewed）:

````text
DID-authを開始（認可または直接のトークン要求）
````

## fence:986-1016/line:16

原文:

````text
Request DID signature + VC/Personhood (optional)
````

日本語補足（agent-reviewed）:

````text
DID署名＋VC/Personhoodを要求（任意）
````

## fence:986-1016/line:17

原文:

````text
Verifiable Presentation (VP)
````

日本語補足（agent-reviewed）:

````text
Verifiable Presentation（VP）
````

## fence:986-1016/line:18

原文:

````text
ID Token (JWT) incl. vc_claims + client_id + cnf
````

日本語補足（agent-reviewed）:

````text
ID Token（JWT）：vc_claims＋client_id＋cnfを含む
````

## fence:986-1016/line:21

原文:

````text
Token Exchange (subject_token = ID Token)
````

日本語補足（agent-reviewed）:

````text
トークン交換（subject_token = ID Token）
````

## fence:986-1016/line:22

原文:

````text
Verify ID Token (jwks_uri), bind client pre-reg
````

日本語補足（agent-reviewed）:

````text
ID Tokenを検証（jwks_uri）し、クライアントの事前登録をバインド
````

## fence:986-1016/line:23

原文:

````text
Map vc_claims -> RAR (authorization_details)
````

日本語補足（agent-reviewed）:

````text
vc_claimsをRAR（authorization_details）へ対応付ける
````

## fence:986-1016/line:24

原文:

````text
Access Token (DPoP-bound) + Refresh Token
````

日本語補足（agent-reviewed）:

````text
アクセストークン（DPoPにバインド）＋Refresh Token
````

## fence:986-1016/line:27

原文:

````text
DPoP Proof + Access Token
````

日本語補足（agent-reviewed）:

````text
DPoP Proof＋Access Token
````

## fence:986-1016/line:28

原文:

````text
Validate token + validate DPoP + enforce RAR/UMA
````

日本語補足（agent-reviewed）:

````text
tokenを検証＋DPoPを検証＋RAR/UMAを適用
````

## fence:986-1016/line:29

原文:

````text
Protected Resource
````

日本語補足（agent-reviewed）:

````text
保護対象リソース
````

## fence:7-29

原文:

````text
┌─────────────────────────────────────────────────────────┐
│                    OAuth Ecosystem                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Client     │  │     AS       │  │     RS       │  │
│  │  (unchanged) │  │  (unchanged) │  │  (unchanged) │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│         │                 │                  │           │
│         │                 │                  │           │
│         │          ┌──────▼──────┐           │           │
│         │          │   Authn     │           │           │
│         └─────────►│  (pluggable)│           │           │
│                    └──────────────┘           │           │
│                          │                    │           │
│                    ┌─────▼──────┐             │           │
│                    │ DID-auth   │             │           │
│                    │ (OIDC IdP) │             │           │
│                    └────────────┘             │           │
└─────────────────────────────────────────────────────────┘

Key: DID-auth is an optional implementation of OAuth's authentication layer,
     not changing OAuth's authorization architecture
````

日本語補足（agent-reviewed）:

````text
OAuthのエコシステム
- Client（クライアント）：変更なし。
- AS（認可サーバー）：変更なし。
- RS（リソースサーバー）：変更なし。
- Authn（認証）：差し替え可能。図ではClientとASからこの層につながる。
- Authnの下にDID-auth（OIDC IdP）がつながる。

要点：DID-authはOAuth認証層の任意の実装であり、OAuthの認可アーキテクチャを変更しません。
````

## fence:37-63

原文:

````text
┌─────────────────────────────────────────┐
│         Authn Layer (Authentication)     │
│  Responsibility: Confirm "who is the     │
│                  subject"                │
│  Implementation: Password/OIDC/SAML/     │
│                  DID-auth                │
│  Output: Authentication credentials      │
│          (e.g., ID Token)                │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Authz Layer (Authorization)      │
│  Responsibility: Decide "what the        │
│                  subject can do"         │
│  Implementation: OAuth AS (token         │
│                  issuance)               │
│  Output: Access Token + Refresh Token    │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      Resource Access                     │
│  Responsibility: Execute access control  │
│  Implementation: Resource Server         │
│  Verification: Access Token + Policy     │
└─────────────────────────────────────────┘
````

日本語補足（agent-reviewed）:

````text
Authn Layer（認証）
- 責務：「主体は誰か」を確認する。
- 実装：パスワード／OIDC／SAML／DID-auth。
- 出力：認証資格情報（例：ID Token）。
 ↓
Authz Layer（認可）
- 責務：「主体が何をできるか」を決定する。
- 実装：OAuth AS（tokenの発行）。
- 出力：Access Token + Refresh Token。
 ↓
Resource Access（リソースアクセス）
- 責務：アクセス制御を実行する。
- 実装：Resource Server。
- 検証：Access Token＋ポリシー。
````

## fence:165-189

原文:

````text
┌────────────────────────────────────────────────────┐
│              DID-auth (OIDC Provider)              │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │  Standard OIDC Endpoints                     │ │
│  │  ├── /.well-known/openid-configuration       │ │
│  │  ├── /token (ID Token issuance)              │ │
│  │  ├── /jwks (public key endpoint)             │ │
│  │  └── /authorize (browser scenario)           │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │  DID/VC/VP Verification Capability           │ │
│  │  ├── DID resolution                          │ │
│  │  ├── VP signature verification               │ │
│  │  ├── VC signature verification               │ │
│  │  ├── Personhood VC verification              │ │
│  │  └── VC revocation check                     │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  Output: Standard ID Token (JWT)                   │
│          Contains vc_claims (verified VC content)  │
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

## fence:360-381

原文:

````text
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Core Idea:                                             │
│                                                         │
│  • Agent uses HTTP library to handle 302 redirects     │
│    (simulating browser)                                 │
│  • IdP (DID-auth) supports accepting VP authentication │
│    directly in request                                  │
│  • Agent intercepts final redirect, extracts code      │
│    from URL                                             │
│  • Uses standard Authorization Code to exchange for    │
│    Access Token                                         │
│                                                         │
│  Advantages:                                            │
│  ✅ Strongest compatibility (almost all AS support     │
│     Auth Code Flow)                                     │
│  ✅ Doesn't require AS to support Token Exchange       │
│  ✅ Security guaranteed by IdP's DID/VC verification   │
│                                                         │
└─────────────────────────────────────────────────────────┘
````

日本語補足（agent-reviewed）:

````text
中心となる考え方：
- エージェントがHTTPライブラリを使って302リダイレクトを処理する（ブラウザーを模擬）。
- IdP（DID-auth）が、要求内でVP認証を直接受け付けることに対応する。
- エージェントが最後のリダイレクトを捕捉し、URLからcodeを抽出する。
- 標準Authorization Codeを使ってAccess Tokenに交換する。

利点：
✅ 最も高い互換性（ほぼすべてのASがAuth Code Flowに対応）。
✅ ASがToken Exchangeに対応する必要がない。
✅ IdPのDID/VC検証によって安全性を保証。
````

## fence:445-470

原文:

````text
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  DID-auth /authorize endpoint needs to support:        │
│                                                         │
│  Method A: GET request with VP parameter               │
│  GET /authorize?                                        │
│    response_type=code&                                  │
│    client_id=xxx&                                       │
│    vp_token=<base64url encoded VP>&                    │
│    redirect_uri=...                                     │
│                                                         │
│  Method B: POST request with JSON body                 │
│  POST /authorize                                        │
│  Content-Type: application/json                         │
│  {                                                      │
│    "response_type": "code",                            │
│    "client_id": "xxx",                                 │
│    "vp": { ... VP content ... },                       │
│    "redirect_uri": "..."                               │
│  }                                                      │
│                                                         │
│  After verification, directly return 302, no HTML      │
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
  vp_token=<base64url encoded VP>&
  redirect_uri=...

<base64url encoded VP>は「base64urlで符号化したVP」を示すプレースホルダーです。

方式B：JSON body付きのPOST要求。
POST /authorize
Content-Type: application/json
{
  "response_type": "code",
  "client_id": "xxx",
  "vp": { ... VP content ... },
  "redirect_uri": "..."
}

VP contentは「VPの内容」を示すプレースホルダーです。

検証後は、HTMLを返さず302を直接返します。
````

## fence:531-555

原文:

````text
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Security Barrier Transfer:                            │
│                                                         │
│  Traditional OAuth:                                     │
│    Security relies on → AS's client registration +     │
│                         client_secret                   │
│                                                         │
│  This Solution:                                         │
│    Security relies on → IdP's DID/VC verification      │
│                                                         │
│  client_id's role downgraded to:                       │
│    • Satisfy AS formal requirements                    │
│    • Bind redirect_uri (for AS verification)           │
│    • Configure PKCE requirements                       │
│                                                         │
│  Real identity verification:                           │
│    ✓ DID private key signature (cryptographically      │
│      unforgeable)                                       │
│    ✓ VC issuer verification (authority endorsement)    │
│    ✓ VC revocation check (dynamic admission control)   │
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

## fence:578-591

原文:

````text
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Prioritize Token Exchange:                            │
│    When AS supports RFC 8693                           │
│    Simpler flow, less code                             │
│                                                         │
│  Use Simulated Auth Code Flow:                         │
│    When AS doesn't support Token Exchange              │
│    When maximum compatibility needed                   │
│    E.g., AWS Cognito and other restricted environments │
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

## fence:815-820

原文:

````text
Traditional OAuth only knows "who":
User login → AS only knows sub="alice"
          → Grants fixed scope="read write"
          → Cannot dynamically adjust permissions based on user attributes
````

日本語補足（agent-reviewed）:

````text
従来のOAuthは「誰か」しか認識しない：
利用者がログイン→ASが知るのはsub="alice"だけ。
 → 固定のscope="read write"を付与。
 → 利用者の属性に応じて権限を動的に調整できない。
````

## fence:824-831

原文:

````text
With VC Claims, AS knows "who's what attributes":
User submits VP → DID-auth verifies VC
           → Extracts: personhood=verified, kyc_level=2
           → This information enters ID Token
           → AS constructs RAR based on these trusted attributes
           → Dynamically grants fine-grained permissions
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

## fence:918-926

原文:

````text
Traditional OAuth Security Model:
  client_id + client_secret (or mTLS)
  → Prevents unauthorized clients from obtaining tokens

DID-OAuth Integration Solution Security Model:
  client_id (formal requirement) + DID/VC verification (substantive security)
  → Security focus shifts from client credentials to subject identity verification
````

日本語補足（agent-reviewed）:

````text
従来のOAuthのセキュリティモデル：
client_id + client_secret（またはmTLS）。
 → 認可されていないクライアントによるトークン取得を防ぐ。

DID-OAuth統合方式のセキュリティモデル：
client_id（形式上の要件）＋DID/VC検証（実質的な安全性）。
 → セキュリティの重点が、クライアント資格情報から主体のアイデンティティ検証へ移る。
````

## fence:1067-1082

原文:

````text
Existing OAuth AS (e.g., Keycloak)
 ┌───────────────────────────────────┐
 │  Identity Provider Configuration  │
 │  ├── Google (OIDC)                │
 │  ├── Azure AD (OIDC)              │
 │  ├── SAML IdP                     │
 │  └── DID-auth (OIDC) ← New        │
 └───────────────────────────────────┘
                                     
 Configuration:
 - Add OIDC Provider
 - Configure issuer URL
 - Configure jwks_uri
 - Map vc_claims to user attributes
````

日本語補足（agent-reviewed）:

````text
既存のOAuth AS（例：Keycloak）

Identity Providerの設定：
- Google（OIDC）。
- Azure AD（OIDC）。
- SAML IdP。
- DID-auth（OIDC）←新規追加。

設定：
- OIDC Providerを追加。
- issuer URLを設定。
- jwks_uriを設定。
- vc_claimsを利用者の属性へ対応付ける。
````

## fence:1178-1185

原文:

````text
DID-auth = Standard OIDC Provider
         + DID/VC/VP Verification Capability

Positioning: Pluggable implementation of OAuth authentication layer
Output: Standard ID Token
Integration: Via OIDC standard protocol
````

日本語補足（agent-reviewed）:

````text
DID-auth＝標準OIDC Provider＋DID/VC/VPの検証機能。

位置づけ：OAuth認証層の差し替え可能な実装。
出力：標準ID Token。
統合：OIDC標準プロトコルを通じて行う。
````
