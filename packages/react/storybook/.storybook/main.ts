import type { StorybookConfig } from '@storybook/react-vite';

// Exclude node_modules, see https://github.com/storybookjs/storybook/discussions/27055
const config: StorybookConfig = {
  stories: [
    '../../ds/**/*.mdx',
    '../../ds/**!(node_modules)/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
