# 画像の文字ラベル対応訳（目視照合済み）

原画像: [blogs/images/agent-network/connect.png](../../../blogs/images/agent-network/connect.png)

SHA-256: `c5cdd5b5ae9e96e9b55fc6ed0f9e713b7c57715882a210ac2b599e4dcbbc27ae`

抽出: `rapidocr-onnxruntime-1.4.4-local` / `ocr-text-unverified`

翻訳状態: `all-visible-text-visually-reviewed-and-translated`

原画像を目視して、見えているラベルの文字起こしと日本語訳を照合しました。OCRの誤認識は対応JSONのtranscribed_sourceで訂正し、認識された元の文字列sourceも保持しています。図の配置・矢印・関係は原画像で確認してください。

![原画像](../../../blogs/images/agent-network/connect.png)

| ID | 原文 | 日本語 | 翻訳・確認状態 |
| --- | --- | --- | --- |
| L001 | 供给找到需求 | 供給側が需要を見つける | agent-reviewed-label-translation |
| L002 | 酒店 | ホテル | agent-reviewed-label-translation |
| L003 | 景点 | 観光地 | agent-reviewed-label-translation |
| L004 | 火车 | 鉄道 | agent-reviewed-label-translation |
| L005 | 航班 | 航空便 | agent-reviewed-label-translation |
| L006 | 地图 | 地図 | agent-reviewed-label-translation |
| L007 | 快递 | 宅配便 | agent-reviewed-label-translation |
| L008 | 天气 | 天気 | agent-reviewed-label-translation |
| L009 | 汇率 | 為替レート | agent-reviewed-label-translation |
| L010 | 视频 | 動画 | agent-reviewed-label-translation |
| L011 | C端AI应用 | 消費者向けAIアプリ | agent-reviewed-label-translation |
| L012 | ChatBot | チャットボット | agent-reviewed-label-translation |
| L013 | Agent | エージェント | agent-reviewed-label-translation |
| L014 | 需求连接供给 | 需要を供給へつなぐ | agent-reviewed-label-translation |
| L015 | ... | …（その他） | agent-reviewed-label-translation |
| L016 | ....... | …（その他） | agent-reviewed-label-translation |

認識座標・confidence・SVG要素情報は[対応するJSON](c5cdd5b5ae9e96e9.json)に保持しています。
