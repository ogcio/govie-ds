import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './file-upload.js';

const meta = {
  title: 'Form/FileUpload',
  parameters: {
    docs: {
      description: {
        component:
          'Use the file upload component to allow users to upload files. It includes options for adding labels, hint text, and error messages.',
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
    accept: {
      description:
        'Defines the file types that the input should accept. For example: ".png, .jpg, image/*".',
      control: 'text',
      table: {
        category: 'Attributes',
        type: { summary: 'string' },
        defaultValue: { summary: '*/*' },
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
      text: 'Upload File',
      htmlFor: 'file-upload-id',
    },
    hint: {
      text: '',
    },
    error: {
      text: '',
    },
    accept: '*/*',
  },
};

export const WithLabelAndHint: Story = {
  args: {
    id: 'file-upload-id',
    label: {
      text: 'Upload File',
      htmlFor: 'file-upload-id',
    },
    hint: {
      text: 'Hint: This is a helpful hint.',
    },
    accept: '*/*',
  },
};

export const WithLabelAndError: Story = {
  args: {
    id: 'file-upload-id',
    label: {
      text: 'Upload File',
      htmlFor: 'file-upload-id',
    },
    error: {
      text: 'Error: File must be smaller than 5MB.',
    },
    accept: '.pdf, .docx',
  },
};

export const WithPDFAndDocxOnly: Story = {
  args: {
    id: 'file-upload-id',
    label: {
      text: 'Upload File',
      htmlFor: 'file-upload-id',
    },
    accept: '.pdf, .docx',
  },
};
