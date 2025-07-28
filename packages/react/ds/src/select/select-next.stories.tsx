import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
  FormField,
  FormFieldError,
  FormFieldHint,
  FormFieldLabel,
} from '../forms/form-field/form-field.js';
import {
  SelectGroupItemNext,
  SelectItemNext,
  SelectNext,
} from './select-next.js';

const meta = {
  title: 'Form/Select/SelectNext',
  parameters: {
    docs: {
      description: {
        component:
          'A composable select component allows users to choose an option from a long list.',
      },
    },
  },
  argTypes: {
    children: {
      description:
        'SelectItemNext or SelectGroupItemNext elements that define the options.',
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },
    defaultValue: {
      description: 'Initial selected option value.',
      control: 'text',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
      },
    },
    onChange: {
      description: 'Callback when an item is selected.',
      action: 'onChange',
      table: {
        category: 'Events',
        type: { summary: '(event) => void' },
      },
    },
    onMenuClose: {
      description: 'Callback when the dropdown menu closes.',
      action: 'onMenuClose',
      table: {
        category: 'Events',
        type: { summary: '() => void' },
      },
    },
    enableSearch: {
      description: 'Enables a search input for filtering options.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      description: 'Disables the select component.',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
      },
    },
  },
  component: SelectNext,
  decorators: [
    (Story) => (
      <div className="gi-h-[290px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SelectNext>;

export default meta;

export const Default: StoryObj = {
  render: () => {
    return (
      <FormField className="gi-w-56">
        <FormFieldLabel>Label</FormFieldLabel>
        <SelectNext aria-label="Select" defaultValue="select-option">
          <SelectItemNext value="select-option" hidden>
            Select Option
          </SelectItemNext>
          <SelectItemNext value="value-1">Option 1</SelectItemNext>
          <SelectItemNext value="value-2">Option 2</SelectItemNext>
          <SelectItemNext value="value-3">Option 3</SelectItemNext>
        </SelectNext>
      </FormField>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await waitFor(() => {
      expect(input).toHaveValue('Select Option');
    });
    await userEvent.click(input);
    await waitFor(() => {
      expect(canvas.getByRole('list')).toBeInTheDocument();
    });
    const list = await canvas.findByRole('list');
    const options = within(list).getAllByRole('option');
    expect(options.map((opt) => opt.textContent)).toEqual([
      'Option 1',
      'Option 2',
      'Option 3',
    ]);
    await userEvent.click(document.body);
  },
};

export const Focus = {
  render: () => (
    <FormField className="gi-w-56">
      <FormFieldLabel htmlFor="focus-select">Label</FormFieldLabel>
      <SelectNext
        id="focus-select"
        aria-label="Select"
        className="focus-select"
        defaultValue="value-3"
      >
        <SelectItemNext value="select-option" hidden>
          Select Option
        </SelectItemNext>
        <SelectItemNext value="value-1">Option 1</SelectItemNext>
        <SelectItemNext value="value-2">Option 2</SelectItemNext>
        <SelectItemNext value="value-3">Option 3</SelectItemNext>
      </SelectNext>
    </FormField>
  ),
  parameters: {
    pseudo: {
      focus: '.focus-select',
    },
  },
};

export const WithLabelHintAndError = {
  render: () => (
    <FormField className="gi-w-56">
      <FormFieldLabel htmlFor="select">Label</FormFieldLabel>
      <FormFieldHint>This is a hint</FormFieldHint>
      <FormFieldError>This is an error</FormFieldError>
      <SelectNext
        aria-label="Select"
        data-testid="select"
        id="select"
        defaultValue="select-option"
      >
        <SelectItemNext value="select-option" hidden>
          Select Option
        </SelectItemNext>
        <SelectItemNext value="value-1">Option 1</SelectItemNext>
        <SelectItemNext value="value-2">Option 2</SelectItemNext>
        <SelectItemNext value="value-3">Option 3</SelectItemNext>
      </SelectNext>
    </FormField>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('This is a hint')).toBeInTheDocument();
    expect(canvas.getByText('This is an error')).toBeInTheDocument();
  },
};

export const WithoutLabel = {
  render: () => (
    <FormField className="gi-w-56">
      <SelectNext aria-label="Select" defaultValue="select-option">
        <SelectItemNext value="select-option" hidden>
          Select Option
        </SelectItemNext>
        <SelectItemNext value="value-1">Option 1</SelectItemNext>
        <SelectItemNext value="value-2">Option 2</SelectItemNext>
        <SelectItemNext value="value-3">Option 3</SelectItemNext>
      </SelectNext>
    </FormField>
  ),
};

export const DisabledSelect = {
  render: () => (
    <FormField className="gi-w-56">
      <SelectNext aria-label="Select" defaultValue="select-option" disabled>
        <SelectItemNext value="select-option" hidden>
          Select Option
        </SelectItemNext>
        <SelectItemNext value="value-1">Option 1</SelectItemNext>
        <SelectItemNext value="value-2">Option 2</SelectItemNext>
        <SelectItemNext value="value-3">Option 3</SelectItemNext>
      </SelectNext>
    </FormField>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    expect(input).toBeDisabled();
  },
};

export const DisabledItem = {
  render: () => (
    <FormField className="gi-w-56">
      <SelectNext aria-label="Select" defaultValue="select-option">
        <SelectItemNext value="select-option" hidden>
          Select Option
        </SelectItemNext>
        <SelectItemNext disabled value="value-1">
          Option 1
        </SelectItemNext>
        <SelectItemNext value="value-2">Option 2</SelectItemNext>
        <SelectItemNext value="value-3">Option 3</SelectItemNext>
      </SelectNext>
    </FormField>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.click(input);

    const list = await canvas.findByRole('list');
    const options = within(list).getAllByRole('option');

    expect(options).toHaveLength(3);
    expect(options[0]).toHaveAttribute('aria-disabled', 'true');
    expect(options[1]).not.toHaveAttribute('aria-disabled');
    expect(options[2]).not.toHaveAttribute('aria-disabled');
    await userEvent.click(document.body);
  },
};

export const WithSearchEnabled: StoryObj = {
  render: () => (
    <FormField className="gi-w-56">
      <FormFieldLabel>Label</FormFieldLabel>
      <SelectNext aria-label="Select" enableSearch>
        <SelectItemNext value="select-option" hidden>
          Select Option
        </SelectItemNext>
        <SelectItemNext value="value-1">Option 1</SelectItemNext>
        <SelectItemNext value="value-2">Option 2</SelectItemNext>
        <SelectItemNext value="value-3">Option 3</SelectItemNext>
      </SelectNext>
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.click(input);

    const searchBox = canvas.getByPlaceholderText('Type to Search');
    await userEvent.type(searchBox, 'Option 2');

    const list = await canvas.findByRole('list');

    await waitFor(() => {
      const options = within(list).getAllByRole('option');
      expect(options).toHaveLength(1);
      expect(options[0]).toHaveTextContent('Option 2');
    });

    await userEvent.click(document.body);
  },
};

export const WithGroups = {
  render: () => (
    <FormField className="gi-w-56">
      <FormFieldLabel>Label</FormFieldLabel>
      <SelectNext
        aria-label="Select"
        data-testid="select"
        defaultValue="value-1"
      >
        <SelectGroupItemNext label="Group 1" data-testid="select-group">
          <SelectItemNext value="value-1">Option 1</SelectItemNext>
          <SelectItemNext value="value-2">Option 2</SelectItemNext>
          <SelectItemNext value="value-3">Option 3</SelectItemNext>
        </SelectGroupItemNext>
        <SelectGroupItemNext label="Group 2">
          <SelectItemNext value="value-7">Option 7</SelectItemNext>
          <SelectItemNext value="value-8">Option 8</SelectItemNext>
          <SelectItemNext value="value-9">Option 9</SelectItemNext>
        </SelectGroupItemNext>
      </SelectNext>
    </FormField>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.click(input);

    await waitFor(() => {
      expect(canvas.getByRole('list')).toBeInTheDocument();
    });

    expect(canvas.getByText('Group 1')).toBeInTheDocument();
    expect(canvas.getByText('Group 2')).toBeInTheDocument();
    expect(canvas.getByText('Option 1')).toBeInTheDocument();
    expect(canvas.getByText('Option 8')).toBeInTheDocument();
    await userEvent.click(document.body);
  },
};

export const Controlled: StoryObj = {
  render: () => {
    const [value, setValue] = useState('value-2');

    return (
      <FormField className="gi-w-56">
        <FormFieldLabel>Controlled Select</FormFieldLabel>
        <SelectNext
          aria-label="Select"
          id="select-controlled"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        >
          <SelectItemNext value="select-option" hidden>
            Select Option
          </SelectItemNext>
          <SelectItemNext value="value-1">Option 1</SelectItemNext>
          <SelectItemNext value="value-2">Option 2</SelectItemNext>
          <SelectItemNext value="value-3">Option 3</SelectItemNext>
        </SelectNext>
      </FormField>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');

    await waitFor(() => {
      expect(input).toHaveValue('Option 2');
    });

    await userEvent.click(input);

    const list = await canvas.findByRole('list');
    const options = within(list).getAllByRole('option');

    await userEvent.click(options[2]); // "Option 3"

    await waitFor(() => {
      expect(input).toHaveValue('Option 3');
    });
  },
};
