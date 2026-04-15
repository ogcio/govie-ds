import { defineConfig } from 'eslint/config';
import baseConfig from '../../eslint.config.mjs';
import storybook from 'eslint-plugin-storybook';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig([
  {
    ignores: ['src/atoms/**/*', 'coverage/**', 'storybook-static/**', 'playwright-report/**', 'test-results/**'],
  },
  ...storybook.configs['flat/recommended'],
  ...baseConfig,
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    ...reactHooks.configs.flat.recommended,
  },
  {
    // TODO: ESLINT remove this after error fixes
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/static-components': 'warn',
      'react-hooks/immutability': 'warn',
    },
  },
  {
    files: ['**/.storybook/main.ts'],
    rules: {
      'storybook/no-uninstalled-addons': 'off',
    },
  },
  {
    rules: {
      'no-console': 'warn', // TODO: ESLINT remove this after error fixes
    },
  },
]);
