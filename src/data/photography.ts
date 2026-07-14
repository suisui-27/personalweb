import type { PhotographyItem } from "./types";
import items from "./photography.json";

/**
 * 摄影作品数据
 *
 * 图片目录: public/assets/photography/
 * 展示页面: /photography/ 以及首页摄影区域
 * 展示方式: 沉浸式单张切换 + List 模式
 */
export const photographyItems = items as PhotographyItem[];
