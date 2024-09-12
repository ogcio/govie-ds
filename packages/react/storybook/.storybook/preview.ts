import type { Preview } from '@storybook/react';
import '@fontsource/lato/100.css';
import '@fontsource/lato/300.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/lato/900.css';
import '@govie-react/ds/styles.css';
import '@govie-ds/theme-govie/theme.css';
import './global.css';
import '../../ds/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
