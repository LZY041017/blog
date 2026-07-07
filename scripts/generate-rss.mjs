import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const postsDir = path.join(rootDir, "content", "posts");
const publicDir = path.join(rootDir, "public");

const SITE_CONFIG = {
  title: "Lu_Zhiyong's Blog",
  description: "记录思考，分享技术，书写生活。",
  url: "https://lzy041017.github.io/blog",
};

function getAllPosts() {
  if (!fs.existsSync(postsDir)) return [];

  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title ?? "",
        description: data.description ?? "",
        date: data.date ? new Date(data.date) : null,
        tags: data.tags ?? [],
      };
    })
    .sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));
}

function generateRSS() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${SITE_CONFIG.url}/posts/${post.slug}</link>
      <guid isPermaLink="true">${SITE_CONFIG.url}/posts/${post.slug}</guid>
      ${post.date ? `<pubDate>${post.date.toUTCString()}</pubDate>` : ""}
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${SITE_CONFIG.title}]]></title>
    <description><![CDATA[${SITE_CONFIG.description}]]></description>
    <link>${SITE_CONFIG.url}</link>
    <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, "rss.xml"), rss, "utf8");
  console.log("✅ RSS feed generated: public/rss.xml");
}

generateRSS();
