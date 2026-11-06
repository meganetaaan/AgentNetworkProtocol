<!-- translation-method: manual -->
> 日本語参考訳（手動翻訳）。規範となるのは原文です。コード例・識別子は原文を保持しています。
> 原文: [examples/did-authentication-vnext/README.md](../../../examples/did-authentication-vnext/README.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

<a id="anp-12-anp-02-and-mixed-method-vectors"></a>
# ANP 1.2: ANP-02と複数メソッドのベクトル

ステータス: オフラインのフィクスチャとプロトコルシナリオの設計。SDKや製品の適合性を主張するものではありません。

[中国語原文](../../../examples/did-authentication-vnext/README.cn.md)

これらの成果物は、[ANP-02](../../02-anp-did-authentication-protocol-specification.md)、そのWBA／Webバインディング、メソッドに依存しない[Messaging 1.2仕様群](../../message/README.md)を支援します。すべてのアイデンティティは、予約済みの例示用ドメインを使います。鍵は決定的に導出した公開テスト用素材であり、運用上の認証情報ではありません。アイデンティティの登録も、バックエンドへのリクエストの送信も行いません。

| 成果物 | 内容と証拠の範囲 |
|---|---|
| [identities.json](../../../examples/did-authentication-vnext/identities.json) | 各メソッドについて、通常のAPI、デバイス対応Agent二つ、サービス、グループのアイデンティティを含む、十個の公開DIDフィクスチャ。有効なE1 Documentには実際の証明バイト列があり、ネイティブのWeb DocumentにはWBA Documentの証明がない。HTTPSでの解決は、管理された前提条件であり、テスト結果ではない。 |
| [byte-vectors.json](../../../examples/did-authentication-vnext/byte-vectors.json) | 正確なリクエスト構成要素、ペイロード／JCSバイト列、署名ベース、Ed25519署名、E1／Object Proofのハッシュと署名、P5 ChaCha20-Poly1305のAAD／暗号文。明示的な改ざん操作も含む。 |
| [scenario-vectors.json](../../../examples/did-authentication-vnext/scenario-vectors.json) | 認証、WNS、メッセージ／E2EEフロー、拡張、継続性、参加受け入れに対する、フェーズA/Bの準備／操作／期待結果の入力。すべてのシナリオは、SDKや製品に対して実行していないことを明示する。 |
| [manifest.json](../../../examples/did-authentication-vnext/manifest.json) | ファイルハッシュ、生成／検査コマンド、件数。件数は成果物を示し、成功したSDKテストの件数ではない。 |
| [検証の責任](../../../message/02-identity-and-discovery.md#method-validation) | DIDメソッドの検証と、メッセージProfileのアイデンティティ、鍵の用途、デバイスの適格性に関する規則。 |

<a id="1-reproduce-and-check"></a>
## 1. 再現と検査

プロトコルの作業ツリーのルートで、Node.js 22以降を使います。

```sh
node scripts/generate-anp02-vectors.mjs
node scripts/check-anp02-vectors.mjs
```

最初のコマンドは、書き込みを行わずに、決定的な再生成結果と保存済みファイルを比較します。二つ目は、ハッシュ、フィクスチャの参照、選択したプリミティブの既知解、署名／ダイジェスト／Object Proof／AEADのバイト列、改ざんの拒否、シナリオカタログの網羅性を検査します。SDKと製品に対して実行したシナリオの件数は、ゼロとして報告します。

ベクトルの変更をレビューした後、これらの管理対象フィクスチャを意図的に再生成するには、次を実行します。

```sh
node scripts/generate-anp02-vectors.mjs --write
```

固定時刻は`2026-09-07T08:00:00Z`です。テストは現在時刻ではなく、シナリオの時計を使わなければなりません。鍵導出ラベルは`ANP02-PUBLIC-TEST-ONLY:`で始まります。生成した鍵をテスト以外で再利用してはなりません。P5のメッセージ鍵／nonceは、事前に確立済みのSessionから与えられる管理された入力です。これらのベクトルが検証するのはAAD／AEADのバイト列であり、X3DH、Ratchetの進行、デバイスの参加受け入れではありません。P6バインディングの証明は実際の署名ですが、完全にエンコードされたMLS KeyPackageや、実行済みのMLSグループではありません。

<a id="2-authentication-and-transport-boundaries"></a>
## 2. 認証とトランスポートの境界

`HTTP-*`ベクトルは、実際のHTTPメソッド／宛先／内容の構成要素を使います。`JSON-*`ベクトルは、宣言されたHTTP JSONメタデータバインディングを使い、そのダイジェストは`auth`を除くJCSペイロードのバイト列を対象とします。`ORIGIN-*`ベクトルは、変更していないP1 Signed Request Objectと`anp://`の宛先マッピングを使います。これらの署名は相互に置き換えられません。

バイト単位の負例ベクトルでは、準備済みの署名対象入力または署名を変更し、暗号学的な完全性の検証に失敗することを確認します。プロトコルシナリオでは、フィールドの解析、メソッドの証拠、用途の認可、時計／リプレイ状態、業務上の権限を別途テストします。バイト検査は、これらの状態に依存する条件を確立しません。Documentの証明がないネイティブのWebも、必要なBundle、制御操作のorigin、MLS、メッセージ認証の検査を引き続き受けなければなりません。

<a id="3-scenario-adapter-contract"></a>
## 3. シナリオアダプターの契約

これらのフィクスチャは、Ed25519、Multikey、JWKという機能のもとでの相互運用性を示すため、意図的にそれらを選択しています。ANP-02全体に共通のアルゴリズムや表現形式の要件を追加するものではありません。実装が宣言した対応範囲に従って、適用するシナリオを選んでください。JWTのissuer／audience／scopeのシナリオは、例示用のトークンポリシーとエラーマッピングを明示的に選択しています。そのポリシーを採用した場合にのみ適用され、すべてのANP-02実装にこれらのフィールドやポリシーを要求しません。既存のWBA E1と、選択したE2EE Profileの暗号学的要件は引き続き有効です。

認証関連のシナリオには、`applicability: illustrative-implementation-policy-not-additional-anp02-conformance`が付いています。そのリプレイの境界、キャッシュ、リゾルバー、認証情報の選択、エラーマッピング、ダイジェスト、トークンのポリシーは、実装の選択の例であり、ANP-02の追加要件や既存動作への必須変更ではありません。原文が特定の条件を指定していない場合は、シナリオの期待結果からプロトコル規則を導くのではなく、ANP-02 1.2と既存の実装ポリシーを使ってください。原文をそのまま抽出した箇所には、元のJWTの日付文字列の例も保持しています。ここでのNumericDateフィクスチャは選択したJWTの例であり、テストベクトルによって既存のトークンを変更することを義務付けるものではありません。

各シナリオは、次を含みます。

- `input`: 参照するアイデンティティ／バイト列フィクスチャと、管理された初期状態。
- `actions`: 実行する正確な変更操作、または該当Profileのフロー。
- `expected`: シナリオの適用範囲と選択したポリシーのもとでの、拒否、受け入れ、保証、または状態への副作用の境界。
- `normative_refs`: それらの義務を定義する仕様。
- `execution_status`: このフェーズPのカタログでは、常に`design-only-not-run-against-sdk-or-product`。

アダプターは、負例の変更を適用する前に、有効なベースラインを構築しなければなりません。後段の層をテストするための変更でWBA Documentを変える場合、テスト用ルート鍵でE1証明を再生成し、その後段の層だけを検証できるようにしてください。無効なE1の証拠そのものを明示的に対象とするテストでは、修復してはなりません。MLSシナリオでは、まず、提示された正確なバインディングを持つ有効なスイートのKeyPackage／Leafとグループ状態を構築し、その後、指定された変更を適用してください。オフラインのバインディングバイト列だけでは、その状態は得られません。

WNSシナリオでは、元のモデルをそれぞれ分けて保持します。WBAはホスト名の整合性、公開の厳密なHandle検査、非公開のProvider確認を維持し、Webは必須のエンドポイント参照や弱いバインディングの移行を行わずに、正方向のDIDとHTTPSのProviderドメインの検査を維持します。例示結果`legacy-domain-binding-accepted`は、テストのラベルにすぎず、新たな通信上の結果や厳密なHandleの表明ではありません。APIフィクスチャでは、意図的にHandle、サービスエントリー、デバイスManifestを省いています。完全なメッセージシナリオは、Direct、Group、P5/P6、通常／暗号化されたDirect／Groupの添付ファイル、通常／暗号化されたMentionについて、WBA→WBA、WBA→Web、Web→WBA、Web→Webを扱います。サービスのアイデンティティも、呼び出し側の基点とは独立して変化させます。

SDK／製品のランナーは、このカタログの設計段階というステータスを書き換えずに、実際の結果を自身の証拠に記録しなければなりません。必要なメソッド解決、TLS／キャッシュ、並行性、永続化、失効、MLS、オブジェクトストア、ユーザーに見える動作は、引き続きフェーズA/Bの作業です。有効化されたメソッドの負例では、WebVHを意図的に未対応にしています。これはWebVHの実装を主張するものではありません。

> `-vnext`というディレクトリ名は、パスの互換性のために維持されています。参照は1.2文書を指しています。P6は、登録済みMLS ExtensionTypeというリリース条件を満たすまで、候補のままです。

<a id="copyright-notice"></a>
## 著作権表示

Copyright (c) 2024 ANP Open Source Community
このファイルは[Apache License 2.0](../../../LICENSE)に基づいて公開されています。自由に利用・改変できますが、この著作権表示を保持しなければなりません。
