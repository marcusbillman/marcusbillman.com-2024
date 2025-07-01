import { Link, MusicNotes, Shapes } from '@phosphor-icons/react/dist/ssr';
import { getImage } from 'astro:assets';

import toyboxBg from '@/assets/images/footer-toybox-bg.jpg';
import DotGrid from '@/components/DotGrid';
import SocialLinks from '@/components/SocialLinks';
import t from '@/utils/i18n';

const optimizedToyboxBg = await getImage({ src: toyboxBg });

export default function FooterSection() {
  return (
    <footer className="relative z-10 -mt-8 bg-black px-4 pb-8 pt-16 text-gray-100 lg:-mt-16 lg:px-16 lg:pb-16 lg:pt-32">
      <div
        className="relative isolate grid h-96 place-items-center overflow-hidden rounded-2xl bg-cover bg-center lg:h-[max(512px,40vw)] lg:rounded-4xl"
        style={{ backgroundImage: `url(${optimizedToyboxBg.src})` }}
      >
        <a
          className="group block text-center text-3xl text-white/50 lg:cursor-pointer lg:text-4xl 2xl:text-6xl"
          href="/melodies"
        >
          <span className="block translate-x-[-10%] transition-colors lg:group-hover:text-white/20">
            {t('footer.slogan.word1') + ' '}
            <span className="font-serif italic text-white lg:group-hover:text-[inherit]">
              {t('footer.slogan.word2') + ' '}
              <Link size={32} className="inline 2xl:hidden" />
              <Link size={64} className="hidden 2xl:inline" />{' '}
            </span>
          </span>
          <span className="block translate-x-[25%] transition-colors lg:group-hover:text-white/20">
            {t('footer.slogan.word3') + ' '}
            <span className="font-serif italic text-white lg:group-hover:text-[inherit]">
              {t('footer.slogan.word4') + ' '}
              <Shapes size={32} className="inline 2xl:hidden" />
              <Shapes size={64} className="hidden 2xl:inline" />{' '}
            </span>
          </span>
          <span className="block transition-colors lg:group-hover:text-white/20">
            {t('footer.slogan.word5') + ' '}
            <span className="font-serif italic text-white">
              {t('footer.slogan.word6') + ' '}
              <MusicNotes
                size={32}
                className="inline lg:group-hover:animate-wiggle 2xl:hidden"
              />
              <MusicNotes
                size={64}
                className="hidden lg:group-hover:animate-wiggle 2xl:inline"
              />
            </span>
          </span>
        </a>
        <DotGrid />
      </div>
      <div className="mt-8 flex flex-col gap-8 lg:mt-16 lg:flex-row">
        <div className="flex-1">
          <p className="text-2xl lg:text-4xl">{t('common.fullName')}</p>
          <p className="mt-6 max-w-prose text-balance">
            {t('footer.fineprint.part1') + ' '}
            <a
              href="https://m-b.me/website-figma"
              target="_blank"
              className="text-blueberry-300 underline underline-offset-1 transition-all hover:text-gray-100 hover:underline-offset-4"
            >
              {t('footer.fineprint.part2')}
            </a>
            {t('footer.fineprint.part3')}
            <a
              href="https://m-b.me/website-repo"
              target="_blank"
              className="text-blueberry-300 underline underline-offset-1 transition-all hover:text-gray-100 hover:underline-offset-4"
            >
              {t('footer.fineprint.part4')}
            </a>
            {t('footer.fineprint.part5')}
          </p>
        </div>
        <SocialLinks forceDark />
      </div>
    </footer>
  );
}
