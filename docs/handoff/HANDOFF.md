# 2026-10-07 代码审查与修复

用户请求：阅读 `https://github.com/LZY041017/blog`，进行代码审查并修改优化。

审查基线：`66ccd7f8085628830396c777eb0255445648cea1`。工作使用本次独立克隆，保留仓库现有 AGENTS.md 与视觉方向。

完成：修复主题按钮同步、背景视频生命周期与减少动效、Tailwind 透明度、首页横向溢出、标签参数解析、RSS XML 转义、sitemap 覆盖、文章校验、Steam Worker 缓存与错误处理、前端请求清理与重试、Giscus 清理与文章切换、导航与轮播语义。增加文章 canonical 与 Open Graph URL；恢复可用的 lint、静态预览和 CI 检查。

依赖：Next.js 16.4.0，Node.js 24；与当前 Next.js 插件 peer 要求兼容的 ESLint 9.39.5。serve 的 compression 使用已修复的 1.8.2 版本范围。

验证：10 项 Node 回归测试、ESLint、TypeScript 与生产构建通过；50 个 Next.js 静态页面，48 条公开 sitemap 路由，27 个标签页，13 篇文章。独立检查 2,434 个本地引用，没有缺失资源或错误文档。RSS 与 sitemap 重复生成的文件 hash 一致。浏览器检查主题、移动菜单、中文标签、视频切换与减少动效；首页移动视口 clientWidth 和 scrollWidth 均为 386。

待关注：npm audit 仍报告 14 个传递依赖问题（7 high、7 moderate、0 critical），主要来自 braces、postcss-selector-parser 与 sprintf-js。ESLint 9 已提示停止支持，而当前 Next.js 配套的 import/react/jsx-a11y 插件尚未声明支持 ESLint 10；后续升级需整套插件兼容验证。Steam Worker 使用模拟上游与缓存验证，未部署真实 Worker；Giscus 未验证真实账号评论发送。未推送远程或发布网站。

后续入口：`npm ci` → `npm run check`。构建最后的 `scripts/verify-export.mjs` 会检查所有 sitemap 对应静态页面，防止标签页静默导出错误文档。发布前单独部署 Worker，并检查 Actions 变量和正式域名。

## 滚动与全站视频背景跟进

前述修复已以 `7f72fad` 推送 main，GitHub Pages Actions `37580850649` 部署成功。用户随后反馈滚轮卡顿、内页缺少动态视频。

恢复根布局中的全站单个播放器，客户端栏目切换时保留同一个 video 元素，移动端仍使用 mobile-main.mp4，尊重系统减少动效设置和页面可见性。视频文件、分辨率与装饰光晕保留；移除视频逐帧饱和度滤镜与额外缩放，为固定背景建立独立合成边界。首页六张文章卡片采用正常布局，移除估算高度的 content-visibility；导航和回顶按钮仅在跨越滚动阈值时更新 React 状态。

验证：npm run check、npm run typecheck 均通过；桌面各栏目、移动文章和标签页视频 readyState=4、正在播放，栏目导航保留同一播放器；减少动效时没有 video 元素。修复版浏览器滚轮采样 449 个帧间隔，P95 12.2ms、最大 24.1ms，没有超过 33.4ms 的间隔、长任务或布局偏移，页面高度保持 1956px。该单次本机浏览器采样没有复现用户的严重卡顿，不能代表所有设备或 GPU 合成帧率；继续反馈时需按实际浏览器和设备定位。
