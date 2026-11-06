# AI Agents Communication Use Cases and Requirements(v3)-chinatelecom.pdf — 日本語対訳

> 歴史的な発表資料の対訳です。現在のANP仕様へ内容を更新していません。PDFの文字レイヤー／PPTXのスライドXMLと発表者ノートから抽出した全文を、ページ・スライドごとに手動翻訳しています。独立した二次校閲は未実施です。
> 図中文字の補足と未確認箇所は各単位に記載しています。コード画像の識別子や鍵は原画像のまま保持し、不確かなOCRを実行可能なコードに置き換えていません。原文自体で切れている内容は補完していません。

- 原本: [standard/IETF124/AI Agents Communication Use Cases and Requirements(v3)-chinatelecom.pdf](<../../../../../standard/IETF124/AI Agents Communication Use Cases and Requirements(v3)-chinatelecom.pdf>)
- 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`
- 原本SHA-256: `efbc232eccd538d5fb2e4b2871c784ad8dcdfb1ecead25ce61f08d6f5240ca79`
- ページ数: 14
- 翻訳方法: エージェントによる全文手動翻訳。モデルAPI呼び出しなし。
- 検証範囲: 全抽出本文・ノートと単位対応。PDF全75ページの概観と埋込画像を確認し、PPTX埋込画像15点の読める文章を補足。PPTXのネイティブ描画と独立した二次校閲は未実施。原画素で判読できない微小文字は残っています。

## ページ 1

AIエージェント通信のユースケースと要件

Menghan Yu（China Telecom）
Xueting Li（China Telecom）
Aijun Wang（China Telecom／発表者）
Ying Tong（China Telecom）

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
AI Agents Communication Use Cases and Requirements





                                                   • Menghan Yu(China Telecom)
                                                   •  Xueting Li(China Telecom)
                                                   •  Aijun Wang (China Telecom/Presentator)
                                                   •  Ying Tong(China Telecom)
````

</details>

## ページ 2

3GPPにおけるAIエージェントのユースケース

SA1での成果：
- AIエージェントの定義：環境との相互作用、文脈情報の取得、推論、自己学習、意思決定、タスク実行などを、自律的に、または他のAIエージェントと協働して行い、特定の目標を達成する自動化された知的主体。
- 6GシステムにおけるAIエージェント：端末内AIエージェント、アプリケーションAIエージェント、ネットワークAIエージェントなど。
- ユースケースと要件：TR 22.870には、合意済みのAIエージェント関連ユースケースが21件以上、潜在的な要件が63件以上あります。配備、機能、運用上の役割に応じ、主に次の4分類に分けられます。
  - ネットワークAIエージェントが実現する意図ベースの6Gサービス
  - デバイスとネットワークの協働
  - 複数デバイスの協働
  - ネットワークとアプリケーションの協働

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
AI Agents Use Cases in 3GPP



    ❑Achievements in SA1:
       •   AI Agent Definition: an automated intelligent entity capable of e.g interacting with its environment,
          acquiring contextual information, reasoning, self-learning, decision-making, executing tasks
         (autonomously or in collaboration with other Al Agents) to achieve a specific goal
       •   AI Agents in 6G system: On-device AI Agents, Application AI Agents, Network AI Agents...
       •  Use cases and requirements: 21+ agreed AI Agents related use cases and 63+ potential
         requirements in TR 22.870. These use cases can be classified into 4 main categories according to
         the deployment, capabilities, and operational roles of the AI Agents:
               •   Intent-based 6G Services Enabled by Network AI Agents
               •   Device-Network Collaboration
               •   Multiple Devices Collaboration
               •   Network-Application Collaboration
````

</details>

## ページ 3

3GPPにおけるAIエージェントのユースケース（1/4）

ネットワークAIエージェントが実現する意図ベースの6Gサービス：
- 6GネットワークにAIエージェントを配備することで、利用者の意図に応じた新しい知的サービスを提供できます。
- エージェント通信：異なるネットワークAIエージェント間の通信。
- ユースケース：AIエージェントによる6Gネットワークのオンデマンドネットワーキング、知的な通話サービス、ネットワークAIエージェントによる災害救助計画、ネットワーク性能保証のためのAIエージェント、AIエージェントに基づく個別サービス提供、ネットワークネイティブなAIエージェントによる支援（自動運転など）、通信ネットワーク向けのAI最適化スマート通話支援。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
AI Agents Use Cases in 3GPP(1/4)


❑Intent-based 6G Services Enabled by Network AI Agents:
•  By deploying AI Agents in 6G network, the 6G network can provide
   users with novel intelligent services requested by the user intent.
•  Agent Communication: Agents communication between different
   network AI Agents
•  Use Cases:
       •  6G Network Providing On-demand Networking with AI Agent
       •   Intelligent Calling Services
       •   Disaster Rescue Planning Enabled By Network AI Agents
       •   AI agent for network performance assurance
       •  Customized service provisioning based on AI Agents
       •  Network-based intelligent assistance (e.g. for autonomous driving) by a network-native AI Agent
       •   AI-optimized smart call assistance for telecom networks
````

</details>

## ページ 4

第三者サービスへのネットワーク機能の公開

ネットワーク機能を第三者アプリケーションに公開することで、利用者に個別化したサービスを提供できるようになります。

1. 「Concert AR Smart Interaction」アプリケーション基盤が、ネットワークを活用した利用者データ分析の意図を中央インテリジェンス層へ宣言し、個別サービスの実現を図ります。
2. 中央インテリジェンス層の機能公開エージェントが解析します。①意図を解析し、利用者の嗜好、ネットワーク品質、需要の高い利用者などへタスクを分解します。②サービスインテリジェンス層へタスク情報を配信します。
3. サービス個別化エージェントが、他のエージェントやネットワーク要素とやり取りして元データを取得し、利用者プロファイリングやネットワーク品質評価などの内部分析機能を呼び出して、結果を機能公開エージェントに報告します。
4. 機能公開エージェントが、分析結果をアプリケーション基盤へ渡します。
5. ネットワークは第三者アプリケーションにデータを提供し、機能公開エージェントとサービス個別化エージェントの協働により、利用者への個別サービス提供を可能にします。例：好まれる対話方式の選択、関心に基づくサービス推薦。

図の主要ラベル：機能公開／公開する意図／タスク分解／データの収集と分析。詳細な内部ラベルは図の確認記録を参照してください。

### 図中文字の補足訳

図の拡大画像で確認した内部ラベル：OMC、Intent＝意図、Exposure＝公開、Ecosystem Co-creation＝エコシステムの共創、Capability Exposure Intent＝機能公開の意図。Central Intelligence Layer＝中央インテリジェンス層、Task Orchestration Agent＝タスク編成エージェント、Capability Exposure Agent＝機能公開エージェント。Service Intelligence Layer＝サービスインテリジェンス層。QoS Assurance Agent＝QoS保証エージェント、Service Identification＝サービス識別、Optimization Policy Generation＝最適化ポリシー生成、Policy Distribution＝ポリシー配布。Connectivity Agent＝接続性エージェント、Intelligent Access＝知的アクセス、Mobility Optimization＝モビリティ最適化、Resource Allocation＝資源割り当て。Service Customization Agent＝サービス個別化エージェント、User Profiling＝利用者プロファイリング、Network Quality Assessment＝ネットワーク品質評価、Service Function Orchestration＝サービス機能の編成。Task Decomposition＝タスク分解、Data Collection and Analysis＝データ収集・分析。略語／識別子はRAN、Agents、UEs、SBI+、ABI、AMF+、NRF+、NWDAF+、SMF+、UDM+、NF+、6GCを保持。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Network Capability Exposure for Third-Party Services


 The exposure of network capabilities to third-party applications empowers them to deliver personalized services to users


            The "Concert AR Smart Interaction" APP platform declares its
                intent to the central intelligence layer for network-facilitated user
                      data analytics, to enable personalized services.


                                                                                                                                                                                                                                  Capability
                                                                                                                                                                   Exposure
                  2. The capability exposure agent in the central intelligence layer                                                                                                    Exposure Intent
                                performs the parsing.
         ① Parses the intent and conducts task decomposition:
                User preferences, User network quality, High-demand users, ...                                                                                                       Task
        ② Dispatches task information to service intelligence layer.                                                                                                        Decomposition


                 3. The service customization agent interacts with other agents and
                network elements to acquire raw data, invokes its internal                                                                                                       Data Collection
                   analytical capabilities (e.g., user profiling, network quality                                                                                                      and Analysis
                assessment), and reports the analytical results to the capability
                                    exposure agent.


                 4. The capability exposure agent delivers the analytical results to
                                     the APP platform.


                 5. The network provides data support to third-party applications,
              enabling them to deliver personalized services to users through the
                 collaboration of the capability exposure agent and the service
                                   customization agent.
                  Preferred interaction method selection, Interest-based service recommendations,  ...
````

</details>

## ページ 5

3GPPにおけるAIエージェントのユースケース（2/4）

デバイスとネットワークの協働：
- 計算資源や電池容量などの制約により、デバイスは複雑なタスクをすべて手元で実行できず、一部をネットワークにオフロードし、6Gネットワークと協力して実行することがあります。
- エージェント通信：端末内AIエージェント同士、および端末内エージェントとネットワークAIエージェントとの通信。
- ユースケース：6Gシステムに支援されたAIエージェントサービス、スマート家事支援、子どもの健康管理アシスタント、AIエージェントによる柔軟なUEとネットワークの協調、個人の安全のための先回りするAIエージェント、共有型の身体性を持つAIエージェント。

### 図中文字の補足訳

図中文字：6G core network＝6Gコアネットワーク。4. Request AI agent selection and information exposure＝4. AIエージェントの選択と情報公開を要求。6. Data transfer through the network＝6. ネットワークを通じたデータ転送。7. Request 3GPP service and results exposure＝7. 3GPPサービスと結果の公開を要求。UE AI agent＝UEのAIエージェント。optimal route＝最適経路。人物名はLily、Emma、Davidを保持。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
AI Agents Use Cases in 3GPP(2/4)



❑Device-Network Collaboration:
•  Due to device limitations (computational resources, battery
    capacity, etc.) The device cannot fully execute complex
    tasks locally and may offload partial tasks to the network,
    collaborating with 6G network to execute complex tasks.
•  Agent Communication: Agents communication between on-
   device AI Agents, and between on-device Agents and
   network AI Agents
•  Use Cases:
       •  6G System Assisted AI Agent Service          •   Child Health Management Assistant
       •  Smart Housekeeping                               •   Flexible UE-Network coordination through AI agent(s)
                                                                    •   Proactive AI agent for personal safety
                                                                    •  Shared embodied AI agents
````

</details>

## ページ 6

3GPPにおけるAIエージェントのユースケース（3/4）

複数デバイスの協働：
- 6Gネットワークの強力な通信機能のもとで、複数の端末内AIエージェントが6Gネットワークによる認証・認可を受けた後に協働し、複雑なAIタスクを達成できます。
- エージェント通信：異なる端末内AIエージェント間の通信。
- ユースケース：協働するAIエージェント、AIエージェント通信、AIエージェントの認証と認可、複数エージェントの場面におけるデータ収集・融合の知的支援。

### 図中文字の補足訳

図中文字：Network with computing resource＝計算資源を持つネットワーク。offload tasks＝タスクをオフロード。Single User group 1／2／3＝単独利用者のグループ1／2／3。Food delivery App group 4＝料理配達アプリのグループ4。Input: User intent, environment＝入力：利用者の意図と環境。Output: task-oriented actions＝出力：タスクに向けた行動。Welcome my relatives＝親族を迎える。AI assistant＝AIアシスタント。Discuss the food delivery location and time＝料理を届ける場所と時刻を相談。Order food delivery＝料理配達を注文。Pick up my relatives＝親族を迎えに行く。Clean the room＝部屋を掃除。Self driving car＝自動運転車。Home Robot＝家庭用ロボット。Check the schedule of relatives＝親族の日程を確認。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
AI Agents Use Cases in 3GPP(3/4)


❑Multiple Devices Collaboration:
•  Under the powerful communication capabilities
    of 6G networks, multiple on-device AI Agents
   can collaborate with each other to accomplish
   complex AI tasks after being authenticated and
    authorized by the 6G network.
•  Agent Communication: Agents communication
   between different on-device AI Agents



  •  Use Cases:
          •   Collaborative AI Agents
          •   AI Agents Communication
          •   Authentication and authorization for AI agents
          •  Smart support for data collection and fusion in multi-agent scenarios
````

</details>

## ページ 7

3GPPにおけるAIエージェントのユースケース（4/4）

ネットワークとアプリケーションの協働：
- ネットワークAIエージェントは、適切なアプリケーションAIエージェントを呼び出し、ネットワークデータや専門知識を共有して、重要なデータ支援を提供できます。
- エージェント通信：ネットワークAIエージェントとアプリケーションAIエージェントとの通信。
- ユースケース：知的な通信アシスタント、LLMを使う第三者AIとの6G AIエージェント協働、生成AIの検索拡張生成の一部としてのネットワーク知識、AIエージェントの管理。

### 図中文字の補足訳

図中文字：Third-party, e.g., smart city authority＝第三者（例：スマートシティの行政当局）。6G network operator＝6Gネットワーク事業者。AI agent＝AIエージェント。Request, e.g. including intent＝要求（例えば意図を含む）。Response, e.g. including service advertisement＝応答（例えばサービスの広告を含む）。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
AI Agents Use Cases in 3GPP(4/4)


❑Network-Application Collaboration:
•  The network AI Agents can invoke
    appropriate application AI Agents, and can
   share network data and domain expertise
    with application AI Agents, providing crucial
   data support for application AI Agents.
•  Agent Communication: Agents
   communication between network AI Agents
   and Application AI Agents


   •  Use Cases:
          •   Intelligent Communication Assistant
          •  6G AI Agent Collaboration With Third-party AI Using LLM
          •  Network knowledge as part of Retrieval Augmented Generation for Generative AI
          •   AI agent management
````

</details>

## ページ 8

意味に基づくルーティング（Semantic Routing）。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Semantic Routing
````

</details>

## ページ 9

Semantic Routing（SemR）とは

定義：SemRは、サービスのアイデンティティ、APIバージョン、利用者の文脈、意図など、アプリケーション層の意味に基づいてルーティングを判断し、ネットワークの動作を業務目標に合わせます。

主要な構成要素：
- アイデンティティ：通信する主体（サービス、利用者、エージェント）を認証・検証します。
- ポリシー：業務上の意図を、実行可能なルーティング規則に変換します。
- テレメトリー：指標、ログ、トレースといった実行時のフィードバックを提供し、動的な最適化を図ります。

原本のページ番号：9。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
What is Semantic Routing(SemR)?

 Definition：SemR enables routing decisions based on application-layer semantics — such
     as service identity, API version, user context, or intent — to align network behavior with
     business goals.



    Core Components:


     Identity                                                             Telemetry
                                          Policy

     Authenticate and verify                                                   Provide runtime feedback
                                            Translate business intent into
     communicating entities                                                           (metrics, logs, traces) for
                                          executable routing rules.
      (service, user, agent).                                                dynamic optimization.





                                                                                                   9
````

</details>

## ページ 10

サービスからエージェントへ：新しい通信パラダイム

AIエージェントのネットワークでSemRが重要な理由：

| 観点 | Service Mesh（従来のSemR） | AI Agent Network（将来のSemR） |
| --- | --- | --- |
| 対象 | 静的なサービス識別（サービス名、バージョン、API） | 動的なエージェント（意図＋機能） |
| トポロジー | 比較的安定 | 非常に動的で自己組織的 |
| 信頼モデル | mTLS、RBAC | 文脈や履歴に基づく信頼 |
| 判断基準 | 遅延、負荷 | タスクとの関連性、信頼、コスト、データの所在 |

SemRは、意味の隔たりの解消、動的なトポロジーへの適応、協働効率の向上を通じて、エージェント通信の課題に対処する重要な仕組みです。原本のページ番号：10。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
From Services to Agents: New Communication Paradigm

 Why SemR is critical for AI Agent networks:

                      Dimension        Service Mesh（Traditional SemR）AI Agent Network（Future SemR）

                                                      Static Service Identification
                            Target                                     Dynamic agent (intent + capability)                                       （Service Name, Version, API）

                       Topology                   Relatively stable           Highly dynamic, self-organizing

                         Trust Model              mTLS, RBAC             Contextual, history-based trust

                                                                          Task relevance, trust, cost, data
                      Decision Metric                 Latency, load
                                                                                                         locality


   SemR is a Key Mechanism to Address Agent Communication Challenges:



       Resolve Semantic Gap              Adapt to Dynamic Topology          Enhance Collaboration Efficiency




                                                                                                   10
````

</details>

## ページ 11

意味の進化

「サービス名」から「意図ベクトル」へ：意図ベクトル、意味的な照合、柔軟性。

機能の発見と照合：エージェント登録、意図ルーティングテーブル、リアルタイムのポリシー。

信頼を考慮した動的ポリシー：信頼スコア、ポリシー制御、安全性の保証。

原本のページ番号：11。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Semantic Evolution

 From “Service Name” to “Intent Vector”



    From “Service Name” to        Capability Discovery and                                                                  Trust-Aware Dynamic Policy
           “Intent Vector”                 Matching


         •   Intent Vector                                                               •   Trust Score
                                                 •   Agent Registration

         •   Semantic                                                                    •   Policy Control
                                                 •   Intent Routing Table
         Matching
                                                                                             •   Security
                                                 •   Real-time Policy
         •   Flexibility                                                   Assurance





                                                                                                         11
````

</details>

## ページ 12

将来のアーキテクチャ

AIエージェント通信のためのSemantic Routing設計：

| 層 | 構成要素 | 役割 |
| --- | --- | --- |
| 制御プレーン | エージェント機能登録 | エージェントの機能、意図ベクトル、資源状態を管理 |
| 制御プレーン | 意図発見サービス | タスクを意図ベクトルに変換し、レジストリと照合 |
| 制御プレーン | グローバルポリシーエンジン | 信頼、コスト、負荷に関するルーティングポリシーを生成・配布 |
| データプレーン | サービスルーター | 意味的なメタデータを伴うエージェント通信を処理 |
| データプレーン | ローカルルーティング判断ユニット | エージェントのエッジで最終的な経路判断を実施 |
| フィードバックループ | タスク成功監視 | タスク完了、遅延、資源利用を追跡 |
| フィードバックループ | RLモジュール | 履歴／リアルタイムデータでルーティングモデルを最適化 |

原本のページ番号：12。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Future Architecture

  Semantic Routing design for AI Agent Communication



             Layer                Components                                  Role
                                                     Manages Agent capabilities, intent vectors, and resource
                          Agent Capability Registration
                                                                                                      status.
        Control Plane         Intent Discovery Service       Converts tasks to intent vectors and matches with registry.

                                Global Policy Engine           Generates/distributes routing policies (trust, cost, load).

                                     Service Router            Handles Agent communication with semantic metadata.
        Data Plane
                             Local Routing Decision Unit         Makes final routing decisions at Agent edges.

                             Task Success Monitoring          Tracks task completion, latency, and resource use.
      Feedback Loop
                          RL Module               Optimizes routing model via historical/realtime data.





                                                                                                   12
````

</details>

## ページ 13

まとめ：6GのAIエージェントのユースケースに必要な主要要件

1. AIエージェント通信の枠組み：前述の全場面を実現するために必要な構成要素を統合できること。
2. AIエージェントのアイデンティティ：デジタルアイデンティティに対する、安全な認証、認可、管理の仕組み。
3. 効率的な協働：異なるAIエージェント同士、およびエージェントとツールとの効率的な協働。
4. 登録と発見：端末内AIエージェント、第三者のAIエージェント、ネットワークAIエージェント、ツール。
5. 意味に基づくルーティング：アイデンティティ、利用者の文脈、意図など、アプリケーション層の意味に基づく経路判断。
6. セキュリティ：データ保護と利用者の同意。

原本のページ番号：13。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Summary---Core Requirements for 6G AI Agent Use Cases



 1.   AI Agent Communication Framework

         •   Which can integrate the necessary components to accomplish all the mentioned scenarios.

 2.  The Identity of AI Agents

         •   Secure authentication, authorization, and management mechanisms for AI Agents' digital identities

 3.   Efficient Collaboration

         •    Efficient collaboration between different AI Agents and between AI Agents and the tools

 4.   Registration and Discovery

         •   On-device AI Agents, 3rd party AI Agent, network AI Agents and tools

 5.  Semantic Routing

         •   Routing decisions based on application-layer semantics — such as identity, user context, or intent

 6.   Security

         •   Data protection and user consent

                                                                                                   13
````

</details>

## ページ 14

ありがとうございました。

1. https://datatracker.ietf.org/doc/draft-yu-ai-agent-use-cases-in-6g/
2. https://datatracker.ietf.org/doc/draft-tong-network-agent-use-cases-in-6g/
3. https://datatracker.ietf.org/doc/html/draft-li-semantic-routing-architecture

### 原資料のリンク先（属性も含めて保持）

- https://datatracker.ietf.org/doc/draft-yu-ai-agent-use-cases-in-6g/
- https://datatracker.ietf.org/doc/draft-tong-network-agent-use-cases-in-6g/
- https://datatracker.ietf.org/doc/html/draft-li-semantic-routing-architecture

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Thank you!


1. https://datatracker.ietf.org/doc/draft-yu-ai-agent-use-cases-in-6g/
2. https://datatracker.ietf.org/doc/draft-tong-network-agent-use-cases-in-6g/
3. https://datatracker.ietf.org/doc/html/draft-li-semantic-routing-architecture
````

</details>

## 追加の図中文字確認（2026-11-06）

元の画像をローカルOCRと目視で確認した追加の訳です。OCR結果をそのまま転記せず、読めない文字は補っていません。

### ページ 1

背景画像の標語「更快更智能」＝「より速く、よりスマートに」。CHINA TELECOM／中国电信は企業名として保持します。ロゴの5G／helloは原表記を保持し、helloは「こんにちは」を意味します。

### ページ 3

列車内のオンライン会議の図に含まれる文章：
- “I will attend an online meeting on a train at 2 pm tomorrow and will need a high-quality network support.”＝「明日午後2時に列車内でオンライン会議に参加するので、高品質なネットワーク支援が必要です」。
- “…(thinking)… Check the performability by incorporating the train schedule and train route… Generate alternative call packages…”＝「…（思考中）…列車の時刻表と経路を取り込んで実行可能性を確認する…代替の通話パッケージを生成する…」。
- Network information database＝ネットワーク情報データベース。QoE map prediction＝QoEマップの予測。Charging＝課金。Network capability set＝ネットワーク機能の集合。
- Train schedule＝列車の時刻表。Train routes＝列車の経路。Third-party data sources＝第三者のデータ源。
- Call package #1: …, Fees: 5 ¥＝通話パッケージ#1：…、料金：5 ¥。Call package #2: …, Fees: 9 ¥＝通話パッケージ#2：…、料金：9 ¥。原画像の省略記号を具体的な内容で補っていません。
- Network assurance policy＝ネットワーク品質の保証ポリシー。図の下端ではこのラベルの下部が切れています。

### ページ 14

背景の企業名・標語はページ1と共通です。「更快更智能」＝「より速く、よりスマートに」。

### 確認に使った原画像（未改変）

- [asset-022.png](<../../source-figure-images/asset-022.png>) — ページ 3。SHA-256: `82ff161c097b720e52a0053c4667843b3acc985cfe076cfc1696b47649197979`。
