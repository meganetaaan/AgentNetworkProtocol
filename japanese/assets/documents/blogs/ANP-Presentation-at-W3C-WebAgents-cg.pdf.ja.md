# ANP-Presentation-at-W3C-WebAgents-cg.pdf — 日本語対訳

> 歴史的な発表資料の対訳です。現在のANP仕様へ内容を更新していません。PDFの文字レイヤー／PPTXのスライドXMLと発表者ノートから抽出した全文を、ページ・スライドごとに手動翻訳しています。独立した二次校閲は未実施です。
> 図中文字の補足と未確認箇所は各単位に記載しています。コード画像の識別子や鍵は原画像のまま保持し、不確かなOCRを実行可能なコードに置き換えていません。原文自体で切れている内容は補完していません。

- 原本: [blogs/ANP-Presentation-at-W3C-WebAgents-cg.pdf](<../../../../blogs/ANP-Presentation-at-W3C-WebAgents-cg.pdf>)
- 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`
- 原本SHA-256: `7e9fac77b0f09a963fcd5feb736cc5a562982756b7b10eee7a9c47e6bcd27d92`
- ページ数: 24
- 翻訳方法: エージェントによる全文手動翻訳。モデルAPI呼び出しなし。
- 検証範囲: 全抽出本文・ノートと単位対応。PDF全75ページの概観と埋込画像を確認し、PPTX埋込画像15点の読める文章を補足。PPTXのネイティブ描画と独立した二次校閲は未実施。原画素で判読できない微小文字は残っています。

## ページ 1

Agent Network Protocol

エージェントの接続と協働を再定義する。

ANP Open Source Community
Gaowei Chang、James Waugh
2025-02
https://agent-network-protocol.com/

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Agent Network Protocol



     Redefining Agent Connectivity and Collaboration



          ANP Open Source Community
            Gaowei Chang, James Waugh



                        2025-02




                                                          https://agent-network-protocol.com/
````

</details>

## ページ 2

目次

この発表では、次の話題を扱います。
- ANP設計の基本的な前提
- ANPの認証方式
- ANPの身元検証の流れ
- ANPのエージェント記述方式
- エージェント記述を使ってAIがアクセス可能なデータネットワークを構築する方法
- デモ実演

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Outline




          This presentation will cover the following topics:

              • Core Assumptions of ANP Design

              • ANP Authentication Scheme

              • ANP Identity Verification Process

              • ANP Agent Description Scheme

              • How to Build an AI-Accessible Data Network Using Agent Descriptions

              • Demo Demonstration
````

</details>

## ページ 3

Agentic Web：エージェントがインターネットに与える影響

エージェントが既存のソフトウェアを置き換えます。
- パーソナルアシスタントが、人間に代わってインターネットにアクセスします。
- エージェントが、企業向けのソフトウェアサービスを置き換えます。
- パーソナルアシスタントが、エージェントに直接接続します。

パーソナルアシスタントもエージェントの一種です。

### 図中文字の補足訳

図中のAgentは「エージェント」、Agentic Webは「エージェントによるWeb」を指します。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Agentic Web：The Impact of Agents on the Internet




    Agents will replace existing software


      • The personal assistant will replace humans in

       accessing the internet.

      • Agents will replace software services for

       enterprises.

      • Personal assistants will directly connect to

       agents.





                             A personal assistant is also an agent
````

</details>

## ページ 4

Agentic Web：エージェントがインターネットに与える影響

エージェント同士を接続する必要があります。
- AIは、完全な文脈情報にアクセスできなければなりません。
- AIは、すべてのツールの機能にアクセスできるべきです。
- エージェント間の接続が占める割合は、より大きくなります。

現在のインターネットのデータサイロは、AIの潜在能力を十分に発揮する妨げとなっています。

### 図中文字の補足訳

図中のAgentは「エージェント」、Agentic Webは「エージェントによるWeb」を指します。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Agentic Web：The Impact of Agents on the Internet




    Agents must be interconnected


      • AI must have access to complete contextual

       information.

      • AI should be able to access all tool

       capabilities.

      • The connectivity between agents will have a

      higher proportion.





                            The current data silos on the internet hinder the full potential of AI.
````

</details>

## ページ 5

Agentic Web：エージェントがインターネットに与える影響

エージェントはプロトコルを通じて相互にやり取りします。
- AIがインターネットとやり取りするうえで、最も効率的な方法です。
- Computer Useは過渡的な形態です。
- 将来、標準化されたエージェント通信プロトコルが登場します。

プロトコルを通じて基礎となるデータを直接処理することが、AIとインターネットのやり取りの最善の方法です。

### 図中文字の補足訳

図中のAgentは「エージェント」、Agentic Webは「エージェントによるWeb」を指します。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Agentic Web：The Impact of Agents on the Internet




    Agents interact with each other through protocols


      • The most efficient way for AI to interact with

       the internet.

      • Computer Use is a transitional form.

      • In the future, standardized agent

      communication protocols will emerge.





                                 Directly processing underlying data through protocols is the best way for
                                         AI to interact with the internet.
````

</details>

## ページ 6

AgentNetworkProtocol（ANP）

目標：Agentic WebのHTTP/HTMLになること。

ビジョン：エージェント間の接続を定義し、数十億のエージェントのために、オープンで安全かつ効率的な協働ネットワークを構築すること。

### 図中文字の補足訳

図中のAgentは「エージェント」、Agentic Webは「エージェントによるWeb」、Agent Network Protocolは「エージェントネットワークプロトコル」を指します。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
AgentNetworkProtocol(ANP)



                Goal


    HTTP/HTML of the Agentic Web




                 Vision

      Define the connectivity between agents

         and build an open, secure, and

          efficient collaboration network for

                   billions of agents.
````

</details>

## ページ 7

AgentNetworkProtocol（ANP）

- アイデンティティ・暗号化通信層：W3C DIDを基盤に、優れた拡張性を持ち、数十億の利用者に対応できる分散型の身元認証方式を構築します。
- メタプロトコル層：メタプロトコルは、エージェント間の通信プロトコルを交渉するためのプロトコルです。エージェントネットワークが、自律的で、自ら交渉し、効率よく協働するネットワークへ発展するための鍵となります。
- アプリケーションプロトコル層：セマンティックWeb標準に基づき、エージェントが公開情報、利用可能な機能、対応インターフェースを記述できるようにします。他のエージェントは、この情報を使って発見し、やり取りできます。

本日は、アイデンティティ層とアプリケーション層を中心に説明します。

### 図中文字の補足訳

図中のラベル：Standard Protocol＝標準プロトコル、Consensus Protocol＝合意によるプロトコル、Personalized Protocol＝個別化したプロトコル、Agent Description Specification＝エージェント記述仕様、APP Protocol Specification＝アプリケーションプロトコル仕様、Application Protocol Layer＝アプリケーションプロトコル層、Protocol Negotiation＝プロトコル交渉、Protocol Debugging＝プロトコルのデバッグ、Protocol Testing＝プロトコルのテスト、Meta-Protocol Layer＝メタプロトコル層、Identity＝アイデンティティ、E2E＝エンドツーエンド、W3C DID、Identity and Encrypted Communication Layer＝アイデンティティ・暗号化通信層。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
AgentNetworkProtocol(ANP)



       • 🔒 Identity and Encrypted Communication Layer:
        Based on W3C DID, it builds a decentralized identity

          authentication solution with excellent scalability, capable

         of supporting billions of users.

       • 🌍 Meta-Protocol Layer: A meta-protocol is a protocol
          for negotiating communication protocols between agents.

             It is the key to the evolution of the agent network into an

        autonomous, self-negotiating, and highly efficient

          collaborative network.

       • 📡 Application Protocol Layer: Based on Semantic Web
          standards, it enables agents to describe their public

         information, available capabilities, and supported

          interfaces. Using this information, other agents can

         discover and interact with them.




                                 Today, we will focus on the identity layer and the application layer.
````

</details>

## ページ 8

エージェントのアイデンティティ設計の目標と原則

目標：すべてのエージェントが、互いの身元を認証できること。

原則：
- 分散性：アイデンティティを少数のベンダーだけが提供するべきではありません。
- 相互運用性：異なるシステムのアイデンティティを、互いに容易に認証できるべきです。
- 拡張性：大規模な利用者数に対応できるべきです。

W3C DID（Decentralized Identifier）仕様：https://www.w3.org/TR/did-core/

### 原資料のリンク先（属性も含めて保持）

- https://www.w3.org/TR/did-core/

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Goals and Principles of Agent Identity Design





       Goals                                                         Principles

           • All agents can authenticate each other's                                                                                • Decentralization: Identity should not be
            identity.                                                                 provided by a few vendors.

                                                                                • Interoperability: Identities between

                                                                            different systems should be easily

                                                                      authenticated with each other.

                                                                                • Scalability: The system should support

                                                                         large-scale user usage.





                                                                                 W3C DID(Decentralized Identifier)规范：https://www.w3.org/TR/did-core/
````

</details>

## ページ 9

W3C DID

DIDとは：
- 正式名称はDecentralized Identifier（分散型識別子）です。
- 利用者が制御する、自己主権型のデジタルアイデンティティの識別子であり、分散型システムに幅広く適用できます。
- 2022年に正式なW3C勧告となりました。

特徴：
- 分散型アイデンティティ：利用者が自分で管理し、中央集権的なサービス提供者への依存を避けます。
- 相互運用性：プラットフォームをまたいで利用でき、異なるシステム間の互換性を高めます。
- プライバシーとセキュリティ：利用者の身元データのプライバシーと安全性を確保し、悪用を防ぎます。
- 代表的な適用例：Bluesky。

W3C DID（Decentralized Identifier）仕様：https://www.w3.org/TR/did-core/

### 図中文字の補足訳

図中文字：EXAMPLE 1: A simple DID document＝例1：簡単なDID文書。コード内コメント「used to authenticate as did:...fghi」は「did:...fghiとして認証するために使用」。Scheme＝スキーム、DID Method＝DIDメソッド、DID Method-Specific Identifier＝DIDメソッド固有識別子、DID subject＝DID主体、DID URL、DID controller＝DID制御者、DID document＝DID文書、Verifiable Data Registry＝検証可能データレジストリ。矢印のrefers to＝参照する、contains＝含む、resolves to＝解決する、refers, and dereferences, to＝参照し参照解決する、recorded on＝記録される、controls＝制御する。コードのフィールド名、DID、公開鍵などは翻訳せず、抽出した原画像で保持します。

### 原資料のリンク先（属性も含めて保持）

- https://www.w3.org/TR/did-core/

### 保持した原コード・図の画像

![コード・図の原画像](<../source-code-images/w3c-page-009-image-01.png>)

![コード・図の原画像](<../source-code-images/w3c-page-009-image-02.png>)

![コード・図の原画像](<../source-code-images/w3c-page-009-image-03.png>)

### 確認範囲と制約

- コードの識別子・鍵・URLは原画像で保持。コード全文の手動転記は実施せず、OCR文字列を正式なコードとして使用していない。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
W3C DID




    What is DID:

      •  Full Name: Decentralized Identifier

      •  Definition: A user-controlled, self-sovereign digital
        identity identifier, widely applicable in decentralized
       systems.

      •  Officially became a W3C Recommendation in 2022.



     Features of DID:

        •  Decentralized Identity: Users manage their identity
          independently, avoiding reliance on centralized service
          providers.

        •  Interoperability: Supports cross-platform usage,
         enhancing compatibility between different systems.

        •  Privacy and Security: Ensures the privacy and security
          of user identity data, preventing abuse.

        •  Typical Application: Bluesky.
                                                                                 W3C DID(Decentralized Identifier)规范：https://www.w3.org/TR/did-core/
````

</details>

## ページ 10

DIDメソッド：Web-Based Agent

メソッド設計の原則：
- 完全な分散化を追求せず、分散性よりも実現可能性を優先します。
- 既存のWeb基盤を再利用し、実装コストを下げます。
- 既存のdid:webメソッドを基礎に、エージェント関連の機能を追加します。

did:wbaのDID定義：
`did:wba:example.com:user:alice`
→ `https://example.com/user/alice/did.json`

