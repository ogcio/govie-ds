import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createFormField } from '../helpers/forms';
import { beautifyHtmlNode } from '../storybook/storybook';
import { FileUploadProps } from './types';

const meta: Meta<FileUploadProps> = {
  title: 'Form/FileUpload',
};

export default meta;
type Story = StoryObj<FileUploadProps>;

const createFileUpload = (arguments_: FileUploadProps) => {
  const formField = createFormField(arguments_);

  const container = document.createElement('div');
  container.className =
    `${arguments_.className || ''} gi-text-input-container`.trim();

  const input = document.createElement('input') as HTMLInputElement;
  input.type = 'file';
  input.className = `gi-file-upload-input `.trim();

  if (arguments_.id) {
    input.id = arguments_.id;
  }
  if (arguments_.name) {
    input.name = arguments_.name;
  }
  if (arguments_.placeholder) {
    input.placeholder = arguments_.placeholder;
  }
  if (arguments_.dataTestId) {
    input.dataset.testid = arguments_.dataTestId;
  }
  if (arguments_.disabled) {
    input.disabled = true;
  }
  if (arguments_.accept) {
    input.accept = arguments_.accept;
  }

  container.append(input);
  formField.append(container);

  return beautifyHtmlNode(formField);
};

export const Default: Story = {
  args: {
    id: 'file-upload-id',
    label: {
      content: 'Upload File',
      for: 'file-upload-id',
      size: 'md',
    },
    dataTestId: 'input-id',
    accept: '*/*',
  },
  render: (arguments_) => createFileUpload(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textInput = canvas.getByTestId('input-id') as HTMLInputElement;
    expect(textInput).toHaveAttribute('type', 'file');

    const label = canvas.getByText('Upload File');
    expect(label).toBeTruthy();
    expect(label).toHaveClass('gi-label');
    expect(label.getAttribute('for')).toBe(textInput.getAttribute('id'));
  },
};

export const WithLabelHintAndError: Story = {
  args: {
    id: 'file-upload-id',
    label: {
      content: 'Upload File',
      for: 'file-upload-id',
      size: 'md',
    },
    error: {
      content: 'Error: File must be smaller than 5MB.',
    },
    hint: {
      content: 'Hint: Please upload a file that is less than 5MB.',
    },
    dataTestId: 'input-id',
    accept: '.pdf, .docx',
  },
  render: (arguments_) => createFileUpload(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textInput = canvas.getByTestId('input-id') as HTMLInputElement;
    expect(window.getComputedStyle(textInput).borderColor).toBe(
      'rgb(187, 37, 13)',
    );

    const label = canvas.getByText('Upload File');
    expect(label).toBeTruthy();
    expect(label).toHaveClass('gi-label');
    expect(label.getAttribute('for')).toBe(textInput.getAttribute('id'));

    const hint = canvas.getByText(
      'Hint: Please upload a file that is less than 5MB.',
    );
    expect(hint).toBeTruthy();
    expect(hint).toHaveClass('gi-hint-text');

    const error = canvas.getByText('Error: File must be smaller than 5MB.');
    expect(error).toBeTruthy();
    expect(error).toHaveClass('gi-error-text');
  },
};

export const WithPDFAndDocxOnly: Story = {
  args: {
    id: 'file-upload-id',
    label: {
      content: 'Upload File',
      for: 'file-upload-id',
      size: 'md',
    },
    dataTestId: 'input-id',
    accept: '.pdf, .docx',
  },
  render: (arguments_) => createFileUpload(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textInput = canvas.getByTestId('input-id') as HTMLInputElement;
    expect(textInput).toHaveAttribute('accept', '.pdf, .docx');
  },
};
