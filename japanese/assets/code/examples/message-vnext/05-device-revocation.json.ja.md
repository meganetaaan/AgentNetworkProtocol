# examples/message-vnext/05-device-revocation.json の人向け文章の日本語対応表

原文: [examples/message-vnext/05-device-revocation.json](../../../../../examples/message-vnext/05-device-revocation.json)。元ファイルのキー、コード、診断文字列、署名対象データは変更していません。この文書は実行するコードや送信するJSONの代替ではありません。

原文SHA-256: `ed134758eaeebd772a0ecc0dd8025173305d0511cc1d29691064e06c51226291`

プログラムの抽出結果に加え、人が読む設定値・説明・コメントの抽出漏れを確認して補っています。技術値はそのまま保持し、保持理由を併記します。

## /required_follow_up/0

原文:

````text
stop future PreKey and Mailbox use for dev-a2-9R5TLM
````

日本語:

````text
dev-a2-9R5TLMについて、以後のPreKeyとMailboxの使用を停止する。
````

## /required_follow_up/1

原文:

````text
invalidate unconsumed KeyPackages for dev-a2-9R5TLM
````

日本語:

````text
dev-a2-9R5TLMに対する、未使用のKeyPackagesを無効にする。
````

## /required_follow_up/2

原文:

````text
remove the device leaf from each MLS group and commit a new epoch
````

日本語:

````text
各MLSグループからデバイスのリーフを削除し、新しいepochを確定するCommitを行う。
````

## /required_follow_up/3

原文:

````text
never reuse the removed device_id or device keys
````

日本語:

````text
削除したdevice_idやデバイス鍵を再利用しない。
````
