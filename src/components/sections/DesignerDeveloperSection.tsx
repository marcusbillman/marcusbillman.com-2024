import { useRef } from 'react';
import { CodeBlock, Eye, Graph, PenNib } from '@phosphor-icons/react/dist/ssr';
import { getImage } from 'astro:assets';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

import developerBg from '@/assets/images/code-dim.jpg';
import codeEasterEgg from '@/assets/images/code-easter-egg.png';
import colourCardBlueberry from '@/assets/images/colour-card-blueberry.png';
import colourCardSalmon from '@/assets/images/colour-card-salmon.png';
import figmaTools from '@/assets/images/figma-tools.png';
import techLogos from '@/assets/images/tech-logos.png';
import designerBg from '@/assets/images/wireframe-sketch.jpg';
import DotGrid from '@/components/DotGrid';
import t from '@/utils/i18n';

const optimizedDesignerBg = await getImage({ src: designerBg });
const optimizedDeveloperBg = await getImage({ src: developerBg });
const optimizedColourCardBlueberry = await getImage({
  src: colourCardBlueberry,
});
const optimizedColourCardSalmon = await getImage({ src: colourCardSalmon });
const optimizedFigmaTools = await getImage({ src: figmaTools });
const optimizedTechLogos = await getImage({ src: techLogos });
const optimizedCodeEasterEgg = await getImage({ src: codeEasterEgg });

export default function DesignerDeveloperSection() {
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
        style={{ backgroundImage: `url(${optimizedDesignerBg.src})` }}
      >
        {/* Text */}
        <div className="flex flex-wrap justify-center lg:absolute lg:inset-16 lg:top-32 lg:w-auto">
          <span className="inline-flex items-center text-primary lg:absolute lg:left-0 lg:top-0">
            {t('about.designerDeveloper.designer.word1')}&nbsp;
            <PenNib size={32} className="lg:hidden" />
            <PenNib size={64} className="hidden lg:inline 2xl:hidden" />
            <PenNib size={128} className="hidden 2xl:inline" />
            &nbsp;
          </span>
          <span className="lg:absolute lg:left-0 lg:top-1/3">
            {t('about.designerDeveloper.designer.word2')}&nbsp;
          </span>
          <span className="inline-flex font-serif italic lg:absolute lg:bottom-0 lg:right-0 lg:flex-col lg:items-end lg:font-sans lg:not-italic">
            {t('about.designerDeveloper.designer.word3')}&nbsp;
            <span className="inline-flex items-center">
              {t('about.designerDeveloper.designer.word4')}&nbsp;
              <Graph size={32} className="lg:hidden" />
              <Graph size={64} className="hidden lg:inline 2xl:hidden" />
              <Graph size={128} className="hidden 2xl:inline" />
            </span>
          </span>
        </div>

        {/* Illustrations */}
        <div className="group absolute right-0 top-0 size-[25vw] min-w-64 opacity-50 transition-opacity duration-500 hover:opacity-100">
          <img
            src={optimizedColourCardBlueberry.src}
            alt={t('about.alt.colourCardBlueberry')}
            loading="lazy"
            className="absolute right-[15%] top-[-10%] block origin-bottom rotate-[5deg] transition-transform duration-500 ease-smooth group-hover:rotate-[-5deg]"
            aria-hidden
          />
          <img
            src={optimizedColourCardSalmon.src}
            alt={t('about.alt.colourCardSalmon')}
            className="absolute right-[-5%] top-[10%] block origin-bottom rotate-[15deg] transition-transform duration-500 ease-smooth group-hover:rotate-[20deg]"
            aria-hidden
          />
        </div>
        <img
          src={optimizedFigmaTools.src}
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
          backgroundImage: `url(${optimizedDeveloperBg.src})`,
          clipPath: clipPathOutput,
          opacity: opacityOutput,
        }}
      >
        {/* Text */}
        <div className="flex flex-wrap justify-center lg:absolute lg:inset-16 lg:top-32 lg:w-auto">
          <span className="inline-flex items-center text-blueberry-300 lg:absolute lg:right-0 lg:top-0">
            {t('about.designerDeveloper.developer.word1')}&nbsp;
            <CodeBlock size={32} className="lg:hidden" />
            <CodeBlock size={64} className="hidden lg:inline 2xl:hidden" />
            <CodeBlock size={128} className="hidden 2xl:inline" />
            &nbsp;
          </span>
          <span className="lg:absolute lg:right-0 lg:top-1/3">
            {t('about.designerDeveloper.developer.word2')}&nbsp;
          </span>
          <span className="inline-flex font-serif italic lg:absolute lg:bottom-0 lg:left-0 lg:flex-col lg:font-sans lg:not-italic">
            {t('about.designerDeveloper.developer.word3')}&nbsp;
            <span className="inline-flex items-center">
              {t('about.designerDeveloper.developer.word4')}&nbsp;
              <Eye size={32} className="lg:hidden" />
              <Eye size={64} className="hidden lg:inline 2xl:hidden" />
              <Eye size={128} className="hidden 2xl:inline" />
            </span>
          </span>
        </div>

        {/* Illustrations */}
        <img
          src={optimizedTechLogos.src}
          alt={t('about.alt.techLogos')}
          className="absolute left-[-25%] top-[-15%] rotate-[-30deg] opacity-50"
          aria-hidden
        />
        <img
          src={optimizedCodeEasterEgg.src}
          alt={t('about.alt.codeEasterEgg')}
          className="absolute -bottom-32 -right-32 w-[800px] rotate-[-15deg] opacity-50 transition-opacity hover:opacity-100"
          aria-hidden
        />
        <DotGrid />
      </motion.div>
    </section>
  );
}
