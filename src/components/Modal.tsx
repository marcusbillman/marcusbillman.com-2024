import { createRef } from 'react';
import { X } from '@phosphor-icons/react/dist/ssr';
import { motion, useReducedMotion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { FocusOn } from 'react-focus-on';
import { useMediaQuery } from 'usehooks-ts';

import Button from '@/components/Button';
import t from '@/utils/i18n';
import { TIMING_FUNCTIONS, useTailwindConfig } from '@/utils/tailwind';

interface Props {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ title, onClose, children }: Props) {
  const childrenRef = createRef<HTMLDivElement>();
  const resolvedTailwindConfig = useTailwindConfig();
  const shouldReduceMotion = useReducedMotion();

  const isDesktop = useMediaQuery(
    `(min-width: ${resolvedTailwindConfig.theme.screens.lg})`,
  );

  function outProperties() {
    if (isDesktop)
      return {
        opacity: 0,
        scale: shouldReduceMotion ? 1 : 0.8,
      };
    else
      return {
        opacity: shouldReduceMotion ? 0 : 1,
        y: shouldReduceMotion ? 0 : '100%',
      };
  }

  return createPortal(
    <FocusOn>
      <div>
        <motion.div
          className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center"
          initial={outProperties()}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={outProperties()}
          transition={{ duration: 0.5, ease: TIMING_FUNCTIONS.SMOOTH }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') onClose();
          }}
        >
          <div className="pointer-events-auto fixed bottom-0 z-[60] flex h-fit max-h-[95vh] w-full flex-col overflow-hidden rounded-t-4xl bg-default lg:bottom-auto lg:max-w-3xl lg:rounded-4xl">
            <div className="flex items-center justify-between p-4 lg:border-b lg:border-b-default lg:p-6">
              <h2 className="font-serif text-xl font-medium italic">{title}</h2>
              <Button
                text={t('common.close')}
                icon={X}
                iconSide="right"
                size="small"
                style="subtle"
                onClick={onClose}
              />
            </div>
            <div className="overflow-y-auto p-4 lg:p-6" ref={childrenRef}>
              {children}
            </div>
          </div>
        </motion.div>
        <motion.div
          className="fixed inset-0 z-50 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: TIMING_FUNCTIONS.SMOOTH }}
          onClick={onClose}
        />
      </div>
    </FocusOn>,
    document.body,
  );
}
