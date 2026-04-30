import _ from 'lodash';
import { Align, AlignItems, Breakpoint, Justify, Size, Whitespace } from './constants';
import type { BreakpointKey, ResponsiveValue } from './constants';

export const getSize = (x: (typeof Size)[keyof typeof Size] | undefined) => clamp(x, Size, Size.MD);

export const getWhitespace = (x: (typeof Whitespace)[keyof typeof Whitespace] | undefined) =>
  clamp(x, Whitespace, Whitespace.NORMAL);

export const getAlign = (x: (typeof Align)[keyof typeof Align] | undefined) => clamp(x, Align, Align.START);

export const getAlignItems = (x: (typeof AlignItems)[keyof typeof AlignItems] | undefined) =>
  clamp(x, AlignItems, AlignItems.START);

export const getJustify = (x: (typeof Justify)[keyof typeof Justify] | undefined) => clamp(x, Justify, Justify.START);

/**
 * Validates a string value against an `as const` enum object.
 * Returns the value if it matches, otherwise falls back to the default.
 */
export function clamp<T extends Record<string, string>>(
  value: string | undefined,
  options: T,
  defaultValue: T[keyof T],
): T[keyof T] {
  return _.includes(_.values(options), value) ? (value as T[keyof T]) : defaultValue;
}

/**
 * Converts a responsive value into a breakpoint-prefixed Tailwind class string.
 * The `prefix` param is ready to concatenate (`""` for base, `"md:"` for md, etc.).
 */
export const resolveResponsive = <T>(
  value: ResponsiveValue<T>,
  toClass: (value: T, prefix: string) => string,
): string => {
  if (!_.isPlainObject(value)) {
    return toClass(value as T, '');
  }

  const responsive = value as Partial<Record<BreakpointKey, T>>;
  return _.values(Breakpoint)
    .filter((bp) => bp in responsive)
    .map((bp) => toClass(responsive[bp] as T, bp === Breakpoint.BASE ? '' : `${bp}:`))
    .join(' ');
};
