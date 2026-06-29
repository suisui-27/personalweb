import { defineCollection, z } from "astro:content";
import type { PortfolioCategory } from "../data/types";

/** Portfolio 内容集合 schema —— 对应 data-model.md 中的 PortfolioItem */
const portfolio = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    category: z.string() as z.ZodType<PortfolioCategory>,
    cover: z.string(),
    summary: z.string(),
    year: z.string(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    gallery: z
      .array(
        z.object({
          src: z.string(),
          caption: z.string(),
        })
      )
      .default([]),
  }),
});

export const collections = { portfolio };
