<!-- translation-review: full; source=chinese/思考&问题/智能体网络与通信/E2E类似项目.md; basis=complete manual translation against the original in the preceding review -->
> 日本語訳。原文：[E2E类似项目.md](../../../../chinese/思考&问题/智能体网络与通信/E2E类似项目.md)。研究メモ中の記述・主張は執筆時点の原文に従います。

didcomm
仕様：https://identity.foundation/didcomm-messaging/spec/v2.1/

# 比較

私たちの didall は相手がオンラインであることを要求し、オフラインの場合は通信できません。

didcomm にその要件はなく、相手がオフラインでも暗号化メッセージを送れます。また、匿名暗号化に対応し、送信者と受信者の情報を保護できます。

# 既存のエンドツーエンド暗号化プロジェクト

広く使われているエンドツーエンド暗号化（End-to-End Encryption、E2EE）のプロトコルは多数あり、インスタントメッセージ、電子メール、ファイル共有、ビデオ会議などの場面を対象にしています。以下に一般的なプロトコルと方式を挙げます。

1. Signal Protocol

- 用途：インスタントメッセージ（Signal、WhatsApp、Facebook Messenger など）
- 主な特徴：
  - Double Ratchet アルゴリズム：Diffie-Hellman 鍵交換と Double Ratchet（鍵導出と会話状態の同期を含む）を組み合わせます。
  - 前方秘匿性と後方秘匿性：ある鍵が漏れても、他のメッセージの安全性に影響しません。
  - X3DH（Extended Triple Diffie-Hellman）と Double Ratchet により鍵交換とメッセージ暗号化を行います。
- 利点：現時点で特に安全性が高く、広く実装されている E2EE プロトコルの1つです。

2. Matrix / Olm と Megolm Protocol

- 用途：インスタントメッセージ（Element クライアント、Matrix ネットワークなど）
- 主な特徴：
  - Olm：1対1チャット向けで、Signal Protocol に似た Double Ratchet ベースです。
  - Megolm：グループチャット向けで、共通鍵暗号を採用し、大規模グループでの性能を最適化しています。
  - 前方秘匿性に対応しますが、グループチャットの性能最適化により、一部の後方秘匿性を妥協しています。
- 利点：大規模グループチャットに適し、分散サーバー構成に対応します。

3. Double Ratchet Algorithm

- 用途：Signal Protocol や Matrix Olm で使われる、広く利用されている暗号アルゴリズムです。
- 主な特徴：
  - 共通鍵暗号と公開鍵暗号を組み合わせ、前方秘匿性と後方秘匿性を提供します。
  - Ratchet によって暗号鍵を継続的に更新し、各メッセージに独立した暗号鍵を使います。

4. OMEMO（XMPP Extension Protocol XEP-0384）

- 用途：XMPP ベースのインスタントメッセージ（Conversations、Dino などの XMPP クライアント）
- 主な特徴：
  - Signal Protocol の Double Ratchet を使い、E2EE と複数端末間の同期に対応します。
  - 異なる端末で暗号化メッセージを同時に送受信できます。
- 利点：XMPP において E2EE を実現し、強固な安全性を提供します。

5. PGP / GPG（Pretty Good Privacy / GNU Privacy Guard）

- 用途：電子メール、ファイル暗号化
- 主な特徴：
  - 公開鍵暗号（RSA、DSA、ECC など）で鍵交換と署名を行います。
  - 共通鍵暗号（AES、3DES など）でメッセージ内容を暗号化します。
  - PGP は主として利用者による公開鍵の生成・交換に依存し、自動管理が困難です。
- 利点：安全性は高い一方、鍵管理が複雑で使い勝手がよくありません。

6. MLS（Messaging Layer Security）

- 用途：インスタントメッセージ、グループチャット
- 主な特徴：
  - 大規模グループチャットを特に念頭に、効率的な E2EE を提供するため IETF が開発した新しい標準です。
  - TreeKEM による鍵交換で、前方秘匿性と後方秘匿性を提供します。
- 利点：従来方式のグループ通信での性能問題を解決し、大規模分散システムに適します。

7. WireGuard（VPN 用）

- 用途：VPN、ネットワーク通信暗号化
- 主な特徴：
  - Noise Protocol Framework に基づく効率的で軽量な E2EE です。
  - Curve25519、ChaCha20、Poly1305 などの現代的な暗号アルゴリズムを使用します。
- 利点：高速で性能がよく、設定が簡単です。

8. Noise Protocol Framework

- 用途：WireGuard や WhatsApp の一部など、暗号通信プロトコルで広く使用されています。
- 主な特徴：
  - 柔軟な鍵交換パターンを提供し、複数の公開鍵・共通鍵アルゴリズムに対応します。
  - カスタマイズでき、さまざまな暗号通信の場面に適します。
- 利点：安全性が高く、独自の E2EE プロトコルの構築に適します。

9. DIDComm（Decentralized Identifier Communication Protocol）

- 用途：分散型アイデンティティ、プラットフォーム間通信
- 主な特徴：
  - 分散型識別子（DID）を基盤とし、ピアツーピアの E2EE メッセージングに対応します。
  - JSON または JWE 形式を使用し、複数の暗号アルゴリズムに対応します。
- 利点：分散型アイデンティティ標準と統合され、Web3 や分散型アプリケーションに適します。

10. ZRTP（Zimmermann Real-time Transport Protocol）

- 用途：音声・ビデオ通話の暗号化
- 主な特徴：
  - Diffie-Hellman 鍵交換で E2EE を実現し、事前共有鍵を必要としません。
  - SAS（Short Authentication String）で通話相手双方を認証します。
- 利点：PKI に依存せず、VoIP などのリアルタイム通信に適します。

まとめ：

- インスタントメッセージ：Signal Protocol、Matrix Olm/Megolm、OMEMO、MLS
- ファイル・電子メール暗号化：PGP/GPG
- VPN・ネットワーク通信：WireGuard、Noise Protocol Framework
- 分散型アイデンティティ：DIDComm
- 音声・ビデオ通話：ZRTP

それぞれ長所と短所があり、選択時には用途、セキュリティ要件、性能要件を考慮する必要があります。独自の E2EE 方式を設計する場合、これらの基本設計を参考にし、実際の要件に合わせて最適化できます。


## 著作権表示
Copyright (c) 2024 ANP Community  
本ファイルは [MIT ライセンス](../../../../LICENSE) の下で公開されています。自由に使用・変更できますが、この著作権表示を保持する必要があります。
