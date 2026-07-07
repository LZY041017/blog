# 对话记录：搭建个人博客

**日期**: 2026年7月7日  
**项目**: Lu_Zhiyong's Blog  
**地址**: https://lzy041017.github.io/blog

---

## 1. 项目启动

用户想在空目录中从零搭建个人博客。

### 技术选型确认
- 框架：Next.js（App Router）
- 样式：Tailwind CSS
- 内容管理：Markdown 文件
- 三项均为用户选择"推荐"方案

### 方案设计
制定了完整的博客架构方案，包含 7 个实施步骤：项目初始化 → 工具函数 → 组件 → 页面路由 → 示例内容 → 样式打磨 → 验证。用户批准方案。

---

## 2. 项目搭建

### 遇到的问题
- 中文目录名"方言"导致 npm 项目名不合法，改用手动初始化（手动写 package.json 再 npm install）
- 部分依赖版本号不对（Next.js 15.6.0 不存在），调整为实际最新版本

### 完成的工作
创建了完整的博客项目：

**工具层**：
- 站点常量配置（名称、描述、社交链接）
- 文章读取解析工具（frontmatter 解析、标签聚合、阅读时间估算）

**组件层**：
- Header（响应式导航 + 移动端汉堡菜单）
- Footer（版权 + 社交链接 + RSS）
- ThemeToggle（暗色/亮色模式切换，localStorage 持久化）
- PostCard（文章卡片：封面图、标题、标签、日期、阅读时间）
- TagBadge（可点击标签徽章）
- MarkdownContent（Markdown 渲染 + GFM + 代码高亮）
- BackToTop（回到顶部按钮）

**页面层**：
- 首页（Hero + 文章卡片网格）
- 文章详情页（SSG 预生成）
- 文章列表页（带标签筛选）
- 标签筛选页
- 关于页面
- 404 页面
- RSS 订阅

**示例内容**：
- hello-world.md：第一篇博客，介绍技术选型
- tailwind-tips.md：Tailwind CSS 使用技巧

---

## 3. 品牌调整

用户要求将站点名从"方言"改为"Lu_Zhiyong's Blog"，文件夹也同步改名。

### 遇到的问题
- 原文件夹被 shell 占用无法直接重命名
- 解决方案：复制到新文件夹 `Lu_Zhiyongs_Blog`

### 最终信息
- 站点标题：Lu_Zhiyong's Blog
- 作者：Lu Zhiyong
- URL：https://lzy041017.github.io/blog

---

## 4. 上线部署

### 需求
让博客能被互联网访问，以及能在 GitHub 上编辑。

### 方案演进
- 最初推荐 Vercel，用户问国内是否需要翻墙 → 确认需要
- 改为 GitHub Pages（国内通常可访问）

### 部署过程
1. 初始化 git 仓库并首次提交
2. 配置 git 代理（127.0.0.1:10090）解决国内无法直连 GitHub 的问题
3. 推送到用户仓库 LZY041017/blog
4. 配置静态导出（output: "export"）+ GitHub Actions 自动部署
5. 创建 RSS 生成脚本（静态导出不支持动态路由）
6. 用户手动在 GitHub 设置中启用 Pages + Actions
7. 部署成功，全网可访问

### 自动部署流程
写完文章 → git push → GitHub Actions 自动构建 → 自动部署到 Pages（约 1 分钟）

---

## 5. 内容创作

### 已发布的文章

1. **你好，世界！** — 介绍博客搭建和技术选型
2. **Tailwind CSS 使用技巧** — 前端开发实用技巧
3. **免费搭建个人博客教程** — 完整教程，从 Next.js 到 GitHub Pages
4. **博客美化指南** — 配色、动效、组件定制教学

### 写文章的方式
在 `content/posts/` 下新建 `.md` 文件（含 frontmatter 元数据），git push 即可自动发布。

---

## 6. 学习建议

给用户提供了博客美化的学习路径：
- 第一周：改颜色、换字体、调整间距（纯 CSS）
- 第二周：hover 效果、过渡动画（Tailwind 内置类）
- 第三周：motion 库做入场动画（少量 JS）
- 第四周：集成评论、搜索等第三方组件

推荐资源：Dribbble（设计灵感）、motion.dev（动画文档）、uicolors.app（配色工具）

---

## 关键文件速查

| 目的 | 文件 |
|------|------|
| 改外观 | app/globals.css |
| 改站点信息 | lib/constants.ts |
| 改导航栏 | components/Header.tsx |
| 改首页 | app/page.tsx |
| 改文章卡片 | components/PostCard.tsx |
| 改文章详情页 | app/posts/[slug]/page.tsx |
| 改暗色模式 | components/ThemeToggle.tsx |
| 写新文章 | content/posts/*.md |
| 加新组件 | components/*.tsx |
