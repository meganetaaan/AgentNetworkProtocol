> 日本語参考訳（機械翻訳・未校閲）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [chinese/07-ANP-智能体描述协议规范.md](../../chinese/07-ANP-智能体描述协议规范.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# ANP - スマートボディ説明プロトコル

- 文書番号: ANP-07
- タイトル: ANP - スマートボディ説明プロトコル
- ステータス:公開
- バージョン: 1.2
- 原文言語: 中文 / このページは日本語参考訳
- アプリケーションの範囲: この命令は、スマート ボディ記述文書、インターフェイスの説明および ANP の出版機能に適用されます。

## インフォメーション

この命令は、スマート ボディを記述するための標準化されたプロトコルである Smart Description Protocol (ADP) を定義します。インテリジェントな体がオープン情報を公開し、インターフェースなどをサポートする方法を定義します。他の知性機関は、このスマート ボディの説明にアクセスできるときに情報を交換し、このスマート ボディとコラボレーションすることができます。

この規範は、AMP プロトコルに基づいて 2 つのインテリジェントなボディ間の情報インタラクションモードを定義します。

規範のコア要素には、以下が含まれます。
1. JSON は、リンクされたデータとセマンティックなネットワーク機能をサポートするベースデータ形式として使用します。
2. インテリジェンスの基礎、製品、サービス、インターフェースなどを定義するコア条件
3. 採用情報 [アクア・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アレイ・アワーズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アベイ](02-ANP-基于DID的身份认证协议.md) 定義された一般的なDIDの同一証明、支えられる `did:wba` 出産時 `did:web`;DD ドキュメントは、対応するメソッドで検証します。
4. 既存の標準合意(OpenAPI、JSON-RPCなど)との相互運用性をサポート

この指示は、スマートボディネットワークの構築のための基本的なサポートを提供することで、インテリジェントな体間で相互運用性とコミュニケーションの効率を高めることを目指しています。

情報インタラクティブモードの設計、互換性設計、

## 総合案内

スマート・説明、AD文書は、ウェブサイトのホームページと同様に、スマート・ボディへのアクセスのためのエントリ ポイントです。その他のスマート・ボディはこの AD ファイルに基づいており、スマート・ボディの名前、そのエンティティティ、機能、製品、サービス、インタラクティブな API またはプロトコルに関する情報を入手します。この情報では、スマート間のデータ通信とコラボレーションが達成できます。

この命令は、2つのインテリジェントなボディと2秒間の情報やり取りモードを定義し、スマートボディの説明文書のフォーマットを定義する2つの主要な問題に対処します。

### 情報インタラクティブモード

AMP は、インテリジェンスが URL を使用して外部から利用可能なデータ(ドキュメント、API など)とネットワークへのデータの記述を接続する「Web 爬虫類」と同様の情報インタラクティブモードを使用します。一方、他のインテリジェントは、データの説明情報に基づいて、適切なデータをローカルで読み、決定およびプロセスをローカルに作成することを選択できます。 API ファイルの場合、API を使用して、スマートボディとやり取りすることもできます。

![anp 情報インタラクト](../../images/anp-information-interact.png)

「web-brawling」モデルのインタラクティブな情報モデルは、いくつかの利点があります。
- 既存のインターネットアーキテクチャと同様に、検索エンジンがインテリジェントなボディに関するオープン情報をインデックス化し、効率的なスマートボディデータネットワークを作成することを可能にします。
- ローカルで引き込まれるリモートデータの使用とモデルコンテキストとして処理されると、ユーザーのプライバシーの漏洩を回避できます。
- 自然階層は、インテリジェントな体が他の多くのインテリジェントな身体と相互作用することを可能にします。

### コアコンセプト

インフラとインターフェースの概念は、AMPのステラボディのコアコンセプトです。

情報は、テキストファイル、画像、ビデオ、音声など、スマートボディが外部に提供するデータです。

インターフェイスは、インテリジェンスのための外部インタフェースであり、インターフェースには2つのタイプのインターフェイスがあります。
- 一つは、インテリジェントな体がよりパーソナライズされたサービスを提供することを可能にする自然な言語インターフェイスです。
- インテリジェントなボディがより効率的で標準化されたサービスを提供することを可能にする構造化されたインターフェイスです。

モデルを使用する能力は、自然言語インターフェイスがほとんどの場面に会うことを可能にしますが、構造化されたインターフェイスは多くの設定の理性的なボディ間のコミュニケーション効率を改善できます。従って私達は構造化されたインターフェイスおよびより自然な言語インターフェイスを有効そして個人化しています支えます。構造化されたインターフェイスがあれば、モデルはユーザーのニーズを満たしていない場合に使用することができる構造されたインターフェイスの限られた選択があるべきです。

自然言語インターフェイスをサポートするすべてのインテリジェントなボディが推奨されます。

## スマート 説明 ドキュメント フォーマット

スマートス 説明文書は、スマートス の外部エントリです。

AI 機能の向上の恩恵により、すべてのエージェント説明文書は自然言語で記述でき、他のエージェントは基本的に表現された情報を理解できます。ただし、エージェントによって使用されるモデルは同じではなく、モデルの機能も異なるため、ほとんどのモデルがデータを統一して正確に理解できるようにするために、エージェント記述ドキュメントを構造化された方法で記述することをお勧めします。将来的には、パーソナライズされた表現機能が追加され、文書内で自然言語が広範囲に使用できるようになります。

### ANP仕様に準拠したエージェントの説明

エージェントの記述形式はJSON形式を推奨します。 ANP仕様に準拠した通常のjsonに基づいたエージェント記述ドキュメント形式を定義しました。

#### エージェント説明文書

以下は、エージェント説明ドキュメントの例です。

以下はコメントを含む JSON の例です。実際の送信に使用する前に、コメントを削除する必要があります。

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

##### ホテルエージェントの説明文書フィールドの説明

| フィールド名 | タイプ | 必須 | 説明 |
|---------|------|---------|------|
| protocolType | 文字列 | 必須 | プロトコルタイプ識別、固定値は「ANP」 |
| protocolVersion | 文字列 | 必須 | ANP プロトコルのバージョン番号、現在は「1.0.0」 |
| type | string | 必須 | ドキュメントタイプ識別子、エージェント説明ドキュメントは「AgentDescription」 |
| url | 文字列 | オプション | エージェントの場所を識別するために使用されるエージェントのネットワーク アクセス アドレス |
| 名前 | 文字列 | 必須 | 「Grand Hotel Assistant」など、人間が読める形式のエージェント名 |
| Did | string | オプション | 認証に使用されるエージェントの分散型識別子 |
| 所有者 | オブジェクト | オプション | 組織名および Web サイトを含むエージェント所有者情報 |
| 説明 | 文字列 | オプション | エージェントの詳細な機能説明とサービス説明 |
| 作成されました | 文字列 | オプション | エージェント説明文書の作成時刻、ISO 8601 形式 |
| securityDefinitions | オブジェクト | 必須 | 認証方法とパラメータの場所を含むセキュリティメカニズムの定義 |
| security | string | 必須 | securityDefinitions の定義を参照する、有効なセキュリティ構成の名前 |
| 情報 | 配列 | オプション | 製品、サービス、メディアファイルなど、エージェントによって提供される情報リソースのリスト |
| インターフェース | 配列 | オプション | さまざまなプロトコルや API を含む、エージェントによってサポートされる対話型インターフェースのリスト |
| 証明 | オブジェクト | オプション | 文書の改ざんを防ぐためのデジタル署名と整合性検証情報 |

##### 情報オブジェクトフィールドの説明

| フィールド名 | タイプ | 説明 |
|---------|------|------|
| type | string | 「Product」、「Information」、「VideoObject」などの情報タイプ |
| 説明 | 文字列 | 情報内容の詳細説明 |
| url | string | 情報リソースアクセスアドレス |

##### インターフェースオブジェクトフィールドの説明

| フィールド名 | タイプ | 説明 |
|---------|------|------|
| タイプ | 文字列 | 「NaturalLanguageInterface」、「StructuredInterface」などのインターフェイスのタイプ |
| プロトコル | 文字列 | 「YAML」、「openrpc」、「MCP」、「WebRTC」などのインターフェイスで使用されるプロトコル |
| バージョン | 文字列 | インターフェースのバージョン番号 |
| url | string | インターフェース定義文書のアドレス |
| 説明 | 文字列 | インターフェースの機能と用途の説明 |
| humanAuthorization | boolean | 手動認証が必要かどうか、支払いの予約などの機密性の高い操作に適しています |


#### 製品説明文書

以下は商品説明の例です。

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

#####  製品説明文書フィールドの説明

| フィールド名 | タイプ | 必須 | 説明 |
|---------|------|---------|------|
| protocolType | 文字列 | 必須 | プロトコルタイプ識別、固定値は「ANP」 |
| protocolVersion | 文字列 | 必須 | ANP プロトコルのバージョン番号 |
| タイプ | 文字列 | 必須 | オブジェクトタイプ、製品は「Product」です |
| url | string | 任意 | 製品情報のネットワークアドレス |
| 識別子 | 文字列 | オプション | 製品の一意の識別子 |
| 名前 | 文字列 | 必須 | 製品名 |
| 説明 | 文字列 | 必須 | 製品詳細説明 |
| ブランド | オブジェクト | オプション | 製品ブランド情報 |
|AdditionalProperty | array | オプション | 製品の追加プロパティと機能 |
| は、| オブジェクト | オプション | 製品 | の価格と在庫情報を提供します
| amenityFeature | アレイ | オプション | 製品によって提供される機能と機能 |
| カテゴリ | 文字列 | オプション | 製品カテゴリ |
| sku | 文字列 | オプション | 製品 SKU コード |
| 画像 | アレイ | オプション | 製品画像リスト |
| オーディエンス | オブジェクト | オプション | ターゲット顧客グループ |
| メーカー | オブジェクト | オプション | 製品プロバイダー情報 |

#### openrpcインターフェース説明文書

以下は、OpenRPC 仕様に準拠したインターフェイス記述ドキュメントの例です。

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

##### OpenRPC仕様フィールドの説明

| フィールド名 | タイプ | 必須 | 説明 |
|---------|------|---------|------|
| openrpc | 文字列 | 必須 | OpenRPC 仕様バージョン、現在「1.3.2」を使用 |
| 情報 | オブジェクト | 必須 | タイトル、バージョン、説明などを含む API の基本情報 |
| サーバー | アレイ | オプション | サーバーリスト、API エンドポイントアドレスを定義 |
| メソッド | 配列 | 必須 | 呼び出し可能なメソッドのリスト |
| コンポーネント | オブジェクト | 任意 | スキーマやセキュリティスキームを含む再利用可能なコンポーネントの定義 |
| セキュリティー | 配列 | 任意 | セキュリティ要件の定義 |


##### 情報オブジェクトフィールドの説明

| フィールド名 | 仕様 | コンテンツ |
|---------|------|------|
| タイトル | 文字列 | API の名前 |
| コンテンツ | 文字列 | API のバージョン番号 |
| 説明: | 文字列 | API機能の説明 |
| x-anp-protocol 型 | 文字列 | ANP延長分野:プロトコルタイプ |
| x-anp-protocol-version の形式 | 文字列 | ANPエクステンションフィールド:AMPプロトコルバージョン |


##### 方法 オブジェクトフィールドの説明

| フィールド名 | 仕様 | コンテンツ |
|---------|------|------|
| お名前(名) | 文字列 | RPCコールのメソッド名 |
| インフォメーション | 文字列 | 方法論の簡単な説明 |
| 説明: | 文字列 | 方法論の詳細な機能説明 |
| パラム | 配列 | パラメータのリスト、名前、説明、必須、スキーマを含む各項目 |
| 結果発表 | オブジェクト | 名前、説明、スキーマを含む結果の定義を返します |

##### コンポーネントのフィールドの説明

| フィールド名 | 仕様 | コンテンツ |
|---------|------|------|
| スキーマ | オブジェクト | 再使用のためのデータ構造の定義 |
| セキュリティスキーム | オブジェクト | セキュリティ認証プログラムの定義 |

#### MCP サーバー インターフェイス ドキュメント 説明

完了する


### JSON-LD フォーマット



### セキュリティメカニズム

スマート・デリバリー・プロトコル DID リクエスト認証のフォロー [アクア・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アレイ・アワーズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アベイ](02-ANP-基于DID的身份认证协议.md)。`did:wba` 出産時 `did:web` 共通の認証プロセス、対応するDID方法論に従って検証されたアイデンティティ材料。AMP-02結合機構により拡張されるフォローアップ方式。

以下は `DIDWBASecurityScheme` WBA の記述と設定の例を保ち、共通のスキーム識別子や WBA の設定を別の DID メソッドとして指示する機能ステートメントを追加することなく、します。インターフェイスステートメントとピアツーエンドの機能が、実際にサポートする方法を指定する必要があります。

#### DIWBAScurity Scheme (ID WBAセキュリティプログラム)

ド:wbaメソッドに基づいてセキュリティメカニズムの構成のためのメタデータを記述します。スキームの名前に割り当てられた値は、スマートボディの説明に含まれる語彙で定義する必要があります。

すべてのセキュリティプログラムでは、直接アクセスを提供するキー、パスワード、その他の機密情報はADに保存されますが、他のメカニズムを通じて外部に共有および保存する必要があります。 ADは、その承認の付与ではなく、スマートボディ(消費者が承認されている場合)にアクセスする方法を記述することを目指しています。

セキュリティプログラムは通常、デジタル署名などの追加の認証パラメータが必要です。 情報の場所は、名前に関連付けられた値の指標であり、通常は内部の値と組み合わせて使用されます。

- Header: パラメータは、名前が名前の値を与えられたプロトコルによって提供される頭で与えられます。 初めて署名のためのAnP-02リクエスト `Signature-Input`、`Signature`、またメッセージが利用できるとき使用されて `Content-Digest`；`Authorization` ベアアアクセストークンは、オプションのフォローアップオプションで、最初の署名を置き換えません。
- クエリ: パラメータは URL にクエリパラメーターとして添付され、クエリパラメータの名前は name で提供されます。
- ボディ: パラメータは要求負荷の本体に提供され、使用されるデータ・モード要素は名前によって提供されます。
- Cookie: パラメータは、名前の値をマークしたクッキーに保存されます。
- uri: パラメータは URL 自体に埋め込まれ、URL テンプレート変数によってコード化されます(名前の値を定義)。
- auto: 位置は、合意の一部として決定または交渉されます。 セキュリティスキームフィールドが自動に設定されている場合、名前のフィールドが設定されるべきではありません。

表2:セキュリティプログラムのレベルの用語集

| 用語集 | コンテンツ | 必要かどうか | 仕様 |
|---------|------|---------|------|
| 型 号 | オブジェクト型識別子。これは、オブジェクトにセマンティックラベルを追加します。 | 任意 | 文字列 |
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

上記 `Authorization` 任意アクセストークンのキャリング位置だけを設定し、AMP-02初期署名のすべてのヘッド要件のステートメントは指定できません。特定のリクエストと認証ルールはANP-02に基づいています。

AD のセキュリティ設定が必要です。セキュリティの定義は、スマートレベルのセキュリティメンバーによって有効化する必要があります。この構成は、インテリジェントとやり取りするために必要なセキュリティメカニズムです。

AD ファイルの上部にセキュリティが表示される場合、訪問時にすべてのリソースがこのセキュリティメカニズムを使用して検証しなければならないと述べています。リソース内では、セキュリティメカニズムが満たされた場合のみ、リソースへのアクセスができるように指示されます。

### ヒューマンマニュアルの承認

インターフェイスが呼び出されると、例えば、インターフェースを購入するには、手動で人間によって許可されなければなりません。今回は、HumanAuthorizationのインタフェース定義にフィールドを追加できます。このインターフェイスコールは、人間のマニュアル承認を必要とすることを示しています。

`humanAuthorization` インターフェイスレベルを宣言するために使用される人的承認要件。 DID認証関係や権限の証明書ではなく、認可が満たされていることを証明することができます。 認証のためのDIベースの要求はまだ使用中です。 [アクア・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アレイ・アワーズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アミューズメント・アベイ](02-ANP-基于DID的身份认证协议.md) によって `authentication` 認定方法。 フィールドの定義内で人間の承認が得られるか、実証された方法は、適用された運用契約と委任戦略によって決定されるべきではありません。

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
この文書は以下に基づいています [Apache ライセンス 2.0](../../LICENSE) 投稿されたものは自由に使用および変更できますが、この著作権に関する声明は保持する必要があります。
