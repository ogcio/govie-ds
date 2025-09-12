import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import {
  FormField,
  FormFieldHint,
  FormFieldLabel,
} from '../forms/form-field/form-field.js';
import { ButtonGroup, ButtonGroupItem } from './button-group.js';

const meta = {
  title: 'Form/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    docs: {
      description: {
        component:
          'ButtonGroup component that behaves like a radio group using buttons. Useful for questionnaire-style inputs.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Name attribute for the button group',
      type: { name: 'string', required: true },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the buttons',
    },
    defaultValue: {
      control: 'text',
      description: 'The default selected value',
    },
    onChange: {
      action: 'selected',
      description: 'Callback when a value is selected',
    },
    children: {
      description:
        'ButtonGroupItem components to render inside the ButtonGroup',
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (arguments_) => {
    const options = [
      { label: 'Opt 1', value: '1' },
      { label: 'Opt 2', value: '2' },
      { label: 'Opt 3', value: '3' },
      { label: 'Opt 4', value: '4' },
    ];

    return (
      <ButtonGroup
        name={arguments_.name}
        size={arguments_.size}
        defaultValue={arguments_.defaultValue}
        onChange={(value) => console.log(value)}
      >
        {options.map((option) => (
          <ButtonGroupItem key={option.value} value={option.value}>
            {option.label}
          </ButtonGroupItem>
        ))}
      </ButtonGroup>
    );
  },
  args: {
    name: 'likelihood-feedback',
    size: 'large',
    defaultValue: '6',
  },
};

export const OpinionScale: Story = {
  render: (arguments_) => {
    const options = [
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: '6', value: '6' },
      { label: '7', value: '7' },
      { label: '8', value: '8' },
      { label: '9', value: '9' },
      { label: '10', value: '10' },
    ];

    return (
      <FormField className="gi-w-full">
        <FormFieldLabel>
          How likely are you to recommend our service to a friend or colleague?
        </FormFieldLabel>
        <FormFieldHint>1 = Not likely, 10 = Extremely likely</FormFieldHint>
        <ButtonGroup
          name={arguments_.name}
          size={arguments_.size}
          defaultValue={arguments_.defaultValue}
          onChange={(value) => console.log(value)}
        >
          {options.map((option) => (
            <ButtonGroupItem key={option.value} value={option.value}>
              {option.label}
            </ButtonGroupItem>
          ))}
        </ButtonGroup>
      </FormField>
    );
  },
  args: {
    name: 'likelihood-feedback',
    size: 'large',
    defaultValue: '6',
  },
};

export const ExplicitItems: Story = {
  name: 'Yes/No Question',
  render: (arguments_) => {
    return (
      <FormField>
        <FormFieldLabel>Are you currently a customer?</FormFieldLabel>
        <ButtonGroup
          name={arguments_.name}
          size={arguments_.size}
          defaultValue={arguments_.defaultValue}
          onChange={(value) => console.log(value)}
        >
          <ButtonGroupItem value="yes">Yes</ButtonGroupItem>
          <ButtonGroupItem value="no">No</ButtonGroupItem>
        </ButtonGroup>
      </FormField>
    );
  },
  args: {
    name: 'customer-status',
    size: 'medium',
    defaultValue: 'no',
  },
};

export const Controlled: Story = {
  name: 'Yes/No Question (Controlled)',
  render: (arguments_) => {
    const [value, setValue] = useState(
      arguments_.value || arguments_.defaultValue,
    );

    const handleChange = (newValue: string) => {
      setValue(newValue);
      if (arguments_.onChange) {
        arguments_.onChange(newValue);
      }
    };

    return (
      <FormField>
        <FormFieldLabel>Are you currently a customer?</FormFieldLabel>
        <ButtonGroup
          name={arguments_.name}
          size={arguments_.size}
          value={value}
          onChange={handleChange}
        >
          <ButtonGroupItem value="yes">Yes</ButtonGroupItem>
          <ButtonGroupItem value="no">No</ButtonGroupItem>
        </ButtonGroup>
      </FormField>
    );
  },

  args: {
    name: 'customer-status',
    size: 'medium',
    value: 'no',
    defaultValue: 'no',
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the ButtonGroup component in controlled mode. The component's value is managed by React state, making it suitable for use with form libraries like React Hook Form.",
        language: 'tsx',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const yesButton = canvas.getByText('Yes');
    const noButton = canvas.getByText('No');

    await userEvent.click(yesButton);

    await waitFor(() => {
      expect(yesButton).toBeChecked();
      expect(noButton).not.toBeChecked();
    });
  },
};

export const TestRenderDefaultSelection: StoryObj = {
  tags: ['skip-playwright'],
  render: () => {
    return (
      <ButtonGroup name="test" size="medium" defaultValue="1">
        <ButtonGroupItem value="1">Button 1</ButtonGroupItem>
        <ButtonGroupItem value="2">Button 2</ButtonGroupItem>
      </ButtonGroup>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render the button group', async () => {
      const buttonOneElement = canvas.getByText('Button 1');
      const buttonTwoElement = canvas.getByText('Button 2');

      expect(buttonOneElement).toBeInTheDocument();
      expect(buttonOneElement).toHaveClass('gi-btn-primary-dark');
      expect(buttonOneElement).toHaveAttribute('aria-checked', 'true');

      expect(buttonTwoElement).toBeInTheDocument();
      expect(buttonTwoElement).not.toHaveClass('gi-btn-primary-dark');
      expect(buttonTwoElement).toHaveAttribute('aria-checked', 'false');
    });
  },
};

export const TestNoFormSubmitOnClick: StoryObj = {
  tags: ['skip-playwright'],
  render: () => {
    const submissionProbeReference = useRef<HTMLSpanElement | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (submissionProbeReference.current) {
        submissionProbeReference.current.dataset.submitted = 'true';
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <ButtonGroup name="test" size="medium" defaultValue="1">
          <ButtonGroupItem value="1">Button 1</ButtonGroupItem>
          <ButtonGroupItem value="2">Button 2</ButtonGroupItem>
        </ButtonGroup>
        <span
          ref={submissionProbeReference}
          data-testid="submit"
          data-submitted="false"
        />
      </form>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'should not submit the form on press a button group items',
      async () => {
        const buttonOneElement = canvas.getByText('Button 1');
        const buttonTwoElement = canvas.getByText('Button 2');

        await userEvent.click(buttonOneElement);
        await userEvent.click(buttonTwoElement);

        const probeElement = canvas.getByTestId('submit');
        expect(probeElement.dataset.submitted).not.toBe('true');
      },
    );
  },
};
