import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Button } from '../button/button.js';
import { Link } from '../link/link.js';
import { Stack } from './stack.js';

const meta = {
  title: 'layout/Stack',
  parameters: {
    docs: {
      description: {
        component:
          'The Stack component arranges children in rows or columns with responsive gaps, alignment, and optional dividers.',
      },
    },
  },
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
    className: {
      control: 'text',
      description: 'Custom classNames added into the stack container',
    },
  },
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

export const WithDefaultProps: Story = {
  args: {
    children: [<div>Item 1</div>, <div>Item 2</div>, <div>Item 3</div>],
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

export const AroundDistributionWithDivider: Story = {
  args: {
    direction: { sm: 'column', lg: 'row' },
    itemsAlignment: 'center',
    itemsDistribution: 'around',
    gap: { sm: 1, lg: 5 },
    hasDivider: true,
    fixedHeight: '100px',
    children,
  },
};

export const CenterDistribution: Story = {
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
      <div>
        <Button>Button 1</Button>
      </div>,
      <div>
        <Link href="#">Link 1</Link>
      </div>,
      <div>
        <Button>Button 2</Button>
      </div>,
    ],
  },
};

export const NestedStack: Story = {
  args: {
    children: null,
  },
  render: () => {
    return (
      <Stack gap={5}>
        <Stack direction="row">
          <div className="gi-h-[80px] gi-w-full gi-bg-gray-200"></div>
        </Stack>
        <Stack direction="row" gap={5}>
          <Stack direction="column" gap={5}>
            <div className="gi-h-[200px] gi-w-full gi-bg-gray-200"></div>
          </Stack>
          <Stack direction="row" gap={5} wrap>
            <div className="gi-h-[50px] gi-w-[100px] gi-bg-gray-200"></div>
            <div className="gi-h-[50px] gi-w-[100px] gi-bg-gray-200"></div>
            <div className="gi-h-[50px] gi-w-[100px] gi-bg-gray-200"></div>
            <div className="gi-h-[50px] gi-w-[100px] gi-bg-gray-200"></div>
            <div className="gi-h-[50px] gi-w-[100px] gi-bg-gray-200"></div>
            <div className="gi-h-[50px] gi-w-[100px] gi-bg-gray-200"></div>
            <div className="gi-h-[50px] gi-w-[100px] gi-bg-gray-200"></div>
            <div className="gi-h-[50px] gi-w-[100px] gi-bg-gray-200"></div>
            <div className="gi-h-[50px] gi-w-[100px] gi-bg-gray-200"></div>
          </Stack>
        </Stack>
      </Stack>
    );
  },
};

export const TestItemsRenderCorrectly: Story = {
  tags: ['skip-playwright', 'testsOnly'],
  args: {
    direction: 'column',
    itemsAlignment: 'center',
    itemsDistribution: 'end',
    gap: 1,
    children,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('should Stack items render correctly', async () => {
      const item0 = canvas.getByTestId('govie-stack-item-0');
      const item1 = canvas.getByTestId('govie-stack-item-1');
      const item2 = canvas.getByTestId('govie-stack-item-2');
      expect(item0).toBeInTheDocument();
      expect(item1).toBeInTheDocument();
      expect(item2).toBeInTheDocument();
    });
  },
};

export const TestItemsRenderWithBreakpoints: Story = {
  tags: ['skip-playwright', 'testsOnly'],
  args: {
    direction: { base: 'column', md: 'row' },
    gap: { sm: 2, xs: 1, md: 3 },
    itemsAlignment: 'start',
    itemsDistribution: 'start',
    children,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      'should Stack items render correctly with breakpoint configuration',
      async () => {
        const item0 = canvas.getByTestId('govie-stack-item-0');
        const item1 = canvas.getByTestId('govie-stack-item-1');
        const item2 = canvas.getByTestId('govie-stack-item-2');
        expect(item0).toBeInTheDocument();
        expect(item1).toBeInTheDocument();
        expect(item2).toBeInTheDocument();
      },
    );
  },
};
