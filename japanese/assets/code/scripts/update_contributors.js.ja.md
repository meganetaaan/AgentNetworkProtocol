# scripts/update_contributors.js の人向け文章の日本語対応表

原文: [scripts/update_contributors.js](../../../../scripts/update_contributors.js)。元ファイルのキー、コード、診断文字列、署名対象データは変更していません。この文書は実行するコードや送信するJSONの代替ではありません。

原文SHA-256: `dd956500f5ed7ed006cf0d1ad4d43c2656e9377199684e42f814836aa1df2cad`

プログラムの抽出結果に加え、人が読む設定値・説明・コメントの抽出漏れを確認して補っています。技術値はそのまま保持し、保持理由を併記します。

## line:1:column:1

原文:

````text
*
 * Synchronize contributor avatar blocks in the English and Chinese READMEs.
 *
 * Input: GitHub's contributors and contributor statistics API responses.
 * Output: Deterministic HTML between the README contributor markers.
 * Position: Shared implementation used by the contributor update workflow.
````

日本語:

````text
英語・中国語READMEの貢献者アバターブロックを同期します。入力はGitHub contributors APIとcontributor statistics APIの応答です。出力はREADMEの貢献者マーカー間の決定的なHTMLです。貢献者更新workflowが使う共通実装です。
````

## line:47:column:23

原文:

````text
`Contributor page ${page} unavailable: HTTP ${response.status}`
````

日本語:

````text
貢献者のページ${page}を利用できません: HTTP ${response.status}
````

## line:85:column:7

原文:

````text
`Contributor statistics unavailable; leaving READMEs unchanged (HTTP ${statsResponse?.status ?? 'unknown'})`
````

日本語:

````text
貢献者の統計を利用できないため、READMEを変更しません（HTTP ${statsResponse?.status ?? 'unknown'}）
````

## line:102:column:9

原文:

````text
`<a href="${author.html_url}"><img src="${author.avatar_url}" width="64" height="64" alt="@${author.login}" /></a>`
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:115:column:21

原文:

````text
`Contributor markers are invalid in ${file}`
````

日本語:

````text
${file}の貢献者マーカーが不正です
````

## line:143:column:13

原文:

````text
`Rendered ${contributors.length} contributor avatars`
````

日本語:

````text
${contributors.length}人分の貢献者アバターを生成しました
````
