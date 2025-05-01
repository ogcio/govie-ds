import type { Meta, StoryObj } from '@storybook/react';
import { beautifyHtmlNode } from '../storybook/storybook';
import { StackProps } from './types';
import { createButton } from '../helpers/buttons';
import { createLink } from '../helpers/links';

const meta: Meta<StackProps> = {
  title: 'layout/Stack',
};

export default meta;
type Story = StoryObj<StackProps>;

const createStack = (
  arguments_: StackProps,
  items: (string | HTMLElement)[],
) => {
  let directionClasses = '';
  let dividerClasses = '';

  const direction = arguments_.direction || 'column';
  const itemsAlignment = arguments_.itemsAlignment || 'stretch';
  const itemsDistribution = arguments_.itemsDistribution || 'stretch';
  const gap = arguments_.gap || 0;
  const hasDivider = arguments_.hasDivider || false;
  const wrap = arguments_.wrap || false;
  const fixedHeight = arguments_.fixedHeight || '100%';

  if (direction) {
    if (typeof direction === 'string') {
      if (direction == 'row') {
        directionClasses = 'gi-flex-row';
      } else if (direction == 'column') {
        directionClasses = 'gi-flex-col';
      }
    } else {
      if (direction.base == 'row') {
        directionClasses += 'gi-flex-row ';
      } else if (direction.base == 'column') {
        directionClasses += 'gi-flex-col ';
      }
      if (direction.xs == 'row') {
        directionClasses += 'xs:gi-flex-row ';
      } else if (direction.xs == 'column') {
        directionClasses += 'xs:gi-flex-col ';
      }
      if (direction.sm == 'row') {
        directionClasses += 'sm:gi-flex-row ';
      } else if (direction.sm == 'column') {
        directionClasses += 'sm:gi-flex-col ';
      }
      if (direction.md == 'row') {
        directionClasses += 'md:gi-flex-row ';
      } else if (direction.md == 'column') {
        directionClasses += 'md:gi-flex-col ';
      }
      if (direction.lg == 'row') {
        directionClasses += 'lg:gi-flex-row ';
      } else if (direction.lg == 'column') {
        directionClasses += 'lg:gi-flex-col ';
      }
      if (direction.xl == 'row') {
        directionClasses += 'xl:gi-flex-row ';
      } else if (direction.xl == 'column') {
        directionClasses += 'xl:gi-flex-col ';
      }
      if (direction['2xl'] == 'row') {
        directionClasses += '2xl:gi-flex-row ';
      } else if (direction['2xl'] == 'column') {
        directionClasses += '2xl:gi-flex-col ';
      }
    }

    if (typeof direction === 'string') {
      if (direction == 'column') {
        dividerClasses = 'gi-w-full gi-h-[1px]';
      } else if (direction == 'row') {
        dividerClasses = 'gi-h-full gi-w-[1px]';
      }
    } else {
      if (direction.base == 'column') {
        dividerClasses += 'gi-w-full gi-h-[1px] ';
      } else if (direction.base == 'row') {
        dividerClasses += 'gi-h-full gi-w-[1px] ';
      }
      if (direction.xs == 'column') {
        dividerClasses += 'xs:gi-w-full xs:gi-h-[1px] ';
      } else if (direction.xs == 'row') {
        dividerClasses += 'xs:gi-h-full xs:gi-w-[1px] ';
      }
      if (direction.sm == 'column') {
        dividerClasses += 'sm:gi-w-full sm:gi-h-[1px] ';
      } else if (direction.sm == 'row') {
        dividerClasses += 'sm:gi-h-full sm:gi-w-[1px] ';
      }
      if (direction.md == 'column') {
        dividerClasses += 'md:gi-w-full md:gi-h-[1px] ';
      } else if (direction.md == 'row') {
        dividerClasses += 'md:gi-h-full md:gi-w-[1px] ';
      }
      if (direction.lg == 'column') {
        dividerClasses += 'lg:gi-w-full lg:gi-h-[1px] ';
      } else if (direction.lg == 'row') {
        dividerClasses += 'lg:gi-h-full lg:gi-w-[1px] ';
      }
      if (direction.xl == 'column') {
        dividerClasses += 'xl:gi-w-full xl:gi-h-[1px] ';
      } else if (direction.xl == 'row') {
        dividerClasses += 'xl:gi-h-full xl:gi-w-[1px] ';
      }
      if (direction['2xl'] == 'column') {
        dividerClasses += '2xl:gi-w-full 2xl:gi-h-[1px] ';
      } else if (direction['2xl'] == 'row') {
        dividerClasses += '2xl:gi-h-full 2xl:gi-w-[1px] ';
      }
    }
  }

  let itemsGapClasses = '';
  if (typeof gap === 'number') {
    itemsGapClasses = `gi-gap-${gap}`;
  } else if (gap) {
    if (gap.base) {
      itemsGapClasses += `gi-gap-${gap.base} `;
    }
    if (gap.sm) {
      itemsGapClasses += `sm:gi-gap-${gap.sm} `;
    }
    if (gap.md) {
      itemsGapClasses += `md:gi-gap-${gap.md} `;
    }
    if (gap.lg) {
      itemsGapClasses += `lg:gi-gap-${gap.lg} `;
    }
    if (gap.xl) {
      itemsGapClasses += `xl:gi-gap-${gap.xl} `;
    }
    if (gap['2xl']) {
      itemsGapClasses += `2xl:gi-gap-${gap['2xl']} `;
    }
  }

  let alignmentClasses;
  if (itemsAlignment == 'start') {
    alignmentClasses = 'gi-items-start';
  } else if (itemsAlignment == 'center') {
    alignmentClasses = 'gi-items-center';
  } else if (itemsAlignment == 'end') {
    alignmentClasses = 'gi-items-end';
  }

  let distributionClasses;
  if (itemsDistribution == 'start') {
    distributionClasses = 'gi-justify-start';
  } else if (itemsDistribution == 'center') {
    distributionClasses = 'gi-justify-center';
  } else if (itemsDistribution == 'end') {
    distributionClasses = 'gi-justify-end';
  } else if (itemsDistribution == 'between') {
    distributionClasses = 'gi-justify-between';
  } else if (itemsDistribution == 'around') {
    distributionClasses = 'gi-justify-around';
  } else if (itemsDistribution == 'evenly') {
    distributionClasses = 'gi-justify-evenly';
  }

  const wrapClass = wrap ? 'gi-flex-wrap' : 'gi-flex-nowrap';

  const stackClasses = [
    'gi-flex',
    'gi-w-full',
    distributionClasses,
    alignmentClasses,
    directionClasses,
    itemsGapClasses,
    wrapClass,
  ];

  if (arguments_.className) {
    stackClasses.push(arguments_.className);
  }

  const stack = document.createElement('div');
  stack.className = stackClasses.join(' ');
  stack.role = 'region';
  stack.style.height = fixedHeight || '100%';

  for (const item of items) {
    if (typeof item === 'string') {
      stack.innerHTML += item;
    } else {
      stack.append(item);
    }

    if (hasDivider) {
      const divider = document.createElement('div');
      divider.className = `${dividerClasses} gi-bg-gray-400`;
      divider.ariaHidden = 'true';
      stack.append(divider);
    }
  }

  return stack;
};

const createElement = (
  arguments_: StackProps,
  items: (string | HTMLElement)[],
) => {
  const component = createStack(arguments_, items);
  return beautifyHtmlNode(component);
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
  render: () => `
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
  `,
};
