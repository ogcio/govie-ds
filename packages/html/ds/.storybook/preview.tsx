import '@govie-ds/theme-govie/theme.css';
import {
  INITIAL_VIEWPORTS,
  MINIMAL_VIEWPORTS,
} from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';
import React, { useEffect } from 'react';
import { destroyGovIe, initGovIe } from '@govie-ds/html';
import '../styles.css';
import './global.css';

const decorators = [
  (Story) => {
    document.body.style.height = '100vh';
    document.body.style.margin = '0';
    return <Story />;
  },
  (Story, context) => {
    useEffect(() => {
      destroyGovIe();
      initGovIe();
    }, []);

    const storyResult = Story(context);
    return <div dangerouslySetInnerHTML={{ __html: storyResult }} />;
  },
];

const preview: Preview = {
  parameters: {
    a11y: {
      options: {},
    },
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
    docs: {
      source: {
        transform: (code: string) => {
          return code.slice(2, -2);
        },
      },
    },
  },
  decorators,
  tags: ['autodocs'],
};

export default preview;
