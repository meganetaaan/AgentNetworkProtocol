# blogs/The-Birth-of-the-First-WebAgent-Designed-for-AI-Access.md のコード例・図ラベルの日本語補足

原文: [blogs/The-Birth-of-the-First-WebAgent-Designed-for-AI-Access.md](../../../../blogs/The-Birth-of-the-First-WebAgent-Designed-for-AI-Access.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:52-68//items/0/name

原文:

````text
天气智能体
````

日本語補足（agent-reviewed）:

````text
天気エージェント
````

## fence:85-139//name

原文:

````text
Weather Agent
````

日本語補足（agent-reviewed）:

````text
天気エージェント
````

## fence:85-139//description

原文:

````text
Weather Agent providing weather information query services for cities nationwide.
````

日本語補足（agent-reviewed）:

````text
全国の都市の天気情報を照会するサービスを提供する天気エージェント。
````

## fence:85-139//ad:interfaces/0/description

原文:

````text
OpenAPI YAML file providing weather query services.
````

日本語補足（agent-reviewed）:

````text
天気照会サービスを提供するOpenAPIのYAMLファイル。
````

## fence:85-139//ad:interfaces/1/description

原文:

````text
OpenAPI YAML file providing weather information booking services.
````

日本語補足（agent-reviewed）:

````text
天気情報の予約サービスを提供するOpenAPIのYAMLファイル。
````

## fence:85-139//ad:interfaces/2/description

原文:

````text
OpenAPI YAML file providing weather subscription status query services.
````

日本語補足（agent-reviewed）:

````text
天気情報の購読状況を照会するサービスを提供するOpenAPIのYAMLファイル。
````

## fence:85-139//ad:interfaces/3/description

原文:

````text
Interface for interacting with intelligent agents through natural language.
````

日本語補足（agent-reviewed）:

````text
自然言語を通じて知的エージェントとやり取りするインターフェース。
````

## fence:206-219

原文:

````text
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
````

日本語補足（agent-reviewed）:

````text
1. 開始URL（{{initial_url}}）が与えられます。これはエージェントの記述ファイルです。
2. このエージェント記述ファイルの構造、機能、APIの使い方を理解する必要があります。
3. Webクローラーのように、新しいURLやAPIエンドポイントを継続的に発見してアクセスしてください。
4. anp_toolを使って、任意のURLの内容を取得できます。
5. このツールは、次のようなさまざまな形式の応答を処理できます。
   - JSON形式：JSONオブジェクトとして直接解析されます。
   - YAML形式：テキスト内容が返されるので、その構造を分析する必要があります。
   - その他のテキスト形式：元のテキスト内容が返されます。
6. 各文書を読み、タスクに関係する情報やAPIエンドポイントを探してください。
7. 利用者の指示を待たず、自分でクロール経路を決定する必要があります。
8. 注：クロールできるURLは最大10件です。この上限を超えたら、クロールを終了しなければなりません。
……
````
