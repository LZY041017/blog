import type { Metadata } from "next";
import { getPostsByTag, getAllTags } from "@/lib/posts";
import { POST_COLLECTIONS } from "@/lib/constants";
import PostCollectionPage from "@/components/PostCollectionPage";

export const metadata: Metadata = {
  title: "随想",
  description: "随想文章分类",
};

export default function ThoughtsPage() {
  const collection = POST_COLLECTIONS.thoughts;
  const posts = getPostsByTag(collection.tag);
  const allTags = getAllTags();

  return <PostCollectionPage title={collection.title} description={`${collection.description} 共 ${posts.length} 篇文章。`} posts={posts} tags={allTags} activeTag={collection.tag} />;
}
