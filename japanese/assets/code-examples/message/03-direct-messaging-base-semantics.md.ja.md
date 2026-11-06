# message/03-direct-messaging-base-semantics.md のコード例・図ラベルの日本語補足

原文: [message/03-direct-messaging-base-semantics.md](../../../../message/03-direct-messaging-base-semantics.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:89-103/line:2

原文:

````text
Sender Agent
````

日本語補足（agent-reviewed）:

````text
送信側エージェント
````

## fence:89-103/line:3

原文:

````text
Sender-domain service
````

日本語補足（agent-reviewed）:

````text
送信元ドメインのサービス
````

## fence:89-103/line:4

原文:

````text
Target-domain ingress service
````

日本語補足（agent-reviewed）:

````text
宛先ドメインの入口サービス
````

## fence:89-103/line:5

原文:

````text
Receiver Agent
````

日本語補足（agent-reviewed）:

````text
受信側エージェント
````

## fence:89-103/line:8

原文:

````text
Forward original direct.send cross-domain
````

日本語補足（agent-reviewed）:

````text
元のdirect.sendをドメインをまたいで転送
````

## fence:89-103/line:9

原文:

````text
Validate target / idempotence / origin_proof
````

日本語補足（agent-reviewed）:

````text
target／冪等性／origin_proofを検証
````

## fence:89-103/line:11

原文:

````text
Return success
````

日本語補足（agent-reviewed）:

````text
successを返す
````

## fence:89-103/line:12

原文:

````text
Success only means ingress accepted
````

日本語補足（agent-reviewed）:

````text
成功が示すのはingress acceptedのみ
````

## fence:482-495/line:2

原文:

````text
Receive direct.send
````

日本語補足（agent-reviewed）:

````text
direct.sendを受信
````

## fence:482-495/line:5

原文:

````text
Process normally
````

日本語補足（agent-reviewed）:

````text
通常の処理
````

## fence:482-495/line:7

原文:

````text
Write idempotence record and return accepted
````

日本語補足（agent-reviewed）:

````text
冪等性の記録を書き込み、acceptedを返す
````

## fence:482-495/line:8

原文:

````text
Apply duplicate-message policy
````

日本語補足（agent-reviewed）:

````text
重複メッセージのポリシーを適用
````

## fence:482-495/line:11

原文:

````text
Return the same or equivalent result
````

日本語補足（agent-reviewed）:

````text
同じ結果または同等の結果を返す
````

## fence:629-662//params/body/text

原文:

````text
hello from agent-a
````

日本語補足（agent-reviewed）:

````text
agent-aからこんにちは
````

## fence:666-718//params/body/payload/caption

原文:

````text
Please check the attachment
````

日本語補足（agent-reviewed）:

````text
添付ファイルをご確認ください
````

## fence:761-793//params/body/text

原文:

````text
hello bob
````

日本語補足（agent-reviewed）:

````text
こんにちは、bob
````
