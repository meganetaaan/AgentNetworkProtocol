# scripts/release-entrypoint-checks.mjs の人向け文章の日本語対応表

原文: [scripts/release-entrypoint-checks.mjs](../../../../scripts/release-entrypoint-checks.mjs)。元ファイルのキー、コード、診断文字列、署名対象データは変更していません。この文書は実行するコードや送信するJSONの代替ではありません。

原文SHA-256: `ed9fa0159943ce7dd0a432c98a1483bb2e16b6493ca2d5978d7dc00dd7046d25`

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
Focused release-entry checks. These are documentation guards, not conformance tests.
````

日本語:

````text
リリースの読み始めの案内に絞った検査です。文書を守るための検査であり、適合性試験ではありません。
````

## line:4:column:120

原文:

````text
## Recommended Reading Path
````

日本語:

````text
推奨する読む順序という見出しを照合する文字列。実際の照合値は原文のまま保持します。
````

## line:5:column:10

原文:

````text
docs/chinese/ANP入门指南.md
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:5:column:43

原文:

````text
../../chinese/02-ANP-基于DID的身份认证协议.md
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:5:column:92

原文:

````text
## 推荐阅读路径
````

日本語:

````text
推奨する読む順序という中国語見出しを照合する文字列。実際の照合値は原文のまま保持します。
````

## line:6:column:10

原文:

````text
docs/did-wba入门指南.md
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:6:column:39

原文:

````text
../chinese/02-ANP-基于DID的身份认证协议.md
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:10:column:10

原文:

````text
chinese/application/10-ANP-智能体支付协议规范.md
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:47:column:3

原文:

````text
Deliberately limit this check to status metadata; payment payloads are independently versioned.
````

日本語:

````text
支払いpayloadは独立して版管理されるため、この検査は意図的にstatusメタデータだけに限定します。
````

## line:59:column:3

原文:

````text
Check an ANP-05 overview when present; unrelated white-paper sections may
````

日本語:

````text
ANP-05の概要があれば検査します。無関係な白書の節では、
````

## line:60:column:3

原文:

````text
discuss generic VC capabilities without claiming this Profile implements them.
````

日本語:

````text
このProfileが実装するとの主張をせずに、VCの一般的な機能を論じることができます。
````

## line:67:column:5

原文:

````text
Qualify each conversion claim by its sentence. A clearly marked future
````

日本語:

````text
変換に関する各主張を、その文単位で条件付けて判断します。明確に将来の構成と記したものは
````

## line:68:column:5

原文:

````text
composition remains allowed, so this does not ban the word "exchange".
````

日本語:

````text
引き続き許容されるため、単語exchangeそのものを禁止する検査ではありません。
````
