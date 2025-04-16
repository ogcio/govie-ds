import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconButton } from './icon-button.js';

const meta = {
  title: 'form/IconButton',
  decorators: (Story, context) => {
    const isLight = context?.args?.appearance === 'light' && 'gi-bg-black';
    return (
      <div className={`gi-p-4 ${isLight}`}>
        <Story />
      </div>
    );
  },
  component: IconButton,
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    icon: {
      control: 'text',
      type: { name: 'string' },
      description: 'The Icon component that the button will accept',
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'flat'],
      description: 'The variants of the button',
    },
    appearance: {
      control: 'radio',
      options: ['default', 'dark', 'light'],
      description: 'The description of the button',
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
    icon: {
      icon: 'thumb_up',
    },
  },
};

export const Small: Story = {
  args: {
    icon: {
      icon: 'thumb_up',
    },
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    icon: {
      icon: 'thumb_up',
    },
    size: 'large',
  },
};

export const SecondaryButton: Story = {
  args: {
    icon: {
      icon: 'thumb_up',
    },
    variant: 'secondary',
  },
};

export const FlatButton: Story = {
  args: {
    icon: {
      icon: 'thumb_up',
    },
    variant: 'flat',
  },
};

export const Disabled: Story = {
  args: {
    icon: {
      icon: 'thumb_up',
    },
    disabled: true,
  },
};

export const AllVariants: Story = {
  args: {
    icon: {
      icon: 'thumb_up',
    },
  },
  render: (props) => (
    <div className="gi-flex gi-flex-col gi-gap-4">
      <div className="gi-flex gi-gap-4">
        <IconButton variant="primary" size="medium" {...props} />
        <IconButton
          variant="primary"
          size="medium"
          className="hover-selector"
          {...props}
        />
        <IconButton
          variant="primary"
          size="medium"
          className="focus-selector"
          {...props}
        />
        <IconButton variant="primary" size="medium" disabled {...props} />
      </div>
      <div className="gi-flex gi-gap-4">
        <IconButton variant="secondary" size="medium" {...props} />
        <IconButton
          variant="secondary"
          size="medium"
          className="hover-selector"
          {...props}
        />
        <IconButton
          variant="secondary"
          size="medium"
          className="focus-selector"
          {...props}
        />
        <IconButton variant="secondary" size="medium" disabled {...props} />
      </div>
      <div className="gi-flex gi-gap-4">
        <IconButton variant="flat" size="medium" {...props} />
        <IconButton
          variant="flat"
          size="medium"
          className="hover-selector"
          {...props}
        />
        <IconButton
          variant="flat"
          size="medium"
          className="focus-selector"
          {...props}
        />
        <IconButton variant="flat" size="medium" disabled {...props} />
      </div>
      <div className="gi-flex gi-gap-4">
        <IconButton
          variant="primary"
          size="medium"
          appearance="dark"
          {...props}
        />
        <IconButton
          variant="primary"
          size="medium"
          appearance="dark"
          className="hover-selector"
          {...props}
        />
        <IconButton
          variant="primary"
          size="medium"
          appearance="dark"
          className="focus-selector"
          {...props}
        />
        <IconButton
          variant="primary"
          size="medium"
          appearance="dark"
          disabled
          {...props}
        />
      </div>
      <div className="gi-flex gi-gap-4">
        <IconButton
          variant="secondary"
          size="medium"
          appearance="dark"
          {...props}
        />
        <IconButton
          variant="secondary"
          size="medium"
          appearance="dark"
          className="hover-selector"
          {...props}
        />
        <IconButton
          variant="secondary"
          size="medium"
          appearance="dark"
          className="focus-selector"
          {...props}
        />
        <IconButton
          variant="secondary"
          size="medium"
          appearance="dark"
          disabled
          {...props}
        />
      </div>
      <div className="gi-flex gi-gap-4">
        <IconButton variant="flat" size="medium" appearance="dark" {...props} />
        <IconButton
          variant="flat"
          size="medium"
          appearance="dark"
          className="hover-selector"
          {...props}
        />
        <IconButton
          variant="flat"
          size="medium"
          appearance="dark"
          className="focus-selector"
          {...props}
        />
        <IconButton
          variant="flat"
          size="medium"
          appearance="dark"
          disabled
          {...props}
        />
      </div>
      <div
        className="gi-flex gi-gap-4 gi-bg-black gi-p-4 gi-w-fit"
        data-testid="light-appearance"
      >
        <IconButton
          variant="primary"
          size="medium"
          appearance="light"
          {...props}
        />
        <IconButton
          variant="primary"
          size="medium"
          appearance="light"
          className="hover-selector"
          {...props}
        />
        <IconButton
          variant="primary"
          size="medium"
          appearance="light"
          className="focus-selector"
          {...props}
        />
        <IconButton
          variant="primary"
          size="medium"
          appearance="light"
          disabled
          {...props}
        />
      </div>
      <div
        className="gi-flex gi-gap-4 gi-bg-black gi-p-4 gi-w-fit"
        data-testid="light-appearance"
      >
        <IconButton
          variant="secondary"
          size="medium"
          appearance="light"
          {...props}
        />
        <IconButton
          variant="secondary"
          size="medium"
          appearance="light"
          className="hover-selector"
          {...props}
        />
        <IconButton
          variant="secondary"
          size="medium"
          appearance="light"
          className="focus-selector"
          {...props}
        />
        <IconButton
          variant="secondary"
          size="medium"
          appearance="light"
          disabled
          {...props}
        />
      </div>
      <div
        className="gi-flex gi-gap-4 gi-bg-black gi-p-4 gi-w-fit"
        data-testid="light-appearance"
      >
        <IconButton
          variant="flat"
          size="medium"
          appearance="light"
          {...props}
        />
        <IconButton
          variant="flat"
          size="medium"
          appearance="light"
          className="hover-selector"
          {...props}
        />
        <IconButton
          variant="flat"
          size="medium"
          appearance="light"
          className="focus-selector"
          {...props}
        />
        <IconButton
          variant="flat"
          size="medium"
          appearance="light"
          disabled
          {...props}
        />
      </div>
    </div>
  ),
  parameters: {
    pseudo: {
      hover: '.hover-selector',
      focus: '.focus-selector',
    },
  },
};
