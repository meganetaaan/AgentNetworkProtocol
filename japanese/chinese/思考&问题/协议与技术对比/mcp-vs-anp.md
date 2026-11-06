<!-- translation-review: full; scope: entire original source; method: manual-source-comparison -->
> 日本語参考訳（原文全文照合・校閲済み）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [chinese/思考&问题/协议与技术对比/mcp-vs-anp.md](../../../../chinese/思考&问题/协议与技术对比/mcp-vs-anp.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

最大の違いは世界観にある。

# 概念の中心は model

ANP は Agent を中心にしている点が異なる。
MCP はモデルが文脈情報を取得できない問題を補い、ANP はエージェント間の通信を解決する。

MCP が発展し、エージェント間の通信プロトコルになる可能性はある。

MCP は下位層ではなく、アプリケーション層のプロトコルだ。プロトコルを階層化すべきである。

設計原則から見ると host が絶対的な中心で、サーバーは特定分野の資源や道具の提供者である。

モデル企業には、モデル中心で現時点から実用化できる MCP の方が適する。

相互接続を目指す点は同じだが、私たちは分散した相互運用性を、MCP はモデル中心の相互運用性を目指す。

現在は MCP の方が実用化しやすい。

私たちはブラウザー上の認証を行わない。将来のエージェント網ではその場面はなく、DID から能力やインターフェイスを含む記述を得られる。それが新時代の Web サイトである。

----------------------再学習--------------------------------

# プロトコルの定義

Model Context Protocol（MCP）は、LLM アプリケーションを**外部データ源やツールへ滑らかにつなぐ**オープンなプロトコルである。AI 駆動の IDE、拡張チャット画面、独自の AI ワークフローなどで、**必要な文脈へ LLM を接続する**標準的な方法を提供する。

――本質的には LLM に文脈を渡し、インターネット全体を LLM の文脈として見るものだ。

MCP の役割：

- 言語モデルと文脈情報を共有する。
- AI システムへツールや機能を公開する。
- 組み合わせ可能な統合やワークフローを作る。

## 認証・認可

相手は認証・認可も交渉過程にしたいと考えている。――私たちの方式を選択肢として提示する。

クライアントとサーバーは、独自の認証・認可方針を交渉できる。

初期化時の能力交渉に、認証・認可方式の交渉を含められる。

初期化が最初のメッセージで、そこで認証・認可の方式を決める。

---------------------------------end--------------------------------

# サーバーの機能

## プロンプト

サーバーはクライアントへプロンプトを送れる。利用場面はまだよく分からない。

プロンプトと関連内容を送って実行させられる。モデルの文脈を補うという MCP の目的に合っており、厳密な意味のエージェント間通信とは異なる。

## リソース

MCP は、サーバーがクライアントへリソースを公開する標準的な方法を提供する。ファイル、データベーススキーマ、アプリケーション固有の情報など、モデルの文脈となるデータを共有する。各リソースは URI で一意に識別する。

## ツール

# プロトコルの形式

jsonrpc 2.0 形式を使っている。`"method": "resources/list"` が HTTP の URL パスに似ていて興味深い。

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "resources/list",
  "params": {
    "cursor": "optional-cursor-value"
  }
}
```

# メタプロトコル交渉

メタプロトコル交渉も支援する。サーバーが宣言し、クライアントがサンプリングを行う。MCP のメタプロトコルは宣言が主で、ゼロからの交渉は補助的であり、人の関与が必要になる。

サーバーとクライアントの能力交渉を支援する：https://spec.modelcontextprotocol.io/specification/architecture/#capability-negotiation
全体がメタプロトコルの能力に似ているので、よく調べること。

- Servers declare capabilities like resource subscriptions, tool support, and prompt templates  
  サーバーはリソース購読、ツール、プロンプトテンプレートなどの能力を宣言する。
- Clients declare capabilities like sampling support and notification handling  
  クライアントはサンプリングや通知処理などの能力を宣言する。
- Both parties must respect declared capabilities throughout the session  
  双方はセッション中、宣言した能力に従わなければならない。
- Additional capabilities can be negotiated through extensions to the protocol  
  拡張によって追加の能力を交渉できる。

Each capability unlocks specific protocol features for use during the session. For example:  
各能力によってセッション中に使える機能が有効になる。例えば：

- Implemented server features must be advertised in the server’s capabilities  
  実装した機能はサーバーの能力として告知しなければならない。
- Emitting resource subscription notifications requires the server to declare subscription support  
  リソース購読通知を送るには、購読対応を宣言する必要がある。
- Tool invocation requires the server to declare tool capabilities  
  ツール呼出には、サーバーによるツール能力の宣言が必要である。
- Sampling requires the client to declare support in its capabilities  
  サンプリングには、クライアントによる対応の宣言が必要である。
- This capability negotiation ensures clients and servers have a clear understanding of supported functionality while maintaining protocol extensibility.  
  この交渉により、拡張性を維持しながら、双方が対応機能を明確に理解できる。

共通プロトコルが相互運用性を実現する。

# 設計原則

全体の原則は、サービスを小さな単位にし、host（クライアントや AI 助手の実行環境）がワークフローを構成することである。

Design Principles：設計原則  
MCP is built on several key design principles that inform its architecture and implementation:  
MCP のアーキテクチャと実装は、次の重要な原則に基づく。

- Servers should be extremely easy to build：サーバーは極めて簡単に作れるべきである。
  - Host applications handle complex orchestration responsibilities：host が複雑な構成と調整を担う。
  - Servers focus on specific, well-defined capabilities：サーバーは特定の明確な能力に集中する。
  - Simple interfaces minimize implementation overhead：単純なインターフェイスで実装負荷を最小化する。
  - Clear separation enables maintainable code：明確な分離によって保守可能なコードにする。
- Servers should be highly composable：サーバーは高度に組み合わせ可能であるべきである。
  - Each server provides focused functionality in isolation：各サーバーは独立した限定的機能を提供する。
  - Multiple servers can be combined seamlessly：複数を滑らかに組み合わせられる。
  - Shared protocol enables interoperability：共通プロトコルが相互運用性を実現する。
  - Modular design supports extensibility：モジュール設計が拡張性を支える。
- Servers should not be able to read the whole conversation, nor “see into” other servers：サーバーは会話全体を読めたり、ほかのサーバーの内部を見られたりするべきではない。
  - Servers receive only necessary contextual information：必要な文脈だけを受け取る。
  - Full conversation history stays with the host：全履歴は host に保持する。
  - Each server connection maintains isolation：接続ごとに分離を保つ。
  - Cross-server interactions are controlled by the host：サーバー間のやり取りは host が管理する。
  - Host process enforces security boundaries：host プロセスがセキュリティ境界を強制する。
- Features can be added to servers and clients progressively：双方へ機能を段階的に追加できる。
  - Core protocol provides minimal required functionality：中核は必要最小限の機能を提供する。
  - Additional capabilities can be negotiated as needed：必要な追加能力は交渉できる。
  - Servers and clients evolve independently：双方は独立して発展する。
  - Protocol designed for future extensibility：将来の拡張を見込む。
  - Backwards compatibility is maintained：後方互換性を保つ。

# メッセージの種類

――まとめ：JSON-RPC 2.0 は簡単に使え、アプリケーション層プロトコルの基盤にできる。

MCP defines three core message types based on JSON-RPC 2.0:  
MCP は JSON-RPC 2.0 に基づく 3 種類を定義する。

- Requests: Bidirectional messages with method and parameters expecting a response  
  要求：メソッドと引数を持ち、応答を期待する双方向のメッセージ。
- Responses: Successful results or errors matching specific request IDs  
  応答：特定の要求 ID に対応する成功結果またはエラー。
- Notifications: One-way messages requiring no response  
  通知：応答を必要としない一方向のメッセージ。

Each message type follows the JSON-RPC 2.0 specification for structure and delivery semantics.  
各種類の構造と配送の意味は JSON-RPC 2.0 に従う。

# セキュリティの問題

# 下位層の接続

# auth の議論

The MCP ecosystem should be open by default—that is, we want to allow custom clients and servers to interoperate with the ones we build, even if we have no knowledge of those custom implementations.  
MCP の生態系は既定で開かれているべきだ。独自実装を知らなくても、独自のクライアントやサーバーと私たちの実装が相互運用できるようにしたい。

Relatedly, we would prefer to avoid a central trust authority. We want clients and servers to be able to determine whether they trust each other based on user consent, rather than delegating to any kind of registry of trusted implementations.  
中央の信頼機関も避けたい。信頼された実装の登録簿へ委ねず、利用者の同意に基づいて相互の信頼を決められるようにしたい。

私の DID 方式：

現在の議論は OAuth ベースで、動作し、標準化も進んでおり既存基盤を再利用できるが、全体の手順はやや複雑だ。
W3C DID（Decentralized Identifiers）に基づく新方式を提案したい。エージェント間の認証と暗号化通信を解くため長く研究してきたもので、MCP のクライアントとサーバーの認証にも使えるかもしれない。

将来の MCP などの AI 通信は開かれ、中央の信頼機関を避けるべきだという点に強く賛成する。DID は中央認証機関に依存せず、利用者が自分の身元情報を完全に制御することを目指しており、この点を得意とする。

私たちは all（alliance）という DID メソッドを設計した。Alice と Bob の通信を例に、生成と認証を簡単に示す。

- Alice と Bob がそれぞれ DID を生成する。
  - 非対称暗号の秘密鍵と公開鍵を生成し、秘密鍵は自分で保管する。
  - 公開鍵の hash から DID を作り、自分の識別子とする。例：did:all:14qQqsnEPZy2wcpRuLy2xeR737ptkE2Www@example.com。example.com は DID 文書サーバーである。
  - DID と公開鍵を文書にまとめ、秘密鍵で署名し、example.com に置く。第三者は DID から文書を取得し、公開鍵を得られる。
- 接続時に次の認証を行う。
  - Alice は要求に DID を載せ、秘密鍵でメッセージへ署名する。
  - Bob はその DID から example.com の文書を取得し、公開鍵で DID（公開鍵の hash から生成）と署名を検証する。正しければ Alice の要求だと分かる。
  - Bob も応答に DID と秘密鍵による署名を載せ、Alice が同様に検証する。
  - 相互認証が終わったら暗号化通信へ進む。
- 両者が非対称鍵のペアを持つため、ECDHE（Elliptic Curve Diffie-Hellman Ephemeral）で暗号鍵を合意し、エンドツーエンドで暗号化できる。

**簡単な例**を 2 つ挙げる。

- ファイルシステム：
  - MCP クライアントが、利用者の MCP サーバーのファイルへアクセスする。
  - サーバーは利用者の DID と対応するファイルを記録する。
  - 上記の手順でクライアントの DID を認証し、成功すればファイルかアクセス token を返す。
  - クライアントはサーバーの DID またはドメイン名で相手を検証できる。
- ピザの予約：
  - 利用者が MCP クライアントから店の MCP サーバーへ予約する。DID と通信 URL は信頼できる経路で入手済みとする。
  - 接続時にサーバーの DID を検証し、意図した店か確認する。
  - サーバーもクライアントの DID を認証し、後続サービスのため注文情報を記録する。

DID にも、新しい W3C 標準で普及が十分でなく、基盤が未整備という欠点はある。それでもエージェント間の認証に最も適した方式だと考えるので、ぜひ真剣に検討してほしい。

関連資料：

- W3C DID 仕様：（https://www.w3.org/TR/did-core/）[https://www.w3.org/TR/did-core/]
- DID all メソッド設計仕様：（https://github.com/agent-network-protocol/AgentNetworkProtocol/blob/main/02-did%3Aall%20Method%20Design%20Specification.md）[https://github.com/agent-network-protocol/AgentNetworkProtocol/blob/main/02-did%3Aall%20Method%20Design%20Specification.md]
- AgentNetworkProtocol（私たちが設計したエージェント間の通信プロトコル）：（https://github.com/agent-network-protocol/AgentNetworkProtocol）[https://github.com/agent-network-protocol/AgentNetworkProtocol]
- AgentConnect（公開実装。DID all、エンドツーエンド暗号化、メタプロトコル交渉に対応）：（https://github.com/agent-network-protocol/AgentConnect）[https://github.com/agent-network-protocol/AgentConnect]

まず MCP の認証のユースケースを明確にしよう。2 種類あると考える。

- クライアントが、MCP サーバーにある利用者の資源を使う。例えば GitHub のコードを操作する場合、サーバーが利用者を認証し、oauth server を提供する必要がある。
-

# コメント

Anthropic が新たに公開した MCP について簡単に述べる。私は仕事の大半で通信プロトコルを扱い、今もエージェント通信の公開プロジェクトを開発している。その立場からの見方だ。

1. 結論として「MCP」は短期的には過大評価、長期的には過小評価される典型的な技術だ。ここでいう MCP はモデルやエージェントがプロトコルで外と通信する技術を指す。最終標準になるかは分からないが、相互通信してネットワークになるための標準は将来必ずある。
2. 各者に従ってもらうのは遅い過程なので、短期にはメディアの言う革命は起きにくい。技術より商売の問題も多く、OpenAI や Apple が採用するかには各社の事情がある。
3. 長期的には方向は正しい。Computer Use は AI に人の操作をまねさせる移行期の方式で、AI が得意な方法は MCP の方だ。こうした技術が成熟し、エージェントが自らネットワークを作り、通信方式を交渉し、処理コードを書けば、今のインターネットとは大きく異なる網になる。
4. 公開コミュニティや標準化団体も探索している。私たちの AgentNetworkProtocol（https://github.com/agent-network-protocol/AgentNetworkProtocol）、ケンブリッジの研究班による Agora Protocol（メタプロトコル）、AutoGPT 関連班の agent-Protocol、W3C の WebAgents、IEEE の作業部会などである。MCP はアプリケーション層、私たちは認証と暗号化に重点を置き、将来はプロトコルスタックにする。探索は増えている。
5. 開放性が最も大切で、閉じた方式に将来はない。GitHub の認証議論で MCP の担当者は、開いた生態系、中央の信頼機関の回避、利用者の同意に基づく信頼を望んでいた。徹底しており、私たちも強く賛同する。
6. Model Context Protocol という名のとおり、解くのはモデルの文脈の問題だ。相手の位置付けは分からないが、全インターネットを文脈と見るなら筋は通る。私たちはエージェントの協働を重視する。
7. 能力交渉、発見、購読・通知を備え、構造は包括的だ。設計原則にも全体の考えが表れる。jsonrpc 2.0 以外にも伝送形式の候補は多く、長短を別に整理したい。場面に応じて AI に選ばせてもよいと思う。
8. 遠隔呼出に未対応なのは、認証の方針がまだ決まっていないためだろう。GitHub で話した限り OAuth 寄りだが、手順が不自然で最終案はない。私は DID を提案した。新しく基盤が未整備という欠点はあるが、今まで見た中ではエージェント間の認証に最適だ。よりよい案があれば教えてほしい。詳細：https://mp.weixin.qq.com/s/r6k1zSHnC8sKA819x8O91Q

## 著作権表示
Copyright (c) 2024 ANP Community  
本書は [MIT ライセンス](../../../../chinese/思考&问题/协议与技术对比/LICENSE) に基づき公開されています。自由に利用・変更できますが、この著作権表示を保持しなければなりません。
