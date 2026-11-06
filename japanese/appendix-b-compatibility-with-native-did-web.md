# 付録B: ネイティブdid:webの統合

- 状態: Released（公開済み）
- バージョン: 1.2
- 中国語版: [ネイティブdid:webとの互換性](chinese/附录B：与原生did-web-的兼容.md)

## B.1 適用範囲と仕様上の責任分担

本付録は、DIDメソッドに依存しないANPの契約に、ネイティブWeb識別を統合するための入口です。別の認証プロトコルやメッセージングプロトコルを定義するものではありません。主体は`did:web`識別を維持し、WBAへの変換は不要です。

| 契約 | 規範を定める仕様 |
|---|---|
| Web識別の入力と要求認証 | [ANP-02 Webバインディング](02-anp-did-authentication-protocol-specification.md#web-binding)および共通認証 |
| WBA固有のDocument検証 | [ANP-03メソッド規則](03-did-wba-method-design-specification.md) |
| Handleの順方向／逆方向バインディングと状態 | [ANP-04 WNS](04-anp-did-wba-name-space-specification.md#binding-verification) |
| メッセージの識別、デバイス、サービス | [Messaging P2](message/02-identity-and-discovery.md) |
| Origin ProofとObject Proofのバインディング | [Messaging P1](message/01-core-binding.md) |
| Direct/Group E2EEと拡張 | 選択したP5/P6/P7/P9 Profileおよびその依存先 |

## B.2 メソッドの検証

検証者は、Web識別情報を利用する前にANP-02のWebバインディングを適用しなければ**なりません（MUST）**。WBAのE1/K1フィンガープリントや、WBA固有のDocument Proof要件は、ネイティブWebには適用しません。このメソッド間の違いによって、選択したANP Profileが課す、用途に応じた権限付与、オブジェクト署名、デバイス適格性、メッセージ認証の要件が免除されることはありません。

## B.3 認証の統合

WebとWBAの呼び出し元は、ANP-02の同じHTTPコンポーネント、ダイジェスト、署名、チャレンジ、リプレイ、および任意のトークンの規則を使用します。通常のAPIにHandleや`deviceManifest`は必要ありません。Messaging P1はアプリケーションの発信元コンテキストを追加し、P8は実際のHTTPサービス間ホップの認証を使用します。ホップ署名の検証に成功しても、ビジネス上の送信者のOrigin Proofが確立するわけではありません。

<a id="legacy-web-handle"></a>
## B.4 Handle / WNSの統合（既存モデル）

元の付録B.4の本文を以下に保持します。このモデルは、HandleからDIDへの順方向マッピングと、DIDによるProviderドメインの宣言を確認します。厳密なエンドポイントを参照することは要求せず、WBA本流の`exact-handle`や、非公開エンドポイントの`provider-confirmed`という結果を自動的に生成するものでもありません。本改訂は、Webの弱いバインディングの移行、ドメインをまたぐWBA Handle、Provider管理に関する要件を追加しません。

ネイティブ`did:web`は、did:wbaのHandle / WNSシステムと互換性があります。

`did:web`のDID Documentが`service`に`ANPHandleService`を宣言している場合、検証者は、以前のWNSの振る舞いから導かれた、ドメインベースの従来互換モデルを使って双方向のバインディング検証を実行しても**かまいません（MAY）**。この互換モデルは、[ANP DID:WBA名前空間仕様](04-anp-did-wba-name-space-specification.md)に定義された本流のWNS exact-handle / provider-confirmedモデルより、意図的に弱くしてあります。

1. Handle Resolution EndpointでHandleを解決し、DIDを取得します。
2. DIDを解決します。
3. DID Document内の`ANPHandleService`を見つけます。
4. `ANPHandleService.serviceEndpoint`のスキームとドメインを抽出します。
5. `serviceEndpoint`が`https`を使い、そのドメインが入力Handleのドメインと一致することを検証します。

互換モードでは、`ANPHandleService.serviceEndpoint`の役割は引き続きドメインを中心とします。厳密なHandle Resolution Endpointの宣言を要求するのではなく、主にDID主体が使用するHandle Providerドメインを宣言します。

したがって、ネイティブ`did:web`の逆方向バインディング検査では、次のとおり扱います。

- `ANPHandleService.serviceEndpoint`のドメインと、入力Handleのドメインだけを比較します。
- `serviceEndpoint`のパスが、特定のResolution Endpointと完全一致する必要はありません。
- `serviceEndpoint`が`https://{domain}/.well-known/handle/{local-part}`と完全一致するという要件はありません。
- Handleに対応するResolution Endpointを使っても、同じドメイン配下の別の安定したHTTPS URLを使ってもかまいません。

ネイティブ`did:web`の双方向バインディング検証は、次の2点だけに依存します。

- HandleからDIDへの解決結果
- DID Document内の`ANPHandleService`によるName Serviceドメインの宣言

did:wbaの`e1_` / `k1_`フィンガープリントのバインディング検査を行う必要はありません。

## B.5 E2EEの統合

Webデバイスは、メソッドに従って検証したDocumentと現在のP2 Manifestを使用し、その後、WBAデバイスと同じP5/P6検証規則を適用します。`keyAgreement`の項目だけでは、複数デバイスE2EEへの対応は確立しません。選択したスイート、完全なProfile依存関係、厳密なデバイス／鍵参照、現在の適格性がそろっていなければ**なりません（MUST）**。

P5 Bundle Object Proof、X3DH相当の入力、Session/AAD/AEAD認証、およびリプレイ検査は、P5の規定どおり引き続き必要です。P5のMTI暗号文に、追加の発信元署名要件が生じるわけではありません。P6の`did_wba_binding`は、メソッドに依存しないDID／デバイスとMLSのバインディングを表す既存の通信フィールド名のままです。そのObject Proof、埋め込み拡張、KeyPackage/Leaf署名、資格情報の識別、スイート、グループ状態の検査は、すべて引き続き必要です。WBA固有のDocument Proofがないことを理由に、これらのオブジェクト検査やMLS検査を省略してはなりません。

## B.6 サービス、添付、メンション

サービスの選択は、P2に従って検証済みの`ANPMessageService`、広告されたProfile、およびセキュリティ機能に基づきます。フェデレーションがサービスを認証する場合は、そのサービスDIDのメソッドに従い、宣言された`serviceDid`をAgent DIDとは独立して解決・検証します。他者のエンドポイントを指定するだけで、主体がホスティング権限やローカルアカウント権限を取得することはできません。

P7の通常添付・暗号化添付と、P9のMentionペイロードには、WBAとWebで同じ組み合わせ規則を使用します。ペイロード全体に対する署名／AEADの適用範囲、オブジェクトの認可、未知の拡張の扱い、ダウングレード禁止の規則は、引き続き選択したProfileが規定します。Web専用の添付・メンション通信形式は導入しません。

## B.7 継続性と証拠

現在のHandle解決と現在のDID認証では、DIDをまたぐ権限移行は確立しません。本仕様において、P2はWebの自動遷移検証Profileを登録しません。同一DID内の鍵更新と、別のDIDへの変更は、明確に区別し続けなければ**なりません（MUST）**。グループの役割、添付の認可、E2EE状態には、それぞれ有効な継続性・移行の契約が必要です。

[複数メソッドのベクトル](examples/did-authentication-vnext/README.md)は、契約の境界を対象とし、SDK／製品での実行に向けた設計入力にとどまるケースを明示します。仕様の公表は、実装の適合性や本番展開を意味しません。

## 著作権表示

Copyright (c) 2024 ANP Open Source Community
本ファイルは[Apache License 2.0](../LICENSE)で公開されています。自由に使用・変更できますが、この著作権表示を保持しなければなりません。
