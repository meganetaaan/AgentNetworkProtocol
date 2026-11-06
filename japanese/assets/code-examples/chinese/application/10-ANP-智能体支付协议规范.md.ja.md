# chinese/application/10-ANP-智能体支付协议规范.md のコード例・図ラベルの日本語補足

原文: [chinese/application/10-ANP-智能体支付协议规范.md](../../../../../chinese/application/10-ANP-智能体支付协议规范.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:168-211/line:2

原文:

````text
用户
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
ユーザー
````

## fence:168-211/line:3

原文:

````text
购物者智能体<br/>(Shopper Agent)
````

日本語補足（agent-reviewed）:

````text
買い物エージェント<br/>（Shopper Agent）
````

## fence:168-211/line:4

原文:

````text
商户智能体<br/>(Merchant Agent)
````

日本語補足（agent-reviewed）:

````text
加盟店エージェント<br/>（Merchant Agent）
````

## fence:168-211/line:5

原文:

````text
支付处理方<br/>(Payment Processor)
````

日本語補足（agent-reviewed）:

````text
支払い処理者<br/>（Payment Processor）
````

## fence:168-211/line:7

原文:

````text
阶段1: 购物车创建
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
段階1: ショッピングカートの作成
````

## fence:168-211/line:8

原文:

````text
1. 发起购买请求<br/>(选择商品、数量、配置)
````

日本語補足（agent-reviewed）:

````text
1. 購入要求を開始<br/>（商品、数量、構成を選択）
````

## fence:168-211/line:9

原文:

````text
2. create_cart_mandate<br/>(商品SKU、数量、收货地址)
````

日本語補足（agent-reviewed）:

````text
2. create_cart_mandate<br/>（商品のSKU、数量、配送先住所）
````

## fence:168-211/line:10

原文:

````text
3. 生成订单<br/>计算总价<br/>生成支付二维码
````

日本語補足（agent-reviewed）:

````text
3. 注文を生成<br/>総額を計算<br/>支払い用QRコードを生成
````

## fence:168-211/line:11

原文:

````text
4. 计算cart_hash<br/>使用私钥签名生成<br/>merchant_authorization
````

日本語補足（agent-reviewed）:

````text
4. cart_hashを計算<br/>秘密鍵で署名して<br/>merchant_authorizationを生成
````

## fence:168-211/line:12

原文:

````text
5. CartMandate<br/>(订单详情 + 二维码 + 商户签名)
````

日本語補足（agent-reviewed）:

````text
5. CartMandate<br/>（注文の詳細＋QRコード＋加盟店の署名）
````

## fence:168-211/line:14

原文:

````text
阶段2: 用户授权
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
段階2: ユーザーによる認可
````

## fence:168-211/line:15

原文:

````text
6. 展示订单信息<br/>(商品、价格、支付二维码)
````

日本語補足（agent-reviewed）:

````text
6. 注文情報を表示<br/>（商品、価格、支払い用QRコード）
````

## fence:168-211/line:16

原文:

````text
7. 扫码支付<br/>(支付宝/微信)
````

日本語補足（agent-reviewed）:

````text
7. QRコードを読み取って支払う<br/>（Alipay/WeChat）
````

## fence:168-211/line:17

原文:

````text
8. 完成第三方支付<br/>(获得支付凭证)
````

日本語補足（agent-reviewed）:

````text
8. 第三者決済を完了<br/>（支払い証明を取得）
````

## fence:168-211/line:18

原文:

````text
9. 授权支付<br/>(提供支付凭证)
````

日本語補足（agent-reviewed）:

````text
9. 支払いを認可<br/>（支払い証明を提供）
````

## fence:168-211/line:20

原文:

````text
阶段3: 支付处理
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
段階3: 決済処理
````

## fence:168-211/line:21

原文:

````text
10. 计算pmt_hash<br/>(PaymentMandateContents)
````

日本語補足（agent-reviewed）:

````text
10. pmt_hashを計算<br/>（PaymentMandateContents）
````

## fence:168-211/line:22

原文:

````text
11. 使用用户私钥签名<br/>生成user_authorization
````

日本語補足（agent-reviewed）:

````text
11. 利用者の秘密鍵で署名<br/>user_authorizationを生成
````

## fence:168-211/line:23

原文:

````text
12. send_payment_mandate<br/>(PaymentMandate + 用户授权签名 + webhook_url)
````

日本語補足（agent-reviewed）:

````text
12. send_payment_mandate<br/>（PaymentMandate＋利用者の認可署名＋webhook_url）
````

## fence:168-211/line:25

原文:

````text
13. 验证签名<br/>- 验证merchant_authorization<br/>- 验证user_authorization<br/>- 校验cart_hash和pmt_hash
````

日本語補足（agent-reviewed）:

````text
13. 署名を検証<br/>- merchant_authorizationを検証<br/>- user_authorizationを検証<br/>- cart_hashとpmt_hashを検証
````

## fence:168-211/line:26

原文:

````text
14. 请求支付确认<br/>(支付凭证)
````

日本語補足（agent-reviewed）:

````text
14. 支払い確認を要求<br/>（支払い証明）
````

## fence:168-211/line:27

原文:

````text
15. 验证支付状态
````

日本語補足（agent-reviewed）:

````text
15. 支払い状況を検証
````

## fence:168-211/line:28

原文:

````text
16. 支付结果<br/>(成功/失败)
````

日本語補足（agent-reviewed）:

````text
16. 支払い結果<br/>（成功／失敗）
````

## fence:168-211/line:30

原文:

````text
阶段4: 交付确认
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
段階4: 引き渡しの確認
````

## fence:168-211/line:31

原文:

````text
支付成功
````

日本語補足（agent-reviewed）:

````text
支払い成功
````

## fence:168-211/line:32

原文:

````text
17. 同步返回交易成功<br/>(transaction_id)
````

日本語補足（agent-reviewed）:

````text
17. 取引成功を同期的に返す<br/>（transaction_id）
````

## fence:168-211/line:33

原文:

````text
18. Webhook推送PaymentReceipt<br/>(支付凭证 + pmt_hash)
````

日本語補足（agent-reviewed）:

````text
18. WebhookでPaymentReceiptを配信<br/>（支払い証明＋pmt_hash）
````

## fence:168-211/line:34

原文:

````text
19. 通知支付成功<br/>显示订单状态
````

日本語補足（agent-reviewed）:

````text
19. 支払い成功を通知<br/>注文状況を表示
````

## fence:168-211/line:35

原文:

````text
20. 安排发货/服务提供
````

日本語補足（agent-reviewed）:

````text
20. 発送／サービス提供を手配
````

## fence:168-211/line:36

原文:

````text
21. Webhook推送FulfillmentReceipt<br/>(发货信息 + pmt_hash)
````

日本語補足（agent-reviewed）:

````text
21. WebhookでFulfillmentReceiptを配信<br/>（発送情報＋pmt_hash）
````

## fence:168-211/line:37

原文:

````text
22. 通知发货信息<br/>显示物流状态
````

日本語補足（agent-reviewed）:

````text
22. 発送情報を通知<br/>配送状況を表示
````

## fence:168-211/line:38

原文:

````text
支付失败
````

日本語補足（agent-reviewed）:

````text
支払い失敗
````

## fence:168-211/line:39

原文:

````text
17. 返回交易失败<br/>(错误信息)
````

日本語補足（agent-reviewed）:

````text
17. 取引失敗を返す<br/>（エラーメッセージ）
````

## fence:168-211/line:40

原文:

````text
18. Webhook推送PaymentReceipt<br/>(失败状态)
````

日本語補足（agent-reviewed）:

````text
18. WebhookでPaymentReceiptを配信<br/>（失敗状態）
````

## fence:168-211/line:41

原文:

````text
19. 通知支付失败<br/>显示失败原因
````

日本語補足（agent-reviewed）:

````text
19. 支払い失敗を通知<br/>失敗の理由を表示
````

## fence:258-275//name

原文:

````text
Grand Hotel Assistant
````

日本語補足（agent-reviewed）:

````text
Grand Hotel Assistant（Grand Hotelのアシスタント）
````

## fence:258-275//interfaces/0/description

原文:

````text
基于ANP协议的AP2协议实现,用于智能体之间的支付和交易
````

日本語補足（agent-reviewed）:

````text
ANPプロトコルに基づくAP2プロトコルの実装。エージェント間の支払いと取引に使用します。
````

## fence:281-301//roles/merchant/description

原文:

````text
商户智能体 - 生成购物车、创建二维码订单、推送支付凭证和履约凭证
````

日本語補足（agent-reviewed）:

````text
加盟店エージェント：カートを生成し、QRコード付き注文を作成し、支払い証明と履行証明を配信します。
````

## fence:281-301//roles/shopper/description

原文:

````text
购物者智能体(Shopper Agent) - 处理用户交互、接收凭证推送
````

日本語補足（agent-reviewed）:

````text
買い物エージェント（Shopper Agent）：利用者とのやり取りを処理し、証明の配信を受信します。
````

## fence:313-338/line:6:column:22

原文:

````text
An implementation of the AP2 protocol based on the ANP protocol, used for payment and transactions between agents.
````

日本語補足（agent-reviewed）:

````text
ANPプロトコルに基づくAP2プロトコルの実装。エージェント間の支払いと取引に使用します。
````

## fence:313-338/line:11:column:28

原文:

````text
shopper Agent - handles user interaction, PIN validation, QR code display
````

日本語補足（agent-reviewed）:

````text
買い物エージェント：利用者とのやり取り、PIN検証、QRコード表示を処理します。
````

## fence:313-338/line:17:column:28

原文:

````text
Merchant Agent - generates cart, creates QR orders, issues delivery receipts
````

日本語補足（agent-reviewed）:

````text
加盟店エージェント：カートを生成し、QRコード付き注文を作成し、引き渡しの受領証を発行します。
````

## fence:349-425//contents/payment_request/details/displayItems/0/label

原文:

````text
Nike Air Max 90
````

日本語補足（technical-retained）:

````text
Nike Air Max 90
````

注: 商品名の固有表記を保持。

## fence:735-763//contents/metadata/notes

原文:

````text
已发货,请注意查收
````

日本語補足（agent-reviewed）:

````text
発送済みです。お受け取りください。
````

## fence:850-896//data/contents/payment_request/details/displayItems/0/label

原文:

````text
Nike Air Max 90
````

日本語補足（technical-retained）:

````text
Nike Air Max 90
````

注: 商品名の固有表記を保持。

## fence:946-958//data/message

原文:

````text
支付处理成功
````

日本語補足（agent-reviewed）:

````text
支払いを正常に処理しました
````

## fence:999-1006

原文:

````text
CartMandate(cart_hash)
    ↓ (同步)
PaymentMandate(cart_hash, pmt_hash)
    ↓ (异步Webhook)
    ├─→ PaymentReceipt(pmt_hash, cred_hash)
    └─→ FulfillmentReceipt(pmt_hash, cred_hash)
````

日本語補足（agent-reviewed）:

````text
CartMandate(cart_hash)
 ↓ 同期
PaymentMandate(cart_hash, pmt_hash)
 ↓ 非同期Webhook
 ├→ PaymentReceipt(pmt_hash, cred_hash)
 └→ FulfillmentReceipt(pmt_hash, cred_hash)
````
