import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import astroPlugin from 'eslint-plugin-astro';
import reactPlugin from 'eslint-plugin-react';
import tsEslint from 'typescript-eslint';

export default [
  {
    plugins: {
      reactPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...astroPlugin.configs.recommended,
  prettierConfig,
];
