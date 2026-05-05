import type { Meta, StoryObj } from '@storybook/react-vite';
import Box from '../atoms/Box';
import Container from '../atoms/Container';
import Stack from '../atoms/Stack';
import {
  boxMeta,
  Default as boxDefault,
  WithContainerAndStack as boxWithContainerAndStack,
} from '../atoms/storybook/Box.meta';

const meta: Meta<typeof Box> = {
  ...boxMeta,
  title: 'Layout/Box',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...boxDefault,
  render: (props) => <Box {...props}>{props.children}</Box>,
};

export const WithContainerAndStack: Story = {
  ...boxWithContainerAndStack,
  render: () => (
    <Container>
      <Stack direction="row" gap={4}>
        <Box
          className="gi-p-4 gi-bg-gray-300 gi-flex-1"
          dataTestId="box-layout"
        >
          Box 1
        </Box>
        <Box className="gi-p-4 gi-bg-gray-300 gi-flex-1">Box 2</Box>
        <Box className="gi-p-4 gi-bg-gray-300 gi-flex-1">Box 3</Box>
      </Stack>
    </Container>
  ),
};
