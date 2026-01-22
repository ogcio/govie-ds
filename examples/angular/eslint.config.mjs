import { defineConfig } from 'eslint/config';
import eslintConfig from '@ogcio/design-system-eslint-config';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import templateParser from '@angular-eslint/template-parser';

export default defineConfig([
  {
    files: ['**/*.ts'],
    extends: [eslintConfig],
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: templateParser,
    },
    plugins: {
      '@angular-eslint/template': angularTemplate,
    },
  },
  {
    ignores: ['dist/**', 'out-tsc/**', '**/*.min.*'],
  },
]);
