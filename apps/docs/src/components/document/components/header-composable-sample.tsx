import {
  HeaderMenuItemButton as BaseHeaderMenuItemButton,
  HeaderMenuItemLink as BaseHeaderMenuItemLink,
  HeaderGovieLogoHarp as BaseHeaderGovieLogoHarp,
  HeaderMenuItemSeparator as BaseHeaderMenuItemSeparator,
  HeaderMenuItemSlot as BaseHeaderMenuItemSlot,
  HeaderPrimaryMenu as BaseHeaderPrimaryMenu,
  HeaderSlotContainer as BaseHeaderSlotContainer,
  HeaderSecondaryMenu as BaseHeaderSecondaryMenu,
  HeaderTitle as BaseHeaderTitle,
  HeaderLogo as BaseHeaderLogo,
  Header,
} from '@ogcio/design-system-react';

const HeaderMenuItemButton = (props: any) => (
  <BaseHeaderMenuItemButton {...props} __type="HeaderMenuItemButton" />
);

const HeaderLogo = (props: any) => (
  <BaseHeaderLogo {...props} __type="HeaderLogo" />
);

const HeaderMenuItemLink = (props: any) => (
  <BaseHeaderMenuItemLink {...props} __type="HeaderMenuItemLink" />
);

const HeaderGovieLogoHarp = (props: any) => (
  <BaseHeaderGovieLogoHarp {...props} __type="HeaderGovieLogoHarp" />
);

const HeaderMenuItemSeparator = (props: any) => (
  <BaseHeaderMenuItemSeparator {...props} __type="HeaderMenuItemSeparator" />
);

const HeaderMenuItemSlot = (props: any) => (
  <BaseHeaderMenuItemSlot {...props} __type="HeaderMenuItemSlot" />
);

const HeaderPrimaryMenu = (props: any) => (
  <BaseHeaderPrimaryMenu {...props} __type="HeaderPrimaryMenu" />
);
const HeaderSlotContainer = (props: any) => (
  <BaseHeaderSlotContainer {...props} __type="HeaderSlotContainer" />
);

const HeaderSecondaryMenu = (props: any) => (
  <BaseHeaderSecondaryMenu {...props} __type="HeaderSecondaryMenu" />
);

const HeaderTitle = (props: any) => (
  <BaseHeaderTitle {...props} __type="HeaderTitle" />
);

export const HeaderComposableLightSample = () => {
  return <HeaderComposableSample variant="light" />;
};

export const HeaderComposableDontSample = () => {
  return (
    <Header variant="default" aria-label="Site header" id="govieHeaderSample">
      <HeaderLogo>
        <HeaderGovieLogoHarp />
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

export const HeaderComposableSample = ({ Logo, ...props }: any) => {
  return (
    <Header
      variant="default"
      aria-label="Site header"
      id="govieHeaderSample"
      {...props}
    >
      <HeaderLogo>
        <HeaderGovieLogoHarp />
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
