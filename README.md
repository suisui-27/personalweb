# Personal Web / 个人展示网站

<img src="public/assets/readme/cover.jpg" alt="README cover" width="284">

> 我们会做的越来越好的

---

A static personal portfolio built with Astro, React, MDX, and a light Three.js accent. The project is organized for long-term content updates: pages, components, content, data, and assets are separated by responsibility.

这是一个基于 Astro、React、MDX 和轻量 Three.js 点缀的静态个人展示网站。项目目标是长期维护：页面、组件、内容、数据和资源按职责拆开，不再把所有内容写进一个 HTML/CSS/JS 文件里。

## Install And Run / 安装与启动

```bash
pnpm install
pnpm dev
```

Local development usually opens at:

本地开发地址通常是：

```text
http://127.0.0.1:4321/
```

Build and preview the static output:

构建并预览静态产物：

```bash
pnpm build
pnpm preview
```

Netlify uses the settings in `netlify.toml`. This repo is managed with pnpm, so keep `pnpm-lock.yaml` committed and do not add `package-lock.json`.

Netlify 会读取 `netlify.toml` 里的配置。本项目包管理器统一使用 pnpm，请提交 `pnpm-lock.yaml`，不要新增 `package-lock.json`。

## Project Structure / 项目结构

```text
src/
  components/        Reusable UI and interactive components / 可复用 UI 与交互组件
  content/
    portfolio/       Portfolio MDX entries / 作品 MDX 内容
  data/              Structured list data / 结构化列表数据
  layouts/           Shared page shell / 全站布局
  pages/             Static routes / 静态路由
  styles/            Global styles / 全局样式
public/assets/
  readme/            README images / README 图片
  hero/              Homepage hero images / 首页首屏图片
  portfolio/         Portfolio project assets / 作品资源
  posters/           Poster design images / 平面海报
  photography/       Photography images / 摄影照片
  honors/            Award images / 荣誉奖项图片
  reference/         Source mapping and archival references / 资源映射和归档参考
```

## Editing The Hero Image / 调整首页背景图

The homepage hero image is controlled in `src/styles/global.css` by `.hero-media`.

首页背景图在 `src/styles/global.css` 的 `.hero-media` 中调整。

```css
.hero-media {
  --hero-image-y: -48px;
  --hero-image-scale: 1.08;
}
```

- `--hero-image-y` controls vertical movement. Use negative values to push the image upward, for example `-64px` or `-96px`.
- `--hero-image-scale` slightly enlarges the image so moving it upward will not expose a hard edge. Keep it around `1.06` to `1.12`.
- The horizontal position remains `center`; only the vertical offset should usually be changed.

- `--hero-image-y` 控制垂直位置。负数会把图片往上推，例如 `-64px`、`-96px`。
- `--hero-image-scale` 会稍微放大图片，避免往上推时露出割裂边缘。建议保持在 `1.06` 到 `1.12`。
- 水平位置固定为 `center`，通常只需要调垂直偏移。

## Editing Content / 如何修改内容

### Portfolio / 作品

Add or edit MDX files in `src/content/portfolio/`.

新增或修改作品，请编辑 `src/content/portfolio/` 下的 MDX 文件。

Each entry controls its title, category, cover, summary, year, tags, gallery, and body text:

每个文件通过 frontmatter 管理标题、分类、封面、摘要、年份、标签、详情图和正文：

```mdx
---
title: "共享单车摆渡机器人"
category: "3D 模型"
cover: "/assets/portfolio/bike-shuttle-robot/cover.jpg"
summary: "面向共享单车调度场景的摆渡机器人概念设计。"
year: "2024"
tags: ["3D 建模", "服务机器人"]
gallery:
  - src: "/assets/portfolio/bike-shuttle-robot/render.jpg"
    caption: "渲染图：整体造型与使用场景"
---

Write the project story here.
在这里写项目说明。
```

Related images should live beside that project, for example:

相关图片应放在对应项目文件夹中，例如：

```text
public/assets/portfolio/bike-shuttle-robot/cover.jpg
public/assets/portfolio/bike-shuttle-robot/render.jpg
public/assets/portfolio/bike-shuttle-robot/exploded-view.jpg
```


### Photography / 摄影

Edit `src/data/photography.ts` to change photo order, place names, and notes. Put images in `public/assets/photography/`.

修改摄影列表、排序、地点和说明，请编辑 `src/data/photography.ts`。图片放在 `public/assets/photography/`。

### Posters / 平面设计

Edit `src/data/posters.ts` to change poster order, titles, and categories. Put images in `public/assets/posters/`.

修改平面设计海报，请编辑 `src/data/posters.ts`。图片放在 `public/assets/posters/`。

### Honors / 荣誉

Edit `src/data/honors.ts` to change awards. Put images in `public/assets/honors/`.

修改荣誉奖项，请编辑 `src/data/honors.ts`。图片放在 `public/assets/honors/`。

## Editing UI / 如何修改界面

- Navigation and document shell: `src/layouts/BaseLayout.astro`
- Work cards: `src/components/WorkCard.astro`
- Homepage and section order: `src/pages/index.astro`
- Portfolio list and detail pages: `src/pages/portfolio/`
- Photography page: `src/pages/photography.astro`
- Honors page: `src/pages/honors.astro`
- Global spacing, colors, typography, image layout: `src/styles/global.css`
- Lightweight Three.js accent: `src/components/ThreeAccent.tsx`

- 导航和全站外壳：`src/layouts/BaseLayout.astro`
- 作品卡片：`src/components/WorkCard.astro`
- 首页和板块顺序：`src/pages/index.astro`
- 作品列表和详情页：`src/pages/portfolio/`
- 摄影页面：`src/pages/photography.astro`
- 荣誉页面：`src/pages/honors.astro`
- 全局间距、颜色、字体、图片布局：`src/styles/global.css`
- 轻量 Three.js 点缀：`src/components/ThreeAccent.tsx`

## Asset Naming / 资源命名规则

Use descriptive English file names and keep images inside their module folder. Prefer `cover.jpg`, `render.jpg`, `exploded-view.jpg`, or location-based names over generic names like `photo-01.jpg`.

资源文件建议使用有意义的英文名称，并放在对应模块文件夹中。优先使用 `cover.jpg`、`render.jpg`、`exploded-view.jpg` 或地点名称，不再使用 `photo-01.jpg` 这类难以维护的编号名。

Examples / 示例：

```text
public/assets/hero/home-hero.jpg
public/assets/portfolio/pet-travel-cup/cover.jpg
public/assets/photography/nalati-grassland.jpg
public/assets/honors/2025-industrial-design-second.jpg
```

## Notes / 备注

The old root-level `index.html`, `styles.css`, and `script.js` are left untouched for now to preserve earlier uncommitted work. The active site is the Astro app, and Netlify publishes `dist/`.

根目录旧版 `index.html`、`styles.css`、`script.js` 暂时保留，用来避免误删之前未提交的改动。当前正式站点以 Astro 应用为准，Netlify 发布 `dist/`。