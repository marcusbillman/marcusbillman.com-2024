import type { Icon } from '@phosphor-icons/react/dist/lib/types';

import { useEffect } from 'react';
import { ArrowsClockwise, Moon, Sun } from '@phosphor-icons/react/dist/ssr';
import { toast } from 'sonner';
import { twJoin } from 'tailwind-merge';
import { useLocalStorage } from 'usehooks-ts';

import t from '@/utils/i18n';

export type Theme = 'light' | 'dark' | 'system';

export default function ThemeSwitch() {
  const [value, setValue] = useLocalStorage<Theme>('theme', 'system');

  useEffect(() => {
    if (value === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else if (value === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('light', 'dark');
    }
  }, [value]);

  return (
    <div
      role="radiogroup"
      aria-label={t('navigation.themeSwitch.label')}
      className="flex items-center rounded-full bg-subtle p-2"
    >
      <SwitchSegment
        icon={Sun}
        label={t('navigation.themeSwitch.light')}
        isSelected={value === 'light'}
        onChange={() => {
          setValue('light');
          toast.success(t('navigation.themeSwitch.toastLight'));
        }}
      />
      <SwitchSegment
        icon={Moon}
        label={t('navigation.themeSwitch.dark')}
        isSelected={value === 'dark'}
        onChange={() => {
          setValue('dark');
          toast.success(t('navigation.themeSwitch.toastDark'));
        }}
      />
      <SwitchSegment
        icon={ArrowsClockwise}
        label={t('navigation.themeSwitch.system')}
        isSelected={value === 'system'}
        onChange={() => {
          setValue('system');
          toast.success(t('navigation.themeSwitch.toastSystem'));
        }}
      />
    </div>
  );
}

interface SwitchSegmentProps {
  icon: Icon;
  label: string;
  isSelected: boolean;
  onChange?: () => void;
}

function SwitchSegment({
  icon: IconComponent,
  label,
  isSelected,
  onChange,
}: SwitchSegmentProps) {
  return (
    <div
      className={twJoin(
        'relative grid size-12 place-items-center rounded-full transition-colors focus-within:ring hover:text-default',
        isSelected ? 'bg-default' : 'text-subtle',
      )}
    >
      <input
        type="radio"
        role="radio"
        name="theme"
        checked={isSelected}
        title={label}
        aria-label={label}
        className={twJoin(
          'absolute inset-0 h-full w-full cursor-pointer opacity-0',
          isSelected && 'pointer-events-none',
        )}
        onChange={onChange}
      />
      <IconComponent size={24} />
    </div>
  );
}
