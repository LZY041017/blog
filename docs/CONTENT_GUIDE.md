# 文章维护指南

## 文件命名

- 文章文件放在 `content/posts/`；
- 使用小写英文、数字和连字符，例如 `int8-mac-systemverilog.md`；
- 文件名就是文章链接中的 slug：`/posts/int8-mac-systemverilog`。

## Front matter

每篇文章开头都必须有 YAML front matter：

```yaml
---
title: "清晰、可搜索的标题"
date: "2026-07-30"
description: "80 到 120 字左右的文章摘要。"
tags: ["技术", "SystemVerilog"]
author: "Lu Zhiyong"
---
```

- `title`、`date`、`description` 与 `tags` 会驱动文章列表、SEO 元数据和 RSS；
- `date` 使用 `YYYY-MM-DD`，新文章会按日期倒序显示；
- 需要出现在“技术”或“随想”页面的文章，标签中必须包含对应的 `技术` 或 `随想`；
- 标签应复用已有写法，避免同义词和大小写混用导致标签页分裂。

## 写作与校验

1. 先写一两句摘要，再完成正文；
2. 代码块标注语言，例如 ` ```systemverilog `；
3. 新增文章后运行 `npm.cmd run build`；
4. 检查首页、文章页和 `public/rss.xml` 是否出现新内容；
5. 只提交源文件与有内容更新的 RSS，不提交 `.next/` 或 `out/`。

## 修改站点

- 修改站点标题、导航、GitHub 链接：`lib/constants.ts`；
- 修改文章卡片：`components/PostCard.tsx`；
- 修改所有文章列表的共同布局：`components/PostCollectionPage.tsx`；
- 修改全局样式：`app/globals.css`。
