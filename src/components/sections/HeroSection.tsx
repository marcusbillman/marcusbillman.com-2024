import type { HeroBanner } from '@/utils/content';
import type { AnimationProps } from 'framer-motion';

import { useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BellRinging,
} from '@phosphor-icons/react/dist/ssr';
import { getImage } from 'astro:assets';
import { motion, useReducedMotion } from 'framer-motion';
import { twJoin } from 'tailwind-merge';

import DotGrid from '@/components/DotGrid';
import {
  AudioFileIllustration,
  BezierCurveIllustration,
  BrowserIllustration,
  ButtonClickIllustration,
  CableIllustration,
  CodeBlockIllustration,
  DawIllustration,
  DropdownIllustration,
  KnobIllustration,
  MetronomeIllustration,
  PhoneIllustration,
  PianoIllustration,
  SwitchIllustration,
} from '@/components/illustrations';
import WaveLine from '@/components/WaveLine.tsx';
import { useIntersectionObserverSelector } from '@/hooks';
import bg from '@/images/hero-bg-still.jpg';
import profilePicture from '@/images/profile-picture.jpg';
import { isExternalUrl } from '@/utils';
import { t } from '@/utils/i18n';
import { TIMING_FUNCTIONS } from '@/utils/tailwind';

const optimizedBg = await getImage({ src: bg });
const optimizedProfilePicture = await getImage({ src: profilePicture });

interface HeroSectionProps {
  heroBanners?: HeroBanner[];
}

export default function HeroSection({ heroBanners }: HeroSectionProps) {
  // Observe when the hero has been covered by the main container being scrolled to the top of the viewport
  const isCovered = useIntersectionObserverSelector('#main', {
    rootMargin: '0% 0% -100% 0%',
  });

  const animationPlayStateStyle: React.CSSProperties = {
    animationPlayState: isCovered ? 'paused' : 'running',
  };

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isCovered) videoRef.current?.pause();
    else videoRef.current?.play();
  }, [isCovered]);

  const shouldReduceMotion = useReducedMotion();

  function cropSlideWithDelay(delay: number): AnimationProps {
    return {
      initial: {
        opacity: shouldReduceMotion ? 0 : 1,
        y: shouldReduceMotion ? 0 : '120%',
        clipPath: shouldReduceMotion
          ? 'inset(0% 0% -20% 0%)'
          : 'inset(0% 0% 100% 0%)',
      },
      animate: {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0% 0% -20% 0%)',
      },
      transition: {
        delay: delay,
        duration: 0.5,
        ease: TIMING_FUNCTIONS.SMOOTH,
      },
    };
  }

  return (
    <header className="sticky top-0 h-[90vh] overflow-hidden px-4 pt-[15vh] lg:h-screen lg:px-16 lg:pt-32">
      {/* Content */}
      <div className="z-10 max-w-7xl">
        <h1 className="flex flex-wrap justify-center gap-x-[0.33ch] text-5xl md:text-7xl lg:justify-start lg:text-left lg:text-9xl">
          <motion.span {...cropSlideWithDelay(0)}>
            {t('home.hero.word1')}
          </motion.span>
          <motion.span {...cropSlideWithDelay(0.5)}>
            {t('home.hero.word2')}
          </motion.span>
          <motion.span {...cropSlideWithDelay(1)}>
            {t('home.hero.word3')}
          </motion.span>
          <span className="relative flex flex-col gap-1 lg:gap-2">
            <motion.span {...cropSlideWithDelay(1.2)}>
              {t('home.hero.word4')}
            </motion.span>
            <motion.span
              className="w-full overflow-hidden"
              initial={{
                opacity: shouldReduceMotion ? 0 : 1,
                width: shouldReduceMotion ? '100%' : 0,
              }}
              animate={{
                opacity: 1,
                width: '100%',
              }}
              transition={{
                delay: 1.4,
                duration: 1,
                ease: TIMING_FUNCTIONS.SMOOTH,
              }}
            >
              <WaveLine
                size="small"
                className="text-primary lg:hidden"
                style={animationPlayStateStyle}
              />
              <WaveLine
                size="medium"
                className="hidden text-primary lg:block"
                style={animationPlayStateStyle}
              />
            </motion.span>
          </span>
          <span className="drop-shadow-md">
            <motion.img
              src={optimizedProfilePicture.src}
              alt={t('home.alt.profilePicture')}
              className="size-12 rounded-full md:size-20 lg:size-32"
              aria-hidden
              {...cropSlideWithDelay(1.6)}
            />
          </span>
        </h1>
      </div>

      {/* Illustrations */}
      <div className="absolute left-1/2 top-2/3 z-50 origin-top -translate-x-1/2 scale-75 lg:scale-100">
        <motion.div
          className="size-[1400px]"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : '50%' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.6,
            duration: 2,
            ease: TIMING_FUNCTIONS.SMOOTH,
          }}
        >
          {/* Outer circle */}
          <div
            className="absolute inset-0 motion-safe:animate-[spin_30s_linear_infinite_reverse]"
            style={animationPlayStateStyle}
          >
            <div className="absolute inset-0 rounded-full border-4 border-primary opacity-10"></div>
            <div className="absolute left-[30%] top-[-2%] z-10 rotate-[-15deg]">
              <BrowserIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[56%] top-[-2%] z-10 rotate-[10deg]">
              <AudioFileIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[70%] top-[4%] z-10 rotate-[25deg]">
              <SwitchIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[80%] top-[8%] z-10 rotate-[40deg]">
              <PhoneIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[86%] top-[22%] z-10 rotate-[60deg]">
              <DawIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[98%] top-[40%] z-10 rotate-[80deg]">
              <MetronomeIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[96%] top-[54%] z-10 rotate-[105deg]">
              <BezierCurveIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[87%] top-[70%] z-10 rotate-[120deg]">
              <BrowserIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[81%] top-[85%] z-10 rotate-[140deg]">
              <AudioFileIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[70%] top-[94%] z-10 rotate-[155deg]">
              <SwitchIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[55%] top-[95%] z-10 rotate-[172deg]">
              <PhoneIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[35%] top-[95%] z-10 rotate-[180deg]">
              <CableIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[14%] top-[86%] z-10 rotate-[215deg]">
              <DawIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[4%] top-[72%] z-10 rotate-[-120deg]">
              <MetronomeIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[-3%] top-[56%] z-10 rotate-[-95deg]">
              <BezierCurveIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[-6%] top-[37%] z-10 rotate-[-80deg]">
              <BrowserIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[5%] top-[22%] z-10 rotate-[-60deg]">
              <AudioFileIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[13%] top-[8%] z-10 rotate-[-45deg]">
              <CableIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
          </div>
          {/* Inner circle */}
          <div
            className="absolute inset-[15%] motion-safe:animate-[spin_20s_linear_infinite_reverse]"
            style={animationPlayStateStyle}
          >
            <div className="absolute inset-0 rounded-full border-4 border-primary opacity-10"></div>
            <div className="absolute left-[38%] top-[-4%] z-10 rotate-[-3deg]">
              <PianoIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[68%] top-[5%] z-10 rotate-[25deg]">
              <ButtonClickIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[85%] top-[20%] z-10 rotate-[50deg]">
              <DropdownIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[96%] top-[37%] z-10 rotate-[75deg]">
              <KnobIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[88%] top-[55%] z-10 rotate-[100deg]">
              <CodeBlockIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[79%] top-[78%] z-10 rotate-[135deg]">
              <PianoIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[58%] top-[93%] z-10 rotate-[160deg]">
              <ButtonClickIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[30%] top-[94%] z-10 rotate-[-165deg]">
              <DropdownIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[10%] top-[80%] z-10 rotate-[-135deg]">
              <KnobIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[-9%] top-[55%] z-10 rotate-[-100deg]">
              <CodeBlockIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[-3%] top-[25%] z-10 rotate-[-65deg]">
              <PianoIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
            <div className="absolute left-[16%] top-[7%] z-10 rotate-[-35deg]">
              <ButtonClickIllustration
                className="motion-safe:animate-float"
                style={animationPlayStateStyle}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hero banner */}
      {/* TODO: Add support for multiple banners */}
      {heroBanners && heroBanners.length > 0 && (
        <motion.div
          className="absolute bottom-32 left-0 right-0 z-50 flex justify-center px-4 lg:bottom-32"
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : '200%',
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 2.5,
            duration: 0.75,
            ease: TIMING_FUNCTIONS.SMOOTH,
          }}
        >
          <HeroBanner
            text={heroBanners[0].data.text}
            href={heroBanners[0].data.url}
          />
        </motion.div>
      )}

      {/* Backgrounds */}
      <DotGrid dim="default" />
      <motion.div
        className="absolute left-0 top-0 -z-20 h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${optimizedBg.src})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1, ease: 'linear' }}
      >
        <video
          ref={videoRef}
          src="/videos/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover motion-reduce:hidden"
          aria-hidden
        ></video>
      </motion.div>
    </header>
  );
}

