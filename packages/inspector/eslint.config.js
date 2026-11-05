import { defineConfig } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import baseConfig from '../../eslint.config.mjs';

export default defineConfig([
  ...baseConfig,
  {
    basePath: import.meta.dirname,
    files: ['src/**/*.{ts,tsx}'],
    ...reactHooks.configs.flat.recommended,
  },
]);
