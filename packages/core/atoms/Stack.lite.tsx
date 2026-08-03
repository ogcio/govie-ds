import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import { Direction } from './constants';
import type { AlignItems, Justify, ResponsiveValue, ValueOf } from './constants';
import type { Props as BoxProps } from './Box.lite';
import { getAlignItems, getJustify, resolveResponsive } from './utilities';
import GiBox from './Box.lite';

useMetadata({ angular: { selector: 'gi-stack' } });

export type Props = {
  direction?: ResponsiveValue<ValueOf<typeof Direction>>;
  gap?: ResponsiveValue<number>;
  align?: ValueOf<typeof AlignItems>;
  justify?: ValueOf<typeof Justify>;
  wrap?: boolean;
} & BoxProps;

export default function Stack(props: Props) {
  return (
    <GiBox
      id={props.id}
      role={props.role}
      ariaLabel={props.ariaLabel}
      ariaLabelledBy={props.ariaLabelledBy}
      styles={props.styles}
      className={classes({
        align: getAlignItems(props.align),
        justify: getJustify(props.justify),
        wrap: props.wrap ?? false,
        className: [
          resolveResponsive(props.direction ?? Direction.COLUMN, directionToClass),
          resolveResponsive(props.gap ?? 0, gapToClass),
          props.className,
        ],
      })}
      dataTestId={props.dataTestId}
    >
      {props.children}
    </GiBox>
  );
}

const directionToClass = (direction: string, prefix: string): string =>
  direction === 'row' ? `${prefix}gi-flex-row` : `${prefix}gi-flex-col`;

const gapToClass = (gap: number, prefix: string): string => `${prefix}gi-gap-${gap}`;

// TODO: add twMerge to enable consumer `className` to override component-default utilities
const classes = tv({
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
