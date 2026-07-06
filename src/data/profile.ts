import type { Profile } from "./types";

/**
 * 个人介绍数据
 *
 * 展示页面: /about/
 * 此数据驱动关于页面的所有内容渲染。
 * 修改此文件即可更新关于页面，无需改动 .astro 模板。
 */
export const profile: Profile = {
  name: "隋",
  tagline: "工业设计 → 机械工程 | 把设计直觉落到可验证的工程细节",
  bio: [
    "本科工业设计，研究生机械工程。在产品设计、视觉传达、摄影和竞赛中积累了跨学科实践经验。",
    "相信好设计不止于造型——它需要对问题的精准定义、对结构的清醒认知，以及对材料和场景的尊重。",
    "这个网站本身就是一个实验：用 Astro + React + MDX 搭建可长期维护的个人作品集，让内容更新像写文档一样简单。",
  ],
  education: [
    {
      period: "2025 — 至今",
      school: "哈尔滨工业大学",
      major: "机械工程",
      degree: "硕士研究生",
    },
    {
      period: "2020 — 2024",
      school: "中国农业大学",
      major: "工业设计",
      degree: "本科",
    },
  ],
  skills: [
    {
      category: "产品设计",
      items: ["3D 建模", "产品概念", "造型推演", "CMF", "人因工程"],
    },
    {
      category: "视觉设计",
      items: ["海报设计", "品牌视觉", "信息架构", "排版"],
    },
    {
      category: "工程与工具",
      items: ["SolidWorks", "KeyShot", "Figma", "Three.js", "TypeScript"],
    },
    {
      category: "影像",
      items: ["风景摄影", "建筑空间记录", "色彩与构图"],
    },
  ],
  interests: ["摄影旅行", "机械结构", "自然纹理", "视觉系统", "可持续设计"],
};
