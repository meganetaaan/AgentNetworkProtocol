# 04-anp-did-wba-name-space-specification.md のコード例・図ラベルの日本語補足

原文: [04-anp-did-wba-name-space-specification.md](../../../04-anp-did-wba-name-space-specification.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:158-170/line:3

原文:

````text
Handle Provider
````

日本語補足（agent-reviewed）:

````text
Handleプロバイダー
````

## fence:158-170/line:4

原文:

````text
DID Document Server
````

日本語補足（agent-reviewed）:

````text
DID Documentを提供するサーバー
````

## fence:158-170/line:7

原文:

````text
Handle Resolution Document (containing DID)
````

日本語補足（agent-reviewed）:

````text
Handle解決文書（DIDを含む）
````

## fence:158-170/line:8

原文:

````text
Extract DID from the Resolution Document
````

日本語補足（agent-reviewed）:

````text
解決文書からDIDを取り出す
````

## fence:158-170/line:9

原文:

````text
Resolve under the applicable method (WBA: 03; Web: Appendix B)
````

日本語補足（agent-reviewed）:

````text
該当メソッドで解決する（WBA: 03、Web: 付録B）
````

## fence:158-170/line:10

原文:

````text
DID Document
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
DID文書
````

## fence:158-170/line:11

原文:

````text
Obtain service endpoints from the DID Document
````

日本語補足（agent-reviewed）:

````text
DID Documentからサービスエンドポイントを取得する
````

## fence:194-218//profile/description

原文:

````text
Researcher and AI agent user
````

日本語補足（agent-reviewed）:

````text
研究者およびAIエージェントの利用者
````

## fence:282-308//description

原文:

````text
Researcher and AI agent user
````

日本語補足（agent-reviewed）:

````text
研究者およびAIエージェントの利用者
````

## fence:451-456//message

原文:

````text
The handle 'bob.example.com' does not exist
````

日本語補足（agent-reviewed）:

````text
Handle「bob.example.com」は存在しません
````

## fence:535-555/line:3

原文:

````text
Handle Provider
````

日本語補足（agent-reviewed）:

````text
Handleプロバイダー
````

## fence:535-555/line:4

原文:

````text
DID Document Server
````

日本語補足（agent-reviewed）:

````text
DID Documentを提供するサーバー
````

## fence:535-555/line:6

原文:

````text
1. Resolve Handle to obtain DID
````

日本語補足（agent-reviewed）:

````text
1. Handleを解決してDIDを取得する
````

## fence:535-555/line:7

原文:

````text
Handle Resolution Document
````

日本語補足（agent-reviewed）:

````text
Handle解決文書
````

## fence:535-555/line:8

原文:

````text
2. Resolve DID to obtain DID Document
````

日本語補足（agent-reviewed）:

````text
2. DIDを解決してDID Documentを取得する
````

## fence:535-555/line:9

原文:

````text
DID Document
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
DID文書
````

## fence:535-555/line:10

原文:

````text
3. Find ANPHandleService and read serviceEndpoint
````

日本語補足（agent-reviewed）:

````text
3. ANPHandleServiceを見つけ、serviceEndpointを読む
````

## fence:535-555/line:11

原文:

````text
4. Dereference serviceEndpoint
````

日本語補足（agent-reviewed）:

````text
4. serviceEndpointを参照解決する
````

## fence:535-555/line:12

原文:

````text
Handle Resolution Document or DID Confirmation Document
````

日本語補足（agent-reviewed）:

````text
Handle解決文書またはDID確認文書
````

## fence:535-555/line:13

原文:

````text
Public Handle mode and exact match
````

日本語補足（agent-reviewed）:

````text
公開Handleモードと完全一致
````

## fence:535-555/line:15

原文:

````text
Private confirmation mode and confirmed=true
````

日本語補足（agent-reviewed）:

````text
非公開の確認モードとconfirmed=true
````

## fence:535-555/line:17

原文:

````text
Verification failed
````

日本語補足（agent-reviewed）:

````text
検証に失敗
````

## fence:644-654//name

原文:

````text
Alice's Agent
````

日本語補足（agent-reviewed）:

````text
AliceのAgent
````

## fence:662-669//name

原文:

````text
Alice's Agent
````

日本語補足（agent-reviewed）:

````text
AliceのAgent
````

## fence:106-115

原文:

````text
alice.example.com          ✓ Valid
bob-smith.example.com      ✓ Valid
agent-42.example.com       ✓ Valid
a.example.com              ✓ Valid (single-character local-part)
-alice.example.com         ✗ Invalid (starts with hyphen)
alice-.example.com         ✗ Invalid (ends with hyphen)
al--ice.example.com        ✗ Invalid (consecutive hyphens)
Alice.Example.com          → Normalized to alice.example.com
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

## fence:154-156

原文:

````text
Handle → Handle Resolution Endpoint → DID → DID Document → service
````

日本語補足（agent-reviewed）:

````text
Handle（ハンドル）→Handle解決エンドポイント→DID→DID Document（DID文書）→サービス
````
