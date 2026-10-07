import { SITE_CONFIG } from "./site-config.mjs";

export function escapeXml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

const siteUrl = (pathname) => `${SITE_CONFIG.url}${pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`}`;
const postUrl = (slug) => siteUrl(`/posts/${encodeURIComponent(slug)}`);

export function generateRSS(posts) {
  const items = posts.map((post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.description)}</description>
      <link>${escapeXml(postUrl(post.slug))}</link>
      <guid isPermaLink="true">${escapeXml(`${SITE_CONFIG.url}/posts/${post.slug}`)}</guid>
      ${post.date ? `<pubDate>${new Date(post.date).toUTCString()}</pubDate>` : ""}
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
    </item>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.title)}</title>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <link>${escapeXml(siteUrl("/"))}</link>
    <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml"/>
    <language>${SITE_CONFIG.locale}</language>
${items}
  </channel>
</rss>
`;
}

export function sitemapEntries(posts) {
  const paths = new Set(["/", "/posts", ...SITE_CONFIG.nav.map((item) => item.href)]);
  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort();
  return [
    ...Array.from(paths, (pathname) => ({ loc: siteUrl(pathname) })),
    ...posts.map((post) => ({ loc: postUrl(post.slug), lastmod: post.date.slice(0, 10) })),
    ...tags.map((tag) => ({ loc: siteUrl(`/tags/${encodeURIComponent(tag)}`) })),
  ];
}

export function generateSitemap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries(posts).map(({ loc, lastmod }) => `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}
  </url>`).join("\n")}
</urlset>
`;
}
