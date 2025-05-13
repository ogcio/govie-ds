import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button.js';

const meta = {
  title: 'Form/Button',
  decorators: (Story, context) => {
    const isLight = context?.args?.appearance === 'light' && 'gi-bg-black';
    return (
      <div className={`gi-p-4 ${isLight} gi-w-fit`}>
        <Story />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        component:
          'Button component to help users carry out an action like starting an application or saving their information.',
      },
    },
  },
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    children: {
      control: 'text',
      type: { name: 'string' },
      description: 'The React Node that the button will accept',
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'flat'],
      description: 'The variants of the button',
    },
    appearance: {
      control: 'radio',
      options: ['default', 'dark', 'light'],
      description: 'The appearance of the button',
      type: 'string',
    },
    size: {
      control: 'radio',
      options: ['medium', 'small', 'large'],
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
    children: 'Button',
    variant: 'primary',
    appearance: 'default',
    size: 'medium',
  },
};

export const Primary: Story = {
  args: {
    children: `Primary Button`,
    appearance: 'default',
    size: 'medium',
  },
};

export const PrimaryHover: Story = {
  args: {
    children: `Primary Button (Hover)`,
    appearance: 'default',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
};

export const PrimaryFocus: Story = {
  args: {
    children: `Primary Button (Focused)`,
    appearance: 'default',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
};

export const PrimaryDisabled: Story = {
  args: {
    children: `Primary Button (Disabled)`,
    appearance: 'default',
    size: 'medium',
    disabled: true,
  },
};

export const PrimaryLight: Story = {
  args: {
    children: `Primary Light Button`,
    appearance: 'light',
    size: 'medium',
  },
};

export const PrimaryLightHover: Story = {
  args: {
    children: `Primary Light Button (Hover)`,
    appearance: 'light',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
};

export const PrimaryLightFocus: Story = {
  args: {
    children: `Primary Light Button (Focused)`,
    appearance: 'light',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
};

export const PrimaryLightDisabled: Story = {
  args: {
    children: `Primary Light Button (Disabled)`,
    appearance: 'light',
    size: 'medium',
    disabled: true,
  },
};

export const PrimaryDark: Story = {
  args: {
    children: `Primary Dark Button`,
    appearance: 'dark',
    size: 'medium',
  },
};

export const PrimaryDarkHover: Story = {
  args: {
    children: `Primary Dark Button (Hover)`,
    appearance: 'dark',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
};

export const PrimaryDarkFocus: Story = {
  args: {
    children: `Primary Dark Button (Focused)`,
    appearance: 'dark',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
};

export const PrimaryDarkDisabled: Story = {
  args: {
    children: `Primary Dark Button (Disabled)`,
    appearance: 'dark',
    size: 'medium',
    disabled: true,
  },
};

export const Secondary: Story = {
  args: {
    children: `Secondary Button`,
    variant: 'secondary',
    appearance: 'default',
    size: 'medium',
  },
};

export const SecondaryHover: Story = {
  args: {
    children: `Secondary Button (Hover)`,
    variant: 'secondary',
    appearance: 'default',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
};

export const SecondaryFocus: Story = {
  args: {
    children: `Secondary Button (Focused)`,
    variant: 'secondary',
    appearance: 'default',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
};

export const SecondaryDisabled: Story = {
  args: {
    children: `Secondary Button (Disabled)`,
    variant: 'secondary',
    appearance: 'default',
    size: 'medium',
    disabled: true,
  },
};

export const SecondaryLight: Story = {
  args: {
    children: `Secondary Light Button`,
    appearance: 'light',
    size: 'medium',
  },
};

export const SecondaryLightHover: Story = {
  args: {
    children: `Secondary Light Button (Hover)`,
    appearance: 'light',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
};

export const SecondaryLightFocus: Story = {
  args: {
    children: `Secondary Light Button (Focused)`,
    appearance: 'light',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
};

export const SecondaryLightDisabled: Story = {
  args: {
    children: `Secondary Light Button (Disabled)`,
    appearance: 'light',
    size: 'medium',
    disabled: true,
  },
};

export const SecondaryDark: Story = {
  args: {
    children: `Secondary Dark Button`,
    appearance: 'dark',
    size: 'medium',
  },
};

export const SecondaryDarkHover: Story = {
  args: {
    children: `Secondary Dark Button (Hover)`,
    appearance: 'dark',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
};

export const SecondaryDarkFocus: Story = {
  args: {
    children: `Secondary Dark Button (Focused)`,
    appearance: 'dark',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
};

export const SecondaryDarkDisabled: Story = {
  args: {
    children: `Secondary Dark Button (Disabled)`,
    appearance: 'dark',
    size: 'medium',
    disabled: true,
  },
};

export const Flat: Story = {
  args: {
    children: `Flat Button`,
    variant: 'flat',
    appearance: 'default',
    size: 'medium',
  },
};

export const FlatHover: Story = {
  args: {
    children: `Flat Button (Hover)`,
    variant: 'flat',
    appearance: 'default',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
};

export const FlatFocus: Story = {
  args: {
    children: `Flat Button (Focused)`,
    variant: 'flat',
    appearance: 'default',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
};

export const FlatDisabled: Story = {
  args: {
    children: `Flat Button (Disabled)`,
    variant: 'flat',
    appearance: 'default',
    size: 'medium',
    disabled: true,
  },
};

export const FlatLight: Story = {
  args: {
    children: `Flat Light Button`,
    appearance: 'light',
    size: 'medium',
  },
};

export const FlatLightHover: Story = {
  args: {
    children: `Flat Light Button (Hover)`,
    appearance: 'light',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
};

export const FlatLightFocus: Story = {
  args: {
    children: `Flat Light Button (Focused)`,
    appearance: 'light',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
};

export const FlatLightDisabled: Story = {
  args: {
    children: `Flat Light Button (Disabled)`,
    appearance: 'light',
    size: 'medium',
    disabled: true,
  },
};

export const FlatDark: Story = {
  args: {
    children: `Flat Dark Button`,
    appearance: 'dark',
    size: 'medium',
  },
};

export const FlatDarkHover: Story = {
  args: {
    children: `Flat Dark Button (Hover)`,
    appearance: 'dark',
    size: 'medium',
  },
  parameters: { pseudo: { hover: true } },
};

export const FlatDarkFocus: Story = {
  args: {
    children: `Flat Dark Button (Focused)`,
    appearance: 'dark',
    size: 'medium',
  },
  parameters: { pseudo: { focus: true } },
};

export const FlatDarkDisabled: Story = {
  args: {
    children: `Flat Dark Button (Disabled)`,
    appearance: 'dark',
    size: 'medium',
    disabled: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: (
      <>
        <span
          data-testid="govie-icon"
          role="presentation"
          className="material-symbols-outlined gi-block gi-text-[24px]"
        >
          thumb_up
        </span>{' '}
        Button
      </>
    ),
    appearance: 'default',
    size: 'medium',
  },
};

export const WithIconRight: Story = {
  args: {
    children: (
      <>
        Button{' '}
        <span
          data-testid="govie-icon"
          role="presentation"
          class="material-symbols-outlined gi-block gi-text-[24px]"
        >
          thumb_up
        </span>
      </>
    ),
    appearance: 'default',
    size: 'medium',
  },
};

export const ButtonWithSpinner: Story = {
  args: {
    disabled: true,
    appearance: 'default',
    size: 'medium',
    children: (
      <>
        Button{' '}
        <svg
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
        </svg>
      </>
    ),
  },
};
