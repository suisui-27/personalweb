# Personal Web / 个人展示网站

<img src="public/assets/readme/cover.jpg" alt="README cover" width="284">

> 我们会做的越来越好的

---

## 技术栈

| 技术 | 用途 |
|------|------|
| **Astro 5** | 静态站点框架，路由 + 内容集合 |
| **React 19** | 交互组件（轮播、Three.js 渲染） |
| **MDX** | 作品正文编写 |
| **Three.js** | 首页轻量 3D 点缀（金色 TorusKnot） |
| **TypeScript** | 全站类型安全，数据模型集中在 `src/data/types.ts` |
| **pnpm** | 包管理器（唯一，不要混用 npm/yarn） |
| **Netlify** | 部署平台，读取 `netlify.toml` |

## 快速开始

```bash
pnpm install      # 安装依赖
pnpm dev          # 本地开发 → http://127.0.0.1:4321/
pnpm build        # 构建静态产物到 dist/
pnpm preview      # 预览构建结果
```

## 项目结构

```
personalweb/
├── src/
│   ├── components/          # 可复用 UI 与交互组件
│   │   ├── WorkCard.astro       # 产品卡片
│   │   ├── PosterCarousel.tsx   # 平面设计轮播（React）
│   │   └── ThreeAccent.tsx      # 首页 3D 点缀（React + Three.js）
│   ├── content/
│   │   ├── config.ts            # 内容集合 Schema
│   │   └── portfolio/           # 作品 MDX 内容（每篇 = 一条作品）
│   ├── data/                    # 结构化数据（TS 文件）
│   │   ├── types.ts             # ★ 全站类型定义
│   │   ├── posters.ts           # 平面海报数据
│   │   ├── photography.ts       # 摄影数据
│   │   ├── honors.ts            # 荣誉数据
│   │   └── profile.ts           # 关于页数据
│   ├── layouts/
│   │   └── BaseLayout.astro     # 全站布局（导航 + 页脚）
│   ├── pages/                   # 路由
│   │   ├── index.astro              # 首页（四大模块聚合）
│   │   ├── about.astro              # 关于
│   │   ├── portfolio/index.astro    # 产品列表
│   │   ├── portfolio/[slug].astro   # 产品详情
│   │   ├── posters.astro            # 平面设计
│   │   ├── photography.astro        # 摄影
│   │   └── honors.astro             # 荣誉
│   └── styles/
│       └── global.css           # 全局样式
├── public/assets/               # 静态资源
│   ├── hero/                        # 首页背景图
│   ├── portfolio/{slug}/            # 产品图片（按项目分文件夹）
│   ├── posters/                     # 海报图片
│   ├── photography/                 # 摄影照片
│   └── honors/                      # 荣誉证书图片
├── data-model.md                # ★ 数据模型文档（AI 阅读）
├── astro.config.mjs             # Astro 配置
├── netlify.toml                 # Netlify 部署配置
└── package.json
```

## 四大模块

| 模块 | 路由 | 数据源 | 展示方式 |
|------|------|--------|---------|
| **产品** | `/portfolio/` | `src/content/portfolio/*.mdx` | 卡片网格 → 详情页 |
| **平面** | `/posters/` | `src/data/posters.ts` | 轮播 |
| **摄影** | `/photography/` | `src/data/photography.ts` | 横向沉浸式画廊 |
| **荣誉** | `/honors/` | `src/data/honors.ts` | 编号列表卡片 |

另有 **关于** 页（`/about/`），数据来自 `src/data/profile.ts`。

## 数据流

```
内容/数据文件                类型定义              页面
─────────────              ─────────            ─────
MDX frontmatter  ──┐
posters.ts       ──┤
photography.ts   ──┼──→  src/data/types.ts  ──→  Astro pages
honors.ts        ──┤         (接口定义)          (.astro / .tsx)
profile.ts       ──┘
```

所有数据入口和字段定义详见 **[data-model.md](./data-model.md)**。

## 如何修改内容

### 新增作品

1. 在 `src/content/portfolio/` 下新建 `.mdx` 文件（文件名即 URL slug）
2. 填写 frontmatter（title, category, cover, summary, year, tags, gallery）
3. 把图片放到 `public/assets/portfolio/{slug}/`
4. 正文写在 frontmatter 下方

### 修改海报/摄影/荣誉

直接编辑对应的 `src/data/*.ts` 文件，添加或修改数组条目即可。

### 修改个人介绍

编辑 `src/data/profile.ts`，关于页面会自动更新。

### 修改界面样式

全局样式集中在 `src/styles/global.css`，包含：
- CSS 变量（颜色、间距）定义在 `:root`
- 响应式断点：980px / 720px / 480px
- 自定义滚动条

### 修改导航

编辑 `src/layouts/BaseLayout.astro` 中的 `navItems` 数组。

## 首页背景图调整

首页 hero 背景图在 `src/styles/global.css` 的 `.hero-media::after` 中引用：

```css
.hero-media::after {
  background-image: url("/assets/hero/home-hero.jpg");
  background-position: center var(--hero-image-y);
  background-size: 100% auto;
}
```

图片文件放在 `public/assets/hero/home-hero.jpg`。

## 资源命名规则

使用有意义的英文名称，按模块分文件夹：

```
public/assets/portfolio/bike-shuttle-robot/cover.jpg
public/assets/posters/2024-spring-festival.jpg
public/assets/photography/lenggacuo-01.jpg
public/assets/honors/2025-industrial-design-second.jpg
```

## 备注

- 根目录 `index.html`、`styles.css`、`script.js` 是旧版静态站点，已弃用，保留仅供历史参考
- 当前正式站点以 Astro 应用为准，Netlify 发布 `dist/`
- 包管理器统一使用 pnpm，提交 `pnpm-lock.yaml`，不要新增 `package-lock.json`
