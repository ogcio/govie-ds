import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from '@/atoms/Header';
import HeaderSection from '@/atoms/HeaderSection';
import HeaderLogo from '@/atoms/HeaderLogo';
import HeaderTitle from '@/atoms/HeaderTitle';
import HeaderNav from '@/atoms/HeaderNav';
import HeaderNavItem from '@/atoms/HeaderNavItem';
import HeaderNavItemLink from '@/atoms/HeaderNavItemLink';
import HeaderNavItemSeparator from '@/atoms/HeaderNavItemSeparator';
import Container from '@/atoms/Container';
import { LogoWhite, LogoHarpWhite } from '@/atoms/icons/logos';
import * as stories from '@/atoms/storybook/Header.meta';

const meta = {
  ...stories.headerMeta,
  title: 'Navigation/Header',
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  ...stories.HeaderComposed,
  tags: ['skip-playwright'],
  render: (_props) => (
    <Header ariaLabel="Site header" className="gi-bg-color-surface-system-primary-default" dataTestId="header-composed">
      <HeaderSection variant="secondary" className="gi-order-1 gi-bg-color-surface-system-primary-subtle">
        <Container>
          <HeaderNav variant="secondary" ariaLabel="Secondary navigation">
            <HeaderNavItemLink
              href="#"
              ariaLabel="Switch to Gaeilge"
              visited="none"
              className="gi-px-2 gi-py-1 gi-text-sm gi-text-white gi-rounded-sm hover:gi-bg-black hover:gi-bg-opacity-20 focus:gi-outline focus:gi-outline-[2px] focus:gi-outline-color-shadow-intent-focus-default focus:gi-outline-offset-0 focus:gi-bg-black focus:gi-bg-opacity-20"
            >
              Gaeilge
            </HeaderNavItemLink>
            <HeaderNavItemLink
              href="#"
              ariaLabel="Switch to English"
              visited="none"
              className="gi-px-2 gi-py-1 gi-text-sm gi-text-white gi-rounded-sm hover:gi-bg-black hover:gi-bg-opacity-20 focus:gi-outline focus:gi-outline-[2px] focus:gi-outline-color-shadow-intent-focus-default focus:gi-outline-offset-0 focus:gi-bg-black focus:gi-bg-opacity-20"
            >
              English
            </HeaderNavItemLink>
          </HeaderNav>
        </Container>
      </HeaderSection>
      <Container className="gi-order-2 gi-min-w-0">
        <HeaderSection variant="primary" className="gi-bg-color-surface-system-primary-default">
          <HeaderLogo>
            <LogoHarpWhite label="Gov.ie logo" className="gi-block gi-h-10 gi-w-auto sm:gi-hidden" />
            <LogoWhite label="Gov.ie logo" className="gi-hidden gi-h-12 gi-w-auto sm:gi-block" />
          </HeaderLogo>
          <HeaderTitle className="gi-text-white">Title</HeaderTitle>
          <HeaderNav variant="primary" ariaLabel="Primary navigation">
            <HeaderNavItemLink href="#" showItemMode="desktop-only" visited="none" className="gi-text-white">
              Departments
            </HeaderNavItemLink>
            <HeaderNavItemLink href="#" showItemMode="desktop-only" visited="none" className="gi-text-white">
              Services
            </HeaderNavItemLink>
            <HeaderNavItemSeparator className="gi-border-white" />
            <HeaderNavItem
              ariaLabel="Toggle FAQ"
              ariaExpanded={false}
              ariaControls="faq-panel"
              showItemMode="desktop-only"
              className="gi-text-white"
            >
              FAQ
            </HeaderNavItem>
            <HeaderNavItem
              ariaLabel="Toggle search"
              ariaExpanded={false}
              showItemMode="desktop-only"
              className="gi-text-white"
            >
              Search
            </HeaderNavItem>
            <HeaderNavItem
              ariaLabel="Toggle menu"
              ariaExpanded={false}
              showItemMode="mobile-only"
              className="gi-text-white"
            >
              Menu
            </HeaderNavItem>
          </HeaderNav>
        </HeaderSection>
      </Container>
    </Header>
  ),
};
