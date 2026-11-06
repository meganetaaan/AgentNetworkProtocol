# examples/did-authentication-vnext/identities.json の人向け文章の日本語対応表

原文: [examples/did-authentication-vnext/identities.json](../../../../../examples/did-authentication-vnext/identities.json)。元ファイルのキー、コード、診断文字列、署名対象データは変更していません。この文書は実行するコードや送信するJSONの代替ではありません。

原文SHA-256: `1d71031cb128808f0623733fd44fe36e7052e788e162f6cd4b405bfce11ffac3`

プログラムの抽出結果に加え、人が読む設定値・説明・コメントの抽出漏れを確認して補っています。技術値はそのまま保持し、保持理由を併記します。

## /test_key_derivation

原文:

````text
SHA-256("ANP02-PUBLIC-TEST-ONLY:" + key label); all keys are public test material, never production credentials.
````

日本語:

````text
SHA-256("ANP02-PUBLIC-TEST-ONLY:" + key label)。すべての鍵は公開テスト用素材であり、本番の認証情報ではありません。
````

## /network_boundary

原文:

````text
No HTTPS, DNS, method resolver or state freshness is exercised by generating these documents.
````

日本語:

````text
これらの文書を生成しても、HTTPS、DNS、メソッドリゾルバー、状態の鮮度は実際に検証されません。
````
