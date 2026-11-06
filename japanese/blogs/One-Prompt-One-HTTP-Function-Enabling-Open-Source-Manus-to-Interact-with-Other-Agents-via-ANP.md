> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [blogs/One-Prompt-One-HTTP-Function-Enabling-Open-Source-Manus-to-Interact-with-Other-Agents-via-ANP.md](../../blogs/One-Prompt-One-HTTP-Function-Enabling-Open-Source-Manus-to-Interact-with-Other-Agents-via-ANP.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# 1つのプロンプト、1つのHTTP機能:ANPを介して他のエージェントと相互にオープンソースのマナスを有効にする

今週、ANPオープンソース技術コミュニティのメンバーが、ANPプロトコルのサポートを最も人気のオープンソースのManusプロジェクト(owlとOpenManus)に追加することでタスクを完了し、オープンソースのManusがANP経由でインターネットにアクセスできるようにしました。 (コミュニティ開発者にご協力頂き、ありがとうございました!)

弊社では、開発者コミュニティやエージェント通信プロトコル交換グループ内で小規模なテストを実施し、本日は公式に公開しています。

統合プロセスでは、MCPと比較してANPの強みを観察しました。 たった1つのプロンプトと1つのHTTP機能で、エージェントは他のエージェントと通信してコラボレーションすることができます。

鍵ポイントは以下の通りです。
- ANPは、エージェント通信に適したMCPと比較して2つの主な機能を備えています。分散型アイデンティティ認証とP2Pプロトコルアーキテクチャ。
- 統合プロセスは簡単です。 エージェントはアンプのみが必要です_tools.py ファイルは、他のどのエージェントと接続して通信するための 1 つのプロンプト、1 つの HTTP 関数) です。
- 統合プロセスのシンプルさは、合理化されたプロトコル設計によるものです。 ANPプロトコルでは、2つのエージェントが完全にデカップリングされ、プロトコルは複雑な概念がなく、ステートレスプロトコルをサポートしています。
- ANPプロセスを初めて実行した後、ANPは完全にAIネイティブプロトコルであり、エージェントは接続プロセス中に独自のエラーを修正することができます。
- ソフトウエア開発モデルの変更だけでなく、ソフトウェア運用やコラボレーションモデルの変更もAIが行う。 将来的には、ソフトウェアははるかに複雑なロジックを必要としないかもしれません。 エージェントは、既存のソフトウェアの交換を加速します。

## ANPとは、MCPとどのように異なるのか?

ANPは、エージェント向けに設計されたオープンソースの通信プロトコルで、分散型のアイデンティティ認証とデータ交換と、セマンティックなウェブ技術に基づくコラボレーションを提供します。

MCP がモデルの USB インターフェイスの場合、さまざまなリソースやツールに接続するモデルをモデルにすることで、ANP はエージェントのメールです。 相手のIDをお持ちの方は、ご自身のアカウントで連絡を取れるので、積極的に接続を確立することができます。

MCP: 仕様
<p align="center">
  <img src="../../blogs/images/mcp-usb.png" width="50%" alt="mcp-usb"/>
</p>

コンテンツ:
<p align="center">
  <img src="../../blogs/images/anp-email.png" width="50%" alt="anp-email"/>
</p>

MCP と比較して、ANP はエージェント通信のシナリオに適した 2 つの主要な機能を備えています。

1. 分散型アイデンティティ認証

ANPプロトコルに基づく他のエージェントと通信するメールと同様に、相手のIDを把握し、他の人のシステムやプラットフォームでアカウントを登録する必要はありません。 これにより、2つのエージェント間のコラボレーションコストが大幅に簡素化されます。

<p align="center">
  <img src="../../blogs/images/did-wba-auth.png" width="50%" alt="did-wba-auth"/>
</p>

2. P2P(ピアツーピア)プロトコルアーキテクチャ

ANPプロトコルのアーキテクチャはP2Pであり、他のエージェントが別のエージェントと接続を積極的に確立することができます。

<p align="center">
  <img src="../../blogs/images/agentic-web.png" width="50%" alt="agentic-web"/>
</p>

>

注: ANPとMCPの詳細な違いについては、この記事を参照してください。 [MCPとANPの比較: どのような通信プロトコルが必要とするのか](cn/MCP与ANP对比：智能体需要什么样的通信协议.md)

## オープンソースのマナスは、ANPを統合した後に何をすることができますか?

ANPを統合した後、オープンソースのマナスはANPを通じて他のエージェントと相互作用することができます。 たとえば、ホテルのお問い合わせや予約サービスをご提供するホテル代理店があります。 マヌスがホテルのエージェントのAD(エージェントの説明)を取得した後、ANPを通じてホテルの代理店と相互作用してホテル情報やホテルの予約について問い合わせることができます。

## ANPをオープンソースのマナスに統合するプロセス

ANPはエージェントのツールとして、オープンソースマナスに統合できるだけでなく、owl や OpenManus であっても、単に anp を追加することで_Tool.py モジュール。

anp のコード_Tool.pyは、コアがツールの説明(プロンプトで使用)とHTTP関数であるので、非常に簡単です。(ANPリクエストを処理するために使用されます)

**ツールの説明は以下の通りです。**

```plaintext
Use Agent Network Protocol (ANP) to interact with other agents.
1. For the first time, please enter the URL: https://agent-search.ai/ad.json, which is an agent search service that can use the interfaces inside to query agents that can provide hotels, tickets, and attractions.
2. After receiving the agent's description document, you can crawl the data according to the data link URL in the agent's description document.
3. During the process, you can call the API to complete the service until you think the task is completed.
4. Note that any URL obtained using ANPTool must be called using ANPTool, do not call it directly yourself.
```

