// eslint.config.js
import { defineConfig } from 'eslint/config';
import eslintConfig from '@govie-ds/eslint-config';

export default defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [eslintConfig],
  },
]);
