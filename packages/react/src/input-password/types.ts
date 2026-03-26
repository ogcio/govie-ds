import type { InputTextProps } from '../input-text/type.js';

export type InputPasswordProps = Omit<
  InputTextProps,
  'type' | 'inputActionButton' | 'prefix' | 'suffix' | 'iconStart' | 'iconEnd'
>;
