import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

import { fetchDribbbleShots } from './utils/dribbble';

const locale = import.meta.env.PUBLIC_LOCALE || 'en';

const caseStudies = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: `src/assets/content/${locale}/case-studies`,
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      headline: z.string(),
      preamble: z.string().optional(),
      date: z.string(),
      cover: z.object({
        // Mirrors the RichImage type
        astroImage: image(),
        alt: z.string(),
        caption: z.string().optional(),
      }),
      locale: z.enum(['en', 'sv']),
      featured: z.boolean().optional(),
      orderRank: z.number(),
    }),
});

const sideProjects = defineCollection({
  loader: glob({
    pattern: '**/*.yaml',
    base: `src/assets/content/${locale}/side-projects`,
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      headline: z.string(),
      date: z.string(),
      cover: z.object({
        // Mirrors the RichImage type
        astroImage: image(),
        alt: z.string(),
        caption: z.string().optional(),
      }),
      url: z.string().optional(),
      locale: z.enum(['en', 'sv']),
      featured: z.boolean().optional(),
      orderRank: z.number(),
    }),
});

const dribbbleShots = defineCollection({
  loader: async () => {
    return await fetchDribbbleShots(5);
  },
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    images: z.object({
      hidpi: z.string(),
      normal: z.string(),
    }),
    html_url: z.string(),
    tags: z.array(z.string()).optional(),
    published_at: z.date(),
    updated_at: z.date(),
    locale: z.enum(['en', 'sv']),
  }),
});

const heroBanners = defineCollection({
  loader: file(`./src/assets/content/${locale}/hero-banners.json`),
  schema: z.object({
    enabled: z.boolean(),
    text: z.string(),
    url: z.string().optional(),
  }),
});

export const collections = {
  caseStudies,
  sideProjects,
  dribbbleShots,
  heroBanners,
};
