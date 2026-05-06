import type { Meta, StoryObj } from '@storybook/react-vite';
import { omit } from 'lodash';
import { Box } from '../Box';
import { Container } from '../container/container';
import { Stack } from '../stack/stack';
import {
  boxMeta,
  Default as boxDefault,
  WithContainerAndStack as boxWithContainerAndStack,
} from '../atoms/storybook/Box.meta';

const meta: Meta<typeof Box> = {
  ...boxMeta,
  title: 'Layout/Box',
  argTypes: {
    ...omit(boxMeta.argTypes, 'styles'),
    style: {
      control: { disable: true },
      description:
        'Inline styles applied directly to the container element. Use for truly dynamic values that cannot be expressed as Tailwind classes. Alias: `styles`.',
      table: { type: { summary: 'React.CSSProperties' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...boxDefault,
  render: (props) => <Box {...props} />,
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
