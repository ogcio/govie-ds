import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './file-upload.html?raw';
import { FileUploadProps } from './file-upload.schema';

const path = import.meta.url.split('/file-upload')[0];

const macro = { name: 'govieFileUpload', html, path };
const FileUpload = renderComponent<FileUploadProps>(macro);

const meta = {
  title: 'Form/FileUpload',
  parameters: {
    macro,
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
      description: 'Label associated with the input field.',
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
      description: 'Error message displayed when there is a validation error.',
      control: 'object',
      table: {
        category: 'Error',
        type: { summary: 'ErrorText' },
      },
    },
    accept: {
      description:
        'Accepted file types for the file upload (e.g., image/*, application/pdf).',
      control: 'text',
      table: {
        category: 'File Type',
        type: { summary: 'string' },
        defaultValue: { summary: '*/*' },
      },
    },
    id: {
      description: 'Sets the unique ID for the file input field.',
      control: 'text',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
        defaultValue: { summary: 'file-upload-id' },
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
      content: 'Upload File',
      for: 'file-upload-id',
    },
    hint: {
      content: '',
    },
    error: {
      content: '',
    },
    accept: '*/*'
  },
};

export const WithLabelAndHint: Story = {
  args: {
    id: 'file-upload-id',
    label: {
      content: 'Upload File',
      for: 'file-upload-id',
    },
    hint: {
      content: 'Hint: Please upload a file that is less than 5MB.',
    },
    accept: '*/*'
  },
};

export const WithLabelAndError: Story = {
  args: {
    id: 'file-upload-id',
    label: {
      content: 'Upload File',
      for: 'file-upload-id',
    },
    error: {
      content: 'Error: File must be smaller than 5MB.',
    },
    accept: '.pdf, .docx'
  },
};

export const WithPDFAndDocxOnly: Story = {
  args: {
    id: 'file-upload-id',
    label: {
      content: 'Upload File',
      for: 'file-upload-id',
    },
    accept: '.pdf, .docx',
  },
};
