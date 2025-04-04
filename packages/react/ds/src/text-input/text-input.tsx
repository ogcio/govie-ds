'use client';

import { InputText } from '../input-text/input-text.js';
import type { InputTextProps } from '../input-text/type.js';

/**
 * @deprecated Use `<InputText />` instead of `<TextInput />`.
 */
export const TextInput = InputText;
/** @deprecated Use InputTextProps instead */
export type TextInputProps = InputTextProps;

TextInput.displayName = 'TextInput';
