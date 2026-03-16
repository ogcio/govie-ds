import { IconSize } from './types';
export { default as KeyboardArrowDown } from './KeyboardArrowDown';
export { default as KeyboardArrowUp } from './KeyboardArrowUp';
export { default as Close } from './Close';
export { default as Visibility } from './Visibility';
export { default as VisibilityOff } from './VisibilityOff';
export { default as Warning } from './Warning';
export { default as CheckCircle } from './CheckCircle';
export { default as Error } from './Error';
export { default as Info } from './Info';
export { default as ChevronLeft } from './ChevronLeft';
export { default as ChevronRight } from './ChevronRight';

/** utilities for atomic icons */

export const SIZE_MAP: Record<IconSize, string> = {
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px'
};

/** ************************** */

export * from './types'