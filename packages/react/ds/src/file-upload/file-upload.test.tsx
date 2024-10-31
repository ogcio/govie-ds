import { render, cleanup } from '../test-utils.js';
import { FileUpload, FileUploadProps } from './file-upload.js';

describe('govieFileUpload', () => {
  afterEach(cleanup);

  const renderFileUpload = (props: FileUploadProps) =>
    render(<FileUpload {...props} />);

  it('should render the file upload input with the correct ID', () => {
    const { container } = renderFileUpload({
      id: 'file-upload-id',
    });
    const fileInput: HTMLInputElement =
      container.querySelector('#file-upload-id')!;

    expect(fileInput).toBeTruthy();
    expect(fileInput.id).toBe('file-upload-id');
    expect(fileInput.type).toBe('file');
  });

  it('should render the file upload with label', () => {
    const screen = renderFileUpload({
      id: 'file-upload-id',
      label: {
        text: 'Upload File',
        htmlFor: 'file-upload-id',
      },
    });
    const labelElement = screen.getByText('Upload File');
    expect(labelElement).toBeTruthy();
    expect(labelElement.tagName).toBe('LABEL');
  });

  it('should render the file upload with hint text', () => {
    const screen = renderFileUpload({
      id: 'file-upload-id',
      hint: {
        text: 'Hint: This is a helpful hint.',
      },
    });
    const hintElement = screen.getByText('Hint: This is a helpful hint.');
    expect(hintElement).toBeTruthy();
  });

  it('should render the file upload with error text', () => {
    const screen = renderFileUpload({
      id: 'file-upload-id',
      error: {
        text: 'Error: File must be smaller than 5MB.',
      },
    });
    const errorElement = screen.getByText(
      'Error: File must be smaller than 5MB.',
    );
    expect(errorElement).toBeTruthy();
  });

  it('should apply the correct "accept" file types', () => {
    const { container } = renderFileUpload({
      id: 'file-upload-id',
      accept: 'image/*',
    });
    const fileInput: HTMLInputElement =
      container.querySelector('#file-upload-id')!;

    expect(fileInput.accept).toBe('image/*');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderFileUpload({
      id: 'file-upload-id',
      label: {
        text: 'Upload File',
        htmlFor: 'file-upload-id',
      },
      hint: {
        text: 'Hint: This is a helpful hint.',
      },
      error: {
        text: 'Error: File must be smaller than 5MB.',
      },
    });

    await screen.axe();
  });
});
