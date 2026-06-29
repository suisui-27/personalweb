# Data Model / 数据模型文档

> **AI 阅读指南**：本文档描述全站所有数据模块的结构、字段定义和文件位置。
> 修改内容时，只需编辑对应的数据文件或 MDX frontmatter，无需改动页面模板。

---

## 架构总览

```
数据源                    类型定义                 页面消费
─────────               ─────────               ─────────
src/content/portfolio/  → content/config.ts    → index.astro, portfolio/index.astro, portfolio/[slug].astro
src/data/posters.ts     → src/data/types.ts     → index.astro, posters.astro (via PosterCarousel.tsx)
src/data/photography.ts → src/data/types.ts     → index.astro, photography.astro
src/data/honors.ts      → src/data/types.ts     → index.astro, honors.astro
src/data/profile.ts     → src/data/types.ts     → about.astro
```

**四大模块 + 关于页**，共 5 个数据入口。所有 TypeScript 接口集中在 `src/data/types.ts`。

---

## 1. 产品 / Portfolio

| 属性 | 文件 / 位置 |
|------|------------|
| 数据源 | `src/content/portfolio/*.mdx`（每篇 MDX = 一条作品） |
| Schema 定义 | `src/content/config.ts` |
| 类型接口 | `PortfolioItem`（`src/data/types.ts`） |
| 列表页 | `src/pages/portfolio/index.astro` |
| 详情页 | `src/pages/portfolio/[slug].astro` |
| 首页展示 | `src/pages/index.astro`（取前 6 条，featured 优先） |
| 卡片组件 | `src/components/WorkCard.astro` |
| 图片目录 | `public/assets/portfolio/{slug}/` |

### Frontmatter 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `title` | `string` | 是 | — | 作品标题 |
| `category` | `PortfolioCategory` | 是 | — | 分类：`"3D 模型"` / `"产品设计"` / `"产品概念"` / `"界面设计"` |
| `cover` | `string` | 是 | — | 封面图路径，如 `"/assets/portfolio/bike-shuttle-robot/cover.jpg"` |
| `summary` | `string` | 是 | — | 一句话摘要，显示在卡片和详情页 |
| `year` | `string` | 是 | — | 年份，如 `"2024"` |
| `featured` | `boolean` | 否 | `false` | 首页是否优先展示 |
| `tags` | `string[]` | 否 | `[]` | 标签列表，详情页显示为胶囊 |
| `gallery` | `{ src, caption }[]` | 否 | `[]` | 详情页底部图廊 |

### MDX 正文

frontmatter 之后的 Markdown/MDX 内容会渲染到详情页 `.article-body` 区域。

### 示例

```mdx
---
title: "共享单车摆渡机器人"
category: "3D 模型"
cover: "/assets/portfolio/bike-shuttle-robot/cover.jpg"
summary: "面向共享单车调度场景的摆渡机器人概念设计。"
year: "2024"
featured: true
tags: ["3D 建模", "服务机器人", "机械结构"]
gallery:
  - src: "/assets/portfolio/bike-shuttle-robot/render.jpg"
    caption: "渲染图：整体造型与使用场景"
---

正文内容……
```

---

## 2. 平面 / Posters

| 属性 | 文件 / 位置 |
|------|------------|
| 数据源 | `src/data/posters.ts` |
| 类型接口 | `PosterItem`（`src/data/types.ts`） |
| 列表页 | `src/pages/posters.astro` |
| 首页展示 | `src/pages/index.astro`（全部条目） |
| 轮播组件 | `src/components/PosterCarousel.tsx` |
| 图片目录 | `public/assets/posters/` |

### 字段定义

| 字段 | 类型 | 说明 |
|------|------|------|
| `src` | `string` | 图片路径，如 `"/assets/posters/2024-new-year.jpg"` |
| `title` | `string` | 海报标题 |
| `category` | `PosterCategory` | 分类：`"节庆视觉"` / `"专题宣传"` / `"校庆视觉"` / `"校园视觉"` / `"栏目视觉"` / `"校友故事"` / `"周年专题"` |

### 数据结构

```typescript
export const posterItems: PosterItem[] = [
  { src: "/assets/posters/2024-new-year.jpg", title: "2024 元旦祝福", category: "节庆视觉" },
  // ...
];
```

