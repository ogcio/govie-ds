import type { MitosisConfig } from '@builder.io/mitosis';
import annotation from './plugins/annotation';
import prettierFormat from './plugins/prettier-format';
import stripRef from './plugins/strip-ref';

export default {
  files: 'atoms/**/*',
  dest: '../vue/src',
  targets: ['vue'],
  getTargetPath: () => '.',
  commonOptions: { typescript: true },
  options: {
    vue: {
      api: 'composition',
      typescript: true,
      prettier: false,
      plugins: [stripRef, annotation, prettierFormat],
    },
  },
} satisfies MitosisConfig;
