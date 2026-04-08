import { defineConfig } from 'eslint/config';
import baseConfig from '../../eslint.config.mjs';
import nextPlugin from '@next/eslint-plugin-next';

export default defineConfig([
  {
    ignores: ['.next'],
  },
  ...baseConfig,
  nextPlugin.flatConfig.recommended,
  {
    rules: {
      'no-console': 'off',
    },
  },
]);