この記述の核心は、エージェント記述ドキュメントの URL から開始してドキュメントをダウンロードし、ドキュメント内の情報と独自のタスクに基づいて、ドキュメント内の URL を使用して新しいドキュメントまたは API をさらにクロールするようにモデルに指示することです。このプロセス中に、ドキュメント内の API を呼び出すことができます。このようにして、タスクが完了するか終了したとみなされるまで、エージェントから公開されている情報を継続的に検索します。

**HTTP 関数は次のとおりです:**

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
HTTP 機能の中核は HTTP リクエストを送信するためのインターフェイスであり、そのプロセス中に ANP プロトコルの ID 認証メカニズムを使用するというユニークな側面があります。

<p align="center">
  <img src="../../blogs/images/anp-interaction-flow.png" width="75%" alt="anp-interaction-flow"/>
</p>

**エージェント ID:**

テスト スクリプトでは、Manus の DID ID「did:wba:agent-did.com:test:public」を生成し、DID ドキュメントと秘密キーを「did_test_public_doc」フォルダーに保存しました。

これは公開テスト DID であり、誰でも ANP プロトコルを体験するために使用できますが、製品の予約には使用できません。全製品を体験したい場合は、お問い合わせください。

## MCPとの統合プロセスの違い

上記は、ANP プロトコルを統合するプロセス全体の概要を示しています。このプロセスは、あらゆるタイプのエージェントと対話するために 1 回だけ実行する必要があります。必要な変更は、ユーザーの意図とエージェント説明ドキュメントの URL のみです。

このシンプルさは、ANP プロトコル設計の特徴です。
- エージェントは相互に完全に分離されており、互いの内部設計や実装について知る必要はありません。
- セマンティック Web テクノロジーを使用してデータにセマンティックな説明を追加し、AI がデータをよりよく理解できるようにします。
- Linked Data テクノロジーはデータをネットワークに接続し、AI データのクローリングを容易にします。

ANP プロトコルには、MCP にあるリソース、ツール、プロンプト、ファイル、サンプリングなどの概念がありません。 ANP の中核となる概念は、エージェント説明文書です。これには、エージェントによって提供される情報とインターフェイスが含まれます。

ANP は完全にネットワーク プロトコルであるため、ローカルでは ANP SDK エージェント接続パッケージをインストールするだけで済み、他のインストールは必要ありません。

さらに、リリース初日から分散型 ID 認証をサポートし、2 人のエージェントが他のシステムにアカウントを登録することなく、代わりに自分のアカウントを使用して通信できるようになりました。これは MCP が提供していないものです。

比較のために、フクロウが MCP を呼び出すプロセスをここで参照できます: https://mp.weixin.qq.com/s/i6tbSc5fspkV9qxFotZEKw.

## AI ネイティブ プロトコルと接続

ANP プロセスが最初に正常に実行された後、私はいくぶん驚きました。エージェントの実装では、モデルが HTTP リクエストを組み立て、HTTP レスポンスを独自に処理できるため、興味深い点を発見しました。

モデルの最初の HTTP リクエストにフィールド エラーが含まれており、別のエージェントが失敗を返した場合、モデルは自動的にこのエラーを識別して HTTP リクエストを再発行し、2 番目のリクエストは成功しました。

これには次の 2 つの理由で私は驚きました。
- **AI ネイティブ** のプロトコルと接続は、現在インターネットで使用されているプロトコルや接続方法とは根本的に異なります。
- AI は、**ソフトウェア開発モデルを変更する**だけでなく、**ソフトウェアの運用およびコラボレーションモデル**も変更します。将来的には、エージェントが既存のソフトウェアの置き換えを加速するため、ソフトウェアにはそれほど複雑なロジックが必要なくなる可能性があります。

## オープンソース Manus + ANP の効果を体験してください

### フクロウ

GitHub アドレス: https://github.com/agent-network-protocol/owl_anp

操作方法については、README_anp_example.mdを参照してください。

### オープンマナス

GitHub アドレス: https://github.com/agent-network-protocol/OpenManus-ANP

操作方法については、オリジナルのReadmeファイル：README_zh.mdをご参照ください。

クエリを入力するときは、「2025 年 4 月 1 日に杭州のホテルを 1 泊予約するのを手伝ってください。」と入力できます。

## お問い合わせ

このトピックにご興味がございましたら、お問い合わせください。

AgentNetworkProtocol の目標は、エージェント インターネット時代の HTTP になることです。私たちのビジョンは、エージェント間の接続方法を定義し、数十億のエージェントのためのオープンで安全かつ効率的な共同ネットワークを構築することです。

ANP オープンソース テクノロジー コミュニティには現在 25 人の開発者がおり、さらに多くの開発者を募集しています。開発、製品、運用など、エージェントの通信プロトコルに興味がある場合は、**オープンソースの方法でエージェントの接続とコラボレーションを定義** することに参加してください。

連絡先情報:
- GitHub: ディレクトリ https://github.com/agent-network-protocol/AgentNetworkProtocol
- ディスコ: https://discord.gg/sFjBKTY7sB
- 公式サイト: https://agent-network-protocol.com/
- WeChat: flow10240

最後に、エージェント通信プロトコル ディスカッション グループに参加することを歓迎します。これはおそらく中国でエージェント通信プロトコルについて議論する最初のグループであり、現在 200 人以上のプロトコル愛好家が議論に参加しています。 (参加するにはWeChatに私を追加してください)






