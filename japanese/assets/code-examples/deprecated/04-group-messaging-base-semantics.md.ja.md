# deprecated/04-group-messaging-base-semantics.md のコード例・図ラベルの日本語補足

原文: [deprecated/04-group-messaging-base-semantics.md](../../../../deprecated/04-group-messaging-base-semantics.md)。元のコードフェンス、識別子、URL、署名対象データは変更しません。下記は実行・送信するコードの代替ではなく、人が読む文章の対訳です。歴史資料は当時の説明を訳し、現行仕様へ書き換えていません。

## fence:249-265/line:2

原文:

````text
Group state-changing operations<br/>create / join / add / rebind / remove / leave / update_*
````

日本語補足（agent-reviewed）:

````text
グループ状態の変更操作<br/>create / join / add / rebind / remove / leave / update_*
````

## fence:249-265/line:5

原文:

````text
Advance group_state_version
````

日本語補足（agent-reviewed）:

````text
group_state_versionを進める
````

## fence:249-265/line:6

原文:

````text
Advance group_event_seq
````

日本語補足（agent-reviewed）:

````text
group_event_seqを進める
````

## fence:249-265/line:9

原文:

````text
Reference current group_state_version snapshot
````

日本語補足（agent-reviewed）:

````text
現在のgroup_state_versionのスナップショットを参照
````

## fence:249-265/line:15

原文:

````text
Anchored result in response / notification
````

日本語補足（agent-reviewed）:

````text
応答／通知内のアンカーとなる結果
````

## fence:960-972//text

原文:

````text
hello group
````

日本語補足（agent-reviewed）:

````text
こんにちは、グループの皆さん
````

## fence:1066-1073/line:3

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:1077-1086/line:3

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:1077-1086/line:4

原文:

````text
Target Member
````

日本語補足（agent-reviewed）:

````text
対象メンバー
````

## fence:1077-1086/line:8

原文:

````text
group.state_changed / or deployment-specific custom notification
````

日本語補足（agent-reviewed）:

````text
group.state_changed、または配備環境で独自に定義する通知
````

## fence:1090-1099/line:2

原文:

````text
Sending Member
````

日本語補足（agent-reviewed）:

````text
送信メンバー
````

## fence:1090-1099/line:3

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:1090-1099/line:4

原文:

````text
Other Members
````

日本語補足（agent-reviewed）:

````text
その他のメンバー
````

## fence:1103-1115/line:2

原文:

````text
New DID
````

日本語補足（agent-reviewed）:

````text
新しいDID
````

## fence:1103-1115/line:3

原文:

````text
Group Host
````

日本語補足（agent-reviewed）:

````text
グループのHost
````

## fence:1103-1115/line:4

原文:

````text
Handle Provider
````

日本語補足（agent-reviewed）:

````text
Handleプロバイダー
````

## fence:1103-1115/line:5

原文:

````text
Other active members
````

日本語補足（agent-reviewed）:

````text
その他のアクティブなメンバー
````

## fence:1103-1115/line:7

原文:

````text
group.rebind_member(handle, old DID, new DID, generation)
````

日本語補足（technical-retained）:

````text
group.rebind_member(handle, old DID, new DID, generation)
````

注: メソッド呼び出しの構文・引数表記を保持。old DID/new DIDは旧DID／新DIDを示す。

## fence:1103-1115/line:8

原文:

````text
fresh Handle resolution + binding verification
````

日本語補足（agent-reviewed）:

````text
新しいHandle解決＋バインディング検証
````

## fence:1103-1115/line:9

原文:

````text
active, new DID, newer generation
````

日本語補足（agent-reviewed）:

````text
active、新しいDID、より新しいgeneration
````

## fence:1103-1115/line:10

原文:

````text
membership preserved + new group_state_version
````

日本語補足（agent-reviewed）:

````text
メンバーシップを保持＋新しいgroup_state_version
````

## fence:1329-1383//params/body/group_profile/description

原文:

````text
Collaboration Group
````

日本語補足（agent-reviewed）:

````text
協働グループ
````

## fence:1598-1631//params/body/text

原文:

````text
Hello everyone
````

日本語補足（agent-reviewed）:

````text
皆さん、こんにちは
````
