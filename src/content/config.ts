import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const blog = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    socialImage: z.string(),
    readingTime: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
  }),
});

const short = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { blog, short };
