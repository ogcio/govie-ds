import { MitosisConfig } from '@builder.io/mitosis';
import annotation from './plugins/annotation';
import prettierFormat from './plugins/prettier-format';
import fixForwardRef from './plugins/forward-ref';
import normalizeReactSvgAttrs from './plugins/normalize-svg-attrs';

export default {
  files: 'atoms/**/*',
  dest: '../react/src',
  targets: ['react'],
  getTargetPath: () => '.',
  commonOptions: {
    typescript: true,
  },
  options: {
    react: {
      typescript: true,
      prettier: false,
      plugins: [fixForwardRef, normalizeReactSvgAttrs, annotation, prettierFormat],
    },
  },
} satisfies MitosisConfig;
