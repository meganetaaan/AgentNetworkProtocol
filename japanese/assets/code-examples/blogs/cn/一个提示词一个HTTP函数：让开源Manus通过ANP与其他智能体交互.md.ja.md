# blogs/cn/一个提示词一个HTTP函数：让开源Manus通过ANP与其他智能体交互.md のコード例・図ラベルの日本語補足

原文: [blogs/cn/一个提示词一个HTTP函数：让开源Manus通过ANP与其他智能体交互.md](../../../../../blogs/cn/一个提示词一个HTTP函数：让开源Manus通过ANP与其他智能体交互.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:65-71/line:3:column:29

原文:

````text
s description document, you can crawl the data according to the data link URL in the agent
````

日本語補足（invalid-fragment-covered-by-full-block）:

````text
これは引用符抽出の誤りによる断片です。同じコードブロックの指示文全文を、後掲の全文補足訳で確認してください。
````

## fence:77-99/line:1

原文:

````text

    Execute HTTP requests to interact with other agents
    
    Args:
        url (str): URL of the agent description file or API endpoint
        method (str, optional): HTTP method, default is "GET"
        headers (Dict[str, str], optional): HTTP request headers
        params (Dict[str, Any], optional): URL query parameters
        body (Dict[str, Any], optional): Request body for POST/PUT requests
        
    Returns:
        Dict[str, Any]: Response content
    
````

日本語補足（agent-reviewed）:

````text

    HTTP要求を実行して他のエージェントとやり取りします。
    
    引数：
        url (str)：エージェント記述ファイルまたはAPIエンドポイントのURL
        method (str, optional)：HTTPメソッド。既定値は"GET"
        headers (Dict[str, str], optional)：HTTP要求ヘッダー
        params (Dict[str, Any], optional)：URLのクエリパラメーター
        body (Dict[str, Any], optional)：POST/PUT要求の本文
        
    戻り値：
        Dict[str, Any]：応答内容
    
````

## fence:77-99/line:9

原文:

````text

    Execute HTTP requests to interact with other agents
    
    Args:
        url (str): URL of the agent description file or API endpoint
        method (str, optional): HTTP method, default is "GET"
        headers (Dict[str, str], optional): HTTP request headers
        params (Dict[str, Any], optional): URL query parameters
        body (Dict[str, Any], optional): Request body for POST/PUT requests
        
    Returns:
        Dict[str, Any]: Response content
    
````

日本語補足（agent-reviewed）:

````text

    HTTP要求を実行して他のエージェントとやり取りします。
    
    引数：
        url (str)：エージェント記述ファイルまたはAPIエンドポイントのURL
        method (str, optional)：HTTPメソッド。既定値は"GET"
        headers (Dict[str, str], optional)：HTTP要求ヘッダー
        params (Dict[str, Any], optional)：URLのクエリパラメーター
        body (Dict[str, Any], optional)：POST/PUT要求の本文
        
    戻り値：
        Dict[str, Any]：応答内容
    
````

## fence:65-71

原文:

````text
Use Agent Network Protocol (ANP) to interact with other agents.
1. For the first time, please enter the URL: https://agent-search.ai/ad.json, which is an agent search service that can use the interfaces inside to query agents that can provide hotels, tickets, and attractions.
2. After receiving the agent's description document, you can crawl the data according to the data link URL in the agent's description document.
3. During the process, you can call the API to complete the service until you think the task is completed.
4. Note that any URL obtained using ANPTool must be called using ANPTool, do not call it directly yourself.
````

日本語補足（agent-reviewed）:

````text
Agent Network Protocol（ANP）を使って他のエージェントとやり取りしてください。
1. 初回はURL https://agent-search.ai/ad.json を入力してください。これはエージェント検索サービスで、含まれるインターフェースを使って、ホテル、チケット、観光スポットを提供できるエージェントを検索できます。
2. エージェント記述文書を受け取ったら、その文書にあるデータリンクURLに従ってデータをクロールできます。
3. 処理中は、タスクが完了したと判断するまでAPIを呼び出してサービスを完了できます。
4. ANPToolを使って取得したURLは、必ずANPToolを使って呼び出してください。自分で直接呼び出してはなりません。
````
