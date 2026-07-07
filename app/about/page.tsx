import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "关于",
  description: `关于${SITE_CONFIG.title}`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
        关于
      </h1>

      <div className="prose prose-gray dark:prose-invert prose-lg max-w-none">
        <p>
          你好！我是 <strong>{SITE_CONFIG.author}</strong>，欢迎来到我的博客。
        </p>
        <p>
          这里是我记录技术学习、分享思考和生活感悟的地方。
          我喜欢探索新事物，用代码创造有趣的东西。
        </p>

        <h2>关于这个博客</h2>
        <p>
          这个博客使用{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>{" "}
          构建，使用{" "}
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tailwind CSS
          </a>{" "}
          样式，内容以 Markdown 格式编写。
          代码开源于{" "}
          <a
            href={SITE_CONFIG.social.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          。
        </p>

        <h2>联系方式</h2>
        <ul>
          {SITE_CONFIG.social.github && (
            <li>
              <a
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          )}
          {SITE_CONFIG.social.email && (
            <li>
              <a href={`mailto:${SITE_CONFIG.social.email}`}>
                Email: {SITE_CONFIG.social.email}
              </a>
            </li>
          )}
          {SITE_CONFIG.social.twitter && (
            <li>
              <a
                href={SITE_CONFIG.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
