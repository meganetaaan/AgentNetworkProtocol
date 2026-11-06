<!-- translation-review: full; source=chinese/附录B：与原生did-web-的兼容.md; basis=entire original read and manually compared paragraph by paragraph -->
> 日本語参考訳（機械翻訳を基に原文全文を照合済み）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [chinese/附录B：与原生did-web-的兼容.md](../../chinese/附录B：与原生did-web-的兼容.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# 付録 B：ネイティブな did:web の統合

- 状態：公開済み
- バージョン：1.2
- 英語版：[Native did:web Integration](../appendix-b-compatibility-with-native-did-web.md)

## B.1 範囲と責任分担

本付録は、ネイティブな Web アイデンティティを、DID メソッドから独立した ANP の契約に接続するための入り口です。別の認証やメッセージプロトコルを定義しません。主体は `did:web` を保持し、WBA へ変換する必要はありません。

| 契約 | 規範上の定義元 |
|---|---|
| Web アイデンティティ入力と要求認証 | [ANP-02 の Web バインディング](../../chinese/02-ANP-基于DID的身份认证协议.md#web-binding) と共通認証 |
| WBA 固有の Document 検証 | [ANP-03 のメソッド規則](03-did-wba方法规范.md) |
| Handle の正引き・逆引きの結合と状態 | [ANP-04 WNS](../../chinese/04-ANP-基于DID-WBA的命名空间规范.md#binding-verification) |
| メッセージのアイデンティティ、デバイス、サービス | [メッセージング P2](message/02-身份与发现.md) |
| 発信者証明とオブジェクト証明のバインディング | [メッセージング P1](message/01-核心绑定.md) |
| 私信／グループの E2EE と拡張 | 選択した P5/P6/P7/P9 Profile とその依存先 |

## B.2 メソッドの検証

Web のアイデンティティ資料を利用する前に、検証者は ANP-02 の Web バインディングを実行しなければなりません（MUST）。WBA の E1/K1 指紋と WBA 固有の Document proof 要件は、ネイティブな Web には適用しません。ただし、このメソッド上の相違によって、選択した ANP Profile が要求する用途の認可、オブジェクト署名、デバイス適格性、メッセージ認証のいずれも免除されません。

## B.3 認証の統合

Web と WBA の呼び出し側は、同じ ANP-02 の HTTP コンポーネント、ダイジェスト、署名、チャレンジ、リプレイ、任意の Token の規則を使います。通常の API は Handle や `deviceManifest` を要求しません。メッセージング P1 はアプリケーションの発信者の文脈を加え、P8 は実際の HTTP サービス間ホップの認証を使います。サービス間ホップの署名成功だけでは、業務上の送信者の origin proof は成立しません。

<a id="legacy-web-handle"></a>
## B.4 Handle / WNS の統合（従来方式を維持）

以下は、従来の互換付録 B.4 の本文を維持したものです。Handle の正引き DID マッピングと、DID による Provider ドメインの宣言を確認する方式であり、正確なエンドポイントの逆参照を要求しません。また、WBA の主経路の `exact-handle` や、非公開エンドポイントの `provider-confirmed` という結果を自動的に得るものではありません。本改訂は、Web の弱い結合の移行、WBA のドメインをまたぐ Handle、Provider の管理要件を追加しません。

ネイティブな `did:web` は、did:wba の Handle / WNS の仕組みと互換にできます。

`did:web` DID Document の `service` に `ANPHandleService` が宣言されている場合、検証者は [ANP DID-WBA 名前空間仕様](04-ANP-基于DID-WBA的命名空间规范.md) の v1 規則に従い、双方向の結合検証を実行してもかまいません（MAY）。

1. Handle Resolution Endpoint で Handle を解決し、DID を得ます。
2. その DID を解決します。
3. DID Document 内の `ANPHandleService` を見つけます。
4. `ANPHandleService.serviceEndpoint` の scheme と domain を取り出します。
5. `serviceEndpoint` が `https` を使い、domain が入力 Handle の domain と一致することを検証します。

互換モードでの `ANPHandleService.serviceEndpoint` は、WNS v1 と同じ役割を保ちます。主に、その DID 主体が使う Handle Provider domain を宣言するものであり、正確な Handle Resolution Endpoint の宣言を要求するものではありません。

したがって、ネイティブな `did:web` の逆方向の結合検証では：

- `ANPHandleService.serviceEndpoint` の domain と、入力 Handle の domain だけを比較します。
- `serviceEndpoint` の path が、ある特定の Resolution Endpoint と完全に一致する必要はありません。
- `serviceEndpoint` が `https://{domain}/.well-known/handle/{local-part}` と厳密に等しい必要はありません。
- その Handle の Resolution Endpoint を使っても、同じ domain にある他の安定した HTTPS URL を使ってもかまいません。

ネイティブな `did:web` の双方向の結合検証が依存するのは、次の2点だけです。

- Handle → DID の解決結果。
- DID Document の `ANPHandleService` による Name Service domain の宣言。

did:wba の `e1_` / `k1_` 指紋による結合検査は**不要**です。

## B.5 E2EE の統合

Web デバイスは、メソッドに従って検証された Document と現在の P2 Manifest を使い、その後 WBA デバイスと同じ P5/P6 の検証を行います。`keyAgreement` の項目だけでは、複数デバイスの E2EE に対応するとはいえません。選択した暗号スイート、Profile の依存先の完全なセット、正確なデバイス／鍵の参照、現在の適格性を、すべて備えなければなりません（MUST）。

P5 の Bundle Object Proof、X3DH-like の入力、Session/AAD/AEAD の認証、リプレイ検査は、引き続き P5 に従います。P5 MTI の暗号文に、追加の origin signature は要求しません。P6 の `did_wba_binding` は、メソッドに依存しない DID／デバイスと MLS の結合を示す、既存の wire フィールド名として維持します。その Object Proof、埋め込み拡張、KeyPackage/Leaf の署名、credential のアイデンティティ、スイート、グループ状態の検査は、それぞれ引き続き必要です。WBA 固有の Document proof がないことは、これらのオブジェクト検証や MLS 検査を省略する理由にはなりません。

## B.6 サービス、添付、Mention

サービス選択は、P2 の検証済み `ANPMessageService`、宣言した Profile、安全性の能力に従います。フェデレーションでサービスの認証が必要な場合は、Agent DID とは独立に、サービス DID のメソッドによって、宣言された `serviceDid` を解決・検証します。他者のエンドポイントを書くだけでは、その主体のホスト権限や、ローカルドメインのアカウント権限は得られません。

P7 の通常／暗号化添付と P9 Mention payload は、WBA と Web で同じ組み合わせ規則を使います。payload 全体の署名／AEAD の対象範囲、オブジェクト認可、未知の拡張の処理、ダウングレード禁止は、引き続き選択した Profile が定めます。Web 専用の添付や Mention の wire 形式を加えません。

## B.7 連続性と証拠

現在の Handle 解決や DID 認証だけでは、異なる DID 間での権限移行は成立しません。この仕様の P2 には、Web の自動移行検証 Profile は登録されていません。同じ DID の鍵更新と、異なる DID への変更は、別々に扱わなければなりません（MUST）。グループの役割、添付の認可、E2EE の状態には、それぞれ有効な連続性と移行の契約が必要です。

[メソッド混在のベクトル](../examples/did-authentication-vnext/README.cn.md)は契約の境界を対象とし、どのケースがまだ SDK／製品での実行のための設計入力なのかも示します。仕様の公開は、実装の適合や本番運用を意味しません。

## 著作権表示

Copyright (c) 2024 ANP 开源社区
本ファイルは [Apache License 2.0](../../LICENSE) の下で公開されています。自由に使用・変更できますが、この著作権表示を保持する必要があります。
