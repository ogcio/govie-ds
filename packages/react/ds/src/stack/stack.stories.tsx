import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './stack.js';

const meta = {
  title: 'layout/Stack',
  component: Stack,
  argTypes: {
    direction: {
      control: 'object',
      description:
        'Sets the direction of the stack items. Accepts responsive breakpoints.',
      defaultValue: 'column',
    },
    itemsAlignment: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alignment of items within the stack.',
      defaultValue: 'start',
    },
    itemsDistribution: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Distribution of items within the stack.',
      defaultValue: 'start',
    },
    gap: {
      control: 'object',
      description:
        'Sets the gap between items. Accepts a fixed number or responsive breakpoints.',
      defaultValue: 1,
    },
    hasDivider: {
      control: 'boolean',
      description: 'If true, renders a divider between items.',
      defaultValue: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="gi-p-4 gi-h-[300px] gi-bg-gray-50 gi-overflow-auto">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    direction: { sm: 'column' },
    itemsAlignment: 'start',
    itemsDistribution: 'start',
    gap: 1,
    hasDivider: false,
  },
  render: (args) => {
    const itemClasses =
      'gi-bg-gray-300 gi-p-2 gi-h-[50px] gi-w-[100px] gi-flex gi-items-center gi-justify-center';
    return (
      <Stack {...args}>
        <div className={itemClasses}>Item 1</div>
        <div className={itemClasses}>Item 2</div>
        <div className={itemClasses}>Item 3</div>
      </Stack>
    );
  },
};

export const ResponsiveDirectionWithDivider: Story = {
  args: {
    direction: { sm: 'column' },
    itemsAlignment: 'center',
    itemsDistribution: 'between',
    gap: 1,
    hasDivider: true,
  },
  render: (args) => (
    <Stack {...args}>
      <div>Item A</div>
      <div>Item B</div>
      <div>Item C</div>
    </Stack>
  ),
};

export const CenteredItemsWithGap: Story = {
  args: {
    direction: 'column',
    itemsAlignment: 'center',
    itemsDistribution: 'center',
    gap: { sm: 3, md: 6 },
    hasDivider: false,
  },
  render: (args) => (
    <Stack {...args}>
      <div>Content 1</div>
      <div>Content 2</div>
      <div>Content 3</div>
    </Stack>
  ),
};

export const StretchedDistributionWithDivider: Story = {
  args: {
    direction: { sm: 'column', lg: 'row' },
    itemsAlignment: 'center',
    itemsDistribution: 'around',
    gap: { sm: 1, lg: 5 },
    hasDivider: true,
  },
  render: (args) => (
    <Stack {...args}>
      <div>Element 1</div>
      <div>Element 2</div>
      <div>Element 3</div>
    </Stack>
  ),
};

export const BaselineAlignment: Story = {
  args: {
    direction: { sm: 'row', md: 'column' },
    itemsAlignment: 'start',
    itemsDistribution: 'center',
    gap: 4,
    hasDivider: false,
  },
  render: (args) => (
    <Stack {...args}>
      <div>Baseline Item 1</div>
      <div>Baseline Item 2</div>
      <div>Baseline Item 3</div>
    </Stack>
  ),
};
