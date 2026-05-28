import type { Meta, StoryObj } from '@storybook/react-vite';
import Link from '@/Link';
import Box from '@/atoms/Box';
import * as stories from '@/atoms/storybook/Link.meta';

const meta = {
  ...stories.linkMeta,
  title: 'Next/Navigation/Link',
  component: Link,
} as Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  ...stories.Default,
  args: { ...stories.Default.args, inline: true },
};

export const ExternalLink: Story = {
  ...stories.ExternalLink,
  args: { ...stories.ExternalLink.args, inline: true },
};

export const PrimitiveAnchor: Story = { ...stories.PrimitiveAnchor };

export const InlineLink: Story = { ...stories.InlineLink };

export const Underlines: Story = {
  render: () => (
    <Box className="gi-flex gi-flex-col gi-gap-4 gi-items-start">
      <Link href="#" underline="always">
        Always underlined
      </Link>
      <Link href="#" underline="hover">
        Underline on hover only
      </Link>
      <Link href="#" underline="none">
        No underline
      </Link>
    </Box>
  ),
};

export const Appearances: Story = {
  render: () => (
    <Box className="gi-flex gi-flex-col gi-gap-4 gi-items-start">
      <Box className="gi-p-4">
        <Link href="#" inline>
          Default appearance
        </Link>
      </Box>
      <Box className="gi-p-4 gi-bg-black">
        <Link href="#" appearance="light">
          Light appearance
        </Link>
      </Box>
      <Box className="gi-p-4 gi-text-gray-700">
        <Link href="#" appearance="inherit">
          Inherits parent colour
        </Link>
      </Box>
    </Box>
  ),
};

export const InteractionStates: Story = {
  ...stories.InteractionStates,
  render: () => (
    <Box className="gi-flex gi-flex-col gi-gap-4 gi-items-start">
      <Box className="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
        <Link href="#" inline>
          default
        </Link>
        <Link href="#" inline className="pseudo-hover">
          hover
        </Link>
        <Link href="#" inline className="pseudo-focus">
          focus
        </Link>
      </Box>
      <Box className="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row gi-p-4 gi-bg-black">
        <Link href="#" appearance="light">
          light
        </Link>
        <Link href="#" appearance="light" className="pseudo-hover">
          light hover
        </Link>
        <Link href="#" appearance="light" className="pseudo-focus">
          light focus
        </Link>
      </Box>
    </Box>
  ),
};
