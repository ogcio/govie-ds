import angular from 'angular-eslint';
import { defineConfig } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier/flat';
import baseConfig from '../../eslint.config.mjs';

export default defineConfig([
  {
    ignores: ['**/storybook-static/**', '**/.angular/**'],
  },
  ...baseConfig,
  {
    files: ['**/*.ts'],
    extends: [angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'gi', style: 'kebab-case' }],
      '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'gi', style: 'camelCase' }],
      // Mitosis generates generic output for React
      '@angular-eslint/no-output-on-prefix': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [angular.configs.templateRecommended, angular.configs.templateAccessibility],
    rules: {
      // Extracted inline templates are virtual HTML files with no JavaScript for these to read.
      'unicorn/filename-case': 'off',
      'unicorn/no-empty-file': 'off',
    },
  },
  // Last, so it can switch off the whitespace rules unicorn/recommended brings in.
  prettierConfig,
  {
    rules: {
      // eslint-config-prettier also drops `curly`, which the shared base sets deliberately.
      curly: ['error', 'all'],
    },
  },
]);
