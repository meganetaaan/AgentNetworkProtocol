# standard/W3C-proposal/DID-OAuth-Compatibility Discussion-cn.md のコード例・図ラベルの日本語補足

原文: [standard/W3C-proposal/DID-OAuth-Compatibility Discussion-cn.md](../../../../../standard/W3C-proposal/DID-OAuth-Compatibility%20Discussion-cn.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:105-181/line:12

原文:

````text
Phase 1: OAuth Initiation
````

日本語補足（agent-reviewed）:

````text
フェーズ1：OAuthの開始
````

## fence:105-181/line:13

原文:

````text
GET /authorize (PKCE Start)<br/>client_id=PUBLIC_AGENT<br/>response_type=code<br/>code_challenge=S256(...)
````

日本語補足（agent-reviewed）:

````text
GET /authorize（PKCE開始）<br/>client_id=PUBLIC_AGENT<br/>response_type=code<br/>code_challenge=S256(...)
````

## fence:105-181/line:15

原文:

````text
302 Redirect to IdP<br/>(OIDC Federation)
````

日本語補足（agent-reviewed）:

````text
IdPへ302リダイレクト<br/>（OIDC Federation）
````

## fence:105-181/line:20

原文:

````text
Phase 2: DID Authentication (Bridge)
````

日本語補足（agent-reviewed）:

````text
フェーズ2：DID認証（ブリッジ）
````

## fence:105-181/line:21

原文:

````text
Agent 自动跟随跳转到 IdP
````

日本語補足（agent-reviewed）:

````text
エージェントがIdPへのリダイレクトを自動でたどる
````

## fence:105-181/line:22

原文:

````text
GET /auth (from Redirect)
````

日本語補足（agent-reviewed）:

````text
GET /auth（リダイレクトから）
````

## fence:105-181/line:24

原文:

````text
Challenge: Request VP
````

日本語補足（agent-reviewed）:

````text
チャレンジ：VPを要求
````

## fence:105-181/line:26

原文:

````text
用 DID 私钥签名 VP
````

日本語補足（agent-reviewed）:

````text
DIDの秘密鍵でVPに署名
````

## fence:105-181/line:27

原文:

````text
POST /verify-vp (Verifiable Presentation)
````

日本語補足（agent-reviewed）:

````text
POST /verify-vp（Verifiable Presentation）
````

## fence:105-181/line:29

原文:

````text
验证 VP 签名 & 时效
````

日本語補足（agent-reviewed）:

````text
VPの署名と有効期間を検証
````

## fence:105-181/line:31

原文:

````text
认证成功，发放 IdP_Code
````

日本語補足（agent-reviewed）:

````text
認証に成功し、IdP_Codeを発行
````

## fence:105-181/line:32

原文:

````text
302 Redirect back to AS<br/>Location: as.com/callback?code=IdP_Code
````

日本語補足（agent-reviewed）:

````text
ASへ302で戻る<br/>Location: as.com/callback?code=IdP_Code
````

## fence:105-181/line:37

原文:

````text
Phase 3: AS Validation (Back-channel)
````

日本語補足（agent-reviewed）:

````text
フェーズ3：ASでの検証（バックチャネル）
````

## fence:105-181/line:38

原文:

````text
Agent 将 IdP_Code 搬运给 AS
````

日本語補足（agent-reviewed）:

````text
エージェントがIdP_CodeをASへ運ぶ
````

## fence:105-181/line:41

原文:

````text
AS 后端直接找 IdP 验证
````

日本語補足（agent-reviewed）:

````text
ASのバックエンドがIdPに直接問い合わせて検証
````

## fence:105-181/line:43

原文:

````text
ID Token (sub=did:example:123)
````

日本語補足（technical-retained）:

````text
ID Token (sub=did:example:123)
````

注: プロトコルの要求・応答・ヘッダー・scope・識別子の技術表記を保持。人向け本文ではなくコード例の値。

## fence:105-181/line:45

原文:

````text
验证 ID Token 签名<br/>确认用户身份为 DID
````

日本語補足（agent-reviewed）:

````text
ID Tokenの署名を検証<br/>利用者のアイデンティティがDIDであることを確認
````

## fence:105-181/line:47

原文:

````text
生成 AS_Code<br/>关联 PKCE & DID 用户
````

日本語補足（agent-reviewed）:

````text
AS_Codeを生成<br/>PKCEとDID利用者を関連付ける
````

## fence:105-181/line:48

原文:

````text
302 Redirect to App<br/>Location: app://callback?code=AS_Code
````

日本語補足（agent-reviewed）:

````text
アプリへ302リダイレクト<br/>Location: app://callback?code=AS_Code
````

## fence:105-181/line:53

原文:

````text
Phase 4: Token Exchange with DPoP
````

日本語補足（agent-reviewed）:

````text
フェーズ4：DPoPによるトークン交換
````

## fence:105-181/line:54

原文:

````text
构造 DPoP Proof JWT<br/>必须用 DID 私钥签名
````

日本語補足（agent-reviewed）:

````text
DPoP Proof JWTを構築<br/>DIDの秘密鍵で署名しなければならない
````

## fence:105-181/line:56

原文:

````text
POST /token (Exchange AS_Code)<br/>code_verifier=...<br/>Header: DPoP <Proof JWT>
````

日本語補足（agent-reviewed）:

````text
POST /token（AS_Codeを交換）<br/>code_verifier=...<br/>Header: DPoP <Proof JWT>
````

## fence:105-181/line:58

原文:

````text
1. 验证 PKCE<br/>2. 验证 DPoP 签名<br/>3. 提取 DPoP 公钥
````

日本語補足（agent-reviewed）:

````text
1. PKCEを検証<br/>2. DPoPの署名を検証<br/>3. DPoPの公開鍵を抽出
````

## fence:105-181/line:60

原文:

````text
关键步骤：绑定<br/>Access Token 内写入 cnf: {jwk: DID_Key}
````

日本語補足（agent-reviewed）:

````text
重要な手順：バインディング<br/>Access Tokenにcnf: {jwk: DID_Key}を書き込む
````

## fence:105-181/line:62

原文:

````text
Access Token (DPoP Bound)
````

日本語補足（agent-reviewed）:

````text
アクセストークン（DPoPにバインド）
````

## fence:105-181/line:67

原文:

````text
Phase 5: Resource Access
````

日本語補足（agent-reviewed）:

````text
フェーズ5：リソースへのアクセス
````

## fence:105-181/line:68

原文:

````text
再次用 DID 私钥签 DPoP (针对 RS URL)
````

日本語補足（agent-reviewed）:

````text
DIDの秘密鍵で再びDPoPに署名（RS URL向け）
````

## fence:105-181/line:70

原文:

````text
GET /api/data<br/>Auth: Bearer <Access Token><br/>Header: DPoP <Proof JWT>
````

日本語補足（technical-retained）:

````text
GET /api/data<br/>Auth: Bearer <Access Token><br/>Header: DPoP <Proof JWT>
````

注: プロトコルの要求・応答・ヘッダー・scope・識別子の技術表記を保持。人向け本文ではなくコード例の値。

## fence:105-181/line:72

原文:

````text
1. 验 Token 合法性<br/>2. 验 DPoP 签名<br/>3. 确保 Token.cnf 匹配 DPoP Key
````

日本語補足（agent-reviewed）:

````text
1. Tokenの有効性を検証<br/>2. DPoPの署名を検証<br/>3. Token.cnfとDPoP Keyの一致を確認
````

## fence:105-181/line:74

原文:

````text
200 OK Data
````

日本語補足（agent-reviewed）:

````text
200 OK：データ
````
