<!-- translation-review: full; source=blogs/cn/第一个专为AI访问而设计的WebAgent诞生了.md -->
> 日本語参考訳（原文全文照合・校閲済み）。発表時点のWebAgent例・旧認証方式の説明を保持しています。公開テストDIDは試験専用です。
> 原文: [blogs/cn/第一个专为AI访问而设计的WebAgent诞生了.md](../../../blogs/cn/第一个专为AI访问而设计的WebAgent诞生了.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# AIのアクセス専用に設計した、最初のWebAgentの誕生

Computer UseやBrowser Useなどを使い、インターネットから直接情報を得ようとする**エージェント**が増えています。しかし、従来のサイトは人間向けです。AIは、クローラーのようなHTML解析など、人のブラウザー操作を模倣する必要があり、複雑で非効率です。

この問題を解くため、**WebAgent**を作る必要があるかもしれません。

本稿では、その意味と最初の公開例、発見とやり取り、本人確認、接続のコード例を紹介し、AI専用のデータネットワークを考えます。

## WebAgentとは

PKI、DNS、HTTP、CDN、検索エンジンなど、既存のWeb基盤で作り、Web上で動くエージェントです。ほかのエージェントがアクセスしてやり取りするために、AIが読んで理解できる公開情報と、構造化形式や自然言語などのインターフェースを提供します。人間向けの画面は必要ありません。

従来のサイトとは、次の点で異なります。
- **対象**：ブラウザーを使う人ではなく、Web経由でアクセスするAI向けです。
- **構造化データ**：JSONやYAMLを返し、HTMLから追加解析して取り出す手間を省きます。
- **自己記述**：機能、形式、呼び出し方法を説明する記述ファイルを提供します。
- **本人確認**：アクセス元の確認を組み込み、情報や機能の悪用を防ぎます。従来のサイトは、無制限の収集に悩まされています。

AIのための「ネイティブなサイト」により、標準インターフェースで直接データを取得し、作業を進められます。情報利用の効率と正確さが上がり、開発者も人の閲覧形式に縛られず、AI向けに最適化できます。WebAgentはAgentic Webの基本部品となり、直接の通信と協働を可能にします。

## 最初のWebAgent

私たちは、天気情報を提供する、最初のANPベースのWebAgentを開発しました。

AIを前提とする設計ですが、人の開発者にも存在が分かるよう、デモとして簡単なホームページを加えました。AI自身には不要です。

次がその画面です。https://agent-weather.xyz/ でも確認できます。

![WebAgentの例](../../../blogs/images/first-web-agent.png)

*図：最初の天気WebAgentのデモ画面。実際のAIとのやり取りは、APIで天気データを取得します。*

「天気エージェント（天气智能体）」と名付け、「小晴」という仮想の人物を設け、専用ドメインで公開しました。ANP仕様に完全に沿った設計です。動作の例が、開発者と利用者の参考になればと思います。

理想的には、人が使える画面は不要で、プロトコルだけで通信できます。ただし、調査や理解のため、この最初の例には、基本情報と機能を示すホームページを用意しました。

## 発見する方法

人の訪問を中心にしないサービスを、どう**発見し、場所を特定する**のでしょうか。

ANPは、ドメイン名が分かれば、その配下のWebAgentと記述ファイルが見つかる**発見の仕組み**を設けています。サイトの発見と同じく、基本的にはDNSに基づきます。

**1. ドメインと`.well-known`による能動的な発見（Active Discovery）**：`.well-known`でメタデータを公開する`.well-known/robots.txt`や`.well-known/openid-configuration`などの考え方にならい、各ドメインで一覧を提供できます。

```
https://<域名>/.well-known/agent-descriptions
```

この経路は、公開されているすべての記述ファイルの場所を並べた、JSON-LDの**発見文書**を返します。[ANP発見仕様](https://github.com/agent-network-protocol/AgentNetworkProtocol/blob/main/08-ANP-Agent-Discovery-Protocol-Specification.md)を参照してください。

例えば、`agent-weather.xyz`の**`https://agent-weather.xyz/.well-known/agent-descriptions`**は、次のように返します。

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "ad": "https://agent-network-protocol.com/ad#"
  },
  "@type": "CollectionPage",
  "url": "https://agent-weather.xyz/.well-known/agent-descriptions",
  "items": [
    {
      "@type": "ad:AgentDescription",
      "name": "天气智能体",
      "@id": "https://agent-weather.xyz/ad.json"
    }
  ]
}
```

`agent-weather.xyz`には天気エージェントがあり、記述ファイルは`https://agent-weather.xyz/ad.json`だと分かります。これを**AD（Agent Description）**と略します。複数あれば`items`に並ぶため、AIは次にどのURLを取得すべきか分かります。

`.well-known/agent-descriptions`を入り口にすれば、**ドメインが分かるだけ**で一覧を発見でき、個別の経路を人から教わる必要はありません。検索エンジンも索引しやすくなります。

**2. 受動的な発見（Passive Discovery）**：専用の検索サービスや登録簿に、記述URLを提出する方法もあります。例えば「天気」でほかのエージェントに検索してもらえます。自身を積極的に**登録**することで、受動的に発見されます。

