import { Size } from '../atoms/utilities';

type AtomSize = (typeof Size)[keyof typeof Size];

const SIZE_NORMALIZE_MAP = {
  small: Size.SM,
  medium: Size.MD,
  large: Size.LG,
  extraLarge: Size.XL,
  sm: Size.SM,
  md: Size.MD,
  lg: Size.LG,
  xl: Size.XL,
} as const;

export type ComponentSize = keyof typeof SIZE_NORMALIZE_MAP;

/**
 * Normalises a wrapper's wide size union into the atom's narrow
 * size vocabulary (`'sm' | 'md' | 'lg' | 'xl'`). Defaults to `'md'` when omitted.
 */
export const normalizeSize = (size: ComponentSize = Size.MD): AtomSize =>
  SIZE_NORMALIZE_MAP[size];
