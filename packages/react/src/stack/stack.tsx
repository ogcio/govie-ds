import { Children, Fragment, type FC } from 'react';
import GiStack, { type Props as StackAtomProps } from '../atoms/Stack';
import type { ResponsiveValue } from '../atoms/constants';
import { resolveResponsive } from '../atoms/utilities';
import { cn } from '../cn.js';

export type StackProps = Omit<StackAtomProps, 'direction' | 'gap'> & {
  direction?: ResponsiveValue<'row' | 'column'>;
  gap?: ResponsiveValue<number>;
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

export const Stack: FC<StackProps> = ({
  children,
  direction,
  gap,
  align,
  justify,
  wrap,
  role,
  ariaLabel,
  ariaLabelledBy,
  'aria-label': nativeAriaLabel,
  'aria-labelledby': nativeAriaLabelledBy,
  className,
  id,
  hasDivider,
  fixedHeight,
  itemsAlignment,
  itemsDistribution,
  dataTestId,
  'data-testid': nativeDataTestId,
}) => {
  return (
    <GiStack
      id={id}
      direction={direction}
      gap={gap}
      align={align ?? itemsAlignment}
      justify={justify ?? itemsDistribution}
      wrap={wrap}
      role={role}
      ariaLabel={ariaLabel ?? nativeAriaLabel}
      ariaLabelledBy={ariaLabelledBy ?? nativeAriaLabelledBy}
      className={className}
      styles={fixedHeight ? { height: fixedHeight } : undefined}
      dataTestId={dataTestId ?? nativeDataTestId}
    >
      {hasDivider ? addDividers(children, direction) : children}
    </GiStack>
  );
};

const dividerDirectionToClass = (direction: string, prefix: string): string =>
  direction === 'row'
    ? `${prefix}gi-h-full ${prefix}gi-w-px`
    : `${prefix}gi-w-full ${prefix}gi-h-px`;

const addDividers = (
  children: React.ReactNode,
  direction: StackProps['direction'],
) => {
  const childArray = Children.toArray(children);
  return childArray.map((child, index) => (
    <Fragment key={`item_${index}`}>
      {child}
      {index < childArray.length - 1 && (
        <div
          className={cn(
            resolveResponsive(direction ?? 'column', dividerDirectionToClass),
            'gi-bg-gray-400',
          )}
          aria-hidden="true"
        />
      )}
    </Fragment>
  ));
};

Stack.displayName = 'Stack';
