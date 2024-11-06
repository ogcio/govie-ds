import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './text-input.html?raw';
import { InputTypeEnum, TextInputProps } from './text-input.schema';

const path = import.meta.url.split('/text-input')[0];

const macro = { name: 'govieTextInput', html, path };
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
    halfFluid: {
      description:
        'When `true`, the input width is set to 50% of the available space.',
      control: 'boolean',
      table: {
        category: 'Width Control',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullFluid: {
      description:
        'When `true`, the input width is set to 100% of the available space.',
      control: 'boolean',
      table: {
        category: 'Width Control',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    characterWidth: {
      description:
        'Sets the width of the input in terms of the number of characters it can contain.',
      control: 'number',
      table: {
        category: 'Width Control',
        type: { summary: 'number' },
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
    fullFluid: true,
    id: 'input-id',
    label: {
      content: 'Label',
      for: 'input-id',
    },
    error: {
      content: '',
    },
    hint: {
      content: '',
    },
  },
};

export const WithLabelAndHint: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'label-hint-input',
    },
    hint: {
      content: 'Hint',
    },
    fullFluid: true,
    id: 'label-hint-input',
  },
};

export const WithLabelAndError: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'label-hint-input',
    },
    error: {
      content: 'Error: Please correct this issue.',
    },
    fullFluid: true,
    id: 'label-hint-input',
  },
};

export const WithLabelHintAndError: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'error-input',
    },
    hint: {
      content: 'Hint',
    },
    error: {
      content: 'Error',
    },
    fullFluid: true,
    id: 'error-input',
  },
};

export const WithLabelAndPrefixSuffix: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'suffix-input',
    },
    fullFluid: true,
    prefix: 'KG',
    suffix: 'per item',
    id: 'suffix-input',
  },
};

export const HalfFluid: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'half-width-input',
    },
    halfFluid: true,
    id: 'half-fluid-input',
  },
};

export const FullFluid: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'full-width-input',
    },
    fullFluid: true,
    id: 'full-fluid-input',
  },
};

export const CharacterWidth: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'character-width-input',
    },
    characterWidth: 20,
    id: 'character-width-input',
  },
};

export const DateInput: Story = {
  args: {
    label: {
      content: 'Label',
      for: 'text-input-id',
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
    },
    id: 'text-input-id',
    type: InputTypeEnum.Text,
    disabled: true,
  },
};

export const AllStates: Story = {
  //@ts-expect-error Render function returns raw HTML string, not a React component
  render: () => `
  <div class="gi-gap-4">
  <div class="gi-text-input-container">
    <label class="gi-text-md gi-label gi-mb-2" for="default-input">Default</label>
    <div class="gi-text-input-container-inner">
      <input
        id="default-input"
        type="text"
        data-testid="textbox"
        class="gi-border-gray-950 gi-w-full gi-text-input"
      />
    </div>
  </div>

  <div class="gi-text-input-container">
    <label class="gi-text-md gi-label gi-mb-2" for="focus-input">Focus</label>
    <div class="gi-text-input-container-inner">
      <input
        id="focus-input"
        type="text"
        data-testid="textbox"
        class="gi-border-gray-950 gi-w-full gi-text-input pseudo-focus"
      />
    </div>
  </div>

  <div class="gi-text-input-container">
    <label class="gi-text-md gi-label gi-mb-2" for="input-disabled">Disabled</label>
    <div class="gi-text-input-container-inner">
      <input
        id="input-disabled"
        type="text"
        data-testid="textbox"
        class="gi-border-gray-950 gi-w-full gi-text-input gi-text-input-disabled"
        disabled
      />
    </div>
  </div>
</div>
`,
  parameters: {
    pseudo: {
      focus: '#focus-input',
    },
  },
};
