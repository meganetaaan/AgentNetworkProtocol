# scripts/start-chrome-debug.sh の人向け文章の日本語対応表

原文: [scripts/start-chrome-debug.sh](../../../../scripts/start-chrome-debug.sh)。元ファイルのキー、コード、診断文字列、署名対象データは変更していません。この文書は実行するコードや送信するJSONの代替ではありません。

原文SHA-256: `7e5b68f6739a5060c68244cb5fc84cc4b052778c0ca30cf714afa0cc18063dd0`

プログラムの抽出結果に加え、人が読む設定値・説明・コメントの抽出漏れを確認して補っています。技術値はそのまま保持し、保持理由を併記します。

## line:2

原文:

````text
Chrome 调试模式启动脚本
````

日本語:

````text
Chromeのデバッグモードを起動するスクリプト
````

## line:3

原文:

````text
用于配合 chrome-devtools MCP 使用
````

日本語:

````text
chrome-devtools MCPと組み合わせて使う
````

## line:8:column:6

原文:

````text
🚀 启动 Chrome 调试模式...
````

日本語:

````text
🚀 Chromeのデバッグモードを起動しています...
````

## line:9:column:6

原文:

````text
调试端口: $CHROME_DEBUG_PORT
````

日本語:

````text
デバッグ用ポート: $CHROME_DEBUG_PORT
````

## line:10:column:6

原文:

````text
用户数据目录: $USER_DATA_DIR
````

日本語:

````text
ユーザーデータのディレクトリ: $USER_DATA_DIR
````

## line:12

原文:

````text
检查 Chrome 是否已在运行
````

日本語:

````text
Chromeがすでに動作中か確認する
````

## line:14:column:10

原文:

````text
⚠️  端口 $CHROME_DEBUG_PORT 已被占用
````

日本語:

````text
⚠️ ポート$CHROME_DEBUG_PORTはすでに使用されています
````

## line:15:column:10

原文:

````text
请关闭现有的 Chrome 调试实例或使用其他端口
````

日本語:

````text
既存のChromeデバッグインスタンスを終了するか、別のポートを使ってください
````

## line:19

原文:

````text
启动 Chrome
````

日本語:

````text
Chromeを起動する
````

## line:29:column:6

原文:

````text
✓ Chrome 已启动 (PID: $CHROME_PID)
````

日本語:

````text
✓ Chromeを起動しました（PID: $CHROME_PID）
````

## line:30:column:6

原文:

````text
调试地址: http://localhost:$CHROME_DEBUG_PORT
````

日本語:

````text
デバッグ接続先: http://localhost:$CHROME_DEBUG_PORT
````

## line:32:column:6

原文:

````text
按 Ctrl+C 停止...
````

日本語:

````text
停止するにはCtrl+Cを押してください...
````

## line:34

原文:

````text
等待并清理
````

日本語:

````text
待機して後片付けする
````

## line:35:column:6

原文:

````text
echo ''; echo '🛑 停止 Chrome...'; kill $CHROME_PID 2>/dev/null; rm -rf '$USER_DATA_DIR'; exit 0
````

日本語:

````text
終了時処理のシェル構文。表示する文章は「🛑 Chromeを停止しています...」。残りのecho、kill、rm、exitおよび変数は操作の識別子なので元のまま保持します。
````
