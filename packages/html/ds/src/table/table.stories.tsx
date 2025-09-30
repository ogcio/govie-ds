import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { expect, within } from 'storybook/test';
import { createIconButton } from '../helpers/buttons';
import { createCheckbox } from '../helpers/forms';
import { createLink } from '../helpers/links';
import { createTable, createTableCell } from '../helpers/table';
import { createTag } from '../helpers/typography';
import { beautifyHtmlNode } from '../storybook/storybook';
import { TablePropsExtension } from './types';

const basicTableRows = [
  [
    beautifyHtmlNode(createTableCell('John Doe')),
    beautifyHtmlNode(createTableCell('john.doe@example.com')),
    beautifyHtmlNode(createTableCell('Admin')),
  ],
  [
    beautifyHtmlNode(createTableCell('Jane Smith')),
    beautifyHtmlNode(createTableCell('jane.smith@example.com')),
    beautifyHtmlNode(createTableCell('User')),
  ],
  [
    beautifyHtmlNode(createTableCell('Sam Lee')),
    beautifyHtmlNode(createTableCell('sam.lee@example.com')),
    beautifyHtmlNode(createTableCell('Editor')),
  ],
];

const meta: Meta<TablePropsExtension> = {
  title: 'Components/Table',
  parameters: {
    docs: {
      description: {
        component:
          'A flexible table component that supports dynamic rows, headers, and custom captions. Each cell can include various interactive elements like checkboxes, buttons, and tags.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<TablePropsExtension>;

const createElement = (arguments_: TablePropsExtension) => {
  const component = createTable(arguments_);

  return parse(component.outerHTML) as React.ReactElement;
};

export const Default: Story = {
  args: {
    captionText: 'Table Caption',
    headers: [
      'Select',
      'ID',
      'County',
      'Description',
      'Total',
      'Link',
      'Status',
      'Download',
    ],
    rows: [
      [
        beautifyHtmlNode(
          createCheckbox({
            id: '1',
            value: '1',
            dataTableCell: true,
            ariaLabel: 'Select row 1',
          }),
        ),
        beautifyHtmlNode(createTableCell('1')),
        beautifyHtmlNode(createTableCell('Cork')),
        beautifyHtmlNode(createTableCell('Lorem ipsum')),
        beautifyHtmlNode(createTableCell('€900,000')),
        beautifyHtmlNode(
          createTableCell(
            beautifyHtmlNode(createLink({ href: '#', content: 'Link' })),
          ),
        ),
        beautifyHtmlNode(
          createTableCell(
            beautifyHtmlNode(createTag({ text: 'Approved', type: 'success' })),
          ),
        ),
        beautifyHtmlNode(
          createTableCell(
            beautifyHtmlNode(
              createIconButton({
                icon: { icon: 'download' },
                appearance: 'dark',
                variant: 'flat',
                size: 'large',
              }),
            ),
          ),
        ),
      ],
      [
        beautifyHtmlNode(
          createCheckbox({
            id: '2',
            value: '2',
            dataTableCell: true,
            ariaLabel: 'Select row 2',
          }),
        ),
        beautifyHtmlNode(createTableCell('2')),
        beautifyHtmlNode(createTableCell('Limerick')),
        beautifyHtmlNode(createTableCell('Lorem ipsum')),
        beautifyHtmlNode(createTableCell('€100,000')),
        beautifyHtmlNode(
          createTableCell(
            beautifyHtmlNode(createLink({ href: '#', content: 'Link' })),
          ),
        ),
        beautifyHtmlNode(
          createTableCell(
            beautifyHtmlNode(createTag({ text: 'Approved', type: 'success' })),
          ),
        ),
        beautifyHtmlNode(
          createTableCell(
            beautifyHtmlNode(
              createIconButton({
                icon: { icon: 'download' },
                appearance: 'dark',
                variant: 'flat',
                size: 'large',
              }),
            ),
          ),
        ),
      ],
      [
        beautifyHtmlNode(
          createCheckbox({
            id: '3',
            value: '3',
            dataTableCell: true,
            ariaLabel: 'Select row 3',
          }),
        ),
        beautifyHtmlNode(createTableCell('3')),
        beautifyHtmlNode(createTableCell('Dublin')),
        beautifyHtmlNode(
          createTableCell('Lorem ipsum Lorem ipsum Lorem ipsum'),
        ),
        beautifyHtmlNode(createTableCell('€500,000')),
        beautifyHtmlNode(
          createTableCell(
            beautifyHtmlNode(createLink({ href: '#', content: 'Link' })),
          ),
        ),
        beautifyHtmlNode(
          createTableCell(
            beautifyHtmlNode(createTag({ text: 'Rejected', type: 'error' })),
          ),
        ),
        beautifyHtmlNode(
          createTableCell(
            beautifyHtmlNode(
              createIconButton({
                icon: { icon: 'download' },
                appearance: 'dark',
                variant: 'flat',
                size: 'large',
              }),
            ),
          ),
        ),
      ],
      [
        beautifyHtmlNode(
          createCheckbox({
            id: '4',
            value: '4',
            dataTableCell: true,
            ariaLabel: 'Select row 4',
          }),
        ),
        beautifyHtmlNode(createTableCell('4')),
        beautifyHtmlNode(createTableCell('Donegal')),
        beautifyHtmlNode(
          createTableCell('Lorem ipsum Lorem ipsum Lorem ipsum'),
        ),
        beautifyHtmlNode(createTableCell('€400,000')),
        beautifyHtmlNode(
          createTableCell(
            beautifyHtmlNode(createLink({ href: '#', content: 'Link' })),
          ),
        ),
        beautifyHtmlNode(
          createTableCell(
            beautifyHtmlNode(createTag({ text: 'Pending', type: 'info' })),
          ),
        ),
        beautifyHtmlNode(
          createTableCell(
            beautifyHtmlNode(
              createIconButton({
                icon: { icon: 'download' },
                appearance: 'dark',
                variant: 'flat',
                size: 'large',
              }),
            ),
          ),
        ),
      ],
    ],
  },
  render: (arguments_) => createElement(arguments_),
};

export const BasicTable: Story = {
  args: {
    captionText: 'Default Table Example',
    headers: ['Name', 'Email', 'Role'],
    rows: [
      [
        beautifyHtmlNode(createTableCell('John Doe')),
        beautifyHtmlNode(createTableCell('john.doe@example.com')),
        beautifyHtmlNode(createTableCell('Admin')),
      ],
      [
        beautifyHtmlNode(createTableCell('Jane Smith')),
        beautifyHtmlNode(createTableCell('jane.smith@example.com')),
        beautifyHtmlNode(createTableCell('User')),
      ],
      [
        beautifyHtmlNode(createTableCell('Sam Lee')),
        beautifyHtmlNode(createTableCell('sam.lee@example.com')),
        beautifyHtmlNode(createTableCell('Editor')),
      ],
    ],
  },
  render: (arguments_) => createElement(arguments_),
};

export const BasicTableWithNoBorder: Story = {
  args: {
    noBorder: true,
    captionText: 'Default Table Example',
    headers: ['Name', 'Email', 'Role'],
    rows: [
      [
        beautifyHtmlNode(createTableCell('John Doe')),
        beautifyHtmlNode(createTableCell('john.doe@example.com')),
        beautifyHtmlNode(createTableCell('Admin')),
      ],
      [
        beautifyHtmlNode(createTableCell('Jane Smith')),
        beautifyHtmlNode(createTableCell('jane.smith@example.com')),
        beautifyHtmlNode(createTableCell('User')),
      ],
      [
        beautifyHtmlNode(createTableCell('Sam Lee')),
        beautifyHtmlNode(createTableCell('sam.lee@example.com')),
        beautifyHtmlNode(createTableCell('Editor')),
      ],
    ],
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByRole('table');

    expect(table).toHaveClass('gi-table-no-border');
  },
};

export const WithInteractiveElements: Story = {
  args: {
    captionText: 'Table with Interactive Elements',
    headers: ['Item', 'Quantity', 'Action'],
    rows: [
      [
        beautifyHtmlNode(createTableCell('Apple')),
        beautifyHtmlNode(createTableCell('5')),
        beautifyHtmlNode(
          createTableCell(`
            <span
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
            </span>
          `),
        ),
      ],
      [
        beautifyHtmlNode(createTableCell('Banana')),
        beautifyHtmlNode(createTableCell('10')),
        beautifyHtmlNode(
          createTableCell(`
            <span
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
            </span>
          `),
        ),
      ],
      [
        beautifyHtmlNode(createTableCell('Cherry')),
        beautifyHtmlNode(createTableCell('20')),
        beautifyHtmlNode(
          createTableCell(`
            <span
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
            </span>
          `),
        ),
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
        beautifyHtmlNode(createTableCell('Row 1, Cell 1')),
        beautifyHtmlNode(createTableCell('Row 1, Cell 2')),
        beautifyHtmlNode(createTableCell('Row 1, Cell 3')),
      ],
      [
        beautifyHtmlNode(createTableCell('Row 2, Cell 1')),
        beautifyHtmlNode(createTableCell('Row 2, Cell 2')),
        beautifyHtmlNode(createTableCell('Row 2, Cell 3')),
      ],
      [
        beautifyHtmlNode(createTableCell('Row 3, Cell 1')),
        beautifyHtmlNode(createTableCell('Row 3, Cell 2')),
        beautifyHtmlNode(createTableCell('Row 3, Cell 3')),
      ],
    ],
  },
  render: (arguments_) => createElement(arguments_),
};

export const EmptyTable: Story = {
  args: {
    captionText: 'Empty Table Example',
    headers: ['Item', 'Quantity', 'Action'],
    rows: [],
  },
  render: (arguments_) => createElement(arguments_),
};

export const TableWithFooter: Story = {
  args: {
    captionText: 'Interactive Table with Footer',
    headers: ['Select', 'Project', 'Manager', 'Budget', 'Status', 'Actions'],
    rows: [
      [
        beautifyHtmlNode(
          createCheckbox({
            id: '1',
            value: '1',
            dataTableCell: true,
            ariaLabel: 'Select project 1',
          }),
        ),
        beautifyHtmlNode(createTableCell('Digital Transformation')),
        beautifyHtmlNode(
          createTableCell(
            beautifyHtmlNode(
              createLink({ href: '#', content: 'View Profile' }),
            ),
          ),
        ),
        beautifyHtmlNode(createTableCell('€1,500,000')),
        beautifyHtmlNode(
          createTableCell(
            beautifyHtmlNode(createTag({ text: 'On Track', type: 'success' })),
          ),
        ),
        beautifyHtmlNode(
          createTableCell(`
            <div class="gi-flex">
              <span class="gi-tooltip-wrapper" data-module="gieds-tooltip">
                ${beautifyHtmlNode(
                  createIconButton({
                    icon: { icon: 'edit' },
                    appearance: 'dark',
                    variant: 'flat',
                    size: 'large',
                  }),
                )}
                <span role="tooltip" class="gi-tooltip gi-tooltip-top" aria-hidden="true">
                  Edit the project
                </span>
              </span>
              <span class="gi-tooltip-wrapper" data-module="gieds-tooltip">
                ${beautifyHtmlNode(
                  createIconButton({
                    icon: { icon: 'delete' },
                    appearance: 'dark',
                    variant: 'flat',
                    size: 'large',
                  }),
                )}
                <span role="tooltip" class="gi-tooltip gi-tooltip-top" aria-hidden="true">
                  Delete the project
                </span>
              </span>
            </div>
          `),
        ),
      ],
      [
        beautifyHtmlNode(
          createCheckbox({
            id: '2',
            value: '2',
            dataTableCell: true,
            ariaLabel: 'Select project 2',
          }),
        ),
        beautifyHtmlNode(createTableCell('Customer Experience')),
        beautifyHtmlNode(
          createTableCell(
            beautifyHtmlNode(
              createLink({ href: '#', content: 'View Profile' }),
            ),
          ),
        ),
        beautifyHtmlNode(createTableCell('€750,000')),
        beautifyHtmlNode(
          createTableCell(
            beautifyHtmlNode(createTag({ text: 'At Risk', type: 'warning' })),
          ),
        ),
        beautifyHtmlNode(
          createTableCell(`
            <div class="gi-flex">
              <span class="gi-tooltip-wrapper" data-module="gieds-tooltip">
                ${beautifyHtmlNode(
                  createIconButton({
                    icon: { icon: 'edit' },
                    appearance: 'dark',
                    variant: 'flat',
                    size: 'large',
                  }),
                )}
                <span role="tooltip" class="gi-tooltip gi-tooltip-top" aria-hidden="true">
                  Edit the project
                </span>
              </span>
              <span class="gi-tooltip-wrapper" data-module="gieds-tooltip">
                ${beautifyHtmlNode(
                  createIconButton({
                    icon: { icon: 'delete' },
                    appearance: 'dark',
                    variant: 'flat',
                    size: 'large',
                  }),
                )}
                <span role="tooltip" class="gi-tooltip gi-tooltip-top" aria-hidden="true">
                  Delete the project
                </span>
              </span>
            </div>
          `),
        ),
      ],
      [
        beautifyHtmlNode(
          createCheckbox({
            id: '3',
            value: '3',
            dataTableCell: true,
            ariaLabel: 'Select project 3',
          }),
        ),
        beautifyHtmlNode(createTableCell('Sustainability Initiative')),
        beautifyHtmlNode(
          createTableCell(
            beautifyHtmlNode(
              createLink({ href: '#', content: 'View Profile' }),
            ),
          ),
        ),
        beautifyHtmlNode(createTableCell('€2,250,000')),
        beautifyHtmlNode(
          createTableCell(
            beautifyHtmlNode(
              createTag({ text: 'Behind Schedule', type: 'error' }),
            ),
          ),
        ),
        beautifyHtmlNode(
          createTableCell(`
            <div class="gi-flex">
              <span class="gi-tooltip-wrapper" data-module="gieds-tooltip">
                ${beautifyHtmlNode(
                  createIconButton({
                    icon: { icon: 'edit' },
                    appearance: 'dark',
                    variant: 'flat',
                    size: 'large',
                  }),
                )}
                <span role="tooltip" class="gi-tooltip gi-tooltip-top" aria-hidden="true">
                  Edit the project
                </span>
              </span>
              <span class="gi-tooltip-wrapper" data-module="gieds-tooltip">
                ${beautifyHtmlNode(
                  createIconButton({
                    icon: { icon: 'delete' },
                    appearance: 'dark',
                    variant: 'flat',
                    size: 'large',
                  }),
                )}
                <span role="tooltip" class="gi-tooltip gi-tooltip-top" aria-hidden="true">
                  Delete the project
                </span>
              </span>
            </div>
          `),
        ),
      ],
    ],
    foot: [
      {
        content: 'Total Budget: &nbsp;',
        colSpan: 3,
        className: 'gi-font-bold gi-text-right gi-py-4',
      },
      {
        content: '€4,500,000',
        colSpan: 3,
        className: 'gi-font-bold gi-text-left gi-py-4',
      },
    ],
  },
  render: (arguments_) => createElement(arguments_),
};

export const AlignedColumns: Story = {
  args: {
    captionText: 'Employee Salaries',
    headers: [
      { content: 'Name', align: 'left' },
      { content: 'Role', align: 'center' },
      { content: 'Salary', align: 'right' },
    ],
    rows: [
      [
        beautifyHtmlNode(createTableCell('Alice Johnson', 'left')),
        beautifyHtmlNode(createTableCell('Manager', 'center')),
        beautifyHtmlNode(createTableCell('€80,000', 'right')),
      ],
      [
        beautifyHtmlNode(createTableCell('Bob Martin', 'left')),
        beautifyHtmlNode(createTableCell('Engineer', 'center')),
        beautifyHtmlNode(createTableCell('€65,000', 'right')),
      ],
      [
        beautifyHtmlNode(createTableCell('Carla Gomez', 'left')),
        beautifyHtmlNode(createTableCell('Designer', 'center')),
        beautifyHtmlNode(createTableCell('€70,000', 'right')),
      ],
    ],
  },
  render: (arguments_) => createElement(arguments_),
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates how to align table cell content.' +
          'Name is left-aligned, Role is center-aligned, and Salary is right-aligned, showcasing how alignment can be controlled per column.',
      },
    },
  },
};

export const WithStripped: Story = {
  args: {
    captionText: 'Default Table Example',
    headers: ['Name', 'Email', 'Role'],
    stripped: true,
    rows: basicTableRows,
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithSmallRowSize: Story = {
  args: {
    captionText: 'Small Table Row',
    rowSize: 'sm',
    headers: ['Name', 'Email', 'Role'],
    rows: basicTableRows,
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithMediumRowSize: Story = {
  args: {
    captionText: 'Medium Table Row',
    rowSize: 'md',
    headers: ['Name', 'Email', 'Role'],
    rows: basicTableRows,
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithLargeRowSize: Story = {
  args: {
    captionText: 'Large Table Row',
    rowSize: 'lg',
    headers: ['Name', 'Email', 'Role'],
    rows: basicTableRows,
  },
  render: (arguments_) => createElement(arguments_),
};
