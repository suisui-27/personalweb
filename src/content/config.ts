import { defineCollection, z } from "astro:content";

const portfolio = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    category: z.string(),
    cover: z.string(),
    summary: z.string(),
    year: z.string(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    gallery: z
      .array(
        z.object({
          src: z.string(),
          caption: z.string()
        })
      )
      .default([])
  })
});

export const collections = { portfolio };
