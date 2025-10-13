'use client';
import {
  DrawerBody,
  DrawerWrapper,
  Header,
  HeaderLogo,
  HeaderMenuItemButton,
  HeaderMenuItemLink,
  HeaderPrimaryMenu,
  HeaderTitle,
  ListItem,
  useToggleMap,
} from '@ogcio/design-system-react';

import Image from 'next/image';

const links = [
  { label: 'Get Started', href: '/get-started/' },
  { label: 'Foundations', href: '/foundations/' },
  { label: 'Components', href: '/components/' },
  { label: 'Patterns', href: '/patterns/' },
  { label: 'Themes', href: '/themes/' },
  { label: 'Resources', href: '/resources/' },
];

export const DocsHeader = () => {
  const [{ drawer }, { toggle, closeAll }] = useToggleMap({
    drawer: false,
  });

  const menuIcon = drawer ? 'close' : 'menu';
  const drawerId = 'GoivieDocsMobileDrawer';

  return (
    <>
      <Header fullWidth variant="default" aria-label="Site header">
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

        <HeaderTitle id="site-title">Design System</HeaderTitle>

        <HeaderPrimaryMenu aria-label="Primary navigation">
          {links.map((link) => (
            <HeaderMenuItemLink
              key={link.href}
              href={link.href}
              showItemMode="desktop-only"
            >
              {link.label}
            </HeaderMenuItemLink>
          ))}

          <HeaderMenuItemButton
            showItemMode="mobile-only"
            icon={menuIcon}
            aria-label="Open navigation menu"
            aria-haspopup="dialog"
            aria-expanded={drawer}
            aria-controls={drawerId}
            onClick={() => toggle('drawer')}
          >
            Menu
          </HeaderMenuItemButton>
        </HeaderPrimaryMenu>
      </Header>

      <DrawerWrapper
        id={drawerId}
        isOpen={drawer}
        onClose={closeAll}
        position="right"
        closeButtonSize="large"
        aria-label="Navigation menu"
      >
        <DrawerBody className="gi-border-t-xs gi-border-color-border-system-neutral-subtle">
          <ul>
            {links.map((link, index) => (
              <li key={`${index}_${link.label}`}>
                <ListItem {...link} />
              </li>
            ))}
          </ul>
        </DrawerBody>
      </DrawerWrapper>
    </>
  );
};
