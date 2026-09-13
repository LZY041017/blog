import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import PostCollectionPage from "@/components/PostCollectionPage";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  // Return the raw segment. Next.js performs URL encoding when it writes the
  // static export; encoding it here makes non-ASCII tags get encoded twice.
  return getAllTags().map((tag) => ({ tag: tag.name }));
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

  return <PostCollectionPage title={`标签：${decodedTag}`} description={`共 ${posts.length} 篇文章`} posts={posts} tags={allTags} activeTag={decodedTag} emptyMessage="该标签下还没有文章" />;
}
