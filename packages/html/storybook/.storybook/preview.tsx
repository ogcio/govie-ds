import { destroyGovIe, initGovIe } from '@govie-frontend/ds';
import { DocsContainer } from '@storybook/addon-docs';
import type { Preview } from '@storybook/react';
import React, { useEffect } from 'react';
import '@fontsource/lato';
import '@govie-ds/theme-govie/theme.css';
import './global.css';
import '../../ds/styles.css';

export const decorators = [
  (Story, context) => {
    useEffect(() => {
      destroyGovIe();
      initGovIe();
    }, []);

    const storyResult = Story(context);

    if (typeof storyResult === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: storyResult }} />;
    }

    return storyResult;
  },
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
    docs: {
      source: {
        transform: (code) => {
          console.log(code);
          return code;
        },
      },
      container: ({ children, context }) => {
        return <DocsContainer context={context}>{children}</DocsContainer>;
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
