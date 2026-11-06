# 画像の文字ラベル対応訳（目視照合済み）

原画像: [blogs/images/mcp-wba-did-proposal.png](../../../blogs/images/mcp-wba-did-proposal.png)

SHA-256: `c7a763e7ed0bf8cccd8339eb1abf2956b6dd1cb27383df12d59bfbba43554284`

抽出: `rapidocr-onnxruntime-1.4.4-local` / `ocr-text-unverified`

翻訳状態: `visible-labels-translated-source-clipped`

原画像を目視して、見えているラベルの文字起こしと日本語訳を照合しました。OCRの誤認識は対応JSONのtranscribed_sourceで訂正し、認識された元の文字列sourceも保持しています。図の配置・矢印・関係は原画像で確認してください。

原画像の制約: シーケンス図の末尾は原画像の下端より外にあり、見えない内容は補完しない。

原図の注記: 提案・日付・実装可能性の主張は当時の画面の記載として翻訳。原図下端のシーケンス図が途中で切れている。

![原画像](../../../blogs/images/mcp-wba-did-proposal.png)

| ID | 原文 | 日本語 | 翻訳・確認状態 |
| --- | --- | --- | --- |
| L001 | Authentication #64 （OCR認識: Authentication#64） | 認証 #64 | agent-reviewed-label-translation |
| L002 | jaredhanson on Nov 26, 2024 · 14 comments · 10 replies （OCR認識: jaredhansononNov26,2024.14comments·10replies） | jaredhanson、2024年11月26日・コメント14件・返信10件 | agent-reviewed-label-translation |
| L003 | chgaowei on Dec 5, 2024 （OCR認識: chgaowei onDec5,2024） | chgaowei、2024年12月5日 | agent-reviewed-label-translation |
| L004 | Proposal: did:wba, a Web-based Decentralized Identifier （OCR認識: Proposal:did:wba, aWeb-based Decentralized ldentifier） | 提案：did:wba、Webに基づく分散型識別子 | agent-reviewed-label-translation |
| L005 | 1. Introduction | 1. はじめに | agent-reviewed-label-translation |
| L006 | did:wba is a Web-based Decentralized Identifier (DID) specification designed to support cross-platform authentication and agent （OCR認識: did:wba is a Web-based Decentralized Identifier (DiD) specification designed to support cross-platform authentication and agent） | did:wbaは、プラットフォームをまたぐ認証とエージェント間の | agent-reviewed-label-translation |
| L007 | communication. | 通信を支えるために設計された、Webに基づく分散型識別子（DID）の仕様です。 | agent-reviewed-label-translation |
| L008 | The did:wba method leverages existing mature technologies and Web infrastructure to implement decentralized authentication without | did:wba方式は既存の成熟した技術とWeb基盤を使い、既存システムを | agent-reviewed-label-translation |
| L009 | DIDs to users, enabling interoperability between platforms. （OCR認識: DiDs to users, enabling interoperabilitybetweenplatforms.） | DIDを発行でき、プラットフォーム間の相互運用を可能にします。 | agent-reviewed-label-translation |
| L010 | Similar to email, did:wba allows platforms to maintain their centralized account systems while enabling cross-platform communication | 電子メールと同様に、did:wbaによりプラットフォームは中央管理のアカウントシステムを維持しながら、プラットフォームをまたぐ通信と | agent-reviewed-label-translation |
| L011 | and interoperability. | 相互運用を可能にできます。 | agent-reviewed-label-translation |
| L012 | 2. Cross-Platform Authentication | 2. プラットフォームをまたぐ認証 | agent-reviewed-label-translation |
| L013 | did:wba can be integrated with HTTP protocol to complete identity authentication, permission verification, and data exchange in a | did:wbaはHTTPプロトコルと組み合わせ、追加のやり取りを行わずに、ID認証、権限の検証、データ交換を | agent-reviewed-label-translation |
| L014 | single HTTP request without additional interactions. Below is the interaction flow of did:wba with HTTP protocol: | 1回のHTTPリクエストで完了できます。以下は、did:wbaとHTTPを組み合わせたやり取りの流れです。 | agent-reviewed-label-translation |
| L015 | Agent A （OCR認識: AgentA） | エージェントA | agent-reviewed-label-translation |
| L016 | Agent B （OCR認識: AgentB） | エージェントB | agent-reviewed-label-translation |
| L017 | Agent A （OCR認識: AgentA） | エージェントA | agent-reviewed-label-translation |
| L018 | Client | クライアント | agent-reviewed-label-translation |
| L019 | Server | サーバー | agent-reviewed-label-translation |
| L020 | DID Sever | DIDサーバー（原文Sever） | agent-reviewed-label-translation |
| L021 | HTTP Request: DID,Signature （OCR認識: HTTPRequest:DID,Signature） | HTTPリクエスト：DID、署名 | agent-reviewed-label-translation |
| L022 | Get DID Document | DIDドキュメントを取得 | agent-reviewed-label-translation |
| L023 | DID Document | DIDドキュメント | agent-reviewed-label-translation |
| L024 | authentication | 認証 | agent-reviewed-label-translation |
| L025 | HTTP Response: token （OCR認識: HTTPResponse:token） | HTTPレスポンス：トークン | agent-reviewed-label-translation |
| L026 | HTTP Request: token （OCR認識: HTTPRequest:token） | HTTPリクエスト：トークン | agent-reviewed-label-translation |
| L027 | requiring a complete overhaul of existing systems. Platforms can maintain their centralized account systems while issuing did:wba | 全面的に刷新せずに分散型認証を実現します。プラットフォームは中央管理のアカウントシステムを維持しながら、ユーザーへdid:wbaの | agent-reviewed-label-translation |
| L028 | HTTP Response | HTTPレスポンス | agent-reviewed-label-translation |

認識座標・confidence・SVG要素情報は[対応するJSON](c7a763e7ed0bf8cc.json)に保持しています。
