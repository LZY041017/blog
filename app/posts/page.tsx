import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import TagBadge from "@/components/TagBadge";

export const metadata: Metadata = {
  title: "文章列表",
  description: "浏览所有文章",
};

export default function PostsPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
        文章列表
      </h1>

      {/* Tags filter */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-1 self-center">
            标签:
          </span>
          {tags.map((tag) => (
            <TagBadge key={tag.name} tag={tag.name} count={tag.count} />
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            还没有文章 😴
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
