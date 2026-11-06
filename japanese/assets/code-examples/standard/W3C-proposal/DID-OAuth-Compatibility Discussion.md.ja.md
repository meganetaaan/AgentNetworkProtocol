# standard/W3C-proposal/DID-OAuth-Compatibility Discussion.md のコード例・図ラベルの日本語補足

原文: [standard/W3C-proposal/DID-OAuth-Compatibility Discussion.md](../../../../../standard/W3C-proposal/DID-OAuth-Compatibility%20Discussion.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:104-137/line:4

原文:

````text
OAuth Client
````

日本語補足（agent-reviewed）:

````text
OAuthクライアント
````

## fence:104-137/line:6

原文:

````text
DID Authentication Service
````

日本語補足（agent-reviewed）:

````text
DID認証サービス
````

## fence:104-137/line:7

原文:

````text
OAuth Authorization Server
````

日本語補足（agent-reviewed）:

````text
OAuth認可サーバー
````

## fence:104-137/line:8

原文:

````text
Resource Server
````

日本語補足（agent-reviewed）:

````text
リソースサーバー
````

## fence:104-137/line:11

原文:

````text
Authorization Request (client_id, redirect_uri, etc.)
````

日本語補足（agent-reviewed）:

````text
認可要求（client_id、redirect_uriなど）
````

## fence:104-137/line:12

原文:

````text
Redirect to DIDAuth (Authn required)
````

日本語補足（agent-reviewed）:

````text
DIDAuthへリダイレクト（認証が必要）
````

## fence:104-137/line:15

原文:

````text
Open DID-auth page
````

日本語補足（agent-reviewed）:

````text
DID認証ページを開く
````

## fence:104-137/line:16

原文:

````text
Request DID Signature + VC + Personhood VC
````

日本語補足（agent-reviewed）:

````text
DID署名＋VC＋Personhood VCを要求
````

## fence:104-137/line:17

原文:

````text
Return Verifiable Presentation (VP)
````

日本語補足（agent-reviewed）:

````text
Verifiable Presentation（VP）を返す
````

## fence:104-137/line:18

原文:

````text
Verify VP
````

日本語補足（agent-reviewed）:

````text
VPを検証
````

## fence:104-137/line:19

原文:

````text
ID Token (with VC claims/identity info)
````

日本語補足（agent-reviewed）:

````text
ID Token（VCクレーム／アイデンティティ情報を含む）
````

## fence:104-137/line:22

原文:

````text
Submit ID Token + client_id
````

日本語補足（agent-reviewed）:

````text
ID Token＋client_idを送信
````

## fence:104-137/line:23

原文:

````text
Verify ID Token and VC claims/identity info
````

日本語補足（agent-reviewed）:

````text
ID TokenとVCクレーム／アイデンティティ情報を検証
````

## fence:104-137/line:24

原文:

````text
Construct RAR (authorization_details)
````

日本語補足（agent-reviewed）:

````text
RAR（authorization_details）を構築
````

## fence:104-137/line:25

原文:

````text
Bind DPoP public key (cnf.jwk)
````

日本語補足（agent-reviewed）:

````text
DPoP公開鍵をバインド（cnf.jwk）
````

## fence:104-137/line:26

原文:

````text
Access Token (DPoP-bound, RAR included)
````

日本語補足（agent-reviewed）:

````text
アクセストークン（DPoPにバインド、RARを含む）
````

## fence:104-137/line:29

原文:

````text
DPoP Proof + Access Token
````

日本語補足（agent-reviewed）:

````text
DPoP Proof＋Access Token
````

## fence:104-137/line:30

原文:

````text
Validate Token + Validate DPoP
````

日本語補足（agent-reviewed）:

````text
Tokenを検証＋DPoPを検証
````

## fence:104-137/line:31

原文:

````text
Enforce RAR / UMA Policy
````

日本語補足（agent-reviewed）:

````text
RAR／UMAポリシーを適用
````

## fence:104-137/line:32

原文:

````text
Protected Resource
````

日本語補足（agent-reviewed）:

````text
保護対象リソース
````
