# Multi-Access+Collaboration+Requirements+for+AI+Agent+Protocol-chinaunicom.pdf — 日本語対訳

> 歴史的な発表資料の対訳です。現在のANP仕様へ内容を更新していません。PDFの文字レイヤー／PPTXのスライドXMLと発表者ノートから抽出した全文を、ページ・スライドごとに手動翻訳しています。独立した二次校閲は未実施です。
> 図中文字の補足と未確認箇所は各単位に記載しています。コード画像の識別子や鍵は原画像のまま保持し、不確かなOCRを実行可能なコードに置き換えていません。原文自体で切れている内容は補完していません。

- 原本: [standard/IETF124/Multi-Access+Collaboration+Requirements+for+AI+Agent+Protocol-chinaunicom.pdf](<../../../../../standard/IETF124/Multi-Access+Collaboration+Requirements+for+AI+Agent+Protocol-chinaunicom.pdf>)
- 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`
- 原本SHA-256: `fb90c97bc40f8d6df8fffe3815b66cbe47103751a8f2ff02e82e0f8132b2214a`
- ページ数: 10
- 翻訳方法: エージェントによる全文手動翻訳。モデルAPI呼び出しなし。
- 検証範囲: 全抽出本文・ノートと単位対応。PDF全75ページの概観と埋込画像を確認し、PPTX埋込画像15点の読める文章を補足。PPTXのネイティブ描画と独立した二次校閲は未実施。原画素で判読できない微小文字は残っています。

## ページ 1

AIエージェントプロトコルに求めるマルチアクセス協働の要件

2025-11
LIU WEI、ZHANG YAOMIN、HAN MENGYAO（CHINA UNICOM）
Email: liuw550@chinaunicom.cn

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Multi-Access Collaboration
Requirements for AI Agent Protocol


                           2025-11
   LIU WEI, ZHANG YAOMIN, HAN MENGYAO (CHINA UNICOM)
                  Email: liuw550@chinaunicom.cn
````

</details>

## ページ 2

マルチアクセス協働で重視する事項

- はじめに
- マルチアクセス協働の場面
- AIエージェント通信プロトコルへの要件

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
What Multi-Access Collaboration Cares About


• Introduction

• The multi-access collaboration scenarios

• The requirements for AI agent communication protocols
````

</details>

## ページ 3

マルチアクセス協働とサービス

端末技術の急速な発展と、複数の場面に対応するネットワーク需要の普及に伴い、遠隔のホームセキュリティ監視、リモートワーク、3GPP／非3GPPアクセスなどが、利用者の主要な要求となってきています。

図の分類：ホームセキュリティ、リモートワーク、ハイブリッドアクセス。

### 確認範囲と制約

- 説明用の機器・アプリ画面の写真に含まれる微小文字は、網羅的な転記・翻訳を行っていない。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Multi-Access Collaboration and Service

•  With the rapid development of terminal technology and the popularization of multi-scenario networking
   requirements, scenarios such as remote home security monitoring, remote work, and 3GPP and non-
  3GPP access have gradually become core user needs.



         Home Security                 Remote Work                   Hybrid Access
````

</details>

## ページ 4

マルチアクセス協働とAIエージェント

異なるAIエージェント間の協調的なやり取りが、サービスの価値を実現する鍵です。

- モバイルAIエージェントは、カメラのAIエージェントとやり取りし、リアルタイム画像を送信する必要があります。
- 固定・モバイルネットワークの混在アクセスでは、モバイル端末のAIエージェントは固定ネットワークのゲートウェイに依存し、切れ目のないネットワーク切り替えと動的な帯域割り当てを実現します。
- 異なるAIエージェントの効率的な協働には、エージェントのアイデンティティの変換、複数モダリティのデータ交換、不十分なセキュリティ検証などの問題があります。

参照：draft-liu-access-collaboration-agent。

### 確認範囲と制約

- 説明用の機器・アプリ画面の写真に含まれる微小文字は、網羅的な転記・翻訳を行っていない。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Multi-Access Collaboration & AI Agent

 •  Collaborative interaction between different AI agents is the key to realizing service value





•  Mobile AI agents need to interact with camera AI agents to transmit real-time images;
•  In the scenario of mixed access between fixed and mobile networks, the mobile terminal AI agent needs to
   rely on the fixed network gateway to achieve seamless network switching and dynamic bandwidth
   allocation.
•  The effective collaboration of different AI agents faces problems such as agent Identity transformation,
   multimodality data exchange, insufficient security verification and etc.
                                                      draft-liu-access-collaboration-agent
````

</details>

## ページ 5

マルチアクセス協働の場面：ホームセキュリティ

自宅のセキュリティへの遠隔アクセスでは、モバイル端末のAIエージェントと、カメラ、NAS、プリンター、ペット用センサーなどの家庭の固定ネットワーク機器のAIエージェントが協働し、高齢者、子ども、ペットを遠隔で見守ります。役割は、要求の送受信を担うUEエージェントと、指示を実行する家庭内機器のエージェントです。

- 高齢の家族の様子を見たい利用者は、スマートフォンから家庭用カメラの向きを調整できます。異常を検知すると、NASが動画録画を開始します。
- 外出先から子どものために文書を印刷する場合、スマートフォンで家庭のプリンターを起動できます。
- 家庭用カメラの日常監視でペットの異常な行動を検知すると、利用者のスマートフォンに通知します。

図のラベル：UE Agent、Agent Gateway、AI Agent for Home Network Equipment（家庭内ネットワーク機器のAIエージェント）。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
The Multi-Access Collaboration Scenarios

p   Home Security
 In the scenario of remote access for home security, remote care for the elderly, children, and pets is achieved
 through the collaboration between mobile terminal AI agents and home fixed network device AI agents (such as
 cameras, NAS, printers, pet sensors). In the home security scenario, the participating roles include UE
 agent responsible for sending and receiving requests, and home device agents executing instructions.

•  User want to check on elderly family members, they can
   adjust the home camera's view via their smartphone. If
  any anomalies are detected, the NAS device will trigger
   video recording.
• When remotely printing documents for children while
  away from home, users can activate the home printer via
   their smartphone.                              UE         Agent      AI Agent for Home
•  During routine monitoring by the home camera, abnormal     Agent      Gateway   Network Equipment
   pet activity will trigger alerts pushed to the user's
  smartphone.
````

</details>

## ページ 6

マルチアクセス協働の場面：リモートワーク

携帯電話やノートPCなどの端末AIエージェントと、クラウドデスクトップ、プリンター、ビデオ会議端末、ファイル共有サーバーなどのオフィス機器のAIエージェントが協働し、効率的な在宅勤務を実現します。役割は、端末AIエージェントを操作する従業員、指示を送受信する端末AIエージェント、タスクを実行するオフィス機器AIエージェントです。

- 従業員が遠隔で作業する際、端末AIエージェント経由でアクセスを要求し、クラウドデスクトップにすばやく接続して、自分の作業環境とデータを同期します。
- 端末AIエージェントが権限を自動検証し、ファイルを転送し、オフィス機器AIエージェントを起動して印刷を制御できます。
- 会議時には、端末AIエージェントがワンクリックでビデオ会議端末を起動し、同時にファイル共有サーバーを呼び出し、複数人のリアルタイム協働と内容のやり取りを支援します。

図のラベル：従業員のエージェント（Staff Agent）、企業の拠点（Enterprise Branch）、オフィス機器のエージェント（Agent for Office Equipment）。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
The Multi-Access Collaboration Scenarios

p   Remote Work
 In remote work scenarios, efficient telecommuting is achieved through the collaboration between terminal AI
 agents (such as mobile phones and laptops) and office equipment AI agents (including cloud desktops, printers,
 video conferencing terminals, and file-sharing servers). The participating roles are employees who operate
 terminal AI agents, terminal AI agents responsible for sending and receiving instructions, and office
 equipment AI agents that execute tasks.

• When employees need to work remotely, they initiate an
  access request through the terminal AI agent to quickly
   connect to the cloud desktop and synchronize their
   personal office environment and data.
                                                                                     Agent for Office•  The terminal AI agent can automatically verifies                                   Enterprise Branch                                                                                                                                                     .....                                                                                      Equipment   permissions, transmits file data, and wakes up the office
  equipment AI agent to control the printer for output.                                                               Staff
• When holding meetings, the terminal AI agent starts the                                                 Agent
   video conferencing terminal with one click, synchronously
   pulls up the file sharing server, and supports real-time
   multi-person collaboration and content interaction.
````

</details>

## ページ 7

マルチアクセス協働の場面：固定・モバイルのハイブリッドアクセス

固定・モバイル統合アクセスでは、スマートフォンやタブレットなどのモバイル端末と、家庭用光回線終端装置や企業のルーターなどの固定ネットワークゲートウェイが協働し、機器の切れ目のない切り替えと、ネットワーク資源の動的割り当てを実現します。主要な参加者は、モバイル端末を操作する利用者、動的なアクセスを担うモバイル端末の主体、資源のスケジューリングを管理する固定ネットワークゲートウェイの主体です。

- 自宅では、利用者のエージェントは広帯域サービスに固定ネットワークアクセスを優先し、固定ネットワークを通じて他のエージェントと通信します。
- 外出時には、固定ネットワークゲートウェイのエージェントが、あらかじめモバイルネットワークのエージェント機器と調整し、利用者エージェントのサービス情報をモバイルネットワークへすばやく同期します。ネットワーク設定によって切れ目のないハンドオーバーを確保し、利用者のエージェントはモバイルネットワークを介して他のエージェントと通信します。

図のラベル：Network Handover（ネットワークのハンドオーバー）、AI Agent for Fixed Network Gateway（固定ネットワークゲートウェイのAIエージェント）。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
The Multi-Access Collaboration Scenarios

p   Fixed Mobile Hybrid Access
   In fixed-mobile convergence access scenarios, seamless device switching and dynamic network
  resource allocation are achieved through the collaboration between mobile terminal entities (e.g.,
  smartphones, tablets) and fixed-network gateway entities (e.g., home optical network terminals,
  enterprise routers). Key participants include users operating mobile network terminals, mobile terminal
   entities responsible for dynamic access, and fixed-network gateway entities managing resource scheduling.

• When at home, the user agent prioritizes fixed network
  access for high-bandwidth services and conducts agent-
                                                                                 Network Handover   to-agent communication via the fixed network.
• When away from home, the fixed network gateway agent
   preemptively coordinates with mobile network agent
   devices to rapidly synchronize the user agent's service                                                                      AI Agent for Fixed
   information to the mobile network. Network configuration                                                              Network Gateway
  ensures seamless handover, while the user agent
  communicates with other agents via the mobile network.
````

</details>

## ページ 8

AIエージェントプロトコルへの要件

身元認証とリクエスト検証：
エージェント間のやり取りの要求を実行する前に、厳格な身元認証を行う必要があります。プロトコルは、デジタル証明書や相互認証などの高い安全性を持つ認証の仕組みを定義し、正規かつ認可済みのエージェントだけが指示を開始・受信できるようにして、不正アクセスや悪意ある制御を防止するものとします。

エージェントの発見と自動交渉：
エージェントが家庭やオフィスなどのネットワークにアクセスした際、他の利用可能なエージェントと、プリンターやビデオ会議などの提供サービスを自動で発見するものとします。また、機能を自動で交渉し、接続を確立するものとします。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Requirements for AI Agent Protocol


p   Identity Authentication and Request Verification
Before executing interaction requests between agents, strict identity authentication must be performed. The
protocol shall define high-security authentication mechanisms—such as digital certificates and mutual
authentication—to ensure that only legitimate and authorized agents can initiate or receive commands,
thereby preventing unauthorized access and malicious control.


p  Agent Discovery and Automatic Negotiation
When an agent accesses a network (e.g., home or office network), it shall automatically discover other
available agents and their provided services (e.g., printers, video conferencing). It shall also automatically
negotiate capabilities and establish connections.
````

</details>

## ページ 9

AIエージェントプロトコルへの要件

接続の安定性と切れ目のないハンドオーバー：
利用者が家庭のネットワークからモバイルネットワークへ切り替える場面では、プロトコルはAIエージェントのセッションの維持と切れ目のないハンドオーバーに対応し、進行中のサービスの連続動作を保証するものとします。アイデンティティの変換を伴う場合があります。

ローカルの障害復旧とオフライン処理：
ネットワーク障害などが発生した場合、家庭のゲートウェイやNASなどの重要なエージェントは、現在の状態を記録し、ローカルの意思決定とデータ処理の機能を持つものとします。例えば、通信断の後も家庭のセンサーは異常イベントのローカル記録を続け、復旧後に記録したデータをクラウドとモバイル端末へ同期するものとします。

したがって、エージェント通信プロトコルは、マルチアクセス協働の要件をサポートする必要があります。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Requirements for AI Agent Protocol


p  Connection Stability and Seamless Handover
In multi-access collaboration scenarios, when a user switches from a home network to mobile network, the
protocol shall support session persistence and seamless handover for AI agents. This guarantees the
uninterrupted operation of ongoing services. It maybe involove the Identity transformation.

p   Local Disaster Recovery and Offline Processing Capabilities
In the event of network outages or other anomalies, critical agents (e.g., home gateways, NAS) shall record the
current state, possess local decision-making and data processing capabilities. For example, after a
network disconnection, home sensors shall continue to locally record abnormal events and synchronize the
recorded data to the cloud and mobile terminals once the network is restored.



Therefore, agent communication protocol is required to support multi-access collaboration
requirements.
````

</details>

## ページ 10

ありがとうございました。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Thanks!
````

</details>

## 追加の図中文字確認（2026-11-06）

元の画像をローカルOCRと目視で確認した追加の訳です。OCR結果をそのまま転記せず、読めない文字は補っていません。

### ページ 3

図に使われた機器写真を元の埋込画像で確認しました。写真内のHUAWEIは企業・製品のブランド表記として保持します。

タブレット／スマートフォンの写真に含まれる読める中国語UI：
- 为你推荐＝おすすめ。活动＝アクティビティ。张照片＝枚の写真（枚数は端末の重なりで隠れています）。
- 日历＝カレンダー。完成＝完了。全部隐藏＝すべて非表示。
- 学校＝学校。个人＝個人。家人＝家族。工作＝仕事。其他＝その他。
- 中国节假日＝中国の祝祭日。已订阅＝購読済み。生日＝誕生日。
- Siri 在应用中找到的日程＝Siriがアプリ内で見つけた予定。显示已拒绝的日程＝辞退した予定を表示。添加日历＝カレンダーを追加。
- 照片＝写真。相簿＝アルバム。搜索＝検索。
- 上午9:41 1月25日 周五＝午前9:41、1月25日、金曜日。時刻9:41、電池表示100%、ICLOUD、Emily Parker、Siriは原表記のままです。家族カレンダーの共有相手の行は右端が省略されているため、その続きを補っていません。

ホテルのスマートフォン写真は元画像が300×207画素で、画面上部の細い文字を確実に判読できません。図の主要分類（Home Security／Remote Work／Hybrid Access）は本文で訳しています。

### ページ 4

カメラ、ゲートウェイ、サーバー、スマートフォンの2点のイラストを元の埋込画像で確認しました。画面やサーバーに描かれた微小な模様は、原画素で意味のある文字列として判読できず、転記・翻訳していません。図外の本文は既存の全文訳に含まれます。

### 確認に使った原画像（未改変）

- [asset-098.jpeg](<../../source-figure-images/asset-098.jpeg>) — ページ 3。SHA-256: `3af93a067ac6112a5c028577f02fdbe45ed9f71ca8432a59bff5b573465a6bbb`。
- [asset-101.jpeg](<../../source-figure-images/asset-101.jpeg>) — ページ 3。SHA-256: `476cc1ad3a4a86b963ef027d52c926087edc1cd0f3c07ff15adbef0b7268dab5`。
- [asset-102.jpeg](<../../source-figure-images/asset-102.jpeg>) — ページ 4。SHA-256: `e6c1173eaba9e8cd0e6cab95d31d419dc24b1f0d487eb0dcd6e07344aa2cfab4`。
- [asset-103.jpeg](<../../source-figure-images/asset-103.jpeg>) — ページ 4。SHA-256: `3db89e883c6fcc77a5cf26f47b58666dfdd2e34df26b1ce77b34e3a59b84ae8d`。
