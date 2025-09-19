import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from 'storybook/test';
import { ButtonSize } from '../button/types.js';
import { ScoreSelect } from './score-select.js';

const meta = {
  title: 'Components/ScoreSelect',
  component: ScoreSelect,
  parameters: {
    docs: {
      description: {
        component:
          'ScoreSelect is a Likert-style button group with optional bottom labels for start, middle, and end. Great for opinion or feedback questions.',
      },
    },
  },
  argTypes: {
    name: { control: 'text', type: { name: 'string', required: true } },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'] as ButtonSize[],
    },
    label: { control: 'text' },
    hint: { control: 'text' },
    leftLabel: { control: 'text' },
    rightLabel: { control: 'text' },
    type: {
      control: 'select',
      options: ['1-5', '1-7', '0-10'],
    },
    onChange: { action: 'selected' },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction of the score buttons.',
    },
  },
} satisfies Meta<typeof ScoreSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpinionScale5: Story = {
  name: 'Opinion Scale (1-5)',
  args: {
    name: 'opinion-scale-5',
    label: 'How strongly do you agree with this statement?',
    size: 'large',
    type: '1-5',
    onChange(value) {
      console.log('Selected value:', value);
    },
  },
};

export const OpinionScale7: Story = {
  name: 'Opinion Scale (1–7)',
  args: {
    name: 'opinion-scale-7',
    label: 'How satisfied are you with your experience?',
    size: 'large',
    type: '1-7',
    leftLabel: 'Very Dissatisfied',
    rightLabel: 'Very Satisfied',
    onChange(value) {
      console.log('Selected value:', value);
    },
  },
};

export const NPS: Story = {
  name: 'Net Promoter Score (0–10)',
  args: {
    name: 'nps',
    label:
      'How likely are you to recommend our service to a friend or colleague?',
    hint: 'Description',
    size: 'large',
    type: '0-10',
    value: '5',
    leftLabel: 'Not Likely',
    rightLabel: 'Extremely Likely',
    onChange(value) {
      console.log('Selected value:', value);
    },
  },
};

export const Vertical: Story = {
  args: {
    name: 'nps',
    label:
      'How likely are you to recommend our service to a friend or colleague?',
    hint: 'Description',
    size: 'large',
    type: '0-10',
    value: '5',
    leftLabel: 'Not Likely',
    rightLabel: 'Extremely Likely',
    orientation: 'vertical',
    onChange() {
      return null;
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const buttons = await canvas.findAllByRole('radio');
    expect(buttons).toHaveLength(11);

    await canvas.findByText('Not Likely');
    await canvas.findByText('Extremely Likely');

    const group = buttons[0].closest('div');
    expect(group).toHaveClass('gi-flex-col');
    expect(group).toHaveClass('gi-items-start');

    const fiveButton = await canvas.findByRole('radio', { name: '5' });
    expect(fiveButton).toHaveAttribute('aria-checked', 'true');
  },
};
