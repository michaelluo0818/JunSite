#!/usr/bin/env node
/* Deploys dist/ to an Azure Storage static website.
 *
 *   npm run deploy -- <storage-account-name>
 *
 * Uploads in three passes so each kind of file gets the right
 * Cache-Control. Order matters: the broad pass runs first, then the
 * narrower passes overwrite those blobs with better headers.
 *
 *   1. everything          — 1 hour   (images, fonts, robots.txt)
 *   2. assets/*            — 1 year, immutable (filenames are hashed)
 *   3. *.html, schedule.json — no-cache
 *
 * schedule.json must never be cached: replacing it is how the live
 * schedule is updated, and a stale copy would make that look broken.
 */

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");

const account = process.argv[2];
if (!account) {
  console.error("Usage: npm run deploy -- <storage-account-name>");
  process.exit(1);
}
if (!existsSync(join(DIST, "index.html"))) {
  console.error("✗ dist/ is missing or empty — run `npm run build` first.");
  process.exit(1);
}

function az(args, label) {
  process.stdout.write(`→ ${label}\n`);
  const res = spawnSync("az", args, { stdio: ["ignore", "pipe", "inherit"], shell: true });
  if (res.status !== 0) {
    console.error(`✗ failed: ${label}`);
    process.exit(res.status ?? 1);
  }
  return res.stdout?.toString() ?? "";
}

const base = ["storage", "blob", "upload-batch", "--account-name", account, "--overwrite", "--output", "none"];

az(
  [...base, "-s", DIST, "-d", "$web", "--content-cache-control", "public, max-age=3600"],
  "uploading everything (1h cache)",
);

az(
  [...base, "-s", DIST, "-d", "$web", "--pattern", "assets/*",
    "--content-cache-control", "public, max-age=31536000, immutable"],
  "re-tagging hashed assets (1y immutable)",
);

az(
  [...base, "-s", DIST, "-d", "$web", "--pattern", "*.html",
    "--content-cache-control", "no-cache", "--content-type", "text/html; charset=utf-8"],
  "re-tagging HTML (no-cache)",
);

az(
  [...base, "-s", DIST, "-d", "$web", "--pattern", "**/*.html",
    "--content-cache-control", "no-cache", "--content-type", "text/html; charset=utf-8"],
  "re-tagging route HTML (no-cache)",
);

az(
  [...base, "-s", DIST, "-d", "$web", "--pattern", "schedule.json",
    "--content-cache-control", "no-cache, max-age=0, must-revalidate",
    "--content-type", "application/json; charset=utf-8"],
  "re-tagging schedule.json (no-cache)",
);

const url = az(
  ["storage", "account", "show", "-n", account, "--query", "primaryEndpoints.web", "-o", "tsv"],
  "reading site URL",
).trim();

console.log(`\n✓ Deployed to ${url}`);