### 図中文字の補足訳

DID文書のコード画像には、`@context`、`id`、`verificationMethod`、`authentication`、`keyAgreement`、`service`などが示されています。コードの識別子、公開鍵、URL、値は翻訳・再生成せず、抽出した原画像のまま保持します。OCRの鍵文字列には誤認識があるため、OCR出力を正式なコード転記として使用していません。

### 保持した原コード・図の画像

![コード・図の原画像](<../source-code-images/w3c-page-010-image-01.png>)

### 確認範囲と制約

- コードの識別子・鍵・URLは原画像で保持。コード全文の手動転記は実施せず、OCR文字列を正式なコードとして使用していない。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
DID Method：Web-Based Agent





   Method Design Principles:

    • Do not pursue complete decentralization, feasibility is

       prioritized over decentralization features.

    •  Reuse existing web infrastructure to reduce implementation

       costs.

    •  Build upon the existing did:web method and add agent-related

       features.



   Did:wba DID Defines：
   did:wba:example.com:user:alice
   -> https://example.com/user/alice/did.json
````

</details>

## ページ 11

did:wbaのCURD操作（原文表記）

図中のドメインと識別子：
- `www.alice.com`、`did:wba:alice.com:user`、`https://alice.com/user/did.json`
- `www.bob.com`、`did:wba:bob.com:user`、`https://bob.com/user/did.json`

