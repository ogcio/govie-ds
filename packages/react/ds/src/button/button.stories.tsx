import type { Meta, StoryObj } from '@storybook/react';
import { Fragment } from 'react/jsx-runtime';
import { Icon } from '../icon/icon.js';
import { Button } from './button.js';

const meta = {
  title: 'Form/Button',
  decorators: (Story, context) => {
    const isLight = context?.args?.appearance === 'light' && 'gi-bg-black';
    return (
      <div className={`gi-p-4 ${isLight}`}>
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
      description: 'the React Node that the button will accept',
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
    children: 'Button',
    variant: 'primary',
  },
};

export const AllVariants: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-4">
      <div className="gi-flex gi-gap-4">
        <Button variant="primary" size="medium">
          Primary
        </Button>
        <Button variant="primary" size="medium" className="hover-selector">
          Primary Hover
        </Button>
        <Button variant="primary" size="medium" className="focus-selector">
          Primary Focus
        </Button>
        <Button variant="primary" size="medium" disabled>
          Primary Disabled
        </Button>
      </div>
      <div className="gi-flex gi-gap-4">
        <Button variant="secondary" size="medium">
          Secondary
        </Button>
        <Button variant="secondary" size="medium" className="hover-selector">
          Secondary Hover
        </Button>
        <Button variant="secondary" size="medium" className="focus-selector">
          Secondary Focus
        </Button>
        <Button variant="secondary" size="medium" disabled>
          Secondary Disabled
        </Button>
      </div>
      <div className="gi-flex gi-gap-4">
        <Button variant="flat" size="medium">
          Flat
        </Button>
        <Button variant="flat" size="medium" className="hover-selector">
          Flat Hover
        </Button>
        <Button variant="flat" size="medium" className="focus-selector">
          Flat Focus
        </Button>
        <Button variant="flat" size="medium" disabled>
          Flat Disabled
        </Button>
      </div>
      <div className="gi-flex gi-gap-4">
        <Button variant="primary" size="medium" appearance="dark">
          Primary Dark
        </Button>
        <Button
          variant="primary"
          size="medium"
          appearance="dark"
          className="hover-selector"
        >
          Primary Dark Hover
        </Button>
        <Button
          variant="primary"
          size="medium"
          appearance="dark"
          className="focus-selector"
        >
          Primary Dark Focus
        </Button>
        <Button variant="primary" size="medium" appearance="dark" disabled>
          Primary Dark Disabled
        </Button>
      </div>
      <div className="gi-flex gi-gap-4">
        <Button variant="secondary" size="medium" appearance="dark">
          Secondary Dark
        </Button>
        <Button
          variant="secondary"
          size="medium"
          appearance="dark"
          className="hover-selector"
        >
          Secondary Dark Hover
        </Button>
        <Button
          variant="secondary"
          size="medium"
          appearance="dark"
          className="focus-selector"
        >
          Secondary Dark Focus
        </Button>
        <Button variant="secondary" size="medium" appearance="dark" disabled>
          Secondary Dark Disabled
        </Button>
      </div>
      <div className="gi-flex gi-gap-4">
        <Button variant="flat" size="medium" appearance="dark">
          Flat Dark
        </Button>
        <Button
          variant="flat"
          size="medium"
          appearance="dark"
          className="hover-selector"
        >
          Flat Dark Hover
        </Button>
        <Button
          variant="flat"
          size="medium"
          appearance="dark"
          className="focus-selector"
        >
          Flat Dark Focus
        </Button>
        <Button variant="flat" size="medium" appearance="dark" disabled>
          Flat Dark Disabled
        </Button>
      </div>
      <div
        className="gi-flex gi-gap-4 gi-bg-black gi-p-4 gi-w-fit"
        data-testid="light-appearance"
      >
        <Button variant="primary" size="medium" appearance="light">
          Primary Light
        </Button>
        <Button
          variant="primary"
          size="medium"
          appearance="light"
          className="hover-selector"
        >
          Primary Light Hover
        </Button>
        <Button
          variant="primary"
          size="medium"
          appearance="light"
          className="focus-selector"
        >
          Primary Light Focus
        </Button>
        <Button variant="primary" size="medium" appearance="light" disabled>
          Primary Light Disabled
        </Button>
      </div>
      <div
        className="gi-flex gi-gap-4 gi-bg-black gi-p-4 gi-w-fit"
        data-testid="light-appearance"
      >
        <Button variant="secondary" size="medium" appearance="light">
          Secondary Light
        </Button>
        <Button
          variant="secondary"
          size="medium"
          appearance="light"
          className="hover-selector"
        >
          Secondary Light Hover
        </Button>
        <Button
          variant="secondary"
          size="medium"
          appearance="light"
          className="focus-selector"
        >
          Secondary Light Focus
        </Button>
        <Button variant="secondary" size="medium" appearance="light" disabled>
          Secondary Light Disabled
        </Button>
      </div>
      <div
        className="gi-flex gi-gap-4 gi-bg-black gi-p-4 gi-w-fit"
        data-testid="light-appearance"
      >
        <Button variant="flat" size="medium" appearance="light">
          Flat Light
        </Button>
        <Button
          variant="flat"
          size="medium"
          appearance="light"
          className="hover-selector"
        >
          Flat Light Hover
        </Button>
        <Button
          variant="flat"
          size="medium"
          appearance="light"
          className="focus-selector"
        >
          Flat Light Focus
        </Button>
        <Button variant="flat" size="medium" appearance="light" disabled>
          Flat Light Disabled
        </Button>
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

export const WithIconLeft: Story = {
  args: {
    children: (
      <Fragment>
        <Icon icon="thumb_up" />
        Button
      </Fragment>
    ),
  },
};
export const WithIconRight: Story = {
  args: {
    children: (
      <Fragment>
        Button
        <Icon icon="thumb_up" />
      </Fragment>
    ),
  },
};

export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
};
