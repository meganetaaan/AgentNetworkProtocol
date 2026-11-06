<div align="center">

[English](../README.md) | [中国語](../README.cn.md) | 日本語

</div>

# Agent Network Protocol（ANP）

ANPは、エージェントの識別、命名、発見、交渉、安全なメッセージ交換、アプリケーションレベルの協調のためのプロトコル群として、Agentic Web時代のHTTPになることを目指しています。

> **注:** 本プロジェクトは、いかなるプラットフォームやブロックチェーンにおいてもデジタル通貨を発行していません。

## ビジョンと位置付け

Agent Network Protocol（ANP）は、知的エージェントのためのオープンソース通信プロトコルです。エージェント同士の接続方法を定義し、数十億のエージェントが参加する、開かれた安全で効率的な協調ネットワークを構築することを目標としています。

<p align="center">
  <img src="../images/agentic-web3.png" width="50%" alt="Agentic Web"/>
</p>

エージェントのインターネットは、人間中心のインターネットに続く、次世代の情報基盤になると考えています。このビジョンでは、次の点を重視します。

- **プラットフォーム中心からプロトコル中心へ:** データやサービスを、孤立したプラットフォームに閉じ込めたままにするべきではありません。エージェントが直接接続するには、開かれたプロトコルが必要です。
- **接続は力になる:** すべてのエージェントは、情報の利用者であると同時にサービスの提供者にもなり、他のノードを発見し、接続し、協調できます。
- **AIネイティブなネットワーク:** エージェントは、人間向けのWebページだけに頼らず、意味が明確で機械可読かつ呼び出し可能なプロトコルを通じて対話するべきです。

## ANPが必要な理由

現在のインターネット基盤は成熟していますが、大規模なエージェントネットワークのために設計された通信・接続層は、まだ欠けています。ANPは次の3つの課題に取り組みます。

- **相互接続:** 異なるプラットフォームやドメインのエージェントが、互いに認証し、発見し、通信できるようにします。
- **ネイティブなインターフェース:** AIが人間のブラウジングを模倣する代わりに、API、プロトコル文書、構造化記述、交渉済みのインターフェースを利用できるようにします。
- **効率的な協調:** エージェントが自律的に組織化・交渉し、より低コストな協調ネットワークを構築できるようにします。

## プロトコルのアーキテクチャ

<p align="center">
  <img src="../images/anp-architecture2.png" width="50%" alt="Protocol Architecture Diagram"/>
</p>

ANPは既存のインターネット基盤の上に構築され、公開済みのプロトコル機能を2つの中核プロトコル層と、分野別のアプリケーションプロトコルに整理しています。

- **開かれたインターネット基盤:** ANPは新しいネットワークスタックを作り直すのではなく、HTTP、CA、DNS、CDN、検索、TLSを再利用します。
- **識別と暗号化通信の層:** W3C DIDとWeb基盤に基づきます。ANP-02は共通認証とDIDメソッドの検証を分離し、`did:wba`とネイティブの`did:web`を扱います。メッセージングのProfileは、DIDによるアドレス指定とデバイスに結び付いたE2EEを定義します。
- **アプリケーションプロトコルの層:** Agent Description、Agent Discovery、Agent Application Protocolsを含みます。エージェントの支払い、認可、認証、取引などの分野別プロトコルは、この層の上に構築します。
- **メタプロトコルの状態:** ANP-06は依然としてドラフトであり、現在公開されているアーキテクチャには含まれません。更新されたドラフトでは、Agent Descriptionに基づく意味的な交渉層として位置付けられ、`MetaProtocolInterface`、`anp.get_capabilities`、`anp.negotiate`を使って、後続のインターフェース、Profile、セキュリティプロファイル、スキーマを選択します。

## プロトコル仕様一覧

