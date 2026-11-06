# slides-124-Telecom-AI-Agent-usecases-reqs-chinamobile.pptx — 日本語対訳

> 歴史的な発表資料の対訳です。現在のANP仕様へ内容を更新していません。PDFの文字レイヤー／PPTXのスライドXMLと発表者ノートから抽出した全文を、ページ・スライドごとに手動翻訳しています。独立した二次校閲は未実施です。
> 図中文字の補足と未確認箇所は各単位に記載しています。コード画像の識別子や鍵は原画像のまま保持し、不確かなOCRを実行可能なコードに置き換えていません。原文自体で切れている内容は補完していません。

- 原本: [standard/IETF124/slides-124-Telecom-AI-Agent-usecases-reqs-chinamobile.pptx](<../../../../../standard/IETF124/slides-124-Telecom-AI-Agent-usecases-reqs-chinamobile.pptx>)
- 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`
- 原本SHA-256: `131e7a4e711f623143da267ae83b63c7500e931cb3480717bcf080c672ab98ea`
- スライド数: 9
- 翻訳方法: エージェントによる全文手動翻訳。モデルAPI呼び出しなし。
- 検証範囲: 全抽出本文・ノートと単位対応。PDF全75ページの概観と埋込画像を確認し、PPTX埋込画像15点の読める文章を補足。PPTXのネイティブ描画と独立した二次校閲は未実施。原画素で判読できない微小文字は残っています。

## スライド 1

通信分野のAIエージェントのユースケースと要件

Kehan Yao、China Mobile
IETF 124。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Telecom AI Agent  Use cases and Requirements
Kehan Yao, China Mobile
IETF 124
````

</details>

## スライド 2

AIエージェント通信の全体的な場面

図の主体：OTT X、OTT Y、Operator A、Operator B、利用者（User）、各Agent。
アプリケーションのツールサービス（Application Tools Service）：Tool y_1、Tool y_2。
ネットワークのツールサービス（Network Tools Service）：Tool a_2、Tool a_1。

AIエージェントの種類：
- アプリ内エージェント。提供者：OTT、通信事業者、第三者など。
- UE内のエージェント。提供者：携帯電話やロボットのベンダーなど。
- ネットワーク内エージェント。提供者：通信事業者、OTT。

ツールの種類：アプリケーションのツール、ネットワークのツール。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Holistic AI agent communication scenarios 
OTT X
Operator B
Operator A
OTT Y
Application
Tools Service
Tool y_1
Tool y_2
User
Agent
Agent
Agent
Agent
Agent
Network
Tools Service
Tool a_2
Tool a_1
AI agent types:
Agent in Apps. Provider: OTT, operator, third party, etc.
Agent in UEs. Provider: phone vendor, robot vendor, etc.
Agent in network. Provider: operator, OTT.
Tools types:
Application tools. 
Network tools.
````

</details>

## スライド 3

用語

AIエージェントの所有と役割：
- OBO（On-behalf-of）User：エージェントが利用者のために仕事を行う際、利用者の認可が必要になることがあります。
- OBO Agent Itself：エージェント自体がアイデンティティを持ち、自分を代表して仕事を実行します。
- OBO Other Agent(s)：他のエージェントが実行に必要な機能を持たない場合などに、その代理として仕事を実行できます。

ドメイン：
- Task-wise Domain：特定の仕事のために一時的に作られ、仕事が終わると破棄されるドメイン。6Gシステムが作るドメインが代表例です。
- Application Domain：クラウドサービス提供者のWebアプリやモバイルアプリなど、特定のアプリケーションが作る継続的なドメイン。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Ownership and Roles of AI agents:
OBO(On-behalf-of) User: the agent may require the authorization from user(s) to implement jobs for user(s). 
OBO Agent Itself: the agent itself has indentity and implements jobs and represents itself.
OBO Other Agent(s): the agent may represent other agents to implement some jobs, given that other agents may not have the capabilities to implement the jobs.
Domain:
Task-wise Domain: a temporary domain that is created to target on a specific job, when the job is finished, the domain is destroyed.  A typical example is a domain that is created by 6G systems.
Application Domain: a durable domain that is created by a specific application, e.g., a web or mobile application offerred by cloud service providers.
Terminology 
````

</details>

## スライド 4

ユースケース：旅行計画（Agent OBO User）

AIエージェントが利用者の代理で旅行サービスを計画し、予約のための決済も実行できます。

図の主体：AI Agent、User、Trip Planning Agent（UE native/App native）、Application 1（チケット予約サービス）、Application 2（地図サービス）。

要件：
- 誤った実行を避けるため、HITL（human-in-the-loop）に対応しなければなりません（MUST）。
- リスクの段階を定義しなければなりません（MUST）。どの段階でHITLが必須か（MUST）、どの段階を「whitelist」に入れるか、どの段階で利用者確認が必要で、その後「whitelist」に入れられるかを定義します。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Use cases: Trip Planning (Agent OBO User) 
AI agent delegates its user to plan trip services. 
AI agent can do payment execution for booking.  
AI Agent
User
Trip Planning Agent
(UE native/App native)
Application 1
ticket booking service
map service
Application 2
Requirements:
MUST support HITL(human-in-the-loop) to avoid wrong execution.
MUST define risk levels, what level MUST require HITL, what level is in “whitelist”,  and what level requires user confirmation but can then put into “whitelist”.
````

</details>

## スライド 5

ユースケース：ヘルスケア（Agent OBO other agent）

子ども、Alzheimer病患者などの特定の高齢者、保護者を必要とする障害者を対象とします。本人側のエージェント（スマートウォッチなど）が生体センシングデータを収集し、保護者側のエージェントに送信します。保護者側は、被保護者のエージェントに代わり、病院などの外部機関へ要求を送るかを判断します。

要件：委任された認可のもとでの資源アクセスと意思決定について、明確なスコープや境界を定義しなければなりません（MUST）。

図のラベル：被保護者（Ward）のUserとAI Agent／Smart Watch、保護者（Guardian）のUserとAI Agent／Phone、外部リソース／API（External resources/API）、病院など（Hospital, etc.）。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Use cases: Health Care (Agent OBO other agent)
For children, specific elder people (e.g., Alzheimer's patients), and people with disabilities who require guardians
Their agents (e.g., smart watches) collect biosensing data and transmit it to the guardians' agents which make decisions on whether sending requests to external institutions such as hospitals on behalf of the wards' agents 
Requirements:
MUST define clear scope or boundaries for resource access and decision making under delegated authorization.
AI Agent
User
Smart Watch 
AI Agent
User
Phone 
Ward
Guardian 
External
resources/API
Hospital, etc. 
````

</details>

## スライド 6

ユースケース：遠隔救助（Agent OBO itself）

複数のAIエージェントが協力して、遠隔救助タスクを完了します。

図のラベル：Robot Dog（ロボット犬）、Robot Arm（ロボットアーム）、UAV、ACN、Subnet、task-wise domain（タスク単位のドメイン）、External Agent（外部エージェント）、Mobile Core Network（モバイルコアネットワーク）。

要件：
- エージェント間のリアルタイム通信と信頼性に対応しなければなりません（MUST）。
- 一時的なタスクに対する、動的なグループでのエージェント通信に対応しなければなりません（MUST）。
- グループの作成・破棄を含むライフサイクル管理に対応しなければなりません（MUST）。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Use cases:  Remote Rescue (Agent OBO itself) 
Multiple AI agents collaborate to finish remote rescue tasks.   
Robot Dog
Robot Arm
UAV
ACN
Subnet
task-wise domain
External Agent
Mobile Core Network
Requirements:
MUST support real-time communication between agents, as well as reliablity.
MUST support dynamic groups of agent communication for temporary tasks.
MUST support life-cycle management of groups, including construction and destroy. 
````

</details>

## スライド 7

通信コアネットワークへのエージェントプロトコルの適用可能性

- アイデンティティの登録、発行、発見：エージェント、ツール、その他のサービス／リソースには、IDという点で共通性があります。関連するNFの拡張候補：UDM、UDR、SMFなど。
- 認証と認可：関連するNFの拡張候補：AUSF、SMFなど。
- HITL（Human-in-the-Loop）の確認：コアネットワーク機能が呼び出す、人間による確認へのリダイレクト。関連するNFの拡張候補：PCF、NEF、UPFなど。
- 動的グループとリアルタイム通信：関連するNFの拡張候補：AMF、SMFなど。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Agent Protocols’ Applicability in Telecom Core Net
Identity registration, issue, and discovery:
Agents, Tools, and other services/resources share similarities in terms of ID.
Potential related NFs enhancements, UDM, UDR, SMF, etc.
Authentication and authorization：
Potential related NFs enhancements, AUSF, SMF, etc.
HITL(Human-in-the-Loop) confirmation:
Redirection to human confirmation invoked by core network functions
Potential related NFs enhancements, PCF, NEF,UPF, etc.
Dynamic group and real-time communication: 
Potential related NFs enhancements, AMF, SMF, etc.
````

</details>

## スライド 8

まとめ

企業ネットワークやインターネットに加え、通信事業者のネットワークにも重要なユースケースがあります。利用するプロトコルはA2Aに限定されず、MCP、ANPなどにも開かれています。

AIprotoのたたき台の憲章に挙がる4つの主要作業項目を超えて、プロトコル設計のための、より細かい要件や新しい要件を提案しました。

これらのユースケースと要件に賛同しますか。参加に関心はありますか。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Summary
There are some important use cases in telecom network, beyond enterprise networks and the Internet. They are not limited to use just A2A, but also open to MCP, ANP, etc. 
Fine-grained requirements and new requirements are proposed for protocol design, beyond the 4 main work item listed in AIproto strawman charter.
Do you agree with these use cases and requirements? 
Any interests to join? 
````

</details>

## スライド 9

ありがとうございました。

IETF 124。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
THANKS!
IETF 124
````

</details>

## 追加の図中文字確認（2026-11-06）

元の画像をローカルOCRと目視で確認した追加の訳です。OCR結果をそのまま転記せず、読めない文字は補っていません。

### スライド 2

3点の埋込画像は、エージェント／利用者対応／ツールを表すアイコンで、人向けの説明文は見当たりませんでした。図中の役割やサービス名はスライドXMLから抽出した本文で訳しています。

### スライド 6

5点の埋込画像は、ロボット犬、ロボットアーム、UAV、ネットワーク図、ロボットのアイコンです。説明用の文章は見当たりませんでした。機器表面の微小な刻印を意味のある語として確定していません。図外のRobot Dog／Robot Arm／UAVなどは抽出本文に含まれます。

### 確認に使った原画像（未改変）

- [image1.png](<../../source-pptx-media/slides-124-Telecom-AI-Agent-usecases-reqs-chinamobile/image1.png>) — 参照スライド 2。SHA-256: `d83064d9814b4a8c8e3615b4e15925cbf7172fbfc2d41a6ae829ee1ad92e2c36`。
- [image2.png](<../../source-pptx-media/slides-124-Telecom-AI-Agent-usecases-reqs-chinamobile/image2.png>) — 参照スライド 2。SHA-256: `658533aad0f222956458dbf00baf52b13196a5618e402195969d93b34d80f840`。
- [image3.png](<../../source-pptx-media/slides-124-Telecom-AI-Agent-usecases-reqs-chinamobile/image3.png>) — 参照スライド 2。SHA-256: `ba8bd980b241ff179e1093c51f81e6a17255f5e0e86cc24177533d96c6591761`。
- [image4.png](<../../source-pptx-media/slides-124-Telecom-AI-Agent-usecases-reqs-chinamobile/image4.png>) — 参照スライド 6。SHA-256: `57c99673b8f716f66d381d0bb3f9c7ba41834548d0542674aece35f94bb2cb55`。
- [image5.png](<../../source-pptx-media/slides-124-Telecom-AI-Agent-usecases-reqs-chinamobile/image5.png>) — 参照スライド 6。SHA-256: `9516b2efe7d75da3394cedfe4ef309f247302ab55fea5bc49ff0616719c3d547`。
- [image6.png](<../../source-pptx-media/slides-124-Telecom-AI-Agent-usecases-reqs-chinamobile/image6.png>) — 参照スライド 6。SHA-256: `a55228d49d93f5f6ce4c8fe447b54a8ac9115639af823d2df207ac0058664fbc`。
- [image7.png](<../../source-pptx-media/slides-124-Telecom-AI-Agent-usecases-reqs-chinamobile/image7.png>) — 参照スライド 6。SHA-256: `96fa0057969660fc93a249104ff5cce45f99bf323e0f93d1c521be282dbf8a52`。
- [image8.png](<../../source-pptx-media/slides-124-Telecom-AI-Agent-usecases-reqs-chinamobile/image8.png>) — 参照スライド 6。SHA-256: `0b9d07f9636b7975b1d465b1c2f193270e16843bbce59938fa8fb712139bcc3f`。
