<!-- translation-review: full; source=examples/did-authentication-vnext/README.cn.md; basis=entire original read and manually compared paragraph by paragraph -->
> 日本語参考訳（原文全文を照合し、誤訳を修正済み）。規範となるのは原文です。コード例・識別子は原文を保持しています。
> 原文: [examples/did-authentication-vnext/README.cn.md](../../../examples/did-authentication-vnext/README.cn.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP 1.2：ANP-02と複数DIDメソッドのベクトル

状態：オフラインfixtureとプロトコルシナリオ設計です。SDKや製品の仕様適合を主張するものではありません。

[英語](README.md)

これらの成果物は、[ANP-02](../../chinese/02-ANP-基于DID的身份认证协议.md)、WBA/Webバインディング、およびメソッドに依存しない[Messaging 1.2仕様群](../../chinese/message/README.md)を支援します。識別子には予約済みの例示用ドメインを使います。鍵は決定的に導出した公開テスト資料であり、運用用の資格情報ではありません。識別子の登録もバックエンドへのリクエスト送信も行いません。

| 成果物 | 内容と証拠の範囲 |
|---|---|
| [identities.json](../../../examples/did-authentication-vnext/identities.json) | 10個の公開DID fixture。各メソッドに、通常API、デバイス対応のAgent 2体、サービス、グループの識別子があります。有効なE1文書には実際のproofバイトがあり、ネイティブWeb文書にはWBA Document proofがありません。HTTPS解決は制御された前提であり、テスト結果ではありません |
| [byte-vectors.json](../../../examples/did-authentication-vnext/byte-vectors.json) | 正確なリクエスト構成要素、payload/JCSバイト、署名基底、Ed25519署名、E1/Object Proofのハッシュと署名、P5 ChaCha20-Poly1305のAAD・暗号文。明示的な改ざん入力も含みます |
| [scenario-vectors.json](../../../examples/did-authentication-vnext/scenario-vectors.json) | 段階A/Bのsetup/action/expected-outcome入力。認証、WNS、メッセージング/E2EE、拡張、継続性、受け入れを扱います。すべてのシナリオはSDK・製品では未実行だと明記しています |
| [manifest.json](../../../examples/did-authentication-vnext/manifest.json) | ファイルハッシュ、生成・検査コマンド、件数。件数は成果物の数であり、SDKテストの成功数ではありません |
| [検証の責任](../../chinese/message/02-身份与发现.md#method-validation) | DIDメソッドの検証と、メッセージングProfileの識別・鍵用途・デバイス適格性に関する規則 |

## 1. 再現と検査

プロトコルworktreeのルートで、Node.js 22以上を使って実行します。

```sh
node scripts/generate-anp02-vectors.mjs
node scripts/check-anp02-vectors.mjs
```

1つ目は、決定的に再構築した結果を保存済みファイルと比較し、ファイルには書き込みません。2つ目はハッシュ、fixtureの参照、選択した基本アルゴリズムの既知解、署名・ダイジェスト・Object Proof・AEADのバイト列、改ざんの拒否、シナリオ一覧の網羅性を検査します。SDK・製品シナリオの実行件数はゼロと報告します。

ベクトルを意図的に変更し、レビューを完了した後には、このプロジェクトのfixtureを再生成できます。

```sh
node scripts/generate-anp02-vectors.mjs --write
```

固定時刻は`2026-09-07T08:00:00Z`です。テストは実時刻ではなくシナリオの時刻を使います。鍵導出ラベルは`ANP02-PUBLIC-TEST-ONLY:`で始まり、生成した鍵をテスト以外に使ってはなりません。P5のメッセージ鍵・nonceは、確立済みSessionの制御された入力です。ベクトルはAAD/AEADのバイトを検査し、X3DH、Ratchetの進行、デバイスの受け入れは検証しません。P6バインディングのproofは実際の署名ですが、完全に符号化されたMLS KeyPackageでも、実行済みのMLSグループでもありません。

## 2. 認証と伝送の境界

`HTTP-*`は実際のHTTPメソッド・対象・コンテンツの構成要素を使います。`JSON-*`は宣言済みのHTTP JSONメタデータバインディングを使い、ダイジェストは`auth`を除いたJCS payloadを対象にします。`ORIGIN-*`は変更されていないP1 Signed Request Objectと`anp://`の対象マッピングを使います。これらの署名は相互に代用できません。

バイト単位の負例では、準備済みの署名入力または署名を変更し、暗号学的な完全性検証が失敗することを確認します。プロトコルシナリオは別途、フィールドの解析、メソッドの証拠、鍵用途の認可、時間・リプレイ状態、ビジネス上の権限を検査します。バイト検査だけでは、これらの状態を伴う条件を確立できません。ネイティブWebにDocument proofがなくても、必要なBundle、制御用origin proof、MLS、メッセージ認証は完了する必要があります。

## 3. シナリオアダプターの契約

このfixture群は、その機能を備えた実装での相互運用を示すため、意図的にEd25519、Multikey、JWKを選びます。ANP-02全体の最低限のアルゴリズムや表現形式の要件を追加するものではありません。実装が対応を宣言した機能に応じて、適用するシナリオを選んでください。JWTのissuer/audience/scopeシナリオは、例示用Token方針とエラーマッピングを明示的に選んでいます。その方針を採る実装にだけ適用され、すべてのANP-02実装に同じフィールドや方針を要求しません。WBA E1と、選択したE2EE Profileの既存の暗号要件は引き続き有効です。

認証関連のシナリオは`applicability: illustrative-implementation-policy-not-additional-anp02-conformance`と表示されています。リプレイの境界、キャッシュ、Resolver、資格情報の選択、エラーマッピング、ダイジェスト、Token方針は例示上の選択であり、ANP-02の規範要件を追加したり、既存実装に動作変更を要求したりするものではありません。原文が具体的な条件を定めていない場合は、ANP-02 1.2と実装の既存方針に従って解釈し、シナリオの期待結果から逆算してプロトコルを定めないでください。本文をそのまま抽出した部分には、元のJWTの日付文字列の例も残っています。このディレクトリのNumericDate fixtureは、選択したJWT例に属し、ベクトルによって既存Tokenの変更を強制しません。

各シナリオは次を含みます。

- `input`：参照する識別子・バイトのfixtureと、制御された初期状態。
- `actions`：実行する正確な変更、または該当Profileの処理。
- `expected`：適用範囲と選択した方針の下での、拒否・受け入れ・保証水準・状態への副作用の境界。
- `normative_refs`：これらの要件を定める仕様。
- `execution_status`：この段階のPカタログでは常に`design-only-not-run-against-sdk-or-product`。

アダプターは、負例の変更を加える前に、有効な基準状態を作る必要があります。後段の検証層をテストするためにWBA文書を変更した場合は、テスト用のルート鍵でE1 proofを再生成し、検証対象の層を切り分けます。E1の無効な証拠そのものをテストするときは、修復してはなりません。MLSシナリオでは、指定された正確なバインディングから有効なスイートのKeyPackage/Leafとグループ状態を構築した後、指定の変更を加えます。オフラインのバインディングのバイトだけでは、この状態は得られません。

WNSシナリオは、元の方式をそれぞれ維持します。WBAでは同一ドメイン制限、正確なHandleの公開、非公開Provider確認を維持します。Webでは正引きDIDとHTTPS Providerのドメイン宣言を検査し、逆引きエンドポイントの参照解決や、弱い結び付きの移行を強制しません。例の`legacy-domain-binding-accepted`はテストの期待ラベルにすぎず、新たな通信結果ではなく、正確なHandleの検証済み状態を意味しません。通常APIのfixtureは意図的にHandle、service、デバイスManifestを省略します。完全なメッセージングシナリオはWBA→WBA、WBA→Web、Web→WBA、Web→Webのダイレクト／グループ通信、P5/P6、通常・暗号化のダイレクト／グループ添付、通常・暗号化のMentionを扱い、サービス識別子とcaller anchorのメソッドも独立に変更します。

SDK・製品のrunnerは、自らの証拠に実際の結果を記録し、このディレクトリの設計状態を実行成功へ書き換えるべきではありません。メソッドの解決、TLS・キャッシュ、並行処理、永続化、失効、MLS、オブジェクト保存、利用者から見える挙動は、引き続き段階A/Bで実行します。未有効化メソッドの負例では意図的にWebVHを拒否しますが、WebVH実装が既にあることを意味しません。

> 既存パスとの互換性のため、ディレクトリ名には`-vnext`を残しています。参照先は1.2文書に更新済みです。P6は依然として候補で、安定版はMLS ExtensionType登録を必要とする公開条件を満たす必要があります。

## 著作権表示

Copyright (c) 2024 ANP 開源社区
このファイルは[Apache License 2.0](../../../LICENSE)の下で公開されています。自由に利用・変更できますが、この著作権表示を保持しなければなりません。