---

## 3. 摄影 / Photography

| 属性 | 文件 / 位置 |
|------|------------|
| 数据源 | `src/data/photography.ts` |
| 类型接口 | `PhotographyItem`（`src/data/types.ts`） |
| 列表页 | `src/pages/photography.astro` |
| 首页展示 | `src/pages/index.astro`（全部条目） |
| 图片目录 | `public/assets/photography/` |

### 字段定义

| 字段 | 类型 | 说明 |
|------|------|------|
| `src` | `string` | 图片路径 |
| `place` | `string` | 拍摄地点 |
| `note` | `string` | 拍摄说明（光线、主题等） |

### 数据结构

```typescript
export const photographyItems: PhotographyItem[] = [
  { src: "/assets/photography/lenggacuo-03.jpg", place: "冷嘎措", note: "雪山、湖泊与高海拔光线" },
  // ...
];
```

---

## 4. 荣誉 / Honors

| 属性 | 文件 / 位置 |
|------|------------|
| 数据源 | `src/data/honors.ts` |
| 类型接口 | `HonorItem`（`src/data/types.ts`） |
| 列表页 | `src/pages/honors.astro` |
| 首页展示 | `src/pages/index.astro`（全部条目） |
| 图片目录 | `public/assets/honors/` |

### 字段定义

| 字段 | 类型 | 说明 |
|------|------|------|
| `src` | `string` | 证书/文档图片路径 |
| `title` | `string` | 奖项名称 |
| `category` | `HonorCategory` | 分类：`"工业设计竞赛"` / `"设计竞赛"` / `"奖学金"` / `"文档材料"` |
| `year` | `string` | 获奖年份或学年 |

### 数据结构

```typescript
export const honorItems: HonorItem[] = [
  { src: "/assets/honors/2025-industrial-design-second.jpg", title: "...", category: "工业设计竞赛", year: "2025" },
  // ...
];
```

---

## 5. 关于 / Profile

| 属性 | 文件 / 位置 |
|------|------------|
| 数据源 | `src/data/profile.ts` |
| 类型接口 | `Profile`（`src/data/types.ts`） |
| 展示页面 | `src/pages/about.astro` |

### 字段定义

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | `string` | 姓名 |
| `tagline` | `string` | 一句话定位 |
| `bio` | `string[]` | 自我介绍段落（每段一个元素） |
| `education` | `EducationRecord[]` | 教育经历列表 |
| `skills` | `SkillGroup[]` | 技能分组 |
| `interests` | `string[]` | 兴趣方向 |

### EducationRecord

| 字段 | 类型 | 说明 |
|------|------|------|
| `period` | `string` | 时间段，如 `"2024 — 至今"` |
| `school` | `string` | 学校 |
| `major` | `string` | 专业 |
| `degree` | `string` | 学位 |

### SkillGroup

| 字段 | 类型 | 说明 |
|------|------|------|
| `category` | `string` | 分组名称 |
| `items` | `string[]` | 该组下的技能列表 |

---

## 资源目录映射

```
public/assets/
  hero/              → 首页 hero 背景图（CSS 引用）
  readme/            → README 图片
  portfolio/         → 产品作品图片
    {slug}/          → 每个作品一个文件夹
      cover.jpg      → 封面（frontmatter cover 字段）
      render.jpg     → 渲染图（gallery 字段）
      ...
  posters/           → 平面海报图片
  photography/       → 摄影照片
  honors/            → 荣誉证书图片
```

---

## 修改指南

| 想做什么 | 编辑哪个文件 |
|---------|-------------|
| 新增/修改作品 | `src/content/portfolio/` 下新增 .mdx 文件 |
| 新增/修改海报 | `src/data/posters.ts` |
| 新增/修改摄影 | `src/data/photography.ts` |
| 新增/修改荣誉 | `src/data/honors.ts` |
| 修改个人介绍 | `src/data/profile.ts` |
| 修改字段定义 | `src/data/types.ts` |
| 修改作品 Schema | `src/content/config.ts` |
| 修改全局样式 | `src/styles/global.css` |
| 修改导航/布局 | `src/layouts/BaseLayout.astro` |
