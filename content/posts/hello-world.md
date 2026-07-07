---
title: "你好，世界！"
date: "2026-07-01"
description: "这是我的第一篇博客文章，记录博客搭建的过程和想法。"
tags: ["技术", "博客", "Next.js", "前端"]
author: "方言"
---

## 为什么写博客

一直想有一个自己的空间来记录学习和思考。在信息爆炸的时代，写作是沉淀知识最好的方式。

## 技术选型

这个博客使用了以下技术栈：

- **Next.js 16** — React 全栈框架，支持静态生成
- **Tailwind CSS 4** — 原子化 CSS，开发效率高
- **Markdown** — 简洁的内容格式，方便版本管理
- **TypeScript** — 类型安全，减少 bug

### 为什么选 Next.js？

Next.js 是目前 React 生态中最成熟的框架之一。它的 App Router 提供了强大的路由系统，静态生成（SSG）非常适合博客这种内容型网站。

```typescript
// 文章详情页使用静态生成
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}
```

## 博客功能

- 📝 Markdown 编写的文章，支持代码高亮
- 🏷️ 标签分类系统
- 🌙 暗色模式支持
- 📱 响应式设计
- 📡 RSS 订阅

## 后续计划

1. 添加评论系统
2. 完善 SEO 优化
3. 添加更多主题支持

感谢你的访问！
