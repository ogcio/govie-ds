import { MitosisConfig } from '@builder.io/mitosis';
import annotation from './plugins/annotation';
import prettierFormat from './plugins/prettier-format';
import { cleanPropsReact } from './plugins/clean-props';
import fixForwardRef from './plugins/forward-ref';
import normalizeReactSvgAttrs from './plugins/normalize-svg-attrs';

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
      plugins: [fixForwardRef, normalizeReactSvgAttrs, cleanPropsReact, prettierFormat],
    },
  },
} satisfies MitosisConfig;
