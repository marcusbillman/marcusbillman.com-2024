import type { CustomIcon } from '@/components/icons';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react/dist/lib/types';
import type React from 'react';

import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { twJoin, twMerge } from 'tailwind-merge';

import { isExternalUrl } from '@/utils';

interface Props {
  text: string;
  icon?: PhosphorIcon | CustomIcon;
  iconSide?: 'left' | 'right' | 'none';
  size?: 'small' | 'medium' | 'large';
  style?: 'default' | 'primary' | 'subtle';
  href?: string;
  type?: 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<Element>;
}

export default function Button({
  text,
  icon,
  iconSide,
  size = 'medium',
  style = 'default',
  href,
  type,
  disabled = false,
  className,
  onClick,
}: Props) {
  let IconComponent: React.ElementType | undefined;
  if (icon) {
    IconComponent = icon;
  } else if (href) {
    IconComponent = isExternalUrl(href) ? ArrowUpRight : ArrowRight;
  } else {
    iconSide = 'none';
  }

  if (!iconSide) iconSide = href ? 'right' : 'left';

  const Element: React.ElementType = href ? 'a' : 'button';

  function iconSize() {
    if (size === 'small') return 16;
    else if (size === 'medium') return 24;
    else if (size === 'large') return 32;
  }

  function outerElementClass() {
    return twJoin(
      size === 'small' && 'px-4 py-2',
      size === 'medium' && 'px-6 py-4',
      size === 'large' && 'px-8 py-6',

      style === 'default' && 'bg-inverted text-on-inverted',
      style === 'primary' && 'bg-primary text-on-primary',
      style === 'subtle' && 'bg-subtle text-default',

      disabled && 'opacity-25 pointer-events-none',
    );
  }

  // prettier-ignore
  function textClass() {
    return twJoin(
      iconSide === 'left' && size === 'small' && 'motion-safe:group-hover:-translate-x-5',
      iconSide === 'left' && size === 'medium' && 'motion-safe:group-hover:-translate-x-8',
      iconSide === 'left' && size === 'large' && 'motion-safe:group-hover:-translate-x-11',

      iconSide === 'right' && size === 'small' && 'motion-safe:group-hover:translate-x-5',
      iconSide === 'right' && size === 'medium' && 'motion-safe:group-hover:translate-x-8',
      iconSide === 'right' && size === 'large' && 'motion-safe:group-hover:translate-x-11',

      size === 'small' && 'text-base',
      size === 'medium' && 'text-2xl',
      size === 'large' && 'text-4xl',
    );
  }

  return (
    <Element
      className={twMerge(
        outerElementClass(),
        'group relative isolate block w-fit cursor-pointer overflow-hidden rounded-full border border-transparent transition-all focus:outline-none focus:ring focus:ring-blueberry-500 focus:ring-offset-4 active:opacity-50 motion-safe:duration-500 motion-safe:ease-smooth motion-safe:active:scale-75 motion-reduce:hover:text-default',
        className,
      )}
      href={href}
      target={href && isExternalUrl(href) ? '_blank' : undefined}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {/* Hover background */}
      <div
        className={twJoin(
          `absolute inset-0 -z-10 rounded-full bg-default transition-all motion-safe:duration-500 motion-safe:ease-smooth motion-safe:group-hover:translate-x-0 motion-reduce:opacity-0 motion-reduce:group-hover:opacity-100`,
          iconSide === 'left' && 'motion-safe:translate-x-full',
          iconSide === 'right' && 'motion-safe:-translate-x-full',
        )}
      />

      {/* Content wrapper */}
      <div
        className={twJoin(
          'relative flex items-center justify-center',
          size === 'small' && 'gap-1',
          size === 'medium' && 'gap-2',
          size === 'large' && 'gap-3',
        )}
      >
        {/* Left icon */}
        {IconComponent && iconSide !== 'none' && (
          <IconComponent
            size={iconSize()}
            // prettier-ignore
            className={twJoin(
              'motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-smooth',
              iconSide === 'left' && 'motion-safe:group-hover:translate-x-[-200%] motion-safe:group-hover:opacity-0',
              iconSide === 'right' && 'absolute left-0 translate-x-[-200%] text-default opacity-0 motion-safe:group-hover:translate-x-0 motion-safe:group-hover:opacity-100',
            )}
          />
        )}

        {/* Text */}
        <span
          className={`${textClass()} motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-smooth motion-safe:group-hover:text-default`}
        >
          {text}
        </span>

        {/* Right icon */}
        {IconComponent && iconSide !== 'none' && (
          <IconComponent
            size={iconSize()}
            // prettier-ignore
            className={twJoin(
              `motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-smooth`,
              iconSide === 'left' && 'absolute right-0 translate-x-[200%] text-default opacity-0 motion-safe:group-hover:translate-x-0 motion-safe:group-hover:opacity-100',
              iconSide === 'right' && 'motion-safe:group-hover:translate-x-[200%] motion-safe:group-hover:opacity-0',
            )}
          />
        )}
      </div>
    </Element>
  );
}
