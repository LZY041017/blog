export { SITE_CONFIG } from "./site-config.mjs";

export const POST_COLLECTIONS = {
  tech: {
    tag: "技术",
    title: "技术",
    description: "记录开发、硬件与工具链中的实践。",
  },
  thoughts: {
    tag: "随想",
    title: "随想",
    description: "记录生活、学习与不定期的思考。",
  },
} as const;

export const SITE_KEYWORDS: string[] = [
  "博客",
  "技术",
  "编程",
  "前端",
  "React",
  "Next.js",
];
