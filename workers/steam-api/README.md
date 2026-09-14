# Steam 免费同步 API

这是一个 Cloudflare Workers 版本的 Steam 数据代理与缓存接口。它只读取公开 Steam 资料，API Key 只放在 Worker Secret 中，不进入博客前端或 GitHub 仓库。

部署前需要：

1. 创建 Cloudflare Workers 项目和一个 KV namespace，并把 namespace ID 写入 `wrangler.toml`。
2. 把 `STEAM_ID` 改为 Steam 64 位 ID。
3. 设置 Secret：`wrangler secret put STEAM_API_KEY`。
4. 部署 Worker，并将其公开 URL 配置为博客构建变量 `NEXT_PUBLIC_STEAM_API_URL`。

如果 Steam 资料或游戏详情设为私密，接口只能返回有限信息。缓存有效期为 30 分钟，Steam 暂时不可用时，博客前端会保留上一次成功结果或显示友好提示。
