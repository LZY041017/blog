import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { readPosts, parsePost, isPostSlug } from "../lib/post-data.mjs";
import { generateRSS, generateSitemap, sitemapEntries } from "../lib/feeds.mjs";
import { SITE_CONFIG } from "../lib/site-config.mjs";
import { resolveTag } from "../lib/tag-path.mjs";

test("标签参数兼容静态导出编码及原始百分号", () => {
  const tags = ["技术", "100%", "C%2B%2B"];
  for (const tag of tags) {
    assert.equal(resolveTag(tag, tags), tag);
    assert.equal(resolveTag(encodeURIComponent(tag), tags), tag);
  }
  assert.equal(resolveTag("unknown%", tags), null);
});

test("所有现有文章可解析，日期倒序且标签无重复", () => {
  const posts = readPosts(path.resolve("content/posts"));
  assert.ok(posts.length > 0);
  assert.equal(new Set(posts.map((post) => post.slug)).size, posts.length);
  posts.forEach((post, index) => {
    assert.equal(new Set(post.tags).size, post.tags.length);
    if (index) assert.ok(posts[index - 1].date >= post.date);
  });
});

test("非法日期与标签给出包含文章名的诊断", () => {
  for (const date of ["2026-02-30", "not-a-date", "2026-13-01"]) {
    assert.throws(() => parsePost(`---\ndate: '${date}'\n---\n正文`, "bad-date"), /bad-date\.md: date/);
  }
  for (const tags of ["技术", "[技术, 123]", "['a/b']"]) {
    assert.throws(() => parsePost(`---\ntags: ${tags}\n---`, "bad-tags"), /bad-tags\.md: tags/);
  }
});

test("接受闰年日期和含百分号标签，阻止路径穿越 slug", () => {
  const post = parsePost("---\ndate: 2024-02-29\ntags: ['100%', ' C%2B%2B ', '100%']\n---\n正文", "valid-post");
  assert.equal(post.date, "2024-02-29T00:00:00.000Z");
  assert.deepEqual(post.tags, ["100%", "C%2B%2B"]);
  for (const slug of ["../README", "..", "a/b", "a\\b"]) assert.equal(isPostSlug(slug), false);
});

test("RSS 正确转义 XML 特殊字符及 CDATA 终止串，输出稳定", () => {
  const posts = [{ slug: "xml-test", title: "A & B ]]> <title>", description: '"quoted"', date: "2026-10-07T00:00:00.000Z", tags: ["R&D", "100%"] }];
  const rss = generateRSS(posts);
  assert.ok(rss.includes("<title>A &amp; B ]]&gt; &lt;title&gt;</title>"));
  assert.ok(rss.includes("<category>R&amp;D</category>"));
  assert.ok(rss.includes(`${SITE_CONFIG.url}/posts/xml-test/`));
  assert.ok(rss.includes(`<guid isPermaLink="true">${SITE_CONFIG.url}/posts/xml-test</guid>`));
  assert.equal(generateRSS(posts), rss);
  assert.ok(!rss.includes("Invalid Date"));
});

test("sitemap 包含全部导航、文章与一次编码的标签路径", () => {
  const posts = readPosts(path.resolve("content/posts"));
  const entries = sitemapEntries(posts);
  for (const item of SITE_CONFIG.nav) {
    assert.ok(entries.some(({ loc }) => loc === `${SITE_CONFIG.url}${item.href === "/" ? "/" : `${item.href}/`}`));
  }
  assert.equal(new Set(entries.map(({ loc }) => loc)).size, entries.length);
  const special = generateSitemap([{ slug: "special", date: "", tags: ["100%", "C%2B%2B", "技术"] }]);
  assert.ok(special.includes("/tags/100%25/"));
  assert.ok(special.includes("/tags/C%252B%252B/"));
  assert.ok(special.includes(`/tags/${encodeURIComponent("技术")}/`));
});
