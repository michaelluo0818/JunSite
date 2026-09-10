/* ---------------------------------------------------------------
   Single source of truth for the site's content.

   Everything here is supplied information except the DISCOGRAPHY
   entries, which are deliberate placeholders.
   --------------------------------------------------------------- */

export const SHOP_URL = "https://junsapporo.thebase.in/";
export const NEWS_URL = "https://lit.link/en/teamJUNfficial2014";
export const CONTACT_EMAIL = "jun.sapporo.official@gmail.com";

export const NAV = [
  { label: "Home", labelJa: "ホーム", to: "/" },
  { label: "News", labelJa: "お知らせ", href: NEWS_URL },
  { label: "Live Schedule", labelJa: "ライブ情報", to: "/live" },
  { label: "Discography", labelJa: "作品", to: "/discography" },
  {
    label: "Live Tour “nonfiction”",
    labelJa: "ライブツアー",
    to: "/nonfiction",
    lower: true,
  },
  { label: "Web Shop", labelJa: "ウェブショップ", href: SHOP_URL },
  { label: "About", labelJa: "プロフィール", to: "/about" },
  { label: "Contact", labelJa: "お問い合わせ", to: "/contact" },
];

export const SOCIALS = [
  { name: "X", href: "https://x.com/Jun_006" },
  { name: "YouTube", href: "https://www.youtube.com/@JunSapporo" },
  { name: "Instagram", href: "https://www.instagram.com/jun_006/" },
];

export const PROFILE = {
  name: "JUN",
  tagline: "札幌在住のシンガーソングライター",
  bio: [
    "country music×J-popをベースに北海道らしい爽やかな音楽を、共感しやすい歌詞に乗せて届けている。",
    "自身が児童養護施設出身という経験もあり、“夢や好きな事を諦めない”をテーマに音楽活動中。",
  ],
  theme: "夢や好きな事を諦めない",
  radio: {
    station: "ＦＭおたる",
    title: "JUNのSwinging door",
    role: "パーソナリティ担当",
    schedule: "毎月 第3木曜 23:00〜",
  },
};

/* ---------------------------------------------------------------
   nonfiction — JUN 15th Anniversary, 2026.10.2 @ TOKIO TOKYO.
   Colours below are sampled straight off the tour poster.
   --------------------------------------------------------------- */
export const NONFICTION = {
  title: "nonfiction",
  eyebrow: "JUN 15th Anniversary",
  date: "2026.10.2",
  open: "18:30",
  start: "19:00",
  city: "Tokyo",
  venue: "TOKIO TOKYO",
  accessUrl: "https://www.loft-prj.co.jp/schedule/heaven/access",
  ticketUrl: "https://junsapporo.thebase.in/items/132503294",
  tickets: [
    { label: "Ticket", price: "¥5,000 (+1D)" },
    { label: "VIP Ticket", price: "¥10,000", soldOut: true },
    { label: "Streaming", price: "¥4,000" },
  ],
  to: "/nonfiction",
};

/* ---------------------------------------------------------------
   ROOMLIVE — 自作音楽バラエティ番組
   --------------------------------------------------------------- */
export const ROOMLIVE = {
  title: "ROOMLIVE",
  schedule: "毎月 第3・第4日曜 20:00〜",
  channel: "https://www.youtube.com/@JunSapporo",
  series: "日本全国ストリートの旅",
  episodes: [
    {
      no: "01",
      title: "山陽編",
      videos: [{ id: "dquZxqBnv6w" }],
    },
    {
      no: "02",
      title: "東海道編",
      videos: [{ id: "fFskHXcyCng" }],
    },
    {
      no: "03",
      title: "山陰九州北部編",
      videos: [
        { id: "_0bldw6wqp0" }
      ],
    }
  ],
};

/* The live schedule now lives in /schedule.json — see data/schedule.js. */
export const LIVE_FOOTNOTE =
  "各会場のライブチケットは、お問い合わせよりご連絡ください。";

/* ---------------------------------------------------------------
   Discography. Covers were pulled from each shop listing and
   downscaled to 800px; every card links to its item on BASE.
   --------------------------------------------------------------- */
export const RELEASES = [
  {
    slug: "acoustic-12",
    title: "Acoustic vol.12",
    url: "https://junsapporo.thebase.in/items/147079273",
  },
  {
    slug: "acoustic-11",
    title: "Acoustic vol.11",
    url: "https://junsapporo.thebase.in/items/113886103",
  },
  {
    slug: "acoustic-10",
    title: "Acoustic vol.10",
    url: "https://junsapporo.thebase.in/items/87485921",
  },
  {
    slug: "acoustic-09",
    title: "Acoustic vol.9",
    url: "https://junsapporo.thebase.in/items/74872249",
  },
  {
    slug: "acoustic-08",
    title: "Acoustic vol.8",
    url: "https://junsapporo.thebase.in/items/55987464",
  },
  {
    slug: "acoustic-07",
    title: "Acoustic vol.7",
    url: "https://junsapporo.thebase.in/items/50921877",
  },
  {
    slug: "acoustic-06",
    title: "Acoustic vol.6",
    url: "https://junsapporo.thebase.in/items/50921386",
  },
  {
    slug: "acoustic-05",
    title: "Acoustic vol.5",
    url: "https://junsapporo.thebase.in/items/26425499",
  },
  {
    slug: "acoustic-best-1-4",
    title: "Acoustic Best 1-4",
    url: "https://junsapporo.thebase.in/items/55987722",
  },
  {
    slug: "stand-up",
    title: "STAND UP",
    url: "https://junsapporo.thebase.in/items/26425331",
  },
  {
    slug: "25-twenty-five",
    title: "25 - twenty five -",
    url: "https://junsapporo.thebase.in/items/26425366",
  },
  {
    slug: "freesia",
    title: "FREESIA",
    url: "https://junsapporo.thebase.in/items/26425404",
  },
].map((r) => ({ ...r, cover: `/discography/${r.slug}.jpg` }));
