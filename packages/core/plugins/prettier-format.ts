import { MitosisPlugin } from '@builder.io/mitosis';
import prettier from '@prettier/sync';
import type { Options } from 'prettier';
import config from '../../../.prettierrc.json';

/**
 * Custom Prettier formatter for Mitosis code generation.
 */
const prettierFormat: MitosisPlugin = () => ({
  code: {
    post: (code) =>
      prettier.format(code, {
        parser: 'typescript',
        ...(config as Options),
      }),
  },
});

export default prettierFormat;
