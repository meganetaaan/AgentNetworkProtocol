# examples/message-vnext/02-direct-two-device-deliveries.json の人向け文章の日本語対応表

原文: [examples/message-vnext/02-direct-two-device-deliveries.json](../../../../../examples/message-vnext/02-direct-two-device-deliveries.json)。元ファイルのキー、コード、診断文字列、署名対象データは変更していません。この文書は実行するコードや送信するJSONの代替ではありません。

原文SHA-256: `1197e373696aacafa968bb64114a561557aad84351372ac3946b235977fec819`

プログラムの抽出結果に加え、人が読む設定値・説明・コメントの抽出漏れを確認して補っています。技術値はそのまま保持し、保持理由を併記します。

## /note

原文:

````text
This outer object is only an example collection and is not sent on the wire. Each direct.send is an independent P5 Direct E2EE delivery whose encrypted Application Plaintext contains the same logical_message_id; each response accepts only its exact recipient device ciphertext.
````

日本語:

````text
この外側のオブジェクトは例を集めたものであり、通信上では送信しません。各direct.sendは独立したP5 Direct E2EE配信で、暗号化されたApplication Plaintextは同じlogical_message_idを含みます。各応答は、その正確な宛先デバイス向けの暗号文だけを受け入れます。
````