二つの仕組みにより、ドメインや検索から、必要なWebAgentを見つけられます。

## やり取りする方法

発見後は、上記の`ad.json`という**記述ファイル**を使います。

能力とインターフェースを詳しく示す**説明書**であり、読むことで、データと機能の利用方法や通信方法が分かります。

例として、[`https://agent-weather.xyz/ad.json`](https://agent-weather.xyz/ad.json)を見ます。

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "did": "https://w3id.org/did#",
    "ad": "https://agent-network-protocol.com/ad#"
  },
  "@type": "ad:AgentDescription",
  "@id": "https://agent-connect.ai/agents/travel/weather/ad.json",
  "name": "天气智能体",
  "description": "天气智能体，提供全国城市天气信息查询服务。",
  "version": "1.0.0",
  "owner": {
    "@type": "Organization",
    "name": "agent-connect.ai",
    "@id": "https://agent-connect.ai"
  },
  "ad:securityDefinitions": {
    "didwba_sc": {
      "scheme": "didwba",
      "in": "header",
      "name": "Authorization"
    }
  },
  "ad:security": "didwba_sc",
  "ad:interfaces": [
    {
      "@type": "ad:StructuredInterface",
      "protocol": "YAML",
      "url": "https://agent-connect.ai/agents/travel/weather/api_files/weather-info.yaml",
      "description": "提供天气查询服务的OpenAPI的YAML文件。"
    },
    {
      "@type": "ad:StructuredInterface",
      "protocol": "YAML",
      "url": "https://agent-connect.ai/agents/travel/weather/api_files/booking-interface.yaml",
      "description": "提供天气信息预订服务的OpenAPI的YAML文件。"
    },
    {
      "@type": "ad:StructuredInterface",
      "protocol": "YAML",
      "url": "https://agent-connect.ai/agents/travel/weather/api_files/subscription-status-interface.yaml",
      "description": "提供天气订阅状态查询服务的OpenAPI的YAML文件。"
    },
    {
      "@type": "ad:NaturalLanguageInterface",
      "protocol": "YAML",
      "url": "https://agent-connect.ai/agents/travel/weather/api_files/nl-interface.yaml",
      "description": "提供通过自然语言与智能代理交互的接口。"
    }
  ],
  "status_code": 200,
  "url": "https://agent-connect.ai/agents/travel/weather/ad.json"
}
```

JSON-LDで、Schema.orgの共通語彙を用い、データの意味を一致させます。adなどの拡張で、エージェント固有のやり取りも補います。

`ad:interfaces`に複数のOpenAPI YAMLがあり、`weather-info.yaml`は天気照会の定義だと分かります。

YAMLを取得すると、例えば`GET /weather?city={城市名称}`のようなHTTPの機能と、返すデータの形式が分かり、仕様どおりに要求を作れます。

**やり取りの例**：
1. 記述を読み、`security`で必要ならDIDの本人確認を使い、天気APIの定義を探します。
2. 杭州の現在の天気なら、例えば`GET https://agent-weather.xyz/api/weather?city=杭州`です。これは例であり、実際の宛先は定義ファイルで確認します。
3. 次節の認証情報をヘッダーに加え、要求します。
4. 温度、湿度、天候などの構造化データを受け、推論や利用者への表示に使います。

発見、API文書の取得、実際の呼び出しへと順に深められ、**機械が読める資源を自律的に収集**して、人手なしで複雑な作業を進められます。

## アクセス時の本人確認

自動化されたAIには、悪用や過剰な呼び出しの危険があります。最近批判される、学習会社による大量収集も例です。

そこで通常は、**呼び出し元に本人確認を求め**、信頼する主体からの要求かを確かめ、権限や割当量を管理します。人のパスワード、APIキー、OAuthに似ています。

より適した方法として、**W3C DID（Decentralized Identifier）**を使います。相手側で毎回アカウントを登録せず、自分のDIDで利用できます。

