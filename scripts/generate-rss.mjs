import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readPosts } from "../lib/post-data.mjs";
import { generateRSS, generateSitemap } from "../lib/feeds.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(rootDir, "public");
const posts = readPosts(path.join(rootDir, "content", "posts"));
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, "rss.xml"), generateRSS(posts), "utf8");
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), generateSitemap(posts), "utf8");
console.log(`RSS and sitemap generated for ${posts.length} posts.`);
