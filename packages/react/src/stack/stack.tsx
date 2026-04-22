import { Children, Fragment, type FC } from 'react';
import { tv } from 'tailwind-variants';
import GiStack from '../atoms/Stack';
import { resolveResponsiveVariants } from '../atoms/utilities';
import { cn } from '../cn.js';
import { normalizeLegacyBreakpoints } from '../utils/normalize-breakpoints.js';
import type { StackProps } from './types.js';

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
  const normalizedDirection = normalizeLegacyBreakpoints(direction);

  return (
    <GiStack
      id={id}
      direction={normalizedDirection}
      gap={normalizeLegacyBreakpoints(gap)}
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
      {hasDivider ? addDividers(children, normalizedDirection) : children}
    </GiStack>
  );
};

const dividerVariants = tv({
  variants: {
    direction: { column: 'gi-w-full gi-h-[1px]', row: 'gi-h-full gi-w-[1px]' },
    smDirection: {
      column: 'sm:gi-w-full sm:gi-h-[1px]',
      row: 'sm:gi-h-full sm:gi-w-[1px]',
    },
    mdDirection: {
      column: 'md:gi-w-full md:gi-h-[1px]',
      row: 'md:gi-h-full md:gi-w-[1px]',
    },
    lgDirection: {
      column: 'lg:gi-w-full lg:gi-h-[1px]',
      row: 'lg:gi-h-full lg:gi-w-[1px]',
    },
    xlDirection: {
      column: 'xl:gi-w-full xl:gi-h-[1px]',
      row: 'xl:gi-h-full xl:gi-w-[1px]',
    },
    '2xlDirection': {
      column: '2xl:gi-w-full 2xl:gi-h-[1px]',
      row: '2xl:gi-h-full 2xl:gi-w-[1px]',
    },
  },
});

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
            dividerVariants(
              resolveResponsiveVariants(direction ?? 'column', 'Direction'),
            ),
            'gi-bg-gray-400',
          )}
          aria-hidden="true"
        />
      )}
    </Fragment>
  ));
};

Stack.displayName = 'Stack';
