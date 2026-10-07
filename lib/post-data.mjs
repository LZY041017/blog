import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export function isPostSlug(slug) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

export function parsePost(raw, slug) {
  const fail = (message) => { throw new Error(`${slug}.md: ${message}`); };
  if (!isPostSlug(slug)) fail("文件名必须使用小写英文、数字和连字符");
  const { data, content } = matter(raw);
  const stringField = (key, fallback = "") => {
    const value = data[key] ?? fallback;
    if (typeof value !== "string") fail(`${key} 必须是字符串`);
    return value;
  };
  let date = "";
  if (data.date !== undefined) {
    const value = data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : data.date;
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      fail("date 必须是 YYYY-MM-DD");
    }
    const parsed = new Date(`${value}T00:00:00.000Z`);
    if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) {
      fail("date 不是有效的日历日期");
    }
    date = parsed.toISOString();
  }
  const tags = data.tags ?? [];
  if (!Array.isArray(tags) || tags.some((tag) =>
    typeof tag !== "string" || !tag.trim() || /[\/\\]/.test(tag) || [".", ".."].includes(tag.trim())
  )) fail("tags 必须是非空标签字符串数组，标签不能含路径分隔符");

  return {
    slug,
    content,
    title: stringField("title", slug),
    date,
    description: stringField("description"),
    tags: [...new Set(tags.map((tag) => tag.trim()))],
    author: data.author === undefined ? undefined : stringField("author"),
    cover: data.cover === undefined ? undefined : stringField("cover"),
  };
}

export function readPosts(postsDirectory) {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => parsePost(fs.readFileSync(path.join(postsDirectory, file), "utf8"), file.slice(0, -3)))
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}
