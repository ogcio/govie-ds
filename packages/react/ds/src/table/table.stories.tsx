import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { Checkbox } from '../checkbox/checkbox.js';
import { IconButton } from '../icon-button/icon-button.js';
import { Link } from '../link/link.js';
import { Spinner } from '../spinner/spinner.js';
import { Tag, TagTypeEnum } from '../tag/tag.js';
import { Tooltip } from '../tooltip/tooltip.js';
import { Caption } from './caption.js';
import { TableBody } from './table-body.js';
import { TableData } from './table-data.js';
import { TableFoot } from './table-foot.js';
import { TableHead } from './table-head.js';
import { TableHeader } from './table-header.js';
import { TableRow } from './table-row.js';
import { Table } from './table.js';

interface TableRowData {
  [key: string]: any;
}

interface TableStoryProps extends ComponentProps<typeof Table> {
  captionText?: string;
  headers?: string[];
  rows?: TableRowData[];
}

const iconProps: any = {
  icon: {
    icon: 'download',
  },
  onClick: () => {},
  variant: 'flat',
  appearance: 'dark',
  size: 'large',
};

const defaultValueHeaders = [
  'Select',
  'ID',
  'County',
  'Description',
  'Total',
  'Link',
  'Status',
  'Download',
];

const defaultValueRows = [
  {
    id: 1,
    county: 'Cork',
    description: 'Lorem ipsum',
    total: '€900,000',
    status: { text: 'Approved', type: TagTypeEnum.Success },
  },
  {
    id: 2,
    county: 'Limerick',
    description: 'Lorem ipsum',
    total: '€100,000',
    status: { text: 'Approved', type: TagTypeEnum.Success },
  },
  {
    id: 3,
    county: 'Dublin',
    description: 'Lorem ipsum Lorem ipsum Lorem ipsum',
    total: '€500,000',
    status: { text: 'Rejected', type: TagTypeEnum.Error },
  },
  {
    id: 4,
    county: 'Donegal',
    description: 'Lorem ipsum Lorem ipsum Lorem ipsum',
    total: '€400,000',
    status: { text: 'Pending', type: TagTypeEnum.Info },
  },
];

