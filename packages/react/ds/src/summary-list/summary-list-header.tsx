'use client';
import { Children, ReactElement } from 'react';
import { cn } from '../cn.js';
import { useBreakpoint } from '../hooks/use-breakpoint.js';
import { useDomId } from '../hooks/use-dom-id.js';
import { translate as t } from '../i18n/utility.js';
import { getSpecialComponentType } from '../utilities.js';
import { useSummaryListContext } from './summary-list-context.js';
import { ActionList } from './summary-list-row.js';
import { SummaryListActionProps, SummaryListHeaderProps } from './types.js';

export const SummaryListHeader = ({
  children,
  label,
  id,
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

  return (
    <tr {...props}>
      <th scope="col">
        {!isMobile && label}{' '}
        {isMobile ? (
          <div className="gi-flex gi-justify-between">
            {label}
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
        <th scope="col" colSpan={2}>
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
