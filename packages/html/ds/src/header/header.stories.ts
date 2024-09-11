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
    navLinks: {
      description: 'A list of navigation links',
    },
    languages: {
      description: 'A list of secondary navigation links',
    },
  },
  args: {
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

export const NoLinks: Story = {};

export const WithMainLinks: Story = {
  args: {
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
    viewport: {
      defaultViewport: 'pixel',
    },
  },
  args: {
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
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: {
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
