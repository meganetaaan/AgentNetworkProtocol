# 画像の文字ラベル対応訳（目視照合済み）

原画像: [blogs/images/did-wba-auth.png](../../../blogs/images/did-wba-auth.png)

SHA-256: `a7efcf96f0b45ac9366a55eaeadd5faf3f787b4d4d06f84f72e0ee06df745349`

抽出: `rapidocr-onnxruntime-1.4.4-local` / `ocr-text-unverified`

翻訳状態: `all-visible-text-visually-reviewed-and-translated`

原画像を目視して、見えているラベルの文字起こしと日本語訳を照合しました。OCRの誤認識は対応JSONのtranscribed_sourceで訂正し、認識された元の文字列sourceも保持しています。図の配置・矢印・関係は原画像で確認してください。

![原画像](../../../blogs/images/did-wba-auth.png)

| ID | 原文 | 日本語 | 翻訳・確認状態 |
| --- | --- | --- | --- |
| L001 | Agent A DID Server | エージェントAのDIDサーバー | agent-reviewed-label-translation |
| L002 | ③ Get DID Document : （OCR認識: GetDID Document:） | ③ DIDドキュメントを取得： | agent-reviewed-label-translation |
| L003 | did:wba:alice.com:a | did:wba:alice.com:a | agent-reviewed-label-translation |
| L004 | ② HTTP Request : （OCR認識: HTTP Request :） | ② HTTPリクエスト： | agent-reviewed-label-translation |
| L005 | did:wba:alice.com:a,signature | did:wba:alice.com:a、署名 | agent-reviewed-label-translation |
| L006 | Agent A | エージェントA | agent-reviewed-label-translation |
| L007 | Agent B | エージェントB | agent-reviewed-label-translation |
| L008 | www.alice.com | www.alice.com | agent-reviewed-label-translation |
| L009 | www.bob.com | www.bob.com | agent-reviewed-label-translation |
| L010 | ⑤ HTTP Response : Access Token （OCR認識: HTTP Response : Access Token） | ⑤ HTTPレスポンス：アクセストークン | agent-reviewed-label-translation |
| L011 | ⑥ HTTP Request : Access Token （OCR認識: HTTP Request:AccessToken） | ⑥ HTTPリクエスト：アクセストークン | agent-reviewed-label-translation |
| L012 | ① Sign the HTTP request （OCR認識: ①Sign theHTTP request） | ① HTTPリクエストに署名する | agent-reviewed-label-translation |
| L013 | ④ Verify the signature using the （OCR認識: @ Verify the signature using the） | ④ AのDIDドキュメント内の公開鍵を使って | agent-reviewed-label-translation |
| L014 | using A&#x27;s private key. | Aの秘密鍵を使う。 | agent-reviewed-label-translation |
| L015 | public key from A&#x27;s DID document. | 署名を検証する。 | agent-reviewed-label-translation |

認識座標・confidence・SVG要素情報は[対応するJSON](a7efcf96f0b45ac9.json)に保持しています。
