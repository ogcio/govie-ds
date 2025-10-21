import { initI18n } from '@ogcio/design-system-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './application.tsx';
import '@ogcio/design-system-assets-font-400';

// Initialize i18next before rendering the app
initI18n({
  resources: {
    en: {
      translation: {
        pagination: {
          previous: 'Previous',
          next: 'Next',
          page: 'Page {{currentPage}} of {{totalPages}}',
          goToPage: 'Go to page {{page}}',
          goToPrevious: 'Go to previous page',
          goToNext: 'Go to next page',
        },
      },
    },
    fr: {
      translation: {
        pagination: {
          previous: 'Précédent',
          next: 'Suivant',
          page: 'Page {{currentPage}} sur {{totalPages}}',
          goToPage: 'Aller à la page {{page}}',
          goToPrevious: 'Aller à la page précédente',
          goToNext: 'Aller à la page suivante',
        },
      },
    },
  },
  lng: 'fr', // Toggle here for debugging.
});

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
