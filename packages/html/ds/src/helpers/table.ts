import { TablePropsExtension } from '../table/types';

export const createTable = (arguments_: TablePropsExtension) => {
  const table = document.createElement('table');
  table.className = `gi-table ${arguments_.layout === 'fixed' ? 'gi-table-fixed' : 'gi-table-auto'}`;

  table.dataset.rowSize = arguments_.rowSize || 'md';

  if (arguments_.stripped) {
    table.dataset.stripped = arguments_.stripped.toString();
  }

  if (arguments_.noBorder) {
    table.dataset.noBorder = 'true';
    table.classList.add('gi-table-no-border');
  }

  if (arguments_.captionText) {
    const caption = document.createElement('caption');
    caption.className = 'gi-table-caption-text gi-text-lg';
    caption.textContent = arguments_.captionText;
    table.append(caption);
  }

  if (arguments_.headers) {
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    for (const header of arguments_.headers) {
      const th = document.createElement('th');

      if (typeof header === 'string') {
        th.textContent = header;
        th.className = 'gi-table-th gi-text-left gi-align-middle';
      } else {
        th.textContent = header.content;
        const alignMap = {
          center: 'gi-text-center',
          right: 'gi-text-right',
          left: 'gi-text-left',
        };

        const alignClass = header.align
          ? alignMap[header.align]
          : 'gi-text-left';
        th.className = `gi-table-th ${alignClass} gi-align-middle`;
      }

      th.dataset.headerString = 'true';
      tr.append(th);
    }
    thead.append(tr);
    table.append(thead);
  }

  if (arguments_.rows && arguments_.rows.length > 0) {
    const tbody = document.createElement('tbody');
    for (const row of arguments_.rows) {
      const tr = document.createElement('tr');
      tr.className = 'gi-table-tr';
      for (const cell of row) {
        const td = document.createElement('td');
        td.innerHTML = cell;

        const temporaryDiv = document.createElement('div');
        temporaryDiv.innerHTML = cell;
        const dataCell = temporaryDiv.querySelector('.gi-table-data-cell');
        const align = dataCell?.getAttribute('data-align') as
          | 'center'
          | 'right'
          | 'left'
          | null;
        const alignMap = {
          center: 'gi-text-center',
          right: 'gi-text-right',
          left: 'gi-text-left',
        };

        const alignClass = alignMap[align ?? 'left'];
        td.className = `gi-table-td ${alignClass} gi-align-middle`;
        tr.append(td);
      }
      tbody.append(tr);
    }
    table.append(tbody);
  } else {
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.textContent = 'No data to display';
    td.colSpan = arguments_.headers?.length || 1;
    td.className = 'gi-table-no-data';
    tr.append(td);
    tbody.append(tr);
    table.append(tbody);
  }

  if (arguments_.foot) {
    const tfoot = document.createElement('tfoot');
    const tr = document.createElement('tr');

    for (const cell of arguments_.foot) {
      const td = document.createElement('td');

      let alignClass = 'gi-text-left';
      if (cell.align === 'center') {
        alignClass = 'gi-text-center';
      } else if (cell.align === 'right') {
        alignClass = 'gi-text-right';
      }

      let valignClass = 'gi-align-middle';
      if (cell.valign === 'top') {
        valignClass = 'gi-align-top';
      } else if (cell.valign === 'bottom') {
        valignClass = 'gi-align-bottom';
      }

      td.className = [
        'gi-table-td',
        alignClass,
        valignClass,
        cell.className || '',
      ]
        .filter(Boolean)
        .join(' ');

      td.innerHTML = cell.content;
      td.colSpan = cell.colSpan || 1;
      tr.append(td);
    }

    tfoot.append(tr);
    table.append(tfoot);
  }

  return table;
};

export const createTableCell = (
  value: any,
  align?: 'left' | 'center' | 'right',
) => {
  const div = document.createElement('div');
  div.className = 'gi-table-data-cell';
  if (align) {
    div.dataset.align = align;
  }
  div.innerHTML = value;
  return div;
};
