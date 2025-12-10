import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { expect, userEvent, within } from 'storybook/test';
import {
  createElement,
  createHeader,
  defaultHeaderItems,
  defaultHeaderProps,
  mobileHeaderMenuItems,
  slotSearch,
} from '../helpers/header';
import type { HeaderProps } from './types';

const meta: Meta<HeaderProps> = {
  title: 'Layout/Header',
};

export default meta;
type Story = StoryObj<HeaderProps>;

export const Default: Story = {
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the Header',
      table: {
        category: 'Header',
      },
    },
    logo: {
      control: 'object',
      description: 'The url and image for the logo',
      table: {
        category: 'Header',
      },
    },
    items: {
      control: 'object',
      description: 'Actionable items such as CTAs, links, slots, or dividers',
      table: {
        category: 'Header',
        type: {
          summary: 'HeaderItem[]',
        },
      },
    },
    secondaryLinks: {
      description: 'A list of secondary navigation links',
      table: {
        category: 'Header',
      },
    },
    addDefaultMobileMenu: {
      control: 'boolean',
      description:
        'If true, adds a default mobile menu to the header according with your "items" ',
      table: {
        category: 'Header',
      },
    },
    mobileMenuLabel: {
      control: 'text',
      description:
        'Change the mobile menu label when "addDefaultMobileMenu" is set',
      table: {
        category: 'Header',
      },
    },
    showTitleOnMobile: {
      control: 'boolean',
      description:
        'If true, the title will be shown on mobile, if false it will be hidden',
      table: {
        category: 'Header',
      },
    },
  },
  args: {
    logo: {
      href: '/link',
    },
    ...defaultHeaderProps(),
    mobileMenuLabel: 'Menu',
  },
  render: createElement,
  parameters: {
    createComponent: createHeader,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const buttontrigger = canvas.getByTestId('ItemActionTrigger-4');

    const slotContainer = canvas.queryByTestId('SlotContainer-4');
    await expect(slotContainer).not.toBeVisible();

    await userEvent.click(buttontrigger);

    const openedSlot = canvas.getByTestId('SlotContainer-4');
    await expect(openedSlot).toBeInTheDocument();
    await expect(openedSlot).toBeVisible();

    const closeIcon = canvas.queryByTestId('ItemCloseTrigger-4');
    await expect(closeIcon).toBeVisible();

    await userEvent.click(buttontrigger);
    await expect(slotContainer).not.toBeVisible();
    await expect(closeIcon).not.toBeVisible();

    await userEvent.click(document.body);
  },
};

export const DesktopDrawerDefaultMenu: Story = {
  args: {
    logo: {
      href: '/link',
    },
    items: [
      {
        label: 'Menu',
        icon: 'menu',
        itemType: 'slot',
        component: mobileHeaderMenuItems(defaultHeaderProps().items || [])
          .outerHTML,
        slotAppearance: 'drawer',
        showItemMode: 'always',
      },
    ],
  },
  render: createElement,
  parameters: {
    createComponent: createHeader,
  },
};

export const DesktopDrawerCustom: Story = {
  args: {
    logo: {
      href: '/link',
    },
    items: [
      {
        icon: 'chevron_left',
        itemType: 'slot',
        component: `<div className="gi-py-4">Left</div>`,
        slotAppearance: 'drawer',
        drawerPosition: 'left',
        showItemMode: 'always',
      },
      {
        icon: 'chevron_right',
        itemType: 'slot',
        component: `<div className="gi-py-4">Right</div>`,
        slotAppearance: 'drawer',
        drawerPosition: 'right',
        showItemMode: 'always',
      },
      {
        label: 'Bottom',
        icon: 'work',
        itemType: 'slot',
        component: `<div className="gi-py-4">Bottom</div>`,
        slotAppearance: 'drawer',
        drawerPosition: 'bottom',
        showItemMode: 'always',
      },
    ],
  },
  render: createElement,
  parameters: {
    createComponent: createHeader,
  },
};

