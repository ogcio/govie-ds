import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import { createButton } from '../helpers/buttons';
import {
  ButtonAppearance,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from './button.schema';

const meta: Meta<ButtonProps> = {
  title: 'Form/Button',
};

export default meta;
type Story = StoryObj<ButtonProps>;

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
    appearance: ButtonAppearance.Default,
    size: ButtonSize.Medium,
  },
  render: (arguments_) => createButton(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.hover(button);
    await userEvent.click(button);
  },
};

export const Primary: Story = {
  args: {
    content: `Primary Button`,
    appearance: ButtonAppearance.Default,
    size: ButtonSize.Medium,
  },
  render: (arguments_) => createButton(arguments_),
};

export const PrimaryHover: Story = {
  args: {
    content: `Primary Button (Hover)`,
    appearance: ButtonAppearance.Default,
    size: ButtonSize.Medium,
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createButton(arguments_),
};

export const PrimaryFocus: Story = {
  args: {
    content: `Primary Button (Focused)`,
    appearance: ButtonAppearance.Default,
    size: ButtonSize.Medium,
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createButton(arguments_),
};

export const PrimaryDisabled: Story = {
  args: {
    content: `Primary Button (Disabled)`,
    appearance: ButtonAppearance.Default,
    size: ButtonSize.Medium,
    disabled: true,
  },
  render: (arguments_) => createButton(arguments_),
};

export const PrimaryLight: Story = {
  args: {
    content: `Primary Light Button`,
    appearance: ButtonAppearance.Light,
    size: ButtonSize.Medium,
  },
  render: (arguments_) => createButton(arguments_),
};

export const PrimaryLightHover: Story = {
  args: {
    content: `Primary Light Button (Hover)`,
    appearance: ButtonAppearance.Light,
    size: ButtonSize.Medium,
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createButton(arguments_),
};

export const PrimaryLightFocus: Story = {
  args: {
    content: `Primary Light Button (Focused)`,
    appearance: ButtonAppearance.Light,
    size: ButtonSize.Medium,
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createButton(arguments_),
};

export const PrimaryLightDisabled: Story = {
  args: {
    content: `Primary Light Button (Disabled)`,
    appearance: ButtonAppearance.Light,
    size: ButtonSize.Medium,
    disabled: true,
  },
  render: (arguments_) => createButton(arguments_),
};

export const PrimaryDark: Story = {
  args: {
    content: `Primary Dark Button`,
    appearance: ButtonAppearance.Dark,
    size: ButtonSize.Medium,
  },
  render: (arguments_) => createButton(arguments_),
};

export const PrimaryDarkHover: Story = {
  args: {
    content: `Primary Dark Button (Hover)`,
    appearance: ButtonAppearance.Dark,
    size: ButtonSize.Medium,
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createButton(arguments_),
};

export const PrimaryDarkFocus: Story = {
  args: {
    content: `Primary Dark Button (Focused)`,
    appearance: ButtonAppearance.Dark,
    size: ButtonSize.Medium,
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createButton(arguments_),
};

export const PrimaryDarkDisabled: Story = {
  args: {
    content: `Primary Dark Button (Disabled)`,
    appearance: ButtonAppearance.Dark,
    size: ButtonSize.Medium,
    disabled: true,
  },
  render: (arguments_) => createButton(arguments_),
};

export const Secondary: Story = {
  args: {
    content: `Secondary Button`,
    variant: ButtonVariant.Secondary,
    appearance: ButtonAppearance.Default,
    size: ButtonSize.Medium,
  },
  render: (arguments_) => createButton(arguments_),
};

export const SecondaryHover: Story = {
  args: {
    content: `Secondary Button (Hover)`,
    variant: ButtonVariant.Secondary,
    appearance: ButtonAppearance.Default,
    size: ButtonSize.Medium,
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createButton(arguments_),
};

export const SecondaryFocus: Story = {
  args: {
    content: `Secondary Button (Focused)`,
    variant: ButtonVariant.Secondary,
    appearance: ButtonAppearance.Default,
    size: ButtonSize.Medium,
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createButton(arguments_),
};

export const SecondaryDisabled: Story = {
  args: {
    content: `Secondary Button (Disabled)`,
    variant: ButtonVariant.Secondary,
    appearance: ButtonAppearance.Default,
    size: ButtonSize.Medium,
    disabled: true,
  },
  render: (arguments_) => createButton(arguments_),
};

export const SecondaryLight: Story = {
  args: {
    content: `Secondary Light Button`,
    appearance: ButtonAppearance.Light,
    size: ButtonSize.Medium,
  },
  render: (arguments_) => createButton(arguments_),
};

export const SecondaryLightHover: Story = {
  args: {
    content: `Secondary Light Button (Hover)`,
    appearance: ButtonAppearance.Light,
    size: ButtonSize.Medium,
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createButton(arguments_),
};

export const SecondaryLightFocus: Story = {
  args: {
    content: `Secondary Light Button (Focused)`,
    appearance: ButtonAppearance.Light,
    size: ButtonSize.Medium,
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createButton(arguments_),
};

export const SecondaryLightDisabled: Story = {
  args: {
    content: `Secondary Light Button (Disabled)`,
    appearance: ButtonAppearance.Light,
    size: ButtonSize.Medium,
    disabled: true,
  },
  render: (arguments_) => createButton(arguments_),
};

export const SecondaryDark: Story = {
  args: {
    content: `Secondary Dark Button`,
    appearance: ButtonAppearance.Dark,
    size: ButtonSize.Medium,
  },
  render: (arguments_) => createButton(arguments_),
};

export const SecondaryDarkHover: Story = {
  args: {
    content: `Secondary Dark Button (Hover)`,
    appearance: ButtonAppearance.Dark,
    size: ButtonSize.Medium,
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createButton(arguments_),
};

export const SecondaryDarkFocus: Story = {
  args: {
    content: `Secondary Dark Button (Focused)`,
    appearance: ButtonAppearance.Dark,
    size: ButtonSize.Medium,
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createButton(arguments_),
};

export const SecondaryDarkDisabled: Story = {
  args: {
    content: `Secondary Dark Button (Disabled)`,
    appearance: ButtonAppearance.Dark,
    size: ButtonSize.Medium,
    disabled: true,
  },
  render: (arguments_) => createButton(arguments_),
};

export const Flat: Story = {
  args: {
    content: `Flat Button`,
    variant: ButtonVariant.Flat,
    appearance: ButtonAppearance.Default,
    size: ButtonSize.Medium,
  },
  render: (arguments_) => createButton(arguments_),
};

export const FlatHover: Story = {
  args: {
    content: `Flat Button (Hover)`,
    variant: ButtonVariant.Flat,
    appearance: ButtonAppearance.Default,
    size: ButtonSize.Medium,
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createButton(arguments_),
};

export const FlatFocus: Story = {
  args: {
    content: `Flat Button (Focused)`,
    variant: ButtonVariant.Flat,
    appearance: ButtonAppearance.Default,
    size: ButtonSize.Medium,
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createButton(arguments_),
};

export const FlatDisabled: Story = {
  args: {
    content: `Flat Button (Disabled)`,
    variant: ButtonVariant.Flat,
    appearance: ButtonAppearance.Default,
    size: ButtonSize.Medium,
    disabled: true,
  },
  render: (arguments_) => createButton(arguments_),
};

export const FlatLight: Story = {
  args: {
    content: `Flat Light Button`,
    appearance: ButtonAppearance.Light,
    size: ButtonSize.Medium,
  },
  render: (arguments_) => createButton(arguments_),
};

export const FlatLightHover: Story = {
  args: {
    content: `Flat Light Button (Hover)`,
    appearance: ButtonAppearance.Light,
    size: ButtonSize.Medium,
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createButton(arguments_),
};

export const FlatLightFocus: Story = {
  args: {
    content: `Flat Light Button (Focused)`,
    appearance: ButtonAppearance.Light,
    size: ButtonSize.Medium,
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createButton(arguments_),
};

export const FlatLightDisabled: Story = {
  args: {
    content: `Flat Light Button (Disabled)`,
    appearance: ButtonAppearance.Light,
    size: ButtonSize.Medium,
    disabled: true,
  },
  render: (arguments_) => createButton(arguments_),
};

export const FlatDark: Story = {
  args: {
    content: `Flat Dark Button`,
    appearance: ButtonAppearance.Dark,
    size: ButtonSize.Medium,
  },
  render: (arguments_) => createButton(arguments_),
};

export const FlatDarkHover: Story = {
  args: {
    content: `Flat Dark Button (Hover)`,
    appearance: ButtonAppearance.Dark,
    size: ButtonSize.Medium,
  },
  parameters: { pseudo: { hover: true } },
  render: (arguments_) => createButton(arguments_),
};

export const FlatDarkFocus: Story = {
  args: {
    content: `Flat Dark Button (Focused)`,
    appearance: ButtonAppearance.Dark,
    size: ButtonSize.Medium,
  },
  parameters: { pseudo: { focus: true } },
  render: (arguments_) => createButton(arguments_),
};

export const FlatDarkDisabled: Story = {
  args: {
    content: `Flat Dark Button (Disabled)`,
    appearance: ButtonAppearance.Dark,
    size: ButtonSize.Medium,
    disabled: true,
  },
  render: (arguments_) => createButton(arguments_),
};

export const WithLeftIcon: Story = {
  args: {
    content: `<span data-testid="govie-icon" role="presentation" class="material-symbols-outlined gi-block gi-text-[24px]">thumb_up</span> Button`,
    appearance: ButtonAppearance.Default,
    size: ButtonSize.Medium,
  },
  render: (arguments_) => createButton(arguments_),
};

export const WithIconRight: Story = {
  args: {
    content: `Button <span data-testid="govie-icon" role="presentation" class="material-symbols-outlined gi-block gi-text-[24px]">thumb_up</span>`,
    appearance: ButtonAppearance.Default,
    size: ButtonSize.Medium,
  },
  render: (arguments_) => createButton(arguments_),
};

export const ButtonWithSpinner: Story = {
  args: {
    disabled: true,
    appearance: ButtonAppearance.Default,
    size: ButtonSize.Medium,
    content: `Button <svg
    class="gi-w-6 gi-h-6"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <circle
        cx="12"
        cy="12"
        r="9.5"
        fill="none"
        stroke-width="3"
        stroke-linecap="round"
      >
        <animate
          attributeName="stroke-dasharray"
          dur="1.5s"
          calcMode="spline"
          values="0 150;42 150;42 150;42 150"
          keyTimes="0;0.475;0.95;1"
          keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dashoffset"
          dur="1.5s"
          calcMode="spline"
          values="0;-16;-59;-59"
          keyTimes="0;0.475;0.95;1"
          keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
          repeatCount="indefinite"
        />
      </circle>
      <animateTransform
        attributeName="transform"
        type="rotate"
        dur="2s"
        values="0 12 12;360 12 12"
        repeatCount="indefinite"
      />
    </g>
  </svg>`,
  },
  render: (arguments_) => createButton(arguments_),
};
