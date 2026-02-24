import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
  FormField,
  FormFieldError,
  FormFieldHint,
  FormFieldLabel,
} from '../forms/form-field/form-field.js';
import { Select, SelectGroupItem, SelectItem } from './select.js';

const meta = {
  title: 'Form/Select/SelectNative',
  parameters: {
    docs: {
      description: {
        component:
          'A composable select component allows users to choose an option from a long list.',
      },
    },
  },
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

export const Default: StoryObj = {
  render: () => (
    <FormField>
      <FormFieldLabel>Label</FormFieldLabel>
      <Select aria-label="Select" defaultValue="select-option">
        <SelectItem value="select-option" hidden>
          Select Option
        </SelectItem>
        <SelectItem value="value-1">Option 1</SelectItem>
        <SelectItem value="value-2">Option 2</SelectItem>
        <SelectItem value="value-3">Option 3</SelectItem>
      </Select>
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByLabelText('Select') as HTMLSelectElement;

    await userEvent.selectOptions(select, 'value-2');

    await waitFor(() => {
      expect(select.value).toBe('value-2');
    });
    const icon = canvas.getByTestId('keyboard_arrow_down');
    expect(icon).toBeInTheDocument();
  },
};

export const Focus = {
  render: () => (
    <FormField>
      <FormFieldLabel htmlFor="focus-select">Label</FormFieldLabel>
      <Select id="focus-select" aria-label="Select" className="focus-select">
        <SelectItem selected hidden>
          Select Option
        </SelectItem>
        <SelectItem value="value-1">Option 1</SelectItem>
        <SelectItem value="value-2">Option 2</SelectItem>
        <SelectItem value="value-3">Option 3</SelectItem>
      </Select>
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
    <FormField>
      <FormFieldLabel htmlFor="select">Label</FormFieldLabel>
      <FormFieldHint>This is a hint</FormFieldHint>
      <FormFieldError>This is an error</FormFieldError>
      <Select
        aria-label="Select"
        data-testid="select"
        id="select"
        defaultValue="select-option"
      >
        <SelectItem value="select-option" hidden>
          Select Option
        </SelectItem>
        <SelectItem value="value-1">Option 1</SelectItem>
        <SelectItem value="value-2">Option 2</SelectItem>
        <SelectItem value="value-3">Option 3</SelectItem>
      </Select>
    </FormField>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
    const canvas = within(canvasElement);

    const select = canvas.getByTestId('select');

    const label = canvas.getByText('Label');
    expect(label).toBeTruthy();
    expect(label).toHaveClass('gi-label');
    expect(label.getAttribute('for')).toBe(select.getAttribute('id'));

    const hint = canvas.getByText('This is a hint');
    expect(hint).toBeTruthy();
    expect(hint).toHaveClass('gi-hint-text');

    const error = canvas.getByText('This is an error');
    expect(error).toBeTruthy();
    expect(error).toHaveClass('gi-error-text');
  },
};

export const WithoutLabel = {
  render: () => (
    <Select aria-label="Select" defaultValue="select-option">
      <SelectItem value="select-option" hidden>
        Select Option
      </SelectItem>
      <SelectItem value="value-1">Option 1</SelectItem>
      <SelectItem value="value-2">Option 2</SelectItem>
      <SelectItem value="value-3">Option 3</SelectItem>
    </Select>
  ),
};

export const DisabledSelect = {
  render: () => (
    <Select aria-label="Select" defaultValue="select-option" disabled>
      <SelectItem value="select-option" hidden>
        Select Option
      </SelectItem>
      <SelectItem value="value-1">Option 1</SelectItem>
      <SelectItem value="value-2">Option 2</SelectItem>
      <SelectItem value="value-3">Option 3</SelectItem>
    </Select>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByLabelText('Select');

    expect(select).toBeDisabled();
  },
};

export const DisabledItem = {
  render: () => (
    <Select aria-label="Select" defaultValue="select-option">
      <SelectItem value="select-option" hidden>
        Select Option
      </SelectItem>
      <SelectItem disabled value="value-1">
        Option 1
      </SelectItem>
      <SelectItem value="value-2">Option 2</SelectItem>
      <SelectItem value="value-3">Option 3</SelectItem>
    </Select>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
    const canvas = within(canvasElement);
    const options = canvas.getAllByRole('option');

    expect(options[0]).toBeDisabled();
    expect(options[1]).not.toBeDisabled();
    expect(options[2]).not.toBeDisabled();
  },
};

export const WithGroups = {
  render: () => (
    <Select
      aria-label="Select"
      data-testid="select"
      defaultValue="select-option"
    >
      <SelectGroupItem label="Group 1" data-testid="select-group">
        <SelectItem value="select-option" hidden>
          Select Option
        </SelectItem>
        <SelectItem value="value-1">Option 1</SelectItem>
        <SelectItem value="value-2">Option 2</SelectItem>
        <SelectItem value="value-3">Option 3</SelectItem>
      </SelectGroupItem>

      <SelectGroupItem label="Group 2">
        <SelectItem value="select-option" hidden>
          Select Option
        </SelectItem>
        <SelectItem value="value-4">Option 4</SelectItem>
        <SelectItem value="value-5">Option 5</SelectItem>
        <SelectItem value="value-6">Option 6</SelectItem>
      </SelectGroupItem>

      <SelectGroupItem label="Group 3">
        <SelectItem value="select-option" hidden>
          Select Option
        </SelectItem>
        <SelectItem value="value-7">Option 7</SelectItem>
        <SelectItem value="value-8">Option 8</SelectItem>
        <SelectItem value="value-9">Option 9</SelectItem>
      </SelectGroupItem>
    </Select>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
    const canvas = within(canvasElement);

    const select = canvas.getByTestId('select') as HTMLSelectElement;
    expect(select.options.length).toBe(12);

    const optGroup1 = canvas.getByTestId('select-group');
    expect(optGroup1).toBeTruthy();
    expect(optGroup1).toHaveAttribute('role', 'group');
    expect(optGroup1.tagName).toBe('OPTGROUP');
  },
};
