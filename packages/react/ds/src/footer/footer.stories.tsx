import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
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
        external: true,
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
            external: true,
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
            external: true,
          },
        ],
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const mainLink0 = canvas.getByTestId('main-link-0').firstChild;
    const mainLink2 = canvas.getByTestId('main-link-2').firstChild;
    const secondary00 = canvas.getByTestId('secondary-0-0').firstChild;
    const secondary02 = canvas.getByTestId('secondary-0-2').firstChild;
    const secondary10 = canvas.getByTestId('secondary-1-0').firstChild;
    const secondary12 = canvas.getByTestId('secondary-1-2').firstChild;

    await expect(mainLink0).not.toHaveAttribute('target', '_blank');
    await expect(mainLink0).not.toHaveAttribute('rel', 'noreferrer noopener');

    await expect(mainLink2).toHaveAttribute('target', '_blank');
    await expect(mainLink2).toHaveAttribute('rel', 'noreferrer noopener');

    await expect(secondary00).not.toHaveAttribute('target', '_blank');
    await expect(secondary00).not.toHaveAttribute('rel', 'noreferrer noopener');

    await expect(secondary02).toHaveAttribute('target', '_blank');
    await expect(secondary02).toHaveAttribute('rel', 'noreferrer noopener');

    await expect(secondary10).not.toHaveAttribute('target', '_blank');
    await expect(secondary10).not.toHaveAttribute('rel', 'noreferrer noopener');

    await expect(secondary12).toHaveAttribute('target', '_blank');
    await expect(secondary12).toHaveAttribute('rel', 'noreferrer noopener');
  },
};
