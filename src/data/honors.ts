import type { HonorItem } from "./types";
import items from "./honors.json";

/**
 * 荣誉奖项数据
 *
 * 图片目录: public/assets/honors/
 * 展示页面: /honors/ 以及首页荣誉区域
 * 展示方式: 成长叙事 + 图片/文档混排
 */
export const honorItems = items as HonorItem[];
