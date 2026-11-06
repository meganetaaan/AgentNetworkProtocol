# tests/did-oauth-draft.test.mjs の人向け文章の日本語対応表

原文: [tests/did-oauth-draft.test.mjs](../../../../tests/did-oauth-draft.test.mjs)。元ファイルのキー、コード、診断文字列、署名対象データは変更していません。この文書は実行するコードや送信するJSONの代替ではありません。

原文SHA-256: `c307db700be51ced427f0d71e93cc950cda199ddf7a6be7edc7d3aabecc3bc98`

プログラムの抽出結果に加え、人が読む設定値・説明・コメントの抽出漏れを確認して補っています。技術値はそのまま保持し、保持理由を併記します。

## line:1:column:1

原文:

````text
Copyright (c) 2026 ANP Open Source Community. Apache-2.0.
````

日本語:

````text
Copyright (c) 2026 ANP Open Source Community。Apache-2.0。
````

## line:2:column:1

原文:

````text
Documentation checks only: these do not verify JWT signatures or OAuth runtime behavior.
````

日本語:

````text
文書のみの検査です。JWT署名やOAuthの実行時動作は検証しません。
````

## line:14:column:16

原文:

````text
chinese/05-ANP-基于DID的授权协议.md
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:29:column:3

原文:

````text
Identify examples by their schema so adding an OAuth example cannot shift VC fixtures.
````

日本語:

````text
OAuthの例を追加してもVC fixtureの参照位置がずれないよう、例をスキーマで識別します。
````

## line:43:column:8

原文:

````text
authorization document is an unreleased independent draft: 
````

日本語:

````text
認可文書は未リリースの独立した草案である: 
````

## line:57:column:6

原文:

````text
bilingual sections, explicit anchors and wire examples stay synchronized
````

日本語:

````text
二言語の節、明示的アンカー、wireの例を同期して保持する
````

## line:67:column:3

原文:

````text
Diagram labels are localized; every other code block must match byte for byte.
````

日本語:

````text
図のラベルは翻訳されます。それ以外のすべてのコードブロックは、バイトごとに一致しなければなりません。
````

## line:72:column:39

原文:

````text
flowchart TD
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:72:column:55

原文:

````text
flowchart LR
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:72:column:71

原文:

````text
flowchart TD
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:72:column:87

原文:

````text
flowchart TD
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:72:column:122

原文:

````text
flowchart LR
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:72:column:138

原文:

````text
flowchart TD
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:72:column:173

原文:

````text
flowchart TD
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:72:column:189

原文:

````text
flowchart TD
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:78:column:6

原文:

````text
Mermaid diagrams avoid statement separators that break rendering
````

日本語:

````text
Mermaid図では、描画を壊す文の区切りを使わない
````

## line:79:column:3

原文:

````text
Mermaid treats an ASCII semicolon as a statement separator, which truncates message labels.
````

日本語:

````text
MermaidはASCIIのセミコロンを文の区切りとして扱うため、メッセージのラベルが途中で切れます。
````

## line:87:column:6

原文:

````text
metadata reuses private_key_jwt and standard OAuth grant types
````

日本語:

````text
メタデータはprivate_key_jwtと標準OAuth grant typeを再利用する
````

## line:108:column:6

原文:

````text
illustrative assertion uses the CIMD URL, a JWKS key and bounded NumericDates
````

日本語:

````text
説明用assertionはCIMD URL、JWKS鍵、範囲を制限したNumericDateを使う
````

## line:126:column:6

原文:

````text
token request uses the CIMD URL and the standard client-assertion transport
````

日本語:

````text
トークン要求はCIMD URLと標準のclient-assertion搬送方式を使う
````

## line:143:column:6

原文:

````text
illustrative token response remains a standard non-cacheable OAuth response
````

日本語:

````text
説明用トークン応答は、キャッシュ不可の標準OAuth応答である
````

## line:156:column:6

原文:

````text
mirrors retain applicable security scenarios without reusing removed scenario IDs
````

日本語:

````text
二言語の文書は、廃止したシナリオIDを再利用せず、該当するセキュリティシナリオを保持する
````

## line:157:column:3

原文:

````text
Preserve established IDs; retired scenarios leave intentional gaps.
````

日本語:

````text
確立済みのIDを保持します。廃止したシナリオには意図的な欠番を残します。
````

## line:183:column:6

原文:

````text
identity references use the current ANP-02 bindings
````

日本語:

````text
アイデンティティへの参照は、現行のANP-02 bindingを使う
````

