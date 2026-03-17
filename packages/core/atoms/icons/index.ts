import { IconSize } from './types';

export { default as KeyboardArrowDown } from './KeyboardArrowDown.lite';
export { default as KeyboardArrowUp } from './KeyboardArrowUp.lite';
export { default as Close } from './Close.lite';
export { default as Visibility } from './Visibility.lite';
export { default as VisibilityOff } from './VisibilityOff.lite';
export { default as KeyboardArrowLeft } from './KeyboardArrowLeft.lite';
export { default as KeyboardArrowRight } from './KeyboardArrowRight.lite';
export { default as ArrowLeftAlt } from './ArrowLeftAlt.lite';
export { default as ArrowRightAlt } from './ArrowRightAlt.lite';
export { default as FirstPage } from './FirstPage.lite';
export { default as LastPage } from './LastPage.lite';

/** utilities for atomic icons */

export const SIZE_MAP: Record<IconSize, string> = {
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
};

/** ************************** */

export * from './types';
