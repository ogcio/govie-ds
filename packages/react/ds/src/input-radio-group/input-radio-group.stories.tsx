import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
  FormField,
  FormFieldError,
  FormFieldHint,
  FormFieldLabel,
} from '../forms/form-field/form-field.js';
import { InputRadio } from '../input-radio/input-radio.js';
import { InputRadioGroup } from '../input-radio-group/input-radio-group.js';
import { Paragraph } from '../paragraph/paragraph.js';

const meta = {
  title: 'Form/Radio/InputRadioGroup',
  parameters: {
    docs: {
      description: {
        component:
          'Radio group component when users can only select one option.',
      },
    },
  },
  component: InputRadioGroup,
} satisfies Meta<typeof InputRadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    inline: {
      control: 'boolean',
      description: 'Specify if the radios should be inline',
    },
  },
  args: {
    groupId: 'city',
  },

  render: (arguments_) => (
    <FormField>
      <FormFieldLabel>Where do you live?</FormFieldLabel>
      <InputRadioGroup {...arguments_}>
        <InputRadio value="dublin" label="Dublin" />
        <InputRadio value="cork" label="Cork" />
        <InputRadio value="galway" label="Galway" />
      </InputRadioGroup>
    </FormField>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const dublinOption = await canvas.getByLabelText('Dublin');
    const corkOption = await canvas.getByLabelText('Cork');
    const galwayOption = await canvas.getByLabelText('Galway');

    await userEvent.click(dublinOption);
    await waitFor(() => {
      expect(dublinOption).toBeChecked();
      expect(corkOption).not.toBeChecked();
      expect(galwayOption).not.toBeChecked();
    });

    await userEvent.click(corkOption);
    await waitFor(() => {
      expect(corkOption).toBeChecked();
      expect(dublinOption).not.toBeChecked();
      expect(galwayOption).not.toBeChecked();
    });

    await userEvent.click(galwayOption);
    await waitFor(() => {
      expect(galwayOption).toBeChecked();
      expect(dublinOption).not.toBeChecked();
      expect(corkOption).not.toBeChecked();
    });
  },
};

export const Inline: Story = {
  args: {
    inline: true,
    groupId: 'city2',
  },
  render: (arguments_) => (
    <FormField>
      <FormFieldLabel>Where do you live?</FormFieldLabel>
      <InputRadioGroup {...arguments_} inline>
        <InputRadio value="dublin" label="Dublin" />
        <InputRadio value="cork" label="Cork" />
        <InputRadio value="galway" label="Galway" />
      </InputRadioGroup>
    </FormField>
  ),
};

export const WithTitleHint: Story = {
  args: {
    groupId: 'city3',
  },
  render: (arguments_) => (
    <FormField>
      <FormFieldLabel>Where do you live?</FormFieldLabel>
      <FormFieldHint>Select a city</FormFieldHint>
      <InputRadioGroup {...arguments_}>
        <InputRadio value="dublin" label="Dublin" />
        <InputRadio value="cork" label="Cork" />
        <InputRadio value="galway" label="Galway" />
      </InputRadioGroup>
    </FormField>
  ),
};

export const WithError: Story = {
  args: {
    groupId: 'city6',
  },
  render: (arguments_) => (
    <FormField>
      <FormFieldLabel>Where do you live?</FormFieldLabel>
      <FormFieldHint>Select a city</FormFieldHint>
      <FormFieldError>Please select a city</FormFieldError>
      <InputRadioGroup {...arguments_}>
        <InputRadio value="dublin" label="Dublin" />
        <InputRadio value="cork" label="Cork" />
        <InputRadio value="galway" label="Galway" />
      </InputRadioGroup>
    </FormField>
  ),
};

export const WithOptionHints: Story = {
  args: {
    groupId: 'login',
  },
  render: (arguments_) => (
    <FormField>
      <FormFieldLabel>Have you changed your name?</FormFieldLabel>
      <FormFieldHint>
        This includes changing your last name or spelling your name differently.
      </FormFieldHint>
      <InputRadioGroup {...arguments_}>
        <InputRadio
          value="val1"
          label="Yes"
          hint="Yes, I have changed my name"
        />
        <InputRadio
          value="val2"
          label="No"
          hint="No, I didn't change my name"
        />
      </InputRadioGroup>
    </FormField>
  ),
};

export const WithDividerOption: Story = {
  args: {
    groupId: 'city5',
  },
  render: (arguments_) => (
    <FormField>
      <FormFieldLabel>Where do you live?</FormFieldLabel>
      <FormFieldHint>Select a city</FormFieldHint>
      <InputRadioGroup {...arguments_}>
        <InputRadio value="dublin" label="Dublin" />
        <InputRadio value="cork" label="Cork" />
        <InputRadio value="galway" label="Galway" />
        <Paragraph>or</Paragraph>
        <InputRadio value="none" label="None of the above" />
      </InputRadioGroup>
    </FormField>
  ),
};

export const WithConditionalInput: Story = {
  args: {
    groupId: 'contact',
  },
  tags: ['skip-playwright'],
  render: (arguments_) => (
    <FormField>
      <FormFieldLabel>How would you prefer to be contacted?</FormFieldLabel>
      <InputRadioGroup {...arguments_}>
        <InputRadio
          value="email"
          label="Email"
          conditionalInput={{ id: 'email', placeholder: 'Email address' }}
        />
        <InputRadio
          value="phone"
          label="Phone"
          conditionalInput={{ id: 'phone', placeholder: 'Phone number' }}
        />
      </InputRadioGroup>
    </FormField>
  ),
};

export const Controlled: Story = {
  args: {
    groupId: 'controlled',
  },
  tags: ['skip-playwright'],
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates a controlled input radio group where users can select option. The selected value are managed in the component's state, allowing for dynamic updates as radios are selected or unselected.",
      },
    },
  },
  render: (arguments_) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>();

    const handleChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
      if (event) {
        setSelectedValue(event.target.value);
      }
    };

    return (
      <FormField>
        <FormFieldLabel>Choose an option</FormFieldLabel>
        <InputRadioGroup
          {...arguments_}
          value={selectedValue}
          onChange={handleChange}
        >
          <InputRadio value="option1" label="Option 1" />
          <InputRadio value="option2" label="Option 2" />
          <InputRadio value="option3" label="Option 3" />
        </InputRadioGroup>
      </FormField>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const legend = canvasElement.querySelector('legend');
    expect(legend).toBeInTheDocument();
    expect(legend).toHaveTextContent('Choose an option');

    const option1 = await canvas.getByLabelText('Option 1');
    const option2 = await canvas.getByLabelText('Option 2');

    await userEvent.click(option1);

    await waitFor(() => {
      expect(option1).toBeChecked();
      expect(option2).not.toBeChecked();
    });

    await userEvent.click(option2);
    await waitFor(() => {
      expect(option2).toBeChecked();
      expect(option1).not.toBeChecked();
    });
  },
};
