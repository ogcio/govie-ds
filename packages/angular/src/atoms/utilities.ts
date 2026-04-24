import _ from 'lodash';
import { AlignItems, Align, Breakpoint, Justify, Size, Whitespace } from './constants';
import type { BreakpointKey, ResponsiveValue } from './constants';
export const getSize = (x: (typeof Size)[keyof typeof Size] = Size.MD) => Object.values(Size).includes(x) ? x : Size.MD;
export const getWhitespace = (x: (typeof Whitespace)[keyof typeof Whitespace] = Whitespace.NORMAL) => Object.values(Whitespace).includes(x) ? x : Whitespace.NORMAL;
export const getAlign = (x: (typeof Align)[keyof typeof Align] = Align.START) => Object.values(Align).includes(x) ? x : Align.START;
export const getAlignItems = (x: (typeof AlignItems)[keyof typeof AlignItems] = AlignItems.START) => Object.values(AlignItems).includes(x) ? x : AlignItems.START;
export const getJustify = (x: (typeof Justify)[keyof typeof Justify] = Justify.START) => Object.values(Justify).includes(x) ? x : Justify.START;
const breakpointKeys: BreakpointKey[] = _.values(Breakpoint);
const baseBreakpoint: BreakpointKey = Breakpoint.XS;

/**
 * Generates a Tailwind class string from a responsive value.
 * The `xs` breakpoint passes `undefined` as `bp` to the callback,
 * matching Tailwind's mobile-first approach where unprefixed classes
 * apply from zero up.
 */
export const resolveResponsive = <T,>(value: ResponsiveValue<T>, toClass: (val: T, bp?: BreakpointKey) => string): string => {
  if (!_.isPlainObject(value)) {
    return toClass(value as T);
  }
  const responsive = value as Partial<Record<BreakpointKey, T>>;
  return breakpointKeys.filter(bp => bp in responsive).map(bp => toClass(responsive[bp] as T, bp === baseBreakpoint ? undefined : bp)).join(' ');
}