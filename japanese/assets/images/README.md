# 画像の日本語対訳と確認台帳

原画像は変更せず、SHA-256ごとの対訳Markdownと認識座標付きJSONを追加しています。同一画像の重複パスは同じ対訳を参照します。原文の誤記・歴史的なURLや仕様主張は現行仕様に書き換えていません。

対象は基準コミット`0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`の画像212パス、重複を除く209画像です。形式別件数・寸法・SHA-256・確認状態は[画像一覧JSON](../images-inventory.json)に記録しています。

| 確認状態 | 元画像パス数 |
| --- | ---: |
| 全可視文字を目視照合済み | 162 |
| 原ファイルが空 | 1 |
| 可視文字訳済み・原画像に隠れ／切れあり | 8 |
| 可視の人向け文章訳済み・技術コード転記未確認 | 7 |
| SVGラベル訳文照合済み | 30 |
| 技術コードのみ・翻訳すべき説明文なし・原画素保持 | 1 |
| 可読文章訳済み・原画像に遮蔽／不鮮明文字あり | 3 |

ラスター画像は重複除外180画像すべてを実際に目視しました。残る未校閲機械訳ラベルは0件です。読める人向け文章とコメントは対訳し、技術コードの完全転記・原画像で読めない文字は別の確認範囲として記録しています。古い未校閲の機械訳キャッシュは成果物から除きました。


未校閲草稿は完訳として数えません。目視確認済みの画像でも原画像の欠けは補っていません。SVGはXMLのtext/foreignObjectに含まれる全文ラベルを訳文照合済みです。空のOAuth2.1.svgは元資料欠損です。PDF/PPTXのページOCRは別資料として扱い、この画像件数に含めません。

OCRは無料のローカルRapidOCRを使用しました。初期草稿作成時にはローカルArgosの中英・英日モデルを使いましたが、最終対訳は目視・手動訳または目視確認したPDFの手動訳で照合しています。APIキーや有料モデルは使用していません。草稿ではURL・識別子・数値等を翻訳器に渡さず保護していますが、それだけではOCRの正しさや文章の意味は保証されません。

[検証結果](verification-results.json)には元画像とGit基準のSHA-256比較、対訳ID、和訳欄、ローカルリンク、保護トークンの検査結果を記録しています。[再開チェックポイント](review-checkpoint.json)は完了・部分確認・未確認を原画像パスとSHA付きで分離しています。

抽出と更新の再現手順（Pillowが必要、--ocrにはrapidocr-onnxruntime==1.4.4が必要）:

```powershell
uv run --python ../ja-translate-venv/Scripts/python.exe --no-project scripts/extract-image-text.py --ocr
uv run --python ../ja-translate-venv/Scripts/python.exe --no-project scripts/extract-image-text.py --render
uv run --python ../ja-translate-venv/Scripts/python.exe --no-project scripts/extract-image-text.py
uv run --python ../ja-translate-venv/Scripts/python.exe --no-project scripts/extract-image-text.py --verify
```

`svg-ja-glossary.tsv`はSVGと目視済みラスター画像の共通対訳です。`svg-retained-labels.json`はそのまま保持すると明示確認した技術表記、`raster-visual-review.json`は目視結果と訂正、初期草稿の`local-mt-drafts.json`は最終成果物から除きました。--renderは抽出JSON・手動対訳・レビュー記録から生成でき、モデルを呼び出しません。--translate-draftsの初回実行には別途ローカル翻訳モデルが必要です。

