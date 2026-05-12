import type { StorybookConfig } from '@storybook/angular';
import postcssImport from 'postcss-import';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@storybook/addon-links',
    'storybook-addon-pseudo-states',
  ],
  framework: {
    name: '@storybook/angular',
    options: {
      compodoc: false,
      tsConfig: '.storybook/tsconfig.json',
    },
  },
  // Angular CLI's webpack pipeline does not pick up the project-level
  // postcss.config.cjs and ships without `postcss-import`. Without it, each
  // @import-ed CSS file is processed by Tailwind in isolation and fails on
  // `@layer utilities` (no matching `@tailwind utilities` in the same module).
  // Inject `postcss-import` as the first PostCSS plugin, so @import directives
  // are inlined before Tailwind sees the file.
  webpackFinal: async (cfg) => {
    const visit = (rules: any[]) => {
      for (const rule of rules ?? []) {
        if (rule?.oneOf) {
          visit(rule.oneOf);
        }
        if (rule?.rules) {
          visit(rule.rules);
        }
        for (const use of rule?.use ?? []) {
          if (typeof use === 'object' && use?.loader?.includes('postcss-loader')) {
            use.options ??= {};
            const pco = use.options.postcssOptions;
            if (typeof pco === 'function') {
              use.options.postcssOptions = (loaderContext: any) => {
                const result = pco(loaderContext) ?? {};
                const plugins = Array.isArray(result.plugins) ? result.plugins : [];
                return { ...result, plugins: [postcssImport(), ...plugins] };
              };
            } else {
              use.options.postcssOptions ??= {};
              use.options.postcssOptions.plugins ??= [];
              if (Array.isArray(use.options.postcssOptions.plugins)) {
                use.options.postcssOptions.plugins.unshift(postcssImport());
              }
            }
          }
        }
      }
    };
    visit(cfg.module?.rules ?? []);
    return cfg;
  },
};

export default config;
