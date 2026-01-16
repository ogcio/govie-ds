import { Config } from '@stencil/core';
import { postcss } from '@stencil-community/postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export const config: Config = {
  namespace: 'govie-component-library',

  enableCache: true,
  sourceMap: true,

  globalStyle: 'tailwind.css',

  plugins: [
    postcss({
      plugins: [tailwindcss, autoprefixer],
    }),
  ],

  outputTargets: [
    {
      type: 'dist-hydrate-script',
    },
    { type: 'dist', esmLoaderPath: '../loader' },
    {
      type: 'dist-custom-elements',
      dir: 'components',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    { type: 'www', serviceWorker: null },
  ],
};
