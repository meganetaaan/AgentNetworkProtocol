# Framwork for AI Agent Network-ANP.pdf — 日本語対訳

> 歴史的な発表資料の対訳です。現在のANP仕様へ内容を更新していません。PDFの文字レイヤー／PPTXのスライドXMLと発表者ノートから抽出した全文を、ページ・スライドごとに手動翻訳しています。独立した二次校閲は未実施です。
> 図中文字の補足と未確認箇所は各単位に記載しています。コード画像の識別子や鍵は原画像のまま保持し、不確かなOCRを実行可能なコードに置き換えていません。原文自体で切れている内容は補完していません。

- 原本: [standard/IETF124/Framwork for AI Agent Network-ANP.pdf](<../../../../../standard/IETF124/Framwork for AI Agent Network-ANP.pdf>)
- 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`
- 原本SHA-256: `3084955cea75a31459e6aaa6397b7fecd24766233922912ad88dd6526e2ed1da`
- ページ数: 27
- 翻訳方法: エージェントによる全文手動翻訳。モデルAPI呼び出しなし。
- 検証範囲: 全抽出本文・ノートと単位対応。PDF全75ページの概観と埋込画像を確認し、PPTX埋込画像15点の読める文章を補足。PPTXのネイティブ描画と独立した二次校閲は未実施。原画素で判読できない微小文字は残っています。

## ページ 1

AIエージェントネットワークの枠組み

作業部会：Network Working Group
Internet-Draft：draft-zyyhl-agent-networks-framwork-01
公開日：20 October 2025
予定ステータス：Informational（情報提供）
失効日：23 April 2026

著者：Y. Zhou（ANP Open Source Community）、K. Yao（China Mobile）、M. Yu（China Telecom）、M. Han（China Unicom）、C. Li（Huawei）。

原題のFramwork、draft名のframworkという綴りは、原文に基づき保持しています。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Workgroup : Network Working Group
Internet-Draft : draft-zyyhl-agent-networks-framwork-01
Published  : 20 October 2025
Intended Status : Informational
Expires  : 23 April 2026

 Framwork for AI Agent Network


              Authors   : Y . Zhou  ANP Open Source Community
                  K . Yao   China Mobile
               M . Yu    China Telecom
               M . Han   China Unicom
                 C . Li     Huawei
````

</details>

## ページ 2

AIエージェントネットワークの枠組み

要件（requirement）を中心に、アイデンティティ、認可、認証、通信、発見、登録を配置した関係図です。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network


                              Identity
                                                  Authorization

        Registration

                    requirement
                                                                   Authentication


             Discovery

                                     Communication



                                                                                                               2
````

</details>

## ページ 3

AIエージェントネットワークの枠組み

このドラフトの説明図：Domain Aにはネットワーク側エージェントと端末側エージェントがあり、Domain Bとの接続を示しています。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network





                 Network-side Agent


                                                   Domain B                     Domain A





                      Terminal-side Agent


                        Explanation on this draft                                      3
````

</details>

## ページ 4

AIエージェントネットワークの枠組み

役割：AI Agent AとAI Agent B、エージェント登録サーバー（Agent Registration Server）、エージェント通信サーバー（Agent Communication Server）。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network


                         Agent
                          Registration
                          Server


                         Agent
                    Communication  AI Agent A                                    AI Agent B
                          Server


                               Role
                                                                                                               4
````

</details>

## ページ 5

AIエージェントネットワークの枠組み

登録と発見：
①AI Agent BがARSに機能を登録します（Capability Register）。
②ARSがBに応答します。
③AI Agent AがARSで機能を発見します（Capability Discover）。
④ARSがAに一致するエージェントを返します（Matched Agents）。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network





              ③Capability Discover                   ①Capability Register

                   ARS
           ④Matched Agents                     ②Response
  AI Agent A                                               AI Agent B



                         Register and Discover


                                                                                                               5
````

</details>

## ページ 6

AIエージェントネットワークの枠組み

通信・選択肢1：
①AI Agent AがACSにリクエストします。
②ACSがAI Agent Bにリクエストを渡します。
③BがACSに応答します。
④ACSがAに応答を返します。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network





       ① Request             ② Request
                   ACS
       ④ Response             ③ Response
                                                           AI Agent B  AI Agent A


                     Communication - Option 1


                                                                                                               6
````

</details>

## ページ 7

AIエージェントネットワークの枠組み

通信・選択肢2：AI Agent AとAI Agent Bが直接やり取りします。図では②リクエスト、③応答と表示しています。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network





                 ② Request


                ③ Response
                                                           AI Agent B  AI Agent A


                     Communication - Option 2


                                                                                                               7
````

</details>

## ページ 8

AIエージェントネットワークの枠組み

デジタルアイデンティティの構成要素：DIDとVC。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network


       DID        VC



                              Digital
                           Identity
                  Components


                                                                                                               8
````

</details>

## ページ 9

AIエージェントネットワークの枠組み

DIDの例：`did:web:alice.com:port/path`（原文表記）。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network





                                        did:web:alice.com:port/path       DID





                                                                                                               9
````

</details>

## ページ 10

AIエージェントネットワークの枠組み

VCの例。次のコード内の識別子、URL、日時、値は原本に従います。
- `@context`：`https://www.w3.org/2018/credentials/v1`、`https://www.w3.org/2018/credentials/examples/v1`
- `id`：`http://example.edu/credentials/1872`
- `type`：`VerifiableCredential`、`AlumniCredential`
- `issuer`：`https://example.edu/issuers/565049`
- `validFrom`：`2010-01-01T19:23:24Z`
- `credentialSubject.id`：`did:example:ebfeb1f712ebc6f1c276e12ec21`
- `alumniOf.id`：`did:example:c276e12ec21ebfeb1f712ebc6f1`
- `name`：`Example University`（`lang: en`）、`Exemple d’Université`（`lang: fr`）。

