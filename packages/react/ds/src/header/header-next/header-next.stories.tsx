import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../button/button.js';
import { DrawerMenuExample } from '../../drawer/drawer.content.js';
import {
  DrawerBody,
  DrawerFooter,
  DrawerWrapper,
} from '../../drawer/drawer.js';
import { Paragraph } from '../../paragraph/paragraph.js';
import { HeaderGovieLogoHarp, HeaderLogo } from './components/header-logo.js';

import { HeaderTitle } from './components/header-title.js';
import { HeaderMenuItemButton } from './components/menu/components/header-menu-item-button.js';
import { HeaderMenuItemLink } from './components/menu/components/header-menu-item-link.js';
import { HeaderMenuItemSeparator } from './components/menu/components/header-menu-item-separator.js';
import { HeaderMenuItemSlot } from './components/menu/components/header-menu-item-slot.js';
import { HeaderPrimaryMenu } from './components/menu/header-primary-menu.js';
import { HeaderSecondaryMenu } from './components/menu/header-secondary-menu.js';
import { HeaderNext as Header } from './header-next.js';

const meta = {
  title: 'layout/Header-Next',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: StoryObj = {
  render: () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    return (
      <Header>
        <HeaderLogo>
          <HeaderGovieLogoHarp />
        </HeaderLogo>
        <HeaderTitle>Here we goo</HeaderTitle>
        <HeaderSecondaryMenu>
          <HeaderMenuItemLink href="#">Gaeilge</HeaderMenuItemLink>
          <HeaderMenuItemLink href="#">English</HeaderMenuItemLink>
          <HeaderMenuItemSlot>
            <Paragraph size="sm">
              Hello John | <a href="#">Logout</a>
            </Paragraph>
          </HeaderMenuItemSlot>
        </HeaderSecondaryMenu>
        <HeaderPrimaryMenu>
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
          <HeaderMenuItemButton
            showItemMode="mobile-only"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            icon={isDrawerOpen ? 'close' : 'menu'}
          >
            Menu
          </HeaderMenuItemButton>
        </HeaderPrimaryMenu>
        <DrawerWrapper
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          position="right"
          closeButtonSize="large"
        >
          <DrawerBody
            key="body"
            className="gi-border-t-xs gi-border-color-border-system-neutral-subtle"
          >
            <DrawerMenuExample />
          </DrawerBody>
          <DrawerFooter key="footer">
            <Button
              variant="secondary"
              appearance="dark"
              className="gi-justify-center xs:gi-justify-start"
            >
              Cancel
            </Button>
            <Button className="gi-justify-center xs:gi-justify-start">
              Primary
            </Button>
          </DrawerFooter>
        </DrawerWrapper>
      </Header>
    );
  },
};
