import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, userEvent } from '@storybook/test';
import { Link } from '../link/link.js';
import { List, TypeEnum } from '../list/list.js';
import { Select } from '../select/select.js';
import { MobileHeaderMenuItems } from './components/header-menu.js';
import { HeaderSearch } from './components/header-search.js';
import { Header, HeaderProps } from './header.js';

const meta = {
  title: 'layout/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const SlotExample1 = () => (
  <List
    type={TypeEnum.Bullet}
    items={[
      <Link size="sm" href="#">
        Citizens Information - Services and Rights
      </Link>,
      <Link size="sm" href="#">
        Revenue - Taxes and Payments
      </Link>,
      <Link size="sm" href="#">
        Department of Social Protection
      </Link>,
    ]}
  />
);

const SlotExample2 = () => {
  return (
    <Select
      id="slot-example-2"
      options={[
        {
          label: 'Languages',
          value: 'languages',
          groupName: 'Languages',
          items: [
            {
              label: 'Gaeilge',
              value: 'gaeilge',
            },
            {
              label: 'English',
              value: 'english',
            },
            {
              label: 'Spanish',
              value: 'spanish',
            },
            {
              label: 'Italian',
              value: 'italian',
            },
          ],
        },
      ]}
    />
  );
};

const headerProps: HeaderProps = {
  items: [
    {
      label: 'Departments',
      itemType: 'link',
      details: {
        href: '#',
      },
      showItemMode: 'desktop-only',
    },
    {
      label: 'Services',
      itemType: 'link',
      details: {
        href: '#',
      },
      showItemMode: 'desktop-only',
    },
    {
      itemType: 'divider',
      showItemMode: 'desktop-only',
    },
    {
      label: 'Home',
      icon: 'home',
      itemType: 'link',
      details: {
        href: '/item1',
      },
      showItemMode: 'desktop-only',
    },
    {
      label: 'Faq',
      icon: 'info',
      itemType: 'slot',
      details: {
        component: <SlotExample1 />,
        slotAppearance: 'dropdown',
      },
      showItemMode: 'desktop-only',
    },
    {
      label: 'Search',
      icon: 'search',
      itemType: 'slot',
      details: {
        component: <HeaderSearch />,
        slotAppearance: 'dropdown',
      },
      showItemMode: 'desktop-only',
    },
    {
      label: 'Languages',
      icon: 'mic',
      itemType: 'slot',
      details: {
        component: <SlotExample2 />,
        slotAppearance: 'dropdown',
      },
      showItemMode: 'desktop-only',
    },
  ],
};

const mobileMenu = {
  label: 'Menu',
  icon: 'menu',
  itemType: 'slot',
  details: {
    component: <MobileHeaderMenuItems items={headerProps.items} />,
    slotAppearance: 'drawer',
  },
  showItemMode: 'mobile-only',
};

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
          summary:
            '{label?: string; icon?: IconId; type: { name: "slot" | "link" | "divider"; element: Link | Slot | Divider }; showItemMode?: ItemMode;}[]',
        },
      },
    },
    secondaryLinks: {
      description: 'A list of secondary navigation links',
      table: {
        category: 'Header',
      },
    },
  },
  args: {
    logo: {
      href: '/link',
    },
    items: [...(headerProps.items as any), mobileMenu],
  },
};

export const DesktopDrawerMenu: Story = {
  args: {
    logo: {
      href: '/link',
    },
    items: [
      {
        label: 'Menu',
        icon: 'menu',
        itemType: 'slot',
        details: {
          component: <MobileHeaderMenuItems items={headerProps.items} />,
          slotAppearance: 'drawer',
        },
      },
    ],
  },
};

export const NoLinks: Story = {
  args: {},
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
        details: {
          href: '#',
        },

        showItemMode: 'desktop-only',
      },
      {
        label: 'Departments',
        itemType: 'link',
        details: {
          href: '#',
        },

        showItemMode: 'desktop-only',
      },
      {
        label: 'Services',
        itemType: 'link',
        details: {
          href: '#',
        },
        showItemMode: 'desktop-only',
      },
    ],
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
        details: {
          component: <HeaderSearch />,
          slotAppearance: 'dropdown',
        },
      },
    ],
  },
};

