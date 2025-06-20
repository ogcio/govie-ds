import { TextInputProps } from '../input-text/types';

export type InputPasswordProps = Omit<
  TextInputProps,
  'type' | 'inputActionButton' | 'prefix' | 'suffix' | 'iconStart' | 'iconEnd'
>;
