'use client';

import React, { ReactNode } from 'react';
import { cn } from '../cn.js';

type Gap =
  | number
  | {
      base?: number;
      xs?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
      '2xl'?: number;
    };
type SimpleDirection = 'column' | 'row';

export type Alignment = 'start' | 'center' | 'end';
export type Distribution =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';
export type Direction =
  | SimpleDirection
  | {
      base?: SimpleDirection;
      xs?: SimpleDirection;
      sm?: SimpleDirection;
      md?: SimpleDirection;
      lg?: SimpleDirection;
      xl?: SimpleDirection;
      '2xl'?: SimpleDirection;
    };
export type StackProps = {
  direction?: Direction;
  itemsAlignment?: Alignment;
  itemsDistribution?: Distribution;
  gap?: Gap;
  hasDivider?: boolean;
  wrap?: boolean;
  fixedHeight?: string;
  children: ReactNode;
};

const getDirectionBreakpointFlags = (
  direction: Exclude<Direction, SimpleDirection>,
) => {
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
      'gi-flex-row': direction === 'row',
      'gi-flex-col': direction === 'column',
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
    'gi-flex-row': isBaseRow,
    'gi-flex-col': isBaseColumn,

    'xs:gi-flex-row': isXsRow,
    'xs:gi-flex-col': isXsColumn,

    'sm:gi-flex-row': isSmRow,
    'sm:gi-flex-col': isSmColumn,

    'md:gi-flex-row': isMdRow,
    'md:gi-flex-col': isMdColumn,

    'lg:gi-flex-row': isLgRow,
    'lg:gi-flex-col': isLgColumn,

    'xl:gi-flex-row': isXlRow,
    'xl:gi-flex-col': isXlColumn,

    '2xl:gi-flex-row': is2xlRow,
    '2xl:gi-flex-col': is2xlColumn,
  };
};

const getDividerClasses = (direction: Direction) => {
  if (typeof direction === 'string') {
    return {
      'gi-w-full': direction === 'column',
      'gi-h-[1px]': direction === 'column',
      'gi-h-full': direction === 'row',
      'gi-w-[1px]': direction === 'row',
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
    'gi-w-full': isBaseColumn,
    'gi-h-[1px]': isBaseColumn,
    'gi-h-full': isBaseRow,
    'gi-w-[1px]': isBaseRow,

    'xs:gi-w-full': isXsColumn,
    'xs:gi-h-[1px]': isXsColumn,
    'xs:gi-h-full': isXsRow,
    'xs:gi-w-[1px]': isXsRow,

    'sm:gi-w-full': isSmColumn,
    'sm:gi-h-[1px]': isSmColumn,
    'sm:gi-h-full': isSmRow,
    'sm:gi-w-[1px]': isSmRow,

    'md:gi-w-full': isMdColumn,
    'md:gi-h-[1px]': isMdColumn,
    'md:gi-h-full': isMdRow,
    'md:gi-w-[1px]': isMdRow,

    'lg:gi-w-full': isLgColumn,
    'lg:gi-h-[1px]': isLgColumn,
    'lg:gi-h-full': isLgRow,
    'lg:gi-w-[1px]': isLgRow,

    'xl:gi-w-full': isXlColumn,
    'xl:gi-h-[1px]': isXlColumn,
    'xl:gi-h-full': isXlRow,
    'xl:gi-w-[1px]': isXlRow,

    '2xl:gi-w-full': is2xlColumn,
    '2xl:gi-h-[1px]': is2xlColumn,
    '2xl:gi-h-full': is2xlRow,
    '2xl:gi-w-[1px]': is2xlRow,
  };
};

const getAlignmentClasses = (itemsAlignment: Alignment) => {
  return {
    'gi-items-start': itemsAlignment === 'start',
    'gi-items-center': itemsAlignment === 'center',
    'gi-items-end': itemsAlignment === 'end',
  };
};

const getDistributionClasses = (itemsDistribution: Distribution) => {
  return {
    'gi-justify-start': itemsDistribution === 'start',
    'gi-justify-center': itemsDistribution === 'center',
    'gi-justify-end': itemsDistribution === 'end',
    'gi-justify-between': itemsDistribution === 'between',
    'gi-justify-around': itemsDistribution === 'around',
    'gi-justify-evenly': itemsDistribution === 'evenly',
  };
};

const getWrapClass = (wrap: boolean) => ({
  'gi-flex-wrap': wrap,
  'gi-flex-nowrap': !wrap,
});

const getItemsGapClasses = (gap: Gap) => {
  if (typeof gap === 'number' && !!gap) {
    return `gi-gap-${gap}`;
  }

  const tClasses: string[] = [];
  for (const [breakpoint, value] of Object.entries(gap)) {
    const gapClass =
      breakpoint === 'base'
        ? `gi-gap-${value}`
        : `${breakpoint}:gi-gap-${value}`;
    tClasses.push(gapClass);
  }

  return tClasses.join(' ');
};

const Divider = ({ direction }: { direction: Direction }) => {
  const dividerClasses = getDividerClasses(direction);
  return <div className={`${cn(dividerClasses)} gi-bg-gray-400`} />;
};

export const Stack: React.FC<StackProps> = ({
  direction = 'column',
  itemsAlignment = 'start',
  itemsDistribution = 'start',
  gap = 0,
  wrap = false,
  fixedHeight = '100%',
  hasDivider,
  children,
}) => {
  const stackClasses = cn(
    'gi-flex',
    'gi-overflow-auto',
    `gi-h-[${fixedHeight}]`,
    getDistributionClasses(itemsDistribution),
    getAlignmentClasses(itemsAlignment),
    getDirectionClasses(direction),
    getItemsGapClasses(gap),
    getWrapClass(wrap),
  );

  const renderChildren = () => {
    const childrenComponent = React.Children.toArray(children);
    return childrenComponent.map((child, index) => (
      <React.Fragment key={`item_${index}`}>
        {React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement, {
              role: 'listitem',
              'data-testid': `govie-stack-item-${index}`,
            })
          : child}
        {hasDivider && index < childrenComponent.length - 1 && (
          <Divider direction={direction} />
        )}
      </React.Fragment>
    ));
  };

  return (
    <div
      className={stackClasses}
      role="list"
      aria-label="Items Stacked"
      data-testid="govie-stack"
      style={{ height: fixedHeight }}
    >
      {renderChildren()}
    </div>
  );
};

Stack.displayName = 'Stack';
