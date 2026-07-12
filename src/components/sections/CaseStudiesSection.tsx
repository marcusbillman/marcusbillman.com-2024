import type { CaseStudy } from '@/utils/content';

import { motion, useReducedMotion } from 'motion/react';

import { isExternalUrl } from '@/utils';
import { t } from '@/utils/i18n';
import { TIMING_FUNCTIONS } from '@/utils/tailwind';

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudiesSection({
  caseStudies,
}: CaseStudiesSectionProps) {
  return (
    <section className="px-4 py-16 lg:px-16">
      <div className="flex flex-col gap-8 2xl:flex-row 2xl:items-center 2xl:justify-between">
        <h2 className="text-4xl font-medium lg:text-6xl">
          {t('portfolio.caseStudies')}
        </h2>
      </div>
      <ul className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
        {caseStudies.map((caseStudy) => (
          <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
        ))}
      </ul>
    </section>
  );
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const url = `/portfolio/${caseStudy.id}`;
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.li
      key={caseStudy.id}
      lang={caseStudy.data.locale}
      layout={!shouldReduceMotion}
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 200,
        rotate: shouldReduceMotion ? 0 : 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: 0,
      }}
      transition={{ duration: 0.5, ease: TIMING_FUNCTIONS.SMOOTH }}
      className="group"
    >
      <a
        href={url}
        target={isExternalUrl(url) ? '_blank' : '_self'}
        className="block h-full"
      >
        <img
          src={caseStudy.data.cover.astroImage.src}
          alt={caseStudy.data.name}
          loading="lazy"
          className="aspect-photo w-full rounded-2xl border border-default object-cover transition-all group-focus-within:shadow-lg group-hover:shadow-lg motion-safe:duration-500 motion-safe:ease-smooth motion-safe:group-focus-within:scale-105 motion-safe:group-hover:rotate-3 motion-safe:group-hover:scale-105 2xl:rounded-4xl motion-safe:2xl:group-hover:rotate-1"
        />
        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center">
            <h3 className="grow font-serif text-xl font-medium italic text-primary lg:text-2xl 2xl:text-3xl">
              {caseStudy.data.name}
            </h3>
            <span className="hidden text-subtle lg:inline 2xl:text-2xl">
              {caseStudy.data.date}
            </span>
          </div>
          <p className="text-balance text-3xl lg:text-4xl 2xl:text-5xl">
            {caseStudy.data.headline}
          </p>
          <span className="text-subtle lg:hidden">{caseStudy.data.date}</span>
        </div>
      </a>
    </motion.li>
  );
}
