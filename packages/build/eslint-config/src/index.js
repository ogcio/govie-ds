import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
// import * as eslintrc from '@eslint/eslintrc';
import globals from 'globals';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export const eslintConfig = [
  { languageOptions: { globals: globals.browser } }, // { globals: eslintrc.Legacy.environments.get('es2024') } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginUnicorn.configs['flat/recommended'],
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
