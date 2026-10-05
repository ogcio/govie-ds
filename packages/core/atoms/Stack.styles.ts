import { tv } from 'tailwind-variants';
import { Direction } from './constants';
import type { ResponsiveValue, SpacingScale, ValueOf } from './constants';
import { resolveResponsive } from './utilities';

export const getDirectionClasses = (direction: ResponsiveValue<ValueOf<typeof Direction>> | undefined): string =>
  resolveResponsive(direction ?? Direction.COLUMN, directionToClass);

export const getGapClasses = (gap: ResponsiveValue<SpacingScale> | undefined): string =>
  resolveResponsive(gap ?? 0, gapToClass);

// TODO: add twMerge to enable consumer `className` to override component-default utilities
export default tv({
  base: ['gi-flex'],
  variants: {
    align: {
      start: 'gi-items-start',
      center: 'gi-items-center',
      end: 'gi-items-end',
      stretch: 'gi-items-stretch',
      baseline: 'gi-items-baseline',
    },
    justify: {
      start: 'gi-justify-start',
      center: 'gi-justify-center',
      end: 'gi-justify-end',
      between: 'gi-justify-between',
      around: 'gi-justify-around',
      evenly: 'gi-justify-evenly',
    },
    wrap: {
      true: 'gi-flex-wrap',
      false: 'gi-flex-nowrap',
    },
  },
  defaultVariants: {
    align: 'start',
    justify: 'start',
    wrap: false,
  },
});

const directionToClass = (direction: string, prefix: string): string =>
  direction === 'row' ? `${prefix}gi-flex-row` : `${prefix}gi-flex-col`;

const gapToClass = (gap: SpacingScale, prefix: string): string => `${prefix}gi-gap-${gap}`;
