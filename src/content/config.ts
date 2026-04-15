import { defineCollection, z } from "astro:content"

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    draft: z.boolean().optional(),
  }),
})

const writing = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    venue: z.string(),
    year: z.number(),
    url: z.string(),
    authors: z.array(z.string()).optional(),
    category: z.enum(["academic", "journalism"]).optional().default("academic"),
  }),
})

const presentations = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: z.coerce.date(),
    video_url: z.string().optional(),
    slides_url: z.string().optional(),
    description: z.string().optional(),
    presenters: z.array(z.string()).optional(),
  }),
})

const press = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    outlet: z.string(),
    date: z.coerce.date(),
    url: z.string().optional(),
    type: z.enum(["print", "podcast", "radio", "online"]),
  }),
})

const grants = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    funder: z.string(),
    year: z.number(),
    amount: z.string().optional(),
    description: z.string().optional(),
    url: z.string().optional(),
  }),
})

const legal = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
})

export const collections = { blog, writing, presentations, press, grants, legal }
