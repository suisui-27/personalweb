# Data Model / 数据模型

本文档描述站点四个内容模块的数据结构、文件目录、页面消费关系，以及本地上传工具的写入规则。业务代码与本文档应同步维护。

## 总览

| 模块 | 数据源 | 类型定义 | 资源目录 | 页面 |
| --- | --- | --- | --- | --- |
| 工业产品 | `src/content/portfolio/*.mdx` | `src/content/config.ts`、`PortfolioItem` | `public/assets/portfolio/{slug}/` | `/portfolio/`、`/portfolio/[slug]/` |
| 平面设计 | `src/data/posters.json` | `PosterItem` | `public/assets/posters/` | `/posters/` |
| 摄影作品 | `src/data/photography.json` | `PhotographyItem` | `public/assets/photography/` | `/photography/` |
| 个人成长 | `src/data/honors.json` | `HonorItem`、`HonorMaterial` | `public/assets/honors/` | `/honors/`、`/honors/[slug]/` |
| 个人介绍 | `src/data/selfIntro.ts` | 轻量对象 | `public/assets/profile/` | `/honors/` |

`src/data/posters.ts`、`photography.ts`、`honors.ts` 是带类型的导出层。可变内容保存在 JSON 中，页面仍从对应的 `.ts` 文件导入。

## 本地内容工作台

开发环境运行 `pnpm dev` 后，连续点击三次主导航或首页中的任一内容入口，会打开对应上传浮窗：

- 工业产品
- 平面设计
- 摄影作品
- 个人成长

在任意非首页页面连续点击三次导航栏左侧的“主页”，会打开全屏内容编辑工作台。工作台可以筛选和编辑全部现有内容：

- 工业产品：名称、类型、年份、简介，可选替换封面；MDX 正文和图库保持不变。
- 平面设计：名称、类型、简介，可选替换图片。
- 摄影作品：名称、地点，可选替换图片。
- 荣誉奖项：年份、名称；证明材料可以保留、追加或整体替换。

保存触发 Astro 开发热更新后，工作台会自动重新打开并恢复到刚才编辑的分类和条目。

实现位置：

| 职责 | 文件 |
| --- | --- |
| 浮窗结构与交互 | `src/components/LocalContentUploader.astro` |
| 编辑工作台结构与交互 | `src/components/LocalContentEditor.astro` |
| 本地文件和数据写入 | `src/integrations/localContentUpload.mjs` |
| 开发集成注册 | `astro.config.mjs` |
| 浮窗样式 | `src/styles/global.css` |

安全边界：

- 上传和编辑工作台只在 `import.meta.env.DEV` 为真时动态加载和渲染。
- 写入接口只通过 Astro 的 `astro:server:setup` 开发钩子注册。
- 静态生产构建不包含工作台脚本或可用的读写接口。
- 单次请求上限为 250 MB。
- 上传只写入当前项目，不会自动提交或推送 Git。

推荐更新流程：

```text
pnpm dev
  -> 三连击内容入口新增，或三连击“主页”编辑
  -> 填写资料并保存
  -> 页面检查
  -> git status / git diff
  -> git add / commit / push
```

## 1. 工业产品

### 上传字段

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | 是 | 产品名称 |
| `category` | `PortfolioCategory` | 是 | 产品类型 |
| `year` | `string` | 是 | 产品年份 |
| `summary` | `string` | 是 | 产品简介 |
| `slug` | `string` | 否 | URL 标识；留空时根据名称生成 |
| `files[0]` | 图片 | 是 | 产品封面 |

### MDX Frontmatter

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| `title` | `string` | 是 | - | 产品名称 |
| `category` | `PortfolioCategory` | 是 | - | `3D 模型`、`产品设计`、`产品概念`、`界面设计` |
| `cover` | `string` | 是 | - | 封面路径 |
| `summary` | `string` | 是 | - | 产品简介 |
| `year` | `string` | 是 | - | 年份 |
| `featured` | `boolean` | 否 | `false` | 是否精选 |
| `tags` | `string[]` | 否 | `[]` | 标签 |
| `gallery` | `{ src, caption }[]` | 否 | `[]` | 详情图片 |

