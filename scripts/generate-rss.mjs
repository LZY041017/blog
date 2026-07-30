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

const STATIC_PATHS = ["", "/posts", "/tech", "/thoughts", "/about"];

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

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

function generateSitemap() {
  const posts = getAllPosts();
  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort();
  const urls = [
    ...STATIC_PATHS.map((pathName) => ({ loc: `${SITE_CONFIG.url}${pathName}` })),
    ...posts.map((post) => ({
      loc: `${SITE_CONFIG.url}/posts/${post.slug}`,
      lastmod: post.date?.toISOString().slice(0, 10),
    })),
    ...tags.map((tag) => ({
      loc: `${SITE_CONFIG.url}/tags/${encodeURIComponent(tag)}`,
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod }) => `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");
  console.log("✅ Sitemap generated: public/sitemap.xml");
}

generateRSS();
generateSitemap();
