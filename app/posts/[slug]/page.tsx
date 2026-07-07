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
import Link from "next/link";

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
