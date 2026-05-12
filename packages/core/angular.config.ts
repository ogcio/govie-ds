import { MitosisConfig } from '@builder.io/mitosis';
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
      plugins: [annotation, prettierFormat],
    },
  },
} satisfies MitosisConfig;
