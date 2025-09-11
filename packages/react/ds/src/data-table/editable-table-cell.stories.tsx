import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from 'storybook/test';
import { EditableTableCell } from './editable-table-cell.js';

const meta = {
  title: 'Data Table/EditableTableCell',
  component: EditableTableCell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'EditableCell is a dynamic component for rendering inline editable table cells. It supports text input, select dropdown, and checkbox input modes.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="gi-h-[200px] gi-px-2 gi-flex gi-items-center ">
        <div className="gi-h-10 gi-w-56">
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    value: { control: 'text', description: 'The current value of the cell' },
    rowIndex: { control: 'number', description: 'The row index of the table' },
    columnId: { control: 'text', description: 'The column ID of the table' },
    editor: {
      control: 'object',
      description:
        'Configuration object for the editable cell. It defines the input type ("text", "select", or "checkbox") and the props to pass to the corresponding input component (InputTextTableCellProps, SelectNativeTableCellProps, or InputCheckboxTableCellProps).',
    },
  },
} satisfies Meta<typeof EditableTableCell>;

export default meta;
type Story = StoryObj<typeof meta>;

const setDataMock = () => null;

export const AsText: Story = {
  args: {
    value: 'Editable text',
    rowIndex: 0,
    columnId: 'name',
    setData: setDataMock,
    editor: {
      type: 'text',
      props: {
        placeholder: 'Enter name',
        error: false,
      },
    },
  },
};

export const AsSelect: Story = {
  args: {
    value: 'option2',
    rowIndex: 0,
    columnId: 'status',
    setData: setDataMock,
    editor: {
      type: 'select',
      props: {
        'aria-label': 'Select option',
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ],
        error: false,
      },
    },
  },
};

export const AsCheckbox: Story = {
  args: {
    value: true,
    rowIndex: 0,
    columnId: 'active',
    setData: setDataMock,
    editor: {
      type: 'checkbox',
      props: {
        'aria-label': 'Active status',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  },
};

export const DisabledText: Story = {
  args: {
    value: 'Disabled text',
    rowIndex: 0,
    columnId: 'name',
    setData: setDataMock,
    editor: {
      type: 'text',
      props: {
        placeholder: 'Disabled input',
        disabled: true,
        error: false,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByPlaceholderText('Disabled input');
    expect(input).toBeDisabled();
  },
};

export const ErrorText: Story = {
  args: {
    value: 'Invalid text',
    rowIndex: 0,
    columnId: 'name',
    setData: setDataMock,
    editor: {
      type: 'text',
      props: {
        placeholder: 'Error input',
        error: true,
      },
    },
  },
};

export const DisabledSelect: Story = {
  args: {
    value: 'option1',
    rowIndex: 0,
    columnId: 'status',
    setData: setDataMock,
    editor: {
      type: 'select',
      props: {
        'aria-label': 'Select option',
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ],
        disabled: true,
        error: false,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const select = within(canvasElement).getByDisplayValue('Option 1');
    expect(select).toBeDisabled();
  },
};

export const ErrorSelect: Story = {
  args: {
    value: 'option1',
    rowIndex: 0,
    columnId: 'status',
    setData: setDataMock,
    editor: {
      type: 'select',
      props: {
        'aria-label': 'Select option',
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ],
        error: true,
      },
    },
  },
};

export const DisabledCheckbox: Story = {
  args: {
    value: true,
    rowIndex: 0,
    columnId: 'active',
    setData: setDataMock,
    editor: {
      type: 'checkbox',
      props: {
        'aria-label': 'Active status',
        disabled: true,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole('checkbox');
    expect(checkbox).toBeDisabled();
  },
};

export const ErrorCheckbox: Story = {
  args: {
    value: true,
    rowIndex: 0,
    columnId: 'active',
    setData: setDataMock,
    editor: {
      type: 'checkbox',
      props: {
        'aria-label': 'Active status',
        error: true,
      },
    },
  },
};

export const TestAsText: Story = {
  tags: ['skip-playwright'],
  args: {
    value: 'Editable text',
    rowIndex: 0,
    columnId: 'name',
    setData: setDataMock,
    editor: {
      type: 'text',
      props: {
        placeholder: 'Enter name',
        error: false,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByPlaceholderText('Enter name');
    await userEvent.click(input);
    await userEvent.type(input, ' updated');
    expect(input).toHaveValue('Editable text updated');
  },
};

export const TestAsSelect: Story = {
  tags: ['skip-playwright'],
  args: {
    value: 'option2',
    rowIndex: 0,
    columnId: 'status',
    setData: setDataMock,
    editor: {
      type: 'select',
      props: {
        'aria-label': 'Select option',
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ],
        error: false,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const select = within(canvasElement).getByDisplayValue('Option 2');
    await userEvent.selectOptions(select, 'option1');
    expect(select).toHaveValue('option1');
  },
};
