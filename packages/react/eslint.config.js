import { defineConfig } from 'eslint/config';
import baseConfig from '../../eslint.config.mjs';
import storybook from 'eslint-plugin-storybook';

export default defineConfig([
  {
    ignores: ['src/atoms/**/*'],
  },
  ...storybook.configs['flat/recommended'],
  ...baseConfig,
  {
    files: ['**/.storybook/main.ts'],
    rules: {
      'storybook/no-uninstalled-addons': 'off',
    },
  },
]);
