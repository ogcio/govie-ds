import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { expect, within } from 'storybook/test';
import { createFormField } from '../helpers/forms';
import { InputFileProps } from './types';

const meta: Meta<InputFileProps> = {
  title: 'Form/InputFile',
};

export default meta;
type Story = StoryObj<InputFileProps>;

const createFileUpload = (arguments_: InputFileProps) => {
  const formField = createFormField(arguments_);

  const container = document.createElement('div');
  container.className =
    `${arguments_.className || ''} gi-input-text-container`.trim();

  const input = document.createElement('input') as HTMLInputElement;
  input.type = 'file';
  input.className = `gi-input-file-input `.trim();

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

  return formField;
};

const createElement = (arguments_: InputFileProps) => {
  const component = createFileUpload(arguments_);

  return parse(component.outerHTML) as React.ReactElement;
};

export const Default: Story = {
  args: {
    id: 'input-file-id',
    label: {
      content: 'Upload File',
      htmlFor: 'input-file-id',
      size: 'md',
    },
    dataTestId: 'input-id',
    accept: '*/*',
  },
  render: (arguments_) => createElement(arguments_),
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
    id: 'input-file-id',
    label: {
      content: 'Upload File',
      htmlFor: 'input-file-id',
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
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textInput = canvas.getByTestId('input-id') as HTMLInputElement;
    expect(globalThis.window.getComputedStyle(textInput).borderColor).toBe(
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
    id: 'input-file-id',
    label: {
      content: 'Upload File',
      htmlFor: 'input-file-id',
      size: 'md',
    },
    dataTestId: 'input-id',
    accept: '.pdf, .docx',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const textInput = canvas.getByTestId('input-id') as HTMLInputElement;
    expect(textInput).toHaveAttribute('accept', '.pdf, .docx');
  },
};

export const WithUploadedFilesTable: Story = {
  args: {
    id: 'input-file-upload-list',
    label: {
      content: 'Upload Files',
      htmlFor: 'input-file-upload-list',
      size: 'md',
    },
    dataTestId: 'input-upload-files',
    accept: '*/*',
  },
  render: (arguments_) => {
    const component = createFileUpload({
      ...arguments_,
      className: 'gi-w-full md:gi-w-[400px]',
    });

    const baseHtml = component.outerHTML;

    const temporary = document.createElement('div');
    temporary.innerHTML = baseHtml;
    const formElement = temporary.firstElementChild!;

    const table = document.createElement('table');
    table.className = 'gi-table gi-table-auto';
    table.id = 'uploaded-files-table';

    table.innerHTML = `
      <thead>
        <tr>
          <th class="gi-table-th gi-text-left gi-align-middle">Name</th>
          <th class="gi-table-th gi-text-left gi-align-middle">Size</th>
          <th class="gi-table-th gi-text-left gi-align-middle">Type</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="gi-table-td gi-text-left gi-align-middle">signed_form.pdf</td>
          <td class="gi-table-td gi-text-left gi-align-middle">378 KB</td>
          <td class="gi-table-td gi-text-left gi-align-middle">application/pdf</td>
        </tr>
        <tr>
          <td class="gi-table-td gi-text-left gi-align-middle">id_scan.pdf</td>
          <td class="gi-table-td gi-text-left gi-align-middle">238 KB</td>
          <td class="gi-table-td gi-text-left gi-align-middle">application/pdf</td>
        </tr>
      </tbody>
    `;

    formElement.append(table);

    return parse(formElement.outerHTML);
  },
};
