> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [blogs/The-Birth-of-the-First-WebAgent-Designed-for-AI-Access.md](../../blogs/The-Birth-of-the-First-WebAgent-Designed-for-AI-Access.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# 人工知能アクセスのための初のWebAgent設計誕生

増加する数 **エージェント** インターネットから直接情報を取得する試みです。 現在、コンピュータ利用やブラウザ利用など、多くの技術が利用できます。 しかし、従来のウェブサイトは主に人間ユーザー向けに設計されており、AIはしばしば人間のブラウザの動作をシミュレートする必要があります(HTMLページをクローラーとして解析するなど)、非効率的で複雑なものです。

今回の課題に対処するためには、その課題を解決する必要があります。 **Webエージェント**.

この記事では、WebAgentが何であるか、最初のWebAgentの意義と技術的な詳細、WebAgentのアイデンティティ認証メカニズムを発見し、どのようにWebAgentにやり取りするか、関連するプロトコルを統合するためのコード例を紹介します。 最後に、AI用に特別に設計されたデータネットワークの構築方法を説明します。

## WebAgentとは

WebAgentは、Web上で動作する既存のWebインフラ(PKI、DNS、HTTP、CDN、検索エンジンなど)を使用して構築されたエージェントです。これにより、他のエージェントがWeb経由でアクセスおよびやり取りできるようにします。 従来のWebサイトとは違って、WebAgentsはAI専用のデザインで、AIが読みやすく理解しやすい情報を提供し、構造化や自然言語などのさまざまなフォーマットのインターフェイスをユーザーインターフェースを必要としないため、ユーザーインターフェイスを必要としません。

従来のウェブサイトと比較して、WebAgentsには以下のような注目すべき違いがあります。

- **異なるターゲットオーディエンス**: 従来のウェブサイトは主にブラウザからアクセスし、やり取りする人員にサービスを提供しています。WebAgentsはAI用に特別に設計されており、他のエージェントがWeb経由でアクセスして交流することができます。
- **構造データ形式**: WebAgents は、構造化されたフォーマット(JSON、YAML など)でデータを返し、AI が直接読みやすく処理しやすいようにします。従来のウェブサイトでは HTML を返すため、必要な情報を抽出するために追加的な解析が必要です。
- **自己記述能力**: 各WebAgentは、その機能、インタフェースフォーマット、および呼び出し方法の詳細を記述する説明ファイルを提供し、他のエージェントがそれとやり取りする方法を理解するのが容易になります。
- **アイデンティティ検証機構**: WebAgentsは、アクセスパーティのID確認のために、情報やインターフェイスの誤用を防ぐための組み込みのサポートをしています。 ウェブサイトを既存のことは、Webクローラーによって自由にクロールされている情報の問題に直面していることが多いです。

人工知能にとって、WebAgentsの出現は大きな意義です。 過去には、人工知能は、複雑で非効率的なWeb情報にアクセスするために、人間の閲覧をシミュレートする必要がありました。 人工知能の「ネイティブサイト」として設計されたWebAgentsは、AIがアプリケーションサービスを呼び出すのと同様に、標準的なインターフェイスを介してデータを取得したり、直接タスクを実行できるようにします。 これにより、AIはインターネット情報をより効率的に活用し、開発者がAIに特化したサービスを最適化し、人的閲覧モードに限らず、より効率的な運用を実現します。 WebAgentsは、AIが直接通信し、コラボレーションできるように、Agentic Web を構築するための基礎コンポーネントになります。

## ファースト・ウェブエージェント誕生

気象情報サービスを提供するエージェントWebサイトであるANPベースのWebAgentを初めて開発しました。

デモとして、このWebAgentはAIネイティブデザインに密着し、シンプルなホームページを追加することで、人間開発者がその存在を直感的に理解できるようにします(AIではホームページインターフェイスが不要です)。

以下は、WebAgentのホームページの回路図を提示し、訪問して閲覧することもできます。 https://agent-weather.xyz/:

![Webエージェント例](../../blogs/images/first-web-agent.png)

*(画像:気象庁のデモインターフェースであるWebAgentが初めてです。) 実際のやり取りでは、提供されたAPIインターフェースで気象データを取得できます。)*

