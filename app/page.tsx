import { SITE_CONFIG } from "@/lib/constants";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
      {/* Hero */}
      <section className="relative mb-16 sm:mb-20">
        {/* Subtle decorative glow behind hero */}
        <div
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-[0.07] blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -top-10 right-0 w-48 h-48 rounded-full opacity-[0.05] blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
          }}
        />

        <p className="relative mb-4 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-primary-600 uppercase dark:text-primary-400">
          <span className="h-px w-8 bg-current opacity-60" />
          Personal notes
        </p>
        <h1 className="relative text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          {SITE_CONFIG.title}
        </h1>
        <p className="relative max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
          {SITE_CONFIG.description}
        </p>
        <div className="relative mt-7 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-500">
          <span className="inline-flex h-2 w-2 rounded-full bg-primary-500 shadow-[0_0_0_4px_rgba(59,130,246,0.12)]" />
          {posts.length} posts in the collection
        </div>
      </section>

      {/* Posts */}
      <section>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-gray-400 uppercase dark:text-gray-600">
              Recent writing
            </p>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {String.fromCodePoint(0x6700, 0x65b0, 0x6587, 0x7ae0)}
            </h2>
          </div>
          {posts.length > SITE_CONFIG.postsPerPage && (
            <a
              href="/posts"
              className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              {String.fromCodePoint(0x67e5, 0x770b, 0x5168, 0x90e8)} &rarr;
            </a>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              {String.fromCodePoint(0x8fd8, 0x6ca1, 0x6709, 0x6587, 0x7ae0, 0xff0c, 0x5f00, 0x59cb, 0x5199, 0x7b2c, 0x4e00, 0x7bc7, 0x5427)}
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