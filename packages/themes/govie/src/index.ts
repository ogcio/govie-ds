import { metaDarkUnresolved } from './dist/meta-dark-unresolved.js';
import { metaDark } from './dist/meta-dark.js';
import { metaLightUnresolved } from './dist/meta-light-unresolved.js';
import { metaLight } from './dist/meta-light.js'; // TODO: auto-generate this file
import * as tokensDark from './dist/tokens-dark.js';
import * as tokensLight from './dist/tokens-light.js';

export const meta = {
  light: {
    resolved: metaLight,
    unresolved: metaLightUnresolved,
  },
  dark: {
    resolved: metaDark,
    unresolved: metaDarkUnresolved,
  },
};

export const tokens = {
  light: tokensLight,
  dark: tokensDark,
};
