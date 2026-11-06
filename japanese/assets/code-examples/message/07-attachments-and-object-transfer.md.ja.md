# message/07-attachments-and-object-transfer.md のコード例・図ラベルの日本語補足

原文: [message/07-attachments-and-object-transfer.md](../../../../message/07-attachments-and-object-transfer.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:97-113/line:2

原文:

````text
Sender client
````

日本語補足（agent-reviewed）:

````text
送信側クライアント
````

## fence:97-113/line:4

原文:

````text
HTTPS PUT object bytes
````

日本語補足（agent-reviewed）:

````text
HTTPS PUTでオブジェクトのバイト列を送信
````

## fence:97-113/line:6

原文:

````text
Send attachment manifest<br/>direct.send / group.send / group.e2ee.send
````

日本語補足（agent-reviewed）:

````text
添付ファイルのマニフェストを送信<br/>direct.send / group.send / group.e2ee.send
````

## fence:97-113/line:7

原文:

````text
Create Access Grant after message accepted
````

日本語補足（agent-reviewed）:

````text
メッセージがacceptedになった後でAccess Grantを作成
````

## fence:97-113/line:11

原文:

````text
HTTPS GET object_uri
````

日本語補足（technical-retained）:

````text
HTTPS GET object_uri
````

注: メソッド呼び出しまたはHTTP要求の技術構文と引数・識別子を保持。

## fence:223-230/line:2

原文:

````text
Sender Client
````

日本語補足（agent-reviewed）:

````text
送信側クライアント
````

## fence:223-230/line:2

原文:

````text
Control Service
````

日本語補足（agent-reviewed）:

````text
制御サービス
````

## fence:223-230/line:3

原文:

````text
Object Data Plane
````

日本語補足（agent-reviewed）:

````text
オブジェクトのデータプレーン
````

## fence:223-230/line:3

原文:

````text
HTTPS PUT object bytes
````

日本語補足（agent-reviewed）:

````text
HTTPS PUTでオブジェクトのバイト列を送信
````

## fence:223-230/line:4

原文:

````text
Recipient or Group Host
````

日本語補足（agent-reviewed）:

````text
受信側またはグループのHost
````

## fence:223-230/line:5

原文:

````text
Resolve using sender_did from the original message\nattachment.get_download_ticket
````

日本語補足（agent-reviewed）:

````text
元のメッセージのsender_didを使って解決\nattachment.get_download_ticket
````

## fence:223-230/line:6

原文:

````text
HTTPS GET object_uri\nAuthorization: Bearer ticket
````

日本語補足（technical-retained）:

````text
HTTPS GET object_uri\nAuthorization: Bearer ticket
````

注: メソッド呼び出しまたはHTTP要求の技術構文と引数・識別子を保持。

## fence:234-256/line:2

原文:

````text
Sender Client A
````

日本語補足（agent-reviewed）:

````text
送信側クライアントA
````

## fence:234-256/line:3

原文:

````text
A Domain Service
````

日本語補足（agent-reviewed）:

````text
Aドメインのサービス
````

## fence:234-256/line:4

原文:

````text
Object Service
````

日本語補足（agent-reviewed）:

````text
オブジェクトサービス
````

## fence:234-256/line:5

原文:

````text
B Domain Service
````

日本語補足（agent-reviewed）:

````text
Bドメインのサービス
````

## fence:234-256/line:6

原文:

````text
Recipient Client B
````

日本語補足（agent-reviewed）:

````text
受信側クライアントB
````

## fence:234-256/line:10

原文:

````text
HTTPS PUT plaintext bytes
````

日本語補足（agent-reviewed）:

````text
HTTPS PUTで平文のバイト列を送信
````

## fence:234-256/line:16

原文:

````text
direct.incoming / equivalent delivery mechanism
````

日本語補足（agent-reviewed）:

````text
direct.incoming／同等の配信の仕組み
````

## fence:234-256/line:17

原文:

````text
attachment.get_download_ticket (resolved from the original message sender_did)
````

日本語補足（agent-reviewed）:

````text
attachment.get_download_ticket（元のメッセージのsender_didから解決）
````

## fence:234-256/line:19

原文:

````text
HTTPS GET object_uri + Authorization
````

日本語補足（technical-retained）:

````text
HTTPS GET object_uri + Authorization
````

注: メソッド呼び出しまたはHTTP要求の技術構文と引数・識別子を保持。

## fence:234-256/line:20

原文:

````text
plaintext bytes
````

日本語補足（agent-reviewed）:

````text
平文のバイト列
````

## fence:234-256/line:21

原文:

````text
validate size / digest
````

日本語補足（agent-reviewed）:

````text
size / digestを検証
````

## fence:260-284/line:2

原文:

````text
Sender Client A
````

日本語補足（agent-reviewed）:

````text
送信側クライアントA
````

## fence:260-284/line:3

原文:

````text
A Domain Service
````

日本語補足（agent-reviewed）:

````text
Aドメインのサービス
````

## fence:260-284/line:4

原文:

````text
Object Service
````

日本語補足（agent-reviewed）:

````text
オブジェクトサービス
````

## fence:260-284/line:5

原文:

````text
B Domain Service
````

日本語補足（agent-reviewed）:

````text
Bドメインのサービス
````

## fence:260-284/line:6

原文:

````text
Recipient Client B
````

日本語補足（agent-reviewed）:

````text
受信側クライアントB
````

## fence:260-284/line:10

原文:

````text
Generate object_key + nonce locally\nEncrypt the file locally
````

日本語補足（agent-reviewed）:

````text
object_key＋nonceをローカルで生成\nファイルをローカルで暗号化
````

## fence:260-284/line:11

原文:

````text
HTTPS PUT ciphertext bytes
````

日本語補足（agent-reviewed）:

````text
HTTPS PUTで暗号文のバイト列を送信
````

## fence:260-284/line:14

原文:

````text
direct.send (direct-e2ee, inner manifest carries object_key)
````

日本語補足（agent-reviewed）:

````text
direct.send（direct-e2ee、内側のmanifestにobject_keyを含む）
````

## fence:260-284/line:17

原文:

````text
direct.incoming / equivalent delivery mechanism
````

日本語補足（agent-reviewed）:

````text
direct.incoming／同等の配信の仕組み
````

## fence:260-284/line:18

原文:

````text
Decrypt the inner manifest\nObtain object_key + nonce
````

日本語補足（agent-reviewed）:

````text
内側のmanifestを復号\nobject_key＋nonceを取得
````

## fence:260-284/line:21

原文:

````text
HTTPS GET object_uri + Authorization
````

日本語補足（technical-retained）:

````text
HTTPS GET object_uri + Authorization
````

注: メソッド呼び出しまたはHTTP要求の技術構文と引数・識別子を保持。

## fence:260-284/line:22

原文:

````text
ciphertext bytes
````

日本語補足（agent-reviewed）:

````text
暗号文のバイト列
````

## fence:260-284/line:23

原文:

````text
Validate ciphertext size / digest\nDecrypt locally
````

日本語補足（agent-reviewed）:

````text
暗号文のsize / digestを検証\nローカルで復号
````

## fence:288-309/line:2

原文:

````text
Sender Client A
````

日本語補足（agent-reviewed）:

````text
送信側クライアントA
````

## fence:288-309/line:3

原文:

````text
A Domain Service
````

日本語補足（agent-reviewed）:

````text
Aドメインのサービス
````

## fence:288-309/line:4

原文:

````text
Object Service
````

日本語補足（agent-reviewed）:

````text
オブジェクトサービス
````

## fence:288-309/line:5

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:288-309/line:6

原文:

````text
Group Member Client
````

日本語補足（agent-reviewed）:

````text
グループメンバーのクライアント
````

## fence:288-309/line:10

原文:

````text
HTTPS PUT plaintext bytes
````

日本語補足（agent-reviewed）:

````text
HTTPS PUTで平文のバイト列を送信
````

## fence:288-309/line:16

原文:

````text
attachment.get_download_ticket (resolved from the original message sender_did)
````

日本語補足（agent-reviewed）:

````text
attachment.get_download_ticket（元のメッセージのsender_didから解決）
````

## fence:288-309/line:18

原文:

````text
HTTPS GET object_uri + Authorization
````

日本語補足（technical-retained）:

````text
HTTPS GET object_uri + Authorization
````

注: メソッド呼び出しまたはHTTP要求の技術構文と引数・識別子を保持。

## fence:288-309/line:19

原文:

````text
plaintext bytes
````

日本語補足（agent-reviewed）:

````text
平文のバイト列
````

## fence:288-309/line:20

原文:

````text
validate size / digest
````

日本語補足（agent-reviewed）:

````text
size / digestを検証
````

## fence:313-336/line:2

原文:

````text
Sender Client A
````

日本語補足（agent-reviewed）:

````text
送信側クライアントA
````

## fence:313-336/line:3

原文:

````text
A Domain Service
````

日本語補足（agent-reviewed）:

````text
Aドメインのサービス
````

## fence:313-336/line:4

原文:

````text
Object Service
````

日本語補足（agent-reviewed）:

````text
オブジェクトサービス
````

## fence:313-336/line:5

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:313-336/line:6

原文:

````text
Group Member Client
````

日本語補足（agent-reviewed）:

````text
グループメンバーのクライアント
````

## fence:313-336/line:10

原文:

````text
Generate object_key + nonce locally\nEncrypt the file locally
````

日本語補足（agent-reviewed）:

````text
object_key＋nonceをローカルで生成\nファイルをローカルで暗号化
````

## fence:313-336/line:11

原文:

````text
HTTPS PUT ciphertext bytes
````

日本語補足（agent-reviewed）:

````text
HTTPS PUTで暗号文のバイト列を送信
````

## fence:313-336/line:14

原文:

````text
group.e2ee.send (group-e2ee, inner manifest carries object_key)
````

日本語補足（agent-reviewed）:

````text
group.e2ee.send（group-e2ee、内側のmanifestにobject_keyを含む）
````

## fence:313-336/line:17

原文:

````text
Decrypt the inner manifest\nObtain object_key + nonce
````

日本語補足（agent-reviewed）:

````text
内側のmanifestを復号\nobject_key＋nonceを取得
````

## fence:313-336/line:20

原文:

````text
HTTPS GET object_uri + Authorization
````

日本語補足（technical-retained）:

````text
HTTPS GET object_uri + Authorization
````

注: メソッド呼び出しまたはHTTP要求の技術構文と引数・識別子を保持。

## fence:313-336/line:21

原文:

````text
ciphertext bytes
````

日本語補足（agent-reviewed）:

````text
暗号文のバイト列
````

## fence:313-336/line:22

原文:

````text
Validate ciphertext size / digest\nDecrypt locally
````

日本語補足（agent-reviewed）:

````text
暗号文のsize / digestを検証\nローカルで復号
````

## fence:398-421//caption

原文:

````text
Attachment description
````

日本語補足（agent-reviewed）:

````text
添付ファイルの説明
````

## fence:738-757/line:2

原文:

````text
Sender service
````

日本語補足（agent-reviewed）:

````text
送信側サービス
````

## fence:738-757/line:3

原文:

````text
Object Service
````

日本語補足（agent-reviewed）:

````text
オブジェクトサービス
````

## fence:738-757/line:4

原文:

````text
Message plane
````

日本語補足（agent-reviewed）:

````text
メッセージのプレーン
````

## fence:738-757/line:8

原文:

````text
Only creates the object; does not create download authorization
````

日本語補足（agent-reviewed）:

````text
ここではオブジェクトだけを作成し、ダウンロード認可は作成しない
````

## fence:738-757/line:10

原文:

````text
direct.send / group.send / group.e2ee.send attachment manifest
````

日本語補足（agent-reviewed）:

````text
direct.send / group.send / group.e2ee.sendの添付ファイルのマニフェスト
````

## fence:738-757/line:11

原文:

````text
message accepted
````

日本語補足（agent-reviewed）:

````text
メッセージがaccepted
````

## fence:738-757/line:12

原文:

````text
Create Access Grant for each attachment
````

日本語補足（agent-reviewed）:

````text
各attachmentにAccess Grantを作成
````

## fence:738-757/line:15

原文:

````text
Validate requester_did + message_id + attachment_id + object_uri
````

日本語補足（agent-reviewed）:

````text
requester_did + message_id + attachment_id + object_uriを検証
````

## fence:738-757/line:18

原文:

````text
GET object_uri + Authorization
````

日本語補足（technical-retained）:

````text
GET object_uri + Authorization
````

注: メソッド呼び出しまたはHTTP要求の技術構文と引数・識別子を保持。

## fence:804-818/line:3

原文:

````text
Start PUT
````

日本語補足（agent-reviewed）:

````text
PUTを開始
````

## fence:804-818/line:4

原文:

````text
PUT completed
````

日本語補足（agent-reviewed）:

````text
PUT完了
````

## fence:1357-1410//params/body/payload/caption

原文:

````text
Please check the attachment
````

日本語補足（agent-reviewed）:

````text
添付ファイルをご確認ください
````

## fence:1414-1467//params/body/payload/caption

原文:

````text
Group file
````

日本語補足（agent-reviewed）:

````text
グループのファイル
````

## fence:1507-1537//payload/caption

原文:

````text
Please check the attachment
````

日本語補足（agent-reviewed）:

````text
添付ファイルをご確認ください
````

## fence:1586-1620//payload/caption

原文:

````text
Design document
````

日本語補足（agent-reviewed）:

````text
設計文書
````
