# 翻訳と3エージェント会話デモの作業記録

## 出発点

- 上流: <https://github.com/agent-network-protocol/AgentNetworkProtocol>
- fork: <https://github.com/meganetaaan/AgentNetworkProtocol>
- ブランチ: `docs/ja-anp-three-agents`
- 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`
- 環境: Windows、Node.js 24.19.0。リポジトリが参照する外部`awiki-harness`は見つからず、ローカル仕様・既存チェック・追加ネットワークテストを使用。

既存forkが存在しないことをGitHubで確認してからforkを作りました。原文の変更、PR作成、上流への変更、マージは行いません。依頼されたfork内の作業ブランチへの公開が対象です。

GitHub連携で既存リポジトリと接続ユーザーを確認しました。fork作成・clone・pushの機能はその連携にないため、認証済みのGitHub CLIとGitを使用しました。

## 翻訳の棚卸し

基準Git treeにある大文字`.MD`を含む全232 Markdownについて、`japanese/<元のパス>`に参考訳を作成しました。英中両方の文書、現行仕様、vNext、deprecated、ブログ、研究メモ、貢献手順、例のREADMEを含みます。英中の内容が異なる可能性があるため、片方を省略していません。完了数・各ファイルの状態・原文と訳のSHA-256は[translation-inventory.json](translation-inventory.json)を参照してください。

全文の手動翻訳と機械翻訳が混在します。機械訳ページの冒頭には未校閲と明記しました。手動翻訳はエージェントが原文を読んで作成したもので、人間の専門翻訳者による最終監修を意味しません。特にANP実装では規範原文を確認してください。[reading-guide.md](reading-guide.md)は別途作成した非規範の学習解説です。

最終内訳は、全文のエージェント翻訳52件、部分校閲した機械訳17件、未校閲の機械訳163件です。全232件の意味の全面校閲は完了していません。画像・PDF・コード内部を含むすべての文字を訳し終えたという意味でもありません。

P1とP4は重要箇所を部分校閲し、P1の70行とP4の103行を補正しました。機械訳でreceiptの目的などの意味が逆転していた箇所を修正しています。両文書の残りと他の機械訳に同様の誤りがないことは保証できません。全面校閲済みとは扱いません。対象と限界は[translation-review.md](translation-review.md)に記録しています。

機械訳の最初の一部には公開Google翻訳経路を使いました。HTTP 429を受けた時点で送信を停止し、以降はArgos配布のモデルをCTranslate2でローカル実行する方法へ切り替えました。コード・URL・規範キーワード・Markdown記法は置換トークンで保護し、復元を検査します。機械訳のキャッシュを引き継いでいるため、ページ内に両方式の訳が混在することがあります。外部翻訳に送ったのはこの公開リポジトリの文書で、APIキーや非公開データは扱っていません。

ローカル翻訳モデルは英日`translate-en_ja-1_1`と中英`translate-zh_en-1_9`です。中国語部分は中英→英日の逐次翻訳となり、意味のずれが増える可能性があります。原文を省略・要約する方式ではありませんが、訳の意味の完全性を自動検査だけで証明するものではありません。

| モデル配布アーカイブ | SHA-256 |
| --- | --- |
| en-ja.argosmodel | `16300cc4eaa85320520cabcf433b63d01be40ef6966251de72043a083408f716` |
| zh-en.argosmodel | `62e7af5a3a48b530e47b7b3e5c78c2de79073ecd815750d2bf3ab35b4a67da2d` |

モデル索引とオフライン翻訳方式の出典: [Argos公式モデル索引](https://github.com/argosopentech/argospm-index/blob/main/index.json)、[Argos公式説明](https://argos-translate.readthedocs.io/en/latest/)。モデル・仮想環境・翻訳キャッシュはGitに含めません。TypeScriptデモの実行にこれらは不要です。

再生成用の補助ツールは`requirements-ja.txt`の2依存を専用のUV環境へ入れ、前記2アーカイブをリポジトリの隣の`ja-models/`へ保存して使います。配布URLは公式索引にある`https://argos-net.com/v1/translate-en_ja-1_1.argosmodel`と`https://argos-net.com/v1/translate-zh_en-1_9.argosmodel`です。ヘルパーは固定SHA-256を検査します。

```powershell
uv venv --python 3.12 ..\ja-translate-venv
uv pip install --python ..\ja-translate-venv\Scripts\python.exe -r scripts/requirements-ja.txt
# After downloading the two model archives into ../ja-models:
uv run --no-project --python ..\ja-translate-venv\Scripts\python.exe python scripts/local-ja-translation.py
# In another terminal:
$env:JA_TRANSLATION_LOCAL_URL = 'http://127.0.0.1:18761'
node scripts/translate-ja.mjs
node scripts/repair-ja-links.mjs --write
node scripts/restore-ja-case-ids.mjs
node scripts/normalize-ja-metadata.mjs
node scripts/check-ja-translations.mjs
node scripts/check-ja-links.mjs
```

