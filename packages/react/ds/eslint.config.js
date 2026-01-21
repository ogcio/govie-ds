// eslint.config.js
import { defineConfig } from 'eslint/config';
import eslintConfig from '@ogcio/design-system-eslint-config';
import storybook from 'eslint-plugin-storybook';

export default defineConfig([
  {
    ignores: ['src/atoms/**/*'],
  },
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [eslintConfig],
  },
  {
    files: ['**/.storybook/main.ts'],
    rules: {
      'storybook/no-uninstalled-addons': 'off',
    },
  },
]);
