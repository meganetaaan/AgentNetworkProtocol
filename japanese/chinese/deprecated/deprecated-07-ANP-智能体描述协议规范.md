<!-- translation-review: full; source=chinese/deprecated/deprecated-07-ANP-智能体描述协议规范.md -->
> 日本語参考訳（原文全文照合・校閲済み）。旧版の記述仕様です。旧humanAuthorization、安全設定の優先規則、原文の不完全なJSON例も保持しており、現行仕様とは異なります。
> 原文: [chinese/deprecated/deprecated-07-ANP-智能体描述协议规范.md](../../../chinese/deprecated/deprecated-07-ANP-智能体描述协议规范.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANPエージェント記述プロトコル仕様

## 概要

本仕様は、エージェントを標準的に表すAgent Description Protocol（ADP）を定義します。JSON-LDを基に、schema.orgと独自の語彙を組み合わせ、統一的に記述します。

中心的な内容は、次のとおりです。
1. JSON-LDで、リンクトデータとセマンティックWebに対応します。
2. 基本情報、商品、サービス、インターフェースの中心語彙を定義します。
3. did:wbaを共通の安全機構として、異なるプラットフォームの本人確認を実現します。
4. OpenAPIやJSON-RPCとの相互運用に対応します。

通信の効率と相互運用性を高め、ネットワークの構築を支えます。

## はじめに

Agent Description（AD）は入り口です。名前、所属する主体、機能、商品、サービス、APIやプロトコルを得て、通信と協働を行えます。

AIの言語理解が進めば、固定形式のない自然言語でも記述できますが、通信費用が増し、解釈の一致が下がります。情報交換の一貫性と効率を保つ、共通仕様が必要です。

## 全体像

[JSON-LD](https://www.w3.org/TR/json-ld11/)（JavaScript Object Notation for Linked Data）を使います。JSONの構文にリンクを埋め込み、関係と構造を表す、リンクトデータとセマンティックWebの標準形式です。

すべての情報を複数のファイルに保存し、ADからリンクして、一つの入り口にできます。

理解の一貫性のため、標準語彙を定めます。商品やサービスにはschema.orgを推奨し、不足すれば独自に定義できます。schema.orgなら、AIだけでなくコードでも直接処理できます。

JSON-LDは他方式と組み合わせます。例えば、機能の記述にはYAMLのOpenAPIや、JSON-RPCのRPCを使えます。

記述の例です。

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "did": "https://w3id.org/did#",
    "ad": "https://agent-network-protocol.com/ad#"
  },
  "@type": "ad:AgentDescription",
  "@id": "https://agent-network-protocol.com/agents/smartassistant",
  "name": "SmartAssistant",
  "did": "did:wba:example.com:user:alice",
  "owner": {
    "@type": "Organization",
    "name": "Hangzhou Bit Intelligence Technology Co., Ltd.",
    "@id": "https://agent-network-protocol.com"
  },
  "description": "SmartAssistant is an intelligent agent solution for individuals and enterprises, providing various natural language processing and cross-platform connectivity capabilities.",
  "version": "1.0.0",
  "created": "2024-12-31T12:00:00Z",
  "securityDefinitions": {
    "didwba_sc": {
      "scheme": "didwba",
      "in": "header",
      "name": "Authorization"
    }
  },
  "security": "didwba_sc",
  "products": [
    {
      "@type": "Product",
      "name": "AI Assistant Pro",
      "description": "A high-end AI assistant offering advanced customization services.",
      "@id": "https://agent-network-protocol.com/products/ai-assistant-pro"
    },
    {
      "@type": "Product",
      "name": "Agent Connector",
      "description": "A cross-platform connectivity solution for intelligent agents.",
      "@id": "https://agent-network-protocol.com/products/agent-connector"
    }
  ],
  "interfaces": [
    {
      "@type": "ad:NaturalLanguageInterface",
      "protocol": "YAML",
      "url": "https://agent-network-protocol.com/api/nl-interface.yaml",
      "description": "A YAML file for interacting with the intelligent agent through natural language."
    },
    {
      "@type": "ad:StructuredInterface",
      "protocol": "YAML",
      "humanAuthorization": true,
      "url": "https://agent-network-protocol.com/api/purchase-interface.yaml",
      "description": "A YAML file for interacting with the intelligent agent through purchase."
    },
    {
      "@type": "ad:StructuredInterface",
      "protocol": "JSON-RPC 2.0",
      "url": "https://agent-network-protocol.com/api/api-interface.json",
      "description": "A JSON-RPC 2.0 file for interacting with the intelligent agent through APIs."
    }
  ],
  "proof": {
    "type": "EcdsaSecp256r1Signature2019",
    "created": "2024-12-31T15:00:00Z",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "did:wba:example.com:user:alice#keys-1",
    ""
    "challenge": "1235abcd6789",
    "proofValue": "z58DAdFfa9SkqZMVPxAQpic7ndSayn1PzZs6ZjWp1CktyGesjuTSwRdoWhAfGFCF5bppETSTojQCrfFPP2oumHKtz"
  }
}

