import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import TagBadge from "@/components/TagBadge";
import Link from "next/link";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: encodeURIComponent(tag.name) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `标签: ${decodedTag}`,
    description: `浏览带有 "${decodedTag}" 标签的文章`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);
  const allTags = getAllTags();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
        标签: {decodedTag}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        共 {posts.length} 篇文章
      </p>

      {/* All tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {allTags.map((t) => (
          <TagBadge
            key={t.name}
            tag={t.name}
            count={t.count}
            active={t.name.toLowerCase() === decodedTag.toLowerCase()}
          />
        ))}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400">
            该标签下还没有文章
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
