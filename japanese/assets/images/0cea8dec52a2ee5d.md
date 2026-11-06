# 画像の文字ラベル対応訳（目視照合済み）

原画像: [blogs/images/12-ANP-from-scratch-cn-png/03-identity.png](../../../blogs/images/12-ANP-from-scratch-cn-png/03-identity.png)

SHA-256: `0cea8dec52a2ee5d2245a6ec9cafa968f9f67c97203d5229c639b5e387e86028`

抽出: `rapidocr-onnxruntime-1.4.4-local` / `ocr-text-unverified`

翻訳状態: `all-visible-text-visually-reviewed-and-translated`

原画像を目視して、見えているラベルの文字起こしと日本語訳を照合しました。OCRの誤認識は対応JSONのtranscribed_sourceで訂正し、認識された元の文字列sourceも保持しています。図の配置・矢印・関係は原画像で確認してください。

![原画像](../../../blogs/images/12-ANP-from-scratch-cn-png/03-identity.png)

| ID | 原文 | 日本語 | 翻訳・確認状態 |
| --- | --- | --- | --- |
| L001 | O | 文字ではない（アイコンの線をOCRが誤検出） | visually-confirmed-nontext-ocr-false-positive |
| L002 | 三 | 文字ではない（アイコンの線をOCRが誤検出） | visually-confirmed-nontext-ocr-false-positive |
| L003 | 一个ANP身份 | 1つのANPのID | agent-reviewed-label-translation |
| L004 | 它同时是一个能打开的地址 | 同時に、アクセスして開けるアドレスでもある | agent-reviewed-label-translation |
| L005 | 看着像乱码，其实分五段 | 文字化けのように見えるが、実際には5つの部分に分かれている | agent-reviewed-label-translation |

認識座標・confidence・SVG要素情報は[対応するJSON](0cea8dec52a2ee5d.json)に保持しています。
