import { Config } from '@stencil/core';
import { postcss } from '@stencil-community/postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'govie-component-library',
  sourceMap: true,
  globalStyle: 'styles.css',
  plugins: [
    postcss({
      plugins: [tailwindcss, autoprefixer],
    }),
  ],
  outputTargets: [
    reactOutputTarget({
      outDir: '../../govie-react/ds/src/components',
      hydrateModule: '@ogcio/govie-component-library/hydrate',
      clientModule: '@ogcio/govie-react',
      transformTag: true,
    }),
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
  extras: {
    enableImportInjection: true,
    additionalTagTransformers: true,
  },
};
