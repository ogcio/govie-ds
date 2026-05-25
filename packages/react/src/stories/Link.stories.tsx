import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@/Box';
import Link from '@/atoms/Link';
import * as stories from '@/atoms/storybook/Link.meta';

const meta: Meta<typeof Link> = {
  ...stories.linkMeta,
  title: 'Components/Link',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...stories.Default,
  render: (props) => <Link {...props} />,
};

export const ExternalLink: Story = {
  ...stories.ExternalLink,
  render: (props) => <Link {...props} />,
};

export const NoUnderline: Story = {
  ...stories.NoUnderline,
  render: (props) => <Link {...props} />,
};

export const NoVisited: Story = {
  ...stories.NoVisited,
  render: (props) => <Link {...props} />,
};

export const InheritColour: Story = {
  ...stories.InheritColour,
  render: (props) => <Link {...props} />,
};

export const Sizes: Story = {
  ...stories.Sizes,
  render: () => (
    <Box className="gi-flex gi-flex-col gi-gap-4 gi-items-start">
      <Link href="#" className="gi-text-sm">
        Small link
      </Link>
      <Link href="#" className="gi-text-md">
        Medium link
      </Link>
      <Link href="#" className="gi-text-lg">
        Large link
      </Link>
    </Box>
  ),
};

export const InteractionStates: Story = {
  ...stories.InteractionStates,
  render: () => (
    <Box className="gi-flex gi-flex-col gi-gap-4 gi-items-start">
      <Box className="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
        <Link href="#">default</Link>
        <Link href="#" className="pseudo-hover">
          hover
        </Link>
        <Link href="#" className="pseudo-focus">
          focus
        </Link>
      </Box>
      <Box className="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row gi-p-4 gi-bg-black">
        <Link href="#" className="gi-text-white hover:gi-text-white focus:gi-text-white visited:gi-text-white">
          light
        </Link>
        <Link
          href="#"
          className="gi-text-white hover:gi-text-white focus:gi-text-white visited:gi-text-white pseudo-hover"
        >
          light hover
        </Link>
        <Link
          href="#"
          className="gi-text-white hover:gi-text-white focus:gi-text-white visited:gi-text-white pseudo-focus"
        >
          light focus
        </Link>
      </Box>
    </Box>
  ),
};
