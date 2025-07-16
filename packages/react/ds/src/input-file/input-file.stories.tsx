import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import {
  FormField,
  FormFieldError,
  FormFieldHint,
  FormFieldLabel,
} from '../forms/form-field/form-field.js';
import { IconButton } from '../icon-button/icon-button.js';
import { TableBody } from '../table/table-body.js';
import { TableData } from '../table/table-data.js';
import { TableHead } from '../table/table-head.js';
import { TableHeader } from '../table/table-header.js';
import { TableRow } from '../table/table-row.js';
import { Table } from '../table/table.js';
import { InputFile } from './input-file.js';

const meta = {
  title: 'Form/InputFile',
  parameters: {
    docs: {
      description: {
        component:
          'Use the input file component to allow users to upload files. It includes options for adding labels, hint text, and error messages.',
      },
    },
  },
  component: InputFile,
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
} satisfies Meta<typeof InputFile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'file-upload-id',
    accept: '*/*',
  },
  render: (arguments_) => (
    <FormField id="file-upload-id">
      <FormFieldLabel htmlFor="file-upload-id">Upload File</FormFieldLabel>
      <InputFile {...arguments_} />
    </FormField>
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
    <FormField id="file-upload-id">
      <FormFieldLabel htmlFor="file-upload-id">Upload File</FormFieldLabel>
      <FormFieldHint>Hint: This is a helpful hint.</FormFieldHint>
      <InputFile {...arguments_} />
    </FormField>
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
    <FormField id="file-upload-id">
      <FormFieldLabel htmlFor="file-upload-id">Upload File</FormFieldLabel>
      <InputFile {...arguments_} />
      <FormFieldError>Error: File must be smaller than 5MB.</FormFieldError>
    </FormField>
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
    <FormField id="file-upload-id">
      <FormFieldLabel htmlFor="file-upload-id">Upload File</FormFieldLabel>
      <InputFile data-testid={'file-upload-id'} {...arguments_} />
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fileInput = canvas.getByTestId('file-upload-id') as HTMLInputElement;
    expect(fileInput.accept).toBe('.pdf, .docx');
  },
};

export const WithListOfUploadedFiles: Story = {
  args: {
    id: 'file-upload-id',
    accept: '*/*',
  },
  render: (arguments_) => (
    <FormField id="file-upload-id" className="gi-w-full md:gi-w-[400px]">
      <FormFieldLabel htmlFor="file-upload-id">Upload File</FormFieldLabel>
      <InputFile {...arguments_} />
      <Table layout="auto" noBorder>
        <TableHead>
          <TableRow>
            <TableHeader>Uploaded file</TableHeader>
            <TableHeader className="gi-hidden md:gi-table-cell">
              File size
            </TableHeader>
            <TableHeader className="gi-w-32">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableData>
              signed_form.pdf
              <span className="gi-inline md:gi-hidden">
                <br />
                378 Kb
              </span>
            </TableData>
            <TableData className="gi-hidden md:gi-table-cell">378 Kb</TableData>
            <TableData>
              <IconButton
                {...{
                  icon: {
                    icon: 'download',
                  },
                  onClick: () => {},
                  variant: 'flat',
                  appearance: 'dark',
                  size: 'large',
                  className: '!gi-inline-flex',
                }}
              />
              <IconButton
                {...{
                  icon: {
                    icon: 'delete',
                  },
                  onClick: () => {},
                  variant: 'flat',
                  appearance: 'dark',
                  size: 'large',
                  className: '!gi-inline-flex',
                }}
              />
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>
              id_scan.pdf{' '}
              <span className="gi-inline md:gi-hidden">
                <br />
                238 Kb
              </span>
            </TableData>
            <TableData className="gi-hidden md:gi-table-cell">238 Kb</TableData>
            <TableData>
              <IconButton
                {...{
                  icon: {
                    icon: 'download',
                  },
                  onClick: () => {},
                  variant: 'flat',
                  appearance: 'dark',
                  size: 'large',
                  className: '!gi-inline-flex',
                }}
              />
              <IconButton
                {...{
                  icon: {
                    icon: 'delete',
                  },
                  onClick: () => {},
                  variant: 'flat',
                  appearance: 'dark',
                  size: 'large',
                  className: '!gi-inline-flex',
                }}
              />
            </TableData>
          </TableRow>
        </TableBody>
      </Table>
    </FormField>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Upload File');
    expect(label).toBeTruthy();
    expect(label).toHaveClass('gi-label');
  },
};
