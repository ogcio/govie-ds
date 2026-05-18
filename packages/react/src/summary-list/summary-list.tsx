'use client';
import type { ReactElement } from 'react';
import { Children } from 'react';
import { tv } from 'tailwind-variants';
import { cn } from '@/cn.js';
import { getSpecialComponentType } from '@/utilities.js';
import { SummaryListProvider } from './summary-list-context.js';
import type { SummaryListHeaderProps, SummaryListProps, SummaryListRowProps } from './types.js';

export const SummaryList = ({ children, className, withBorder, ...props }: SummaryListProps) => {
  const allChildren = Children.toArray(children);
  const header = allChildren.filter(
    (child) => getSpecialComponentType(child) === 'SummaryListHeader',
  ) as ReactElement<SummaryListHeaderProps>[];
  const rows = allChildren.filter(
    (child) => getSpecialComponentType(child) === 'SummaryListRow',
  ) as ReactElement<SummaryListRowProps>[];

  const { container, thead } = summaryListVariants({ withBorder: !!withBorder });
  return (
    <SummaryListProvider>
      <div className={container()}>
        <table className={cn(className, 'gi-w-full')} role="table" {...props}>
          {header ? <thead className={thead()}>{header}</thead> : null}
          {rows ? <tbody>{rows}</tbody> : null}
        </table>
      </div>
    </SummaryListProvider>
  );
};

export const summaryListVariants = tv({
  slots: {
    container: 'gi-rounded-md gi-overflow-hidden gi-antialiased gi-text-md gi-w-full',
    thead: 'gi-bg-color-surface-system-neutral-layer1 gi-border-b gi-border-color-border-system-neutral-muted',
  },
  variants: {
    withBorder: {
      true: {
        container: 'gi-border gi-border-color-border-system-neutral-muted',
      },
      false: {
        container: 'gi-border-none',
      },
    },
  },
});

export const cellVariants = tv({
  base: 'gi-py-2 gi-px-3 gi-min-h-12',
  variants: {
    type: {
      head: 'gi-font-bold gi-text-left gi-truncate',
      data: '',
    },
    header: {
      true: 'gi-align-middle',
      false: 'gi-align-top',
    },
  },
  defaultVariants: {
    header: false,
    type: 'data',
  },
});

SummaryList.displayName = 'SummaryList';
Object.defineProperty(SummaryList, 'componentType', {
  value: 'SummaryList',
  writable: false,
  enumerable: false,
});
