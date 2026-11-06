<!-- translation-review: full; source=blogs/One-Prompt-One-HTTP-Function-Enabling-Open-Source-Manus-to-Interact-with-Other-Agents-via-ANP.md -->
> 日本語参考訳（原文全文照合・校閲済み）。実行例・公開テストDID・人数などは記事当時の説明です。コードとツール用プロンプトは原文のままです。
> 原文: [blogs/One-Prompt-One-HTTP-Function-Enabling-Open-Source-Manus-to-Interact-with-Other-Agents-via-ANP.md](../../blogs/One-Prompt-One-HTTP-Function-Enabling-Open-Source-Manus-to-Interact-with-Other-Agents-via-ANP.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# 一つのプロンプトと、一つのHTTP関数：オープンソースのManusを、ANPでほかのエージェントにつなぐ

今週、ANPオープンソース技術コミュニティのメンバーが、人気のある二つのManus系プロジェクト、owlとOpenManusに、ANPのサポートを追加しました。これにより、オープンソースのManusが、ANPでインターネットにアクセスできます。（開発者の貢献に、改めて感謝します。）

開発者コミュニティと、エージェント通信プロトコルの交流グループで、小規模に試し、今日、一般公開します。

統合の途中で、MCPとは異なる、ANPの強みが見えました。一つのプロンプトと、一つのHTTP関数だけで、任意のエージェントと通信し、協働できます。

要点は、次のとおりです。
- MCPに比べ、分散型の本人認証とP2P構造という、二つの特徴が、エージェント通信に適しています。
- 統合は単純です。anp_tool.pyという一つのファイル、つまり一つのプロンプトとHTTP関数があれば、任意の相手に接続し、通信できます。
- 単純さの理由は、簡潔なプロトコル設計です。二つのエージェントは完全に疎結合で、複雑な概念がなく、ステートレスな方式も使えます。
- 初めて一連の動作に成功したとき、少し驚きました。AI Nativeなプロトコルであり、エージェントは、接続の途中で、自分の誤りを直せます。
- AIは、開発だけでなく、ソフトウェアの動作や協働の方式も変えます。将来、複雑な論理があまり必要なくなり、エージェントによる既存ソフトウェアの置き換えが加速するかもしれません。

## ANPとは何か。MCPとの違い

ANPは、エージェント向けのオープンな通信プロトコルです。分散型の本人認証と、セマンティックWebによるデータ交換、協働を提供します。

MCPが、モデルをさまざまなツールやリソースにつなぐUSBなら、ANPは、エージェントの電子メールです。相手のIDさえ分かれば、自分のアカウントで、自らリクエストを送り、接続できます。

MCP：
<p align="center">
  <img src="../../blogs/images/mcp-usb.png" width="50%" alt="mcp-usb"/>
</p>

ANP：
<p align="center">
  <img src="../../blogs/images/anp-email.png" width="50%" alt="anp-email"/>
</p>

通信の用途に、より適した二つの特徴があります。

1. 分散型の本人認証

電子メールと同じように、相手のIDが分かればよく、相手のシステムやプラットフォームに、アカウントを登録する必要はありません。協働のコストが大きく下がります。

<p align="center">
  <img src="../../blogs/images/did-wba-auth.png" width="50%" alt="did-wba-auth"/>
</p>

2. P2P（Peer to Peer）のプロトコルの構造

任意のエージェントが、ほかのエージェントに、自ら接続できます。

<p align="center">
  <img src="../../blogs/images/agentic-web.png" width="50%" alt="agentic-web"/>
</p>

詳しい違いは、[MCPとANPの比較：エージェントには、どのような通信プロトコルが必要か](cn/MCP与ANP对比：智能体需要什么样的通信协议.md)を参照してください。

## ANPを統合したManusには、何ができるか

ほかのエージェントと、ANPでやり取りできます。例えば、ホテルの検索と予約のサービスがある場合、Manusは、そのADs（Agent Description）を得て、情報を調べたり、予約したりできます。

## オープンソースのManusに、ANPを統合する手順

ANPをツールとして統合します。owlでもOpenManusでも、anp_tool.pyモジュールを追加するだけです。

中心となるのは、プロンプトで使うツールの説明と、ANPリクエストを処理するHTTP関数です。

**ツールの説明：**

```plaintext
Use Agent Network Protocol (ANP) to interact with other agents.
1. For the first time, please enter the URL: https://agent-search.ai/ad.json, which is an agent search service that can use the interfaces inside to query agents that can provide hotels, tickets, and attractions.
2. After receiving the agent's description document, you can crawl the data according to the data link URL in the agent's description document.
3. During the process, you can call the API to complete the service until you think the task is completed.
4. Note that any URL obtained using ANPTool must be called using ANPTool, do not call it directly yourself.
```

この説明は、モデルに、エージェント記述文書のURLから始め、文書をダウンロードし、内容と自分のタスクに応じ、含まれるURLから、さらに文書やAPIを巡回取得するよう伝えます。途中でAPIも呼び出せます。タスクが完了するか、終了と判断するまで、公開情報を探索し続けます。

**HTTP関数：**

```python   
async def execute(
    self, 
    url: str, 
    method: str = "GET", 
    headers: Dict[str, str] = None, 
    params: Dict[str, Any] = None, 
    body: Dict[str, Any] = None
) -> Dict[str, Any]:
    """
    Execute HTTP requests to interact with other agents
    
    Args:
        url (str): URL of the agent description file or API endpoint
        method (str, optional): HTTP method, default is "GET"
        headers (Dict[str, str], optional): HTTP request headers
        params (Dict[str, Any], optional): URL query parameters
        body (Dict[str, Any], optional): Request body for POST/PUT requests
        
    Returns:
        Dict[str, Any]: Response content
    """
```

基本はHTTPリクエストを送るインターフェースです。違いは、送信時に、ANPの本人認証を使うことです。

<p align="center">
  <img src="../../blogs/images/anp-interaction-flow.png" width="75%" alt="anp-interaction-flow"/>
</p>

**エージェントのアイデンティティ：**

テスト用スクリプトでは、Manusのために、did:wba:agent-did.com:test:publicというDIDを生成し、文書と秘密鍵を、did_test_public_docフォルダーに保存しました。

誰でもANPを試せる公開テストDIDですが、商品の予約には使えません。すべてのプロダクトを試したい方は、ご連絡ください。

## MCPとの、統合の手順の違い

以上が、統合の全手順です。一度行えば、どの種類のエージェントともやり取りでき、変えるのは、利用者の意図と、記述文書のURLだけです。

ここに、設計の単純さがあります。
- エージェント同士が完全に疎結合で、相手の内部設計や実装を知る必要がありません。
- セマンティックWebで意味の記述を加え、AIが理解しやすくします。
- Linked-Dataでデータを網につなぎ、AIが巡回取得しやすくします。

ANPには、MCPのリソース、ツール、プロンプト、ファイル、samplingなどの概念はありません。中心にあるのは、公開する情報やインターフェースを含められる、エージェント記述文書です。

完全にネットワークのプロトコルなので、ローカルにはSDKのagent-connectパッケージだけを入れればよく、ほかのインストールは不要です。

また、公開の初日から、分散型の本人認証をサポートしています。相手のシステムに登録せず、自分のアカウントで通信できます。これは、MCPにはないものです。

比較のため、owlがMCPを呼ぶ手順は、こちらを参照してください：https://mp.weixin.qq.com/s/i6tbSc5fspkV9qxFotZEKw。

## AI Nativeなプロトコルと接続

初めて動作に成功したとき、少し驚きました。モデル自身に、HTTPリクエストの組み立てと、レスポンスの処理を任せていたためです。

最初のリクエストのフィールドに誤りがあり、相手から失敗が返ると、モデルが自動的に気付き、再度リクエストを送りました。二度目は成功しました。

驚いた点は、二つです。
- **AI Native**なプロトコルと接続は、現在のインターネットのものとは、根本的に異なります。
- AIは、**ソフトウェアの開発方式**だけでなく、**動作と協働の方式**も変えます。将来、複雑な論理があまり不要となり、既存ソフトウェアの置き換えが加速するかもしれません。

## ManusとANPを試す

### owl

GitHub：https://github.com/agent-network-protocol/owl_anp

実行方法は、README_anp_example.mdを参照してください。

### OpenManus

GitHub：https://github.com/agent-network-protocol/OpenManus-ANP

実行方法は、元のREADME_zh.mdを参照してください。

質問は、例えば「杭州のホテルを、2025年4月1日から1泊、予約してください」と入力できます。

## お問い合わせ

興味のある方は、ご連絡ください。

AgentNetworkProtocolは、エージェントインターネット時代のHTTPを目指しています。接続方法を定義し、数十億のエージェントに、開かれた、安全で効率的な協働ネットワークを作る構想です。

技術コミュニティには、現在25人の開発者が参加し、さらに募集しています。開発、プロダクト、運営などの立場を問わず、**オープンソースによって、接続と協働を定義**しましょう。

連絡先：
- GitHub：https://github.com/agent-network-protocol/AgentNetworkProtocol
- Discord: https://discord.gg/sFjBKTY7sB
- 公式サイト：https://agent-network-protocol.com/
- WeChat：flow10240

通信プロトコルの議論のグループにも、ぜひご参加ください。中国で最初のグループかもしれません。現在、200人を超える愛好家が議論しています。（参加は、WeChatで私を追加してください。）
