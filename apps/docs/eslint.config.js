import { FlatCompat } from '@eslint/eslintrc';
import eslintConfig from '@ogcio/design-system-eslint-config';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: eslintConfig,
});

const eslintNextConfig = [
  ...compat.config({
    extends: ['next'],
  }),
];

const config = [
  ...eslintNextConfig,
  {
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/static-components': 'off',
      'react-hooks/incompatible-library': 'off',
    },
  },
];

export default config;
