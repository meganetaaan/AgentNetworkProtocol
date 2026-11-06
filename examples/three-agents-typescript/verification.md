# 検証記録

検証日：2026-11-06。Windows PowerShell、Node.js v24.19.0、npm 11.17.0。

| コマンド | 結果 |
| --- | --- |
| `npm.cmd install --ignore-scripts --no-audit --no-fund` | 成功。32パッケージを導入。`package-lock.json`生成 |
| `npm.cmd run typecheck` | 成功。TypeScriptエラーなし |
| `npm.cmd test` | 成功。7テスト、7成功、0失敗 |
| `npm.cmd run demo` | 成功。3人格で9発言、全3体が各9メッセージを同じ順序で受信 |

最終ネットワークテストの内容：

```text
PASS serviceDid is covered by valid E1 self-proofs and anchors group.create target
PASS three personalities exchange nine actual HTTPS/P4 messages in the same order
PASS signature rejects altered payload, another sender, and expired proof
PASS idempotent retry returns the same acceptance; conflicting operation and nonce reuse fail
PASS concurrent accepted messages get unique ordered sequences and preserve state version
PASS P1 validation rejects batches, numeric ids, v1 profile, and non-member send
PASS HTTPS certificate verification is enabled and arbitrary origins are refused
tests 7 / pass 7 / fail 0
```

デモの実際のwire記録は`artifacts/transcript.json`に生成され、今回の実行では181記録、255,185 bytesでした。内訳には9回の`group.send`、27回の`group.incoming`、DIDの実HTTPS取得、要求応答を含みます。グループ作成のイベント番号は`1`、9発言の番号は`2`〜`10`、状態バージョンは`1`です。時刻や署名鍵の更新により次の実行の記録サイズは変わり得ます。秘密鍵はこの記録に含まれません。

最初の`node --test`は実行環境の子プロセス起動制限により`spawn EPERM`になりました。テスト内容は実行されていません。その後`--test-isolation=none`を指定し、テストの実行と成功を確認しました。自動承認レビューによる拒否ではありません。

レビューでHostの`ANPMessageService.serviceDid`が未指定だった点を修正しました。主体DIDをサービスに明示し、変更後のDocumentを公式SDKで再署名します。追加テストは全4エンドポイントのHTTPS解決・E1自己証明の有効性、`group.create`の対象との一致、異なるサービスDIDを対象にした要求の拒否を確認します。

モデル呼び出し：**0回**。APIキーの作成・変更：**なし**。本文はローカルの固定台詞と直前の受信内容の引用です。実モデルの品質・応答性・トークン費用の検証結果はありません。

この検証はlocalhost上の教育用サブセットを対象としています。公開ネットワーク、異なる実装との接続、P4全必須メソッド、E2EE、永続化、障害復旧、音声再生、物理的な音声の重なりは検証対象外です。外部`awiki-harness`がチェックアウトにないため、その製品受入証拠もありません。制限の詳細は[README](README.md#機能範囲と制限)を参照してください。
