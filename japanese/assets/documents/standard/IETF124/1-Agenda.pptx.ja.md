# 1-Agenda.pptx — 日本語対訳

> 歴史的な発表資料の対訳です。現在のANP仕様へ内容を更新していません。PDFの文字レイヤー／PPTXのスライドXMLと発表者ノートから抽出した全文を、ページ・スライドごとに手動翻訳しています。独立した二次校閲は未実施です。
> 図中文字の補足と未確認箇所は各単位に記載しています。コード画像の識別子や鍵は原画像のまま保持し、不確かなOCRを実行可能なコードに置き換えていません。原文自体で切れている内容は補完していません。

- 原本: [standard/IETF124/1-Agenda.pptx](<../../../../../standard/IETF124/1-Agenda.pptx>)
- 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`
- 原本SHA-256: `5ba078689b449ab4c94caf61e30ecbf97984b1aba60a16e8584e6beb199bf362`
- スライド数: 15
- 翻訳方法: エージェントによる全文手動翻訳。モデルAPI呼び出しなし。
- 検証範囲: 全抽出本文・ノートと単位対応。PDF全75ページの概観と埋込画像を確認し、PPTX埋込画像15点の読める文章を補足。PPTXのネイティブ描画と独立した二次校閲は未実施。原画素で判読できない微小文字は残っています。

## スライド 1

サイドミーティング：AIエージェントネットワークの要件とプロトコル

November 2025。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Side meetingAI-Agent Network Requirements and Protocols 
November 2025
````

</details>

## スライド 2

Note Well（参加にあたっての注意）

IETFに参加することにより、IETFの手続きと方針に従うことに同意します。このNote Wellは、それらの方針の一部を再確認するものです。リンク付きの本文は、www.ietf.org/note-well または下のQRコードを参照してください。

IETFの参加者には、常に専門家として振る舞い、同僚に敬意と礼節をもって接することが求められます。RFC 7154: IETF Guidelines for Conductと、IETF Anti-Harassment Policyを参照してください。行動について懸念があれば、守秘義務と広い対応権限を持つOmbudsteamに連絡してください。詳細はRFC 7776: IETF Anti-Harassment Proceduresに定められています。

IETFへの貢献物（RFC 5378: Rights Contributors Provide to the IETF Trustで定義）が、自分、雇用主、スポンサーが所有または管理する特許や特許出願の対象であると知っている場合、その事実を開示するか、議論に参加しない必要があります。RFC 8179: Intellectual Property Rights in IETF Technologyを参照してください。

詳細な手続きは、RFC 2026: Internet Standards Process、RFC 2418: IETF Working Group Guidelines and Procedures、およびそれらの更新文書を参照してください。

IETFは、IETF Privacy Statementに記載された個人情報を含め、IETF活動の文書、音声、動画、写真の記録を日常的に公開します。

助言が必要な場合は、Working Groupの議長またはArea Directorに相談してください。

### 発表者ノートの訳

発表者ノート

IETF Note Wellは、IETFの各作業セッションの開始時に提示するべきです。以下の案内は、IETF 120でのIETF法律顧問の発表を基にしています。

行うこと：
- 次へ進む前に、参加者がスライドを十分に読む時間を確保してください。
- Note Wellで扱う内容を、「行動、プライバシー、知的財産権に関するIETFの方針」のように大まかに説明してください。
- 参加や貢献の前に、リンク先の方針や文書をすべて詳しく読むよう促してください。
- 質問や懸念の連絡先（IETF Executive DirectorまたはOmbudsteam）を説明してください。

行わないこと：
- Note Wellの情報の重要性や関連性を軽視しないでください。
- 方針の話題や内容について、その意味を解釈したり、実質的な議論に入ったりしないでください。
- Note Wellだけで、参加者が知るべき情報をすべて伝えられると説明しないでください。
- 会議の場で質問や懸念に対処しないでください。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Note Well
By participating in the IETF you agree to follow IETF processes and policies. This Note Well is a reminder of some of those policies. For a linked version of this text, please visit www.ietf.org/note-well or use the QR code below.
IETF participants are expected to behave in a professional manner and extend respect and courtesy to their colleagues at all times (see RFC 7154: IETF Guidelines for Conduct and IETF Anti-Harassment Policy). If you have any concerns about behavior, please contact the Ombudsteam who have a duty of confidentiality and extensive powers to act, as set out in RFC 7776: IETF Anti-Harassment Procedures.
If you are aware that any IETF contribution (as defined in RFC 5378: Rights Contributors Provide to the IETF Trust) is covered by patents or patent applications that are owned or controlled by you, your employer or your sponsor, you must disclose that fact, or not participate in the discussion (see RFC 8179: Intellectual Property Rights in IETF Technology).
For detailed process information consult RFC 2026: Internet Standards Process and RFC 2418: IETF Working Group Guidelines and Procedures and updates to those.
The IETF routinely makes public written, audio, video, and photographic records of IETF activities, including your personal information as set out in the IETF Privacy Statement. 
For advice, please talk to Working Group chairs or Area Directors.
````

原文の発表者ノート：

````text
The IETF Note Well should be shown at the start of every IETF working session. The guidance below is adapted from IETF legal counsel presentation during IETF 120

DO
Do make sure people have enough time to read through the slide before you move on,
Do give a high-level summary of what’s covered in the Note Well: “IETF policies on conduct, privacy and IPR.”,
Do encourage people to read through all the linked policies & documents in detail before participating or contributing,
Do explain where people can direct questions or concerns (IETF Executive Director or Ombudsteam).
DON'T
Don’t dismiss the importance or relevance of any of the information on the Note Well.
Don’t interpret the meaning or get into the substance of any of the topics or content of the policies.
Don’t communicate that the Note Well conveys all the information participants need to know.
Don’t address questions or concerns in the meeting itself.
````

</details>

## スライド 3

議題

- 10min：議題と導入（Lionel）。
- 60min：発表。
  - 15mn：AIエージェント通信のユースケースと要件（China Telecom）。
  - 10mn：通信分野のAIエージェントのユースケースと要件（China Mobile）。
  - 10mn：AIエージェントプロトコルのマルチアクセス協働要件（China Unicom）。
  - 25mn：AIエージェントネットワークの枠組み（ANP）。
- 40min：提案中の憲章に追加する事項はあるか。
- 10min：結論と次の手順。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Agenda
10min: Agenda and Introduction (Lionel)
60min: Presentations
15mn: AI Agents Communication Use Cases and Requirements (China Telecom)
10mn: Telecom AI Agent Use cases and Requirements (China Mobile) 
10mn: Multi-Access Collaboration Requirements for AI Agent Protocol (China Unicom)
25mn: AI agent networks framework (ANP)
40min: Additional items for the proposed charter? 
10min: Conclusions and Next Steps
3
````

</details>

## スライド 4

AI Protocolsサイドミーティング（Tuesday, Nov 4）の成果

たたき台となる憲章の議論：
https://github.com/jdrosen/aiproto-wg/blob/3f1cb59b980f31326a1c3965c2c40ad4badeffd1/charter.txt

現在の憲章の項目：
(1) AIエージェント同士、またはAIエージェントと長時間動作するツールとの間で、長期間のセッションを作成・維持する、標準化過程のAIエージェントセッションプロトコル。
(2) 一つのAIエージェントが、別のAIエージェントのサービスを呼び出せるAgent-to-Agentプロトコル。
(3) 利用者の代理として動くAIエージェントが呼び出す操作を、人間の利用者が確認できるようにするプロトコル。
(4) AIエージェントが利用者に代わって実行することを認められた特定の操作にバインドされた、きわめて限定的なスコープのOAuthトークンを取得・交換できるプロトコル。

### 原資料のリンク先（属性も含めて保持）

- https://github.com/jdrosen/aiproto-wg/blob/3f1cb59b980f31326a1c3965c2c40ad4badeffd1/charter.txt

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Output of AI Protocols side meeting (Tuesday, Nov 4)
Discussion on the Strawman charter:
https://github.com/jdrosen/aiproto-wg/blob/3f1cb59b980f31326a1c3965c2c40ad4badeffd1/charter.txt 
Current charter items
(1) A standards track AI Agent session protocol for creation and maintenance of long-lived sessions between AI agents, or between AI agents and tools that have long-lived operation.
(2) An Agent-to-Agent protocol that allows one AI Agent to invoke the services of another AI Agent. 
(3) A protocol for enabling human users to confirm operations invoked by AI agents acting on their behalf. 
(4) A protocol that allows an AI Agent to obtain and exchange OAuth tokens with extremely limited scopes, bound to the specific operations that the AI Agent is permitted to perform on behalf of the user. 
4
````

</details>

## スライド 5

このサイドミーティングの目的

- 通信事業分野の具体的なユースケースと要件を提示する。
- 現在提案中の憲章で扱っていない追加の観点を特定する。
- 憲章更新の提案の可能性を検討する。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Objectives of this side meeting
Present some specific telco use cases and requirements
Identify additional aspect(s) not addressed in the current proposed charter
Potential proposal for charter update.
5
````

</details>

## スライド 6

3GPPの6G作業計画

図の年軸：2024、2025、2026、2027、2028、2029。

実現可能性調査の段階（Rel-20）と、規範仕様の段階（Rel-21）。Rel-21の正確な日程は未定（TBD、原図の*印）。

両段階の項目：サービス要件、セキュリティ、メディア、O&M（運用・保守）、アプリケーション支援機能、プロトコル、アーキテクチャ。

訳注：本文の項目と年軸を訳したもので、図形の位置から未定の日程を補ってはいません。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
3GPP 6G workplan 
6
Service requirements
Security
Media
O&M
Application Enablers
Protocols
Architecture
Service requirements
Security
Media
O&M
Application Enablers
Protocols
Architecture
2024
2025
2026
2027
2028
2029
Feasibility Study Phase (Rel-20)
Normative Phase (Rel-21)
*Exact timeline for Rel-21 TBD
*
````

</details>

## スライド 7

状況

- 進行中の調査は、6Gの範囲におけるAIエージェント通信の可能性を示しています。
- アーキテクチャ、機能、プロトコルに関する検討は、今後数か月で行われます。
- 3GPPが6Gの範囲で複数AIエージェントに基づくシステムを正式に採用する場合、エージェント同士、およびエージェントと外部ツールとの間の安全で信頼できる通信を支える、標準的な解決策が必要です。
- ネットワーク内に加え、ネットワーク間や第三者の基盤とのやり取りにも、標準的な解決策が必要です。
- IETFと3GPPの緊密な連携が期待されます。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Status
Ongoing study demonstrates the potential of AI agent communication in the scope of 6G.
Study on architecture, functional and protocol related aspects will be studied in the upcoming months
If a multi-AI agent-based system is formally adopted by 3GPP in the scope of 6G, standard solutions will be required to support secure and reliable communication between agents and between agents and external tools. 
Standard solutions for intra-network but also for inter-network and interaction with 3rd-party platforms. 
Close coordination between IETF and 3GPP is expected
7
````

</details>

## スライド 8

議題

- 10min：議題と導入（Lionel）。
- 60min：発表。
  - 15mn：AIエージェント通信のユースケースと要件（China Telecom）。
  - 10mn：通信分野のAIエージェントのユースケースと要件（China Mobile）。
  - 10mn：AIエージェントプロトコルのマルチアクセス協働要件（China Unicom）。
  - 25mn：AIエージェントネットワークの枠組み（ANP）。
- 40min：提案中の憲章に追加する事項はあるか。
- 10min：結論と次の手順。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Agenda
10min: Agenda and Introduction (Lionel)
60min: Presentations
15mn: AI Agents Communication Use Cases and Requirements (China Telecom)
10mn: Telecom AI Agent Use cases and Requirements (China Mobile) 
10mn: Multi-Access Collaboration Requirements for AI Agent Protocol (China Unicom)
25mn: AI agent networks framework (ANP)
40min: Additional items for the proposed charter? 
10min: Conclusions and Next Steps
8
````

</details>

## スライド 9

AIエージェント通信のユースケースと要件。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
AI Agents Communication Use Cases and Requirements
9
````

</details>

## スライド 10

通信分野のAIエージェントのユースケースと要件。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Telecom AI Agent Use cases and Requirements
10
````

</details>

## スライド 11

マルチアクセス協働。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Multi-Access Collaboration
11
````

</details>

## スライド 12

議題

- 10min：議題と導入（Lionel）。
- 60min：発表。
  - 25mn：AIエージェントネットワークの枠組み（ANP）。
  - 10mn：AIエージェントプロトコルのマルチアクセス協働要件（China Unicom）。
  - 15mn：AIエージェント通信のユースケースと要件（China Telecom）。
  - 10mn：通信分野のAIエージェントのユースケースと要件（China Mobile）。
- 40min：提案中の憲章に追加する事項はあるか。
- 10min：結論と次の手順。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Agenda
10min: Agenda and Introduction (Lionel)
60min: Presentations
25mn: AI agent networks framework (ANP)
10mn: Multi-Access Collaboration Requirements for AI Agent Protocol (China Unicom)
15mn: AI Agents Communication Use Cases and Requirements (China Telecom)
10mn: Telecom AI Agent Use cases and Requirements (China Mobile)
40min: Additional items for the proposed charter? 
10min: Conclusions and Next Steps
12
````

</details>

## スライド 13

提案中の憲章で現在特定されている項目（1/2）

(1) AIエージェント同士、またはAIエージェントと長時間動作するツールとの間で、長期間のセッションを作成・維持する、標準化過程のAIエージェントセッションプロトコル。これらのセッションでは、モデルの文脈、ツール呼び出し結果、チャットメッセージを含むデータを双方向に交換できます。プロトコルは、高い拡張性と信頼性を持つセッション管理を実現し、ネットワークやサーバーの障害が発生しても継続し、適切に復旧できるようにします。音声などのリアルタイムデータ、チャットのような準リアルタイムデータ、ツール呼び出しの入出力のような非リアルタイムデータを、セッション中に同時並行で交換できます。

このプロトコルは、追加のプロトコルをその上に構築できる基盤の層です。想定されるユースケースに基づき、AIエージェントセッションプロトコルはwebtransportやMOQなどの現代的なIETFアプリケーション転送プロトコルを使用する見込みです。また、Model Context Protocol（MCP）やAgent-to-Agent（A2A）のようなIETF以外のプロトコルからも利用可能でなければならず、適切な階層化によって、あらゆるアプリケーションで使えるようにします。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Current items identified in the proposed charter 1/2
(1) A standards track AI Agent session protocol for creation and maintenance of long-lived sessions between AI agents, or between AI agents and tools that have long-lived operation. These sessions allow for the bidirectional exchange of data, incuding model context, tool call results, and chat messages. The protocol will facilitate highly scalable and reliable session management, able to survive network and server failures while gracefully recovering. It is capable of exchanging real-time data (such as voice), semi-real-time data like chat, and non-real-time data like tool call inputs and outputs, all concurrently during the session.
This protocol is a foundational layer on top of which additional protocols can be built. It is anticipated that the AI Agent session protocol will make use of modern IETF application transfer protocols, such as webtransport or MOQ, based on the anticipated use cases. The protocol must also be usable by non-IETF protocols, like the Model Context Protocol (MCP) or Agent-to-Agent (A2A) protocol, with the appropriate layering enabling its usage by any application
13
````

</details>

## スライド 14

提案中の憲章で現在特定されている項目（2/2）

(2) 一つのAIエージェントが別のAIエージェントのサービスを呼び出せるAgent-to-Agentプロトコル。このプロトコルは、音声、動画、画像、チャットを含む、エンドユーザーからの利用者メッセージの交換を可能にします。基本的なライフサイクル管理を提供し、呼び出し先エージェントのサービスの確立、更新、終了を可能にします。このA2AプロトコルはAIエージェントセッションプロトコルを使用し、その上に規定される最初のアプリケーションとなります。現在Linux FoundationのもとにあるA2Aプロトコルを土台にした、次世代版になることが想定されています。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Current items identified in the proposed charter 2/2
(2) An Agent-to-Agent protocol that allows one AI Agent to invoke the services of another AI Agent. This protocol will allow for the exchange of user messages from the end user, including voice, video, images and chat. It will provide basic lifecycle management, enabling the establishment, update, and termination of the services of the downstream agent. This A2A protocol will make use of the AI Agent session protocol, and be the first application specified on top of it. It is anticipated that this protocol would be a next-gen version of the A2A protocol currently under the auspices of the Linux Foundation, building upon that foundation. 
14
````

</details>

## スライド 15

議題

- 10min：議題と導入（Lionel）。
- 60min：発表。
  - 25mn：AIエージェントネットワークの枠組み（ANP）。
  - 10mn：AIエージェントプロトコルのマルチアクセス協働要件（China Unicom）。
  - 15mn：AIエージェント通信のユースケースと要件（China Telecom）。
  - 10mn：通信分野のAIエージェントのユースケースと要件（China Mobile）。
- 40min：提案中の憲章に追加する事項はあるか。
- 10min：結論と次の手順。

### 確認範囲と制約

- PPTXのネイティブ描画は未実施。埋込画像は原画素で確認しましたが、スライド全体の配置・重なり・フォントは未検証です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Agenda
10min: Agenda and Introduction (Lionel)
60min: Presentations
25mn: AI agent networks framework (ANP)
10mn: Multi-Access Collaboration Requirements for AI Agent Protocol (China Unicom)
15mn: AI Agents Communication Use Cases and Requirements (China Telecom)
10mn: Telecom AI Agent Use cases and Requirements (China Mobile)
40min: Additional items for the proposed charter? 
10min: Conclusions and Next Steps
15
````

</details>

## 追加の図中文字確認（2026-11-06）

元の画像をローカルOCRと目視で確認した追加の訳です。OCR結果をそのまま転記せず、読めない文字は補っていません。

### スライド 9

埋込画像の全文訳：まとめ――6GのAIエージェントのユースケースに必要な主要要件。

1. AIエージェント通信の枠組み：挙げられたすべての場面を実現するために、必要な構成要素を統合できること。
2. AIエージェントのアイデンティティ：AIエージェントのデジタルアイデンティティに対する、安全な認証、認可、管理の仕組み。
3. 効率的な協働：異なるAIエージェント同士、およびAIエージェントとツールとの効率的な協働。
4. 登録と発見：端末内AIエージェント、第三者のAIエージェント、ネットワークAIエージェント、ツール。
5. 意味に基づくルーティング：アイデンティティ、利用者の文脈、意図など、アプリケーション層の意味に基づく経路判断。
6. セキュリティ：データ保護と利用者の同意。

画像内のページ番号は13。ロゴの5G／helloは原表記を保持します。

### スライド 10

埋込画像の全文訳：通信コアネットワークにおけるエージェントプロトコルの適用可能性。

- アイデンティティの登録・発行・発見：エージェント、ツール、その他のサービス／資源には、IDの観点で類似点があります。関連するネットワーク機能（NF）の拡張候補：UDM、UDR、SMFなど。
- 認証と認可：関連するNFの拡張候補：AUSF、SMFなど。
- HITL（Human-in-the-Loop）による確認：コアネットワーク機能が呼び出す、人間の確認へのリダイレクト。関連するNFの拡張候補：PCF、NEF、UPFなど。
- 動的なグループとリアルタイム通信：関連するNFの拡張候補：AMF、SMFなど。

### スライド 11

埋込画像の全文訳：AIエージェントプロトコルへの要件。

**身元認証とリクエスト検証**
エージェント間のやり取りの要求を実行する前に、厳格な身元認証を行う必要があります。プロトコルは、デジタル証明書や相互認証などの高い安全性を持つ認証の仕組みを定義し、正規かつ認可済みのエージェントだけが指示を開始・受信できるようにして、不正アクセスや悪意ある制御を防止するものとします。

**エージェントの発見と自動交渉**
エージェントが家庭やオフィスなどのネットワークにアクセスした際、他の利用可能なエージェントと、プリンターやビデオ会議などの提供サービスを自動で発見するものとします。また、機能を自動で交渉し、接続を確立するものとします。

**接続の安定性と切れ目のないハンドオーバー**
利用者が家庭のネットワークからモバイルネットワークへ切り替える場面では、プロトコルはAIエージェントのセッションの維持と切れ目のないハンドオーバーに対応するものとします。これにより、進行中のサービスの連続動作が保証されます。アイデンティティの変換を伴う場合があります。

**ローカルの障害復旧とオフライン処理**
ネットワーク障害などが発生した場合、家庭のゲートウェイやNASなどの重要なエージェントは現在の状態を記録し、ローカルの意思決定とデータ処理の機能を持つものとします。例えば、通信断の後も家庭のセンサーは異常イベントのローカル記録を続け、復旧後に記録したデータをクラウドとモバイル端末へ同期するものとします。

### 確認に使った原画像（未改変）

- [image1.png](<../../source-pptx-media/1-Agenda/image1.png>) — 参照スライド 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15。SHA-256: `e2c70c565100b681a6cb04ad9d111567da5bb14f6393b20e68c1f5ca51e75296`。
- [image6.png](<../../source-pptx-media/1-Agenda/image6.png>) — 参照スライド 10。SHA-256: `ceabc1c337836acd65aed5ee0f987f9f2cba19c4233d6cab4b90956391130624`。
- [image5.png](<../../source-pptx-media/1-Agenda/image5.png>) — 参照スライド 9。SHA-256: `a6de1971bff240b8a8c0503ffa624f74a3ed808e8abb9b94515be8fd35ec6955`。
- [image7.png](<../../source-pptx-media/1-Agenda/image7.png>) — 参照スライド 11。SHA-256: `758c03c645c2507ca2864247d68badb57af43400a0c809a0e96dd2252b227884`。
- [image3.jpg](<../../source-pptx-media/1-Agenda/image3.jpg>) — 参照スライド 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15。SHA-256: `a1f9ab81d46202cebed92ee209dd7d8a4ef568d28ca05a1716c653c43dbdf387`。
- [image2.png](<../../source-pptx-media/1-Agenda/image2.png>) — 参照スライド 2。SHA-256: `2a39c25349d213c50e9bba319a3223556082eee2d16783f8b65d9fbc4eca1a53`。
- [image4.png](<../../source-pptx-media/1-Agenda/image4.png>) — 参照スライド 2。SHA-256: `f36dc9ae924a4c2a1eb02da1f3d43c449d205aadd6ff428c111d2ac463fed8d8`。