```

商品の例です。

```json
{
  "@context": {
    "@vocab": "https://schema.org/",
    "ad": "https://agent-network-protocol.com/ad#"
  },
  "@type": "Product",
  "@id": "https://agent-network-protocol.com/agents/lkcoffe/roasted-coconut-latte/roasted-coconut-latte.json",
  "identifier": "rl-29ab8cf9",
  "name": "Roasted Coconut Latte",
  "description": "Roasted at approximately 135°C for a unique coconut sugar flavor, suitable for winter consumption. This drink combines coconut pulp juice and roasted coconut granules, offering five 'zero' light enjoyment health options, using master-customized Espresso from IIAC gold award coffee beans.",
  "brand": {
    "@type": "Brand",
    "name": "Luckin Coffee"
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Feature",
      "value": "Coconut pulp juice & roasted coconut granules blend, five 'zero' light enjoyment (0 lactose, 0 creamer, 0 sucrose solids, 0 trans fats, 0 added flavors), master-customized Espresso from IIAC gold award coffee beans"
    },
    {
      "@type": "PropertyValue",
      "name": "Slogan",
      "value": "Winter Special Drink Warm Return"
    },
    {
      "@type": "PropertyValue",
      "name": "Additional Info",
      "value": "Coconut flavor from memory"
    }
  ],
  "offers": {
    "@type": "Offer",
    "price": "13",
    "priceCurrency": "CNY",
    "availability": "https://schema.org/InStock"
  },
  "nutrition": {
    "@type": "NutritionInformation",
    "calories": "150",
    "fatContent": "0g",
    "sugarContent": "0g",
    "proteinContent": "0g",
    "cholesterolContent": "0mg",
    "carbohydrateContent": "0g"
  },
  "ingredients": "Coconut milk, espresso, roasted coconut syrup",
  "category": "Beverage",
  "sku": "LK-COCONUT-LATTE",
  "image": [
    {
      "@type": "ImageObject",
      "url": "https://agent-network-protocol.com/agents/lkcoffe/roasted-coconut-latte/instruction.jpg",
      "caption": "Roasted Coconut Latte - Winter Special Drink Warm Return",
      "description": "Using 135°C high-temperature roasting process, perfectly blending coconut pulp juice and roasted coconut granules, paired with Espresso made from IIAC gold award coffee beans, bringing a unique blend of roasted coconut aroma and coffee aroma"
    },
    {
      "@type": "ImageObject",
      "url": "https://agent-network-protocol.com/agents/lkcoffe/roasted-coconut-latte/feature.jpg",
      "caption": "Roasted Coconut Latte - Coconut flavor from memory",
      "description": "Coconut flavor from memory"
    }
  ],
  "audience": {
    "@type": "Audience",
    "audienceType": "Coffee Enthusiasts",
    "geographicArea": "China"
  },
  "manufacturer": {
    "@type": "Organization",
    "name": "Luckin Coffee",
    "url": "https://luckincoffee.com"
  },
  "customizationOptions": {
    "@type": "ad:CustomizationOptions",
    "options": [
      {
        "@type": "PropertyValue",
        "name": "Temperature",
        "isRequired": true,
        "value": ["Iced", "Hot"]
      },
      {
        "@type": "PropertyValue",
        "name": "Sugar Level",
        "isRequired": true,
        "value": ["Standard Sweet", "Less Sweet", "Slightly Sweet", "No Additional Sugar"]
      }
    ]
  }
}


