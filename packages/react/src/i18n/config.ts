import i18next, { type Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

export { default as i18next } from 'i18next';

export const initI18n = (config: {
  resources: Resource;
  lng?: string;
  fallbackLng?: string;
}) => {
  i18next.use(initReactI18next).init({
    resources: config.resources,
    lng: config.lng || 'en',
    fallbackLng: config.fallbackLng || 'en',
  });

  return i18next;
};
