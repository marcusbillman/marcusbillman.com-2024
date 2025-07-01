import { motion } from 'framer-motion';

import DotGrid from '@/components/DotGrid';
import Glow from '@/components/Glow';
import Sandbox from '@/components/Sandbox';

interface HeaderSectionProps {
  title: string;
  emoji?: string[];
}

export default function HeaderSection({
  title,
  emoji = [],
}: HeaderSectionProps) {
  return (
    <header className="sticky top-0 h-[512px] overflow-hidden px-4 pt-[15vh] lg:h-[75vh] lg:px-16 lg:pt-32">
      <Sandbox className="absolute bottom-12 left-4 right-4 top-16 lg:bottom-20 lg:left-8 lg:right-8 lg:top-24">
        <motion.h1 className="text-5xl transition-opacity md:text-7xl lg:text-left lg:text-9xl">
          {title}
        </motion.h1>
        {emoji.map((emoji, index) => (
          <motion.span
            key={index}
            className="text-4xl drop-shadow-lg transition-opacity md:text-6xl lg:text-8xl"
            aria-hidden
          >
            {emoji}
          </motion.span>
        ))}
      </Sandbox>

      {/* Backgrounds */}
      <DotGrid dim="default" />
      <Glow
        color="orange"
        className="left-[10%] top-[10%] w-full -translate-x-1/2 -translate-y-1/2"
      />
      <Glow
        color="blueberry"
        className="bottom-[10%] right-[10%] w-full translate-x-1/2 translate-y-1/2"
      />
    </header>
  );
}
