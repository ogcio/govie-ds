import type { Meta } from '@storybook/react';
import { ErrorText } from '../error-text/error-text.js';
import { HintText } from '../hint-text/hint-text.js';
import { Label } from '../label/label.js';
import { Select, SelectItem, SelectGroupItem } from './select.js';

const meta = {
  title: 'Form/Select/SelectComposable',
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
    <>
      <Label text="Label" />
      <Select>
        <SelectItem value="value-1">Option 1</SelectItem>
        <SelectItem value="value-2">Option 2</SelectItem>
        <SelectItem value="value-3">Option 3</SelectItem>
      </Select>
    </>
  ),
};

export const WithHint = {
  render: () => (
    <>
      <Label text="Label" />
      <HintText text="This is a hint" />
      <Select>
        <SelectItem value="value-1">Option 1</SelectItem>
        <SelectItem value="value-2">Option 2</SelectItem>
        <SelectItem value="value-3">Option 3</SelectItem>
      </Select>
    </>
  ),
};

export const withError = {
  render: () => (
    <>
      <Label text="Label" />
      <ErrorText text="This is an error" />
      <Select>
        <SelectItem value="value-1">Option 1</SelectItem>
        <SelectItem value="value-2">Option 2</SelectItem>
        <SelectItem value="value-3">Option 3</SelectItem>
      </Select>
    </>
  ),
};

export const withoutLabel = {
  render: () => (
    <Select>
      <SelectItem value="value-1">Option 1</SelectItem>
      <SelectItem value="value-2">Option 2</SelectItem>
      <SelectItem value="value-3">Option 3</SelectItem>
    </Select>
  ),
};

export const withGroups = {
  render: () => (
    <Select>
      <SelectGroupItem label="Group 1">
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
};
