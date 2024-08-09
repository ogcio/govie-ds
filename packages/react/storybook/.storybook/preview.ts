import type { Preview } from '@storybook/react';
import '@fontsource/lato';
import '@govie-react/ds/reset.css';
import '@govie-ds/theme-govie/theme.css';
import './global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
  },
};

export default preview;
