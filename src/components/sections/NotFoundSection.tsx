import { House } from '@phosphor-icons/react/dist/ssr';
import { getImage } from 'astro:assets';
import { motion } from 'framer-motion';

import bg from '@/assets/images/hero-bg-still.jpg';
import Button from '@/components/Button';
import DotGrid from '@/components/DotGrid';
import Sandbox from '@/components/Sandbox';
import t from '@/utils/i18n';

const optimizedBg = await getImage({ src: bg });

export default function NotFoundSection() {
  return (
    <section className="relative isolate flex min-h-screen flex-col bg-primary lg:block">
      {/* Decoration */}
      <Sandbox
        randomize={false}
        className="relative z-10 flex-grow text-4xl transition-opacity md:text-6xl lg:absolute lg:inset-4 lg:text-8xl"
      >
        <motion.span
          className="left-[-10%] top-[10%] bg-cover bg-clip-text bg-left-top text-[40vh] font-bold leading-[0.8] tracking-tighter text-transparent lg:left-[20%]"
          style={{ backgroundImage: `url(${optimizedBg.src})`, rotate: 15 }}
        >
          4
        </motion.span>
        <motion.span
          className="left-[25%] top-[45%] bg-cover bg-clip-text bg-bottom text-[40vh] font-bold leading-[0.8] tracking-tighter text-transparent lg:left-[35%]"
          style={{ backgroundImage: `url(${optimizedBg.src})`, rotate: -8 }}
        >
          0
        </motion.span>
        <motion.span
          className="left-[70%] top-[20%] bg-cover bg-clip-text bg-right-top text-[40vh] font-bold leading-[0.8] tracking-tighter text-transparent"
          style={{ backgroundImage: `url(${optimizedBg.src})`, rotate: -20 }}
        >
          4
        </motion.span>
        <motion.span
          className="left-[15%] top-[30%] drop-shadow-lg lg:top-[15%]"
          aria-hidden
        >
          🧐
        </motion.span>
        <motion.span
          className="left-[70%] top-[20%] drop-shadow-lg lg:left-[60%] lg:top-[10%]"
          aria-hidden
        >
          🚧
        </motion.span>
        <motion.span
          className="left-[85%] top-[75%] drop-shadow-lg lg:top-[20%]"
          aria-hidden
        >
          😵
        </motion.span>
        <motion.span
          className="left-[55%] top-[60%] drop-shadow-lg lg:top-[40%]"
          aria-hidden
        >
          🗺
        </motion.span>
        <motion.span
          className="left-[10%] top-[90%] drop-shadow-lg lg:top-[50%]"
          aria-hidden
        >
          🚷
        </motion.span>
      </Sandbox>

      {/* Content */}
      <div className="h-fit lg:absolute lg:bottom-16 lg:left-16 lg:right-16 2xl:bottom-32 2xl:left-32 2xl:right-32">
        <div className="mx-auto flex flex-col gap-6 rounded-2xl p-6 text-on-primary lg:container lg:bg-default lg:text-default xl:flex-row xl:items-end xl:gap-16">
          <h1 className="text-balance text-4xl lg:text-6xl">
            {t('404.heading')}
          </h1>
          <div className="flex flex-col gap-6 md:flex-row md:items-center xl:gap-16">
            <p className="text-xl md:text-balance">{t('404.text')}</p>
            <Button
              text={t('404.cta')}
              icon={House}
              iconSide="left"
              href="/"
              className="flex-shrink-0"
            />
          </div>
        </div>
      </div>

      {/* Backgrounds */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/0 to-black/20" />
      <DotGrid />
    </section>
  );
}
