import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import { Direction, AlignItems, Justify, type ResponsiveValue } from './constants';
import { getAlignItems, getJustify, resolveResponsive } from './utilities';

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

export default function Stack(props: Props) {
  return (
    <div
      id={props.id}
      role={props.role}
      aria-label={props.role ? props.ariaLabel : undefined}
      aria-labelledby={props.role ? props.ariaLabelledBy : undefined}
      style={props.styles}
      class={stackVariants({
        align: getAlignItems(props.align),
        justify: getJustify(props.justify),
        wrap: props.wrap ?? false,
        class: [
          resolveResponsive(props.direction ?? Direction.COLUMN, directionToClass),
          resolveResponsive(props.gap ?? 0, gapToClass),
          props.className,
        ],
      })}
      data-testid={props.dataTestId}
    >
      {props.children}
    </div>
  );
}

const directionToClass = (direction: string, bp?: string): string => {
  const cls = direction === 'row' ? 'gi-flex-row' : 'gi-flex-col';
  return bp ? `${bp}:${cls}` : cls;
};

const gapToClass = (gap: number, bp?: string): string => (bp ? `${bp}:gi-gap-${gap}` : `gi-gap-${gap}`);

const stackVariants = tv({
  base: ['gi-flex', 'gi-w-full'],
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
