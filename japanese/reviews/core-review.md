# 中核仕様の意味・用語校閲の作業記録

原文と既存の日本語訳を段落ごとに実際に読み比べた範囲だけを記録します。以前の選択的補正を、未確認段落の校閲済み判定に流用しません。コード例・識別子の機械的な一致検査は、意味の校閲と区別します。

全章見出し、段落・表・コードブロックの対象行、原文ハッシュ、照合済み／未完範囲は[機械可読記録](core-review.json)にあります。元の本文行番号を使用し、訳者注や冒頭マーカーは数えません。

| 文書 | 原文行数 | 全文照合を完了した原文行 | 状態 |
| --- | --- | --- | --- |
| [01-agentnetworkprotocol-technical-white-paper.md](../../01-agentnetworkprotocol-technical-white-paper.md) | 344 | 1–344 | machine-fully-reviewed |
| [02-anp-did-authentication-protocol-specification.md](../../02-anp-did-authentication-protocol-specification.md) | 522 | 1–522 | machine-fully-reviewed |
| [03-did-wba-method-design-specification.md](../../03-did-wba-method-design-specification.md) | 665 | 1–665 | machine-fully-reviewed |
| [04-anp-did-wba-name-space-specification.md](../../04-anp-did-wba-name-space-specification.md) | 940 | 1–940 | machine-fully-reviewed |
| [05-anp-did-authorization-protocol-specification.md](../../05-anp-did-authorization-protocol-specification.md) | 893 | 1–893 | machine-fully-reviewed |
| [06-anp-agent-communication-meta-protocol-specification.md](../../06-anp-agent-communication-meta-protocol-specification.md) | 930 | 1–930 | machine-fully-reviewed |
| [07-anp-agent-description-protocol-specification.md](../../07-anp-agent-description-protocol-specification.md) | 671 | 1–671 | machine-fully-reviewed |
| [appendix-a-did-wba-k1-compatibility-extension.md](../../appendix-a-did-wba-k1-compatibility-extension.md) | 214 | 1–214 | machine-fully-reviewed |
| [application/10-anp-agent-payment-protocol-specification.md](../../application/10-anp-agent-payment-protocol-specification.md) | 867 | 1–867 | machine-fully-reviewed |
| [message/01-core-binding.md](../../message/01-core-binding.md) | 1326 | 1–1326 | machine-fully-reviewed |
| [message/02-identity-and-discovery.md](../../message/02-identity-and-discovery.md) | 945 | 1–945 | machine-fully-reviewed |
| [message/03-direct-messaging-base-semantics.md](../../message/03-direct-messaging-base-semantics.md) | 816 | 1–816 | machine-fully-reviewed |
| [message/04-group-messaging-base-semantics.md](../../message/04-group-messaging-base-semantics.md) | 1610 | 1–1610 | machine-fully-reviewed |
| [message/05-direct-end-to-end-encryption.md](../../message/05-direct-end-to-end-encryption.md) | 1804 | 未実施 | pending |
| [message/06-group-end-to-end-encryption.md](../../message/06-group-end-to-end-encryption.md) | 2479 | 未実施 | pending |
| [message/07-attachments-and-object-transfer.md](../../message/07-attachments-and-object-transfer.md) | 1639 | 1–1639 | machine-fully-reviewed |
| [message/08-federation-and-cross-domain.md](../../message/08-federation-and-cross-domain.md) | 671 | 未実施 | pending |
| [message/09-message-mentions.md](../../message/09-message-mentions.md) | 850 | 未実施 | pending |
| [vnext/01-agentnetworkprotocol-technical-white-paper.md](../../vnext/01-agentnetworkprotocol-technical-white-paper.md) | 763 | 1–763 | machine-fully-reviewed |
| [vnext/p4-group-messaging-base-semantics.md](../../vnext/p4-group-messaging-base-semantics.md) | 1638 | 1–1638 | machine-fully-reviewed |

machine-partially-reviewedは上記範囲だけを確認済みです。machine-fully-reviewedは全範囲の原文・訳文照合が完了した文書に限ります。pending範囲は未完であり、意味の逆転、用語の誤り、不自然な文が残る可能性があります。原文のコード例は訳出せず保持します。

<!-- checkpoint-notes -->

本担当の英語16文書は、全原文の文章・表を日本語訳と照合し、意味・用語の校閲を完了しました。今回完了したのはP3（816行）、P7（1639行）、application/10（867行）、vnext白書（763行）、vnext P4（1638行）の5件です。原文・引用内を含むコード例・インライン識別子・規範キーワード・行数の保全検査に合格しています。全体の適合性や上流仕様の正しさまで証明するものではありません。

vnext P4では現行P4と完全一致する原文段落の校閲済み訳を候補として参照し、原文・既存訳・候補訳を段落ごとに再読した後に適用しました。vnext固有の§7.1と§11.7は原文から手動で照合し直しています。P4の業務上のメンバーシップ、P6デバイスのMLS準備状態、暗号化失敗時の平文フォールバック禁止の区別を保ちました。

上流問題は訳文で推測補完しません。既存記録の問題に加え、P7の旧Signed Payload参照、ANP-10の有効期間180日／15分という不整合をJSONへ記録しました。P5・P6・P8・P9は別担当の所有であり、この記録から完了を推定しません。

次の担当はChinese deprecatedのP1・P4です。まだ意味校閲に着手しておらず、全範囲をpendingとしてcore-deprecated-review.jsonに棚卸ししました。再開地点は chinese/deprecated/01-核心绑定.md の原文1行です。API呼び出し、コミット、pushは行っていません。

## 別担当の指摘を受けた追加校閲

vNext英語白書は、別担当が中国語版の照合中に発見した27箇所を英語原文と再照合し、意味の崩れと不自然な日本語を修正しました。代理店／エージェント、公開情報、高頻度、独立性、相手についての情報取得、暗黙の情報欠落などが対象です。中国語案をそのまま移植せず、英語にない補足や要件強化を避けています。ANP-10も原文830–851行の利用例を再読し、Merchant Agentを代理店とした誤訳を含む10行を補正しました。追加パスの正確な行番号と変更履歴はJSON台帳のadditional_semantic_reviewsとcorrectionsに記録しています。この追加作業を全段落の独立した再レビューとは表示しません。
