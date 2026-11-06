<!-- translation-review: partial; scope=protocol-identifier paragraphs at source lines 93,131,290; remainder=machine-unreviewed -->
> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [chinese/06-ANP-智能体通信元协议规范.md](../../chinese/06-ANP-智能体通信元协议规范.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP-Agent 通信要素プロトコル仕様 (草案)

- 文書番号: ANP-06
- タイトル: ANP-Agent 通信要素プロトコル仕様
- ステータス: ドラフト
- バージョン: 1.2
- 原文言語: 中文 / このページは日本語参考訳
- 適用範囲: この仕様は、セマンティックメタプロトコルネゴシエーション、インターフェース選択、プロファイル選択、セキュリティモード選択、スキーマ選択、および ANP エージェント間のネゴシエーション結果の再利用に適用されます。

備考:

- メタプロトコルは、エージェントの共同プロセスに必須のプロトコルではなく、オプションのプロトコルです。通常の状況では、エージェント ID、メッセージ、検出、説明などのプロトコルは、ほとんどの相互運用性要件をすでに満たしています。メタプロトコルは主に、2 つのエージェント間の固有のインターフェイス、一時的な合意、または特別な実行制約の動的なネゴシエーションを必要とするシナリオで使用されます。
- この仕様は現在ドラフト状態であり、まだリリースされていません。その目標は、初期のメッセージインメタプロトコル ネゴシエーション モデルを、現在の ANP 記述、検出、コア バインディング、DID 認証、およびメッセージ プロファイル システムと互換性のある独立したネゴシエーション プロファイルにアップグレードすることです。
- この命令はAMP-07スマートなボディ記述の議定書を変更しません;この定義のテキスト `MetaProtocolInterface` ANP-06 で定義されたエクステンションインターフェイスの型であり、Agent Description で宣言できます。 `interfaces` 配列。
- 今回規範が使用されるべき新しい定義 `anp.meta.negotiation.v1` とりあえず `anp.negotiate`. 初期の暗号化された社内バイナリに基づく `PT=00` 相談のモダリティは放棄され、この規範は過去と互換性を必要としません。

## 概要

メタプロトコルとは「通信プロトコルを交渉するためのプロトコル」です。エージェント ネットワークでは、発信者とターゲット エージェントが、意図、機能、制約、セキュリティ要件、および使用可能なインターフェイスに基づいて、後続のビジネス インタラクションを実際に実行するときに使用するプロトコル、インターフェイス、プロファイル、スキーマ、コンテンツ タイプ、および実行モードを選択できるようにするために使用されます。

この仕様は、ANP メタプロトコルを独立したセマンティック ネゴシエーション プロファイルに再定義します。

```text
Agent Discovery
  -> Agent Description
  -> MetaProtocolInterface
  -> anp.get_capabilities
  -> anp.negotiate
  -> selected interface / profile / security profile / schema
  -> business call or message exchange
```

「メッセージ ペイロードでバイナリ プロトコル タイプを使用してメタ プロトコル、アプリケーション プロトコル、自然言語プロトコル、認証プロトコルを区別する」という以前の設計とは異なり、この仕様は新しいトランスポート層を定義せず、新しい暗号化されたメッセージ形式を定義せず、ANP コア バインディングを置き換えません。メタプロトコル ネゴシエーション メッセージは、既存の ANP エンドポイントで通常の ANP JSON-RPC リクエストとして実行する必要があります。

## 1. 背景と課題

インテリジェント間の相互運用性は通常、オープンな説明に依存します。ターゲットインテリジェンスは、エージェント防衛による機能、インターフェイス、セキュリティ要件を明示し、その説明が呼び出し元によって読み込まれている適切なコール方法を選択します。インテリジェントとインタフェースの種類が増えるにつれて、静的な説明だけで問題が発生します。

1. **静的説明は、ランタイムの変更を上書きできません**サービス終了制限フロー、利用可能なセキュリティモデル、一時的に閉じられたインタフェース、ユーザー認証ステータスおよびデプロイメント戦略は、動的変更の対象となります。
2. **同じインテントの間に複数のインターフェイスがあるかもしれません。**: 例えば、ホテルの予約は構造化されたOpenRPCインターフェイスか自然言語情報インターフェイスによってどちらかをすることができます。
3. **コールアの能力も選択に影響を与えます。**: AMP プロファイル、セキュリティモード、コンテンツタイプ、またはウォークイン実行モードをサポートするかどうかは、最終的な合意選択に影響を及ぼします。
4. **自然言語でのアドホックの相談費用が高い**::: 自然言語の複数の相談ラウンドに関する完全な信頼性は柔軟性を高めることができますが、遅延、コスト、不確実性を増加させる可能性があります。
5. **初期メッセージの相談モデルは、現在のプロトコルから切断されます。**: 初期 AMP-06 は暗号化されたメッセージのロードを直接拡大し、バイナリを使用する `PT` プロトコルタイプを区別するフィールド。現在のAMPは、DIDディスカバリー、エージェントのディスクリプションに制限されています。`ANPMessageService`、JSON-RPC 2.0の中心の結合および実行時間機能確認。

AMP-06 では、メタプロトコルを「シンタックス協定管理領域」として位置付けています。運用データが実行されていないため、両方の当事者が操作を行う前にどの相互運用性経路を使用するべきかを判断するのに役立ちます。

### 1.1 設計ソース

AMPメタプロトコルの設計リファレンスとレッスン [Agoraプロトコル(紙:*大規模言語モデルのネットワークのためのスケーラブルな通信プロトコル*）](https://arxiv.org/html/2410.11905v1)APPは、メタ合意、自然言語の柔軟性、構造化された合意における効率性を通じてスマートボディコミュニケーションの考え方を調整します。AMPは、これらのアイデアを独自のインテリジェントな身体の説明、発見、識別およびコア結合構造と組み合わせています。特定の相談インターフェイスと相互運用性要件はこの規範によって定義されています。

## 2. 目的と非ターゲットの設計

### 2.1 デザイン目的

ノームの目的は次のとおりです。

- 標準を定義する`anp.meta.negotiation.v1`；
- エージェントの説明で宣言を定義する `interfaces` 配列 `MetaProtocolInterface`；
- 再制定ANPの中心の結合JSON-RPC 2.0、`params.meta/body/auth`、`profile`、`security_profile`、`target` エラーモデル;
- 再使用 `anp.get_capabilities` (b) 実行時能力の検証方法として
- 定義 `anp.negotiate` 呼び出し者の意図、機能および制約に基づいて最終的な実装インタフェースの選択のための方法論;
- 構造化されたインターフェイス優先順位、自然言語のフォールバック、キャッシュおよび将来の合意のリリースをサポート
- 早期に識別する `PT=00` 相談モデルは放棄され、現在の規範と互換性がありません。

### 2.2 非ターゲット

この規範は定義しません。

- 新しい転送層、セッションレベルまたはバイナリヘッダー。
- 新しい DID 方法論または新しい同一証明のメカニズム;
- (a) エンドツーエンドの暗号化アルゴリズム
- `anp.get_capabilities` 完全な指定;方法は中心の結合によって定義されます;
- ビジネスインターフェースの要求、応答およびステータスマシン自体。
- 強制AIコード生成、リモートコードの読み込みまたはコード交換プロセス;
- インターネットベースのプロトコル登録フォーム、コンセンサス選挙アルゴリズムまたは経済インセンティブ。

## 3. 既存のANP合意との関係

### 3.1 エージェントの記述との関係

AgentDescription は、DID、所有者、情報リソース、インターフェイス、セキュリティ設定を記述するスマートのオープンエントリーです。 `MetaProtocolInterface` 入力の種類 `interfaces` 宣言の配列で拡張されたインタフェースの種類:

- スマートボディはAMP-06の慣習の相談を支えます;
- 相談のエンドポイントはどこにありますか。
- どのエンドポイントが使用できるか。
- コンサルティングのアプローチはどのようなものをサポートしていますか。
- 相談できる科目は、例えば、プロファイル、インターフェイス、スキーマ、セキュリティプロファイル、コンテンツタイプとエクスポートモードです。

この命令は、ANP-07 の変更を必要としません。 達成者は、エージェントの説明の既存の構造を維持しながら、 `MetaProtocolInterface` 拡張機能として `Interface` オブジェクトのリリース。

### 3.2 エージェントのディスカバリーと関係

発見の手順は引き続き ANP-08 が定義します。呼び出し側は、まず次の方法を利用できます：

```text
https://{domain}/.well-known/agent-descriptions
```

エージェントの防衛URLを入手し、ターゲットスマートボディの説明文書を読んでから取り出します `interfaces` センターファインド `MetaProtocolInterface`。

### 3.3 コア結合との関連

AnAP-06 ANPコア結合によるランタイムメッセージ

- JSON-RPC 2.0 の仕様
- `params.meta`、`params.auth`、`params.body` 構造;
- `meta.profile` リクエストの説明を提示する。
- `meta.security_profile` この要求で使用されるセキュリティモデルを表現する。
- `meta.target` (b) ゴールモデリングを表現する。
- JSON-RPCの特長 `error` オブジェクトのロードエラー。

`anp.negotiate` ・・・ `params.meta.profile` MUST エクワル:

```text
anp.meta.negotiation.v1
```

### 3.4 DID文書とANPMESSAGEサービスに関する関係

年齢の記述 `MetaProtocolInterface.url` 本人確認、サービス発見権はID文書にはまだ公開されています。 `ANPMessageService`, 実行時間の能力の権限は、から来る `anp.get_capabilities` 結果を返します。

エージェント防衛、DID文書およびランタイム機能が競合する際の呼び出し SHOULD 下記の注文でディールしてください。

1. DID 文書と DID の解像度を使用して、アイデンティティとサービスのエンドポイントの信頼を作成します。
2. コールセンター `anp.get_capabilities` (a) 実行時間機能を必要とする。
3. エージェントの説明 `MetaProtocolInterface` (a) 発見と意味論としてのヒント。
4. 静的ヒントが実行時能力に対抗している場合の呼び出し側 MUST 実行時容量の結果に基づいており、ローカルキャッシュをリフレッシュします。

### 3.5 DIDと関連:WBAとセキュリティメカニズム

本仕様は、DID メソッドや認証を再定義しません。共通のリクエスト認証、HTTP Message Signatures、access token は [ANP-02](02-ANP-基于DID的身份认证协议.md) に従います。WBA メソッドの検証は [ANP-03](03-did-wba方法规范.md) に従い、他の DID は各メソッドの規則に従って検証します。`auth.origin_proof` とメッセージサービス間の検証は、関連するメッセージング P1/P2 および所属する Profile のセキュリティ要件に従います。文書バージョン 1.2 は、本仕様の草案という状態や `anp.meta.negotiation.v1` という wire 識別子を変更しません。

`anp.negotiate` 相談の結果は、識別文書、承認証明書、アクセストークン、検証可能なクレジットまたは人的エンパワーメントからなかった。

## 4. プロフィールの同一証明および最低の相互運用

### 4.1 プロフィール名

この命令で定義されるプロファイルの名前は次のとおりです。

```text
anp.meta.negotiation.v1
```

代理店の記述、`anp.get_capabilities` 戻り値、`params.meta.profile` 相談の参考文献は必ずご使用ください。

### 4.2 標準方法論

この規範は、標準のアプローチを定義します。

```text
anp.negotiate
```

メソッドは、呼び出し元意図、呼び出し主機能、候補インターフェイスおよび制約に基づいて、その後の操作、インタフェース、プロファイル、セキュリティモード、コンテンツタイプ、スキーマおよび実装モデルの対話的な容量を返すために使用されます。

### 4.3 最小相互運用可能な要件

支援のための1つ。 `anp.meta.negotiation.v1` 少なくとも MUST サポート:

1. 稼働時間能力宣言 `anp.meta.negotiation.v1`；
2. メタプロトコルの交渉をサポートするエンドポイントで対処 `anp.negotiate`；
3. 認証情報 `MetaProtocolInterface` フィールドは以下のように置換されます。`type`、`profile`、`binding`、`url`、`methods`；
4. 支援サービス `transport-protected` セキュリティモデルに基づく相談
5. リターン構造 `NegotiationResult`；
6. サポートされていないプロファイル、インターフェイス、セキュリティモードまたはコンテンツタイプに対するエラーを返します。
7. 協議の結果は、運用実施権の委任として解釈されるものではありません。

## 5. MetaProtocolインターフェイスの声明

### 5.1 セマティクス

`MetaProtocolInterface` これは、インテリジェントなボディのためのオープンなセマンティックプロトコルのコンサルテーションインターフェイスです。これはAgentDescriptionです `interfaces` . 配列の拡張インターフェイスのタイプ。

インターフェイスは説明を担当します。

- (a) コール担当者が相談依頼を送るべきURL
- ご利用のご相談
- コンサルティングのアプローチはどのようなものをサポートしていますか。
- (b) 相談できる対象者
- セキュリティ設定が必要なのは?

### 5.2 フィールド定義

| フィールド | 仕様 | リクエスト | 注釈 |
|---|---|---|---|
| `id` | 文字列 | SHOULD | インターフェイスの安定したマーカーは、協議の結果を参照するために使用される。 |
| `type` | 文字列 | MUST | 固定式 `MetaProtocolInterface`。 |
| `protocol` | 文字列 | SHOULD | おすすめ商品 `ANP`つまり、これはAMPプロトコルインターフェイスです。 |
| `version` | 文字列 | SHOULD | インターフェイス版。 |
| `profile` | 文字列 | MUST | 固定式 `anp.meta.negotiation.v1`。 |
| `binding` | 文字列 | MUST | このバージョンは読み込まれる `jsonrpc-2.0`。 |
| `url` | 文字列 | MUST | URL を補完します。URL は静的ヒントであり、DID ドキュメントで実行する必要があります。 `anp.get_capabilities` あり。 |
| `methods` | 配列 | MUST | 組織図 `anp.negotiate`通常は含まれています `anp.get_capabilities`。 |
| `security` | 配列/文字列 | MAY | Agent 説明のセキュリティ定義を参照します。 |
| `securityProfiles` | 配列 | SHOULD | サポートされているセキュリティモデル、例えば `transport-protected`、`direct-e2ee`。 |
| `negotiates` | 配列 | SHOULD | 相談できる人のリスト。 |
| `inputSchema` | 文字列 | MAY | 相談は、シェマのURIを要求しました。 |
| `outputSchema` | 文字列 | MAY | 相談の結果は、スキーマのURIからあります。 |
| `description` | 文字列 | SHOULD | 人間の読みやすいメモ。 |

### 5.3 相談対象者

`negotiates` 共通の値には、

| バリュー | 注釈 |
|---|---|
| `profiles` | ANPプロファイルを使用するため、その後の業務に関する相談。 |
| `interfaces` | 後日使用する相談 |
| `schemas` | シェマへのご相談・対応 |
| `security_profiles` | セキュリティーのモダリティに関する相談 |
| `content_types` | 相談の種類。 |
| `execution_modes` | 呼び出し、メッセージ、ウォークイン、流暢または自然な言語のフォールバックモードの実行を同期させるようにします。 |
| `protocol_artifacts` | 予測、消化またはURIを含むプロトコルを再利用するために、相談を使用することができます。 |

### 5.4宣言例

```json
{
  "id": "interface.negotiation.default",
  "type": "MetaProtocolInterface",
  "protocol": "ANP",
  "version": "1.0",
  "profile": "anp.meta.negotiation.v1",
  "binding": "jsonrpc-2.0",
  "url": "https://grand-hotel.com/anp",
  "methods": [
    "anp.get_capabilities",
    "anp.negotiate"
  ],
  "security": ["didwba_sc"],
  "securityProfiles": [
    "transport-protected"
  ],
  "negotiates": [
    "profiles",
    "interfaces",
    "schemas",
    "security_profiles",
    "content_types",
    "execution_modes"
  ],
  "description": "Semantic meta-protocol negotiation interface for selecting the best execution interface."
}
```

### 5.5 推奨エンドポイント展開

アクコンプリシャ SHOULD 統合AMPエンドポイントへの優先順位:

```text
https://example.com/anp
```

このエンドポイントはサポートできます。

```text
anp.get_capabilities
anp.negotiate
direct.send
group.send
...
```

アクコンプリシャ MAY メタ・アグリーメント交渉のためのスタンド・アローンのエンドポイントの展開など:

```text
https://example.com/anp/negotiation
```

しかし、これは、必須プロトコルではなく、デプロイメントオプションです。 URL組織、サービスステータス、実行中の時間容量がDID文書として維持されるべきかどうか `anp.get_capabilities` 確認します。

## 6. 相談窓口

### 6.1 全体的なプロセス

```text
Caller Agent
  -> discover Agent Description
  -> parse MetaProtocolInterface
  -> resolve target DID and ANPMessageService
  -> call anp.get_capabilities
  -> call anp.negotiate
  -> receive NegotiationResult
  -> invoke selected interface or profile
```

### 6.2 ステップ1:エージェントの説明が見つかりました

呼び出し側は、ANP-08 の能動的発見、またはその他の信頼できる経路を通じて、対象の Agent Description URL を取得します。

### 6.3 ステップ2:MetaProtocolインターフェイスを解析する

コールアはエージェントの説明を読み込み、 `interfaces` 配列で探す:

```json
{
  "type": "MetaProtocolInterface",
  "profile": "anp.meta.negotiation.v1"
}
```

ターゲットエージェントがステートメントを持たない場合 `MetaProtocolInterface`, コール MAY：

- エージェントの説明で構造化されたインターフェイスを直接使用;
- 自然な言語インターフェイスの使用;
- (b) 自動相談の終了と手動処理の要求;
- 既に予約済み契約を利用してください。

### 6.4 ステップ3:時間から時間の能力の認識

コールア SHOULD 初回のやり取り前に電話をかける `anp.get_capabilities`. この方法は、現在サポートされているプロファイル、セキュリティモード、コンテンツタイプ、およびターゲットエンドポイントの制限を返します。

`anp.get_capabilities` 匿名性コール; サービスエンドが呼び出し主 ' s のアイデンティティ、発信者に基づいて異なる能力に戻る場合 MAY 認証後、再度電話をしてください。

### 6.5 ステップ4: 相談

コールメール送信 `anp.negotiate` 要求、運ぶ:

- コールアインセント;
- (a) 必須の容量;
- (a) ケーパーがサポートするプロファイル、セキュリティモードおよびコンテンツタイプ。
- インターフェイス参照のための候補者;
- 遅延、認可、自然言語のフォールバック等。

ターゲット スマート ボディは静的な記述、連続した時間機能、ローカル戦略、公認の状態および発信者の機能に従って戻ります `NegotiationResult`。

### 6.6 ステップ5:ビジネスインターフェイスの実装

コピーする。 `NegotiationResult` 、発信者の出版物 `result.selected` とりあえず `result.execution` 実際のビジネスコールや情報をインタラクティブに実行します。

`anp.negotiate` 応答は、運用上の応答ではありません。

## 7. `anp.negotiate` 方法論

### 7.1 方法のセマティクス

`anp.negotiate` メタアグリーメント協議の実施のためのJSON-RPC 2.0 Requestメソッド。

方法の名前:

```text
anp.negotiate
```

リクエスト `params.meta.profile` MUST エクワル:

```text
anp.meta.negotiation.v1
```

ターゲットモデリングは通常モデルです `agent-addressed`. デプロイメントがサービススコープ制御の顔機能として交渉されるメタプロトコルが露出したときに特定のプロファイルまたは文書の実現 MUST (b) 目的の結合のためのルールの明確な声明。

### 7.2 要求の構成

```json
{
  "jsonrpc": "2.0",
  "id": "req-neg-001",
  "method": "anp.negotiate",
  "params": {
    "meta": {
      "profile": "anp.meta.negotiation.v1",
      "security_profile": "transport-protected",
      "sender_did": "did:wba:user.example.com:agents:personal-assistant:e1_example",
      "target": {
        "kind": "agent",
        "did": "did:wba:grand-hotel.com:service:hotel-assistant:e1_example"
      },
      "operation_id": "op-neg-001",
      "created_at": "2026-06-27T12:00:05Z",
      "content_type": "application/json"
    },
    "auth": {
      "origin_proof": {
        "type": "anp-rfc9421-origin-proof-v1",
        "keyid": "did:wba:user.example.com:agents:personal-assistant:e1_example#key-1",
        "contentDigest": "sha-256=:BASE64URL_DIGEST:",
        "signature": "BASE64URL_SIGNATURE"
      }
    },
    "body": {
      "negotiation_id": "neg-20260627-001",
      "mode": "structured_selection",
      "intent": {
        "name": "book_hotel_room",
        "description": "Book a hotel room for two people next Friday.",
        "intentTags": [
          "hotel.booking",
          "reservation.create"
        ]
      },
      "requiredCapabilities": [
        "cap.hotel.booking"
      ],
      "callerCapabilities": {
        "supportedProfiles": [
          "anp.core.binding.v1",
          "anp.direct.base.v1",
          "anp.rpc.v1"
        ],
        "supportedSecurityProfiles": [
          "transport-protected",
          "direct-e2ee"
        ],
        "supportedContentTypes": [
          "application/json",
          "text/plain"
        ]
      },
      "constraints": {
        "preferredInterfaceTypes": [
          "StructuredInterface",
          "NaturalLanguageInterface"
        ],
        "requiresHumanAuthorization": true,
        "maxLatencyMs": 3000,
        "allowNaturalLanguageFallback": true
      },
      "candidateInterfaceRefs": [
        "interface.booking.structured.v1",
        "interface.conversation.nl.v1"
      ]
    }
  }
}
```

### 7.3 `body` フィールド定義

| フィールド | 仕様 | リクエスト | 注釈 |
|---|---|---|---|
| `negotiation_id` | 文字列 | SHOULD | (d) 相談プロセスの特定。 |
| `mode` | 文字列 | SHOULD | 相談モード、デフォルト `structured_selection`。 |
| `intent` | オブジェクト | MUST | 呼び出し側は、完了する意思です。 |
| `requiredCapabilities` | 配列 | MAY | 呼び出し側が満足する必要を考慮すべき機能識別子。 |
| `callerCapabilities` | オブジェクト | SHOULD | コールアの実行時間容量。 |
| `constraints` | オブジェクト | MAY | 遅延、認可、インターフェイスの好み、保証好み等。 |
| `candidateInterfaceRefs` | 配列 | MAY | コールアは、Agent Description からインターフェイス ID の候補を選択します。 |
| `candidateProtocols` | 配列 | MAY | プロトコル、記事、ファイル、またはURIを区別できます。自然言語の大きな部分のテキストだけでなく、コンテンツを処理するために単一のマシンとして使用される必要があります。 |

### 7.4 `intent` オブジェクト

`intent` 発信者が達成したいものを表現するため。 SHOULD 構造ラベルも含ま MAY 自然言語の説明が含まれています。

```json
{
  "name": "book_hotel_room",
  "description": "Book a hotel room for two people next Friday.",
  "intentTags": [
    "hotel.booking",
    "reservation.create"
  ],
  "inputSummary": {
    "city": "Hangzhou",
    "guests": 2,
    "date": "2026-07-03"
  }
}
```

コールア SHOULD 開示の原則は、相談段階において、事業を完了する必要がないため、必要でないと判断し、機密性の高いデータが提供されないものとします。

### 7.5 `callerCapabilities` オブジェクト

`callerCapabilities` 今回サポートする呼び出し者の能力を記述します。一般的なフィールドには以下が含まれます:

| フィールド | 仕様 | 注釈 |
|---|---|---|
| `supportedProfiles` | 配列 | Ananp プロフィール、呼び出し側でサポート |
| `supportedSecurityProfiles` | 配列 | 呼び出し側がサポートするセキュリティモデル。 |
| `supportedContentTypes` | 配列 | 処理するために呼び出すことができるコンテンツの種類。 |
| `supportedExecutionModes` | 配列 | 呼び出し主のための実装の許容モード。 |
| `limits` | オブジェクト | コールアーの制限は、メッセージサイズ、タイムアウトなどです。 |

### 7.6 `constraints` オブジェクト

`constraints` 共通フィールドには以下のものが含まれます:

| フィールド | 仕様 | 注釈 |
|---|---|---|
| `preferredInterfaceTypes` | 配列 | 優先インターフェイスタイプ、例えば。 `StructuredInterface`。 |
| `requiresHumanAuthorization` | ブーリアン | 人間が認めるという意思であっても、その場は単なる相談者であり、その人は正当に満たしているという意味ではありません。 |
| `maxLatencyMs` | 整数 | 最大の遅延を期待します。 |
| `allowNaturalLanguageFallback` | ブーリアン | 自然言語プロトコルや自然言語のインターフェイスの戻りを許可するかどうか。 |
| `requiredSecurityProfile` | 文字列 | セキュリティモデルを使用する必要があります。 |
| `preferredContentTypes` | 配列 | 推奨コンテンツタイプ。 |

## 8. ネゴシエーション・レサルト・オブジェクト

### 8.1 成功した応答

`anp.negotiate` 成功時帰国 `result`：

```json
{
  "jsonrpc": "2.0",
  "id": "req-neg-001",
  "result": {
    "negotiationId": "neg-20260627-001",
    "status": "accepted",
    "selected": {
      "capability": "cap.hotel.booking",
      "interface": "interface.booking.structured.v1",
      "protocol": "openrpc",
      "profile": "anp.rpc.v1",
      "securityProfile": "transport-protected",
      "contentType": "application/json",
      "url": "https://grand-hotel.com/api/booking.openrpc.json"
    },
    "execution": {
      "mode": "direct_structured_call",
      "requiresHumanAuthorization": true,
      "timeoutMs": 3000
    },
    "schemas": {
      "requestSchema": "https://grand-hotel.com/schemas/create-booking-request.schema.json",
      "responseSchema": "https://grand-hotel.com/schemas/create-booking-response.schema.json"
    },
    "validUntil": "2026-06-27T12:10:05Z",
    "negotiationDigest": "sha-256:BASE64URL_DIGEST"
  }
}
```

### 8.2 フィールド定義

| フィールド | 仕様 | リクエスト | 注釈 |
|---|---|---|---|
| `negotiationId` | 文字列 | MUST | 相談の結果の特定。 |
| `status` | 文字列 | MUST | `accepted`、`rejected` または `needs_more_information`。 |
| `selected` | オブジェクト | いつ? `accepted` タイムタイム MUST | 選択した機能、インターフェイス、プロトコル、データ、セキュリティモード、コンテンツタイプ、URL。 |
| `execution` | オブジェクト | SHOULD | フォローアップ実装のモダリティと執行制約。 |
| `schemas` | オブジェクト | MAY | スキーマへのリクエストと対応 |
| `validUntil` | 文字列 | MAY | ご相談内容の回答は、有効です。 |
| `negotiationDigest` | 文字列 | SHOULD | キャッシュおよび再利用に使用するための協議の結果の概要。 |
| `alternatives` | 配列 | MAY | フォルダを削除できません: %s: このようなフォルダーはありません |
| `reason` | 文字列 | MAY | 情報を拒否したり、必要としたりする人は指示を読むことができます。 |

### 8.3 `selected` オブジェクト

`selected` 一般的なフィールドには、以下が含まれます。

| フィールド | 注釈 |
|---|---|
| `capability` | 選択された機能 ID。 |
| `interface` | 選択された年齢防衛インターフェイスID。 |
| `protocol` | インターフェイスのプロトコル(例:) `openrpc`、`ANP`、`MCP`。 |
| `profile` | ANPプロファイルのフォローアップ操作コール。 |
| `securityProfile` | 続いての操作のためのセキュリティモデル。 |
| `contentType` | フォローアップ荷重の種類。 |
| `url` | フォローアップビジネスインターフェイスやインターフェースの説明URL。 |
| `protocolArtifact` | 任意議定書のアーティファクトのURIか消化器。 |

### 8.4 `execution` オブジェクト

`execution.mode` 共通の値には、

| バリュー | 注釈 |
|---|---|
| `direct_structured_call` | 構造化されたインターフェイスを直接呼びます。 |
| `direct_message` | チャットデータをプライベートチャットで利用 |
| `group_message` | グループメッセージプロファイルを使用する。 |
| `async_task` | 異なるタスクや、非接触のコラボレーションプロセスを作成します。 |
| `stream` | フローベースのインタラクションを使用します。 |
| `natural_language` | 自然言語インターフェイスを使用します。 |
| `natural_language_protocol_drafting` | 自然言語におけるドラフトの中間合意。 |

## 9. 自然言語プロトコルのドラフト

構造化された相談はこの規範の主パスです。自然言語プロトコルは、次の点に適用されるフォールバックとして作成されました。

- ターゲットエージェントは、意図を満たすための構造化されたインターフェイスを持たない。
- (a) 発信者やターゲット、プロフィール、またはスキーマに対する一般的なサポートはなし。
- 締約国は、暫定的に実験的な合意を生成する必要があります。
- 作業の頻度が低い、一回または高レベルの個人化。

コールアは、 `anp.negotiate` 要求のリクエスト:

```json
{
  "mode": "natural_language_protocol_drafting",
  "constraints": {
    "allowNaturalLanguageFallback": true
  }
}
```

自然言語のフォールバック MAY 契約書の草案は現れますが、両当事者が承諾するまでの合意は安定化契約と見なさないものとします。 SHOULD 自然言語のドラフトは、構造化されたフィールド、スキーマ、例、テスト例に変換されます。

## 10. キャッシュ、再利用、プロトコル

### 10.1 相談の結果のキャッシュ

コールア MAY キャッシュ `NegotiationResult`アクティブ期間中に、およびリセット。キャッシュキー SHOULD 少なくとも含まれます:

- ターゲットDID;
- コールワーDIDまたは呼び出し機能の概要;
- 意図ラベルまたは規範的な意図要約;
- 選択されたインターフェイス ID;
- `selected.profile`；
- `selected.securityProfile`；
- `negotiationDigest`。

呼び出し人の場合 SHOULD 再構成:

- `validUntil` 有効期限;
- `anp.get_capabilities` キャッシュで不連続なリターン
- DD文書または `ANPMessageService` 変更点
- (a) 従属する操作コールバックは、プロファイル、インタフェース、セキュリティモード、コンテンツタイプをサポートしていません。
- 現地のポリシー、セキュリティ要件、ユーザー認証ステータスの変更

### 10.2 合意

プロトコルは、合意がオブジェクトを記述するので再使用可能です。MAY 含まれるもの:

- `protocol_id`；
- `protocol_uri`；
- `version`；
- 方法のリスト;
- (a) スキーマへのリクエストと対応
- サポートされているセキュリティモデル;
- コンテンツの種類;
- 事例:
- (a) 試験例;
- 消化器;
- サインまたは出版社情報。

事例:

```json
{
  "protocol_id": "example.product-info.v1",
  "protocol_uri": "https://example.com/protocols/product-info/1.0",
  "version": "1.0",
  "description": "Get product information by product ID.",
  "depends_on_profiles": [
    "anp.core.binding.v1"
  ],
  "methods": [
    {
      "name": "product.get_info",
      "request_schema_uri": "https://example.com/schemas/product-info-request.json",
      "response_schema_uri": "https://example.com/schemas/product-info-response.json"
    }
  ],
  "content_types": [
    "application/json"
  ],
  "security_profiles": [
    "transport-protected"
  ],
  "digest": "sha-256:BASE64URL_DIGEST"
}
```

この命令は、グローバル登録フォームを定義しません。 規制の出版物、監査、署名、バージョンガバナンスおよび合意メカニズムは将来の規範によって定義されます。

### 10.3 初期の0RTTアプローチとの関係

初期AMP-06のRTT設計は、ハンズキーメッセージによって行われます `usedProtocolHash` この規範は新しいハンズンメッセージを定義しません。

1. コールアーキャッシュ `NegotiationResult` または合意;
2. 選択したプロファイル/インターフェイス/スキーマを使用して直接フォローアップリクエスト。
3. 対象エンドポイントがこのオプションをサポートしていない場合は、指定されたエラーを返します。
4. エラーに基づく呼び出し元リコール `anp.get_capabilities` とりあえず `anp.negotiate`。

## 11. エラーモデル

`anp.negotiate` JSON-RPPC の使用 `error` オブジェクトはエラーを返します。AMP が誤った範囲をカスタマイズし、エラーを返すことを推奨します。 `error.data.anp_code` マシン識別可能なエラーコードを提供します。

| 郵便番号 | サインイン_郵便番号 | 意味する |
|---|---|---|
| 1600 | `meta.negotiation_rejected` | 相談を依頼する目的はお断りします。 |
| 1601 | `meta.no_matching_interface` | インターフェイスがインセントと制約を満たしません。 |
| 1602 | `meta.unsupported_negotiation_mode` | ご要望のご相談はお受けしておりません。 |
| 1603 | `meta.unsupported_candidate_profile` | プロフィールはサポートしていません。 |
| 1604 | `meta.unsupported_security_profile` | 候補者のセキュリティモデルはサポートされていません。 |
| 1605 | `meta.unsupported_content_type` | 候補者のコンテンツの種類はサポートされていません。 |
| 1606 | `meta.more_information_required` | ご相談は、より一層のお問い合わせを承っております。 |
| 1607 | `meta.authorization_required` | 本人確認や承認のコンテキストは、まず最初に完了する必要があります。 |
| 1608 | `meta.negotiation_expired` | 相談やリクエストの結果が期限切れとなりました。 |

エラー例:

```json
{
  "jsonrpc": "2.0",
  "id": "req-neg-001",
  "error": {
    "code": 1601,
    "message": "No matching interface",
    "data": {
      "anp_code": "meta.no_matching_interface",
      "retryable": false,
      "details": {
        "unsupportedConstraints": [
          "requiredSecurityProfile"
        ]
      }
    }
  }
}
```

## 12. セキュリティとプライバシーの配慮

### 12.1 同一証明

`anp.get_capabilities` MAY 匿名の公開発見機能として呼び出される。

`anp.negotiate` 以下のいずれかが含まれている場合、呼び出し側 SHOULD 提供: `auth.origin_proof` または同等の DID 認証コンテキスト:

- `sender_did`；
- 敏感なインセント;
- (a) ユーザのコンテキスト。
- (a) 限られた容量;
- (b) 支払い、予約、取引、承認、特定またはプライバシー関連の能力。
- クローズドインターフェースの候補者;
- アイデンティティに基づく差分協議の結果の返還のサービスエンドシナリオ。

業務内容 MAY - はい、それは匿名です。 `anp.negotiate` 返送能力のサブセット、認証依頼の拒否または要求。

### 12.2 協議の結果は、義務ではありません

`NegotiationResult` 「フォローアップが対話的であるべき」と言うだけです。それは、次のことを意味しません:

- 利用者は、業務の遂行を承認した。
- 本サービスは、制限されたリソースへのアクセス権を付与しています。
- 決済、予約、取引が成立しました。
- コールアは、永続アクセスバウチャーを提示しました。
- フォローアップの業務依頼は、オペレーションプロファイルで必要な証明書を省略することができます。

選択したインターフェイスが要求する場合 `humanAuthorization`フォローアップ業務プロセスはそのまま MUST 権限の委任は、対向的な運用契約で行われます。

### 12.3 最小開示

コールア SHOULD 相談依頼における情報開示の最小化:

- 相談に必要な要約のみのインセントが提供されます。
- (b) 相談段階の所定の支払情報、身元確認書、機密情報、資料を提出しない。
- えー。 `callerCapabilities` (b) 関係のない内部能力の露出を避けるために必要に仕立てる;
- 相談ログは、決定しました。

### 12.4 分解攻撃

コールアとサービス MUST NOT より強固なセキュリティモデルから、明示的な同意なしにセキュリティモデルを弱める。

呼び出し側リクエストが要求される場合 `direct-e2ee`本サービスは、静かに返すことはできません。 `transport-protected`. リクエストが満たない場合は、エラーは返されます。

### 12.5 合意のセキュリティ

交渉の結果が外部の合意で引用されている場合、当事者 SHOULD 認証:

- 人工消化器;
- (a) 発行者または署名;
- シェマの完全性;
- バージョンと依存性;
- 安全でないコード、リモート実行コマンド、または過度の権限要件がアーティファクトに含まれているかどうか。

この命令は、リモートコードの実行を必要としません。任意のコード生成または読み込みは、サンドボックスや最小権限環境で処理しなければならない局所実現の詳細です。

## 13. 古いバージョン PT= 00 メッセージ相談 注意

初期 AMP-06 ドラフトは、エンドツーエンド暗号化されたメッセージロード内の 1 バイトのバイナリヘッダーを追加することを定義するために使用しました。 `PT` フィールドはメタプロトコル、アプリケーションプロトコル、自然言語プロトコル、認証プロトコルと区別します。モデルも定義します `sourceHello`、`destinationHello`、`candidateProtocols`、`codeGeneration`、`testCasesNegotiation` とりあえず `fixErrorNegotiation` 待たせます。

初期モデルが放棄されました。新しい実現 MUST 現行のNormsの意味 `anp.meta.negotiation.v1` とりあえず `anp.negotiate`，MUST NOT 古いバイナリの達成または信頼 `PT` ヘッダー、古い Hello プロセス、または 古いコード生成プロセスは AMP-06 の相互運用性パスとして使用されます。

この命令は、古いモデルの互換性のあるマップを新しいものに提供しません。また、互換性のあるゲートウェイの実装が必要です。初期実験的な展開がまだ達成されている場合は、独立した移行ミッションを通じてこの規範にアップグレードされたプライベートな履歴として考慮する必要があります。移行はAMP-06最低の相互運用可能な要件ではありません。

## 14. 事例:

### 14.1 代理店の説明スニペット

```json
{
  "protocolType": "ANP",
  "protocolVersion": "1.1",
  "type": "AgentDescription",
  "url": "https://grand-hotel.com/agents/hotel-assistant/ad.json",
  "name": "Grand Hotel Assistant",
  "did": "did:wba:grand-hotel.com:service:hotel-assistant:e1_example",
  "securityDefinitions": {
    "didwba_sc": {
      "scheme": "didwba",
      "in": "header",
      "name": "Authorization"
    }
  },
  "security": "didwba_sc",
  "capabilities": [
    {
      "id": "cap.hotel.booking",
      "name": "Hotel room booking",
      "description": "Book hotel rooms, modify reservations, and check room availability.",
      "intentTags": [
        "hotel.booking",
        "reservation.create",
        "reservation.modify"
      ],
      "requiresHumanAuthorization": true
    }
  ],
  "interfaces": [
    {
      "id": "interface.negotiation.default",
      "type": "MetaProtocolInterface",
      "protocol": "ANP",
      "version": "1.0",
      "profile": "anp.meta.negotiation.v1",
      "binding": "jsonrpc-2.0",
      "url": "https://grand-hotel.com/anp",
      "methods": [
        "anp.get_capabilities",
        "anp.negotiate"
      ],
      "security": ["didwba_sc"],
      "securityProfiles": [
        "transport-protected"
      ],
      "negotiates": [
        "profiles",
        "interfaces",
        "schemas",
        "security_profiles",
        "content_types",
        "execution_modes"
      ],
      "description": "Endpoint for runtime capability and semantic meta-protocol negotiation."
    },
    {
      "id": "interface.booking.structured.v1",
      "type": "StructuredInterface",
      "protocol": "openrpc",
      "version": "1.0",
      "profile": "anp.rpc.v1",
      "url": "https://grand-hotel.com/api/booking.openrpc.json",
      "capabilityRefs": [
        "cap.hotel.booking"
      ],
      "humanAuthorization": true,
      "description": "Structured booking interface for room reservation."
    },
    {
      "id": "interface.conversation.nl.v1",
      "type": "NaturalLanguageInterface",
      "protocol": "ANP",
      "version": "1.0",
      "profile": "anp.direct.base.v1",
      "url": "https://grand-hotel.com/anp",
      "capabilityRefs": [
        "cap.hotel.booking"
      ],
      "description": "Natural language conversation interface."
    }
  ]
}
```

Note: 前例では `capabilities` ANP-06 で使われるオプションの拡張子例です。 必要な AMP-07 のトップレベルフィールドとして解釈しないでください。

### 14.2 能力認識要求

```json
{
  "jsonrpc": "2.0",
  "id": "req-cap-001",
  "method": "anp.get_capabilities",
  "params": {
    "meta": {
      "profile": "anp.core.binding.v1",
      "security_profile": "transport-protected",
      "operation_id": "op-cap-001",
      "created_at": "2026-06-27T12:00:00Z"
    },
    "body": {}
  }
}
```

### 14.3 能力認識対応セッション

```json
{
  "jsonrpc": "2.0",
  "id": "req-cap-001",
  "result": {
    "service_did": "did:wba:grand-hotel.com:e1_service",
    "supported_profiles": [
      "anp.core.binding.v1",
      "anp.meta.negotiation.v1",
      "anp.direct.base.v1",
      "anp.rpc.v1"
    ],
    "supported_security_profiles": [
      "transport-protected"
    ],
    "supported_content_types": [
      "application/json",
      "text/plain"
    ],
    "limits": {
      "max_request_bytes": "1048576"
    }
  }
}
```

### 14.4 相談・結果のご請求

相談のご依頼や結果については、7項と8項に言及する場合があります。 SHOULD 実際のビジネスコールの前に保存 `negotiationId` とりあえず `negotiationDigest`、デバッグのために、キャッシュし、監査。

## 15. 将来の拡張

将来のバージョンは、さらに定義できます。

- 標準的なプロトコルはJSON Schemaをアーティファクトします;
- (b) 登録フォームおよび検出メカニズムに関する協定;
- (a) 協議の結果の署名と検証可能な出版物;
- 事例の使用に関する相談方法のテスト
- 一時的なフォルダを閉じることができません: %s
- MCP、OpenAPI、OpenRPC、A2Aなど外部の合意書に記載された地図
- 複数ステークホルダーとグループ協議;
- 個人情報保護に関する相談及び開示の制限
- 合意、投票、監査およびガバナンスのメカニズム。

## 公益社団法人 一般社団法人 日本版著作権協会
2024年 ANP オープンソースコミュニティ
この文書は以下に基づいています [Apache ライセンス 2.0](../../LICENSE) 投稿されたものは自由に使用および変更できますが、この著作権に関する声明は保持する必要があります。