この気象WebAgentは名前をつけます **「ウェザーエージェント」**, 専用ドメインでホストされている仮想キャラクター「Sunny」をフィーチャー. ウェザーエージェントの設計は、ANP仕様を完全準拠しています。 この例では、ANP ベースの WebAgent がどのように動作するかを説明します。WebAgent 開発者やユーザーへの参照を提供しようとします。

理想的には、WebAgentは人アクセス可能なウェブインターフェイスを必要としないことに注意してください。AIはプロトコルを通して完全に通信することができます。 しかし、WebAgentの作業原理を理解して、デバッグを容易にし、人間開発者を助けるため、WebAgentは引き続きアクセス可能なホームページを提供し、基本的な情報と機能性を提示します。
## WebAgent の検索方法

WebAgentsは、人的訪問者を中心にしていないため、どのようにして私たちをすることができます **発見し、見つけて下さい** これらのAI志向エージェントサービス?

これを解決するために、ANPは **エージェントの検出メカニズム** これにより、AIは特定のドメインでWebAgentsとその説明ファイルを見つけることができます。 基本的に、ANPのエージェントディスカバリー機構はDNSにも基づいて、ウェブサイトが発見される方法と同様に機能します。

**1. . ドメインとドメインによるアクティブディスカバリー `.well-known` パス:** 一部のインターネットサービスが利用する方法と同様 `.well-known` メタデータ(例、 `.well-known/robots.txt`, `.well-known/openid-configuration`)、WebAgentsはこのアプローチにも従います。 コンベンションでは、WebAgentsをホスティングする各ドメインが提供できます **エージェントリスト**:

```
https://<domain>/.well-known/agent-descriptions
```
このパスにアクセスすると、JSON-LD のフォーマットが返されます。 **発見文書**, そのドメインの下で公開されているすべてのWebAgent説明ファイルのアドレスをリスト. 詳細な定義は、 [ANPエージェントのディスカバリープロトコル仕様](https://github.com/agent-network-protocol/AgentNetworkProtocol/blob/main/08-ANP-Agent-Discovery-Protocol-Specification.md).

例えば、気象エージェントドメインの `agent-weather.xyz`, アクセス **`https://agent-weather.xyz/.well-known/agent-descriptions`** 以下のような内容を返します。

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
上記の例はドメインの下のことを示します `agent-weather.xyz`, 記載されている記述ファイルで「Weather Agent」というエージェントがあります。 `https://agent-weather.xyz/ad.json` (一般的には、 **AD(エージェントの説明)**).. 複数のエージェントがある場合、それらはすべて以下に記載されます `items`. . . エージェントの詳細は、次のURLにアクセスしてエージェントの詳細について詳しく知ることができるAIです。

特に、使用 `.well-known/agent-descriptions` エントリ ポイントとして、 **ドメインが知られている限り**, AIは、手動で提供した特定のパスを必要としずに、それ内のWebAgentsのリストを発見することができます. 検索エンジンによるインデックス作成も容易にします。

**2. . パッシブ・ディスカバリー:** ドメインの.well-knownパスを積極的にクエリするだけでなく、WebAgentは、その情報を専門エージェント検索サービスやレジストリに送信することもできます。 **パッシブ** 発見された。 例えば、WebAgent は、説明ファイル URL をパブリックエージェントの検索エンジンに送信できます。他のエージェントがキーワード(「天気」など)でそれを見つけることを可能にします。 これは、WebAgentが積極的に活動できるように、受動的な発見の形態です **参加申し込み** そのため、ネットワーク内のエージェントがお互いに見つけやすくなります。

ANP が設計した2つの検出機構を利用することで、ドメインや検索エンジンからアクセスしたい WebAgent を簡単に見つけることができます。

## WebAgent とのやりとり

WebAgent が見つかられば、次のステップは **それをやり取りする方法**. . . これを利用する必要があります。 **説明ファイル** ウェビエイジェント(例:WebAgent) `ad.json` 上記)

