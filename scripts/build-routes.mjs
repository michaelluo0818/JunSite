#!/usr/bin/env node
/* Writes a real index.html for every client-side route, and gives each one
 * its own title and share card.
 *
 * Two problems solved here, both caused by the same thing — dumb static
 * hosts and crawlers that never run JavaScript:
 *
 *  1. ROUTING. Blob Storage, Cloudflare Pages and a shared host all look
 *     for a file at the exact path. Without dist/live/index.html a request
 *     for /live falls through to the error document and answers 404, even
 *     though the page renders fine. A real file per route answers 200.
 *
 *  2. SHARE CARDS. LINE, X and Slack fetch the raw HTML and read the head.
 *     They do not execute React, so a title set at runtime is invisible to
 *     them. The tags have to be baked into each file at build time.
 *
 *  3. DISCOVERY. Googlebot's crawl phase only follows <a href> found in the
 *     raw HTML, and this app's navigation is drawn by React — so before
 *     rendering there are literally zero links to follow. sitemap.xml hands
 *     Google every URL up front, with no rendering required.
 *
 * URLs carry a trailing slash throughout, because that is what the host
 * actually serves: Cloudflare Pages (and Apache) 307/301 from /live to
 * /live/. Matching it keeps canonical, og:url and the sitemap on the real
 * URL instead of one that redirects.
 */

import { copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const DIST = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const SITE = "https://jun006.com";

/* Keep in sync with the <Route> list in src/App.jsx.
   `noindex` keeps the maintenance tool out of search results at the HTTP
   level, which works even though crawlers never see the React meta tag. */
const ROUTES = {
  live: {
    title: "ライブ情報 | JUN",
    description: "シンガーソングライター JUN のライブ・出演情報。今後の公演スケジュールはこちら。",
  },
  discography: {
    title: "作品 | JUN",
    description: "シンガーソングライター JUN の作品一覧。CD・グッズはオンラインストアにて販売中です。",
  },
  nonfiction: {
    title: "Live Tour「nonfiction」| JUN",
    description:
      "JUN 15th Anniversary「nonfiction」2026.10.2（金）東京 TOKIO TOKYO。Open 18:30 / Start 19:00。",
  },
  about: {
    title: "プロフィール | JUN",
    description:
      "札幌在住のシンガーソングライター JUN のプロフィール。“夢や好きな事を諦めない”をテーマに music 活動中。",
  },
  contact: {
    title: "お問い合わせ | JUN",
    description: "ライブ出演のご依頼、チケット、取材・メディア出演に関するお問い合わせはこちら。",
  },
  editor: {
    title: "ライブ情報エディター | JUN",
    description: "ライブ情報の編集ツールです。",
    noindex: true,
    // Kept out of the sitemap: listing a noindex URL contradicts itself
    // and Search Console reports it as an error.
    sitemap: false,
  },
};

const source = join(DIST, "index.html");
if (!existsSync(source)) {
  console.error("✗ dist/index.html not found — run the build first.");
  process.exit(1);
}
const base = readFileSync(source, "utf8");

/** Replaces the content="" of one meta tag, matched by its name/property. */
function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`meta ${attr}="${key}" not found in index.html`);
  return html.replace(re, `$1${value}$2`);
}

for (const [route, meta] of Object.entries(ROUTES)) {
  const url = `${SITE}/${route}/`;
  let html = base;

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
  html = html.replace(
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${url}$2`,
  );
  html = setMeta(html, "name", "description", meta.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:title", meta.title);
  html = setMeta(html, "property", "og:description", meta.description);

  // The MusicGroup block describes the artist, not the page — it belongs
  // on the homepage only, so search engines see exactly one declaration.
  html = html.replace(
    /\n\s*<!-- Tells search engines[\s\S]*?<\/script>\n/,
    "\n",
  );

  if (meta.noindex) {
    html = html.replace(
      "<title>",
      '<meta name="robots" content="noindex, nofollow" />\n    <title>',
    );
  }

  const dir = join(DIST, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html, "utf8");
}

// The homepage keeps index.html exactly as built.
copyFileSync(source, join(DIST, "index.html"));

/* ---------------------------------------------------------------
   sitemap.xml
   Only <loc> and <lastmod>: Google ignores <changefreq> and
   <priority> entirely, so emitting them is noise.
   --------------------------------------------------------------- */
const lastmod = new Date().toISOString().slice(0, 10);
const indexable = [
  `${SITE}/`,
  ...Object.entries(ROUTES)
    .filter(([, meta]) => meta.sitemap !== false && !meta.noindex)
    .map(([route]) => `${SITE}/${route}/`),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map((loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`)
  .join("\n")}
</urlset>
`;
writeFileSync(join(DIST, "sitemap.xml"), sitemap, "utf8");

const names = Object.keys(ROUTES);
console.log(`✓ wrote index.html for ${names.length} routes: ${names.join(", ")}`);
console.log(`✓ wrote sitemap.xml with ${indexable.length} URLs`);
