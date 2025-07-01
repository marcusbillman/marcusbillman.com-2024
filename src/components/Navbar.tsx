import type { Icon } from '@phosphor-icons/react/dist/lib/types';

import { useEffect, useState } from 'react';
import {
  ChatsCircle,
  House,
  Images,
  List,
  User,
  X,
} from '@phosphor-icons/react/dist/ssr';
import { motion, useReducedMotion } from 'framer-motion';
import { twJoin } from 'tailwind-merge';

import Button from '@/components/Button';
import t from '@/utils/i18n';
import { TIMING_FUNCTIONS } from '@/utils/tailwind';

interface NavbarProps {
  isMenuOpen: boolean;
  onClickMenuButton?: () => void;
}

export default function Navbar({ isMenuOpen, onClickMenuButton }: NavbarProps) {
  const shouldReduceMotion = useReducedMotion();

  const outProperties = {
    y: shouldReduceMotion ? 0 : -100,
    opacity: shouldReduceMotion ? 0 : 1,
  };

  return (
    <motion.div
      initial={outProperties}
      animate={{ y: 0, opacity: 1 }}
      exit={outProperties}
      transition={{ duration: 0.5, ease: TIMING_FUNCTIONS.SMOOTH }}
      className={`pointer-events-none fixed left-4 right-4 top-4 z-50 flex items-stretch justify-between lg:left-8 lg:right-8`}
    >
      <a
        href="/"
        className={twJoin(
          'pointer-events-auto flex items-center gap-1 rounded-full bg-default px-4 font-medium transition-all hover:bg-primary hover:text-on-primary active:opacity-50 motion-safe:active:scale-75 lg:px-6 dark:border',
          !isMenuOpen && 'shadow-lg',
        )}
      >
        <span>{t('common.firstName')}</span>
        <span className="font-serif italic">{t('common.lastName')}</span>
      </a>
      <motion.div
        // Animation for hiding or showing navbar links as the menu is opened or closed
        layout={shouldReduceMotion ? false : 'position'}
        className={twJoin(
          'pointer-events-auto flex items-center gap-6 rounded-full bg-default lg:p-2',
          !isMenuOpen && 'shadow-lg lg:pl-6 dark:border',
        )}
      >
        {!isMenuOpen && (
          <motion.ul className={`hidden gap-6 lg:flex lg:items-center`}>
            <NavbarLink text={t('navigation.home')} url="/" icon={House} />
            <NavbarLink
              text={t('navigation.portfolio')}
              url="/portfolio"
              icon={Images}
            />
            <NavbarLink text={t('navigation.about')} url="/about" icon={User} />
            <NavbarLink
              text={t('navigation.contact')}
              url="/contact"
              icon={ChatsCircle}
            />
          </motion.ul>
        )}
        <Button
          text={isMenuOpen ? t('common.close') : t('navigation.menu')}
          icon={isMenuOpen ? X : List}
          style={isMenuOpen ? 'subtle' : 'default'}
          iconSide="right"
          size="small"
          onClick={onClickMenuButton}
        />
      </motion.div>
    </motion.div>
  );
}

interface NavbarLinkProps {
  text: string;
  url: string;
  icon: Icon;
}

function NavbarLink({ text, url, icon }: NavbarLinkProps) {
  const IconComponent = icon;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(window.location.pathname === url);
  }, [url]);

  return (
    <li>
      <a
        href={url}
        className={twJoin(
          'flex items-center gap-1 transition-all hover:text-default active:opacity-50 motion-safe:active:scale-75',
          isActive ? 'font-bold text-default' : 'text-subtle',
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        <IconComponent weight={isActive ? 'fill' : 'regular'} />
        {text}
      </a>
    </li>
  );
}
