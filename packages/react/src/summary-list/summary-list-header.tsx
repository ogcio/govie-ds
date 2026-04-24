'use client';
import type { ReactElement } from 'react';
import { Children } from 'react';
import { cn } from '../cn.js';
import { useBreakpoint } from '../hooks/use-breakpoint.js';
import { useDomId } from '../hooks/use-dom-id.js';
import { translate as t } from '../i18n/utility.js';
import { getSpecialComponentType } from '../utilities.js';
import { useSummaryListContext } from './summary-list-context.js';
import { ActionList } from './summary-list-row.js';
import type { SummaryListActionProps, SummaryListHeaderProps } from './types.js';
import { tv } from 'tailwind-variants';

const styles = tv({
  base: 'gi-py-2 gi-px-3 gi-min-h-12 gi-truncate gi-font-bold gi-text-left gi-align-middle',
});

export const SummaryListHeader = ({
  children,
  label,
  id,
  className,
  overflow = 'wrap',
  maxWidth = 'gi-w-full',
  ...props
}: SummaryListHeaderProps) => {
  useSummaryListContext();
  const { width } = useBreakpoint();
  const rowId = useDomId();
  const allChildren = Children.toArray(children);

  const summaryListActions = allChildren.filter(
    (child) => getSpecialComponentType(child) === 'SummaryListAction',
  ) as ReactElement<SummaryListActionProps>[];

  const isMobile = width != null && width <= 765;
  const style = maxWidth ? { maxWidth } : undefined;
  const overflowClasses = {
    'gi-truncate gi-block': overflow === 'truncate',
  };

  return (
    <tr {...props} className={cn('gi-h-14', className)}>
      <th scope="col" className={styles()}>
        {!isMobile && (
          <span className={cn(overflowClasses)} style={style}>
            {label}
          </span>
        )}
        {isMobile ? (
          <div className="gi-flex gi-justify-between">
            <span className={cn(overflowClasses)} style={style}>
              {label}
            </span>
            <span className="gi-sr-only">
              {t('header.actions', {
                defaultValue: 'Actions',
              })}
            </span>
            <ActionList id={id}>
              {summaryListActions.map((action, index) => (
                <span
                  key={`${rowId}-a${index}`}
                  className={cn({ 'gi-ml-4': index > 0 })}
                >
                  {action}
                </span>
              ))}
            </ActionList>
          </div>
        ) : null}
      </th>
      {!isMobile && summaryListActions ? (
        <th scope="col" className={styles()} colSpan={2}>
          <span className="gi-sr-only">
            {t('header.actions', {
              defaultValue: 'Actions',
            })}
          </span>
          <ActionList id={id}>
            {summaryListActions.map((action, index) => (
              <span
                key={`${rowId}-a${index}`}
                className={cn({ 'gi-ml-4': index > 0 })}
              >
                {action}
              </span>
            ))}
          </ActionList>
        </th>
      ) : null}
    </tr>
  );
};

SummaryListHeader.displayName = 'SummaryListHeader';
Object.defineProperty(SummaryListHeader, 'componentType', {
  value: 'SummaryListHeader',
  writable: false,
  enumerable: false,
});
