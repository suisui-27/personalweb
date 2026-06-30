# Data Model / 数据模型文档

本文档描述站点内容入口、字段结构和页面消费关系。修改内容时优先编辑对应的数据文件或 MDX frontmatter。

## 总览

| 模块 | 数据入口 | 类型定义 | 页面 |
| --- | --- | --- | --- |
| 工业产品 | `src/content/portfolio/*.mdx` | `src/content/config.ts` + `src/data/types.ts` | `/portfolio/`、`/portfolio/[slug]/` |
| 平面设计 | `src/data/posters.ts` | `PosterItem` | `/posters/` |
| 摄影作品 | `src/data/photography.ts` | `PhotographyItem` | `/photography/` |
| 个人成长/荣誉 | `src/data/honors.ts` | `HonorItem` | `/honors/` |
| 自我介绍 | `src/data/profile.ts` | `Profile` | `/honors/` |

全站类型集中在 `src/data/types.ts`。四个二级页面共享暗色、金色强调和 GSAP 页面过渡，但不使用统一背景底图，内容本身是视觉主体。

## 1. Portfolio / 工业产品

| 属性 | 说明 |
| --- | --- |
| 数据源 | `src/content/portfolio/*.mdx` |
| Schema | `src/content/config.ts` |
| 列表页 | `src/pages/portfolio/index.astro` |
| 详情页 | `src/pages/portfolio/[slug].astro` |
| 卡片组件 | `src/components/WorkCard.astro` |
| 图片目录 | `public/assets/portfolio/{slug}/` |

### Frontmatter

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 是 | - | 产品标题 |
| `category` | `PortfolioCategory` | 是 | - | `"3D 模型"` / `"产品设计"` / `"产品概念"` / `"界面设计"` |
| `cover` | `string` | 是 | - | 封面路径 |
| `summary` | `string` | 是 | - | 摘要 |
| `year` | `string` | 是 | - | 年份 |
| `featured` | `boolean` | 否 | `false` | 是否作为精选内容 |
| `tags` | `string[]` | 否 | `[]` | 标签 |
| `gallery` | `{ src, caption }[]` | 否 | `[]` | 详情页图廊 |

工业产品列表页使用等宽等高卡片，封面图固定 `object-fit: contain`，保证预览图片完整显示。

## 2. Posters / 平面设计

| 属性 | 说明 |
| --- | --- |
| 数据源 | `src/data/posters.ts` |
| 类型 | `PosterItem` |
| 页面 | `src/pages/posters.astro` |
| 组件 | `src/components/PosterCarousel.tsx` |
| 图片目录 | `public/assets/posters/` |

### 字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `src` | `string` | 海报图片路径 |
| `title` | `string` | 海报标题 |
| `category` | `PosterCategory` | 分类 |

`PosterCarousel` 会预载图片。快速切换时，目标图片未完成加载前保留当前图并显示加载提示，避免出现状态切换但图片停留在旧图的问题。

## 3. Photography / 摄影作品

| 属性 | 说明 |
| --- | --- |
| 数据源 | `src/data/photography.ts` |
| 类型 | `PhotographyItem` |
| 页面 | `src/pages/photography.astro` |
| 图片目录 | `public/assets/photography/` |

### 字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `src` | `string` | 照片路径 |
| `name` | `string` | 展示名称，建议包含题目与地点 |

摄影页是沉浸式单张展示：

- 每 5 秒随机切换一张。
- 点击屏幕随机切换一张。
- 点击 `List` 进入列表。
- 点击列表元素后关闭列表并进入对应照片的沉浸式展示。

## 4. Honors / 个人成长与荣誉

| 属性 | 说明 |
| --- | --- |
| 荣誉数据 | `src/data/honors.ts` |
| 自我介绍数据 | `src/data/profile.ts` |
| 类型 | `HonorItem`、`Profile` |
| 页面 | `src/pages/honors.astro` |
| 文件目录 | `public/assets/honors/` |

### HonorItem 字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `src` | `string` | 图片或文档路径 |
| `preview` | `string | undefined` | 可选预览图，常用于文档类荣誉 |
| `title` | `string` | 荣誉标题 |
| `category` | `HonorCategory` | 荣誉分类 |
| `year` | `string` | 年份或学年 |
| `kind` | `"image" | "document" | undefined` | 文件类型，默认可按图片处理 |

图片荣誉示例：

```ts
{
  src: "/assets/honors/2025-industrial-design-second.jpg",
  title: "2025 年全国大学生工业设计大赛北京市二等奖",
  category: "工业设计竞赛",
  year: "2025",
  kind: "image"
}
```

文档荣誉示例：

```ts
{
  src: "/assets/honors/25工业设计大赛获奖名单.docx",
  title: "2025 工业设计大赛获奖名单",
  category: "文档材料",
  year: "2025",
  kind: "document"
}
```

### Profile 字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | `string` | 姓名或署名 |
| `tagline` | `string` | 一句话定位 |
| `bio` | `string[]` | 自我介绍段落 |
| `education` | `EducationRecord[]` | 教育经历 |
| `skills` | `SkillGroup[]` | 技能分组 |
| `interests` | `string[]` | 兴趣方向 |

当前 `/honors/` 页面会使用 `profile.tagline`、`profile.bio` 和 `profile.education` 组成个人成长叙事。

## 资源目录

```text
public/assets/
  hero/
  portfolio/{slug}/
  posters/
  photography/
  honors/
  readme/
```

## 修改指南

| 目标 | 修改文件 |
| --- | --- |
| 新增/修改工业产品 | `src/content/portfolio/*.mdx` |
| 新增/修改平面海报 | `src/data/posters.ts` |
| 新增/修改摄影作品 | `src/data/photography.ts` |
| 新增/修改荣誉文件 | `src/data/honors.ts` |
| 修改自我介绍 | `src/data/profile.ts` |
| 修改字段定义 | `src/data/types.ts` |
| 修改页面风格 | `src/styles/global.css` |
| 修改页面过渡 | `src/layouts/BaseLayout.astro` |
