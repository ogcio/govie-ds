import type { MitosisPlugin } from '@builder.io/mitosis';
import prettier from '@prettier/sync';
import type { Options } from 'prettier';
import config from '../../../.prettierrc.json';
import { postProcess } from './post-process';

/**
 * Custom Prettier formatter for Mitosis code generation.
 * Runs after the whole target is emitted, so it covers both component files (`*.lite.tsx` output)
 * and non-component files (`*.meta.ts`, `utilities.ts`, etc.), which the per-component `code.post` hook does not see.
 */
const prettierFormat: MitosisPlugin = () => ({
  build: {
    post: postProcess((code, { path }) => prettier.format(code, { filepath: path, ...(config as Options) })),
  },
});

export default prettierFormat;
