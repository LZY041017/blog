---
title: "Tailwind CSS 使用技巧"
date: "2026-07-05"
description: "分享一些 Tailwind CSS 的实用技巧和最佳实践，提升你的开发效率。"
tags: ["技术", "CSS", "Tailwind", "前端"]
author: "方言"
---

## 前言

Tailwind CSS 是一个实用优先的 CSS 框架，它让你可以直接在 HTML 中通过预定义的类名来构建界面。

## 基础技巧

### 1. 善用 @apply 指令

当你发现自己在多个地方重复相同的类名组合时，可以使用 `@apply` 提取公共样式：

```css
.btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors;
}
```

### 2. 响应式设计

Tailwind 的响应式断点非常直观：

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- 手机: 1列, 平板: 2列, 桌面: 3列 -->
</div>
```

### 3. 暗色模式

使用 `dark:` 前缀轻松实现暗色模式：

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  内容区域
</div>
```

## 性能优化

使用 Tailwind 时要注意：

| 做法 | 推荐 | 避免 |
|------|------|------|
| 使用任意值 | `w-[300px]` | 过度使用 |
| 提取组件 | 复用组件 | 复制粘贴 |
| 条件类名 | clsx/cn 工具 | 模板字符串拼接 |

## 总结

Tailwind CSS 的学习曲线虽然一开始有点陡，但一旦熟悉了命名规范和设计系统，开发效率会有质的飞跃。
