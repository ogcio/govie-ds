import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import prettierConfig from 'eslint-config-prettier/flat';
import pluginVue from 'eslint-plugin-vue';
import vueA11y from 'eslint-plugin-vuejs-accessibility';
import baseConfig, { sharedRules } from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...defineConfigWithVueTs(
    pluginVue.configs['flat/recommended'],
    vueA11y.configs['flat/recommended'],
    vueTsConfigs.recommended,
    {
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
        '@typescript-eslint/no-explicit-any': 'error',
        'unicorn/filename-case': ['error', { case: 'pascalCase' }],
        'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
        'vue/component-api-style': ['error', ['script-setup', 'composition']],
        'vue/define-emits-declaration': 'error',
        'vue/define-props-declaration': 'error',
        'vue/multi-word-component-names': 'off',
        'vue/no-unused-refs': 'error',
      },
    },
  ),
  prettierConfig,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      curly: ['error', 'all'],
    },
  },
];