操作：
- Create（登録）：実装者が定義します。
- Read（解決）：HTTP GETメソッドでDID文書を取得します。
- Update（更新）：実装者が定義します。
- Deactivate（失効）：実装者が定義します。

図中のPrivate Keysは秘密鍵、DID DocumentはDID文書を指します。

メソッドの特徴：
- 既存のWeb基盤を十分に利用し、数十億の利用者に対応できます。
- エージェントのアイデンティティの分散性と相互運用性を実現します。
- 既存の電子メールサービスに似た方式です。

### 原資料のリンク先（属性も含めて保持）

- https://alice.com/user/did.json
- https://bob.com/user/did.json

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
CURD Operations of did:wba


               www.alice.com                                                                   www.bob.com



                                                             https://alice.com/user/did.json        did:wba:alice.com:user                                                                                                                                                                        Create       Update     Deactivate         Create       Update     Deactivate            Read




                                                     did:wba:bob.com:user          https://bob.com/user/did.json                                                                                                                      Read





                                                                                                                                                                                       Private Keys         DID Document            Private Keys         DID Document





     CURD Operations:                                                               Method Features:
            •  Create (Register): Defined by the implementer.                                                                                                      •  Fully utilizes existing web infrastructure, capable of
            •  Read (Parse): Use the HTTP GET method to retrieve                        serving billions of users.
              the DID document.                                                                                                      •  Achieves decentralization and interoperability of agent
            •  Update: Defined by the implementer.                                               identities.

            •  Deactivate (Revoke): Defined by the implementer.                            •  The method is similar to the existing Email service.
