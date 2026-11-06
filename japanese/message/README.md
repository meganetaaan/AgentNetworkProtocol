# ANP Messaging 1.2 Profile一覧

- 状態: 公表済みの仕様カタログ。P6の安定版公開には引き続き条件があります。
- 仕様群: ANP Messaging 1.2
- 適用範囲: DIDを宛先とするBaseメッセージングと、1つのAgent DIDの下にある複数デバイスの暗号オーバーレイ
- 中国語版: [ANP Messaging 1.2一覧](../chinese/message/README.md)

## 1. バージョンの境界

このディレクトリの文書はANP Messaging 1.2仕様群を構成し、以前の1.1文書を置き換えます。P6は、登録済みMLS ExtensionTypeを必要とする公開条件の充足待ちという候補の状態で、全文を含めています。このカタログへの掲載は、安定したP6 v2の相互運用性を宣言するものではありません。

- **Profileのメジャーバージョン**は、`anp.direct.base.v1`や`anp.direct.e2ee.v2`など、独立して交渉する1つの通信契約を識別します。
- **Messaging仕様群のバージョン**は、調整された文書・カタログのリリースを識別します。ANP Messaging 1.2には、意図的にv1とv2の両方のProfile識別子を含めています。
- Profileには独立したライフサイクルがあります。新しいProfileに依存しても、依存関係全体のメジャーバージョンを一斉に変更する必要はありません。
- P1、P2、P3、P7、P8、およびP9 Mentionバインディングはv1の契約を維持します。P4では、Handleに裏付けられたメンバーシップと公開rebindメソッドの削除、およびHostが調整するDID更新の追加によって、通信契約と状態機械が変わるため、v2を使います。
- P5 Direct E2EEとP6 Group E2EEは、複数デバイスの通信契約と暗号状態機械がv1と互換性を持たないため、v2を使います。
- Agent DIDは引き続きビジネス上の識別です。Messaging 1.2は、そのDID配下の暗号デバイスエンドポイントを必要とするProfileに限って、`device_id`を導入します。
- 通常の非E2EEのDirect、Group、Mention、Attachment操作は引き続きDIDを宛先とし、デバイスセレクターを要求せず、含めることもありません。これらの操作におけるデバイスへの配信展開は、受信DIDのドメイン内で行います。
- デバイスを宛先とするセキュリティ操作には、そのProfileが宣言する依存関係の完全な集合と、有効かつ現在の`deviceManifest`が必要です。DIDにデバイスが1つしかなくても同じです。Base操作はManifestを要求せず、デバイスを合成しません。
- `meta.profile`だけが、要求の解釈と機能交渉の正しい基準です。非推奨の`meta.anp_version`は、Profile群を選択したり、暗黙に示したりしません。
- 実装は、v1依存先からP5/P6 v2への対応を推定したり、v1の相手用にデバイスを合成したり、v2 E2EE要求・セッションを黙ってv1へダウングレードしたりしては**なりません（MUST NOT）**。

仕様の公表は、SDK、サービス、製品による実装対応を意味しません。実装は、各Profileの状態と公開制約に従い、実際に実装した機能だけを広告します。

## 2. Profileの構成

