import { MitosisConfig } from '@builder.io/mitosis'
import annotation from './plugins/annotation'

export default {
  files: 'atoms/**/*',
  dest: '../../examples/angular/src/app/components', // internal example
  targets: ['angular'],
  getTargetPath: () => '.',
  commonOptions: {
    typescript: true,
    prettier: true,
    plugins: [annotation],
  },
  options: {
    angular: {
      typescript: true,
      standalone: true,
    },
  },
} satisfies MitosisConfig
