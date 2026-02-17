import { MitosisConfig } from '@builder.io/mitosis'
import annotation from './plugins/annotation'
import prettierFormat from './plugins/prettier-format'

export default {
  files: 'atoms/**/*',
  dest: '../react/ds/src',
  targets: ['react'],
  getTargetPath: () => '.',
  commonOptions: {
    typescript: true,
    plugins: [annotation],
  },
  options: {
    react: {
      typescript: true,
      prettier: false,
      plugins: [prettierFormat],
    },
  },
} satisfies MitosisConfig
