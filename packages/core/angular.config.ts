import { MitosisConfig } from '@builder.io/mitosis';
import annotation from './plugins/annotation';
import prettierFormat from './plugins/prettier-format';
import { cleanPropsAngular } from './plugins/clean-props';

export default {
  files: 'atoms/**/*',
  dest: '../angular/src',
  targets: ['angular'],
  getTargetPath: () => '.',
  commonOptions: {
    typescript: true,
    plugins: [annotation],
  },
  options: {
    angular: {
      typescript: true,
      standalone: true,
      prettier: false,
      plugins: [cleanPropsAngular, prettierFormat],
    },
  },
} satisfies MitosisConfig;
