# ANP vNextプロトコル集

- 状態: 次期バージョンのドラフト。ANP 1.2には含まれません。
- 現行仕様: [ANP 1.2](../README.md)と[中国語一覧](../README.cn.md)

このディレクトリには、現在の公開版から実質的な変更があるプロトコルのドラフトと白書の改訂版を置きます。既存の仕様や白書を改訂する必要がある場合に、vNextのコピーを追加してください。現在のANP 1.2文書は公開版のパスに残し、それ以前の公開前スナップショットはGit履歴から参照できます。

| ドラフト | 状態 | 範囲 |
| --- | --- | --- |
| [ANP-01: 技術白書](01-agentnetworkprotocol-technical-white-paper.md) / [中国語](chinese/01-AgentNetworkProtocol技术白皮书.md) | 参考情報としての作業ドラフト／未公開。v1.2に基づく | ビジョン、アーキテクチャ、識別、メッセージング、発見、記述、アプリケーションプロトコルに関する議論の改訂。 |
| [P4: グループメッセージングの基本セマンティクス](p4-group-messaging-base-semantics.md) / [中国語](chinese/P4-群组基础语义.md) | ドラフト／未公開。ANP Messaging 1.2に基づく | P4/P6のメソッドとセキュリティモードのバインディングを明確にし、DIDのメンバーシップとMLSデバイスの準備状態を区別する。 |

## リポジトリルートの認可ドラフト

[ANP-05: DIDベースの認可](../05-anp-did-authorization-protocol-specification.md)と[中国語版](../chinese/05-ANP-基于DID的授权协议.md)は、現在、主要文書のパスに配置されています。バージョンはv0.7のままで、状態もDraft / not released（ドラフト／未公開）のままです。ANP 1.2には含まれません。このドラフトは、OAuth向けの、DIDと関連付けられたCIMD URLクライアントID、および委任・組織内の役割に関する資格情報のための独立したVC直接提示を定義します。

ANP-05は、現在のANP 1.2の識別情報バインディングを参照します。公開または一般利用の有効化には、レビューと、クライアント／AS／RSの相互運用性に関する証拠が必要です。

実装検証シナリオと識別子の保守: [英語ガイド](../docs/anp-05-validation-guide.md) / [中国語](../docs/chinese/anp-05-validation-guide.md)。

## 著作権表示

Copyright (c) 2024 ANP Open Source Community
本ファイルは[Apache License 2.0](../../LICENSE)で公開されています。自由に使用・変更できますが、この著作権表示を保持しなければなりません。
