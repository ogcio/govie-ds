import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-docs',
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@storybook/addon-links',
    // TODO: re-enable when we're ready to surface the doete theme switcher.
    // The addon was dropped during the Storybook 9 upgrade (commit 84e6481d)
    // while the decorator in preview.tsx and the @ogcio/theme-doete CSS
    // import stayed behind. Enabling this line brings back the toolbar
    // dropdown (govie ⇄ doete). Kept disabled for now to avoid side effects.
    // '@storybook/addon-themes',
    'storybook-addon-pseudo-states',
    '@storybook/addon-vitest',
  ],

  core: {
    builder: '@storybook/builder-vite',
  },

  build: {
    test: {
      disabledAddons: ['@storybook/addon-docs'],
    },
  },

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