生成器は既存ファイルを上書きしません。`--repair-machine`を指定すると機械訳だけを再生成し、手動訳と部分校閲マーカーのあるファイルは保持します。現在の生成器には外部翻訳への自動フォールバックはありません。新規生成後も意味の校閲が必要です。

画像、PDF、図中の文字、コードフェンス内の説明やMermaidラベル、JSON/YAML、ソースコード、ライセンス原文は保持対象です。これらまで日本語へ書き換えた版ではありません。保持ファイルも棚卸しJSONに列挙します。

## 保持・リンクの検証

```sh
node scripts/check-ja-translations.mjs
node scripts/check-ja-historical-example.mjs
node scripts/check-ja-links.mjs
node scripts/restore-ja-case-ids.mjs --check
node --test --test-isolation=none tests/check-ja-links.test.mjs tests/repair-ja-links.test.mjs tests/restore-ja-case-ids.test.mjs
```

原文ファイルのGit差分、コードフェンスの内容、インラインコードの欠落、規範キーワードの個数、未復元トークンを調べます。検査は翻訳の語義・論理・規範強度がすべて正しいという証明ではありません。

さらにANP文書番号とAUTHZ識別子の存在を検査します。ANP-05検証ガイドの表は、英語68件・中国語68件の計136セルを原文の安定したAUTHZ識別子に戻しました。原文と訳の行数・表の対応を確かめ、第1セル以外の訳文を変えない修復です。意味の校閲とは別の検査として扱います。

例外は旧中国語メッセージ仕様1件の壊れたコードフェンスの補正です。原文にある6 JSON例・2 Python例そのものは別検査で全文を比較し、各ハッシュを記録します。例を現代化したり、元のコードの誤りを直したりはしていません。

相対リンクは原文の画像・データへの経路と日本語Markdownへの経路を分けます。見出しfragmentは原文へ案内します。元から切れていたリンク、未生成の訳へのリンク、訳で新たに壊れたリンクを[link-report.json](link-report.json)で分離します。fragmentの存在や外部サイトの到達性を全件保証する検査ではありません。機械訳のURL修復は原文とリンク構造が一致する文書だけを対象にします。

## 会話デモ

[実装とREADME](../examples/three-agents-typescript/README.md)、[実行検証](../examples/three-agents-typescript/verification.md)、[会話サンプル](../examples/three-agents-typescript/sample-conversation.json)を参照してください。

公式TypeScript SDK`@awiki/anp-typescript-sdk@0.9.5`のDID・署名機能を使います。SDKの高水準IMは現行P4 v2と一致しないため、v1へ変換せず、限定的なGroup Hostと3クライアントを実装しました。DID解決、HTTPS、JSON-RPC、`group.create`、`group.send`、`group.incoming`、Origin Proofの暗号検証は実際に実行します。会話本文は固定台詞と受信内容の引用による模擬動作で、実モデル生成ではありません。

独立レビューでHostサービスの`serviceDid`公開不足を見つけ、DID自己証明を再生成して修正しました。修正後、型チェックと7件のテストが成功し、9発言・27通知・各体9件同順受信を確認しています。完全なP4適合、外部実装との相互運用、音声の排他制御は検証対象外です。未対応機能はデモREADMEに列挙しています。

会話生成に使う実モデル用APIキーは環境に見つかりませんでした。新規作成の確認が未回答のため、キー作成・利用・会話生成モデルに依存するコードの追加は行っていません。会話生成の外部モデルAPI呼び出しは0回です。文書翻訳では前述のローカル翻訳モデルを実行しています。依存パッケージ取得はnpm、オフライン翻訳モデルの取得は公式配布元への接続を必要としました。

作業環境の`openai-platform-api-key`スキルは、キー新規作成または再利用の選択について「Stop until the user answers.」を要求します。このため会話生成APIに依存する部分を保留しました。ANPネットワーク処理と固定人格による模擬会話は、APIキーなしで実行・検証済みです。

## 上流の既存検証

- `node scripts/check-release-docs.mjs`: PASS。59文書・992ローカルリンク・317 JSON例などを検査。
- `node scripts/check-anp02-vectors.mjs`: PASS。10 identities、32 positive / 80 negative byte vectors、215設計シナリオの構造。SDK/製品シナリオの実行とは区別。
- 既存の`release-doc-entrypoints`、`did-oauth-draft`、`update_contributors`の計131テスト: 93成功・38失敗。失敗は主にANP-05 VC記述とテスト期待の不一致で、原文ファイルを変更していない基準の状態で再現しました。この作業で上流仕様やテストの期待を改変して通してはいません。

Windows sandboxの子プロセス起動制限で最初のNodeテストが`spawn EPERM`となったため、通常環境または`--test-isolation=none`で実行しました。自動承認審査による拒否ではありません。デモの最終実行はsandbox内でも成功しています。
