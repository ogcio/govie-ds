import { HeaderLegacy } from './header-legacy.js';
import { HeaderNext } from './header-next/header-next.js';
import { HeaderNextProps, HeaderProps } from './types.js';

const deprecatedKeys = [
  'title',
  'logo',
  'appearance',
  'addDefaultMobileMenu',
  'mobileMenuLabel',
  'showMenuLabel',
  'items',
  'secondaryLinks',
  'showTitleOnMobile',
] as const;

export const Header = (props: HeaderProps | HeaderNextProps) => {
  const isLegacy = deprecatedKeys.some((key) => key in props);

  if (isLegacy) {
    console.warn(
      '[Header] Using legacy props. Please migrate to the new composable API.',
    );
    return <HeaderLegacy {...props} />;
  }

  return <HeaderNext {...props} />;
};
