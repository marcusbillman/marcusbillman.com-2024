import type { CollectionEntry } from 'astro:content';

import { getCollection } from 'astro:content';

import { getLocale } from './i18n';

export type CaseStudy = CollectionEntry<'caseStudies'>;
export type SideProject = CollectionEntry<'sideProjects'>;
export type HeroBanner = CollectionEntry<'heroBanners'>;

export async function getAllCaseStudies() {
  const caseStudies = await getCollection('caseStudies');
  return caseStudies.sort((a, b) => a.data.orderRank - b.data.orderRank);
}

export async function getFeaturedCaseStudies() {
  const allCaseStudies = await getAllCaseStudies();
  return allCaseStudies.filter((caseStudy) => caseStudy.data.featured === true);
}

export async function getAllSideProjects() {
  const sideProjects = await getCollection('sideProjects');
  return sideProjects.sort((a, b) => a.data.orderRank - b.data.orderRank);
}

export async function getDribbbleShots() {
  return await getCollection('dribbbleShots');
}

export async function getHeroBanner() {
  const banners = await getCollection('heroBanners', ({ data }) => {
    return data.enabled === true && data.locale === getLocale();
  });

  if (banners.length === 0) return undefined;
  return banners[0];
}
