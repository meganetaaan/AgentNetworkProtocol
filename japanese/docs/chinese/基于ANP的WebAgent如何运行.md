> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [docs/chinese/基于ANP的WebAgent如何运行.md](../../../docs/chinese/基于ANP的WebAgent如何运行.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANPに基づくWebAgentガイド:気象インテリジェンスを例に挙げる

## 総合案内

WebAgentは、AIへのアクセスのために設計されたネットワークスマートボディで、他の知能体が標準化されたプロトコルを介して直接情報やサービスにアクセスできるようにします。 このドキュメントでは、気象を例に使用して、WebAgentの動作メカニズムと方法について説明します。

## 1. Webエージェント・ディスカバリー・メカニズム

Webエージェント:

### 1.1 アクティブ検出(ドメイン名による)

WebAgent のドメイン名が知られていると、標準化されたパスにアクセスして、スマートのリストを取得できます。

```
https://<域名>/.well-known/agent-descriptions
```

**事例:**_: 訪問 `https://agent-weather.xyz/.well-known/agent-descriptions` 次の JSON-LD 形式のデータを返します。

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

この応答により、ドメイン名と説明ファイルのアドレスに存在するWebAgentsのリストをスマートボディで知ることができます。

話している内容がわからない。https://agent-weather.xyz/ad.json 気象情報の説明ファイルアドレスです。

### 1.2 パッシブ検出(検索サービスによる)

WebAgentは、キーワードを検索することで、他のインテリジェントなボディがそれを見つけることができるように、スマートボディ検索サービス自体を登録することができます。例えば、「天気」のキーワードを検索すると、WebAgentの気象情報に戻ることができます。

## 2. Webエージェントの説明 パーシング

WebAgent を見つけたら、次のステップは説明ファイル (エージェントの説明) を取得して解析することです。

**事例:**気象インテリジェンスの説明 `https://agent-weather.xyz/ad.json` 含まれる:

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

**ファイルキーフィールドの解像度の説明**：

- `name`, `description`:WebAgent の名称と機能の説明
- `owner`Webエージェントの所有者情報
- `securityDefinitions`: 認証モードの定義
- `security`: 使用される認証スキームの名前
- `interfaces`: 提供されているインタフェースのリスト:
  - 構造化されたインターフェイス:天候の照会、予約、等のため。
  - 自然言語インターフェイス:自然言語による相互

情報を説明することで、スマートはWebAgentの名前、機能、インターフェイスの種類、インタフェースアドレス、インターフェース認証にアクセスすることができます。インターフェイスを呼び出すことにより、気象情報、予約サービス、サブスクリプションステータスの問い合わせなどにアクセスすることができます。

## 3. 識別メカニズム

WebAgentへのアクセスは、信頼できるインテリジェンスボディから要求が来ることを確認するために認証が必要です。

### 3.1 DIDの同一証明プロセス

天気 Webエージェント `did:wba` 認証方法:

1. **DID の取得**: あらゆる知能は、独自のDIDを持つ必要があります。 `did:wba:example.com:agent:weather123`
2. **DID 文書の準備**: パブリックキーを含むDID文書は、ドメイン名パスに公開される
3. **署名のリクエスト**: コールアは、リクエストされたコンテンツの署名を作成するためにプライベートキーを使用します
4. **リクエストを送信**: 署名を追加する `Authorization` 同期フォルダ
5. **検証プロセス**:WebAgent は署名を検証し、アクセス権を承認するかどうかを決定します

### 3.2 DIDのテスト

開発者のテストを容易にするために、AMP はパブリックテスト DID を提供します:

- ドイド:`did:wba:agent-did.com:test:public`
- 組織図[ANP例 コーディングライブラリ](https://github.com/agent-network-protocol/anp-examples/tree/main/use_did_test_public)
- 目的: 機密操作のためにだけでなくテストして下さい

## 4. WebAgent との相互連携

### 4.1 アクセスプロセス

気象WebAgentを使用した標準プロセス:

1. **プロフィールを見る**_: 訪問 `https://agent-weather.xyz/ad.json`
2. **インターフェイス情報の解析**: から `interfaces` 利用可能な API インターフェイスを取得するフィールド
3. **インターフェイス定義の取得**: ダウンロード `weather-info.yaml` OpenAPI定義ファイル待ち
4. **ビルドリクエスト**: API 定義に基づくフォーマット対応リクエストを作成する
5. **認証を追加**: リクエストのヘッダーに DID 署名認証情報を追加
6. **リクエストを送信**リクエストに HTTP を WebAgent に送信する
7. **プロセス応答**: 返された構造データ(JSON/YAML)の解析

### 4.2 コードの例

AMP ツールと気象 WebAgent とのやり取りのコードの例:

```python
# 以下代码展示如何使用 ANPTool 访问天气 WebAgent

async def query_weather(city):
    # 步骤 1：获取智能体描述文件
    ad_url = "https://agent-weather.xyz/ad.json"
    ad_response = await anp_tool.execute(url=ad_url)
    
    # 步骤 2：解析接口信息
    weather_api_url = None
    for interface in ad_response["ad:interfaces"]:
        if "weather" in interface["description"]:
            weather_api_url = interface["url"]
            break
    
    # 步骤 3：获取 API 定义
    api_def = await anp_tool.execute(url=weather_api_url)
    
    # 步骤 4-6：构建请求并发送
    # 注意：实际 URL 和参数需根据 API 定义确定
    weather_endpoint = "https://agent-weather.xyz/api/weather"
    weather_data = await anp_tool.execute(
        url=weather_endpoint,
        method="GET",
        params={"city": city}
    )
    
    # 步骤 7：处理响应
    return weather_data
```

### 4.3 ANPエクスプローラツールを使用する

ANP Explorerは便利なWebAgentの相互ツールです。

- ウェブサイト:https://service.agent-network-protocol.com/anp-explorer/
- 関数:
  1. 自然言語の気象情報を検索
  2. WebAgent の記述文書を閲覧し、探索する
- 使用法:文書のURLを記述するか、または直接気象関連の質問にスマートなボディを書き入れて下さい

## 5. WebAgent 技術的特徴 概要

気象WebAgentは、ANPプロトコルのコアメリットを反映しています。

1. **構造データ**: 直接、HTMLを解釈することなくJSON/YAML形式でデータを提供
2. **自己記述**: 完全なインターフェイス記述、自動的に検出し、使用すること容易なスマートなボディ
3. **中央へ。**: それぞれスマートボディシステムが別途登録されることなく、DIDを使用してクロスプラットフォーム認証を提供
4. **ネイティブAIインターフェイス**: 人操作のシミュレーションなしでAIのために設計されているインターフェイス モデル

## 6. 独自のWebAgentクライアントを開発

天候と対話できるクライアントを開発するには、次のことが必要です。

1. 統合されたAMP用具、参照:https://github.com/agent-network-protocol/anp-examples
2. DID認証を有効に
3. インテリジェンスの発見と説明によってファイルの解像度のロジックを書く
4. インターフェイスに基づくビルドジェネレータのリクエストを定義する

ヒントとHTTP機能により、AIスマートボディがWebAgentとやり取りできるようになります。

## 参照リソース

- ANPの議定書の規則:https://github.com/agent-network-protocol/AgentNetworkProtocol
- 導入事例:https://github.com/agent-network-protocol/anp-examples
- 天気:https://agent-weather.xyz/
- ANPエクスプローラ:https://service.agent-network-protocol.com/anp-explorer/
- AAIインタビュー用に設計された最初のWebAgentが誕生しました。[初のWebAgentがA.I.A.に誕生しました。](../../blogs/cn/第一个专为AI访问而设计的WebAgent诞生了.md)