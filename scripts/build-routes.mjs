#!/usr/bin/env node
/* Emits a real index.html for every client-side route.
 *
 * Blob Storage static websites have no rewrite rules: a request for
 * /live looks for a blob at that exact path and, finding none, falls
 * through to the error document. That renders the app, but with an
 * HTTP 404 status — bad for search engines and confusing in logs.
 *
 * Writing dist/live/index.html (and so on) means every route is a real
 * object, served with a real 200. The error document stays configured
 * as a backstop for genuinely unknown URLs.
 */

import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const DIST = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");

// Keep in sync with the <Route> list in src/App.jsx.
const ROUTES = ["live", "discography", "nonfiction", "about", "contact", "editor"];

const source = join(DIST, "index.html");
if (!existsSync(source)) {
  console.error("✗ dist/index.html not found — run the build first.");
  process.exit(1);
}

for (const route of ROUTES) {
  const dir = join(DIST, route);
  mkdirSync(dir, { recursive: true });
  copyFileSync(source, join(dir, "index.html"));
}

console.log(`✓ wrote index.html for ${ROUTES.length} routes: ${ROUTES.join(", ")}`);
