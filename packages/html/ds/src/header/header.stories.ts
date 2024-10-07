import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './header.html?raw';
import { HeaderProps } from './header.schema';

// Name of the folder the macro resides
const path = import.meta.url.split('/header')[0];

const macro = { name: 'govieHeader', html, path };

const Header = renderComponent<HeaderProps>(macro);

const meta = {
  component: Header,
  title: 'layout/Header',
  parameters: {
    macro,
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    logo: {
      href: {
        description: 'The link used for the Logo',
      },
    },
    tools: {
      search: {
        action: {
          description: 'The url for the search page',
        },
        noJsSearchLink: {
          description:
            'Fallback link for the search button if there is no JS enabled on page',
        },
      },
      menu: {
        noJsMenuLink: {
          description:
            'Fallback link for the menu button if there is no JS enabled on page',
        },
      },
    },
    navLinks: {
      description: 'A list of navigation links',
    },
    languages: {
      description: 'A list of secondary navigation links',
    },
  },
  args: {
    logo: { href: '/home' },
    tools: {
      search: {
        action: '/search_page',
        label: 'Search',
        noJsSearchLink: '/search',
      },
      menu: {
        label: 'Menu',
        noJsMenuLink: '/menu',
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
        label: 'Gaeilge',
      },
    ],
  },
};

export const NoLinks: Story = {
  args: {},
};

export const OnlyTitle: Story = {
  args: {
    title: 'Application title',
  },
};

export const WithMainLinks: Story = {
  args: {
    logo: { href: '/home' },
    tools: {
      search: {
        action: '/search_page',
        label: 'Search',
        noJsSearchLink: '/search',
      },
      menu: {
        label: 'Menu',
        noJsMenuLink: '/menu',
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
    logo: { href: '/home' },
    tools: {
      menu: {
        noJsMenuLink: '/menu',
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

export const WithLanguage: Story = {
  args: {
    logo: { href: '/home' },
    tools: {
      search: { action: '/search_page', noJsSearchLink: '/search' },
      menu: {
        noJsMenuLink: '/menu',
      },
    },
    languages: [
      {
        href: '#',
        label: 'Gaeilge',
      },
    ],
  },
};

export const withMainAndLanguageLinks: Story = {
  args: {
    logo: { href: '/home' },
    tools: {
      search: { action: '/search_page', noJsSearchLink: '/search' },
      menu: {
        noJsMenuLink: '/menu',
      },
    },
    navLinks: [
      {
        href: '#link-1',
        label: 'News',
      },
      {
        href: '#link-2',
        label: 'Departments',
      },
      {
        href: '#link-3',
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

export const tabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'pixel',
    },
  },
  args: {
    logo: { href: '/home' },
    tools: {
      search: { action: '/search_page', noJsSearchLink: '/search' },
      menu: {
        noJsMenuLink: '/menu',
      },
    },
    navLinks: [
      {
        href: '#link-1',
        label: 'News',
      },
      {
        href: '#link-2',
        label: 'Departments',
      },
      {
        href: '#link-3',
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

export const mobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: {
    logo: { href: '/home' },
    tools: {
      search: { action: '/search_page', noJsSearchLink: '/search' },
      menu: {
        noJsMenuLink: '/menu',
      },
    },
    navLinks: [
      {
        href: '#link-1',
        label: 'News',
      },
      {
        href: '#link-2',
        label: 'Departments',
      },
      {
        href: '#link-3',
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

export const withTitle: Story = {
  args: {
    title: 'Life Events',
    logo: { href: '/home' },
    tools: {
      search: { action: '/search_page', noJsSearchLink: '/search' },
      menu: {
        noJsMenuLink: '/menu',
      },
    },
    navLinks: [
      {
        href: '#link-1',
        label: 'News',
      },
      {
        href: '#link-2',
        label: 'Departments',
      },
      {
        href: '#link-3',
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

export const WithNoLabels: Story = {
  args: {
    logo: { href: '/home' },
    tools: {
      search: {
        action: '/search_page',
        noJsSearchLink: '/search',
      },
      menu: {
        noJsMenuLink: '/menu',
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