interface HeroBannerProps {
  text?: string;
  href?: string;
}

function HeroBanner({ text, href }: HeroBannerProps) {
  let ArrowIconComponent;

  if (href) {
    ArrowIconComponent = isExternalUrl(href) ? ArrowUpRight : ArrowRight;
  }

  return (
    <a
      href={href}
      target={isExternalUrl(href || '') ? '_blank' : '_self'}
      aria-label="News banner"
      className={twJoin(
        'group flex w-fit max-w-full items-center gap-2 rounded-full bg-default px-4 py-3 shadow-lg transition-all hover:bg-primary hover:text-on-primary active:opacity-50 motion-safe:active:scale-75 lg:px-6 lg:py-4 dark:border',
        !href && 'pointer-events-none',
      )}
    >
      <BellRinging
        size={16}
        className="flex-shrink-0 text-primary transition-colors group-hover:text-on-primary lg:hidden"
      />
      <BellRinging
        size={20}
        className="hidden flex-shrink-0 text-primary transition-colors group-hover:text-on-primary lg:inline"
      />
      <span className="font-medium lg:text-xl">{text}</span>
      {ArrowIconComponent && (
        <>
          <ArrowIconComponent
            size={16}
            className="flex-shrink-0 text-subtle transition-colors group-hover:text-on-primary lg:hidden"
          />
          <ArrowIconComponent
            size={20}
            className="hidden flex-shrink-0 text-subtle transition-colors group-hover:text-on-primary lg:inline"
          />
        </>
      )}
    </a>
  );
}
