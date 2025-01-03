import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, userEvent } from '@storybook/test';
import { Container } from '../container/container.js';
import { Link } from '../link/link.js';
import { List, TypeEnum } from '../list/list.js';
import { Select } from '../select/select.js';
import HeaderSearch from './components/header-search.js';
import { Header } from './header.js';

const meta = {
  title: 'layout/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const SlotExample1 = () => (
  <Container>
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
  </Container>
);

const SlotExample2 = () => {
  return (
    <Container>
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
    </Container>
  );
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
    tools: {
      control: 'object',
      description: 'Actionable items such as Search, Menu and additional CTA',
      table: {
        category: 'Header',
        type: {
          summary: '{search?: {}; menu?: {}; items: {}[]}',
        },
      },
    },
    navLinks: {
      description: 'A list of navigation links',
      table: {
        category: 'Header',
      },
    },
    languages: {
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
    tools: {
      menu: {
        icon: 'menu',
        label: 'Menu',
      },
      items: [
        {
          href: '/item1',
          label: 'Home',
          icon: 'home',
        },
        {
          href: '#',
          label: 'Faq',
          icon: 'info',
          keepOnMobile: true,
          slot: <SlotExample1 />,
        },
        {
          href: '/search_page',
          label: 'Search',
          keepOnMobile: true,
          slot: <HeaderSearch />,
        },

        {
          href: '#',
          label: 'Languages',
          icon: 'mic',
          keepOnMobile: true,
          slot: <SlotExample2 />,
        },
      ],
    },
    navLinks: [
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
    languages: [
      {
        href: '#',
        label: 'Gaeilge',
      },
    ],
  },
};

export const NoLinks: Story = {
  args: {},
};

export const WithMainLinks: Story = {
  args: {
    logo: {
      href: '/path',
    },
    tools: {
      search: {
        label: 'Search',
        action: '/search_page',
      },
    },
    navLinks: [
      {
        href: '#',
        label: 'News',
      },
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
  },
};

export const WithNoSearch: Story = {
  args: {
    logo: {
      href: '/path',
    },
    navLinks: [
      {
        href: '#',
        label: 'News',
      },
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
  },
};

export const WithSecondaryLinks: Story = {
  args: {
    logo: {
      href: '/path',
    },
    tools: {
      search: {
        label: 'Search',
        action: 'search_page',
      },
    },
    languages: [
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

export const withMainAndSecondaryLinks: Story = {
  args: {
    logo: {
      href: 'path',
    },
    tools: {
      search: {
        label: 'Search',
        action: '/search-page',
      },
    },
    navLinks: [
      {
        href: '#',
        label: 'News',
      },
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
    languages: [
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

export const withTitle: Story = {
  args: {
    title: 'Life Events',
    logo: {
      href: 'path',
    },
    tools: {
      search: {
        action: '/search-page',
      },
    },
    navLinks: [
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
    languages: [
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

export const NoLabelSearch: Story = {
  args: {
    logo: {
      href: 'path',
    },
    tools: {
      search: {
        action: '/search-page',
      },
    },
    navLinks: [
      {
        href: '#',
        label: 'News',
      },
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
    languages: [
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
    tools: {
      search: {
        action: '/search-page',
        label: 'Search',
      },
    },
    navLinks: [
      {
        href: '#',
        label: 'News',
      },
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
    languages: [
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
    tools: {
      search: {
        action: '/search-page',
      },
    },
    navLinks: [
      {
        href: '#',
        label: 'News',
      },
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
    languages: [
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

export const WithExtraButtons: Story = {
  args: {
    logo: {
      href: '/path',
    },
    tools: {
      items: [
        {
          href: '/home',
          icon: 'home',
        },
        {
          href: '/logout',
          icon: 'logout',
        },
      ],
    },
    navLinks: [
      {
        href: '#',
        label: 'News',
      },
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
  },
};

export const WithExtraButtonsAndLabels: Story = {
  args: {
    logo: {
      href: '/path',
    },
    tools: {
      search: {
        label: 'Search',
        action: 'search_page',
      },
      items: [
        {
          href: '/home',
          icon: 'home',
          label: 'Home',
        },
        {
          href: '/logout',
          icon: 'logout',
          label: 'Logout',
        },
      ],
    },
    navLinks: [
      {
        href: '#',
        label: 'News',
      },
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
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
    tools: {
      search: {
        action: '/search_page',
        label: 'Search',
      },
      items: [
        {
          href: '/item1',
          label: 'Home',
          icon: 'home',
        },
      ],
    },
    navLinks: [
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
    languages: [
      {
        href: '#',
        label: 'Gaeilge',
      },
    ],
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
    languages: [
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
  args: {
    logo: {
      href: 'path',
      external: true,
    },
    tools: {
      items: [
        { href: '#', label: 'Internal Tool' },
        { href: '#', label: 'External Tool', external: true },
      ],
    },
    navLinks: [
      {
        href: '#',
        label: 'Internal Nav',
      },
      {
        href: '#',
        label: 'External Nav',
        external: true,
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
    tools: {
      items: [
        { href: '#', label: 'Internal Tool' },
        { href: '#', label: 'External Tool', external: true },
      ],
    },
    navLinks: [
      {
        href: '#',
        label: 'Internal Nav',
      },
      {
        href: '#',
        label: 'External Nav',
        external: true,
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
