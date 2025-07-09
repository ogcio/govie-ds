import { InputCheckboxTableCellProps } from '../input-checkbox/types.js';
import { InputTextTableCellProps } from '../input-text/type.js';
import { SelectNativeTableCellProps } from '../select/types.js';

export type EditorTableCellConfig =
  | {
      type: 'text';
      props?: InputTextTableCellProps;
    }
  | {
      type: 'select';
      props?: SelectNativeTableCellProps;
    }
  | {
      type: 'checkbox';
      props?: InputCheckboxTableCellProps;
    };

export type EditorTableCellProps<T> = {
  value: any;
  rowIndex: number;
  columnId: string;
  setData: (updater: (old: T[]) => T[]) => void;
  editor: EditorTableCellConfig;
};