````

</details>

## ページ 12

DID:wbaメソッドによる身元検証の流れ

- AはAPIを呼び出してBのサービスを購読し、BはAのDIDを記録します。
- Aは最初のHTTPリクエストのHTTPヘッダーに、自分のDIDと署名を含めます。
- Bはリクエストを受信すると、ヘッダーからAのDIDと署名を取り出し、AのDIDを使ってAのDIDサーバーからDID文書を取得します。
- BはAのDID文書内の公開鍵を使い、Aの署名を検証します。
- 検証に成功すると、BはAの業務リクエストを処理し、業務データとアクセストークンを返します。
- 以後のリクエストでは、Aはアクセストークンを含め、Bはその有効性を検証してAの身元を確認します。

ヘッダー例（歴史的な方式を原文どおり保持）：
`Authorization: DID <did> Nonce <abc123> Timestamp <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature <base64url(signature)>`

図中の処理：秘密鍵を使った署名生成、DID文書内の公開鍵を使った署名検証、トークン生成、トークンを用いた後続リクエストの開始。

特徴：自動登録に対応し、やり取りが少ない単純な流れで、従来方式と同等の安全性を持ちます。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
DID:wba Method Identity Verification Process




                                                                                                                                                             Agent B
  • A calls the API to subscribe to B's service, and
  B records A's DID.

  • A includes its DID and signature in the HTTP
   header during the first HTTP request.

  • When B receives the HTTP request, it extracts
   A's DID and signature from the HTTP header,
   then retrieves A's DID document from A's DID
   server using A's DID.

                                                                    Authorization: DID <did> Nonce <abc123> Timestamp
  • After B obtains A's DID document, it uses the
                                                             <2024-12-05T12:34:56Z> VerificationMethod <key-1> Signature
   public key from A's DID document to verify                                                                  <base64url(signature)>                                                                       use the public key in the
   A's signature.                                                                                                                                DID document to verify
                                                                                                                                                                the signature
                                                                                                                                   generate
                                                          Use the private key to generate a signature
  • Once the verification is successful, B processes                                                                                      the token
   A's business request and returns the business
   data along with an access token.

  • In subsequent requests, A includes the access                                       use the token to
                                                                                                                        initiate subsequent
   token, and B verifies A's identity by validating                                             requests
   the access token.



                                                         Features: Supports automatic registration; simple process with minimal interaction;

                                                             equivalent security to traditional methods.
