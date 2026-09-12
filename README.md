# JUN Site

静的サイトです。HTML・CSS・JavaScript・画像だけに変換されるため、サーバーもデータベースも必要ありません。

A static site: it compiles down to plain HTML, CSS, JavaScript and images.

**日本語** ｜ [English](#english)

---

# 日本語

## クイックリファレンス

| やりたいこと | 手順 |
|---|---|
| 編集しながらサイトを確認する | `npm run dev` → http://localhost:5173 を開く |
| 文章・リンク・アルバムを変更する | `src/data/site.js` を編集して保存。ブラウザが自動で更新されます |
| ライブ情報を追加・変更する | `/editor` を開いて編集し、`schedule.json` をダウンロード |
| 公開用にビルドする | `npm run build` → `dist` フォルダが作られます |
| 公開前に仕上がりを確認する | `npm run preview` → http://localhost:4173 |
| 公開する | `dist` フォルダを Cloudflare Pages にドラッグ＆ドロップ |

---

## 1. 新しいパソコンでの初期設定

インストールが必要なものは **Node.js** ひとつだけです。React などはすべて
1.3 で自動的に入ります。

### 1.1 Node.js をインストールする

**https://nodejs.org** を開き、**LTS**（長期サポート版）と書かれたほうを
ダウンロードしてください。「Current」は避けます。LTS が安定版です。

- **Windows** — `.msi` インストーラーを実行し、そのまま「次へ」で進めます。
  終わったらターミナルをいったん**すべて閉じて開き直して**ください。開いたままだと
  Node がインストールされたことを認識できません。
- **macOS** — `.pkg` インストーラーを同様に実行します。

うまくいったか確認します。ターミナル（Windows は **PowerShell**、macOS は
**ターミナル**）を開いて次を実行してください。

```bash
node -v
npm -v
```

`v22.14.0`、`10.9.2` のようにバージョン番号が2つ表示されれば成功です。
「command not found」「認識されていません」と出る場合は、インストールが
完了していないか、ターミナルを開き直していません。

> **React を個別にインストールする必要はありません。** React、Vite、Tailwind
> などは `package.json` に書かれていて、次の手順でまとめて入ります。
> JavaScript のプロジェクトでは普通のことです。プロジェクト側が必要なものを
> 宣言し、npm がそれを取ってくる、という仕組みです。

### 1.2 プロジェクトを入手する

リポジトリから取得します。どちらの方法でも構いません。

- **クローンする** — Git が入っている場合：

  ```bash
  git clone <リポジトリのURL>
  ```

- **ZIP でダウンロードする** — リポジトリのページで緑色の **Code** ボタン →
  **Download ZIP**。適当な場所に展開します。Git は不要です。

どちらでもプロジェクトフォルダが手に入ります。ほかにコピーするものはありません。
`node_modules` と `dist` はリポジトリに含まれていません。次の2つの手順で
ローカルに生成されるためです。

### 1.3 依存パッケージをインストールする

**プロジェクトフォルダの中で**ターミナルを開き、次を実行します。

```bash
npm install
```

`package.json` を読み取り、必要なものを `node_modules` フォルダにダウンロード
します。初回は1〜2分かかります。1台のパソコンにつき1回だけで大丈夫です
（`package.json` が変わったときはもう一度実行します）。

目的のフォルダでターミナルを開く方法：
- **Windows** — エクスプローラーでフォルダを開き、アドレスバーをクリックして
  `powershell` と入力し Enter。
- **macOS** — フォルダを右クリック → サービス → フォルダに新規ターミナル。

### 1.4 起動する

```bash
npm run dev
```

**http://localhost:5173** を開きます。ファイルを編集して保存すると、ブラウザが
自動で更新されます。止めるときはターミナルで `Ctrl+C` を押します。

---

## 2. サイトの仕組み

### 2.1 使用技術

- **React** — ページを「コンポーネント」という再利用できる部品から組み立てます。
- **Vite** — ビルドツール。開発サーバーを動かし、公開用に `dist` フォルダへ
  まとめます。
- **Tailwind CSS** — 別のスタイルシートを書く代わりに、`text-lg`、`mt-4` のような
  短いクラス名をHTMLに直接書いてデザインします。
- **React Router** — `/live` や `/about` をページ再読み込みなしで切り替えます。
- **Lucide** — アイコンセット。

### 2.2 フォルダ構成

```
public/            サイトのルートにそのままコピーされるファイル
  hero.jpg           トップページのメイン写真
  nonfiction.jpg     ツアーポスター
  discography/       アルバムジャケット12点
  schedule.json      ← ライブ情報（第4章を参照）
  robots.txt         検索エンジンに /editor を無視するよう伝える
  _headers           Cloudflare / Netlify 用のキャッシュ設定
  staticwebapp.config.json   同じ内容の Azure ホスティング用設定

src/
  data/
    site.js        ← サイトの文章とリンクのすべて（第3章を参照）
    schedule.js      schedule.json を読み込み整える処理
  hooks/
    useSchedule.js   訪問者がページを開いたときに schedule.json を取得
  components/
    Navbar.jsx       上部メニュー
    Footer.jsx       下部メニュー
    Section.jsx      共通の見出し・セクション
    LiveList.jsx     ライブ1件分の表示
    SocialIcons.jsx  X / YouTube / Instagram のロゴ
  pages/
    Home.jsx         トップページ（各セクションもこのファイル内）
    Live.jsx         /live
    Discography.jsx  /discography
    Nonfiction.jsx   /nonfiction — ツアー特設ページ
    About.jsx        /about
    Contact.jsx      /contact
    Editor.jsx       /editor — ライブ情報エディター
    Placeholder.jsx  404ページ
  App.jsx          ページとアドレスの一覧
  index.css        色・フォント・共通の文字スタイル

scripts/
  build-routes.mjs   ビルドのたびに実行されます（2.4 を参照）
  deploy-blob.mjs    Azure 用の補助スクリプト。Cloudflare では使いません
```

### 2.3 コンテンツは2種類あります

| | 置き場所 | 変更方法 |
|---|---|---|
| **埋め込み** — 文章・リンク・アルバム・ツアー情報 | `src/data/site.js` | 編集 → **ビルド** → 再公開 |
| **随時読み込み** — ライブ情報 | `public/schedule.json` | ファイルを差し替えるだけ。**ビルド不要** |

ライブ情報は頻繁に変わるため、あえてコンパイル済みのコードの外に置いています。
サイトは訪問者がページを開くたびに `schedule.json` を新しく読み込みます。
このファイルひとつを差し替えれば、サイトの表示が変わります。

`schedule.json` が見つからない、または壊れている場合、サイトはビルド時に保存した
控えのデータへ静かに切り替えて表示を続けます。**編集ミスでライブ情報が古いまま
になることはあっても、サイトが真っ白になることはありません。**

### 2.4 同じ `index.html` がいくつもある理由

ビルドすると `dist` の中に `index.html`、`live/index.html`、`about/index.html`
… と同じファイルができます。これは979バイトの同一ファイルのコピーです。

一般的なレンタルサーバーは「シングルページアプリ」を理解しません。`/live` を
求められると、そのパスのファイルを探し、無ければ**404**を返します。表示自体は
問題なくできるのにです。各アドレスに実ファイルを置いておくことで、すべての
ページが正しく **200 OK** を返すようになります。Google の評価に影響します。

`scripts/build-routes.mjs` がビルドのたびに自動生成します。ページを増やした
ときは、このファイル冒頭の `ROUTES` に追加してください。

### 2.5 色とフォント

`src/index.css` の冒頭にまとめて定義しています。

- `paper` `#EBEAE9` と `ink` `#232323` — 温かみのあるオフホワイトと、ほぼ黒
- `accent` `#0E5F6E` — 日付やリンクに使う青緑
- `nf-*` — 黒・金・オフホワイト。*nonfiction* ツアーポスターから抽出した色で、
  ツアーページとトップページの該当セクションにのみ使用
- フォント — 欧文の見出しに **Jost**、日本語に **Noto Sans JP**、*nonfiction* の
  筆記体ロゴに **Italianno**。すべて Google Fonts

---

## 3. サイト内容の変更 — `src/data/site.js`

`src/data/site.js` を開いてください。サイトの文章はほぼこの1ファイルに
まとまっています。先に `npm run dev` を実行しておくと、保存するたびに変更が
画面に反映されて確認しやすくなります。

覚えておくと困らない2つのルール：

1. 文章は**引用符の内側**に書きます。`title: "新しいタイトル"` のように、
   引用符・コロン・行末のカンマはそのまま残してください。
2. 編集後にサイトが真っ白になったら、引用符・カンマ・括弧のどれかを消して
   しまっています。`Ctrl+Z` で元に戻るまで取り消してください。

### メニュー — `NAV`

```js
{ label: "Live Schedule", labelJa: "ライブ情報", to: "/live" },   // サイト内ページ
{ label: "Web Shop", labelJa: "ウェブショップ", href: SHOP_URL }, // 外部リンク
```

`to:` はサイト内のページ、`href:` は新しいタブで開く外部リンクです。ここに
書いた順序が、上部メニューとフッターの表示順になります。

### ファイル冒頭のリンク

```js
export const SHOP_URL = "https://junsapporo.thebase.in/";
export const NEWS_URL = "https://lit.link/en/teamJUNfficial2014";
export const CONTACT_EMAIL = "jun.sapporo.official@gmail.com";
```

`SHOP_URL` を変更すると、サイト中のショップリンクがすべて一度に変わります。

### プロフィール — `PROFILE`

`/about` とフッターで使われます。`bio` は段落のリストです。引用符で囲んだ行を
カンマ付きで追加すれば段落が増えます。

### ツアー — `NONFICTION`

トップページの黒×金のセクションと `/nonfiction` ページの両方を動かしています。
日付・時間・会場・アクセスリンク・チケットリンク・料金一覧が含まれます。
チケットに `soldOut: true` を付けると、取り消し線と「完売」の表示になります。

別のツアーに切り替えるときは、この値を書き換え、`public/nonfiction.jpg` を
新しいポスターに差し替えてください。

### ROOMLIVE — `ROOMLIVE`

`episodes` には YouTube の動画IDを入れます。IDは YouTube の URL の `v=` の
後ろの部分です。

```
https://www.youtube.com/watch?v=dquZxqBnv6w
                                 ^^^^^^^^^^^ ここ
```

サムネイルは YouTube から自動で取得されるため、画像を用意する必要はありません。
回を追加するときは既存のブロックをコピーして、`no`、`title`、動画IDを
書き換えてください。

### アルバム — `RELEASES`

```js
{ slug: "acoustic-12", title: "Acoustic vol.12", url: "https://junsapporo.thebase.in/items/147079273" },
```

`slug` はジャケット画像のファイル名と一致させる必要があります。`slug` が
`acoustic-12` なら `public/discography/acoustic-12.jpg` を探します。
追加するときは、ジャケットをそのフォルダに置き、同じ `slug` で1行足します。
新しい順に並べてください。トップページには上から3件が表示されます。

### 画像

| 画像 | ファイル | 備考 |
|---|---|---|
| トップの写真 | `public/hero.jpg` | 同じファイル名で差し替え |
| ツアーポスター | `public/nonfiction.jpg` | 同じファイル名で差し替え |
| アルバムジャケット | `public/discography/<slug>.jpg` | 正方形、800×800 程度 |

表示を軽く保つため、写真は1枚あたり500KB程度までに抑えてください。画像編集
ソフトの「Web用に保存」「Web用に書き出し」で十分です。

---

## 4. ライブ情報とエディター

ライブ情報は、コードに触れずに更新できるよう設計された唯一の部分です。
毎週のように変わるためです。

### 4.1 エディターの仕組み — 最初にお読みください

エディターは**ファイルを作るためのフォーム**です。Word のようなものだと考えて
ください。書類を開いて、編集して、自分のパソコンに保存する。それだけです。

**エディター自体がウェブサイトを更新することはありません。** 裏側にサーバーは
ありません。作られたファイルをアップロードする作業は、別途ご自身で行います。

```
1. /editor を開く          現在のライブ情報を読み込みます
2. フォームで編集           お使いのブラウザの中だけで起きています
3. 「ダウンロード」を押す    schedule.json がパソコンに保存されます
4. そのファイルをアップロード  ← ここはご自身で。これでサイトに反映されます
```

### 4.2 使い方

1. `/editor` を開きます。公開中のサイト、または `npm run dev` の実行中なら
   http://localhost:5173/editor です。
2. 公演をクリックすると開きます。項目を編集してください。右側のパネルに、
   実際のサイトでの見え方がそのまま表示されます。
3. **公演を追加** で公演を追加、**終了した◯件を削除** で過去の公演を一括削除
   できます。
4. **ダウンロード** を押します。`schedule.json` がダウンロードフォルダに
   保存されます。（**コピー** を押すと同じ内容がクリップボードに入ります。
   サーバー上でファイルを直接編集できるレンタルサーバーの場合はこちらが便利です。）
5. 公開します — 4.4 を参照。

各項目について：

- **公演日** は実際の日付です。2日間の公演では**最終日**を入れてください。
  開催中に「終了」と表示されてしまうのを防げます。
- **表示する日付** は画面上の表示を上書きします。空欄なら公演日から自動生成
  されます（`9/13`）。`9/4・5` のような表記にしたいときに使います。
- **詳細** は1行につき `ラベル：内容` をひとつ書きます。
- **特集として大きく表示** をオンにすると、その公演が黒×金の大きな表示になります。
- 日付が過ぎた公演は自動的に薄くなり「終了」が付きます。手作業で消す必要は
  ありません。

### 4.3 ファイル形式

手で編集する必要はまずありませんが、必須項目は `iso` と `title` だけです。

```json
{
  "updated": "2026-09-09",
  "shows": [
    {
      "iso": "2026-09-19",
      "area": "東京",
      "title": "駿河台浴衣祭五夜",
      "times": ["Open 17:30 ／ Start 18:00"],
      "details": [
        { "label": "料金", "value": "¥3,500 +1D" },
        { "label": "会場", "value": "お茶の水パルトネール" }
      ]
    }
  ]
}
```

### 4.4 更新したライブ情報を公開する

**ライブ情報は表示のたびに読み込まれるため、ビルドは不要です。**

1. ダウンロードした `schedule.json` を用意します。
2. `dist` フォルダの中の同名ファイルに上書きします。
3. `public/schedule.json` にも同じものを上書きしておきます。控えのデータが
   古くならないようにするためです（必須ではありませんが、やっておいてください）。
4. `dist` を再アップロードします — 第6章を参照。

`npm run build` も、コードの変更も必要ありません。

ファイルを1つだけ差し替えられるレンタルサーバー（日本のレンタルサーバーは
ほとんど対応しています）なら、さらに簡単です。サーバー上の `schedule.json` を
上書きするだけで終わります。Cloudflare Pages のドラッグ＆ドロップでは
これができず、毎回フォルダごとの差し替えになります。

---

## 5. ビルド

```bash
npm run build
```

`dist` フォルダが作られます。このフォルダがそのままウェブサイトです（約2.3MB）。
内部では2つの処理が走ります。Vite が全体をコンパイルし、続いて
`build-routes.mjs` がページごとの `index.html` を書き出します。

公開前に確認します。

```bash
npm run preview
```

ビルド済みの実物が http://localhost:4173 で表示されます。公開前に間違いを
見つける最後の機会です。

---

## 6. Cloudflare Pages への公開

無料で、HTTPS も自動で付き、2分ほどで終わります。

> **Workers ではなく Pages です。** Cloudflare にはよく似た製品が2つあります。
> ドラッグ＆ドロップができるのは **Pages** だけで、Workers の静的アセットは
> Wrangler というコマンドラインツールが必要です。Pages を選んでください。

### 初回

1. **https://dash.cloudflare.com** で無料アカウントを作ります。
2. サイドバーから **Workers & Pages** を選びます。
3. **Create application** → **Pages** タブ → **Upload assets**。
4. プロジェクト名を入力します。これがアドレスになります（例：`jun006` →
   `jun006.pages.dev`）。
5. **`dist` フォルダごと**アップロード欄にドラッグします。中のファイルではなく
   フォルダ自体を、ZIPにはせずにドラッグしてください。
6. **Deploy site** を押します。

1分ほどで `https://<プロジェクト名>.pages.dev` で公開されます。HTTPS は最初から
有効で、更新も自動です。

このサイトは Cloudflare の制限内に十分収まっています。**ファイル数29**（上限1,000）、
**最大ファイル0.5MB**（上限25MiB）。

### 更新するとき

1. `npm run build`（`schedule.json` だけ変えた場合は不要）
2. Cloudflare のダッシュボード → **Workers & Pages** → 対象プロジェクト
3. **Create a new deployment**
4. もう一度 `dist` をドラッグ → **Deploy**

過去のデプロイはすべて保存されます。問題が起きたらダッシュボードから
以前のものに戻せます。

### 独自ドメイン

プロジェクト → **Custom domains** → **Set up a domain**。HTTPS の証明書は
Cloudflare が無料で発行し、自動更新します。ドメインを Cloudflare 以外で
管理している場合は、追加すべきDNSレコードが表示されます。

### `_headers` について

`public/_headers` は「`schedule.json` をキャッシュしないように」と Cloudflare に
伝えるファイルです。これが無いと、差し替えたライブ情報が数時間反映されない
ことがあります。削除しないでください。

---

## 7. トラブルシューティング

**`site.js` を編集したらサイトが真っ白になった**
引用符・カンマ・括弧のいずれかが欠けています。元に戻るまで取り消してください。
`npm run dev` を実行しているターミナルに、たいてい行番号が表示されます。

**`npm` は認識されていません と出る**
Node.js が入っていないか、インストール前から開いていたターミナルを使っています。
すべてのターミナルを閉じ、新しく開いて `node -v` を試してください。

**`npm run dev` がポート使用中と言う**
すでに別のものが動いています。閉じるか、表示されたポート番号のほうを開いてください。

**アップロードしたのにライブ情報が変わらない**
スーパーリロードしてください（`Ctrl+Shift+R`、Mac は `Cmd+Shift+R`）。それでも
変わらない場合は、公開中のサイトの `schedule.json` を直接開いて
（`https://サイトのURL/schedule.json`）、新しいファイルになっているか確認します。

**古い公演が表示され、ブラウザのコンソールに控えのデータの話が出ている**
アップロードした `schedule.json` が壊れていて、控えに切り替わっています。
手で直さず、`/editor` から作り直してください。

**公開後、あるページが404になる**
ページごとの `index.html` がありません。`npm run build` をせずに公開したか、
別のフォルダをアップロードしています。`public` やプロジェクトの
ルートではなく、`dist` を公開してください。

**画像が表示されない**
ファイル名の不一致です。大文字小文字も区別されます。多くのサーバーでは
`Acoustic-12.jpg` と `acoustic-12.jpg` は別のファイルです。ジャケットは
`site.js` の `slug` と完全に一致させてください。

---

## 8. 次の担当者へのメモ

- **`node_modules` と `dist` は生成物です。** 編集しないでください。パソコン間で
  コピーもしないでください。`npm install` と `npm run build` で作り直せます。
- **このサイトにバックエンドはありません。** 乗っ取られるものも、期限切れになる
  ものも、更新が必要なものもありません。その代わり、公開は必ず手動アップロードです。
- **`/editor` にパスワードはありません。** 必要ないからです。エディターは自分の
  パソコンにファイルを作ることしかできず、公開中のサイトを書き換えられません。
  サイトを守っているのは、ホスティングのログイン情報です。
- **フォントと YouTube のサムネイルは Google と YouTube から読み込まれます。**
  それ以外はすべてサイト自身から配信されます。
- 日本のレンタルサーバー（エックスサーバー、さくら、ロリポップなど）に移す場合は、
  `dist` の中身を公開フォルダにアップロードしてください。これらのサーバーの
  ファイルマネージャーは `schedule.json` だけを差し替えられるため、第4章の
  作業が Cloudflare より格段に楽になります。

---
---

# English

A static site: it compiles down to plain HTML, CSS, JavaScript and images.

## Quick reference

| I want to… | Do this |
|---|---|
| Preview the site while editing | `npm run dev` → open http://localhost:5173 |
| Change text, links, albums | Edit `src/data/site.js`, save, the browser updates itself |
| Add or change a live show | Open `/editor`, edit, download `schedule.json` |
| Build the site for publishing | `npm run build` → creates the `dist` folder |
| Check the built site before publishing | `npm run preview` → http://localhost:4173 |
| Publish | Drag the `dist` folder into Cloudflare Pages |

---

## 1. Setting up a brand new computer

You only need one thing installed: **Node.js**. React and everything else
comes down automatically in step 3.

### 1.1 Install Node.js

Go to **https://nodejs.org** and download the version marked **LTS**
(Long Term Support). Avoid "Current" — LTS is the stable one.

- **Windows** — run the `.msi` installer, click Next through it, accept the
  defaults. Then **close and reopen** any terminal windows, otherwise they
  won't know Node exists yet.
- **macOS** — run the `.pkg` installer the same way.

Check it worked. Open a terminal (Windows: **PowerShell**; macOS:
**Terminal**) and run:

```bash
node -v
npm -v
```

You should see two version numbers, something like `v22.14.0` and `10.9.2`.
If you instead see "command not found" or "not recognised", the installer
didn't finish or you didn't reopen the terminal.

> **You do not install React separately.** React, Vite, Tailwind and the rest
> are listed in `package.json` and are installed by the next step. That is
> normal for a JavaScript project — the project describes what it needs, and
> npm fetches it.

### 1.2 Get the project onto the computer

Get it from the repository, either way works:

- **Clone it** — if you have Git installed:

  ```bash
  git clone <repository-url>
  ```

- **Download the ZIP** — on the repository page, click the green **Code**
  button → **Download ZIP**, then unzip it somewhere sensible. No Git needed.

Either way you end up with the project folder. Nothing else needs copying:
`node_modules` and `dist` are not in the repository because they are generated
locally by the next two steps.

### 1.3 Install the dependencies

Open a terminal **inside the project folder** and run:

```bash
npm install
```

This reads `package.json`, downloads everything into a new `node_modules`
folder, and takes a minute or two the first time. You only do this once per
computer (and again whenever `package.json` changes).

Opening a terminal in the right folder:
- **Windows** — open the folder in File Explorer, click the address bar,
  type `powershell` and press Enter.
- **macOS** — right-click the folder → Services → New Terminal at Folder.

### 1.4 Run it

```bash
npm run dev
```

Open **http://localhost:5173**. Edit any file, save, and the browser updates
by itself. Press `Ctrl+C` in the terminal to stop.

---

## 2. How the site works

### 2.1 The stack

- **React** — builds the pages out of reusable pieces called components.
- **Vite** — the build tool. Runs the dev server, and compiles everything
  into the `dist` folder for publishing.
- **Tailwind CSS** — styling written as short class names directly in the
  markup (`text-lg`, `mt-4`) instead of a separate stylesheet.
- **React Router** — makes `/live`, `/about` etc. work without a page reload.
- **Lucide** — the icon set.

### 2.2 Folder map

```
public/            Files copied to the site root, untouched
  hero.jpg           home page banner photo
  nonfiction.jpg     tour poster
  discography/       the 12 album covers
  schedule.json      ← THE LIVE SCHEDULE (see section 4)
  robots.txt         asks search engines to skip /editor
  _headers           cache rules for Cloudflare / Netlify
  staticwebapp.config.json   the same rules, for Azure hosting

src/
  data/
    site.js        ← ALL SITE TEXT AND LINKS (see section 3)
    schedule.js      helpers that read and tidy schedule.json
  hooks/
    useSchedule.js   fetches schedule.json when a visitor loads the page
  components/
    Navbar.jsx       top menu
    Footer.jsx       bottom menu
    Section.jsx      shared section + page headings
    LiveList.jsx     draws one live show entry
    SocialIcons.jsx  X / YouTube / Instagram logos
  pages/
    Home.jsx         home page (all its sections live in this one file)
    Live.jsx         /live
    Discography.jsx  /discography
    Nonfiction.jsx   /nonfiction — the tour page
    About.jsx        /about
    Contact.jsx      /contact
    Editor.jsx       /editor — the schedule editing tool
    Placeholder.jsx  the 404 page
  App.jsx          the list of pages and their addresses
  index.css        colours, fonts, shared text styles

scripts/
  build-routes.mjs   runs after each build (see 2.4)
  deploy-blob.mjs    optional Azure deploy helper, unused on Cloudflare
```

### 2.3 Two kinds of content
| | Where it lives | To change it |
|---|---|---|
| **Baked in** — text, links, albums, tour details | `src/data/site.js` | Edit, **rebuild**, republish |
| **Live** — the live schedule | `public/schedule.json` | Replace the file. **No rebuild.** |

The live schedule changes constantly, so it is deliberately kept outside the compiled code:
the site downloads `schedule.json` fresh every time someone opens the page. Swap that one file and the site updates.

If `schedule.json` is missing or broken, the site quietly falls back to a copy
saved inside the build and carries on. **A bad edit can make the schedule out
of date; it cannot take the site down.**

### 2.4 Why there are lots of identical `index.html` files

After building, `dist` contains `index.html`, `live/index.html`,
`about/index.html` and so on. They are byte-for-byte identical copies of one
979-byte file.

Simple web hosts have no concept of a single-page app. Asked for `/live`, they
look for a file at exactly that path, and finding none they return **404** —
even though the page would have displayed fine. Putting a real file at each
address means every page answers **200 OK**, which matters for Google.

`scripts/build-routes.mjs` creates them automatically after each build. If you
ever add a page, add its address to the `ROUTES` list at the top of that file.

### 2.5 Colours and fonts

Defined once at the top of `src/index.css`:

- `paper` `#EBEAE9` and `ink` `#232323` — the warm off-white and near-black
- `accent` `#0E5F6E` — the teal used for dates and links
- `nf-*` — black, gold and off-white sampled from the *nonfiction* tour poster,
  used only on the tour page and its home page section
- Fonts: **Jost** for Latin display text, **Noto Sans JP** for Japanese,
  **Italianno** for the *nonfiction* script logo — all from Google Fonts

---

## 3. Changing site content — `src/data/site.js`

Open `src/data/site.js`. Nearly all site text lives in this one file. Run
`npm run dev` first so you can watch changes appear as you save.

Two rules that will save you pain:

1. Text goes **inside the quote marks**. `title: "新しいタイトル"` — keep the
   quotes, the colon, and the comma at the end of the line.
2. If the site goes blank after an edit, you deleted a quote, comma or bracket.
   Undo (`Ctrl+Z`) until it comes back.

### The menu — `NAV`

```js
{ label: "Live Schedule", labelJa: "ライブ情報", to: "/live" },   // internal page
{ label: "Web Shop", labelJa: "ウェブショップ", href: SHOP_URL }, // external link
```

`to:` is a page on this site. `href:` opens a new tab. Order here is the order
on screen, in both the top menu and the footer.

### Links at the top of the file

```js
export const SHOP_URL = "https://junsapporo.thebase.in/";
export const NEWS_URL = "https://lit.link/en/teamJUNfficial2014";
export const CONTACT_EMAIL = "jun.sapporo.official@gmail.com";
```

Changing `SHOP_URL` updates every shop link on the site at once.

### Profile — `PROFILE`

Used on `/about` and in the footer. `bio` is a list of paragraphs — add another
by adding another quoted line with a comma after it.

### The tour — `NONFICTION`

Powers both the black-and-gold home page section and the `/nonfiction` page:
date, times, venue, the access link, the ticket link, and the ticket price
list. Set `soldOut: true` on a ticket to strike it through and show a
"完売" badge.

To run a *different* tour later, change these values and replace
`public/nonfiction.jpg` with the new poster.

### ROOMLIVE — `ROOMLIVE`

The `episodes` list holds YouTube video IDs. The ID is the part of a YouTube
URL after `v=`:

```
https://www.youtube.com/watch?v=dquZxqBnv6w
                                 ^^^^^^^^^^^ this
```

Thumbnails are pulled from YouTube automatically, so there is no artwork to
prepare. To add an episode, copy an existing block and change `no`, `title`
and the video ID.

### Albums — `RELEASES`

```js
{ slug: "acoustic-12", title: "Acoustic vol.12", url: "https://junsapporo.thebase.in/items/147079273" },
```

`slug` must match the cover image filename: `slug` `acoustic-12` looks for
`public/discography/acoustic-12.jpg`. To add an album: put the cover in that
folder, then add a line here with a matching `slug`. Newest first — the home
page shows the top three.

### Images

| Image | File | Notes |
|---|---|---|
| Home banner | `public/hero.jpg` | Replace with the same filename |
| Tour poster | `public/nonfiction.jpg` | Replace with the same filename |
| Album covers | `public/discography/<slug>.jpg` | Square, around 800×800 |

Keep photos under about 500 KB so the site stays fast. Any image editor's
"export for web" or "save for web" setting handles this.

---

## 4. The live schedule and the editor

The live schedule is the one thing designed to be updated without touching
code, because it changes weekly.

### 4.1 How the editor works — read this first

The editor is a **form that produces a file**. Think of it like Word: it opens
a document, lets you change it, and saves a copy to your computer.

**It does not update the website by itself.** There is no server behind it.
Uploading the file it produces is a separate, manual step that you do.

```
1. Open /editor            reads the current schedule
2. Edit in the form        happens in your browser only
3. Press ダウンロード       saves schedule.json to your computer
4. Upload that file        ← YOU DO THIS. The site now shows the change.
```

### 4.2 Using it

1. Go to `/editor` — on the live site, or at
   http://localhost:5173/editor while `npm run dev` is running.
2. Click a show to open it. Edit the fields. The right-hand panel shows
   exactly how it will look on the real site.
3. **公演を追加** adds a show. **終了した◯件を削除** clears out past shows.
4. Press **ダウンロード**. `schedule.json` lands in your Downloads folder.
   (**コピー** puts the same content on the clipboard instead, which is handier
   if your host lets you edit files directly in the browser.)
5. Publish it — see 4.4.

Field notes:

- **公演日** is the real date. For a two-day event, use the **last** day, so it
  doesn't get marked 終了 while it's still running.
- **表示する日付** overrides what's shown. Leave it blank and it's generated
  from the date (`9/13`). Fill it in for things like `9/4・5`.
- **詳細** is one `ラベル：内容` per line.
- **特集として大きく表示** gives one show the black-and-gold treatment.
- Shows whose date has passed dim automatically and get a 終了 badge. You never
  have to remove them by hand.

### 4.3 The file format

You should never need to edit this by hand — but if you do, only `iso` and
`title` are required.

```json
{
  "updated": "2026-09-09",
  "shows": [
    {
      "iso": "2026-09-19",
      "area": "東京",
      "title": "駿河台浴衣祭五夜",
      "times": ["Open 17:30 ／ Start 18:00"],
      "details": [
        { "label": "料金", "value": "¥3,500 +1D" },
        { "label": "会場", "value": "お茶の水パルトネール" }
      ]
    }
  ]
}
```

### 4.4 Publishing an updated schedule

**Because the schedule is read at runtime, you do not need to rebuild.**

1. Take the `schedule.json` you just downloaded.
2. Put it in the `dist` folder, replacing the old one.
3. Also copy it over `public/schedule.json`, so the built-in fallback doesn't
   go stale. (Not strictly required, but do it.)
4. Re-upload `dist` — see section 6.

No `npm run build`, no code changes.

If your host lets you replace a single file (most Japanese shared hosts do,
via their file manager), it's even simpler: just overwrite `schedule.json` on
the server. Cloudflare Pages drag-and-drop can't do that — it takes the whole
folder each time.

---

## 5. Building

```bash
npm run build
```

This creates the `dist` folder — that folder *is* the website, roughly 2.3 MB.
It runs two steps: Vite compiles everything, then `build-routes.mjs` writes the
per-page `index.html` files.

Check it before publishing:

```bash
npm run preview
```

Serves the real built site at http://localhost:4173. This is the last chance
to catch a mistake before it's public.

---

## 6. Publishing to Cloudflare Pages

Free, gives HTTPS automatically, and takes about two minutes.

> **Pages, not Workers.** Cloudflare has two products here. Drag-and-drop only
> exists in **Pages** — Workers static assets requires the Wrangler command
> line tool. Make sure you pick Pages.

### First time

1. Create a free account at **https://dash.cloudflare.com**.
2. In the sidebar choose **Workers & Pages**.
3. **Create application** → the **Pages** tab → **Upload assets**.
4. Give the project a name — this becomes the address, e.g. `jun006`
   → `jun006.pages.dev`.
5. **Drag the whole `dist` folder** into the upload area. The folder itself,
   not the files inside it, and not a zip.
6. **Deploy site.**

Live at `https://<project-name>.pages.dev` within a minute, with HTTPS already
working and renewing itself forever.

Our build sits comfortably inside the limits — **29 files** against a cap of
1,000, largest file **0.5 MB** against a cap of 25 MiB.

### Publishing an update

1. `npm run build` (skip this if you only changed `schedule.json`)
2. Cloudflare dashboard → **Workers & Pages** → the project
3. **Create a new deployment**
4. Drag `dist` in again → **Deploy**

Every deployment is kept, so if something breaks you can roll back to a
previous one from the dashboard.

### Custom domain

Project → **Custom domains** → **Set up a domain**. Cloudflare issues the HTTPS
certificate free and renews it automatically. If the domain isn't registered
with Cloudflare, you'll be given DNS records to add at whoever holds it.

### `_headers`

`public/_headers` tells Cloudflare never to cache `schedule.json`. Without it,
a replaced schedule might not appear for hours. Don't delete it.

---

## 7. Troubleshooting

**The site is blank after editing `site.js`**
A missing quote, comma or bracket. Undo until it works. The terminal running
`npm run dev` usually names the line.

**`npm` is not recognised**
Node.js isn't installed, or the terminal was open before you installed it.
Close every terminal, open a new one, try `node -v` again.

**`npm run dev` says the port is in use**
Another copy is already running. Close it, or open the port it reports.

**The schedule didn't change after uploading**
Hard-reload the page — `Ctrl+Shift+R`, or `Cmd+Shift+R` on Mac. If it's still
wrong, open `schedule.json` on the live site directly
(`https://your-site/schedule.json`) and check it's the new file.

**The schedule shows old shows, and the browser console mentions the built-in
copy**
The uploaded `schedule.json` is invalid and the site fell back. Regenerate it
from `/editor` rather than hand-editing.

**A page 404s after deploying**
The per-page `index.html` files are missing — you published without running
`npm run build`, or uploaded the wrong folder. Publish `dist`, not `public`
and not the project root.

**Images don't appear**
Filename mismatch, including capital letters — `Acoustic-12.jpg` and
`acoustic-12.jpg` are different files on most hosts. Album covers must match
their `slug` in `site.js` exactly.

---

## 8. Notes for whoever maintains this next

- **`node_modules` and `dist` are generated.** Never edit them, never copy them
  between computers. `npm install` and `npm run build` recreate both.
- **The site has no backend.** Nothing can be hacked, nothing expires, nothing
  needs patching. The trade is that publishing is always a manual upload.
- **`/editor` has no password.** It doesn't need one: it can only produce a
  file on your own computer, and it can't change the live site. What actually
  protects the site is your hosting login.
- **Fonts and YouTube thumbnails load from Google and YouTube.** Everything
  else is served from the site itself.
- If this moves to a Japanese shared host (Xserver, さくら, ロリポップ), upload
  the contents of `dist` to the public folder. Their file managers *can*
  replace `schedule.json` on its own, which makes the workflow in section 4
  much easier than it is on Cloudflare.
