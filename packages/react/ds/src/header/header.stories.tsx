import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './header.js';

const meta = {
  title: 'layout/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the Header',
    },
    logo: {
      control: 'object',
      type: {
        name: 'object',
        value: {
          image: {
            name: 'string',
          },
          href: {
            name: 'string',
          },
        },
      },
      description: 'The url and image for the logo',
    },
    tools: {
      control: 'object',
      description: 'Actionable items such as Search, Menu and additional CTA',
      type: {
        name: 'object',
        value: {
          search: {
            name: 'object',
            value: {
              action: {
                name: 'string',
                required: true,
              },
              label: {
                name: 'string',
              },
              icon: {
                name: 'string',
              },
            },
          },
          items: {
            name: 'object',
            value: {
              label: {
                name: 'string',
              },
              icon: {
                name: 'string',
              },
              href: {
                name: 'string',
                required: true,
              },
            },
          },
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
    logo: {
      href: '/link',
    },
    tools: {
      search: {
        action: '/search_page',
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
      defaultViewport: 'pixel',
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
