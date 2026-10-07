import fs from "fs";
import path from "path";
import { isPostSlug, parsePost, readPosts } from "./post-data.mjs";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  author?: string;
  cover?: string;
}

export interface Post extends PostMeta {
  content: string;
}

const postsDirectory = path.join(process.cwd(), "content", "posts");

/**
 * Read and parse all markdown posts, sorted by date (newest first).
 */
export function getAllPosts(): Post[] {
  return readPosts(postsDirectory);
}

/**
 * Get a single post by slug.
 */
export function getPostBySlug(slug: string): Post | null {
  if (!isPostSlug(slug)) return null;
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  return parsePost(fileContents, slug);
}

/**
 * Get all unique tags across all posts, with post counts.
 */
export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get posts filtered by tag.
 */
export function getPostsByTag(tag: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * Get all post slugs (for static generation).
 */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

/**
 * Estimate reading time for a post.
 */
export function getReadingTime(content: string): number {
  const wordsPerMinute = 300;
  const chineseCharsPerMinute = 500;

  const words = content.split(/\s+/).filter((w) => w.length > 0).length;
  const chineseChars = (content.match(/[一-鿿]/g) ?? []).length;

  const minutes =
    words / wordsPerMinute + chineseChars / chineseCharsPerMinute;
  return Math.max(1, Math.ceil(minutes));
}
