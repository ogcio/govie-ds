import {
  INITIAL_VIEWPORTS,
  MINIMAL_VIEWPORTS,
} from '@storybook/addon-viewport';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from '@storybook/blocks';
import type { Preview } from '@storybook/react';
import '@govie-ds/theme-govie/theme.css';
import './global.css';
import '../styles.css';
import React from 'react';
import i18n from 'i18next';
import enTranslations from '../src/i18n/translations/en.json';

i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  resources: {
    ...enTranslations,
  },
  interpolation: { escapeValue: false },
});

const preview: Preview = {
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
