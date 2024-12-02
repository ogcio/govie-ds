import type { Meta, StoryObj } from '@storybook/react';
import { Caption } from './caption.js';
import { TableBody } from './table-body.js';
import { TableData } from './table-data.js';
import { TableFoot } from './table-foot.js';
import { TableHead } from './table-head.js';
import { TableHeader } from './table-header.js';
import { TableRow } from './table-row.js';
import { Table } from './table.js';
import { Tag } from '../tag/tag.js';
import { IconButton } from '../icon-button/icon-button.js';

const meta = {
  title: 'components/Table',
  component: Table,
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultIcons = ['map', 'download', 'delete'];

export const Default: Story = {
  args: {
    children: (
      <>
        <Caption>This is caption</Caption>
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Country</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableData>1</TableData>
            <TableData>Cork</TableData>
            <TableData>
              <Tag text="Approved" type="success" />
            </TableData>
            <TableData>
              {defaultIcons.map((icon) => (
                <IconButton
                  icon={{
                    icon,
                  }}
                  onClick={() => {}}
                  variant="flat"
                  size="large"
                  className="!gi-inline"
                />
              ))}
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>2</TableData>
            <TableData>Limerick</TableData>
            <TableData>
              <Tag text="Approved" type="success" />
            </TableData>
            <TableData>
              {defaultIcons.map((icon) => (
                <IconButton
                  icon={{
                    icon,
                  }}
                  onClick={() => {}}
                  variant="flat"
                  size="large"
                  className="!gi-inline"
                />
              ))}
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>3</TableData>
            <TableData>Dublin</TableData>
            <TableData>
              <Tag text="Rejected" type="error" />
            </TableData>
            <TableData>
              {defaultIcons.map((icon) => (
                <IconButton
                  icon={{
                    icon,
                  }}
                  onClick={() => {}}
                  variant="flat"
                  size="large"
                  className="!gi-inline"
                />
              ))}
            </TableData>
          </TableRow>
        </TableBody>
        {/* <TableFoot>
          <TableRow>
            <TableHeader>This is a foot</TableHeader>
          </TableRow>
        </TableFoot> */}
      </>
    ),
  },
};
