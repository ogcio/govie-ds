import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import { AlertProps, AlertVariant } from './alert-schema';
import html from './alert.html?raw';

// Name of the folder the macro resides
const path = import.meta.url.split('/alert')[0];

const macro = { name: 'govieAlert', html, path };

const Alert = renderComponent<AlertProps>(macro);

const meta = {
  component: Alert,
  title: 'Application/Alert',
  parameters: {
    macro,
    docs: {
      description: {
        component:
          'Use this component to give usage guidance, notify users of action results, or warn them about potential issues or failures.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      description: 'Specify the variant of the alert component',
      options: ['info', 'danger', 'success', 'warning'],
    },
    title: {
      control: 'text',
      description: 'Specify the title of the alert component',
    },
    dismissible: {
      type: 'boolean',
      control: 'boolean',
      description: 'Specify if the alert is dismissible',
    },
    children: {
      control: 'text',
      description: 'Specify the HTML for the content in the alert component',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoAlert: Story = {
  args: {
    title: 'Info Alert',
    variant: AlertVariant.INFO,
    children: '<p>Content</p>',
  },
};

export const DangerAlert: Story = {
  args: {
    title: 'Danger Alert',
    variant: AlertVariant.DANGER,
    children: '<p>Content</p>',
  },
};

export const SuccessAlert: Story = {
  args: {
    title: 'Success Alert',
    variant: AlertVariant.SUCCESS,
    children: '<p>Content</p>',
  },
};

export const WarningAlert: Story = {
  args: {
    title: 'Warning Alert',
    variant: AlertVariant.WARNING,
    children: '<p>Content</p>',
  },
};

export const isDismissible: Story = {
  args: {
    title: 'Info Alert',
    variant: AlertVariant.INFO,
    dismissible: true,
    children: '<p>Content</p>',
  },
};
