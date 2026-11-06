<!-- translation-review: full; source=chinese/思考&问题/身份认证与加密/MCP-wba-commit.md; basis=complete manual translation against the original in the preceding review -->
> 日本語訳。原文：[MCP-wba-commit.md](../../../../chinese/思考&问题/身份认证与加密/MCP-wba-commit.md)。研究メモ中の記述・主張は執筆時点の原文に従います。

[提案] W3C DID 仕様に基づく認証方式 `did:wba` の対応

## 動機と背景

MCP に実験的な認証方式 `did:wba` を追加しました。

次の理由から、`did:wba` は OAuth 2.0 を補完する優れた方式になると考えています。

1. `did:wba` は OAuth 2.0 と同等の安全性を提供します。
2. `did:wba` は分散型の本人認証に対応し、相互運用性が高くなります。
3. `did:wba` はやり取りの回数が少なく、手順が簡単です。

did:wba を使えば、MCP サーバーへのアクセスの敷居を下げられます。exa のような API サービスを例にすると、exa 側も did:wba に対応して API の契約インターフェースを提供すれば、利用者は登録・設定・契約のために exa にログインする必要がありません。MCP クライアントは API と利用者の DID で exa のサービスを直接契約し、その後、認証情報を付けたリクエストを exa の MCP サーバーへ送り、本人認証と API 呼び出しを行えます。さまざまな MCP サーバーを、より便利に利用できます。

このコードの変更は、まだ main にマージされていないブランチ（PR：[https://github.com/modelcontextprotocol/specification/pull/101](https://github.com/modelcontextprotocol/specification/pull/101)）を基にしています。そのブランチに変更があれば、コードも追従します。

## どのようにテストしましたか

この提案は、クライアント／サーバーにはまだ実装されていません。

## 破壊的変更

利用者によるコードや設定の更新は不要です。実験的な方式なので、サーバーやクライアントは対応しないことも選べます。

## 変更の種類

- [ ] バグ修正（問題を修正する後方互換の変更）
- [x] 新機能（機能を追加する後方互換の変更）
- [ ] 破壊的変更（既存機能の挙動を変える修正または新機能）
- [ ] 文書の更新

## チェックリスト

<!-- 以下を確認し、該当する項目を `x` で選択してください。 -->
- [x] [MCP の文書](https://modelcontextprotocol.io) を読みました。
- [x] コードはリポジトリのスタイルガイドに従っています。
- [x] 新旧のテストがローカルで成功します。
- [x] 適切なエラー処理を追加しました。
- [x] 必要に応じて文書を追加・更新しました。

## 追加の背景

<!-- その他の背景、実装上の注記、設計上の判断を記入してください。 -->

関連文書：

1. [did:wba メソッド設計仕様](https://github.com/agent-network-protocol/AgentNetworkProtocol/blob/main/03-did%3Awba%20Method%20Design%20Specification.md)
2. ブログ：
   - [did:wba ― Web ベースの分散型識別子](https://github.com/agent-network-protocol/AgentNetworkProtocol/blob/main/blogs/did%3Awba%2C%20a%20Web-based%20Decentralized%20Identifier.md)
   - [did:wba のセキュリティ原理](https://github.com/agent-network-protocol/AgentNetworkProtocol/blob/main/blogs/did%3Awba-security-principles.md)
   - [エージェントに適した本人認証技術：OpenID Connect、API キー、did:wba の比較](https://github.com/agent-network-protocol/AgentNetworkProtocol/blob/main/blogs/Comparison%20of%20did%3Awba%20with%20OpenID%20Connect%20and%20API%20keys.md)


## 著作権表示
Copyright (c) 2024 ANP Community  
本ファイルは [MIT ライセンス](../../../../LICENSE) の下で公開されています。自由に使用・変更できますが、この著作権表示を保持する必要があります。
