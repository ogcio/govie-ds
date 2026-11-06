import * as constants from './atoms/constants';
import type { ValueOf } from './atoms/constants';

export const Size = constants.Size;
export type Size = ValueOf<typeof Size>;

export const Whitespace = constants.Whitespace;
export type Whitespace = ValueOf<typeof Whitespace>;

export const Align = constants.Align;
export type Align = ValueOf<typeof Align>;
