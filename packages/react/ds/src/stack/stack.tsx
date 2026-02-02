'use client';

import {
  Children,
  cloneElement,
  FC,
  Fragment,
  isValidElement,
  ReactElement,
} from 'react';
import { cn } from '../cn.js';
import type {
  Alignment,
  Direction,
  Distribution,
  Gap,
  StackProps,
} from './types.js';

const getDirectionBreakpointFlags = (direction: Direction) => {
  if (typeof direction === 'string') {
    return {};
  }

  return {
    isBaseColumn: direction.base === 'column',
    isBaseRow: direction.base === 'row',
    isXsColumn: direction.xs === 'column',
    isXsRow: direction.xs === 'row',
    isSmColumn: direction.sm === 'column',
    isSmRow: direction.sm === 'row',
    isMdColumn: direction.md === 'column',
    isMdRow: direction.md === 'row',
    isLgColumn: direction.lg === 'column',
    isLgRow: direction.lg === 'row',
    isXlColumn: direction.xl === 'column',
    isXlRow: direction.xl === 'row',
    is2xlColumn: direction['2xl'] === 'column',
    is2xlRow: direction['2xl'] === 'row',
  };
};

const getDirectionClasses = (direction: Direction) => {
  if (typeof direction === 'string') {
    return {
      'gi:flex-row': direction === 'row',
      'gi:flex-col': direction === 'column',
    };
  }
  const {
    isBaseColumn,
    isBaseRow,
    isXsColumn,
    isXsRow,
    isSmColumn,
    isSmRow,
    isMdColumn,
    isMdRow,
    isLgColumn,
    isLgRow,
    isXlColumn,
    isXlRow,
    is2xlColumn,
    is2xlRow,
  } = getDirectionBreakpointFlags(direction);

  return {
    'gi:flex-row': isBaseRow,
    'gi:flex-col': isBaseColumn,

    'gi:xs:flex-row': isXsRow,
    'gi:xs:flex-col': isXsColumn,

    'gi:sm:flex-row': isSmRow,
    'gi:sm:flex-col': isSmColumn,

    'gi:md:flex-row': isMdRow,
    'gi:md:flex-col': isMdColumn,

    'gi:lg:flex-row': isLgRow,
    'gi:lg:flex-col': isLgColumn,

    'gi:xl:flex-row': isXlRow,
    'gi:xl:flex-col': isXlColumn,

    'gi:2xl:flex-row': is2xlRow,
    'gi:2xl:flex-col': is2xlColumn,
  };
};

const getDividerClasses = (direction: Direction) => {
  if (typeof direction === 'string') {
    return {
      'gi:w-full': direction === 'column',
      'gi:h-[1px]': direction === 'column',
      'gi:h-full': direction === 'row',
      'gi:w-[1px]': direction === 'row',
    };
  }
  const {
    isBaseColumn,
    isBaseRow,
    isXsColumn,
    isXsRow,
    isSmColumn,
    isSmRow,
    isMdColumn,
    isMdRow,
    isLgColumn,
    isLgRow,
    isXlColumn,
    isXlRow,
    is2xlColumn,
    is2xlRow,
  } = getDirectionBreakpointFlags(direction);

  return {
    'gi:w-full': isBaseColumn,
    'gi:h-[1px]': isBaseColumn,
    'gi:h-full': isBaseRow,
    'gi:w-[1px]': isBaseRow,

    'gi:xs:w-full': isXsColumn,
    'gi:xs:h-[1px]': isXsColumn,
    'gi:xs:h-full': isXsRow,
    'gi:xs:w-[1px]': isXsRow,

    'gi:sm:w-full': isSmColumn,
    'gi:sm:h-[1px]': isSmColumn,
    'gi:sm:h-full': isSmRow,
    'gi:sm:w-[1px]': isSmRow,

    'gi:md:w-full': isMdColumn,
    'gi:md:h-[1px]': isMdColumn,
    'gi:md:h-full': isMdRow,
    'gi:md:w-[1px]': isMdRow,

    'gi:lg:w-full': isLgColumn,
    'gi:lg:h-[1px]': isLgColumn,
    'gi:lg:h-full': isLgRow,
    'gi:lg:w-[1px]': isLgRow,

    'gi:xl:w-full': isXlColumn,
    'gi:xl:h-[1px]': isXlColumn,
    'gi:xl:h-full': isXlRow,
    'gi:xl:w-[1px]': isXlRow,

    'gi:2xl:w-full': is2xlColumn,
    'gi:2xl:h-[1px]': is2xlColumn,
    'gi:2xl:h-full': is2xlRow,
    'gi:2xl:w-[1px]': is2xlRow,
  };
};

const getAlignmentClasses = (itemsAlignment: Alignment) => {
  return {
    'gi:items-start': itemsAlignment === 'start',
    'gi:items-center': itemsAlignment === 'center',
    'gi:items-end': itemsAlignment === 'end',
    'gi:items-stretch': itemsAlignment === 'stretch',
  };
};

const getDistributionClasses = (itemsDistribution: Distribution) => {
  return {
    'gi:justify-start': itemsDistribution === 'start',
    'gi:justify-center': itemsDistribution === 'center',
    'gi:justify-end': itemsDistribution === 'end',
    'gi:justify-between': itemsDistribution === 'between',
    'gi:justify-around': itemsDistribution === 'around',
    'gi:justify-evenly': itemsDistribution === 'evenly',
    'gi:justify-stretch': itemsDistribution === 'stretch',
  };
};

const getWrapClass = (wrap: boolean) => ({
  'gi:flex-wrap': wrap,
  'gi:flex-nowrap': !wrap,
});

const getItemsGapClasses = (gap: Gap) => {
  if (typeof gap === 'number' && !!gap) {
    return `gi:gap-${gap}`;
  }

  const gapClasses = Object.entries(gap)
    .map(([breakpoint, value]) =>
      breakpoint === 'base'
        ? `gi:gap-${value}`
        : `${breakpoint}:gi:gap-${value}`,
    )
    .join(' ');

  return gapClasses;
};

const Divider = ({ direction }: { direction: Direction }) => {
  const dividerClasses = getDividerClasses(direction);
  return (
    <div
      className={`${cn(dividerClasses)} gi:bg-gray-400`}
      aria-hidden="true"
    />
  );
};

export const Stack: FC<StackProps> = ({
  children,
  direction = 'column',
  fixedHeight = '100%',
  gap = 0,
  hasDivider,
  itemsAlignment = 'start',
  itemsDistribution = 'start',
  wrap = false,
  className,
  ...props
}) => {
  const stackClasses = cn(
    className,
    'gi:flex',
    'gi:w-full',
    getDistributionClasses(itemsDistribution),
    getAlignmentClasses(itemsAlignment),
    getDirectionClasses(direction),
    getItemsGapClasses(gap),
    getWrapClass(wrap),
  );

  const renderChildren = () => {
    const childrenComponent = Children.toArray(children);
    return childrenComponent.map((child, index) => (
      <Fragment key={`item_${index}`}>
        {isValidElement(child)
          ? cloneElement(
              child as ReactElement,
              {
                'data-testid': `govie-stack-item-${index}`,
              } as { 'data-testid': string },
            )
          : child}

        {hasDivider && index < childrenComponent.length - 1 && (
          <Divider direction={direction} />
        )}
      </Fragment>
    ));
  };

  return (
    <div className={stackClasses} style={{ height: fixedHeight }} {...props}>
      {renderChildren() as ReactElement[]}
    </div>
  );
};

Stack.displayName = 'Stack';
