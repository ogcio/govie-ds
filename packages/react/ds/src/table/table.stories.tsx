import type { Meta, StoryObj } from '@storybook/react';
import { Caption } from './caption.js';
import { TableBody } from './table-body.js';
import { TableData } from './table-data.js';
import { TableFoot } from './table-foot.js';
import { TableHead } from './table-head.js';
import { TableHeader } from './table-header.js';
import { TableRow } from './table-row.js';
import { Table } from './table.js';

const meta = {
  title: 'components/Table',
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Caption>This is caption</Caption>
        <TableHead>
          <TableRow>
            <TableHeader>This is the table head</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableHeader>Header 1</TableHeader>
            <TableData>Data 1</TableData>
          </TableRow>
          <TableRow>
            <TableHeader>Header 2</TableHeader>
            <TableData>Data 2</TableData>
          </TableRow>
        </TableBody>
        <TableFoot>
          <TableRow>
            <TableHeader>This is a foot</TableHeader>
          </TableRow>
        </TableFoot>
      </>
    ),
  },
};
