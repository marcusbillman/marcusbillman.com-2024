import type { CaseStudy } from '@/utils/content';

import { ArrowLeftIcon } from '@phosphor-icons/react/ssr';

import Button from '@/components/Button';
import DotGrid from '@/components/DotGrid';
import Glow from '@/components/Glow';
import { t } from '@/utils/i18n';

interface Props {
  caseStudy: CaseStudy;
}

export default function CaseStudyHeaderSection({ caseStudy }: Props) {
  return (
    <header className="sticky top-0 flex flex-col overflow-hidden px-4 py-32 lg:min-h-[75vh] lg:px-16 lg:py-64">
      <div className="mx-auto w-full max-w-7xl space-y-6 lg:space-y-12">
        <div className="flex items-center gap-4">
          <Button
            text={t('caseStudy.back')}
            icon={ArrowLeftIcon}
            iconSide="left"
            size="small"
            href="/portfolio"
            className="hidden sm:block"
          />
          <p className="font-serif text-xl font-medium italic text-primary lg:text-2xl">
            {caseStudy.data.name}
          </p>
        </div>
        <h1 className="max-w-prose text-balance text-4xl md:text-7xl lg:text-8xl">
          {caseStudy.data.headline}
        </h1>
        {caseStudy.data.preamble && (
          <p className="max-w-prose text-balance text-xl lg:ml-[50%] lg:text-2xl">
            {caseStudy.data.preamble}
          </p>
        )}
      </div>

      {/* Backgrounds */}
      <DotGrid dim="default" />
      <Glow
        color="orange"
        className="left-[10%] top-[10%] w-full -translate-x-1/2 -translate-y-1/2"
      />
      <Glow
        color="blueberry"
        className="bottom-[10%] right-[10%] w-full translate-x-1/2 translate-y-1/2"
      />
    </header>
  );
}
