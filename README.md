# SuisuiGallery / Personal Web

个人作品集网站，使用 Astro 构建，内容围绕工业产品、平面设计、摄影作品和个人成长四个入口组织。

<img src="public/assets/readme/cover.jpg" alt="README cover" width="284">

## 技术栈

| 技术 | 用途 |
| --- | --- |
| Astro 5 | 静态站点、路由、页面与内容集合 |
| React 19 | 海报轮播等交互组件 |
| MDX | 工业产品详情正文 |
| GSAP + ScrollTrigger | 页面入场、滚动入场和过渡动效 |
| Three.js | 首页轻量 3D 点缀 |
| TypeScript | 数据模型和交互脚本类型 |
| pnpm | 包管理器；安装依赖时优先使用 pnpm |

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
      LandingExperience.astro
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
      selfIntro.ts
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
      honors/[slug].astro
    styles/
      global.css
  public/assets/
  data-model.md
```

## 页面说明

| 页面 | 路由 | 主要数据来源 | 当前设计 |
| --- | --- | --- | --- |
| 首页 | `/` | `src/components/LandingExperience.astro` | 四个入口组成首屏；每次访问在图片和两个视频背景间随机。 |
| 工业产品 | `/portfolio/` | `src/content/portfolio/*.mdx` | 作品卡片网格，卡片链接到三级详情页。 |
| 工业产品详情 | `/portfolio/[slug]/` | `src/content/portfolio/*.mdx` | 与荣誉详情统一为 1060px 内容宽度；返回按钮对齐内容左侧；标题单行动态字号。 |
| 平面设计 | `/posters/` | `src/data/posters.ts` | 无页面滚动的海报浏览体验，图片预加载并淡入淡出切换。 |
| 摄影作品 | `/photography/` | `src/data/photography.ts` | 沉浸式单张照片展示；点击或定时随机切换；`List/Back` 按钮固定宽度。 |
| 个人成长 | `/honors/` | `src/data/selfIntro.ts`、`src/data/honors.ts`、页面内教育经历 | 顶部为头像、姓名、定位与教育经历；正文与荣誉奖项左右布局，移动端上下布局。 |
| 荣誉详情 | `/honors/[slug]/` | `src/data/honors.ts` | 与工业产品详情统一宽度；标题单行动态字号；支持图片和 docx 文档。 |

## 主题与布局

- 全站深浅色切换由 [BaseLayout.astro](src/layouts/BaseLayout.astro) 和 [global.css](src/styles/global.css) 控制。
- 浅色模式主背景为 `#f5f5f7`。
- 二级与三级页面导航栏使用相同主题切换按钮。
- 工业产品详情页和荣誉详情页共享 1060px 的主要内容宽度，返回按钮位于该内容宽度的左上角。
- 三级详情页标题通过 `--title-chars` 动态调整字号，尽量保持单行。

## 随机主页背景

首页背景由 `src/components/LandingExperience.astro` 统一管理，候选项为当前图片、工作室视频和 60fps 单色粒子曲面视频。

- 每次访问都使用保存在 `localStorage` 中的随机袋选择背景，三种背景均匀出现且不会连续重复；无法使用本地存储时仍会即时随机。
- 页面先完成选择，再创建对应的 `<img>` 或 `<video>`，一次访问只请求一套背景资源。
- 视频使用小体积 poster 立即占位；真实视频可播放后自动开始静音循环，并在页面重新可见或首次交互时重试播放。MP4 使用 `faststart` 便于渐进加载。
- 桌面端以统一的 16:9 构图坐标缩放，背景焦点、标题和入口保持固定的相对位置；移动端使用独立布局。
- 两个动态背景都把正放与倒放直接编码进 MP4，浏览器只需原生循环，不在播放终点执行脚本反转。
- 固定预览入口为 `/video-preview/`、`/video-preview-2/` 和 `/video-preview-3/`。第三个黑白雨面方案暂不加入随机池，确认采用后再启用。

## 内容维护

### 新增或修改工业产品

1. 在 `src/content/portfolio/` 新建或编辑 `.mdx` 文件，文件名即 URL slug。
2. 修改 frontmatter：`title`、`category`、`cover`、`summary`、`year`、`featured`、`tags`、`gallery`。
3. 图片放在 `public/assets/portfolio/{slug}/`。
4. 正文写在 frontmatter 下方。

### 修改平面设计

编辑 `src/data/posters.ts`。每条数据包含：

```ts
{ src: "/assets/posters/example.jpg", title: "标题", category: "节庆视觉" }
```

### 修改摄影作品

编辑 `src/data/photography.ts`。每条数据包含：

```ts
{ src: "/assets/photography/lenggacuo-03.jpg", name: "题目 / 地点" }
```

### 修改个人成长介绍

当前 `/honors/` 页面使用：

- `src/data/selfIntro.ts`：姓名和自我介绍段落。
- `src/pages/honors.astro`：顶部身份文案与教育经历列表。
- `src/data/honors.ts`：荣誉列表和荣誉详情页数据。

顶部身份当前为：

```text
Li Suisui
哈尔滨工业大学机械工程硕士
工业设计背景 / 机械工程方向
```

教育经历当前在 [honors.astro](src/pages/honors.astro) 中维护，展示为日期、学校、专业三列：

```text
2025 — 至今   哈尔滨工业大学   机械工程
2021 — 2025  中国农业大学     机械类 · 工业设计
```

### 修改荣誉奖项

编辑 `src/data/honors.ts`。示例：

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

`kind: "image"` 表示图片荣誉；`kind: "document"` 表示文档材料，通常指向 `.docx`。

## 样式维护位置

- 全局样式和响应式规则：`src/styles/global.css`
- 站点布局、导航、主题切换、加载器：`src/layouts/BaseLayout.astro`
- 工业产品卡片：`src/components/WorkCard.astro`
- 平面设计轮播：`src/components/PosterCarousel.tsx`
- 摄影页交互：`src/pages/photography.astro`
- 个人成长页结构：`src/pages/honors.astro`
- 荣誉详情页结构：`src/pages/honors/[slug].astro`

## 注意事项

- 不新增 `package-lock.json` 或 `yarn.lock`。
- 正式构建产物输出到 `dist/`。
- 个人照片当前使用 `public/assets/profile/home-portrait-cutout.png`。
