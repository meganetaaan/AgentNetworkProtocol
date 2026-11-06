# tests/release-doc-entrypoints.test.mjs の人向け文章の日本語対応表

原文: [tests/release-doc-entrypoints.test.mjs](../../../../tests/release-doc-entrypoints.test.mjs)。元ファイルのキー、コード、診断文字列、署名対象データは変更していません。この文書は実行するコードや送信するJSONの代替ではありません。

原文SHA-256: `29bd2d883f9a9f7058058bd17e8a82e21fc3c52ab59e0110f7cf2917171fbfbf`

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
In-memory regressions for the release reader-entry and payment metadata guards.
````

日本語:

````text
リリースの読者向け入口と支払いメタデータの検査に対する、メモリ内の回帰テスト。
````

## line:14:column:8

原文:

````text
current reader guide passes: 
````

日本語:

````text
現行の読者向けガイドは検査に通る: 
````

## line:19:column:6

原文:

````text
English specification-set metadata accepts both existing capitalizations
````

日本語:

````text
英語の仕様セットのメタデータは、既存の大文字表記の二つの形を受け入れる
````

## line:20:column:24

原文:

````text
Specification Set:
````

日本語:

````text
仕様セットというフィールド名の照合値。大文字小文字を含む元の値は保持します。
````

## line:20:column:46

原文:

````text
Specification set:
````

日本語:

````text
仕様セットというフィールド名の別の大文字小文字の照合値。元の値は保持します。
````

## line:27:column:4

原文:

````text
old document version
````

日本語:

````text
古い文書バージョン
````

## line:28:column:4

原文:

````text
stale current-version prose
````

日本語:

````text
現行バージョンに関する古い本文
````

## line:28:column:52

原文:

````text

The current specification set is ANP 1.1.

````

日本語:

````text
現行の仕様セットはANP 1.1である（古い版を検出するための変異入力）。
````

## line:29:column:4

原文:

````text
missing current authentication link
````

日本語:

````text
現行認証仕様へのリンクがない
````

## line:30:column:4

原文:

````text
archived authentication link
````

日本語:

````text
アーカイブされた認証仕様へのリンク
````

## line:31:column:4

原文:

````text
legacy authentication wire example
````

日本語:

````text
旧式認証のwire例
````

## line:31:column:59

原文:

````text

```text
Authorization: DIDWba did="example"
```

````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:32:column:4

原文:

````text
old direct E2EE advertisement
````

日本語:

````text
古いDirect E2EEの広告
````

## line:33:column:4

原文:

````text
missing digest guidance
````

日本語:

````text
ダイジェストの説明がない
````

## line:33:column:77

原文:

````text
body digest
````

日本語:

````text
本文のダイジェスト
````

## line:34:column:4

原文:

````text
authentication reading order reverted to ANP-03
````

日本語:

````text
認証の読む順序がANP-03へ戻っている
````

## line:38:column:4

原文:

````text
P6 registration gate lost
````

日本語:

````text
P6登録のリリース条件が失われている
````

## line:43:column:39

原文:

````text
Mutation must change the fixture
````

日本語:

````text
変異によってfixtureを変えなければなりません
````

## line:49:column:8

原文:

````text
payment remains an independent draft: 
````

日本語:

````text
支払いは、独立した草案のままである: 
````

## line:60:column:6

原文:

````text
payment status guard does not reject a historical editorial explanation
````

日本語:

````text
支払いstatusの検査は、過去の編集上の説明を拒否しない
````

## line:62:column:56

原文:

````text
> The earlier metadata incorrectly said `Released`.

## Abstract
````

日本語:

````text
以前のメタデータは誤ってReleasedと記載していた。概要。（過去の説明を許容するための変異入力）
````

## line:66:column:1

原文:

````text
Additional bilingual coverage for the integrated reader-entry guards.
````

日本語:

````text
統合された読者向け入口の検査に対し、二言語の追加範囲を検査します。
````

## line:68:column:8

原文:

````text
HTTP binding remains explicit: 
````

日本語:

````text
HTTP bindingを明示したまま保持する: 
````

## line:76:column:8

原文:

````text
Chinese onboarding rejects stale version, auth and archive links: 
````

日本語:

````text
中国語の導入ガイドは、古い版、認証方式、アーカイブへのリンクを拒否する: 
````

## line:81:column:51

原文:

````text

Authorization: DIDWba did="example"

````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:85:column:8

原文:

````text
draft status boundaries remain explicit: 
````

日本語:

````text
草案のstatusの境界を明示したまま保持する: 
````

## line:89:column:94

原文:

````text
候选
````

日本語:

````text
候補
````

## line:89:column:100

原文:

````text
稳定
````

日本語:

````text
安定版
````
