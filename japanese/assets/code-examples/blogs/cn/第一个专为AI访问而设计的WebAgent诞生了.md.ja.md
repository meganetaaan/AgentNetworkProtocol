# blogs/cn/第一个专为AI访问而设计的WebAgent诞生了.md のコード例・図ラベルの日本語補足

原文: [blogs/cn/第一个专为AI访问而设计的WebAgent诞生了.md](../../../../../blogs/cn/第一个专为AI访问而设计的WebAgent诞生了.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:54-70//items/0/name

原文:

````text
天气智能体
````

日本語補足（agent-reviewed）:

````text
天気エージェント
````

## fence:88-142//name

原文:

````text
天气智能体
````

日本語補足（agent-reviewed）:

````text
天気エージェント
````

## fence:88-142//description

原文:

````text
天气智能体，提供全国城市天气信息查询服务。
````

日本語補足（agent-reviewed）:

````text
全国の都市の天気情報を照会するサービスを提供する天気エージェント。
````

## fence:88-142//ad:interfaces/0/description

原文:

````text
提供天气查询服务的OpenAPI的YAML文件。
````

日本語補足（agent-reviewed）:

````text
天気照会サービスを提供するOpenAPIのYAMLファイル。
````

## fence:88-142//ad:interfaces/1/description

原文:

````text
提供天气信息预订服务的OpenAPI的YAML文件。
````

日本語補足（agent-reviewed）:

````text
天気情報の予約サービスを提供するOpenAPIのYAMLファイル。
````

## fence:88-142//ad:interfaces/2/description

原文:

````text
提供天气订阅状态查询服务的OpenAPI的YAML文件。
````

日本語補足（agent-reviewed）:

````text
天気情報の購読状況を照会するサービスを提供するOpenAPIのYAMLファイル。
````

## fence:88-142//ad:interfaces/3/description

原文:

````text
提供通过自然语言与智能代理交互的接口。
````

日本語補足（agent-reviewed）:

````text
自然言語を通じて知的エージェントとやり取りするインターフェース。
````

## fence:46-48

原文:

````text
https://<域名>/.well-known/agent-descriptions
````

日本語補足（technical-retained）:

````text
https://<域名>/.well-known/agent-descriptions
````

注: URLテンプレートを保持。<域名>は「ドメイン名」のプレースホルダー。

## fence:210-223

原文:

````text
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
````

日本語補足（agent-reviewed）:

````text
1. 開始URL（{{initial_url}}）が与えられます。これはエージェントの記述ファイルです。
2. このエージェント記述ファイルの構造、機能、APIの使い方を理解する必要があります。
3. Webクローラーのように、新しいURLやAPIエンドポイントを絶えず発見してアクセスする必要があります。
4. anp_toolを使って、任意のURLの内容を取得できます。
5. このツールは、次のような複数形式の応答を処理できます。
   - JSON形式：JSONオブジェクトとして直接解析されます。
   - YAML形式：テキスト内容が返されるので、その構造を分析する必要があります。
   - その他のテキスト形式：元のテキスト内容が返されます。
6. 各文書を読み、タスクに関係する情報やAPIエンドポイントを探してください。
7. 利用者の指示を待たず、自分でクロール経路を決定する必要があります。
8. 注：クロールできるURLは最大10件です。この上限を超えたら、クロールを終了しなければなりません。
……
````
