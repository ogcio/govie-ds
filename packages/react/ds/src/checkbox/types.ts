import { InputCheckboxSizeEnum } from '../input-checkbox/types.js';

import {
  InputCheckboxSizeEnumType,
  InputCheckboxProps,
} from '../input-checkbox/types.js';

export type CheckboxGroupProps = {
  size?: InputCheckboxSizeEnumType;
  groupId: string;
  inline?: boolean;
  onChange?: (items: string[]) => void;
};

/** @deprecated Use InputCheckboxSizeEnum instead */
//eslint-disable-next-line unicorn/prefer-export-from
export const CheckboxSizeEnum = InputCheckboxSizeEnum;

/** @deprecated Use InputCheckboxSizeEnumType instead */
export type CheckboxSizeEnumType = InputCheckboxSizeEnumType;

/** @deprecated Use InputCheckboxProps instead */
export type CheckboxProps = InputCheckboxProps;
