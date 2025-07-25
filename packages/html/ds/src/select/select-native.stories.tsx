import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { expect, within } from 'storybook/test';
import { createSelect } from '../helpers/forms';
import { SelectProps } from './types';

const meta: Meta<SelectProps> = {
  title: 'Form/Select/SelectNative',
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

  return parse(component.outerHTML) as React.ReactElement;
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
  render: createElement,
};

export const Focus = {
  args: {
    id: 'unique-id',
    label: {
      content: 'Label',
      htmlFor: 'unique-id',
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
  render: createElement,
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
  render: createElement,
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

export const DisabledSelect = {
  args: {
    id: 'unique-id',
    disabled: true,
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
  render: createElement,
};

export const DisabledItem = {
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
        disabled: true,
      },
      {
        label: 'Option 3',
        value: 'value-3',
      },
    ],
  },
  render: createElement,
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
  render: createElement,
};
