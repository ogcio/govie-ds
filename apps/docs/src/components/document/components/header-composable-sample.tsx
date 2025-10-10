import {
  HeaderMenuItemButton as BaseHeaderMenuItemButton,
  HeaderMenuItemLink as BaseHeaderMenuItemLink,
  HeaderMenuItemSeparator as BaseHeaderMenuItemSeparator,
  HeaderPrimaryMenu as BaseHeaderPrimaryMenu,
  HeaderSecondaryMenu as BaseHeaderSecondaryMenu,
  HeaderTitle as BaseHeaderTitle,
  HeaderLogo as BaseHeaderLogo,
  Header,
} from '@ogcio/design-system-react';
import Image from 'next/image';

const HeaderMenuItemButton = (props: any) => (
  <BaseHeaderMenuItemButton {...props} __type="HeaderMenuItemButton" />
);

const HeaderLogo = (props: any) => (
  <BaseHeaderLogo {...props} __type="HeaderLogo" />
);

const HeaderMenuItemLink = (props: any) => (
  <BaseHeaderMenuItemLink {...props} __type="HeaderMenuItemLink" />
);

const HeaderMenuItemSeparator = (props: any) => (
  <BaseHeaderMenuItemSeparator {...props} __type="HeaderMenuItemSeparator" />
);

const HeaderPrimaryMenu = (props: any) => (
  <BaseHeaderPrimaryMenu {...props} __type="HeaderPrimaryMenu" />
);

const HeaderSecondaryMenu = (props: any) => (
  <BaseHeaderSecondaryMenu {...props} __type="HeaderSecondaryMenu" />
);

const HeaderTitle = (props: any) => (
  <BaseHeaderTitle {...props} __type="HeaderTitle" />
);

export const HeaderComposableLightSample = () => {
  return (
    <HeaderComposableSample
      variant="light"
      Logo={
        <>
          <Image
            alt="govie logo"
            className="gi-block sm:gi-hidden"
            decoding="async"
            loading="eager"
            fetchPriority="high"
            width={25.45}
            height={40}
            src="/logos/general/harp-black.svg"
          />
          <Image
            src="/logos/government-of-ireland/gov-black.svg"
            alt="govie logo"
            className="gi-hidden sm:gi-block"
            decoding="async"
            loading="eager"
            fetchPriority="high"
            width={136}
            height={48}
          />
          <span className="gi-sr-only">Gov.ie logo</span>
        </>
      }
    />
  );
};

export const HeaderComposableDontSample = () => {
  return (
    <Header variant="default" aria-label="Site header">
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

      <HeaderPrimaryMenu>
        <HeaderMenuItemLink href="#" showItemMode="desktop-only">
          Item 1
        </HeaderMenuItemLink>
        <HeaderMenuItemLink href="#" showItemMode="desktop-only">
          Item 2
        </HeaderMenuItemLink>
        <HeaderMenuItemLink href="#" showItemMode="desktop-only">
          News
        </HeaderMenuItemLink>
        <HeaderMenuItemLink href="#" showItemMode="desktop-only">
          Departments
        </HeaderMenuItemLink>
        <HeaderMenuItemLink href="#" showItemMode="desktop-only">
          Services
        </HeaderMenuItemLink>
        <HeaderMenuItemSeparator />
        <HeaderMenuItemLink href="#" showItemMode="always">
          Gaelige
        </HeaderMenuItemLink>
      </HeaderPrimaryMenu>
    </Header>
  );
};

export const HeaderComposableSample = ({ variant, Logo }: any) => {
  return (
    <Header variant={variant || 'default'} aria-label="Site header">
      <HeaderLogo>
        {Logo || (
          <>
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
          </>
        )}
      </HeaderLogo>

      <HeaderTitle>Application Title</HeaderTitle>

      <HeaderPrimaryMenu>
        <HeaderMenuItemLink href="#" showItemMode="desktop-only">
          News
        </HeaderMenuItemLink>
        <HeaderMenuItemLink href="#" showItemMode="desktop-only">
          Departments
        </HeaderMenuItemLink>
        <HeaderMenuItemLink href="#" showItemMode="desktop-only">
          Services
        </HeaderMenuItemLink>
        <HeaderMenuItemSeparator />
        <HeaderMenuItemButton
          showItemMode="desktop-only"
          icon="search"
          aria-label="Toggle site search"
        >
          Search
        </HeaderMenuItemButton>
      </HeaderPrimaryMenu>
      <HeaderSecondaryMenu>
        <HeaderMenuItemLink href="#">Gaeilge</HeaderMenuItemLink>
        <HeaderMenuItemLink href="#">English</HeaderMenuItemLink>
      </HeaderSecondaryMenu>
    </Header>
  );
};

export const HeaderComposableGovieSample = () => {
  return (
    <Header variant="default" aria-label="Site header">
      <HeaderLogo>
        <Image
          src="https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/gov.ie/harp-gold-text-white.svg"
          alt="govie logo"
          decoding="async"
          loading="eager"
          fetchPriority="high"
          width={136}
          height={48}
        />
        <span className="gi-sr-only">Gov.ie logo</span>
      </HeaderLogo>
      <HeaderPrimaryMenu>
        <HeaderMenuItemLink href="#" showItemMode="desktop-only">
          News
        </HeaderMenuItemLink>
        <HeaderMenuItemLink href="#" showItemMode="desktop-only">
          Departments
        </HeaderMenuItemLink>
        <HeaderMenuItemLink href="#" showItemMode="desktop-only">
          Services
        </HeaderMenuItemLink>
        <HeaderMenuItemSeparator />
        <HeaderMenuItemLink href="#" showItemMode="always">
          Gaelige
        </HeaderMenuItemLink>
      </HeaderPrimaryMenu>
    </Header>
  );
};