```

注：image内の属性を配列にして複数値を表すことも、schema.orgに適合します。

## 名前空間

語彙は常に短縮形で示します。展開形には、名前空間IRI https://agent-network-protocol.com/ad# からアクセスできます。

## ADの情報モデル

### 全体像

https://agent-network-protocol.com/ad# とschema.orgの語彙に基づきます。

adは記述の中心語彙、schema.orgは一般的な語彙を定義します。利用者が独自に定義でき、AIも自動で認識できます。

### 語彙

#### 中心的な語彙

##### Agent（エージェント）

物理的・仮想的な主体の抽象化であり、メタデータと機能をADで記述します。仮想主体は、複数のエージェントの組み合わせでも構いません。

表1：エージェントの語彙。下位文書にも使えます。

| 用語 | 説明 | 必須性 | 型 |
| --- | --- | --- | --- |
| @context | AD内の略称を定義するJSON-LDキーワード | 必須 | anyURIまたはArray |
| @type | 意味のラベル・型を付けるJSON-LDキーワード | 任意 | stringまたはArray of string |
| @id | RFC3986のURI。安定、一時・可変、ローカルIP付き、URNなど | 任意 | anyURI |
| did | 一意に身元を示す分散型識別子 | 任意 | string |
| name | 既定の言語による、人が読める名前。UIなどに使用 | 必須 | string |
| description | 既定言語の、人が読める追加情報 | 任意 | string |
| version | バージョン | 任意 | VersionInfo |
| created | AD作成日時 | 任意 | dateTime |
| modified | AD最終変更日時 | 任意 | dateTime |
| owner | 所有する人または組織 | 任意 | PersonまたはOrganization |
| products | すべての商品 | 任意 | Array of Product |
| services | すべてのサービス | 任意 | Array of Service |
| interfaces | すべての機能定義 | 任意 | Array of Interface |
| security | securityDefinitionsから選ぶ名前の集合。アクセス時に、すべての要件を満たす必要あり | 必須 | stringまたはArray of string |
| securityDefinitions | 名前付き設定の集合。定義だけで、securityで参照した時だけ適用 | 必須 | Map of SecurityScheme |
| proof | AD改変を防ぐ完全性の情報 | 任意 | Proof |

@contextには、次の規則があります。
1. ADだと示すため、anyURI https://agent-network-protocol.com/ad# を含む必要があります。
2. 配列なら、複数のanyURIやMapを含められます。すべての名前と値を一つのMapにまとめることを勧めます。
3. 配列内のMapは、名前空間IRIを値、その用語・接頭辞を名前とする組を含められます。
4. 一つのMapには、@languageを名前、BCP47のen、zh-CN、zh-TWなどを値として、既定の言語を定義するべきです。

##### Interface（インターフェース）

やり取りの方法を定義します。
1. StructuredInterface：特定のAPIによる構造化したやり取り。
2. NaturalLanguageInterface：自然言語によるやり取り。

表5：インターフェースの語彙。

| 用語 | 説明 | 必須性 | 型 |
| --- | --- | --- | --- |
| @type | 種類 | 必須 | string |
| @id | 一意の識別子 | 必須 | anyURI |
| name | 名前 | 必須 | string |
| description | 詳しい説明 | 必須 | string |
| protocol | 使用方式。現在はYAML、JSON-RPC 2.0 | 必須 | string |
| url | 定義文書の場所 | 必須 | anyURI |
| version | バージョン | 任意 | string |
| security | 安全の要件 | 任意 | SecurityScheme |
| humanAuthorization | 人の手動の許可が必要か | 任意 | bool |

### 安全の仕組み

現在はdid:wbaを使います。Webに基づくDIDで、異なるプラットフォームの本人確認と通信に向けた方式です。

将来は、必要に応じて他方式へ拡張できます。

#### DIDWBASecurityScheme（DID WBA安全方式）

did:wbaの設定メタデータを表します。schemeの値は、ADに含む語彙で定義する必要があります。

どの安全方式でも、鍵、パスワード、直接アクセスを許す秘密情報をADに保存してはいけません。別の仕組みで、帯域外に共有・保存します。ADは、すでに許可された相手にアクセス方法を説明するもので、許可を与えるものではありません。

署名などの追加パラメーターの場所は、通常inとnameの組で示します。inには次を使えます。
- header：nameで示すヘッダー。did:wbaではAuthorizationで運びます。
- query：nameで示すクエリをURIに追加します。
- body：nameで示すデータ要素として、要求の本文に含めます。
- cookie：nameで示すcookieに保存します。
- uri：nameで示す、定義されたURIテンプレートの変数に埋め込みます。
- auto：方式の一部として決めるか、交渉します。autoならnameを設定するべきではありません。

表2：安全方式の語彙。

| 用語 | 説明 | 必須性 | 型 |
| --- | --- | --- | --- |
| @type | 意味のラベルを付けるJSON-LDキーワード | 任意 | stringまたはArray of string |
| description | 既定言語の、人が読める追加情報 | 任意 | string |
| scheme | 安全機構の識別子 | 必須 | string |
| in | 認証パラメーターの場所 | 必須 | string |
| name | 認証パラメーターの名前 | 必須 | string |

did:wbaの設定例です。

```json
{
    "securityDefinitions": {
        "didwba_sc": {
            "scheme": "didwba",
            "in": "header",
            "name": "Authorization"
        }
    },
    "security": "didwba_sc"
}
```

安全設定は必須であり、エージェント階層のsecurityで有効にする必要があります。これが、やり取りに必要な機構です。

最上位のsecurityはすべての資源に適用し、個別の資源の中なら、その資源の条件です。両者が異なれば、個別の指定を優先します。

### 人の手動の許可

購入など、必ず人の許可が必要な機能にはhumanAuthorizationを加えます。trueなら、手動の許可を経て初めて利用できます。

### Proof（完全性の確認）

改変、偽装、再利用を防ぐため、Proofを加えます。[W3C定義](https://www.w3.org/TR/vc-data-integrity/#defn-domain)も参照してください。

- domain：保管先のドメインです。取得元と一致するか必ず確認し、不一致なら偽装の可能性があります。
- challenge：改変を防ぐチャレンジです。domainを指定する時は、同時に必要です。
- verificationMethod：検証方法です。現在はdid:wba文書の方式で、将来拡張できます。
- proofValue：署名です。次の手順で生成します。
  - proofValueを含まないADを作ります。
  - [JCS](https://www.rfc-editor.org/rfc/rfc8785)で正規化した文字列にします。
  - SHA-256でハッシュにします。
  - クライアントの秘密鍵で署名し、URL安全なBase64にします。
  - 検証は、以上の逆の操作です。

## よく使う定義の共通化

コーヒーや玩具など、具体的な商品・サービスには、schema.orgのProductの一部から特定の型を定められます。どのエージェントも同じ記述で構築でき、相互運用を助けます。

購入などの機能も、共通仕様を定め、すべてが同じインターフェースを使えるようにできます。

## 著作権表示

Copyright (c) 2024 ANP Community
このファイルは[MITライセンス](../../../LICENSE)で公開されています。自由に利用・変更できますが、この表示を保持してください。
