import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import PostCollectionPage from "@/components/PostCollectionPage";
import { resolveTag } from "@/lib/tag-path.mjs";

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
  const name = resolveTag(tag, getAllTags().map((item) => item.name)) ?? tag;
  return {
    title: `标签: ${name}`,
    description: `浏览带有 "${name}" 标签的文章`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const allTags = getAllTags();
  const name = resolveTag(tag, allTags.map((item) => item.name));
  if (!name) notFound();
  const posts = getPostsByTag(name);

  return <PostCollectionPage title={`标签：${name}`} description={`共 ${posts.length} 篇文章`} posts={posts} tags={allTags} activeTag={name} emptyMessage="该标签下还没有文章" />;
}
