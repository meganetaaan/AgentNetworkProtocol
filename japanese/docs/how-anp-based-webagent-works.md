<!-- translation-method: manual -->
> 日本語参考訳（手動翻訳）。規範となるのは原文です。コード例・識別子は原文を保持しています。
> 原文: [docs/how-anp-based-webagent-works.md](../../docs/how-anp-based-webagent-works.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

<a id="how-anp-based-webagent-works-weather-agent-as-an-example"></a>
# ANPベースのWebAgentの動作: 天気エージェントを例に

> 翻訳者注: 以下は原文を保持した歴史的な解説の日本語訳です。§3.1の`Authorization`による署名とDIDの例は旧方式です。新規実装では[現行ANP-02のHTTP認証](../../02-anp-did-authentication-protocol-specification.md#http-binding)と[ANP入門ガイド](anp-getting-started-guide.md)を確認してください。掲載サービスの現在の稼働状況を確認したものではありません。

<a id="overview"></a>
## 概要

WebAgentは、AIからのアクセスに特化して設計されたネットワークエージェントであり、他のエージェントが標準化されたプロトコルを通じて情報やサービスを直接取得できるようにします。この文書では、Weather WebAgentを例に、WebAgentの動作の仕組みと利用方法を詳しく説明します。

<a id="1-webagent-discovery-mechanism"></a>
## 1. WebAgentの発見の仕組み

エージェントは、次の二つの方法でWebAgentを発見できます。

<a id="11-active-discovery-via-domain"></a>
### 1.1 能動的な発見（ドメイン経由）

WebAgentのドメインが分かっている場合、標準化されたパスにアクセスすることでエージェントの一覧を取得できます。

```
https://<domain>/.well-known/agent-descriptions
```

**例**: `https://agent-weather.xyz/.well-known/agent-descriptions`にアクセスすると、次のJSON-LD形式のデータが返されます。

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
      "name": "Weather Agent",
      "@id": "https://agent-weather.xyz/ad.json"
    }
  ]
}
```

この応答から、エージェントはドメイン配下のWebAgentの一覧と、それらの説明ファイルのアドレスを知ることができます。

この場合、https://agent-weather.xyz/ad.json が天気エージェントの説明ファイルのアドレスです。

<a id="12-passive-discovery-via-search-services"></a>
### 1.2 受動的な発見（検索サービス経由）

WebAgentはエージェント検索サービスに登録でき、他のエージェントはキーワード検索でそれを見つけられます。例えば、キーワード「weather」で検索すると、Weather WebAgentの情報が返されることがあります。

<a id="2-webagent-description-file-parsing"></a>
## 2. WebAgentの説明ファイルの解析

WebAgentを発見したら、次にその説明ファイル（Agent Description）を取得して解析します。

**例**: 天気エージェントの説明ファイル`https://agent-weather.xyz/ad.json`には、次の内容が含まれます。

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "did": "https://w3id.org/did#",
    "ad": "https://agent-network-protocol.com/ad#"
  },
  "@type": "ad:AgentDescription",
  "@id": "https://agent-connect.ai/agents/travel/weather/ad.json",
  "name": "Weather Agent",
  "description": "Weather Agent providing weather information query services for cities nationwide.",
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
      "description": "OpenAPI YAML file providing weather query services."
    },
    {
      "@type": "ad:StructuredInterface",
      "protocol": "YAML",
      "url": "https://agent-connect.ai/agents/travel/weather/api_files/booking-interface.yaml",
      "description": "OpenAPI YAML file providing weather information booking services."
    },
    {
      "@type": "ad:StructuredInterface",
      "protocol": "YAML",
      "url": "https://agent-connect.ai/agents/travel/weather/api_files/subscription-status-interface.yaml",
      "description": "OpenAPI YAML file providing weather subscription status query services."
    },
    {
      "@type": "ad:NaturalLanguageInterface",
      "protocol": "YAML",
      "url": "https://agent-connect.ai/agents/travel/weather/api_files/nl-interface.yaml",
      "description": "Interface for interacting with intelligent agents through natural language."
    }
  ],
  "status_code": 200,
  "url": "https://agent-connect.ai/agents/travel/weather/ad.json"
}
```

**説明ファイルの主なフィールド**:

- `name`、`description`: WebAgentの名前と機能の説明
- `owner`: WebAgentの所有者に関する情報
- `securityDefinitions`: 認証方法の定義
- `security`: 使用する検証方式の名前
- `interfaces`: 提供されるインターフェースの一覧。次のものを含みます。
  - 構造化インターフェース: 天気照会、予約サービスなどに使用
  - 自然言語インターフェース: 自然言語でのやり取りに使用

この記述を通じて、エージェントはWebAgentの名前、機能、インターフェースの種類、インターフェースのアドレス、認証方法などを知ることができます。これらのインターフェースを呼び出すことで、天気情報、予約サービス、購読状況の照会などの機能にアクセスできます。

<a id="3-identity-authentication-mechanism"></a>
## 3. 身元認証の仕組み

WebAgentへのアクセスでは、リクエストが信頼できるエージェントから来ていることを確かめるために、身元の検証が必要です。

<a id="31-did-authentication-process"></a>
### 3.1 DID認証の流れ

Weather WebAgentは、認証に`did:wba`メソッドを使います。

1. **DIDの取得**: 各エージェントには、`did:wba:example.com:agent:weather123`などの自身のDIDが必要です。
2. **DID文書の準備**: 公開鍵を含むDID文書を、ドメイン内の所定のパスに公開しなければなりません。
3. **リクエストへの署名**: 呼び出し側は、秘密鍵を使ってリクエスト内容の署名を生成します。
4. **リクエストの送信**: リクエストを送信する際、`Authorization`ヘッダーに署名を追加します。
5. **検証処理**: WebAgentは署名の有効性を検証し、アクセスを認可するかを判断します。

<a id="32-test-did"></a>
### 3.2 テスト用DID

開発者のテストを容易にするため、ANPは公開テスト用DIDを提供しています。

- DID: `did:wba:agent-did.com:test:public`
- 場所: [ANPサンプルコードリポジトリ](https://github.com/agent-network-protocol/anp-examples/tree/main/use_did_test_public)
- 用途: テスト専用であり、機密性の高い操作には使用しません。

<a id="4-interacting-with-webagent"></a>
## 4. WebAgentとのやり取り

<a id="41-access-process"></a>
### 4.1 アクセスの手順

Weather WebAgentを利用する標準的な手順:

1. **説明ファイルの取得**: `https://agent-weather.xyz/ad.json`にアクセスします。
2. **インターフェース情報の解析**: `interfaces`フィールドから、利用できるAPIインターフェースを取得します。
3. **インターフェース定義の取得**: `weather-info.yaml`などのOpenAPI定義ファイルをダウンロードします。
4. **リクエストの構築**: API定義に従い、正しい形式でリクエストを作ります。
5. **認証の追加**: リクエストヘッダーにDID署名の認証情報を追加します。
6. **リクエストの送信**: WebAgentにHTTPリクエストを送ります。
7. **応答の処理**: 返された構造化データ（JSON／YAML）を解析します。

