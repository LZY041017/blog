import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import PostCollectionPage from "@/components/PostCollectionPage";

export const metadata: Metadata = {
  title: "文章列表",
  description: "浏览所有文章",
};

export default function PostsPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return <PostCollectionPage title="文章列表" description={`共 ${posts.length} 篇文章`} posts={posts} tags={tags} emptyMessage="还没有文章 😴" />;
}
