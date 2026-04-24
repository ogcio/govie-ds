import type { Props as StackAtomProps } from '../atoms/Stack';
import type { ResponsiveValue } from '../atoms/constants';

type SimpleDirection = 'row' | 'column';

type LegacyResponsiveDirection = ResponsiveValue<SimpleDirection> & {
  /** @deprecated Use `xs` instead. */
  base?: SimpleDirection;
};

type LegacyResponsiveGap = ResponsiveValue<number> & {
  /** @deprecated Use `xs` instead. */
  base?: number;
};

export type StackProps = Omit<StackAtomProps, 'direction' | 'gap'> & {
  direction?: SimpleDirection | LegacyResponsiveDirection;
  gap?: number | LegacyResponsiveGap;
  /** @deprecated Use `align` instead. */
  itemsAlignment?: 'start' | 'center' | 'end' | 'stretch';
  /** @deprecated Use `justify` instead. */
  itemsDistribution?:
    | 'start'
    | 'center'
    | 'end'
    | 'between'
    | 'around'
    | 'evenly';
  /** @deprecated Use `className` with a height utility instead. */
  fixedHeight?: string;
  /** @deprecated Dividers will be removed in a future release. */
  hasDivider?: boolean;
  /** @deprecated Use `ariaLabel` instead. Maps to `aria-label`. */
  'aria-label'?: string;
  /** @deprecated Use `ariaLabelledBy` instead. Maps to `aria-labelledby`. */
  'aria-labelledby'?: string;
  /** @deprecated Use `dataTestId` instead. Maps to `data-testid`. */
  'data-testid'?: string;
} & React.HTMLAttributes<HTMLDivElement>;
