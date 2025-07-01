import type { CustomIcon } from '@/components/icons';
import type { SoundcloudTrack } from '@/utils/soundcloud';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react/dist/lib/types';
import type React from 'react';

import {
  ArrowRight,
  ArrowUpRight,
  Flask,
} from '@phosphor-icons/react/dist/ssr';
import { getImage } from 'astro:assets';
import { twMerge } from 'tailwind-merge';

import designBg from '@/assets/images/designer-desk.jpg';
import musicBg from '@/assets/images/music-flatlay.jpg';
import sideProjectsScreen2 from '@/assets/images/screenshot-cooldownload.jpg';
import sideProjectsScreen1 from '@/assets/images/screenshot-soundboard.jpg';
import DotGrid from '@/components/DotGrid';
import { Dribbble, GitHub, LinkedIn, SoundCloud } from '@/components/icons';
import {
  ButtonClickIllustration,
  CodeBlockIllustration,
  PhoneIllustration,
} from '@/components/illustrations';
import { isExternalUrl } from '@/utils';
import t from '@/utils/i18n';

const optimizedDesignBg = await getImage({ src: designBg });
const optimizedMusicBg = await getImage({ src: musicBg });
const optimizedSideProjectsScreen1 = await getImage({
  src: sideProjectsScreen1,
});
const optimizedSideProjectsScreen2 = await getImage({
  src: sideProjectsScreen2,
});

interface MoreThingsSectionProps {
  soundcloudTracks?: SoundcloudTrack[];
}

export default function MoreThingsSection({
  soundcloudTracks,
}: MoreThingsSectionProps) {
  return (
    <section className="px-4 lg:px-16">
      <h2 className="text-4xl font-medium lg:text-6xl">
        {t('home.moreThings.heading')}
      </h2>
      <ul className="mt-12 grid gap-6 md:grid-cols-6 md:grid-rows-[repeat(4,max(10vw,12rem))] lg:mt-16 lg:gap-8">
        <BentoCard
          title={t('home.moreThings.sideProjects')}
          description={t('home.moreThings.sideProjectsDescription')}
          icon={Flask}
          href="portfolio?type=SIDE_PROJECT"
          className="h-[50vh] bg-gradient-to-b from-[#bfcaf1] to-[#889ef1] text-black md:col-span-3 md:row-span-2 md:h-auto xl:col-span-4"
        >
          <img
            src={optimizedSideProjectsScreen1.src}
            alt={t('home.alt.sideProjectsScreen1')}
            loading="lazy"
            className="absolute left-[20%] top-[0%] h-48 rotate-[30deg] rounded-2xl shadow-xl"
            aria-hidden
          />
          <img
            src={optimizedSideProjectsScreen2.src}
            alt={t('home.alt.sideProjectsScreen2')}
            loading="lazy"
            className="absolute bottom-[0%] left-[35%] h-48 rotate-[30deg] rounded-2xl shadow-xl"
            aria-hidden
          />
          <ButtonClickIllustration className="absolute left-[90%] top-[0%] rotate-[30deg] drop-shadow-xl" />
          <PhoneIllustration className="absolute left-[80%] top-[15%] rotate-[30deg] drop-shadow-xl" />
          <CodeBlockIllustration className="absolute left-[90%] top-[60%] rotate-[30deg] drop-shadow-xl" />
          <DotGrid />
        </BentoCard>
        <BentoCard
          title={t('home.moreThings.dribbble')}
          description={t('home.moreThings.dribbbleDescription')}
          icon={Dribbble}
          href="https://m-b.me/dribbble"
          className="h-[50vh] bg-cover bg-center md:col-span-3 md:row-span-2 md:h-auto xl:col-span-2"
          style={{ backgroundImage: `url(${optimizedDesignBg.src})` }}
        >
          <DotGrid dim="strong" />
        </BentoCard>
        <BentoCard
          title={t('home.moreThings.soundcloud')}
          description={t('home.moreThings.soundcloudDescription')}
          icon={SoundCloud}
          href="https://m-b.me/soundcloud"
          className="h-[50vh] bg-cover bg-center text-gray-100 md:col-span-3 md:row-span-2 md:h-auto"
          style={{ backgroundImage: `url(${optimizedMusicBg.src})` }}
        >
          <div className="absolute inset-0 isolate bg-gradient-to-b from-[#FF5722CC] to-[#FF5722]">
            {soundcloudTracks && soundcloudTracks?.length >= 2 && (
              <>
                <iframe
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${soundcloudTracks[0].id}&auto_play=false&hide_related=true`}
                  aria-hidden
                  tabIndex={-1}
                  className="absolute left-[35%] top-[45%] z-10 h-40 w-1/2 min-w-96 origin-left -rotate-3 shadow-xl transition-transform group-hover:rotate-6 motion-safe:duration-500 motion-safe:ease-smooth"
                ></iframe>
                <iframe
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${soundcloudTracks[1].id}&auto_play=false&hide_related=true`}
                  aria-hidden
                  tabIndex={-1}
                  className="absolute left-[30%] top-[25%] h-40 w-1/2 min-w-96 origin-left rotate-6 shadow-xl transition-transform group-hover:-rotate-6 motion-safe:duration-500 motion-safe:ease-smooth"
                ></iframe>
              </>
            )}
            <DotGrid />
          </div>
        </BentoCard>
        <BentoCard
          title={t('home.moreThings.github')}
          description={t('home.moreThings.githubDescription')}
          icon={GitHub}
          href="https://m-b.me/github"
          className="border border-transparent hover:border-default hover:bg-default md:col-span-3 md:h-auto"
        />
        <BentoCard
          title={t('home.moreThings.linkedin')}
          description={t('home.moreThings.linkedinDescription')}
          icon={LinkedIn}
          href="https://m-b.me/linkedin"
          className="border border-transparent hover:border-default hover:bg-default md:col-span-3 md:h-auto"
        />
      </ul>
    </section>
  );
}

interface BentoCardProps extends React.HTMLAttributes<HTMLLIElement> {
  title: string;
  description: string;
  icon?: PhosphorIcon | CustomIcon;
  href: string;
  children?: React.ReactNode;
}

function BentoCard({
  title,
  description,
  icon,
  href,
  className,
  children,
  ...props
}: BentoCardProps) {
  const LeftIconComponent = icon;
  const RightIconComponent = isExternalUrl(href) ? ArrowUpRight : ArrowRight;

  return (
    <li
      className={twMerge(
        'group relative overflow-hidden rounded-2xl bg-subtle transition-all focus-within:z-10 focus-within:ring hover:z-10 hover:shadow-lg motion-safe:duration-500 motion-safe:ease-smooth motion-safe:focus-within:scale-105 motion-safe:hover:scale-105',
        className,
      )}
      {...props}
    >
      <a
        href={href}
        target={isExternalUrl(href) ? '_blank' : '_self'}
        className="isolate flex h-full flex-col justify-between gap-3 p-4"
      >
        <div className="flex w-fit origin-top-left items-center gap-2 rounded-2xl bg-default p-4 transition-all duration-500 ease-smooth motion-safe:group-hover:scale-95">
          {LeftIconComponent && <LeftIconComponent className="text-primary" />}
          <h3 className="text-default">{title}</h3>
          <RightIconComponent className="text-subtle" />
        </div>
        <div className="-z-10">{children}</div>
        <p className="max-w-[15ch] origin-bottom-left text-3xl transition-transform duration-500 ease-smooth motion-safe:group-hover:scale-95 lg:mb-3 lg:ml-3 lg:text-5xl">
          {description}
        </p>
      </a>
    </li>
  );
}
