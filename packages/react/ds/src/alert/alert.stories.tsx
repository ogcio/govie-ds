import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from '../paragraph/paragraph.js';
import { Alert } from './alert.js';

const meta = {
  title: 'application/Alert',
  component: Alert,
  parameters: {
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
      control: 'boolean',
      description: 'Specify if the alert is dismissible',
    },
    children: {
      control: 'text',
      description: 'Specify the HTML for the content in the alert component',
    },
    onClose: {
      control: 'object',
      description: 'Callback fired when the component is dismissed',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InfoAlert: Story = {
  args: {
    title: 'Info Alert',
    variant: 'info',
    children: (
      <>
        <Paragraph className="!gi-mb-0">Content</Paragraph>
      </>
    ),
  },
};

export const DangerAlert: Story = {
  args: {
    title: 'Danger Alert',
    variant: 'danger',
    children: (
      <>
        <Paragraph className="!gi-mb-0">Content</Paragraph>
      </>
    ),
  },
};

export const SuccessAlert: Story = {
  args: {
    title: 'Success Alert',
    variant: 'success',
    children: (
      <>
        <Paragraph className="!gi-mb-0">Content</Paragraph>
      </>
    ),
  },
};

export const WarningAlert: Story = {
  args: {
    title: 'Warning Alert',
    variant: 'warning',
    children: (
      <>
        <Paragraph className="!gi-mb-0">Content</Paragraph>
      </>
    ),
  },
};

export const isDismissible: Story = {
  args: {
    title: 'Info Alert',
    variant: 'info',
    dismissible: true,
    children: (
      <>
        <Paragraph className="!gi-mb-0">Content</Paragraph>
      </>
    ),
  },
};
