import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { createSelectNext } from '../helpers/forms';
import { SelectProps } from './types';

const meta: Meta<SelectProps> = {
  title: 'Form/Select/SelectNext',
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
  const component = createSelectNext(arguments_);
  return <div className="gi-w-56">{parse(component.outerHTML)}</div>;
};

export const Default: Story = {
  args: {
    id: 'default-id',
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
  render: (arguments_) => {
    return createElement(arguments_);
  },
};

export const Focus = {
  args: {
    id: 'select-focus-id',
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
  render: createElement,
};

export const WithLabelHintAndError: Story = {
  args: {
    id: 'with-error-id',
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
};

export const WithoutLabel = {
  args: {
    id: 'without-label-id',
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

export const DisabledSelect = {
  args: {
    id: 'disabled-select-id',
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
  render: createElement,
};

export const DisabledItem = {
  args: {
    id: 'disabled-item-id',
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
  render: createElement,
};

export const WithSearchEnabled = {
  args: {
    id: 'without-label-id',
    enableSearch: true,
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

export const WithGroups: Story = {
  args: {
    id: 'with-groups-id',
    label: {
      content: 'Default Select',
      htmlFor: 'with-groups-id',
    },
    enableSearch: true,
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
