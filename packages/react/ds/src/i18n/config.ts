import i18next from 'i18next';

export const initI18n = (config: {
  resources: Record<string, any>;
  lng?: string;
  fallbackLng?: string;
}) => {
  i18next.init({
    resources: config.resources,
    lng: config.lng || 'en',
    fallbackLng: config.fallbackLng || 'en',
    debug: true,
  });
};

export { i18next };
