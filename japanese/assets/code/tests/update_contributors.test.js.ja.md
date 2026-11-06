# tests/update_contributors.test.js の人向け文章の日本語対応表

原文: [tests/update_contributors.test.js](../../../../tests/update_contributors.test.js)。元ファイルのキー、コード、診断文字列、署名対象データは変更していません。この文書は実行するコードや送信するJSONの代替ではありません。

原文SHA-256: `0ad3bbf5eb705cafbafe6be04c3d6d69619c1fcb7771bf62f37215bd8c1d00a3`

プログラムの抽出結果に加え、人が読む設定値・説明・コメントの抽出漏れを確認して補っています。技術値はそのまま保持し、保持理由を併記します。

## line:22:column:6

原文:

````text
fetchContributors merges statistics, excludes bots, and sorts deterministically
````

日本語:

````text
fetchContributorsは統計を統合し、botを除外し、決定的な順序で並べる
````

## line:64:column:6

原文:

````text
fetchContributors skips updates when contributor statistics stay unavailable
````

日本語:

````text
貢献者の統計を利用できない状態が続けば、fetchContributorsは更新を見送る
````

## line:85:column:6

原文:

````text
updateReadmes leaves existing avatars unchanged when statistics are unavailable
````

日本語:

````text
統計を利用できない場合、updateReadmesは既存アバターを変更しない
````

## line:100:column:25

原文:

````text
README should not be read
````

日本語:

````text
READMEを読み取ってはなりません
````

## line:111:column:6

原文:

````text
renderContributorBlock replaces exactly one marked block
````

日本語:

````text
renderContributorBlockは、マーカー付きブロックを正確に一つ置き換える
````

## line:131:column:34

原文:

````text
no markers
````

日本語:

````text
マーカーなし
````

## line:136:column:6

原文:

````text
updateReadmes writes the same avatar block to both README files
````

日本語:

````text
updateReadmesは、両方のREADMEへ同じアバターブロックを書き込む
````

## line:167:column:28

原文:

````text
Rendered 1 contributor avatars
````

日本語:

````text
1人分の貢献者アバターを生成しました
````
