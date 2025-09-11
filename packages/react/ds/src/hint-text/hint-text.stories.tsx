import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Icon } from '../icon/icon.js';
import { Link } from '../link/link.js';
import { HintSize, HintText } from './hint-text.js';

const meta = {
  title: 'Typography/HintText',
  parameters: {
    docs: {
      description: {
        component:
          'Use hint text alongside a form input for help that’s relevant to the majority of users, like how their information will be used, or where to find it.',
      },
    },
  },
  component: HintText,
} satisfies Meta<typeof HintText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(HintSize),
      table: {
        category: 'Appearance',
        type: { summary: 'Size of label' },
        defaultValue: { summary: HintSize.Medium },
      },
    },
    text: {
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'text of hint' },
        defaultValue: { summary: 'Hint' },
      },
    },
  },
  args: {
    text: 'Hint',
    size: HintSize.Medium,
  },
};

export const Small: Story = {
  args: {
    size: HintSize.Small,
    text: 'This is hint text',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hint = canvas.getByText('This is hint text');
    expect(hint).toHaveClass('gi-hint-text-sm');
  },
};

export const Medium: Story = {
  args: {
    size: HintSize.Medium,
    text: 'This is hint text',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hint = canvas.getByText('This is hint text');
    expect(hint).toHaveClass('gi-hint-text-md');
  },
};
export const Large: Story = {
  args: {
    size: HintSize.Large,
    text: 'This is hint text',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hint = canvas.getByText('This is hint text');
    expect(hint).toHaveClass('gi-hint-text-lg');
  },
};

export const WithRichText: Story = {
  args: {
    size: HintSize.Medium,
    children: (
      <div className="gi-flex">
        Here is a rich hint &nbsp;<Link href="#">Click here </Link>
        <Icon icon="arrow_drop_up" />
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hint = canvas.getByText('Here is a rich hint');
    expect(hint).toHaveClass('gi-flex');
  },
};
