# Steam 免费同步 API

这是一个 Cloudflare Workers 版本的 Steam 数据代理与缓存接口。它只读取公开 Steam 资料，API Key 只放在 Worker Secret 中，不进入博客前端或 GitHub 仓库。缓存使用 Cloudflare Cache API，不需要额外购买数据库或 KV。

部署前需要：

1. 创建 Cloudflare Workers 项目。
2. 把 `STEAM_ID` 改为 Steam 64 位 ID。
3. 设置 Secret：`wrangler secret put STEAM_API_KEY`。
4. 部署 Worker，并将其公开 URL 配置为 GitHub 仓库 Actions 变量 `NEXT_PUBLIC_STEAM_API_URL`；本地开发可在 `.env.local` 中配置同名变量。

如果 Steam 资料或游戏详情设为私密，接口只能返回有限信息。边缘缓存有效期为 30 分钟，浏览器缓存为 5 分钟。缓存按 Steam ID 隔离，错误响应不缓存；官方 API 的请求超时为 8 秒，前端等待上限为 10 秒。Steam 暂时不可用且缓存过期时，会显示友好提示与“重新同步”按钮。

Worker 的 CORS 默认允许 `https://zhiyonglu.top`。本地前端直接请求它时会受到跨域限制；需要联调时，先在独立的测试 Worker 中调整允许的来源。回归测试使用模拟上游和缓存，不需要真实 API Key。

Cloudflare Cache API 不支持 `stale-while-revalidate`；本实现使用明确的缓存有效期，不承诺缓存过期后仍能返回旧数据。Worker 代码修改需要单独部署，博客的 Pages 流程仅发布静态前端。
