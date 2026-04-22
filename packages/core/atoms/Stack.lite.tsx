import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import {
  Direction,
  AlignItems,
  Justify,
  getAlignItems,
  getJustify,
  resolveResponsive,
  resolveResponsiveVariants,
} from './utilities';
import type { ResponsiveValue } from './utilities';

useMetadata({ angular: { selector: 'gi-stack' } });

export type Props = {
  direction?: ResponsiveValue<(typeof Direction)[keyof typeof Direction]>;
  gap?: ResponsiveValue<number>;
  align?: (typeof AlignItems)[keyof typeof AlignItems];
  justify?: (typeof Justify)[keyof typeof Justify];
  wrap?: boolean;
  role?: 'region' | 'navigation' | 'complementary' | 'search' | 'form' | 'group';
  ariaLabel?: string;
  ariaLabelledBy?: string;
  className?: string;
  id?: string;
  styles?: Record<string, string>;
  children?: any;
  dataTestId?: string;
};

export const stackVariants = tv({
  base: ['gi-flex', 'gi-w-full'],
  variants: {
    direction: { row: 'gi-flex-row', column: 'gi-flex-col' },
    smDirection: { row: 'sm:gi-flex-row', column: 'sm:gi-flex-col' },
    mdDirection: { row: 'md:gi-flex-row', column: 'md:gi-flex-col' },
    lgDirection: { row: 'lg:gi-flex-row', column: 'lg:gi-flex-col' },
    xlDirection: { row: 'xl:gi-flex-row', column: 'xl:gi-flex-col' },
    '2xlDirection': { row: '2xl:gi-flex-row', column: '2xl:gi-flex-col' },
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
    direction: 'column',
    align: 'start',
    justify: 'start',
    wrap: false,
  },
});

export default function Stack(props: Props) {
  return (
    <div
      id={props.id}
      role={props.role}
      aria-label={props.role ? props.ariaLabel : undefined}
      aria-labelledby={props.role ? props.ariaLabelledBy : undefined}
      style={props.styles}
      class={stackVariants({
        ...resolveResponsiveVariants(props.direction ?? Direction.COLUMN, 'Direction'),
        align: getAlignItems(props.align),
        justify: getJustify(props.justify),
        wrap: props.wrap ?? false,
        class: [resolveResponsive(props.gap ?? 0, 'gi-gap'), props.className],
      })}
      data-testid={props.dataTestId}
    >
      {props.children}
    </div>
  );
}
