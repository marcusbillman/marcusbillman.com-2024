import { twMerge } from 'tailwind-merge';

// These images are not optimized because optimization caused problems with loading in the Menu component.
import blueberry from '@/assets/images/glow-blueberry.webp';
import orange from '@/assets/images/glow-orange.webp';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  color: 'blueberry' | 'orange';
}

/**
 * Decorative glow effect. Absolutely positioned and square. Remember to set width or height using styles.
 */
export default function Glow({ color, className, style, ...props }: Props) {
  function src() {
    if (color === 'blueberry') return blueberry.src;
    if (color === 'orange') return orange.src;
  }

  return (
    <div
      className={twMerge(
        'absolute -z-10 aspect-square bg-cover bg-center',
        className,
      )}
      style={{ backgroundImage: `url(${src()})`, ...style }}
      {...props}
    />
  );
}
