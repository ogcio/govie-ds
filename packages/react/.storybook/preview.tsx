import '@ogcio/theme-govie/theme.css';
import '@ogcio/theme-doete/light.css';
import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react-vite';
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from 'storybook/viewport';
// Required for Storybook dev; fonts are bundled into styles.css during build
import '../fonts.css';
import '../styles.css';
import './global.css';
import { initI18n } from '../src/i18n/config';
import enTranslations from '../src/i18n/translations/en.json';

initI18n({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    ...enTranslations,
  },
});

const preview: Preview = {
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
    a11y: { test: 'error' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /date$/i,
      },
    },
    viewport: {
      options: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
    },
  },

  tags: ['autodocs'],

  initialGlobals: {
    viewport: {
      value: 'responsive',
    },
  },
};

export default preview;
