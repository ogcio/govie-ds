import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import prettierConfig from 'eslint-config-prettier/flat';
import storybook from 'eslint-plugin-storybook';
import pluginVue from 'eslint-plugin-vue';
import vueA11y from 'eslint-plugin-vuejs-accessibility';
import baseConfig, { sharedRules } from '../../eslint.config.mjs';

export default [
  {
    ignores: ['**/storybook-static/**'],
  },
  ...storybook.configs['flat/recommended'],
  ...baseConfig,
  ...defineConfigWithVueTs(
    pluginVue.configs['flat/recommended'],
    vueA11y.configs['flat/recommended'],
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
        ...sharedRules,
        'unicorn/filename-case': ['error', { case: 'pascalCase' }],
        'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
        'vue/component-api-style': ['error', ['script-setup', 'composition']],
        'vue/define-emits-declaration': 'error',
        'vue/define-props-declaration': 'error',
        'vue/multi-word-component-names': 'off',
        'vue/no-unused-refs': 'error',
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
        'vue/attribute-hyphenation': 'off',
        'vue/attributes-order': 'off',
        'vue/no-required-prop-with-default': 'off',
      },
    },
  ),
  // Last, so it can switch off the whitespace rules `vue/recommended` brings in.
  prettierConfig,
  {
    rules: {
      // eslint-config-prettier also drops `curly`, which the shared base sets deliberately.
      curly: ['error', 'all'],
    },
  },
];
