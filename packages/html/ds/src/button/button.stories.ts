import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { renderComponent } from '../storybook/storybook';
import { ButtonAppearance, ButtonProps } from './button-schema';
import { ButtonVariant, ButtonSize } from './button-schema';
import html from './button.html?raw';

// Name of the folder the macro resides
const path = import.meta.url.split('/button')[0];

const macro = { name: 'govieButton', html, path };

const Button = renderComponent<ButtonProps>(macro);

const meta = {
  component: Button,
  title: 'form/Button',
  parameters: {
    macro,
    docs: {
      description: {
        component:
          'Button component to help users carry out an action like starting an application or saving their information.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    content: {
      control: 'text',
      type: { name: 'string' },
      description: 'the HTML that the button will accept',
    },
    variant: {
      control: 'radio',
      options: Object.values(ButtonVariant),
      description: 'The variants of the button',
    },
    appearance: {
      control: 'radio',
      options: Object.values(ButtonAppearance),
      description: 'The description of the button',
      type: 'string',
    },
    size: {
      control: 'radio',
      options: Object.values(ButtonSize),
      type: { name: 'string' },
      description: 'The sizes of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Specify if the button is disabled',
      type: 'boolean',
    },
  },
  args: {
    content: 'Button',
    variant: ButtonVariant.Primary,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.hover(button);
    await userEvent.click(button);
  },
};

export const AllVariants: Story = {
  //@ts-expect-error Render function returns raw HTML string, not a React component
  render: () => `
  <div class="gi-flex gi-flex-col gi-gap-4">
    <div class="gi-flex gi-gap-4">
      <button class="gi-btn gi-btn-primary gi-btn-regular">Primary</button>
      <button class="gi-btn gi-btn-primary gi-btn-regular hover-selector">Primary Hover</button>
      <button class="gi-btn gi-btn-primary gi-btn-regular focus-selector">Primary Focus</button>
      <button class="gi-btn gi-btn-primary gi-btn-regular gi-btn-primary-disabled">Primary Disabled</button>
    </div>
    <div class="gi-flex gi-gap-4">
      <button class="gi-btn gi-btn-secondary gi-btn-regular">Secondary</button>
      <button class="gi-btn gi-btn-secondary gi-btn-regular hover-selector">Secondary Hover</button>
      <button class="gi-btn gi-btn-secondary gi-btn-regular focus-selector">Secondary Focus</button>
      <button class="gi-btn gi-btn-secondary gi-btn-regular gi-btn-secondary-disabled">Secondary Disabled</button>
    </div>
    <div class="gi-flex gi-gap-4">
      <button class="gi-btn gi-btn-flat gi-btn-regular">Flat</button>
      <button class="gi-btn gi-btn-flat gi-btn-regular hover-selector">Flat Hover</button>
      <button class="gi-btn gi-btn-flat gi-btn-regular focus-selector">Flat Focus</button>
      <button class="gi-btn gi-btn-flat gi-btn-regular gi-btn-flat-disabled">Flat Disabled</button>
    </div>
    <div class="gi-flex gi-gap-4">
      <button class="gi-btn gi-btn-primary-dark gi-btn-regular">Primary Dark</button>
      <button class="gi-btn gi-btn-primary-dark gi-btn-regular hover-selector">Primary Dark Hover</button>
      <button class="gi-btn gi-btn-primary-dark gi-btn-regular focus-selector">Primary Dark Focus</button>
      <button class="gi-btn gi-btn-primary-dark gi-btn-regular gi-btn-primary-dark-disabled">Primary Dark Disabled</button>
    </div>
    <div class="gi-flex gi-gap-4">
      <button class="gi-btn gi-btn-secondary-dark gi-btn-regular">Secondary Dark</button>
      <button class="gi-btn gi-btn-secondary-dark gi-btn-regular hover-selector">Secondary Dark Hover</button>
      <button class="gi-btn gi-btn-secondary-dark gi-btn-regular focus-selector">Secondary Dark Focus</button>
      <button class="gi-btn gi-btn-secondary-dark gi-btn-regular gi-btn-primary-disabled">Secondary Dark Disabled</button>
    </div>
    <div class="gi-flex gi-gap-4">
      <button class="gi-btn gi-btn-flat-dark gi-btn-regular">Flat Dark</button>
      <button class="gi-btn gi-btn-flat-dark gi-btn-regular hover-selector">Flat Dark Hover</button>
      <button class="gi-btn gi-btn-flat-dark gi-btn-regular focus-selector">Flat Dark Focus</button>
      <button class="gi-btn gi-btn-regular gi-btn-flat-dark-disabled">Flat Dark Disabled</button>
    </div>
    <div class="gi-flex gi-gap-4 gi-bg-black gi-p-4 gi-w-fit">
      <button class="gi-btn gi-btn-primary-light gi-btn-regular">Primary Light</button>
      <button class="gi-btn gi-btn-primary-light gi-btn-regular hover-selector">Primary Light Hover</button>
      <button class="gi-btn gi-btn-primary-light gi-btn-regular focus-selector">Primary Light Focus</button>
      <button class="gi-btn gi-btn-regular gi-btn-primary-light-disabled">Primary Light Disabled</button>
    </div>
    <div class="gi-flex gi-gap-4 gi-bg-black gi-p-4 gi-w-fit">
      <button class="gi-btn gi-btn-secondary-light gi-btn-regular">Secondary Light</button>
      <button class="gi-btn gi-btn-secondary-light gi-btn-regular hover-selector">Secondary Light Hover</button>
      <button class="gi-btn gi-btn-secondary-light gi-btn-regular focus-selector">Secondary Light Focus</button>
      <button class="gi-btn gi-btn-secondary-light gi-btn-regular gi-btn-secondary-light-disabled">Secondary Light Disabled</button>
    </div>
    <div class="gi-flex gi-gap-4 gi-bg-black gi-p-4 gi-w-fit">
      <button class="gi-btn gi-btn-flat-light gi-btn-regular">Flat Light</button>
      <button class="gi-btn gi-btn-flat-light gi-btn-regular hover-selector">Flat Light Hover</button>
      <button class="gi-btn gi-btn-flat-light gi-btn-regular focus-selector">Flat Light Focus</button>
      <button class="gi-btn gi-btn-flat-light gi-btn-regular gi-btn-flat-light-disabled">Flat Light Disabled</button>
    </div>
  </div>
`,
  parameters: {
    pseudo: {
      hover: '.hover-selector',
      focus: '.focus-selector',
    },
  },
};

export const WithLeftIcon: Story = {
  args: {
    content: `<span data-testid="govie-icon" role="presentation" class="material-symbols-outlined gi-block gi-text-[24px]">thumb_up</span> Button`,
  },
};

export const WithIconRight: Story = {
  args: {
    content: `Button <span data-testid="govie-icon" role="presentation" class="material-symbols-outlined gi-block gi-text-[24px]">thumb_up</span>`,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    content: `Button`,
  },
};
