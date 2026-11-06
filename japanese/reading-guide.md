# ANPで3体の会話を読むためのガイド

この文書は、ANPの通信とアプリケーションの会話方針を区別して理解するための日本語解説です。**仕様の全文訳ではなく、規範的な仕様でもありません。** 根拠は、このforkの基点であるコミット`0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`のP1とP4です。各項目からリンクする英語原文の節で、正確な要件を確認してください。`japanese/`の機械翻訳を含む文書全体について、完全な校閲や適合性検証が済んだことを示すものではありません。

## まず読む順序

全体像は[日本語README](README.md)、メッセージングの位置付けは[ANP-09の日本語訳](09-ANP-end-to-end-instant-messaging-protocol-specification.md)にあります。実際の通信を追うときは、共通の封筒を定義する[P1 Core Binding](../message/01-core-binding.md)、グループの操作と受理を定義する[P4 Group Base](../message/04-group-messaging-base-semantics.md)、[TypeScriptデモ](../examples/three-agents-typescript/README.md)の順に読むと、仕様と実装を対応させやすくなります。

P4はP1だけでなく、識別・サービス発見を定める[P2](../message/02-identity-and-discovery.md)にも依存します。認証を詳しく追う場合は、[ANP-02](../02-anp-did-authentication-protocol-specification.md)と、P1の付録A・Bも必要です。「ANPだけを使う」とは、単一のファイルやライブラリーだけで完結するという意味ではありません。

## 規範用語とバージョンの読み方

仕様の大文字の用語は、要求の強さを表します。特に否定を落とすと意味が逆転します。

| 原文の用語 | このガイドでの読み方 |
| --- | --- |
| `MUST` / `REQUIRED` / `SHALL` | 必須。満たさなければなりません |
| `MUST NOT` / `SHALL NOT` | 禁止。行ってはなりません |
| `SHOULD` / `RECOMMENDED` | 推奨。単なる必須と同一視しません |
| `SHOULD NOT` / `NOT RECOMMENDED` | 非推奨。絶対的な禁止と同一視しません |
| `MAY` / `OPTIONAL` | 任意。対応・使用が必須だとは読みません |

