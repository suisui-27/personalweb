/**
 * 全站数据模型类型定义
 *
 * 四大模块 + 个人介绍，每个模块对应一个数据文件和一套接口。
 * AI 阅读：所有数据入口见 `data-model.md`。
 */

/* ── 产品 / Portfolio ── */
/** 产品分类 */
export type PortfolioCategory = "3D 模型" | "产品设计" | "产品概念" | "界面设计";

/** 单条作品 gallery 图片 */
export interface PortfolioGalleryImage {
  src: string;
  caption: string;
}

/** 作品 frontmatter 结构（对应 src/content/portfolio/*.mdx） */
export interface PortfolioItem {
  title: string;
  category: PortfolioCategory;
  cover: string;
  summary: string;
  year: string;
  featured: boolean;
  tags: string[];
  gallery: PortfolioGalleryImage[];
}

/* ── 平面 / Posters ── */
/** 平面设计分类 */
export type PosterCategory =
  | "节庆视觉"
  | "专题宣传"
  | "校庆视觉"
  | "校园视觉"
  | "栏目视觉"
  | "校友故事"
  | "周年专题";

/** 单张海报（对应 src/data/posters.ts） */
export interface PosterItem {
  src: string;
  title: string;
  category: PosterCategory;
}

/* ── 摄影 / Photography ── */
/** 单张摄影作品（对应 src/data/photography.ts） */
export interface PhotographyItem {
  src: string;
  place: string;
  note: string;
}

/* ── 荣誉 / Honors ── */
/** 荣誉分类 */
export type HonorCategory = "工业设计竞赛" | "设计竞赛" | "奖学金" | "文档材料";

/** 单条荣誉奖项（对应 src/data/honors.ts） */
export interface HonorItem {
  src: string;
  title: string;
  category: HonorCategory;
  year: string;
}

/* ── 关于 / Profile ── */
/** 教育经历 */
export interface EducationRecord {
  period: string;
  school: string;
  major: string;
  degree: string;
}

/** 技能分组 */
export interface SkillGroup {
  category: string;
  items: string[];
}

/** 个人介绍数据（对应 src/data/profile.ts） */
export interface Profile {
  name: string;
  tagline: string;
  bio: string[];
  education: EducationRecord[];
  skills: SkillGroup[];
  interests: string[];
}
