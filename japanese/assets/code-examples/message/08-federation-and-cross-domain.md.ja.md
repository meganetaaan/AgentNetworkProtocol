# message/08-federation-and-cross-domain.md のコード例・図ラベルの日本語補足

原文: [message/08-federation-and-cross-domain.md](../../../../message/08-federation-and-cross-domain.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:108-128/line:2

原文:

````text
Sender domain
````

日本語補足（agent-reviewed）:

````text
送信元ドメイン
````

## fence:108-128/line:3

原文:

````text
Sender Agent
````

日本語補足（agent-reviewed）:

````text
送信側エージェント
````

## fence:108-128/line:4

原文:

````text
Sender ANPMessageService
````

日本語補足（agent-reviewed）:

````text
送信側ANPMessageService
````

## fence:108-128/line:7

原文:

````text
Target domain
````

日本語補足（agent-reviewed）:

````text
宛先ドメイン
````

## fence:108-128/line:8

原文:

````text
Target ANPMessageService
````

日本語補足（agent-reviewed）:

````text
宛先ANPMessageService
````

## fence:108-128/line:9

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:108-128/line:10

原文:

````text
Object Service
````

日本語補足（agent-reviewed）:

````text
オブジェクトサービス
````

## fence:108-128/line:11

原文:

````text
Target Agent
````

日本語補足（agent-reviewed）:

````text
宛先エージェント
````

## fence:108-128/line:14

原文:

````text
Business object<br/>meta.sender_did / auth.origin_proof
````

日本語補足（agent-reviewed）:

````text
業務オブジェクト<br/>meta.sender_did / auth.origin_proof
````

## fence:108-128/line:15

原文:

````text
Cross-domain HTTP call<br/>outer serviceDid authentication
````

日本語補足（agent-reviewed）:

````text
ドメインをまたぐHTTP呼び出し<br/>外側のserviceDid認証
````

## fence:181-196/line:2

原文:

````text
Receive cross-domain business request
````

日本語補足（agent-reviewed）:

````text
ドメインをまたぐ業務要求を受信
````

## fence:181-196/line:5

原文:

````text
Resolve target.did as Agent DID
````

日本語補足（agent-reviewed）:

````text
target.didをエージェントDIDとして解決
````

## fence:181-196/line:6

原文:

````text
Resolve target.did as Group DID
````

日本語補足（agent-reviewed）:

````text
target.didをグループDIDとして解決
````

## fence:181-196/line:7

原文:

````text
Use target.did directly as serviceDid to discover target service
````

日本語補足（agent-reviewed）:

````text
target.didを直接serviceDidとして宛先サービスを発見
````

## fence:181-196/line:9

原文:

````text
Select target ANPMessageService
````

日本語補足（agent-reviewed）:

````text
宛先ANPMessageServiceを選択
````

## fence:181-196/line:10

原文:

````text
Locate the Group Host's ANPMessageService
````

日本語補足（agent-reviewed）:

````text
グループHostのANPMessageServiceを特定
````

## fence:181-196/line:13

原文:

````text
Send the original business method directly
````

日本語補足（agent-reviewed）:

````text
元の業務メソッドを直接送信
````

## fence:284-300/line:2

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:284-300/line:3

原文:

````text
Member-domain service
````

日本語補足（agent-reviewed）:

````text
メンバーのドメインサービス
````

## fence:284-300/line:4

原文:

````text
Member Agent
````

日本語補足（agent-reviewed）:

````text
メンバーのエージェント
````

## fence:284-300/line:6

原文:

````text
Group message distribution
````

日本語補足（agent-reviewed）:

````text
グループメッセージを配信
````

## fence:284-300/line:8

原文:

````text
Deliver group message
````

日本語補足（agent-reviewed）:

````text
グループメッセージを届ける
````

## fence:284-300/line:9

原文:

````text
Business-state change
````

日本語補足（agent-reviewed）:

````text
業務状態の変化
````

## fence:284-300/line:11

原文:

````text
Deliver state event
````

日本語補足（agent-reviewed）:

````text
状態イベントを届ける
````

## fence:284-300/line:12

原文:

````text
Cryptographic result distribution
````

日本語補足（agent-reviewed）:

````text
暗号処理の結果を配信
````

## fence:388-409/line:2

原文:

````text
Caller service
````

日本語補足（agent-reviewed）:

````text
呼び出し元サービス
````

## fence:388-409/line:3

原文:

````text
Receiver service
````

日本語補足（agent-reviewed）:

````text
受信側サービス
````

## fence:388-409/line:4

原文:

````text
DID resolver / document
````

日本語補足（agent-reviewed）:

````text
DIDの解決／文書
````

## fence:388-409/line:6

原文:

````text
Cross-domain HTTP request + Signature-Input(keyid=...)
````

日本語補足（agent-reviewed）:

````text
ドメインをまたぐHTTP要求＋Signature-Input(keyid=...)
````

## fence:388-409/line:7

原文:

````text
Determine caller anchor by method
````

日本語補足（agent-reviewed）:

````text
メソッドに従ってcaller anchorを決定
````

## fence:388-409/line:8

原文:

````text
Normal requests use meta.sender_did
````

日本語補足（agent-reviewed）:

````text
通常の要求ではmeta.sender_didを使用
````

## fence:388-409/line:9

原文:

````text
Group notifications use body.group_did
````

日本語補足（agent-reviewed）:

````text
グループ通知ではbody.group_didを使用
````

## fence:388-409/line:11

原文:

````text
Resolve caller anchor DID document
````

日本語補足（agent-reviewed）:

````text
caller anchorのDID文書を解決
````

## fence:388-409/line:12

原文:

````text
DID document
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
DID文書
````

## fence:388-409/line:14

原文:

````text
Select its public ANPMessageService
````

日本語補足（agent-reviewed）:

````text
その公開ANPMessageServiceを選択
````

## fence:388-409/line:15

原文:

````text
Read serviceDid
````

日本語補足（agent-reviewed）:

````text
serviceDidを読み取る
````

## fence:388-409/line:16

原文:

````text
Compare DID owning keyid == serviceDid
````

日本語補足（agent-reviewed）:

````text
keyidの所属DID == serviceDidであることを照合
````

## fence:388-409/line:18

原文:

````text
Resolve serviceDid document and obtain authentication key
````

日本語補足（agent-reviewed）:

````text
serviceDid文書を解決し、authentication keyを取得
````

## fence:388-409/line:19

原文:

````text
Verification material
````

日本語補足（agent-reviewed）:

````text
署名検証の素材
````

## fence:388-409/line:20

原文:

````text
Verify HTTP Message Signatures
````

日本語補足（agent-reviewed）:

````text
HTTP Message Signaturesを検証
````

## fence:592-614/line:2

原文:

````text
Receiver Agent
````

日本語補足（agent-reviewed）:

````text
受信側エージェント
````

## fence:592-614/line:3

原文:

````text
B-domain service
````

日本語補足（agent-reviewed）:

````text
Bドメインのサービス
````

## fence:592-614/line:4

原文:

````text
DID resolver
````

日本語補足（agent-reviewed）:

````text
DIDリゾルバー
````

## fence:592-614/line:5

原文:

````text
Original sender ANPMessageService
````

日本語補足（agent-reviewed）:

````text
元の送信者のANPMessageService
````

## fence:592-614/line:6

原文:

````text
Internal Object Service in A domain
````

日本語補足（agent-reviewed）:

````text
Aドメイン内部のObject Service
````

## fence:592-614/line:8

原文:

````text
Request attachment download
````

日本語補足（agent-reviewed）:

````text
添付ファイルのダウンロードを要求
````

## fence:592-614/line:9

原文:

````text
Resolve original attachment message sender_did
````

日本語補足（agent-reviewed）:

````text
元の添付メッセージのsender_didを解決
````

## fence:592-614/line:10

原文:

````text
Target ANPMessageService.serviceDid
````

日本語補足（agent-reviewed）:

````text
宛先ANPMessageService.serviceDid
````

## fence:592-614/line:12

原文:

````text
Anchor MUST be original message sender_did
````

日本語補足（agent-reviewed）:

````text
アンカーは元のメッセージのsender_didでなければならない（MUST）
````

## fence:592-614/line:13

原文:

````text
Do not infer it from group_did or object_uri domain
````

日本語補足（agent-reviewed）:

````text
group_didやobject_uriのドメイン名から逆算してはならない
````

## fence:592-614/line:16

原文:

````text
Internal Access Grant validation
````

日本語補足（agent-reviewed）:

````text
Access Grantを内部で検証
````

## fence:592-614/line:17

原文:

````text
Allow issuance
````

日本語補足（agent-reviewed）:

````text
発行を許可
````

## fence:592-614/line:21

原文:

````text
GET object_uri + Authorization
````

日本語補足（technical-retained）:

````text
GET object_uri + Authorization
````

注: メソッド呼び出しまたはHTTP要求の技術構文と引数・識別子を保持。