````

</details>

## ページ 13

未解決の課題

- すべてのエージェントとの通信に一つのIDを使うのではなく、利用者の権限をさらに細かく制御するにはどうすればよいでしょうか。
- エージェントのリクエストが、利用者本人によって承認されたかをどう判断すればよいでしょうか。機密性の高い一部の操作を、エージェントが自律的に開始するべきではありません。
- プラットフォームから付与された権限に依存せず、利用者が自分のアイデンティティを完全に所有するにはどうすればよいでしょうか。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Unresolved Issues




             • For user permissions, how can we implement more granular permission control,
             instead of using a single ID for communication with all agents?

             • How can we determine whether a request from an agent has been manually
            authorized by the user? Some sensitive actions should not be initiated
           autonomously by the agent.

             • How can we ensure that the user has full ownership of their identity, rather than
             relying on permissions granted by the platform?
````

</details>

## ページ 14

Agent Description Protocol（ADP）

エージェント記述プロトコルとは：
- Agent Description Documentを定義するために使います。
- エージェント記述文書は、Webサイトのホームページのように、エージェントへの入り口と見なせます。この入り口から、サイトのあらゆる側面にアクセスできます。

エージェント記述文書に含まれる情報：
- エージェントが属する実体のアイデンティティ、所有者、認証方法、外部インターフェース、その実体の公開情報。
- 例えば、エージェントがコーヒーショップを代表する場合、公開情報には所在地、営業時間、商品一覧、購入インターフェースなどが含まれます。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Agent Description Protocol(ADP)



                                         What information does an agent description  What is an Agent Description Protocol?
                                              document contain?

   • Used to define the Agent Description Document.                  • An agent description includes the identity of the entity

                                                                         to which the agent belongs, the owner, authentication
   • The agent description document can be seen as an
                                                              methods, external interfaces, and public information
     entry point for the agent, similar to the homepage of a
                                                                about the entity.
    website. Through this homepage, all aspects of the

    website can be accessed.                                             • For example, if the agent represents a coffee shop, the

                                                                     publicly available information would include the

                                                                          location, business hours, product list, purchase

                                                                            interface, and other related details..
````

</details>

## ページ 15

ADP設計の基本原則

- AIを対象とする設計：AIからのアクセスを容易にするため、AI向けに特化して設計します。
- 半構造化プロトコル：全体としてプログラム処理しやすい構造化設計としつつ、フィールドに自然言語を含めて個別の情報を伝えやすくします。
- 複数エージェント間の合意：データの意味に関するエージェントの理解の一貫性を高めます。

理論的には、十分な知能があればADPをすべて自然言語にすることも可能です。ただし、コストや現段階での誤りの確率など、多くの欠点があります。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Core Principles of ADP Design





                • AI-Oriented Design: Specifically designed for AI, making it easier for AI to access.

                • Semi-Structured Protocol: Overall, it is a structured design that facilitates
              programmatic processing; fields can contain natural language, making it easier to
             convey personalized information.

                • Multi-Agent Consensus: Enhances the consistency of agents' understanding of data
               semantics.





                                In theory, as long as the intelligence is strong enough, ADP could entirely
                              use natural language. However, this approach has many drawbacks, such
                                     as cost, the probability of errors at the current stage, and so on.
````

</details>

## ページ 16

ADPの設計方式

