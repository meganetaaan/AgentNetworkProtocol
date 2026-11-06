# 画像の文字ラベル対応訳（目視照合済み）

原画像: [images/did-as-identity-bridge.png](../../../images/did-as-identity-bridge.png)

SHA-256: `4baaaeccbaea81ffc6586f2ce9385ff45b47dec3eee3c87218f012a5a9e5f0e9`

抽出: `rapidocr-onnxruntime-1.4.4-local` / `ocr-text-unverified`

翻訳状態: `all-visible-text-visually-reviewed-and-translated`

原画像を目視して、見えているラベルの文字起こしと日本語訳を照合しました。OCRの誤認識は対応JSONのtranscribed_sourceで訂正し、認識された元の文字列sourceも保持しています。図の配置・矢印・関係は原画像で確認してください。

![原画像](../../../images/did-as-identity-bridge.png)

| ID | 原文 | 日本語 | 翻訳・確認状態 |
| --- | --- | --- | --- |
| L001 | Centralized Identifier | 集中型の識別子 | agent-reviewed-label-translation |
| L002 | Federated Identifier | 連合型の識別子 | agent-reviewed-label-translation |
| L003 | System | システム | agent-reviewed-label-translation |
| L004 | System | システム | agent-reviewed-label-translation |
| L005 | Decentralized | 分散型の | agent-reviewed-label-translation |
| L006 | Decentralized | 分散型の | agent-reviewed-label-translation |
| L007 | Identifier | 識別子 | agent-reviewed-label-translation |
| L008 | Identifier | 識別子 | agent-reviewed-label-translation |
| L009 | Native Decentralized （OCR認識: NativeDecentralized） | 本来の分散型の | agent-reviewed-label-translation |
| L010 | Identifier | 識別子 | agent-reviewed-label-translation |

認識座標・confidence・SVG要素情報は[対応するJSON](4baaaeccbaea81ff.json)に保持しています。
