<!-- translation-review: full; scope: entire original source; method: manual-source-comparison -->
> 日本語参考訳（原文全文照合・校閲済み）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [chinese/思考&问题/身份认证与加密/did-vs-other.md](../../../../chinese/思考&问题/身份认证与加密/did-vs-other.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# 他の認証方式との比較

OAuth 2.0 と OpenID Connect（OIDC）の最大の問題は、利用者の身元情報を保管する、第三者の中央サーバーを信頼しなければならないことだ。

小さなアプリケーション間の通信を解決できない。手順が複雑なうえ、アプリ側で自分のアカウントを制御できない。2 つの小さなアプリが相互認証するには、自前の OAuth サーバーは高コストで、第三者のサーバーではアカウントを制御できない。――最も重大な問題だけを述べる。

利用者の関与が必要で、完全自動化には向かない。例えば購入ではなく、情報や広告などを取得するだけのサービスで人を介在させると、高コストになる。

OAuth 2.0 が複雑なのは、**ブラウザー上で操作し**利用者と対話するためだ。人がいない機械間の通信には API トークンという方法がある。私たちはブラウザーで操作する必要がない。

すべてを比較し、ブラウザーでの使い方も考えること。

DID の利点は、2 つの MCP client が OAuth server を介さず相互に操作できることだ。

OpenID Connect と SAML はブラウザーで認証するが、私たちはそれを行わない。将来のエージェント網ではその場面はない。エージェントの DID から機能とインターフェイスを含む記述を得られる。それが新時代のサイトだ。

did:wba を OAuth と API key の中間に位置付ける。

- OAuth と同等の安全性で、事前設定と手順が簡単になり、やり取りが少ない。
- API key とほぼ同程度、少し高い程度の接続コストで、より安全である。API key のような重要情報をローカルに保管する必要がない。

分散型の did:wba は、相手のサイトへの手動ログインや設定など、接続前の準備を省ける。相手の能力を使うだけなら DID を提示し、サービスを購入すればよい。

そうでなければ、利用者は client 開発者の安全性を信頼しなければならない。ログや不適切なファイル権限などで開発者が API 情報を漏らせば、危険にさらされる。

API key の安全性への懸念をどうなくすか。client のディレクトリに保存して client が読めるなら、そのコードを信頼しなければならず、これが問題だ。

本当に置き換えたいのは OAuth ではなく API key である。API の安全性は大きな問題だ。

## 問題から出発する：何を解くのか

現在の OAuth の設計を調べる。

現在どのような MCP server があり、どう動くのか調べる。

Google、GitHub などの大きなアプリでは OAuth 2.0 を使う。

以前の OAuth の議論を理解した。MCP server の開発者が Google にアプリを登録し、client はクライアントの代理になる。過去の議論と提出案を調べる必要がある。

client と server は同じ会社が開発するのか。コードを見たい。おそらく違う。

### Google、GitHub などの大きなアプリでは OAuth 2.0 を使う

MCP server がプロキシになる。

### 新しい小規模アプリでは OAuth は不要で、DID を使える

この場合に DID が API 方式よりよい理由を考える。

API トークンは安全性が低く、手動申請も必要だ。DID は安全性が高く、自動生成できる。

# OAuth 2.0

     +--------+                               +---------------+
     |        |--(A)- Authorization Request ->|   Resource    |
     |        |                               |     Owner     |
     |        |<-(B)-- Authorization Grant ---|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(C)-- Authorization Grant -->| Authorization |
     | Client |                               |     Server    |
     |        |<-(D)----- Access Token -------|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(E)----- Access Token ------>|    Resource   |
     |        |                               |     Server    |
     |        |<-(F)--- Protected Resource ---|               |
     +--------+                               +---------------+

A では第三者アプリが自分の情報を持たせ、利用者を認可エンドポイントへ移動させる。

異なるブラウザーページ同士で認可コードや token を共有すると危険がある。そのため認可コードフローには第三者アプリのバックエンドを参加させ、認可サーバーが redirect_uri を通じてコードを返す。これでブラウザー内での伝達を避ける。

# OpenID Connect（OIDC）

仕様：https://openid.net/specs/openid-connect-core-1_0.html
Google での説明：https://developers.google.com/identity/openid-connect/openid-connect?hl=zh-cn

背景として、OAuth 2.0 認可フレームワーク（D. Hardt 編、2012 年 10 月）[RFC6749] と、Bearer トークンの使用（M. Jones、D. Hardt、2012 年 10 月）[RFC6750] は、第三者アプリが HTTP リソースへの限定アクセスを取得・利用する共通の枠組みを提供する。アクセス・トークンの取得と使用を定義するが、身元情報を提供する標準的な方法は定義しない。特に OAuth 2.0 を所定の用途に具体化しなければ、最終利用者の認証情報は提供できない。読者には両仕様の知識を想定する。――**認可の手順は同じで、後で取得する資源が利用者情報である点だけが違う。また token に id_token が加わる。**

ID Token は JWT 構造で、利用者情報を含み、公開鍵で検証できる。

OIDC には、利用者情報を返す 2 つの方法がある。

**ID Token で一部を直接返す**：IdP が生成してクライアントへ返す JWT（JSON Web Token）に、sub（利用者の一意な識別子）、name、email などを含める。内容は両者の取り決めと Scopes 次第で、profile や email の範囲を含めると基本情報を返す場合がある。

**UserInfo Endpoint で詳細を取得する**：ID Token を超える情報が必要なら、その受信後に UserInfo Endpoint を呼ぶ。認可サーバーから得た Access Token で認証する。

+--------+                                   +--------+
|        |                                   |        |
|        |---------(1) AuthN Request-------->|        |
|        |                                   |        |
|        |  +--------+                       |        |
|        |  |        |                       |        |
|        |  |  End-  |<--(2) AuthN & AuthZ-->|        |
|        |  |  User  |                       |        |
|   RP   |  |        |                       |   OP   |
|        |  +--------+                       |        |
|        |                                   |        |
|        |<--------(3) AuthN Response--------|        |
|        |                                   |        |
|        |---------(4) UserInfo Request----->|        |
|        |                                   |        |
|        |<--------(5) UserInfo Response-----|        |
|        |                                   |        |
+--------+                                   +--------+

OIDC は OAuth 2.0 に認証を加えるプロトコルで、クライアントが利用者の身元を確認し、名前やメールなどの基本情報を取得できる。

単純で安全、複数のプラットフォームや機器に対応し、現代の認証で広く使われる方式の 1 つである。

主な特徴：

- **認証（Authentication）**：OAuth 2.0 の認可に認証を加え、ID Token を検証して身元を確認する。
- **JWT**：自己完結した形式に情報と署名を含み、サーバーを呼ばず直接検証できる。
- **多様なクライアント**：Web、携帯、SPA、ネイティブアプリなど。
- **UserInfo Endpoint**：追加情報を得る標準エンドポイント。
- **互換性と拡張性**：OAuth 2.0 と完全に互換で、認証向けの追加機能を提供する。

## OIDC で Google に接続する

Google アカウントでアプリにログインでき、従来のユーザー名・パスワードより安全で便利だ。申請と接続手順を示す。

**1. 準備**

1. **Google アカウント**：すべての操作の前提。
2. **GCP プロジェクト（任意だが推奨）**：アプリと資格情報を管理しやすい。他の Google Cloud サービスを使うなら必要。
3. **アプリの種類**：Web、Android/iOS、デスクトップなどによって設定が変わる。

**2. Google API コンソールで OAuth 2.0 資格情報を設定する**

1. [Google API コンソール](https://www.google.com/url?sa=E&source=gmail&q=https://console.developers.google.com/) を開く（https://console.developers.google.com/）。
2. 既存の GCP プロジェクトを選ぶか、新規作成する。
3. 左のメニューから「認証情報」へ進む。
4. 「認証情報を作成」から「OAuth クライアント ID」を選ぶ。
5. Web、Android、iOS などの種類を選ぶ。
6. 詳細を設定する。
   - **名前**：クライアント ID の名前。
   - **承認済み JavaScript 生成元（Web）**：`http://localhost:8080`、`https://yourdomain.com` などのドメイン・生成元。
   - **承認済みリダイレクト URI（Web）**：`http://localhost:8080/callback`、`https://yourdomain.com/callback` など、Google から戻す URI。
   - **パッケージ名と SHA-1 証明書フィンガープリント（Android）**：アプリの検証用。
   - **Bundle ID（iOS）**：アプリの一意な識別子。
7. 「作成」を押す。
8. **クライアント ID と秘密情報の取得**：特に秘密情報を適切に保管し、クライアント側のコードへ公開しない。

**3. 技術的な接続（Web の例）**

1. **認可 URL を作る**：次の引数で Google の認可サーバーへリダイレクトする。
   - `client_id`：コンソールで得た ID。
   - `response_type`：推奨の認可コードフロー用に `code`。
   - `scope`：必要な利用者情報。`openid email profile` は OpenID、メール、基本プロフィールを要求する。
   - `redirect_uri`：登録した URI。
   - `state`：CSRF 対策のランダム文字列。
   - `nonce`：リプレイ対策のランダム文字列。

    ```
    https://accounts.google.com/o/oauth2/v2/auth?
    client_id=YOUR_CLIENT_ID&
    response_type=code&
    scope=openid%20email%20profile&
    redirect_uri=YOUR_REDIRECT_URI&
    state=YOUR_STATE&
    nonce=YOUR_NONCE
    ```

2. **戻りを処理する**：同意後、Google は URL に認可コード（`code`）と `state` を付けて戻す。
3. **`state` を検証する**：受信した `state` が、送信前に生成した `state` と一致するか確認する。
4. **アクセス・トークンと ID トークンを得る**：トークンエンドポイントへ POST する。
   - `code`：戻りの URL で得たコード。
   - `client_id`：クライアント ID。
   - `client_secret`：クライアントの秘密情報。
   - `redirect_uri`：リダイレクト URI。
   - `grant_type`：`authorization_code`。

    ```
    https://oauth2.googleapis.com/token
    ```

5. **ID トークンを検証する**：Google の公開鍵で署名とクレームを確認し、`aud`（対象）が自分のクライアント ID と一致することを確かめる。
6. **利用者情報を使う**：ID、メール、名前などで識別し、体験を個別化する。

**4. その他の重要事項**

- **適切な Scope**：本当に必要な情報だけを要求する。
- **安全性**：HTTPS を使い、秘密情報を適切に保管する。
- **Google のライブラリ**：各言語のライブラリで統合を簡単にする。
- **認可コードフロー（推奨）**：暗黙的フローではなく、常にこちらを使って安全性を高める。

以上は包括的な案内であり、アプリの種類や需要による調整が必要な場合がある。詳細と最新情報は Google の公式文書を参照してほしい。

## OIDC で微信に接続する

微信も、プラットフォーム上の利用者の一意な識別子として OpenID を使う。第三者の微信ログイン向けに OAuth 2.0 の完全な実装を提供する。"OpenID Connect" とは直接呼ばないが、OAuth 2.0 に基づき身元情報を検証・伝達する点で、中核の考え方は非常に似ている。

**第三者アプリへの微信ログインの基本手順：**

1. **開発者登録とアプリの作成**：種類に応じて携帯アプリ、Web、公式アカウントのアプリを [微信オープンプラットフォーム](https://www.google.com/url?sa=E&source=gmail&q=https://open.weixin.qq.com/)（https://open.weixin.qq.com/）で登録する。AppID と AppSecret を得る。
2. **認可コールバックドメインの設定**：同意後に戻す URL を設定する。コード内の URL と完全に一致させる。
3. **フロントエンドで認可要求**：
   - 携帯アプリ：微信 SDK で URL を作り、微信アプリを起動する。
   - Web：認可 URL を作ってページへ移動する。
   - 公式アカウント：微信の Web 認可ページで行う。

   URL の基本形式：

    ```
    https://open.weixin.qq.com/connect/oauth2/authorize?
    appid=YOUR_APPID&
    redirect_uri=YOUR_REDIRECT_URI&
    response_type=code&
    scope=snsapi_login&
    state=YOUR_STATE#wechat_redirect
    ```

   - `appid`：AppID。
   - `redirect_uri`：URL エンコードするコールバック先。
   - `response_type`：`code`。
   - `scope`：`snsapi_login` は unionID によるログイン（推奨）。`snsapi_userinfo` でも基本情報を得られるが、利用者の手動同意が必要。
   - `state`：CSRF 対策のランダム文字列。
4. **同意**：アプリ・Web で同意すると、`code` と `state` を付けて戻る。
5. **バックエンドで `code` から access\_token と openid を取得**：サーバーが `code` を使って要求し、`access_token` と `openid` を取得する。

    ```
    https://api.weixin.qq.com/sns/oauth2/access_token?
    appid=YOUR_APPID&
    secret=YOUR_APPSECRET&
    code=CODE&
    grant_type=authorization_code
    ```

   - `appid`：AppID。
   - `secret`：AppSecret。
   - `code`：戻りの URL で得た `code`。

   微信サーバーは `access_token`、`openid` などを JSON で返す。
6. **access\_token で個人情報を取得（任意）**：画像やニックネームなどが必要なら、`access_token` と `openid` で要求する。

    ```
    https://api.weixin.qq.com/sns/userinfo?
    access_token=ACCESS_TOKEN&
    openid=OPENID&
    lang=zh_CN
    ```

7. **openid の検証と業務処理**：`openid` の有効性を検証し、`openid` に基づいて自分のアプリの利用者へ関連付ける。同じプラットフォームのアカウントでもアプリごとに `openid` が違うため、複数アプリを結び付けているなら `unionid` で統一できる。

**要点：**

- **AppID と AppSecret の安全性**：AppSecret をクライアント側へ公開せず、ネットワーク要求はサーバーから行う。
- **コールバック URL**：設定とコードが完全一致しなければ認可は完了しない。
- **`state`**：CSRF を防ぐため使う。
- **unionid**：同じプラットフォームのアカウント配下の複数アプリで、同じ利用者を識別するときに使う。

微信ログインは明示的に "OpenID Connect" と宣言しないが、OAuth 2.0 と openid による中核の仕組みはよく似ている。これらの手順で第三者アプリへ組み込み、微信アカウントでログインできる。

最も正確で新しい情報は公式文書を確認し、アプリの種類に合う方法を選ぶことを勧める。

# SAML

SAML（Security Assertion Markup Language、安全性に関する表明のマークアップ言語）は XML に基づく公開標準で、IdP とサービス提供者などの間で認証・認可データを安全に交換する。主に企業の Single Sign-On（SSO）で使われる。

# API トークン

API へのアクセスを認証・認可する一意な識別子で、通常は機械間通信に使う。利用者の対話が不要な場面で特に、単純かつ効果的にアクセスを保護できる。

## 著作権表示
Copyright (c) 2024 ANP Community  
本書は [MIT ライセンス](../../../../chinese/思考&问题/身份认证与加密/LICENSE) に基づき公開されています。自由に利用・変更できますが、この著作権表示を保持しなければなりません。
