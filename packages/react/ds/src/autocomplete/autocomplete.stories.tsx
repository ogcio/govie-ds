import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from '@storybook/test';
import { FormField } from '../forms/form-field.js';
import { Autocomplete, AutocompleteItem } from './autocomplete.js';
import { AutocompleteProps } from './types.js';

const meta = {
  title: 'Form/Autocomplete',
  parameters: {
    docs: {
      description: {
        component:
          'Autocomplete component for selecting a value from a filtered list of options.',
      },
    },
  },
  component: Autocomplete,
  decorators: (Story) => {
    return (
      <div className="gi-h-[335px]">
        <Story />
      </div>
    );
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: 'frontend_dev', label: 'Frontend Dev.' },
  { value: 'backend_dev', label: 'Backend Dev.' },
  { value: 'fullstack_dev', label: 'Full Stack Dev.' },
  { value: 'devops_engineer', label: 'DevOps Engineer' },
  { value: 'qa_engineer', label: 'QA Engineer' },
  { value: 'ui_ux_designer', label: 'UI/UX Designer' },
  { value: 'product_manager', label: 'Product Manager' },
  { value: 'data_scientist', label: 'Data Scientist' },
];

export const Default: Story = {
  render: (props: AutocompleteProps) => {
    return (
      <FormField label={{ text: 'Label' }} className="gi-w-56">
        <Autocomplete {...props}>
          {options.map(({ value, label }) => (
            <AutocompleteItem value={value}>{label}</AutocompleteItem>
          ))}
        </Autocomplete>
      </FormField>
    );
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the autocomplete input.',
    },
    defaultValue: {
      control: 'text',
      description: 'The default selected value.',
    },
    onChange: {
      action: 'changed',
      description: 'Callback triggered when an option is selected.',
    },
  },
  args: {
    defaultValue: '',
    children: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.type(input, 'Backend', { delay: 100 });
    const option = await canvas.findByText('Backend Dev.');
    expect(option).toBeVisible();
    await userEvent.click(document.body);
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: '',
    children: [],
  },
  render: (props: AutocompleteProps) => (
    <FormField label={{ text: 'With Default Value' }} className="gi-w-56">
      <Autocomplete {...props} defaultValue={options[1].value}>
        {options.map(({ value, label }) => (
          <AutocompleteItem value={value}>{label}</AutocompleteItem>
        ))}
      </Autocomplete>
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    expect(input).toHaveValue('Backend Dev.');
  },
};

export const WithDisabledOptions: Story = {
  args: {
    defaultValue: '',
    children: [],
  },
  render: (props: AutocompleteProps) => (
    <FormField label={{ text: 'With Disabled Options' }} className="gi-w-56">
      <Autocomplete {...props}>
        {[
          <AutocompleteItem value="disabled" disabled>
            Tester
          </AutocompleteItem>,
          ...options.map(({ value, label }) => (
            <AutocompleteItem value={value}>{label}</AutocompleteItem>
          )),
        ]}
      </Autocomplete>
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    await userEvent.type(input, 'Test', { delay: 100 });
    const disabledOption = await canvas.findByText('Tester');
    expect(disabledOption).toBeVisible();
    const parentWithAria = disabledOption.closest('[aria-disabled]');
    expect(parentWithAria).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(document.body);
  },
};

export const WithDisabled: Story = {
  args: {
    defaultValue: '',
    children: [],
  },
  render: (props: AutocompleteProps) => (
    <FormField label={{ text: 'With Disabled' }} className="gi-w-56">
      <Autocomplete {...props} disabled>
        {options.map(({ value, label }) => (
          <AutocompleteItem value={value}>{label}</AutocompleteItem>
        ))}
      </Autocomplete>
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox');
    expect(input).toBeDisabled();
  },
};