| Profile | 識別子 | 文書 | Messaging 1.2での責務 |
| --- | --- | --- | --- |
| P1 | `anp.core.binding.v1` | [コアバインディング](01-core-binding.md) | 共通のDIDメタデータ、条件付きデバイスセレクター、署名付きバインディング、機能交渉、冪等性、共通エラー |
| P2 | `anp.identity.discovery.v1` | [識別と発見](02-identity-and-discovery.md) | メソッドによって保護された`deviceManifest`、鍵参照、適格性、デバイス宛てセキュリティProfileの発見 |
| P3 | `anp.direct.base.v1` | [ダイレクトメッセージングの基本](03-direct-messaging-base-semantics.md) | DID間の1回の通常配信、DIDレベルの受理、メッセージの対応付け |
| P4 | `anp.group.base.v2` | [グループメッセージングの基本](04-group-messaging-base-semantics.md) | DIDだけに基づくメンバーシップ、Hostが調整するメンバーDID更新、統治、送信、DID宛て通知 |
| P5 | `anp.direct.e2ee.v2` | [Direct E2EE](05-direct-end-to-end-encryption.md) | デバイスに結び付いたPreKey、Session、Ratchet、AAD、リプレイ状態、Mailbox |
| P6 | `anp.group.e2ee.v2` | [Group E2EE](06-group-end-to-end-encryption.md) | 1つのメンバーDIDに対する複数の独立したデバイスリーフ。登録済みMLSコードポイントを待つ候補 |
| P7 | `anp.attachment.v1` | [添付とオブジェクト転送](07-attachments-and-object-transfer.md) | DID宛てのManifest、オブジェクト制御、Bearer Ticketのフロー。暗号化オブジェクト鍵の配布はP5/P6から引き継ぎます |
| P8 | `anp.federation.relay.v1` | [フェデレーションとドメイン間通信](08-federation-and-cross-domain.md) | 外側のProfileがデバイス宛て指定を宣言する場合に限り、セレクターを保持して適格性を検証します |
| P9 | v1バインディング拡張 | [メッセージのメンション](09-message-mentions.md) | メンション対象をDID／グループセレクターの範囲に保ち、変更しないペイロードをP4 v2またはP6 v2と組み合わせます |

実装が独自に定義したProfileを機能発見で広告することはできます。ただし、ANPメッセージを運んだりANPの発見メソッドを使ったりするだけで、非公開ProfileがANP Messaging仕様群の一部になるわけではありません。特に、`anp.*`名前空間外の識別子は、引き続きその実装が所有し、仕様を定めます。

v2 E2EEの依存関係は、意図的に複数バージョンを含みます。

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

## 3. 複数バージョンの機能宣言

通常のv1メッセージングと複数デバイスE2EE v2に対応するサービスは、次のように宣言できます。

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

これは有効な機能集合の一例です。Direct Base、Attachment、Federationのv2識別子を要求するものではありません。具体的な要求は、引き続き厳密に1つのProfileを選びます。通常のダイレクトメッセージングにはDirect Base v1、暗号化ダイレクトメッセージングにはDirect E2EE v2、通常のグループメッセージングにはGroup Base v2、暗号化グループメッセージングにはGroup E2EE v2を使用します。

## 4. Profileのバージョン管理規則

Profileのメジャーバージョンは、古い実装が新しい契約を安全に処理できない場合にだけ変更します。これには、必須の通信フィールドの追加、フィールドの削除・名前変更、フィールドの意味の変更、署名やAADの適用範囲の変更、冪等性キーや状態機械の変更、セキュリティモードのセマンティクスの変更が含まれます。

説明の明確化、既存のセマンティクスを明示する禁止事項、例の訂正、新しいOverlayとの組み合わせ方の指針、任意で後方互換な拡張、文書内部の不整合の修正では、Profileのメジャーバージョンを変更しません。

Profileの通信識別子は、`.v1`や`.v2`のようにメジャーバージョンだけを使用します。1.1や1.2のようなマイナーバージョンはMessaging仕様群のものであり、Profileの通信識別子に含めては**なりません（MUST NOT）**。

## 5. 共通の決定事項

すべてのMessaging 1.2 Profileは、次の解釈を使用します。

