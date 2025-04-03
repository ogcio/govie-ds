import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createFormField } from '../helpers/forms';
import { beautifyHtmlNode } from '../storybook/storybook';
import { SelectProps } from './types';

const meta: Meta<SelectProps> = {
  title: 'Form/Select',
};

export default meta;
type Story = StoryObj<SelectProps>;

const createSelect = (arguments_: SelectProps) => {
  const formField = createFormField(arguments_);

  const select = document.createElement('select');
  select.className = 'gi-select';
  select.id = arguments_.id;
  if (arguments_.dataTestid) {
    select.dataset.testid = arguments_.dataTestid;
  }

  for (const item of arguments_.items) {
    if ('items' in item) {
      const optgroup = document.createElement('optgroup');
      optgroup.role = 'group';
      if (item.label) {
        optgroup.label = item.label;
      }
      for (const subitem of item.items) {
        const option = document.createElement('option');
        option.className = 'gi-select-option';
        if (subitem.label) {
          option.label = subitem.label;
        }
        if (subitem.value) {
          option.value = `${subitem.value}`;
        }
        optgroup.append(option);
      }
      select.append(optgroup);
    } else {
      const option = document.createElement('option');
      option.className = 'gi-select-option';
      if (item.label) {
        option.label = item.label;
      }
      if (item.value) {
        option.value = `${item.value}`;
      }
      select.append(option);
    }
  }

  formField.append(select);

  return formField;
};

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

    const textInput = canvas.getByTestId('unique-id') as HTMLSelectElement;
    expect(globalThis.window.getComputedStyle(textInput).borderColor).toBe(
      'rgb(187, 37, 13)',
    );

    const label = canvas.getByText('Default Select');
    expect(label).toBeTruthy();
    expect(label).toHaveClass('gi-label');
    expect(label.getAttribute('for')).toBe(textInput.getAttribute('id'));

    const hint = canvas.getByText(
      'This can be different to where you went before',
    );
    expect(hint).toBeTruthy();
    expect(hint).toHaveClass('gi-hint-text');

    const error = canvas.getByText('Error message');
    expect(error).toBeTruthy();
    expect(error).toHaveClass('gi-error-text');
  },
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
