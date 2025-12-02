import '@ogcio/theme-govie/theme.css';
import type { Preview } from '@storybook/react';
import { useEffect } from 'react';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import '../styles.css';
import './global.css';
import { destroyGovIe, initGovIe } from '@ogcio/design-system-html';

const decorators = [
  (Story, context) => {
    useEffect(() => {
      destroyGovIe();
      initGovIe();
    }, []);

    return Story(context);
  },
];

const preview: Preview = {
  parameters: {
    a11y: { test: 'error' },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
      defaultViewport: 'responsive',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
  },
  decorators,
  tags: ['autodocs'],
};

export default preview;
