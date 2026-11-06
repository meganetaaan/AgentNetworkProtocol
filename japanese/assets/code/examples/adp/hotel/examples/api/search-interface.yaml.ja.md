# examples/adp/hotel/examples/api/search-interface.yaml の人向け文章の日本語対応表

原文: [examples/adp/hotel/examples/api/search-interface.yaml](../../../../../../../../examples/adp/hotel/examples/api/search-interface.yaml)。元ファイルのキー、コード、診断文字列、署名対象データは変更していません。この文書は実行するコードや送信するJSONの代替ではありません。

原文SHA-256: `1550bcf414d0daca89e685837892fdedc1e70b0eddf41b7f8abf902644065a47`

プログラムの抽出結果に加え、人が読む設定値・説明・コメントの抽出漏れを確認して補っています。技術値はそのまま保持し、保持理由を併記します。

## /info/title

原文:

````text
Hotel Room Search Interface
````

日本語:

````text
ホテル客室検索インターフェース
````

## /info/description

原文:

````text
This API allows searching for available hotel rooms based on check-in and check-out dates.
The response can contain a URL to an ANP Product document or the product data directly.

````

日本語:

````text
このAPIは、チェックイン日とチェックアウト日に基づいて、空いているホテル客室を検索できます。
応答には、ANP Product文書のURL、または商品データ自体を含められます。

````

## /paths/~1agents~1hotel~1api~1search/post/summary

原文:

````text
Search available hotel rooms
````

日本語:

````text
空いているホテル客室を検索
````

## /paths/~1agents~1hotel~1api~1search/post/requestBody/content/application~1json/schema/properties/checkInDate/description

原文:

````text
Required. Check-in date in yyyy-MM-dd format
````

日本語:

````text
必須。yyyy-MM-dd形式のチェックイン日。
````

## /paths/~1agents~1hotel~1api~1search/post/requestBody/content/application~1json/schema/properties/checkOutDate/description

原文:

````text
Required. Check-out date in yyyy-MM-dd format
````

日本語:

````text
必須。yyyy-MM-dd形式のチェックアウト日。
````

## /paths/~1agents~1hotel~1api~1search/post/responses/200/description

原文:

````text
A successful response containing either a URL to hotel room details or the product data itself.
````

日本語:

````text
ホテル客室の詳細のURL、または商品データ自体を含む成功応答。
````

## /paths/~1agents~1hotel~1api~1search/post/responses/200/content/application~1json/schema/properties/urls/description

原文:

````text
URLs to ANP Product documents containing hotel room data
````

日本語:

````text
ホテル客室データを含むANP Product文書のURL。
````

## /paths/~1agents~1hotel~1api~1search/post/responses/200/content/application~1json/schema/properties/data/description

原文:

````text
Hotel room data using the ANP Product document format
````

日本語:

````text
ANP Product文書形式を使ったホテル客室データ。
````

## /paths/~1agents~1hotel~1api~1search/post/responses/400/description

原文:

````text
The check-in or check-out date is missing or invalid.
````

日本語:

````text
チェックイン日またはチェックアウト日が指定されていないか、無効です。
````

## /components/securitySchemes/didwba_sc/description

原文:

````text
DID-WBA authentication using the Authorization header.
````

日本語:

````text
Authorizationヘッダーを使うDID-WBA認証。
````

## /components/schemas/HotelRoom/description

原文:

````text
Hotel room data using the ANP Product document format.
````

日本語:

````text
ANP Product文書形式を使ったホテル客室データ。
````

## /components/schemas/HotelRoom/properties/roomName/example

原文:

````text
豪华海景房
````

日本語:

````text
豪华海景房（デラックス・オーシャンビュー客室）
````

## /components/schemas/HotelRoom/properties/name/example

原文:

````text
Deluxe Ocean View Room
````

日本語:

````text
Deluxe Ocean View Room（デラックス・オーシャンビュー客室）
````

## /components/schemas/HotelRoom/properties/description/example

原文:

````text
Spacious deluxe room with breathtaking ocean views, featuring modern amenities and elegant design.
````

日本語:

````text
息をのむような海の眺めを楽しめる、広々としたデラックス客室。近代的な設備と優雅なデザインを備えています。
````

## /components/schemas/HotelRoom/properties/useableArea/example

原文:

````text
45 square meters
````

日本語:

````text
45平方メートル
````

## /components/schemas/HotelRoom/properties/bedType/example

原文:

````text
1 King Bed
````

日本語:

````text
キングサイズベッド1台
````

## /components/schemas/HotelRoom/properties/windowType/example

原文:

````text
Floor-to-ceiling windows
````

日本語:

````text
床から天井までの窓
````

## /components/schemas/HotelRoom/properties/image/items/properties/caption/example

原文:

````text
豪华海景房 - 全景
````

日本語:

````text
豪华海景房（デラックス・オーシャンビュー客室） — 全景
````

## /components/schemas/HotelRoom/properties/image/items/properties/description/example

原文:

````text
Luxurious room featuring floor-to-ceiling windows with panoramic ocean views
````

日本語:

````text
床から天井までの窓から、海のパノラマを望める豪華な客室。
````

## /components/schemas/HotelRoom/properties/amenityFeature/items/properties/name/example

原文:

````text
空调
````

日本語:

````text
エアコン
````

## /components/schemas/HotelRoom/properties/amenityFeature/items/properties/value/example

原文:

````text
45 square meters
````

日本語:

````text
45平方メートル
````

## /components/schemas/HotelRoom/properties/offers/properties/name/example

原文:

````text
标准价
````

日本語:

````text
標準料金
````

## /components/schemas/HotelRoom/properties/offers/properties/seller/properties/name/example

原文:

````text
Sheraton Chuzhou Hotel
````

日本語:

````text
Sheraton Chuzhou Hotel（シェラトン滁州ホテル）
````
