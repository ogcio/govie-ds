import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, userEvent, screen } from 'storybook/test';
import { Button } from '../button/button.js';
import { Heading } from '../heading/heading.js';
import { Link } from '../link/link.js';
import { List, ListTypeEnum } from '../list/list.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { Select, SelectItem } from '../select/select.js';
import { MobileHeaderMenuItems } from './components/header-menu.js';
import { HeaderSearch } from './components/header-search.js';
import { Header } from './header.js';
import { HeaderProps } from './types.js';

const meta = {
  title: 'layout/Header/Deprecated',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const SlotExample1 = () => (
  <div className="gi-pt-4 gi-flex gi-justify-between gi-flex-col gi-gap-6 gi-h-full">
    <div className="gi-flex gi-flex-col gi-gap-6">
      <Heading as="h2">Faq</Heading>
      <List
        type={ListTypeEnum.Bullet}
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
    </div>
    <div className="gi-flex gi-flex-col-reverse gi-gap-4 xs:gi-gap-6 xs:gi-justify-end xs:gi-flex-row gi-p-4 xs:gi-p-6">
      <Button
        variant="secondary"
        appearance="dark"
        className="gi-justify-center xs:gi-justify-start"
      >
        Cancel
      </Button>
      <Button className="gi-justify-center xs:gi-justify-start">Primary</Button>
    </div>
  </div>
);

const SlotExample2 = () => {
  return (
    <Select id="slot-example-2">
      <SelectItem value="gaeilge">Gaeilge</SelectItem>
      <SelectItem value="english">English</SelectItem>
      <SelectItem value="spanish">Spanish</SelectItem>
      <SelectItem value="italian">Italian</SelectItem>
    </Select>
  );
};

const headerProps: HeaderProps = {
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
      label: 'Faq',
      icon: 'info',
      itemType: 'slot',
      component: <SlotExample1 />,
      slotAppearance: 'drawer',
      showItemMode: 'desktop-only',
    },
    {
      label: 'Search',
      icon: 'search',
      itemType: 'slot',
      component: <HeaderSearch />,
      slotAppearance: 'dropdown',
      showItemMode: 'desktop-only',
    },
    {
      label: 'Languages',
      icon: 'mic',
      itemType: 'slot',
      component: <SlotExample2 />,
      slotAppearance: 'dropdown',
      showItemMode: 'desktop-only',
    },
  ],
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
        'Change the mobile menu label when "addDefaultMobileMenu" is set, if not provided it will default to "Menu"',
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
    showMenuLabel: {
      control: 'boolean',
      description: 'If true, the menu label will be shown',
      table: {
        category: 'Header',
      },
    },
  },
  args: {
    logo: {
      href: '/link',
    },
    items: headerProps.items,
    addDefaultMobileMenu: true,
    mobileMenuLabel: 'Menu',
    showMenuLabel: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const buttontrigger = canvas.getByTestId('ItemActionTrigger-5');

    const slotContainer = canvas.queryByTestId('SlotContainer-5');
    await expect(slotContainer).not.toBeVisible();

    await userEvent.click(buttontrigger);

    const openedSlot = canvas.getByTestId('SlotContainer-5');
    await expect(openedSlot).toBeInTheDocument();
    await expect(openedSlot).toBeVisible();

    const closeIcon = canvas.queryByTestId('ItemCloseTrigger-5');
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
        component: <MobileHeaderMenuItems items={headerProps.items} />,
        slotAppearance: 'drawer',
      },
    ],
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
        component: <div className="gi-py-4">Left</div>,
        slotAppearance: 'drawer',
        drawerPosition: 'left',
        showItemMode: 'always',
        ariaLabel: 'left drawer',
      },
      {
        icon: 'chevron_right',
        itemType: 'slot',
        component: <div className="gi-py-4">Right</div>,
        slotAppearance: 'drawer',
        drawerPosition: 'right',
        showItemMode: 'always',
        ariaLabel: 'right drawer',
      },
      {
        label: 'Bottom',
        icon: 'work',
        itemType: 'slot',
        component: <div className="gi-py-4">Bottom</div>,
        slotAppearance: 'drawer',
        drawerPosition: 'bottom',
        showItemMode: 'always',
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
        component: <HeaderSearch />,
        slotAppearance: 'dropdown',
      },
    ],
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
        component: <HeaderSearch />,
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
};

export const TabletView: Story = {
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
    items: headerProps.items,
    addDefaultMobileMenu: true,
  },
};

export const MobileView: Story = {
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
    title:
      'Title on mobile very very very very very very very very very very long',
    showTitleOnMobile: true,
    items: headerProps.items,
    addDefaultMobileMenu: true,
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
};

const defaultHeaderItems = (external?: boolean) => [
  {
    label: 'Departments',
    itemType: 'link',
    href: '#',
    external,
    showItemMode: 'desktop-only',
  },
  {
    label: 'Services',
    itemType: 'link',
    href: '#',
    external,
    showItemMode: 'desktop-only',
  },
  {
    itemType: 'divider',
  },
  {
    icon: 'search',
    label: 'Search',
    itemType: 'slot',
    component: <HeaderSearch />,
    slotAppearance: 'dropdown',
  },
];

const defaultHeaderProps = (external?: boolean) =>
  ({
    items: [...(defaultHeaderItems(external) as any)],
    addDefaultMobileMenu: true,
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

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    logo: {
      href: '/link',
    },
    ...defaultHeaderProps(),
  },
};

