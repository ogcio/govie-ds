import type { Meta, StoryObj } from '@storybook/react';
import { LabelSize } from '../label/label.schema';
import { renderComponent } from '../storybook/storybook';
import html from './text-input.html?raw';
import { InputTypeEnum, TextInputProps } from './text-input.schema';

const macro = { name: 'govieTextInput', html };
const TextInput = renderComponent<TextInputProps>(macro);

const meta = {
  title: 'Form/TextInput',
  parameters: {
    macro,
    docs: {
      description: {
        component:
          'Use the text input component when you need to let users enter text that’s no longer than a single line, such as their name or phone number. Use the `halfFluid`, `fullFluid`, or `characterWidth` properties to control the width of the input field based on different design needs.',
      },
    },
  },
  component: TextInput,
  argTypes: {
    label: {
      description: 'Label associated with the input.',
      control: 'object',
      table: {
        category: 'Label',
        type: { summary: 'Label' },
      },
    },
    hint: {
      description: 'Hint text for the input to provide additional information.',
      control: 'object',
      table: {
        category: 'Hint',
        type: { summary: 'HintText' },
      },
    },
    error: {
      description:
        'Error message for the input, displayed when there is a validation error.',
      control: 'object',
      table: {
        category: 'Error',
        type: { summary: 'ErrorText' },
      },
    },
    prefix: {
      description:
        'Element or text to display on the left side of the input, such as a unit or symbol.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    suffix: {
      description:
        'Element or text to display on the right side of the input, such as a unit or symbol.',
      control: 'text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    id: {
      description: 'Sets the unique ID for the input field.',
      control: 'text',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: 'input-id' },
      },
    },
    type: {
      control: 'select',
      options: Object.values(InputTypeEnum),
      type: { name: 'string', required: false },
      description: 'Specifies the input type.',
      table: {
        category: 'Content',
        type: { summary: 'string' },
        defaultValue: { summary: '-' },
      },
    },
    disabled: {
      description: 'Disable input',
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'Behavior' },
      },
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'input-id',
    label: {
      content: 'Label',
      for: 'input-id',
      size: LabelSize.Medium,
    },
    error: {
      content: '',
    },
    hint: {
      content: '',
    },
  },
};

export const ResponsiveLayout: Story = {
  render: () => `
  <div class="md:gi-w-2/3 gi-w-full">
   <div class="gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-col gi-gap-3 gi-flex-nowrap" role="region" aria-label="Items Stacked" data-testid="govie-stack" style="height: 100%;">
      <div class="gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-col md:gi-flex-row gi-gap-3 gi-flex-nowrap" role="region" aria-label="Items Stacked" data-testid="govie-stack" style="height: 100%;">
         <div role="group" class="gi-text-input-container" aria-labelledby="text-1-label">
            <label class="gi-text-md gi-label gi-mb-1" for="text-1" aria-label="First Name" id="text-1-label">First Name</label>
            <div class="gi-hint-text-md gi-hint-text " aria-label="Your first name." id="text-1-hint">Your first name.</div>
            <div class="gi-text-input-container"><input id="text-1" type="text" data-testid="govie-stack-item-0" aria-invalid="false" class="gi-text-input gi-border-gray-950"></div>
         </div>
         <div role="group" class="gi-text-input-container" aria-labelledby="text-2-label">
            <label class="gi-text-md gi-label gi-mb-1" for="text-2" aria-label="Last Name" id="text-2-label">Last Name</label>
            <div class="gi-hint-text-md gi-hint-text " aria-label="Your last name." id="text-2-hint">Your last name.</div>
            <div class="gi-text-input-container"><input id="text-2" type="text" data-testid="govie-stack-item-1" aria-invalid="false" class="gi-text-input gi-border-gray-950"></div>
         </div>
      </div>
      <div class="gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-col md:gi-flex-row gi-gap-3 gi-flex-nowrap" role="region" aria-label="Items Stacked" data-testid="govie-stack" style="height: 100%;">
         <div role="group" class="gi-text-input-container" aria-labelledby="text-4-label">
            <label class="gi-text-md gi-label gi-mb-1" for="text-4" aria-label="Address" id="text-4-label">Address</label>
            <div class="gi-hint-text-md gi-hint-text " aria-label="Where you live." id="text-4-hint">Where you live.</div>
            <div class="gi-text-input-container"><input id="text-4" type="text" data-testid="govie-stack-item-0" aria-invalid="false" class="gi-text-input gi-border-gray-950" maxlength="5"></div>
         </div>
      </div>
      <div class="gi-flex gi-w-full gi-justify-start gi-items-start gi-flex-col md:gi-flex-row gi-gap-3 gi-flex-nowrap" role="region" aria-label="Items Stacked" data-testid="govie-stack" style="height: 100%;">
         <div role="group" class="gi-text-input-container" aria-labelledby="text-input-id-label">
            <label class="gi-text-md gi-label gi-mb-1" for="text-input-id" aria-label="Date of birth" id="text-input-id-label">Date of birth</label>
            <div class="gi-hint-text-md gi-hint-text " aria-label="Your date of birth." id="text-input-id-hint">Your date of birth.</div>
            <div class="gi-text-input-container"><input id="text-input-id" type="date" data-testid="govie-stack-item-0" aria-invalid="false" class="gi-text-input gi-border-gray-950"></div>
         </div>
         <div role="group" class="gi-text-input-container" aria-labelledby="text-input-id-label">
            <label class="gi-text-md gi-label gi-mb-1" for="text-input-id" aria-label="Height" id="text-input-id-label">Height</label>
            <div class="gi-hint-text-md gi-hint-text " aria-label="Your height" id="text-input-id-hint">Your height</div>
            <div class="gi-text-input-container">
               <div class="gi-text-input-prefix">cm</div>
               <input id="text-input-id" type="text" data-testid="govie-stack-item-1" aria-invalid="false" class="gi-text-input gi-border-gray-950">
            </div>
         </div>
         <div class="gi-w-full sm:gi-w-[80px] gi-flex-none" data-testid="govie-stack-item-2">
            <div role="group" class="gi-text-input-container" aria-labelledby="text-4-label">
               <label class="gi-text-md gi-label gi-mb-1" for="text-4" aria-label="Age" id="text-4-label">Age</label>
               <div class="gi-hint-text-md gi-hint-text " aria-label="Your Age." id="text-4-hint">Your Age.</div>
               <div class="gi-text-input-container"><input id="text-4" type="text" data-testid="textbox" aria-invalid="false" class="gi-text-input gi-border-gray-950" maxlength="3"></div>
            </div>
         </div>
      </div>
      <div role="group" class="gi-text-input-container gi-error-state" aria-labelledby="text-4-label">
         <label class="gi-text-md gi-label gi-mb-1" for="text-4" aria-label="Phone Number" id="text-4-label">Phone Number</label>
         <div class="gi-hint-text-md gi-hint-text " aria-label="Your phone number." id="text-4-hint">Your phone number.</div>
         <div role="alert" class="gi-error-text-md gi-error-text " id="text-4-error">Error: Please correct this issue.</div>
         <div class="gi-text-input-container"><input id="text-4" type="text" data-testid="govie-stack-item-3" aria-invalid="true" class="gi-text-input gi-border-red-600" pattern="d*" maxlength="10"></div>
      </div>
   </div>
</div>
`,
};

