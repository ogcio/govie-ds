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

// Initialize i18next globally for Storybook
i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  debug: true,
  resources: {
    en: {
      // TODO add the following to constants file
      translation: {
        'pagination.previous': 'Previous',
        'pagination.next': 'Next',
        'pagination.page': 'Page {{currentPage}} of {{totalPages}}',
        'pagination.goToPage': 'Go to page {{page}}',
        'pagination.goToPrevious': 'Go to previous',
        'pagination.goToNext': 'Go to next',
      },
    },
  },
  interpolation: { escapeValue: false }, // Prevent escaping of values
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