export const WithExternalLinks: Story = {
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

export const MobileWithExternalLinks: Story = {
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const logoLink = canvas.getByTestId('logo-link');
    const headerMobileMenu = canvas.getByTestId('ItemActionDrawerTrigger-0');

    await expect(logoLink).toHaveAttribute('target', '_blank');
    await expect(logoLink).toHaveAttribute('rel', 'noreferrer noopener');

    await userEvent.click(headerMobileMenu);

    const internalNav = screen.getByRole('link', { name: 'Internal Nav' });
    const externalNav = screen.getByRole('link', { name: 'External Nav' });
    const externalTool = screen.getByRole('link', { name: 'External Tool' });
    const internalTool = screen.getByRole('link', { name: 'Internal Tool' });

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

export const ShowTitleOnMobile: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
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
        slot: <a href="#">English</a>,
      },
      {
        slot: (
          <Paragraph size="sm">
            Hello John | <a href="#">Logout</a>
          </Paragraph>
        ),
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
        slot: <a href="#">English</a>,
      },
      {
        slot: (
          <Paragraph>
            Hello John | <a href="#">Logout</a>
          </Paragraph>
        ),
      },
    ],
    addDefaultMobileMenu: true,
    items: [
      {
        icon: 'search',
        label: 'Search',
        itemType: 'slot',
        component: <HeaderSearch />,
        slotAppearance: 'dropdown',
      },
    ],
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
};

export const WithTitle: Story = {
  args: {
    title: 'Life Events',
    logo: {
      href: 'path',
    },
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
};

export const TestWithSecondaryLinks: Story = {
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
        component: <HeaderSearch />,
        slotAppearance: 'dropdown',
      },
    ],
  },
  parameters: {
    pseudo: {
      hover: '.gi-header-secondary-item',
    },
  },
};

export const Light: Story = {
  decorators: (Story) => {
    return (
      <div className="gi-bg-black gi-p-4">
        <Story />
      </div>
    );
  },
  args: {
    logo: {
      href: '/link',
    },
    items: headerProps.items,
    addDefaultMobileMenu: true,
    mobileMenuLabel: 'Menu',
    appearance: 'light',
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
        slot: (
          <Paragraph>
            Hello John | <a href="#">Logout</a>
          </Paragraph>
        ),
      },
    ],
  },
};

export const LightWithTitle: Story = {
  decorators: (Story) => {
    return (
      <div className="gi-bg-black gi-p-4">
        <Story />
      </div>
    );
  },
  args: {
    appearance: 'light',
    title: 'Life Events',
    logo: {
      href: 'path',
    },
  },
};

export const HideMenuLabel: Story = {
  args: {
    showMenuLabel: false,
    fullWidth: true,
    logo: {
      href: '/link',
    },
    ...defaultHeaderProps(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menuLabel = canvas.queryByText('Menu');
    expect(menuLabel).not.toBeInTheDocument();
  },
};

export const TestStandardProps: Story = {
  tags: ['skip-playwright'],
  args: {
    logo: { href: '/home' },
    items: [
      {
        label: 'Search',
        icon: 'search',
        itemType: 'slot',
        component: <HeaderSearch />,
        slotAppearance: 'dropdown',
        showItemMode: 'desktop-only',
      },
      { itemType: 'divider', showItemMode: 'desktop-only' },
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
    secondaryLinks: [{ href: '#', label: 'Gaeilge' }],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should show the nav link', async () => {
      for (let index = 0; index <= 4; index++) {
        const element = canvas.getByTestId(`header-item-${index}`);
        await expect(element).toBeTruthy();
      }
    });

    await step('should show the language links', async () => {
      const element = canvas.getByTestId('secondary-link-desktop-0');
      await expect(element).toBeTruthy();
    });

    await step('should show the search button', async () => {
      const element = canvas.getByTestId('header-search-form');
      await expect(element).toBeTruthy();
    });
  },
};

export const TestMenuSlots: Story = {
  tags: ['skip-playwright'],
  args: {
    items: [
      {
        itemType: 'slot',
        icon: 'thumb_up',
        label: 'Slot',
        component: <div>Here is a slot component</div>,
        slotAppearance: 'dropdown',
      },
      {
        itemType: 'slot',
        label: 'Slot 2',
        icon: 'info',
        component: <div>Here is a slot component 2</div>,
        slotAppearance: 'dropdown',
      },
      {
        label: 'Search',
        icon: 'search',
        itemType: 'slot',
        component: <HeaderSearch />,
        slotAppearance: 'dropdown',
        showItemMode: 'desktop-only',
      },
      { itemType: 'divider', showItemMode: 'desktop-only' },
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
    secondaryLinks: [{ href: '#', label: 'Gaeilge' }],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render header menu slots', async () => {
      const firstTriggerElement = canvas.getByTestId('ItemActionTrigger-0');
      await expect(firstTriggerElement).toBeInTheDocument();
      await expect(canvas.getByText('Slot')).toBeInTheDocument();

      const secondTriggerElement = canvas.getByTestId('ItemActionTrigger-1');
      await expect(secondTriggerElement).toBeInTheDocument();
      await expect(canvas.getByText('Slot 2')).toBeInTheDocument();
    });
  },
};
