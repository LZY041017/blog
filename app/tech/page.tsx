import type { Metadata } from "next";
import { getPostsByTag, getAllTags } from "@/lib/posts";
import { POST_COLLECTIONS } from "@/lib/constants";
import PostCollectionPage from "@/components/PostCollectionPage";

export const metadata: Metadata = {
  title: "技术",
  description: "技术文章分类",
};

export default function TechPage() {
  const collection = POST_COLLECTIONS.tech;
  const posts = getPostsByTag(collection.tag);
  const allTags = getAllTags();

  return <PostCollectionPage title={collection.title} description={`${collection.description} 共 ${posts.length} 篇文章。`} posts={posts} tags={allTags} activeTag={collection.tag} />;
}
