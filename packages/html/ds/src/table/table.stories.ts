import type { Meta, StoryObj } from '@storybook/react';
import { createIconButton } from '../helpers/buttons';
import { createCheckbox } from '../helpers/forms';
import { createLink } from '../helpers/links';
import { createTable } from '../helpers/table';
import { createTag } from '../helpers/typography';
import { beautifyHtmlNode } from '../storybook/storybook';
import { TablePropsExtension } from './types';

const meta: Meta<TablePropsExtension> = {
  title: 'Components/Table',
  parameters: {
    docs: {
      description: {
        component: `A flexible table component that supports dynamic rows, headers, and custom captions.
        Each cell can include various interactive elements like checkboxes, buttons, and tags.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<TablePropsExtension>;

const createElement = (arguments_: TablePropsExtension) => {
  const component = createTable(arguments_);
  return beautifyHtmlNode(component);
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
        beautifyHtmlNode(createCheckbox({ id: '1', value: '1' })),
        '1',
        'Cork',
        'Lorem ipsum',
        '€900,000',
        beautifyHtmlNode(createLink({ href: '#', content: 'Link' })),
        beautifyHtmlNode(createTag({ text: 'Approved', type: 'success' })),
        beautifyHtmlNode(
          createIconButton({
            icon: { icon: 'download' },
            appearance: 'dark',
            variant: 'flat',
            size: 'large',
          }),
        ),
      ],
      [
        beautifyHtmlNode(createCheckbox({ id: '2', value: '2' })),
        '2',
        'Limerick',
        'Lorem ipsum',
        '€100,000',
        beautifyHtmlNode(createLink({ href: '#', content: 'Link' })),
        beautifyHtmlNode(createTag({ text: 'Approved', type: 'success' })),
        beautifyHtmlNode(
          createIconButton({
            icon: { icon: 'download' },
            appearance: 'dark',
            variant: 'flat',
            size: 'large',
          }),
        ),
      ],
      [
        beautifyHtmlNode(createCheckbox({ id: '3', value: '3' })),
        '3',
        'Dublin',
        'Lorem ipsum Lorem ipsum Lorem ipsum',
        '€500,000',
        beautifyHtmlNode(createLink({ href: '#', content: 'Link' })),
        beautifyHtmlNode(createTag({ text: 'Rejected', type: 'error' })),
        beautifyHtmlNode(
          createIconButton({
            icon: { icon: 'download' },
            appearance: 'dark',
            variant: 'flat',
            size: 'large',
          }),
        ),
      ],
      [
        beautifyHtmlNode(createCheckbox({ id: '4', value: '4' })),
        '4',
        'Donegal',
        'Lorem ipsum Lorem ipsum Lorem ipsum',
        '€400,000',
        beautifyHtmlNode(createLink({ href: '#', content: 'Link' })),
        beautifyHtmlNode(createTag({ text: 'Pending', type: 'info' })),
        beautifyHtmlNode(
          createIconButton({
            icon: { icon: 'download' },
            appearance: 'dark',
            variant: 'flat',
            size: 'large',
          }),
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
      ['John Doe', 'john.doe@example.com', 'Admin'],
      ['Jane Smith', 'jane.smith@example.com', 'User'],
      ['Sam Lee', 'sam.lee@example.com', 'Editor'],
    ],
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithInteractiveElements: Story = {
  args: {
    captionText: 'Table with Interactive Elements',
    headers: ['Item', 'Quantity', 'Action'],
    rows: [
      [
        'Apple',
        '5',
        `<span
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
      ],
      [
        'Banana',
        '10',
        `<span
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
      ],
      [
        'Cherry',
        '20',
        `<span
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
      ],
    ],
  },
  render: (arguments_) => createElement(arguments_),
};

export const NoHeaders: Story = {
  args: {
    captionText: 'Table Without Headers',
    rows: [
      ['Row 1, Cell 1', 'Row 1, Cell 2', 'Row 1, Cell 3'],
      ['Row 2, Cell 1', 'Row 2, Cell 2', 'Row 2, Cell 3'],
      ['Row 3, Cell 1', 'Row 3, Cell 2', 'Row 3, Cell 3'],
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
        beautifyHtmlNode(createCheckbox({ id: '1', value: '1' })),
        'Digital Transformation',
        beautifyHtmlNode(createLink({ href: '#', content: 'View Profile' })),
        '€1,500,000',
        beautifyHtmlNode(createTag({ text: 'On Track', type: 'success' })),
        `
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
        `,
      ],
      [
        beautifyHtmlNode(createCheckbox({ id: '2', value: '2' })),
        'Customer Experience',
        beautifyHtmlNode(createLink({ href: '#', content: 'View Profile' })),
        '€750,000',
        beautifyHtmlNode(createTag({ text: 'At Risk', type: 'warning' })),
        `
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
        `,
      ],
      [
        beautifyHtmlNode(createCheckbox({ id: '3', value: '3' })),
        'Sustainability Initiative',
        beautifyHtmlNode(createLink({ href: '#', content: 'View Profile' })),
        '€2,250,000',
        beautifyHtmlNode(createTag({ text: 'Behind Schedule', type: 'error' })),
        `
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
        `,
      ],
    ],
    foot: [
      {
        content: 'Total Budget:',
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
  render: () => `
    <table class="gi-table gi-table-auto" role="table">
      <caption class="gi-table-caption-text gi-text-lg">
          Employee Salaries
      </caption>
      <thead>
          <tr>
              <th class="gi-text-left gi-align-middle gi-table-th">Name</th>
              <th class="gi-text-center gi-align-middle gi-table-th">Role</th>
              <th class="gi-text-right gi-align-middle gi-table-th">Salary</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td class="gi-text-left gi-align-middle gi-table-td">Alice Johnson</td>
              <td class="gi-text-center gi-align-middle gi-table-td">Manager</td>
              <td class="gi-text-right gi-align-middle gi-table-td">€80,000</td>
          </tr>
          <tr>
              <td class="gi-text-left gi-align-middle gi-table-td">Bob Martin</td>
              <td class="gi-text-center gi-align-middle gi-table-td">Engineer</td>
              <td class="gi-text-right gi-align-middle gi-table-td">€65,000</td>
          </tr>
          <tr>
              <td class="gi-text-left gi-align-middle gi-table-td">Carla Gomez</td>
              <td class="gi-text-center gi-align-middle gi-table-td">Designer</td>
              <td class="gi-text-right gi-align-middle gi-table-td">€70,000</td>
          </tr>
      </tbody>
    </table>
`,
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates how to align table cell content using the `align` prop on `TableHeader` and `TableData`. ' +
          '`Name` is left-aligned, `Role` is center-aligned, and `Salary` is right-aligned, showcasing how alignment can be controlled per column.',
      },
    },
  },
};