<a id="42-code-example"></a>
### 4.2 コード例

ANPのツールを使ってWeather WebAgentとやり取りするコード例:

```python
# The following code demonstrates how to use ANPTool to access the Weather WebAgent

async def query_weather(city):
    # Step 1: Get the agent description file
    ad_url = "https://agent-weather.xyz/ad.json"
    ad_response = await anp_tool.execute(url=ad_url)
    
    # Step 2: Parse interface information
    weather_api_url = None
    for interface in ad_response["ad:interfaces"]:
        if "weather" in interface["description"]:
            weather_api_url = interface["url"]
            break
    
    # Step 3: Get API definition
    api_def = await anp_tool.execute(url=weather_api_url)
    
    # Steps 4-6: Build and send request
    # Note: Actual URL and parameters should be determined based on the API definition
    weather_endpoint = "https://agent-weather.xyz/api/weather"
    weather_data = await anp_tool.execute(
        url=weather_endpoint,
        method="GET",
        params={"city": city}
    )
    
    # Step 7: Process response
    return weather_data
```

<a id="43-using-the-anp-explorer-tool"></a>
### 4.3 ANP Explorerツールの利用

ANP Explorerは、WebAgentとやり取りするための便利なツールです。

- Webサイト: https://service.agent-network-protocol.com/anp-explorer/
- 機能:
  1. 自然言語による天気情報の照会
  2. WebAgentの説明文書の閲覧と探索
- 利用方法: エージェントの説明文書のURLを入力するか、天気に関する質問を直接入力します。

<a id="5-webagent-technical-features-summary"></a>
## 5. WebAgentの技術的特徴

Weather WebAgentは、ANPプロトコルの中心的な利点を示しています。

1. **構造化データ**: JSON／YAML形式でデータを直接提供するため、HTMLを解析する必要がありません。
2. **自己記述性**: エージェントが完全なインターフェース文書を備えており、自動的な発見と利用を容易にします。
3. **分散型認証**: DIDを使ってプラットフォームをまたぐ認証を提供し、エージェントシステムごとの個別登録を不要にします。
4. **AIネイティブなインターフェース**: AI専用に設計されたインターフェース方式であり、人間の操作を模倣する必要がありません。

<a id="6-developing-your-own-webagent-client"></a>
## 6. 自分のWebAgentクライアントを開発する

Weather WebAgentとやり取りできるクライアントを開発するには、次のものが必要です。

1. ANPツールを組み込みます。参考: https://github.com/agent-network-protocol/anp-examples
2. DID認証機能を実装します。
3. エージェントの発見と説明ファイルの解析のロジックを書きます。
4. インターフェース定義に基づくリクエスト生成機能を作ります。

プロンプト一つとHTTP関数一つだけで、AIエージェントがWebAgentとやり取りできるようになります。

<a id="reference-resources"></a>
## 参考リソース

- ANPプロトコル仕様: https://github.com/agent-network-protocol/AgentNetworkProtocol
- サンプルコードリポジトリ: https://github.com/agent-network-protocol/anp-examples
- Weather WebAgent: https://agent-weather.xyz/
- ANP Explorer: https://service.agent-network-protocol.com/anp-explorer/
- ANP公式Webサイト: https://agent-network-protocol.com/
- AIからのアクセスのために設計された最初のWebAgentの誕生: [AIからのアクセスのために設計された最初のWebAgentの誕生](../blogs/The-Birth-of-the-First-WebAgent-Designed-for-AI-Access.md)
