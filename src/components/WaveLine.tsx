import { twMerge } from 'tailwind-merge';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'small' | 'medium' | 'large';
}

/**
 * Animated, horizontal, sine-like wave.
 */
export default function WaveLine({
  size = 'medium',
  className,
  style,
  ...props
}: Props) {
  function height() {
    if (size === 'small') return 8;
    if (size === 'medium') return 16;
    if (size === 'large') return 24;
    return 0;
  }

  // Ratio between the width and height of one wave tile (period)
  const TILE_ASPECT_RATIO = 3.2;
  const tileWidth = TILE_ASPECT_RATIO * height();

  return (
    <>
      {/* This animation is inline in order to support dynamically setting the tile width */}
      <style>{`
        @media screen and (prefers-reduced-motion: no-preference) {
          @keyframes wave-line-${size} {
            0% {
              mask-position: 0 0;
            }
            100% {
              mask-position: -${tileWidth}px 0;
            }
          }
        }
      `}</style>
      <div
        className={twMerge(
          "bg-current [mask-image:url('/assets/images/wave-tile.svg')] [mask-size:contain]",
          className,
        )}
        style={{
          ...style,
          height: `${height()}px`,
          animationName: `wave-line-${size}`,
          animationDuration: '1s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
        {...props}
      />
    </>
  );
}
