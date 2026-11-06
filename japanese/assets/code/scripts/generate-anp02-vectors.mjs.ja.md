# scripts/generate-anp02-vectors.mjs の人向け文章の日本語対応表

原文: [scripts/generate-anp02-vectors.mjs](../../../../scripts/generate-anp02-vectors.mjs)。元ファイルのキー、コード、診断文字列、署名対象データは変更していません。この文書は実行するコードや送信するJSONの代替ではありません。

原文SHA-256: `85c63cd36b64bfc431a1dbddab38aedc5c04990934ed6fb3bb72fa56f800e6ef`

プログラムの抽出結果に加え、人が読む設定値・説明・コメントの抽出漏れを確認して補っています。技術値はそのまま保持し、保持理由を併記します。

## line:1:column:1

原文:

````text
Copyright (c) 2024 ANP Open Source Community. Apache-2.0.
````

日本語:

````text
Copyright (c) 2024 ANP Open Source Community。Apache-2.0。
````

## line:2:column:1

原文:

````text
Generate offline public test fixtures only. No network or SDK execution.
````

日本語:

````text
公開されたオフラインテストfixtureのみを生成します。ネットワーク接続やSDKの実行は行いません。
````

## line:102:column:18

原文:

````text
Hello from a native DID
````

日本語:

````text
ネイティブDIDからの挨拶
````

## line:113:column:27

原文:

````text
Group receipt assertion
````

日本語:

````text
グループの受理証明に関するassertion
````

## line:150:column:68

原文:

````text
No separate origin proof is required for this P5 ciphertext
````

日本語:

````text
このP5暗号文には、別個のorigin proofは必要ありません
````

## line:157:column:140

原文:

````text
The device-pair Session and this message key/nonce are established controlled inputs; X3DH/Ratchet/SDK execution is not claimed.
````

日本語:

````text
デバイス対のSessionと、このメッセージの鍵・nonceは、あらかじめ確立した制御された入力です。X3DH、Ratchet、SDKを実行したとは主張しません。
````

## line:189:column:225

原文:

````text
Expected results illustrate the selected fixture policy, including error mapping and boundary handling. The ANP-02 1.2 authentication text remains authoritative; these scenarios do not mandate new replay, cache, resolver, credential-selection, algorithm, or token behavior.
````

日本語:

````text
期待結果は、エラーマッピングや境界処理を含む、選択されたfixtureポリシーの例です。ANP-02 1.2の認証本文が規範となります。これらのシナリオは、replay、cache、resolver、資格情報の選択、アルゴリズム、トークン動作に新しい要件を課しません。
````

## line:288:column:204

原文:

````text
For P6, construct a valid suite KeyPackage/Leaf with this exact binding and current Manifest before applying the single mutation.
````

日本語:

````text
P6では、単一の変異を適用する前に、この正確な結合と現在のManifestを持つ、有効なsuiteのKeyPackageまたはLeafを構築します。
````

## line:291:column:183

原文:

````text
valid owner-authorized add Commit under a ready P4/P6 state
````

日本語:

````text
準備が整ったP4/P6状態で、ownerが正当に認可した有効な追加Commit
````

## line:292:column:185

原文:

````text
valid owner-authorized remove Commit under a ready state
````

日本語:

````text
準備が整った状態で、ownerが正当に認可した有効な削除Commit
````

## line:310:column:180

原文:

````text
Add reverse_service and regenerate any required WBA Document proof.
````

日本語:

````text
reverse_serviceを追加し、必要なWBA Document proofを再生成します。
````

## line:336:column:76

原文:

````text
Same stable subject path, authenticated same-origin complete successor chain, no old-binding/recovery proof, valid final active E1 Document
````

日本語:

````text
同じstable subject path、認証された同一originの完全な後継チェーン、旧bindingまたはrecoveryのproofなし、有効で最終的にactiveなE1 Document
````

## line:363:column:115

原文:

````text
SHA-256("ANP02-PUBLIC-TEST-ONLY:" + key label); all keys are public test material, never production credentials.
````

日本語:

````text
SHA-256("ANP02-PUBLIC-TEST-ONLY:" + key label)。すべての鍵は公開テスト素材であり、本番用の資格情報ではありません。
````

## line:363:column:249

原文:

````text
No HTTPS, DNS, method resolver or state freshness is exercised by generating these documents.
````

日本語:

````text
これらの文書の生成では、HTTPS、DNS、メソッドリゾルバー、状態の鮮度は検証しません。
````

## line:364:column:143

原文:

````text
Request signature/digest construction, E1/Object Proof bytes, and P5 AEAD bytes. Not SDK, complete method, X3DH/Ratchet or MLS conformance.
````

日本語:

````text
要求の署名・ダイジェストの構築、E1とObject Proofのバイト列、P5 AEADのバイト列。SDK、メソッド全体、X3DH/Ratchet、MLSの適合性ではありません。
````

## line:365:column:135

原文:

````text
Authentication-related setups/actions/outcomes are illustrative implementation-policy examples, not additional conformance requirements. The ANP-02 1.2 authentication text is authoritative. Static validation does not execute scenarios.
````

日本語:

````text
認証に関する設定・操作・結果は、実装ポリシーを示す例であり、追加の適合要件ではありません。ANP-02 1.2の認証本文が規範です。静的検証ではシナリオを実行しません。
````

## line:368:column:113

原文:

````text
node scripts/generate-anp02-vectors.mjs --write
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:368:column:182

原文:

````text
node scripts/check-anp02-vectors.mjs
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:373:column:61

原文:

````text
 fixture files: 
````

日本語:

````text
個のfixtureファイル: 
````

## line:373:column:97

原文:

````text
 positive byte vectors, 
````

日本語:

````text
個の正のバイトベクトル、
````

## line:373:column:145

原文:

````text
 negative byte vectors, 
````

日本語:

````text
個の負のバイトベクトル、
````

## line:373:column:193

原文:

````text
 design scenarios.
````

日本語:

````text
個の設計シナリオ。
````

## line:376:column:84

原文:

````text
Fixture regeneration differs: 
````

日本語:

````text
fixtureの再生成結果が異なります: 
````

## line:378:column:15

原文:

````text
PASS: deterministic fixture regeneration; no files written.
````

日本語:

````text
成功: fixtureの決定的な再生成を確認しました。ファイルへの書き込みはありません。
````
