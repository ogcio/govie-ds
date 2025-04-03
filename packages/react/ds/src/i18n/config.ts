import { init, Resource } from 'i18next';

export { default as i18next } from 'i18next';

export const initI18n = (config: {
  resources: Resource;
  lng?: string;
  fallbackLng?: string;
}) => {
  init({
    resources: config.resources,
    lng: config.lng || 'en',
    fallbackLng: config.fallbackLng || 'en',
  });
};
