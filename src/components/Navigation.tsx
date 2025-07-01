import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FocusOn } from 'react-focus-on';
import { useMediaQuery } from 'usehooks-ts';

import Menu from '@/components/Menu';
import Navbar from '@/components/Navbar';
import { useTailwindConfig } from '@/utils/tailwind';

/**
 * Contains and controls the navbar and menu components.
 */
export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const resolvedTailwindConfig = useTailwindConfig();

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
    navigator.vibrate(100);
  }

  const isDesktop = useMediaQuery(
    `(min-width: ${resolvedTailwindConfig.theme.screens.lg})`,
  );

  return (
    <FocusOn enabled={isMenuOpen}>
      <nav
        onKeyDown={(e) => {
          if (e.key === 'Escape') setIsMenuOpen(false);
        }}
      >
        <AnimatePresence initial={false}>
          {(isDesktop || !isMenuOpen) && (
            <Navbar isMenuOpen={isMenuOpen} onClickMenuButton={toggleMenu} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isMenuOpen && <Menu onClose={toggleMenu} />}
        </AnimatePresence>
      </nav>
    </FocusOn>
  );
}
