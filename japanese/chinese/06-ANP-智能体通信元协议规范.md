<!-- translation-review: full; source=chinese/06-ANP-智能体通信元协议规范.md; basis=complete source-based manual translation and reading of all examples -->
> 日本語参考訳（機械翻訳を基に原文全文を照合済み）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [chinese/06-ANP-智能体通信元协议规范.md](../../chinese/06-ANP-智能体通信元协议规范.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP：エージェント通信メタプロトコル仕様（Draft）

- 文書番号：ANP-06
- タイトル：ANP：エージェント通信メタプロトコル仕様
- 状態：Draft
- バージョン：1.2
- 原文言語：中国語
- 適用範囲：本仕様は、ANP エージェント間の意味的なメタプロトコル交渉、インターフェース選択、Profile 選択、セキュリティモード選択、Schema 選択、および交渉結果の再利用に適用します。

注記：

- メタプロトコルは、エージェントの協調に必須のプロトコルではなく、任意のプロトコルです。通常は、エージェントのアイデンティティ、メッセージ、発見、記述などのプロトコルで、大半の相互運用要件を満たせます。主に、2 体のエージェント固有のインターフェース、一時的なプロトコル、または特別な実行制約を動的に交渉する場面で使います。
- 本仕様は現在も草案であり、未公開です。初期のメッセージ内メタプロトコル交渉モデルを、現在の ANP の記述、発見、Core Binding、DID 認証、およびメッセージ Profile 体系と互換性のある、独立した交渉 Profile に発展させることを目指します。
- 本仕様は、ANP-07 エージェント記述プロトコルを変更しません。本書の `MetaProtocolInterface` は、ANP-06 が定義する拡張インターフェース型で、Agent Description の `interfaces` 配列に宣言できます。
- 新しい実装では、本仕様が定義する `anp.meta.negotiation.v1` と `anp.negotiate` を使うべきです。暗号化メッセージ内部のバイナリ `PT=00` に基づく初期の交渉方式は廃止されており、本仕様は旧実装との互換性を要求も推奨もしません。

## 概要

メタプロトコル（Meta-Protocol）は、「通信プロトコルを交渉するためのプロトコル」です。エージェントネットワークでは、呼出側と対象エージェントが、意図、能力、制約、セキュリティ要件、利用可能なインターフェースに基づき、後続の業務処理に使うプロトコル、インターフェース、Profile、Schema、コンテンツ型、実行モードを選択するために使います。

本仕様では、ANP メタプロトコルを、独立した意味的な交渉 Profile として再定義します。

```text
Agent Discovery
  -> Agent Description
  -> MetaProtocolInterface
  -> anp.get_capabilities
  -> anp.negotiate
  -> selected interface / profile / security profile / schema
  -> business call or message exchange
```

初期の「メッセージのペイロード内で、バイナリの Protocol Type により、メタプロトコル、アプリケーションプロトコル、自然言語プロトコル、検証プロトコルを区別する」設計と異なり、本仕様は新しいトランスポート層や暗号化メッセージ形式を定義せず、ANP Core Binding を置き換えません。メタプロトコル交渉メッセージは、既存の ANP エンドポイント上で、通常の ANP JSON-RPC 要求として動作させるべきです。

## 1. 背景と課題

エージェント間の相互運用では、通常、最初に公開された記述を使います。対象エージェントは、Agent Description で能力、インターフェース、セキュリティ要件を公開し、呼出側はそれを読んで適切な呼出方法を選びます。エージェントとインターフェース型の増加に伴い、静的な記述だけでは次の問題が生じます。

1. **静的な記述では実行時の変化を網羅できない**：サーバーのレート制限、利用可能なセキュリティモード、一時停止中のインターフェース、ユーザーの認可状態、配置ポリシーは、いずれも動的に変化し得ます。
2. **同じ意図に複数の利用可能なインターフェースがある**：ホテル予約は、構造化された OpenRPC インターフェースでも、自然言語のメッセージインターフェースでも実行できます。
3. **呼出側の能力も選択に影響する**：特定の ANP Profile、セキュリティモード、コンテンツ型、非同期実行モードへの対応の有無が、最終的なプロトコル選択に影響します。
4. **自然言語による一時的な交渉はコストが高い**：複数往復の自然言語交渉だけに依存すると柔軟性は高まりますが、遅延、費用、不確実性も増えます。
5. **初期のメッセージ内交渉モデルは、現在のプロトコルスタックと整合しない**：初期の ANP-06 は暗号化メッセージのペイロードを直接拡張し、バイナリの `PT` フィールドでプロトコル型を区別していました。現在の ANP は、DID による発見、Agent Description、`ANPMessageService`、JSON-RPC 2.0 Core Binding、および実行時の能力確認に集約されています。

そこで、新しい ANP-06 は、メタプロトコルを「意味的な交渉の制御プレーン」と位置づけます。業務データは運ばず、業務の実行前に、使うべき相互運用経路を双方が決められるようにします。

### 1.1 設計の出典

ANP メタプロトコルの設計は、[Agora Protocol（論文：*大規模言語モデルのネットワークに向けた、拡張性のある通信プロトコル*）](https://arxiv.org/html/2410.11905v1)を参考にしています。特に、メタプロトコルでエージェントの通信方法を交渉し、自然言語の柔軟性と構造化プロトコルの効率を組み合わせる考え方を取り入れています。ANP は、これらの考え方を、自身のエージェント記述、発見、認証、Core Binding の構成に組み合わせます。具体的な交渉インターフェースと相互運用要件は、本仕様で定義します。

## 2. 設計目標と対象外の事項

### 2.1 設計目標

本仕様の目標は、次のとおりです。

- 標準 Profile `anp.meta.negotiation.v1` を定義する。
- Agent Description の `interfaces` 配列に宣言できる `MetaProtocolInterface` を定義する。
- ANP Core Binding の JSON-RPC 2.0、`params.meta/body/auth`、`profile`、`security_profile`、`target`、およびエラーモデルを再利用する。
- 実行時の能力確認方法として、`anp.get_capabilities` を再利用する。
- 呼出側の意図、能力、制約に基づき、最終的な実行インターフェースを選ぶ `anp.negotiate` メソッドを定義する。
- 構造化インターフェースの優先、自然言語へのフォールバック、キャッシュの再利用、将来のプロトコル成果物の公開を支援する。
- 初期の `PT=00` メッセージ交渉モデルが廃止され、本仕様の互換性の対象に含まれないことを明示する。

### 2.2 対象外の事項

本仕様は、次を定義しません。

- 新しいトランスポート層、セッション層、バイナリのメッセージヘッダー。
- 新しい DID メソッドや認証機構。
- 新しいエンドツーエンド暗号化アルゴリズム。
- `anp.get_capabilities` の完全な仕様。このメソッドは Core Binding が定義します。
- 業務インターフェース自体の要求、応答、状態機械。
- AI によるコード生成、リモートコードの読み込み、コード交換の必須の手順。
- ネットワーク全体のプロトコル登録簿、合意プロトコルの選出アルゴリズム、経済的な報酬機構。

## 3. 既存の ANP プロトコルとの関係

### 3.1 Agent Description との関係

Agent Description は、エージェントの公開の入口であり、DID、所有者、情報資源、インターフェース、セキュリティ設定を記述します。本書の `MetaProtocolInterface` は、Agent Description の `interfaces` 配列に配置できる拡張インターフェース型で、次を宣言します。

- エージェントが ANP-06 メタプロトコル交渉に対応すること。
- 交渉エンドポイントの場所。
- エンドポイントが使うバインディング。
- 対応する交渉メソッド。
- Profile、Interface、Schema、Security Profile、Content Type、Execution Mode など、交渉できる対象。

本仕様は ANP-07 の変更を要求しません。実装者は、Agent Description の既存の構造を保ったまま、`MetaProtocolInterface` を拡張 `Interface` オブジェクトとして公開できます。

### 3.2 Agent Discovery との関係

発見の手順は、引き続き ANP-08 が定義します。呼出側は、まず次を通じて、

```text
https://{domain}/.well-known/agent-descriptions
```

Agent Description の URL を取得し、対象エージェントの記述文書を読んで、`interfaces` から `MetaProtocolInterface` を探せます。

### 3.3 Core Binding との関係

ANP-06 の実行時のメッセージは、ANP Core Binding の規約を使います。

- JSON-RPC 2.0。
- `params.meta`、`params.auth`、`params.body` の構造。
- `meta.profile` は、その要求を解釈する Profile を示す。
- `meta.security_profile` は、その要求が採用するセキュリティモードを示す。
- `meta.target` は、対象のモデル化を示す。
- JSON-RPC の `error` オブジェクトでエラーを運ぶ。

`anp.negotiate` の `params.meta.profile` は、次と等しくなければなりません（MUST）。

```text
anp.meta.negotiation.v1
```

### 3.4 DID Document と ANPMessageService との関係

Agent Description の `MetaProtocolInterface.url` は、静的な宣言であり、利用可能な入口のヒントです。アイデンティティとサービス発見の正本は、引き続き DID Document で公開される `ANPMessageService` です。実行時の能力の正本は、`anp.get_capabilities` の戻り値です。

Agent Description、DID Document、実行時の能力の結果が矛盾する場合、呼出側は次の順序で処理するべきです（SHOULD）。

1. DID Document と DID の解決結果で、アイデンティティとサービスエンドポイントへの信頼を確立する。
2. `anp.get_capabilities` を呼び出し、実行時の能力を取得する。
3. Agent Description の `MetaProtocolInterface` を、発見と意味のヒントとして扱う。
4. 静的なヒントと実行時の能力が矛盾する場合、呼出側は実行時の能力の結果を優先し、ローカルキャッシュを更新しなければなりません（MUST）。

### 3.5 DID:WBA およびセキュリティ機構との関係

本仕様は、DID メソッドや認証を再定義しません。汎用の要求認証、HTTP Message Signatures、access token は [ANP-02](02-ANP-基于DID的身份认证协议.md) に従います。WBA メソッドの検証は [ANP-03](03-did-wba方法规范.md) に、その他の DID は各メソッドの検証に従います。`auth.origin_proof` とメッセージサービス間の検証は、関連するメッセージ P1/P2 および所属する Profile のセキュリティ要件に従います。文書バージョン 1.2 は、本仕様の草案という状態や、通信上の識別子 `anp.meta.negotiation.v1` を変更しません。

`anp.negotiate` の交渉結果は、身元証明、認可証明、access token、Verifiable Credential、人間による認可の結果のいずれでもありません。

## 4. Profile 識別子と最小限の相互運用

### 4.1 Profile 名

本仕様が定義する Profile 名は、次のとおりです。

```text
anp.meta.negotiation.v1
```

Agent Description、`anp.get_capabilities` の戻り値、`params.meta.profile`、交渉結果の Profile 参照では、いずれもこの名前を使うべきです。

### 4.2 標準メソッド

本仕様は、標準メソッドを 1 つ定義します。

```text
anp.negotiate
```

このメソッドは、呼出側の意図と能力、候補インターフェース、制約に基づき、後続の業務処理で使う能力、インターフェース、Profile、セキュリティモード、コンテンツ型、Schema、実行モードを返します。

### 4.3 最小限の相互運用要件

`anp.meta.negotiation.v1` に対応する実装は、少なくとも次に対応しなければなりません（MUST）。

1. 実行時の能力として `anp.meta.negotiation.v1` を宣言する。
2. メタプロトコル交渉に対応するエンドポイントで `anp.negotiate` を処理する。
3. `MetaProtocolInterface` の基本フィールド `type`、`profile`、`binding`、`url`、`methods` を認識する。
4. `transport-protected` セキュリティモードでの交渉に対応する。
5. 構造化された `NegotiationResult` を返す。
6. 非対応の Profile、インターフェース、セキュリティモード、コンテンツ型に、明示的なエラーを返す。
7. 交渉結果を、業務実行の認可と解釈しない。

## 5. MetaProtocolInterface の宣言

### 5.1 意味

`MetaProtocolInterface` は、エージェントが公開する、意味的なメタプロトコル交渉インターフェースを表します。Agent Description の `interfaces` 配列に含める、拡張インターフェース型です。

このインターフェースは、次を示します。

- 呼出側が交渉要求を送る URL。
- 交渉要求が使うバインディング。
- 対応する交渉メソッド。
- 交渉できる対象。
- 必要なセキュリティ設定。

### 5.2 フィールドの定義

| フィールド | 型 | 要件 | 説明 |
|---|---|---|---|
| `id` | string | SHOULD | Interface の安定した識別子。交渉結果からの参照に使います。 |
| `type` | string | MUST | `MetaProtocolInterface` 固定。 |
| `protocol` | string | SHOULD | ANP プロトコルのインターフェースを表す、`ANP` を推奨します。 |
| `version` | string | SHOULD | インターフェース宣言のバージョン。 |
| `profile` | string | MUST | `anp.meta.negotiation.v1` 固定。 |
| `binding` | string | MUST | このバージョンでは `jsonrpc-2.0` とするべきです。 |
| `url` | string | MUST | 交渉エンドポイントの URL。静的なヒントであり、実行時には引き続き DID Document と `anp.get_capabilities` を優先するべきです。 |
| `methods` | array | MUST | 少なくとも `anp.negotiate` を含み、通常は `anp.get_capabilities` も含みます。 |
| `security` | array/string | MAY | Agent Description のセキュリティ定義への参照。 |
| `securityProfiles` | array | SHOULD | `transport-protected`、`direct-e2ee` など、対応するセキュリティモード。 |
| `negotiates` | array | SHOULD | 交渉できる対象の一覧。 |
| `inputSchema` | string | MAY | 交渉要求の Schema の URI。 |
| `outputSchema` | string | MAY | 交渉結果の Schema の URI。 |
| `description` | string | SHOULD | 人間が読める説明。 |

### 5.3 交渉できる対象

`negotiates` の一般的な値は、次のとおりです。

| 値 | 説明 |
|---|---|
| `profiles` | 後続の業務呼出しで使う ANP Profile を交渉します。 |
| `interfaces` | 後続で使う Agent Description のインターフェースを交渉します。 |
| `schemas` | 要求と応答の Schema を交渉します。 |
| `security_profiles` | セキュリティモードを交渉します。 |
| `content_types` | コンテンツ型を交渉します。 |
| `execution_modes` | 同期呼出し、メッセージ、非同期タスク、ストリーミング、自然言語へのフォールバックなどの実行モードを交渉します。 |
| `protocol_artifacts` | 再利用可能なプロトコル成果物、ダイジェスト、URI を交渉します。 |

### 5.4 宣言の例

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

### 5.5 推奨するエンドポイントの配置方法

実装者は、たとえば次のような、統一された ANP エンドポイントの再利用を優先するべきです（SHOULD）。

```text
https://example.com/anp
```

このエンドポイントは、次に同時に対応できます。

```text
anp.get_capabilities
anp.negotiate
direct.send
group.send
...
```

実装者は、たとえば次のように、メタプロトコル交渉専用のエンドポイントを配置してもかまいません（MAY）。

```text
https://example.com/anp/negotiation
```

ただし、これは配置上の選択肢であり、プロトコルの必須要件ではありません。URL の構成に関係なく、サービスのアイデンティティと実行時の能力は、引き続き DID Document と `anp.get_capabilities` によって確認するべきです。

## 6. 交渉の手順

### 6.1 全体の手順

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

### 6.2 Step 1：Agent Description の発見

呼出側は、ANP-08 による能動的な発見、または他の信頼できる経路から、対象の Agent Description の URL を取得します。

### 6.3 Step 2：MetaProtocolInterface の解析

呼出側は Agent Description を読み、`interfaces` 配列から次を探します。

```json
{
  "type": "MetaProtocolInterface",
  "profile": "anp.meta.negotiation.v1"
}
```

対象エージェントが `MetaProtocolInterface` を宣言していない場合、呼出側は次を行ってもかまいません（MAY）。

- Agent Description に既にある構造化インターフェースを直接使う。
- 自然言語インターフェースを使う。
- 自動交渉を終了し、人間による対応を求める。
- 双方が既にキャッシュしているプロトコル成果物を使う。

### 6.4 Step 3：実行時の能力確認

呼出側は、最初のやり取りの前に `anp.get_capabilities` を呼ぶべきです（SHOULD）。このメソッドは、対象エンドポイントが現在対応する Profile、セキュリティモード、コンテンツ型、制限を返します。

`anp.get_capabilities` は匿名で呼び出せます。サーバーが呼出側の身元に応じて異なる能力集合を返す場合、呼出側は認証後に再度呼び出してもかまいません（MAY）。

### 6.5 Step 4：意味的な交渉

呼出側は、次を含む `anp.negotiate` 要求を送ります。

- 呼出側の意図。
- 必要な能力。
- 呼出側が対応する Profile、セキュリティモード、コンテンツ型。
- 候補インターフェースの参照。
- 遅延、認可、自然言語へのフォールバックなどの制約。

対象エージェントは、静的な記述、実行時の能力、ローカルポリシー、認可状態、呼出側の能力に基づき、`NegotiationResult` を返します。

### 6.6 Step 5：業務処理の実行

`NegotiationResult` を受け取った呼出側は、`result.selected` と `result.execution` に従い、実際の業務呼出しやメッセージのやり取りを行います。

`anp.negotiate` の応答は、業務の応答ではありません。業務インターフェースの成功、人間による認可の要否、取引や状態変更の発生は、後続で選ばれた業務プロトコルが決定します。

## 7. `anp.negotiate` メソッド

### 7.1 メソッドの意味

`anp.negotiate` は、意味的なメタプロトコル交渉を実行する JSON-RPC 2.0 Request メソッドです。

メソッド名：

```text
anp.negotiate
```

要求の `params.meta.profile` は、次と等しくなければなりません（MUST）。

```text
anp.meta.negotiation.v1
```

対象のモデル化は、通常 `agent-addressed` です。メタプロトコル交渉をサービス単位の制御プレーン機能として公開する配置では、具体的な Profile または実装文書が、対象の束縛規則を明示しなければなりません（MUST）。

### 7.2 要求の構造

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

| フィールド | 型 | 要件 | 説明 |
|---|---|---|---|
| `negotiation_id` | string | SHOULD | 交渉過程の識別子。 |
| `mode` | string | SHOULD | 交渉モード。デフォルトは `structured_selection`。 |
| `intent` | object | MUST | 呼出側が達成したい意図。 |
| `requiredCapabilities` | array | MAY | 呼出側が満たす必要があると考える能力の識別子。 |
| `callerCapabilities` | object | SHOULD | 呼出側の実行時の能力。 |
| `constraints` | object | MAY | 遅延、認可、インターフェースの好み、セキュリティの好みなどの制約。 |
| `candidateInterfaceRefs` | array | MAY | 呼出側が Agent Description から選んだ、候補インターフェースの ID。 |
| `candidateProtocols` | array | MAY | 候補のプロトコル成果物、Profile、URI。機械が処理できる内容として、長い自然言語テキストだけを使うべきではありません。 |

### 7.4 `intent` オブジェクト

`intent` は、呼出側が達成したい目標を表します。構造化タグを含むべきであり（SHOULD）、自然言語の説明も含めてかまいません（MAY）。

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

呼出側は最小限の開示の原則に従い（SHOULD）、交渉の段階で、業務の完了に必要のない機密データを提供するべきではありません。

### 7.5 `callerCapabilities` オブジェクト

`callerCapabilities` は、呼出側が現在対応する能力を記述します。一般的なフィールドは、次のとおりです。

| フィールド | 型 | 説明 |
|---|---|---|
| `supportedProfiles` | array | 呼出側が対応する ANP Profile。 |
| `supportedSecurityProfiles` | array | 呼出側が対応するセキュリティモード。 |
| `supportedContentTypes` | array | 呼出側が処理できるコンテンツ型。 |
| `supportedExecutionModes` | array | 呼出側が受け入れられる実行モード。 |
| `limits` | object | 最大メッセージサイズやタイムアウトなど、呼出側自体の制限。 |

### 7.6 `constraints` オブジェクト

`constraints` は、呼出側の好みや必須の制約を表します。一般的なフィールドは、次のとおりです。

| フィールド | 型 | 説明 |
|---|---|---|
| `preferredInterfaceTypes` | array | `StructuredInterface` など、好ましいインターフェース型。 |
| `requiresHumanAuthorization` | boolean | 今回の意図が、人間による認可を必要とすると想定するか。このフィールドは交渉の制約にすぎず、認可の完了を示しません。 |
| `maxLatencyMs` | integer | 希望する最大遅延。 |
| `allowNaturalLanguageFallback` | boolean | 自然言語でのプロトコル起草、または自然言語インターフェースへのフォールバックを認めるか。 |
| `requiredSecurityProfile` | string | 必ず使うセキュリティモード。 |
| `preferredContentTypes` | array | 好ましいコンテンツ型。 |

## 8. Negotiation Result オブジェクト

### 8.1 成功応答

`anp.negotiate` は、成功時に `result` を返します。

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

| フィールド | 型 | 要件 | 説明 |
|---|---|---|---|
| `negotiationId` | string | MUST | 交渉結果の識別子。 |
| `status` | string | MUST | `accepted`、`rejected`、`needs_more_information` のいずれか。 |
| `selected` | object | `accepted` の場合は MUST | 選ばれた能力、インターフェース、プロトコル、Profile、セキュリティモード、コンテンツ型、URL。 |
| `execution` | object | SHOULD | 後続の実行モードと実行制約。 |
| `schemas` | object | MAY | 要求と応答の Schema。 |
| `validUntil` | string | MAY | 交渉結果の有効期限。 |
| `negotiationDigest` | string | SHOULD | キャッシュと再利用に使う、交渉結果のダイジェスト。 |
| `alternatives` | array | MAY | 選ばれなかった候補案。 |
| `reason` | string | MAY | 拒否や追加情報の要求時の、人間が読める説明。 |

### 8.3 `selected` オブジェクト

`selected` は、後続の実際の業務処理で使う経路を示します。一般的なフィールドは、次のとおりです。

| フィールド | 説明 |
|---|---|
| `capability` | 選ばれた能力の ID。 |
| `interface` | 選ばれた Agent Description のインターフェースの ID。 |
| `protocol` | `openrpc`、`ANP`、`MCP` など、選ばれたインターフェースが使うプロトコル。 |
| `profile` | 後続の業務呼出しの ANP Profile。 |
| `securityProfile` | 後続の業務呼出しのセキュリティモード。 |
| `contentType` | 後続の業務ペイロードのコンテンツ型。 |
| `url` | 後続の業務インターフェース、またはインターフェース記述の URL。 |
| `protocolArtifact` | 任意の、プロトコル成果物の URI またはダイジェスト。 |

### 8.4 `execution` オブジェクト

`execution.mode` の一般的な値は、次のとおりです。

| 値 | 説明 |
|---|---|
| `direct_structured_call` | 構造化インターフェースを直接呼び出す。 |
| `direct_message` | 私的な会話のメッセージ Profile を使う。 |
| `group_message` | グループメッセージの Profile を使う。 |
| `async_task` | 非同期タスク、または非同期の協調手順を作る。 |
| `stream` | ストリーミングでやり取りする。 |
| `natural_language` | 自然言語インターフェースを使う。 |
| `natural_language_protocol_drafting` | 自然言語で一時的なプロトコルを起草する。 |

## 9. 自然言語によるプロトコル起草へのフォールバック

本仕様の主経路は、構造化された交渉です。自然言語によるプロトコル起草は、次に適したフォールバックです。

- 対象エージェントに、意図を満たせる構造化インターフェースがない。
- 呼出側と対象側に、共通して対応する Profile や Schema がない。
- 双方が、一時的に実験用のプロトコルを生成する必要がある。
- タスクの頻度が低い、1 回限り、または個別性が高い。

呼出側は、`anp.negotiate` 要求で次を宣言できます。

```json
{
  "mode": "natural_language_protocol_drafting",
  "constraints": {
    "allowNaturalLanguageFallback": true
  }
}
```

自然言語へのフォールバックは、プロトコル成果物の草案を生成してもかまいません（MAY）。ただし、双方が受け入れるまでは、安定したプロトコルとみなすべきではありません。実装者は、自然言語の草案を、可能な限り、構造化フィールド、Schema、例、テストケースに変換するべきです（SHOULD）。

## 10. キャッシュ、再利用、プロトコル成果物

### 10.1 交渉結果のキャッシュ

呼出側は `NegotiationResult` をキャッシュし、有効期限内で再利用してもかまいません（MAY）。キャッシュのキーは、少なくとも次を含むべきです（SHOULD）。

- 対象エージェントの DID。
- 呼出側の DID、または呼出側の能力のダイジェスト。
- 意図のタグ、または正規化された意図のダイジェスト。
- 選ばれたインターフェースの ID。
- `selected.profile`。
- `selected.securityProfile`。
- `negotiationDigest`。

次の場合、呼出側は再交渉するべきです（SHOULD）。

- `validUntil` が期限切れになった。
- `anp.get_capabilities` の戻り値が、キャッシュと一致しない。
- DID Document または `ANPMessageService` が変わった。
- 後続の業務呼出しが、Profile、インターフェース、セキュリティモード、コンテンツ型の非対応を返した。
- ローカルポリシー、セキュリティ要件、ユーザーの認可状態が変わった。

### 10.2 プロトコル成果物

プロトコル成果物は、再利用可能なプロトコル記述オブジェクトで、次を含めてもかまいません（MAY）。

- `protocol_id`。
- `protocol_uri`。
- `version`。
- メソッドの一覧。
- 要求と応答の Schema。
- 対応するセキュリティモード。
- コンテンツ型。
- 例。
- テストケース。
- ダイジェスト。
- 署名、または公開者の情報。

例：

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

本仕様は、世界共通の成果物登録簿を定義しません。成果物の公開、審査、署名、バージョン管理、合意機構は、将来の仕様で定義します。

### 10.3 初期の 0RTT の考え方との関係

初期の ANP-06 の 0RTT 設計では、ハンドシェイクメッセージに `usedProtocolHash` を含め、交渉を省略していました。本仕様は新しいハンドシェイクメッセージを定義しません。同等の能力は、次の方法で実現するべきです。

1. 呼出側が `NegotiationResult` またはプロトコル成果物をキャッシュする。
2. 後続の要求で、選ばれた Profile / Interface / Schema を直接使う。
3. 対象エンドポイントがその選択に対応していなければ、明示的なエラーを返す。
4. 呼出側が、エラーに基づき `anp.get_capabilities` と `anp.negotiate` を再度呼び出す。

## 11. エラーモデル

`anp.negotiate` は、JSON-RPC の `error` オブジェクトでエラーを返します。ANP 独自のエラー範囲を使い、`error.data.anp_code` に機械が識別できるエラーコードを含めることを推奨します。

| code | anp_code | 意味 |
|---|---|---|
| 1600 | `meta.negotiation_rejected` | 対象が交渉要求を拒否した。 |
| 1601 | `meta.no_matching_interface` | 意図と制約を満たすインターフェースがない。 |
| 1602 | `meta.unsupported_negotiation_mode` | 要求された交渉モードに対応しない。 |
| 1603 | `meta.unsupported_candidate_profile` | 候補の Profile に対応しない。 |
| 1604 | `meta.unsupported_security_profile` | 候補のセキュリティモードに対応しない。 |
| 1605 | `meta.unsupported_content_type` | 候補のコンテンツ型に対応しない。 |
| 1606 | `meta.more_information_required` | 交渉に追加の情報が必要。 |
| 1607 | `meta.authorization_required` | 先に認証、または認可コンテキストの準備を完了する必要がある。 |
| 1608 | `meta.negotiation_expired` | 交渉結果、または要求が期限切れ。 |

エラーの例：

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

## 12. セキュリティとプライバシーの考慮事項

### 12.1 認証

`anp.get_capabilities` は、匿名での公開の発見機能として呼び出してもかまいません（MAY）。

`anp.negotiate` が次のいずれかを含む場合、呼出側は `auth.origin_proof` または同等の DID 認証コンテキストを提供するべきです（SHOULD）。

- `sender_did`。
- 機密性のある意図。
- ユーザーのコンテキスト。
- 制限された能力。
- 支払い、予約、取引、認可、アイデンティティ、プライバシーに関連する能力。
- 非公開のインターフェース候補。
- サーバーが身元に応じて異なる交渉結果を返す場合。

サーバーは、匿名の `anp.negotiate` に対して、能力の部分集合を返す、要求を拒否する、認証を要求する、といった対応をしてもかまいません（MAY）。

### 12.2 交渉結果は認可ではない

`NegotiationResult` が示すのは、「後続でどのようにやり取りするか」だけです。次を意味しません。

- ユーザーが、業務上の動作を既に承認した。
- サーバーが、制限された資源へのアクセスを既に認可した。
- 支払い、予約、取引が既に成立した。
- 呼出側が、長期間のアクセス資格を既に取得した。
- 後続の業務要求で、その業務 Profile が要求する proof を省略できる。

選ばれたインターフェースが `humanAuthorization` を要求する場合、後続の業務手順でも、対応する業務プロトコルに従って認可を完了しなければなりません（MUST）。

### 12.3 最小限の開示

呼出側は、交渉要求での情報開示を最小限にするべきです（SHOULD）。

- 意図として、交渉に必要な要約だけを提供する。
- 交渉段階で、完全な支払情報、身分証明書、私的なメッセージ、大きなオブジェクトの内容を送信しない。
- `callerCapabilities` を必要に応じて絞り込み、無関係な内部能力を露出しない。
- 交渉ログから機密情報を除去する。

### 12.4 ダウングレード攻撃

呼出側とサーバーは、明示的な同意なしに、強いセキュリティモードから弱いモードへ移行してはなりません（MUST NOT）。

呼出側が `direct-e2ee` を要求した場合、サーバーは、黙って `transport-protected` を返すことはできません。要求を満たせなければ、明示的なエラーを返すべきです。

### 12.5 プロトコル成果物の安全性

交渉結果が外部のプロトコル成果物を参照する場合、実装者は次を検証するべきです（SHOULD）。

- 成果物のダイジェスト。
- 公開者、または署名。
- Schema の完全性。
- バージョンと依存関係。
- 成果物に、危険なコード、リモート実行命令、過剰な権限要求が含まれないか。

本仕様は、リモートコードの実行を要求しません。コードの生成や読み込みは、いずれもローカル実装の詳細であり、サンドボックスと最小権限の環境で扱わなければなりません。

## 13. 旧 PT=00 メッセージ交渉の廃止

初期の ANP-06 草案では、エンドツーエンド暗号化メッセージのペイロード内部に 1 バイトのバイナリヘッダーを追加し、`PT` フィールドで、メタプロトコル、アプリケーションプロトコル、自然言語プロトコル、検証プロトコルを区別していました。このモデルでは、`sourceHello`、`destinationHello`、`candidateProtocols`、`codeGeneration`、`testCasesNegotiation`、`fixErrorNegotiation` などの手順も定義していました。

この初期モデルは廃止されました。新しい実装は、本仕様の `anp.meta.negotiation.v1` と `anp.negotiate` を使わなければならず（MUST）、旧バイナリの `PT` メッセージヘッダー、旧 Hello 手順、旧コード生成手順を、ANP-06 の相互運用経路として実装したり、それらに依存したりしてはなりません（MUST NOT）。

本仕様は、旧モデルから新モデルへの互換対応表を提供せず、互換ゲートウェイの実装も要求しません。配置済みの環境に初期の実験的な実装が残る場合、それを非公開の過去の実装とみなし、独立した移行作業で本仕様へ更新するべきです。この移行は、ANP-06 の最小限の相互運用要件には含まれません。

## 14. 例

### 14.1 Agent Description の抜粋

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

説明：上の例の `capabilities` は、ANP-06 が使う任意の拡張の例です。実装者は、これを ANP-07 の必須の最上位フィールドと解釈するべきではありません。

### 14.2 能力確認の要求

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

### 14.3 能力確認の応答の抜粋

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

### 14.4 交渉要求と結果

交渉要求と結果は、第 7 節と第 8 節を参照してください。実装者は、デバッグ、キャッシュ、監査のため、実際の業務呼出しの前に `negotiationId` と `negotiationDigest` を保存するべきです（SHOULD）。

## 15. 将来の拡張

将来のバージョンでは、さらに次を定義できます。

- 標準のプロトコル成果物の JSON Schema。
- プロトコル成果物の登録簿と発見機構。
- 交渉結果への署名と、検証可能な公開。
- テストケースの交渉方法。
- 問題の報告と修正交渉の拡張。
- MCP、OpenAPI、OpenRPC、A2A などの外部プロトコル記述との対応関係。
- 複数主体の交渉とグループ交渉。
- 交渉でのプライバシー保護と、最小限の開示の profile。
- プロトコルの合意、投票、審査、ガバナンスの機構。

## 著作権表示
Copyright (c) 2024 ANP オープンソースコミュニティ
本ファイルは [Apache License 2.0](../../LICENSE) に基づいて公開します。自由に使用・変更できますが、この著作権表示を保持しなければなりません。
