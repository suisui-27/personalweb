# Personal Web / 个人作品集

<img src="public/assets/readme/cover.jpg" alt="README cover" width="284">

> 我们会做得越来越好的

## 技术栈

| 技术 | 用途 |
| --- | --- |
| Astro 5 | 静态站点框架，负责路由、页面和内容集合 |
| React 19 | 海报轮播等交互组件 |
| MDX | 工业产品详情正文 |
| GSAP + ScrollTrigger | 页面进出场、卡片入场和沉浸式图片切换动画 |
| Three.js | 首页轻量 3D 点缀 |
| TypeScript | 数据模型与交互脚本类型约束 |
| pnpm | 包管理器，安装依赖时优先使用 pnpm |

## 快速开始

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
```

本地开发地址通常是 `http://localhost:4321/`。

## 项目结构

```text
personalweb/
  src/
    components/
      PageHeader.astro
      PosterCarousel.tsx
      ThreeAccent.tsx
      WorkCard.astro
    content/
      config.ts
      portfolio/*.mdx
    data/
      honors.ts
      photography.ts
      posters.ts
      profile.ts
      types.ts
    layouts/
      BaseLayout.astro
    pages/
      index.astro
      portfolio/index.astro
      portfolio/[slug].astro
      posters.astro
      photography.astro
      honors.astro
    styles/
      global.css
  public/assets/
  data-model.md
```

## 四个二级页面

| 页面 | 路由 | 数据来源 | 展示方式 |
| --- | --- | --- | --- |
| 工业产品 | `/portfolio/` | `src/content/portfolio/*.mdx` | 等宽等高产品卡片，封面完整显示，点击进入详情 |
| 平面设计 | `/posters/` | `src/data/posters.ts` | React 轮播，图片预载，快速切换时显示加载状态 |
| 摄影作品 | `/photography/` | `src/data/photography.ts` | 完整清晰的沉浸式单张展示，5 秒随机切换，点击屏幕随机切换，支持 `List` 模式 |
| 个人成长 | `/honors/` + `src/data/profile.ts` | `src/data/honors.ts` | 自我介绍、教育路径、荣誉墙，支持图片和 Word 等文档 |

四个二级页面延续首页的暗色、金色强调和细线分隔，但不使用统一背景底图；作品、海报、照片和荣誉内容本身是视觉主体。进入二级页面、二级页面之间跳转、滚动入场均在 `src/layouts/BaseLayout.astro` 与 `src/styles/global.css` 中统一处理。

## 内容维护

### 新增工业产品

1. 在 `src/content/portfolio/` 新建 `.mdx` 文件，文件名就是 URL slug。
2. 填写 frontmatter：`title`、`category`、`cover`、`summary`、`year`、`featured`、`tags`、`gallery`。
3. 把图片放到 `public/assets/portfolio/{slug}/`。
4. 在 frontmatter 下方写详情正文。

### 修改平面设计

编辑 `src/data/posters.ts`。每条数据包含 `src`、`title`、`category`。

### 修改摄影作品

编辑 `src/data/photography.ts`。每张照片只需要：

```ts
{ src: "/assets/photography/lenggacuo-03.jpg", name: "题目 / 地点" }
```

页面只展示 `name`，后续可直接把 `name` 改成包含题目与地点的完整名称。

### 修改个人成长与荣誉

自我介绍和教育经历来自 `src/data/profile.ts`。荣誉来自 `src/data/honors.ts`，支持图片和文档：

```ts
{
  src: "/assets/honors/25工业设计大赛获奖名单.docx",
  title: "2025 工业设计大赛获奖名单",
  category: "文档材料",
  year: "2025",
  kind: "document"
}
```

图片类荣誉使用 `kind: "image"`。如需给文档配封面，可增加 `preview` 字段指向图片。

## 样式与交互位置

- 全局样式：`src/styles/global.css`
- 页面过渡、滚动入场：`src/layouts/BaseLayout.astro`
- 产品卡片：`src/components/WorkCard.astro`
- 海报轮播：`src/components/PosterCarousel.tsx`
- 数据模型：`src/data/types.ts` 与 `data-model.md`

## 备注

- 根目录旧版静态站点文件和 `backup/` 仅作为历史备份参考。
- 正式构建产物输出到 `dist/`。
- 包管理器统一使用 pnpm，不新增 `package-lock.json` 或 `yarn.lock`。