1. Agent DIDは、Baseメッセージングの通信上の識別とアドレスです。`device_id`は、Profileが所管する任意の暗号エンドポイントセレクターです。存在する場合は不透明な値で、その所有DIDのデバイス名前空間内で一意です。Device DID、ビジネス上のメンバー、役割、ハードウェア識別子、`target.kind`にはなりません。
2. `deviceManifest`は、デバイス宛てセキュリティProfileを広告するDIDについて、現在の公開デバイスの完全な集合を表し、メソッドに従って検証されたDID Document内に埋め込みます。独立したエンドポイント、Proof、epoch、hash、CASプロトコルはありません。Baseだけの発見では不要です。
3. Manifestの項目に含めるのは、`device_id`、`signing_key_id`、`e2ee_key_id`、`profiles[]`だけです。製品ローカルの役割、トークン、レジストリー状態、回復状態、秘密鍵は禁止します。
4. P3、P4、P7の通常フローとP9ペイロードのセマンティクスは、ビジネスDIDまたはGroup DIDだけを使用し、`sender_device_id`、`recipient_device_id`、`requester_device_id`を要求したり含めたりしては**なりません（MUST NOT）**。E2EEに必要なデバイスセレクターはP5/P6が所管し、ビジネス上の対象は引き続き`meta.target.did`に置きます。
5. 既存の`anp-rfc9421-origin-proof-v1`とData IntegrityのProof方式を引き続き使用します。P5/P6の`.v2` Profile IDによって、新しいProof方式が生じることはありません。Base Profileは送信者DIDを認証します。P5/P6のデバイスフィールドは、所管するOverlayが定義する認証済みコンテキストの保護範囲に含まれなければ**なりません（MUST）**。その操作で`auth.origin_proof`を使う場合、そのProof鍵は選択したManifest項目と一致しなければなりません。P5のMTI暗号文送信では、代わりに、デバイスペアのSessionと認証されたAADを通じてセレクターを結び付けます。
6. ANPは、配備環境に固有の非公開の`document_version`、`document_hash`、チェックポイントフィールドを公開しません。適格性が変化した可能性がある場合、呼び出し元は、メソッドに従って検証される現在のDID Documentを再解決します。
7. デバイス宛てセキュリティProfileでは、各デバイスが、個別の署名／E2EE秘密鍵、PreKey、Direct Ratchet状態、MLS秘密状態、リプレイ状態を所有します。これらをデバイス間でコピーすることはありません。
8. DIDの`deviceManifest`から削除したデバイスは、以前の`device_id`やデバイス鍵を使って復元できません。再登録では新しいIDと新しい鍵を使用します。これは識別の範囲に属し、恒久的です。これを、P6が1つのグループから1つのデバイスのMLSリーフを削除するような、Overlayの範囲でのエンドポイント変更と混同しては**なりません（MUST NOT）**。現在も適格なManifest項目であるデバイスは、`device_id`を維持し、新しい暗号情報を使ってそのOverlayエンドポイントを再確立できます。
9. P6は候補の状態を維持し、必須のLeafNodeデバイスバインディングに、暫定的な私的利用のMLS ExtensionType `0xF0A1`を使用します。これはIANAによる割り当てではありません。安定した登録済みコードポイントが公開条件です。
10. 新しい要求では、非推奨の`meta.anp_version`を省略します。受信者は互換性や診断のためだけに保持してもかまいませんが、それをProfileの選択やProfile群への対応の推定に使っては**なりません（MUST NOT）**。
11. メッセージングの通信上の識別は完全なDIDです。人間が読める名前と名前解決はMessaging通信プロトコルの範囲外であり、メンバーシップや認可の継続性を定義しません。
12. メソッド固有のDID遷移では、呼び出し元とサービスは、以前に信頼したDIDを起点として登録済みの遷移チェーンを検証し、所管するビジネスポリシーに従って、得られた保証を利用します。`alsoKnownAs`や、パスの一致だけでは、継続性は認可されません。
13. P4 v2は、現在のメンバーDIDと通常のメンバーシップメタデータだけを保存します。検証済み、またはポリシーで受け入れたAgent DID遷移は、同じ内部メンバーシップ記録を更新して`member-did-updated`を発行します。過去のメッセージ、受領証、署名、DIDを書き換えることはありません。
14. 共通のDID要求認証は[ANP-02](../02-anp-did-authentication-protocol-specification.md)、メッセージバインディングはP1、DIDメソッドの検証はP2に従います。`did:wba`と`did:web`は、同じメッセージ規則、フィールド、署名／AAD形式を使用します。

## 6. 読む順序とレビュー順序

最初にANP-02の共通識別／認証、続いてP1とP2を読みます。その後、DirectについてはP3/P5、GroupについてはP4/P6を読み、P7/P8/P9へ進んでください。最後に、必要に応じて別途規定された実装拡張を読みます。これらは本ANPカタログには含まれません。レビューでは英語と中国語のファイルを合わせて検証し、フィールド、依存関係、エラー名、例の不一致は、いずれも仕様の欠陥として扱うべきです。

複数デバイスの例は、[examples/message-vnext](../examples/message-vnext/README.md)にまとめてあります。

## 著作権表示

Copyright (c) 2024 ANP Open Source Community
本ファイルは[Apache License 2.0](../../LICENSE)で公開されています。自由に使用・変更できますが、この著作権表示を保持しなければなりません。
