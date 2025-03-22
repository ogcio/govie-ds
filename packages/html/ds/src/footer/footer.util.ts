export const getLogoContaier = (customClass = '', source = '') => {
  const logoContainer = document.createElement('div');
  logoContainer.className =
    customClass.length === 0 ? 'gi-footer-logo' : customClass;

  const img = document.createElement('img');
  img.className = 'gi-h-16';
  img.src =
    source.length === 0
      ? 'https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/gov-of-ireland/harp-gold-text-green.svg'
      : source;
  img.alt = 'Footer logo';

  logoContainer.append(img);

  return logoContainer;
};