エージェントの説明ファイルでは、WebAgentの機能とインターフェイスの定義を一種の機能として提供しています **マニュアル**. . . このマニュアルを読んだ後、AIはエージェントが提供した機能にアクセスし、それを通信するために提供されるデータとインターフェイスを使用することができます。

気象エージェントの記述ファイルを取りましょう [`https://agent-weather.xyz/ad.json`](https://agent-weather.xyz/ad.json) たとえば:

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
上記例では、エージェントの説明ファイルがJSON-LD形式になります。 このフォーマットは、Schema.orgが提供する一般的な語彙を使用しており、異なるエージェント間でのデータ管理の一貫性と明確な理解を保証します。 また、WebAgentは「ad」フィールドなどのカスタムエクステンションによる特定のエージェントのインタラクション仕様を補います。

これらのフィールドを解析することで、AIは本質的にこのWebAgentの使い方を理解することができます。 例えば、 `ad:interfaces` 気象エージェントのリスト、OpenAPI YAMLファイルリンク、その1つがいくつか表示されます。 `weather-info.yaml`は、「気象クエリサービス」のAPI定義を提供します。

AI がこの YAML ファイルを取り戻すと、そのように定義可能なエンドポイントなど、気象エージェントがどの HTTP インターフェイスをサポートしているかを判断できます。 `GET /weather?city={city_name}`、および返された気象情報のデータ形式。 AIが天気を照会したいのであれば、このOpenAPI仕様に従ってHTTPリクエストを構築する必要があります。

**相互作用例:** 説明ファイルでは、気象エージェントが気象情報を取得するためのインタフェースを持っていることを知らせます。 この場合、AIは次の手順で進めることができます。
1. 説明ファイルを読み、DID認証の必要性を判断します(必要であれば) `security`) 気象クエリのインターフェイス定義を見つけます。
2. インターフェイス定義に基づいて特定の要求をフォーミュレートします。 例えば、「杭州の現在の天気を運ぶ」と、GETリクエストが対応します。 `GET https://agent-weather.xyz/api/weather?city=Hangzhou` (このURLは、インターフェイス定義ファイルに基づいて実際のエンドポイントを決定するだけの例です)。
3. リクエストヘッダー(次のセクションで詳細)の認証情報を含め、WebAgentにリクエストを送信します。
4. WebAgent は、AI がユーザーのさらなる推論やプレゼンテーションのために直接解析できる温度、湿度、気象条件などと JSON 形式の気象データ(例、JSON 形式)を返します。

説明ファイルを通して、AIはWebAgentが提供した機能を積極的に理解できます。利用可能なインターフェイスを最初に発見し、インターフェースの説明に基づいてAPIドキュメントを取得して、特定のAPIを呼び出してタスクを完了します。 この設計はことを可能にします **WebAgentが提供するすべての機械で読みやすいリソースを自動ロックするAI**人間介入なしで一歩ずつ複雑なタスクを完了します。

## WebAgent へのアクセスのための認証メカニズム

WebAgent は、自動 AI 訪問者を狙っていることを考えると、オープンインターフェイスは悪意のある虐待や過度のコールの問題に直面している可能性があります。, 積極的なウェブサイトデータをスクレイピングするための大規模なモデルの訓練会社の最近の批判など.

ですから、 **WebAgent は、通常、認証を提供するコールアを要求します。** 要求が信頼できる企業から来、許可または引用語句の限界を管理することを確実にするため。 これにより、Webサイトにアクセスする際にパスワードやAPIキー、OAuth認証が必要な人などと似ています。

しかしながら、WebAgentはエージェントエコシステムに適したソリューションを採用しています。認証メカニズムは、 **W3C DID (分散型識別子)** スタンダード。 これにより、エージェントは、各エージェントがカウンターパートのシステムにアカウントを登録することなく、WebAgentにアクセスするためのIDマーカーとして独自のDIDを使用することができます。

