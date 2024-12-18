import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button.js';
import { Tooltip } from './tooltip.js';

const meta = {
  title: 'Application/Tooltip',
  component: Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          'The Tooltip component displays a text when the user hovers over the wrapped element. The `text` prop defines the text, and the `position` prop specifies the tooltip position (`top`, `bottom`, `left`, or `right`).',
      },
    },
  },
  argTypes: {
    text: {
      description: 'The text displayed in the tooltip.',
      control: 'text',
      table: {
        category: 'Props',
        type: { summary: 'string' },
      },
    },
    position: {
      description: 'Position of the tooltip relative to the child element.',
      control: 'radio',
      options: ['top', 'bottom', 'left', 'right'],
      table: {
        category: 'Props',
        type: { summary: "'top' | 'bottom' | 'left' | 'right'" },
      },
    },
    children: {
      description: 'The child element that triggers the tooltip on hover.',
      control: false,
      table: {
        category: 'Props',
        type: { summary: 'ReactNode' },
      },
    },
  },
  decorators: (Story) => (
    <div className="gi-flex gi-justify-center gi-py-5 gi-px-5">
      <Story />
    </div>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Default Tooltip',
    position: 'top',
    children: <Button variant="primary">Hover me (Top)</Button>,
  },
};

export const TopPosition: Story = {
  args: {
    text: 'This is a tooltip at the top.',
    position: 'top',
    children: <Button variant="primary">Hover me (Top)</Button>,
  },
};

export const BottomPosition: Story = {
  args: {
    text: 'This is a tooltip at the bottom.',
    position: 'bottom',
    children: <Button variant="primary">Hover me (Bottom)</Button>,
  },
};

export const LeftPosition: Story = {
  args: {
    text: 'This is a tooltip on the left.',
    position: 'left',
    children: <Button variant="primary">Hover me (Left)</Button>,
  },
};

export const RightPosition: Story = {
  args: {
    text: 'This is a tooltip on the right.',
    position: 'right',
    children: <Button variant="primary">Hover me (Right)</Button>,
  },
};

export const WithLongText: Story = {
  args: {
    text: 'This is a very long tooltip text that tests the tooltip display.',
    position: 'top',
    children: <Button variant="primary">Hover me (Top)</Button>,
  },
};
