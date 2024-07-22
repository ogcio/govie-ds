import type { Preview } from '@storybook/react';
import '@fontsource/lato';
import '@govie-ds/theme-govie/theme.css';
import './global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
