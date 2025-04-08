import { InputCheckboxSizeEnumType } from '../input-checkbox/types.js';

export type InputCheckboxGroupProps = {
  size?: InputCheckboxSizeEnumType;
  groupId: string;
  inline?: boolean;
  onChange?: (items: string[]) => void;
};