参考情報としての例や図、`Non-Normative`と明記された実装メモを、そのまま追加の必須要件として扱わないことも大切です。根拠: [P1 §2.1](../message/01-core-binding.md#21-normative-keywords)、[P4 §2.1](../message/04-group-messaging-base-semantics.md#21-normative-keywords)。

現在の仕様群はANP Messaging 1.2ですが、通信のProfileは独立してバージョン管理します。P1は`anp.core.binding.v1`、P4は`anp.group.base.v2`です。両者を組み合わせても矛盾せず、`.v1.2`へ一括変更しません。P4の文書状態はReleased、P6 Group E2EEは登録条件を残したcandidateです。P4の公開はP6の安定版公開を意味しません。根拠: [P1 §11.2](../message/01-core-binding.md#112-version-management)、[P4 §5](../message/04-group-messaging-base-semantics.md#5-profile-identification-and-dependencies)、[Messaging一覧 §1](../message/README.md#1-version-boundary)。

## P1は通信の共通の封筒

P1は、要求、応答、通知、共通メタデータ、エラー、機能の問い合わせなどの形をそろえます。人格、話題、次の話者を定める層ではありません。

- 要求はJSON-RPC 2.0で、`params`はオブジェクト、`id`は空でない文字列です。数値や`null`のID、配列形式の`params`、バッチは許可しません。
- `meta.profile`は、その要求をどのProfileの契約として解釈するかを選びます。`meta.security_profile`は、その要求のセキュリティ方式を表します。
- 通知（Notification）は`id`を持たない非同期イベントです。成功・失敗の確認が必要な送信や、永続状態を変える制御要求を通知で代用してはなりません。
- `anp.get_capabilities`の実行時の応答を確認します。DID文書にある静的なヒントだけで、すべての機能が実装されていると推定しません。
- HTTPS、WSS、または機密性・完全性・相手認証を提供する安全なチャネルが必要です。単にJSON-RPCの形が同じであることだけでは、ANPの要件を満たしません。

根拠: [P1 §4.1–4.3](../message/01-core-binding.md#4-binding-basics)、[§5](../message/01-core-binding.md#5-json-rpc-interoperability-constraints)、[§6.2](../message/01-core-binding.md#62-meta-object)、[§8.3](../message/01-core-binding.md#83-negotiation-rules)。

再送には、JSON-RPCの応答対応用の`id`に加えて、操作の同一性を表す`operation_id`、メッセージの同一性を表す`message_id`があります。同じ操作の再試行では、適用されるProfileの冪等性範囲内で操作IDを維持し、同じ操作を二重に実行しないようにします。`created_at`だけを唯一のリプレイ防止策にはできません。根拠: [P1 §6.2.6–6.2.7](../message/01-core-binding.md#626-operation_id)、[§9](../message/01-core-binding.md#9-idempotence-and-retry)、[§13.2](../message/01-core-binding.md#132-timestamp-is-not-the-main-anti-replay-mechanism)。

## P4のHostが順序付けるもの

P4のGroup Hostは、同じ`group_did`で受理したグループ状態変更とグループメッセージに、線形の順序を付けます。2つの値の違いが重要です。

| フィールド | 表すもの | `group.send`を受理すると | メンバー追加などを受理すると |
| --- | --- | --- | --- |
| `group_event_seq` | 制御操作とメッセージを含む、グループイベントの位置 | 新しい値を割り当てる | 新しい値を割り当てる |
| `group_state_version` | メンバー・ポリシーなどのアプリケーション状態の版 | メッセージ自体を理由に進めない | 新しい版を割り当てる |

`group_event_seq`は単調増加する10進文字列です。`group_state_version`は不透明な文字列なので、クライアントが整数として加算する前提ではありません。グループメッセージには、そのメッセージを受理した時点の状態スナップショットの版が返ります。

たとえば、説明用に状態版を`sv-a`と呼ぶなら、作成がイベント`"1"`／状態`sv-a`、2件の送信がイベント`"2"`、`"3"`／状態はどちらも`sv-a`、次のメンバー追加がイベント`"4"`／新しい状態`sv-b`という関係になります。これは関係を示す例で、実際の状態版の形式を規定しません。また、イベント番号には制御操作も含まれるため、受信した会話メッセージの番号が飛んだだけで、メッセージ消失と断定できません。

根拠: [P4 §6.2](../message/04-group-messaging-base-semantics.md#62-group_state_version)、[§6.3](../message/04-group-messaging-base-semantics.md#63-group_event_seq)、[§10.1–10.2](../message/04-group-messaging-base-semantics.md#10-ordering-concurrency-and-conflict)。

## メンバーの状態と受信通知

P4のビジネスメンバーはAgent DIDです。状態は`active`、`left`、`removed`、役割は`owner`、`admin`、`member`です。`group.join`や権限を持つメンバーからの`group.add`が成功すると、対象は`active`になります。デバイスやMLSリーフの追加・削除だけで、P4メンバーを増減させません。

`group.send`は送信者からHostへの要求です。Hostから各メンバーへ届ける`group.incoming`は通知であり、元の送信者のメッセージとOrigin Proofを保持します。メンバーやポリシーの状態変更には、別の通知`group.state_changed`を使います。退出・削除された本人にも、その本人を対象とする最後の状態変更通知を、明示的な再試行・保持の上限付きで送る要件があります。ただし、その到達自体は保証されず、不達はメンバーであり続ける証拠にはなりません。

根拠: [P4 §3.4](../message/04-group-messaging-base-semantics.md#34-the-end-point-of-the-protocol-is-still-agent)、[§4.3](../message/04-group-messaging-base-semantics.md#43-state-machine-diagram)、[§6.4–6.5](../message/04-group-messaging-base-semantics.md#64-role-model)、[§8.10–8.11](../message/04-group-messaging-base-semantics.md#810-groupincoming)。

## Origin Proofとreceiptは別の事実を証明する

| 仕組み | 証明する事実 | 証明しない事実 |
| --- | --- | --- |
| `auth.origin_proof` | 対象のビジネス主体が、この内容・宛先・操作を開始した | Hostがその要求を受理したこと、全員が受信したこと |
| `group_receipt`とその有効な`proof` | グループが、その結果を受理し、対応する状態・イベント位置を割り当てた | 発信者の証明の代替、全員の受信、音声再生の完了 |
| 外側のホップ／サービス認証 | いま次のサービスを呼び出している相手 | 元のビジネス送信者が誰かという証明の代替 |

P4の状態を変える要求と`group.send`には、発信者のOrigin Proofが必須です。P1付録Aでは、`{method, meta, body}`というSigned Request ObjectをJCSで正規化し、ダイジェスト・署名に結び付けます。`jsonrpc`、`id`、`auth`はそのオブジェクトに含めません。署名の`@target-uri`は論理宛先である`anp://...`を使うため、サービスをまたいで転送されても、元のビジネス上の宛先と内容を検証できます。

Hostは、署名計算が合うかだけでなく、DID Documentのメソッド別検証、鍵の`authentication`関係、送信者DIDとの一致、時刻・リプレイ対策なども検証します。その上で、`group_policy`に基づいて送信や管理の権限を判断します。「誰かを認証できた」と「その操作を許可する」は別の判断です。

`group.send`の成功応答に`group_receipt`を含めること自体は任意です（MAY）。receiptを発行する場合の`proof`は通常は推奨（SHOULD）で、Hostのドメイン外へ出て他ドメインに依拠される場合は必須（MUST）です。receiptのProofは、Group DIDが発行するObject Proofで、`assertionMethod`の権限を使います。発信者のOrigin Proofに使う`authentication`関係と混同しません。有効な署名を確認した後も、receiptの内容が実際の応答・通知・グループ状態と一致するかの検査が必要です。

根拠: [P1付録A §A.3–A.4](../message/01-core-binding.md#a3-sharing-signed-request-object)、[§A.6–A.9](../message/01-core-binding.md#a6-minimum-authentication-requirements)、[付録B](../message/01-core-binding.md#appendix-b-normative-shared-object-proof-profile)、[P4 §3.6](../message/04-group-messaging-base-semantics.md#36-separation-of-initiator-authentication-and-group-result-witnessing)、[§7.9](../message/04-group-messaging-base-semantics.md#79-group_receipt)、[§8.9.4](../message/04-group-messaging-base-semantics.md#894-successful-response)、[§11.2–11.5](../message/04-group-messaging-base-semantics.md#112-group-operation-initiator-authentication)。

## 会話の順番や音声の重なりは、どこで決まるか

P4のイベント順序は、Hostが受理した通信上の出来事の順序です。受信したエージェントが何を返答するか、いつ返答を生成するか、誰に次の発話権を与えるかを、その番号が自動的に決めるわけではありません。人格、モデル、司会、相づち、割り込み、音声合成、スピーカー停止などのアプリケーション方針は、P1/P4では標準化されていません。

したがって、Aのメッセージがイベント`"20"`、Bのメッセージが`"21"`として受理されても、Aの音声合成や再生が遅れれば、スピーカー上では重なる可能性があります。逆に、Bのメッセージが通知で届いたからといって、Aに再生停止命令が届いたことにはなりません。相づちを重ねてよいか、人間の割り込みを検知したら誰が止まるか、停止確認をどこまで待つかは、会話・音響側に別途必要な契約です。

これはP1/P4の規定対象と非目標から読み取れる設計上の整理であり、「音声は重なってはならない」というANPの条文を追加するものではありません。P4自体も強い同期を非目標に挙げています。根拠: [P1 §3.3](../message/01-core-binding.md#33-non-goals)、[P4 §1](../message/04-group-messaging-base-semantics.md#1-purpose)、[§3.3–3.5](../message/04-group-messaging-base-semantics.md#33-separation-of-application-semantics-and-cryptographic-semantics)、[§10](../message/04-group-messaging-base-semantics.md#10-ordering-concurrency-and-conflict)。

## 今回のデモで観察できることと限界

[3体のTypeScriptデモ](../examples/three-agents-typescript/README.md)は、Roundtableを使わず、異なる人格の3エージェントが、ANPの要求・通知を実際に送受信する流れを観察するためのものです。HTTPSの通信、DID Document取得、Origin Proof、Hostの受理と順序付け、各エージェントの受信履歴を追えます。

**会話文は人格別の固定台詞と直前の受信内容を参照するローカル規則で作る、決定的な模擬会話です。実モデルが自律的に生成した会話ではありません。** 発言順はデモのアプリケーションループが決めます。ANPの規定で次の話者が自動選択されたと解釈しないでください。音声再生や物理的な重なりの試験もしていません。

**デモはP4 v2の一部操作を使う学習用サブセットであり、P4やANP 1.2への完全適合実装ではありません。** P4は`group.join`、`group.add`、`group.remove`、`group.leave`、プロフィール／ポリシー更新、DID更新、状態通知なども最低相互運用要件に含めています。SDKの署名関数を利用したことや、`meta.profile`に正しい名前を入れたことだけで、これらの要件を満たしたことにはなりません。

また、デモでは独立検証できるHost署名付き`group_receipt`は実装していません。ここで観察するHostの受理応答と、第三者が後から検証できる結果証明は区別してください。全員への配信、再起動をまたぐ永続性、通知失敗時の回復、外部実装との相互運用性などの制限は、デモの[機能範囲](../examples/three-agents-typescript/README.md)と[検証記録](../examples/three-agents-typescript/verification.md)を確認してください。

根拠: [P4 §14 最低相互運用要件](../message/04-group-messaging-base-semantics.md#14-minimum-interoperability-requirements)、[デモの実装](../examples/three-agents-typescript/src/network.ts)。
