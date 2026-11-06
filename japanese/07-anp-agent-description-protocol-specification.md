> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [07-anp-agent-description-protocol-specification.md](../07-anp-agent-description-protocol-specification.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP エージェントの説明 プロトコル仕様

- 文書ID: ANP-07
- タイトル: ANP エージェント記述プロトコル仕様
- ステータス: リリース済み
- バージョン: 1.2
- 原文言語: English / このページは日本語参考訳
- 適用性: この仕様は、ANP でのエージェント記述文書、インターフェース記述、および機能公開に適用されます。

## 要約

この仕様は、エージェントを記述するための標準化されたプロトコルである Agent description Protocol (ADP) を定義します。これは、エージェントがその公開情報、サポートされているインターフェイス、およびその他の詳細を公開する方法を定義します。他のエージェントがこのエージェントの説明を取得すると、情報を交換し、このエージェントと協力することができます。

この仕様は、ANP プロトコルに基づいた 2 つのエージェント間の情報対話パターンを定義します。

仕様の中核となる内容は次のとおりです。
1. 基本データ形式として JSON を使用し、リンクされたデータとセマンティック Web 機能をサポート
2. エージェントの基本情報、製品、サービス、インターフェースなどの中核となる語彙を定義します。
3. で定義された共通 DID 認証を採用 [ANP-02](02-anp-did-authentication-protocol-specification.md)、サポート `did:wba` そしてネイティブ `did:web`、それぞれの方法で検証された DID ドキュメントを使用
4. 既存の標準プロトコル（OpenAPI、JSON-RPCなど）との相互運用性をサポート

この仕様は、エージェント間の相互運用性と通信効率を向上させ、エージェント ネットワークの構築に基礎的なサポートを提供することを目的としています。

情報相互作用パターン設計、互換性設計、

## 概要

エージェント説明 (AD) ドキュメントは、Web サイトのホームページと同様に、エージェントにアクセスするためのエントリ ポイントとして機能します。他のエージェントは、エージェントの名前、関連エンティティ、機能、製品、サービス、対話 API、プロトコルなどの情報をこの AD ドキュメントから取得できます。この情報を使用して、エージェント間のデータ通信とコラボレーションを実現できます。

この仕様は主に、2 つのエージェント間の情報対話パターンの定義と、エージェント記述文書の形式の定義という 2 つの問題に対処します。

### 情報対話パターン

ANP は、「Web クローラー」に似た情報対話パターンを採用しており、エージェントは URL を使用して、外部から提供されたデータ (ファイル、API など) とデータ記述をネットワークに接続します。他のエージェントは、クローラと同様に、データの説明に基づいて適切なデータを選択してローカル環境に取得し、ローカルで意思決定を行って処理できます。 API ファイルの場合、エージェントは API を呼び出してエージェントと対話することもできます。

![anp 情報インタラクト](../images/anp-information-interact.png)

「Web クローラー」スタイルの情報対話パターンには、次の利点があります。
- 既存のインターネット アーキテクチャと同様、エージェントの公開情報の検索エンジンのインデックス作成を容易にし、効率的なエージェント データ ネットワークを作成します。
- リモート データをローカルにプルしてモデル コンテキストとして処理すると、ユーザーのプライバシーの漏洩を回避できます。タスク委任の対話パターンにより、タスク内のユーザーのプライバシーが漏洩する可能性があります。
- 自然な階層構造により、エージェントと他の多数のエージェントの相互作用が容易になります。

### コアコンセプト

情報とインターフェイスは、ANP エージェント記述仕様の中核概念です。

情報とは、エージェントによって外部から提供されるテキスト ファイル、画像、ビデオ、音声などのデータを指します。

インターフェースとは、エージェントによって外部から提供される API を指します。インターフェイスは 2 つのカテゴリに分類されます。
- 自然言語インターフェース。エージェントが自然言語を通じてよりパーソナライズされたサービスを提供できるようにします。
- 構造化されたインターフェースにより、エージェントはより効率的で標準化されたサービスを提供できます。

自然言語インターフェイスはモデル機能を使用してほとんどのシナリオを満たすことができますが、構造化インターフェイスは多くのシナリオでエージェント間の通信効率を向上させることができます。したがって、現在、構造化インターフェースと自然言語インターフェースの両方をサポートし、効率とパーソナライゼーションのバランスを実現しています。構造化インターフェイスが利用可能な場合、モデルは構造化インターフェイスを優先する必要があります。構造化インターフェースがユーザーのニーズを満たせない場合は、自然言語インターフェースを使用できます。

すべてのエージェントが自然言語インターフェイスをサポートすることをお勧めします。

## エージェント説明文書の形式

エージェント説明文書は、エージェントの外部エントリ ポイントとして機能します。

AI 機能の向上の恩恵により、エージェント説明文書は完全に自然言語で記述でき、他のエージェントは基本的に表現された情報を理解できます。ただし、エージェントはさまざまな機能を持つ異なるモデルを使用するため、ほとんどのモデルがデータを統一的かつ正確に理解できるようにするために、エージェントの説明文書には構造化された記述アプローチを採用することをお勧めします。パーソナライズされた表現機能を強化するために、ドキュメントは内部的に自然言語を広範囲に使用できます。

### ANP 準拠エージェントの説明

エージェントの説明形式には、JSON 形式を使用することをお勧めします。標準の JSON に基づいて、ANP 準拠のエージェント記述ドキュメント形式を定義しました。

で使用される ANP 固有およびドメイン固有のフィールドに関する実践的なガイダンスについては、
このリポジトリの例については、を参照してください。
[エージェント説明文書の拡張フィールド](docs/agent-description-extended-fields-guide.md).

#### エージェント説明文書

以下は、エージェント説明ドキュメントの例です。

次の注釈付き JSON 例にはコメントが含まれています。 JSON として送信する前にそれらを削除してください。

```jsonc
{
  "protocolType": "ANP",
  "protocolVersion": "1.0.0",
  "type": "AgentDescription",
  "url": "https://grand-hotel.com/agents/hotel-assistant/ad.json",
  "name": "Grand Hotel Assistant",
  "did": "did:wba:grand-hotel.com:service:hotel-assistant",
  "owner": {
    "type": "Organization",
    "name": "Grand Hotel Management Group",
    "url": "https://grand-hotel.com"
  },
  "description": "Grand Hotel Assistant is an intelligent hospitality agent providing comprehensive hotel services including room booking, concierge services, guest assistance, and real-time communication capabilities.",
  "created": "2024-12-31T12:00:00Z",
  "securityDefinitions": {
    "didwba_sc": {
      "scheme": "didwba",
      "in": "header",
      "name": "Authorization"
    }
  },
  "security": "didwba_sc",
  "Infomations": [
    {
      "type": "Product",
      "description": "Luxury hotel rooms with premium amenities and personalized services.",
      "url": "https://grand-hotel.com/products/luxury-rooms.json"
    },
    {
      "type": "Product", 
      "description": "Comprehensive concierge and guest services including dining, spa, and local attractions.",
      "url": "https://grand-hotel.com/products/concierge-services.json"
    },
    {
      "type": "Information",
      "description": "Complete hotel information including facilities, amenities, location, and policies.",
      "url": "https://grand-hotel.com/info/hotel-basic-info.json"
    },
    {
      "type": "VideoObject",
      "description": "Hotel virtual tour showcasing rooms, facilities, dining areas, and recreational amenities.",
      "url": "https://grand-hotel.com/media/hotel-tour-video.mp4"
    }
  ],
  "interfaces": [
    {
      "type": "NaturalLanguageInterface",
      "protocol": "YAML",
      "version": "1.2.2",
      "url": "https://grand-hotel.com/api/nl-interface.yaml",
      "description": "Natural language interface for conversational hotel services and guest assistance."
    },
    {
      "type": "StructuredInterface",
      "protocol": "YAML",
      "humanAuthorization": true,
      "version": "1.1",
      "url": "https://grand-hotel.com/api/booking-interface.yaml",
      "description": "Structured interface for hotel room booking and reservation management."
    },
    {
      "type": "StructuredInterface",
      "protocol": "openrpc",
      "url": "https://grand-hotel.com/api/services-interface.json",
      "description": "openrpc interface for accessing hotel services and amenities."
    },
    {
      "type": "StructuredInterface",
      "protocol": "openrpc",
      "description": "OpenRPC interface for accessing hotel services.",
      "content": {}  // See "OpenRPC Interface Description Document" section below for details
    },
    {
      "type": "StructuredInterface",
      "protocol": "MCP",
      "version": "1.0",
      "url": "https://grand-hotel.com/api/mcp-interface.json",
      "description": "MCP-compatible interface for seamless integration with MCP-based systems."
    },
    {
      "type": "StructuredInterface",
      "protocol": "WebRTC",
      "version": "1.0",
      "url": "https://grand-hotel.com/api/webrtc-interface.yaml",
      "description": "WebRTC interface for real-time video communication and streaming services."
    }
  ],
  "proof": {
    "type": "EcdsaSecp256r1Signature2019",
    "created": "2024-12-31T15:00:00Z",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "did:wba:grand-hotel.com:service:hotel-assistant#keys-1",
    "challenge": "1235abcd6789",
    "proofValue": "z58DAdFfa9SkqZMVPxAQpic7ndSayn1PzZs6ZjWp1CktyGesjuTSwRdoWhAfGFCF5bppETSTojQCrfFPP2oumHKtz"
  }
}

```

##### ホテルエージェント説明文書フィールドの説明

| フィールド名 | タイプ | 必須 | 説明 |
|---------|------|---------|------|
|protocolType |文字列 |必須 |プロトコルタイプ識別子、固定値「ANP」|
| protocolVersion | 文字列 | 必須 | ANP プロトコルのバージョン番号、現在は「1.0.0」 |
| タイプ | 文字列 | 必須 | 文書タイプ識別子、エージェント説明文書の場合は「AgentDescription」 |
| url | 文字列 | オプション | エージェントの場所を識別するために使用される、エージェントのネットワーク アクセス アドレス |
| 名前 | 文字列 | 必須 | 人間が読めるエージェントの名前（例：「Grand Hotel Assistant」） |
| Did | string | オプション | 身元確認に使用されるエージェントの分散型識別子 |
| 所有者 | オブジェクト | オプション | 組織名と URL を含むエージェント所有者情報 |
| 説明 | 文字列 | オプション | エージェントの詳細な機能説明とサービス説明 |
| 作成されました | 文字列 | オプション | エージェント説明文書の作成時刻、ISO 8601 形式 |
| securityDefinitions | オブジェクト | 必須 | 認証方法とパラメータの場所を含むセキュリティメカニズムの定義 |
| security | string | 必須 | securityDefinitions の定義を参照する有効なセキュリティ構成の名前 |
| 情報 | 配列 | オプション | 製品、サービス、メディアファイルなど、エージェントによって提供される情報リソースのリスト |
| インターフェース | アレイ | オプション | さまざまなプロトコルや API を含む、エージェントによってサポートされる対話インターフェースのリスト |
| 証明 | オブジェクト | オプション | 文書の改ざんを防ぐためのデジタル署名と整合性検証情報 |

##### 情報オブジェクトフィールドの説明

| フィールド名 | タイプ | 説明 |
|---------|------|------|
| type | string | 「Product」、「Information」、「VideoObject」などの情報タイプ |
| 説明 | 文字列 | 情報内容の詳細説明 |
| url | string | 情報リソースのアクセスアドレス |

##### インターフェースオブジェクトフィールドの説明

| フィールド名 | タイプ | 説明 |
|---------|------|------|
| タイプ | 文字列 | 「NaturalLanguageInterface」、「StructuredInterface」などのインターフェイスのタイプ |
| プロトコル | 文字列 | 「YAML」、「openrpc」、「MCP」、「WebRTC」など、インターフェイスで使用されるプロトコル |
| バージョン | 文字列 | インターフェースのバージョン番号 |
| url | string | インターフェース定義文書のアドレス |
| 説明 | 文字列 | インターフェースの機能と目的の説明 |
| humanAuthorization | boolean | 人間の承認が必要かどうか、支払いの予約などの機密性の高い操作に適用されます |


#### 製品説明文書

以下は製品説明の例です。

```json
{
  "protocolType": "ANP",
  "protocolVersion": "1.0.0",
  "type": "Product",
  "url": "https://grand-hotel.com/products/deluxe-suite.json",
  "identifier": "deluxe-suite-001",
  "name": "Deluxe Suite",
  "description": "A luxurious suite featuring a separate living room and bedroom, equipped with panoramic floor-to-ceiling windows, premium audio system, and smart home controls. Ideal for business professionals and high-end guests.",
  "security": {
    "didwba": {
      "scheme": "didwba",
      "in": "header",
      "name": "Authorization"
    }
  },
  "brand": {
    "type": "Brand",
    "name": "Grand Hotel"
  },
  "additionalProperty": [
    {
      "type": "PropertyValue",
      "name": "Room Size",
      "value": "80 square meters"
    },
    {
      "type": "PropertyValue", 
      "name": "Bed Type",
      "value": "King Size Bed"
    }
  ],
  "offers": {
    "type": "Offer",
    "price": "1288",
    "priceCurrency": "CNY",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2025-12-31"
  },
  "amenityFeature": [
    {
      "type": "LocationFeatureSpecification",
      "name": "Free WiFi",
      "value": true
    },
    {
      "type": "LocationFeatureSpecification", 
      "name": "Air Conditioning",
      "value": true
    }
  ],
  "category": "Hotel Room",
  "sku": "GH-DELUXE-SUITE-001",
  "image": [
    {
      "type": "ImageObject",
      "url": "https://grand-hotel.com/images/deluxe-suite-bedroom.jpg",
      "caption": "Deluxe Suite - Bedroom Area",
      "description": "Spacious bedroom with king-size bed and premium bedding"
    },
    {
      "type": "ImageObject",
      "url": "https://grand-hotel.com/images/deluxe-suite-living.jpg", 
      "caption": "Deluxe Suite - Living Area",
      "description": "Separate living room with sofa, coffee table, and work area"
    },
    {
      "type": "ImageObject",
      "url": "https://grand-hotel.com/images/deluxe-suite-view.jpg",
      "caption": "Deluxe Suite - City View",
      "description": "Panoramic floor-to-ceiling windows offering excellent city views"
    }
  ],
  "audience": {
    "type": "Audience",
    "audienceType": "Business travelers, high-end guests",
    "geographicArea": "Global"
  },
  "manufacturer": {
    "type": "Organization", 
    "name": "Grand Hotel Management Group",
    "url": "https://grand-hotel.com"
  }
}
```

##### 製品説明文書フィールドの説明

| フィールド名 | タイプ | 必須 | 説明 |
|---------|------|---------|------|
|protocolType |文字列 |必須 |プロトコルタイプ識別子、固定値「ANP」|
| protocolVersion | 文字列 | 必須 | ANP プロトコルのバージョン番号 |
| タイプ | 文字列 | 必須 | オブジェクトタイプ、製品の場合は「Product」 |
| url | string | 任意 | 製品情報のネットワークアドレス |
| 識別子 | 文字列 | オプション | 製品の一意の識別子 |
| 名前 | 文字列 | 必須 | 製品名 |
| 説明 | 文字列 | 必須 | 詳細な製品説明 |
| ブランド | オブジェクト | オプション | 製品ブランド情報 |
|AdditionalProperty | array | オプション | 製品の追加プロパティと特性 |
| は、| オブジェクト | オプション | 製品 | の価格と在庫情報を提供します
| amenityFeature | アレイ | オプション | 製品によって提供される機能と機能 |
| カテゴリ | 文字列 | オプション | 製品カテゴリ |
| sku | 文字列 | オプション | 製品 SKU コード |
| 画像 | アレイ | オプション | 製品画像リスト |
| オーディエンス | オブジェクト | オプション | ターゲット顧客グループ |
| メーカー | オブジェクト | オプション | 製品プロバイダー情報 |

#### OpenRPC インターフェース説明文書

以下は、OpenRPC 仕様に準拠したインターフェース記述文書の例です。

```json
{
  "openrpc": "1.3.2",
  "info": {
    "title": "Grand Hotel Services API",
    "version": "1.0.0",
    "description": "JSON-RPC 2.0 API for hotel services including room management, booking, and guest services",
    "x-anp-protocol-type": "ANP",
    "x-anp-protocol-version": "1.0.0"
  },
  "security": [
    {
      "didwba": []
    }
  ],
  "servers": [
    {
      "name": "Production Server",
      "url": "https://grand-hotel.com/api/v1/hotel/jsonrpc",
      "description": "Production server for Grand Hotel API"
    }
  ],
  "methods": [
    {
      "name": "searchRooms",
      "summary": "Search available hotel rooms",
      "description": "Search available hotel rooms based on criteria such as dates, number of guests, and room type",
      "params": [
        {
          "name": "searchCriteria",
          "description": "Room search criteria",
          "required": true,
          "schema": {
            "type": "object",
            "properties": {
              "checkIn": {
                "type": "string",
                "format": "date",
                "description": "Check-in date in YYYY-MM-DD format"
              },
              "checkOut": {
                "type": "string", 
                "format": "date",
                "description": "Check-out date in YYYY-MM-DD format"
              },
              "guests": {
                "type": "integer",
                "minimum": 1,
                "maximum": 8,
                "description": "Number of guests"
              },
              "roomType": {
                "type": "string",
                "enum": ["standard", "deluxe", "suite", "presidential"],
                "description": "Preferred room type"
              }
            },
            "required": ["checkIn", "checkOut", "guests"]
          }
        }
      ],
      "result": {
        "name": "searchResult",
        "description": "Search results containing available rooms",
        "schema": {
          "type": "object",
          "properties": {
            "rooms": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Room"
              }
            },
            "total": {
              "type": "integer",
              "description": "Total number of available rooms"
            }
          }
        }
      }
    },
    {
      "name": "makeReservation",
      "summary": "Create hotel reservation",
      "description": "Create a new hotel reservation with guest information and booking details",
      "params": [
        {
          "name": "reservationData",
          "description": "Reservation information",
          "required": true,
          "schema": {
            "type": "object",
            "properties": {
              "roomId": {
                "type": "string",
                "description": "Unique room identifier"
              },
              "guestInfo": {
                "$ref": "#/components/schemas/GuestInfo"
              },
              "checkIn": {
                "type": "string",
                "format": "date",
                "description": "Check-in date"
              },
              "checkOut": {
                "type": "string",
                "format": "date",
                "description": "Check-out date"
              },
              "specialRequests": {
                "type": "string",
                "description": "Special requests or preferences"
              }
            },
            "required": ["roomId", "guestInfo", "checkIn", "checkOut"]
          }
        }
      ],
      "result": {
        "name": "reservationResult",
        "description": "Reservation confirmation details",
        "schema": {
          "type": "object",
          "properties": {
            "reservationId": {
              "type": "string",
              "description": "Unique reservation identifier"
            },
            "confirmationNumber": {
              "type": "string",
              "description": "Booking confirmation number"
            },
            "totalAmount": {
              "type": "number",
              "description": "Total reservation amount"
            }
          }
        }
      }
    }
  ],
  "components": {
    "securitySchemes": {
      "didwba": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "DID-WBA",
        "description": "DID-WBA authentication scheme"
      }
    },
    "schemas": {
      "Room": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Unique room identifier"
          },
          "type": {
            "type": "string",
            "description": "Room type"
          },
          "price": {
            "type": "number",
            "description": "Room price per night"
          },
          "amenities": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "List of room amenities"
          },
          "availability": {
            "type": "boolean",
            "description": "Room availability status"
          }
        }
      },
      "GuestInfo": {
        "type": "object",
        "properties": {
          "firstName": {
            "type": "string",
            "description": "Guest's first name"
          },
          "lastName": {
            "type": "string",
            "description": "Guest's last name"
          },
          "email": {
            "type": "string",
            "format": "email",
            "description": "Guest's email address"
          },
          "phone": {
            "type": "string",
            "description": "Guest's phone number"
          }
        },
        "required": ["firstName", "lastName", "email"]
      }
    }
  }
}
```

##### OpenRPC 仕様フィールドの説明

| フィールド名 | タイプ | 必須 | 説明 |
|---------|------|---------|------|
| openrpc | 文字列 | 必須 | OpenRPC 仕様バージョン、現在「1.3.2」を使用 |
| 情報 | オブジェクト | 必須 | タイトル、バージョン、説明などを含む API の基本情報 |
| サーバー | アレイ | オプション | サーバーリスト、API エンドポイントアドレスを定義 |
| メソッド | 配列 | 必須 | 呼び出し可能なメソッドのリスト |
| コンポーネント | オブジェクト | オプション | 再利用可能なコンポーネント定義 (スキーマと securitySchemes を含む) |
| セキュリティ | アレイ | オプション | セキュリティ要件定義 |


##### 情報オブジェクトフィールドの説明

| フィールド名 | タイプ | 説明 |
|---------|------|------|
| タイトル | 文字列 | API 名 |
| バージョン | 文字列 | API バージョン番号 |
| 説明 | 文字列 | API 機能の説明 |
| x-anp-protocol-type | 文字列 | ANP 拡張フィールド: プロトコル タイプ |
| x-anp-protocol-version | 文字列 | ANP 拡張フィールド: ANP プロトコルのバージョン |


##### メソッドオブジェクトフィールドの説明

| フィールド名 | タイプ | 説明 |
|---------|------|------|
| name | string | RPC 呼び出しに使用されるメソッド名 |
| 概要 | 文字列 | メソッドの簡単な説明 |
| 説明 | 文字列 | メソッド機能の詳細な説明 |
| params | array | 入力パラメータリスト、各パラメータには名前、説明、必須、スキーマが含まれます |
| 結果 | オブジェクト | 名前、説明、スキーマを含む結果定義を返します |

##### コンポーネントオブジェクトフィールドの説明

| フィールド名 | タイプ | 説明 |
|---------|------|------|
| スキーマ | オブジェクト | 再利用のためのデータ構造定義 |
| securitySchemes | オブジェクト | セキュリティ認証スキーム定義 |

#### MCP サーバーインターフェイスドキュメントの説明

補足する


### セキュリティメカニズム

Agent description Protocol での DID リクエスト認証は次のとおりです [ANP-02](02-anp-did-authentication-protocol-specification.md). `did:wba` そしてネイティブ `did:web` 適用可能な DID メソッドに基づいて ID マテリアルが検証される間、認証フローを共有します。さらなるメソッドでは、ANP-02 メソッド バインディング拡張メカニズムが使用されます。

次の `DIDWBASecurityScheme` には、既存の WBA の説明ボキャブラリーと構成例が保持されています。新しい汎用スキーム識別子を定義することも、WBA 設定を他の DID メソッドの機能宣言にすることもありません。インターフェイス宣言とピア機能は、実際にサポートされているメソッドを識別する必要があります。

#### DIDWBASecurityScheme (DID WBA セキュリティ スキーム)

Did:wba メソッドに基づいてセキュリティ メカニズムを構成するためのメタデータについて説明します。スキーム名に割り当てられる値は、エージェントの説明に含まれる語彙で定義されている必要があります。

すべてのセキュリティ スキームにおいて、アクセスを直接提供するキー、パスワード、またはその他の機密情報は AD に保存してはならず、他のメカニズムを通じて共有し、アウトオブバンドで保存する必要があります。 AD の目的は、エージェントにアクセスする方法 (コンシューマがすでに許可されている場合) を記述することであり、その許可を与えることではありません。

通常、セキュリティ方式にはデジタル署名などの追加の認証パラメータが必要です。この情報の場所は、name に関連付けられた値によって示され、通常は in の値と組み合わされます。in に関連付けられた値は、次のいずれかの値を取ることができます。

- header: パラメーターはプロトコルによって提供されるヘッダーで指定され、name の値によって提供されるヘッダー名が付けられます。初期の ANP-02 署名は使用します `Signature-Input` そして `Signature`、プラス `Content-Digest` 肉体が存在するとき。 `Authorization` オプションの後続のベアラー アクセス トークンを保持します。最初の署名は置き換えられません。
- query: パラメーターは、名前で指定されたクエリ パラメーター名とともにクエリ パラメーターとして URI に追加されます。
- body: パラメーターは、名前で指定された使用されるデータ スキーマ要素とともに、リクエスト ペイロードの本文で提供されます。
- cookie: パラメータは、name の値によって識別される cookie に保存されます。
- uri: パラメーターは URI 自体に埋め込まれ、関連するインタラクションで定義された URI テンプレート変数 (name の値で定義) によってエンコードされます。
- auto: 場所はプロトコルの一部として決定またはネゴシエートされます。 SecurityScheme の in フィールドが auto 値に設定されている場合、name フィールドは設定しないでください。

表 2: セキュリティ方式レベルの語彙用語

| 語彙用語 | 説明 | 必須 | タイプ |
|---------|------|---------|------|
| type | オブジェクトにセマンティック タグを追加するために使用されるオブジェクト タイプの識別子。 | オプション | 文字列 |
| 説明 | デフォルト言語に基づいて追加の (人間が読める) 情報を提供します。 | オプション | 文字列 |
| スキーム | セキュリティメカニズム識別子 | 必須 | 文字列 |
| の | 認証パラメータの場所。 | 必須 | 文字列 |
| name | 認証パラメータの名前。 | 必須 | 文字列 |

次に、did:wba メソッドを使用したセキュリティ構成の例を示します。

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

上記の`Authorization` 設定では、オプションのアクセス トークン キャリッジのみが説明されており、最初の ANP-02 署名に必要なすべてのヘッダーが説明されているわけではありません。実際のリクエストの構築と検証は ANP-02 に従います。

AD でのセキュリティ構成が必要です。セキュリティ定義は、エージェント レベルのセキュリティ メンバーを通じてアクティブ化する必要があります。この構成は、エージェントとの対話に必要なセキュリティ メカニズムです。

AD ドキュメントの最上位にセキュリティが表示される場合、すべてのリソースがアクセス時にこのセキュリティ メカニズムを使用して検証される必要があることを示します。これが特定のリソース内に表示される場合は、このセキュリティ メカニズムが満たされている場合にのみリソースにアクセスできることを示します。最上位で指定されたセキュリティがリソースで指定されたセキュリティと異なる場合は、リソースで指定されたセキュリティが優先されます。

### 人間マニュアル認証

購入インターフェイスなど、インターフェイスの呼び出し時に人間による手動による承認が必要な場合、フィールド humanAuthorization をインターフェイス定義に追加できます。値 true は、インターフェイス呼び出しにアクセスするには人間による手動の承認が必要であることを示します。

`humanAuthorization` インターフェイスレベルの人間による承認要件を示します。これは、DID 検証関係、承認資格情報、または承認が完了したことの証明ではありません。 DID ベースのリクエスト認証では、以下で参照される検証方法が引き続き使用されます。 `authentication` で [ANP-02](02-anp-did-authentication-protocol-specification.md)。人間による承認がどのように取得または証明されるかは、この分野の範囲外であり、適用されるビジネス プロトコルと承認ポリシーによって決定されます。

### 証明（完全性検証）

AD ドキュメントが悪意を持って改ざん、偽造、または再生されるのを防ぐために、AD ドキュメントに検証情報 Proof を追加しました。 Proof 定義は仕様を参照できます。 [https://www.w3.org/TR/vc-data-integrity/#defn-domain](https://www.w3.org/TR/vc-data-integrity/#defn-domain).

場所:
- domain: AD ドキュメントが保存されるドメインを定義します。ドキュメントを取得した後、ユーザーはドキュメントの取得元のドメインがドメインで定義されたドメインと一致することを確認する必要があります。一致しない場合、文書は偽造される可能性があります。
- challenge: 改ざんを防止するために使用される検証チャレンジ情報を定義します。ドメインを指定する場合は、チャレンジも指定する必要があります。
- verificationMethod: 検証方法を定義します。現在、did:wba ドキュメントの検証方法を使用しています。将来的にはさらに多くのメソッドが拡張される可能性があります。
- proofValue: デジタル署名を保持します。生成ルールは次のとおりです。
  - proofValue フィールドを使用せずに Web サイトの AD ドキュメントを生成します
  - 使用する [JCS (JSON 正規化スキーム)](https://www.rfc-editor.org/rfc/rfc8785) 上記の AD ドキュメントを正規化し、正規文字列を生成します。
  - SHA-256 アルゴリズムを使用して正規文字列をハッシュし、ハッシュ値を生成します。
  - クライアントの秘密キーを使用してハッシュ値に署名し、署名値を生成し、URL セーフな Base64 エンコードを実行します。
  - 署名検証プロセスは上記のプロセスの逆です。


## 共通定義の標準化

コーヒーやおもちゃなどの特定の製品またはサービスについては、schema.org の Product プロパティのサブセットを使用して特定のタイプを定義し、製品の説明方法を明確にすることができます。このようにして、すべてのエージェントは製品データを構築するときに統一された定義を使用でき、異なるエージェント間の相互運用性が容易になります。

同様のアプローチをインターフェースにも使用できます。たとえば、製品購入インターフェイスの場合、すべてのエージェントが使用できる統一された購入インターフェイス仕様を定義して、異なるエージェント間の相互運用性を促進できます。





## 著作権表示
著作権 (c) 2024 ANP コミュニティ
この文書は以下に基づいてリリースされています [Apache ライセンス 2.0](../LICENSE)。ライセンスの条項に基づいて自由に使用および変更できますが、この著作権表示は保持しておく必要があります。
