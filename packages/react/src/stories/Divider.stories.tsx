import type { Meta, StoryObj } from '@storybook/react-vite';
import { omit } from 'lodash';
import { Divider, type DividerProps } from '../Divider';
import { Stack } from '../stack/stack';
import { Box } from '../Box';
import {
  dividerMeta,
  Default as dividerDefault,
  Vertical as dividerVertical,
  Inset as dividerInset,
} from '../atoms/storybook/Divider.meta';
import { Orientation } from '../atoms/constants';

const meta = {
  ...dividerMeta,
  title: 'Layout/Divider',
  argTypes: {
    ...omit(dividerMeta.argTypes, 'styles'),
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

export const Default: Story = {
  ...dividerDefault,
  render: (props: DividerProps) => (
    <Box
      className={
        props.orientation === Orientation.VERTICAL ? 'gi-flex gi-h-20' : ''
      }
    >
      <Divider {...props} />
    </Box>
  ),
};

export const Vertical: Story = {
  ...dividerVertical,
  render: (props) => (
    <Stack direction="row" gap={4} className="gi-h-20">
      <Box className="gi-p-4">Left</Box>
      <Divider {...props} />
      <Box className="gi-p-4">Right</Box>
    </Stack>
  ),
};

export const Inset: Story = {
  ...dividerInset,
  render: (props) => <Divider {...props} />,
};
