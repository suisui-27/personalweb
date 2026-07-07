import type { HonorItem } from "./types";

/**
 * 荣誉奖项数据
 *
 * 图片目录: public/assets/honors/
 * 展示页面: /honors/ 以及首页荣誉区域
 * 展示方式: 成长叙事 + 图片/文档混排
 */
export const honorItems: HonorItem[] = [
  {
    slug: "2025-industrial-design-second",
    src: "/assets/honors/2025-industrial-design-second.jpg",
    title: "全国大学生工业设计大赛北京市二等奖",
    category: "工业设计竞赛",
    year: "2025",
    kind: "image",
  },
  {
    slug: "2025-industrial-design-list",
    src: "/assets/honors/25工业设计大赛获奖名单.docx",
    title: "工业设计大赛获奖名单",
    category: "文档材料",
    year: "2025",
    kind: "document",
  },
  {
    slug: "2024-advertising-art-second",
    src: "/assets/honors/2024-advertising-art-second.jpg",
    title: "全国大学生广告艺术大赛北京市二等奖",
    category: "设计竞赛",
    year: "2024",
    kind: "image",
  },
  {
    slug: "2023-cultural-creative-design-third",
    src: "/assets/honors/2023-cultural-creative-design-third.jpg",
    title: "北京市大学生文创设计大赛三等奖",
    category: "设计竞赛",
    year: "2023",
    kind: "image",
  },
  {
    slug: "2022-2023-scholarship-third",
    src: "/assets/honors/2022-2023-scholarship-third.jpg",
    title: "2022-2023 学年中国农业大学三等奖学金",
    category: "奖学金",
    year: "2022-2023",
    kind: "image",
  },
  {
    slug: "2021-2022-scholarship-second",
    src: "/assets/honors/2021-2022-scholarship-second.jpg",
    title: "2021-2022 学年中国农业大学二等奖学金",
    category: "奖学金",
    year: "2021-2022",
    kind: "image",
  },
];
