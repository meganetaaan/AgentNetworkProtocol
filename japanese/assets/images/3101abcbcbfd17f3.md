# 画像の文字ラベル対応訳（目視照合済み）

原画像: [blogs/images/12-ANP-from-scratch-en-png/09-bad3.png](../../../blogs/images/12-ANP-from-scratch-en-png/09-bad3.png)

SHA-256: `3101abcbcbfd17f3d09298396838e022425acf90dcfd874d8c60a489a115da4c`

抽出: `rapidocr-onnxruntime-1.4.4-local` / `ocr-text-unverified`

翻訳状態: `all-visible-text-visually-reviewed-and-translated`

原画像を目視して、見えているラベルの文字起こしと日本語訳を照合しました。OCRの誤認識は対応JSONのtranscribed_sourceで訂正し、認識された元の文字列sourceも保持しています。図の配置・矢印・関係は原画像で確認してください。

原図の注記: 右下の×は拒否、チェックマークは受理を示す図形。本文ラベルを全照合した。

![原画像](../../../blogs/images/12-ANP-from-scratch-en-png/09-bad3.png)

| ID | 原文 | 日本語 | 翻訳・確認状態 |
| --- | --- | --- | --- |
| L001 | 1 attacker swaps the key | 1 攻撃者が鍵を差し替える | agent-reviewed-label-translation |
| L002 | 2 shop fetches as usual | 2 店がいつも通り取得する | agent-reviewed-label-translation |
| L003 | Attacker | 攻撃者 | agent-reviewed-label-translation |
| L004 | did.json on your domain | あなたのドメイン上のdid.json | agent-reviewed-label-translation |
| L005 | Real coffee shop | 本物のコーヒー店 | agent-reviewed-label-translation |
| L006 | controls your domain | あなたのドメインを支配している | agent-reviewed-label-translation |
| L007 | key has been swapped | 鍵が差し替えられた | agent-reviewed-label-translation |
| L008 | gets the fake key | 偽の鍵を取得する | agent-reviewed-label-translation |

認識座標・confidence・SVG要素情報は[対応するJSON](3101abcbcbfd17f3.json)に保持しています。
