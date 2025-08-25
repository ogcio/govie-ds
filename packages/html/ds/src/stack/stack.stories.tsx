import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { createButton } from '../helpers/buttons';
import { createLink } from '../helpers/links';
import { createStack } from '../helpers/stack';
import { StackProps } from './types';

const meta: Meta<StackProps> = {
  title: 'layout/Stack',
};

export default meta;
type Story = StoryObj<StackProps>;

const createElement = (
  arguments_: StackProps,
  items: (string | HTMLElement)[],
) => {
  const component = createStack(arguments_, items);

  return parse(component.outerHTML) as React.ReactElement;
};

const children = [
  '<div class="gi-bg-gray-300 gi-p-2 gi-h-[50px] gi-w-[100px] gi-flex gi-items-center gi-justify-center">Item 1</div>',
  '<div class="gi-bg-gray-300 gi-p-2 gi-h-[50px] gi-w-[100px] gi-flex gi-items-center gi-justify-center">Item 2</div>',
  '<div class="gi-bg-gray-300 gi-p-2 gi-h-[50px] gi-w-[100px] gi-flex gi-items-center gi-justify-center">Item 3</div>',
];
const children2 = [
  '<div>Item 1</div>',
  '<div>Item 2</div>',
  '<div>Item 3</div>',
];

const children3 = [
  createButton({ content: 'Button 1' }),
  createLink({ href: '#', content: 'Link 1' }),
  createButton({ content: 'Button 2' }),
];

export const Default: Story = {
  args: {
    direction: 'column',
    itemsAlignment: 'start',
    itemsDistribution: 'start',
    gap: 2,
    hasDivider: false,
    wrap: false,
    fixedHeight: '300px',
  },
  render: (arguments_) => createElement(arguments_, children),
};

export const WithDefaultProps: Story = {
  args: {},
  render: (arguments_) => createElement(arguments_, children2),
};

export const ResponsiveDirectionWithDivider: Story = {
  args: {
    direction: { sm: 'row', md: 'column' },
    itemsAlignment: 'center',
    itemsDistribution: 'between',
    gap: 1,
    hasDivider: true,
    fixedHeight: '150px',
  },
  render: (arguments_) => createElement(arguments_, children2),
};

export const CenteredItemsWithGap: Story = {
  args: {
    direction: 'column',
    itemsAlignment: 'center',
    itemsDistribution: 'center',
    gap: { sm: 4, md: 6 },
    hasDivider: false,
  },
  render: (arguments_) => createElement(arguments_, children2),
};

export const AroundDistributionWithDivider: Story = {
  args: {
    direction: { sm: 'column', lg: 'row' },
    itemsAlignment: 'center',
    itemsDistribution: 'around',
    gap: { sm: 1, lg: 5 },
    hasDivider: true,
    fixedHeight: '100px',
  },
  render: (arguments_) => createElement(arguments_, children2),
};

export const CenterDistribution: Story = {
  args: {
    direction: { sm: 'row', md: 'column' },
    itemsAlignment: 'start',
    itemsDistribution: 'center',
    gap: 4,
  },
  render: (arguments_) => createElement(arguments_, children2),
};

export const WithComponents: Story = {
  args: {
    direction: { sm: 'row', md: 'column' },
    itemsAlignment: 'center',
    itemsDistribution: 'around',
    gap: 4,
    fixedHeight: '300px',
  },
  render: (arguments_) => createElement(arguments_, children3),
};

export const NestedStack: Story = {
  render: () =>
    `
    <div class="gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-col gi-gap-5 gi-flex-nowrap" role="region" aria-label="stack1" style="height: 100%;">
    <div class="gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-row gi-flex-nowrap" role="region" aria-label="stack2" data-testid="govie-stack-item-0" style="height: 100%;">
        <div class="gi-h-[80px] gi-w-full gi-bg-gray-200" data-testid="govie-stack-item-0"></div>
    </div>
    <div class="gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-row gi-gap-5 gi-flex-nowrap" role="region" aria-label="stack3" data-testid="govie-stack-item-1" style="height: 100%;">
        <div class="gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-col gi-gap-5 gi-flex-nowrap" role="region" aria-label="stack31" data-testid="govie-stack-item-0" style="height: 100%;">
          <div class="gi-h-[200px] gi-w-full gi-bg-gray-200" data-testid="govie-stack-item-0"></div>
        </div>
        <div class="gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-row gi-gap-5 gi-flex-wrap" role="region" aria-label="stack32" data-testid="govie-stack-item-1" style="height: 100%;">
          <div class="gi-h-[50px] gi-w-[100px] gi-bg-gray-200" data-testid="govie-stack-item-0"></div>
          <div class="gi-h-[50px] gi-w-[100px] gi-bg-gray-200" data-testid="govie-stack-item-1"></div>
          <div class="gi-h-[50px] gi-w-[100px] gi-bg-gray-200" data-testid="govie-stack-item-2"></div>
          <div class="gi-h-[50px] gi-w-[100px] gi-bg-gray-200" data-testid="govie-stack-item-3"></div>
          <div class="gi-h-[50px] gi-w-[100px] gi-bg-gray-200" data-testid="govie-stack-item-4"></div>
          <div class="gi-h-[50px] gi-w-[100px] gi-bg-gray-200" data-testid="govie-stack-item-5"></div>
          <div class="gi-h-[50px] gi-w-[100px] gi-bg-gray-200" data-testid="govie-stack-item-6"></div>
          <div class="gi-h-[50px] gi-w-[100px] gi-bg-gray-200" data-testid="govie-stack-item-7"></div>
          <div class="gi-h-[50px] gi-w-[100px] gi-bg-gray-200" data-testid="govie-stack-item-8"></div>
        </div>
    </div>
  </div>
  ` as unknown as React.ReactElement,
};