const meta = {
  title: 'components/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: `A flexible table component that supports dynamic rows, headers, and custom captions.
        Each cell can include various interactive elements like checkboxes, buttons, and tags.`,
      },
    },
  },
  argTypes: {
    captionText: {
      description: 'The caption displayed above the table.',
      control: 'text',
      defaultValue: 'Table Caption',
    },
    headers: {
      description: 'An array of column headers for the table.',
      control: 'object',
      defaultValue: defaultValueHeaders,
    },
    rows: {
      description:
        'An array of row data objects. Each object represents a row in the table.',
      control: 'object',
      defaultValue: defaultValueRows,
    },
  },
} satisfies Meta<TableStoryProps>;

export default meta;
type Story = StoryObj<TableStoryProps>;

export const Default: Story = {
  args: {
    captionText: 'Table Caption',
    headers: defaultValueHeaders,
    rows: defaultValueRows,
  },
  render: ({ captionText, headers, rows }) => (
    <Table>
      <Caption>{captionText}</Caption>
      <TableHead>
        <TableRow>
          {headers?.map((heading, index) => (
            <TableHeader key={`header-${index}`}>{heading}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows?.map((row) => (
          <TableRow key={`row-${row.id}`}>
            <TableData>
              <Checkbox
                aria-label={`checkbox-id-${row.id}`}
                id={`checkbox-id-${row.id}`}
                value={row.id.toString()}
              />
            </TableData>
            <TableData>{row.id}</TableData>
            <TableData>{row.county}</TableData>
            <TableData>{row.description}</TableData>
            <TableData>{row.total}</TableData>

            <TableData>
              <Link href="#">Link</Link>
            </TableData>
            <TableData>
              <Tag text={row.status.text} type={row.status.type} />
            </TableData>
            <TableData>
              <IconButton {...iconProps} />
            </TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
export const BasicTable: Story = {
  args: {
    captionText: 'User Information',
    headers: ['Name', 'Email', 'Role'],
    rows: [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'User',
      },
      {
        id: 3,
        name: 'Sam Lee',
        email: 'sam.lee@example.com',
        role: 'Editor',
      },
    ],
  },
  render: ({ captionText, headers, rows }) => (
    <Table>
      <Caption>{captionText}</Caption>
      <TableHead>
        <TableRow>
          {headers?.map((heading, index) => (
            <TableHeader key={`header-${index}`}>{heading}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows?.map((row) => (
          <TableRow key={`row-${row.id}`}>
            <TableData>{row.name}</TableData>
            <TableData>{row.email}</TableData>
            <TableData>{row.role}</TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const TableWithFooter: Story = {
  args: {
    captionText: 'Interactive Table with Footer',
    headers: ['Select', 'Project', 'Manager', 'Budget', 'Status', 'Actions'],
    rows: [
      {
        id: 1,
        county: 'Digital Transformation',
        description: 'Enterprise-wide system upgrade',
        total: '€1,500,000',
        status: { text: 'On Track', type: TagTypeEnum.Success },
      },
      {
        id: 2,
        county: 'Customer Experience',
        description: 'UX redesign and implementation',
        total: '€750,000',
        status: { text: 'At Risk', type: TagTypeEnum.Warning },
      },
      {
        id: 3,
        county: 'Sustainability Initiative',
        description: 'Carbon neutrality program',
        total: '€2,250,000',
        status: { text: 'Behind Schedule', type: TagTypeEnum.Error },
      },
    ],
  },
  render: ({ captionText, headers, rows }) => (
    <Table>
      <Caption>{captionText}</Caption>
      <TableHead>
        <TableRow>
          {headers?.map((heading, index) => (
            <TableHeader key={`header-${index}`}>{heading}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows?.map((row) => (
          <TableRow key={`row-${row.id}`}>
            <TableData>
              <Checkbox
                aria-label={`checkbox-id-${row.id}`}
                id={`project-select-${row.id}`}
                value={row.id.toString()}
              />
            </TableData>
            <TableData>{row.county}</TableData>
            <TableData>
              <Link href="#">View Profile</Link>
            </TableData>
            <TableData>{row.total}</TableData>
            <TableData>
              <Tag text={row.status.text} type={row.status.type} />
            </TableData>
            <TableData>
              <div className="gi-flex">
                <Tooltip text="Edit the project" position="top">
                  <IconButton
                    icon={{ icon: 'edit' }}
                    onClick={() => alert(`Edit project ${row.id}`)}
                    variant="flat"
                    appearance="dark"
                    size="large"
                  />
                </Tooltip>
                <Tooltip text="Delete the project" position="top">
                  <IconButton
                    icon={{ icon: 'delete' }}
                    onClick={() => alert(`Delete project ${row.id}`)}
                    variant="flat"
                    appearance="dark"
                    size="large"
                  />
                </Tooltip>
              </div>
            </TableData>
          </TableRow>
        ))}
      </TableBody>
      <TableFoot>
        <TableRow>
          <TableData colSpan={3} className="gi-font-bold gi-text-right gi-py-4">
            Total Budget:
          </TableData>
          <TableData colSpan={3} className="gi-font-bold gi-text-left gi-py-4">
            €4,500,000
          </TableData>
        </TableRow>
      </TableFoot>
    </Table>
  ),
};

export const AlignedColumns: Story = {
  args: {
    captionText: 'Employee Salaries',
    headers: ['Name', 'Role', 'Salary'],
    rows: [
      {
        id: 1,
        name: 'Alice Johnson',
        role: 'Manager',
        salary: '€80,000',
      },
      {
        id: 2,
        name: 'Bob Martin',
        role: 'Engineer',
        salary: '€65,000',
      },
      {
        id: 3,
        name: 'Carla Gomez',
        role: 'Designer',
        salary: '€70,000',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates how to align table cell content using the `align` prop on `TableHeader` and `TableData`. ' +
          '`Name` is left-aligned, `Role` is center-aligned, and `Salary` is right-aligned, showcasing how alignment can be controlled per column.',
      },
    },
  },
  render: ({ captionText, headers, rows }) => (
    <Table>
      <Caption>{captionText}</Caption>
      <TableHead>
        <TableRow>
          <TableHeader align="left">{headers?.[0]}</TableHeader>
          <TableHeader align="center">{headers?.[1]}</TableHeader>
          <TableHeader align="right">{headers?.[2]}</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows?.map((row) => (
          <TableRow key={`row-${row.id}`}>
            <TableData align="left">{row.name}</TableData>
            <TableData align="center">{row.role}</TableData>
            <TableData align="right">{row.salary}</TableData>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const EmptyState: Story = {
  args: {
    captionText: 'No Data Available',
    headers: ['ID', 'Name', 'Status'],
    rows: [],
  },
  render: ({ captionText, headers = [] }) => (
    <Table>
      <Caption>{captionText}</Caption>
      <TableHead>
        <TableRow>
          {headers?.map((heading, index) => (
            <TableHeader key={`header-${index}`}>{heading}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableData colSpan={headers.length} className="gi-table-no-data">
            No data to display
          </TableData>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const LoadingState: Story = {
  args: {
    captionText: 'Loading State',
    headers: ['ID', 'Name', 'Status'],
    rows: [],
  },
  render: ({ captionText, headers = [] }) => (
    <Table>
      <Caption>{captionText}</Caption>
      <TableHead>
        <TableRow>
          {headers?.map((heading, index) => (
            <TableHeader key={`header-${index}`}>{heading}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableData
            colSpan={headers.length}
            className="gi-table-loading gi-justify-items-center"
          >
            <div className="gi-stroke-gray-950">
              <Spinner size="xl" />
            </div>
          </TableData>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