AgentNetworkProtocol(ANP)は、特定のDIDメソッドを提案しました。 **`did:wba`** (WebAgent DID) の に従って [ANP認証仕様](https://github.com/agent-network-protocol/AgentNetworkProtocol/blob/main/03-did%3Awba-method-design-specification.md) (DID:WBA法仕様)、 `did:wba` 既存のWebインフラを利用して、分散型アイデンティティ認証を実現し、エージェント間の認証用に特別に設計されています。 単に、各エージェント(またはWebAgentを使用してのエンティティティティティティティティ)が、ID識別子を持つことができます。 `did:wba:`, 例えば:  

```
did:wba:example.com:agent:weather123
``` 

この識別子は、ドメイン情報を含むメールアドレスまたはユーザーIDに akin です。 WebAgent認証システムでは、カウンターパートのシステムにアカウントを登録するエージェントが各エージェントを要求することなく、「既存のネットワークインフラを通じてIDを確認するために、他のパーティーのみDIDを知っている必要があります。 相互プラットフォームのAI-Agentコラボレーションを大幅簡素化。

とりあえず `did:wba` 本人認証プロセスは、次の通り要約できます。
- **DID 文書の出版物:** 各DIDは、公鍵などの検証資料を含む再利用可能なDID文書に対応しています。 とりあえず `did:wba` メソッドは、DID ドキュメントが対応するドメインの特定のパスでホストされていることを指定すると、HTTP 経由で簡単にアクセスできるようにします。 例えば、DID `did:wba:agent-did.com:user:alice` アリスの公開鍵を含むDID文書に解決できます。
- **署名の要求:** エージェントがWebAgentにアクセスする場合、WebAgentがID ID認証を必要とする場合は、リクエストプロセス中にIDを証明するために署名を要求します。 具体的には、リクエストは、チャレンジ文字列またはリクエストコンテンツに署名し、HTTPリクエストヘッダーに署名を付けるために、プライベートキーを使用します(例えば `Authorization`).
- **検証プロセス:** リクエストを受信すると、WebAgentサーバーは、要求者が指定したDID文書から公開鍵を抽出して、署名の妥当性を確認することで、リクエスト者の身元確認を行います。 検証が成功した場合は、DID で表されるエンティティティティから要求され、ポリシーに基づいてアクセスまたはサービスが付与されます。 認証が失敗した場合は、401 不正なエラーが返されます。

DID が分散化されているため、 **集中化されたユーザーデータベースに依存することなく、互いに信頼できる2つのエージェント**. . . これはメール送信システムのように、受信者のメールサーバにアカウントを登録する必要はありません。受信者がDNSを介してドメインを見つけ、対応する公開鍵を信頼できる限りです。 出現の出現 `did:wba` WebAgent ネットワークのアイデンティティ検証を柔軟かつプラットフォームに依存しない。 従来の OAuth や API キーソリューションと比較して、DID はより適しています。 **大規模、多国籍** 各エージェントが、自分のアイデンティティを持ち、一度認証し、どこでも使用可能にできるため、エージェントのエコシステム [もちろん、既存のシステムと互換性のあるためには、WebAgentは従来のAPIキーメソッドもサポートするかもしれませんが、DIDは将来指向のソリューションです。].

**乱用防止およびアクセス管理:** コールワーダーが DID アイデンティティを提供できるように要求することで、WebAgent は以下のようにできます。
- 各DIDのコールクォータと権限レベルを割り当てます。 例えば、特定の信頼レベルを持つDIDのみで、機密操作を呼び出すことができます。
- 匿名のクローラートラフィックに対して無力であるよりも、特定のIDアイデンティティに問題を裏返します。
- 悪い行動を持つDIDがブラックリストにできるエージェント間で評判システムを確立します。ただし、良いレコードを持つ人はより高い特権を楽しむことができます。

特に、開発者にとって障壁を下げるために、ANPコミュニティはまた提供します **公的なテスト DID**. . . このIDは `did:wba:agent-did.com:test:public`, その DID 文書と公開されている秘密鍵で、WebAgent の ID 認証プロセスをテストし、経験するために利用できます。 誰でも、このペアの公開鍵と秘密鍵を使用して、アイデンティティ認証を必要とするWebAgentsを呼び出すことができます(テスト目的のためにのみ、実際の取引や機密操作のために)。

実際の開発では、このパブリックテストDIDを導入することでWebAgentインターフェイスコールプロセスを迅速に検証することができます。 とりあえず `use_did_test_public` ディレクトリ [ANP の例コードリポジトリ](https://github.com/agent-network-protocol/anp-examples/tree/main/use_did_test_public) DID ドキュメント (DID ドキュメント) を提供します。`did.json`) および秘密鍵ファイル (`key-1_private.pem`)このテストDIDのデモと共に、使い方に関するデモをします。 次のセクションのコード例では、このテスト ID を利用して WebAgent インターフェイスを呼び出す方法も表示されます。

# ANP WebAgent へのアクセスのためのツール

ANP WebAgent と ANP Explorer を組み合わせて、次の操作を行うツールを開発しました。 https://service.agent-network-protocol.com/anp-explorer/.

![ANPエクスプローラ](../../blogs/images/anp-explorer.png)

それに2つの主要な機能があります:
- 自然言語によるやり取りが可能な、個人AIアシスタントとして機能します。 アシスタントは、WebAgentの記述文書を使用して、WebAgentのインターフェイスと結果を返すようにします。
- エージェントの説明文書を調べるツールを提供します。 エージェントの説明文書のURLを入力すると、他のリンクされたドキュメントと一緒にドキュメントをフェッチします。

このツールは、ANP パブリックテスト DID を使用します。`did:wba:agent-did.com:test:public`) WebAgent へのアクセス

## コード例: ANPプロトコルと統合する方法

WebAgentの検出、説明、認証メカニズムを理解した後、見てみましょう **実用的なコード例** 簡単なコードでWebAgentにアクセスするためにAIエージェントを有効にする方法の実証。 コードはオープンソースです。 [sp-examples の](https://github.com/agent-network-protocol/anp-examples). . . 上記ANP Explorerのコードです。

グッドニュースは、このプロセスが非常に簡単です。コミュニティは次のように述べています。*必要なのは、プロンプトとHTTP関数です。*「WebAgent と通信する」

プロンプト、コードを最初に見てみましょう https://github.com/agent-network-protocol/anp-examples/blob/main/anp_examples/simple_example.py:

```plaintext
1. You will receive a starting URL ({{initial_url}}), which is a description file of an agent.
2. You need to understand the structure, functionality, and API usage of this agent description file.
3. You should continuously discover and access new URLs and API endpoints like a web crawler.
4. You can use the anp_tool to retrieve the content of any URL.
5. This tool can handle responses in various formats, including:
   - JSON format: which will be directly parsed into a JSON object.
   - YAML format: which will return text content, and you need to analyze its structure.
   - Other text formats: which will return the raw text content.
6. Read each document to find information or API endpoints relevant to the task.
7. You need to determine the crawling path on your own, without waiting for user instructions.
8. Note: You can crawl up to 10 URLs, and must stop crawling after exceeding this limit.
......
```

この説明では、アンプラーのように動作するAIモデルを継続的に使用しています_エージェントの文書やインターフェイスを取得するツール, 必要な情報を取得するまで、このプロセスを繰り返す.

次に、HTTP 関数セクションです。 とりあえず `anp_tool.py` asynchronousメソッドを定義する `execute(...)`実際のHTTPリクエストを実行し、ID認証ロジックを処理する責任があります。

特定のコードについては、以下を参照してください。 https://github.com/agent-network-protocol/anp-examples/blob/main/anp_examples/anp_tool.py

ご覧のとおり、助けを借りて `ANPTool`つまり、AIエージェントとWebAgentの通信プロセスは、通常のHTTPコールと同じくらい簡単です。 大規模なモデルに基づくエージェントは、ツールリストにANP機能を使用してそのようなツールを追加し、それを使用する方法についてのモデルをプロンプトで、クロスエージェント操作を自律的に実行することができます。

例えば、ANP機能を持つ対話エージェントは、「明日上海のホテルを予約するのに役立つ」というユーザーから尋ねたとき、次のようにすることができます。まず、ANPToolを使用してホテルの予約代理店を検索し、説明とインターフェイスを入手し、予約プロセスを完了し、結果をユーザーに返すことができます。 これらは、WebAgent が提供した標準化された自己記述的なインターフェイスと ANP プロトコルの単純性のおかげです。

## AIアクセス専用データネットワークの構築

WebAgent の立ち上げに伴い、将来のインターネットの新しい形: データサービスネットワークが **人工知能だけにUIレスでオープン**. . . このネットワークの構成は、この記事で紹介した3つの重要な要素に基づいています。

- **エージェントディスカバリー**:標準の検出プロトコルを通して `.well-known` エントリー、AIはマニュアルディレクトリの必要なしにインターネット上でエージェントサービスを自動インデックス化できます。
- **エージェントの説明**: 各WebAgentには独自の機能説明とインターフェース仕様が含まれており、AIはサービスを呼び出す方法を自動的に理解し、高度に自己記述的なネットワークを形成することを可能にします。
- **アイデンティティ認証**: 分散型アイデンティティ(DID)機構により、安全な信頼できるネットワークの相互作用を確保し、クロスプラットフォームの権限管理をサポートすることで、健全なネットワーク運用を実現します。

この「AIデータネットワーク」には、以下のような機能があります。

- **AI、UIレスのために設計されている**: ネットワーク内のサービスは、ページやグラフィカルなインターフェイスを直接人に直接提供しなくなります。すべての相互作用はエージェント間で発生します。 従来のヒューマン・マシン・インターフェースをなくし、システム複雑性を低減し、ネットワーク・サービスがデータを完全に集中できるため、AIの効率的なデータ交換環境を実現します。
- **半構造データ**: WebAgent が提供したデータは、主に、AI エージェントによる迅速な解析と処理を促進し、JSON、YAML などの構造化された形式(JSON、YAML)で構成されています。また、パーソナライズされた記述情報を扱うために、ローカルに自然言語表現を使用しており、エージェントはサービスコンテンツをよりよく理解したり、パーソナライズされた機能を発現したりすることができます。
- **自己記述能力**: WebAgent は、提供されているサービス、インターフェイス定義、およびメソッドを呼び出している標準化された説明ファイルが付属しています。 サービスの発見時、AIエージェントは、人間の介入や追加のインタフェース文書なしで、サービスの特定の機能と相互作用方法を自動的に理解することができます。
- **安心・安全**: WebAgent は、自動 AI 訪問者を狙っていることを考えると、オープンインターフェイスは悪意のある虐待や過度のコールのリスクに直面している(大型モデル企業のランパント Web データクローリングの最近の批判など)。 そのため、WebAgentは、分散型アイデンティティ(DID)に基づいて、アイデンティティ検証と権限管理メカニズムを装備し、データの誤用を防ぎ、インターフェイスセキュリティを確保します。 識別情報やアクセスの承認を追跡することで、信頼できるエージェントネットワーク環境が確立されます。

今後は、様々な産業のデータやサービスがWebAgentsの形でAIに開く可能性があることが想像できます。天気、ニュース、ナレッジベース、取引プラットフォーム、商人... 人工知能は、ネットワークインターフェースを介してアプリやウェブページで現在達成しているタスクを直接補完する「ユーザー」の第一次となる。 人工知能と連携し、AIがこれらのWebAgentsを呼びかけ、複雑な目標を達成することができます。
