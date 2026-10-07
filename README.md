# Lu_Zhiyong's Blog

基于 Next.js、Tailwind CSS 与 GitHub Pages 构建的静态个人博客。文章由 Markdown 管理，推送到 `main` 后会自动构建并发布。

## Steam 同步 API

博客新增了 `/steam/` 页面和独立的 Cloudflare Workers API。API 实现位于 `workers/steam-api/`，负责从 Steam 官方接口读取公开资料、缓存最近游玩数据，并保护 Steam API Key 不进入前端。

部署 Worker 后，将其公开地址配置为 GitHub 仓库的 Actions 变量 `NEXT_PUBLIC_STEAM_API_URL`，部署流程会将它传入构建。未配置时沿用现有的 `zhiyonglu-steam-api.zhiyonglu114.workers.dev` 接口；接口暂时不可用时可点击“重新同步”。详细步骤见 `workers/steam-api/README.md`。

在线访问：[zhiyonglu.top](https://zhiyonglu.top/)

## 本地开发

```powershell
node --version # 使用 Node.js 24 LTS，与 CI 保持一致
npm.cmd ci
npm.cmd run dev
```

本地地址为 `http://localhost:3000/`。项目使用自定义域名根路径，未配置 `/blog` 前缀。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `npm.cmd run dev` | 启动本地开发服务器 |
| `npm.cmd run build` | 生成 RSS、sitemap 并进行生产构建 |
| `npm.cmd run rss` | 重新生成 `public/rss.xml` 与 `public/sitemap.xml` |
| `npm.cmd run start` | 构建后预览 `out/` 静态站点（默认 3000 端口） |
| `npm.cmd run lint` | ESLint 检查（Next.js 16 已移除 `next lint`） |
| `npm.cmd run typecheck` | TypeScript 类型检查 |
| `npm.cmd test` | 文章、RSS、sitemap 和 Steam Worker 回归测试 |
| `npm.cmd run check` | 依次执行 lint、测试和生产构建 |

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

- `lib/site-config.mjs`：页面与 RSS 共用的站点名称、导航和社交链接；
- `lib/constants.ts`：导出站点配置并定义固定分类；
- `lib/post-data.mjs`：页面与 RSS 共用的文章解析和校验；
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

`.github/workflows/deploy.yml` 会在推送到 `main` 后安装依赖、构建、检查代码与测试，并部署 `out/` 到 GitHub Pages。PR 会通过独立的 `check.yml` 检查。构建会更新 `public/rss.xml` 和 `public/sitemap.xml`；若新增或修改了文章，应一并提交这两个文件。相同内容重复构建时，RSS 和 sitemap 不会因构建时间产生差异。

## 搜索收录

- Sitemap：`https://zhiyonglu.top/sitemap.xml`
- RSS：`https://zhiyonglu.top/rss.xml`
- Google Search Console 验证文件：`https://zhiyonglu.top/google3f0c00c5f2956f42.html`

部署完成后，在 Google Search Console 提交 sitemap，并用“网址检查”请求抓取首页和新文章。
