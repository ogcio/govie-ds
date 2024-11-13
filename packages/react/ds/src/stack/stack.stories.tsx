import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button.js';
import { Link } from '../link/link.js';
import { Stack } from './stack.js';

const meta = {
  title: 'layout/Stack',
  component: Stack,
  argTypes: {
    direction: {
      control: 'object',
      description:
        'Sets stack direction, supporting responsive breakpoints (e.g., `{ base: "column", md: "row" }`).',
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
        'Sets the gap between items, supporting responsive breakpoints (e.g., `{ base: 3, sm: 2, md: 1 }`)',
      defaultValue: 1,
    },
    hasDivider: {
      control: 'boolean',
      description: 'If true, renders a divider between items.',
      defaultValue: false,
    },
    wrap: {
      control: 'boolean',
      description: 'If true, wrap items',
      defaultValue: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="gi-p-4 gi-bg-gray-50">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const itemClasses =
  'gi-bg-gray-300 gi-p-2 gi-h-[50px] gi-w-[100px] gi-flex gi-items-center gi-justify-center';
const children = [<div>Item 1</div>, <div>Item 2</div>, <div>Item 3</div>];

export const Default: Story = {
  args: {
    direction: 'column',
    itemsAlignment: 'start',
    itemsDistribution: 'start',
    gap: 2,
    hasDivider: false,
    wrap: false,
    fixedHeight: '300px',
    children: [
      <div className={itemClasses}>Item 1</div>,
      <div className={itemClasses}>Item 2</div>,
      <div className={itemClasses}>Item 3</div>,
    ],
  },
};

export const ResponsiveDirectionWithDivider: Story = {
  args: {
    direction: { base: 'row', sm: 'row', md: 'column' },
    itemsAlignment: 'center',
    itemsDistribution: 'between',
    gap: 1,
    hasDivider: true,
    fixedHeight: '150px',
    children,
  },
};

export const CenteredItemsWithGap: Story = {
  args: {
    direction: 'column',
    itemsAlignment: 'center',
    itemsDistribution: 'center',
    gap: { sm: 3, md: 6 },
    hasDivider: false,
    children,
  },
};

export const StretchedDistributionWithDivider: Story = {
  args: {
    direction: { sm: 'column', lg: 'row' },
    itemsAlignment: 'center',
    itemsDistribution: 'around',
    gap: { sm: 1, lg: 5 },
    hasDivider: true,
    children,
  },
};

export const BaselineAlignment: Story = {
  args: {
    direction: { sm: 'row', md: 'column' },
    itemsAlignment: 'start',
    itemsDistribution: 'center',
    gap: 4,
    children,
  },
};

export const WithComponents: Story = {
  args: {
    direction: { sm: 'row', md: 'column' },
    itemsAlignment: 'center',
    itemsDistribution: 'around',
    gap: 4,
    fixedHeight: '300px',
    children: [
      <Button>Button 1</Button>,
      <Link href="#">Link 1</Link>,
      <Button>Button 2</Button>,
    ],
  },
};