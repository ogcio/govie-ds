import type { Meta, StoryObj } from '@storybook/react';
import { Fragment } from 'react/jsx-runtime';
import { Icon } from '../icon/icon.js';
import { Spinner } from '../spinner/spinner.js';
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
        <Button variant="secondary" size="medium">
          Secondary
        </Button>
        <Button variant="flat" size="medium">
          Flat
        </Button>
      </div>
      <div className="gi-flex gi-gap-4">
        <Button variant="primary" size="medium" appearance="dark">
          Primary Dark
        </Button>
        <Button variant="secondary" size="medium" appearance="dark">
          Secondary Dark
        </Button>
        <Button variant="flat" size="medium" appearance="dark">
          Flat Dark
        </Button>
      </div>
      <div className="gi-flex gi-gap-4 gi-bg-black gi-p-4 gi-w-fit">
        <Button variant="primary" size="medium" appearance="light">
          Primary Light
        </Button>
        <Button variant="secondary" size="medium" appearance="light">
          Secondary Light
        </Button>
        <Button variant="flat" size="medium" appearance="light">
          Flat Light
        </Button>
      </div>
    </div>
  ),
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

export const ButtonWithSpinner: Story = {
  args: {
    disabled: true,
    children: (
      <Fragment>
        Button
        <Spinner />
      </Fragment>
    ),
  },
};
