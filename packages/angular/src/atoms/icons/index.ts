import { IconSize } from './types';
export { default as Close } from './Close';
export { default as Visibility } from './Visibility';
export { default as VisibilityOff } from './VisibilityOff';
export { default as KeyboardArrowLeft } from './KeyboardArrowLeft';
export { default as KeyboardArrowRight } from './KeyboardArrowRight';
export { default as KeyboardArrowDown } from './KeyboardArrowDown';
export { default as KeyboardArrowUp } from './KeyboardArrowUp';
export { default as ArrowLeft } from './ArrowLeft';
export { default as ArrowRight } from './ArrowRight';
export { default as FirstPage } from './FirstPage';
export { default as LastPage } from './LastPage';
export { default as Info } from './Info';
export { default as Error } from './Error';
export { default as Warning } from './Warning';
export { default as CheckCircle } from './CheckCircle';
export const SIZE_MAP: Record<IconSize, string> = {
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px'
};
export * from './types'