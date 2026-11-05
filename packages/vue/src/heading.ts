import { Size } from './atoms/heading/types';
import type { ValueOf } from './atoms/constants';

export const HeadingSize = Size;
export type HeadingSize = ValueOf<typeof HeadingSize>;

export type Props = {
  size?: HeadingSize;
};
