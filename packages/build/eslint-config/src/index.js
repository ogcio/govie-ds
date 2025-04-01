import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import eslintJs from '@eslint/js';
import path from 'path';
import { fileURLToPath } from 'url';

// eslint-plugin-import does not currently support eslint flat config
// See https://github.com/import-js/eslint-plugin-import/issues/2948#issuecomment-2148832701
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslintJs.configs.recommended,
});

function legacyPlugin(name, alias = name) {
  const plugin = compat.plugins(name)[0]?.plugins?.[alias];

  if (!plugin) {
    throw new Error(`Unable to resolve plugin ${name} and/or alias ${alias}`);
  }

  return fixupPluginRules(plugin);
}

export const eslintConfig = [
  { languageOptions: { globals: globals.browser } }, // { globals: eslintrc.Legacy.environments.get('es2024') } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginUnicorn.configs['recommended'],
  ...compat.extends('plugin:import/typescript'),
  {
    languageOptions: {
      parserOptions: {},
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: {},
        },
      },
    },
    plugins: { import: legacyPlugin('eslint-plugin-import', 'import') },
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
      'import/no-unresolved': 'off',
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
          },
        },
      ],
      'unicorn/no-null': 'off',
      'unicorn/no-array-reduce': 'warn',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          replacements: {
            prop: false,
            props: false,
            ref: false,
            refs: false,
          },
          ignore: ['generateStaticParams'],
        },
      ],
    },
  },
];
