import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './footer.js';

const meta = {
  title: 'layout/Footer',
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithLinks: Story = {
  args: {
    links: [
      {
        href: '#',
        label: 'Link 1',
      },
      {
        href: '#',
        label: 'Link 2',
      },
      {
        href: '#',
        label: 'Link 3',
      },
    ],
  },
};

export const WithSecondaryNavigation: Story = {
  args: {
    secondaryNavLinks: [
      {
        heading: 'Heading',
        links: [
          {
            href: '#',
            label: 'Link 1',
          },
          {
            href: '#',
            label: 'Link 2',
          },
          {
            href: '#',
            label: 'Link 3',
          },
        ],
      },
    ],
  },
};

export const WithSecondaryNavigationTwoColumns: Story = {
  args: {
    secondaryNavLinks: [
      {
        heading: 'Heading 1',
        links: [
          {
            href: '#',
            label: 'Link 1',
          },
          {
            href: '#',
            label: 'Link 2',
          },
          {
            href: '#',
            label: 'Link 3',
          },
        ],
      },
      {
        heading: 'Heading 2',
        links: [
          {
            href: '#',
            label: 'Link 4',
          },
          {
            href: '#',
            label: 'Link 5',
          },
          {
            href: '#',
            label: 'Link 6',
          },
        ],
      },
    ],
  },
};

export const WithSecondaryNavigationAndLinks: Story = {
  args: {
    links: [
      {
        href: '#',
        label: 'Link 1',
      },
      {
        href: '#',
        label: 'Link 2',
      },
      {
        href: '#',
        label: 'Link 3',
      },
    ],
    secondaryNavLinks: [
      {
        heading: 'Heading',
        links: [
          {
            href: '#',
            label: 'Link 1',
          },
          {
            href: '#',
            label: 'Link 2',
          },
          {
            href: '#',
            label: 'Link 3',
          },
        ],
      },
    ],
  },
};
