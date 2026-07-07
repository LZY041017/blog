import type { Metadata } from "next";
import { getPostsByTag, getAllTags } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import TagBadge from "@/components/TagBadge";

export const metadata: Metadata = {
  title: "技术",
  description: "技术文章分类",
};

export default function TechPage() {
  const posts = getPostsByTag("技术");
  const allTags = getAllTags();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
        技术
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        共 {posts.length} 篇文章
      </p>

      <div className="flex flex-wrap gap-2 mb-10">
        {allTags.map((t) => (
          <TagBadge
            key={t.name}
            tag={t.name}
            count={t.count}
            active={t.name === "技术"}
          />
        ))}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400">暂无文章</p>
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
