import { destroyGovIe, initGovIe } from '@govie-ds/html';
import { renderMacro } from '@govie-ds/macro';
import {
  INITIAL_VIEWPORTS,
  MINIMAL_VIEWPORTS,
} from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';
import React, { useEffect } from 'react';
import '@govie-ds/theme-govie/theme.css';
import './global.css';
import '../../ds/styles.css';

// add decorators for button
const Decorator = (arguments_, parameters) => {
  if (
    parameters?.macro?.name === 'govieButton' ||
    parameters?.macro?.name === 'govieIconButton'
  ) {
    let classes = 'gi-p-4';
    if (arguments_.appearance === 'light') {
      classes += ' gi-bg-black';
    }
    return classes;
  }
  if (parameters?.macro?.name === 'govieSpinner') {
    return 'gi-stroke-gray-950';
  }
};

// add decorators for modal
const ModalDecorator = (_, parameters) => {
  if (parameters?.macro?.name !== 'govieModal') {
    return {};
  }
  return {
    height: '400px',
  };
};

export const decorators = [
  (Story, context) => {
    useEffect(() => {
      destroyGovIe();
      initGovIe();
    }, []);
    const { args, parameters } = context;
    const isProd = import.meta.env.STORYBOOK_ENV === 'prod';
    if (isProd && parameters.macro) {
      parameters.macro.path = './macros';
    }

    const storyResult = Story(context);

    if (typeof storyResult === 'string') {
      return (
        <div
          style={ModalDecorator(args, parameters)}
          className={Decorator(args, parameters)}
          dangerouslySetInnerHTML={{ __html: storyResult }}
        />
      );
    }

    const renderedMacro = renderMacro(parameters.macro)(args);
    return (
      <div
        style={ModalDecorator(args, parameters)}
        className={Decorator(args, parameters)}
        dangerouslySetInnerHTML={{ __html: renderedMacro }}
      />
    );
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
        transform: (_, context) => {
          const { args, parameters } = context;
          const isProd = import.meta.env.STORYBOOK_ENV === 'prod';

          if (isProd && parameters.macro) {
            parameters.macro.path = './macros';
          }

          if (!parameters.macro) {
            return parameters.renderedHtml || 'No content available';
          }

          if (!parameters.macro.html) {
            throw new Error('No html found in macro.');
          }

          if (!parameters.macro.name) {
            throw new Error('No name found in macro.');
          }

          const renderedMacro = renderMacro(parameters.macro)(args);
          const macroOptions = JSON.stringify(args, null, 2);

          const lines = [
            '// Macro',
            `{{ ${parameters.macro.name}(${macroOptions}) }}`,
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
