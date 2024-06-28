import type { Preview } from '@storybook/react';
import '@govie-react/ds/reset.css';
import '@govie-ds/theme-govie/theme.css';

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
