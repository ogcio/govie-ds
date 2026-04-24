import { Children, Fragment, type FC } from 'react';
import GiStack from '../atoms/Stack';
import { resolveResponsive } from '../atoms/utilities';
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

const dividerDirectionToClass = (direction: string, bp?: string): string => {
  const cls = direction === 'row' ? 'gi-h-full gi-w-px' : 'gi-w-full gi-h-px';
  return bp
    ? cls
        .split(' ')
        .map((c) => `${bp}:${c}`)
        .join(' ')
    : cls;
};

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