上传后生成：

```text
public/assets/portfolio/{slug}/cover.{ext}
src/content/portfolio/{slug}.mdx
```

自动生成的 MDX 只包含完整 Frontmatter、产品简介和 `AI_DETAIL_TODO` 注释。三级页面的叙事、章节、图库说明和最终排版继续交给 AI 在该 MDX 中完善。

## 2. 平面设计

### PosterItem

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `src` | `string` | 图片路径 |
| `title` | `string` | 作品名称 |
| `category` | `PosterCategory` | 作品类型 |
| `summary` | `string` | 作品简介 |

上传图片保存到 `public/assets/posters/{slug}.{ext}`，随后把记录追加到 `src/data/posters.json`。轮播标题显示“名称 — 类型”，下方显示简介。

## 3. 摄影作品

### PhotographyItem

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `src` | `string` | 图片路径 |
| `name` | `string` | 作品名称，不包含地点 |
| `location` | `string` | 拍摄地点 |

上传图片保存到 `public/assets/photography/{slug}.{ext}`，随后把记录追加到 `src/data/photography.json`。

页面统一组合为：

```text
{name} - {location}
```

该组合同时用于沉浸模式标题、List 模式名称和图片替代文本。已有摄影数据已根据图片内容拆分并补充地点。

## 4. 个人成长与荣誉

### HonorItem

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `slug` | `string` | 详情页 URL 标识 |
| `title` | `string` | 奖项名称 |
| `category` | `HonorCategory` | 奖学金、工业设计竞赛或设计竞赛 |
| `year` | `string` | 完整年份或学年，例如 `2025-2026` |
| `displayYear` | `string` | 列表短年份；学年默认取结束年份 |
| `materials` | `HonorMaterial[]` | 证明材料，可为空、可多文件、可混合格式 |

### HonorMaterial

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `src` | `string` | 证明材料路径 |
| `title` | `string` | 材料名称，上传时取原文件名 |
| `kind` | `"image" | "document"` | 图片直接预览，其他文件显示打开按钮 |
| `label` | `string` | 扩展名标签，例如 `JPG`、`PDF`、`DOCX` |

上传文件保存为：

```text
public/assets/honors/{slug}-1.{ext}
public/assets/honors/{slug}-2.{ext}
...
```

上传时不要求填写分类：名称包含“奖学金”时归为奖学金，包含“工业设计”时归为工业设计竞赛，其余归为设计竞赛。没有证明材料时 `materials` 为空，详情页显示“证明材料待补充”。

## 5. 个人介绍

`src/data/selfIntro.ts` 保存个人介绍：

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | `string` | 页面姓名 |
| `paragraphs` | `string[]` | ABOUT 段落，允许少量受控 HTML 高亮 |

姓名、身份、方向和教育经历目前在 `src/pages/honors.astro` 中维护，人物照片为 `public/assets/profile/home-portrait-cutout.png`。

## 命名与冲突规则

- 英文、数字名称会转换为小写连字符 slug。
- 纯中文名称使用“模块 + 年份 + 内容哈希”生成稳定 slug。
- 已存在同名记录时自动追加 `-2`、`-3`，不会覆盖旧记录。
- 资产路径始终由服务端生成，不接受客户端传入的磁盘路径。

## 修改索引

| 目标 | 文件 |
| --- | --- |
| 修改工业产品字段 | `src/content/config.ts`、`src/data/types.ts`、上传集成 |
| 新增或修改工业产品详情 | `src/content/portfolio/*.mdx` |
| 修改平面设计数据 | `src/data/posters.json` |
| 修改摄影数据 | `src/data/photography.json` |
| 修改荣誉数据 | `src/data/honors.json` |
| 修改列表类型 | `src/data/types.ts` |
| 修改个人介绍 | `src/data/selfIntro.ts` |
| 修改浮窗字段或文案 | `src/components/LocalContentUploader.astro` |
| 修改编辑工作台 | `src/components/LocalContentEditor.astro` |
| 修改写入和命名规则 | `src/integrations/localContentUpload.mjs` |
| 修改视觉样式 | `src/styles/global.css` |
