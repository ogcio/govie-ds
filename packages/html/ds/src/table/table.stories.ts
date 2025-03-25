import type { Meta, StoryObj } from '@storybook/react';
import { beautifyHtmlNode } from '../storybook/storybook';
import { TableProps } from './types';

type TablePropsExtension = TableProps & {
  captionText?: string;
  headers?: string[];
  rows?: string[][];
};

const meta: Meta<TablePropsExtension> = {
  title: 'Components/Table',
};

export default meta;
type Story = StoryObj<TablePropsExtension>;

const createTable = (arguments_: TablePropsExtension) => {
  const table = document.createElement('table');
  table.className = `gi-table ${arguments_.layout === 'fixed' ? 'gi-table-fixed' : 'gi-table-auto'}`;

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
      th.textContent = header;
      th.className = 'gi-table-th';
      tr.append(th);
    }
    thead.append(tr);
    table.append(thead);
  }

  if (arguments_.rows && arguments_.rows.length > 0) {
    const tbody = document.createElement('tbody');

    for (const row of arguments_.rows) {
      const tr = document.createElement('tr');
      for (const cell of row) {
        const td = document.createElement('td');
        td.innerHTML = cell;
        td.className = 'gi-table-td';
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

  return table;
};

const createElement = (arguments_: TablePropsExtension) => {
  const component = createTable(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  args: {
    captionText: 'Default Table Example',
    headers: [{ text: 'Name' }, { text: 'Email' }, { text: 'Role' }],
    rows: [
      [
        { content: 'John Doe' },
        { content: 'john.doe@example.com' },
        { content: 'Admin' },
      ],
      [
        { content: 'Jane Smith' },
        { content: 'jane.smith@example.com' },
        { content: 'User' },
      ],
      [
        { content: 'Sam Lee' },
        { content: 'sam.lee@example.com' },
        { content: 'Editor' },
      ],
    ],
  },
};

export const WithAlignment: Story = {
  args: {
    captionText: 'Table With Text Alignment',
    headers: [
      { text: 'Name', align: 'left' },
      { text: 'Age', align: 'center' },
      { text: 'Balance', align: 'right' },
    ],
    rows: [
      [
        { content: 'Alice', align: 'left' },
        { content: '30', align: 'center' },
        { content: '$1,000.00', align: 'right' },
      ],
      [
        { content: 'Bob', align: 'left' },
        { content: '45', align: 'center' },
        { content: '$2,500.00', align: 'right' },
      ],
      [
        { content: 'Charlie', align: 'left' },
        { content: '28', align: 'center' },
        { content: '$900.00', align: 'right' },
      ],
    ],
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithInteractiveElements: Story = {
  args: {
    captionText: 'Table with Interactive Elements',
    headers: [{ text: 'Item' }, { text: 'Quantity' }, { text: 'Action' }],
    rows: [
      [
        { content: 'Apple' },
        { content: '5' },
        {
          content: `<span
            class="gi-tooltip-wrapper"
            data-module="gieds-tooltip"
          >
            <button
              data-testid="govieButton-default-primary-medium-notDisabled"
              data-element="button-container"
              data-module="gieds-button"
              class="gi-btn gi-btn-primary gi-btn-regular"
            >
              Edit
            </button>
            <span
              role="tooltip"
              class="gi-tooltip gi-tooltip-right"
              aria-hidden="true"
            >
              Edit.
            </span>
          </span>`,
        },
      ],
      [
        { content: 'Banana' },
        { content: '10' },
        {
          content: `<span
            class="gi-tooltip-wrapper"
            data-module="gieds-tooltip"
          >
            <button
              data-testid="govieButton-default-primary-medium-notDisabled"
              data-element="button-container"
              data-module="gieds-button"
              class="gi-btn gi-btn-primary gi-btn-regular"
            >
              Edit
            </button>
            <span
              role="tooltip"
              class="gi-tooltip gi-tooltip-right"
              aria-hidden="true"
            >
              Edit.
            </span>
          </span>`,
        },
      ],
      [
        { content: 'Cherry' },
        { content: '20' },
        {
          content: `<span
            class="gi-tooltip-wrapper"
            data-module="gieds-tooltip"
          >
            <button
              data-testid="govieButton-default-primary-medium-notDisabled"
              data-element="button-container"
              data-module="gieds-button"
              class="gi-btn gi-btn-primary gi-btn-regular"
            >
              Edit
            </button>
            <span
              role="tooltip"
              class="gi-tooltip gi-tooltip-right"
              aria-hidden="true"
            >
              Edit.
            </span>
          </span>`,
        },
      ],
    ],
  },
  render: (arguments_) => createElement(arguments_),
};

export const NoHeaders: Story = {
  args: {
    captionText: 'Table Without Headers',
    rows: [
      [
        { content: 'Row 1, Cell 1' },
        { content: 'Row 1, Cell 2' },
        { content: 'Row 1, Cell 3' },
      ],
      [
        { content: 'Row 2, Cell 1' },
        { content: 'Row 2, Cell 2' },
        { content: 'Row 2, Cell 3' },
      ],
      [
        { content: 'Row 3, Cell 1' },
        { content: 'Row 3, Cell 2' },
        { content: 'Row 3, Cell 3' },
      ],
    ],
  },
  render: (arguments_) => createElement(arguments_),
};

export const EmptyTable: Story = {
  args: {
    captionText: 'Empty Table Example',
    headers: [{ text: 'Item' }, { text: 'Quantity' }, { text: 'Action' }],
    rows: [],
  },
  render: (arguments_) => createElement(arguments_),
};
