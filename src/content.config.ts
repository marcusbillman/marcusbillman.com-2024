import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

import { fetchDribbbleShots } from './utils/dribbble';
import { getLocale } from './utils/i18n';

const locale = getLocale();

const caseStudies = defineCollection({
  loader: glob({
    pattern: `src/content/case-studies/**/${locale}.{md,mdx}`,
  }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      name: z.string(),
      headline: z.string(),
      preamble: z.string().optional(),
      date: z.string(),
      // cover mirrors the ImageMedia type
      cover: z.object({
        type: z.literal('image'),
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
    pattern: `src/content/side-projects/**/${locale}.yaml`,
  }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      name: z.string(),
      headline: z.string(),
      date: z.string(),
      // cover mirrors the ImageMedia type
      cover: z.object({
        type: z.literal('image'),
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
  loader: file(`src/content/hero-banners.json`),
  schema: z.object({
    id: z.string(),
    locale: z.enum(['en', 'sv']),
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
