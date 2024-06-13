import { eslintConfig } from '@govie-ds/eslint-config';

export default [
  ...eslintConfig,
  {
    ignores: ['src/dist/**/*'],
  },
];
