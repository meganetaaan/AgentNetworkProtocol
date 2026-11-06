# deprecated/05-direct-end-to-end-encryption.md のコード例・図ラベルの日本語補足

原文: [deprecated/05-direct-end-to-end-encryption.md](../../../../deprecated/05-direct-end-to-end-encryption.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:183-200/line:2

原文:

````text
Agent DID Document
````

日本語補足（agent-reviewed）:

````text
エージェントのDID文書
````

## fence:183-200/line:4

原文:

````text
Assertion Key<br/>assertionMethod
````

日本語補足（agent-reviewed）:

````text
アサーション鍵<br/>assertionMethod
````

## fence:183-200/line:5

原文:

````text
Static Key Agreement Key<br/>keyAgreement / X25519
````

日本語補足（agent-reviewed）:

````text
静的な鍵合意鍵<br/>keyAgreement / X25519
````

## fence:183-200/line:10

原文:

````text
Signed Prekey<br/>X25519
````

日本語補足（agent-reviewed）:

````text
署名付き事前鍵<br/>X25519
````

## fence:183-200/line:13

原文:

````text
One-Time Prekey pool
````

日本語補足（agent-reviewed）:

````text
使い捨て事前鍵のプール
````

## fence:183-200/line:16

原文:

````text
Return prekey_bundle + optional OPK
````

日本語補足（agent-reviewed）:

````text
prekey_bundle＋任意のOPKを返す
````

## fence:606-609/line:2:column:31

原文:

````text
ANP Direct E2EE v1 Initial Secret
````

日本語補足（technical-retained）:

````text
ANP Direct E2EE v1 Initial Secret
````

注: 暗号処理のドメイン分離用ラベル／識別文字列を原文のまま保持。

## fence:613-617/line:1:column:30

原文:

````text
ANP Direct E2EE v1 Root Key
````

日本語補足（technical-retained）:

````text
ANP Direct E2EE v1 Root Key
````

注: 暗号処理のドメイン分離用ラベル／識別文字列を原文のまま保持。

## fence:613-617/line:2:column:30

原文:

````text
ANP Direct E2EE v1 Chain Key
````

日本語補足（technical-retained）:

````text
ANP Direct E2EE v1 Chain Key
````

注: 暗号処理のドメイン分離用ラベル／識別文字列を原文のまま保持。

## fence:613-617/line:3:column:30

原文:

````text
ANP Direct E2EE v1 Session ID
````

日本語補足（technical-retained）:

````text
ANP Direct E2EE v1 Session ID
````

注: 暗号処理のドメイン分離用ラベル／識別文字列を原文のまま保持。

## fence:687-702/line:2

原文:

````text
Initiator A
````

日本語補足（agent-reviewed）:

````text
開始側A
````

## fence:687-702/line:3

原文:

````text
Receiver B's ANPMessageService
````

日本語補足（agent-reviewed）:

````text
受信側BのANPMessageService
````

## fence:687-702/line:4

原文:

````text
Receiver B
````

日本語補足（agent-reviewed）:

````text
受信側B
````

## fence:687-702/line:7

原文:

````text
prekey_bundle + optional OPK
````

日本語補足（agent-reviewed）:

````text
prekey_bundle＋任意のOPK
````

## fence:687-702/line:8

原文:

````text
Verify Bundle / generate EK_A / compute DH1~DH4 / derive SK
````

日本語補足（agent-reviewed）:

````text
Bundleを検証／EK_Aを生成／DH1~DH4を計算／SKを導出
````

## fence:687-702/line:10

原文:

````text
Deliver direct_init
````

日本語補足（agent-reviewed）:

````text
direct_initを配信
````

## fence:687-702/line:11

原文:

````text
Recompute shared secret / verify session_id / decrypt init
````

日本語補足（agent-reviewed）:

````text
共有秘密を再計算／session_idを検証／initを復号
````

## fence:687-702/line:12

原文:

````text
direct.send (first direct-cipher reply)
````

日本語補足（agent-reviewed）:

````text
direct.send（最初のdirect-cipher応答）
````

## fence:687-702/line:13

原文:

````text
First reply
````

日本語補足（agent-reviewed）:

````text
最初の応答
````

## fence:687-702/line:14

原文:

````text
Session enters established
````

日本語補足（agent-reviewed）:

````text
セッションがestablishedになる
````

## fence:936-948/line:3

原文:

````text
Send direct_init
````

日本語補足（agent-reviewed）:

````text
direct_initを送信
````

## fence:936-948/line:7

原文:

````text
Idempotent retry of the same init
````

日本語補足（agent-reviewed）:

````text
同じinitを冪等に再試行
````

## fence:936-948/line:8

原文:

````text
Receive first valid reply
````

日本語補足（agent-reviewed）:

````text
最初の有効な応答を受信
````

## fence:936-948/line:11

原文:

````text
reset / rebuild with new init
````

日本語補足（agent-reviewed）:

````text
reset／新しいinitで再構築
````

## fence:1032-1037/line:2:column:31

原文:

````text
ANP Direct E2EE v1 KDF_RK
````

日本語補足（technical-retained）:

````text
ANP Direct E2EE v1 KDF_RK
````

注: 暗号処理のドメイン分離用ラベル／識別文字列を原文のまま保持。

## fence:1041-1047/line:2:column:31

原文:

````text
ANP Direct E2EE v1 KDF_CK
````

日本語補足（technical-retained）:

````text
ANP Direct E2EE v1 KDF_CK
````

注: 暗号処理のドメイン分離用ラベル／識別文字列を原文のまま保持。

## fence:1135-1158/line:2

原文:

````text
Current session state<br/>RK / DHs / DHr / CKs / CKr / Ns / Nr / PN
````

日本語補足（agent-reviewed）:

````text
現在のセッション状態<br/>RK / DHs / DHr / CKs / CKr / Ns / Nr / PN
````

## fence:1135-1158/line:4

原文:

````text
Send subsequent message
````

日本語補足（agent-reviewed）:

````text
後続のメッセージを送信
````

## fence:1135-1158/line:6

原文:

````text
Obtain MK / NONCE / CKs'
````

日本語補足（agent-reviewed）:

````text
MK / NONCE / CKs'を取得
````

## fence:1135-1158/line:7

原文:

````text
Encrypt Application Plaintext
````

日本語補足（agent-reviewed）:

````text
Application Plaintextを暗号化
````

## fence:1135-1158/line:8

原文:

````text
Update CKs = CKs' ; Ns++
````

日本語補足（agent-reviewed）:

````text
CKs = CKs' ; Ns++へ更新
````

## fence:1135-1158/line:10

原文:

````text
Receive message<br/>dh_pub equals current DHr
````

日本語補足（agent-reviewed）:

````text
メッセージを受信<br/>dh_pubが現在のDHrと同じ
````

## fence:1135-1158/line:12

原文:

````text
Obtain MK / NONCE / CKr'
````

日本語補足（agent-reviewed）:

````text
MK / NONCE / CKr'を取得
````

## fence:1135-1158/line:13

原文:

````text
Decrypt and verify AD_msg
````

日本語補足（agent-reviewed）:

````text
復号し、AD_msgを検証
````

## fence:1135-1158/line:14

原文:

````text
Update CKr = CKr' ; Nr++
````

日本語補足（agent-reviewed）:

````text
CKr = CKr' ; Nr++へ更新
````

## fence:1135-1158/line:16

原文:

````text
Receive message<br/>dh_pub differs from current DHr
````

日本語補足（agent-reviewed）:

````text
メッセージを受信<br/>dh_pubが現在のDHrと異なる
````

## fence:1135-1158/line:18

原文:

````text
Obtain new CKr
````

日本語補足（agent-reviewed）:

````text
新しいCKrを取得
````

## fence:1135-1158/line:19

原文:

````text
Generate new DHs
````

日本語補足（agent-reviewed）:

````text
新しいDHsを生成
````

## fence:1135-1158/line:21

原文:

````text
Obtain new CKs
````

日本語補足（agent-reviewed）:

````text
新しいCKsを取得
````

## fence:1251-1262/line:3:column:17

原文:

````text
<outer meta.message_id>
````

日本語補足（technical-retained）:

````text
<outer meta.message_id>
````

注: プロトコルのフィールド／型／プレースホルダーの技術表記を保持。

## fence:1251-1262/line:6:column:17

原文:

````text
<outer meta.sender_did>
````

日本語補足（technical-retained）:

````text
<outer meta.sender_did>
````

注: プロトコルのフィールド／型／プレースホルダーの技術表記を保持。

## fence:1251-1262/line:7:column:20

原文:

````text
<outer meta.target.did>
````

日本語補足（technical-retained）:

````text
<outer meta.target.did>
````

注: プロトコルのフィールド／型／プレースホルダーの技術表記を保持。

## fence:606-609

原文:

````text
PRK = HKDF-Extract(salt = 0x00...00(32 bytes), IKM)
SK  = HKDF-Expand(PRK, info = "ANP Direct E2EE v1 Initial Secret", L = 32)
````

日本語補足（technical-retained）:

````text
PRK = HKDF-Extract(salt = 0x00...00(32 bytes), IKM)
SK  = HKDF-Expand(PRK, info = "ANP Direct E2EE v1 Initial Secret", L = 32)
````

注: HKDFの数式、32 bytes、鍵導出のドメイン分離文字列を保持。Initial Secretは初期秘密情報を表す。

## fence:613-617

原文:

````text
RK0 = HKDF-Expand(SK, info = "ANP Direct E2EE v1 Root Key", L = 32)
CK0 = HKDF-Expand(SK, info = "ANP Direct E2EE v1 Chain Key", L = 32)
SID = HKDF-Expand(SK, info = "ANP Direct E2EE v1 Session ID", L = 16)
````

日本語補足（technical-retained）:

````text
RK0 = HKDF-Expand(SK, info = "ANP Direct E2EE v1 Root Key", L = 32)
CK0 = HKDF-Expand(SK, info = "ANP Direct E2EE v1 Chain Key", L = 32)
SID = HKDF-Expand(SK, info = "ANP Direct E2EE v1 Session ID", L = 16)
````

注: 鍵導出式、長さ、ドメイン分離文字列を保持。Root Key＝ルート鍵、Chain Key＝チェーン鍵、Session ID＝セッション識別子。

## fence:1032-1037

原文:

````text
PRK = HKDF-Extract(salt = RK, IKM = dh_out)
OUT = HKDF-Expand(PRK, info = "ANP Direct E2EE v1 KDF_RK", L = 64)
RK' = OUT[0:32]
CK  = OUT[32:64]
````

日本語補足（technical-retained）:

````text
PRK = HKDF-Extract(salt = RK, IKM = dh_out)
OUT = HKDF-Expand(PRK, info = "ANP Direct E2EE v1 KDF_RK", L = 64)
RK' = OUT[0:32]
CK  = OUT[32:64]
````

注: HKDFの数式、インデックス、KDF_RKのドメイン分離文字列を保持。

## fence:1041-1047

原文:

````text
PRK = HKDF-Extract(salt = 0x00...00(32 bytes), IKM = CK)
OUT = HKDF-Expand(PRK, info = "ANP Direct E2EE v1 KDF_CK", L = 76)
CK'   = OUT[0:32]
MK    = OUT[32:64]
NONCE = OUT[64:76]
````

日本語補足（technical-retained）:

````text
PRK = HKDF-Extract(salt = 0x00...00(32 bytes), IKM = CK)
OUT = HKDF-Expand(PRK, info = "ANP Direct E2EE v1 KDF_CK", L = 76)
CK'   = OUT[0:32]
MK    = OUT[32:64]
NONCE = OUT[64:76]
````

注: HKDFの数式、インデックス、KDF_CKのドメイン分離文字列を保持。
