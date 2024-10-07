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
    noJsMenuLink: {
      description:
        'Fallback link for the menu button if there is no JS enabled on page',
    },
    noJsSearchLink: {
      description:
        'Fallback link for the search button if there is no JS enabled on page',
    },
    searchUrl: {
      description: 'The url for the search page',
    },
    logoLink: {
      description: 'The link used for the Logo',
    },
    navLinks: {
      description: 'A list of navigation links',
    },
    languages: {
      description: 'A list of secondary navigation links',
    },
  },
  args: {
    searchUrl: '/seach_page',
    logoLink: '/home',
    noJsMenuLink: '/menu',
    noJsSearchLink: '/search',
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
  args: {
    searchUrl: '/seach_page',
    logoLink: '/home',
    noJsMenuLink: '/menu',
    noJsSearchLink: '/search',
  },
};

export const WithMainLinks: Story = {
  args: {
    searchUrl: '/seach_page',
    logoLink: '/home',
    noJsMenuLink: '/menu',
    noJsSearchLink: '/search',
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
    logoLink: '/home',
    noJsMenuLink: '/menu',
    noJsSearchLink: '/search',
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
    searchUrl: '/seach_page',
    logoLink: '/home',
    noJsMenuLink: '/menu',
    noJsSearchLink: '/search',
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
    searchUrl: '/seach_page',
    logoLink: '/home',
    noJsMenuLink: '/menu',
    noJsSearchLink: '/search',
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
    searchUrl: '/seach_page',
    logoLink: '/home',
    noJsMenuLink: '/menu',
    noJsSearchLink: '/search',
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
    searchUrl: '/seach_page',
    logoLink: '/home',
    noJsMenuLink: '/menu',
    noJsSearchLink: '/search',
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
    searchUrl: '/seach_page',
    logoLink: '/home',
    noJsMenuLink: '/menu',
    noJsSearchLink: '/search',
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
