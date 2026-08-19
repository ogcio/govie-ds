import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...defineConfigWithVueTs(
    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,
    {
      // Typed linting: anchor the project service to this package, not the repo root.
      languageOptions: {
        parserOptions: {
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
    {
      files: ['**/*.vue'],
      rules: {
        'unicorn/filename-case': ['error', { case: 'pascalCase' }],
        // The base config scopes its rule block to `.{js,mjs,cjs,ts,tsx}`, so `.vue` misses this.
        'unicorn/prevent-abbreviations': 'off',
        // Design System components are single-word by design (Button, Card, …).
        'vue/multi-word-component-names': 'off',
      },
    },
    {
      // Mitosis output — rules whose only fix is rewriting the emitted source belong to packages/core.
      basePath: import.meta.dirname,
      files: ['src/atoms/**/*.{ts,vue}'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_|^props$',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
      },
    },
  ),
];
