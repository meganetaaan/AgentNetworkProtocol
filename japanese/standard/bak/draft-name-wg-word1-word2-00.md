<!-- translation-review: full; source=standard/bak/draft-name-wg-word1-word2-00.md; basis=entire original read and manually compared paragraph by paragraph -->
> 日本語参考訳（原文全文を照合し、誤訳を修正済み）。規範となるのは原文です。コード例・識別子は原文を保持しています。
> 原文: [standard/bak/draft-name-wg-word1-word2-00.md](../../../standard/bak/draft-name-wg-word1-word2-00.md) / 基準コミット: `0837cfdfaf4ddcf834f0890ddaf34fc4c824e066`

---
title: IETF ID Markdown Template
abbrev: Short Title
docname: draft-name-wg-word1-word2-00
obsoletes:
updates:
date:
category: std
submissionType: IETF

ipr: trust200902
area: General
workgroup: SPRING
keyword: Internet-Draft

author:
 -
  ins: H. Huang
  name: Hongyi Huang
  organization: Huawei
  email: hongyi.huang@huawei.com
  role: editor
  street: Beiqing Road
  city: Beijing
  code: 100000
  country: China
 -
  ins: S. Zhang
  name: San Zhang
  organization: Org
  email: XXX@xxx.xxx

normative:
  RFC8986:

informative:
  I-D.ietf-spring-bfd:
  I-D.tian-spring-srv6-deployment-consideration:
  Protocol-link:
    title: Protocol
    data: 2023-01
    target: https://www.luismg.com/protocol/
  Custom-link:
    title: Link Title
    author: 
    org: Huawei
    date: 2023-01
    target: www.baidu.com
...

--- abstract

要旨の内容。


--- middle

# はじめに {#intro}

本文。

## 用語

## 要件を表す用語

{::boilerplate bcp14-tagged}

# 題名

## 小見出し

### さらに下位の見出し

#### 擬似コード

~~~
S01.   If (True) {
S02.     Do sth.
S03.   }
~~~

#### パケット形式

次のプロトコルヘッダーは{{Protocol-link}}で生成できます。

~~~
0                   1
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          NUM          |M| SZX |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
~~~
{: #ref-to-fig  title="Figure Caption"}

NUM: 
:  数値。このフィールドの意味は…

#### 表

| 列名 1 | 列名 2 | 列名 3 | 列名 4 |
|:-----:+:----+--:--+---------|
| 中央 | 左 | 右 | 既定 |
| 中央 | 左 | 右 | 既定 |
{: #ref-to-tab title="Table Caption"}

#### 参照

- 参照
  - 文書を参照する
    - 参考情報としての参照：{{?I-D.ietf-spring-bfd}}
    - 規範的な参照：{{!RFC8986}}または[RFC8986]
    - 既定の参照：{{I-D.tian-spring-srv6-deployment-consideration}}
    - 独自のリンク：{{Custom-link}}
    - 節の参照：{{Section 3 of RFC8986}}
  - この文書を参照する
    - 表：{{ref-to-tab}}
    - 図：{{ref-to-fig}}
    - 節：{{intro}}
- 項目B


# セキュリティに関する考慮事項

この文書は、新たなセキュリティ上の考慮事項を導入しません。


# IANAに関する考慮事項

この文書に伴うIANAの処理はありません。

| 値 | 名前 |
| TBD1  | A |
| TBD2  | B |
| TBD3  | C |

--- back

# 謝辞
{:numbered="false"}

著者は…に感謝します。

# 貢献者
{:numbered="false"}

この文書への貢献者。




