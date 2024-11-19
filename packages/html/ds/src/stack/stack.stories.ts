import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './stack.html?raw';
import { StackProps } from './stack.schema';

// Name of the folder the macro resides
const path = import.meta.url.split('/stack')[0];

const macro = { name: 'govieStack', html, path };

const Stack = renderComponent<StackProps>(macro);

const meta = {
  component: Stack,
  title: 'layout/Stack',
  parameters: {
    macro,
    docs: {
      description: {
        component:
          'The Stack component arranges children in rows or columns with responsive gaps, alignment, and optional dividers.',
      },
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const children = [
  '<div class="gi-bg-gray-300 gi-p-2 gi-h-[50px] gi-w-[100px] gi-flex gi-items-center gi-justify-center">Item 1</div>',
  '<div class="gi-bg-gray-300 gi-p-2 gi-h-[50px] gi-w-[100px] gi-flex gi-items-center gi-justify-center">Item 2</div>',
  '<div class="gi-bg-gray-300 gi-p-2 gi-h-[50px] gi-w-[100px] gi-flex gi-items-center gi-justify-center">Item 3</div>',
];

export const Default: Story = {
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
  args: {
    direction: 'column',
    itemsAlignment: 'start',
    itemsDistribution: 'start',
    gap: 2,
    hasDivider: false,
    wrap: false,
    fixedHeight: '300px',
    children,
  },
};

export const ResponsiveDirectionWithDivider: Story = {
  args: {
    direction: { sm: 'row', md: 'column' },
    itemsAlignment: 'center',
    itemsDistribution: 'between',
    gap: 1,
    hasDivider: true,
    fixedHeight: '150px',
    children: ['Item 1', 'Item 2', 'Item 3'],
  },
};

export const CenteredItemsWithGap: Story = {
  args: {
    direction: 'column',
    itemsAlignment: 'center',
    itemsDistribution: 'center',
    gap: { sm: 4, md: 6 },
    hasDivider: false,
    children: ['Item 1', 'Item 2', 'Item 3'],
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
    children: ['Item 1', 'Item 2', 'Item 3'],
  },
};

export const CenterDistribution: Story = {
  args: {
    direction: { sm: 'row', md: 'column' },
    itemsAlignment: 'start',
    itemsDistribution: 'center',
    gap: 4,
    children: ['Item 1', 'Item 2', 'Item 3'],
  },
};

export const WithComponents: Story = {
  args: {
    children: [],
  },
  //@ts-expect-error Render function returns raw HTML string, not a React component
  render: () =>
    `
    <div class="gi-flex gi-overflow-auto gi-w-full gi-justify-around gi-items-center sm:gi-flex-row md:gi-flex-col gi-gap-4 gi-flex-nowrap" role="region" aria-label="Items Stacked" data-testid="govie-stack" style="height: 300px;">
      <button class="gi-btn gi-btn-primary gi-btn-regular">Button 1</button>
      <a href="#" class="gi-link">Link 1</a>
      <button class="gi-btn gi-btn-primary gi-btn-regular">Button 2</button>
    </div>
    `,
};
