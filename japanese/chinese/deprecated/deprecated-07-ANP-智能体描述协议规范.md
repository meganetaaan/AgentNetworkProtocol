> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [chinese/deprecated/deprecated-07-ANP-智能体描述协议规范.md](../../../chinese/deprecated/deprecated-07-ANP-智能体描述协议规范.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP - スマートボディ説明プロトコル

## インフォメーション

この命令は、スマート ボディを記述するための標準化された合意である Smart Description Protocol (Agent Defense Project, ADP) を定義します。このプロトコルは、JSON-LD フォーマットに基づくスマートの均一な説明を提供し、schema.org の語彙とカスタム vocabulary を組み合わせます。

合意のコア要素には、以下が含まれます。
1. リンク先のデータと、ネットワーク機能をサポートするベースデータフォーマットとしてJSON-LDを利用
2. インテリジェンスの基礎、製品、サービス、インターフェースなどを定義するコア条件
3. 統一されたセキュリティメカニズムとしてのwbaアプローチによるクロスプラットフォームのアイデンティティ認証
4. 他社との相互運用性のサポート(OpenAPI、JSON-RPCなど)

この指示は、スマートボディネットワークの構築のための基本的なサポートを提供することで、インテリジェントな体間で相互運用性とコミュニケーションの効率を高めることを目指しています。

## 導入事例

スマートボディの説明(エージェント・説明、AD)はインテリジェントな身体のエントリポイントです。他のスマートボディは AD に基づいており、スマートボディの名前、エンティティティ、関数、製品、サービス、インタラクティブ API またはプロトコルに関する情報にアクセスすることができます。

自然言語を理解するAIの能力が高まっていますので、それは固定仕様を持たない純粋に自然な言語でインテリジェントな身体に関する情報を記述することは理論的に可能ですが、これはインテリジェントな体間の通信のコストを増加させ、2つのインテリジェントな体の間の情報理解の一貫性を減らします。したがって、インテリジェントな体とより効率的なコミュニケーションのために、スマートボディを説明する規範は、インテリジェントな体間の情報の相互作用の一貫性を確保する必要があります。

## 総合案内

利用する[JSON-LD(ジョンズ)](https://www.w3.org/TR/json-ld11/)インテリジェントなボディの説明の形式として、JSON-LDはリンクされたデータとセマンティックネットワークのデータに対する表現の標準フォーマットです。 JSON(JavaScript オブジェクト表記)の構文に基づいており、JSONオブジェクト内のリンクの埋め込みがデータ間の関係と構造を示すことができます。

そこで、スマートボディのすべての情報を複数のファイルに保存し、スマートな説明文書で1つにリンクすることができます。 スマートの説明は、スマートボディのエントリポイントとして使用できます。その他のインテリジェントな情報は、この説明文書をスマートボディに関するすべての情報を取得する基礎として使用できます。

インテリジェントな文書の理解の一貫性を向上させるために、標準の語彙(Vocabulary)を定義します。同時に、製品、サービスなどのリソースを記述するときは、schema.orgを使用してドキュメントの解釈の一貫性を高めることをお勧めします。schema.orgの語彙が要求を満たしていない場合は、ユーザーはそれをカスタマイズできます。スキーマ.orgの語彙を使用するもう1つの利点は、データが単にAIではなく、コードによって直接処理することができることです。

JSON-LD は他のプロトコルと組み合わせて使用する必要があります。例えば、インターフェイスの説明プロトコルは、YAML 形式やJSON-RPC 形式で記述されている RPC プロトコルで説明するように OpenAPI を使うことができます。

ワンは、スマートボディの説明文書の例です。

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

以下は、製品の説明の例です。
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

Note: 製品の説明では、画像の属性は1つの配列に複数の値を指定することができます。また、schema.org 規範と一致しています。

## 名称空間

この指示では、インテリジェントな説明に関連付けられている用語は、常にコンパクトな形式で提示されます。 それらの拡張は、名前付けスペースIRIによって使用することができます https://agent-network-protocol.com/ad# 訪問

## AD情報モデル

### 総合案内

語彙に基づくAD情報モデルhttps://agent-network-protocol.com/ad#和schema.org的词汇表之上。

"ad" という名前はインテリジェントな説明の重要な用語を定義し、Schema.org はユーザーによって定義できるインテリジェントな記述のいくつかの一般的に使用される用語を定義するか、AI によって自動的に認識される。

### 用語集定義

#### コア用語の定義

##### エージェント(非公式)
スマートエンティティティは、スマート・ディメンション(AD)文書を通してメタデータとインターフェイスが記述されている物理的または仮想の組織の抽象的です。バーチャル・エンティティティは、1つ以上のインテリジェントなボディの組み合わせでもあります。

表1:スマートボディレベルでの用語集。以下の用語はサブドキュメントで使用できます。

| 用語集 | コンテンツ | 必要かどうか | 仕様 |
|---------|------|---------|------|
| コンテンツ | AD 文書で使われる短い名前(用語)を定義する JSON-LD キーワード。 | 必須条件 | 任意のURIまたは配列 |
| ツイート | オブジェクトにセマンティックラベル(またはタイプ)を追加するためのJSON-LDキーワード。 | 任意 | ♪ スタート・スタート♪ |
| ツイート | URL を使用して、スマート識別子 [RFC3986の特長]フォーマット(例、安定的、一時的および変数 URL、ローカルIPアドレス、URL等を含む URL)。 | 任意 | 任意の |
| 行なった | スマートボディのDecentro認証識別子(ID)は、インテリジェントな体のみを識別するために使われます。 | 任意 | 文字列 |
| お名前(名) | デフォルト言語(UIで表示するためのテキストなど)に基づいて、人間の読みやすい名前を提供します。 | 必須条件 | 文字列 |
| 説明: | デフォルト言語に基づく追加(読みやすい)情報。 | 任意 | 文字列 |
| コンテンツ | バージョン情報の提供 | 任意 | バージョン情報 |
| 作成者 | ADインスタンス作成時間情報を提供します。 | 任意 | 日报社(7月27日) |
| 変更内容 | AD の例の最終変更に関する情報を提供します。 | 任意 | 日报社(7月27日) |
| オーナー | 組織や個人を識別できる。 | 任意 | 人材・組織 |
| 取扱商品 | スマートが提供するすべての製品のリスト。 | 任意 | 製品の配列 |
| 業務サービス | スマートボディが提供するすべてのサービスのリスト。 | 任意 | サービス内容 |
| インターフェイス | スマートボディが提供するすべてのインターフェイスを定義します。 | 任意 | インターフェイスの配列 |
| セキュリティー | セキュリティデータから選択されたセキュリティ定義名を設定します。リソースへのアクセスは、すべてのセキュリティ要件を満たしている必要があります。 | 必須条件 | ♪ スタート・スタート♪ |
| セキュリティ定義 | セキュリティ設定プール(定義のみ)を命名します。セキュリティの名前値が使用される場合にのみ、実用的なアプリケーションのみです。 | 必須条件 | セキュリティスキームのマップ |
| 証拠の証拠 | ADファイルの操作を防ぐための情報の完全な検証 | 任意 | 証拠の証拠 |

@content では、AD-examples は以下のようなルールを定義します。

1. @contentname は AnyURI を含まなければなりません https://agent-network-protocol.com/ad# 文書をAD文書として識別するため。
2. @content が配列の場合、複数の AnyURI または Map タイプの要素を含み、1 つのマップにすべての名前の値を含めることを提案できます。
3. @content 配列のマップには、名前の値をリセンシングできます。これは annyURi タイプのネームスペース識別子であり、その名前空間の用語またはプレフィックスとして名付けられます。
4. 配列の@contentMapには、ADのデフォルト言語を定義するresemblanceが含まれている必要があります。名前はterm@languageであり、値は一貫性のあるものでなければなりません[BCP47の特長]定義された言語ラベル(例: en、zh-CN、zh-TW)。

##### インターフェイス(インターフェイス)
インターフェイスは、インテリジェントなボディとやり取りする方法を定義します。

1. Structuryインターフェイス:特定のAPIプロトコルによるスマートとのやり取りのための構造化されたインターフェイス
2. 自然言語インターフェイス:自然言語によるインテリジェントな身体との相互作用のための自然な言語インターフェイス


表5:インターフェイスレベルの用語集

| 用語集 | コンテンツ | 必要かどうか | 仕様 |
|---------|------|---------|------|
| ツイート | インターフェイスのタイプ。 | 必須条件 | 文字列 |
| ツイート | インターフェイスは唯一の識別子です。 | 必須条件 | 任意の |
| お名前(名) | インターフェイス名。 | 必須条件 | 文字列 |
| 説明: | インターフェイス細部。 | 必須条件 | 文字列 |
| プロトコル | インターフェースに用いられるプロトコルは、現在YAML, JSON-RPC 2.0に対応しています。 | 必須条件 | 文字列 |
| url の | インターフェイスは、ドキュメントのURLを定義します。 | 必須条件 | 任意の |
| コンテンツ | インターフェイスバージョン情報。 | 任意 | 文字列 |
| セキュリティー | インターフェイスのための保証条件。 | 任意 | セキュリティスキーム |
| ヒューマンAuthorization | インターフェイスは人為的認可ですか? | 任意 | ボーロール |

### セキュリティメカニズム

スマート・デクリプション・プロトコルは、現在、その安全メカニズムとしてdo:wbaメソッドを使用します。d:wba アプローチは、クロスプラットフォームの識別とインテリジェントな通信要件を満たすように設計された Web ベースのデセントライゼーション・識別子 (DD) コードです。

ニーズに応じて、将来的には他の識別プログラムが展開できます。

#### DIWBAScurity Scheme (ID WBAセキュリティプログラム)

ド:wbaメソッドに基づいてセキュリティメカニズムの構成のためのメタデータを記述します。スキームの名前に割り当てられた値は、スマートボディの説明に含まれる語彙で定義する必要があります。

すべてのセキュリティプログラムでは、直接アクセスを提供するキー、パスワード、その他の機密情報はADに保存されますが、他のメカニズムを通じて外部に共有および保存する必要があります。 ADは、その承認の付与ではなく、スマートボディ(消費者が承認されている場合)にアクセスする方法を記述することを目指しています。

セキュリティプログラムは通常、デジタル署名などの追加の認証パラメータが必要です。 情報の場所は、名前に関連付けられた値の指標であり、通常は内部の値と組み合わせて使用されます。

- Header: プロトコルによって提供されるヘッドにパラメータが与えられ、頭の名前は名前の値を与えられた。do:wbaメソッドでは、認証情報は協会の頭を通して送信されます。
- クエリ: パラメータは URL にクエリパラメーターとして添付され、クエリパラメータの名前は name で提供されます。
- ボディ: パラメータは要求負荷の本体に提供され、使用されるデータ・モード要素は名前によって提供されます。
- Cookie: パラメータは、名前の値をマークしたクッキーに保存されます。
- uri: パラメータは URL 自体に埋め込まれ、URL テンプレート変数によってコード化されます(名前の値を定義)。
- auto: 位置は、合意の一部として決定または交渉されます。 セキュリティスキームフィールドが自動に設定されている場合、名前のフィールドが設定されるべきではありません。

表2:セキュリティプログラムのレベルの用語集

| 用語集 | コンテンツ | 必要かどうか | 仕様 |
|---------|------|---------|------|
| ツイート | オブジェクトにセマンティックラベルを追加するJSON-LDキーワード。 | 任意 | ♪ スタート・スタート♪ |
| 説明: | デフォルト言語に基づく追加(読みやすい)情報。 | 任意 | 文字列 |
| スキーム | セキュリティメカニズムのマーキング | 必須条件 | 文字列 |
| でん | 認証パラメータの場所。 | 必須条件 | 文字列 |
| お名前(名) | 認証パラメータの名前。 | 必須条件 | 文字列 |

以下の例は、do:wba メソッドを使用して安全な設定の例です。

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

AD のセキュリティ設定が必要です。セキュリティの定義は、スマートレベルのセキュリティメンバーによって有効化する必要があります。この構成は、インテリジェントとやり取りするために必要なセキュリティメカニズムです。

AD ファイルの上部にセキュリティが表示される場合、訪問時にすべてのリソースがこのセキュリティメカニズムを使用して検証しなければならないと述べています。リソース内では、セキュリティメカニズムが満たされた場合のみ、リソースへのアクセスができるように指示されます。

### ヒューマンマニュアルの承認

インターフェイスが呼び出されると、例えば、インターフェースを購入するには、手動で人間によって許可されなければなりません。今回は、HumanAuthorizationのインタフェース定義にフィールドを追加できます。このインターフェイスコールは、人間のマニュアル承認を必要とすることを示しています。

### 証拠(完全検証)

悪行操作、アドファイルの偽造または再使用を防ぐため、当社は、AD文書へのチェック・アップ情報プルーフを追加しました。 証拠は参照規範を定義します:[https://www.w3.org/TR/vc-data-integrity/#defn-domain](https://www.w3.org/TR/vc-data-integrity/#defn-domain)。

の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の の です:
- Domain: AD ドキュメントの保存ドメイン名を定義します。ユーザーが文書を取得した後、ドキュメントのドメイン名がドメインで定義されていると判断する必要があります。 そうでない場合は、ドキュメントは偽造される可能性があります。
- 課題: 検証のためのチャレンジ情報をを定義し、操作を防止します。ドメインを指定すると、チャレンジを割り当てる必要があります。
- VitimationMethod: 検証方法は定義され、現在、do:wba ドキュメントのバリデーションメソッドを使用します。将来的には、より多くのメソッドが拡張できます。
- 証拠: デジタル署名を運ぶ。ルールの生成は次の通りである。
  - 証拠価値フィールドを含まないウェブサイトのAD文書を生成する
  - 利用条件[JCS(JSONキャニシリゼーションスキーム)](https://www.rfc-editor.org/rfc/rfc8785)上記AD文書を正規化文字列を生成するように正規化します。
  - SHA-256アルゴリズムを用いた正規化文字列のHashiはハッシュ値を生成する。
  - クライアントのプライベートキーを使用してハッシュ値をサインし、署名値を生成し、URLセキュリティベース64エンコーディングを実行します。
  - 署名チェックプロセスは、上記のプロセスの逆です。


## 共通の定義

特定の製品やサービスについては、コーヒーのカップ、おもちゃなど、Schema.org Produtt プロパティのサブセットを使用して、特定のタイプを定義し、製品がどのように記述されているかを指定できます。これにより、すべてのインテリジェントは、製品データを構成するときに均一な定義を使用することができ、さまざまなインテリジェンスボディと相互作用することができます。

インターフェイスに似たようなアプローチが使用できます。例えば、製品購入インターフェースは、すべてのインテリジェントな人が異なるインテリジェントなボディ間で相互運用するために使用できる均一な購買インタフェースとして定義できます。






## 公益社団法人 一般社団法人 日本版著作権協会
社会貢献活動の推進に関する基本方針 _ ANPコミュニティ
この文書の基礎 [MITライセンス](../../../chinese/deprecated/LICENSE) 公開、あなたは自由にこの著作権宣言を使用および変更することができます。  