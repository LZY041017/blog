import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readPosts } from "../lib/post-data.mjs";
import { sitemapEntries } from "../lib/feeds.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const posts = readPosts(path.join(root, "content", "posts"));
const entries = sitemapEntries(posts);
for (const { loc } of entries) {
  const pathname = decodeURIComponent(new URL(loc).pathname);
  const file = path.join(root, "out", pathname, "index.html");
  assert.ok(fs.existsSync(file), `Missing exported route: ${loc}`);
  const html = fs.readFileSync(file, "utf8");
  assert.ok(!/<html[^>]*\bid=["']__next_error__["']/.test(html), `Error document exported at: ${loc}`);
  assert.ok(/<h1\b/.test(html), `Missing page heading at: ${loc}`);
}
console.log(`Verified ${entries.length} exported routes (${posts.length} posts).`);
