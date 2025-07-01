/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss',
  ],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  singleQuote: true,
  tailwindConfig: './tailwind.config.mjs',
  importOrder: [
    '<TYPES>', // Third-party types
    '<TYPES>^[.]', // Local types
    '',
    '^react$', // React imports
    '<THIRD_PARTY_MODULES>', // Third-party modules
    '',
    '^@(/.*)$', // Aliased imports
    '^[.]', // Local imports
  ],
};
