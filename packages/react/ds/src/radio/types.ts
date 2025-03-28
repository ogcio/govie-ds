import {
  InputRadioSizeType,
  InputRadioProps,
  InputRadioSizeEnum,
} from '../input-radio/types.js';

/** @deprecated Use InputRadioSizeType instead */
export type RadioSizeType = InputRadioSizeType;

/** @deprecated Use InputRadioProps instead */
export type RadioProps = InputRadioProps;

/** @deprecated Use InputRadioSizeEnum instead */
// eslint-disable-next-line unicorn/prefer-export-from
export const RadioSizeEnum = InputRadioSizeEnum;

export type RadioGroupProps = {
  groupId: string;
  inline?: boolean;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
};
