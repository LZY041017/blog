import Link from "next/link";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import { zhCN } from "date-fns/locale";
import type { PostMeta } from "@/lib/posts";
import { getReadingTime } from "@/lib/posts";
import TagBadge from "./TagBadge";

interface PostCardProps {
  post: PostMeta & { content?: string };
}

export default function PostCard({ post }: PostCardProps) {
  const readingTime = post.content ? getReadingTime(post.content) : null;

  return (
    <article className="group border border-gray-200/80 dark:border-gray-800/80 rounded-xl p-6 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300 bg-gradient-to-br from-white via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/20">
      {post.cover && (
        <Link href={`/posts/${post.slug}`} className="block -mx-6 -mt-6 mb-5 overflow-hidden rounded-t-xl">
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      )}

      <div className="space-y-3">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold leading-tight">
          <Link
            href={`/posts/${post.slug}`}
            className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {/* Description */}
        {post.description && (
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm leading-relaxed">
            {post.description}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
          {post.date && (
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {format(parseISO(post.date), "yyyy年M月d日", { locale: zhCN })}
            </span>
          )}
          {readingTime && (
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {readingTime} 分钟阅读
            </span>
          )}
        </div>

        {/* Read more */}
        <Link
          href={`/posts/${post.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        >
          阅读全文
          <ChevronRight size={14} />
        </Link>
      </div>
    </article>
  );
}
