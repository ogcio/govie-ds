import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from '../paragraph/paragraph.js';
import { Stack } from '../stack/stack.js';

import { Link } from './link.js';

const meta = {
  title: 'Navigation/Link',
  component: Link,
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    children: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    href: {
      control: 'text',
      type: { name: 'string', required: true },
    },
    noUnderline: {
      description: 'To remove underlines from links.',
      control: 'boolean',
      type: { name: 'boolean' },
    },
    external: {
      description: 'To open the link in a new tab.',
      control: 'boolean',
      type: { name: 'boolean' },
    },
    noVisited: {
      description:
        'Where it is not helpful to distinguish between visited and unvisited states, for example when linking to pages with frequently-changing content such as the dashboard for an admin interface.',
      control: 'boolean',
      type: { name: 'boolean' },
    },
    noColor: {
      description: 'To inherit color from parent',
      control: 'boolean',
      type: { name: 'boolean' },
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the link.',
      type: { name: 'string', required: false },
    },
    iconStart: {
      description: 'Optional icon displayed at the start of the link field.',
      control: 'text',
      table: {
        category: 'Visual',
        type: { summary: 'IconId' },
      },
    },
    iconEnd: {
      description: 'Optional icon displayed at the end of the link field.',
      control: 'text',
      table: {
        category: 'Visual',
        type: { summary: 'IconId' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Specify if the link is disabled',
      type: 'boolean',
    },
    appearance: {
      control: { type: 'radio' },
      options: ['default', 'light'],
      description: 'Appearance of the link.',
      category: 'Visual',
      type: { name: 'string', required: false },
    },
  },
  args: {
    href: '#',
    children: 'Link',
  },
};

export const WithoutUnderline: Story = {
  args: {
    href: '#',
    children: 'Link without underline',
    noUnderline: true,
  },
};

export const External: Story = {
  args: {
    href: '#',
    children: 'Link text (opens in a new tab)',
    external: true,
  },
};

export const NoVisited: Story = {
  args: {
    href: '#',
    children: 'Link',
    noVisited: true,
  },
};

export const StyledAsButton: Story = {
  args: {
    asButton: {
      variant: 'primary',
      size: 'medium',
      appearance: 'default',
    },
    href: '#',
    children: 'Link',
  },
};

export const AsButton: Story = {
  args: {},
  render: () => (
    <Link onClick={() => alert('Button Clicked')} asChild>
      <button>Click me</button>
    </Link>
  ),
};

export const AllStates: Story = {
  args: {
    href: '#',
    children: '',
    noVisited: true,
  },
  render: () => (
    <div className="gi-gap-4 gi-flex">
      <Link href="#">Default</Link>
      <Link href="#">Hover</Link>
      <Link href="#">Focus</Link>
    </div>
  ),
  parameters: {
    pseudo: {
      hover: '.gi-link:nth-child(2)',
      focus: '.gi-link:nth-child(3)',
    },
  },
};

export const WithText: Story = {
  render: () => (
    <Stack gap={2}>
      <Stack>
        <Paragraph>Small size</Paragraph>
        <Paragraph size="sm">
          Here is a paragraph with{' '}
          <Link
            size="sm"
            href="#"
            iconStart="arrow_back"
            iconEnd="arrow_forward"
          >
            Link text
          </Link>
          .
        </Paragraph>
      </Stack>
      <Stack>
        <Paragraph size="md">Medium size</Paragraph>
        <Paragraph size="md">
          Here is a paragraph with{' '}
          <Link
            size="md"
            href="#"
            iconStart="arrow_back"
            iconEnd="arrow_forward"
          >
            Link text
          </Link>
          .
        </Paragraph>
      </Stack>
      <Stack>
        <Paragraph size="lg">Large size</Paragraph>
        <Paragraph size="lg">
          Here is a paragraph with{' '}
          <Link
            size="lg"
            href="#"
            iconStart="arrow_back"
            iconEnd="arrow_forward"
          >
            Link text
          </Link>
          .
        </Paragraph>
      </Stack>
    </Stack>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <Stack gap={6}>
      <Stack gap={6}>
        <Paragraph> Underline</Paragraph>
        <Stack gap={6}>
          <Stack gap={2}>
            <Paragraph>Default</Paragraph>
            <div className="gi-flex gi-gap-4">
              <Link href="#" iconStart="arrow_back" iconEnd="arrow_forward">
                Link text
              </Link>
              <Link
                href="#"
                className="link-hover"
                iconStart="arrow_back"
                iconEnd="arrow_forward"
              >
                Link text
              </Link>

              <Link
                href="#"
                className="link-focus"
                iconStart="arrow_back"
                iconEnd="arrow_forward"
              >
                Link text
              </Link>

              <Link
                href="#"
                iconStart="arrow_back"
                iconEnd="arrow_forward"
                disabled
              >
                Link text
              </Link>
            </div>
          </Stack>
          <Stack gap={2}>
            <Paragraph>No color</Paragraph>
            <div className="gi-flex gi-gap-4">
              <Link
                href="#2"
                iconStart="arrow_back"
                iconEnd="arrow_forward"
                noColor
              >
                Link text
              </Link>
              <Link
                noColor
                href="#21"
                className="link-hover"
                iconStart="arrow_back"
                iconEnd="arrow_forward"
              >
                Link text
              </Link>

              <Link
                noColor
                href="#22"
                className="link-focus"
                iconStart="arrow_back"
                iconEnd="arrow_forward"
              >
                Link text
              </Link>

              <Link
                noColor
                href="#23"
                iconStart="arrow_back"
                iconEnd="arrow_forward"
                disabled
              >
                Link text
              </Link>
            </div>
          </Stack>
          <Stack gap={2}>
            <Paragraph>Light</Paragraph>
            <div className="gi-flex gi-gap-4 gi-bg-black gi-p-4 gi-w-fit">
              <Link
                appearance="light"
                href="#2"
                iconStart="arrow_back"
                iconEnd="arrow_forward"
              >
                Link text
              </Link>
              <Link
                appearance="light"
                href="#21"
                className="link-hover"
                iconStart="arrow_back"
                iconEnd="arrow_forward"
              >
                Link text
              </Link>

              <Link
                appearance="light"
                href="#22"
                className="link-focus"
                iconStart="arrow_back"
                iconEnd="arrow_forward"
              >
                Link text
              </Link>

              <Link
                appearance="light"
                href="#23"
                iconStart="arrow_back"
                iconEnd="arrow_forward"
                disabled
              >
                Link text
              </Link>
            </div>
          </Stack>
        </Stack>
      </Stack>
      <Stack gap={6}>
        <Paragraph> No Underline</Paragraph>
        <Stack gap={6}>
          <Stack gap={2}>
            <Paragraph>Default</Paragraph>
            <div className="gi-flex gi-gap-4">
              <Link
                href="#"
                noUnderline
                iconStart="arrow_back"
                iconEnd="arrow_forward"
              >
                Link text
              </Link>
              <Link
                noUnderline
                href="#"
                className="link-hover"
                iconStart="arrow_back"
                iconEnd="arrow_forward"
              >
                Link text
              </Link>

              <Link
                href="#"
                className="link-focus"
                noUnderline
                iconStart="arrow_back"
                iconEnd="arrow_forward"
              >
                Link text
              </Link>

              <Link
                href="#"
                noUnderline
                iconStart="arrow_back"
                iconEnd="arrow_forward"
                disabled
              >
                Link text
              </Link>
            </div>
          </Stack>
          <Stack gap={2}>
            <Paragraph>No color</Paragraph>
            <div className="gi-flex gi-gap-4">
              <Link
                href="#2"
                iconStart="arrow_back"
                iconEnd="arrow_forward"
                noColor
                noUnderline
              >
                Link text
              </Link>
              <Link
                noColor
                href="#21"
                className="link-hover"
                iconStart="arrow_back"
                iconEnd="arrow_forward"
                noUnderline
              >
                Link text
              </Link>

              <Link
                noColor
                href="#22"
                className="link-focus"
                noUnderline
                iconStart="arrow_back"
                iconEnd="arrow_forward"
              >
                Link text
              </Link>

              <Link
                noColor
                noUnderline
                href="#23"
                iconStart="arrow_back"
                iconEnd="arrow_forward"
                disabled
              >
                Link text
              </Link>
            </div>
          </Stack>
          <Stack gap={2}>
            <Paragraph>Light</Paragraph>
            <div className="gi-flex gi-gap-4 gi-bg-black gi-p-4 gi-w-fit">
              <Link
                appearance="light"
                href="#2"
                iconStart="arrow_back"
                iconEnd="arrow_forward"
                noUnderline
              >
                Link text
              </Link>
              <Link
                appearance="light"
                href="#21"
                className="link-hover"
                iconStart="arrow_back"
                iconEnd="arrow_forward"
                noUnderline
              >
                Link text
              </Link>

              <Link
                appearance="light"
                href="#22"
                className="link-focus"
                noUnderline
                iconStart="arrow_back"
                iconEnd="arrow_forward"
              >
                Link text
              </Link>

              <Link
                appearance="light"
                href="#23"
                iconStart="arrow_back"
                iconEnd="arrow_forward"
                disabled
                noUnderline
              >
                Link text
              </Link>
            </div>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  ),
  parameters: {
    pseudo: {
      hover: '.link-hover',
      focus: '.link-focus',
    },
  },
};
