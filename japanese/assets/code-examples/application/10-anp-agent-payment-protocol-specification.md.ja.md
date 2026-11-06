# application/10-anp-agent-payment-protocol-specification.md のコード例・図ラベルの日本語補足

原文: [application/10-anp-agent-payment-protocol-specification.md](../../../../application/10-anp-agent-payment-protocol-specification.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:148-189/line:3

原文:

````text
Shopper Agent<br/>(SA)
````

日本語補足（agent-reviewed）:

````text
買い手のAgent<br/>（SA）
````

## fence:148-189/line:4

原文:

````text
Merchant Agent<br/>(MA)
````

日本語補足（agent-reviewed）:

````text
販売者のAgent<br/>（MA）
````

## fence:148-189/line:5

原文:

````text
Payment Processor<br/>(PP)
````

日本語補足（agent-reviewed）:

````text
支払い処理事業者<br/>（PP）
````

## fence:148-189/line:7

原文:

````text
Phase 1: Cart Creation
````

日本語補足（agent-reviewed）:

````text
第1段階: カートの作成
````

## fence:148-189/line:8

原文:

````text
1. Initiate purchase<br/>(select items, quantity, options)
````

日本語補足（agent-reviewed）:

````text
1. 購入を開始する<br/>（商品、数量、オプションを選択）
````

## fence:148-189/line:9

原文:

````text
2. create_cart_mandate<br/>(product SKU, quantity, address)
````

日本語補足（agent-reviewed）:

````text
2. create_cart_mandate<br/>（商品SKU、数量、住所）
````

## fence:148-189/line:10

原文:

````text
3. Generate order<br/>Calculate total<br/>Generate payment QR code
````

日本語補足（agent-reviewed）:

````text
3. 注文を生成する<br/>合計金額を計算する<br/>支払い用QRコードを生成する
````

## fence:148-189/line:11

原文:

````text
4. Calculate cart_hash<br/>Sign with private key to generate<br/>merchant_authorization
````

日本語補足（agent-reviewed）:

````text
4. cart_hashを計算する<br/>秘密鍵で署名して<br/>merchant_authorizationを生成する
````

## fence:148-189/line:12

原文:

````text
5. CartMandate<br/>(order details + QR code + merchant signature)
````

日本語補足（agent-reviewed）:

````text
5. CartMandate<br/>（注文の詳細＋QRコード＋加盟店の署名）
````

## fence:148-189/line:14

原文:

````text
Phase 2: User Authorization
````

日本語補足（agent-reviewed）:

````text
フェーズ2：利用者による認可
````

## fence:148-189/line:15

原文:

````text
6. Display order info<br/>(items, price, payment QR code)
````

日本語補足（agent-reviewed）:

````text
6. 注文情報を表示<br/>（商品、価格、支払い用QRコード）
````

## fence:148-189/line:16

原文:

````text
7. Scan QR code to pay<br/>(Alipay/WeChat)
````

日本語補足（agent-reviewed）:

````text
7. QRコードを読み取って支払う<br/>（Alipay/WeChat）
````

## fence:148-189/line:17

原文:

````text
8. Complete third-party payment<br/>(obtain payment proof)
````

日本語補足（agent-reviewed）:

````text
8. 第三者決済を完了<br/>（支払い証明を取得）
````

## fence:148-189/line:18

原文:

````text
9. Authorize payment<br/>(provide payment proof)
````

日本語補足（agent-reviewed）:

````text
9. 支払いを認可<br/>（支払い証明を提供）
````

## fence:148-189/line:20

原文:

````text
Phase 3: Payment Processing
````

日本語補足（agent-reviewed）:

````text
フェーズ3：支払い処理
````

## fence:148-189/line:21

原文:

````text
10. Calculate transaction_data<br/>(cart_hash + pmt_hash)
````

日本語補足（agent-reviewed）:

````text
10. transaction_dataを計算<br/>（cart_hash＋pmt_hash）
````

## fence:148-189/line:22

原文:

````text
11. Sign with user private key<br/>generate user_authorization
````

日本語補足（agent-reviewed）:

````text
11. 利用者の秘密鍵で署名し<br/>user_authorizationを生成
````

## fence:148-189/line:23

原文:

````text
12. send_payment_mandate<br/>(PaymentMandate + user authorization)
````

日本語補足（agent-reviewed）:

````text
12. send_payment_mandate<br/>（PaymentMandate＋利用者の認可）
````

## fence:148-189/line:25

原文:

````text
13. Verify signatures<br/>- Verify merchant_authorization<br/>- Verify user_authorization<br/>- Validate cart_hash and pmt_hash
````

日本語補足（agent-reviewed）:

````text
13. 署名を検証<br/>- merchant_authorizationを検証<br/>- user_authorizationを検証<br/>- cart_hashとpmt_hashを検証
````

## fence:148-189/line:26

原文:

````text
14. Request payment confirmation<br/>(payment proof)
````

日本語補足（agent-reviewed）:

````text
14. 支払い確認を要求<br/>（支払い証明）
````

## fence:148-189/line:27

原文:

````text
15. Verify payment status
````

日本語補足（agent-reviewed）:

````text
15. 支払い状況を検証
````

## fence:148-189/line:28

原文:

````text
16. Payment result<br/>(success/failure)
````

日本語補足（agent-reviewed）:

````text
16. 支払い結果<br/>（成功／失敗）
````

## fence:148-189/line:30

原文:

````text
Phase 4: Delivery Confirmation
````

日本語補足（agent-reviewed）:

````text
フェーズ4：引き渡しの確認
````

## fence:148-189/line:31

原文:

````text
Payment Success
````

日本語補足（agent-reviewed）:

````text
支払い成功
````

## fence:148-189/line:32

原文:

````text
17. Arrange shipment/service provision
````

日本語補足（agent-reviewed）:

````text
17. 発送／サービス提供を手配
````

## fence:148-189/line:33

原文:

````text
18. Return transaction success<br/>(transaction_id)
````

日本語補足（agent-reviewed）:

````text
18. 取引成功を返す<br/>（transaction_id）
````

## fence:148-189/line:34

原文:

````text
19. Notify payment success<br/>Display order status
````

日本語補足（agent-reviewed）:

````text
19. 支払い成功を通知<br/>注文状況を表示
````

## fence:148-189/line:35

原文:

````text
20. (Optional) Send DeliveryReceipt
````

日本語補足（agent-reviewed）:

````text
20. （任意）DeliveryReceiptを送信
````

## fence:148-189/line:36

原文:

````text
21. DeliveryReceipt<br/>(shipment info/service proof)
````

日本語補足（agent-reviewed）:

````text
21. DeliveryReceipt<br/>（発送情報／サービスの証明）
````

## fence:148-189/line:37

原文:

````text
Payment Failure
````

日本語補足（agent-reviewed）:

````text
支払い失敗
````

## fence:148-189/line:38

原文:

````text
18. Return transaction failure<br/>(error message)
````

日本語補足（agent-reviewed）:

````text
18. 取引失敗を返す<br/>（エラーメッセージ）
````

## fence:148-189/line:39

原文:

````text
19. Notify payment failure<br/>Display failure reason
````

日本語補足（agent-reviewed）:

````text
19. 支払い失敗を通知<br/>失敗の理由を表示
````

## fence:232-249//name

原文:

````text
Grand Hotel Assistant
````

日本語補足（agent-reviewed）:

````text
Grand Hotel Assistant（Grand Hotelのアシスタント）
````

## fence:232-249//interfaces/0/description

原文:

````text
An implementation of the AP2 protocol based on the ANP protocol, used for payment and transactions between agents.
````

日本語補足（agent-reviewed）:

````text
ANPプロトコルに基づくAP2プロトコルの実装。エージェント間の支払いと取引に使用します。
````

## fence:255-274//roles/merchant/description

原文:

````text
Merchant Agent - generates cart, creates QR orders, issues delivery receipts
````

日本語補足（agent-reviewed）:

````text
加盟店エージェント：カートを生成し、QRコード付き注文を作成し、引き渡しの受領証を発行します。
````

## fence:255-274//roles/shopper/description

原文:

````text
Shopper Agent - handles user interaction, PIN validation, QR code display
````

日本語補足（agent-reviewed）:

````text
買い物エージェント：利用者とのやり取り、PIN検証、QRコード表示を処理します。
````

## fence:280-309//description

原文:

````text
AP2 protocol implementation supporting payment and transaction operations
````

日本語補足（agent-reviewed）:

````text
支払いと取引操作に対応するAP2プロトコルの実装
````

## fence:280-309//content/roles/merchant/description

原文:

````text
Merchant Agent - hotel booking service provider
````

日本語補足（agent-reviewed）:

````text
加盟店エージェント：ホテル予約サービスの提供者
````

## fence:280-309//content/roles/merchant/create_cart_mandate/description

原文:

````text
Create a cart mandate for a hotel booking
````

日本語補足（agent-reviewed）:

````text
ホテル予約のカート委任状を作成
````

## fence:280-309//content/roles/merchant/create_cart_mandate/item_schema/properties/hotel_id/description

原文:

````text
Hotel ID
````

日本語補足（agent-reviewed）:

````text
ホテルID
````

## fence:280-309//content/roles/merchant/create_cart_mandate/item_schema/properties/rate_plan_id/description

原文:

````text
Rate plan ID
````

日本語補足（agent-reviewed）:

````text
料金プランID
````

## fence:280-309//content/roles/merchant/create_cart_mandate/item_schema/properties/room_num/description

原文:

````text
Number of rooms
````

日本語補足（agent-reviewed）:

````text
客室数
````

## fence:280-309//content/roles/merchant/create_cart_mandate/item_schema/properties/check_in_date/description

原文:

````text
Check-in date (YYYY-MM-DD)
````

日本語補足（agent-reviewed）:

````text
チェックイン日（YYYY-MM-DD）
````

## fence:280-309//content/roles/merchant/create_cart_mandate/item_schema/properties/check_out_date/description

原文:

````text
Check-out date (YYYY-MM-DD)
````

日本語補足（agent-reviewed）:

````text
チェックアウト日（YYYY-MM-DD）
````

## fence:319-387//contents/payment_request/details/displayItems/0/label

原文:

````text
Nike Air Max 90
````

日本語補足（technical-retained）:

````text
Nike Air Max 90
````

注: 商品名の固有表記を保持。

## fence:491-524/line:2

原文:

````text
pip install pyjwt
````

日本語補足（technical-retained）:

````text
pip install pyjwt
````

注: 実行コマンドとパッケージ名を保持。

## fence:636-682//data/contents/payment_request/details/displayItems/0/label

原文:

````text
Nike Air Max 90
````

日本語補足（technical-retained）:

````text
Nike Air Max 90
````

注: 商品名の固有表記を保持。

## fence:730-742//data/message

原文:

````text
Payment processed successfully
````

日本語補足（agent-reviewed）:

````text
支払いを正常に処理しました
````