原本のコードは表示・抽出の都合で断片として収録しており、この訳は構文の正しいJSONを新たに定義するものではありません。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network


                                                         {
                                           "@context": [
                                               "https://www.w3.org/2018/credentials/v1",
                                              "https://www.w3.org/2018/credentials/examples/v1"
                                                                      ],
                                                      "id": "http://example.edu/credentials/1872",
                                                "type": ["VerifiableCredential", "AlumniCredential"],
                                                   "issuer": "https://example.edu/issuers/565049",
                                              "validFrom": "2010-01-01T19:23:24Z",
                                                "credentialSubject": {      VC
                                                        "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
                                               "alumniOf": {
                                                        "id": "did:example:c276e12ec21ebfeb1f712ebc6f1",
                                           "name": [
                                                      {"value": "Example University", "lang": "en"},
                                                      {"value": "Exemple d’Université", "lang": "fr"}
                                                                   ]
                                                              }
                                                         }
                                                                                                              10
````

</details>

## ページ 11

AIエージェントネットワークの枠組み

エージェント記述文書（Agent Description Document）が、エージェントへの入り口（Agent Entry Point）となります。

形式1：自然言語。
形式2：JSON、JSON-LD、その他の構造化形式。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network





               Agent
                               Agent Entry Point               Description
                    ---------------

            Document



       Format 1 : Natual Language

       Format 2 : Structured format(e.g. : JSON,JSON-LD,Other structured formats)

                                                                                                              11
````

</details>

## ページ 12

AIエージェントネットワークの枠組み

エージェント記述文書が参照するもの：
- 情報（Information）：テキスト、画像、動画、音声、その他のファイル。
- インターフェース（Interface）：自然言語インターフェース／構造化インターフェース。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network



                                               Information

                                          Text/Image/Video
                                         Audio/Other files               Agent
               Description
                    ---------------

            Document                                                    Interface

                                            Natural Language/
                                           Structured Interface




                                                                                                              12
````

</details>

## ページ 13

AIエージェントネットワークの枠組み

エージェント記述文書の要素：
- セキュリティの仕組みは必須。グローバルスコープ、リソース固有スコープ、優先順位の規則を含みます。
- 完全性の検証は必須。証明（Proof）はVCに適合するものとします。
- その他の要素。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network




                                      Security Mechanism : Mandatory
                                         Include : Global Scope,Recource-Specific
               Agent                 Scope,Precedence Rule
               Description
                    ---------------                Integrity Verification : Mandatory
                                        Proof : VC-compliant
            Document

                 …





                                                                                                              13
````

</details>

## ページ 14

AIエージェントネットワークの枠組み

登録：自己宣言方式。

AI AgentsがAD Docを公開し、画像（IMAGE）、JSON、NLI、APIなどへつなげます。

公開場所：`/.well-known/agent-descriptions`。参照：RFC 8615。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network

              AI Agents
                                    IMAGE               NLI



                  AD
                                --------                JSON            JSON
                    Doc


                 /.well-known/
                  agent-descriptions,
                                        JSON               API              RFC 8615


                 Registration : Self-Declaration Mode                         14
````

</details>

## ページ 15

AIエージェントネットワークの枠組み

登録：集中登録方式。AI Agentsが、名前、デジタル識別子、説明、アドレス、バージョン、機能、サービス、スキル、インターフェース、セキュリティ情報を、Agent Registration Serverに登録します。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network


            AI Agents
               ----------------------
           Name
             Digital Identifier
             Description
                           Register                               Agent              Address
               Version                                  Registration
              Capabilities
               Services                    Server
                     Skills
               Interfaces
         Security Information

             Registration : Centralized Registration Mode                   15
````

</details>

## ページ 16

AIエージェントネットワークの枠組み

発見：能動的発見方式。クローラー（Crawler）が情報を収集し、検索エンジン（Search Engine）につなげます。自己宣言方式に対応します。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network





                  Crawler                         Search
                         Engine





               Discovery : Proactive Discovery Mode

                                                                                                              16                  ( Corresponding to Self-Declaration Mode )
````

</details>

## ページ 17

AIエージェントネットワークの枠組み

集中照会方式：Agent Registration Serverへの登録（Register）に対し、利用側が照会・照合（Query Matching）を行い、結果（Result Feedback）を受け取ります。集中登録方式に対応します。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network





                                              Query
                Agent           Matching
                Registration

                                                       Result                 Server
                                              Feedback

              Register



                      Centralized Query Mode

                                                                                                              17             ( Corresponding to Centralized Registration Mode )
````

</details>

## ページ 18

AIエージェントネットワークの枠組み

通信方式（メッセージ方式）：
- P2Pによる直接通信。
- ACSを介するP2Pの間接通信。
- Groupによる直接通信。
- ACSを介するPUB/SUBの間接通信。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network



                              ACS


      P2P ( Direct Communication )              P2P ( Indirect Communication )



                              ACS


     Group ( Direct Communication )           PUB/SUB ( Indirect Communication )


                                                                                                              18            Communication Mode ( Message Mode )
````

</details>

## ページ 19

AIエージェントネットワークの枠組み

マルチモーダル：TXT/FILE/IMAGE/VIDEO/AUDIOを扱います。モダリティ認識、戦略管理、優先順位の制御を含みます。

優先順位の表示：TXT（Priority01）、IMAGETXT（Priority02）、VIDEOTXT（Priority03）。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network




                          TXT/FILE/IMAGE/VIDEO/AUDIO
                                            ( Modal Recognition/Strategy
                        Management/ Priority Control )





                                TXT ( Priority01 )

                           IMAGETXT ( Priority02 )

                             VIDEOTXT ( Priority03 )




                                                                                                              19                         Multimodality
````

</details>

## ページ 20

AIエージェントネットワークの枠組み

プロトコルスタックに関する考察：
1. AI Agent Application：遠隔ケア、ホームセキュリティ、スマートホームなど。
2. AI Agent Comm Protocol Layer（ACPL）：JSON、JSON-LD、YAML、XMLなど。
3. Application Layer（AL）：HTTP、SIPなど。
4. Transmission Layer（TL）：UDP、TCP、QUICなど。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network


                               AI Agent Application
                  (e.g. , Remote Care, Home Security, Smart Home, … )


                      AI Agent Comm Protocol Layer ( ACPL )
                          (e.g. , JSON, JSON-LD, YAML, XML,… )


                               Application Layer ( AL )
                                    (e.g. , HTTP, SIP, … )


                           Transmission Layer ( TL )
                                 (e.g. , UDP, TCP, QUIC, … )



                                                                                                              20                   Protocol Stack Considerations
````

</details>

## ページ 21

AIエージェントネットワークの枠組み

タスクの定義、計画と分解、状態追跡、結果通知。複雑なタスク（complex task）を複数の単純なタスク（single task）へ分解する図です。

スタックの表示：Application、ACPL、TASK、SESSION、ROUTING、AL、TL。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network




                                                single                               Application
                 complex                                              task
                                                           ACPL                      task
                                                      single
                                                           TASK                                                    task
                          single
                                                           SESSION
                          task
                                                         ROUTING


                                                                AL

                                                                    TL

            Task definition, planning and decomposition,

                                                                                                              21                status tracking, and result notification
````

</details>

## ページ 22

AIエージェントネットワークの枠組み

セッション管理：
- 直接通信：AliceとBobが、それぞれのセッション一覧を持ち、Seesion ID（原文表記）を用いて通信します。
- 間接通信：ACSが全体のSession List（All）を持ち、Alice、Bobとの間でSeesion IDとQos Reqを扱います。Qos ReqはQoS要件を示します。

スタックの表示：Application、ACPL、TASK、SESSION、ROUTING、AL、TL。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network



                              Seesion ID
        Sessio                                             Sessio                                                                                    Application
       n List                                    n List
                     Alice                   Bob                     ACPL         (Alice)                                           (Bob)

                          Direct Communication                         TASK
                                                           SESSION

                                                         ROUTING
               ACS             Seesion ID                        Seesion ID
                       Session List(All)
            Qos Req                      Qos Req                   AL
       Alice                                       Bob                                                                    TL
                          Indirect Communication



                                                                                                              22                       Session Management
````

</details>

## ページ 23

AIエージェントネットワークの枠組み

ルーティングI：IDに基づく方式。
- 直接通信：AliceとBobがMapping Table（対応表）を持ち、DIDとIP Addressを対応付け、IP Networkを通じて通信します。
- 間接通信：ACSがMapping Tableを持ち、Alice、Bob、EmmaのDIDを扱います。

スタックの表示：Application、ACPL、TASK、SESSION、ROUTING、AL、TL。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network


              DID                            DID
                                   IP Network
    Mapp                                   Mapp                                                                                    Application
        ing    IP Address                            IP Address   ing
                                                           ACPL      Table               Alice            Bob             Table

                          Direct Communication                         TASK
                                                           SESSION

                                            DID                  ROUTING
               ACS                     Bob              DID
                     Mapping Table       DID
                                                                AL                                           Emma
       Alice                                                                    TL
                          Indirect Communication



                                                                                                              23                       Routing I : ID-based
````

</details>

## ページ 24

AIエージェントネットワークの枠組み

ルーティングII：意味に基づく方式。Aliceが検索エンジン（Search Engine）で照会・照合し、結果を受け取って、IP Network上のBobと通信します。

スタックの表示：Application、ACPL、TASK、SESSION、ROUTING、AL、TL。

### 図中文字の補足訳

図の斜め矢印の追加ラベル：Capability/Attribute＝機能／属性、IP address of the target agent＝宛先エージェントのIPアドレス。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network


                     Search                                   Application
                     Engine                          ACPL

                                                           TASK

                                                           SESSION

                                                         ROUTING

                                   IP Network
                                                                AL
           Alice                                 Bob
                                                                    TL




                                                                                                              24                   Routing II : Semantic-based
````

</details>

## ページ 25

AIエージェントネットワークの枠組み

セキュリティに関する考察：タスクのプライバシー、アイデンティティ、認証／認可、発見のプライバシー、ドメインをまたぐセキュリティ。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network




                                Task Privacy
                                            Identity                                  Authentication   /Authorization
                                                                                                    Security                                                                                                                                                                    Cross-domain                                         Discovery Priacy





                                                                                                              25                       Security Considerations
````

</details>

## ページ 26

AIエージェントネットワークの枠組み：まとめ

- ARSとACSを含むAIエージェント通信の枠組みを紹介しました。
- アイデンティティ：DID＋VC。
- エージェント記述：自然言語または構造化形式。
- 二つの登録・発見方式：自己宣言と集中型。
- 二つの通信方式：直接方式と、ACSを介する間接方式。
- マルチモーダル対応：txt、ファイル、リアルタイムの音声／動画。
- タスク管理：タスクの分解、状態の同期。
- 二つのルーティング方式：IDベース、意味ベース。
- プロトコルスタック：アプリケーション層、トランスポート層。
- セキュリティに関する考察。

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Framwork for AI Agent Network


  Summary
   Introduce AI Agent Communication framework, including ARS and ACS.
   Identity: DID+VC.
  Agent Description: Natural language or Structured.
  Two registration and discovery mode: Self-Declaration and Centralized.
  Two communication mode: Direct mode and Indirect mode(through ACS).
   Multimodality support: txt, file, real-time audio/video
  Task management: task decomposition, status sync
  Two routing mode: ID-based and Semantic-based
   Protocol stack: Application layer, transport layer
   Security considerations




                                                                                                              26
````

</details>

## ページ 27

ありがとうございました。

作業部会：Network Working Group
Internet-Draft：draft-zyyhl-agent-networks-framwork-01
公開日：20 October 2025
予定ステータス：Informational（情報提供）
失効日：23 April 2026

著者：
- Y. Zhou（ANP Open Source Community）、zynetzy1@gmail.com
- K. Yao（China Mobile）、yaokehan@chinamobile.com
- M. Yu（China Telecom）、yumh1@chinatelecom.cn
- M. Han（China Unicom）、hanmy12@chinaunicom.cn
- C. Li（Huawei）、c.l@huawei.com

<details>
<summary>対応する原文抽出（原本のレイアウト順とは異なる場合があります）</summary>

````text
Wrokgroup : Network Working Group
Internet-Draft : draft-zyyhl-agent-networks-framwork-01
Published  : 20 October 2025
Intended Status : Informational
Expires  : 23 April 2026

                                                    Authors
                         Y . Zhou  ANP Open Source Community
                                           E-mail:zynetzy1@gmail.com
                         K . Yao   China Mobile
                                          E-mail:yaokehan@chinamobile.com  Thanks !
                    M . Yu    China Telecom
                                           E-mail:yumh1@chinatelecom.cn
                    M . Han   China Unicom
                                          E-mail:hanmy12@chinaunicom.cn
                       C . Li     Huawei
                                            E-mail:c.l@huawei.com
````

</details>
