'use client';
// TODO: remove use client once HeaderNavItemLink server/client side issue resolved
import { SearchIcon } from '@ogcio/design-system-react/icons';
import {
  LogoBlack,
  LogoHarpBlack,
  LogoWhite,
} from '@ogcio/design-system-react/logos';
import {
  Header,
  HeaderSection,
  HeaderTitle,
  HeaderLogo,
  HeaderNav,
  HeaderNavItem,
  HeaderNavItemLink,
  HeaderNavItemSeparator,
} from '@ogcio/design-system-react/next';
import Image from 'next/image';

export const HeaderComposableLightSample = () => {
  return (
    <HeaderComposableSample
      appearance="light"
      Logo={
        <>
          <LogoBlack className="gi-hidden sm:gi-block" />
          <LogoHarpBlack className="gi-block sm:gi-hidden" />
        </>
      }
    />
  );
};

export const HeaderComposableDontSample = () => {
  return (
    <Header ariaLabel="Site header">
      <HeaderLogo>
        <Image
          alt="govie logo"
          className="gi-block sm:gi-hidden"
          decoding="async"
          loading="eager"
          fetchPriority="high"
          width={25.45}
          height={40}
          src="/logos/general/harp-white.svg"
        />
        <Image
          src="/logos/government-of-ireland/gov-white.svg"
          alt="govie logo"
          className="gi-hidden sm:gi-block"
          decoding="async"
          loading="eager"
          fetchPriority="high"
          width={136}
          height={48}
        />
        <span className="gi-sr-only">Gov.ie logo</span>
      </HeaderLogo>

      <HeaderTitle>Here is a long text title</HeaderTitle>

      <HeaderNav ariaLabel="Primary navigation">
        <HeaderNavItemLink href="#">Item 1</HeaderNavItemLink>
        <HeaderNavItemLink href="#">Item 2</HeaderNavItemLink>
        <HeaderNavItemLink href="#">News</HeaderNavItemLink>
        <HeaderNavItemLink href="#">Departments</HeaderNavItemLink>
        <HeaderNavItemLink href="#">Services</HeaderNavItemLink>
        <HeaderNavItemSeparator />
        <HeaderNavItemLink href="#">Gaeilge</HeaderNavItemLink>
      </HeaderNav>
    </Header>
  );
};

export const HeaderComposableSample = ({
  appearance,
  Logo,
}: {
  appearance: 'light' | 'default';
  Logo: React.ReactNode;
}) => (
  <Header>
    <HeaderSection appearance={appearance} variant="utility">
      <HeaderNav ariaLabel="utility navigation">
        <HeaderNavItem>Gaeilge</HeaderNavItem>
        <HeaderNavItem>English</HeaderNavItem>
      </HeaderNav>
    </HeaderSection>
    <HeaderSection appearance={appearance}>
      {Logo || (
        <HeaderLogo>
          <LogoWhite />
        </HeaderLogo>
      )}
      <HeaderTitle>Application Title</HeaderTitle>
      <HeaderNav ariaLabel="primary navigation">
        <HeaderNavItemLink href="#">News</HeaderNavItemLink>
        <HeaderNavItemLink href="#">Departments</HeaderNavItemLink>
        <HeaderNavItemLink href="#">Services</HeaderNavItemLink>
        <HeaderNavItemSeparator />
        <HeaderNavItem>
          Search
          <SearchIcon />
        </HeaderNavItem>
      </HeaderNav>
    </HeaderSection>
  </Header>
);

export const HeaderComposableGovieSample = () => {
  return (
    <Header aria-label="Site header">
      <HeaderSection appearance="light">
        <HeaderLogo>
          <LogoBlack />
        </HeaderLogo>
        <HeaderNav ariaLabel="primary navigation">
          <HeaderNavItemLink href="#">News</HeaderNavItemLink>
          <HeaderNavItemLink href="#">Departments</HeaderNavItemLink>
          <HeaderNavItemLink href="#">Services</HeaderNavItemLink>
          <HeaderNavItemSeparator />
          <HeaderNavItemLink href="#">Gaeilge</HeaderNavItemLink>
        </HeaderNav>
      </HeaderSection>
    </Header>
  );
};
