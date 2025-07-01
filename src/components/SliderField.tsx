import type { CustomIcon } from '@/components/icons';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react/dist/lib/types';

import * as Slider from '@radix-ui/react-slider';
import { twMerge } from 'tailwind-merge';

interface Props {
  label?: string;
  name: string;
  value: number;
  min: number;
  max: number;
  step: number;
  icon?: PhosphorIcon | CustomIcon;
  className?: string;
  ariaLabel?: string;
  onChange: (value: number) => void;
}

/**
 * A slider input field with optional label. Must be used in a React component and must be controlled.
 */
export default function SliderField({
  label,
  name,
  value,
  min,
  max,
  step,
  icon,
  className,
  ariaLabel,
  onChange,
}: Props) {
  const IconComponent = (icon as React.ElementType) || undefined;

  return (
    <div className={twMerge('group relative w-full', className)}>
      {label && (
        <label
          className="mb-2 inline-block group-focus-within:font-serif group-focus-within:font-medium group-focus-within:text-primary"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <Slider.Root
        value={[value]}
        min={min}
        max={max}
        step={step}
        name={name}
        onValueChange={(value) => onChange(value[0])}
        className="relative flex h-10 cursor-pointer touch-none select-none items-center"
        aria-label={ariaLabel}
      >
        <Slider.Track className="relative h-px flex-grow rounded-full border-2" />
        <Slider.Thumb className="flex size-10 items-center justify-center rounded-full bg-subtle text-default transition-colors group-focus-within:ring group-active:bg-primary group-active:text-on-primary">
          {IconComponent && (
            <IconComponent size={24} className="pointer-events-none" />
          )}
        </Slider.Thumb>
      </Slider.Root>
    </div>
  );
}
