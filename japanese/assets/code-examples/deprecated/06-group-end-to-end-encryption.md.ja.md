# deprecated/06-group-end-to-end-encryption.md のコード例・図ラベルの日本語補足

原文: [deprecated/06-group-end-to-end-encryption.md](../../../../deprecated/06-group-end-to-end-encryption.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:127-155/line:2

原文:

````text
P4 business-state changes<br/>group.create / member active / member left or removed / credential rebound
````

日本語補足（agent-reviewed）:

````text
P4の業務状態の変化<br/>group.create / メンバーがactive / メンバーがleftまたはremoved / 資格情報の再バインディング
````

## fence:127-155/line:3

原文:

````text
owner observes business state
````

日本語補足（agent-reviewed）:

````text
ownerが業務状態を監視
````

## fence:127-155/line:8

原文:

````text
group.e2ee.add(new DID)
````

日本語補足（technical-retained）:

````text
group.e2ee.add(new DID)
````

注: メソッド呼び出しまたはHTTP要求の技術構文と引数・識別子を保持。

## fence:127-155/line:9

原文:

````text
group.e2ee.remove(old DID)
````

日本語補足（technical-retained）:

````text
group.e2ee.remove(old DID)
````

注: メソッド呼び出しまたはHTTP要求の技術構文と引数・識別子を保持。

## fence:127-155/line:11

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:127-155/line:15

原文:

````text
group created and has no crypto_group_id yet
````

日本語補足（agent-reviewed）:

````text
グループ作成済みで、crypto_group_idがまだない
````

## fence:127-155/line:16

原文:

````text
member active and not yet in MLS
````

日本語補足（agent-reviewed）:

````text
メンバーがactiveで、MLSにはまだ参加していない
````

## fence:127-155/line:17

原文:

````text
member left or removed and still in MLS
````

日本語補足（agent-reviewed）:

````text
メンバーがleftまたはremovedで、MLSにはまだ残っている
````

## fence:127-155/line:18

原文:

````text
Handle member rebound and old leaf still in MLS
````

日本語補足（agent-reviewed）:

````text
Handleメンバーが再バインド済みで、旧leafがまだMLSに残っている
````

## fence:127-155/line:24

原文:

````text
execute after rebind Add is accepted
````

日本語補足（agent-reviewed）:

````text
再バインディングのAddが受け入れられた後に実行
````

## fence:403-416/line:3

原文:

````text
DID Document
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
DID文書
````

## fence:403-416/line:4

原文:

````text
assertionMethod verificationMethod
````

日本語補足（technical-retained）:

````text
assertionMethod verificationMethod
````

注: プロトコルのフィールド／型／プレースホルダーの技術表記を保持。

## fence:403-416/line:7

原文:

````text
MLS KeyPackage
````

日本語補足（technical-retained）:

````text
MLS KeyPackage
````

注: プロトコルのフィールド／型／プレースホルダーの技術表記を保持。

## fence:452-476/line:2

原文:

````text
group_did<br/>application-layer group identifier
````

日本語補足（agent-reviewed）:

````text
group_did<br/>アプリケーション層のグループ識別子
````

## fence:452-476/line:3

原文:

````text
group_state_version<br/>P4 business-state version
````

日本語補足（agent-reviewed）:

````text
group_state_version<br/>P4の業務状態バージョン
````

## fence:452-476/line:4

原文:

````text
crypto_group_id<br/>MLS group_id
````

日本語補足（agent-reviewed）:

````text
crypto_group_id<br/>MLSのgroup_id
````

## fence:452-476/line:5

原文:

````text
epoch<br/>MLS generation
````

日本語補足（agent-reviewed）:

````text
epoch<br/>MLSの世代
````

## fence:1506-1515/line:3

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:1506-1515/line:6

原文:

````text
business creation succeeded (group_did, group_state_version)
````

日本語補足（agent-reviewed）:

````text
業務上の作成に成功（group_did, group_state_version）
````

## fence:1506-1515/line:8

原文:

````text
MLS initialization succeeded (crypto_group_id, epoch)
````

日本語補足（agent-reviewed）:

````text
MLSの初期化に成功（crypto_group_id, epoch）
````

## fence:1519-1531/line:2

原文:

````text
New Member
````

日本語補足（agent-reviewed）:

````text
新しいメンバー
````

## fence:1519-1531/line:3

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:1519-1531/line:7

原文:

````text
business join succeeded (active)
````

日本語補足（agent-reviewed）:

````text
業務上の参加に成功（active）
````

## fence:1535-1548/line:3

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:1535-1548/line:5

原文:

````text
New Member
````

日本語補足（agent-reviewed）:

````text
新しいメンバー
````

## fence:1535-1548/line:8

原文:

````text
member addition succeeded (target active)
````

日本語補足（agent-reviewed）:

````text
メンバー追加に成功（target active）
````

## fence:1552-1563/line:3

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:1552-1563/line:7

原文:

````text
business state changed (removed/left)
````

日本語補足（agent-reviewed）:

````text
業務状態を変更済み（removed/left）
````

## fence:1567-1578/line:2

原文:

````text
Sending Member
````

日本語補足（agent-reviewed）:

````text
送信メンバー
````

## fence:1567-1578/line:3

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:1567-1578/line:4

原文:

````text
Other Members
````

日本語補足（agent-reviewed）:

````text
その他のメンバー
````

## fence:1567-1578/line:6

原文:

````text
Locally construct Group Application Plaintext
````

日本語補足（agent-reviewed）:

````text
Group Application Plaintextをローカルで構築
````

## fence:1567-1578/line:7

原文:

````text
Locally generate PrivateMessage and group_cipher_object
````

日本語補足（agent-reviewed）:

````text
PrivateMessageとgroup_cipher_objectをローカルで生成
````

## fence:1582-1599/line:2

原文:

````text
New DID
````

日本語補足（agent-reviewed）:

````text
新しいDID
````

## fence:1582-1599/line:3

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:1582-1599/line:4

原文:

````text
owner / MLS Controller
````

日本語補足（agent-reviewed）:

````text
owner／MLSコントローラー
````

## fence:1582-1599/line:5

原文:

````text
Retained Members
````

日本語補足（agent-reviewed）:

````text
残るメンバー
````

## fence:1582-1599/line:9

原文:

````text
Pause new E2EE messages
````

日本語補足（agent-reviewed）:

````text
新しいE2EEメッセージを一時停止
````

## fence:1582-1599/line:10

原文:

````text
group.e2ee.add(new DID, epoch N+1)
````

日本語補足（technical-retained）:

````text
group.e2ee.add(new DID, epoch N+1)
````

注: メソッド呼び出しまたはHTTP要求の技術構文と引数・識別子を保持。

## fence:1582-1599/line:13

原文:

````text
No application messages in the intermediate epoch
````

日本語補足（agent-reviewed）:

````text
中間のepochではアプリケーションメッセージを禁止
````

## fence:1582-1599/line:14

原文:

````text
group.e2ee.remove(old DID, epoch N+2)
````

日本語補足（technical-retained）:

````text
group.e2ee.remove(old DID, epoch N+2)
````

注: メソッド呼び出しまたはHTTP要求の技術構文と引数・識別子を保持。

## fence:1582-1599/line:16

原文:

````text
Resume E2EE messages after Remove succeeds
````

日本語補足（agent-reviewed）:

````text
Removeの成功後にE2EEメッセージを再開
````