| 分野 | 文書 | 状態 | 定義する内容 |
| --- | --- | --- | --- |
| 概要 | [ANP-01: 技術白書](01-agentnetworkprotocol-technical-white-paper.md) | 参考情報 v1.2 | ビジョン、設計原則、概念的なアーキテクチャ。規範的な状態は各仕様で定義します |
| 認証 | [ANP-02: DID認証プロトコル](02-anp-did-authentication-protocol-specification.md) | Released v1.2（公開済み） | メソッドに依存しないHTTP/JSON認証とWBA/Webバインディング。MessagingやWNSから独立しています |
| 識別 | [ANP-03: did:wbaメソッド仕様](03-did-wba-method-design-specification.md) | Released v1.2（公開済み） | WebベースのDIDメソッド、`e1_`バインディング、安定した主体パス、検証済みのDID遷移 |
| 命名 | [ANP-04: ANP-DID:WBA名前空間仕様](04-anp-did-wba-name-space-specification.md) | Released v1.2（公開済み） | WNS Handle、名前からDIDへの解決、WBAバインディング、既存のネイティブWebとの互換性 |
| 認可 | [ANP-05: DIDベースの認可](05-anp-did-authorization-protocol-specification.md) | Draft / not released（ドラフト／未公開）; v0.7 | OAuthで使う、DIDと関連付けられたCIMD URLクライアントID、および委任・組織内の役割に関する資格情報のための独立したVC直接提示 |
| メタプロトコル | [ANP-06: エージェント通信メタプロトコル](06-anp-agent-communication-meta-protocol-specification.md) | Draft（ドラフト）; 文書バージョン1.2 | 任意の意味的交渉、`MetaProtocolInterface`、インターフェース／Profile／セキュリティプロファイル／スキーマの選択 |
| 記述 | [ANP-07: エージェント記述プロトコル](07-anp-agent-description-protocol-specification.md) | Released v1.2（公開済み） | Agent Description文書、インターフェース記述、機能の公開 |
| 発見 | [ANP-08: エージェント発見プロトコル](08-ANP-Agent-Discovery-Protocol-Specification.md) | Released v1.2（公開済み） | `.well-known`による能動的発見、検索エージェントへの受動的登録 |
| メッセージング | [ANP-09: エンドツーエンド・インスタントメッセージング概要](09-ANP-end-to-end-instant-messaging-protocol-specification.md) | 公表済みv1.2カタログ; P6は候補 | ダイレクト／グループメッセージング、デバイスに結び付いたE2EE、添付、フェデレーション、メンション |
| 支払い | [ANP-10: AP2支払い適応ドラフト](application/10-anp-agent-payment-protocol-specification.md) | Draft / not released（ドラフト／未公開）; 英語文書v1.1、中国語文書v0.1 | ANPへの支払い適応案、委任指示、受領証、取引フロー。安定した支払い相互運用標準ではありません |

[vNext作業領域](vnext/README.md)には白書の改訂版を置いています。[ANP-01白書改訂版](vnext/01-agentnetworkprotocol-technical-white-paper.md)は、参考情報としての作業ドラフトです。[ANP-05: DIDベースの認可](05-anp-did-authorization-protocol-specification.md)はリポジトリのルートにあり、[中国語版](chinese/05-ANP-基于DID的授权协议.md)は`chinese/`にあります。これは依然としてv0.7のドラフトであり、未公開です。これらのドラフトはANP 1.2に含まれません。現在の1.2の規範参照では、上記の公開版のパスを使います。歴史的な非推奨のdid:all文書は元の識別を維持しており、現在のANP-02という番号はDID認証を指します。

### インスタントメッセージングのProfile

[ANP Messaging 1.2 Profile一覧](message/README.md)と[中国語版](chinese/message/README.md)には、次の9文書すべてが含まれます。

| Profile | 通信上の識別子 | 文書 |
| --- | --- | --- |
| P1 | `anp.core.binding.v1` | [コアバインディング](message/01-core-binding.md) |
| P2 | `anp.identity.discovery.v1` | [識別と発見](message/02-identity-and-discovery.md) |
| P3 | `anp.direct.base.v1` | [ダイレクトメッセージングの基本セマンティクス](message/03-direct-messaging-base-semantics.md) |
| P4 | `anp.group.base.v2` | [グループメッセージングの基本セマンティクス](message/04-group-messaging-base-semantics.md) |
| P5 | `anp.direct.e2ee.v2` | [ダイレクトエンドツーエンド暗号化](message/05-direct-end-to-end-encryption.md) |
| P6 | `anp.group.e2ee.v2` — 候補、安定したコードポイントの確定待ち | [グループエンドツーエンド暗号化](message/06-group-end-to-end-encryption.md) |
| P7 | `anp.attachment.v1` | [添付とオブジェクト転送](message/07-attachments-and-object-transfer.md) |
| P8 | `anp.federation.relay.v1` | [フェデレーションとドメイン間通信](message/08-federation-and-cross-domain.md) |
| P9 | v1バインディング拡張。独立した`meta.profile`なし | [メッセージのメンション](message/09-message-mentions.md) |

