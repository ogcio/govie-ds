'use client';

import { SelectNative } from './select-native.js';
export { SelectGroupItem, SelectItem } from './select-native.js';

/**
 * @deprecated Use `<SelectNext />` instead of `<Select />`.
 */
export const Select = SelectNative;

Select.displayName = 'Select';
