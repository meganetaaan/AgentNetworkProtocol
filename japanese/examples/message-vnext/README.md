<!-- translation-method: manual -->
> 日本語参考訳（手動翻訳）。規範となるのは原文です。コード例・識別子は原文を保持しています。
> 原文: [examples/message-vnext/README.md](../../../examples/message-vnext/README.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

<a id="anp-messaging-12-multi-device-examples"></a>
# ANP Messaging 1.2の複数デバイスの例

ステータス: 説明用の例。暗号学的適合性ベクトルではありません。

[英語原文](../../../examples/message-vnext/README.md) | [中国語原文](../../../examples/message-vnext/README.cn.md)

これらのファイルは、複数の通信バージョンを含む[ANP Messaging 1.2仕様](../../message/README.md)に付随します。スキーマと処理の流れを確認するための、有効なJSONの例です。公開鍵、ダイジェスト、署名、暗号文、証明値は明示的なプレースホルダーであり、暗号学的なテストベクトルとして使用してはなりません（**MUST NOT**）。

| ファイル | 目的 |
| --- | --- |
| [`01-did-document-two-devices.json`](../../../examples/message-vnext/01-did-document-two-devices.json) | 独立した鍵を持つ適格なデバイスエンドポイント二つを備えた、一つのAgent DID |
| [`02-direct-two-device-deliveries.json`](../../../examples/message-vnext/02-direct-two-device-deliveries.json) | 一つの論理的なDirect E2EEメッセージを、それぞれ独立して暗号化され、冪等性を持つ二つのP5デバイス配信で表現 |
| [`03-device-prekey-bundle.json`](../../../examples/message-vnext/03-device-prekey-bundle.json) | 一つの所有者DID／デバイスと、そのManifest鍵参照にバインドされたPreKey Bundle |
| [`04-mls-two-device-leaves.json`](../../../examples/message-vnext/04-mls-two-device-leaves.json) | DID単位の一つの業務メンバーに対する、デバイスにバインドされた二つのMLSリーフ |
| [`05-device-revocation.json`](../../../examples/message-vnext/05-device-revocation.json) | 一つのデバイスとその鍵参照を削除する前後の、公開DID Documentの断片 |
| [`06-device-state-changed-error.json`](../../../examples/message-vnext/06-device-state-changed-error.json) | 非公開のチェックポイントを使わず、現在のDIDの解決を必要とする、再試行可能なP5/P6デバイス状態エラー。基本メッセージングでは使用しない |
| [`07-did-transition-retry.json`](../../../examples/message-vnext/07-did-transition-retry.json) | 置き換えられたDIDに対する最小限のP3フロー。`current_did`をヒントとして扱い、直接の後継を検証した後、論理メッセージ／操作IDを保持しながらダイジェストと署名を再構築 |

英語と中国語のProfile文書が引き続き正規の仕様です。将来、適合性ベクトルを作成する際は、プレースホルダーの暗号学的値を、再現可能な入力と期待バイト列に置き換える必要があります。

移行の例は、意図的に暗号学的ベクトルにはしていません。特に、`alsoKnownAs`とエラー1019の`current_did`は継続性を確立しません。表示された`verified`という結果は、両方のE1文書と、前任DIDの旧バインディング鍵による証明を、それぞれ独立して検証することを前提とします。

> `-vnext`というディレクトリ名は、パスの互換性のために維持されています。参照は1.2文書を指しています。P6は、登録済みMLS ExtensionTypeというリリース条件を満たすまで、候補のままです。

<a id="copyright-notice"></a>
## 著作権表示

Copyright (c) 2024 ANP Open Source Community
このファイルは[Apache License 2.0](../../../LICENSE)に基づいて公開されています。自由に利用・改変できますが、この著作権表示を保持しなければなりません。
