import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '@/../tailwind.config.mjs';

export function useTailwindConfig() {
  return resolveConfig(tailwindConfig);
}

/**
 * Timing functions for use with Framer Motion, taken from the Tailwind config.
 * Unfortunately, these can't be imported directly in an elegant way.
 */
export const TIMING_FUNCTIONS = {
  SMOOTH: [0.2, 0, 0, 1],
};
