import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { FormField } from '../forms/form-field.js';
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
    accept: '*/*',
  },
  render: (arguments_) => (
    <>
      <FormField
        id="file-upload-id"
        label={{
          text: 'Upload File',
          htmlFor: 'file-upload-id',
        }}
      >
        <FileUpload {...arguments_} />
      </FormField>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Upload File');
    expect(label).toBeTruthy();
    expect(label).toHaveClass('gi-label');
  },
};

export const WithLabelAndHint: Story = {
  args: {
    id: 'file-upload-id',
    accept: '*/*',
  },
  render: (arguments_) => (
    <>
      <FormField
        id="file-upload-id"
        label={{
          text: 'Upload File',
          htmlFor: 'file-upload-id',
        }}
        hint={{
          text: 'Hint: This is a helpful hint.',
        }}
      >
        <FileUpload {...arguments_} />
      </FormField>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Upload File');
    expect(label).toBeTruthy();
    expect(label).toHaveClass('gi-label');

    const hint = canvas.getByText('Hint: This is a helpful hint.');
    expect(hint).toBeTruthy();
    expect(hint).toHaveClass('gi-hint-text');
  },
};

export const WithLabelAndError: Story = {
  args: {
    id: 'file-upload-id',
    accept: '.pdf, .docx',
  },
  render: (arguments_) => (
    <>
      <FormField
        id="file-upload-id"
        label={{
          text: 'Upload File',
          htmlFor: 'file-upload-id',
        }}
        error={{
          text: 'Error: File must be smaller than 5MB.',
        }}
      >
        <FileUpload {...arguments_} />
      </FormField>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Upload File');
    expect(label).toBeTruthy();
    expect(label).toHaveClass('gi-label');

    const error = canvas.getByText('Error: File must be smaller than 5MB.');
    expect(error).toBeTruthy();
    expect(error).toHaveClass('gi-error-text');
  },
};

export const WithPDFAndDocxOnly: Story = {
  args: {
    id: 'file-upload-id',
    accept: '.pdf, .docx',
  },
  render: (arguments_) => (
    <>
      <FormField
        id="file-upload-id"
        label={{
          text: 'Upload File',
          htmlFor: 'file-upload-id',
        }}
      >
        <FileUpload data-testid={'file-upload-id'} {...arguments_} />
      </FormField>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fileInput = canvas.getByTestId('file-upload-id') as HTMLInputElement;
    expect(fileInput.accept).toBe('.pdf, .docx');
  },
};
