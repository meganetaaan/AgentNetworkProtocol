<!-- translation-review: full; source=chinese/07-ANP-智能体描述协议规范.md; basis=complete source-based manual translation and reading of all examples -->
> 日本語参考訳（機械翻訳を基に原文全文を照合済み）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [chinese/07-ANP-智能体描述协议规范.md](../../chinese/07-ANP-智能体描述协议规范.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP：エージェント記述プロトコル仕様

- 文書番号：ANP-07
- タイトル：ANP：エージェント記述プロトコル仕様
- 状態：公開済み
- バージョン：1.2
- 原文言語：中国語
- 適用範囲：本仕様は、ANP のエージェント記述文書、インターフェース記述、能力の公開に適用します。

## 概要

本仕様は、エージェントを記述するための標準化されたプロトコルである、エージェント記述プロトコル（Agent Description Protocol, ADP）を定義します。エージェントが、自身の公開情報や対応する Interface などを、どのように外部へ公開するかを定めます。他のエージェントは、この記述を取得すれば、対象エージェントと情報を交換し、協調できます。

本仕様は、ANP に基づく、2 体のエージェント間の情報交換モデルを定義します。

仕様の中心となる内容は、次のとおりです。
1. 基本のデータ形式に JSON を使い、リンクトデータとセマンティック Web の特徴に対応する。
2. エージェントの基本情報、製品、サービス、インターフェースなどの主要な語彙を定義する。
3. [ANP-02](02-ANP-基于DID的身份认证协议.md) が定義する汎用の DID 認証を採用し、`did:wba` とネイティブの `did:web` に対応する。DID Document は、対応するメソッドに従って検証する。
4. OpenAPI、JSON-RPC など、既存の標準プロトコルとの相互運用に対応する。

本仕様は、エージェント間の相互運用性と通信効率を高め、エージェントネットワークの構築の基盤を提供することを目指します。

情報交換モデルの設計、互換性の設計、

## 全体像

エージェント記述（Agent Description, AD）文書は、Web サイトのホームページのように、エージェントへアクセスする入口です。他のエージェントは、この AD 文書から、エージェントの名前、所属する主体、機能、製品、サービス、対話用の API やプロトコルなどの情報を取得します。これにより、エージェント間のデータ通信と協調を実現できます。

本仕様は、主に 2 つの課題を扱います。エージェント間の情報交換モデルの定義と、エージェント記述文書の形式の定義です。

### 情報交換モデル

ANP は、「Web クローラー」に似た情報交換モデルを採用します。エージェントが、外部へ提供するデータ（ファイル、API など）と、その記述を URL でつなぎ、ネットワークにします。他のエージェントは、クローラーのように、データの記述を基に適切なデータを選んでローカルに読み込み、ローカルで判断・処理できます。API のファイルであれば、その API を呼び出してエージェントとやり取りすることもできます。

![ANP の情報交換](../../images/anp-information-interact.png)

「Web クローラー」方式の情報交換には、次の利点があります。
- 既存のインターネットの構成と似ており、検索エンジンがエージェントの公開情報を索引化し、効率的なエージェントのデータネットワークを作りやすい。
- 遠隔のデータをローカルに取得し、モデルのコンテキストとして処理することで、ユーザーのプライバシーの漏えいを防ぎやすい。タスクを分配する対話モデルでは、タスクを通じてユーザーのプライバシーが漏れる。
- 自然な階層構造により、多数の他のエージェントとやり取りしやすい。

### 中心となる概念

Information と Interface が、ANP エージェント記述仕様の中心となる概念です。

information は、テキストファイル、画像、動画、音声など、エージェントが外部へ提供するデータです。

interface は、エージェントが外部へ提供するインターフェースです。Interface は、次の 2 種類に分かれます。
- 自然言語インターフェース：エージェントが自然言語で、より個別化されたサービスを提供できる。
- 構造化インターフェース：エージェントが、より効率的で標準化されたサービスを提供できる。

モデルの能力を使えば、自然言語インターフェースで大半の場面に対応できますが、構造化インターフェースは、多くの場面でエージェント間の通信効率を高められます。そこで現在は、両方に対応し、効率と個別化を両立します。構造化インターフェースがあれば、モデルはそれを優先して選ぶべきです。それでユーザーの要求を満たせなければ、自然言語インターフェースを使えます。

すべてのエージェントが、自然言語インターフェースに対応することを推奨します。

## エージェント記述文書の形式

エージェント記述文書は、エージェントが外部へ公開する入口です。

AI の能力が向上したため、エージェント記述文書をすべて自然言語で書いても、他のエージェントは、おおむね内容を理解できます。ただし、エージェントが使うモデルは同じではなく、能力にも差があります。できるだけ多くのモデルが、データを統一的かつ正確に理解できるよう、引き続き構造化された記述を推奨します。将来、個別的な表現力を高めるため、文書内で自然言語を多く使えます。

### ANP 仕様に準拠するエージェント記述

エージェント記述の形式として JSON を推奨します。ANP 仕様に準拠する、通常の JSON に基づくエージェント記述文書の形式を定義します。

#### エージェント記述文書

エージェント記述文書の例を示します。

次は、コメント付きの JSON の例です。実際に送信する前に、コメントを取り除く必要があります。

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
      "content": {}  // 详细内容参见下文 "openrpc 接口描述文档" 章节
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

##### ホテルのエージェント記述文書のフィールド

| フィールド名 | 型 | 必須か | 説明 |
|---------|------|---------|------|
| protocolType | string | 必須 | プロトコル型の識別子。固定値は "ANP"。 |
| protocolVersion | string | 必須 | ANP プロトコルのバージョン。現在は "1.0.0"。 |
| type | string | 必須 | 文書型の識別子。エージェント記述文書では "AgentDescription"。 |
| url | string | 任意 | エージェントのネットワーク上のアクセス先。エージェントの位置を識別します。 |
| name | string | 必須 | "Grand Hotel Assistant" など、人間が読めるエージェント名。 |
| did | string | 任意 | 認証に使う、エージェントの分散型識別子。 |
| owner | object | 任意 | 組織名と Web サイトを含む、エージェントの所有者情報。 |
| description | string | 任意 | エージェントの機能とサービスの詳細な説明。 |
| created | string | 任意 | ISO 8601 形式の、エージェント記述文書の作成時刻。 |
| securityDefinitions | object | 必須 | 認証方式とパラメーターの位置を含む、セキュリティ機構の定義。 |
| security | string | 必須 | 有効にするセキュリティ設定名。securityDefinitions の定義を参照します。 |
| Infomations | array | 任意 | 製品、サービス、メディアファイルなど、エージェントが提供する情報資源の一覧。 |
| interfaces | array | 任意 | 各種プロトコルや API など、エージェントが対応する対話インターフェースの一覧。 |
| proof | object | 任意 | 文書の改ざんを防ぐ、デジタル署名と完全性検証の情報。 |

##### Information オブジェクトのフィールド

| フィールド名 | 型 | 説明 |
|---------|------|------|
| type | string | "Product"、"Information"、"VideoObject" などの情報型。 |
| description | string | 情報の内容の詳細な説明。 |
| url | string | 情報資源へのアクセス先。 |

##### Interface オブジェクトのフィールド

| フィールド名 | 型 | 説明 |
|---------|------|------|
| type | string | "NaturalLanguageInterface"、"StructuredInterface" などのインターフェース型。 |
| protocol | string | "YAML"、"openrpc"、"MCP"、"WebRTC" など、インターフェースが使うプロトコル。 |
| version | string | インターフェースのバージョン。 |
| url | string | インターフェース定義文書のアドレス。 |
| description | string | インターフェースの機能と用途の説明。 |
| humanAuthorization | boolean | 人間による認可が必要か。予約や支払いなど、機微な操作に適用します。 |


#### 製品（Product）の記述文書

製品（Product）の記述の例を示します。

```json
{
  "protocolType": "ANP",
  "protocolVersion": "1.0.0",
  "type": "Product",
  "url": "https://grand-hotel.com/products/deluxe-suite.json",
  "identifier": "deluxe-suite-001",
  "name": "豪华套房",
  "description": "拥有独立客厅和卧室的豪华套房，配备全景落地窗、高级音响系统和智能家居控制。适合商务人士和高端客户入住。",
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
      "name": "房间面积",
      "value": "80平方米"
    },
    {
      "type": "PropertyValue", 
      "name": "床型",
      "value": "特大号床 (King Size)"
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
      "name": "免费WiFi",
      "value": true
    },
    {
      "type": "LocationFeatureSpecification", 
      "name": "空调",
      "value": true
    }
  ],
  "category": "Hotel Room",
  "sku": "GH-DELUXE-SUITE-001",
  "image": [
    {
      "type": "ImageObject",
      "url": "https://grand-hotel.com/images/deluxe-suite-bedroom.jpg",
      "caption": "豪华套房 - 卧室区域",
      "description": "配备特大号床和高级床品的宽敞卧室"
    },
    {
      "type": "ImageObject",
      "url": "https://grand-hotel.com/images/deluxe-suite-living.jpg", 
      "caption": "豪华套房 - 客厅区域",
      "description": "独立客厅配备沙发、茶几和工作区"
    },
    {
      "type": "ImageObject",
      "url": "https://grand-hotel.com/images/deluxe-suite-view.jpg",
      "caption": "豪华套房 - 城市景观",
      "description": "全景落地窗提供绝佳的城市景观"
    }
  ],
  "audience": {
    "type": "Audience",
    "audienceType": "商务客户、高端旅客",
    "geographicArea": "全球"
  },
  "manufacturer": {
    "type": "Organization", 
    "name": "Grand Hotel Management Group",
    "url": "https://grand-hotel.com"
  }
}
```

##### 製品記述文書のフィールド

| フィールド名 | 型 | 必須か | 説明 |
|---------|------|---------|------|
| protocolType | string | 必須 | プロトコル型の識別子。固定値は "ANP"。 |
| protocolVersion | string | 必須 | ANP プロトコルのバージョン。 |
| type | string | 必須 | オブジェクト型。製品では "Product"。 |
| url | string | 任意 | 製品情報のネットワーク上のアドレス。 |
| identifier | string | 任意 | 製品の一意な識別子。 |
| name | string | 必須 | 製品名。 |
| description | string | 必須 | 製品の詳細な説明。 |
| brand | object | 任意 | 製品のブランド情報。 |
| additionalProperty | array | 任意 | 製品の追加の属性と特徴。 |
| offers | object | 任意 | 製品の価格と提供状況の情報。 |
| amenityFeature | array | 任意 | 製品が備える設備と機能。 |
| category | string | 任意 | 製品分類。 |
| sku | string | 任意 | 製品の SKU コード。 |
| image | array | 任意 | 製品の画像の一覧。 |
| audience | object | 任意 | 想定する顧客層。 |
| manufacturer | object | 任意 | 製品の提供者情報。 |

#### openrpc インターフェースの記述文書

OpenRPC 仕様に準拠するインターフェース記述文書の例を示します。

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

##### OpenRPC 仕様のフィールド

| フィールド名 | 型 | 必須か | 説明 |
|---------|------|---------|------|
| openrpc | string | 必須 | OpenRPC 仕様のバージョン。現在は "1.3.2" を使います。 |
| info | object | 必須 | タイトル、バージョン、説明など、API の基本情報。 |
| servers | array | 任意 | API エンドポイントのアドレスを定義する、サーバーの一覧。 |
| methods | array | 必須 | 呼び出せるメソッドの一覧。 |
| components | object | 任意 | schemas と securitySchemes など、再利用可能な構成要素の定義。 |
| security | array | 任意 | セキュリティ要件の定義。 |


##### Info オブジェクトのフィールド

| フィールド名 | 型 | 説明 |
|---------|------|------|
| title | string | API 名。 |
| version | string | API のバージョン。 |
| description | string | API の機能の説明。 |
| x-anp-protocol-type | string | ANP 拡張フィールド：プロトコル型。 |
| x-anp-protocol-version | string | ANP 拡張フィールド：ANP プロトコルのバージョン。 |


##### Method オブジェクトのフィールド

| フィールド名 | 型 | 説明 |
|---------|------|------|
| name | string | RPC の呼出しに使うメソッド名。 |
| summary | string | メソッドの簡潔な説明。 |
| description | string | メソッドの詳しい機能説明。 |
| params | array | 入力パラメーターの一覧。各パラメーターは、name、description、required、schema を含みます。 |
| result | object | name、description、schema を含む、戻り値の定義。 |

##### Components オブジェクトのフィールド

| フィールド名 | 型 | 説明 |
|---------|------|------|
| schemas | object | 再利用するデータ構造の定義。 |
| securitySchemes | object | セキュリティ認証方式の定義。 |

#### MCP server インターフェースの文書記述

追記予定。


### JSON-LD 形式



### セキュリティ機構

エージェント記述プロトコルの DID 要求認証は、[ANP-02](02-ANP-基于DID的身份认证协议.md) に従います。`did:wba` とネイティブの `did:web` は共通の認証手順を使い、アイデンティティの検証資料は、対応する DID メソッドに従って検証します。今後のメソッドは、ANP-02 のメソッド・バインディング機構で拡張します。

以下の `DIDWBASecurityScheme` は、既存の WBA の記述語彙と設定例を維持します。汎用の scheme 識別子を追加せず、WBA 設定を、そのまま他の DID メソッドの能力宣言ともみなしません。インターフェースの宣言と相手の能力は、実際に対応するメソッドを明示するべきです。

#### DIDWBASecurityScheme（DID WBA セキュリティ方式）

did:wba メソッドに基づくセキュリティ機構の設定のメタデータを記述します。scheme 名に割り当てる値は、エージェント記述に含む語彙で定義しなければなりません。

すべてのセキュリティ方式について、鍵、パスワードなど、直接アクセス権限を与える機密情報を AD に保存してはなりません。別の機構を通じ、帯域外で共有・保存するべきです。AD の目的は、利用者が既に認可されている場合に、エージェントへのアクセス方法を記述することであり、認可を与えることではありません。

セキュリティ方式では、通常、デジタル署名など、追加の認証パラメーターが必要です。その位置は、name に対応する値で示し、通常は in の値と組み合わせます。in に対応する値は、次のいずれかです。

- header：パラメーターを、プロトコルのヘッダーで渡します。ヘッダー名は name の値で指定します。ANP-02 の初回要求の署名には `Signature-Input` と `Signature` を使い、メッセージ本文がある場合には `Content-Digest` も使います。`Authorization` は、後続の任意の Bearer Access Token に使うもので、初回の署名を置き換えません。
- query：パラメーターを、クエリパラメーターとして URI に追加します。クエリパラメーター名は name で指定します。
- body：パラメーターを、要求ペイロードの本文で渡します。使用するデータスキーマの要素は name で指定します。
- cookie：name の値で識別する cookie に、パラメーターを保存します。
- uri：パラメーターを URI 自体に埋め込み、対応するやり取りで定義した URI テンプレート変数（name の値で定義）で符号化します。
- auto：位置を、プロトコルの一部として決定または交渉します。SecurityScheme の in フィールドを auto にする場合、name フィールドを設定するべきではありません。

表 2：セキュリティ方式レベルの語彙用語

| 語彙用語 | 説明 | 必須か | 型 |
|---------|------|---------|------|
| type | オブジェクトに意味的なラベルを付ける、オブジェクト型の識別子。 | 任意 | string |
| description | デフォルト言語での追加情報（人間が読めるもの）。 | 任意 | string |
| scheme | セキュリティ機構の識別子。 | 必須 | string |
| in | 認証パラメーターの位置。 | 必須 | string |
| name | 認証パラメーターの名前。 | 必須 | string |

did:wba メソッドを使うセキュリティ設定の例を示します。

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

上の `Authorization` 設定は、任意の Access Token を運ぶ位置だけを記述します。ANP-02 の初回署名で必要な、すべてのヘッダーの宣言にはなりません。具体的な要求と検証の規則は、ANP-02 を正本とします。

AD のセキュリティ設定は必須です。エージェント単位の security メンバーで、セキュリティ定義を有効にしなければなりません。この設定は、エージェントとのやり取りで必要なセキュリティ機構です。

security が AD 文書の最上位にある場合、すべての資源へのアクセスで、このセキュリティ機構による検証を必要とします。個別の資源の内部にある場合、その機構を満たす場合だけ、その資源にアクセスできます。最上位と資源に指定した security が異なる場合は、資源の指定を優先します。

### 人間による手動の認可

購入用インターフェースのように、呼出しに人間による手動の認可が必要な場合は、インターフェース定義に humanAuthorization フィールドを追加できます。true は、人間による手動の認可を受けてからでなければ、そのインターフェースを呼び出せないことを表します。

`humanAuthorization` は、インターフェース単位の、人間による認可の要件を宣言します。DID の検証関係や認可証明ではなく、認可の完了も証明しません。DID に基づく要求認証では、引き続き [ANP-02](02-ANP-基于DID的身份认证协议.md) の、`authentication` が参照する検証メソッドを使います。人間による認可の取得方法や証明方法は、このフィールドの定義範囲には含まれず、適用する業務プロトコルと認可ポリシーが決定するべきです。

### Proof（完全性検証）

AD 文書の悪意のある改ざん、偽装、再使用を防ぐため、AD 文書に検証情報の Proof を追加します。Proof の定義は、次の仕様を参照してください。[https://www.w3.org/TR/vc-data-integrity/#defn-domain](https://www.w3.org/TR/vc-data-integrity/#defn-domain)。

各項目は、次のとおりです。
- domain：AD 文書を保存するドメイン名を定義します。利用者は、文書の取得元のドメインが、domain で定義したドメインと同じかを確認しなければなりません。異なる場合、文書は偽装されている可能性があります。
- challenge：改ざんを防ぐための、検証のチャレンジ情報を定義します。domain を指定する場合は、challenge も指定する必要があります。
- verificationMethod：検証メソッドを定義します。現在は、did:wba 文書の検証メソッドを使います。将来は、より多くのメソッドに拡張できます。
- proofValue：デジタル署名を格納します。生成規則は、次のとおりです。
  - proofValue フィールドを含まない、Web サイトの AD 文書を生成する。
  - [JCS（JSON Canonicalization Scheme）](https://www.rfc-editor.org/rfc/rfc8785) で、その AD 文書を正規化し、正規化された文字列を生成する。
  - SHA-256 アルゴリズムで、正規化された文字列をハッシュし、ハッシュ値を生成する。
  - クライアントの秘密鍵でハッシュ値に署名し、署名値を生成して、URL セーフな Base64 で符号化する。
  - 署名の検証は、上記の手順を逆にたどる。


## よく使う定義の標準化

コーヒー 1 杯や玩具など、具体的な製品やサービスについては、schema.org の Product プロパティの一部を使い、特定の型を定義して、製品の記述方法を明確にできます。これにより、すべてのエージェントが製品データを作る際に、統一された定義を使い、異なるエージェント間で相互運用できます。

インターフェースにも、同様の方法を使えます。たとえば、製品購入用の共通インターフェース仕様を定義すれば、すべてのエージェントが共通の購入インターフェースを使い、異なるエージェント間で相互運用できます。






## 著作権表示  
Copyright (c) 2024 ANP Community  
本ファイルは [Apache License 2.0](../../LICENSE) に基づいて公開します。自由に使用・変更できますが、この著作権表示を保持しなければなりません。
