import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { createButton } from '../../helpers/buttons';
import { beautifyHtmlNode } from '../../storybook/storybook';
import { ButtonSize } from '../types';

type ButtonOption = {
  label: string;
  value: string;
};

type ButtonGroupProps = {
  size?: ButtonSize;
  onChange?: (value: string) => void;
  defaultValue?: string;
  options?: ButtonOption[];
  label?: string;
  hint?: string;
};

const meta: Meta<ButtonGroupProps> = {
  title: 'Form/Button/ButtonGroup',
  parameters: {
    docs: {
      description: {
        component:
          'ButtonGroup component that behaves like a radio group using buttons. Useful for questionnaire-style inputs.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonGroupProps>;

const createButtonGroup = ({
  size = 'large',
  defaultValue,
  options = [],
  label,
  hint,
}: ButtonGroupProps): HTMLElement => {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'gi-w-full';

  const fieldWrapper = document.createElement('div');
  fieldWrapper.className = 'gi-pb-3 gi-flex gi-flex-col gi-gap-1';

  if (label || hint) {
    const labelWrapper = document.createElement('div');

    if (label) {
      const labelElement = document.createElement('label');
      labelElement.className = 'gi-text-md gi-label gi-font-bold';
      labelElement.textContent = label;
      labelWrapper.append(labelElement);
    }

    if (hint) {
      const hintElement = document.createElement('div');
      hintElement.className = 'gi-hint-text-md gi-hint-text gi-mb-1';
      hintElement.textContent = hint;
      labelWrapper.append(hintElement);
    }

    fieldset.append(labelWrapper);
  }

  const group = document.createElement('div');
  group.className = 'gi-btn-group';

  for (const [index, { label, value }] of options.entries()) {
    const button = createButton({
      content: label,
      appearance: 'dark',
      size,
      variant: value === defaultValue ? 'primary' : 'secondary',
    });
    button.setAttribute('name', label);
    button.setAttribute('id', `gi-btn-group-${index}`);
    group.append(button);
  }

  fieldset.append(fieldWrapper);
  fieldset.append(group);

  return fieldset;
};

const createElement = (arguments_: ButtonGroupProps): string => {
  const component = createButtonGroup(arguments_);
  return beautifyHtmlNode(component);
};
export const Default: Story = {
  name: 'Likert Scale',
  argTypes: {
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size of the buttons',
      type: { name: 'string' },
    },
    defaultValue: {
      control: 'text',
      description: 'The default selected value',
      type: { name: 'string' },
    },
    options: {
      control: 'object',
      description:
        'Array of button options with { label, value } used for rendering ButtonGroupItem components',
    },
    label: {
      control: 'text',
      description: 'Label displayed above the button group',
      type: { name: 'string' },
    },
    hint: {
      control: 'text',
      description: 'Hint text displayed below the label',
      type: { name: 'string' },
    },
  },
  args: {
    size: 'large',
    defaultValue: '6',
    label:
      'How likely are you to recommend our service to a friend or colleague?',
    hint: '1 = Not likely, 10 = Extremely likely',
    options: Array.from({ length: 10 }, (_, index) => ({
      label: `${index + 1}`,
      value: `${index + 1}`,
    })),
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Ensure all 10 buttons are present
    for (let index = 1; index <= 10; index++) {
      await canvas.findByRole('button', { name: `${index}` });
    }

    const button3 = await canvas.findByRole('button', { name: '3' });
    await userEvent.click(button3);

    const button8 = await canvas.findByRole('button', { name: '8' });
    await userEvent.click(button8);

    const button6 = await canvas.findByRole('button', { name: '6' });
    await userEvent.click(button6);

    await canvas.findByText(/How likely are you/i);
    await canvas.findByText(/Not likely/i);
  },
};

export const YesNo: Story = {
  name: 'Yes/No Question',
  args: {
    size: 'large',
    defaultValue: 'no',
    label: 'Are you currently a customer?',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'No', value: 'no' },
    ],
  },
  render: (arguments_) => createElement(arguments_),
};
