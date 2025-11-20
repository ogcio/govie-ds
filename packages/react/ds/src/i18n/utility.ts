import i18next, { t } from 'i18next';
import { initI18n } from './config.js';
import engResources from './translations/en.js';

// Handle case for where the project has not initialised i18next.
export const translate = (key: string, options?: Record<string, any>) => {
  if (i18next.isInitialized) {
    return t(key, options);
  } else {
    initI18n({
      resources: engResources,
    });
    return t(key, options);
  }
};
