// eslint.config.js
import { defineConfig } from 'eslint/config';
import eslintConfig from '@ogcio/design-system-eslint-config';

export default defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [eslintConfig],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },
]);
