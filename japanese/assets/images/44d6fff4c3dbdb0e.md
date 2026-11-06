# 画像の文字ラベル対応訳（目視照合済み）

原画像: [blogs/images/12-ANP-from-scratch-en-png/11-adjson.png](../../../blogs/images/12-ANP-from-scratch-en-png/11-adjson.png)

SHA-256: `44d6fff4c3dbdb0eed3ef57105b8386506026bc7a7b2bb36b6cd895e949f00aa`

抽出: `rapidocr-onnxruntime-1.4.4-local` / `ocr-text-unverified`

翻訳状態: `all-visible-text-visually-reviewed-and-translated`

原画像を目視して、見えているラベルの文字起こしと日本語訳を照合しました。OCRの誤認識は対応JSONのtranscribed_sourceで訂正し、認識された元の文字列sourceも保持しています。図の配置・矢印・関係は原画像で確認してください。

![原画像](../../../blogs/images/12-ANP-from-scratch-en-png/11-adjson.png)

| ID | 原文 | 日本語 | 翻訳・確認状態 |
| --- | --- | --- | --- |
| L001 | Visiting assistant | 訪問側のアシスタント | agent-reviewed-label-translation |
| L002 | ad.json | ad.json | agent-reviewed-label-translation |
| L003 | Coffee shop program （OCR認識: Coffeeshopprogram） | コーヒー店のプログラム | agent-reviewed-label-translation |
| L004 | &quot;What can you do?&quot; | 「何ができますか？」 | agent-reviewed-label-translation |
| L005 | the menu board out front （OCR認識: themenuboardoutfront） | 店先のメニュー看板 | agent-reviewed-label-translation |
| L006 | Name, owner, what is on offer, which URL each lives at, whether authentication comes first | 名前、所有者、提供内容、各項目のURL、認証が先に必要かどうか | agent-reviewed-label-translation |

認識座標・confidence・SVG要素情報は[対応するJSON](44d6fff4c3dbdb0e.json)に保持しています。