export const WithSecondaryLinks: Story = {
  args: {
    logo: {
      href: '/path',
    },
    secondaryLinks: [
      {
        href: '#',
        label: 'English',
      },
      {
        href: '#',
        label: 'Gaeilge',
      },
    ],
    items: [
      {
        icon: 'search',
        label: 'Search',
        itemType: 'slot',
        component: slotSearch(),
        slotAppearance: 'dropdown',
      },
    ],
  },
  render: createElement,
  parameters: {
    createComponent: createHeader,
  },
};

export const NoLabelSearch: Story = {
  args: {
    logo: {
      href: 'path',
    },
    items: [
      {
        label: 'News',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
      {
        label: 'Departments',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
      {
        label: 'Services',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
      {
        itemType: 'divider',
      },
      {
        icon: 'search',
        itemType: 'slot',
        component: slotSearch(),
        slotAppearance: 'dropdown',
      },
    ],
    secondaryLinks: [
      {
        href: '#',
        label: 'English',
      },
      {
        href: '#',
        label: 'Gaeilge',
      },
    ],
  },
  render: createElement,
  parameters: {
    createComponent: createHeader,
  },
};

export const TabletView: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'ipad',
    },

    createComponent: createHeader,
  },
  args: {
    logo: {
      href: 'path',
    },
    ...defaultHeaderProps(),
  },
  render: createElement,
};

export const MobileView: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },

    createComponent: createHeader,
  },
  args: {
    logo: {
      href: 'path',
    },
    ...defaultHeaderProps(),
  },
  render: createElement,
};

