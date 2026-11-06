> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [blogs/cn/一个提示词一个HTTP函数：让开源Manus通过ANP与其他智能体交互.md](../../../blogs/cn/一个提示词一个HTTP函数：让开源Manus通过ANP与其他智能体交互.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# 1 つのプロンプト ワードと 1 つの HTTP 関数: オープンソース Manus が ANP を通じて他のエージェントと対話できるようにします

ANP オープンソース テクノロジー コミュニティの学生たちは今週、作品を完成させました。最も人気のある 2 つのオープン ソース Manus (owl および OpenManus) オープン ソース プロジェクトに基づいて、ANP プロトコルのサポートが追加され、オープン ソース Manus が ANP を介してインターネットにアクセスできるようになりました。 (**コミュニティ開発者の貢献に改めて感謝します! **)

まず、開発者コミュニティとエージェント通信プロトコル交換コミュニティで小規模にテストし、本日正式にリリースしました。

アクセスプロセス中に、MCP とは異なる ANP の威力がわかりました。 ** プロンプトワードと HTTP 関数が使用されている限り、エージェントは任意のエージェントと通信し、共同作業することができます。 **

主な内容は次のとおりです。
- MCP と比較して、ANP には、インテリジェント エージェント通信により適した 2 つの主要な機能があります: ** 分散型 ID 認証、P2P プロトコル アーキテクチャ **。
- アクセスプロセスは簡単です。エージェントがエージェントとの接続と通信を行うには、anp_tool.py ファイル (** プロンプト ワードと HTTP 関数 **) のみが必要です。
-  シンプルなアクセスプロセスは、プロトコル設計のシンプルさから生まれています。 ANP プロトコルでは、2 つのエージェントは完全に分離されており、プロトコルには複雑な概念がなく、ステートレス プロトコルもサポートしています。
-  初めて ANP プロセスを実行した後、私はまだ少しショックを受けました。ANP は完全に **AI ネイティブ プロトコル** であり、エージェント自体が接続プロセス中に独自のエラーを修復できます。
- **AI はソフトウェア開発モデルを変更しただけでなく、ソフトウェアのオペレーティング モデルとコラボレーション モデル ** も変更しました。将来的には、ソフトウェアにはそれほど複雑なロジックは必要なくなるかもしれません。インテリジェント エージェントは既存のソフトウェアを加速的に置き換えます。

## ANPとは何ですか、またMCPとの違いは何ですか

ANP はエージェント向けに設計されたオープンソースの通信プロトコルで、セマンティック Web テクノロジーに基づいた分散型 ID 認証、データ交換、コラボレーションをエージェントに提供します。

MCP がモデルの USB インターフェイスであり、モデルがさまざまなリソースやツールに接続できるようにする場合、ANP はエージェントの電子メールです。相手の ID があれば、自分のアカウントを使用して積極的に相手にリクエストを送信し、接続を確立できます。

MCP:
<p align="center">
  <img src="../../../blogs/images/mcp-usb.png" width="50%" alt="mcp-usb"/>
</p>

ＡＮＰ：
<p align="center">
  <img src="../../../blogs/images/anp-email.png" width="50%" alt="anp-email"/>
</p>

APPは、MCPよりもインテリジェントな通信シナリオに適している2つの主要な機能を持っています。

1. 分散型識別

ANPプロトコルと別のスマートボディ通信に基づいて、電子メールと同様に、他の人のIDを知っているだけでなく、他の人のシステムやプラットフォームのアカウント番号を登録する必要があります。 これは、2つのインテリジェントな機関間のコラボレーションのコストを大幅に削減します。

<p align="center">
  <img src="../../../blogs/images/did-wba-auth.png" width="50%" alt="did-wba-auth"/>
</p>

II. P2Pの合意構造(ピアツーピア、ポイントツーポイント)

AMPプロトコルは、P2Pとして構成され、別の1つに接続できる単一のインテリジェンスが利用できます。

<p align="center">
  <img src="../../../blogs/images/agentic-web.png" width="50%" alt="agentic-web"/>
</p>


コメント: AMPとMCPの違いは、この記事から見ることができるように詳細です。 [MCP 対 ANP:通信プロトコルがスマートに必要とするもの](MCP与ANP对比：智能体需要什么样的通信协议.md)

## 彼がANPに接続したときにマヌスは何ができますか?

オープンソースのマナスは、ANPを通じて他の知的機関と対話することができます。例えば、ホテルの問い合わせや予約を提供するホテルのインテリジェンスを持っている場合、マナスはAMPを介してホテルのインテリジェンスと相互作用することができます。ホテル情報、予約ホテルを尋ねます。

## AMP コードアクセスプロセスでオープンソースのManus

オープンソースのマナス、owl、OpenManusにアクセスするためのインテリジェントなツールとしてANPは、アンプのみを追加します。_Tool.py モジュールは、

サインイン_ツールのコードは、コアがツールの説明(ヒントで使用するため)であり、HTTP関数(AMPリクエストを処理するための)であるので、とても簡単です。

**ツールは、次の通り記述されます。**

```plaintext
Use Agent Network Protocol (ANP) to interact with other agents.
1. For the first time, please enter the URL: https://agent-search.ai/ad.json, which is an agent search service that can use the interfaces inside to query agents that can provide hotels, tickets, and attractions.
2. After receiving the agent's description document, you can crawl the data according to the data link URL in the agent's description document.
3. During the process, you can call the API to complete the service until you think the task is completed.
4. Note that any URL obtained using ANPTool must be called using ANPTool, do not call it directly yourself.
```

この説明のコアは、ドキュメント内のURLを記述するスマートボディから始まるモデルを伝えることです, 文書をダウンロードします, ドキュメント内のURLを使用して、ドキュメントの説明と独自のタスクの情報に基づいて、新しい文書やAPIにさらにクロール. 途中であなたは、ドキュメントでAPIを呼び出すことができます. これは、タスクが完了するまで公開されたインテリジェントな情報を検索するために使用されていますまたは決定.

**HTTP 関数は以下のようにします。**

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

HTTP 関数のコアは、インターフェイスを送信する HTTP リクエストで、ディスパッチプロセス中に AMP 認証メカニズムが使用される唯一の違いです。

<p align="center">
  <img src="../../../blogs/images/anp-interaction-flow.png" width="75%" alt="anp-interaction-flow"/>
</p>

**スマートなボディ同一性:**

テストスクリプトでは、Manus の DID アイデンティティを test'd:wba:agent-did.com:test:public' に作成しました。DD ファイルと秘密鍵はフォルダー 'did' に保存されます。_試験結果_パブリック_ドキュメントの

これは公開テスト DID であり、誰でも ANP プロトコルを体験するために使用できますが、製品の予約注文には使用できません。すべての製品をさらに体験したい場合は、お問い合わせください。

## アクセスプロセスとMCPの違い

上記は ANP プロトコルにアクセスするすべてのプロセスであり、任意のタイプのエージェントと対話するために一度アクセスするだけで済みます。変更する必要があるのは、ユーザーの意図とエージェント説明文書の URL だけです。

ANP プロトコル設計のシンプルさは次のとおりです。
- エージェントは互いに完全に切り離されており、互いの内部設計や実装を知る必要はありません。
- セマンティック Web テクノロジーを通じてデータにセマンティックな説明を追加し、AI がデータをより深く理解できるようにします
- Linked Data テクノロジーを使用してデータをデータ ネットワークに接続し、AI データ クローリングを促進します

ANP プロトコルには、MCP のリソース、ツール、プロンプト ワード、ファイル、サンプリングなどの概念がありません。 ANP の中核となる概念は、エージェント記述文書です。これには、エージェントによって外部に提供される情報とインターフェイスが含まれます。

ANP は完全にネットワーク プロトコルであるため、ANP SDK エージェント接続パッケージをローカルにインストールするだけで済み、他に何もインストールする必要はありません。

さらに、リリース初日に分散型 ID 認証をサポートしました。 2 人のエージェントが通信する場合、相手側のシステムにアカウントを申請する必要はありません。自分のアカウントを使用して相手と直接通信できます。これもMCPにはないものです。

フクロウが MCP を呼び出すプロセスは、ここで比較できます: https://mp.weixin.qq.com/s/i6tbSc5fspkV9qxFotZEKw。

## AI ネイティブ プロトコルと接続

ANP プロセスが初めて実行されたとき、私はまだ少しショックを受けました。エージェントを実装するときに、モデルに HTTP リクエストを独自に組み立てさせ、HTTP レスポンスを独自に処理させたので、興味深い点を発見しました。

モデルによって送信された最初の HTTP リクエストにフィールド エラーがあり、別のエージェントが失敗を返した場合、モデルは自動的にこのエラーを識別し、別の HTTP リクエストを開始します。 2 番目の HTTP リクエストは成功します。

それは次の 2 つの点で私に衝撃を与えました。
- **AI ネイティブ** のプロトコルと接続は、現在インターネットで使用されているプロトコルと接続方法とは異なります。
- AI は、** ソフトウェア開発モデル ** を変更するだけでなく、** ソフトウェアの動作モードとコラボレーション モデル ** も変更します。将来的には、ソフトウェアにはそれほど複雑なロジックは必要なくなるかもしれません。インテリジェント エージェントは既存のソフトウェアを加速的に置き換えます。

## オープンソースManus + ANPの効果を体験してください

### フクロウ

Github アドレス:https://github.com/agent-network-protocol/owl_anp

操作方法はREADME_anp_example.mdをご参照ください。

### オープンマナス

Github アドレス:https://github.com/agent-network-protocol/OpenManus-ANP

操作方法はオリジナルのReadmeファイル：README_zh.mdをご参照ください。

質問を入力するときは、「杭州のホテルを 2025 年 4 月 1 日にチェックインして 1 泊予約するのを手伝ってください。」と入力できます。

## お問い合わせ

このトピックにご興味がございましたら、お問い合わせください。

AgentNetworkProtocol の目標は、インテリジェント インターネット時代の HTTP になることです。私たちのビジョンは、エージェントの接続方法を定義し、数十億のエージェントのためのオープンで安全かつ効率的なコラボレーション ネットワークを構築することです。

AMP Open Source Technology Communityは、現在25の開発者がいます。**オープンソースの方法でスマートの接続とコラボレーションを定義する**。

連絡先情報:
- GitHub: ディレクトリhttps://github.com/agent-network-protocol/AgentNetworkProtocol
- ディスコ: https://discord.gg/sFjBKTY7sB
- オフィシャル:https://agent-network-protocol.com/
- WeChat: flow10240

最後に、インテリジェント エージェント通信プロトコル交換グループへの参加を歓迎します。これは、インテリジェント エージェントの通信プロトコルについて議論する中国初のグループとなる可能性があります。現在、200 名を超えるプロトコル愛好家が議論し、コミュニケーションを行っています。 (参加するにはWeChatに私を追加してください)















