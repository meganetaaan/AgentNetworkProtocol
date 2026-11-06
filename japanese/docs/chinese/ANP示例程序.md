<!-- translation-review: full; source=docs/chinese/ANP示例程序.md; basis=entire original read and manually compared paragraph by paragraph -->
> 日本語参考訳（機械翻訳を基に原文全文を照合済み）。規範となるのは原文です。コード例・識別子・規範キーワードは原文を保持しています。
> 原文: [docs/chinese/ANP示例程序.md](../../../docs/chinese/ANP示例程序.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

# サンプルプログラム一覧／デモ一覧

[英語節の訳](../../../docs/chinese/ANP示例程序.md#english) | [中国語節の訳](../../../docs/chinese/ANP示例程序.md#chinese)

<a name = "chinese"></a>
## 目次：中国語節の訳

- [X] サンプル1：[ANP ネットワーク探索ツール](../../../docs/chinese/ANP示例程序.md#demo1)
- [X] サンプル2：[ANP 天気エージェントサービス：サーバー](../../../docs/chinese/ANP示例程序.md#demo2)
- [X] サンプル3：[ANP エージェント通信例](../../../docs/chinese/ANP示例程序.md#demo3)

<a name = "demo1"></a>
## サンプル1：ANP ネットワーク探索ツール

### 概要

このサンプルは、天気照会に ANP を使う例です。自然言語で動く Agent により、利用者は簡単に天気を調べ、将来の技術がもたらす便利なやり取りを体験できます。

### 特徴

自然言語による対話：複雑なコマンドを入力せず、自然言語で Agent と話せます。

透明な照会手順：照会の過程と Agent のアクセス記録を表示し、情報を得た経路を利用者が理解できます。

利用しやすいアクセス方法：Web ページで直接使う方法と、コードをローカルで実行する方法を用意し、異なる利用者の要望に応えます。

### リンク

Web ページ：https://service.agent-network-protocol.com/anp-demo/

コードリポジトリ：https://github.com/agent-network-protocol/anp-examples

<a name = "demo2"></a>
## サンプル2：ANP 天気エージェントサービス：サーバー

### 概要

ANP 天気エージェントサービスのサーバー側の例です。第三者の天気照会 API を統合することで、サンプル1の ANP ネットワーク探索ツールから発見され、天気照会サービスを提供できます。DEMO1 と DEMO2 の関係は次の図のとおりです。

![デモ間の関係](../../../images/relationship.png)

### 特徴

第三者 API の統合：天気照会 API を統合し、リアルタイムの天気情報を提供します。

クライアントとの協働：ANP ネットワーク探索ツールであるクライアントから発見され、天気情報を提供できます。

柔軟な配備：ローカル実行やクラウドサーバーへの配備など、複数の方法に対応します。

### リンク

Web アクセス先：https://agent-weather.xyz/ad.json

コードリポジトリ：https://github.com/agent-network-protocol/anp-weather-agent

<a name = "demo3"></a>
## サンプル3：ANP エージェント通信例

### 概要

ANP に準拠するリモートエージェントと、そのクライアントの構築・利用方法を示します。FastANP を使えば、認証、サービス発見、JSON-RPC 呼び出しの能力を持つエージェントアプリケーションを素早く作れます。

### 特徴

リモートエージェントサービス：FastANP によるサーバーが、JSON-RPC 呼び出しに対応する echo と greeting の2つのサンプルインターフェースを提供します。

複数のクライアント実装：基本的な ANPCrawler のスクリプトクライアントと、LLM を統合した知的クライアントにより、異なるやり取りを示します。

DID 認証：完全な DID 文書と JWT 署名の例で、エージェント間の安全な認証フローを示します。

柔軟な配備：ローカルの開発・テストとクラウドへの配備に対応し、オンラインでアクセスできるデモ環境も提供します。

### リンク

オンラインデモ：https://agent-connect.ai/agents/test/ad.json

コードリポジトリ：https://github.com/agent-network-protocol/anp-agent-example

# 今後のデモにもご期待ください

<a name = "english"></a>
## 目次：英語節の訳

- [X] DEMO 1：[ANP ネットワーク探索ツール](../../../docs/chinese/ANP示例程序.md#demo1-en)
- [X] DEMO 2：[ANP 天気エージェントサービス：サーバー](../../../docs/chinese/ANP示例程序.md#demo2-en)
- [X] DEMO 3：[ANP エージェント通信例](../../../docs/chinese/ANP示例程序.md#demo3-en)

<a name = "demo1-en"></a>
## DEMO 1：ANP ネットワーク探索ツール

### 概要

このサンプルは、天気照会に ANP を使う例です。自然言語で動くエージェントにより、利用者は簡単に天気を調べ、将来の技術がもたらす便利なやり取りを体験できます。

### 特徴

自然言語による対話：複雑なコマンドを入力せず、エージェントと自然言語で話せます。

透明な照会手順：照会の過程と Agent のアクセス記録を明示し、情報を取得した方法を利用者が理解できます。

利用しやすいアクセス方法：Web ページを直接使う方法と、コードをローカルで実行する方法を用意し、異なる利用者の要望に応えます。

### リンク

Web ページ：https://service.agent-network-protocol.com/anp-demo/

GitHub：https://github.com/agent-network-protocol/anp-examples

<a name = "demo2-en"></a>
## DEMO 2：ANP 天気エージェントサービス：サーバー

### 概要

ANP 天気エージェントサービスのサーバー側の例です。

第三者の天気照会 API を統合することで、サンプル1の ANP ネットワーク探索ツールから発見され、天気照会サービスを提供できます。

DEMO1 と DEMO2 の関係は次の図のとおりです。

![デモ間の関係](../../../images/relationship.png)

### 特徴

第三者 API の統合：天気照会 API を統合し、リアルタイムの天気情報を提供します。

クライアントとの協働：ANP ネットワーク探索ツールであるクライアントから発見され、天気情報を提供できます。

柔軟な配備：ローカル実行とクラウドサーバーへの配備など、複数の方法に対応します。

### リンク

Web アクセス先：https://agent-weather.xyz/ad.json

GitHub：https://github.com/agent-network-protocol/anp-weather-agent

<a name = "demo3-en"></a>
## DEMO 3：ANP エージェント通信例

### 概要

ANP に準拠したリモートエージェントと、そのクライアントを構築して実際に使う方法を示します。FastANP により、認証、サービス発見、JSON-RPC 呼び出しの能力を持つエージェントアプリケーションを素早く作れます。

### 特徴

リモートエージェントサービス：FastANP によるサーバーが、JSON-RPC 呼び出しに対応する echo と greeting のサンプルインターフェースを提供します。

複数のクライアント実装：基本的な ANPCrawler のスクリプトクライアントと、LLM を統合した知的クライアントで、異なるやり取りを示します。

DID 認証：完全な DID 文書と JWT 署名の例で、エージェント間の安全な認証フローを示します。

柔軟な配備：ローカル開発・テストとクラウド配備に対応し、オンラインで使えるデモ環境も提供します。

### リンク

オンラインデモ：https://agent-connect.ai/agents/test/ad.json

GitHub：https://github.com/agent-network-protocol/anp-agent-example

# 今後のデモにもご期待ください
