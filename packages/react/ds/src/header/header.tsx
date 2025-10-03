import { HeaderLegacy } from './header-legacy.js';
import { HeaderNext } from './header-next/header-next.js';
import { HeaderProps } from './types.js';

const deprecatedKeys = [
  'title',
  'logo',
  'addDefaultMobileMenu',
  'mobileMenuLabel',
  'showMenuLabel',
  'items',
  'secondaryLinks',
  'showTitleOnMobile',
] as const;

export const Header = (props: HeaderProps) => {
  const isLegacy = deprecatedKeys.some((key) => key in props);

  if (isLegacy) {
    console.warn(
      '[Header] Using legacy props. Please migrate to the new composable API.',
    );
    return <HeaderLegacy {...props} />;
  }

  return <HeaderNext {...props} />;
};
