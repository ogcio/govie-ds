import type { Meta, StoryObj } from '@storybook/react';
import { Paragraph } from '../paragraph/paragraph.js';
import { Alert } from './alert.js';

const meta = {
  title: 'application/Alert',
  component: Alert,
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Alert',
    children: 'Alert description',
  },
};

export const InfoAlert: Story = {
  args: {
    title: 'Info Alert',
    variant: 'info',
    children: (
      <>
        <Paragraph>Content</Paragraph>
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
        
        <Paragraph>Content</Paragraph>
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
        
        <Paragraph>Content</Paragraph>
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
        
        <Paragraph>Content</Paragraph>
      </>
    ),
  },
};
