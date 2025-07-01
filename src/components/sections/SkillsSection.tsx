import {
  ChatsCircle,
  CubeFocus,
  Heart,
  Lightning,
} from '@phosphor-icons/react/dist/ssr';
import { getImage } from 'astro:assets';

import techLogos from '@/assets/images/tech-logos.png';
import DotGrid from '@/components/DotGrid';
import Glow from '@/components/Glow';
import t from '@/utils/i18n';

const optimizedTechLogos = await getImage({ src: techLogos });

export default function SkillsSection() {
  return (
    <section className="flex flex-col gap-16 px-4 pt-24 lg:px-16 lg:pt-32">
      <h1 className="text-4xl font-medium lg:text-6xl">
        {t('about.skills.heading')}
      </h1>
      <p className="max-w-prose text-xl">{t('about.skills.text')}</p>
      <ul className="grid gap-6 lg:grid-cols-2 lg:gap-8 2xl:grid-cols-4">
        <li className="relative isolate flex h-96 flex-col justify-between gap-4 overflow-hidden rounded-2xl border bg-subtle p-4 lg:p-6">
          <div className="w-fit rounded-full border bg-default p-3">
            <CubeFocus size={24} className="lg:hidden" />
            <CubeFocus size={32} className="hidden lg:inline" />
          </div>
          <p className="text-xl font-medium lg:text-2xl">
            {t('about.skills.systemicThinker.part1')}
            <span className="font-serif italic text-primary">
              {t('about.skills.systemicThinker.part2')}
            </span>
          </p>
          <DotGrid />
          <Glow
            color="blueberry"
            className="left-0 top-0 h-[250%] -translate-x-1/2 -translate-y-1/2"
          />
        </li>
        <li className="relative isolate flex h-96 flex-col justify-between gap-4 overflow-hidden rounded-2xl border bg-subtle p-4 lg:p-6">
          <div className="w-fit rounded-full border bg-default p-3">
            <Lightning size={24} className="lg:hidden" />
            <Lightning size={32} className="hidden lg:inline" />
          </div>
          <p className="text-xl font-medium lg:text-2xl">
            <span className="font-serif italic text-primary">
              {t('about.skills.fastLearner.part1')}
            </span>
            {t('about.skills.fastLearner.part2')}
          </p>
          <DotGrid />
          <Glow
            color="blueberry"
            className="bottom-0 right-0 h-[250%] translate-x-1/2 translate-y-1/2"
          />
        </li>
        <li className="relative isolate flex h-96 flex-col justify-between gap-4 overflow-hidden rounded-2xl border bg-subtle p-4 lg:p-6">
          <div className="w-fit rounded-full border bg-default p-3">
            <ChatsCircle size={24} className="lg:hidden" />
            <ChatsCircle size={32} className="hidden lg:inline" />
          </div>
          <p className="text-xl font-medium lg:text-2xl">
            {t('about.skills.openMinded.part1')}
            <span className="font-serif italic text-primary">
              {t('about.skills.openMinded.part2')}
            </span>
          </p>
          <DotGrid />
          <Glow
            color="orange"
            className="bottom-0 left-0 h-[250%] -translate-x-1/2 translate-y-1/2"
          />
        </li>
        <li className="relative isolate flex h-96 flex-col justify-between gap-4 overflow-hidden rounded-2xl border bg-subtle p-4 lg:p-6">
          <div className="w-fit rounded-full border bg-default p-3">
            <Heart size={24} className="lg:hidden" />
            <Heart size={32} className="hidden lg:inline" />
          </div>
          <p className="text-xl font-medium lg:text-2xl">
            {t('about.skills.eagerToShare.part1')}
            <span className="font-serif italic text-primary">
              {t('about.skills.eagerToShare.part2')}
            </span>
            {t('about.skills.eagerToShare.part3')}
          </p>
          <DotGrid />
          <Glow
            color="orange"
            className="right-0 top-0 h-[250%] -translate-y-1/2 translate-x-1/2"
          />
        </li>
        <li className="relative isolate h-96 overflow-hidden rounded-2xl border bg-subtle lg:col-span-full">
          <div className="absolute bottom-0 left-0 right-0 flex h-1/2 flex-col justify-end bg-gradient-to-b from-white/0 to-white p-4 lg:p-6 dark:from-black/0 dark:to-black">
            <p className="text-xl font-medium lg:text-2xl">
              <span className="font-serif italic text-primary">
                {t('about.skills.technologies.part1')}
              </span>
              {t('about.skills.technologies.part2')}
            </p>
          </div>
          <DotGrid />
          <img
            src={optimizedTechLogos.src}
            alt={t('about.alt.techLogos')}
            loading="lazy"
            className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rotate-[30deg]"
          />
        </li>
        {/* TODO: This item is hidden until I've got a photo of me giving a presentation */}
        {/* <li className="relative isolate h-96 overflow-hidden rounded-2xl border bg-black lg:col-span-2">
          <div className="absolute bottom-0 left-0 right-0 flex h-1/2 flex-col justify-end bg-gradient-to-b from-black/0 to-black p-4 lg:p-6">
            <p className="text-xl font-medium text-gray-100 lg:text-2xl">
              <span className="font-serif italic text-blueberry-300">
                {t('about.skills.publicSpeaker.part1')}
              </span>
              {t('about.skills.publicSpeaker.part2')}
            </p>
          </div>
        </li> */}
      </ul>
    </section>
  );
}
