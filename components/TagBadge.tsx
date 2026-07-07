import Link from "next/link";

interface TagBadgeProps {
  tag: string;
  active?: boolean;
  count?: number;
}

export default function TagBadge({ tag, active = false, count }: TagBadgeProps) {
  const baseClasses =
    "inline-block px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors";
  const activeClasses = active
    ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700";

  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className={`${baseClasses} ${activeClasses}`}
    >
      {tag}
      {count !== undefined && (
        <span className="ml-1 opacity-60">({count})</span>
      )}
    </Link>
  );
}
