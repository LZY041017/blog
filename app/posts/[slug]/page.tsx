import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { getAllSlugs, getPostBySlug, getReadingTime } from "@/lib/posts";
import { SITE_CONFIG } from "@/lib/constants";
import MarkdownContent from "@/components/MarkdownContent";
import TagBadge from "@/components/TagBadge";
import Comment from "@/components/Comment";
import PhotoCarousel from "@/components/PhotoCarousel";
import Link from "next/link";

const qixiaPhotos = [
  { src: "/assets/posts/qixia-mountain/maple-path.webp", alt: "栖霞山枫林山路", caption: "山路入秋，游客沿着枫林向前" },
  { src: "/assets/posts/qixia-mountain/red-maple.webp", alt: "蓝天下的红色枫叶", caption: "抬头所见的红叶" },
  { src: "/assets/posts/qixia-mountain/maple-leaves.webp", alt: "近处的红色枫叶", caption: "近处的枫叶，胜过远景的想象" },
  { src: "/assets/posts/qixia-mountain/roof-and-maples.webp", alt: "枫叶掩映下的传统屋檐", caption: "枫叶掩映下的屋檐" },
  { src: "/assets/posts/qixia-mountain/pagoda.webp", alt: "秋色中的栖霞寺塔影", caption: "秋色里的栖霞寺塔影" },
  { src: "/assets/posts/qixia-mountain/wind-chimes.webp", alt: "栖霞山檐下风铃", caption: "檐下风铃与山寺的日常" },
  { src: "/assets/posts/qixia-mountain/qixia-temple.webp", alt: "栖霞寺建筑与秋树", caption: "栖霞寺檐角与秋树" },
  { src: "/assets/posts/qixia-mountain/yangtze-mist.webp", alt: "薄雾中的长江", caption: "薄雾中的长江" },
  { src: "/assets/posts/qixia-mountain/yangtze-boats.webp", alt: "江面上的货船", caption: "山顶望见的江面与货船" },
];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "文章未找到" };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readingTime = getReadingTime(post.content);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
      {/* Back link */}
      <Link
        href="/posts"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        返回文章列表
      </Link>

      {/* Article header */}
      <header className="mb-10">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>

        {post.description && (
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {post.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-500 pb-8 border-b border-gray-200 dark:border-gray-800">
          {post.date && (
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {format(parseISO(post.date), "yyyy年M月d日", { locale: zhCN })}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {readingTime} 分钟阅读
          </span>
          {post.author && (
            <span className="flex items-center gap-1.5">
              作者: {post.author}
            </span>
          )}
        </div>
      </header>

      {/* Cover image */}
      {post.cover && (
        <div className="mb-10 -mx-4 sm:mx-0">
          <img
            src={post.cover}
            alt={post.title}
            className="w-full max-h-96 object-cover rounded-none sm:rounded-xl"
          />
        </div>
      )}

      {slug === "qixia-mountain" && (
        <div className="not-prose mb-10">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-600 dark:text-primary-400">现场影像</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">沿着山路、寺院与江面，定格这次秋日登山</p>
            </div>
            <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">每 5 秒切换</span>
          </div>
          <PhotoCarousel photos={qixiaPhotos} />
        </div>
      )}

      {/* Article content */}
      <MarkdownContent content={post.content} />

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">标签:</span>
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </div>

      {/* Comments */}
      <Comment />
    </div>
  );
}
