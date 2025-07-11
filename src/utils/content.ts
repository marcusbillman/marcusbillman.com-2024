import type { CollectionEntry } from 'astro:content';

import { getCollection } from 'astro:content';

import { getLocale } from './i18n';

export type CaseStudy = CollectionEntry<'caseStudies'>;
export type SideProject = CollectionEntry<'sideProjects'>;
export type DribbbleShot = CollectionEntry<'dribbbleShots'>;
export type HeroBanner = CollectionEntry<'heroBanners'>;
export type Project = CaseStudy | SideProject;
export type PortfolioItem = CaseStudy | SideProject | DribbbleShot;

export async function getAllProjects() {
  const caseStudies = await getCollection('caseStudies');
  const sideProjects = await getCollection('sideProjects');

  return [...caseStudies, ...sideProjects].sort(
    (a, b) => a.data.orderRank - b.data.orderRank,
  );
}

export async function getFeaturedProjects() {
  const allProjects = await getAllProjects();
  return allProjects.filter((project) => project.data.featured === true);
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
