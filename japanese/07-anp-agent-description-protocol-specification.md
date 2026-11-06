<!-- translation-review: machine-fully-reviewed; scope=source lines 1-671; inventory=japanese/reviews/core-review.json; full prose compared against source -->
> 日本語参考訳（機械翻訳を原文と全文照合し、意味・用語を校閲済み）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [07-anp-agent-description-protocol-specification.md](../07-anp-agent-description-protocol-specification.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANPエージェント記述プロトコル仕様

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
3. [ANP-02](02-anp-did-authentication-protocol-specification.md)の共通DID認証を採用し、`did:wba`とネイティブの`did:web`に対応します。DID Documentはそれぞれのメソッドに従って検証します。
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
- 遠隔データをローカルに取得してモデルの文脈として処理することは、ユーザー情報の漏洩回避に役立ちます。タスク委任型の対話では、タスク内のユーザー情報が漏れる可能性があります。
- 自然な階層構造により、エージェントと他の多数のエージェントの相互作用が容易になります。

### コアコンセプト

情報とインターフェイスは、ANP エージェント記述仕様の中核概念です。

Informationはエージェントが外部へ提供するデータで、テキストファイル、画像、動画、音声などを含みます。

Interfaceはエージェントが外部へ提供するAPIです。次の2種類に分かれます。
- 自然言語インターフェース。エージェントが自然言語を通じてよりパーソナライズされたサービスを提供できるようにします。
- 構造化されたインターフェースにより、エージェントはより効率的で標準化されたサービスを提供できます。

自然言語インターフェイスはモデル機能を使用してほとんどのシナリオを満たすことができますが、構造化インターフェイスは多くのシナリオでエージェント間の通信効率を向上させることができます。したがって、現在、構造化インターフェースと自然言語インターフェースの両方をサポートし、効率とパーソナライゼーションのバランスを実現しています。構造化インターフェイスが利用可能な場合、モデルは構造化インターフェイスを優先する必要があります。構造化インターフェースがユーザーのニーズを満たせない場合は、自然言語インターフェースを使用できます。

すべてのエージェントが自然言語インターフェイスをサポートすることをお勧めします。

## エージェント説明文書の形式

エージェント説明文書は、エージェントの外部エントリ ポイントとして機能します。

AI 機能の向上の恩恵により、エージェント説明文書は完全に自然言語で記述でき、他のエージェントは基本的に表現された情報を理解できます。ただし、エージェントはさまざまな機能を持つ異なるモデルを使用するため、ほとんどのモデルがデータを統一的かつ正確に理解できるようにするために、エージェントの説明文書には構造化された記述アプローチを採用することをお勧めします。パーソナライズされた表現機能を強化するために、ドキュメントは内部的に自然言語を広範囲に使用できます。

### ANP 準拠エージェントの説明

エージェントの説明形式には、JSON 形式を使用することをお勧めします。標準の JSON に基づいて、ANP 準拠のエージェント記述ドキュメント形式を定義しました。

このリポジトリの例で使うANP固有・分野固有のフィールドについての
実践的な説明は、次の文書を参照してください。
[エージェント記述文書の拡張フィールド](docs/agent-description-extended-fields-guide.md)。

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
| type | string | 必須 | 文書型の識別子。エージェント記述文書では「AgentDescription」 |
| url | 文字列 | オプション | エージェントの場所を識別するために使用される、エージェントのネットワーク アクセス アドレス |
| name | string | 必須 | 人間に読みやすいエージェント名。例: 「Grand Hotel Assistant」 |
| did | string | 任意 | 本人性の検証に使うエージェントの分散型識別子 |
| owner | object | 任意 | 組織名やURLなどエージェント所有者の情報 |
| description | string | 任意 | 機能とサービスの詳しい説明 |
| created | string | 任意 | 記述文書の作成時刻。ISO 8601形式 |
| securityDefinitions | オブジェクト | 必須 | 認証方法とパラメータの場所を含むセキュリティメカニズムの定義 |
| security | string | 必須 | securityDefinitions の定義を参照する有効なセキュリティ構成の名前 |
| Infomations | array | 任意 | 製品、サービス、メディアファイルなど提供する情報リソースの一覧（フィールド名は原文の表記を保持） |
| interfaces | array | 任意 | 対応する対話インターフェース一覧。各種プロトコルやAPIを含みます |
| proof | object | 任意 | 改ざん防止のデジタル署名と完全性検証情報 |

##### 情報オブジェクトフィールドの説明

| フィールド名 | タイプ | 説明 |
|---------|------|------|
| type | string | 「Product」、「Information」、「VideoObject」などの情報タイプ |
| description | string | 情報内容の詳しい説明 |
| url | string | 情報リソースのアクセスアドレス |

##### インターフェースオブジェクトフィールドの説明

| フィールド名 | タイプ | 説明 |
|---------|------|------|
| type | string | インターフェース型。「NaturalLanguageInterface」「StructuredInterface」など |
| protocol | string | インターフェースが使うプロトコル。「YAML」「openrpc」「MCP」「WebRTC」など |
| version | string | インターフェースの版番号 |
| url | string | インターフェース定義文書のアドレス |
| description | string | インターフェースの機能・目的の説明 |
| humanAuthorization | boolean | 人による認可が必要かどうか。予約や支払いなどの慎重な扱いが必要な操作に適用 |


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
| type | string | 必須 | オブジェクト型。製品では「Product」 |
| url | string | 任意 | 製品情報のネットワークアドレス |
| identifier | string | 任意 | 製品の一意な識別子 |
| name | string | 必須 | 製品名 |
| description | string | 必須 | 製品の詳細説明 |
| brand | object | 任意 | 製品のブランド情報 |
| additionalProperty | array | 任意 | 製品の追加属性・特徴 |
| offers | object | 任意 | 製品の価格と提供可能性の情報 |
| amenityFeature | array | 任意 | 製品が提供する設備・機能 |
| category | string | 任意 | 製品カテゴリー |
| sku | 文字列 | オプション | 製品 SKU コード |
| image | array | 任意 | 製品画像の一覧 |
| audience | object | 任意 | 対象となる顧客層 |
| manufacturer | object | 任意 | 製品提供者の情報 |

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
| info | object | 必須 | 題名、版、説明などAPIの基本情報 |
| servers | array | 任意 | APIエンドポイントのアドレスを定義するサーバー一覧 |
| methods | array | 必須 | 呼び出し可能なメソッド一覧 |
| components | object | 任意 | schemasやsecuritySchemesを含む再利用可能な部品定義 |
| security | array | 任意 | セキュリティ要件定義 |


##### 情報オブジェクトフィールドの説明

| フィールド名 | タイプ | 説明 |
|---------|------|------|
| title | string | API名 |
| version | string | APIの版番号 |
| description | string | API機能の説明 |
| x-anp-protocol-type | 文字列 | ANP 拡張フィールド: プロトコル タイプ |
| x-anp-protocol-version | 文字列 | ANP 拡張フィールド: ANP プロトコルのバージョン |


##### メソッドオブジェクトフィールドの説明

| フィールド名 | タイプ | 説明 |
|---------|------|------|
| name | string | RPC 呼び出しに使用されるメソッド名 |
| summary | string | メソッドの短い説明 |
| description | string | メソッド機能の詳しい説明 |
| params | array | 入力パラメーター一覧。各パラメーターはname、description、required、schemaを含みます |
| result | object | name、description、schemaを含む返却結果の定義 |

##### コンポーネントオブジェクトフィールドの説明

| フィールド名 | タイプ | 説明 |
|---------|------|------|
| schemas | object | 再利用用のデータ構造定義 |
| securitySchemes | オブジェクト | セキュリティ認証スキーム定義 |

#### MCP サーバーインターフェイスドキュメントの説明

追記予定（原文も未記載）


### セキュリティメカニズム

エージェント記述プロトコルのDIDリクエスト認証は[ANP-02](02-anp-did-authentication-protocol-specification.md)に従います。`did:wba`とネイティブの`did:web`は共通の認証フローを使い、識別情報は各DIDメソッドに従って検証します。さらに他のメソッドにはANP-02のメソッドバインディング拡張を使います。

次の `DIDWBASecurityScheme` には、既存の WBA の説明ボキャブラリーと構成例が保持されています。新しい汎用スキーム識別子を定義することも、WBA 設定を他の DID メソッドの機能宣言にすることもありません。インターフェイス宣言とピア機能は、実際にサポートされているメソッドを識別する必要があります。

#### DIDWBASecurityScheme (DID WBA セキュリティ スキーム)

Did:wba メソッドに基づいてセキュリティ メカニズムを構成するためのメタデータについて説明します。スキーム名に割り当てられる値は、エージェントの説明に含まれる語彙で定義されている必要があります。

すべてのセキュリティ スキームにおいて、アクセスを直接提供するキー、パスワード、またはその他の機密情報は AD に保存してはならず、他のメカニズムを通じて共有し、アウトオブバンドで保存する必要があります。 AD の目的は、エージェントにアクセスする方法 (コンシューマがすでに許可されている場合) を記述することであり、その許可を与えることではありません。

通常、セキュリティ方式にはデジタル署名などの追加の認証パラメータが必要です。この情報の場所は、name に関連付けられた値によって示され、通常は in の値と組み合わされます。in に関連付けられた値は、次のいずれかの値を取ることができます。

- header: プロトコルのヘッダーでパラメーターを指定し、そのヘッダー名はnameの値で示します。ANP-02の初回署名は`Signature-Input`と`Signature`を使い、本文がある場合は`Content-Digest`も使います。`Authorization`は後続の任意Bearerアクセストークンを運ぶもので、初回署名の代わりではありません。
- query: nameが示す名前のクエリーパラメーターとしてURIに追加します。
- body: リクエスト本文でパラメーターを提供し、使うデータスキーマ要素をnameで示します。
- cookie: パラメータは、name の値によって識別される cookie に保存されます。
- uri: パラメーターは URI 自体に埋め込まれ、関連するインタラクションで定義された URI テンプレート変数 (name の値で定義) によってエンコードされます。
- auto: 場所はプロトコルの一部として決定またはネゴシエートされます。 SecurityScheme の in フィールドが auto 値に設定されている場合、name フィールドは設定しないでください。

表 2: セキュリティ方式レベルの語彙用語

| 語彙用語 | 説明 | 必須 | タイプ |
|---------|------|---------|------|
| type | オブジェクトにセマンティック タグを追加するために使用されるオブジェクト タイプの識別子。 | オプション | 文字列 |
| description | 既定言語で追加の、人間に読みやすい情報を提供します | 任意 | string |
| scheme | セキュリティ機構の識別子 | 必須 | string |
| in | 認証パラメーターの場所 | 必須 | string |
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

### 人による手動認可

購入インターフェイスなど、インターフェイスの呼び出し時に人間による手動による承認が必要な場合、フィールド humanAuthorization をインターフェイス定義に追加できます。値 true は、インターフェイス呼び出しにアクセスするには人間による手動の承認が必要であることを示します。

`humanAuthorization`はインターフェース単位で人の認可を要することを示します。DIDの検証関係、認可資格情報、認可完了の証明ではありません。DIDリクエスト認証は引き続き[ANP-02](02-anp-did-authentication-protocol-specification.md)の`authentication`で参照する検証メソッドを使います。人の認可の取得・証明方法はこのフィールドの範囲外で、該当業務プロトコルと認可ポリシーが決めます。

### 証明（完全性検証）

AD ドキュメントが悪意を持って改ざん、偽造、または再生されるのを防ぐために、AD ドキュメントに検証情報 Proof を追加しました。 Proof 定義は仕様を参照できます。 [https://www.w3.org/TR/vc-data-integrity/#defn-domain](https://www.w3.org/TR/vc-data-integrity/#defn-domain).

各項目の意味は次のとおりです。
- domain: AD ドキュメントが保存されるドメインを定義します。ドキュメントを取得した後、ユーザーはドキュメントの取得元のドメインがドメインで定義されたドメインと一致することを確認する必要があります。一致しない場合、文書は偽造される可能性があります。
- challenge: 改ざんを防止するために使用される検証チャレンジ情報を定義します。ドメインを指定する場合は、チャレンジも指定する必要があります。
- verificationMethod: 検証方法を定義します。現在、did:wba ドキュメントの検証方法を使用しています。将来的にはさらに多くのメソッドが拡張される可能性があります。
- proofValue: デジタル署名を保持します。生成ルールは次のとおりです。
  - proofValue フィールドを使用せずに Web サイトの AD ドキュメントを生成します
  - [JCS（JSON Canonicalization Scheme）](https://www.rfc-editor.org/rfc/rfc8785)で上のAD文書を正規化し、正規文字列を生成します。
  - SHA-256 アルゴリズムを使用して正規文字列をハッシュし、ハッシュ値を生成します。
  - クライアントの秘密キーを使用してハッシュ値に署名し、署名値を生成し、URL セーフな Base64 エンコードを実行します。
  - 署名検証プロセスは上記のプロセスの逆です。


## 共通定義の標準化

コーヒーやおもちゃなどの特定の製品またはサービスについては、schema.org の Product プロパティのサブセットを使用して特定のタイプを定義し、製品の説明方法を明確にすることができます。このようにして、すべてのエージェントは製品データを構築するときに統一された定義を使用でき、異なるエージェント間の相互運用性が容易になります。

同様のアプローチをインターフェースにも使用できます。たとえば、製品購入インターフェイスの場合、すべてのエージェントが使用できる統一された購入インターフェイス仕様を定義して、異なるエージェント間の相互運用性を促進できます。





## 著作権表示
著作権 (c) 2024 ANP コミュニティ
本書は[Apache License 2.0](../LICENSE)の下で公開されています。その条件で自由に使用・変更できますが、この著作権表示を保持する必要があります。
