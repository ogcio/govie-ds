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
  render: () => {
    const stack1 = document.createElement('div');
    stack1.className =
      'gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-col gi-gap-5 gi-flex-nowrap';
    stack1.setAttribute('role', 'region');
    stack1.setAttribute('aria-label', 'stack1');
    stack1.style.height = '100%';

    const stack2 = document.createElement('div');
    stack2.className =
      'gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-row gi-flex-nowrap';
    stack2.setAttribute('role', 'region');
    stack2.setAttribute('aria-label', 'stack2');
    stack2.dataset.testid = 'govie-stack-item-0';
    stack2.style.height = '100%';

    const item2 = document.createElement('div');
    item2.className = 'gi-h-[80px] gi-w-full gi-bg-gray-200';
    item2.dataset.testid = 'govie-stack-item-0';

    stack2.append(item2);
    stack1.append(stack2);

    const stack3 = document.createElement('div');
    stack3.className =
      'gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-row gi-gap-5 gi-flex-nowrap';
    stack3.setAttribute('role', 'region');
    stack3.setAttribute('aria-label', 'stack3');
    stack3.dataset.testid = 'govie-stack-item-1';
    stack3.style.height = '100%';

    const stack31 = document.createElement('div');
    stack31.className =
      'gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-col gi-gap-5 gi-flex-nowrap';
    stack31.setAttribute('role', 'region');
    stack31.setAttribute('aria-label', 'stack31');
    stack31.dataset.testid = 'govie-stack-item-0';
    stack31.style.height = '100%';

    const item31 = document.createElement('div');
    item31.className = 'gi-h-[200px] gi-w-full gi-bg-gray-200';
    item31.dataset.testid = 'govie-stack-item-0';

    stack31.append(item31);
    stack3.append(stack31);

    const stack32 = document.createElement('div');
    stack32.className =
      'gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-row gi-gap-5 gi-flex-wrap';
    stack32.setAttribute('role', 'region');
    stack32.setAttribute('aria-label', 'stack32');
    stack32.dataset.testid = 'govie-stack-item-1';
    stack32.style.height = '100%';

    for (let index = 0; index < 9; index++) {
      const box = document.createElement('div');
      box.className = 'gi-h-[50px] gi-w-[100px] gi-bg-gray-200';
      box.dataset.testid = `govie-stack-item-${index}`;
      stack32.append(box);
    }

    stack3.append(stack32);
    stack1.append(stack3);

    return parse(stack1.outerHTML) as React.ReactElement;
  },
};
