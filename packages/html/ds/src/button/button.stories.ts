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
        <button class="gi-btn gi-btn-secondary gi-btn-regular">Secondary</button>
        <button class="gi-btn gi-btn-flat gi-btn-regular">Flat</button>
      </div>
      <div class="gi-flex gi-gap-4">
        <button class="gi-btn gi-btn-primary-dark gi-btn-regular">Primary Dark</button>
        <button class="gi-btn gi-btn-secondary-dark gi-btn-regular">Secondary Dark</button>
        <button class="gi-btn gi-btn-flat-dark gi-btn-regular">Flat Dark</button>
      </div>
      <div class="gi-flex gi-gap-4 gi-bg-black gi-p-4 gi-w-fit">
        <button class="gi-btn gi-btn-primary-light gi-btn-regular">Primary Light</button>
        <button class="gi-btn gi-btn-secondary-light gi-btn-regular">Secondary Light</button>
        <button class="gi-btn gi-btn-flat-light gi-btn-regular">Flat Light</button>
      </div>
    </div>
  `,
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

export const ButtonWithSpinner: Story = {
  args: {
    disabled: true,
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
};
