import { defineConfig } from 'eslint/config';
import baseConfig from '../../eslint.config.mjs';
import storybook from 'eslint-plugin-storybook';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig([
  {
    ignores: ['src/atoms/**/*'],
  },
  ...storybook.configs['flat/recommended'],
  ...baseConfig,
  {
    files: ['**/*.tsx'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
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
  }
]);
