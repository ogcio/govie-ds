'use client';
import { Children, ReactElement } from 'react';
import { cn } from '../cn.js';
import { useDomId } from '../hooks/use-dom-id.js';
import { translate as t } from '../i18n/utility.js';
import { getSpecialComponentType } from '../utilities.js';
import { useSummaryListContext } from './summary-list-context.js';
import {
  SummaryListActionListProps,
  SummaryListActionProps,
  SummaryListRowProps,
  SummaryListValueProps,
} from './types.js';

export const SummaryListRow = ({
  children,
  label,
  withBorder,
  className,
  ...props
}: SummaryListRowProps) => {
  useSummaryListContext();

  const allChildren = Children.toArray(children);
  const actions = allChildren.filter(
    (c) => getSpecialComponentType(c) === 'SummaryListAction',
  ) as ReactElement<SummaryListActionProps>[];
  const valueTd = allChildren.find(
    (c) => getSpecialComponentType(c) === 'SummaryListValue',
  ) as ReactElement<SummaryListValueProps> | undefined;

  const rowId = useDomId();
  const valueSrId = `${rowId}-value`;
  const actionsSrId = `${rowId}-actions`;

  return (
    <tr
      {...props}
      className={cn(
        {
          'gi-border-b gi-border-color-border-system-neutral-muted': withBorder,
        },
        className,
      )}
    >
      <th id={rowId} scope="row">
        {label}
      </th>

      {valueTd ? (
        <td {...valueTd.props} aria-labelledby={`${rowId} ${valueSrId}`}>
          <span id={valueSrId} className="gi-sr-only">
            {t('summaryList.col.value', { defaultValue: 'Value' })}
          </span>
          {valueTd.props.children}
        </td>
      ) : null}

      {actions.length > 0 ? (
        <td aria-labelledby={`${rowId} ${actionsSrId}`}>
          <ActionList id={actionsSrId}>
            {actions.map((action, index) => (
              <span
                key={`${rowId}-a${index}`}
                className={cn({ 'gi-ml-4': index > 0 })}
              >
                {action}
              </span>
            ))}
          </ActionList>
        </td>
      ) : null}
    </tr>
  );
};

export const ActionList = ({ id, children }: SummaryListActionListProps) => {
  return (
    <div className={cn('gi-summary-list-action')}>
      <span id={id} className="gi-sr-only">
        {t('summaryList.col.actions', { defaultValue: 'Actions' })}
      </span>
      {children}
    </div>
  );
};

SummaryListRow.displayName = 'SummaryRow';
Object.defineProperty(SummaryListRow, 'componentType', {
  value: 'SummaryListRow',
  writable: false,
  enumerable: false,
});
