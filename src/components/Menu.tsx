import type { Icon } from '@phosphor-icons/react/dist/lib/types';

import { useEffect, useState } from 'react';
import {
  ChatsCircle,
  House,
  Images,
  User,
  X,
} from '@phosphor-icons/react/dist/ssr';
import { motion, useReducedMotion } from 'framer-motion';
import { twJoin } from 'tailwind-merge';
import { useMediaQuery } from 'usehooks-ts';

// These images are not optimized because optimization caused problems with loading.
import homeBg from '@/assets/images/hero-bg-still.jpg';
import portfolioPhone1 from '@/assets/images/phone-iphone-15-plus.png';
import portfolioPhone2 from '@/assets/images/phone-pixel-8.png';
import aboutPortrait from '@/assets/images/portrait-1.png';
import Button from '@/components/Button';
import DotGrid from '@/components/DotGrid';
import Glow from '@/components/Glow';
import {
  BezierCurveIllustration,
  BrowserIllustration,
  ButtonClickIllustration,
  ChatIllustration,
  PhoneIllustration,
} from '@/components/illustrations';
import LanguageSwitch from '@/components/LanguageSwitch';
import SocialLinks from '@/components/SocialLinks';
import ThemeSwitch from '@/components/ThemeSwitch';
import t from '@/utils/i18n';
import { TIMING_FUNCTIONS, useTailwindConfig } from '@/utils/tailwind';

interface MenuProps {
  onClose?: () => void;
}

export default function Menu({ onClose }: MenuProps) {
  const resolvedTailwindConfig = useTailwindConfig();
  const shouldReduceMotion = useReducedMotion();

  const isDesktop = useMediaQuery(
    `(min-width: ${resolvedTailwindConfig.theme.screens.lg})`,
  );

  const outProperties = {
    y: shouldReduceMotion ? 0 : isDesktop ? '-100%' : '100%',
    opacity: shouldReduceMotion ? 0 : 1,
  };

  return (
    <>
      <motion.div
        initial={outProperties}
        animate={{ y: 0, opacity: 1 }}
        exit={outProperties}
        transition={{ duration: 0.5, ease: TIMING_FUNCTIONS.SMOOTH }}
        className="fixed bottom-0 left-0 right-0 z-40 flex max-h-[95vh] flex-col gap-4 rounded-t-4xl bg-default p-4 shadow-lg lg:bottom-auto lg:top-0 lg:h-[564px] lg:flex-row lg:gap-8 lg:rounded-b-4xl lg:rounded-t-none lg:p-8 lg:pt-24"
      >
        <div className="flex items-center justify-between lg:hidden">
          <h2 className="font-serif text-xl font-medium italic">
            {t('navigation.menu')}
          </h2>
          <Button
            text={t('common.close')}
            icon={X}
            style="subtle"
            iconSide="right"
            size="small"
            onClick={onClose}
          />
        </div>
        <div className="flex flex-grow flex-col gap-4 overflow-y-auto lg:flex-row lg:gap-8">
          <ul className="flex flex-col flex-wrap gap-2 lg:flex-[1] lg:flex-row lg:gap-4 2xl:flex-[3]">
            <MenuLink text={t('navigation.home')} url="/" icon={House}>
              <div
                className="absolute inset-0 -z-10 bg-cover bg-center"
                style={{ backgroundImage: `url(${homeBg.src})` }}
              />
              <DotGrid dim="default" />
              <BezierCurveIllustration className="absolute left-[30%] top-[25%]" />
              <PhoneIllustration className="absolute left-[80%] top-[-10%]" />
              <ButtonClickIllustration className="absolute left-[-5%] top-[60%] hidden 2xl:block" />
              <BrowserIllustration className="absolute left-[60%] top-[70%]" />
            </MenuLink>
            <MenuLink
              text={t('navigation.portfolio')}
              url="/portfolio"
              icon={Images}
            >
              <div className="absolute inset-0 -z-10 bg-subtle" />
              <DotGrid dim="default" />
              <Glow
                color="blueberry"
                className="bottom-[60%] right-[30%] w-full translate-x-1/2 translate-y-1/2"
              />
              <img
                src={portfolioPhone1.src}
                alt={t('navigation.alt.portfolioPhone1')}
                className="absolute right-[30%] top-[30%] h-[80%] min-h-64 rotate-[15deg]"
              />
              <img
                src={portfolioPhone2.src}
                alt={t('navigation.alt.portfolioPhone2')}
                className="absolute right-[30%] top-[30%] h-[80%] min-h-64 translate-x-[50%] translate-y-[20%] rotate-[5deg]"
              />
            </MenuLink>
            <MenuLink text={t('navigation.about')} url="/about" icon={User}>
              <div className="absolute inset-0 -z-10 bg-subtle" />
              <DotGrid dim="default" />
              <Glow color="orange" className="bottom-[20%] left-[30%] w-full" />
              <img
                src={aboutPortrait.src}
                alt={t('navigation.alt.aboutPortrait')}
                className="absolute bottom-[-30%] right-0 h-[80%] min-h-24 max-w-fit lg:bottom-0"
              />
            </MenuLink>
            <MenuLink
              text={t('navigation.contact')}
              url="/contact"
              icon={ChatsCircle}
            >
              <div className="absolute inset-0 -z-10 bg-subtle" />
              <DotGrid dim="default" />
              <Glow
                color="orange"
                className="bottom-[-30%] left-[-30%] w-full"
              />
              <ChatIllustration className="absolute right-0 top-[35%] lg:right-[10%]" />
            </MenuLink>
          </ul>
          <div className="flex flex-1 flex-col gap-4 xl:flex-[1]">
            <div className="grid flex-grow items-end lg:items-start">
              <SocialLinks compactOnMobile />
            </div>
            <div className="flex items-center justify-between">
              <ThemeSwitch />
              <LanguageSwitch />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className={`fixed inset-0 left-0 right-0 top-0 isolate z-30 h-screen bg-black/50`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: TIMING_FUNCTIONS.SMOOTH }}
        onClick={onClose}
      />
    </>
  );
}

interface MenuLinkProps {
  text: string;
  url: string;
  icon: Icon;
  children?: React.ReactNode;
}

function MenuLink({ text, url, icon, children }: MenuLinkProps) {
  const IconComponent = icon;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(window.location.pathname === url);
  }, [url]);

  return (
    <li
      className={twJoin(
        'group relative isolate block min-w-64 flex-1 overflow-clip rounded-2xl border px-5 py-4 transition-all active:opacity-50 group-hover:border-primary motion-safe:active:scale-90',
        isActive && 'border-primary',
      )}
    >
      <a href={url}>
        <div
          className={twJoin(
            'flex items-center gap-2 text-3xl transition-colors group-hover:text-default',
            isActive ? 'text-default' : 'text-subtle',
          )}
        >
          <IconComponent size={32} weight={isActive ? 'fill' : 'regular'} />
          {text}
        </div>
        <div
          // prettier-ignore
          className={twJoin(
            'absolute inset-0 -z-10 transition-opacity',
            !isActive && 'opacity-0 group-focus-within:opacity-100 group-hover:opacity-100',
          )}
        >
          {children}
        </div>
      </a>
    </li>
  );
}
