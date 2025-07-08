import type { Meta, StoryObj } from '@storybook/react';
import { createButton } from '../helpers/buttons';
import { createPopover } from '../helpers/popover';
import { createSelectMenu } from '../helpers/select-menu';
import { beautifyHtmlNode } from '../storybook/storybook';
import { PopoverProps } from './types';

const meta: Meta<PopoverProps> = {
  title: 'Application/Popover',
  parameters: {
    docs: {
      description: {
        component:
          'Popover is a floating panel that appears next to a reference element. It is positioned using Popper.js and supports external triggers.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<PopoverProps>;

const createElement = (arguments_: PopoverProps) =>
  beautifyHtmlNode(createPopover(arguments_));

export const Default: Story = {
  args: {
    id: 'popover',
    triggerElement: beautifyHtmlNode(createButton({ content: 'Open Popover' })),
    content: `<div class="gi-text-sm gi-text-gray-800 gi-p-4">
                This is a popover content
              </div>`,
  },
  render: (arguments_: any) =>
    `<div class="gi-h-20">
        ${createElement(arguments_)}
     </div>`,
};

export const WithSelectMenu: Story = {
  args: {
    id: 'popover',
    triggerElement: beautifyHtmlNode(createButton({ content: 'Open Popover' })),
    content: beautifyHtmlNode(
      createSelectMenu({
        id: 'select-menu',
        enableSearch: true,
        items: [
          { label: 'Option 1', value: '1' },
          { label: 'Option 2', value: '2' },
          { label: 'Option 3', value: '3' },
          { label: 'Option 4', value: '4' },
        ],
      }),
    ),
  },
  render: (arguments_: any) =>
    `<div class="gi-h-20">
        ${createElement(arguments_)}
     </div>`,
};
