import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginImportX from 'eslint-plugin-import-x';
import tsParser from '@typescript-eslint/parser';

import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

export default [
  { languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  eslintPluginUnicorn.configs['recommended'],
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ignores: ['eslint.config.js'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
        }),
      ],
    },
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration', // Restrict enum usage
          message:
            'Enums are not allowed, use const objects or string literals instead.',
        },
      ],
      curly: ['error', 'all'],
      'object-shorthand': ['error', 'always'],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'import-x/no-unresolved': 'off',
      'import-x/default': 'warn',
      'import-x/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
          },
        },
      ],
      'unicorn/no-null': 'off',
      'unicorn/no-array-reduce': 'warn',
      'unicorn/no-nested-ternary': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          replacements: {
            prop: false,
            props: false,
            ref: false,
            refs: false,
            env: false,
          },
          ignore: ['generateStaticParams'],
        },
      ],
    },
  },
];
