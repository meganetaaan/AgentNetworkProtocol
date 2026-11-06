# 画像の文字ラベル対応訳（目視照合済み）

原画像: [blogs/images/12-ANP-from-scratch-cn-png/14-e2ee-off.png](../../../blogs/images/12-ANP-from-scratch-cn-png/14-e2ee-off.png)

SHA-256: `d3bc6a1e0d3baed8bf91bcc1b4de4b42acf965df86a312ea794542aae089849f`

抽出: `rapidocr-onnxruntime-1.4.4-local` / `ocr-text-unverified`

翻訳状態: `all-visible-text-visually-reviewed-and-translated`

原画像を目視して、見えているラベルの文字起こしと日本語訳を照合しました。OCRの誤認識は対応JSONのtranscribed_sourceで訂正し、認識された元の文字列sourceも保持しています。図の配置・矢印・関係は原画像で確認してください。

原図の注記: 錠前の開閉は図形として保持。暗号文は省略例であり、有効な暗号値を示さない。

![原画像](../../../blogs/images/12-ANP-from-scratch-cn-png/14-e2ee-off.png)

| ID | 原文 | 日本語 | 翻訳・確認状態 |
| --- | --- | --- | --- |
| L001 | 发信人 | 送信者 | agent-reviewed-label-translation |
| L002 | 中转服务器 | 中継サーバー | agent-reviewed-label-translation |
| L003 | 收信人 | 受信者 | agent-reviewed-label-translation |
| L004 | 负责投递 | 配送を担当 | agent-reviewed-label-translation |
| L005 | 中转服务器看到的内容 | 中継サーバーから見える内容 | agent-reviewed-label-translation |
| L006 | 「帮我订一杯燕麦拿铁，送到公司前台」 | 「オーツミルクのラテを1杯注文して、会社の受付まで届けてください。」 | agent-reviewed-label-translation |

認識座標・confidence・SVG要素情報は[対応するJSON](d3bc6a1e0d3baed8.json)に保持しています。
