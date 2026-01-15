import { Config } from '@stencil/core';
import { postcss } from '@stencil-community/postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';

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
    }),
    angularOutputTarget({
      componentCorePackage: '@ogcio/govie-component-library',
      directivesProxyFile:
        '../../govie-angular/projects/component-library/src/lib/stencil-generated/components.ts',
      directivesArrayFile:
        '../../govie-angular/projects/component-library/src/lib/stencil-generated/index.ts',
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
  },
};
