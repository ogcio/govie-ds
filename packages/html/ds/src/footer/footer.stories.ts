import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './footer.html?raw';
import { FooterProps } from './footer.schema';

// Name of the folder the macro resides
const path = import.meta.url.split('/footer')[0];

const macro = { name: 'govieFooter', html, path };

const Footer = renderComponent<FooterProps>(macro);

const meta = {
  component: Footer,
  title: 'Layout/Footer',
  parameters: {
    macro,
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

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

export const WithSecondaryNavigationAndLinksAndTwoColumns: Story = {
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
