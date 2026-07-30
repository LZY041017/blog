import PostCard from "@/components/PostCard";
import TagBadge from "@/components/TagBadge";
import type { Post } from "@/lib/posts";

interface TagSummary {
  name: string;
  count: number;
}

interface PostCollectionPageProps {
  title: string;
  description: string;
  posts: Post[];
  tags?: TagSummary[];
  activeTag?: string;
  emptyMessage?: string;
}

/** Shared layout for the all-posts, category, and tag archive pages. */
export default function PostCollectionPage({
  title,
  description,
  posts,
  tags = [],
  activeTag,
  emptyMessage = "暂无文章",
}: PostCollectionPageProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          {title}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </header>

      {tags.length > 0 && (
        <nav aria-label="文章标签" className="mb-10 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagBadge
              key={tag.name}
              tag={tag.name}
              count={tag.count}
              active={tag.name.toLowerCase() === activeTag?.toLowerCase()}
            />
          ))}
        </nav>
      )}

      {posts.length === 0 ? (
        <p className="py-16 text-center text-lg text-gray-500 dark:text-gray-400">
          {emptyMessage}
        </p>
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