通常のDirect、Group、Mention、Attachment操作は引き続きビジネスDIDまたはGroup DIDで宛先を指定し、デバイスへの配信展開は受信ドメイン内で行います。P4 v2はDIDだけに基づくメンバーシップと、Hostが調整するメンバーDID更新を導入します。P5/P6 v2は独立した暗号デバイスエンドポイントを使用し、デバイスペアごとのDirectセッションと複数のMLSリーフを含みます。実装は、E2EE v1の状態をv2として再解釈したり、E2EE v2操作を黙ってダウングレードしたりしては**なりません（MUST NOT）**。P6の候補という状態と、登録済みコードポイントを必要とする公開条件は引き続き有効です。

### DID互換性に関する付録

- [付録A: did:wbaの`k1_`互換性拡張](appendix-a-did-wba-k1-compatibility-extension.md)
- [付録B: ネイティブ`did:web`の統合](appendix-b-compatibility-with-native-did-web.md): ANP-02認証、既存のWNS/Web互換性、WBAへの変換を伴わないメッセージングの組み合わせ。

## クイックスタート

- メソッドに依存しない通常のAPI認証については、[ANP-02](02-anp-did-authentication-protocol-specification.md)を参照してください。Messaging、Handle、デバイスManifestは必要ありません。
- 提案中のDIDベースのエージェント認可については、[ANP-05（ドラフト）](05-anp-did-authorization-protocol-specification.md)を参照してください。OAuthとVCの使い分けを説明し、エージェント認可のロードマップおよびv1の識別・基本的な委任の範囲を定義しています。完全性に結び付けられたメタデータ、初回接触時の受け入れ、ホスト型／ローカル型のOAuthフロー、委任・役割資格情報のための独立したVC直接提示を扱いますが、実装による対応を意味するものではありません。
- ANPの概念と使い方を理解するには、[ANP入門ガイド](docs/anp-getting-started-guide.md)または[中国語ガイド](docs/chinese/ANP入门指南.md)を参照してください。
- ANP 1.2の識別を実装するにはANP-02から始め、WBAメソッドの検証は[ANP-03: did:wba](03-did-wba-method-design-specification.md)、ネイティブ`did:web`の統合は[付録B](appendix-b-compatibility-with-native-did-web.md)を参照してください。
- エージェントを公開するには、[ANP-07: エージェント記述プロトコル](07-anp-agent-description-protocol-specification.md)と[ANP-08: エージェント発見プロトコル](08-ANP-Agent-Discovery-Protocol-Specification.md)を参照してください。
- メッセージングを構築するには[ANP-09](09-ANP-end-to-end-instant-messaging-protocol-specification.md)から始め、必要なメッセージングProfileを選択してください。
- デモを実行するには、[ANPサンプルプログラム](docs/chinese/ANP示例程序.md)を参照してください。

## プロトコルSDK

ANPのオープンソース実装は、AgentConnectリポジトリで保守されています。

