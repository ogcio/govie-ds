import type { MitosisConfig } from '@builder.io/mitosis';
import stripProps from './plugins/strip-props';
import annotation from './plugins/annotation';
import prettierFormat from './plugins/prettier-format';

export default {
  files: 'atoms/**/*',
  dest: '../angular/src',
  targets: ['angular'],
  getTargetPath: () => '.',
  commonOptions: {
    typescript: true,
  },
  options: {
    angular: {
      typescript: true,
      standalone: true,
      prettier: false,
      plugins: [stripProps('ref', 'children'), annotation, prettierFormat],
    },
  },
} satisfies MitosisConfig;
