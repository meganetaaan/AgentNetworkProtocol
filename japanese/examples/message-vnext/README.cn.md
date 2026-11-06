<!-- translation-review: full; source=examples/message-vnext/README.cn.md; basis=entire original read and manually compared paragraph by paragraph -->
> 日本語参考訳（原文全文を照合し、誤訳を修正済み）。規範となるのは原文です。コード例・識別子は原文を保持しています。
> 原文: [examples/message-vnext/README.cn.md](../../../examples/message-vnext/README.cn.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP Messaging 1.2：複数デバイスの例

状態：説明用の例です。暗号の適合性を確認するテストベクトルではありません。

[英語](README.md) | [中国語](README.cn.md)

これらのファイルは、[バージョンが混在するANP Messaging 1.2仕様群](../../chinese/message/README.md)に対応しています。JSONはスキーマと処理フローのレビューに使えます。ただし、公開鍵、ダイジェスト、署名、暗号文、proof値はすべて明示的なプレースホルダーであり、暗号テストベクトルとして使っては**なりません（MUST NOT）**。

| ファイル | 用途 |
| --- | --- |
| [`01-did-document-two-devices.json`](../../../examples/message-vnext/01-did-document-two-devices.json) | 1つのAgent DIDに属し、独立した鍵を使う2つの適格なデバイスエンドポイント |
| [`02-direct-two-device-deliveries.json`](../../../examples/message-vnext/02-direct-two-device-deliveries.json) | 同じ論理Direct E2EEメッセージを、独立した暗号化と冪等性を持つ2つのP5デバイス配送で表す例 |
| [`03-device-prekey-bundle.json`](../../../examples/message-vnext/03-device-prekey-bundle.json) | 1つの所有者DID・デバイスと、そのManifestの鍵参照に結び付けたPreKey Bundle |
| [`04-mls-two-device-leaves.json`](../../../examples/message-vnext/04-mls-two-device-leaves.json) | 同じDID単位のビジネスメンバーに属し、それぞれデバイスに結び付いた2つのMLSリーフ |
| [`05-device-revocation.json`](../../../examples/message-vnext/05-device-revocation.json) | 1つのデバイスとその鍵参照を削除する前後の公開DID Documentの抜粋 |
| [`06-device-state-changed-error.json`](../../../examples/message-vnext/06-device-state-changed-error.json) | 現在のDIDの再解決を要求する、再試行可能なP5/P6デバイス状態エラー。内部checkpointは漏らしません。Baseメッセージングでは使いません |
| [`07-did-transition-retry.json`](../../../examples/message-vnext/07-did-transition-retry.json) | 最小限のP3 superseded-DIDフロー。`current_did`をヒントとしてのみ扱い、直接の後継を検証し、論理message/operation IDを保持してダイジェストと署名を再構築します |

英中のProfile仕様が引き続き正規の参照元です。将来の適合性ベクトル作成時には、暗号に関するすべてのプレースホルダーを、再現可能な入力と期待バイト列に置き換える必要があります。

DID遷移の例も、意図的に暗号テストベクトルにはしていません。特に、`alsoKnownAs`と1019の`current_did`だけでは継続性を確立できません。例にある`verified`という結果は、2つのE1文書と、旧主体のbinding-keyによるproofを独立に検証することに依存します。

> 既存のパスとの互換性を保つため、ディレクトリ名には`-vnext`を残しています。参照先は1.2文書に更新済みです。P6は依然として候補であり、安定版はMLS ExtensionType登録を必要とする公開条件を満たす必要があります。

## 著作権表示

Copyright (c) 2024 ANP 開源社区
このファイルは[Apache License 2.0](../../../LICENSE)の下で公開されています。自由に利用・変更できますが、この著作権表示を保持しなければなりません。
