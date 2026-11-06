# 画像の文字ラベル対応訳（目視照合済み）

原画像: [blogs/images/12-ANP-from-scratch-cn-png/06-step3.png](../../../blogs/images/12-ANP-from-scratch-cn-png/06-step3.png)

SHA-256: `adedaddd3ec0729d222a2122779876b2501a3cdcb70cab3a4c260dbc61a67cb8`

抽出: `rapidocr-onnxruntime-1.4.4-local` / `ocr-text-unverified`

翻訳状態: `all-visible-text-visually-reviewed-and-translated`

原画像を目視して、見えているラベルの文字起こしと日本語訳を照合しました。OCRの誤認識は対応JSONのtranscribed_sourceで訂正し、認識された元の文字列sourceも保持しています。図の配置・矢印・関係は原画像で確認してください。

![原画像](../../../blogs/images/12-ANP-from-scratch-cn-png/06-step3.png)

| ID | 原文 | 日本語 | 翻訳・確認状態 |
| --- | --- | --- | --- |
| L001 | 第3步/共5步 | 全5段階の第3段階 | agent-reviewed-label-translation |
| L002 | 压成固定长度的摘要 | 固定長のダイジェストに要約する | agent-reviewed-label-translation |

認識座標・confidence・SVG要素情報は[対応するJSON](adedaddd3ec0729d.json)に保持しています。
