import type { Meta, StoryObj } from '@storybook/react';
import { createChip } from '../helpers/chip';
import { beautifyHtmlNode } from '../storybook/storybook';
import { ChipProps } from './types';

const meta: Meta<ChipProps> = {
  title: 'Components/Chip',
  parameters: {
    docs: {
      description: {
        component:
          'A Chip is a compact UI element that displays information, can be removed via a close button, and is ideal for tags, filters, or selection indicators.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ChipProps>;

const createElement = (arguments_: ChipProps) =>
  beautifyHtmlNode(createChip(arguments_));

export const Default: Story = {
  args: {
    label: 'Label',
  },
  render: (arguments_) => createElement(arguments_),
};

export const Hover: Story = {
  args: {
    label: 'Hover',
    className: 'hover-chip',
  },
  parameters: {
    pseudo: {
      hover: '.hover-chip',
    },
  },
  render: (arguments_) => createElement(arguments_),
};

export const Focus: Story = {
  args: {
    label: 'Focus',
    className: 'focus-chip',
  },
  parameters: {
    pseudo: {
      focus: '.focus-chip',
    },
  },
  render: (arguments_) => createElement(arguments_),
};
