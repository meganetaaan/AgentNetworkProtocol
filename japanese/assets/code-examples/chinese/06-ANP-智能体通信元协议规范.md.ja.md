# chinese/06-ANP-智能体通信元协议规范.md のコード例・図ラベルの日本語補足

原文: [chinese/06-ANP-智能体通信元协议规范.md](../../../../chinese/06-ANP-智能体通信元协议规范.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:218-245//description

原文:

````text
Semantic meta-protocol negotiation interface for selecting the best execution interface.
````

日本語補足（agent-reviewed）:

````text
最適な実行インターフェースを選ぶための、意味的なメタプロトコル交渉インターフェース。
````

## fence:356-427//params/body/intent/description

原文:

````text
Book a hotel room for two people next Friday.
````

日本語補足（agent-reviewed）:

````text
来週の金曜日に2人分のホテルの客室を予約する。
````

## fence:446-460//description

原文:

````text
Book a hotel room for two people next Friday.
````

日本語補足（agent-reviewed）:

````text
来週の金曜日に2人分のホテルの客室を予約する。
````

## fence:631-655//description

原文:

````text
Get product information by product ID.
````

日本語補足（agent-reviewed）:

````text
商品IDから商品情報を取得する。
````

## fence:686-704//error/message

原文:

````text
No matching interface
````

日本語補足（agent-reviewed）:

````text
一致するインターフェースがない
````

## fence:775-858//name

原文:

````text
Grand Hotel Assistant
````

日本語補足（agent-reviewed）:

````text
Grand Hotel Assistant（Grand Hotelのアシスタント）
````

## fence:775-858//capabilities/0/name

原文:

````text
Hotel room booking
````

日本語補足（agent-reviewed）:

````text
ホテル客室の予約
````

## fence:775-858//capabilities/0/description

原文:

````text
Book hotel rooms, modify reservations, and check room availability.
````

日本語補足（agent-reviewed）:

````text
ホテルの客室を予約し、予約を変更し、空室状況を確認する。
````

## fence:775-858//interfaces/0/description

原文:

````text
Endpoint for runtime capability and semantic meta-protocol negotiation.
````

日本語補足（agent-reviewed）:

````text
実行時の機能確認と意味的なメタプロトコル交渉のためのエンドポイント。
````

## fence:775-858//interfaces/1/description

原文:

````text
Structured booking interface for room reservation.
````

日本語補足（agent-reviewed）:

````text
客室予約のための構造化された予約インターフェース。
````

## fence:775-858//interfaces/2/description

原文:

````text
Natural language conversation interface.
````

日本語補足（agent-reviewed）:

````text
自然言語による会話インターフェース。
````

## fence:23-31

原文:

````text
Agent Discovery
  -> Agent Description
  -> MetaProtocolInterface
  -> anp.get_capabilities
  -> anp.negotiate
  -> selected interface / profile / security profile / schema
  -> business call or message exchange
````

日本語補足（agent-reviewed）:

````text
エージェントの発見
 → エージェント記述
 → MetaProtocolInterface
 → anp.get_capabilities
 → anp.negotiate
 → 選択されたインターフェース／profile／security profile／schema
 → 業務呼び出しまたはメッセージ交換
````

## fence:277-286

原文:

````text
Caller Agent
  -> discover Agent Description
  -> parse MetaProtocolInterface
  -> resolve target DID and ANPMessageService
  -> call anp.get_capabilities
  -> call anp.negotiate
  -> receive NegotiationResult
  -> invoke selected interface or profile
````

日本語補足（agent-reviewed）:

````text
呼び出し元エージェント
 → エージェント記述を発見
 → MetaProtocolInterfaceを解析
 → 宛先DIDとANPMessageServiceを解決
 → anp.get_capabilitiesを呼び出す
 → anp.negotiateを呼び出す
 → NegotiationResultを受信
 → 選択されたインターフェースまたはprofileを呼び出す
````
