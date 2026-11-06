# message/06-group-end-to-end-encryption.md のコード例・図ラベルの日本語補足

原文: [message/06-group-end-to-end-encryption.md](../../../../message/06-group-end-to-end-encryption.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:152-180/line:2

原文:

````text
P4 business-state changes<br/>group.create / member active / member left or removed / member DID updated
````

日本語補足（agent-reviewed）:

````text
P4の業務状態の変化<br/>group.create / メンバーがactive / メンバーがleftまたはremoved / メンバーのDID更新
````

## fence:152-180/line:3

原文:

````text
owner observes business state
````

日本語補足（agent-reviewed）:

````text
ownerが業務状態を監視
````

## fence:152-180/line:8

原文:

````text
group.e2ee.add(new DID devices)
````

日本語補足（technical-retained）:

````text
group.e2ee.add(new DID devices)
````

注: HTTP認証・暗号処理・メソッド引数の技術構文またはプレースホルダーを保持。

## fence:152-180/line:9

原文:

````text
group.e2ee.remove(old DID devices)
````

日本語補足（technical-retained）:

````text
group.e2ee.remove(old DID devices)
````

注: HTTP認証・暗号処理・メソッド引数の技術構文またはプレースホルダーを保持。

## fence:152-180/line:11

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:152-180/line:15

原文:

````text
group created and has no crypto_group_id yet
````

日本語補足（agent-reviewed）:

````text
グループ作成済みで、crypto_group_idがまだない
````

## fence:152-180/line:16

原文:

````text
eligible device not yet in MLS
````

日本語補足（agent-reviewed）:

````text
適格なデバイスがMLSに参加していない
````

## fence:152-180/line:17

原文:

````text
device or DID must leave MLS
````

日本語補足（agent-reviewed）:

````text
デバイスまたはDIDがMLSから離脱しなければならない
````

## fence:152-180/line:18

原文:

````text
P4 member rebound and old leaves remain
````

日本語補足（agent-reviewed）:

````text
P4メンバーが再バインド済みで、旧leavesが残っている
````

## fence:152-180/line:24

原文:

````text
execute after DID update Add is accepted
````

日本語補足（agent-reviewed）:

````text
DID更新のAddが受け入れられた後に実行
````

## fence:453-467/line:3

原文:

````text
DID Document
````

日本語補足（agent-reviewed-exact-text-reuse）:

````text
DID文書
````

## fence:453-467/line:4

原文:

````text
deviceManifest device_id
````

日本語補足（technical-retained）:

````text
deviceManifest device_id
````

注: HTTP認証・暗号処理・メソッド引数の技術構文またはプレースホルダーを保持。

## fence:453-467/line:5

原文:

````text
assertionMethod verificationMethod
````

日本語補足（technical-retained）:

````text
assertionMethod verificationMethod
````

注: プロトコルのフィールド／型／プレースホルダーの技術表記を保持。

## fence:453-467/line:8

原文:

````text
MLS KeyPackage
````

日本語補足（technical-retained）:

````text
MLS KeyPackage
````

注: プロトコルのフィールド／型／プレースホルダーの技術表記を保持。

## fence:503-527/line:2

原文:

````text
group_did<br/>application-layer group identifier
````

日本語補足（agent-reviewed）:

````text
group_did<br/>アプリケーション層のグループ識別子
````

## fence:503-527/line:3

原文:

````text
group_state_version<br/>P4 business-state version
````

日本語補足（agent-reviewed）:

````text
group_state_version<br/>P4の業務状態バージョン
````

## fence:503-527/line:4

原文:

````text
crypto_group_id<br/>MLS group_id
````

日本語補足（agent-reviewed）:

````text
crypto_group_id<br/>MLSのgroup_id
````

## fence:503-527/line:5

原文:

````text
epoch<br/>MLS generation
````

日本語補足（agent-reviewed）:

````text
epoch<br/>MLSの世代
````

## fence:1669-1677/line:3:column:28

原文:

````text
preserved unchanged
````

日本語補足（agent-reviewed）:

````text
変更せず保持
````

## fence:1749-1758/line:2

原文:

````text
Creator Device (owner)
````

日本語補足（agent-reviewed）:

````text
作成者のデバイス（owner）
````

## fence:1749-1758/line:3

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:1749-1758/line:6

原文:

````text
business creation succeeded (group_did, group_state_version)
````

日本語補足（agent-reviewed）:

````text
業務上の作成に成功（group_did, group_state_version）
````

## fence:1749-1758/line:7

原文:

````text
group.e2ee.create(sender_device_id, creator KeyPackage)
````

日本語補足（technical-retained）:

````text
group.e2ee.create(sender_device_id, creator KeyPackage)
````

注: HTTP認証・暗号処理・メソッド引数の技術構文またはプレースホルダーを保持。

## fence:1749-1758/line:8

原文:

````text
MLS initialization succeeded (crypto_group_id, epoch)
````

日本語補足（agent-reviewed）:

````text
MLSの初期化に成功（crypto_group_id, epoch）
````

## fence:1762-1775/line:2

原文:

````text
New Member Device
````

日本語補足（agent-reviewed）:

````text
新メンバーのデバイス
````

## fence:1762-1775/line:3

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:1762-1775/line:4

原文:

````text
Owner Device
````

日本語補足（agent-reviewed）:

````text
Ownerのデバイス
````

## fence:1762-1775/line:5

原文:

````text
Current Device Leaves
````

日本語補足（agent-reviewed）:

````text
現在のデバイスのLeaves
````

## fence:1762-1775/line:8

原文:

````text
business join succeeded (active)
````

日本語補足（agent-reviewed）:

````text
業務上の参加に成功（active）
````

## fence:1762-1775/line:12

原文:

````text
independent group.e2ee.notice(commit-delivery)
````

日本語補足（agent-reviewed）:

````text
独立したgroup.e2ee.notice(commit-delivery)
````

## fence:1779-1793/line:3

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:1779-1793/line:4

原文:

````text
Owner Device
````

日本語補足（agent-reviewed）:

````text
Ownerのデバイス
````

## fence:1779-1793/line:5

原文:

````text
New Member Device
````

日本語補足（agent-reviewed）:

````text
新メンバーのデバイス
````

## fence:1779-1793/line:6

原文:

````text
Current Device Leaves
````

日本語補足（agent-reviewed）:

````text
現在のデバイスのLeaves
````

## fence:1779-1793/line:9

原文:

````text
member addition succeeded (target active)
````

日本語補足（agent-reviewed）:

````text
メンバー追加に成功（target active）
````

## fence:1779-1793/line:13

原文:

````text
independent group.e2ee.notice(commit-delivery)
````

日本語補足（agent-reviewed）:

````text
独立したgroup.e2ee.notice(commit-delivery)
````

## fence:1797-1814/line:3

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:1797-1814/line:4

原文:

````text
Owner Device
````

日本語補足（agent-reviewed）:

````text
Ownerのデバイス
````

## fence:1797-1814/line:5

原文:

````text
Remaining Device Leaves
````

日本語補足（agent-reviewed）:

````text
残るデバイスのLeaves
````

## fence:1797-1814/line:6

原文:

````text
Removed Device Leaf
````

日本語補足（agent-reviewed）:

````text
削除されたデバイスのLeaf
````

## fence:1797-1814/line:9

原文:

````text
business state changed (removed/left)
````

日本語補足（agent-reviewed）:

````text
業務状態を変更済み（removed/left）
````

## fence:1797-1814/line:11

原文:

````text
each affected device leaf
````

日本語補足（agent-reviewed）:

````text
影響を受ける各デバイスのleaf
````

## fence:1797-1814/line:13

原文:

````text
independent group.e2ee.notice(commit-delivery)
````

日本語補足（agent-reviewed）:

````text
独立したgroup.e2ee.notice(commit-delivery)
````

## fence:1797-1814/line:14

原文:

````text
final group.e2ee.notice(commit-delivery, subject_status=removed)
````

日本語補足（agent-reviewed）:

````text
最終のgroup.e2ee.notice(commit-delivery, subject_status=removed)
````

## fence:1797-1814/line:16

原文:

````text
terminalize local binding only; no new epoch secret
````

日本語補足（agent-reviewed）:

````text
ローカルのバインディングだけを終了し、新しいepoch secretは取得しない
````

## fence:1818-1829/line:2

原文:

````text
Sending Device Leaf
````

日本語補足（agent-reviewed）:

````text
送信デバイスのLeaf
````

## fence:1818-1829/line:3

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:1818-1829/line:4

原文:

````text
Current Device Leaves
````

日本語補足（agent-reviewed）:

````text
現在のデバイスのLeaves
````

## fence:1818-1829/line:6

原文:

````text
Locally construct Group Application Plaintext
````

日本語補足（agent-reviewed）:

````text
Group Application Plaintextをローカルで構築
````

## fence:1818-1829/line:7

原文:

````text
Locally generate PrivateMessage and group_cipher_object
````

日本語補足（agent-reviewed）:

````text
PrivateMessageとgroup_cipher_objectをローカルで生成
````

## fence:1818-1829/line:8

原文:

````text
group.e2ee.send(sender_did, sender_device_id, one PrivateMessage)
````

日本語補足（agent-reviewed）:

````text
group.e2ee.send(sender_did, sender_device_id, 一つのPrivateMessage)
````

## fence:1818-1829/line:10

原文:

````text
independent P6 group.incoming(recipient_device_id, same PrivateMessage)
````

日本語補足（agent-reviewed）:

````text
独立したP6 group.incoming(recipient_device_id, 同じPrivateMessage)
````

## fence:1833-1856/line:2

原文:

````text
Selected New-DID Devices
````

日本語補足（agent-reviewed）:

````text
選択された新DIDのデバイス
````

## fence:1833-1856/line:3

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:1833-1856/line:4

原文:

````text
Owner Device / MLS Controller
````

日本語補足（agent-reviewed）:

````text
Ownerのデバイス／MLSコントローラー
````

## fence:1833-1856/line:5

原文:

````text
Retained Device Leaves
````

日本語補足（agent-reviewed）:

````text
保持するデバイスのLeaves
````

## fence:1833-1856/line:6

原文:

````text
Removed Old-DID Leaves
````

日本語補足（agent-reviewed）:

````text
削除される旧DIDのLeaves
````

## fence:1833-1856/line:8

原文:

````text
P4 Host accepts member DID update
````

日本語補足（agent-reviewed）:

````text
P4 HostがメンバーDIDの更新を受け入れる
````

## fence:1833-1856/line:10

原文:

````text
Pause new E2EE messages
````

日本語補足（agent-reviewed）:

````text
新しいE2EEメッセージを一時停止
````

## fence:1833-1856/line:11

原文:

````text
each selected new-DID device
````

日本語補足（agent-reviewed）:

````text
選択された新DIDの各デバイス
````

## fence:1833-1856/line:12

原文:

````text
group.e2ee.add(new DID, device ID)
````

日本語補足（technical-retained）:

````text
group.e2ee.add(new DID, device ID)
````

注: HTTP認証・暗号処理・メソッド引数の技術構文またはプレースホルダーを保持。

## fence:1833-1856/line:13

原文:

````text
welcome-delivery to exact recipient device
````

日本語補足（agent-reviewed）:

````text
正確に指定した受信デバイスへのwelcome-delivery
````

## fence:1833-1856/line:14

原文:

````text
independent commit-delivery envelopes
````

日本語補足（agent-reviewed）:

````text
独立したcommit-deliveryエンベロープ
````

## fence:1833-1856/line:16

原文:

````text
No application messages in any intermediate epoch
````

日本語補足（agent-reviewed）:

````text
すべての中間epochでアプリケーションメッセージを禁止
````

## fence:1833-1856/line:17

原文:

````text
each old-DID device leaf
````

日本語補足（agent-reviewed）:

````text
旧DIDの各デバイスleaf
````

## fence:1833-1856/line:18

原文:

````text
group.e2ee.remove(old DID, device ID)
````

日本語補足（technical-retained）:

````text
group.e2ee.remove(old DID, device ID)
````

注: HTTP認証・暗号処理・メソッド引数の技術構文またはプレースホルダーを保持。

## fence:1833-1856/line:19

原文:

````text
independent commit-delivery envelopes
````

日本語補足（agent-reviewed）:

````text
独立したcommit-deliveryエンベロープ
````

## fence:1833-1856/line:20

原文:

````text
final commit-delivery to the removed old-DID leaf
````

日本語補足（agent-reviewed）:

````text
削除される旧DIDのleafへの最終commit-delivery
````

## fence:1833-1856/line:22

原文:

````text
Resume after the final Remove succeeds
````

日本語補足（agent-reviewed）:

````text
最後のRemoveの成功後に再開
````
