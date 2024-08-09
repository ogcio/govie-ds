import { destroyGovIe, initGovIe } from '@govie-frontend/ds';
import { renderMacro } from '@govie-frontend/macro';
import type { Preview } from '@storybook/react';
import React, { useContext, useEffect } from 'react';
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
        transform: (_, context) => {
          const { args, parameters } = context;

          if (!parameters.macro) {
            throw new Error('No macro found in parameters.');
          }

          if (!parameters.macro.html) {
            throw new Error('No html found in macro.');
          }

          if (!parameters.macro.name) {
            throw new Error('No name found in macro.');
          }

          const renderedMacro = renderMacro({
            macro: parameters.macro.html,
            name: parameters.macro.name,
          })(args);

          const macroOptions = JSON.stringify(args, null, 2);

          const lines = [
            '// Macro',
            `{{ ${parameters.macro.name}(${macroOptions})} }}`,
            '',
            '// HTML',
            renderedMacro,
          ];

          return lines.join('\n');
        },
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
