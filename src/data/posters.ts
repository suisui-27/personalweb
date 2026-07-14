import type { PosterItem } from "./types";
import items from "./posters.json";

/**
 * 平面设计海报数据
 *
 * 图片目录: public/assets/posters/
 * 展示组件: PosterCarousel.tsx
 * 展示页面: /posters/ 以及首页平面设计区域
 */
export const posterItems = items as PosterItem[];
