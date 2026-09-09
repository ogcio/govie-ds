import baseConfig from '../../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    rules: {
      // TODO: ESLINT remove this after error fixes
      'unused-imports/no-unused-vars': 'warn',
    },
  },
];