- [https://github.com/agent-network-protocol/AgentConnect](https://github.com/agent-network-protocol/AgentConnect)

AgentConnectは、`did:wba`、認証、エージェント記述、プロトコル交渉、安全な通信、アプリケーションプロトコルに関する実用的なSDKサポートに重点を置いています。

## オープンソース実装: AWiki

AWikiは、ANPに基づくエージェント識別とメッセージングのオープンソース実装です。

- [awiki-cli-rs2](https://github.com/AgentConnect/awiki-cli-rs2): エージェント識別とメッセージングのためのRust SDKおよびコマンドラインクライアント。
- [awiki-me](https://github.com/AgentConnect/awiki-me): 識別管理とメッセージングのための、Flutterによるクロスプラットフォームアプリ。
- [awiki-open-server](https://github.com/AgentConnect/awiki-open-server): エージェント識別とメッセージングのオープンソースサーバー実装。

## リポジトリの構成

- `01-*.md`、`02-*.md`、`03-*.md`、`04-*.md`、`06-*.md`、`07-*.md`、`08-*.md`、`09-*.md`: 英語の中核文書。文書バージョンは1.2で、個別に状態を明示しています。
- `05-anp-did-authorization-protocol-specification.md`: 英語のANP-05認可ドラフト。v0.7／未公開で、ANP 1.2リリースの対象外です。
- `message/`: ANP Messaging 1.2のProfile群と一覧。P6は引き続き候補です。
- `chinese/`: 中核・メッセージング仕様とANP-05認可ドラフトの中国語版、および関連する研究ノート。
- `vnext/`: 英語・中国語のANP-01白書改訂版。現在の1.2文書は公開版のパスに残しています。
- `application/`: AP2など、独立してバージョン管理するアプリケーション層のプロトコル。
- `docs/`: ガイド、参考資料、コミュニティ運営文書。
- `blogs/`: 記事および過去のプロトコル分析。
- `examples/`: ADPの素材、APIインターフェース、[Messaging 1.2の例](examples/message-vnext/README.md)、[ANP-02ベクトル](examples/did-authentication-vnext/README.md)。例のディレクトリ名は、パス互換性のため`-vnext`を維持しています。
- `images/`と`standard/`: 共通の図と標準化関連の参考資料。

## 参考資料

- [関連資料](docs/links.md)
- [ANP技術白書](01-agentnetworkprotocol-technical-white-paper.md)
- [AgentConnectの例](https://github.com/agent-network-protocol/AgentConnect)

## マイルストーン

- [x] 識別認証と安全な通信の基盤を定義・実装する。
- [x] 既定の`e1_` Ed25519パスバインディングと、`k1_`およびネイティブ`did:web`の互換性指針を備えた`did:wba` v1.1を公開する。
- [x] DIDベースのエージェントに人間が読める命名層を提供するWNS Handleを定義する。
- [x] Agent Description ProtocolとAgent Discovery Protocolを公開する。
- [ ] ドラフトの安定後にメタプロトコルを公開する。
- [x] エンドツーエンド・インスタントメッセージングを概要文書と9つの相互運用可能なProfileに分割する。
- [x] ANP-02認証、ANP-03識別継続性、ANP-04命名、ネイティブWeb統合をANP 1.2文書に統合する。
- [x] メッセージングの全9文書と、複数バージョンを含むProfileカタログをANP 1.2に統合する。
- [ ] 安定版P6 v2のため、登録済みMLS ExtensionTypeを必要とする公開条件を満たす。
- [x] アプリケーション層にAP2支払い適応ドラフトを追加する。
- [ ] SDK実装と例を1.2仕様群に合わせ、実際の相互運用性を検証し続ける。
- [ ] 標準化を継続し、分野別のアプリケーションプロトコルを拡大する。

## お問い合わせ

オープンソースコミュニティの取り組みを通じてANPの開発を推進するため、ANPオープンソース技術コミュニティを設立しました。ぜひご参加ください。

- メール: chgaowei@gmail.com
- その他の連絡先メール: zynetzy1@aliyun.com、2764433097@qq.com
- Discord: [https://discord.gg/sFjBKTY7sB](https://discord.gg/sFjBKTY7sB)
- 公式サイト: [https://agent-network-protocol.com/](https://agent-network-protocol.com/)
- GitHub: [https://github.com/agent-network-protocol/AgentNetworkProtocol](https://github.com/agent-network-protocol/AgentNetworkProtocol)
- WeChat: flow10240

## 貢献

あらゆる形の貢献を歓迎します。[CONTRIBUTING.md](CONTRIBUTING.md)を参照してください。

### 貢献者

Agent Network Protocolプロジェクトへの素晴らしい取り組みと献身に対し、すべての貢献者に心から感謝します。

<!-- contributors:start -->
<a href="https://github.com/chgaowei"><img src="https://avatars.githubusercontent.com/u/1315207?v=4" width="64" height="64" alt="@chgaowei" /></a>
<a href="https://github.com/yagi2018"><img src="https://avatars.githubusercontent.com/u/45328391?v=4" width="64" height="64" alt="@yagi2018" /></a>
<a href="https://github.com/Julian-Zhu-STD"><img src="https://avatars.githubusercontent.com/u/238634316?v=4" width="64" height="64" alt="@Julian-Zhu-STD" /></a>
<a href="https://github.com/amdoi7"><img src="https://avatars.githubusercontent.com/u/91404105?v=4" width="64" height="64" alt="@amdoi7" /></a>
<a href="https://github.com/claude"><img src="https://avatars.githubusercontent.com/u/81847?v=4" width="64" height="64" alt="@claude" /></a>
<a href="https://github.com/han188"><img src="https://avatars.githubusercontent.com/u/15783771?v=4" width="64" height="64" alt="@han188" /></a>
<a href="https://github.com/khyao78"><img src="https://avatars.githubusercontent.com/u/59645954?v=4" width="64" height="64" alt="@khyao78" /></a>
<a href="https://github.com/yumh1"><img src="https://avatars.githubusercontent.com/u/238633659?v=4" width="64" height="64" alt="@yumh1" /></a>
<a href="https://github.com/AlfredZuo"><img src="https://avatars.githubusercontent.com/u/22234543?v=4" width="64" height="64" alt="@AlfredZuo" /></a>
<a href="https://github.com/dreamsea656"><img src="https://avatars.githubusercontent.com/u/11325618?v=4" width="64" height="64" alt="@dreamsea656" /></a>
<a href="https://github.com/dzpzp"><img src="https://avatars.githubusercontent.com/u/116531432?v=4" width="64" height="64" alt="@dzpzp" /></a>
<a href="https://github.com/SeaOceanO"><img src="https://avatars.githubusercontent.com/u/287401010?v=4" width="64" height="64" alt="@SeaOceanO" /></a>
<a href="https://github.com/Aas-ee"><img src="https://avatars.githubusercontent.com/u/81606643?v=4" width="64" height="64" alt="@Aas-ee" /></a>
<a href="https://github.com/cocolin2016"><img src="https://avatars.githubusercontent.com/u/70193777?v=4" width="64" height="64" alt="@cocolin2016" /></a>
<a href="https://github.com/kylezhang"><img src="https://avatars.githubusercontent.com/u/3679798?v=4" width="64" height="64" alt="@kylezhang" /></a>
<a href="https://github.com/Pentiumtime"><img src="https://avatars.githubusercontent.com/u/129046354?v=4" width="64" height="64" alt="@Pentiumtime" /></a>
<a href="https://github.com/PreciousNwakama"><img src="https://avatars.githubusercontent.com/u/65106738?v=4" width="64" height="64" alt="@PreciousNwakama" /></a>
<a href="https://github.com/seanzhang9999"><img src="https://avatars.githubusercontent.com/u/25133739?v=4" width="64" height="64" alt="@seanzhang9999" /></a>
<a href="https://github.com/SunZhao2468"><img src="https://avatars.githubusercontent.com/u/238628622?v=4" width="64" height="64" alt="@SunZhao2468" /></a>
<a href="https://github.com/xfq"><img src="https://avatars.githubusercontent.com/u/2863444?v=4" width="64" height="64" alt="@xfq" /></a>
<!-- contributors:end -->

- [貢献者の全一覧](CONTRIBUTORS.md)

## 公開状態とバージョン管理

**現在の仕様群: ANP 1.2。** 中核仕様とメッセージングの全9文書は、vNextから正規の公開パスへ統合済みです。ANP-02は`did:wba`とネイティブ`did:web`について、DIDメソッドに依存しない認証を提供します。ANP-03はWBAメソッドの規則と識別継続性を定義し、ANP-04はWNS命名を定義します。エージェント記述・発見文書も、このリリースに整合させています。

**公開範囲:** ルートの仕様と`message/`が現在の英語文書で、`chinese/`に中国語版があります。ANP-06は依然としてドラフトです。P6 Group E2EEは1.2文書に含まれますが、登録済みMLS `ExtensionType`を必要とする公開条件を満たすまで候補のままです。暫定値`0xF0A1`は登録完了を意味しません。アプリケーションプロトコルは独立してバージョン管理します。ANP-10はAP2適応ドラフトであり、公開済みの安定した支払い標準ではありません。

**ANP Messaging 1.2:** [Profile一覧](message/README.md)は、複数バージョンを含むプロトコル群を定義しています。P1/P2/P3/P7/P8とP9バインディングはv1を維持し、P4 Group BaseとP5/P6 E2EEはv2を使います。仕様の公表はSDKや製品の実装による対応を意味しません。機能の広告には、実際の対応状況と各Profileの公開制約を反映しなければなりません。

**バージョン管理上の注意:** `Version: 1.2`は仕様・文書のリリースバージョンを示し、通信上のバージョンではありません。Profile識別子、`protocolVersion`、インターフェースのバージョン、アルゴリズム、署名／AAD形式は、それぞれを定める仕様に従い、一括で番号を変更しません。P4/P5/P6はvNextで定義済みのv2契約を採用し、その他のProfile識別子と例の通信バージョンフィールドは変更しません。

## ライセンス

プロジェクト全体のライセンスは[Apache License 2.0（Apache-2.0）](../LICENSE)です。適用されるライセンス、著作権、帰属表示を保持してください。リポジトリの著作権表示はANP Communityを示し、著者・貢献者のクレジットはそれぞれの記録に残します。

このプロジェクト全体の表明は、過去のドラフト、アーカイブ文書、第三者の参考資料にある個別の表示に代わるものではありません。再配布やプロジェクトの寄贈の前に、それぞれの資料を個別に確認してください。ライセンス名や著作権表示の更新によって、所有権が確立したり、第三者の権利が処理されたりするわけではありません。

## 著作権表示

Copyright (c) 2024 ANP Community
本ファイルは[Apache License 2.0](../LICENSE)で公開されています。自由に使用・変更できますが、この著作権表示を保持しなければなりません。
