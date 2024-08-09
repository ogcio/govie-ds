import { destroyGovIe, initGovIe } from '@govie-frontend/ds';
import type { Preview } from '@storybook/web-components';
import React, { useEffect } from 'react';
import '@fontsource/lato';
import '@govie-ds/theme-govie/theme.css';
import './global.css';
import '../../ds/styles.css';

// DOMContentLoaded fires for each story on the Docs page
// so we need to destroy and re-initialise the components for each event
document.addEventListener('DOMContentLoaded', () => {
  destroyGovIe();
  initGovIe();
});

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
  },
};

export default preview;
