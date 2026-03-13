import {
  ChatsCircleIcon,
  CubeFocusIcon,
  HeartIcon,
  LightningIcon,
} from '@phosphor-icons/react/ssr';
import { getImage } from 'astro:assets';

import DotGrid from '@/components/DotGrid';
import Glow from '@/components/Glow';
import publicSpeaking from '@/images/public-speaking.jpg';
import techLogos from '@/images/tech-logos.png';
import { t } from '@/utils/i18n';

const optimizedTechLogos = await getImage({ src: techLogos });
const optimizedPublicSpeaking = await getImage({ src: publicSpeaking });

export default function SkillsSection() {
  return (
    <section className="flex flex-col gap-16 px-4 pt-24 lg:px-16 lg:pt-32">
      <h1 className="text-4xl font-medium lg:text-6xl">
        {t('about.skills.heading')}
      </h1>
      <p className="max-w-prose text-xl">{t('about.skills.text')}</p>
      <ul className="grid gap-6 lg:grid-cols-2 lg:gap-8 2xl:grid-cols-4">
        <li className="relative isolate flex h-48 flex-col justify-between gap-4 overflow-hidden rounded-2xl border border-default bg-subtle p-4 lg:h-96 lg:p-6">
          <div className="w-fit rounded-full border border-default bg-default p-3">
            <CubeFocusIcon size={24} className="lg:hidden" />
            <CubeFocusIcon size={32} className="hidden lg:inline" />
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
        <li className="relative isolate flex h-48 flex-col justify-between gap-4 overflow-hidden rounded-2xl border border-default bg-subtle p-4 lg:h-96 lg:p-6">
          <div className="w-fit rounded-full border border-default bg-default p-3">
            <LightningIcon size={24} className="lg:hidden" />
            <LightningIcon size={32} className="hidden lg:inline" />
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
        <li className="relative isolate flex h-48 flex-col justify-between gap-4 overflow-hidden rounded-2xl border border-default bg-subtle p-4 lg:h-96 lg:p-6">
          <div className="w-fit rounded-full border border-default bg-default p-3">
            <ChatsCircleIcon size={24} className="lg:hidden" />
            <ChatsCircleIcon size={32} className="hidden lg:inline" />
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
        <li className="relative isolate flex h-48 flex-col justify-between gap-4 overflow-hidden rounded-2xl border border-default bg-subtle p-4 lg:h-96 lg:p-6">
          <div className="w-fit rounded-full border border-default bg-default p-3">
            <HeartIcon size={24} className="lg:hidden" />
            <HeartIcon size={32} className="hidden lg:inline" />
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
        <li className="relative isolate h-96 overflow-hidden rounded-2xl border border-default bg-subtle 2xl:col-span-2">
          <div className="bg-linear-to-b absolute bottom-0 left-0 right-0 flex h-1/2 flex-col justify-end from-white/0 to-white p-4 lg:p-6 dark:from-black/0 dark:to-black">
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
            className="rotate-30 absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
          />
        </li>
        <li className="relative isolate h-96 overflow-hidden rounded-2xl border border-default bg-black 2xl:col-span-2">
          <div className="bg-linear-to-b absolute bottom-0 left-0 right-0 flex h-1/2 flex-col justify-end from-black/0 to-black/50 p-4 lg:p-6">
            <p className="text-xl font-medium text-gray-100 lg:text-2xl">
              <span className="font-serif italic text-blueberry-300">
                {t('about.skills.publicSpeaker.part1')}
              </span>
              {t('about.skills.publicSpeaker.part2')}
            </p>
          </div>
          <img
            src={optimizedPublicSpeaking.src}
            alt={t('about.alt.publicSpeaking')}
            loading="lazy"
            className="absolute -z-10 h-full w-full object-cover object-[80%_50%] 2xl:object-[100%_20%]"
          />
        </li>
      </ul>
    </section>
  );
}
