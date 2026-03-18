import { MitosisConfig } from '@builder.io/mitosis';
import annotation from './plugins/annotation';
import prettierFormat from './plugins/prettier-format';
import angularPropAlias from './plugins/angular-prop-alias';

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
      plugins: [angularPropAlias, prettierFormat],
    },
  },
} satisfies MitosisConfig;
