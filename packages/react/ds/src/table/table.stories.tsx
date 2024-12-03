import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Checkbox from '../checkbox/checkbox.js';
import { IconButton } from '../icon-button/icon-button.js';
import { Link } from '../link/link.js';
import { Tag, TagType } from '../tag/tag.js';
import { Caption } from './caption.js';
import { TableBody } from './table-body.js';
import { TableData } from './table-data.js';
import { TableFoot } from './table-foot.js';
import { TableHead } from './table-head.js';
import { TableHeader } from './table-header.js';
import { TableRow } from './table-row.js';
import { Table } from './table.js';

interface TableRowData {
  id: number | string;
  county: string;
  description: string;
  total: string;
  status: {
    text: string;
    type: TagType;
  };
}

interface TableStoryProps extends React.ComponentProps<typeof Table> {
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
    status: { text: 'Approved', type: TagType.success },
  },
  {
    id: 2,
    county: 'Limerick',
    description: 'Lorem ipsum',
    total: '€100,000',
    status: { text: 'Approved', type: TagType.success },
  },
  {
    id: 3,
    county: 'Dublin',
    description: 'Lorem ipsum Lorem ipsum Lorem ipsum',
    total: '€500,000',
    status: { text: 'Rejected', type: TagType.error },
  },
  {
    id: 4,
    county: 'Donegal',
    description: 'Lorem ipsum Lorem ipsum Lorem ipsum',
    total: '€400,000',
    status: { text: 'Pending', type: TagType.info },
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
                label=" "
                checkboxId={`checkbox-id-${row.id}`}
                value={row.id.toString()}
                dataElement={`checkbox-id-${row.id}`}
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
        status: { text: 'On Track', type: TagType.success },
      },
      {
        id: 2,
        county: 'Customer Experience',
        description: 'UX redesign and implementation',
        total: '€750,000',
        status: { text: 'At Risk', type: TagType.warning },
      },
      {
        id: 3,
        county: 'Sustainability Initiative',
        description: 'Carbon neutrality program',
        total: '€2,250,000',
        status: { text: 'Behind Schedule', type: TagType.error },
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
                label=" "
                checkboxId={`project-select-${row.id}`}
                value={row.id.toString()}
                dataElement={`project-checkbox-${row.id}`}
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
                <IconButton
                  icon={{ icon: 'edit' }}
                  onClick={() => alert(`Edit project ${row.id}`)}
                  variant="flat"
                  size="large"
                />
                <IconButton
                  icon={{ icon: 'delete' }}
                  onClick={() => alert(`Delete project ${row.id}`)}
                  variant="flat"
                  size="large"
                />
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
          <TableData
            colSpan={headers.length}
            className="!gi-text-center !gi-border-0 !gi-py-8 !gi-px-4"
          >
            No data to display
          </TableData>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