- Linked-Data：Linked-Data技術を使って、エージェントの情報を相互に結び付けます。エージェント記述文書をそのエージェントの全情報への入り口とし、そこから全情報をたどれるようにします。文書形式には主にJson-LDを使います。
- Schema.org：Json-LDのフィールドでは、Schema.orgがあらかじめ定義したフィールドを広く使います。未定義のものは定義を追加します。複数のエージェントが同じフィールドを一貫して解釈でき、プログラム処理もしやすくなります。
- 仕様は二つに分かれます。一つはADPの中心的な枠組みと構造を記述するコアADP仕様、もう一つは分野別のAD例です。例えばコーヒーショップのAD文書を例に、他のエージェントが自分の文書を生成できます。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
ADP Design Scheme



            • Linked-Data: Using Linked-Data technology, the information of agents is linked together. The agent

            description document serves as the entry point for all the information about the agent, and from this

            entry point, all the agent's information can be traversed. In terms of document format, we use Json-LD

            as the primary format.

            • Schema.org: The fields in Json-LD extensively use the predefined fields of Schema.org. If there are

          any undefined fields, they will be added with a definition. This ensures consistency in how multiple

            agents interpret the same field, while also making it easier for programs to process.

            • The specification is divided into two parts: one is the core ADP specification, which describes the

            core framework and structure of ADP; the other part consists of AD examples for each domain. For

           example, an AD document for a coffee shop, where other agents can refer to this example to generate

              their own.
````

</details>

## ページ 17

AD文書の例

例のURL：https://github.com/chgaowei/AgentNetworkProtocol/blob/main/examples/adp/lkcoffe/ad.json

注釈：
- エージェントに対応する分野の実体。
- 身元認証情報。
- 自然言語インターフェースや購入APIを含む外部インターフェース。
- 実体が外部へ提供する商品。

コード画像内のフィールドと値は、原本の画像を参照してください。

### 図中文字の補足訳

コード画像の可読部分の説明：認証方式は`didwba`、ヘッダー名は`Authorization`。分野の実体は`CafeOrCoffeeShop`で、名前は`Luckin Coffee`、住所は`PostalAddress`、`XX Road No.XX`、`Some City`、`Some Province`、郵便番号`123456`、国コード`CN`という例示値です。日本語ではコーヒーショップ、住所、通り、都市、省、郵便番号、国に相当します。商品名`Silk Latte`はシルクラテです。`NaturalLanguageInterface`は自然言語インターフェース、`PurchaseInterface`は購入インターフェースです。descriptionの「A YAML file for interacting with ...」は「…とやり取りするためのYAMLファイル」、「Made with high-quality ...」は「高品質の…を使って作られた」を意味します。これらのdescriptionと一部URLは原画像自体の右端で切れており、見えない続きを補っていません。コードの識別子・値は原画像を保持します。

### 原資料のリンク先（属性も含めて保持）

- https://github.com/chgaowei/AgentNetworkProtocol/blob/main/examples/adp/lkcoffe/ad.json

### 保持した原コード・図の画像

![コード・図の原画像](<../source-code-images/w3c-page-017-image-02.png>)

![コード・図の原画像](<../source-code-images/w3c-page-017-image-03.png>)

![コード・図の原画像](<../source-code-images/w3c-page-017-image-04.png>)

![コード・図の原画像](<../source-code-images/w3c-page-017-image-05.png>)

### 確認範囲と制約

- コードの識別子・鍵・URLは原画像で保持。コード全文の手動転記は実施せず、OCR文字列を正式なコードとして使用していない。
- 原画像自体で一部descriptionとURLの右端が切れている。原資料から見えない文字列は復元していない。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
AD Document Example


      Example URL: https://github.com/chgaowei/AgentNetworkProtocol/blob/main/examples/adp/lkcoffe/ad.json

                                                                           Domain entities corresponding to the agent             Identity authentication information





        External interfaces, including natural language
                 interfaces and purchased APIs

                                                                                        Products provided by the entity to the outside world
````

</details>

## ページ 18

やり取りの流れ

- DID文書内にエージェント記述文書へのリンクを配置しているため、DIDさえあればエージェント記述文書を見つけられます。
- 将来は、AIがよりアクセスしやすいデータネットワークが形成されます。

### 図中文字の補足訳

図中のラベル：AgentSearch＝エージェント検索、DNS、DID、DIDDocument＝DID文書、Agent.com、HTML/CSS/JS、Protocol＝プロトコル、Capacity＝機能、Agent Description＝エージェント記述。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Interaction Flow





                   • We have placed the agent description document link in the DID document, meaning that as long as
                  there is a DID, the agent description document can be found.

                   • In the future, there will be a data network that makes it easier for AI to access.
````

</details>

## ページ 19

その他

