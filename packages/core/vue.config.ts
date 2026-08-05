import type { MitosisConfig } from '@builder.io/mitosis';
import annotation from './plugins/annotation';
import prettierFormat from './plugins/prettier-format';
import stripProps from './plugins/strip-props';

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
      plugins: [stripProps('ref', 'children'), annotation, prettierFormat],
    },
  },
} satisfies MitosisConfig;
