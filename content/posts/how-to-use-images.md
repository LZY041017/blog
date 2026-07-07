---
title: "博客图片上传完全指南"
date: "2026-07-07"
description: "三种方法在博客中使用图片，从最简单到最灵活，总有一种适合你。"
tags: ["技术", "教程"]
author: "Lu Zhiyong"
---

## 方法一：直接放 public 文件夹（推荐）

最直接的方式，把图片放到 `public/images/` 目录，然后在 Markdown 中引用。

### 操作步骤

1. 把图片文件放到 `public/images/` 下，比如 `public/images/photo.jpg`
2. 在 Markdown 文章中这样引用：

```markdown
![图片描述](/blog/images/photo.jpg)
```

3. 提交并推送，图片随博客一起部署

### 优点与缺点

- 简单直接，无需第三方服务
- 图片和文章一起版本管理
- 适合少量图片（每次部署都包含所有图片，图多了仓库变大）

### 小技巧：用文件夹按文章组织

```
public/images/
├── hello-world/
│   └── screenshot.png
├── summer-2026/
│   ├── sunset.jpg
│   └── coffee.jpg
```

---

## 方法二：GitHub 直接上传（最方便）

如果你在 GitHub 网页上编辑文章，可以拖拽图片到编辑框：

1. 在 GitHub 仓库打开 `content/posts/` 下的文章
2. 点编辑按钮（✏️）
3. 直接把图片拖进编辑框
4. GitHub 会自动生成一个 CDN 链接，类似：

```markdown
![图片](https://github.com/user-attachments/assets/xxxx-xxxx-xxxx)
```

5. 提交即可

### 优点

- 不需要本地操作，手机也能发文
- 图片走 GitHub CDN，不占仓库体积
- 每张图独立管理

---

## 方法三：图床服务（最灵活）

### 推荐图床

| 服务 | 免费额度 | 特点 |
|------|---------|------|
| imgur.com | 不限 | 全球通用，稳定 |
| sm.ms | 5GB | 国内速度快 |

### 使用方式

1. 打开图床网站，上传图片
2. 复制生成的 Markdown 链接
3. 粘贴到文章里

---

## 三种方式对比

| 方式 | 难度 | 适合场景 |
|------|------|---------|
| public 文件夹 | 简单 | 少量配图、封面图 |
| GitHub 拖拽 | 最简单 | 在网页写文章时顺手加图 |
| 图床服务 | 中等 | 大量图片、需要稳定外链 |

> 💡 建议日常用 GitHub 拖拽（最省心），封面图和站点 logo 放 public 文件夹。