ANPの専用方式が**`did:wba`**（WebAgent DID）です。[認証仕様](https://github.com/agent-network-protocol/AgentNetworkProtocol/blob/main/03-did%3Awba-method-design-specification.md)にあるように、`did:wba`は既存のWeb基盤を用います。`did:wba:`で始まる、次のような識別子を持てます。

```
did:wba:example.com:agent:weather123
``` 

メールアドレスや利用者IDに似て、ドメインを含みます。相手はDIDを知るだけで既存の基盤から本人性を確認でき、相手側の登録を不要にして、プラットフォーム間の協働を簡単にします。

`did:wba`の流れは、次のとおりです。
- **文書の公開**：DID文書には公開鍵などの検証材料があります。`did:wba`はドメインの特定の経路に置き、HTTPで取得します。例えば`did:wba:agent-did.com:user:alice`から、Aliceの公開鍵を含む文書を取得できます。
- **署名の添付**：確認を必要とするサービスには、秘密鍵でチャレンジや要求内容に署名し、`Authorization`などのヘッダーに加えます。
- **検証**：サーバーがDID文書の公開鍵で確認します。成功すれば、そのDIDの主体からの要求と判断し、方針で利用を認めます。失敗なら401 Unauthorizedなどを返します。

**中央の利用者データベースに頼らず、任意の二者が相互に信頼できます。** 電子メールで、相手のサーバーに登録せず、DNSと公開鍵で確認するようなものです。`did:wba`は柔軟で、プラットフォームに依存しません。大規模で多数の主体がいる場面に向きます。各自の身元を持ち、一度確認して各所で使えます。従来のAPIキーなどへの互換対応も可能ですが、DIDは将来を見据えた方法です。

**悪用防止と権限制御**：
- DIDごとに割当量と権限を設け、敏感な操作を一定の信頼度に限れます。
- 匿名の収集に困る代わりに、問題を特定のDIDまで追えます。
- 評判を蓄積し、問題あるDIDを拒否し、よいDIDには高い権限を与えられます。

導入を容易にするため、**公開のテスト用DID**もあります。`did:wba:agent-did.com:test:public`の文書と秘密鍵を公開し、誰でも試せます。ただし、**試験専用で、実際の取引や敏感な操作はできません**。

[サンプル](https://github.com/agent-network-protocol/anp-examples/tree/main/use_did_test_public)の`use_did_test_public`に、`did.json`と`key-1_private.pem`、使用例があります。次の例でも、この身元を使います。

# ANP WebAgentへのアクセスツール

ANP Explorerを開発しました：https://service.agent-network-protocol.com/anp-explorer/。

![ANP Explorer](../../../blogs/images/anp-explorer.png)

二つの機能があります。
- 自然言語の個人助手として、記述に沿ってAPIを呼び、結果を返します。
- 記述のURLを入力すると、文書と、そこからリンクされた文書を取得して調べられます。

アクセスには、公開テストDID（`did:wba:agent-did.com:test:public`）を使います。

## コード例：ANPへの対応

発見、記述、認証を理解したところで、簡単な実装を見ます。[anp-examples](https://github.com/agent-network-protocol/anp-examples)は公開されており、上のExplorerのコードでもあります。

必要なのは、*一つのプロンプトと、一つのHTTP関数だけ*です。

まず、https://github.com/agent-network-protocol/anp-examples/blob/main/anp_examples/simple_example.py のプロンプトです。

```plaintext
1. 您将收到一个起始URL（{{initial_url}}），这是一个智能体的描述文件。
2. 您需要了解该智能体描述文件的结构、功能和API使用方法。
3. 您需要像网络爬虫一样不断发现和访问新的URL和API端点。
4. 您可以使用anp_tool获取任何URL的内容。
5. 该工具可以处理多种格式的响应，包括：
   - JSON格式：将直接解析为JSON对象。
   - YAML格式：将返回文本内容，您需要分析其结构。
   - 其他文本格式：将返回原始文本内容。
6. 阅读每个文档以查找与任务相关的信息或API端点。
7. 您需要自行决定爬取路径，不要等待用户指示。
8. 注意：您最多可以爬取10个URL，超过此限制后必须结束爬取。
......
```

anp_toolで文書やAPIを繰り返し取得し、必要な情報が集まるまで、クローラーのように進むよう指示します。

HTTP関数は、`anp_tool.py`の非同期メソッド`execute(...)`で、実際の要求と本人確認を処理します。

コード：https://github.com/agent-network-protocol/anp-examples/blob/main/anp_examples/anp_tool.py

`ANPTool`を使えば、通常のHTTP呼び出しと同じほど単純になります。モデルにツールを与え、使い方を伝えるだけで、自律的なエージェント間操作が可能です。

「明日の上海のホテルを予約して」なら、ANPToolで予約エージェントを探し、記述と定義を取得し、予約して結果を返せます。標準的で自己記述的な機能と、ANPの単純さによるものです。

## AI専用のデータネットワークへ

最初のWebAgentから、**画面がなく、AIだけに開かれた**データサービス網の形が見えます。土台は三つです。
- **発見**：標準と`.well-known`で、人手の目録なしに索引できます。
- **記述**：能力と仕様を内包し、AI自身が呼び出しを理解できます。
- **本人確認**：DIDで安全と信頼、プラットフォームを越える権限管理を提供します。

特徴は、次のとおりです。
- **AI専用、UI-less**：人間向けの画面を省き、すべてをエージェント間で行います。複雑さを下げ、データの効率的な交換に集中できます。
- **半構造化データ**：主にJSONやYAMLで高速に処理し、一部の自然言語で個別の説明や特徴を伝えます。
- **自己記述**：機能、定義、使い方を標準の文書に示し、人の関与や追加の説明書なしに理解できます。
- **安全性と信頼性**：自動化による悪用や大量収集に対し、DIDの本人確認、権限、追跡と許可によって、データと機能を守ります。

近い将来、天気、ニュース、知識ベース、取引市場、商店などが、この形でAIに開くかもしれません。AIが主な利用者となり、今日アプリやページで行う作業を、インターフェースから直接進めます。人はAIと協働し、複雑な目標のための呼び出しを任せるようになるでしょう。
