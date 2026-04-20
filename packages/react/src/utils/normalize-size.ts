import type { Props as GiButtonProps } from '../atoms/Button';
import { Size } from '../atoms/utilities';
import type { ButtonSize } from '../button/types';

type GiButtonSize = NonNullable<GiButtonProps['size']>;

const SIZE_NORMALIZE_MAP: Record<ButtonSize, GiButtonSize> = {
  small: Size.SM,
  medium: Size.MD,
  large: Size.LG,
  sm: Size.SM,
  md: Size.MD,
  lg: Size.LG,
};

/**
 * Normalises the wrapper's wide size union into the atom's narrow
 * size vocabulary (`'sm' | 'md' | 'lg'`). Defaults to `'md'` when omitted.
 */
export const normalizeSize = (size: ButtonSize = Size.MD): GiButtonSize =>
  SIZE_NORMALIZE_MAP[size];
