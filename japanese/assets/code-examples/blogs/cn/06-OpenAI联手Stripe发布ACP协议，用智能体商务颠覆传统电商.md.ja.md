# blogs/cn/06-OpenAI联手Stripe发布ACP协议，用智能体商务颠覆传统电商.md のコード例・図ラベルの日本語補足

原文: [blogs/cn/06-OpenAI联手Stripe发布ACP协议，用智能体商务颠覆传统电商.md](../../../../../blogs/cn/06-OpenAI联手Stripe发布ACP协议，用智能体商务颠覆传统电商.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:99-136/line:2

原文:

````text
用户
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
ユーザー
````

## fence:99-136/line:3

原文:

````text
ChatGPT(AI平台)
````

日本語補足（agent-reviewed）:

````text
ChatGPT（AIプラットフォーム）
````

## fence:99-136/line:4

原文:

````text
商户系统
````

日本語補足（agent-reviewed）:

````text
加盟店システム
````

## fence:99-136/line:5

原文:

````text
PSP(Stripe等)
````

日本語補足（agent-reviewed）:

````text
PSP（Stripeなど）
````

## fence:99-136/line:7

原文:

````text
步骤1: 用户选择商品
````

日本語補足（agent-reviewed）:

````text
手順1：利用者が商品を選ぶ
````

## fence:99-136/line:8

原文:

````text
在ChatGPT中浏览并选择商品
````

日本語補足（agent-reviewed）:

````text
ChatGPTで商品を閲覧して選ぶ
````

## fence:99-136/line:10

原文:

````text
步骤2: 创建购物会话
````

日本語補足（agent-reviewed）:

````text
手順2：購入セッションを作成
````

## fence:99-136/line:11

原文:

````text
调用 Checkout API 创建会话
````

日本語補足（agent-reviewed）:

````text
Checkout APIを呼び出してセッションを作成
````

## fence:99-136/line:12

原文:

````text
返回购物车详情(商品、价格、税费、配送方式)
````

日本語補足（agent-reviewed）:

````text
カートの詳細（商品、価格、税金、配送方法）を返す
````

## fence:99-136/line:14

原文:

````text
步骤3: 用户确认订单
````

日本語補足（agent-reviewed）:

````text
手順3：利用者が注文を確認
````

## fence:99-136/line:15

原文:

````text
展示购物车内容
````

日本語補足（agent-reviewed）:

````text
カートの内容を表示
````

## fence:99-136/line:16

原文:

````text
确认订单,准备付款
````

日本語補足（agent-reviewed）:

````text
注文を確認し、支払いを準備
````

## fence:99-136/line:18

原文:

````text
步骤4: 生成支付委托令牌
````

日本語補足（agent-reviewed）:

````text
手順4：支払い委任トークンを生成
````

## fence:99-136/line:19

原文:

````text
调用 Delegate Payment API,提交用户支付信息
````

日本語補足（agent-reviewed）:

````text
Delegate Payment APIを呼び出し、利用者の支払い情報を送信
````

## fence:99-136/line:20

原文:

````text
请求生成支付令牌(Token化用户支付方式)
````

日本語補足（agent-reviewed）:

````text
支払いトークンの生成を要求（利用者の支払い方法をトークン化）
````

## fence:99-136/line:21

原文:

````text
返回支付委托令牌(限定金额、有效期、用途)
````

日本語補足（agent-reviewed）:

````text
支払い委任トークンを返す（金額、有効期間、用途を限定）
````

## fence:99-136/line:22

原文:

````text
返回支付令牌
````

日本語補足（agent-reviewed）:

````text
支払いトークンを返す
````

## fence:99-136/line:24

原文:

````text
步骤5: 提交支付
````

日本語補足（agent-reviewed）:

````text
手順5：支払いを送信
````

## fence:99-136/line:25

原文:

````text
调用 Checkout Complete API,提交支付令牌
````

日本語補足（agent-reviewed）:

````text
Checkout Complete APIを呼び出し、支払いトークンを送信
````

## fence:99-136/line:27

原文:

````text
步骤6: 执行支付
````

日本語補足（agent-reviewed）:

````text
手順6：支払いを実行
````

## fence:99-136/line:28

原文:

````text
使用令牌请求支付授权与扣款
````

日本語補足（agent-reviewed）:

````text
トークンを使い、支払いの承認と引き落としを要求
````

## fence:99-136/line:29

原文:

````text
完成资金流转(用户卡→商户账户)
````

日本語補足（agent-reviewed）:

````text
資金移動を完了（利用者のカード→加盟店の口座）
````

## fence:99-136/line:31

原文:

````text
步骤7: 返回订单结果
````

日本語補足（agent-reviewed）:

````text
手順7：注文結果を返す
````

## fence:99-136/line:32

原文:

````text
生成订单记录
````

日本語補足（agent-reviewed）:

````text
注文記録を生成
````

## fence:99-136/line:33

原文:

````text
返回订单完成(订单ID、订单链接)
````

日本語補足（agent-reviewed）:

````text
注文完了を返す（注文ID、注文リンク）
````

## fence:99-136/line:35

原文:

````text
步骤8: 确认完成
````

日本語補足（agent-reviewed）:

````text
手順8：完了を確認
````

## fence:99-136/line:36

原文:

````text
告知订单已完成,展示订单信息
````

日本語補足（agent-reviewed）:

````text
注文完了を伝え、注文情報を表示
````
