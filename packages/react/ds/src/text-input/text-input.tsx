'use client';

import { InputText } from '../input-text/input-text.js';
import type { InputProps } from '../input-text/type.js';

/**
 * @deprecated Use `<Input />` instead of `<TextInput />`.
 */
export const TextInput = InputText;
export type TextInputProps = InputProps;

TextInput.displayName = 'TextInput';
