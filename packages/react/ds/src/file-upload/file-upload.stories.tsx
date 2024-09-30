import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './file-upload.js';

const meta = {
  title: 'Form/FileUpload',
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
  component: FileUpload,
  argTypes: {
    label: {
      description: 'Label associated with the input field',
      control: 'object',
      table: {
        category: 'Label',
        type: { summary: 'Label' },
      },
    },
    hint: {
      description: 'Hint text for additional guidance.',
      control: 'object',
      table: {
        category: 'Hint',
        type: { summary: 'HintText' },
      },
    },
    error: {
      description: 'Error message displayed during validation errors.',
      control: 'object',
      table: {
        category: 'Error',
        type: { summary: 'ErrorText' },
      },
    },
    ref: {
      control: false,
      table: {
        category: 'Ref',
        type: { summary: 'React.Ref<HTMLInputElement>' },
      },
    },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'file-upload-id',
    label: {
      children: 'Upload File',
      htmlFor: 'file-upload-id',
    },
    hint: {
      children: '',
    },
    error: {
      children: '',
    },
  },
};

export const WithLabelAndHint: Story = {
  args: {
    id: 'file-upload-id',
    label: {
      children: 'Upload File',
      htmlFor: 'file-upload-id',
    },
    hint: {
      children: 'Hint: This is a helpful hint.',
    },
  },
};

export const WithLabelAndError: Story = {
  args: {
    id: 'file-upload-id',
    label: {
      children: 'Upload File',
      htmlFor: 'file-upload-id',
    },
    error: {
      children: 'Error: File must be smaller than 5MB.',
    },
  },
};
