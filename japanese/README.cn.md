> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [README.cn.md](../README.cn.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

<div align="center">
  
[英語](README.md) | [中国語](README.cn.md)

</div>

# エージェント ネットワーク プロトコル (ANP)

ANP は、エージェントのインターネットの HTTP となることに尽力し、エージェントに ID、命名、検出、ネゴシエーション、安全なメッセージング、およびアプリケーション層コラボレーション プロトコルを提供します。

> ** 備考: ** このプロジェクトは、いかなるプラットフォームやブロックチェーン上でもデジタル通貨をリリースしません。

## ビジョンポジショニング

Agent Network Protocol (ANP) は、オープンソースのエージェント通信プロトコルです。目標は、エージェント間の接続方法を定義し、数十億のエージェントのためのオープンで安全かつ効率的なコラボレーション ネットワークを構築することです。

<p align="center">
  <img src="../images/agentic-web3.png" width="50%" alt="Agentic Web"/>
</p>

私たちは、インテリジェント インターネットは人間のインターネットに続く新世代の情報インフラストラクチャであると信じています。このビジョンでは次のようになります。

- **プラットフォーム センターからプロトコル センターへ: ** データとサービスはクローズド プラットフォームにロックされ続けてはならず、エージェントは直接接続を実現するためにオープン プロトコルを必要とします。
- **接続は力です: ** 各エージェントは情報消費者とサービスプロバイダーの両方になることができ、検出、接続、コラボレーションが可能です。
- ** AI ネイティブ ネットワーク: ** エージェントは、単に人間が Web を閲覧するのを模倣するのではなく、意味的に明確で、機械可読で呼び出し可能なプロトコルを通じて対話する必要があります。

## ANPが必要な理由

現在のインターネット インフラストラクチャは成熟していますが、大規模なエージェント ネットワーク用の通信層と接続層がまだ不足しています。 ANP は、次の 3 種類の問題の解決に重点を置いています。

- 🌐 **相互接続: ** 異なるプラットフォームおよび異なるドメイン名のエージェントが相互に認証、検出、通信できるようにします。
- 🖥️ **ネイティブインターフェース: ** Web ページにアクセスする人間をシミュレートする代わりに、AI に API、プロトコル文書、構造化された記述、ネゴシエートされたインターフェースを使用させます。
- 🤝 ** 効率的なコラボレーション: ** インテリジェント エージェントが自己組織化し、低コストのコラボレーション ネットワークを構築するためにネゴシエートできるようにします。

## プロトコルアーキテクチャ

<p align="center">
  <img src="../images/anp-architecture2.png" width="50%" alt="协议架构图"/>
</p>

ANP は既存のインターネット インフラストラクチャ上に構築されており、公開されたプロトコル機能を 2 つのコア プロトコル層に編成し、その上の特定のフィールドでアプリケーション プロトコルを実行します。

- 🌐 ** オープン インターネット インフラストラクチャ: ** ANP は、ネットワーク スタックを再構築する代わりに、HTTP、CA、DNS、CDN、検索、TLS などの成熟したインフラストラクチャを再利用します。
- 🔒 **アイデンティティと暗号化された通信層:** W3C DIDとWebインフラをベースとしたAMP-02は、DIDメソッドで汎用認証をデコレーションし、サポート `did:wba` 出産時 `did:web`;messageProfile は DID アドレスとデバイスバインディング E2EE を定義します。
- 📡 **アプリケーション プロトコル層: ** エージェントの説明、エージェントの検出、およびエージェント アプリケーション プロトコルが含まれます。インテリジェント エージェントの支払い、承認、認証、トランザクションなどの分野のプロトコルは、この層上に構築されます。
- 🧪 **メタプロトコルのステータス:** ANP-06は、まだフォームをドラフトして公開された構造に属していません。更新されたドラフトは、採用されているエージェント防衛に基づくセマンティック協定協議のレベルでそれを見つけます `MetaProtocolInterface`、`anp.get_capabilities` とりあえず `anp.negotiate` 成功インターフェイス、プロファイル、セキュリティモード、およびスキーマを選択します。

## プロトコル仕様インデックス

| ドメイン | ドキュメント | ステータス | 定義内容 |
| --- | --- | --- | --- |
| プロフィール | [ANP-01: 技術的な白いペーパー](chinese/01-AgentNetworkProtocol技术白皮书.md) | 情報文書 v1.2 | ビジョン、設計原則および概念枠組み;規範に基づく規範的な状態 |
| 認証 | [ANP-02: DID ベースの認証プロトコル](chinese/02-ANP-基于DID的身份认证协议.md) | 公開 v1.2 | 方法は、HTTP/JSON認証とWBA/Web結合に気付くことはありません。情報やWNSの独立性 |
| アイデンティティ | [ANP-03: ド:wba方法論的仕様](chinese/03-did-wba方法规范.md) | 公開 v1.2 | Web DID 方法,`e1_` ネクタイは、メインパスを安定させ、DIDマイグレーションを確認 |
| お名前(必須) | [ANP-04: DDに基づく名前付き空間コード:WBA](chinese/04-ANP-基于DID-WBA的命名空间规范.md) | 公開 v1.2 | WNS ハンドル、DID 解析の名前、WBA 結合は既存のネイティブ Web と互換性があります。 |
| 権威の委任 | [ANP-05: DIDに基づく認可契約](chinese/05-ANP-基于DID的授权协议.md) | ドラフト / 公開されていない; v0.7 | 外部のVC委託や組織ロールバウチャーの直接的なプレゼンテーション、OouthのCIMD URLクライアントID |
| メタプロトコル | [ANP-06: スマートボディテレコミュニケーションメタプロトコルの規制](chinese/06-ANP-智能体通信元协议规范.md) | ドラフト;ドキュメントバージョン1.2 | 任意皮下協議,`MetaProtocolInterface` インターフェイス/プロファイル/セキュリティモード/スキーマの選択 |
| コンテンツ | [ANP-07: スマートボディ説明プロトコル仕様](chinese/07-ANP-智能体描述协议规范.md) | 公開 v1.2 | スマート 説明文書、インターフェイスの説明と公開する機能 |
| 新着情報 | [ANP-08: スマートディスカバリーのプロトコルコード](chinese/08-ANP-智能体发现协议规范.md) | 公開 v1.2 | 基本情報 `.well-known` アクティブ検出とパッシブ検出が検索インテリジェンスに登録 |
| 新着情報 | [ANP-09: エンドツーエンドメッセージプロトコルの概要](chinese/09-ANP-端到端即时消息协议规范.md) | V1.2 ディレクトリが公開されました。 P6 候補 | プライベートチャット、グループチャット、E2EEの結合機器、添付ファイル、コンフェデレーションおよびメンション |
| お支払い | [ANP-10:AP2 ドラフト決済の適応](chinese/application/10-ANP-智能体支付协议规范.md) | ドラフト / 公開されていません。 英語 v1.1、中国語 v. 0.1 | 提唱されたAPPの支払適性、バウチャー、レシートおよびトランザクション・プロセス;支払相互運用性の標準の安定化無し |

[vNext タスクエントリ](vnext/README.md)修正された白書を再現しました。[ANP-01 改訂された白書](vnext/chinese/01-AgentNetworkProtocol技术白皮书.md)情報草案です。[ANP-05: DIDに基づく認可契約](chinese/05-ANP-基于DID的授权协议.md)_その他組織 `chinese/`，[英国鏡](05-anp-did-authorization-protocol-specification.md)リポジトリのルートディレクトリでは、バージョンはまだv.0.7であり、ドラフト/未公開です。 これらのドラフトはANP 1.2に属していません。 現在の1.2は参照によって上記の公式パスの使用を規制しています。 期限切れの履歴が行われた:すべてのドキュメントは元のアイデンティティを保持します。 現在のAMP-02番号はDIDに基づいて認証プロトコルを示しています。

### インスタントメッセージプロファイル

[ANP 中国語のメッセージング 1.2 索引](chinese/message/README.md)とりあえず[英国鏡](message/README.md)文書の9つを全て含まて下さい:

| プロフィール | ワイヤー識別 | ドキュメント |
| --- | --- | --- |
| プチ1 | `anp.core.binding.v1` | [コアバインディング](chinese/message/01-核心绑定.md) |
| プチスイム | `anp.identity.discovery.v1` | [アイデンティティとディスカバリー](chinese/message/02-身份与发现.md) |
| プチスプチ | `anp.direct.base.v1` | [基本的なセマンティックスをプライベートに話す](chinese/message/03-私聊基础语义.md) |
| プチ4 | `anp.group.base.v2` | [グループ基本セマティクス](chinese/message/04-群组基础语义.md) |
| プチ5 | `anp.direct.e2ee.v2` | [専用暗号化](chinese/message/05-私聊端到端加密.md) |
| プチ6 | `anp.group.e2ee.v2`安定化されるべきcandidature | [グループツーエンド暗号化](chinese/message/06-群组端到端加密.md) |
| プッシー | `anp.attachment.v1` | [添付ファイルとオブジェクト転送](chinese/message/07-附件与对象传输.md) |
| プチ8 | `anp.federation.relay.v1` | [連邦およびクロスボーダー](chinese/message/08-联邦与跨域.md) |
| プチ9 | v1 結合延長;独立した定義なし `meta.profile` | [新着情報](chinese/message/09-消息Mention扩展.md) |

通常のプライベートチャット、グループチャット、Metion、および添付操作は、受信ドメインに残っているデバイスファンアウトで、ビジネスDIDまたはGroup DIDの場所を使用します。 P4 v2は、ホスト座標付きメンバーのDIDによるDIDのみのメンバーの関係と更新を導入しています。 P5/P6 v2は独立したパスワードエンドポイントを使用しており、ダイレクトプレッション用の機器やDID付きの複数のMLSリーフを含みます。 これは、V2としてE 2E V1の状態を再現したり、EPFSEが有効なコードを解除したりすることができます。

### DID 互換性付録

- [付録A:did:wba `k1_` 対応する延長](chinese/附录A：did-wba-k1_兼容扩展.md)
- [付録B:ネイティブ `did:web` 統合ソリューション](chinese/附录B：与原生did-web-的兼容.md)AMP-02認証、WNS/Webの互換性とメッセージミックスはWBAに変換しなくても有効です。

## こんなに早くスタートしてみよう。

- 非関連性な通常のAPI認証を設計する際には、 [アクア・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アレイ・アワーズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アベイ](chinese/02-ANP-基于DID的身份认证协议.md);それは情報、ハンドルまたは装置マニフェストに依存しません。
- DIDベースのスマートボディ認証を勉強するときに読む [ANP-05(ドラフト)](chinese/05-ANP-基于DID的授权协议.md)OAuth と VC を使用する際は、スマートボディの ' s 認可ロードマップと v1 アイデンティティ/ベース 委託範囲を定義し、tie-in メタデータとして完全性を定義し、最初のアクセス、ホスティング/ハウス OAUS プロセス、独立した VC 委任およびロールバウチャーの直接的なプレゼンテーションを行ないます。サポートは達成されません。

- AMP の概念を素早く理解し、どのように使われるかを知りたい場合は、読みます [ANP導入ガイド](docs/chinese/ANP入门指南.md)。
- AMP 1.2 は ANP-02 から始まる ID が達成されます。WBA メソッドは読み込みを検証します [ANP-03の特長](chinese/03-did-wba方法规范.md)ネイティブ `did:web` 統合読書[付録B](chinese/附录B：与原生did-web-的兼容.md)。
- スマートボディを出版したいなら、読んでください。 [ANP-07: スマートボディ説明プロトコル仕様](chinese/07-ANP-智能体描述协议规范.md) とりあえず [ANP-08: スマートディスカバリーのプロトコルコード](chinese/08-ANP-智能体发现协议规范.md)。
- インスタントメッセージの投稿を希望される場合は、まずはここから開始してください。 [トピックス](chinese/09-ANP-端到端即时消息协议规范.md) スタートは、必要に応じて特定のプロファイルを選択します。
- ANP関連のデモをやりたい場合は、ぜひご覧ください。 [ANP例プログラム](docs/chinese/ANP示例程序.md)。

## プロトコルSDK

AnanP のオープンソースは AgentConnect リポジトリーで管理されます。

- [https://github.com/agent-network-protocol/AgentConnect](https://github.com/agent-network-protocol/AgentConnect)

エージェントコネクトフォーカス `did:wba`、同一証明、スマートなボディ記述、議定書の交渉、安全なコミュニケーションおよび適用レベル一致SDKサポート。

## オープンソース達成: AWiki

AWikiは、AMP のスマートボディアイデンティティとメッセージオープンソースに基づいており、次の項目を含みます。

- [フィードバック](https://github.com/AgentConnect/awiki-cli-rs2)スマートなボディ同一証明および情報機能を提供するRust SDKおよびコマンドライン クライアント。
- [フィードバック](https://github.com/AgentConnect/awiki-me): アイデンティティ管理とメッセージングのためのクロスプラットフォームFluterアプリケーション。
- [サーバのオープン](https://github.com/AgentConnect/awiki-open-server): スマートボディのアイデンティティとメッセージ機能を提供するオープンソースサービスエンド。

## 倉庫構造

- `01-*.md`、`02-*.md`、`03-*.md`、`04-*.md`、`06-*.md`、`07-*.md`、`08-*.md`、`09-*.md`: 文書の1.2版で、各々がクリアな状態を維持している英語のコアドキュメント。
- `05-anp-did-authorization-protocol-specification.md`: AMP-05 ドラフトマンデート、v0.7/未公開、ANP 1.2の範囲内では落ちません。
- `message/`: ANPメッセージング1.2プロファイル標準セットとインデックス; P6は候補ステータスを保持します。
- `chinese/`コアとメッセージコードは中国語、原稿作成のマンデートAMP-05、関連研究ノートの鏡です。
- `vnext/`: 英語版のホワイトペーパー、AMP-01の修正版。現在1.2文書は公式パスにはまだあります。
- `application/`: AP2などの独立したバージョンアプリケーションプロトコル。
- `docs/`: ガイド、拡張読書、コミュニティ運営のドキュメント。
- `blogs/`技術的な記事と歴史のプロトコル分析。
- `examples/`ADPアセット、APIインターフェース、[メッセージを送信する1.2例](examples/message-vnext/README.cn.md)とりあえず [ANP-02 ベクトル](examples/did-authentication-vnext/README.cn.md);spectalologues 保存 `-vnext` 既存のパスに合致する名前。
- `images/`、`standard/`: 共有マップと標準化された参考資料。

## 深さで読む

- [読書の拡大](docs/chinese/links.md)
- [ANPの技術の白いペーパー](chinese/01-AgentNetworkProtocol技术白皮书.md)
- [事例紹介](https://github.com/agent-network-protocol/AgentConnect)

## マイルストーン

- [ツイート] 識別および安全な通信の基礎を定義し、達成して下さい。
- [ツイート] リリース `did:wba` v1.1、デフォルトサポート `e1_` Ed25519 パス境界と提供 `k1_` 出産時 `did:web` 互換性のある説明。
- [ツイート] WNS ハンドルを定義します。, 人間の読みやすいネーミング層を DID スマート ボディとして.
- [ツイート] スマートボディ説明プロトコルとスマートボディ検出プロトコルを公開します。
- [ ] メタアグリーメントは、ドラフトのままで安定化した状態で発行されます。
- [ツイート] エンドツーエンドのインスタントメッセージを一般的な輪郭と9つの相互運用可能なファイルに分割します。
- [ツイート] AMP-02認証、ANP-03 ID 継続、AMP-04 ネーミング、オリジナルの Web インテグレーションを anAPP 1.2 ドキュメントに統合します。
- [ツイート] プロフィールディレクトリの9つのメッセージ文書と、プロファイルディレクトリの混合バージョンをANP 1.2にマージします。
- [ ] P6 v2 の安定版の MLS Express タイプ登録しきい値を完了します。
- [ツイート] AAP2 の決済適応草案をアプリケーションレベルに追加します。
- [ ] AMP 1.2 の規範を組み合わせて、実際の相互運用性を検証するために SDK を継続的に進めます。
- [ ] 標準化プロセスは、アプリケーションプロトコルの高度化とより多くの領域が拡大されています。

## 連絡方法

オープンソースコミュニティのAMPビルを発展させるために、ANP Open Source Technology Communityを設立しました。 コミュニティに参加するために招待されます。

- メールボックス: Chgaowei@gmail.com
- その他の連絡先メールボックス:zynetzy1@aliyun.com、276433097@q.com
- ディスコ:[https://discord.gg/sFjBKTY7sB](https://discord.gg/sFjBKTY7sB)
- オフィシャル:[https://agent-network-protocol.com/](https://agent-network-protocol.com/)
- GitHub: ディレクトリ[https://github.com/agent-network-protocol/AgentNetworkProtocol](https://github.com/agent-network-protocol/AgentNetworkProtocol)
- 以下は、次のことを信じています。

## 参加資格

どんな貢献も歓迎します。是非参考にして下さい。 [コンテンツへスキップ](CONTRIBUTING.cn.md)。

### 投稿者

エージェントネットワークプロトコルプロジェクトにご協力いただいた皆様、ありがとうございました。

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

- [完全なコントリビューターリストを見る](CONTRIBUTORS.cn.md)

## リリースステータスとバージョンの説明

**現在のコードコレクション: ANP 1.2.** コアコードと9つのメッセージ文書は、vNextの公式ドキュメントパスと統合されています。 ANP-02は、DIDメソッドに関連しない認証を提供し、サポート `did:wba` 出産時 `did:web`; ANP-03 は WBA メソッドのルールとアイデンティティの継続を定義します。AMP-04 は WNS の名前を定義します。スマートボディの説明はこのバージョンで検出文書と整列します。

**出版規模:** ルートディレクトリの規則と `message/` 現在の英語文書については、中国鏡は `chinese/`. AMP-06はまだドラフトです。 P6グループE2EEは1.2文書に完全に統合されていますが、MLSに安定しています `ExtensionType` レジスト前のカンディダチュアを保持する。一時的な値 `0xF0A1` 参加登録を表わさない。プロトコルの独立版を適用します。ANP-10は、支払いの正式な発行された安定化基準ではありません。

**ANPメッセージング1.2:** [プロフィールの索引](chinese/message/README.md)コードのハイブリッドバージョンを定義します。 P1/P2/P3/P7/P8 と P9 結合は v1 を維持します。 P4 ベースセマティクス、P5/P6 E2EE は v2 を使用します。 規制リリースは SDK や製品が達成されていない; 公共能力宣言は練習でサポートされ、さまざまなデータリリース制限が適用されます。

**バージョンの説明:** `版本：1.2` コード/ドキュメントのリリースを、無料バージョンではなく表現します。プロファイル識別子、`protocolVersion`, インターフェイスバージョン, アルゴリズムとシグネチャ/ AAD形式は、互いに調整され、統一的に再構成することはできません. P4/P5/P6は、vNextで定義されたv2契約に従います; 他のプロファイル識別子とサンプルのワイヤバージョンフィールドは変更されません。.

## ライセンス

ルートディレクトリのライセンスは、 [Apache ライセンス 2.0(Apache-2.0)](../LICENSE).倉庫の著作権宣言は、単一の署名AMP株式会社の下にあります。著者とコントリビューターレコードは元の名前に残ります。

このプロジェクトレベルのステートメントは、履歴書、アーカイブファイル、またはサードパーティの参照資料に別々の宣言を置き換えません。

## 公益社団法人 一般社団法人 日本版著作権協会

社会貢献活動の推進に関する基本方針 _ ANPコミュニティ
この文書は以下に基づいています [Apache ライセンス 2.0](../LICENSE) 投稿されたものは自由に使用および変更できますが、この著作権に関する声明は保持する必要があります。
