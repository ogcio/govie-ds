'use client';

import React, { ReactNode } from 'react';
import { cn } from '../cn.js';

type Gap =
  | number
  | {
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
      xs?: SimpleDirection;
      sm?: SimpleDirection;
      md?: SimpleDirection;
      lg?: SimpleDirection;
      xl?: SimpleDirection;
      '2xl'?: SimpleDirection;
    };
export type StackProps = {
  direction: Direction;
  itemsAlignment: Alignment;
  itemsDistribution: Distribution;
  gap?: Gap;
  hasDivider?: boolean;
  children?: ReactNode;
};

const getDirectionClasses = (direction: Direction) => {
  if (typeof direction === 'string') {
    return direction === 'row' ? 'gi-flex-row' : 'gi-flex-col';
  }

  const directionClasses: string[] = [];
  for (const [breakpoint, dir] of Object.entries(direction)) {
    const tClass = dir === 'row' ? 'gi-flex-row' : 'gi-flex-col';
    directionClasses.push(`${breakpoint}:${tClass}`);
  }

  return directionClasses.join(' ');
};

const getItemsGapClasses = (gap: Gap) => {
  if (typeof gap === 'number' && !!gap) {
    return `gi-gap-${gap}`;
  }

  const tClasses: string[] = [];
  for (const [breakpoint, value] of Object.entries(gap)) {
    tClasses.push(`${breakpoint}:gi-gap-${value}`);
  }

  return tClasses.join(' ');
};

const Divider = ({ direction }: { direction: Direction }) => {
  const defaultColumnClasses = ['gi-w-full', 'gi-h-[1px]', 'gi-bg-gray-200'];
  const defaultRowClasses = ['gi-h-full', 'gi-w-[1px]', 'gi-bg-gray-200'];

  if (typeof direction === 'string') {
    return (
      <div
        className={
          direction === 'column'
            ? defaultColumnClasses.join(' ')
            : defaultRowClasses.join(' ')
        }
      />
    );
  }

  const dividerClasses = [];
  for (const [breakpoint, dir] of Object.entries(direction)) {
    if (dir) {
      dividerClasses.push(
        ...(dir === 'column' ? defaultColumnClasses : defaultRowClasses).map(
          (columnClass) =>
            breakpoint === 'xs' ? columnClass : `${breakpoint}:${columnClass}`,
        ),
      );
    }
  }

  return <div className={dividerClasses.join(' ')} />;
};

export const Stack: React.FC<StackProps> = ({
  direction = 'row',
  itemsAlignment = 'start',
  itemsDistribution = 'start',
  gap = 0,
  hasDivider,
  children,
}) => {
  const stackClasses = cn(
    'gi-flex',
    `gi-items-${itemsAlignment}`,
    `gi-justify-${itemsDistribution}`,
    'gi-h-full',
    getDirectionClasses(direction),
    getItemsGapClasses(gap),
  );

  const renderChildren = () => {
    const childrenArray = React.Children.toArray(children);
    return childrenArray.map((child, index) => (
      <React.Fragment key={`item_${index}`}>
        {child}
        {hasDivider && index < childrenArray.length - 1 && (
          <Divider direction={direction} />
        )}
      </React.Fragment>
    ));
  };

  return <div className={stackClasses}>{renderChildren()}</div>;
};

Stack.displayName = 'Stack';
