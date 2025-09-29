import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { within } from 'storybook/test';
import { createScoreSelect } from './helper';
import { ScoreSelectProps } from './types';

const meta: Meta<ScoreSelectProps> = {
  title: 'Components/ScoreSelect',
  parameters: {
    docs: {
      description: {
        component:
          'ScoreSelect behaves like a Likert scale using buttons. Includes optional responsive bottom labels for the range ends.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ScoreSelectProps>;

const createElement = (arguments_: ScoreSelectProps) => {
  const component = createScoreSelect(arguments_);

  return parse(component.outerHTML) as React.ReactElement;
};

export const OpinionScale5: Story = {
  name: 'Opinion Scale (1–5)',
  args: {
    name: 'opinion-5',
    size: 'large',
    label: 'How strongly do you agree with this statement?',
    type: '1-5',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (let index = 1; index <= 5; index++) {
      await canvas.findByRole('radio', { name: `${index}` });
    }
  },
};

export const OpinionScale7: Story = {
  name: 'Opinion Scale (1–7)',
  args: {
    name: 'opinion-7',
    size: 'large',
    label: 'How satisfied are you with your experience?',
    type: '1-7',
    leftLabel: 'Very Dissatisfied',
    rightLabel: 'Very Satisfied',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (let index = 1; index <= 7; index++) {
      await canvas.findByRole('radio', { name: `${index}` });
    }
    await canvas.findAllByText(/Very Dissatisfied/);
    await canvas.findAllByText(/Very Satisfied/);
  },
};

export const NPS: Story = {
  name: 'Net Promoter Score (0–10)',
  args: {
    name: 'nps',
    size: 'large',
    label:
      'How likely are you to recommend our service to a friend or colleague?',
    hint: 'Description',
    value: '5',
    type: '0-10',
    leftLabel: 'Not Likely',
    rightLabel: 'Extremely Likely',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (let index = 0; index <= 10; index++) {
      await canvas.findByRole('radio', { name: `${index}` });
    }
    await canvas.findAllByText(/Not Likely/);
    await canvas.findAllByText(/Extremely Likely/);
  },
};

export const Vertical: Story = {
  args: {
    label:
      'How likely are you to recommend our service to a friend or colleague?',
    hint: 'Description',
    size: 'large',
    type: '0-10',
    value: '5',
    leftLabel: '0 - Not Likely',
    rightLabel: '10 - Extremely Likely',
    orientation: 'vertical',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const buttons = await canvas.findAllByRole('radio');
    expect(buttons).toHaveLength(11);

    await canvas.findByText('0 - Not Likely');
    await canvas.findByText('10 - Extremely Likely');

    const group = buttons[0].closest('div');
    expect(group).toHaveClass('gi-flex-col');
    expect(group).toHaveClass('gi-items-start');

    const fiveButton = await canvas.findByRole('radio', { name: '5' });
    expect(fiveButton).toHaveAttribute('aria-checked', 'true');
  },
};
