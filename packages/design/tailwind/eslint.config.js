// eslint.config.js
import { defineConfig } from 'eslint/config';
import eslintConfig from '@ogcio/ds-eslint-config';

export default defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [eslintConfig],
  },
]);
