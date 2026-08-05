import type { StoryObj } from '@storybook/react-vite';
import { HeaderNext } from '@/header/header-next/header-next';
import { HeaderLogo as LegacyHeaderLogo } from '@/header/header-next/components/header-logo';
import { HeaderTitle as LegacyHeaderTitle } from '@/header/header-next/components/header-title';
import { HeaderSecondaryMenu } from '@/header/header-next/components/menu/header-secondary-menu';
import { HeaderPrimaryMenu } from '@/header/header-next/components/menu/header-primary-menu';
import { HeaderMenuItemLink } from '@/header/header-next/components/menu/components/header-menu-item-link';
import { HeaderMenuItemButton } from '@/header/header-next/components/menu/components/header-menu-item-button';
import { HeaderMenuItemSeparator } from '@/header/header-next/components/menu/components/header-menu-item-separator';
import Header from '@/atoms/header/Header';
import HeaderSection from '@/atoms/header/HeaderSection';
import HeaderLogo from '@/atoms/header/HeaderLogo';
import HeaderTitle from '@/atoms/header/HeaderTitle';
import HeaderNav from '@/atoms/header/HeaderNav';
import HeaderNavItem from '@/atoms/header/HeaderNavItem';
import HeaderNavItemLink from '@/atoms/header/HeaderNavItemLink';
import HeaderNavItemSeparator from '@/atoms/header/HeaderNavItemSeparator';
import { LogoWhite, LogoHarpWhite, LogoBlack, LogoHarpBlack } from '@/atoms/icons/logos';

const meta = {
  title: 'Navigation/Header/Migration',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Side-by-side migration check: legacy `HeaderNext` (deprecated) vs the new composable Header family, in both default and light appearances. Use it to confirm the new atoms reproduce the legacy visual.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

type Appearance = 'default' | 'light';

const logos = (appearance: Appearance) => {
  const Harp = appearance === 'light' ? LogoHarpBlack : LogoHarpWhite;
  const Full = appearance === 'light' ? LogoBlack : LogoWhite;
  return (
    <>
      <Harp label="Gov.ie logo" className="gi-block gi-h-10 gi-w-auto sm:gi-hidden" />
      <Full label="Gov.ie logo" className="gi-hidden gi-h-12 gi-w-auto sm:gi-block" />
    </>
  );
};

const legacy = (appearance: Appearance) => (
  <HeaderNext variant={appearance} aria-label="Legacy site header">
    <LegacyHeaderLogo>{logos(appearance)}</LegacyHeaderLogo>
    <LegacyHeaderTitle>Title</LegacyHeaderTitle>
    <HeaderSecondaryMenu>
      <HeaderMenuItemLink href="#" aria-label="Switch to Gaeilge">
        Gaeilge
      </HeaderMenuItemLink>
      <HeaderMenuItemLink href="#" aria-label="Switch to English">
        English
      </HeaderMenuItemLink>
    </HeaderSecondaryMenu>
    <HeaderPrimaryMenu>
      <HeaderMenuItemLink href="#" showItemMode="desktop-only">
        Departments
      </HeaderMenuItemLink>
      <HeaderMenuItemLink href="#" showItemMode="desktop-only">
        Services
      </HeaderMenuItemLink>
      <HeaderMenuItemSeparator />
      <HeaderMenuItemButton aria-label="Toggle FAQ" showItemMode="desktop-only">
        FAQ
      </HeaderMenuItemButton>
      <HeaderMenuItemButton aria-label="Toggle search" showItemMode="desktop-only">
        Search
      </HeaderMenuItemButton>
      <HeaderMenuItemButton aria-label="Toggle menu" showItemMode="mobile-only">
        Menu
      </HeaderMenuItemButton>
    </HeaderPrimaryMenu>
  </HeaderNext>
);

const next = (appearance: Appearance) => (
  <Header ariaLabel="New site header">
    <HeaderSection variant="utility" appearance={appearance}>
      <HeaderNav ariaLabel="Secondary navigation">
        <HeaderNavItemLink href="#" ariaLabel="Switch to Gaeilge">
          Gaeilge
        </HeaderNavItemLink>
        <HeaderNavItemLink href="#" ariaLabel="Switch to English">
          English
        </HeaderNavItemLink>
      </HeaderNav>
    </HeaderSection>
    <HeaderSection variant="primary" appearance={appearance}>
      <HeaderLogo>{logos(appearance)}</HeaderLogo>
      <HeaderTitle>Title</HeaderTitle>
      <HeaderNav ariaLabel="Primary navigation">
        <HeaderNavItemLink href="#" visible="lg">
          Departments
        </HeaderNavItemLink>
        <HeaderNavItemLink href="#" visible="lg">
          Services
        </HeaderNavItemLink>
        <HeaderNavItemSeparator visible="lg" />
        <HeaderNavItem ariaLabel="Toggle FAQ" visible="lg">
          FAQ
        </HeaderNavItem>
        <HeaderNavItem ariaLabel="Toggle search" visible="lg">
          Search
        </HeaderNavItem>
        <HeaderNavItem ariaLabel="Toggle menu" visible={{ base: true, lg: false }}>
          Menu
        </HeaderNavItem>
      </HeaderNav>
    </HeaderSection>
  </Header>
);

const Row = ({ label, children }: { label: string; children: any }) => (
  <div>
    <p className="gi-mb-2 gi-text-sm gi-font-bold">{label}</p>
    {children}
  </div>
);

export const LegacyVsNext: Story = {
  tags: ['skip-playwright'],
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-10 gi-p-4">
      <Row label="Legacy — default (@deprecated)">{legacy('default')}</Row>
      <Row label="New — default (/next)">{next('default')}</Row>
      <Row label="Legacy — light (@deprecated)">{legacy('light')}</Row>
      <Row label="New — light (/next)">{next('light')}</Row>
    </div>
  ),
};