## line:185:column:22

原文:

````text
(02-ANP-基于DID的身份认证协议.md#identity-input)
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:187:column:22

原文:

````text
(03-did-wba方法规范.md#wba-auth-binding)
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:188:column:22

原文:

````text
**not** its HTTP signature serialization
````

日本語:

````text
そのHTTP署名のシリアル化は再利用しない
````

## line:189:column:22

原文:

````text
**不复用**其 HTTP 签名序列化
````

日本語:

````text
そのHTTP署名のシリアル化は再利用しない（中国語の原文照合用文字列）
````

## line:192:column:6

原文:

````text
root and vNext indexes expose the current CIMD draft scope
````

日本語:

````text
rootとvNextの索引に、現行CIMD草案の対象範囲を示す
````

## line:209:column:6

原文:

````text
release checker validates authorization and white paper drafts without redundant snapshots
````

日本語:

````text
release checkerは、重複したsnapshotなしで認可草案と白書草案を検証する
````

## line:222:column:78

原文:

````text
01-AgentNetworkProtocol技术白皮书.md
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:227:column:6

原文:

````text
vNext white paper authorization overviews match the current ANP-05 scope
````

日本語:

````text
vNext白書の認可概要は、現行ANP-05の対象範囲に一致する
````

## line:228:column:81

原文:

````text
vnext/chinese/01-AgentNetworkProtocol技术白皮书.md
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:233:column:6

原文:

````text
white paper scope check rejects current exchange claims and permits future research
````

日本語:

````text
白書の範囲検査は、現時点の交換の主張を拒否し、将来の研究を許容する
````

## line:234:column:16

原文:

````text
vnext/chinese/01-AgentNetworkProtocol技术白皮书.md
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:238:column:26

原文:

````text
两者也可以组合：智能体把 VC 交给资源方的授权服务器，换发普通的访问令牌。
````

日本語:

````text
両者は組み合わせることもできる。エージェントはVCをリソース側の認可サーバーへ渡し、通常のアクセストークンと交換する。
````

## line:240:column:25

原文:

````text
未来扩展可以研究将 VC 换发为 OAuth 访问令牌。
````

日本語:

````text
将来の拡張では、VCをOAuthアクセストークンへ交換する方式を研究できる。
````

## line:242:column:32

原文:

````text
首版不定义 VC/VP 换取 OAuth 访问令牌
````

日本語:

````text
初版は、VC/VPからOAuthアクセストークンへの交換を定義しない
````

## line:242:column:61

原文:

````text
首版支持 VC/VP 换取 OAuth 访问令牌
````

日本語:

````text
初版は、VC/VPからOAuthアクセストークンへの交換をサポートする
````

## line:244:column:19

原文:

````text
### 8.3 Authorization
ANP-05 v1 defines two independent authorization paths. V1 does not define conversion from VC/VP to OAuth access tokens. Future extensions may evaluate VC-to-token exchange.

````

日本語:

````text
8.3 認可。ANP-05 v1は二つの独立した認可経路を定義する。v1はVC/VPからOAuthアクセストークンへの変換を定義しない。将来の拡張ではVCからトークンへの交換を評価できる。
````

## line:246:column:73

原文:

````text
An Agent exchanges a VC for an OAuth access token.

````

日本語:

````text
エージェントはVCをOAuthアクセストークンと交換する。
````

## line:249:column:6

原文:

````text
resource metadata and challenge bind to the illustrated RS and AS
````

日本語:

````text
リソースのメタデータとchallengeは、例示したRSとASに結び付ける
````

## line:261:column:6

原文:

````text
DID service links to the exact CIMD client identifier without redefining OAuth metadata
````

日本語:

````text
DID serviceは、OAuthメタデータを再定義せずに、正確なCIMD client識別子へリンクする
````

## line:283:column:1

原文:

````text
This decodes the public document sample; it is not a DID-method validator.
````

日本語:

````text
公開された文書例をデコードする処理であり、DIDメソッドの検証器ではありません。
````

## line:290:column:24

原文:

````text
Invalid base58 character
````

日本語:

````text
無効なbase58文字
````

## line:299:column:6

原文:

````text
WBA publication binds its DID fingerprint to the authorized public Multikey
````

日本語:

````text
WBAの公開では、DID fingerprintを認可済みの公開Multikeyへ結び付ける
````

## line:313:column:20

原文:

````text
The asserted key must be published in the CIMD JWKS
````

日本語:

````text
assertionで示す鍵は、CIMD JWKSに公開されていなければなりません
````

## line:334:column:6

原文:

````text
illustrative DID identities use did:wba in both languages and form bodies
````

日本語:

````text
説明用DIDは、両言語およびフォーム本文でdid:wbaを使う
````

## line:350:column:6

原文:

````text
CIMD grant and callback metadata are internally consistent
````

日本語:

````text
CIMDのgrantとcallbackのメタデータは内部で整合する
````

## line:361:column:1

原文:

````text
Scope validation concerns document structure, not OAuth runtime behavior.
````

日本語:

````text
範囲の検証は文書構造に関するもので、OAuthの実行時動作ではありません。
````

## line:364:column:30

原文:

````text
<a id="future-extensions"></a>
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:381:column:6

原文:

````text
CIMD is the current contract and the retired DID client-ID contract is absent
````

日本語:

````text
CIMDが現行の契約であり、廃止したDID client-ID契約は存在しない
````

## line:385:column:6

原文:

````text
scope guard rejects obsolete client identity and unrelated ecosystem contracts
````

日本語:

````text
範囲検査は、古いclient identityと無関係なエコシステムの契約を拒否する
````

## line:389:column:15

原文:

````text

MCP composition

````

日本語:

````text
MCPとの構成
````

## line:390:column:15

原文:

````text

A2A composition

````

日本語:

````text
A2Aとの構成
````

## line:391:column:15

原文:

````text

Microsoft Entra adapter

````

日本語:

````text
Microsoft Entraアダプター
````

## line:406:column:4

原文:

````text
ordinary CIMD processing has no ANP resolver requirement
````

日本語:

````text
通常のCIMD処理はANPリゾルバーを必要としない
````

## line:409:column:4

原文:

````text
exact URL client identity equality
````

日本語:

````text
URL client identityの正確な同一性
````

## line:412:column:4

原文:

````text
first-contact admission is an AS policy choice
````

日本語:

````text
初回接触時の受入れはASのポリシーによる選択である
````

## line:415:column:4

原文:

````text
admission does not grant resource access
````

日本語:

````text
受入れはリソースへのアクセス権を付与しない
````

## line:418:column:4

原文:

````text
unchanged approved security snapshot at code redemption
````

日本語:

````text
codeを交換する時点で、承認済みのセキュリティsnapshotが変わっていない
````

## line:421:column:4

原文:

````text
authorization-response issuer strategy is fixed before the flow
````

日本語:

````text
認可応答のissuer方針は、フロー開始前に固定する
````

## line:424:column:4

原文:

````text
resource binding remains mandatory without imposing RFC 8707 on every AS
````

日本語:

````text
すべてのASにRFC 8707を課さず、リソースへの結合を必須のまま保つ
````

## line:427:column:4

原文:

````text
no resource-token passthrough
````

日本語:

````text
リソース用トークンをそのまま通さない
````

## line:430:column:4

原文:

````text
a required DID binding cannot fall back after rejection
````

日本語:

````text
必須のDID bindingが拒否された後に、別方式へフォールバックしない
````

## line:433:column:4

原文:

````text
atomic assertion replay enforcement
````

日本語:

````text
assertionのreplay防止を原子的に適用する
````

## line:436:column:4

原文:

````text
key revocation does not implicitly revoke issued access tokens
````

日本語:

````text
鍵の失効によって、発行済みアクセストークンが暗黙に失効することはない
````

## line:439:column:4

原文:

````text
advertising DID binding commits the AS to enforcement for all covered transactions
````

日本語:

````text
DID bindingを広告するASは、対象の全transactionでそれを強制しなければならない
````

## line:442:column:4

原文:

````text
actual key authorization cannot be satisfied by another key in the JWKS
````

日本語:

````text
実際の鍵の認可は、JWKS内の別の鍵では満たせない
````

## line:445:column:4

原文:

````text
reverse discovery is a hint and never overrides a trusted binding
````

日本語:

````text
逆向きの発見はヒントであり、信頼済みのbindingを上書きしない
````

## line:448:column:4

原文:

````text
a CIMD digest does not authenticate external JWKS bytes
````

日本語:

````text
CIMDのダイジェストは、外部JWKSのバイト列を認証しない
````

## line:451:column:4

原文:

````text
metadata binding alone does not prove private-key possession
````

日本語:

````text
メタデータへの結合だけでは、秘密鍵の所持を証明しない
````

## line:454:column:4

原文:

````text
revocation is checked before each operation
````

日本語:

````text
各操作の前に失効状態を検査する
````

## line:457:column:4

原文:

````text
enhanced assertion validation requires bounded integer time claims
````

日本語:

````text
強化assertion検証では、範囲を制限した整数の時刻claimを必須とする
````

## line:460:column:4

原文:

````text
CIMD production fetches cannot use the general private-network exception
````

日本語:

````text
本番用CIMD取得は、一般的なprivate-network例外を使えない
````

## line:463:column:4

原文:

````text
enhanced binding caches expire and failed revalidation cannot weaken processing
````

日本語:

````text
強化bindingのcacheには期限があり、再検証の失敗で処理を弱めない
````

## line:466:column:4

原文:

````text
cache eviction cannot clear a prior suspension or revocation decision
````

日本語:

````text
cacheの削除によって、以前の停止・失効の判断を取り消さない
````

## line:471:column:8

原文:

````text
CIMD binding requirement and deletion regression: 
````

日本語:

````text
CIMD binding要件と削除回帰: 
````

## line:487:column:6

原文:

````text
metadata digest matches exact serialized bytes including final newline in both languages
````

日本語:

````text
メタデータのダイジェストは、両言語で末尾改行を含む正確なシリアル化バイト列に一致する
````

## line:501:column:6

原文:

````text
metadata example integrity detects changed presentation, permissions and callbacks
````

日本語:

````text
メタデータ例の完全性検査は、表示内容、権限、callbackの変更を検知する
````

## line:505:column:17

原文:

````text
Example Agent A
````

日本語:

````text
例示エージェントA
````

## line:505:column:36

原文:

````text
Different Agent
````

日本語:

````text
別のエージェント
````

## line:518:column:6

原文:

````text
user-delegated access-token example uses existing client_id and a separate user sub
````

日本語:

````text
ユーザー委任アクセストークンの例は、既存client_idと別個のユーザーsubを使う
````

## line:530:column:6

原文:

````text
local code-redemption example repeats the actual loopback port and its distinct CIMD URL
````

日本語:

````text
ローカルでのcode交換の例は、実際のloopbackポートと、その専用CIMD URLを繰り返す
````

## line:548:column:6

原文:

````text
source references retain published baseline and distinguish future-design inputs
````

日本語:

````text
参照は公開済みの基準を保持し、将来設計の入力と区別する
````

## line:557:column:4

原文:

````text
v1 is basic user delegation, not completed full delegation
````

日本語:

````text
v1は基本的なユーザー委任であり、完全な委任が完成した版ではない
````

## line:560:column:4

原文:

````text
all four agent-authorization questions are defined
````

日本語:

````text
エージェント認可に関する四つの問いをすべて定義する
````

## line:563:column:4

原文:

````text
standard AS compatibility is conditional on its supported features and policy
````

日本語:

````text
標準ASとの互換性は、そのASがサポートする機能とポリシーを条件とする
````

## line:566:column:4

原文:

````text
metadata digest must be checked before its fields are used
````

日本語:

````text
メタデータのフィールドを使う前に、ダイジェストを検査しなければならない
````

## line:569:column:4

原文:

````text
metadata integrity does not remove DID-host and rollback assumptions
````

日本語:

````text
メタデータの完全性があっても、DID hostとrollbackに関する前提はなくならない
````

## line:572:column:4

原文:

````text
loopback port exception cannot change the redemption URI
````

日本語:

````text
loopbackポートの例外は、code交換時のURIの変更を許可しない
````

## line:575:column:4

原文:

````text
loopback redirects do not relax SSRF protection
````

日本語:

````text
loopback redirectによってSSRF保護を緩めない
````

## line:578:column:4

原文:

````text
routine key rotation preserves a client only while DID and URL remain unchanged
````

日本語:

````text
通常の鍵ローテーションがclientを維持できるのは、DIDとURLが変わらない間だけである
````

## line:581:column:4

原文:

````text
algorithm interoperability does not assume Ed25519 support at ordinary servers
````

日本語:

````text
アルゴリズムの相互運用性は、通常のサーバーがEd25519をサポートするとは仮定しない
````

## line:584:column:4

原文:

````text
legacy EdDSA is a configured compatibility option, not mandatory for all
````

日本語:

````text
旧EdDSAは設定による互換性オプションであり、全員に必須ではない
````

## line:587:column:4

原文:

````text
client-dependent policy rejects missing trusted identity rather than trusting a caller claim
````

日本語:

````text
client依存ポリシーでは、呼出し元の自己申告を信じず、信頼済みidentityがなければ拒否する
````

## line:590:column:4

原文:

````text
multiple resources require isolated authorizations rather than universal rights
````

日本語:

````text
複数リソースには、万能の権利ではなく、分離した認可が必要である
````

## line:593:column:4

原文:

````text
high-risk approval remains independently enforced
````

日本語:

````text
高リスク操作の承認は、独立した強制を維持する
````

## line:596:column:4

原文:

````text
draft and experimental reviews are separate from the stable release gate
````

日本語:

````text
草案・実験のレビューは、安定版リリースの条件と分離する
````

## line:601:column:8

原文:

````text
review scope and deletion regression: 
````

日本語:

````text
レビュー範囲と削除回帰: 
````

## line:621:column:6

原文:

````text
VC delegation credential example follows the Section 11.2 shape
````

日本語:

````text
VC委任credentialの例は、11.2節の形に従う
````

## line:648:column:6

原文:

````text
VC presentation binds holder and subject to the direct presentation transaction
````

日本語:

````text
VC提示はholderとsubjectを、直接提示のtransactionに結び付ける
````

## line:666:column:6

原文:

````text
v0.6 removes VC exchange wire fields and keeps RFC 8693 informative
````

日本語:

````text
v0.6はVC交換用のwireフィールドを削除し、RFC 8693を参考情報として残す
````

## line:669:column:48

原文:

````text
<a id="references"></a>
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:669:column:89

原文:

````text
<a id="future-extensions"></a>
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:674:column:47

原文:

````text
<a id="vc-authorization"></a>
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:674:column:94

原文:

````text
<a id="errors"></a>
````

技術値を原文のまま保持します。

````text
内容を確認し、パス・正規表現・コマンド・コード記法・fixture識別子に該当するため、実行上の値を正確に保持します。
````

## line:682:column:6

原文:

````text
VC direct presentation request carries a fresh challenge and a covered permission
````

日本語:

````text
VC直接提示要求には、新しいchallengeと対象権限を含める
````

## line:701:column:6

原文:

````text
examples distinguish supported role credentials from the type requested in this transaction
````

日本語:

````text
例では、サポートするrole credentialと、そのtransactionで要求された種類を区別する
````

## line:712:column:6

原文:

````text
organization role credential authorizes by action URI, not by resource or role name
````

日本語:

````text
組織role credentialは、リソース名やrole名ではなく、action URIで認可する
````

## line:738:column:4

原文:

````text
a role name alone is never authority
````

日本語:

````text
role名だけでは、決して権限にならない
````

## line:741:column:4

原文:

````text
unmapped role actions fail closed
````

日本語:

````text
マッピングされていないrole actionは、安全側に拒否する
````

## line:744:column:4

原文:

````text
role credentials cannot create rights the issuer does not hold
````

日本語:

````text
role credentialによって、issuer自身が持たない権利を作り出せない
````

## line:747:column:4

原文:

````text
role-credential issuers must be confirmed as the organization acting as principal
````

日本語:

````text
role credentialのissuerが、本人である組織として行為していることを確認しなければならない
````

## line:750:column:4

原文:

````text
VC and OAuth are distinct mechanisms with a stated selection section
````

日本語:

````text
VCとOAuthは別のメカニズムであり、選択についての節を示す
````

## line:753:column:4

原文:

````text
a raw VC or VP is never an access token
````

日本語:

````text
生のVCやVPをアクセストークンとして扱わない
````

## line:756:column:4

原文:

````text
self-issued delegation is invalid
````

日本語:

````text
自己発行した委任は無効である
````

## line:759:column:4

原文:

````text
unknown constraints fail closed
````

日本語:

````text
不明な制約は、安全側に拒否する
````

## line:762:column:4

原文:

````text
unavailable status fails closed
````

日本語:

````text
状態を確認できなければ、安全側に拒否する
````

## line:765:column:4

原文:

````text
issuer authority is confirmed by the verifier, not by the credential
````

日本語:

````text
issuerの権限はcredential自身ではなく、検証者が確認する
````

## line:768:column:4

原文:

````text
status lists must carry and satisfy validUntil
````

日本語:

````text
status listはvalidUntilを持ち、その条件を満たさなければならない
````

## line:771:column:4

原文:

````text
issuing authority cannot be derived from credentials the issuer holds
````

日本語:

````text
発行権限を、issuerが保有するcredentialから導いてはならない
````

## line:774:column:4

原文:

````text
challenges are consumed only after holder binding
````

日本語:

````text
challengeは、holderへの結合後にのみ消費する
````

## line:777:column:4

原文:

````text
the Agent signs only for the verifier it is dealing with
````

日本語:

````text
Agentは、現在やり取りしている検証者に対してのみ署名する
````

## line:780:column:4

原文:

````text
direct presentation is bound to the stored transaction
````

日本語:

````text
直接提示は、保存されたtransactionへ結び付ける
````

## line:783:column:4

原文:

````text
a single-operation presentation cannot become a session
````

日本語:

````text
単一操作用の提示を、sessionへ転用しない
````

## line:786:column:4

原文:

````text
amount limits never guess the amount or convert currency
````

日本語:

````text
金額上限では、金額を推測したり通貨を換算したりしない
````

## line:789:column:4

原文:

````text
attached credentials are not holder-bound and grant no authority
````

日本語:

````text
添付したcredentialにはholderへの結合がなく、権限を付与しない
````

## line:792:column:4

原文:

````text
VC conformance applies by role rather than to all of Section 11
````

日本語:

````text
VCの適合要件は、第11節全体へ一律に適用せず、役割ごとに適用する
````

## line:795:column:4

原文:

````text
v1 keeps OAuth and VC as independent authorization paths
````

日本語:

````text
v1はOAuthとVCを独立した認可経路として保持する
````

## line:798:column:4

原文:

````text
the presentation request advertises the exact supported VC profile
````

日本語:

````text
提示要求は、サポートする正確なVC Profileを広告する
````

## line:801:column:4

原文:

````text
unsupported presentation profiles cannot be silently downgraded
````

日本語:

````text
非対応の提示Profileを暗黙にダウングレードしない
````

## line:804:column:4

原文:

````text
the verifier generates and stores the presentation challenge
````

日本語:

````text
検証者が提示用challengeを生成し、保存する
````

## line:807:column:4

原文:

````text
holder identity is bound to the carrying transport authentication
````

日本語:

````text
holder identityは、その提示を運ぶ認証済み通信へ結び付ける
````

## line:810:column:4

原文:

````text
a successful presentation does not authorize an OAuth access token
````

日本語:

````text
提示の成功は、OAuthアクセストークンの認可を意味しない
````

## line:813:column:4

原文:

````text
the current profile prohibits sending a VC to an OAuth token endpoint
````

日本語:

````text
現行Profileでは、OAuth token endpointへVCを送ることを禁止する
````

## line:816:column:4

原文:

````text
direct presentation cannot bypass an OAuth interface
````

日本語:

````text
直接提示によってOAuthインターフェースを迂回できない
````

## line:819:column:4

原文:

````text
standalone qualification profiles are outside the current version
````

日本語:

````text
独立した資格Profileは、現行版の対象外である
````

## line:822:column:4

原文:

````text
the authorization type must be accepted by the stored presentation transaction
````

日本語:

````text
認可の種類は、保存された提示transactionが受け入れるものでなければならない
````

## line:825:column:4

原文:

````text
a different supported credential type cannot substitute for the requested type
````

日本語:

````text
要求された種類の代わりに、別のサポート済みcredential種類を使えない
````

## line:828:column:4

原文:

````text
accepted credential types are retained with the challenge
````

日本語:

````text
受け入れるcredential種類は、challengeとともに保持する
````

## line:831:column:4

原文:

````text
sessions retain the accepted entries and per-entry constraints
````

日本語:

````text
sessionは、受け入れた各entryとentryごとの制約を保持する
````

## line:834:column:4

原文:

````text
every subsequent session request authenticates its bound holder
````

日本語:

````text
以後の各session要求は、結合されたholderを認証する
````

## line:837:column:4

原文:

````text
session authorization rechecks dynamic parameters on every operation
````

日本語:

````text
sessionの認可では、操作ごとに動的パラメーターを再検査する
````

## line:840:column:4

原文:

````text
sessions have fixed finite lifetimes and renew only through a fresh presentation
````

日本語:

````text
sessionの存続期間は固定された有限値とし、更新には新しい提示を必要とする
````

## line:843:column:4

原文:

````text
personal data access requires an independently confirmed resource-side basis
````

日本語:

````text
個人データへのアクセスには、リソース側で独立して確認した根拠が必要である
````

## line:848:column:8

原文:

````text
VC requirement and deletion regression: 
````

日本語:

````text
VC要件と削除回帰: 
````
