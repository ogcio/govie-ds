import type { Meta, StoryObj } from '@storybook/react-vite';
import Link from '@/atoms/Link';
import Box from '@/atoms/Box';
import * as stories from '@/atoms/storybook/Link.meta';

const meta = {
  ...stories.linkMeta,
  title: 'Navigation/Link/Link',
  component: Link,
  parameters: {
    ...stories.linkMeta.parameters,
    docs: {
      ...stories.linkMeta.parameters?.docs,
      description: {
        component: `${stories.linkMeta.parameters?.docs?.description?.component ?? ''}\n\nThis is the recommended Link component for new projects. It is available via the \`next\` entry point of the React package:\n\n\`\`\`tsx\nimport { Link } from "@ogcio/design-system-react/next";\n\`\`\``,
      },
    },
  },
} as Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  ...stories.Default,
};

export const ExternalLink: Story = {
  ...stories.ExternalLink,
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
        <Link href="#">Default</Link>
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
        <Link href="#">default</Link>
        <Link href="#" className="pseudo-hover">
          hover
        </Link>
        <Link href="#" className="pseudo-focus">
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
