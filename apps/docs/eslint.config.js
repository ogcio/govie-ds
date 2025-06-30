import { FlatCompat } from '@eslint/eslintrc';
import eslintConfig from '@ogcio/ds-eslint-config';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: eslintConfig,
});

const eslintNextConfig = [
  ...compat.config({
    extends: ['next'],
  }),
];

export default eslintNextConfig;
