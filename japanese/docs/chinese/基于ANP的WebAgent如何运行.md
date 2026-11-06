<!-- translation-review: full; source=docs/chinese/基于ANP的WebAgent如何运行.md; basis=entire original read and manually compared paragraph by paragraph -->
> 日本語参考訳（機械翻訳を基に原文全文を照合済み）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [docs/chinese/基于ANP的WebAgent如何运行.md](../../../docs/chinese/基于ANP的WebAgent如何运行.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP ベースの WebAgent 利用ガイド：天気エージェントの例

## 概要

WebAgent は AI からのアクセス用に設計されたネットワーク上のエージェントです。他のエージェントが、標準化されたプロトコルで情報やサービスを直接取得できます。このガイドでは、天気 WebAgent を例に動作と利用方法を説明します。

## 1. WebAgent の発見

次の2つの方法があります。

### 1.1 能動的発見：ドメイン名を使う

ドメイン名が分かれば、標準化されたパスからエージェント一覧を取得できます。

```
https://<域名>/.well-known/agent-descriptions
```

**例**：`https://agent-weather.xyz/.well-known/agent-descriptions` にアクセスすると、次の JSON-LD が返ります。

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

応答から、そのドメイン内の WebAgent の一覧と、記述ファイルの URL が分かります。

ここでは、https://agent-weather.xyz/ad.json が天気エージェントの記述ファイルです。

### 1.2 受動的発見：検索サービスを使う

WebAgent はエージェント検索サービスに登録でき、他のエージェントがキーワードで見つけられます。例えば「天気」で検索すると、天気 WebAgent の情報が返る場合があります。

## 2. WebAgent 記述ファイルの解析

発見後は、Agent Description を取得し、解析します。

**例**：`https://agent-weather.xyz/ad.json` の記述には、次の内容があります。

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

**主なフィールド**：

- `name`、`description`：WebAgent の名前と機能の説明。
- `owner`：所有者情報。
- `securityDefinitions`：認証方式の定義。
- `security`：使用する認証方式の名前。
- `interfaces`：インターフェースの一覧。
  - 構造化インターフェース：天気照会や予約など。
  - 自然言語インターフェース：自然言語での対話。

記述から、名前、機能、インターフェースの種類と URL、認証方式などを理解できます。インターフェースを呼び出すと、天気情報、予約、購読状態の照会などを利用できます。

## 3. 認証の仕組み

WebAgent へのアクセスでは、信頼するエージェントからの要求であることを確認するために認証を行います。

### 3.1 DID 認証の流れ

この天気 WebAgent は、`did:wba` で認証します。

1. **DID の取得**：例えば `did:wba:example.com:agent:weather123` のような、各エージェント自身の DID を持ちます。
2. **DID 文書の準備**：公開鍵を含む文書を、ドメイン内の所定のパスに公開します。
3. **要求への署名**：呼び出し側が秘密鍵で要求内容に署名します。
4. **要求の送信**：署名を `Authorization` ヘッダーに加えて送ります。
5. **検証**：WebAgent が署名の有効性を検証し、アクセスを認めるか判断します。

### 3.2 テスト用 DID

開発者のテスト用に、ANP は公開のテスト DID を用意しています。

- DID：`did:wba:agent-did.com:test:public`
- 場所：[ANP サンプルコード](https://github.com/agent-network-protocol/anp-examples/tree/main/use_did_test_public)
- 用途：テスト専用。機密性を要する操作には使用できません。

## 4. WebAgent とのやり取り

### 4.1 アクセスの流れ

天気 WebAgent の標準的な利用手順：

1. **記述ファイルの取得**：`https://agent-weather.xyz/ad.json` にアクセスします。
2. **インターフェース情報の解析**：`interfaces` から使える API を取得します。
3. **定義の取得**：`weather-info.yaml` などの OpenAPI 定義をダウンロードします。
4. **要求の構築**：API 定義に合う形式で作ります。
5. **認証の追加**：要求ヘッダーに DID 署名の認証情報を加えます。
6. **送信**：WebAgent に HTTP 要求を送ります。
7. **応答処理**：返された構造化データ（JSON/YAML）を解析します。

### 4.2 コード例

ANP ツールで天気 WebAgent を使う例です。

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

### 4.3 ANP Explorer の利用

ANP Explorer は WebAgent とやり取りするための便利なツールです。

- URL：https://service.agent-network-protocol.com/anp-explorer/
- 機能：
  1. 自然言語で天気情報を照会。
  2. WebAgent 記述文書の閲覧と探索。
- 利用方法：エージェント記述文書の URL を入力するか、天気について直接質問します。

## 5. WebAgent の技術的な特徴

この天気 WebAgent は、ANP の主な利点を示します。

1. **構造化データ**：JSON/YAML を直接提供し、HTML の解析が不要です。
2. **自己記述**：完全なインターフェース説明を備え、自動的な発見・利用を容易にします。
3. **分散型認証**：DID により、各エージェントシステムで個別に登録せず、プラットフォーム間で認証します。
4. **AI 向けのネイティブなインターフェース**：AI 専用に設計され、人間の操作を模倣する必要がありません。

## 6. WebAgent クライアントの開発

天気 WebAgent とやり取りするクライアントには、次が必要です。

1. ANP ツールの統合。参考：https://github.com/agent-network-protocol/anp-examples
2. DID 認証機能の実装。
3. エージェントの発見と記述ファイル解析のロジック。
4. インターフェース定義に基づく要求生成器。

一つのプロンプトと HTTP 関数があれば、AI エージェントに WebAgent とやり取りする能力を持たせられます。

## 参考資料

- ANP 仕様：https://github.com/agent-network-protocol/AgentNetworkProtocol
- サンプルコード：https://github.com/agent-network-protocol/anp-examples
- 天気 WebAgent：https://agent-weather.xyz/
- ANP Explorer：https://service.agent-network-protocol.com/anp-explorer/
- AI からのアクセス専用に設計された最初の WebAgent の誕生：[紹介記事](../../blogs/cn/第一个专为AI访问而设计的WebAgent诞生了.md)
