<!-- translation-review: full; source=vnext/chinese/README.md; basis=entire original read and manually compared paragraph by paragraph -->
> 日本語参考訳（原文全文を照合し、誤訳を修正済み）。規範となるのは原文です。
> 原文: [vnext/chinese/README.md](../../../vnext/chinese/README.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP vNext：中国語のプロトコル群

- 共通の入口：[vNextプロトコル群](../README.md)
- 状態：次版のドラフト。ANP 1.2には含まれません
- 現行文書：[ANP 1.2仕様群](../../README.cn.md)

このディレクトリには、現在の公開版から内容が実質的に変わったプロトコルのドラフトと、白書の改訂版を置きます。現行ANP 1.2文書は引き続き正式なパスにあります。それより前の公開前スナップショットはGit履歴で確認できます。

| ドラフト | 状態 | 定義する内容 |
| --- | --- | --- |
| [ANP-01：技術白書](01-AgentNetworkProtocol技术白皮书.md) / [英語](../01-agentnetworkprotocol-technical-white-paper.md) | 参考情報としての改訂ドラフト／未公開。v1.2に基づきます | 考え方、アーキテクチャ、識別、メッセージング、発見、記述、アプリケーションプロトコルの説明を改訂します |
| [P4：グループメッセージングの基本セマンティクス](P4-群组基础语义.md) / [英語](../p4-group-messaging-base-semantics.md) | ドラフト／未公開。ANP Messaging 1.2に基づきます | P4/P6のメソッドとセキュリティモードの対応を明確にし、DID単位のビジネスメンバーシップとMLSデバイスの準備状態を区別します |

## 主文書パスにある認可ドラフト

[ANP-05：DIDに基づく認可プロトコル](../../chinese/05-ANP-基于DID的授权协议.md)と[英語版](../../05-anp-did-authorization-protocol-specification.md)は、主文書のパスに移動済みです。依然としてv0.7のドラフトで、未公開であり、ANP 1.2には含まれません。このドラフトは、OAuthで使うDID関連付け済みCIMD URLクライアントIDと、独立したVCによる委任・組織内の役割資格情報の直接提示を定義します。

ANP-05は、現在のANP 1.2の識別資料のバインディングを参照します。正式公開や公開環境での有効化の前に、レビューとクライアント・AS・RS間の相互運用検証を完了しなければなりません。

実装検証のシナリオと識別子の保守方法：[中国語ガイド](../../docs/chinese/anp-05-validation-guide.md) / [英語](../../docs/anp-05-validation-guide.md)。

## 著作権表示

Copyright (c) 2024 ANP 开源社区
このファイルは[Apache License 2.0](../../../LICENSE)の下で公開されています。自由に利用・変更できますが、この著作権表示を保持しなければなりません。
