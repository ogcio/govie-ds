import { SummaryListProps } from '../summary-list/summary-list.schema';

export const createSummaryList = (arguments_: SummaryListProps) => {
  const container = document.createElement('div');

  const component = document.createElement('div');
  component.className = 'gi-summary-list';
  component.dataset.testid = arguments_.dataTestid ?? 'paragraph';

  for (const row of arguments_.rows) {
    const rowItem = document.createElement('dl');
    rowItem.className = 'gi-summary-list-row';
    if (row.withBorder) {
      rowItem.dataset.border = 'true';
    }

    const dt = document.createElement('dt');
    dt.textContent = row.label;
    rowItem.append(dt);

    if (row.value) {
      const dd = document.createElement('dd');
      dd.innerHTML = row.value;
      dd.className = 'gi-summary-list-value';

      rowItem.append(dd);
    }

    if (row.action) {
      const dd = document.createElement('dd');
      dd.innerHTML =
        '<a href="' +
        row.action.href +
        '" class="gi-link">' +
        row.action.label +
        '</a>';
      dd.className = 'gi-summary-list-actions';

      rowItem.append(dd);
    }

    component.append(rowItem);
  }

  container.append(component);

  return container;
};
