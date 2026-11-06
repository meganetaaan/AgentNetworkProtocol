<!-- translation-method: manual -->
> 日本語参考訳（手動翻訳）。規範となるのは原文です。コード例・識別子は原文を保持しています。
> 原文: [docs/agent-description-extended-fields-guide.md](../../docs/agent-description-extended-fields-guide.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

<a id="extended-fields-in-agent-description-documents"></a>
# Agent Description文書の拡張フィールド

このガイドは、このリポジトリのホテルとコーヒーショップの例で使う任意のフィールドを説明します。[Agent Description Protocol仕様](../07-anp-agent-description-protocol-specification.md)を補足するもので、新しいプロトコル要件を追加しません。

ANP-07 v1.1は標準のJSONを使います。Agent Description文書とProduct文書は、`type`や`url`などの通常のフィールド名を使います。このガイドの例も、その形式に従います。

<a id="start-with-the-anp-07-fields"></a>
## ANP-07のフィールドから始める

Agent Descriptionは、ANP-07が必須と定めるフィールドを含まなければなりません。そのうえで、分野固有の任意のフィールドを追加できます。

| フィールド | 型 | 必須／任意 | 目的 |
| --- | --- | --- | --- |
| `protocolType` | string | 必須 | 固定値`ANP` |
| `protocolVersion` | string | 必須 | 文書が使うANPプロトコルのバージョン |
| `type` | string | 必須 | Agent Description文書では`AgentDescription` |
| `url` | string | 任意 | Agent Description文書のアドレス |
| `name` | string | 必須 | 人間が読めるエージェント名 |
| `did` | string | 任意 | エージェントを識別するDID |
| `owner` | object | 任意 | エージェントに責任を持つ個人または組織 |
| `description` | string | 任意 | エージェントの目的と機能の概要 |
| `created` | string | 任意 | ISO 8601形式の作成日時 |
| `securityDefinitions` | object | 必須 | 利用できる認証方式 |
| `security` | string | 必須 | `securityDefinitions`内の、実際に使う項目 |
| `Infomations` | array | 任意 | 商品、サービス、その他の情報リソースへのリンク |
| `interfaces` | array | 任意 | エージェントが公開するインターフェース |
| `proof` | object | 任意 | 文書の完全性の証明 |

`Infomations`は、現在のANP-07仕様が使うフィールド名です。例では仕様との互換性のため、その綴りを維持しています。

分野固有の拡張を一つ持つ最小限の記述は、次のようになります。

```json
{
  "protocolType": "ANP",
  "protocolVersion": "1.0.0",
  "type": "AgentDescription",
  "url": "https://example.com/agents/hotel/ad.json",
  "name": "Hotel Booking Agent",
  "did": "did:wba:example.com:agents:hotel",
  "securityDefinitions": {
    "didwba_sc": {
      "scheme": "didwba",
      "in": "header",
      "name": "Authorization"
    }
  },
  "security": "didwba_sc",
  "domainEntity": {
    "type": "Hotel",
    "name": "Example Hotel",
    "telephone": "+1-555-0100"
  }
}
```

<a id="linking-information-resources"></a>
## 情報リソースへのリンク

独立した文書を持つリソースには、`Infomations`を使います。簡潔な項目で、リソースの内容と取得先を記述します。

```json
{
  "Infomations": [
    {
      "type": "Product",
      "description": "Room details, rates, and booking conditions.",
      "url": "https://example.com/products/deluxe-room.json"
    }
  ]
}
```

リンク先のProduct文書は、ANP-07のProduct Description節で定義された標準フィールドを使います。価格、画像、商品の属性などの詳細は、Agent Descriptionにコピーせず、その文書に記載してください。

<a id="describing-interfaces"></a>
## インターフェースの記述

例では、ANP-07が定義する二種類のインターフェースを使います。

- 会話によるリクエストのための`NaturalLanguageInterface`。
- 機械可読な契約で記述した操作のための`StructuredInterface`。

```json
{
  "interfaces": [
    {
      "type": "StructuredInterface",
      "protocol": "YAML",
      "version": "1.0",
      "humanAuthorization": true,
      "url": "https://example.com/api/booking-interface.yaml",
      "description": "Hotel room booking and reservation management."
    }
  ]
}
```

エンドポイントのパス、リクエストパラメーター、応答スキーマは、リンク先のインターフェース契約に記載します。予約や購入の確定など、操作に利用者の直接の承認が必要な場合は、`humanAuthorization`を`true`にしてください。

<a id="extensions-used-by-the-examples"></a>
## 例で使っている拡張

<a id="domainentity"></a>
### `domainEntity`

| 属性 | 値 |
| --- | --- |
| 期待する型 | object |
| 必須か | いいえ |
| 使用箇所 | ホテルとコーヒーショップのAgent Description |

`domainEntity`は、エージェントが代表する組織、場所、その他の実体を記述します。値は通常のJSONオブジェクトです。`type`は実体の種類を識別し、残りのフィールドはその実体を説明します。

ホテルの例は、住所、位置、評価、画像、設備、サービスを含みます。コーヒーショップの例は、住所、営業時間、電話番号、位置を含みます。これらの属性は任意であり、対象分野に応じて選ぶべきです。

```json
{
  "domainEntity": {
    "type": "CafeOrCoffeeShop",
    "name": "Example Coffee Shop",
    "openingHours": "Mo-Su 07:00-22:00",
    "address": {
      "type": "PostalAddress",
      "addressLocality": "Example City",
      "addressCountry": "CN"
    }
  }
}
```

<a id="customizationoptions"></a>
### `customizationOptions`

| 属性 | 値 |
| --- | --- |
| 期待する型 | object |
| 必須か | いいえ |
| 使用箇所 | コーヒーのProduct文書 |

`customizationOptions`は、商品を注文するときに選べる項目を列挙します。`options`の各項目は、名前、受け付ける値の一覧、任意の`isRequired`フラグを持ちます。

```json
{
  "customizationOptions": {
    "type": "CustomizationOptions",
    "options": [
      {
        "type": "PropertyValue",
        "name": "Size",
        "isRequired": true,
        "value": ["Small", "Medium", "Large"]
      }
    ]
  }
}
```

`isRequired`は、個々の選択項目に適用されます。すべてのProduct文書で`customizationOptions`を必須にするものではありません。これらの選択項目を受け付ける購入インターフェースは、同じ選択項目名と許可される値を使うべきです。

<a id="hotel-room-fields"></a>
### ホテル客室のフィールド

ホテル客室のProductは、客室の比較に役立つフィールドを追加します。

| フィールド | 型 | 説明 |
| --- | --- | --- |
| `roomName` | string | 現地の名称または別名の客室名 |
| `useableArea` | string | 客室面積の表示値 |
| `capacity` | string | 提供者が公開する宿泊定員 |
| `floor` | string | 階または階の範囲 |
| `bedType` | string | ベッドの構成 |
| `windowType` | string | 窓の構成 |
| `pricePerDay` | array | 提示条件に含まれる日別料金 |
| `stockPerDay` | array | 提示条件に含まれる日別在庫 |
| `instantConfirmation` | boolean | 予約を即時に確定できるか |
| `containedInPlace` | object | 客室が属するホテルまたは施設 |
| `smokingAllowed` | boolean | 喫煙が許可されるか |
| `petsAllowed` | boolean | ペットが許可されるか |

これらのフィールドは任意の拡張です。提示条件が`pricePerDay`と`stockPerDay`を含む場合、両方の配列は、インターフェースのリクエストまたは周囲の応答で定めた、同じ順序の日付集合を対象とするべきです。

<a id="adding-a-domain-specific-field"></a>
## 分野固有のフィールドの追加

フィールドを追加する前に、次を確認します。

1. ANP-07がそのフィールドをすでに定義していないかを確認します。
2. 商品やサービス用に選んだ公開定義が、適切な名前と値の構造をすでに提供していないかを確認します。
3. 既存フィールドと意味が衝突しない、簡潔なフィールド名を使います。
4. JSONの型と、その拡張が任意か必須かを文書化します。
5. 代表的な例を追加し、そのフィールドを入力として受け付ける場合や出力として返す場合は、インターフェース契約を更新します。

別の仕様が必須としていない限り、分野固有の拡張は任意のままにするべきです。拡張を使わない利用側でも、エージェントのアイデンティティ、セキュリティ設定、情報リンク、インターフェースを引き続き読めるべきです。

<a id="related-examples"></a>
## 関連する例

- [ホテルのAgent Description](../../examples/adp/hotel/examples/ad.json)
- [ホテル客室のProduct文書](../../examples/adp/hotel/examples/hotel_room.json)
- [ホテル検索インターフェース](../../examples/adp/hotel/examples/api/search-interface.yaml)
- [コーヒーショップのAgent Description](../../examples/adp/lkcoffe/ad.json)
- [コーヒーのProduct文書](../../examples/adp/lkcoffe/silk-latte/silk-latte.json)
- [コーヒー購入インターフェース](../../examples/adp/lkcoffe/api/purchase-interface.yaml)

<a id="copyright-notice"></a>
## 著作権表示

Copyright (c) 2024 ANP Community

このファイルは[Apache License 2.0](../../LICENSE)に基づいて公開されています。同ライセンスの条件のもとで自由に利用・改変できますが、この著作権表示を保持しなければなりません。
