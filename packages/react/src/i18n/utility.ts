import i18next, { t as i18nextT } from 'i18next';

// Handle case for where the project has not initialised i18next.
export const translate = (key: string, options?: Record<string, any>) => {
  if (i18next.isInitialized) {
    return i18nextT(key, options);
  }
  return options?.defaultValue || key;
};
