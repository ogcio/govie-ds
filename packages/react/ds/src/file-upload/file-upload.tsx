import { InputFile } from '../input-file/input-file.js';
import type { InputFileProps } from '../input-file/types.js';

/**
 * @deprecated Use FileUploadProps instead of `Radio`.
 */
export type FileUploadProps = InputFileProps;

/**
 * @deprecated Use <InputFile /> instead of <FileUpload />.
 */
export const FileUpload = InputFile;

FileUpload.displayName = 'FileUpload';
