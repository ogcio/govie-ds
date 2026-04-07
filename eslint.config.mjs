import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginRegexp from 'eslint-plugin-regexp';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['**/dist/**'],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
  },
  { languageOptions: { globals: globals.browser } },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginUnicorn.configs['recommended'],
  eslintPluginRegexp.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message:
            'Enums are not allowed, use const objects or string literals instead.',
        },
      ],
      curly: ['error', 'all'],
      'object-shorthand': ['error', 'always'],
      eqeqeq: ['warn', 'always', { null: 'ignore' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-param-reassign': 'warn',
      'no-return-assign': 'error',
      'no-throw-literal': 'error',
      'prefer-template': 'warn',

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',
      '@typescript-eslint/no-require-imports': 'error',

      'regexp/no-super-linear-backtracking': 'error',
      'regexp/no-misleading-capturing-group': 'warn',
      'regexp/no-unused-capturing-group': 'warn',
      'regexp/optimal-quantifier-concatenation': 'warn',
      'regexp/no-useless-flag': 'warn',
      'regexp/use-ignore-case': 'warn',
      'regexp/strict': 'warn',
      'regexp/prefer-escape-replacement-dollar-char': 'warn',

      'unicorn/switch-case-braces': 'off',
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
            acc: false,
            util: false,
            utils: false,
          },
          ignore: ['generateStaticParams'],
        },
      ],
      'unicorn/filename-case': 'off',
    },
  },
];
