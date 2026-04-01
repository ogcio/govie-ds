import type { Preview } from '@storybook/nextjs-vite';
import '@ogcio/design-system-react/fonts.css';
import '@ogcio/theme-govie/theme.css';
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
