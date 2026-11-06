> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [examples/message-vnext/README.cn.md](../../../examples/message-vnext/README.cn.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP のメッセージング 1.2 の複数の装置例

ステータス: パスワード一貫性のあるベクトルではなく、説明例。

[英語](README.md) | [中国語](README.cn.md)

添付書類を添付します。[ANPメッセージング1.2の混合バージョン](../../chinese/message/README.md). JSONはスキーマやプロセス評価に使用できます。公開鍵、消化器、署名、秘密のテキスト、および証拠値が(またはできる)ことができない明確なプレースホルダである場合**MUST NOT**)パスワードテストベクターとして使用されます。

| ドキュメント | 目的: |
| --- | --- |
| [`01-did-document-two-devices.json`](../../../examples/message-vnext/01-did-document-two-devices.json) | Agent DID の 2 つの別々のキーデバイスで有効なエンドポイント |
| [`02-direct-two-device-deliveries.json`](../../../examples/message-vnext/02-direct-two-device-deliveries.json) | 直接E2EEメッセージ2独立した暗号化、スタンドアローンおよび他のP5装置配達 |
| [`03-device-prekey-bundle.json`](../../../examples/message-vnext/03-device-prekey-bundle.json) | オーナーのDID/デバイスとManifestキーで引用されたPreKeyバンドルを結びます |
| [`04-mls-two-device-leaves.json`](../../../examples/message-vnext/04-mls-two-device-leaves.json) | MLS リーフは、同じ DID レベルの運用メンバーの 2 つのデバイスにバインド |
| [`05-device-revocation.json`](../../../examples/message-vnext/05-device-revocation.json) | デバイスとキーの参照のパブリックIDドキュメントクリップを前後に削除します。 |
| [`06-device-state-changed-error.json`](../../../examples/message-vnext/06-device-state-changed-error.json) | 内部チェックポイントの再試行可能なP5/P6デバイスのステータスエラーを漏れずに現在のDIDを再確認するように要求します。 ベースメッセージはこのエラーを使用しません |
| [`07-did-transition-retry.json`](../../../examples/message-vnext/07-did-transition-retry.json) | 最小P3対応DDDプロセス:Pull `current_did` 直接フォローアップを検証するためにヒントとしてのみ使用し、論理メッセージ/操作IDを保持し、消化と署名を再作成します |

中国語/英語プロファイルの規範は、権威あるソースのままです。将来の一貫性のあるベクトルタスクは、すべてのパスワードベースのビット値に、レプリカ可能なバイトと期待されるバイトを置き換えなければなりません。

トランスレーションの例は、特にパスワードのベクトルではありません。 `alsoKnownAs` と 1019 `current_did` どれも、その例では継続性を生むことができます。 `verified` 結果は、前任者からの2つのE1文書と古い結合キーの証拠の独立した検証に依存しています。

> ディレクトリ予約 `-vnext` 名前は既存のパスに一致させるために使われます。参照は1.2文書で指示されています。P6はリストに残り、安定したバージョンはMLSエクステンションタイプ登録開始しきい値を完了するためにまだ待っています。

## 公益社団法人 一般社団法人 日本版著作権協会

2024年 ANP オープンソースコミュニティ
この文書は以下に基づいています [Apache ライセンス 2.0](../../../LICENSE) 投稿されたものは自由に使用および変更できますが、この著作権に関する声明は保持する必要があります。
