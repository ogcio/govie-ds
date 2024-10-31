import { Caption } from './caption.js';
import { TableBody } from './table-body.js';
import { TableData } from './table-data.js';
import { TableFoot } from './table-foot.js';
import { TableHead } from './table-head.js';
import { TableHeader } from './table-header.js';
import { TableRow } from './table-row.js';

export const TableContent = (
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
);
