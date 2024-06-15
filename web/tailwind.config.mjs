/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
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
        default: 'var(--text-default)',
        subtle: 'var(--text-subtle)',
        primary: 'var(--text-primary)',
        'on-primary': 'var(--text-on-primary)',
        'on-inverted': 'var(--text-on-inverted)',
        'illustration-primary': 'var(--illustration-primary)',
        'illustration-secondary': 'var(--illustration-secondary)',
      },
      backgroundColor: {
        default: 'var(--bg-default)',
        subtle: 'var(--bg-subtle)',
        primary: 'var(--bg-primary)',
        inverted: 'var(--bg-inverted)',
        'overlay-dim-default': 'var(--overlay-dim-default)',
        'overlay-dim-strong': 'var(--overlay-dim-strong)',
      },
      borderColor: {
        default: 'var(--border-default)',
        strong: 'var(--border-strong)',
        primary: 'var(--border-primary)',
      },
      animation: {
        float: 'float 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(8px)' },
          '50%': { transform: 'translateY(-8px)' },
          '100%': { transform: 'translateY(8px)' },
        },
      },
    },
  },
};
