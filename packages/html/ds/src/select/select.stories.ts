import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createSelect } from '../helpers/forms';
import { beautifyHtmlNode } from '../storybook/storybook';
import { SelectProps } from './types';

const meta: Meta<SelectProps> = {
  title: 'Form/Select',
  parameters: {
    docs: {
      description: {
        component:
          'A composable select component allows users to choose an option from a long list.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<SelectProps>;

const createElement = (arguments_: SelectProps) => {
  const component = createSelect(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  args: {
    id: 'unique-id',
    label: {
      content: 'Label',
      htmlFor: 'unique-id',
    },
    items: [
      {
        label: 'Select Option',
        hidden: true,
        selected: true,
        value: '',
      },
      {
        label: 'Option 1',
        value: 'value-1',
      },
      {
        label: 'Option 2',
        value: 'value-2',
      },
      {
        label: 'Option 3',
        value: 'value-3',
      },
    ],
  },
  render: (arguments_) => createElement(arguments_),
};

export const Focus = {
  args: {
    label: {
      content: 'Label',
    },
    className: 'focus-select',
    items: [
      {
        label: 'Option 1',
        value: 'value-1',
      },
      {
        label: 'Option 2',
        value: 'value-2',
      },
      {
        label: 'Option 3',
        value: 'value-3',
      },
    ],
  },
  parameters: {
    pseudo: {
      focus: '.focus-select',
    },
  },
  render: (arguments_) => createElement(arguments_),
};

export const withLabelHintAndError: Story = {
  args: {
    id: 'unique-id',
    dataTestid: 'unique-id',
    label: {
      content: 'Default Select',
      htmlFor: 'unique-id',
    },
    hint: {
      content: 'This can be different to where you went before',
    },
    error: {
      content: 'Error message',
    },
    items: [
      {
        label: 'Select Option',
        hidden: true,
        selected: true,
        value: '',
      },
      {
        label: 'Option 1',
        value: 'value-1',
      },
      {
        label: 'Option 2',
        value: 'value-2',
      },
      {
        label: 'Option 3',
        value: 'value-3',
      },
    ],
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const select = canvas.getByTestId('unique-id') as HTMLSelectElement;
    expect(globalThis.window.getComputedStyle(select).borderColor).toBe(
      'rgb(187, 37, 13)',
    );

    const label = canvas.getByText('Default Select');
    expect(label).toBeTruthy();
    expect(label).toHaveClass('gi-label');
    expect(label.getAttribute('for')).toBe(select.getAttribute('id'));

    const hint = canvas.getByText(
      'This can be different to where you went before',
    );
    expect(hint).toBeTruthy();
    expect(hint).toHaveClass('gi-hint-text');

    const error = canvas.getByText('Error message');
    expect(error).toBeTruthy();
    expect(error).toHaveClass('gi-error-text');

    const placeholderOption = select.options[0];
    expect(placeholderOption.hidden).toBe(true);
    expect(placeholderOption.selected).toBe(true);
  },
};

export const WithoutLabel = {
  args: {
    items: [
      {
        label: 'Option 1',
        value: 'value-1',
      },
      {
        label: 'Option 2',
        value: 'value-2',
      },
      {
        label: 'Option 3',
        value: 'value-3',
      },
    ],
  },
  render: (arguments_) => createElement(arguments_),
};

export const DisabledSelect = {
  args: {
    disabled: true,
    label: {
      content: 'Label',
    },
    items: [
      {
        label: 'Option 1',
        value: 'value-1',
      },
      {
        label: 'Option 2',
        value: 'value-2',
      },
      {
        label: 'Option 3',
        value: 'value-3',
      },
    ],
  },
  render: (arguments_) => createElement(arguments_),
};

export const DisabledItem = {
  args: {
    label: {
      content: 'Label',
    },
    items: [
      {
        label: 'Option 1',
        value: 'value-1',
      },
      {
        label: 'Option 2',
        value: 'value-2',
        disabled: true,
      },
      {
        label: 'Option 3',
        value: 'value-3',
      },
    ],
  },
  render: (arguments_) => createElement(arguments_),
};

export const withGroups: Story = {
  args: {
    id: 'unique-id',
    label: {
      content: 'Default Select',
      htmlFor: 'unique-id',
    },
    items: [
      {
        label: 'Group 1',
        items: [
          {
            label: 'Select Option',
            hidden: true,
            selected: true,
            value: '',
          },
          {
            label: 'Option 1',
            value: 'value-1',
          },
          {
            label: 'Option 2',
            value: 'value-2',
          },
          {
            label: 'Option 3',
            value: 'value-3',
          },
        ],
      },
      {
        label: 'Group 2',
        items: [
          {
            label: 'Select Option',
            hidden: true,
            selected: true,
            value: '',
          },
          {
            label: 'Option 4',
            value: 'value-4',
          },
          {
            label: 'Option 5',
            value: 'value-5',
          },
          {
            label: 'Option 6',
            value: 'value-6',
          },
        ],
      },
    ],
  },
  render: (arguments_) => createElement(arguments_),
};
