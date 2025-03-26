import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './table.html?raw';
import { TableProps } from './table.schema';

const macro = { name: 'govieTable', html };
const Table = renderComponent<TableProps>(macro);

const meta = {
  component: Table,
  title: 'components/Table',
  parameters: {
    macro,
    docs: {
      description: {
        component: `A flexible table component that supports dynamic rows, headers, and custom captions.
          Each cell can include various interactive elements like checkboxes, buttons, and tags.`,
      },
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

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
    aria: {
      'aria-rowcount': '3',
      'aria-colcount': '3',
    },
  },
};

export const EmptyTable: Story = {
  args: {
    captionText: 'Empty Table Example',
    headers: [{ text: 'Item' }, { text: 'Quantity' }, { text: 'Action' }],
    rows: [],
  },
};
