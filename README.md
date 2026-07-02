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

## 页面与响应式规则

所有页面以黑色背景、细线边界、金色强调和克制的动效为统一视觉语言。四个二级页面不使用统一背景底图，内容本身是视觉主体。进入网站、站内跳转等待和图片素材加载统一使用 `src/layouts/BaseLayout.astro` 中的 3D cube loader。二级页和三级页支持深浅色主题切换，默认深色，浅色状态会写入 `localStorage` 并在页面间保留。

| 页面 | 路由 | 数据来源 | PC 端表现 | 移动端表现 |
| --- | --- | --- | --- | --- |
| 首页 | `/` | `src/pages/index.astro` | 首屏保留首页背景与四个入口，入口文字靠近上方分割线，整体不滚动 | 入口与导航信息压缩到移动端视口内，保持首页式无滚动体验 |
| 工业产品 | `/portfolio/` | `src/content/portfolio/*.mdx` | 四列等宽等高卡片；图片宽度铺满卡片媒体区，高度按比例自适应，顶部对齐，允许底部被容器裁切；卡片边框 hover 变白，图片只在容器内缩放 | 单列卡片；图片宽度铺满并完整展示，高度按图片比例自然展开；卡片高度随图片和文字内容自适应 |
| 工业产品详情 | `/portfolio/[slug]/` | `src/content/portfolio/*.mdx` | 暗色详情页，左上角提供“返回工业产品”入口，首屏展示项目文字与主图，正文和 gallery 继续沿用黑色作品集风格 | 单列详情布局；返回入口位于导航下方，主图完整展示，正文宽度收窄以保证阅读 |
| 平面设计 | `/posters/` | `src/data/posters.ts` | 无页面滚动；海报区域占据主要视觉空间，左右按钮位于海报外侧，切换为基础淡入淡出；资源预加载避免快速切换空白 | 无页面滚动；海报按移动端宽度缩放，标题与切换小组件位于图片下方，布局不挤入图片主体 |
| 摄影作品 | `/photography/` | `src/data/photography.ts` | 无页面滚动；沉浸式单张照片展示，图片留出页面边距，名称居中且为斜体；5 秒随机切换或点击切换，切换为淡入淡出；右上角 `List` 进入列表模式 | 无页面滚动；横图靠上展示而不是垂直居中，名称保持居中；照片完整清晰显示并保留边距 |
| 摄影列表 | `/photography/` 内部 List 模式 | `src/data/photography.ts` | 作为摄影页内部状态存在，保持同一导航和暗色风格；列表允许滚动，序号与名称同一行，长名称自动压缩字号 | 同样允许滚动；列表卡片适当增宽，序号与名称保持同一行 |
| 个人成长 | `/honors/` | `src/data/profile.ts`、`src/data/honors.ts` | 自我介绍、教育经历与荣誉内容分区展示；荣誉支持图片、Word 等文档，布局强调清晰和可扫描 | 内容改为单列阅读流，荣誉卡片随屏幕宽度重排，文本尺寸略收以提升密度 |

二级页面导航栏默认保持黑色底色。深浅色切换按钮位于“个人成长”右侧，PC 和移动端都与四个入口保持同一行；移动端字号略大于早期版本，避免分成两行。

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
- 全站加载器、素材加载器、滚动入场：`src/layouts/BaseLayout.astro` 与 `src/styles/global.css`。进入网站、站内跳转等待和图片素材加载统一使用 3D cube loader；旧的页面切换翻页/覆入动画已移除。favicon 使用 `public/favicon.png`，浏览器标题统一为 `SuisuiGallery`。
- 深浅色主题切换：`src/layouts/BaseLayout.astro` 与 `src/styles/global.css`。按钮位于导航栏“个人成长”右侧，使用日/月圆形切换样式；浅色主题通过 `html[data-theme="light"]` 覆盖二级页和三级页的背景、文字、边线、卡片、摄影列表和详情页表面。
- 工业产品卡片：`src/components/WorkCard.astro` 与 `src/styles/global.css`。组件只输出图片、分类年份、标题和摘要；PC 端卡片固定等高，图片宽度铺满且顶部对齐，允许底部裁切；移动端取消固定高度，图片完整展示。
- 工业产品详情页：`src/pages/portfolio/[slug].astro` 与 `src/styles/global.css`。三级页面左上方提供返回工业产品列表的入口，PC 为左右分栏，移动端为单列。
- 平面设计轮播：`src/components/PosterCarousel.tsx` 与 `src/styles/global.css`。React 负责预加载、切换状态和淡入淡出；CSS 控制 PC 端大海报舞台和移动端无滚动布局。
- 摄影作品：`src/pages/photography.astro`、`src/data/photography.ts` 与 `src/styles/global.css`。页面脚本负责随机顺序、5 秒切换、点击切换和 List 状态；CSS 控制沉浸式图片边距、名称、列表滚动和 PC/移动端差异。
- 个人成长：`src/pages/honors.astro`、`src/data/profile.ts`、`src/data/honors.ts` 与 `src/styles/global.css`。数据文件维护介绍、教育经历和荣誉；样式文件控制分区排版、荣誉卡片和文档类型展示。
- 产品卡片：`src/components/WorkCard.astro`
- 海报轮播：`src/components/PosterCarousel.tsx`
- 数据模型：`src/data/types.ts` 与 `data-model.md`

### 响应式维护要点

- PC 端工业产品以四列卡片为主，重点保证网格整齐、卡片等高、图片视觉占满宽度。
- 移动端工业产品以完整阅读和完整看图为主，`grid-auto-rows` 使用 `auto`，卡片和图片高度都随内容自然增长。
- 平面设计和摄影作品在 PC 与移动端都不应出现页面滚动条；只有摄影 `List` 状态允许内部列表滚动。
- 移动端导航必须保持“主页 + 四个入口”同一行，避免换行破坏二级页面顶部高度。
- 入口介绍文本在移动端换行后左对齐；摄影作品名称在移动端仍保持居中。

## 备注

- 根目录旧版静态站点文件和 `backup/` 仅作为历史备份参考。
- 正式构建产物输出到 `dist/`。
- 包管理器统一使用 pnpm，不新增 `package-lock.json` 或 `yarn.lock`。