- LLMの学習時にADPを取り込む：ADの仕様と、各業界の例やインターフェースを、学習データやファインチューニングを通じてLLMに組み込めます。これにより、LLMによるADP処理の速度と精度が上がり、必要なプロンプトの長さを減らせます。
- エージェントが自分でAD文書の例を定義・アップロードし、他のエージェントが参照できます。エージェントの定義する仕様例が、人間の定義したものを上回る可能性があります。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Others




                     • Supporting ADP during LLM training: ADs specifications, along with
               examples and interfaces from various industries, can be incorporated
                    into the LLM through training data or fine-tuning. This enhances the
               LLM's speed and accuracy in processing ADP and reduces the length
                   of prompts required.

                     • Agents can independently define and upload AD document examples
                     for reference by other agents. The specification examples defined by
                agents may surpass those defined by humans.
````

</details>

## ページ 20

デモ実演

コーヒー注文の場面を通じて、パーソナルアシスタントがDIDとAgentDescriptionを使い、コーヒーショップのエージェントとやり取りする様子を示します。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Demo Presentation





               Through the coffee ordering scenario, demonstrate how a
               personal assistant interacts with the coffee shop's agent using
                      DID and AgentDescription.
````

</details>

## ページ 21

コード

ANPのオープンソースコード：https://github.com/chgaowei/AgentConnect

### 図中文字の補足訳

図中のラベル：Application Layer Protocol Integration Framework＝アプリケーション層のプロトコル統合フレームワーク。Protocol Loading／Unloading／Configuration／Running＝プロトコルの読み込み／取り外し／設定／実行。Scalable Protocol Framework＝拡張可能なプロトコルフレームワーク。Meta-Protocol Module＝メタプロトコルモジュール。Protocol Negotiation／Implementation／Debug／Handling＝プロトコルの交渉／実装／デバッグ／処理。LLM、API。Identity＝アイデンティティ。DID Generate＝DID生成。DID Authentication＝DID認証。End-to-End Encryption＝エンドツーエンド暗号化。ECDHE。Asymmetric Encryption＝非対称暗号。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Code





                    ANP Open Source Code: https://github.com/chgaowei/AgentConnect
````

</details>

## ページ 22

謝辞

WebAgentsの過去の会議記録は、設計のための貴重な資料と着想を提供してくれました。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Thanks





      The historical meeting records of WebAgents provide valuable
                  resources and inspiration for our design.
````

</details>

## ページ 23

最後に

ANPはまだ初期段階にあります。可能であればANPを提供し、WebAgentsの皆さんと一緒に改善を続けたいと考えています。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Finally





     ANP is still in its early stages, and if possible, we are willing
          to contribute ANP and continue improving it together with
                       everyone in WebAgents.
````

</details>

## ページ 24

Q&A

質疑応答。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Q&A





                          Question & Answer
````

</details>

## 追加の図中文字確認（2026-11-06）

元の画像をローカルOCRと目視で確認した追加の訳です。OCR結果をそのまま転記せず、読めない文字は補っていません。

### ページ 3

図の追加ラベル：Assistant＝アシスタント。

### ページ 4

図の追加ラベル：Assistant＝アシスタント。

### ページ 5

図の追加ラベル：Assistant＝アシスタント。

### ページ 6

図の追加ラベル：Assistant＝アシスタント。

### ページ 12

認証シーケンス図の画像を拡大して確認しました。User＝利用者、Agent A Client＝エージェントAのクライアント、Github＝GitHub、Agent A DID Sever（原図の綴り）＝エージェントAのDIDサーバー。Preliminary Operation＝事前の操作。Subscribe to the service＝サービスを購読する。Subscribe to the service using DID＝DIDを使ってサービスを購読する。First Request＝初回の要求。HTTP Request: DID,Signature＝HTTP要求：DIDと署名。Get DID Document＝DID文書を取得する。DID Document＝DID文書。Authentication＝認証。HTTP Response: token＝HTTP応答：トークン。Subsequent Requests＝以降の要求。HTTP Request: token＝HTTP要求：トークン。HTTP Response＝HTTP応答。

隣のJSON画像には`nonce`、`timestamp`、`service`、`did`と例示値があり、人向け説明文はありません。これらの技術値は原画像のまま保持します。この図は発表当時の認証フローであり、現在仕様への更新ではありません。

### 確認に使った原画像（未改変）

- [asset-011.png](<../source-figure-images/asset-011.png>) — ページ 12。SHA-256: `e9401d87872169cf88288b9f5abf919bbbbd680db9f02f165c24a9f40f87fd4b`。