export const withMainAndSecondaryLinksDesktopOnly: Story = {
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
        details: {
          href: '#',
        },

        showItemMode: 'desktop-only',
      },
      {
        label: 'Departments',
        itemType: 'link',
        details: {
          href: '#',
        },

        showItemMode: 'desktop-only',
      },
      {
        label: 'Services',
        itemType: 'link',
        details: {
          href: '#',
        },

        showItemMode: 'desktop-only',
      },
    ],
  },
};
const defaultHeaderItems = (external?: boolean) => [
  {
    label: 'Departments',
    itemType: 'link',
    details: {
      href: '#',
      external,
    },
    showItemMode: 'desktop-only',
  },
  {
    label: 'Services',
    itemType: 'link',
    details: {
      href: '#',
      external,
    },
    showItemMode: 'desktop-only',
  },
  {
    itemType: 'divider',
  },
  {
    icon: 'search',
    label: 'Search',
    itemType: 'slot',
    details: {
      component: <HeaderSearch />,
      slotAppearance: 'dropdown',
    },
  },
];

const defaultHeaderProps = (external?: boolean) =>
  ({
    items: [
      ...(defaultHeaderItems(external) as any),
      {
        label: 'Menu',
        icon: 'menu',
        itemType: 'slot',
        details: {
          component: (
            <MobileHeaderMenuItems
              secondaryLinks={[
                {
                  href: '#',
                  label: 'English',
                },
                {
                  href: '#',
                  label: 'Gaeilge',
                },
              ]}
              items={defaultHeaderItems(external) as any}
            />
          ),
          slotAppearance: 'drawer',
        },
        showItemMode: 'mobile-only',
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
  }) as HeaderProps;

export const withTitle: Story = {
  args: {
    title: 'Life Events',
    logo: {
      href: 'path',
    },
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
        details: {
          href: '#',
        },

        showItemMode: 'desktop-only',
      },
      {
        label: 'Departments',
        itemType: 'link',
        details: {
          href: '#',
        },
        showItemMode: 'desktop-only',
      },
      {
        label: 'Services',
        itemType: 'link',
        details: {
          href: '#',
        },
        showItemMode: 'desktop-only',
      },
      {
        itemType: 'divider',
      },
      {
        icon: 'search',
        itemType: 'slot',
        details: {
          component: <HeaderSearch />,
          slotAppearance: 'dropdown',
        },
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
};

export const tabletView: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'ipad',
    },
  },
  args: {
    logo: {
      href: 'path',
    },
    items: [mobileMenu as any],
  },
};

export const mobileView: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: {
    logo: {
      href: 'path',
    },
    items: [mobileMenu as any],
  },
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
        details: {
          href: '#',
        },
        showItemMode: 'always',
      },
      {
        icon: 'logout',
        itemType: 'link',
        details: {
          href: '#',
        },
        showItemMode: 'always',
      },
      {
        label: 'News',
        itemType: 'link',
        details: {
          href: '#',
        },
        showItemMode: 'desktop-only',
      },
      {
        label: 'Services',
        itemType: 'link',
        details: {
          href: '#',
        },
        showItemMode: 'desktop-only',
      },
    ],
  },
};

const withExtraButtonsAndLabelsItems = [
  {
    icon: 'search',
    itemType: 'slot',
    details: {
      component: <HeaderSearch />,
      slotAppearance: 'dropdown',
    },
  },
  {
    icon: 'home',
    itemType: 'link',
    details: {
      href: '#',
    },
  },
  {
    icon: 'logout',
    itemType: 'link',
    details: {
      href: '#',
    },
  },
  {
    label: 'News',
    itemType: 'link',
    details: {
      href: '#',
    },
    showItemMode: 'desktop-only',
  },
  {
    label: 'Services',
    itemType: 'link',
    details: {
      href: '#',
    },
    showItemMode: 'desktop-only',
  },
];

