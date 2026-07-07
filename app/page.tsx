import { SITE_CONFIG } from "@/lib/constants";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
      {/* Hero */}
      <section className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          {SITE_CONFIG.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          {SITE_CONFIG.description}
        </p>
      </section>

      {/* Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            最新文章
          </h2>
          {posts.length > SITE_CONFIG.postsPerPage && (
            <a
              href="/posts"
              className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              查看全部 &rarr;
            </a>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              还没有文章，开始写第一篇吧 ✍️
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.slice(0, SITE_CONFIG.postsPerPage).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
