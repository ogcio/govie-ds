import _ from 'lodash';
export const Size = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl'
} as const;
export const Whitespace = {
  NORMAL: 'normal',
  PRE: 'pre',
  PRE_WRAP: 'pre-wrap',
  BREAK_SPACES: 'break-spaces'
} as const;
export const Align = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  JUSTIFY: 'justify'
} as const;
export const Variant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  FLAT: 'flat'
} as const;
export const Appearance = {
  DEFAULT: 'default',
  DARK: 'dark',
  LIGHT: 'light'
} as const;
export const getSize = (x: (typeof Size)[keyof typeof Size] = Size.MD) => Object.values(Size).includes(x) ? x : Size.MD;
export const getWhitespace = (x: (typeof Whitespace)[keyof typeof Whitespace] = Whitespace.NORMAL) => Object.values(Whitespace).includes(x) ? x : Whitespace.NORMAL;
export const getAlign = (x: (typeof Align)[keyof typeof Align] = Align.START) => Object.values(Align).includes(x) ? x : Align.START;
export const Direction = {
  ROW: 'row',
  COLUMN: 'column'
} as const;
export const AlignItems = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  STRETCH: 'stretch',
  BASELINE: 'baseline'
} as const;
export const Justify = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  BETWEEN: 'between',
  AROUND: 'around',
  EVENLY: 'evenly'
} as const;
export const Breakpoint = {
  XS: 'xs',
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
  XL: 'xl',
  '2XL': '2xl'
} as const;
export const getAlignItems = (x: (typeof AlignItems)[keyof typeof AlignItems] = AlignItems.START) => Object.values(AlignItems).includes(x) ? x : AlignItems.START;
export const getJustify = (x: (typeof Justify)[keyof typeof Justify] = Justify.START) => Object.values(Justify).includes(x) ? x : Justify.START;
export type BreakpointKey = (typeof Breakpoint)[keyof typeof Breakpoint];
export type ResponsiveValue<T> = T | Partial<Record<BreakpointKey, T>>;
const breakpointKeys: BreakpointKey[] = _.values(Breakpoint);
const baseBreakpoint: BreakpointKey = Breakpoint.XS;

/**
 * Generates a Tailwind class string from a responsive value.
 * The `xs` breakpoint is treated as the base (unprefixed), matching Tailwind's
 * mobile-first approach where unprefixed classes apply from zero up.
 */
export const resolveResponsive = <T extends string | number,>(value: ResponsiveValue<T>, classPrefix: string): string => {
  if (!_.isPlainObject(value)) {
    return `${classPrefix}-${value}`;
  }
  const responsive = value as Partial<Record<BreakpointKey, T>>;
  const results: string[] = [];
  for (const breakpoint of breakpointKeys) {
    const breakpointValue = responsive[breakpoint];
    if (breakpointValue !== undefined) {
      if (breakpoint === baseBreakpoint) {
        results.push(`${classPrefix}-${breakpointValue}`);
      } else {
        results.push(`${breakpoint}:${classPrefix}-${breakpointValue}`);
      }
    }
  }
  return results.join(' ');
};

/**
 * Builds a tv() variant key map from a responsive value.
 * Expects a PascalCase `variantName` (e.g. `'Direction'`).
 * The `xs` breakpoint maps to the base key via lowerFirst (`direction`),
 * while other breakpoints produce prefixed keys (`mdDirection`, `lgDirection`).
 */
export const resolveResponsiveVariants = <T,>(value: ResponsiveValue<T>, variantName: string): Record<string, T> => {
  if (!_.isPlainObject(value)) {
    return {
      [_.lowerFirst(variantName)]: value as T
    };
  }
  const result: Record<string, T> = {};
  for (const breakpoint of breakpointKeys) {
    const breakpointValue = (value as Partial<Record<BreakpointKey, T>>)[breakpoint];
    if (breakpointValue !== undefined) {
      if (breakpoint === baseBreakpoint) {
        result[_.lowerFirst(variantName)] = breakpointValue;
      } else {
        result[`${breakpoint}${variantName}`] = breakpointValue;
      }
    }
  }
  return result;
}