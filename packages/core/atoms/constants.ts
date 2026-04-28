export type BreakpointKey = (typeof Breakpoint)[keyof typeof Breakpoint];

export type ResponsiveValue<T> = T | Partial<Record<BreakpointKey, T>>;

export const Size = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
} as const;

export const Whitespace = {
  NORMAL: 'normal',
  PRE: 'pre',
  PRE_WRAP: 'pre-wrap',
  BREAK_SPACES: 'break-spaces',
} as const;

export const Align = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  JUSTIFY: 'justify',
} as const;

export const Variant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  FLAT: 'flat',
} as const;

export const Appearance = {
  DEFAULT: 'default',
  DARK: 'dark',
  LIGHT: 'light',
} as const;

export const Direction = {
  ROW: 'row',
  COLUMN: 'column',
} as const;

export const AlignItems = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  STRETCH: 'stretch',
  BASELINE: 'baseline',
} as const;

export const Justify = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  BETWEEN: 'between',
  AROUND: 'around',
  EVENLY: 'evenly',
} as const;

export const Breakpoint = {
  BASE: 'base',
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl',
} as const;
