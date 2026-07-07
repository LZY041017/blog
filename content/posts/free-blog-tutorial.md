---
title: "免费搭建个人博客：Next.js + GitHub Pages 完整教程"
date: "2026-07-07"
description: "从零开始，手把手教你用 Next.js 和 GitHub Pages 搭建一个免费、高速、支持暗色模式的个人博客。无需服务器，无需备案，全程免费。"
tags: ["教程", "Next.js", "GitHub", "前端"]
author: "Lu Zhiyong"
---

## 为什么要自己搭建博客？

市面上的博客平台很多，但自己搭建博客有几个不可替代的优势：

- **完全掌控** — 数据在自己手里，不受平台限制
- **高度自定义** — 外观、功能随心所欲
- **技术积累** — 搭建过程本身就是学习
- **零成本** — GitHub Pages + Vercel 都是免费的

## 技术栈选择

本教程使用以下技术栈：

| 技术 | 用途 | 为什么选它 |
|------|------|-----------|
| Next.js 16 | 前端框架 | React 生态最流行的全栈框架 |
| Tailwind CSS 4 | 样式 | 原子化 CSS，开发效率极高 |
| Markdown | 内容格式 | 纯文本，Git 友好，易于迁移 |
| GitHub Pages | 部署托管 | 免费，HTTPS，全球 CDN |
| GitHub Actions | 自动部署 | push 自动构建，无需手动操作 |

## 第一步：创建 Next.js 项目

```bash
mkdir my-blog && cd my-blog
npm init -y
npm install next react react-dom
npm install -D typescript @types/react @types/node
npm install gray-matter react-markdown remark-gfm rehype-highlight date-fns lucide-react
npm install -D tailwindcss @tailwindcss/postcss @tailwindcss/typography
```

## 第二步：编写文章读取工具

使用 `gray-matter` 解析 Markdown 文件的 frontmatter 元数据：

```typescript
// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getAllPosts() {
  const postsDir = path.join(process.cwd(), "content", "posts");
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".md"));

  return files.map(file => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
    const { data, content } = matter(raw);
    return { slug, content, ...data };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
```

## 第三步：配置暗色模式

Tailwind CSS 4 的暗色模式配置非常简单：

```css
/* app/globals.css */
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

然后用一个 React 组件来切换：

```tsx
function ThemeToggle() {
  const [dark, setDark] = useState(false);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return <button onClick={toggle}>{dark ? "🌙" : "☀️"}</button>;
}
```

## 第四步：配置静态导出

在 `next.config.ts` 中启用静态导出：

```typescript
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/blog",  // 仓库名
  images: { unoptimized: true },
};
```

## 第五步：设置 GitHub Actions 自动部署

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    steps:
      - uses: actions/deploy-pages@v4
```

## 第六步：发布你的第一篇文章

在 `content/posts/` 下创建 Markdown 文件：

```markdown
---
title: "我的第一篇文章"
date: "2026-07-07"
description: "文章摘要"
tags: ["博客", "生活"]
---

## 正文内容

开始写作...
```

## 总结

通过这个教程，你学会了：

1. ✅ 用 Next.js 构建博客前端
2. ✅ 用 Markdown 管理文章内容
3. ✅ 用 Tailwind CSS 实现暗色模式
4. ✅ 用 GitHub Actions 实现自动部署
5. ✅ 零成本拥有一个全球可访问的个人博客

下一步可以考虑添加评论系统（Giscus）、全文搜索、或者绑定自定义域名，让你的博客更加完善！
