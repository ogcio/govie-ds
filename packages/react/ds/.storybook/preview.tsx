import '@govie-ds/theme-govie/theme.css';
import '@govie-ds/theme-doete/light.css';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import {
  INITIAL_VIEWPORTS,
  MINIMAL_VIEWPORTS,
} from '@storybook/addon-viewport';
import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/blocks';
import type { Preview } from '@storybook/react';
import i18n from 'i18next';
import React from 'react';
import enTranslations from '../src/i18n/translations/en.json';
import '../styles.css';
import './global.css';

i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    ...enTranslations,
  },
  interpolation: { escapeValue: false },
});

const preview: Preview = {
  decorators: [
    (Story) => {
      document.body.style.height = '100vh';
      document.body.style.margin = '0';
      return <Story />;
    },
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
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
    },
    a11y: {
      options: {},
    },
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
