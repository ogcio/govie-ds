'use client';
import {
  DrawerBody,
  DrawerWrapper,
  ListItem,
} from '@ogcio/design-system-react';
import {
  Header,
  HeaderSection,
  HeaderLogo,
  HeaderTitle,
  HeaderNav,
  HeaderNavItem,
  Link,
  HeaderNavItemLink,
} from '@ogcio/design-system-react/next';
import NextLink from 'next/link';

import { LogoHarpWhite, LogoWhite } from '@ogcio/design-system-react/logos';
import { MenuIcon } from '@ogcio/design-system-react/icons';
import { useState } from 'react';

const links = [
  { label: 'Get Started', href: '/get-started/' },
  { label: 'Foundations', href: '/foundations/' },
  { label: 'Components', href: '/components/' },
  { label: 'Patterns', href: '/patterns/' },
  { label: 'Themes', href: '/themes/' },
  { label: 'Resources', href: '/resources/' },
];

export const DocsHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerId = 'GoivieDocsMobileDrawer';

  return (
    <>
      <Header>
        <HeaderSection>
          <HeaderLogo>
            <Link ariaLabel="Homepage" asChild appearance="light">
              <NextLink href="/">
                <LogoWhite className="gi-hidden sm:gi-block" />
                <LogoHarpWhite size={25} className="sm:gi-hidden" />
              </NextLink>
            </Link>
          </HeaderLogo>
          <HeaderTitle>Design System</HeaderTitle>
          <HeaderNav ariaLabel="Primary navigation">
            {links.map(({ label, href }) => (
              <HeaderNavItemLink asChild key={href} visible="xl">
                <NextLink href={href}>{label}</NextLink>
              </HeaderNavItemLink>
            ))}
            <HeaderNavItem
              onClick={() => {
                setDrawerOpen(true);
              }}
              visible={{ base: true, xl: false }}
              ariaControls={drawerId}
              ariaExpanded={drawerOpen}
              ariaLabel="Open navigation menu"
            >
              Menu
              <MenuIcon />
            </HeaderNavItem>
          </HeaderNav>
        </HeaderSection>
      </Header>
      <DrawerWrapper
        id={drawerId}
        isOpen={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
        position="right"
        closeButtonSize="large"
        aria-label="Navigation menu"
      >
        <DrawerBody className="gi-border-t-xs gi-border-color-border-system-neutral-subtle">
          <ul>
            {links.map((link, index) => (
              <li key={`${index}_${link.label}`}>
                <ListItem
                  label={link.label}
                  href={link.href}
                  slot={
                    (
                      <NextLink
                        href={link.href}
                        onNavigate={() => {
                          setDrawerOpen(false);
                        }}
                      >
                        <span className="gi-text-sm gi-ml-1">{link.label}</span>
                      </NextLink>
                    ) as never
                  }
                />
              </li>
            ))}
          </ul>
        </DrawerBody>
      </DrawerWrapper>
    </>
  );
};
