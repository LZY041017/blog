import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-24 text-center">
      <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-700 mb-4">
        404
      </h1>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        页面未找到
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        你要找的页面不存在，可能已被移动或删除。
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
      >
        返回首页
      </Link>
    </div>
  );
}
