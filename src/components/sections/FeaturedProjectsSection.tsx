import type { CaseStudy } from '@/utils/content';

import Button from '@/components/Button';
import { t } from '@/utils/i18n';

interface FeaturedWorkSectionProps {
  caseStudies: CaseStudy[];
}

export default function FeaturedWorkSection({
  caseStudies: projects,
}: FeaturedWorkSectionProps) {
  return (
    <section className="px-4 lg:px-16">
      <h2 className="text-4xl font-medium lg:text-6xl">
        {t('home.featuredProjects.heading')}
      </h2>
      <ul className="relative isolate mt-12 flex flex-col gap-32 pb-12 lg:mt-16 lg:pb-16">
        <div
          className="absolute left-12 -z-10 h-full w-px border-l-4 border-dotted border-l-default"
          aria-hidden
        />
        {projects.map((project) => (
          <FeaturedCaseStudy key={project.id} caseStudy={project} />
        ))}
      </ul>
      <div className="mt-6 lg:mt-16">
        <Button
          text={t('home.featuredProjects.all')}
          href="portfolio"
          style="subtle"
        />
      </div>
    </section>
  );
}

interface FeaturedCaseStudyProps {
  caseStudy: CaseStudy;
}

function FeaturedCaseStudy({ caseStudy }: FeaturedCaseStudyProps) {
  return (
    <li className="flex flex-col-reverse gap-6 bg-default py-6 lg:flex-row lg:items-center lg:gap-8 lg:bg-transparent lg:py-0 2xl:items-start">
      <div className="top-16 flex h-fit flex-col gap-6 bg-default lg:w-full lg:gap-8 lg:py-8 2xl:py-16 motion-safe:2xl:sticky">
        <div
          lang={caseStudy.data.locale}
          className="flex flex-col gap-2 lg:gap-6"
        >
          <h3 className="font-serif text-xl font-medium italic text-primary lg:text-3xl">
            {caseStudy.data.name}
          </h3>
          <p className="text-balance text-3xl lg:text-4xl 2xl:text-6xl">
            {caseStudy.data.headline}
          </p>
        </div>
        <Button
          text={t('home.featuredProjects.viewCase')}
          href={'/portfolio/' + caseStudy.id}
        />
      </div>
      <img
        src={caseStudy.data.cover.astroImage.src}
        alt={caseStudy.data.name}
        loading="lazy"
        lang={caseStudy.data.locale}
        className="aspect-photo w-full rounded-2xl object-cover"
      ></img>
    </li>
  );
}
