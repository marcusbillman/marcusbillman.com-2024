import { useRef } from 'react';
import {
  CodeBlockIcon,
  EyeIcon,
  GraphIcon,
  PenNibIcon,
} from '@phosphor-icons/react/ssr';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

import DotGrid from '@/components/DotGrid';
import { t } from '@/utils/i18n';

interface DesignerDeveloperSectionProps {
  designerBgSrc: string;
  developerBgSrc: string;
  colourCardBlueberrySrc: string;
  colourCardSalmonSrc: string;
  figmaToolsSrc: string;
  techLogosSrc: string;
  codeEasterEggSrc: string;
}

export default function DesignerDeveloperSection({
  designerBgSrc,
  developerBgSrc,
  colourCardBlueberrySrc,
  colourCardSalmonSrc,
  figmaToolsSrc,
  techLogosSrc,
  codeEasterEggSrc,
}: DesignerDeveloperSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });
  const shouldReduceMotion = useReducedMotion();

  const clipPathOutput = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion
      ? ['none', 'none']
      : [
          'polygon(0 0, 100% 0%, 100% -20%, 0 0%)',
          'polygon(0 0, 100% 0%, 100% 100%, 0 120%)',
        ],
  );

  const opacityOutput = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 1] : [1, 1],
  );

  return (
    <section
      ref={ref}
      className="relative h-[200vh] text-4xl lg:text-6xl lg:uppercase 2xl:text-9xl"
    >
      {/* Designer */}
      <div
        className="sticky top-0 isolate flex h-screen flex-col items-center justify-center overflow-hidden rounded-4xl bg-subtle bg-cover bg-center p-16 lg:rounded-6xl"
        style={{ backgroundImage: `url(${designerBgSrc})` }}
      >
        {/* Text */}
        <div className="flex flex-wrap justify-center lg:absolute lg:inset-16 lg:top-32 lg:w-auto">
          <span className="inline-flex items-center text-primary lg:absolute lg:left-0 lg:top-0">
            {t('about.designerDeveloper.designer.word1')}&nbsp;
            <PenNibIcon size={32} className="lg:hidden" />
            <PenNibIcon size={64} className="hidden lg:inline 2xl:hidden" />
            <PenNibIcon size={128} className="hidden 2xl:inline" />
            &nbsp;
          </span>
          <span className="lg:absolute lg:left-0 lg:top-1/3">
            {t('about.designerDeveloper.designer.word2')}&nbsp;
          </span>
          <span className="inline-flex font-serif italic lg:absolute lg:bottom-0 lg:right-0 lg:flex-col lg:items-end lg:font-sans lg:not-italic">
            {t('about.designerDeveloper.designer.word3')}&nbsp;
            <span className="inline-flex items-center">
              {t('about.designerDeveloper.designer.word4')}&nbsp;
              <GraphIcon size={32} className="lg:hidden" />
              <GraphIcon size={64} className="hidden lg:inline 2xl:hidden" />
              <GraphIcon size={128} className="hidden 2xl:inline" />
            </span>
          </span>
        </div>

        {/* Illustrations */}
        <div className="group absolute right-0 top-0 size-[25vw] min-w-64 opacity-50 transition-opacity duration-500 hover:opacity-100">
          <img
            src={colourCardBlueberrySrc}
            alt={t('about.alt.colourCardBlueberry')}
            loading="lazy"
            className="absolute right-[15%] top-[-10%] block origin-bottom rotate-[5deg] transition-transform duration-500 ease-smooth group-hover:rotate-[-5deg]"
            aria-hidden
          />
          <img
            src={colourCardSalmonSrc}
            alt={t('about.alt.colourCardSalmon')}
            className="absolute right-[-5%] top-[10%] block origin-bottom rotate-[15deg] transition-transform duration-500 ease-smooth group-hover:rotate-[20deg]"
            aria-hidden
          />
        </div>
        <img
          src={figmaToolsSrc}
          alt={t('about.alt.figmaTools')}
          className="absolute -bottom-64 -left-32 opacity-50"
          aria-hidden
        />
        <DotGrid dim="strong" />
      </div>

      {/* Developer */}
      <motion.div
        className="sticky top-0 isolate mt-[-100vh] flex h-screen flex-col items-center justify-center overflow-hidden rounded-4xl bg-black bg-cover bg-center p-16 text-gray-100 lg:rounded-6xl"
        style={{
          backgroundImage: `url(${developerBgSrc})`,
          clipPath: clipPathOutput,
          opacity: opacityOutput,
        }}
      >
        {/* Text */}
        <div className="flex flex-wrap justify-center lg:absolute lg:inset-16 lg:top-32 lg:w-auto">
          <span className="inline-flex items-center text-blueberry-300 lg:absolute lg:right-0 lg:top-0">
            {t('about.designerDeveloper.developer.word1')}&nbsp;
            <CodeBlockIcon size={32} className="lg:hidden" />
            <CodeBlockIcon size={64} className="hidden lg:inline 2xl:hidden" />
            <CodeBlockIcon size={128} className="hidden 2xl:inline" />
            &nbsp;
          </span>
          <span className="lg:absolute lg:right-0 lg:top-1/3">
            {t('about.designerDeveloper.developer.word2')}&nbsp;
          </span>
          <span className="inline-flex font-serif italic lg:absolute lg:bottom-0 lg:left-0 lg:flex-col lg:font-sans lg:not-italic">
            {t('about.designerDeveloper.developer.word3')}&nbsp;
            <span className="inline-flex items-center">
              {t('about.designerDeveloper.developer.word4')}&nbsp;
              <EyeIcon size={32} className="lg:hidden" />
              <EyeIcon size={64} className="hidden lg:inline 2xl:hidden" />
              <EyeIcon size={128} className="hidden 2xl:inline" />
            </span>
          </span>
        </div>

        {/* Illustrations */}
        <img
          src={techLogosSrc}
          alt={t('about.alt.techLogos')}
          className="absolute left-[-25%] top-[-15%] rotate-[-30deg] opacity-50"
          aria-hidden
        />
        <img
          src={codeEasterEggSrc}
          alt={t('about.alt.codeEasterEgg')}
          className="absolute -bottom-32 -right-32 w-[800px] rotate-[-15deg] opacity-50 transition-opacity hover:opacity-100"
          aria-hidden
        />
        <DotGrid />
      </motion.div>
    </section>
  );
}