| 原画像 | 日本語対訳 | 確認状態 |
| --- | --- | --- |
| [blogs/images/12-ANP-from-scratch-cn-png/01-worry-client.png](../../../blogs/images/12-ANP-from-scratch-cn-png/01-worry-client.png) | [対応訳](b1f705fd059843cd.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/01-worry-server.png](../../../blogs/images/12-ANP-from-scratch-cn-png/01-worry-server.png) | [対応訳](e69c63dbdc745ab4.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/02-apikeys-3.png](../../../blogs/images/12-ANP-from-scratch-cn-png/02-apikeys-3.png) | [対応訳](b7c4e31f97afca64.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/02-apikeys-6.png](../../../blogs/images/12-ANP-from-scratch-cn-png/02-apikeys-6.png) | [対応訳](8d05955cf3e3ef88.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/03-identity.png](../../../blogs/images/12-ANP-from-scratch-cn-png/03-identity.png) | [対応訳](0cea8dec52a2ee5d.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/04-resolve.png](../../../blogs/images/12-ANP-from-scratch-cn-png/04-resolve.png) | [対応訳](c41b4f9628c4731c.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/06-step1.png](../../../blogs/images/12-ANP-from-scratch-cn-png/06-step1.png) | [対応訳](b0968a0beb2cc50c.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/06-step2.png](../../../blogs/images/12-ANP-from-scratch-cn-png/06-step2.png) | [対応訳](d07acf22f7007a5c.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/06-step3.png](../../../blogs/images/12-ANP-from-scratch-cn-png/06-step3.png) | [対応訳](adedaddd3ec0729d.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/06-step4.png](../../../blogs/images/12-ANP-from-scratch-cn-png/06-step4.png) | [対応訳](108064b5a6bfa7dd.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/06-step5.png](../../../blogs/images/12-ANP-from-scratch-cn-png/06-step5.png) | [対応訳](49f30a6dda2dda30.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/08-gates-pass.png](../../../blogs/images/12-ANP-from-scratch-cn-png/08-gates-pass.png) | [対応訳](09058b99ea8f58d2.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/08-gates-stop1.png](../../../blogs/images/12-ANP-from-scratch-cn-png/08-gates-stop1.png) | [対応訳](8bd94ecc3f3c00d1.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/08-gates-stop2.png](../../../blogs/images/12-ANP-from-scratch-cn-png/08-gates-stop2.png) | [対応訳](be5dd3b79a95c19d.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/08-gates-stop3.png](../../../blogs/images/12-ANP-from-scratch-cn-png/08-gates-stop3.png) | [対応訳](9713a353e4e34d23.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/08-gates-stop4.png](../../../blogs/images/12-ANP-from-scratch-cn-png/08-gates-stop4.png) | [対応訳](38eafa18290def95.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/08-gates-stop5.png](../../../blogs/images/12-ANP-from-scratch-cn-png/08-gates-stop5.png) | [対応訳](8c4f27d04f65ca56.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/09-bad1.png](../../../blogs/images/12-ANP-from-scratch-cn-png/09-bad1.png) | [対応訳](fe781ee2010710b6.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/09-bad2.png](../../../blogs/images/12-ANP-from-scratch-cn-png/09-bad2.png) | [対応訳](28b80226c00b95f9.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/09-bad3.png](../../../blogs/images/12-ANP-from-scratch-cn-png/09-bad3.png) | [対応訳](7192d37c6fc18ba5.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/10-mint.png](../../../blogs/images/12-ANP-from-scratch-cn-png/10-mint.png) | [対応訳](480b6a37da679f9f.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/10-outcomes.png](../../../blogs/images/12-ANP-from-scratch-cn-png/10-outcomes.png) | [対応訳](e5ef3c95e06a6ea7.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/10-verify-e1-hacked.png](../../../blogs/images/12-ANP-from-scratch-cn-png/10-verify-e1-hacked.png) | [対応訳](e44d5a80f6146c78.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/10-verify-e1.png](../../../blogs/images/12-ANP-from-scratch-cn-png/10-verify-e1.png) | [対応訳](5d6db976f3ee4e0a.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/10-verify-noe1-hacked.png](../../../blogs/images/12-ANP-from-scratch-cn-png/10-verify-noe1-hacked.png) | [対応訳](a858cfe9b2254586.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/10-verify-noe1.png](../../../blogs/images/12-ANP-from-scratch-cn-png/10-verify-noe1.png) | [対応訳](90eb0483502bff60.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/11-adjson.png](../../../blogs/images/12-ANP-from-scratch-cn-png/11-adjson.png) | [対応訳](f6577148f38f627f.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/12-discovery.png](../../../blogs/images/12-ANP-from-scratch-cn-png/12-discovery.png) | [対応訳](dafcf923a40d1847.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/13-meta1.png](../../../blogs/images/12-ANP-from-scratch-cn-png/13-meta1.png) | [対応訳](740ad2cfbb24c024.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/13-meta2.png](../../../blogs/images/12-ANP-from-scratch-cn-png/13-meta2.png) | [対応訳](8dceb45f43ff81f7.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/13-meta3.png](../../../blogs/images/12-ANP-from-scratch-cn-png/13-meta3.png) | [対応訳](5d112a380ec24c84.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/13-meta4.png](../../../blogs/images/12-ANP-from-scratch-cn-png/13-meta4.png) | [対応訳](f9782fec7e448da1.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/14-e2ee-off.png](../../../blogs/images/12-ANP-from-scratch-cn-png/14-e2ee-off.png) | [対応訳](d3bc6a1e0d3baed8.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-cn-png/14-e2ee-on.png](../../../blogs/images/12-ANP-from-scratch-cn-png/14-e2ee-on.png) | [対応訳](1c675190df54982b.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/01-worry-client.png](../../../blogs/images/12-ANP-from-scratch-en-png/01-worry-client.png) | [対応訳](e7768cc98378c6b1.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/01-worry-server.png](../../../blogs/images/12-ANP-from-scratch-en-png/01-worry-server.png) | [対応訳](22d99ce1a6f5fb98.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/02-apikeys-3.png](../../../blogs/images/12-ANP-from-scratch-en-png/02-apikeys-3.png) | [対応訳](729de15d1cd74ba8.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/02-apikeys-6.png](../../../blogs/images/12-ANP-from-scratch-en-png/02-apikeys-6.png) | [対応訳](fcdb13411d5e42ef.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/03-identity.png](../../../blogs/images/12-ANP-from-scratch-en-png/03-identity.png) | [対応訳](6d03f5638fdf59e2.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/04-resolve.png](../../../blogs/images/12-ANP-from-scratch-en-png/04-resolve.png) | [対応訳](bd0990a2bbda9989.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/06-step1.png](../../../blogs/images/12-ANP-from-scratch-en-png/06-step1.png) | [対応訳](6603f0350d978b7f.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/06-step2.png](../../../blogs/images/12-ANP-from-scratch-en-png/06-step2.png) | [対応訳](ec13629e9246ee9a.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/06-step3.png](../../../blogs/images/12-ANP-from-scratch-en-png/06-step3.png) | [対応訳](8aa35a8a872fd4b4.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/06-step4.png](../../../blogs/images/12-ANP-from-scratch-en-png/06-step4.png) | [対応訳](4678dcc548a4a074.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/06-step5.png](../../../blogs/images/12-ANP-from-scratch-en-png/06-step5.png) | [対応訳](fc4591ad1a12d183.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/08-gates-pass.png](../../../blogs/images/12-ANP-from-scratch-en-png/08-gates-pass.png) | [対応訳](d518bef12003c23a.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/08-gates-stop1.png](../../../blogs/images/12-ANP-from-scratch-en-png/08-gates-stop1.png) | [対応訳](ca592ef2cb88e1f9.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/08-gates-stop2.png](../../../blogs/images/12-ANP-from-scratch-en-png/08-gates-stop2.png) | [対応訳](61b55734a22eaa21.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/08-gates-stop3.png](../../../blogs/images/12-ANP-from-scratch-en-png/08-gates-stop3.png) | [対応訳](78fe1fb11f28cab9.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/08-gates-stop4.png](../../../blogs/images/12-ANP-from-scratch-en-png/08-gates-stop4.png) | [対応訳](56384b5dfe9d82e3.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/08-gates-stop5.png](../../../blogs/images/12-ANP-from-scratch-en-png/08-gates-stop5.png) | [対応訳](69434f4e1ea7d0e2.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/09-bad1.png](../../../blogs/images/12-ANP-from-scratch-en-png/09-bad1.png) | [対応訳](159a64f0b7eb344e.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/09-bad2.png](../../../blogs/images/12-ANP-from-scratch-en-png/09-bad2.png) | [対応訳](0a99bedf87e279de.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/09-bad3.png](../../../blogs/images/12-ANP-from-scratch-en-png/09-bad3.png) | [対応訳](3101abcbcbfd17f3.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/10-mint.png](../../../blogs/images/12-ANP-from-scratch-en-png/10-mint.png) | [対応訳](1974c73ce301b91f.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/10-outcomes.png](../../../blogs/images/12-ANP-from-scratch-en-png/10-outcomes.png) | [対応訳](d7bed3ed680179cf.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/10-verify-e1-changed.png](../../../blogs/images/12-ANP-from-scratch-en-png/10-verify-e1-changed.png) | [対応訳](bf4fc2e8488418a9.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/10-verify-e1.png](../../../blogs/images/12-ANP-from-scratch-en-png/10-verify-e1.png) | [対応訳](b8e1c89d27d72f77.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/10-verify-noe1-changed.png](../../../blogs/images/12-ANP-from-scratch-en-png/10-verify-noe1-changed.png) | [対応訳](e6b958f6a3fcf02d.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/11-adjson.png](../../../blogs/images/12-ANP-from-scratch-en-png/11-adjson.png) | [対応訳](44d6fff4c3dbdb0e.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/12-discovery.png](../../../blogs/images/12-ANP-from-scratch-en-png/12-discovery.png) | [対応訳](71ae3a7b463405ae.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/13-meta1.png](../../../blogs/images/12-ANP-from-scratch-en-png/13-meta1.png) | [対応訳](234921a5939d265f.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/13-meta2.png](../../../blogs/images/12-ANP-from-scratch-en-png/13-meta2.png) | [対応訳](71011c1f68054c38.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/13-meta3.png](../../../blogs/images/12-ANP-from-scratch-en-png/13-meta3.png) | [対応訳](8e558ef29a45fb43.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/13-meta4.png](../../../blogs/images/12-ANP-from-scratch-en-png/13-meta4.png) | [対応訳](867726f3237ad22b.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/14-e2ee-off.png](../../../blogs/images/12-ANP-from-scratch-en-png/14-e2ee-off.png) | [対応訳](d8a5eae0e8b63350.md) | 全可視文字を目視照合済み |
| [blogs/images/12-ANP-from-scratch-en-png/14-e2ee-on.png](../../../blogs/images/12-ANP-from-scratch-en-png/14-e2ee-on.png) | [対応訳](d876d8b0bd3976ab.md) | 全可視文字を目視照合済み |
| [blogs/images/OAuth2.1.svg](../../../blogs/images/OAuth2.1.svg) | [対応訳](e3b0c44298fc1c14.md) | 原ファイルが空 |
| [blogs/images/a2a-id-auth.png](../../../blogs/images/a2a-id-auth.png) | [対応訳](da53ef42ec9e6546.md) | 全可視文字を目視照合済み |
| [blogs/images/a2a-partners.png](../../../blogs/images/a2a-partners.png) | [対応訳](690cf92f78f15cd4.md) | 全可視文字を目視照合済み |
| [blogs/images/agent-authorization/agent-connect-existing-app.png](../../../blogs/images/agent-authorization/agent-connect-existing-app.png) | [対応訳](866ce28987056788.md) | 全可視文字を目視照合済み |
| [blogs/images/agent-authorization/agent-interact.png](../../../blogs/images/agent-authorization/agent-interact.png) | [対応訳](baadde48a376df78.md) | 全可視文字を目視照合済み |
| [blogs/images/agent-authorization/multi-agent-auth.png](../../../blogs/images/agent-authorization/multi-agent-auth.png) | [対応訳](2841da0913fa6716.md) | 全可視文字を目視照合済み |
| [blogs/images/agent-authorization/one-data-center.png](../../../blogs/images/agent-authorization/one-data-center.png) | [対応訳](8b77e365887e9b12.md) | 全可視文字を目視照合済み |
| [blogs/images/agent-interview-Internet.png](../../../blogs/images/agent-interview-Internet.png) | [対応訳](f081d3dd0030b611.md) | 全可視文字を目視照合済み |
| [blogs/images/agent-network/connect.png](../../../blogs/images/agent-network/connect.png) | [対応訳](c5cdd5b5ae9e96e9.md) | 全可視文字を目視照合済み |
| [blogs/images/agent-network/integration.png](../../../blogs/images/agent-network/integration.png) | [対応訳](6d57ec17104a242b.md) | 全可視文字を目視照合済み |
| [blogs/images/agent-network/network-architecture.png](../../../blogs/images/agent-network/network-architecture.png) | [対応訳](30c9f3383ff027ca.md) | 全可視文字を目視照合済み |
| [blogs/images/agent-network/vinote.png](../../../blogs/images/agent-network/vinote.png) | [対応訳](1613f299528cb9c3.md) | 可視文字訳済み・原画像に隠れ／切れあり |
| [blogs/images/agentic-web.png](../../../blogs/images/agentic-web.png) | [対応訳](6fdec50f08d92d31.md) | 全可視文字を目視照合済み |
| [blogs/images/ai-native-network.png](../../../blogs/images/ai-native-network.png) | [対応訳](43e9f94dc1334dd2.md) | 全可視文字を目視照合済み |
| [blogs/images/all-protocol-1.png](../../../blogs/images/all-protocol-1.png) | [対応訳](5970aa78bf5983fd.md) | 全可視文字を目視照合済み |
| [blogs/images/all-protocol-2.png](../../../blogs/images/all-protocol-2.png) | [対応訳](d6953cf6a5bf3001.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-ap2/ap2flow.png](../../../blogs/images/anp-ap2/ap2flow.png) | [対応訳](a71c81fb1d6f0123.md) | 可視文字訳済み・原画像に隠れ／切れあり |
| [blogs/images/anp-architecture.png](../../../blogs/images/anp-architecture.png) | [対応訳](e13958ffadc94165.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-authorization.png](../../../blogs/images/anp-authorization.png) | [対応訳](6e420ff99a64026f.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-data-network.png](../../../blogs/images/anp-data-network.png) | [対応訳](f117eb996f8bf2b1.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-did-auth.png](../../../blogs/images/anp-did-auth.png) | [対応訳](550d8c035a2bf3f1.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-email.png](../../../blogs/images/anp-email.png) | [対応訳](fd6ada0f05452ed1.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-explorer.png](../../../blogs/images/anp-explorer.png) | [対応訳](adfb7bc5f4425866.md) | 可視文字訳済み・原画像に隠れ／切れあり |
| [blogs/images/anp-first-meet/00.png](../../../blogs/images/anp-first-meet/00.png) | [対応訳](ff74093c26dfdd99.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-first-meet/01.png](../../../blogs/images/anp-first-meet/01.png) | [対応訳](c103656a1781a77e.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-first-meet/02.png](../../../blogs/images/anp-first-meet/02.png) | [対応訳](89ac1e9169f28258.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-first-meet/03.png](../../../blogs/images/anp-first-meet/03.png) | [対応訳](64d222507495e0ee.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-first-meet/04.png](../../../blogs/images/anp-first-meet/04.png) | [対応訳](cb1eccfb79dc4972.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-first-meet/05.png](../../../blogs/images/anp-first-meet/05.png) | [対応訳](8c899f0a80616680.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-first-meet/06.png](../../../blogs/images/anp-first-meet/06.png) | [対応訳](0f38bafb1645344f.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-first-meet/07.png](../../../blogs/images/anp-first-meet/07.png) | [対応訳](da9f512dd146dd5e.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-first-meet/08.png](../../../blogs/images/anp-first-meet/08.png) | [対応訳](c0f12046ceb1228d.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page1.jpg](../../../blogs/images/anp-in-w3c-20250214/page1.jpg) | [対応訳](5df751ad490ec6fa.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page10.jpg](../../../blogs/images/anp-in-w3c-20250214/page10.jpg) | [対応訳](8a4ed0076bff4c58.md) | 可視の人向け文章訳済み・技術コード転記未確認 |
| [blogs/images/anp-in-w3c-20250214/page11.jpg](../../../blogs/images/anp-in-w3c-20250214/page11.jpg) | [対応訳](cbb960c9a649ea1e.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page12.jpg](../../../blogs/images/anp-in-w3c-20250214/page12.jpg) | [対応訳](99fc977277be529e.md) | 可視の人向け文章訳済み・技術コード転記未確認 |
| [blogs/images/anp-in-w3c-20250214/page13.jpg](../../../blogs/images/anp-in-w3c-20250214/page13.jpg) | [対応訳](81f460cbef651c61.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page14.jpg](../../../blogs/images/anp-in-w3c-20250214/page14.jpg) | [対応訳](61312d358ff5a23a.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page15.jpg](../../../blogs/images/anp-in-w3c-20250214/page15.jpg) | [対応訳](42874d7f9d8536fc.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page16.jpg](../../../blogs/images/anp-in-w3c-20250214/page16.jpg) | [対応訳](64216ff0bcfc0c1f.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page17.jpg](../../../blogs/images/anp-in-w3c-20250214/page17.jpg) | [対応訳](2c7ebe6dbe294857.md) | 可視の人向け文章訳済み・技術コード転記未確認 |
| [blogs/images/anp-in-w3c-20250214/page18.jpg](../../../blogs/images/anp-in-w3c-20250214/page18.jpg) | [対応訳](233bc9394f826746.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page19.jpg](../../../blogs/images/anp-in-w3c-20250214/page19.jpg) | [対応訳](0a5dfc07401f1118.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page2.jpg](../../../blogs/images/anp-in-w3c-20250214/page2.jpg) | [対応訳](ee094cee9c7b1e96.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page20.jpg](../../../blogs/images/anp-in-w3c-20250214/page20.jpg) | [対応訳](703b0a859a572ffb.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page21.jpg](../../../blogs/images/anp-in-w3c-20250214/page21.jpg) | [対応訳](2805979717ce87b4.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page22.jpg](../../../blogs/images/anp-in-w3c-20250214/page22.jpg) | [対応訳](48b93f5dcebc5e85.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page23.jpg](../../../blogs/images/anp-in-w3c-20250214/page23.jpg) | [対応訳](6d79d8c8c63a077c.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page24.jpg](../../../blogs/images/anp-in-w3c-20250214/page24.jpg) | [対応訳](18362e8314973400.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page3.jpg](../../../blogs/images/anp-in-w3c-20250214/page3.jpg) | [対応訳](5dbad778dee1f2ba.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page4.jpg](../../../blogs/images/anp-in-w3c-20250214/page4.jpg) | [対応訳](a8dcff2924713926.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page5.jpg](../../../blogs/images/anp-in-w3c-20250214/page5.jpg) | [対応訳](1ce06d0f40587d5e.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page6.jpg](../../../blogs/images/anp-in-w3c-20250214/page6.jpg) | [対応訳](9be88edfde623c3d.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page7.jpg](../../../blogs/images/anp-in-w3c-20250214/page7.jpg) | [対応訳](88f09260551b6cf5.md) | 可視文字訳済み・原画像に隠れ／切れあり |
| [blogs/images/anp-in-w3c-20250214/page8.jpg](../../../blogs/images/anp-in-w3c-20250214/page8.jpg) | [対応訳](4d4578a5b9a31129.md) | 全可視文字を目視照合済み |
| [blogs/images/anp-in-w3c-20250214/page9.jpg](../../../blogs/images/anp-in-w3c-20250214/page9.jpg) | [対応訳](4eb327d95487cb9f.md) | 可視の人向け文章訳済み・技術コード転記未確認 |
| [blogs/images/anp-interaction-flow.png](../../../blogs/images/anp-interaction-flow.png) | [対応訳](e891bf1b23bd23d7.md) | 全可視文字を目視照合済み |
| [blogs/images/ap2/anp-transaction.png](../../../blogs/images/ap2/anp-transaction.png) | [対応訳](c096366dcf4847df.md) | 全可視文字を目視照合済み |
| [blogs/images/ap2/anp-vc-hash.png](../../../blogs/images/ap2/anp-vc-hash.png) | [対応訳](307fd2d023ec58dc.md) | 全可視文字を目視照合済み |
| [blogs/images/ap2/rules.png](../../../blogs/images/ap2/rules.png) | [対応訳](7f7ff993b62072f6.md) | 全可視文字を目視照合済み |
| [blogs/images/api-keys-flow.png](../../../blogs/images/api-keys-flow.png) | [対応訳](62fb1fb1e15ec704.md) | 全可視文字を目視照合済み |
| [blogs/images/computer-use-product.png](../../../blogs/images/computer-use-product.png) | [対応訳](bf5591bd2e58c0f2.md) | 全可視文字を目視照合済み |
| [blogs/images/data-silos.png](../../../blogs/images/data-silos.png) | [対応訳](1df6fb5e9479ceb7.md) | 全可視文字を目視照合済み |
| [blogs/images/did-wba-auth.png](../../../blogs/images/did-wba-auth.png) | [対応訳](a7efcf96f0b45ac9.md) | 全可視文字を目視照合済み |
| [blogs/images/did-wba-flow.png](../../../blogs/images/did-wba-flow.png) | [対応訳](b3b061d710dacc38.md) | 可視の人向け文章訳済み・技術コード転記未確認 |
| [blogs/images/first-web-agent.png](../../../blogs/images/first-web-agent.png) | [対応訳](6c3f3ecb4010d9e0.md) | 可視の人向け文章訳済み・技術コード転記未確認 |
| [blogs/images/human-ai-agent.png](../../../blogs/images/human-ai-agent.png) | [対応訳](4f866038d7349a52.md) | 可視文字訳済み・原画像に隠れ／切れあり |
| [blogs/images/internet-translation.png](../../../blogs/images/internet-translation.png) | [対応訳](48f82a04cde776db.md) | 全可視文字を目視照合済み |
| [blogs/images/mcp-anp-share/protocol-explanation.svg](../../../blogs/images/mcp-anp-share/protocol-explanation.svg) | [対応訳](1baff2913b226fa5.md) | SVGラベル訳文照合済み |
| [blogs/images/mcp-architecture.png](../../../blogs/images/mcp-architecture.png) | [対応訳](1074d6e83f477926.md) | 全可視文字を目視照合済み |
| [blogs/images/mcp-authorization.png](../../../blogs/images/mcp-authorization.png) | [対応訳](b53b295e56b9be05.md) | 全可視文字を目視照合済み |
| [blogs/images/mcp-http-sse.png](../../../blogs/images/mcp-http-sse.png) | [対応訳](050c66533476dc67.md) | 全可視文字を目視照合済み |
| [blogs/images/mcp-init.png](../../../blogs/images/mcp-init.png) | [対応訳](11e0c4bf494af8d6.md) | 全可視文字を目視照合済み |
| [blogs/images/mcp-server-api-key-example.png](../../../blogs/images/mcp-server-api-key-example.png) | [対応訳](783479dc7db1c6bc.md) | 技術コードのみ・翻訳すべき説明文なし・原画素保持 |
| [blogs/images/mcp-tools.png](../../../blogs/images/mcp-tools.png) | [対応訳](4b90f531b632e83d.md) | 全可視文字を目視照合済み |
| [blogs/images/mcp-usb.png](../../../blogs/images/mcp-usb.png) | [対応訳](1f867f28a41a84b5.md) | 全可視文字を目視照合済み |
| [blogs/images/mcp-vs-anp-core.png](../../../blogs/images/mcp-vs-anp-core.png) | [対応訳](a9ad5d482398dfc4.md) | 全可視文字を目視照合済み |
| [blogs/images/mcp-vs-anp.png](../../../blogs/images/mcp-vs-anp.png) | [対応訳](23daa51fe8c44494.md) | 全可視文字を目視照合済み |
| [blogs/images/mcp-wba-did-proposal.png](../../../blogs/images/mcp-wba-did-proposal.png) | [対応訳](c7a763e7ed0bf8cc.md) | 可視文字訳済み・原画像に隠れ／切れあり |
| [blogs/images/meta-protocol-flow.png](../../../blogs/images/meta-protocol-flow.png) | [対応訳](a1ba49a9028915c8.md) | 全可視文字を目視照合済み |
| [blogs/images/openid-connect-fllow.png](../../../blogs/images/openid-connect-fllow.png) | [対応訳](486bd8088a9b4030.md) | 全可視文字を目視照合済み |
| [blogs/images/user-agent-internet.png](../../../blogs/images/user-agent-internet.png) | [対応訳](7ce61fcb5d91667d.md) | 全可視文字を目視照合済み |
| [chinese/思考&问题/pic/agent-find.png](../../../chinese/%E6%80%9D%E8%80%83%26%E9%97%AE%E9%A2%98/pic/agent-find.png) | [対応訳](d0d4d03432a677bc.md) | 全可視文字を目視照合済み |
| [chinese/思考&问题/pic/mcp-architecture.png](../../../chinese/%E6%80%9D%E8%80%83%26%E9%97%AE%E9%A2%98/pic/mcp-architecture.png) | [対応訳](72816e48b0685fa7.md) | 全可視文字を目視照合済み |
| [chinese/思考&问题/pic/mcp-auth-thinking.png](../../../chinese/%E6%80%9D%E8%80%83%26%E9%97%AE%E9%A2%98/pic/mcp-auth-thinking.png) | [対応訳](fc35dfd07516cdf6.md) | 全可視文字を目視照合済み |
| [chinese/思考&问题/pic/meta-protocol-flow.png](../../../chinese/%E6%80%9D%E8%80%83%26%E9%97%AE%E9%A2%98/pic/meta-protocol-flow.png) | [対応訳](0c1a8b37825031df.md) | 全可視文字を目視照合済み |
| [chinese/思考&问题/pic/meta-protocol-weather.png](../../../chinese/%E6%80%9D%E8%80%83%26%E9%97%AE%E9%A2%98/pic/meta-protocol-weather.png) | [対応訳](4c396da9f39fc886.md) | 全可視文字を目視照合済み |
| [chinese/思考&问题/pic/protocol-layer-design.png](../../../chinese/%E6%80%9D%E8%80%83%26%E9%97%AE%E9%A2%98/pic/protocol-layer-design.png) | [対応訳](31ad8676c6c2ec16.md) | 可視文字訳済み・原画像に隠れ／切れあり |
| [chinese/相关产品与技术/agent-discovery-en.svg](../../../chinese/%E7%9B%B8%E5%85%B3%E4%BA%A7%E5%93%81%E4%B8%8E%E6%8A%80%E6%9C%AF/agent-discovery-en.svg) | [対応訳](ef0fd651a190b80b.md) | SVGラベル訳文照合済み |
| [chinese/相关产品与技术/agent-discovery.svg](../../../chinese/%E7%9B%B8%E5%85%B3%E4%BA%A7%E5%93%81%E4%B8%8E%E6%8A%80%E6%9C%AF/agent-discovery.svg) | [対応訳](c389bac8135e0f49.md) | SVGラベル訳文照合済み |
| [chinese/过程文档/智能体点对点交易方案设计/ANP-VC哈希链关系图-en.svg](../../../chinese/%E8%BF%87%E7%A8%8B%E6%96%87%E6%A1%A3/%E6%99%BA%E8%83%BD%E4%BD%93%E7%82%B9%E5%AF%B9%E7%82%B9%E4%BA%A4%E6%98%93%E6%96%B9%E6%A1%88%E8%AE%BE%E8%AE%A1/ANP-VC%E5%93%88%E5%B8%8C%E9%93%BE%E5%85%B3%E7%B3%BB%E5%9B%BE-en.svg) | [対応訳](6dc86d152ff342cc.md) | SVGラベル訳文照合済み |
| [chinese/过程文档/智能体点对点交易方案设计/ANP-VC哈希链关系图.svg](../../../chinese/%E8%BF%87%E7%A8%8B%E6%96%87%E6%A1%A3/%E6%99%BA%E8%83%BD%E4%BD%93%E7%82%B9%E5%AF%B9%E7%82%B9%E4%BA%A4%E6%98%93%E6%96%B9%E6%A1%88%E8%AE%BE%E8%AE%A1/ANP-VC%E5%93%88%E5%B8%8C%E9%93%BE%E5%85%B3%E7%B3%BB%E5%9B%BE.svg) | [対応訳](5dce02ff051f26b1.md) | SVGラベル訳文照合済み |
| [chinese/过程文档/智能体点对点交易方案设计/ANP-理想交易流程图-v2.svg](../../../chinese/%E8%BF%87%E7%A8%8B%E6%96%87%E6%A1%A3/%E6%99%BA%E8%83%BD%E4%BD%93%E7%82%B9%E5%AF%B9%E7%82%B9%E4%BA%A4%E6%98%93%E6%96%B9%E6%A1%88%E8%AE%BE%E8%AE%A1/ANP-%E7%90%86%E6%83%B3%E4%BA%A4%E6%98%93%E6%B5%81%E7%A8%8B%E5%9B%BE-v2.svg) | [対応訳](6ec869377d6e9a9e.md) | SVGラベル訳文照合済み |
| [chinese/过程文档/智能体点对点交易方案设计/ANP-系统架构图-en.svg](../../../chinese/%E8%BF%87%E7%A8%8B%E6%96%87%E6%A1%A3/%E6%99%BA%E8%83%BD%E4%BD%93%E7%82%B9%E5%AF%B9%E7%82%B9%E4%BA%A4%E6%98%93%E6%96%B9%E6%A1%88%E8%AE%BE%E8%AE%A1/ANP-%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E5%9B%BE-en.svg) | [対応訳](7583dd811323434d.md) | SVGラベル訳文照合済み |
| [chinese/过程文档/智能体点对点交易方案设计/ANP-系统架构图.svg](../../../chinese/%E8%BF%87%E7%A8%8B%E6%96%87%E6%A1%A3/%E6%99%BA%E8%83%BD%E4%BD%93%E7%82%B9%E5%AF%B9%E7%82%B9%E4%BA%A4%E6%98%93%E6%96%B9%E6%A1%88%E8%AE%BE%E8%AE%A1/ANP-%E7%B3%BB%E7%BB%9F%E6%9E%B6%E6%9E%84%E5%9B%BE.svg) | [対応訳](8aa3feff2088f5ae.md) | SVGラベル訳文照合済み |
| [examples/adp/lkcoffe/orange-americano/instruction.jpg](../../../examples/adp/lkcoffe/orange-americano/instruction.jpg) | [対応訳](10314aa19ed3b011.md) | 可読文章訳済み・原画像に遮蔽／不鮮明文字あり |
| [examples/adp/lkcoffe/roasted-coconut-latte/instruction.jpeg](../../../examples/adp/lkcoffe/roasted-coconut-latte/instruction.jpeg) | [対応訳](c4fa85623a87c2f8.md) | 可読文章訳済み・原画像に遮蔽／不鮮明文字あり |
| [examples/adp/lkcoffe/silk-latte/instruction.jpg](../../../examples/adp/lkcoffe/silk-latte/instruction.jpg) | [対応訳](b96ea698231f5135.md) | 可読文章訳済み・原画像に遮蔽／不鮮明文字あり |
| [images/Internet.png](../../../images/Internet.png) | [対応訳](f90df3d591dee6f3.md) | 全可視文字を目視照合済み |
| [images/agent-a-call-agent-b.png](../../../images/agent-a-call-agent-b.png) | [対応訳](9d518b277948d159.md) | 全可視文字を目視照合済み |
| [images/agent-connect-architecture.png](../../../images/agent-connect-architecture.png) | [対応訳](29cfaad1808eb9aa.md) | 全可視文字を目視照合済み |
| [images/agent-discovery-protocol.svg](../../../images/agent-discovery-protocol.svg) | [対応訳](d2104ec2d20d0974.md) | SVGラベル訳文照合済み |
| [images/agent-discovery.svg](../../../images/agent-discovery.svg) | [対応訳](e95584f8988ab145.md) | SVGラベル訳文照合済み |
| [images/agent-network-diagram.svg](../../../images/agent-network-diagram.svg) | [対応訳](554b985787ae51ec.md) | SVGラベル訳文照合済み |
| [images/agentic-web-new.svg](../../../images/agentic-web-new.svg) | [対応訳](f5e8e2eed63648af.md) | SVGラベル訳文照合済み |
| [images/agentic-web3.png](../../../images/agentic-web3.png) | [対応訳](f35bef28c6bc9773.md) | 全可視文字を目視照合済み |
| [images/ai-native-network.png](../../../images/ai-native-network.png) | [対応訳](43e9f94dc1334dd2.md) | 全可視文字を目視照合済み |
| [images/anp-active-discovery-mechanism.svg](../../../images/anp-active-discovery-mechanism.svg) | [対応訳](1f6801fa492b41cd.md) | SVGラベル訳文照合済み |
| [images/anp-architecture.png](../../../images/anp-architecture.png) | [対応訳](6f2dfaae662b74f5.md) | 全可視文字を目視照合済み |
| [images/anp-architecture2.png](../../../images/anp-architecture2.png) | [対応訳](19092c1d7ffa4279.md) | 全可視文字を目視照合済み |
| [images/anp-flow.png](../../../images/anp-flow.png) | [対応訳](970d363039cfcf25.md) | 全可視文字を目視照合済み |
| [images/anp-human-agent-authorization-en.svg](../../../images/anp-human-agent-authorization-en.svg) | [対応訳](a9cd9fee682a3108.md) | SVGラベル訳文照合済み |
| [images/anp-human-agent-authorization.svg](../../../images/anp-human-agent-authorization.svg) | [対応訳](b8447cf8d1184f2b.md) | SVGラベル訳文照合済み |
| [images/anp-identity-interop.svg](../../../images/anp-identity-interop.svg) | [対応訳](51a14a77f462dbbf.md) | SVGラベル訳文照合済み |
| [images/anp-information-interact.png](../../../images/anp-information-interact.png) | [対応訳](0fdab33f58e6579a.md) | 全可視文字を目視照合済み |
| [images/anp-meta-protocol.svg](../../../images/anp-meta-protocol.svg) | [対応訳](2f64fb1f84bd2183.md) | SVGラベル訳文照合済み |
| [images/anp-passive-discovery-mechanism.svg](../../../images/anp-passive-discovery-mechanism.svg) | [対応訳](4c79a2a3d50a93cb.md) | SVGラベル訳文照合済み |
| [images/anp-trading-hash.svg](../../../images/anp-trading-hash.svg) | [対応訳](6dc86d152ff342cc.md) | SVGラベル訳文照合済み |
| [images/anp-trading-sysytem-arch.svg](../../../images/anp-trading-sysytem-arch.svg) | [対応訳](7583dd811323434d.md) | SVGラベル訳文照合済み |
| [images/ap2-402/ANP_AP2_Protocol_Flow.svg](../../../images/ap2-402/ANP_AP2_Protocol_Flow.svg) | [対応訳](6aea676c7850851c.md) | SVGラベル訳文照合済み |
| [images/ap2-402/ANP_X402_Hybrid_Protocol.svg](../../../images/ap2-402/ANP_X402_Hybrid_Protocol.svg) | [対応訳](7d42e97ba6d3e1c9.md) | SVGラベル訳文照合済み |
| [images/ap2-402/X402_Protocol_Flow.svg](../../../images/ap2-402/X402_Protocol_Flow.svg) | [対応訳](adbf2f6f40f445fc.md) | SVGラベル訳文照合済み |
| [images/ap2-402/ap2-flow-diagram.svg](../../../images/ap2-402/ap2-flow-diagram.svg) | [対応訳](2562b9a8f970934f.md) | SVGラベル訳文照合済み |
| [images/cross-platform-authentication.png](../../../images/cross-platform-authentication.png) | [対応訳](7f256240eedc70aa.md) | 全可視文字を目視照合済み |
| [images/cross-platform-identity-authentication-process.png](../../../images/cross-platform-identity-authentication-process.png) | [対応訳](d482ab2a34fe07ea.md) | 全可視文字を目視照合済み |
| [images/did-all-core-flow.png](../../../images/did-all-core-flow.png) | [対応訳](2b12b209f3a26650.md) | 全可視文字を目視照合済み |
| [images/did-architecture.png](../../../images/did-architecture.png) | [対応訳](9b43eb8001fc6e5e.md) | 全可視文字を目視照合済み |
| [images/did-as-identity-bridge.png](../../../images/did-as-identity-bridge.png) | [対応訳](4baaaeccbaea81ff.md) | 全可視文字を目視照合済み |
| [images/did-identity-authentication.png](../../../images/did-identity-authentication.png) | [対応訳](db68b4a4cf6155fe.md) | 可視の人向け文章訳済み・技術コード転記未確認 |
| [images/end-to-end-encryption-process.png](../../../images/end-to-end-encryption-process.png) | [対応訳](86cadacba0493435.md) | 全可視文字を目視照合済み |
| [images/judgment1_agent_replace_software.svg](../../../images/judgment1_agent_replace_software.svg) | [対応訳](7d04c8eed77f8c19.md) | SVGラベル訳文照合済み |
| [images/judgment2_interconnected_agents.svg](../../../images/judgment2_interconnected_agents.svg) | [対応訳](51107ff0bc503d05.md) | SVGラベル訳文照合済み |
| [images/judgment3_protocol_connection.svg](../../../images/judgment3_protocol_connection.svg) | [対応訳](d8542ded18cab377.md) | SVGラベル訳文照合済み |
| [images/mcp-registry-architecture.svg](../../../images/mcp-registry-architecture.svg) | [対応訳](1fe21e71426e11aa.md) | SVGラベル訳文照合済み |
| [images/message-did-register-flow.png](../../../images/message-did-register-flow.png) | [対応訳](7df9ed39b2646ab5.md) | 全可視文字を目視照合済み |
| [images/message-flow-architecture.png](../../../images/message-flow-architecture.png) | [対応訳](0c2c0b29dda1e8e2.md) | 全可視文字を目視照合済み |
| [images/message-send-receive-flow.png](../../../images/message-send-receive-flow.png) | [対応訳](6f0b301d81e5c116.md) | 全可視文字を目視照合済み |
| [images/meta-protocol-communication.png](../../../images/meta-protocol-communication.png) | [対応訳](8ad6739ad846c522.md) | 全可視文字を目視照合済み |
| [images/multi-did-privacy-en.svg](../../../images/multi-did-privacy-en.svg) | [対応訳](98a43bab37926c38.md) | SVGラベル訳文照合済み |
| [images/multi-did-privacy.svg](../../../images/multi-did-privacy.svg) | [対応訳](7d96da9f0d5e19fc.md) | SVGラベル訳文照合済み |
| [images/protocol-layer-design.png](../../../images/protocol-layer-design.png) | [対応訳](11576e27122bcaef.md) | 可視文字訳済み・原画像に隠れ／切れあり |
| [images/relationship.png](../../../images/relationship.png) | [対応訳](b48bdddfd1d012ad.md) | 全可視文字を目視照合済み |
| [standard/pic/Section12.2.png](../../../standard/pic/Section12.2.png) | [対応訳](5816c08d1af4b5db.md) | 全可視文字を目視照合済み |
| [standard/pic/pic.jpg](../../../standard/pic/pic.jpg) | [対応訳](a29bc447f3c7bda7.md) | 全可視文字を目視照合済み |
| [standard/pic/section7.png](../../../standard/pic/section7.png) | [対応訳](144ab27335969de0.md) | 全可視文字を目視照合済み |
