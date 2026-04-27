'use client';
import type { ReactElement } from 'react';
import { Children } from 'react';
import { tv } from 'tailwind-variants';
import { cn } from '../cn.js';
import { getSpecialComponentType } from '../utilities.js';
import { SummaryListProvider } from './summary-list-context.js';
import type {
  SummaryListHeaderProps,
  SummaryListProps,
  SummaryListRowProps,
} from './types.js';

export const SummaryList = ({
  children,
  className,
  withBorder,
  ...props
}: SummaryListProps) => {
  const allChildren = Children.toArray(children);
  const header = allChildren.filter(
    (child) => getSpecialComponentType(child) === 'SummaryListHeader',
  ) as ReactElement<SummaryListHeaderProps>[];
  const rows = allChildren.filter(
    (child) => getSpecialComponentType(child) === 'SummaryListRow',
  ) as ReactElement<SummaryListRowProps>[];

  const { container, thead } = styles({ withBorder });
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

const styles = tv({
  slots: {
    container:
      'gi-rounded-md gi-overflow-hidden gi-antialiased gi-text-md gi-w-full gi-border gi-border-color-border-system-neutral-muted',
    thead:
      'gi-bg-color-surface-system-neutral-layer1 gi-border-b gi-border-color-border-system-neutral-muted',
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

SummaryList.displayName = 'SummaryList';
Object.defineProperty(SummaryList, 'componentType', {
  value: 'SummaryList',
  writable: false,
  enumerable: false,
});
