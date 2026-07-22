import type { MitosisConfig } from '@builder.io/mitosis';
import stripRef from './plugins/strip-ref';
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
      plugins: [stripRef, annotation, prettierFormat],
    },
  },
} satisfies MitosisConfig;
