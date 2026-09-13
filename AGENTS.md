---
agents_version: v0.9.7
generator_version: v0.9.7
default_language: 中文
---

# Lu_Zhiyong's Blog

这是一个基于 Next.js 的个人博客，使用 Markdown 管理文章，通过 GitHub Actions 部署到 GitHub Pages，并绑定 `zhiyonglu.top`。

## 工作约定

- 默认使用中文交流。
- 页面路由放在 `app/`，可复用组件放在 `components/`，文章放在 `content/posts/`，静态 SEO 与验证文件放在 `public/`。
- 修改页面、SEO 或部署配置后运行 `npm.cmd run build`；部署后检查自定义域名、`robots.txt` 和 `sitemap.xml`。
- `.next/` 与 `out/` 是生成目录，不直接手写修改。
- 通过 GitHub Actions 发布；不使用远程服务器。

## Code Comment Policy

只保留非显然意图、风险、边界或公共 API 行为所需的注释；不要批量添加显而易见的 AI 注释。行为变化时同步更新旧注释，保持代码、注释和空行分隔清晰。

后续默认使用中文回复。
