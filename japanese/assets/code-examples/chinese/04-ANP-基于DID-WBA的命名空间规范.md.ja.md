# chinese/04-ANP-基于DID-WBA的命名空间规范.md のコード例・図ラベルの日本語補足

原文: [chinese/04-ANP-基于DID-WBA的命名空间规范.md](../../../../chinese/04-ANP-基于DID-WBA的命名空间规范.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:157-169/line:2

原文:

````text
客户端
````

日本語補足（agent-reviewed）:

````text
クライアント
````

## fence:157-169/line:3

原文:

````text
Handle Provider
````

日本語補足（agent-reviewed）:

````text
Handleプロバイダー
````

## fence:157-169/line:4

原文:

````text
DID Document 服务器
````

日本語補足（agent-reviewed）:

````text
DID Documentサーバー
````

## fence:157-169/line:7

原文:

````text
Handle Resolution Document (含 DID)
````

日本語補足（agent-reviewed）:

````text
Handle Resolution Document（DIDを含む）
````

## fence:157-169/line:8

原文:

````text
从 Resolution Document 中提取 DID
````

日本語補足（agent-reviewed）:

````text
Resolution DocumentからDIDを抽出
````

## fence:157-169/line:9

原文:

````text
按适用方法解析 DID Document（WBA: 03；Web: 附录 B）
````

日本語補足（agent-reviewed）:

````text
適用するメソッドに従ってDID Documentを解決（WBA: 03；Web: 付録B）
````

## fence:157-169/line:10

原文:

````text
DID Document
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
DID文書
````

## fence:157-169/line:11

原文:

````text
从 DID Document 获取服务端点
````

日本語補足（agent-reviewed）:

````text
DID Documentからサービスエンドポイントを取得
````

## fence:193-217//profile/description

原文:

````text
Researcher and AI agent user
````

日本語補足（agent-reviewed）:

````text
研究者およびAIエージェントの利用者
````

## fence:281-307//description

原文:

````text
Researcher and AI agent user
````

日本語補足（agent-reviewed）:

````text
研究者およびAIエージェントの利用者
````

## fence:450-455//message

原文:

````text
The handle 'bob.example.com' does not exist
````

日本語補足（agent-reviewed）:

````text
Handle「bob.example.com」は存在しません
````

## fence:534-554/line:2

原文:

````text
验证者
````

日本語補足（agent-reviewed）:

````text
検証者
````

## fence:534-554/line:3

原文:

````text
Handle Provider
````

日本語補足（agent-reviewed）:

````text
Handleプロバイダー
````

## fence:534-554/line:4

原文:

````text
DID Document 服务器
````

日本語補足（agent-reviewed）:

````text
DID Documentサーバー
````

## fence:534-554/line:6

原文:

````text
1. 解析 Handle 获得 DID
````

日本語補足（agent-reviewed）:

````text
1. Handleを解決してDIDを取得
````

## fence:534-554/line:7

原文:

````text
Handle Resolution Document
````

日本語補足（agent-reviewed）:

````text
Handle解決文書
````

## fence:534-554/line:8

原文:

````text
2. 解析 DID 获得 DID Document
````

日本語補足（agent-reviewed）:

````text
2. DIDを解決してDID Documentを取得
````

## fence:534-554/line:9

原文:

````text
DID Document
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
DID文書
````

## fence:534-554/line:10

原文:

````text
3. 查找 ANPHandleService 并读取 serviceEndpoint
````

日本語補足（agent-reviewed）:

````text
3. ANPHandleServiceを探し、serviceEndpointを読み取る
````

## fence:534-554/line:11

原文:

````text
4. 解引用 serviceEndpoint
````

日本語補足（agent-reviewed）:

````text
4. serviceEndpointを参照解決
````

## fence:534-554/line:12

原文:

````text
Handle Resolution Document 或 DID Confirmation Document
````

日本語補足（agent-reviewed）:

````text
Handle Resolution DocumentまたはDID Confirmation Document
````

## fence:534-554/line:13

原文:

````text
公开 Handle 模式且精确匹配
````

日本語補足（agent-reviewed）:

````text
公開Handleモードかつ完全一致
````

## fence:534-554/line:15

原文:

````text
私密确认模式且 confirmed=true
````

日本語補足（agent-reviewed）:

````text
非公開確認モードかつconfirmed=true
````

## fence:534-554/line:17

原文:

````text
校验失败
````

日本語補足（agent-reviewed）:

````text
検証失敗
````

## fence:643-653//name

原文:

````text
Alice's Agent
````

日本語補足（agent-reviewed）:

````text
AliceのAgent
````

## fence:661-668//name

原文:

````text
Alice's Agent
````

日本語補足（agent-reviewed）:

````text
AliceのAgent
````

## fence:153-155

原文:

````text
Handle → Handle Resolution Endpoint → DID → DID Document → service
````

日本語補足（agent-reviewed）:

````text
Handle（ハンドル）→Handle解決エンドポイント→DID→DID Document（DID文書）→サービス
````

## fence:105-114

原文:

````text
alice.example.com          ✓ 有效
bob-smith.example.com      ✓ 有效
agent-42.example.com       ✓ 有效
a.example.com              ✓ 有效（单字符 local-part）
-alice.example.com         ✗ 无效（以连字符开头）
alice-.example.com         ✗ 无效（以连字符结尾）
al--ice.example.com        ✗ 无效（连续连字符）
Alice.Example.com          → 归一化为 alice.example.com
````

日本語補足（agent-reviewed）:

````text
alice.example.com          ✓ 有効
bob-smith.example.com      ✓ 有効
agent-42.example.com       ✓ 有効
a.example.com              ✓ 有効（local-partが1文字）
-alice.example.com         ✗ 無効（ハイフンで始まる）
alice-.example.com         ✗ 無効（ハイフンで終わる）
al--ice.example.com        ✗ 無効（ハイフンが連続する）
Alice.Example.com          → alice.example.comへ正規化
````