export const WithExtraButtonsAndLabels: Story = {
  args: {
    logo: {
      href: '/path',
    },
    items: [
      ...(withExtraButtonsAndLabelsItems as any),
      {
        label: 'Menu',
        icon: 'menu',
        itemType: 'slot',
        details: {
          component: (
            <MobileHeaderMenuItems
              items={
                [
                  {
                    icon: 'home',
                    label: 'Home',
                    itemType: 'link',
                    details: {
                      href: '#',
                    },
                  },
                  {
                    icon: 'search',
                    itemType: 'slot',
                    label: 'Search',
                    details: {
                      component: <HeaderSearch />,
                      slotAppearance: 'dropdown',
                    },
                  },
                  {
                    label: 'News',
                    itemType: 'link',
                    details: {
                      href: '#',
                    },
                    showItemMode: 'desktop-only',
                  },
                  {
                    label: 'Services',
                    itemType: 'link',
                    details: {
                      href: '#',
                    },
                    showItemMode: 'desktop-only',
                  },
                  {
                    icon: 'logout',
                    itemType: 'link',
                    label: 'Logout',
                    details: {
                      href: '#',
                    },
                  },
                ] as any
              }
            />
          ),
          slotAppearance: 'drawer',
        },
        showItemMode: 'mobile-only',
      },
    ],
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
};

export const ShowMobileMenuForLanguages: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: {
    logo: {
      href: '/link',
    },
    items: [
      {
        label: 'Menu',
        icon: 'menu',
        itemType: 'slot',
        details: {
          component: (
            <MobileHeaderMenuItems
              secondaryLinks={[
                {
                  href: '#',
                  label: 'English',
                },
                {
                  href: '#',
                  label: 'Gaeilge',
                },
              ]}
            />
          ),
          slotAppearance: 'drawer',
        },
        showItemMode: 'mobile-only',
      },
    ],
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
};

export const withExternalLinks: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    logo: {
      href: 'path',
      external: true,
    },
    items: [
      {
        itemType: 'link',
        details: {
          href: '#',
        },
        label: 'Internal Nav',
        showItemMode: 'desktop-only',
      },
      {
        itemType: 'link',
        details: {
          href: '#',
          external: true,
        },
        label: 'External Nav',
        showItemMode: 'desktop-only',
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const logoLink = canvas.getByTestId('logo-link');
    const internalNav = canvas.getByRole('link', { name: 'Internal Nav' });
    const externalNav = canvas.getByRole('link', { name: 'External Nav' });
    const externalTool = canvas.getByRole('link', { name: 'External Tool' });
    const internalTool = canvas.getByRole('link', { name: 'Internal Tool' });

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

export const mobileWithExternalLinks: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: {
    logo: {
      href: 'path',
      external: true,
    },
    items: [
      {
        itemType: 'link',
        details: {
          href: '#',
        },
        label: 'Internal Nav',
        showItemMode: 'desktop-only',
      },
      {
        itemType: 'link',
        details: {
          href: '#',
          external: true,
        },
        label: 'External Nav',
        showItemMode: 'desktop-only',
      },
      {
        label: 'Menu',
        icon: 'menu',
        itemType: 'slot',
        details: {
          component: (
            <MobileHeaderMenuItems
              items={[
                {
                  itemType: 'link',
                  details: {
                    href: '#',
                  },
                  label: 'Internal Tool',
                },
                {
                  itemType: 'link',
                  details: {
                    href: '#',
                    external: true,
                  },
                  label: 'External Tool',
                },
              ]}
            />
          ),
          slotAppearance: 'drawer',
        },
        showItemMode: 'mobile-only',
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const logoLink = canvas.getByTestId('logo-link');
    const headerMobileMenu = canvas.getByTestId('header-mobile-menu');

    const internalNav = canvas.getByRole('link', { name: 'Internal Nav' });
    const externalNav = canvas.getByRole('link', { name: 'External Nav' });
    const externalTool = canvas.getByRole('link', { name: 'External Tool' });
    const internalTool = canvas.getByRole('link', { name: 'Internal Tool' });

    await expect(logoLink).toHaveAttribute('target', '_blank');
    await expect(logoLink).toHaveAttribute('rel', 'noreferrer noopener');

    await userEvent.click(headerMobileMenu);

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
