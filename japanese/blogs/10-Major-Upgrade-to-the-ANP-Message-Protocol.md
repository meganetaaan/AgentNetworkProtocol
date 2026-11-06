<!-- translation-review: full; source=blogs/10-Major-Upgrade-to-the-ANP-Message-Protocol.md -->
> 日本語参考訳（原文全文照合・校閲済み）。新旧仕様の比較、発表予定日、対応範囲は原文の記述です。
> 原文: [blogs/10-Major-Upgrade-to-the-ANP-Message-Protocol.md](../../blogs/10-Major-Upgrade-to-the-ANP-Message-Protocol.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANPメッセージプロトコルの大幅な更新：エージェントの協働のための設計

最近、メッセージの送受信方式を大きく調整し、コミュニティの定例会でも考え方を紹介しました。本稿で体系的に説明します。

まず全体の重要な問いに答えます。全体像だけなら以下を、技術の詳細は後半を読んでください。

1. なぜプロトコルが必要か

以前にも論じたように、将来は組織の中だけでなく、インターネットのドメインを越えて協働するからです。特に公開インターネットで、コンテキストを最も効率的に運ぶ方法です。

2. なぜ新しいものが必要か

XMPP、Matrix、メールなどがあるのに、なぜ別に作るのでしょうか。

多くは人間向けのIMやメールのために、身元と通信を密接に結び付けています。エージェントの身元は、通信に加え、決済、取引、許可などにも必要です。

そのため、エージェントを前提とするプロトコルが必要です。ANPは、身元と業務の結合を、ほかの方法より緩く保ちます。

3. DIDを使い、身元と通信を分けるDIDCommでは駄目か

初期に調査しました。一般的な安全なメッセージの枠組みであり、完全なIMではありません。チャットシステムというより、安全な封筒、配送、上位プロトコルの入れ物です。

グループなど、IMの中心概念もありません。

4. 今回、主に何を解くか

時間はかかりましたが、価値がありました。
- **安全性**：RFC 9421とRFC 9530による署名と、標準的な本人確認を使います。
- **ドメイン間通信**：サーバーが作ったものではなく、特定の人から来たと暗号学的に証明するなど、以前の不足をproofで補います。
- **E2EE**：以前から重視し、世界でもXChatなどの主要機能です。直接通信はSignal型、グループはIETF MLSに合わせます。DIDとMLSの組み合わせで、メンバー変更の複雑さなどを解決します。
- **ファイルとそのE2EE**：直接通信とグループ双方で、転送、安全性、暗号化を包括的に扱います。
- **柔軟な封筒**：JSON-RPC 2.0を、その柔軟性のため、直接再利用します。

5. 今回、含めないもの

- **複数端末**：MatrixやSignalには強い対応がありますが、今回の仕様には加えません。ANPはドメイン間相互運用が目的です。相手が一台で受けても複数で受けても、それは内部の問題であり、外に複雑さを見せる必要はありません。全体を簡素化し、実装の自由を増やします。
- **現在は中継転送のみ**：他プラットフォームの相手と話すには、自分のメッセージサービスを使います。直接送ることは技術的に可能ですが、近くのサービスに接続し、それが中継する形が主流となり、QoSも最良だと考えるため、今回は含めません。

6. 最大の驚き

DIDの有用性です。エージェントに加え、グループとサービスにも身元を付け、多者間の本人性、権限、資格情報の難題を解決できました。

興味があれば、明日5月14日の定例会でも紹介します。議論と貢献を歓迎します。

詳細は以下、または原仕様を参照してください。
- did:wba：https://github.com/agent-network-protocol/AgentNetworkProtocol/blob/main/03-did-wba-method-design-specification.md
- 名前空間：https://github.com/agent-network-protocol/AgentNetworkProtocol/blob/main/04-anp-did-wba-name-space-specification.md
- IM仕様：https://github.com/agent-network-protocol/AgentNetworkProtocol/tree/main/message

## 概要

部分的な修正ではなく、本人確認と即時通信を、動く段階から、標準的で検証可能な、ドメイン間相互運用向けの段階へ高めます。

`did:wba`では、DIDによる要求署名に加え、**経路型DIDと公開鍵指紋の強い結び付け、DID文書の最上位の完全性証明、RFC 9421のHTTP Message Signatures、RFC 9530のContent-Digest**で、DID、鍵、文書、要求を連続して結び付けます。

メッセージは、一枚岩の仕様から、**中心のバインディング、身元と発見、直接通信の基礎、グループの基礎、直接E2EE、グループE2EE、添付とオブジェクト、連合とドメイン間通信**の八つのプロファイルへ分けます。業務、安全、転送、ドメイン間の意味を分離し、共通の外枠で再構成します。

**身元の信頼性、メッセージの階層化、暗号の標準化を高め、実システムに導入できる協働を実現する**のが価値です。

---

## 一、さらに更新する理由

以前の`did:wba`は、すでにDIDによる認証を導入していました。IMも、初期のWebSocket配送と対話型ハンドシェイクから、JSON-RPC 2.0、HPKEの直接E2EE、Sender KeyのグループE2EEに進み、会話と暗号化を実現していました。

しかし、相互接続、グループ統治、添付、連合、長期標準化では、新しい限界がありました。

1. **標準化と結び付けが不足**。経路と鍵の強い既定の結合がなく、`Authorization: DIDWba ...`は独自形式です。文書のproof、現代のTLS確認、標準のチャレンジも不十分でした。
2. **一枚岩の構造**。形式、転送、暗号、グループ、実例を一文書に入れ、最初は簡単でも、成長すると境界が曖昧になります。
3. **複雑な機能の抽象化が不足**。Sender Keyとepoch更新は動いても、大きな群、状態への結合、結果の証明、標準化に余地があります。オブジェクトと連合も独立していませんでした。

既存を否定せず、土台の上で長期保守できるプロトコル群に進めます。

---

## 二、新しい本人確認：強い結合、検証、相互運用へ

### 2.1 全体の考え方

`did:wba`は、文書の場所に加え、次に答える必要があります。
1. どの鍵に結び付くか。
2. プラットフォームが文書をひそかに差し替えていないか。
3. 対応する秘密鍵の保持者が要求したか。
4. 往復を増やさず、標準的に検証できるか。

四層で答えます。
- **DID**：既定で公開鍵指紋を経路に含めます。
- **文書**：`e1_`経路には、最上位の`proof`を必須にします。
- **要求**：`Signature-Input` / `Signature` / `Content-Digest`で署名します。
- **セッション**：成功後、`Authentication-Info`でアクセストークンを返します。

### 2.2 既定の`e1_`公開鍵指紋

**新しく作る経路型DID**では、最後の部分を`e1_`指紋にします。単なる接尾辞ではなく、鍵との関係を検証可能にします。

- **本人が保持する鍵との強い結合**
- **プラットフォームによる秘密の差し替えリスクの低下**
- **身元更新の境界の明確化**。安定した名前はHandle / WNSが扱います。

主仕様の`e1_`は**Ed25519**で、付録の`k1_`は**secp256k1**への互換拡張です。長期相互運用を重視しながら、既存の生態系も捨てません。

以前の普通の経路には、鍵指紋を直接含めませんでした。

### 2.3 公開鍵の一覧から、結合の証明へ

文書には以前から、`authentication`、`keyAgreement`、`service`と、多様な検証方法がありました。新たに、経路との一貫性も証明します。

既定の`e1_`では、次を要求します。
- 最上位に**`proof`が必須**です。
- `proof`は、**`DataIntegrityProof + eddsa-jcs-2022`を使う必要があります**。
- `proof.verificationMethod`のEd25519公開鍵のRFC 7638 thumbprintが、最後の`e1_`と**完全一致する必要があります**。

要求だけの署名から、**経路、鍵、文書の証明、認証関係**の連続した検証へ進めます。

### 2.4 独自ヘッダーから、HTTPの標準署名へ

旧形式は次でした。

```http
Authorization: DIDWba did=..., nonce=..., timestamp=..., verification_method=..., signature=...
```

動作はしても独自形式であり、既存の安全なHTTPの仕組みと統合しにくいものでした。

- **RFC 9421**の`Signature-Input`と`Signature`で署名を表します。
- **RFC 9530**の`Content-Digest`で本文の完全性を結び付けます。
- 成功時は**`Authentication-Info`**でトークンを返します。
- 失敗時は**`WWW-Authenticate` + `Accept-Signature`**で、チャレンジと次の要求が署名すべき部分を返します。

成熟したHTTPの意味にDIDを組み込み、署名の範囲、サーバーのチャレンジが明確になり、ミドルウェア、ゲートウェイ、標準ライブラリや既存実装も使いやすくなります。

### 2.5 TLS、トークン、高保証の許可

- **TLS**：Common Nameではなく、`subjectAltName.dNSName`を明示的に使います。
- **トークン**：普通の応答の`Authorization: Bearer ...`ではなく、`Authentication-Info`で返します。
- **人の確認**：`humanAuthorization`をDID文書から削除し、`authorizationLevel: user-presence-required`などの上位の方針と機能の意味で表します。文書は身元の能力の宣言に集中します。

### 2.6 本人確認の新旧比較

| 項目 | 旧方式 | 新方式 | 意味 |
| --- | --- | --- | --- |
| 経路型DID | 指紋は既定で不要 | `e1_`の経路 | 身元と鍵を強く結合 |
| 主な鍵 | 複数が並立 | `e1_`が主、`k1_`互換 | 方針と互換性を両立 |
| 文書 | 鍵とサービスの一覧 | `e1_`では最上位`proof`が必須 | 完全性と結合を統一検証 |
| 要求 | `Authorization: DIDWba ...` | `Signature-Input` + `Signature` + `Content-Digest` | 標準の相互運用 |
| 本文 | 統一項目なし | `Content-Digest` | 改変防止が明確 |
| 成功時 | 緩い意味 | `Authentication-Info` | HTTPと整合 |
| 人の確認 | 文書の`humanAuthorization` | 許可方針の層 | 責任を分離 |
| TLS | CN中心 | `subjectAltName.dNSName` | 現代の手法に整合 |

**誰のDIDか、文書は信頼できるか、本人の要求かを、完全で標準的な検証の連鎖にします。**

---

## 三、即時通信：一枚岩から、階層的なプロトコル群へ

### 3.1 一文書から八つのプロファイルへ

以前は一文書で形式、転送、直接・グループ通信、E2EE、例を理解し、基本実装を作れる利点がありました。しかし規模が増すと、バインディング、業務、暗号、オブジェクト、連合の問題が混ざります。

そこで八つに分けます。

| プロファイル | 役割 | 解く問題 |
| --- | --- | --- |
| P1 中心のバインディング | 外側を統一 | JSON-RPC、`meta/auth/body`、能力交渉、冪等性、エラー |
| P2 身元と発見 | DIDとサービスを統一 | Agent DID、Group DID、`ANPMessageService`、発見と選択 |
| P3 直接通信の基礎 | 業務を統一 | `direct.send`、内容、受理、`sender_proof` |
| P4 グループの基礎 | ライフサイクル | 作成、追加、除外、方針、`group_receipt`、Hostの順序 |
| P5 直接E2EE | 暗号の追加層 | Prekey Bundle、X3DH-like、Double Ratchet-like |
| P6 グループE2EE | 群暗号の追加層 | MLS、KeyPackage、External Commit、`did_wba_binding` |
| P7 添付とオブジェクト | 大きな物を統一 | `attachment_manifest`、Object Service、ダウンロード券、物単位の暗号 |
| P8 連合とドメイン間 | 呼び出しを統一 | 発見、転送、Group Host、Object Serviceの宛先 |

**業務、E2EE、証明、転送、連合を独立して進化させ、共通の外枠を保てます。**

### 3.2 エージェント生態系のドメイン間通信標準

単なるメッセージAPIの文書から、**異なるドメイン、場所、実装を相互接続する標準**へ位置付けを高めます。

第一級の概念は、**Agent DID、Group DID、ANPMessageService、Group Host Service、Object Service**です。

単に送るだけでなく、身元の発見、宛先、群の状態の順序、オブジェクトの制御者、成功が成立する層を明確にします。

---

## 四、主な技術の方向

### 4.1 厳格なJSON-RPC 2.0の外枠

**JSON-RPCの導入自体は初めてではありません。** 既存の形式を、さらに厳密にします。
- `params`は**オブジェクトが必須**です。
- `id`は**空でない文字列が必須**です。
- **batchは禁止**です。
- Notificationは、明示した非同期通知だけに使います。
- `params`の最上位は、`meta / auth / body`です。
- `anp.get_capabilities`で能力を交渉します。
- `operation_id`と`message_id`で冪等性と識別を統一します。
- `security_profile`で`transport-protected`、`direct-e2ee`、`group-e2ee`を分けます。

切り替えるのではなく、全体を結ぶ層として制度化します。

### 4.2 `ANPMessageService`という統一した入り口

P2は、エージェント、群、オブジェクトを、**`ANPMessageService`**にまとめます。Home、Key、Group、Join、Capability、Objectという論理的な役割を、その背後で提供できます。

従来の概略的な端点の説明から、発見と能力交渉を仕様として明確にし、連合に適した形にします。

### 4.3 HPKEの一段階初期化から、Prekey Bundle + X3DH-like + Double Ratchet-likeへ

**旧方式は、初期の三段階ECDHEではなく、すでにHPKE一段階初期化と連鎖ratchetでした。** 単純に安全でないものから安全へ、ではなく、より成熟した非同期のセッション確立へ進めます。

- **Prekey Bundle**
- **Signed Prekey / One-Time Prekey**
- **X3DH-likeによる非同期初期確立**
- **Double Ratchet-likeによる後続保護**
- **AAD結合、順序の入れ替わり、再送攻撃防止、セッション再構築**

意義は四つです。
1. 相手のオンライン応答を待たず、オフライン・非同期に適します。
2. HPKE initだけより、成熟したIMの安全モデルに近付きます。
3. 署名・アサーション鍵と`keyAgreement`鍵を分け、Bundle署名を省略できないことをP5が明示します。
4. v1は耐量子方式ではありませんが、PQXDH-likeへ進む余地を残します。

### 4.4 Sender Keysから、MLSを主流に

旧Sender Keys + epoch更新は中小群に実用的ですが、配布は**O(N)**で、メンバー変更、Welcome、外部参加、状態証明を長期の標準モデルに表しにくい限界がありました。

以前から将来方向だったMLSを、P6で主流にします。
- **MLS**が群の鍵の状態機械です。
- **did:wba**が身元の基点です。
- **did_wba_binding**がMLSの葉の署名鍵を`agent_did`に結び付けます。
- **Group Host Service**は順序と受領証を担当し、既定では平文を持ちません。
- `group_did`、`group_state_version`、`policy_hash`を暗号学的な群状態と結合します。
- **MLS PrivateMessage**で群のメッセージを運びます。

独自の動く群暗号から、長期標準化の主流に接続する、大きな変化です。

### 4.5 `sender_proof`、`actor_proof`、`group_receipt`

誰が開始し、誰が受理して順序を付け、誰が復号できるかを、厳密に分けます。

直接通信では、
- `sender_proof`が、`direct.send`を`sender_did`が始めたことを示します。
- 各hopの本人確認は、その一段の相手を示すだけで、原発信者の証明を**代替できません**。

群では、
- `actor_proof`が、操作や送信の開始者を示します。
- `group_receipt`をHostが作り、群が受理し順序を付けたことを示します。
- MLSメンバー署名が、暗号上のどの参加者がハンドシェイクや暗号文を作ったか示します。

**開始者の証明、群の結果の証言、内部の秘密性**を分けて保ち、統治を支えます。

### 4.6 添付：Manifest + Object Serviceへ

以前も`image`や`file`はありましたが、独立した完全な、ドメイン間で再利用できる仕様ではありませんでした。

P7では、
- メッセージは**`attachment_manifest`**だけを運びます。
- 実物は**Object Service**でアップロード・ダウンロードします。
- **短時間のダウンロード券**で制御します。
- 必要なら**物単位の暗号化（`object-e2ee`）**を使えます。
- 中継は**実物のバイト列を転送しません**。

制御面とデータ面を分け、大きなデータと通信経路の結合を下げます。

### 4.7 将来課題だった連合を、正式な一部に

以前は、メッセージサーバー間の通信は範囲外で、将来の課題でした。P8は正式に扱います。
- **元の業務メソッドを直接使い**、別のRelayで包みません。
- 直接通信は`direct.send`です。
- 群は`group.create`、`group.send`、`group.add`、`group.remove`などです。
- `attachment.get_download_ticket`は、最終Object Serviceへ直接送ります。
- 実物のバイト列は、サービス呼び出しの連鎖を**通してはいけません**。
- 群の成功は、**Group Hostの受理と順序付け**です。
- 直接通信の成功は、**宛先エージェントの入り口サービスの受理**です。
- `sender_proof` / `actor_proof`は保持し、中間サービスで書き換えてはいけません。

単一ドメインのAPIを超え、連合型相互運用の境界を持ちます。

---

## 五、即時通信の新旧比較

| 項目 | 旧方式 | 新方式 | 意味 |
| --- | --- | --- | --- |
| 構造 | 一枚岩 | 八つのプロファイル | 独立更新しやすい |
| 外枠 | すでにJSON-RPC 2.0 | さらに相互運用を厳格化 | 共通層を強化 |
| 発見 | 概略の端点説明 | `ANPMessageService` + `anp.get_capabilities` | 発見と交渉を仕様化 |
| 直接通信 | `send`と複数の型 | `direct.send`と基礎／E2EE追加層 | 業務と安全を分離 |
| 直接E2EE | HPKE initと連鎖ratchet | Prekey Bundle + X3DH-like + Double Ratchet-like | 非同期向け |
| 群E2EE | Sender Keys + epoch | MLSとdid:wba | 大きな群と長期標準化 |
| 群統治 | 証明の境界が弱い | Host、`group_state_version`、`group_event_seq`、`group_receipt` | 順序と結果を明確化 |
| 原発信者 | 内容と暗号が中心 | `sender_proof` / `actor_proof` / hop auth | ドメイン間と監査 |
| 添付 | 独立仕様なし | `attachment_manifest`、Object Service、券、暗号 | 大きな物を実用化 |
| 連合 | 将来の課題 | P8で接続と成功を定義 | 連合プロトコルへ |

**動くメッセージ方式から、ドメイン間の生態系に適し、長く進化できるプロトコル群へ高めます。**

---

## 六、五つの重要な特徴

### 6.1 標準化

RFC 9421、RFC 9530、W3C Data Integrity、MLSに整合し、JSON-RPC 2.0を厳格化します。内部の独自方式より、長期の標準化に近い設計です。

### 6.2 身元の強い結合

`e1_`と文書のproofで、DID、鍵、文書を、論理的な関係から、仕様上の必須の検証へ進めます。中心的な安全性の向上です。

### 6.3 業務と安全の分離

`transport-protected`、`direct-e2ee`、`group-e2ee`を必要に応じて重ね、基礎業務を独立して動かせます。段階導入と将来の更新に向きます。

### 6.4 連合と転送を主流に

添付、券、ドメイン間転送、Hostの順序、Object Serviceの宛先を、実装任せや将来課題から、主仕様に移します。

### 6.5 会話を超える協働

重要語はmessageに加え、DID、discovery、proof、governance、object、federation、receiptです。

**E2EE付きチャットを超える、ドメイン間協働のプロトコル**です。

---

## 七、発表する際の説明順

社内外で紹介するなら、次を勧めます。

### 第一：更新の目的

用語の変更ではなく、身元の信頼、自然な相互接続、明確な群統治、長期の進化を説明します。

### 第二：身元

**経路の結合、文書の証明、標準の要求署名**を強調します。

### 第三：通信の階層

チャットAPIの文書ではなく、階層的なプロトコル群だと理解してもらいます。

### 第四：暗号の変化

- 直接通信は、HPKE initから、Prekey Bundle + X3DH-like + Double Ratchet-likeへ。
- 群は、Sender Key + epochから、MLSの主流へ。

### 第五：実装上の価値

独立したデータ面、直接の業務メソッド、群の受領証、統一した発見を示します。暗号の設計だけでなく、現実のシステム向けの工学です。

---

## 八、結び

**本人確認は、認証できる段階から、強い結合・証明・標準化へ。通信は、会話と暗号化から、階層化・統治・連合・長期進化へ進みます。**

作って動かす課題の次は、**本当に相互運用でき、検証・拡張できる基盤にすること**です。

---

## 付録：スライドに使える12ページ構成

### 1ページ：表題
- did:wbaからANPへ：次世代の本人確認と端末間暗号化IM
- エージェント生態系のドメイン間通信標準

### 2ページ：更新理由
- 身元の結合の弱さ
- 一枚岩の構造
- 群、添付、連合の独立した抽象化の不足

### 3ページ：本人確認の全体像
- DID経路の結合
- DID文書のproof
- HTTP Message Signatures
- Content-Digest
- アクセストークンによるセッション最適化

### 4ページ：新旧のdid:wba
- `e1_` / `k1_`
- `proof`
- `Signature-Input`
- `Authentication-Info`
- `humanAuthorization`の意味を上位へ

### 5ページ：構造図
- P1～P8の階層
- 業務／安全／オブジェクト／連合

### 6ページ：共通の外枠
- 厳格なJSON-RPC 2.0
- `meta/auth/body`
- `operation_id`
- `message_id`
- `anp.get_capabilities`

### 7ページ：直接E2EE
- Prekey Bundle
- X3DH-like
- Double Ratchet-like
- 非同期の確立
- 再送攻撃と順序入れ替わりの処理

### 8ページ：群E2EE
- Group DID
- Group Host
- MLS
- `did_wba_binding`
- `group_receipt`

### 9ページ：原発信者と群の結果
- `sender_proof`
- `actor_proof`
- hop-level auth
- `group_receipt`

### 10ページ：添付と転送
- `attachment_manifest`
- Object Service
- ダウンロード券
- 物単位の暗号化
- 独立したデータ面のダウンロード

### 11ページ：連合とドメイン間
- 元の業務メソッドを直接利用
- 群の成功はHostの順序付け
- 券の最終宛先はObject Service
- 中継は実物のバイト列を転送しない

### 12ページ：まとめ
- 信頼できる身元
- 標準的な暗号
- 階層的な仕様
- 導入できる工学
- ドメイン間の生態系に適した設計

必要なら、さらに10分の発表原稿に短縮できます。

## 著作権表示

Copyright (c) 2024 ANP Community
このファイルは[MITライセンス](../../LICENSE)で公開されています。自由に利用・変更できますが、この著作権表示を保持してください。
