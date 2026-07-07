export const SITE_CONFIG = {
  title: "Lu_Zhiyong's Blog",
  description: "记录思考，分享技术，书写生活。",
  author: "Lu Zhiyong",
  locale: "zh-CN",
  url: "https://luzhiyong.blog",
  social: {
    github: "https://github.com",
    twitter: "",
    email: "",
  },
  nav: [
    { label: "首页", href: "/" },
    { label: "文章", href: "/posts" },
    { label: "关于", href: "/about" },
  ],
  postsPerPage: 10,
} as const;

export const SITE_KEYWORDS: string[] = [
  "博客",
  "技术",
  "编程",
  "前端",
  "React",
  "Next.js",
];
