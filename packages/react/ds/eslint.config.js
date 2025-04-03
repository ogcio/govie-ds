// eslint.config.js
import { defineConfig } from 'eslint/config';
import eslintConfig from '@govie-ds/eslint-config';
import storybook from 'eslint-plugin-storybook';

export default defineConfig([
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [eslintConfig],
  },
]);
