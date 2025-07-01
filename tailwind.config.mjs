import formsPlugin from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: [
    // Use the 'variant' dark mode strategy
    'variant',
    // Override the default selector to support both automatic and manual theme switching
    [
      '@media (prefers-color-scheme: dark) { &:not(.light *) }',
      '&:is(.dark *)',
    ],
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      blueberry: {
        50: '#ecf0fc',
        100: '#d9e0f9',
        200: '#b3c1f4',
        300: '#8ea3ee',
        400: '#6884e9',
        500: '#4265e3',
        600: '#3551b6',
        700: '#283d88',
        800: '#1a285b',
        900: '#0d142d',
      },
      salmon: {
        100: '#fff1f1',
        300: '#ffcdcd',
        500: '#ffb7b7',
        700: '#cc9292',
        900: '#664949',
      },
      orange: {
        500: '#ff6b00',
      },
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      white: '#ffffff',
      black: '#000000',
    },
    fontFamily: {
      sans: ['Manrope', 'system-ui', 'sans-serif'],
      serif: ['"IBM Plex Serif"', 'serif'],
    },
    extend: {
      textColor: {
        DEFAULT: 'var(--text-default)',
        default: 'var(--text-default)',
        subtle: 'var(--text-subtle)',
        primary: 'var(--text-primary)',
        'on-primary': 'var(--text-on-primary)',
        'on-inverted': 'var(--text-on-inverted)',
        'illustration-primary': 'var(--illustration-primary)',
        'illustration-secondary': 'var(--illustration-secondary)',
      },
      backgroundColor: {
        DEFAULT: 'var(--bg-default)',
        default: 'var(--bg-default)',
        subtle: 'var(--bg-subtle)',
        primary: 'var(--bg-primary)',
        inverted: 'var(--bg-inverted)',
        'overlay-dim-default': 'var(--overlay-dim-default)',
        'overlay-dim-strong': 'var(--overlay-dim-strong)',
      },
      borderColor: {
        DEFAULT: 'var(--border-default)',
        default: 'var(--border-default)',
        strong: 'var(--border-strong)',
        primary: 'var(--border-primary)',
      },
      spacing: {
        128: '32rem', // 512px
        192: '48rem', // 768px
        256: '64rem', // 1024px
      },
      aspectRatio: {
        photo: '3/2',
      },
      borderRadius: {
        '4xl': '2rem', // 32px
        '5xl': '3rem', // 48px
        '6xl': '4rem', // 64px
        '7xl': '6rem', // 96px
        '8xl': '8rem', // 128px
      },
      boxShadow: {
        'main-container': '0px -4px 32px 0px rgba(0, 0, 0, 0.10)',
      },
      animation: {
        float: 'float 2s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        'step-play': 'step-play 0.2s',
        'popover-in': 'popover-in 0.2s',
        'popover-out': 'popover-out 0.2s',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(8px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
        'step-play': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(0.8)', opacity: '0.5' },
        },
        'popover-in': {
          '0%': { opacity: '0', scale: '0.8' },
          '100%': { opacity: '1', scale: '1' },
        },
        'popover-out': {
          '0%': { opacity: '1', scale: '1' },
          '100%': { opacity: '0', scale: '0.8' },
        },
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.2, 0, 0, 1)',
      },
      cursor: {
        'default-light':
          'url("/assets/cursor/cursor-normal-light.svg") 5 4, auto',
        'default-dark':
          'url("/assets/cursor/cursor-normal-dark.svg") 5 4, auto',
        'pointer-light':
          'url("/assets/cursor/cursor-pointer-light.svg") 15 4, pointer',
        'pointer-dark':
          'url("/assets/cursor/cursor-pointer-dark.svg") 15 4, pointer',
        'text-light': 'url("/assets/cursor/cursor-text-light.svg") 9 17, text',
        'text-dark': 'url("/assets/cursor/cursor-text-dark.svg") 9 17, text',
        'move-light': 'url("/assets/cursor/cursor-move-light.svg") 37 37, move',
        'move-dark': 'url("/assets/cursor/cursor-move-dark.svg") 37 37, move',
      },
    },
  },
  plugins: [formsPlugin],
};
