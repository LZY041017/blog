export const SITE_CONFIG = {
  title: "Lu_Zhiyong's Blog",
  description: "记录思考，分享技术，书写生活。",
  author: "Lu Zhiyong",
  locale: "zh-CN",
  url: "https://lzy041017.github.io/blog",
  social: {
    github: "https://github.com",
    twitter: "",
    email: "",
  },
  nav: [
    { label: "首页", href: "/" },
    { label: "技术", href: "/tech" },
    { label: "随想", href: "/thoughts" },
    { label: "自我", href: "/about" },
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
