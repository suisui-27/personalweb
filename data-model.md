# Data Model / 数据模型

本文档记录站点内容入口、字段结构和页面消费关系。修改内容时优先编辑对应数据文件或 MDX frontmatter；少量页面展示文案目前直接维护在页面模板中。

## 总览

| 模块 | 数据入口 | 类型定义 | 页面 |
| --- | --- | --- | --- |
| 工业产品 | `src/content/portfolio/*.mdx` | `src/content/config.ts`、`src/data/types.ts` | `/portfolio/`、`/portfolio/[slug]/` |
| 平面设计 | `src/data/posters.ts` | `PosterItem` | `/posters/` |
| 摄影作品 | `src/data/photography.ts` | `PhotographyItem` | `/photography/` |
| 个人介绍正文 | `src/data/selfIntro.ts` | 轻量对象，未集中进 `types.ts` | `/honors/` |
| 荣誉奖项 | `src/data/honors.ts` | `HonorItem` | `/honors/`、`/honors/[slug]/` |
| 旧版个人资料 | `src/data/profile.ts` | `Profile` | 当前不再作为 `/honors/` 主展示数据源 |

## 1. Portfolio / 工业产品

| 属性 | 说明 |
| --- | --- |
| 数据源 | `src/content/portfolio/*.mdx` |
| Schema | `src/content/config.ts` |
| 列表页 | `src/pages/portfolio/index.astro` |
| 详情页 | `src/pages/portfolio/[slug].astro` |
| 卡片组件 | `src/components/WorkCard.astro` |
| 图片目录 | `public/assets/portfolio/{slug}/` |

### Frontmatter 字段

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 是 | - | 产品标题 |
| `category` | `PortfolioCategory` | 是 | - | 分类 |
| `cover` | `string` | 是 | - | 封面路径 |
| `summary` | `string` | 是 | - | 摘要 |
| `year` | `string` | 是 | - | 年份 |
| `featured` | `boolean` | 否 | `false` | 是否精选 |
| `tags` | `string[]` | 否 | `[]` | 标签 |
| `gallery` | `{ src, caption }[]` | 否 | `[]` | 详情页图片 |

工业产品详情页标题使用 `--title-chars` 按标题字数动态计算字号，目标是保持单行显示。详情页主要内容宽度为 `1060px`。

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
| `name` | `string` | 展示名称，建议包含题目或地点 |

摄影页内部有两种状态：

- 沉浸式单张照片展示。
- `List` 列表模式，按钮会切换为 `Back`，按钮宽度固定以避免抖动。

## 4. Personal Growth / 个人成长

| 属性 | 说明 |
| --- | --- |
| 页面 | `src/pages/honors.astro` |
| 自我介绍正文 | `src/data/selfIntro.ts` |
| 荣誉数据 | `src/data/honors.ts` |
| 人物图片 | `public/assets/profile/home-portrait-cutout.png` |

### `selfIntro.ts`

当前页面使用：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | `string` | 页面姓名，当前为 `Li Suisui` |
| `paragraphs` | `string[]` | 自我介绍段落 |

`role`、`discipline` 若存在于 `selfIntro.ts`，当前页面不再直接读取；顶部身份文案改为页面模板内维护。

### 页面内维护的身份与教育经历

在 `src/pages/honors.astro` 中维护：

```ts
const educationItems = [
  {
    period: "2025 — 至今",
    school: "哈尔滨工业大学",
    major: "机械工程",
  },
  {
    period: "2021 — 2025",
    school: "中国农业大学",
    major: "机械类 · 工业设计",
  },
];
```

页面顶部展示：

```text
Li Suisui
哈尔滨工业大学机械工程硕士
工业设计背景 / 机械工程方向
```

教育经历显示在方向说明下方，按日期、学校、专业三列左对齐。

## 5. Honors / 荣誉奖项

| 属性 | 说明 |
| --- | --- |
| 数据源 | `src/data/honors.ts` |
| 类型 | `HonorItem` |
| 列表消费 | `src/pages/honors.astro` |
| 详情页 | `src/pages/honors/[slug].astro` |
| 文件目录 | `public/assets/honors/` |

### HonorItem 字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `slug` | `string` | URL slug |
| `src` | `string` | 图片或文档路径 |
| `preview` | `string | undefined` | 可选预览图 |
| `title` | `string` | 荣誉标题 |
| `category` | `HonorCategory` | 荣誉分类 |
| `year` | `string` | 年份或学年 |
| `kind` | `"image" | "document" | undefined` | 文件类型 |

列表页目前只展示荣誉标题，样式保持简洁。详情页标题与工业产品详情页一致，使用 `--title-chars` 动态计算字号，目标是单行显示。

### 示例

```ts
{
  slug: "2025-industrial-design-second",
  src: "/assets/honors/2025-industrial-design-second.jpg",
  title: "全国大学生工业设计大赛北京市二等奖",
  category: "工业设计竞赛",
  year: "2025",
  kind: "image"
}
```

## 资源目录

```text
public/assets/
  hero/
  portfolio/{slug}/
  posters/
  photography/
  honors/
  profile/
  readme/
```

## 修改指南

| 目标 | 修改文件 |
| --- | --- |
| 新增或修改工业产品 | `src/content/portfolio/*.mdx` |
| 新增或修改平面海报 | `src/data/posters.ts` |
| 新增或修改摄影作品 | `src/data/photography.ts` |
| 修改个人介绍段落 | `src/data/selfIntro.ts` |
| 修改个人成长页顶部身份与教育经历 | `src/pages/honors.astro` |
| 新增或修改荣誉文件 | `src/data/honors.ts` |
| 修改字段类型 | `src/data/types.ts` |
| 修改页面风格 | `src/styles/global.css` |
| 修改全站加载器或主题切换 | `src/layouts/BaseLayout.astro`、`src/styles/global.css` |
| 修改三级详情页返回入口或标题行为 | `src/pages/portfolio/[slug].astro`、`src/pages/honors/[slug].astro`、`src/styles/global.css` |