export const WithLabelAndHint: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'label-hint-input',
      size: LabelSize.Medium,
    },
    hint: {
      content: 'Hint',
    },
    id: 'label-hint-input',
  },
};

export const WithLabelAndError: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'label-hint-input',
      size: LabelSize.Medium,
    },
    error: {
      content: 'Error: Please correct this issue.',
    },
    id: 'label-hint-input',
  },
};

export const WithLabelHintAndError: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'error-input',
      size: LabelSize.Medium,
    },
    hint: {
      content: 'Hint',
    },
    error: {
      content: 'Error',
    },
    id: 'error-input',
  },
};

export const WithLabelAndPrefixSuffix: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'suffix-input',
      size: LabelSize.Medium,
    },
    prefix: 'KG',
    suffix: 'per item',
    id: 'suffix-input',
  },
};

export const InputLength: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'character-width-input',
      size: LabelSize.Medium,
    },
    maxLength: 20,
    id: 'character-width-input',
  },
};

export const DateInput: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'text-input-id',
      size: LabelSize.Medium,
    },
    id: 'text-input-id',
    type: InputTypeEnum.Date,
  },
};

export const DisabledInput: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'text-input-id',
      size: LabelSize.Medium,
    },
    id: 'text-input-id',
    type: InputTypeEnum.Text,
    disabled: true,
  },
};

export const WithHalfWidth: Story = {
  args: {
    id: 'input-id',
    className: 'gi-input-half-width',
  },
};

// export const AllStates: Story = {
//   render: () => `
//   <div class="gi-gap-4">
//   <div class="gi-text-input-container">
//     <label class="gi-text-md gi-label gi-mb-2" for="default-input">Default</label>
//     <div class="gi-text-input-container">
//       <input
//         id="default-input"
//         type="text"
//         data-testid="textbox"
//         class="gi-border-gray-950 gi-w-full gi-text-input"
//       />
//     </div>
//   </div>

//   <div class="gi-text-input-container">
//     <label class="gi-text-md gi-label gi-mb-2" for="focus-input">Focus</label>
//     <div class="gi-text-input-container">
//       <input
//         id="focus-input"
//         type="text"
//         data-testid="textbox"
//         class="gi-border-gray-950 gi-w-full gi-text-input pseudo-focus"
//       />
//     </div>
//   </div>

//   <div class="gi-text-input-container">
//     <label class="gi-text-md gi-label gi-mb-2" for="input-disabled">Disabled</label>
//     <div class="gi-text-input-container">
//       <input
//         id="input-disabled"
//         type="text"
//         data-testid="textbox"
//         class="gi-border-gray-950 gi-w-full gi-text-input gi-text-input-disabled"
//         disabled
//       />
//     </div>
//   </div>
// </div>
// `,
//   parameters: {
//     pseudo: {
//       focus: '#focus-input',
//     },
//   },
// };

export const TextInputWithAriaAttributes: Story = {
  args: {
    id: 'input-id',
    label: {
      content: 'Label',
      for: 'input-id',
      size: LabelSize.Medium,
    },
    error: {
      content: '',
    },
    hint: {
      content: '',
    },
    aria: {
      'aria-required': 'true',
      'aria-placeholder': 'Placeholder',
    },
  },
};
