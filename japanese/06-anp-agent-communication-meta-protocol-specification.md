<!-- translation-review: machine-fully-reviewed; scope=source lines 1-930; inventory=japanese/reviews/core-review.json; full prose compared against source -->
> 日本語参考訳（機械翻訳を原文と全文照合し、意味・用語を校閲済み）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [06-anp-agent-communication-meta-protocol-specification.md](../06-anp-agent-communication-meta-protocol-specification.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP エージェント通信メタプロトコル仕様 (草案)

- 文書ID: ANP-06
- タイトル: ANP エージェント通信メタプロトコル仕様
- ステータス: ドラフト
- バージョン: 1.2
- 原文言語: English / このページは日本語参考訳
- 適用性: この仕様は、ANP エージェント間のセマンティック メタプロトコル ネゴシエーション、インターフェイス選択、プロファイル選択、セキュリティ プロファイル選択、スキーマ選択、およびネゴシエーション結果の再利用に適用されます。

注:

- メタプロトコルはエージェント協調に必須ではなく、任意です。通常は本人性、メッセージング、発見、記述のプロトコルで大半の相互運用に対応できます。主に、2エージェントがペア固有のインターフェース、一時的プロトコル、特別な実行制約を動的に交渉する場合に使います。
- 本仕様は未リリースのドラフトです。初期のメッセージ埋め込み型メタプロトコル交渉を、現行ANPの記述、発見、Core Binding、DID認証、メッセージングプロファイルの構造と互換性を持つ独立の交渉プロファイルへ発展させることを目指します。
- 本仕様はANPエージェント記述プロトコルを変更しません。ここで定義する`MetaProtocolInterface`はANP-06の拡張インターフェース型で、エージェント記述文書の`interfaces`配列内に宣言できます。
- 新しい実装は本仕様の`anp.meta.negotiation.v1`と`anp.negotiate`を使うべきです。初期の暗号化メッセージ内部のバイナリ`PT=00`交渉モデルは非推奨で、旧実装との互換性は要求も推奨もしません。

## 要約

メタプロトコルは通信プロトコルを交渉するためのプロトコルです。エージェントネットワークでは、呼び出し元と対象エージェントが、意図、機能、制約、セキュリティ要件、利用可能なインターフェースに基づいて、後続業務対話に使うプロトコル、インターフェース、プロファイル、スキーマ、コンテンツ型、セキュリティプロファイル、実行モードを選択できます。

この仕様は、ANP メタプロトコルを独立したセマンティック ネゴシエーション プロファイルとして再定義します。

```text
Agent Discovery
  -> Agent Description
  -> MetaProtocolInterface
  -> anp.get_capabilities
  -> anp.negotiate
  -> selected interface / profile / security profile / schema
  -> business call or message exchange
```

メッセージ ペイロード内のバイナリ プロトコル タイプによってメタ プロトコル、アプリケーション プロトコル、自然言語プロトコル、検証プロトコルを区別していた初期の設計とは異なり、この仕様では、新しいトランスポート層、新しい暗号化メッセージ形式、または ANP コア バインディングの代替品は定義されていません。メタプロトコル ネゴシエーション メッセージは、既存の ANP エンドポイントで通常の ANP JSON-RPC リクエストとして実行される必要があります。

## 1. 背景と問題の説明

エージェント間の相互運用は通常、公開記述から始まります。対象がエージェント記述で機能、インターフェース、セキュリティ要件を公開し、呼び出し元がそれを読んで適切な対話方式を選びます。エージェント数やインターフェース型が増えると、静的記述だけでは次の限界があります。

1. **静的記述は実行時の変化を網羅できません**: サーバーのスロットリング、利用可能なセキュリティプロファイル、一時停止中のインターフェース、ユーザー認可状態、導入ポリシーは実行時に変わり得ます。
2. **同じ意図に複数の利用可能インターフェースがあります**: 例えばホテル予約は、構造化したOpenRPCインターフェースでも自然言語メッセージングでも行えます。
3. **呼び出し元の機能も選択に影響します**: 特定のANPプロファイル、セキュリティプロファイル、コンテンツ型、非同期実行モードに対応するかが最終選択に影響します。
4. **自然言語の都度交渉は高コストです**: 複数往復の自然言語交渉に全面依存すると、遅延、費用、不確実性が増します。
5. **初期のメッセージ埋め込みモデルは現行スタックと整合しません**: 初期ANP-06は暗号化メッセージのペイロードを直接拡張し、バイナリの`PT`フィールドでプロトコル型を区別しました。現行ANPはDID発見、エージェント記述、`ANPMessageService`、JSON-RPC 2.0 Core Binding、実行時機能確認に集約されています。

したがって、新しい ANP-06 はメタプロトコルをセマンティック ネゴシエーション コントロール プレーンとして位置付けています。ビジネスデータは含まれません。これは、ビジネスの実行を開始する前に、双方がどの相互運用パスを使用する必要があるかを決定するのに役立ちます。

### 1.1 設計の起源

ANPメタプロトコルは、[*A Scalable Communication Protocol for Networks of Large Language Models*で説明されるAgora Protocol](https://arxiv.org/html/2410.11905v1)から着想を得ています。特に、メタプロトコルで通信方法を交渉し、自然言語の柔軟性と構造化プロトコルの効率を組み合わせる考え方です。ANPはこれを独自のエージェント記述、発見、本人性認証、Core Binding構造に適応します。交渉インターフェースと相互運用要件は本仕様が定義します。

## 2. デザインの目標と非目標

### 2.1 設計目標

この仕様の目的は次のとおりです。

- 標準プロファイル`anp.meta.negotiation.v1`を定義します。
- エージェント記述文書の`interfaces`配列に宣言できる型として`MetaProtocolInterface`を定義します。
- Core BindingのJSON-RPC 2.0、`params.meta/body/auth`、`profile`、`security_profile`、`target`、エラーモデルを再利用します。
- 実行時機能確認に`anp.get_capabilities`を再利用します。
- 呼び出し元の意図、機能、制約に基づき最終実行インターフェースを選ぶ`anp.negotiate`を定義します。
- 構造化インターフェイスファーストネゴシエーション、自然言語フォールバック、キャッシュの再利用、将来のプロトコルアーティファクトの公開をサポートします。
- 初期の`PT=00`メッセージ交渉モデルを非推奨とし、本仕様の互換性範囲外と明記します。

### 2.2 非目標

この仕様では次のことは定義されていません。

-  新しいトランスポート層、セッション層、またはバイナリ メッセージ ヘッダー。
-  新しい DID メソッドまたは新しい ID 認証メカニズム。
-  新しいエンドツーエンド暗号化アルゴリズム。
- 完全な仕様 `anp.get_capabilities`;そのメソッドは Core Binding によって定義されます。
-  ビジネス インターフェイス自体のリクエスト、レスポンス、またはステート マシン。
- 必須の AI コード生成、リモート コード読み込み、またはコード交換。
-  グローバル プロトコル レジストリ、コンセンサス プロトコル選択アルゴリズム、または経済的インセンティブ メカニズム。

## 3. 既存のANPプロトコルとの関係

### 3.1 エージェントの説明との関係

エージェントの説明は、エージェントのパブリック エントリ ポイントであり、エージェントの DID、所有者、情報リソース、インターフェイス、およびセキュリティ構成を説明します。この文書で定義されている `MetaProtocolInterface` は、エージェント記述文書の `interfaces` 配列に配置できる拡張インターフェイス タイプです。それは次のように宣言します:

- エージェントが ANP-06 メタプロトコル ネゴシエーションをサポートしていること。
- ネゴシエーションエンドポイントの場所。
- エンドポイントが使用するバインディング。
- どのネゴシエーション方法がサポートされているか。
- プロファイル、インターフェイス、スキーマ、セキュリティ プロファイル、コンテンツ タイプ、実行モードなど、ネゴシエートできるオブジェクト。

この仕様では、ANP-07 を変更する必要はありません。実装では、既存のエージェント記述構造を維持しながら、`MetaProtocolInterface` を拡張`Interface` オブジェクトとして公開できます。

### 3.2 Agent Discovery との関係

ディスカバリーは ANP-08 によって定義されたままです。発信者はまず、アクティブな検出または別の信頼できるチャネルを通じてエージェント説明 URL を取得します。次に例を示します。

```text
https://{domain}/.well-known/agent-descriptions
```

次に対象のエージェント記述文書を読み、`interfaces`配列内の`MetaProtocolInterface`を探します。

### 3.3 コアバインディングとの関係

ANP-06 ランタイム メッセージは、ANP コア バインディング規則を使用します。

- JSON-RPC 2.0;
- `params.meta`、`params.auth`、`params.body`の構造。
- `meta.profile` リクエストの解釈プロファイルを示します。
- `meta.security_profile` リクエストで使用されるセキュリティプロファイルを示します。
- `meta.target` ターゲットモデリングを示します。
- エラーはJSON-RPCの`error`オブジェクトで運びます。

`anp.negotiate`の`params.meta.profile`は正確に次の値でなければなりません（MUST）。

```text
anp.meta.negotiation.v1
```

### 3.4 DID ドキュメントと ANPMessageService との関係

エージェント記述の`MetaProtocolInterface.url`は静的宣言と利用可能性の手掛かりです。本人性とサービス発見の正本は引き続きDID Documentで公開する`ANPMessageService`であり、実行時機能の正本は`anp.get_capabilities`の結果です。

エージェント記述、DID Document、実行時機能の結果が矛盾する場合、次の順で扱うべきです（SHOULD）。

1. DID ドキュメントと DID 解決結果を使用して、アイデンティティとサービス エンドポイントの信頼を確立します。
2. `anp.get_capabilities`を呼び出して実行時機能を取得します。
3. エージェント記述内の`MetaProtocolInterface`を発見と意味上の手掛かりとして扱います。
4. 静的な手掛かりが実行時機能と矛盾する場合、実行時機能の結果を使い、ローカルキャッシュを更新しなければなりません（MUST）。

### 3.5 DID:WBA およびセキュリティメカニズムとの関係

本仕様はDIDメソッドや認証を再定義しません。共通リクエスト認証、HTTP Message Signatures、アクセストークンは[ANP-02](02-anp-did-authentication-protocol-specification.md)、WBAメソッド検証は[ANP-03](03-did-wba-method-design-specification.md)、他のDIDは各メソッドに従います。`auth.origin_proof`とメッセージングのサービス間検証はP1/P2および担当プロファイルのセキュリティ要件に従います。文書版1.2でも、ドラフト状態や通信識別子`anp.meta.negotiation.v1`は変わりません。

`anp.negotiate` のネゴシエーション結果は、ID クレデンシャル、認可クレデンシャル、アクセス トークン、検証可能なクレデンシャル、または人間による認可の結果ではありません。

## 4. プロファイルの識別と最小限の相互運用性

### 4.1 プロファイル名

この仕様で定義されているプロファイル名は次のとおりです。

```text
anp.meta.negotiation.v1
```

エージェントの説明、`anp.get_capabilities` 結果、`params.meta.profile`、およびネゴシエーション結果のプロファイル参照では、この名前を使用する必要があります。

### 4.2 標準的な方法

この仕様では、次の 1 つの標準メソッドが定義されています。

```text
anp.negotiate
```

このメソッドは、呼び出し元の意図、呼び出し元の機能、候補インターフェイス、および制約に基づいて、後続のビジネス インタラクションに使用する必要がある機能、インターフェイス、プロトコル、プロファイル、セキュリティ プロファイル、コンテンツ タイプ、スキーマ、および実行モードを選択します。

### 4.3 相互運用性の最小要件

`anp.meta.negotiation.v1`対応の実装は、少なくとも次に対応しなければなりません（MUST）。

1. 実行時機能で`anp.meta.negotiation.v1`を宣言すること。
2. メタプロトコル交渉対応エンドポイントで`anp.negotiate`を処理すること。
3. `MetaProtocolInterface`の基本フィールド`type`、`profile`、`binding`、`url`、`methods`を認識すること。
4. `transport-protected`セキュリティプロファイルで交渉すること。
5. 構造化した`NegotiationResult`を返すこと。
6. サポートされていないプロファイル、インターフェイス、セキュリティ プロファイル、またはコンテンツ タイプに対して明示的なエラーを返します。
7. 交渉結果を業務執行の承認として解釈しない。

## 5. `MetaProtocolInterface` 宣言

### 5.1 セマンティクス

`MetaProtocolInterface` は、エージェントによって公開されるセマンティック メタプロトコル ネゴシエーション インターフェイスを表します。これは、Agent description `interfaces` 配列内の拡張インターフェイス タイプです。

このインターフェースは以下を宣言します。

- 呼び出し元が交渉要求を送るべきURL。
- 交渉要求に使うバインディング。
- どのネゴシエーション方法がサポートされているか。
- どのオブジェクトをネゴシエートできるか。
- どのセキュリティ構成が必要か。

### 5.2 フィールドの定義

| フィールド | タイプ | 要件 | 説明 |
|---|---|---|---|
| `id` | 文字列 | SHOULD | インターフェイスの安定した識別子。ネゴシエーション結果の参照に使用されます。 |
| `type` | string | MUST | `MetaProtocolInterface`固定 |
| `protocol` | 文字列 | SHOULD | 推奨値: `ANP`、これが ANP プロトコル インターフェイスであることを示します。 |
| `version` | 文字列 | SHOULD | インターフェース宣言のバージョン。 |
| `profile` | string | MUST | `anp.meta.negotiation.v1`固定 |
| `binding` | string | MUST | この版では`jsonrpc-2.0`にするべきです |
| `url` | string | MUST | 交渉エンドポイントURL。静的な手掛かりであり、実行時の正本は引き続きDID Documentと`anp.get_capabilities`です |
| `methods` | array | MUST | 少なくとも`anp.negotiate`を含めなければなりません（MUST）。通常は`anp.get_capabilities`も含めます |
| `security` | 配列/文字列 | MAY | エージェントの説明内のセキュリティ定義を参照します。 |
| `securityProfiles` | 配列 | SHOULD | サポートされているセキュリティ プロファイル: `transport-protected` または `direct-e2ee`. |
| `negotiates` | 配列 | SHOULD | 交渉可能なオブジェクト タイプのリスト。 |
| `inputSchema` | 文字列 | MAY | ネゴシエーションリクエストスキーマのURI。 |
| `outputSchema` | 文字列 | MAY | ネゴシエーション結果スキーマの URI。 |
| `description` | 文字列 | SHOULD | 人間が読める説明。 |

### 5.3 交渉可能なオブジェクト

`negotiates` の一般的な値は次のとおりです。

| 値 | 説明 |
|---|---|
| `profiles` | 後続の業務呼び出しに使うANPプロファイルを交渉します |
| `interfaces` | どのエージェント記述インターフェースを使用するかをネゴシエーションします。 |
| `schemas` | リクエストとレスポンスのスキーマをネゴシエートします。 |
| `security_profiles` | セキュリティプロファイルをネゴシエートします。 |
| `content_types` | コンテンツ タイプをネゴシエートします。 |
| `execution_modes` | 同期呼び出し、メッセージ、非同期タスク、ストリーミング、または自然言語フォールバックをネゴシエートします。 |
| `protocol_artifacts` | 再利用可能なプロトコル アーティファクト、ダイジェスト、または URI をネゴシエートします。 |

### 5.4 宣言例

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

### 5.5 推奨されるエンドポイント展開

実装は統合ANPエンドポイントの再利用を優先するべきです（SHOULD）。例:

```text
https://example.com/anp
```

同じエンドポイントで以下をサポートできます。

```text
anp.get_capabilities
anp.negotiate
direct.send
group.send
...
```

メタプロトコル交渉専用のエンドポイントを配置してもかまいません（MAY）。例:

```text
https://example.com/anp/negotiation
```

ただし、これは展開上の選択であり、プロトコル要件ではありません。 URL の構成に関係なく、サービス ID とランタイム機能は DID ドキュメントと `anp.get_capabilities` を通じて確認する必要があります。

## 6. 交渉の流れ

### 6.1 全体の流れ

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

### 6.2 ステップ 1: エージェントの説明の検出

呼び出し元は、ANP-08 アクティブ検出または別の信頼できるチャネルを通じて、ターゲットのエージェント説明 URL を取得します。

### 6.3 ステップ 2: 解析 `MetaProtocolInterface`

呼び出し元はエージェントの説明を読み取り、`interfaces` 配列で以下を探します。

```json
{
  "type": "MetaProtocolInterface",
  "profile": "anp.meta.negotiation.v1"
}
```

対象が`MetaProtocolInterface`を宣言しない場合、呼び出し元は次を行ってもかまいません（MAY）。

- エージェント記述内の既存の構造化インターフェースを直接使用します。
- 自然言語インターフェイスを使用します。
- 自動ネゴシエーションを停止し、人間による対応を求めます。
-  双方によってキャッシュされたプロトコル アーティファクトを使用します。

### 6.4 ステップ 3: 実行時能力の確認

初回対話の前に`anp.get_capabilities`を呼び出すべきです（SHOULD）。このメソッドはエンドポイントが現在対応するプロファイル、セキュリティプロファイル、コンテンツ型、制限を返します。

`anp.get_capabilities`は匿名で呼び出せます。サーバーが呼び出し元の本人性によって異なる機能の部分集合を返す場合、認証後に再度呼び出してもかまいません（MAY）。

### 6.5 ステップ 4: セマンティック ネゴシエーション

発信者は、以下を含む `anp.negotiate` リクエストを送信します。

- 発信者の意図。
- 必要な機能。
- 発信者がサポートするプロファイル、セキュリティプロファイル、およびコンテンツタイプ。
- インターフェイス参照の候補。
- 遅延、認可、自然言語フォールバックなどの制約。

ターゲット エージェントは、静的説明、ランタイム機能、ローカル ポリシー、認可状態、呼び出し元機能に基づいて `NegotiationResult` を返します。

### 6.6 ステップ 5: ビジネスインタラクションの実行

`NegotiationResult` を受信した後、発信者は `result.selected` および `result.execution` に従って実際のビジネスコールまたはメッセージのやり取りを実行します。

`anp.negotiate` への応答はビジネス上の応答ではありません。ビジネス インターフェイスが成功するか、人間の承認が必要か、またはトランザクションや状態変更を作成するかは、その後に選択されたビジネス プロトコルによって決まります。

## 7. `anp.negotiate` 方法

### 7.1 メソッドのセマンティクス

`anp.negotiate` は、セマンティック メタプロトコル ネゴシエーションに使用される JSON-RPC 2.0 リクエスト メソッドです。

メソッド名:

```text
anp.negotiate
```

要求の`params.meta.profile`は正確に次の値でなければなりません（MUST）。

```text
anp.meta.negotiation.v1
```

対象のモデル化モードは通常`agent-addressed`です。サービス単位の制御機能としてメタプロトコル交渉を公開する場合、該当プロファイルや実装文書で対象との結合規則を明示的に定義しなければなりません（MUST）。

### 7.2 リクエスト構造

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

### 7.3 `body` フィールドの定義

| フィールド | タイプ | 要件 | 説明 |
|---|---|---|---|
| `negotiation_id` | 文字列 | SHOULD | ネゴシエーションプロセスの識別子。 |
| `mode` | 文字列 | SHOULD | 交渉モード。デフォルト： `structured_selection`. |
| `intent` | オブジェクト | MUST | 発信者が達成したい目標。 |
| `requiredCapabilities` | 配列 | MAY | 呼び出し元が必須とみなす機能識別子。 |
| `callerCapabilities` | オブジェクト | SHOULD | 呼び出し元のランタイム機能。 |
| `constraints` | object | MAY | 遅延、認可、インターフェースの優先順位、セキュリティの優先順位などの制約 |
| `candidateInterfaceRefs` | 配列 | MAY | 発信者がエージェントの説明から選択した候補インターフェイス ID。 |
| `candidateProtocols` | 配列 | MAY | 候補のプロトコル アーティファクト、プロファイル、または URI。大規模な自然言語テキストだけが機械処理可能なコンテンツであってはなりません。 |

### 7.4 `intent` オブジェクト

`intent`は呼び出し元が達成したいことを表します。構造化タグを含めるべきで（SHOULD）、自然言語の説明も含めてかまいません（MAY）。

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

呼び出し元は開示最小化の原則に従うべきで（SHOULD）、交渉に不要な機密情報を提供するべきではありません。

### 7.5 `callerCapabilities` オブジェクト

`callerCapabilities` は、発信者の現在の機能を説明します。共通フィールドは次のとおりです。

| フィールド | タイプ | 説明 |
|---|---|---|
| `supportedProfiles` | 配列 | 呼び出し元がサポートする ANP プロファイル。 |
| `supportedSecurityProfiles` | 配列 | 呼び出し元によってサポートされているセキュリティ プロファイル。 |
| `supportedContentTypes` | 配列 | 呼び出し元が処理できるコンテンツ タイプ。 |
| `supportedExecutionModes` | 配列 | 呼び出し元が受け入れ可能な実行モード。 |
| `limits` | オブジェクト | 最大メッセージ サイズやタイムアウトなどの呼び出し側の制限。 |

### 7.6 `constraints` オブジェクト

`constraints`は呼び出し元の希望または必須制約を表します。一般的なフィールドは次のとおりです。

| フィールド | タイプ | 説明 |
|---|---|---|
| `preferredInterfaceTypes` | 配列 | 優先されるインターフェイスの種類: `StructuredInterface`. |
| `requiresHumanAuthorization` | ブール値 | この意図が人間の承認を必要とすることが予想されるかどうか。これは単なる交渉上の制約であり、承認が完了したことを意味するものではありません。 |
| `maxLatencyMs` | 整数 | 予想される最大遅延。 |
| `allowNaturalLanguageFallback` | ブール値 | 自然言語プロトコルのドラフトまたは自然言語インターフェイスへのフォールバックが許可されるかどうか。 |
| `requiredSecurityProfile` | 文字列 | 必要なセキュリティ プロファイル。 |
| `preferredContentTypes` | 配列 | 優先されるコンテンツ タイプ。 |

## 8. 交渉結果オブジェクト

### 8.1 成功した応答

`anp.negotiate` が成功すると、`result` が返されます。

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

### 8.2 フィールドの定義

| フィールド | タイプ | 要件 | 説明 |
|---|---|---|---|
| `negotiationId` | 文字列 | MUST | ネゴシエーション結果の識別子。 |
| `status` | 文字列 | MUST | `accepted`, `rejected`、または `needs_more_information`. |
| `selected` | object | `accepted`の場合MUST | 選択した機能、インターフェース、プロトコル、プロファイル、セキュリティプロファイル、コンテンツ型、URL |
| `execution` | オブジェクト | SHOULD | 後続の実行モードと実行制約。 |
| `schemas` | オブジェクト | MAY | リクエストとレスポンスのスキーマ。 |
| `validUntil` | 文字列 | MAY | ネゴシエーション結果の有効期限。 |
| `negotiationDigest` | 文字列 | SHOULD | ネゴシエーション結果のダイジェスト。キャッシュと再利用に使用されます。 |
| `alternatives` | 配列 | MAY | 選択されなかった候補オプション。 |
| `reason` | 文字列 | MAY | 拒否された場合、またはさらなる情報が必要な場合に、人が読める説明。 |

### 8.3 `selected` オブジェクト

`selected` は、その後のビジネス対話に使用するパスを示します。共通フィールドは次のとおりです。

| フィールド | 説明 |
|---|---|
| `capability` | 選択された機能 ID。 |
| `interface` | 選択されたエージェントの説明インターフェイス ID。 |
| `protocol` | 選択インターフェースで使うプロトコル。例: `openrpc`、`ANP`、`MCP` |
| `profile` | 後続のビジネス コールで使用される ANP プロファイル。 |
| `securityProfile` | 後続のビジネスコールで使用されるセキュリティプロファイル。 |
| `contentType` | 後続のビジネス ペイロードのコンテンツ タイプ。 |
| `url` | ビジネス インターフェイス エンドポイントまたはインターフェイス説明 URL。 |
| `protocolArtifact` | オプションのプロトコル アーティファクト URI またはダイジェスト。 |

### 8.4 `execution` オブジェクト

`execution.mode` の一般的な値は次のとおりです。

| 値 | 説明 |
|---|---|
| `direct_structured_call` | 構造化インターフェイスを直接呼び出します。 |
| `direct_message` | ダイレクト メッセージング プロファイルを使用します。 |
| `group_message` | グループメッセージングプロファイルを使用します。 |
| `async_task` | 非同期タスクまたはコラボレーション フローを作成します。 |
| `stream` | ストリーミング インタラクションを使用します。 |
| `natural_language` | 自然言語インターフェイスを使用します。 |
| `natural_language_protocol_drafting` | 自然言語を使用して一時的なプロトコルの草案を作成します。 |

## 9. 自然言語プロトコル ドラフト フォールバック

構造化ネゴシエーションがこの仕様の主要なパスです。自然言語プロトコルのドラフトは、次の場合のフォールバックです。

- ターゲット エージェントには、意図を満たす構造化インターフェイスがありません。
- 呼び出し元とターゲットは、サポートされているプロファイルまたはスキーマを共有していません。
- 両当事者は実験的な一時プロトコルを草案する必要があります。
-  タスクの頻度は低く、1 回限り、または高度に個別化されています。

呼び出し元は、`anp.negotiate` リクエストでこれを宣言できます。

```json
{
  "mode": "natural_language_protocol_drafting",
  "constraints": {
    "allowNaturalLanguageFallback": true
  }
}
```

自然言語フォールバックでプロトコル成果物の草案を生成してもかまいません（MAY）が、双方が受け入れる前に安定したプロトコルとして扱うべきではありません。可能なら草案を構造化フィールド、スキーマ、例、テストケースに変換するべきです（SHOULD）。

## 10. キャッシュ、再利用、およびプロトコル アーティファクト

### 10.1 ネゴシエーション結果のキャッシュ

呼び出し元は`NegotiationResult`をキャッシュして有効期間内に再利用してもかまいません（MAY）。キャッシュキーには少なくとも次を含めるべきです（SHOULD）。

- ターゲット エージェント DID;
- 発信者 DID または発信者の機能ダイジェスト。
- インテントタグまたは正規化されたインテントダイジェスト。
- 選択されたインターフェース ID。
- `selected.profile`;
- `selected.securityProfile`;
- `negotiationDigest`.

次の場合は再交渉するべきです（SHOULD）。

- `validUntil` 有効期限が切れます。
- `anp.get_capabilities` キャッシュと矛盾する結果を返します。
- DID ドキュメントまたは `ANPMessageService` 変化。
- 後続のビジネス コールは、サポートされていないプロファイル、インターフェイス、セキュリティ プロファイル、またはコンテンツ タイプのエラーを返します。
- ローカルポリシー、セキュリティ要件、ユーザー認可状態が変化した場合。

### 10.2 プロトコルアーティファクト

プロトコル成果物は再利用できるプロトコル記述オブジェクトです。次を含めてもかまいません（MAY）。

- `protocol_id`;
- `protocol_uri`;
- `version`;
- メソッドリスト;
- リクエストおよびレスポンスのスキーマ。
- サポートされているセキュリティプロファイル。
- コンテンツタイプ;
- 例;
- テストケース;
- ダイジェスト;
- 署名または発行者の情報。

例:

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

この仕様では、グローバル アーティファクト レジストリは定義されません。アーティファクトの公開、レビュー、署名、バージョン ガバナンス、およびコンセンサス メカニズムは将来の仕様に委ねられます。

### 10.3 初期の 0RTT アイデアとの関係

初期の ANP-06 は、ハンドシェイク メッセージで `usedProtocolHash` を使用してネゴシエーションをスキップしました。この仕様では、新しいハンドシェイク メッセージは定義されません。同等の機能は次のように実装する必要があります。

1. 呼び出し元がキャッシュする `NegotiationResult` またはプロトコルアーティファクト。
2. 後続のリクエストは、選択したプロファイル/インターフェイス/スキーマを直接使用します。
3. ターゲット エンドポイントがその選択をサポートしていない場合、明示的なエラーが返されます。
4. その後、呼び出し元が`anp.get_capabilities`と`anp.negotiate`を再度呼び出します。

## 11. エラーモデル

`anp.negotiate` は、JSON-RPC `error` オブジェクトを使用してエラーを返します。実装では、ANP カスタム エラー範囲を使用し、`error.data.anp_code` で機械可読コードを提供することが推奨されます。

| code | anp_code | 意味 |
|---|---|---|
| 1600 | `meta.negotiation_rejected` | ターゲットはネゴシエーション要求を拒否します。 |
| 1601 | `meta.no_matching_interface` | 意図と制約を満たすインターフェイスはありません。 |
| 1602 | `meta.unsupported_negotiation_mode` | 要求されたネゴシエーション モードはサポートされていません。 |
| 1603 | `meta.unsupported_candidate_profile` | 候補プロファイルはサポートされていません。 |
| 1604 | `meta.unsupported_security_profile` | 候補セキュリティ プロファイルはサポートされていません。 |
| 1605 | `meta.unsupported_content_type` | 候補コンテンツ タイプはサポートされていません。 |
| 1606 | `meta.more_information_required` | ネゴシエーションを完了するには、さらに詳しい情報が必要です。 |
| 1607 | `meta.authorization_required` | 最初に認証または認可コンテキストが必要です。 |
| 1608 | `meta.negotiation_expired` | ネゴシエーションの結果またはリクエストの有効期限が切れています。 |

エラーの例:

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

## 12. セキュリティとプライバシーに関する考慮事項

### 12.1 ID認証

`anp.get_capabilities`は匿名の公開発見機能として呼び出してもかまいません（MAY）。

`anp.negotiate`に次のいずれかが含まれる場合、呼び出し元は`auth.origin_proof`または同等のDID認証文脈を提供するべきです（SHOULD）。

- `sender_did`;
- センシティブな意図。
- ユーザーコンテキスト;
- 制限された機能。
- 支払い、予約、取引、承認、ID、またはプライバシー関連の機能。
- 非公開の候補インターフェイス。
- サーバーが ID に基づいて異なるネゴシエーション結果を返す場合。

匿名の`anp.negotiate`に対し、サーバーは機能の一部だけを返す、要求を拒否する、認証を要求する、のいずれかとしてもかまいません（MAY）。

### 12.2 交渉結果は認可ではありません

`NegotiationResult` は、その後のインタラクションがどのように行われるかを説明するだけです。次のような意味ではありません。

-  ユーザーはビジネスアクションを承認しました。
- サーバーが制限付きリソースへのアクセスを認可済みであること。
- 支払い、予約、または取引が作成されました。
- 呼び出し元は長期アクセス資格情報を取得しました。
- その後のビジネスリクエストでは、ビジネスプロファイルで必要な証明を省略できます。

選択したインターフェースが`humanAuthorization`を要求する場合、後続の業務フローは該当業務プロトコルに従って認可を完了しなければなりません（MUST）。

### 12.3 最小限の開示

呼び出し元は交渉要求での情報開示を最小化するべきです（SHOULD）。

-  意図には、交渉に必要な概要のみを含める必要があります。
- 交渉中に完全な支払い情報、身分証明書、プライベートメッセージ、または大きなオブジェクトの内容を提出してはなりません。
- 関係のない内部機能を公開しないよう、`callerCapabilities`を必要な範囲に絞るべきです。
- 交渉ログの機密部分はマスキングするべきです。

### 12.4 ダウングレード攻撃

呼び出し元とサーバーは、明示的合意なしに強いセキュリティプロファイルから弱いものへ黙って切り替えてはいけません（MUST NOT）。

呼び出し元が `direct-e2ee` を要求した場合、サーバーは黙って `transport-protected` を返してはなりません。要件を満たせない場合、サーバーは明示的なエラーを返す必要があります。

### 12.5 プロトコルアーティファクトのセキュリティ

交渉結果が外部プロトコル成果物を参照する場合、次を検証するべきです（SHOULD）。

- アーティファクトダイジェスト;
- 発行者または署名。
- スキーマの整合性。
- バージョンと依存関係。
- アーティファクトに安全でないコード、リモート実行命令、または過剰な許可要件が含まれているかどうか。

この仕様では、リモート コードを実行する必要はありません。コード生成またはコードの読み込みはローカル実装の詳細であり、サンドボックス化された最小権限の環境で処理する必要があります。

## 13. 旧`PT=00`メッセージ交渉の非推奨化

初期の ANP-06 ドラフトでは、エンドツーエンド暗号化メッセージ ペイロード内の 1 バイトのバイナリ ヘッダーを定義し、メタ プロトコル、アプリケーション プロトコル、自然言語プロトコル、検証プロトコルを区別するために `PT` フィールドを使用しました。このモデルでは、`sourceHello`、`destinationHello`、`candidateProtocols`、`codeGeneration`、`testCasesNegotiation`、`fixErrorNegotiation` などのフローも定義されています。

初期モデルは非推奨です。新実装は本仕様の`anp.meta.negotiation.v1`と`anp.negotiate`を使わなければならず（MUST）、ANP-06の相互運用経路として旧バイナリ`PT`メッセージヘッダー、旧Helloフロー、旧コード生成フローを実装したり依存したりしてはいけません（MUST NOT）。

この仕様では、古いモデルから新しいモデルへの互換性マッピングは提供されず、互換性ゲートウェイも必要ありません。デプロイメントに初期の実験的な実装がまだある場合は、それをプライベートな過去の実装として扱い、別の移行タスクを通じてこの仕様にアップグレードする必要があります。その移行は、ANP-06 の最小相互運用性要件の範囲外です。

## 14. 例

### 14.1 エージェント説明フラグメント

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

注: 上記の例の`capabilities` は、オプションの ANP-06 拡張子の例です。実装では、これを ANP-07 の必須の最上位フィールドとして扱うべきではありません。

### 14.2 能力確認リクエスト

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

### 14.3 機能確認応答の抜粋

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

### 14.4 交渉依頼と結果

交渉要求と結果は第7章・第8章を参照してください。実際の業務呼び出し前に`negotiationId`と`negotiationDigest`を保存し、デバッグ、キャッシュ、監査を可能にするべきです（SHOULD）。

## 15. 将来の拡張

将来のバージョンは、次の定義を定義する可能性があります。

- プロトコルアーティファクト用の標準的なJSONスキーマ。
- プロトコルアーティファクトのレジストリと発見メカニズム;
- 署名し、検証可能な交渉結果;
- テストケースの交渉方法;
- 問題報告・修正交渉の拡張。
- MCP、OpenAPI、OpenRPC、A2Aなどの外部プロトコルの説明にマッピングする。
- 複数のパーティーの交渉およびグループ交渉;
- プライバシー保護と開示最小化の交渉プロファイル。
- プロトコルコンセンサス、投票、レビュー、およびガバナンスメカニズム。

## コンテンツの著作権について
Copyright (c) 2024 ANP Open Source Community
このファイルは[Apache License 2.0](../LICENSE)の下で公開されています。自由に使用・変更できますが、この著作権表示を保持する必要があります。
