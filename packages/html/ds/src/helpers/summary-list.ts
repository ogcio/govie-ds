import { SummaryListProps } from '../summary-list/summary-list.schema';

let summaryListRowIdCounter = 0;
function createUniqueRowId(): string {
  summaryListRowIdCounter += 1;
  return `_row_${summaryListRowIdCounter}_`;
}

export const createSummaryList = (props: SummaryListProps) => {
  const { header, rows = [] } = props;

  const containerElement = document.createElement('div');

  const wrapperElement = document.createElement('div');
  wrapperElement.className =
    'gi-summary-list gi-border gi-border-color-border-system-neutral-muted';
  (wrapperElement as any).dataset.testid = props.dataTestid ?? 'summary-list';

  const tableElement = document.createElement('table');
  tableElement.setAttribute('role', 'table');
  (tableElement as any).__type = 'SummaryList';

  const hasHeaderActions: boolean = !!(
    header &&
    header.actions &&
    header.actions.length > 0
  );

  let hasRowActions = false;
  for (const row of rows) {
    if (row.actions && row.actions.length > 0) {
      hasRowActions = true;
      break;
    }
  }
  const hasAnyActions: boolean = hasHeaderActions || hasRowActions;

  if ((header && header.label) || hasHeaderActions) {
    const theadElement = document.createElement('thead');
    const headerRowElement = document.createElement('tr');
    (headerRowElement as any).__type = 'SummaryListHeader';
    headerRowElement.className = 'gi-h-14';

    const labelHeaderCellElement = document.createElement('th');
    labelHeaderCellElement.setAttribute('scope', 'col');
    labelHeaderCellElement.textContent = header?.label ?? '';
    labelHeaderCellElement.className = 'gi-text-center gi-align-middle';
    headerRowElement.append(labelHeaderCellElement);

    const endHeaderCellElement = document.createElement('th');
    endHeaderCellElement.setAttribute('scope', 'col');
    endHeaderCellElement.setAttribute('colspan', hasAnyActions ? '2' : '1');

    const screenReaderActionsOuterElement = document.createElement('span');
    screenReaderActionsOuterElement.className = 'gi-sr-only';
    screenReaderActionsOuterElement.textContent = 'Actions';
    endHeaderCellElement.append(screenReaderActionsOuterElement);

    if (hasHeaderActions) {
      const headerActionsWrapperElement = document.createElement('div');
      headerActionsWrapperElement.className = 'gi-summary-list-action';

      const screenReaderActionsInnerElement = document.createElement('span');
      screenReaderActionsInnerElement.className = 'gi-sr-only';
      screenReaderActionsInnerElement.textContent = 'Actions';
      headerActionsWrapperElement.append(screenReaderActionsInnerElement);

      for (
        let actionIndex = 0;
        actionIndex < header!.actions!.length;
        actionIndex += 1
      ) {
        const headerAction = header!.actions![actionIndex];

        const actionContainerElement = document.createElement('span');
        if (actionIndex > 0) {
          actionContainerElement.className = 'gi-ml-4';
        }

        const actionLinkElement = document.createElement('a');
        actionLinkElement.className = 'gi-link';
        actionLinkElement.href = headerAction.href;
        actionLinkElement.textContent = headerAction.label;
        (actionLinkElement as any).__type = 'SummaryListAction';

        actionContainerElement.append(actionLinkElement);
        headerActionsWrapperElement.append(actionContainerElement);
      }

      endHeaderCellElement.append(headerActionsWrapperElement);
    }

    headerRowElement.append(endHeaderCellElement);
    theadElement.append(headerRowElement);
    tableElement.append(theadElement);
  }

  const tbodyElement = document.createElement('tbody');

  for (const row of rows) {
    const rowElement = document.createElement('tr');
    (rowElement as any).__type = 'SummaryListRow';
    if (row.withBorder) {
      rowElement.className =
        'gi-border-b gi-border-color-border-system-neutral-muted';
    }
    const rowId = createUniqueRowId();
    const rowHeaderCellElement = document.createElement('th');
    rowHeaderCellElement.setAttribute('scope', 'row');
    rowHeaderCellElement.id = rowId;
    rowHeaderCellElement.textContent = row.label ?? '';
    rowElement.append(rowHeaderCellElement);

    const valueCellElement = document.createElement('td');
    (valueCellElement as any).__type = 'SummaryListValue';
    valueCellElement.setAttribute('aria-labelledby', `${rowId} ${rowId}-value`);

    const screenReaderValueElement = document.createElement('span');
    screenReaderValueElement.id = `${rowId}-value`;
    screenReaderValueElement.className = 'gi-sr-only';
    screenReaderValueElement.textContent = 'Value';
    valueCellElement.append(screenReaderValueElement);

    if (typeof row.value === 'string' && row.value.length > 0) {
      valueCellElement.insertAdjacentHTML('beforeend', row.value);
    }

    rowElement.append(valueCellElement);

    const normalizedActions: Array<{ href: string; label: string }> = [];
    if (row.actions && row.actions.length > 0) {
      for (
        let actionIndex = 0;
        actionIndex < row.actions.length;
        actionIndex += 1
      ) {
        normalizedActions.push(row.actions[actionIndex]);
      }
    }

    if (normalizedActions.length > 0) {
      const actionsCellElement = document.createElement('td');
      actionsCellElement.setAttribute(
        'aria-labelledby',
        `${rowId} ${rowId}-actions`,
      );

      const actionsWrapperElement = document.createElement('div');
      actionsWrapperElement.className = 'gi-summary-list-action';

      const screenReaderActionsElement = document.createElement('span');
      screenReaderActionsElement.id = `${rowId}-actions`;
      screenReaderActionsElement.className = 'gi-sr-only';
      screenReaderActionsElement.textContent = 'Actions';
      actionsWrapperElement.append(screenReaderActionsElement);

      for (const [actionIndex, action] of normalizedActions.entries()) {
        const actionSpanElement = document.createElement('span');
        if (actionIndex > 0) {
          actionSpanElement.className = 'gi-ml-4';
        }

        const actionLinkElement = document.createElement('a');
        actionLinkElement.href = action.href;
        actionLinkElement.className = 'gi-link';
        actionLinkElement.textContent = action.label;
        (actionLinkElement as any).__type = 'SummaryListAction';

        actionSpanElement.append(actionLinkElement);
        actionsWrapperElement.append(actionSpanElement);
      }

      actionsCellElement.append(actionsWrapperElement);
      rowElement.append(actionsCellElement);
    }

    tbodyElement.append(rowElement);
  }

  tableElement.append(tbodyElement);
  wrapperElement.append(tableElement);
  containerElement.append(wrapperElement);

  return containerElement;
};
