import _ from 'lodash';
import { Align, AlignItems, Breakpoint, Justify, Size, Whitespace } from './constants';
import type { BreakpointKey, ResponsiveValue } from './constants';
export const getSize = (x: (typeof Size)[keyof typeof Size] | undefined) => clamp(x, Size, Size.MD);
export const getWhitespace = (x: (typeof Whitespace)[keyof typeof Whitespace] | undefined) => clamp(x, Whitespace, Whitespace.NORMAL);
export const getAlign = (x: (typeof Align)[keyof typeof Align] | undefined) => clamp(x, Align, Align.START);
export const getAlignItems = (x: (typeof AlignItems)[keyof typeof AlignItems] | undefined) => clamp(x, AlignItems, AlignItems.START);
export const getJustify = (x: (typeof Justify)[keyof typeof Justify] | undefined) => clamp(x, Justify, Justify.START);

/**
 * Validates a string value against an `as const` enum object.
 * Returns the value if it matches one of the allowed options,
 * otherwise falls back to the provided default.
 *
 * Example:
 * const Size = { SM: 'sm', MD: 'md', LG: 'lg' } as const;
 *
 * clamp('sm', Size, Size.MD);
 * //"sm"
 *
 * clamp('invalid', Size, Size.MD);
 * //"md"
 *
 */
export function clamp<T extends Record<string, string>>(value: string | undefined, options: T, defaultValue: T[keyof T]): T[keyof T] {
  const allowed = _.values(options) as T[keyof T][];
  return value !== undefined && allowed.includes(value as T[keyof T]) ? value as T[keyof T] : defaultValue;
}

/**
 * Generates a Tailwind class string from a responsive value.
 * The `xs` breakpoint passes `undefined` as `bp` to the callback,
 * matching Tailwind's mobile-first approach where unprefixed classes
 * apply from zero up.
 *
 * Example:
 * const toGap = (n: number, bp?: string) => bp ? `${bp}:gi-gap-${n}` : `gi-gap-${n}`;
 *
 * resolveResponsive(4, toGap);
 * //"gi-gap-4"
 *
 * resolveResponsive({ xs: 2, md: 4, xl: 8 }, toGap);
 * //"gi-gap-2 md:gi-gap-4 xl:gi-gap-8"
 */
export const resolveResponsive = <T,>(value: ResponsiveValue<T>, toClass: (val: T, bp?: BreakpointKey) => string): string => {
  if (!_.isPlainObject(value)) {
    return toClass(value as T);
  }
  const responsive = value as Partial<Record<BreakpointKey, T>>;
  return _.reduce(_.values(Breakpoint), (result, bp) => {
    if (bp in responsive) {
      const cls = toClass(responsive[bp] as T, bp === Breakpoint.XS ? undefined : bp);
      return result ? `${result} ${cls}` : cls;
    }
    return result;
  }, '');
}