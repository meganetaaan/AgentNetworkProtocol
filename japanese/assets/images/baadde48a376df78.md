# 画像の文字ラベル対応訳（目視照合済み）

原画像: [blogs/images/agent-authorization/agent-interact.png](../../../blogs/images/agent-authorization/agent-interact.png)

SHA-256: `baadde48a376df78452f001ff02216d4f7330d2d49b1ac2d50875c4d7bee76b4`

抽出: `rapidocr-onnxruntime-1.4.4-local` / `ocr-text-unverified`

翻訳状態: `all-visible-text-visually-reviewed-and-translated`

原画像を目視して、見えているラベルの文字起こしと日本語訳を照合しました。OCRの誤認識は対応JSONのtranscribed_sourceで訂正し、認識された元の文字列sourceも保持しています。図の配置・矢印・関係は原画像で確認してください。

![原画像](../../../blogs/images/agent-authorization/agent-interact.png)

| ID | 原文 | 日本語 | 翻訳・確認状態 |
| --- | --- | --- | --- |
| L001 | HOTEL | ホテル | agent-reviewed-label-translation |
| L002 | Agent | エージェント | agent-reviewed-label-translation |
| L003 | Agent | エージェント | agent-reviewed-label-translation |
| L004 | Alice | Alice | agent-reviewed-label-translation |
| L005 | Hotel | ホテル | agent-reviewed-label-translation |
| L006 | 1. Alice authorizes her agent to act on her behalf to request | 1. Aliceは、自分に代わってホテルのエージェントへ照会する権限をエージェントに与える。 | agent-reviewed-label-translation |
| L007 | information from the hotel agent, such as room details and | 照会するのは客室の詳細や | agent-reviewed-label-translation |
| L008 | pricing. | 料金などの情報。 | agent-reviewed-label-translation |
| L009 | 2. Alice authorizes her agent to act on her behalf to book and | 2. Aliceは、自分に代わってホテルのエージェントを通じて客室を予約し、 | agent-reviewed-label-translation |
| L010 | pay for a hotel room through the hotel agent. | 代金を支払う権限をエージェントに与える。 | agent-reviewed-label-translation |

認識座標・confidence・SVG要素情報は[対応するJSON](baadde48a376df78.json)に保持しています。
