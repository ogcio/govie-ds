import type { Meta } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { FormField } from '../forms/form-field.js';
import { Label } from '../label/label.js';
import { Select, SelectGroupItem, SelectItem } from './select.js';

const meta = {
  title: 'Form/Select',
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

export const Default = {
  render: () => (
    <FormField label={{ text: 'Label' }}>
      <Select aria-label="Select">
        <SelectItem value="value-1">Option 1</SelectItem>
        <SelectItem value="value-2">Option 2</SelectItem>
        <SelectItem value="value-3">Option 3</SelectItem>
      </Select>
    </FormField>
  ),
};

export const WithLabelAndHint = {
  render: () => (
    <FormField label={{ text: 'Label' }} hint={{ text: 'This is a hint' }}>
      <Select aria-label="Select">
        <SelectItem value="value-1">Option 1</SelectItem>
        <SelectItem value="value-2">Option 2</SelectItem>
        <SelectItem value="value-3">Option 3</SelectItem>
      </Select>
    </FormField>
  ),
};

export const withLabelHintAndError = {
  render: () => (
    <FormField
      label={{ text: 'Label', htmlFor: 'select' }}
      hint={{ text: 'This is a hint' }}
      error={{ text: 'This is an error' }}
    >
      <Select aria-label="Select" data-testid="select" id="select">
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

export const withoutLabel = {
  render: () => (
    <Select aria-label="Select">
      <SelectItem value="value-1">Option 1</SelectItem>
      <SelectItem value="value-2">Option 2</SelectItem>
      <SelectItem value="value-3">Option 3</SelectItem>
    </Select>
  ),
};

export const disabledSelect = {
  render: () => (
    <Select aria-label="Select" disabled>
      <SelectItem disabled value="value-1">
        Option 1
      </SelectItem>
      <SelectItem value="value-2">Option 2</SelectItem>
      <SelectItem value="value-3">Option 3</SelectItem>
    </Select>
  ),
};

export const disabledItem = {
  render: () => (
    <Select aria-label="Select">
      <SelectItem disabled value="value-1">
        Option 1
      </SelectItem>
      <SelectItem value="value-2">Option 2</SelectItem>
      <SelectItem value="value-3">Option 3</SelectItem>
    </Select>
  ),
};

export const withGroups = {
  render: () => (
    <Select aria-label="Select" data-testid="select">
      <SelectGroupItem label="Group 1" data-testid="select-group">
        <SelectItem value="value-1">Option 1</SelectItem>
        <SelectItem value="value-2">Option 2</SelectItem>
        <SelectItem value="value-3">Option 3</SelectItem>
      </SelectGroupItem>

      <SelectGroupItem label="Group 2">
        <SelectItem value="value-4">Option 4</SelectItem>
        <SelectItem value="value-5">Option 5</SelectItem>
        <SelectItem value="value-6">Option 6</SelectItem>
      </SelectGroupItem>

      <SelectGroupItem label="Group 3">
        <SelectItem value="value-7">Option 7</SelectItem>
        <SelectItem value="value-8">Option 8</SelectItem>
        <SelectItem value="value-9">Option 9</SelectItem>
      </SelectGroupItem>
    </Select>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
    const canvas = within(canvasElement);

    const select = canvas.getByTestId('select') as HTMLSelectElement;
    expect(select.options.length).toBe(9);

    const optGroup1 = canvas.getByTestId('select-group');
    expect(optGroup1).toBeTruthy();
    expect(optGroup1).toHaveAttribute('role', 'group');
    expect(optGroup1.tagName).toBe('OPTGROUP');
  },
};