export const WithExtraButtons: Story = {
  args: {
    logo: {
      href: '/path',
    },
    items: [
      {
        icon: 'home',
        itemType: 'link',
        href: '#',
        showItemMode: 'always',
      },
      {
        icon: 'logout',
        itemType: 'link',
        href: '#',
        showItemMode: 'always',
      },
      {
        label: 'News',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
      {
        label: 'Services',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
    ],
  },
  render: createElement,
  parameters: {
    createComponent: createHeader,
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    logo: {
      href: '/link',
    },
    ...defaultHeaderProps(),
  },
  render: createElement,
  parameters: {
    createComponent: createHeader,
  },
};

export const WithExternalLinks: Story = {
  parameters: {
    layout: 'fullscreen',
    createComponent: createHeader,
  },
  args: {
    logo: {
      href: 'path',
      external: true,
    },
    items: [
      {
        itemType: 'link',
        href: '#',
        label: 'Internal Nav',
        showItemMode: 'desktop-only',
      },
      {
        itemType: 'link',
        href: '#',
        external: true,
        label: 'External Nav',
        showItemMode: 'desktop-only',
      },
      {
        itemType: 'divider',
      },
      {
        itemType: 'link',
        icon: 'attach_file',
        href: '#',
        label: 'Internal Tool',
        showItemMode: 'desktop-only',
      },
      {
        itemType: 'link',
        icon: 'arrow_outward',
        href: '#',
        external: true,
        label: 'External Tool',
        showItemMode: 'desktop-only',
      },
    ],
  },
  render: createElement,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const logoLink = canvas.getByTestId('logo-link');
    const internalNav = canvas.getByText('Internal Nav');
    const externalNav = canvas.getByText('External Nav');
    const externalTool = canvas.getByText('External Tool');
    const internalTool = canvas.getByText('Internal Tool');

    await expect(logoLink).toHaveAttribute('target', '_blank');
    await expect(logoLink).toHaveAttribute('rel', 'noreferrer noopener');

    await expect(internalNav).not.toHaveAttribute('target', '_blank');
    await expect(internalNav).not.toHaveAttribute('rel', 'noreferrer noopener');

    await expect(externalNav).toHaveAttribute('target', '_blank');
    await expect(externalNav).toHaveAttribute('rel', 'noreferrer noopener');

    await expect(externalTool).toHaveAttribute('target', '_blank');
    await expect(externalTool).toHaveAttribute('rel', 'noreferrer noopener');

    await expect(internalTool).not.toHaveAttribute('target', '_blank');
    await expect(internalTool).not.toHaveAttribute(
      'rel',
      'noreferrer noopener',
    );
  },
};

export const MobileWithExternalLinks: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
    createComponent: createHeader,
  },
  args: {
    logo: {
      href: 'path',
      external: true,
    },
    items: [
      {
        itemType: 'link',
        href: '#',
        label: 'Internal Nav',
        showItemMode: 'desktop-only',
      },
      {
        itemType: 'link',
        href: '#',
        external: true,
        label: 'External Nav',
        showItemMode: 'desktop-only',
      },
      {
        itemType: 'link',
        icon: 'attach_file',
        href: '#',
        label: 'Internal Tool',
        showItemMode: 'desktop-only',
      },
      {
        itemType: 'link',
        icon: 'arrow_outward',
        href: '#',
        external: true,
        label: 'External Tool',
        showItemMode: 'desktop-only',
      },
    ],
    addDefaultMobileMenu: true,
  },
  render: createElement,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const logoLink = canvas.getByTestId('logo-link');
    const headerMobileMenu = canvas.getByTestId('ItemActionTrigger-4');

    await expect(logoLink).toHaveAttribute('target', '_blank');
    await expect(logoLink).toHaveAttribute('rel', 'noreferrer noopener');

    await userEvent.click(headerMobileMenu);

    const internalNav = await canvas.findAllByText('Internal Nav');
    const externalNav = await canvas.findAllByText('External Nav');
    const externalTool = await canvas.findAllByText('External Tool');
    const internalTool = await canvas.findAllByText('Internal Tool');

    await expect(internalNav[0]).not.toHaveAttribute('target', '_blank');
    await expect(internalNav[0]).not.toHaveAttribute(
      'rel',
      'noreferrer noopener',
    );

    await expect(externalNav[0]).toHaveAttribute('target', '_blank');
    await expect(externalNav[0]).toHaveAttribute('rel', 'noreferrer noopener');

    await expect(externalTool[0]).toHaveAttribute('target', '_blank');
    await expect(externalTool[0]).toHaveAttribute('rel', 'noreferrer noopener');

    await expect(internalTool[0]).not.toHaveAttribute('target', '_blank');
    await expect(internalTool[0]).not.toHaveAttribute(
      'rel',
      'noreferrer noopener',
    );
  },
};

export const ShowTitleOnMobile: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
    createComponent: createHeader,
  },
  args: {
    title: 'Title on mobile',
    showTitleOnMobile: true,
    logo: {
      href: '/link',
    },
    secondaryLinks: [
      {
        href: '#',
        label: 'Gaeilge',
      },
      {
        href: '#',
        label: 'English',
      },
    ],
  },
  render: createElement,
};

