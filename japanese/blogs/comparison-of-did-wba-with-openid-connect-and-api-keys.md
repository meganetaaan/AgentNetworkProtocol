<!-- translation-review: full; source=blogs/comparison-of-did-wba-with-openid-connect-and-api-keys.md -->
> 日本語参考訳（原文全文照合・校閲済み）。安全性の優劣や2022年の説明など、技術上の主張は原文当時の記述を保持しています。
> 原文: [blogs/comparison-of-did-wba-with-openid-connect-and-api-keys.md](../../blogs/comparison-of-did-wba-with-openid-connect-and-api-keys.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# エージェントに最も適した本人認証技術：OpenID Connect、APIキー、did:wbaの比較

## エージェントには、新しい本人認証技術が必要

エージェントは、本人認証技術に新しい要件をもたらしました。特に重要なのは、相互接続性です。具体的には、任意の二つのエージェントが、互いにつながり、通信できることです。

原理は単純です。正しく判断し、適切に行動するため、AIには、**完全なコンテキストの情報を得て、すべてのツールにアクセスする能力**が必要です。現在、多くの企業が、Computer Useで解決しようとしています。

<p align="center">
  <img src="../../blogs/images/computer-use-product.png" width="50%" alt="computer use product"/>
</p>

しかし、これはAIがインターネットとやり取りする、最も効率的な方法ではないと考えています。人のアクセス方法を模倣させる方法だからです。AIは、最も得意な方法、つまりAPIや通信プロトコルで、デジタル世界とやり取りするべきです。

<p align="center">
  <img src="../../blogs/images/agent-interview-Internet.png" width="50%" alt="agent-interview-Internet"/>
</p>

ここで、相互接続の問題が生まれます。APIやプロトコルで、インターネットやほかのエージェントとやり取りするとき、本人確認をどう行うのでしょうか。特に、任意のエージェント同士をつなぐため、プラットフォームをまたぐ本人確認を、どう実現するのでしょうか。

## 現在主流の、プラットフォームをまたぐ本人認証技術

インターネットのアカウントは、プラットフォームをまたいで使えないことがよくあります。例えば、WeChatのアカウントは、DingTalkでは認識されません。逆も同じです。

一方、Googleのアカウントで多くのサイトにログインするSSO（シングルサインオン）など、プラットフォームをまたぐ認証技術も数多くあります。また、OpenAIが発行するキーで、そのAPIにアクセスするような、APIキーもあります。この二つを簡単に紹介し、エージェントの本人認証に適するかを検討します。

### OpenID Connect（OIDC）

OpenID Connectは、OAuth 2.0の上に構築された認証プロトコルです。クライアントのアプリケーションが本人確認を行い、名前やメールアドレスなどの基本情報を取得できます。OAuth 2.0に、標準化されたアイデンティティの層を加え、ログインやSSOに、より適したものにします。

[OpenID Connect公式仕様](https://openid.net/specs/openid-connect-core-1_0.html)

Googleのアカウントで第三者のサイトにログインする例で、流れを説明します。[GoogleのOIDC公式文書](https://developers.google.com/identity/protocols/oauth2/openid-connect)。

<p align="center">
  <img src="../../blogs/images/openid-connect-fllow.png" width="50%" alt="openid-connect-fllow"/>
</p>

この流れには、事前準備とOAuth 2.0の処理の、二つの部分があります。
- 事前準備
  - Googleのアカウントを登録する。
  - プロジェクトやアプリケーションを作る。
  - リダイレクトURIなどを設定する。
  - OAuth 2.0のクライアントIDとクライアントシークレットを得る。
- OAuth 2.0の処理（認可コードフローの例）
  - 認可コードを得る。
  - それを使い、アクセストークンとIDトークンを得る。IDトークンには、利用者の情報が含まれる。
  - 必要に応じ、アクセストークンとIDトークンを使って、詳しい利用者情報を取得する。OIDCでは、この詳細情報を、保護されたリソースと見なせる。

OpenID Connectの利点：
- 利用者の認証手続きを単純化できる。
- 広く使われ、基盤も整っている。
- セキュリティが高い。

エージェントの相互接続という観点では、いくつかの制約があります。
- 本質的には、第三者のアプリケーションが、Googleなどのアイデンティティサーバーを使って、利用者を認証する方式です。第三者のアプリケーション同士が、同サーバーで、互いを認証することはできません。
- 集中型の方式で、利用者の登録などが必要なため、事前準備が複雑です。
- やり取りが複雑で、複数回の通信が必要です。

### APIキー

APIキーは、APIにアクセスするアプリケーションや利用者を認証するための、単純な資格情報です。一般に、乱数で生成した英数字の文字列で、パスワードと似た働きをします。本人認証、アクセス制御、利用状況の監視などに使えます。

<p align="center">
  <img src="../../blogs/images/api-keys-flow.png" width="50%" alt="api-keys-flow"/>
</p>

APIキーで本人認証を行う手順：
- 事前準備
  - プラットフォームにアカウントを登録する。
  - APIキーを取得する。
- 認証の手順
  - HTTPSなどの安全なプロトコルのリクエストヘッダーに、APIキーを加える。
  - サーバーがクライアントのAPIキーを検証する。

APIキーの利点：
- 単純で実装しやすく、やり取りが少ない。
- プラットフォームをまたぐ認証ができる。二つのアプリケーションが、互いのAPIキーを持てば、本人確認できる。
- APIサービスで広く使われている。OpenAIや中国のモデルAPIなど、多くがAPIキーで認証する。

エージェントの相互接続という観点では、いくつかの制約があります。
- セキュリティが相対的に低い。APIキーで認証する多くのMCPサーバーは、設定ファイルへのキーの記入を求めるため、漏えいの危険がある。

<p align="center">
  <img src="../../blogs/images/mcp-server-api-key-example.png" width="50%" alt="mcp-server-api-key-example"/>
</p>

- 利用者の登録やログインなど、事前準備が、依然として必要である。

## W3C DIDを使う本人認証技術：did:wba

### W3C DIDとは

W3C DID（分散型識別子）は、従来の集中型のアイデンティティ管理への依存を解消するための、新しい標準です。2022年に勧告となりました。仕様：[https://www.w3.org/TR/did-core/](https://www.w3.org/TR/did-core/)。

現在、多くのアプリケーションが使っており、最近注目される、分散型でTwitterに似たBlueskyが、その一例です。

### did:wbaとは

did:wbaは、[AgentNetworkProtocol（ANP）](https://github.com/agent-network-protocol/AgentNetworkProtocol)が定義するDID方式です。Web基盤で分散型の本人認証を実現し、特にエージェント間の認証のために設計されています。仕様：[did:wba Method Specification](https://github.com/agent-network-protocol/AgentNetworkProtocol/blob/main/03-did%3Awba%20Method%20Design%20Specification.md)。

機能の面では、電子メールによく似ています。異なるプラットフォームが、それぞれのアカウントを持ちながら、容易に相互認証し、通信できます。どちらもWeb基盤を利用し、多数の利用者に対応しながら、分散性を実現します。

エージェントAが、Bのサービスを登録し、呼び出す場合の手順は、次のとおりです。

<p align="center">
  <img src="../../blogs/images/did-wba-flow.png" width="75%" alt="did:wba-flow"/>
</p>

- 事前準備
  - Aは、まずBのサービス登録インターフェースを呼び出し、自分のDIDと署名を付け、登録元がAであることを伝える。APIによる登録で、複雑な登録、ログイン、設定の手順をなくし、接続コストを下げられる。
- 本人認証の手順
  - 最初のHTTPリクエストで、AのDIDと署名をヘッダーに付ける。
  - Bは、それらを取り出し、AのDIDから、AのDIDサーバーの文書を取得する。
  - Bは、文書の公開鍵でAの署名を検証する。
  - 成功したら、Aの業務のリクエストを処理し、データとアクセストークンを返す。
  - Aは、その後のリクエストにトークンを付け、Bは、その検証でAを認証する。

did:wbaによる認証の利点：
- セキュリティが高い。
- Web基盤を十分に活用し、多くの利用者に対応でき、実装しやすい。
- 分散型で、任意の二つのエージェントやアプリケーションが、相互に本人認証できる。
- 事前準備が単純で、人による登録、ログイン、設定が不要。
- 認証の処理が単純で、やり取りの回数を増やさない。

もちろん、欠点もあります。主なものは、2022年に公開された仕様として、基盤がまだ十分でなく、適用範囲が比較的限られていることです。ただし、Blueskyのような注目すべき事例も現れています。

## did:wbaとOpenID Connect／APIキーの比較

エージェントの本人認証という観点で比較します。
- セキュリティ：did:wbaとOpenID Connectは同等で、どちらもAPIキーより高い。
- 複雑さ：OpenID Connectが最も高く、APIキーが最も低い。did:wbaは、その間にある。
- やり取りの回数：did:wbaとAPIキーが最も少なく、OpenID Connectが最も多い。
- 事前準備：did:wbaは、人の介入なしに実行できる。OpenID ConnectとAPIキーには、人による処理が必要。
- 分散性：did:wbaとAPIキーは、任意のエージェントやアプリケーション同士の通信を実現できる。OpenID Connectでは、できない。
- 適用範囲：OpenID ConnectとAPIキーは広く普及している。did:wbaは新しく、適用範囲が限られる。

全体の比較：

| 比較項目 | did:wba | OpenID Connect | APIキー |
|:-------|:--------|:---------------|:---------|
| セキュリティ | 高い | 高い | 中程度 |
| 複雑さ | 中程度 | 高い | 低い |
| やり取りの回数 | 少ない | 多い | 少ない |
| 事前準備 | 単純、人手不要 | 複雑、人手必要 | 中程度、人手必要 |
| 分散性 | あり | なし | あり |
| 適用範囲 | 限定的 | 広い | 広い |

この比較から、did:wbaは、すべてのエージェントの相互接続に対応するだけでなく、OpenID Connectの安全性とAPIキーの単純さを持ち、多数の利用者にも対応できると分かります。総合的に見て、エージェント間の本人認証に、最も適した方式です。

もちろん、OpenID ConnectとAPIキーにも、役割は残ります。例えば、既存のインターネットシステムと連携するときには、引き続き、それらが必要かもしれません。

## 著作権表示
Copyright (c) 2024 ANP Community  
このファイルは[MIT License](../../LICENSE)のもとで公開されています。自由に利用・変更できますが、この著作権表示を保持する必要があります。
