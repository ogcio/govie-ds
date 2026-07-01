import type { Meta, StoryObj } from '@storybook/react-vite';
import { omit } from 'lodash';
import Divider, { type DividerProps } from '@/Divider';
import { Stack } from '@/stack/stack';
import { Box } from '@/Box';
import * as stories from '@/atoms/storybook/Divider.meta';
import { Orientation } from '@/atoms/constants';
import Link from '@/Link';

const meta = {
  ...stories.meta,
  title: 'Layout/Divider',
  argTypes: {
    ...omit(stories.meta.argTypes, 'styles'),
    style: {
      control: { disable: true },
      description:
        'Inline styles applied directly to the element. Use for truly dynamic values that cannot be expressed as Tailwind classes. Alias: `styles`.',
      table: { type: { summary: 'React.CSSProperties' } },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  ...stories.Horizontal,
  render: (props: DividerProps) => (
    <Stack gap={2} direction={props.orientation === Orientation.VERTICAL ? 'row' : 'column'}>
      <Box>Content</Box>
      <Divider {...props} />
      <Box>Content</Box>
    </Stack>
  ),
};

export const Vertical: Story = {
  ...stories.Vertical,
  render: (props) => (
    <Stack direction="row" gap={2}>
      <Box>Left</Box>
      <Divider {...props} />
      <Box>Right</Box>
    </Stack>
  ),
};

export const RichText: Story = {
  ...stories.RichText,
  render: (props) => (
    <Stack direction="row" gap={2}>
      <Box>
        <Link href="#">Left</Link>
      </Box>
      <Divider {...props} />
      <Box>
        <Link href="#">Right</Link>
      </Box>
    </Stack>
  ),
};
