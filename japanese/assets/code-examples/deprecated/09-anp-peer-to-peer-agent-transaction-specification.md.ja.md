# deprecated/09-anp-peer-to-peer-agent-transaction-specification.md のコード例・図ラベルの日本語補足

原文: [deprecated/09-anp-peer-to-peer-agent-transaction-specification.md](../../../../deprecated/09-anp-peer-to-peer-agent-transaction-specification.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:203-272/line:2

原文:

````text
User Agent
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
ユーザーエージェント
````

## fence:203-272/line:3

原文:

````text
Hotel Agent
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
ホテルエージェント
````

## fence:203-272/line:4

原文:

````text
Payment Agent
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
支払いエージェント
````

## fence:203-272/line:5

原文:

````text
Registry/Notary Service
````

日本語補足（agent-reviewed）:

````text
登録／公証サービス
````

## fence:203-272/line:7

原文:

````text
Step 1: User Search & Selection
````

日本語補足（agent-reviewed）:

````text
手順1：利用者が検索して選択
````

## fence:203-272/line:8

原文:

````text
Service Discovery Request
````

日本語補足（agent-reviewed）:

````text
サービス発見要求
````

## fence:203-272/line:9

原文:

````text
Provide Service Information
````

日本語補足（agent-reviewed）:

````text
サービス情報を提供
````

## fence:203-272/line:11

原文:

````text
Step 2: User Booking Request
````

日本語補足（agent-reviewed）:

````text
手順2：利用者が予約を要求
````

## fence:203-272/line:12

原文:

````text
Send Booking Request
````

日本語補足（agent-reviewed）:

````text
予約要求を送信
````

## fence:203-272/line:14

原文:

````text
Step 3: Generate Order Proposal
````

日本語補足（agent-reviewed）:

````text
手順3：注文提案を生成
````

## fence:203-272/line:15

原文:

````text
(Optional) Query product info hash and URL
````

日本語補足（agent-reviewed）:

````text
（任意）商品情報のハッシュとURLを照会
````

## fence:203-272/line:16

原文:

````text
Return verified product info hash and URL
````

日本語補足（agent-reviewed）:

````text
検証済みの商品情報のハッシュとURLを返す
````

## fence:203-272/line:18

原文:

````text
[Order Proposal Credential]<br/>(contains hash and URL of notarized product info)
````

日本語補足（agent-reviewed）:

````text
【注文提案資格情報】<br/>（公証済み商品情報のハッシュとURLを含む）
````

## fence:203-272/line:18

原文:

````text
Order Proposal Credential
````

日本語補足（agent-reviewed）:

````text
注文提案資格情報
````

## fence:203-272/line:20

原文:

````text
Send Order Proposal Credential
````

日本語補足（agent-reviewed）:

````text
注文提案資格情報を送信
````

## fence:203-272/line:22

原文:

````text
Step 4: User Confirms Order
````

日本語補足（agent-reviewed）:

````text
手順4：利用者が注文を確認
````

## fence:203-272/line:24

原文:

````text
[Booking Confirmation Credential]<br/>(contains OrderProposal hash)
````

日本語補足（agent-reviewed）:

````text
【予約確認資格情報】<br/>（OrderProposalのハッシュを含む）
````

## fence:203-272/line:24

原文:

````text
Booking Confirmation Credential
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
予約確認の資格情報
````

## fence:203-272/line:26

原文:

````text
Send Booking Confirmation Credential
````

日本語補足（agent-reviewed）:

````text
予約確認資格情報を送信
````

## fence:203-272/line:28

原文:

````text
Send Payment Request
````

日本語補足（agent-reviewed）:

````text
支払い要求を送信
````

## fence:203-272/line:30

原文:

````text
Generate Payment Instruction
````

日本語補足（agent-reviewed）:

````text
支払い指示を生成
````

## fence:203-272/line:32

原文:

````text
[Payment Instruction Credential]<br/>(contains BookingConfirmation hash)
````

日本語補足（agent-reviewed）:

````text
【支払い指示資格情報】<br/>（BookingConfirmationのハッシュを含む）
````

## fence:203-272/line:32

原文:

````text
Payment Instruction Credential
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
支払い指示の資格情報
````

## fence:203-272/line:34

原文:

````text
Send Payment Instruction Credential
````

日本語補足（agent-reviewed）:

````text
支払い指示資格情報を送信
````

## fence:203-272/line:35

原文:

````text
Forward Payment Instruction Credential
````

日本語補足（agent-reviewed）:

````text
支払い指示資格情報を転送
````

## fence:203-272/line:37

原文:

````text
Step 5: User Payment & Funds Escrow
````

日本語補足（agent-reviewed）:

````text
手順5：利用者による支払いとエスクロー
````

## fence:203-272/line:38

原文:

````text
Complete Payment Operation
````

日本語補足（agent-reviewed）:

````text
支払い操作を完了
````

## fence:203-272/line:40

原文:

````text
Funds Escrow
````

日本語補足（agent-reviewed）:

````text
資金のエスクロー
````

## fence:203-272/line:42

原文:

````text
[Funds Escrowed Credential]<br/>(contains PaymentInstruction hash)
````

日本語補足（agent-reviewed）:

````text
【資金エスクロー資格情報】<br/>（PaymentInstructionのハッシュを含む）
````

## fence:203-272/line:42

原文:

````text
Funds Escrowed Credential
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
資金預託の資格情報
````

## fence:203-272/line:44

原文:

````text
Send Funds Escrowed Credential
````

日本語補足（agent-reviewed）:

````text
資金エスクロー資格情報を送信
````

## fence:203-272/line:45

原文:

````text
Send Funds Escrowed Credential
````

日本語補足（agent-reviewed）:

````text
資金エスクロー資格情報を送信
````

## fence:203-272/line:47

原文:

````text
Step 6: Hotel Confirmation & Service Delivery
````

日本語補足（agent-reviewed）:

````text
手順6：ホテルの確認とサービス提供
````

## fence:203-272/line:49

原文:

````text
[Booking Finalized Credential (Optional)]<br/>(contains FundsEscrowed hash)
````

日本語補足（agent-reviewed）:

````text
【予約完了資格情報（任意）】<br/>（FundsEscrowedのハッシュを含む）
````

## fence:203-272/line:49

原文:

````text
Booking Finalized Credential (Optional)
````

日本語補足（agent-reviewed）:

````text
予約完了資格情報（任意）
````

## fence:203-272/line:51

原文:

````text
Send Booking Finalized Credential (Optional)
````

日本語補足（agent-reviewed）:

````text
予約完了資格情報を送信（任意）
````

## fence:203-272/line:53

原文:

````text
Provide Service
````

日本語補足（agent-reviewed）:

````text
サービスを提供
````

## fence:203-272/line:54

原文:

````text
Service Completion Notification
````

日本語補足（agent-reviewed）:

````text
サービス完了通知
````

## fence:203-272/line:56

原文:

````text
Step 7: User Confirms Fund Release
````

日本語補足（agent-reviewed）:

````text
手順7：利用者が資金の払い出しを確認
````

## fence:203-272/line:58

原文:

````text
[Service Completion Confirmation Credential]<br/>(contains FundsEscrowed or BookingFinalized hash)
````

日本語補足（agent-reviewed）:

````text
【サービス完了確認資格情報】<br/>（FundsEscrowedまたはBookingFinalizedのハッシュを含む）
````

## fence:203-272/line:58

原文:

````text
Service Completion Confirmation Credential
````

日本語補足（agent-reviewed）:

````text
サービス完了確認資格情報
````

## fence:203-272/line:60

原文:

````text
Send Service Completion Confirmation Credential
````

日本語補足（agent-reviewed）:

````text
サービス完了確認資格情報を送信
````

## fence:203-272/line:64

原文:

````text
[Funds Released Credential]<br/>(contains ServiceCompletionConfirmation hash)
````

日本語補足（agent-reviewed）:

````text
【資金払い出し資格情報】<br/>（ServiceCompletionConfirmationのハッシュを含む）
````

## fence:203-272/line:64

原文:

````text
Funds Released Credential
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
資金解放の資格情報
````

## fence:203-272/line:66

原文:

````text
Send Funds Released Credential
````

日本語補足（agent-reviewed）:

````text
資金払い出し資格情報を送信
````

## fence:203-272/line:67

原文:

````text
Send Funds Released Credential
````

日本語補足（agent-reviewed）:

````text
資金払い出し資格情報を送信
````

## fence:203-272/line:68

原文:

````text
Transfer funds to hotel account
````

日本語補足（agent-reviewed）:

````text
ホテルの口座へ資金を移す
````
