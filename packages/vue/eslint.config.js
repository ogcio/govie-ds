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
        // Design-system components are single-word by design (Button, Card, …).
        'vue/multi-word-component-names': 'off',
      },
    },
  ),
];
