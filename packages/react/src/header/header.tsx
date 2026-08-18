import { HeaderLegacy } from './header-legacy.js';
import { HeaderNext } from './header-next/header-next.js';
import type { HeaderNextProps, HeaderProps } from './types.js';

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
/** @deprecated Use the new composable `Header` from `@ogcio/design-system-react/next`. See the [migration guide](https://ds.services.gov.ie/components/library/header/react/#migration-guide) for more information */
export const Header = (props: HeaderProps | HeaderNextProps) => {
  const isLegacy = deprecatedKeys.some((key) => key in props);

  if (isLegacy) {
    console.warn('[Header] Using legacy props. Please migrate to the new composable API.');
    return <HeaderLegacy {...props} />;
  }

  return <HeaderNext {...props} />;
};
