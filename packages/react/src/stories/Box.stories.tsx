import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@/Box';
import { Container } from '@/container/container';
import { Stack } from '@/stack/stack';
import {
  boxMeta,
  Default as boxDefault,
  WithContainerAndStack as boxWithContainerAndStack,
} from '@/atoms/storybook/Box.meta';
import argTypes from '@/atoms/storybook/argTypes';

const meta: Meta<typeof Box> = {
  ...boxMeta,
  title: 'Layout/Box',
  argTypes: {
    ...boxMeta.argTypes,
    className: argTypes.class,
    style: {
      control: { disable: true },
      description: 'Inline styles applied directly to the container element.',
      table: { type: { summary: 'React.CSSProperties' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...boxDefault,
  render: (props) => <Box className="gi-p-4" {...props} />,
};

export const WithContainerAndStack: Story = {
  ...boxWithContainerAndStack,
  render: () => (
    <Container>
      <Stack direction="row" gap={4}>
        <Box className="gi-p-4 gi-bg-gray-300 gi-flex-1">Box 1</Box>
        <Box className="gi-p-4 gi-bg-gray-300 gi-flex-1">Box 2</Box>
        <Box className="gi-p-4 gi-bg-gray-300 gi-flex-1">Box 3</Box>
      </Stack>
    </Container>
  ),
};
