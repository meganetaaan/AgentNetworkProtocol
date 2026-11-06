# examples/message-vnext/04-mls-two-device-leaves.json の人向け文章の日本語対応表

原文: [examples/message-vnext/04-mls-two-device-leaves.json](../../../../../examples/message-vnext/04-mls-two-device-leaves.json)。元ファイルのキー、コード、診断文字列、署名対象データは変更していません。この文書は実行するコードや送信するJSONの代替ではありません。

原文SHA-256: `4255d570ba19262ba9c91880b87fa1a3f55b4278ece7936c81da71f6b17eeaef`

プログラムの抽出結果に加え、人が読む設定値・説明・コメントの抽出漏れを確認して補っています。技術値はそのまま保持し、保持理由を併記します。

## /invariant

原文:

````text
Both leaves have credential.identity = UTF8(did:example:bob), but distinct authenticated device_id values and independent MLS private state.
````

日本語:

````text
両方のリーフでcredential.identity = UTF8(did:example:bob)ですが、認証済みのdevice_id値と、独立したMLSの秘密状態はそれぞれ異なります。
````

## /binding_invariant

原文:

````text
Each mls_key_package_b64u encodes a LeafNode with the provisional ANP v2 extension type 0xF0A1; its extension_data exactly matches the JCS bytes of did_wba_binding, LeafNode.capabilities.extensions lists 0xF0A1, and GroupContext.required_capabilities.extension_types includes 0xF0A1.
````

日本語:

````text
各mls_key_package_b64uは、暫定ANP v2拡張タイプ0xF0A1を持つLeafNodeをエンコードします。そのextension_dataはdid_wba_bindingのJCSバイト列と厳密に一致し、LeafNode.capabilities.extensionsは0xF0A1を列挙し、GroupContext.required_capabilities.extension_typesは0xF0A1を含みます。
````
