import '@ogcio/theme-govie/theme.css';
import type { Preview } from '@storybook/react';
import parserHtml from 'prettier/plugins/html';
import prettier from 'prettier/standalone';
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
    docs: {
      source: {
        /**
         * The `transform` function checks if a `createComponent` function is provided in the story context parameters.
         * and returns the pretty-printed HTML. If not, it returns the original source code.
         * If it exists and is a function, it creates an HTML element using the provided arguments, formats it using Prettier.
         * This is required so that source code in the docs returns correct HTML markup rather than HTML with react syntax e.g. className and style with object.
         */
        transform: async (original: string, storyContext: any) => {
          try {
            const createFunction = storyContext.parameters?.createComponent;

            if (typeof createFunction !== 'function') {
              return original;
            }

            const element = createFunction(storyContext.args);

            if (!element?.outerHTML) {
              return original;
            }
            const pretty = await prettier.format(element.outerHTML, {
              parser: 'html',
              plugins: [parserHtml],
            });

            return pretty.trim();
          } catch {
            return original;
          }
        },
      },
    },
  },
  decorators,
  tags: ['autodocs'],
};

export default preview;
