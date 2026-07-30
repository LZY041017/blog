# Lu_Zhiyong's Blog

基于 Next.js、Tailwind CSS 与 GitHub Pages 构建的静态个人博客。文章由 Markdown 管理，推送到 `main` 后会自动构建并发布。

在线访问：[lzy041017.github.io/blog](https://lzy041017.github.io/blog/)

## 本地开发

```powershell
npm.cmd ci
npm.cmd run dev
```

本地地址为 `http://localhost:3000/blog`。项目配置了 `basePath: "/blog"`，因此不要省略 `/blog`。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm.cmd run dev` | 启动本地开发服务器 |
| `npm.cmd run build` | 生成 RSS、sitemap 并进行生产构建 |
| `npm.cmd run rss` | 重新生成 `public/rss.xml` 与 `public/sitemap.xml` |
| `npm.cmd run start` | 本地运行生产构建结果 |

## 目录约定

```text
app/                 页面与路由
components/          可复用界面组件
content/posts/       博客文章（Markdown）
lib/                 站点配置与文章读取逻辑
scripts/             构建前执行的辅助脚本
public/              静态资源与生成的 RSS
```

其中：

- `lib/constants.ts`：站点名称、导航、社交链接与固定分类；
- `lib/posts.ts`：读取、排序文章，并提供标签与阅读时长数据；
- `components/PostCollectionPage.tsx`：文章列表、分类与标签页共用布局；
- `content/posts/`：唯一需要日常新增内容的目录。

## 新增文章

在 `content/posts/` 新建一个英文 slug 命名的 `.md` 文件，例如 `my-first-note.md`：

```md
---
title: "文章标题"
date: "2026-07-30"
description: "一句话摘要，会显示在文章卡片和 RSS 中。"
tags: ["技术", "Next.js"]
author: "Lu Zhiyong"
---

正文从这里开始。
```

详细写作约定见 [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md)。

## 发布流程

```text
编辑文章或代码 → npm.cmd run build → git commit → git push origin main
```

`.github/workflows/deploy.yml` 会在推送到 `main` 后执行 `npm ci`、`npm run build`，并部署 `out/` 到 GitHub Pages。构建会更新 `public/rss.xml` 和 `public/sitemap.xml`；若新增或修改了文章，应一并提交这两个文件。

## 搜索收录

- Sitemap：`https://lzy041017.github.io/blog/sitemap.xml`
- RSS：`https://lzy041017.github.io/blog/rss.xml`
- Google Search Console 验证文件：`https://lzy041017.github.io/blog/google3f0c00c5f2956f42.html`

部署完成后，在 Google Search Console 提交 sitemap，并用“网址检查”请求抓取首页和新文章。
