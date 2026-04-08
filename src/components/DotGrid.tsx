import { twJoin } from 'tailwind-merge';

interface Props {
  /** Optionally add a dimmed overlay to make the dot grid more subtle */
  dim?: 'default' | 'strong' | 'none';
  /** Make the component always look like dark theme instead of using dynamic colour tokens */
  forceDark?: boolean;
}

/**
 * Dotted grid background. Absolutely positioned to fill its parent. Set `isolation: isolate` on the parent to place at the back.
 */
export default function DotGrid({ dim = 'none', forceDark = false }: Props) {
  return (
    <div
      className={twJoin(
        'absolute inset-0 -z-10 bg-center',
        forceDark
          ? 'bg-[url(/images/dot-tile-dark.svg)]'
          : 'bg-[url(/images/dot-tile-light.svg)] dark:bg-[url(/images/dot-tile-dark.svg)]',
        dim === 'default' &&
          (forceDark ? 'bg-black/60' : 'bg-overlay-dim-default'),
        dim === 'strong' &&
          (forceDark ? 'bg-black/80' : 'bg-overlay-dim-strong'),
      )}
    ></div>
  );
}
