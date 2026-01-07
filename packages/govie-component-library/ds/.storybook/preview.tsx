import './global.css';
import '@ogcio/theme-govie/theme.css';
import '../tailwind.css';

import { defineCustomElements } from '../loader/index.js';
import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
import { createElement, Fragment } from 'react';

defineCustomElements();

const preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        govie: '',
        doete: 'doete-light',
      },
      defaultTheme: '',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
    docs: {
      page: () =>
        createElement(
          Fragment,
          null,
          createElement(Title, null),
          createElement(Subtitle, null),
          createElement(Description, null),
          createElement(Primary, null),
          createElement(Controls, null),
          createElement(Stories, { includePrimary: false }),
        ),
    },
    a11y: { test: 'error' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
      defaultViewport: 'responsive',
    },
  },
  tags: ['autodocs'],
};

export default preview;
