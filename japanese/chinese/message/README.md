<!-- translation-review: full; source=chinese/message/README.md; basis=entire original read and manually compared paragraph by paragraph -->
> 日本語参考訳（機械翻訳を基に原文全文を照合済み）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [chinese/message/README.md](../../../chinese/message/README.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP Messaging 1.2 Profile 一覧

- 状態：公開済み仕様の一覧。P6 の安定版は、引き続き公開条件による制約を受けます。
- 仕様セット：ANP Messaging 1.2
- 範囲：同一の Agent DID 配下における、DID 宛ての Base メッセージと複数デバイスの暗号学的 Overlay。
- 英語版：[ANP Messaging 1.2](../../message/README.md)

## 1. バージョンの境界

この一覧の文書は ANP Messaging 1.2 仕様セットを構成し、以前の 1.1 文書を置き換えます。P6 の全文も一覧に含まれますが、安定した MLS ExtensionType の登録という公開条件を満たすまで、候補状態を維持します。一覧に含まれることは、P6 v2 が安定した相互運用リリースの状態に達したことを意味しません。

- **Profile のメジャーバージョン**は、`anp.direct.base.v1` や `anp.direct.e2ee.v2` のように、独立に交渉される通信上の契約を識別します。
- **Messaging 仕様セットのバージョン**は、一緒に公開する文書と一覧を識別します。ANP Messaging 1.2 は、意図的に v1 と v2 の Profile 識別子を併用します。
- 各 Profile のライフサイクルは独立しています。新しい Profile に依存しても、依存先の他の Profile のメジャーバージョンまで同時に上げる必要はありません。
- P1、P2、P3、P7、P8、P9 Mention binding は v1 の契約を維持します。P4 は、Handle-backed メンバーモードと公開の結合変更メソッドを削除し、Host が調整する DID 更新を加えることで、通信上の契約と状態機械が変わるため、v2 を使用します。
- P5 Direct E2EE と P6 Group E2EE は、複数デバイスの通信上の契約と暗号学的な状態機械が v1 と互換性を持たないため、v2 を使用します。
- Agent DID は引き続き業務上のアイデンティティです。Messaging 1.2 では、Profile がその DID 配下の暗号学的なデバイスエンドポイントを必要とする場合だけ、`device_id` を導入します。
- 通常の非 E2EE の私信、グループメッセージ、Mention、添付操作は DID 宛てを維持し、デバイス selector を要求せず、含めません。各デバイスへの配信は、受信 DID の所属ドメイン内で行います。
- デバイス宛ての安全な操作では、Profile が宣言する依存先の完全なセットと、現在有効な `deviceManifest` が必要です。DID 配下にデバイスが1台しかない場合も同じです。Base 操作は Manifest を要求せず、架空のデバイスも作りません。
- `meta.profile` が、要求の解釈と能力交渉に使う唯一のバージョン根拠です。廃止された `meta.anp_version` は、Profile のセットを選択するものでも、暗黙に示すものでもありません。
- 実装は、v1 の依存関係から P5/P6 v2 対応を推測したり、v1 の相手のためにデバイスを捏造したり、v2 E2EE の要求やセッションを黙って v1 にダウングレードしたりしてはなりません（**MUST NOT**）。

仕様の公開は、SDK、サービス、製品への実装を意味しません。実装は、実際に対応する能力だけを宣言し、各 Profile の状態と公開上の制限に従う必要があります。

## 2. Profile の構成

| Profile | 識別子 | 文書 | Messaging 1.2 の主な責務 |
| --- | --- | --- | --- |
| P1 | `anp.core.binding.v1` | [コアバインディング](01-核心绑定.md) | 共通 DID メタデータ、条件付きのデバイス selector、署名の結合、能力交渉、冪等性、共通エラー |
| P2 | `anp.identity.discovery.v1` | [アイデンティティと発見](02-身份与发现.md) | デバイス宛ての安全な Profile 向けに、DID メソッドで保護された `deviceManifest`、鍵参照、適格性、発見を提供 |
| P3 | `anp.direct.base.v1` | [私信の基本意味論](03-私聊基础语义.md) | 1回の DID-to-DID の通常配信、DID 単位の受理、メッセージの関連付け |
| P4 | `anp.group.base.v2` | [グループメッセージの基本意味論](04-群组基础语义.md) | DID-only のメンバー関係、Host が調整するメンバー DID 更新、管理、送信、DID 宛ての通知 |
| P5 | `anp.direct.e2ee.v2` | [私信のエンドツーエンド暗号化](05-私聊端到端加密.md) | デバイスに結び付いた PreKey、Session、Ratchet、AAD、リプレイ状態、Mailbox |
| P6 | `anp.group.e2ee.v2` | [グループのエンドツーエンド暗号化](06-群组端到端加密.md) | 同一メンバー DID の複数の独立したデバイス Leaf。MLS code point の登録待ちの候補状態 |
| P7 | `anp.attachment.v1` | [添付とオブジェクト転送](07-附件与对象传输.md) | DID 宛ての manifest、オブジェクト制御、Bearer Ticket フロー。暗号化 object key の配布は P5/P6 を継承 |
| P8 | `anp.federation.relay.v1` | [フェデレーションとドメイン間通信](08-联邦与跨域.md) | 外側の Profile がデバイス宛てを宣言する場合だけ selector を保持し、適格性を検証 |
| P9 | v1 binding の拡張 | [メッセージ Mention 拡張](09-消息Mention扩展.md) | Mention target を DID／group selector のまま維持し、不変の payload を P4 v2 または P6 v2 と組み合わせる |

実装は capability discovery を通じて独自の Profile を宣言できます。ただし、ANP メッセージを運んだり ANP の discovery メソッドを使ったりしても、その独自 Profile が ANP Messaging 仕様セットの一部になるわけではありません。特に `anp.*` 名前空間外の識別子は、引き続き該当実装が所有・定義します。

E2EE v2 は、意図的に異なるバージョンを含む依存関係を使います。

```text
anp.direct.e2ee.v2
  -> anp.core.binding.v1
  -> anp.identity.discovery.v1
  -> anp.direct.base.v1

anp.group.e2ee.v2
  -> anp.core.binding.v1
  -> anp.identity.discovery.v1
  -> anp.group.base.v2
```

## 3. バージョン混在の能力宣言

通常の v1 メッセージと複数デバイスの E2EE v2 に対応するサービスは、次のように宣言できます。

```json
{
  "supported_profiles": [
    "anp.core.binding.v1",
    "anp.identity.discovery.v1",
    "anp.direct.base.v1",
    "anp.group.base.v2",
    "anp.attachment.v1",
    "anp.federation.relay.v1",
    "anp.direct.e2ee.v2",
    "anp.group.e2ee.v2"
  ]
}
```

これは有効な能力セットであり、Direct Base、Attachment、Federation の v2 の存在を要求しません。個々の要求は、引き続き1つの Profile だけを選択します。通常の私信には Direct Base v1、暗号化された私信には Direct E2EE v2、通常のグループメッセージには Group Base v2、暗号化されたグループメッセージには Group E2EE v2 を使います。

## 4. Profile バージョンの規則

旧実装が新しい契約を安全に処理できない場合だけ、Profile のメジャーバージョンを上げます。これには、必須の wire フィールドの追加、フィールドの削除や改名、意味の変更、署名や AAD の対象範囲の変更、冪等性キーや状態機械の変更、セキュリティモードの意味の変更が含まれます。

既存の意味の明確化、既存の境界を明示する禁止事項の追加、例の修正、新しい Overlay との組み合わせの説明、後方互換の任意拡張の追加、文書内の矛盾の修正は、メジャーバージョンを変えません。

Profile の wire 識別子には、`.v1`、`.v2` のようなメジャーバージョンだけを使います。1.1、1.2 などのマイナーバージョンは Messaging 仕様セットに属し、Profile の wire 識別子に含めてはなりません（**MUST NOT**）。

## 5. 共通の判断

Messaging 1.2 の全 Profile は、次の解釈を共通に採用します。

1. Agent DID が Base メッセージの通信上のアイデンティティとアドレスです。`device_id` は、各 Profile が宣言する任意の暗号学的エンドポイント selector です。値は不透明で、所属 DID のデバイス名前空間内で一意です。Device DID、業務上のメンバー、役割、ハードウェア識別子、`target.kind` ではありません。
2. `deviceManifest` は、デバイス宛ての安全な Profile を宣言する DID の、現在の公開デバイス集合の全体です。メソッドに従って検証済みの DID Document に埋め込まれ、独立した endpoint、proof、epoch、hash、CAS プロトコルを持ちません。Base の発見だけなら不要です。
3. Manifest の項目に含めるのは、`device_id`、`signing_key_id`、`e2ee_key_id`、`profiles[]` だけです。製品ドメイン内の役割、token、Registry の状態、復旧状態、秘密鍵を含めることは厳禁です。
4. P3、P4、P7 の通常フローと P9 payload の意味論は、業務 DID または Group DID だけを使います。`sender_device_id`、`recipient_device_id`、`requester_device_id` を要求したり含めたりしてはなりません（**MUST NOT**）。E2EE に必要なデバイス selector は P5/P6 が所有し、業務上の宛先は引き続き `meta.target.did` に置きます。
5. 既存の `anp-rfc9421-origin-proof-v1` と Data Integrity proof scheme を引き続き使います。P5/P6 の `.v2` Profile ID は、proof v2 を自動的に作るものではありません。Base Profile は sender DID を認証します。P5/P6 のデバイスフィールドは、所属 Overlay が定義する authenticated context の対象に含めなければなりません（**MUST**）。その操作が `auth.origin_proof` を使う場合、proof key は選択した Manifest 項目と一致する必要があります。一方、P5 MTI の暗号文送信では、デバイス対の Session と認証済み AAD によって selector を結び付けます。
6. ANP は、配備固有の非公開の `document_version`、`document_hash`、checkpoint フィールドを公開しません。適格性が変わる可能性がある場合、呼び出し側は現在の、メソッドに従って検証される DID Document を再度解決します。
7. デバイス宛ての安全な Profile では、各デバイスが署名／E2EE 秘密鍵、PreKey、Direct Ratchet State、MLS の非公開状態、リプレイ状態を個別に保持し、デバイス間で複製することを禁止します。
8. DID の `deviceManifest` から削除されたデバイスは、元の `device_id` やデバイス鍵を使ってそのまま復元してはならず、再登録には新しい ID と鍵が必要です。これはアイデンティティの範囲で永久に適用され、Overlay の範囲のエンドポイント変更と混同してはなりません（**MUST NOT**）。例えば、P6 であるグループからデバイスの MLS leaf を削除しても、そのデバイスが現在の適格な Manifest 項目のままであれば、`device_id` を保持し、新しい暗号学的資料でその Overlay エンドポイントを再構築できます。
9. P6 は候補状態を維持し、必須の LeafNode デバイス結合を運ぶため、私用の MLS ExtensionType `0xF0A1` を暫定的に使います。これは IANA の割り当て値ではなく、安定した登録 code point の取得が公開条件です。
10. 新しい要求では、廃止された `meta.anp_version` を省略します。受信側は互換性や診断のためにだけこのフィールドを保持でき、Profile の選択や、ある Profile セットへの対応の推測に使ってはなりません（**MUST NOT**）。
11. Messaging の wire identity には完全な DID だけを使います。人間可読な名前と名前解決は Messaging wire protocol の外側にあり、メンバー関係や認可の連続性を定義しません。
12. メソッド固有の DID 移行では、呼び出し側とサービスは、それまで信頼していた DID を出発点として、登録済みの移行チェーンを検証します。得られた assurance をどう使うかは、該当業務のポリシーが決めます。`alsoKnownAs` や同じパスだけでは、権限の連続性を認められません。
13. P4 v2 が保存するのは、メンバーの現在の DID と通常のメンバーメタデータだけです。検証された、または業務ポリシーが受け入れた Agent DID 移行は、同じ内部メンバーレコードを更新して `member-did-updated` を発生させます。過去のメッセージ、受領証、署名、DID を書き換えるものではありません。
14. 共通の DID リクエスト認証は [ANP-02](../02-ANP-基于DID的身份认证协议.md)、メッセージバインディングは P1、DID メソッドの検証は P2 に従います。`did:wba` と `did:web` は、同じメッセージ規則、フィールド、署名／AAD 形式を使用します。

## 6. 読解とレビューの順序

まず ANP-02 の共通アイデンティティと認証を読み、次に P1/P2、Direct の P3/P5、Group の P4/P6、P7/P8/P9 を読みます。最後に、必要に応じて、この ANP カタログに属さない独立した実装拡張を読みます。レビュー時には中国語版と英語版の両方を確認してください。フィールド、依存関係、エラー名、例の不一致は、いずれも仕様の欠陥です。

複数デバイスの例は [examples/message-vnext](../../examples/message-vnext/README.cn.md) にまとめています。

## 著作権表示

Copyright (c) 2024 ANP 开源社区
本ファイルは [Apache License 2.0](../../../LICENSE) の下で公開されています。自由に使用・変更できますが、この著作権表示を保持する必要があります。