export const GovieHeader: Story = {
  args: {
    logo: {
      href: '#',
      imageLarge:
        'https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/gov.ie/harp-gold-text-white.svg',
      imageSmall:
        'https://raw.githubusercontent.com/ogcio/govie-ds/refs/heads/main/assets/logos/gov.ie/harp-gold-text-white.svg',
    },
    items: [
      {
        label: 'Departments',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
      {
        label: 'Services',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
      {
        itemType: 'divider',
        showItemMode: 'desktop-only',
      },
      {
        label: 'Gaelige',
        itemType: 'link',
        href: '#',
        showItemMode: 'always',
      },
    ],
    addDefaultMobileMenu: true,
  },
  render: createElement,
  parameters: {
    createComponent: createHeader,
  },
};

export const WithUtilitySlot: Story = {
  args: {
    logo: {
      href: 'path',
      external: true,
    },
    title: 'Title',
    secondaryLinks: [
      {
        href: '#',
        label: 'Gaeilge',
      },
      {
        slot: `<a href="#" class="gi-header-secondary-item gi-text-white gi-stroke-white gi-header-secondary-item-default">English</a>`,
      },
      {
        slot: `
          <p class="gi-paragraph-sm">Hello John | <a href="#" class="gi-header-secondary-item gi-text-white gi-stroke-white gi-header-secondary-item-default">Logout</a></p>
        `,
      },
    ],
  },
  render: createElement,
  parameters: {
    createComponent: createHeader,
  },
};

export const NoLinks: Story = {
  args: {},
  render: createElement,
};

export const WithMainLinksDesktopOnly: Story = {
  args: {
    logo: {
      href: '/path',
    },
    items: [
      {
        label: 'News',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
      {
        label: 'Departments',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
      {
        label: 'Services',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
    ],
  },
  render: createElement,
  parameters: {
    createComponent: createHeader,
  },
};

export const WithCustomSecondaryLinks: Story = {
  args: {
    logo: {
      href: '/path',
    },
    secondaryLinks: [
      {
        href: '#',
        label: 'Gaeilge',
      },
      {
        slot: `<a href="#">English</a>`,
      },
      {
        slot: `
        <p class="gi-paragraph-sm">Hello John | <a href="#">Logout</a></p>
      `,
      },
    ],
    addDefaultMobileMenu: true,
    items: [...(defaultHeaderItems() as any)],
  },
  render: createElement,
  parameters: {
    createComponent: createHeader,
  },
};

export const WithMainAndSecondaryLinksDesktopOnly: Story = {
  args: {
    logo: {
      href: 'path',
    },
    secondaryLinks: [
      {
        href: '#',
        label: 'English',
      },
      {
        href: '#',
        label: 'Gaeilge',
      },
    ],
    items: [
      {
        label: 'News',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
      {
        label: 'Departments',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
      {
        label: 'Services',
        itemType: 'link',
        href: '#',
        showItemMode: 'desktop-only',
      },
    ],
  },
  render: createElement,
  parameters: {
    createComponent: createHeader,
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Life Events',
    logo: {
      href: 'path',
    },
  },
  render: createElement,
  parameters: {
    createComponent: createHeader,
  },
};

export const ShowMobileMenuForLanguages: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
    createComponent: createHeader,
  },
  args: {
    logo: {
      href: '/link',
    },
    secondaryLinks: [
      {
        href: '#',
        label: 'Gaeilge',
      },
      {
        href: '#',
        label: 'English',
      },
    ],
    addDefaultMobileMenu: true,
  },
  render: createElement,
};

export const Light: Story = {
  decorators: (story) => {
    const storyElement = story();
    return React.createElement(
      'div',
      { className: 'gi-bg-black gi-p-4' },
      React.cloneElement(storyElement),
    );
  },
  args: {
    logo: {
      href: '/link',
    },
    ...defaultHeaderProps(),
    appearance: 'light',
    mobileMenuLabel: 'Menu',
    secondaryLinks: [
      {
        href: '#',
        label: 'English',
      },
      {
        href: '#',
        label: 'Gaeilge',
      },
      {
        slot: `
          <p class="gi-paragraph-sm">Hello John | <a href="#" class="gi-header-secondary-item gi-header-secondary-item-light gi-text-gray-950">Logout</a></p>
        `,
      },
    ],
  },
  render: createElement,
  parameters: {
    createComponent: createHeader,
  },
};

export const LightWithTitle: Story = {
  decorators: (story) => {
    const storyElement = story();
    return React.createElement(
      'div',
      { className: 'gi-bg-black gi-p-4' },
      React.cloneElement(storyElement),
    );
  },
  args: {
    appearance: 'light',
    title: 'Life Events',
    logo: {
      href: 'path',
    },
  },
  render: createElement,
  parameters: {
    createComponent: createHeader,
  },
};
