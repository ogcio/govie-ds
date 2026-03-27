import { InputCheckboxSizeEnumType } from '../input-checkbox/types.js';

export type InputCheckboxGroupProps = {
  size?: InputCheckboxSizeEnumType;
  groupId: string;
  inline?: boolean;
  values?: string[];
  onChange?: (items: string[]) => void;
};
