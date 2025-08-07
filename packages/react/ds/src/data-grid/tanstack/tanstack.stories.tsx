'use client';
import type { Meta, StoryObj } from '@storybook/react';
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import type { ExpandedState } from '@tanstack/react-table';
import { debounce } from 'lodash';
import { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useForm, FieldErrors, FieldError } from 'react-hook-form';
import { InputCheckboxTableCell } from '../../input-checkbox/input-checkbox.js';
import { InputText } from '../../input-text/input-text.js';
import { Label } from '../../label/label.js';
import { Link } from '../../link/link.js';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableData,
} from '../../table/index.js';
import { TableExpandIcon, TableDataSlot } from '../../table/table-data.js';
import { TablePagination } from '../../table/table-pagination.js';
import { Tag, TagTypeEnum } from '../../tag/tag.js';
import { EditableTableCell } from '../editable-table-cell.js';
import { makeData } from './tanstack-helpers.js';
import {
  TanstackFooter,
  TanstackFooterCenter,
  TanstackFooterEnd,
  TanstackFooterStart,
} from './tanstack-footer.js';
import { expect, within } from 'storybook/test';

declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

const meta = {
  title: 'Data Grid/TanStack',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'An editable data table built with TanStack Table and React Hook Form. Supports inline editing for InputText, InputCheckbox and Select',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="gi-p-6 gi-h-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<FC>;

type Story = StoryObj<typeof meta>;

export type Person = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  city: string;
  status: 'pending' | 'in progress' | 'accepted' | 'declined';
  disabledFields?: string[];
};

const getFieldError = (
  errors: FieldErrors<Record<number, any>>,
  rowIndex: number,
  columnId: any,
): FieldError | undefined =>
  (errors?.[rowIndex] as Record<string, FieldError | undefined>)?.[columnId];

export const WithReactHookForm = () => {
  const [data, setData] = useState(makeData(100));
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [inputGlobalFilter, setInputGlobalFilter] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const methods = useForm({
    defaultValues: data.reduce(
      (previous, current, index) => {
        previous[index] = current;
        return previous;
      },
      {} as Record<number, Person>,
    ),
    mode: 'onChange',
  });
  const {
    register,
    formState: { errors },
  } = methods;

  const debouncedUpdateData = useMemo(
    () =>
      debounce((value: string | number) => {
        setGlobalFilter(String(value));
      }, 500),
    [],
  );

  const columns = useMemo<ColumnDef<Person>[]>(() => {
    return [
      {
        id: 'select',
        header: ({ table }) => (
          <InputCheckboxTableCell
            id="all"
            value="all"
            aria-label="Select all rows"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <InputCheckboxTableCell
            id={row.id}
            value={row.id}
            aria-label={`Select row ${row.id}`}
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      {
        id: 'expand',
        enableSorting: false,
        header: '',
        cell: ({ row }) => (
          <TableExpandIcon
            expanded={(expanded as any)?.[row.id]}
            onClick={row.toggleExpanded}
          />
        ),
      },

      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: 'fullName',
        header: 'Full Name',
        cell: (info) => info.getValue(),
        filterFn: 'fuzzy',
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ row, column, getValue }) => (
          <EditableTableCell
            value={getValue()}
            rowIndex={row.index}
            columnId={column.id}
            setData={setData}
            editor={{
              type: 'text',
              props: {
                'aria-label': 'Email input',
                ...register(`${row.index}.${column.id}` as never, {
                  required: true,
                  pattern: /.+@.+\..+/,
                }),
                iconEnd:
                  row.original?.disabledFields?.includes('email') || false
                    ? 'block'
                    : undefined,
                iconStart:
                  row.original?.disabledFields?.includes('email') || false
                    ? undefined
                    : 'edit',
                error: !!getFieldError(errors, row.index, column.id),
                disabled:
                  row.original?.disabledFields?.includes('email') || false,
                placeholder: 'Email',
              },
            }}
          />
        ),
        filterFn: 'includesString',
      },
      {
        accessorKey: 'age',
        header: 'Age',
        cell: ({ row, column, getValue }) => (
          <EditableTableCell
            value={getValue()}
            rowIndex={row.index}
            columnId={column.id}
            setData={setData}
            editor={{
              type: 'text',
              props: {
                'aria-label': 'Age input',
                type: 'number',
                iconStart:
                  row.original?.disabledFields?.includes('age') || false
                    ? undefined
                    : 'accessibility_new',
                iconEnd:
                  row.original?.disabledFields?.includes('age') || false
                    ? 'block'
                    : undefined,
                ...register(`${row.index}.${column.id}` as never, {
                  required: true,
                }),
                error: !!getFieldError(errors, row.index, column.id),
                disabled:
                  row.original?.disabledFields?.includes('age') || false,
                placeholder: 'Age',
              },
            }}
          />
        ),
      },
      {
        accessorKey: 'city',
        header: 'City',
        cell: ({ row, column, getValue }) => (
          <EditableTableCell
            value={getValue()}
            rowIndex={row.index}
            columnId={column.id}
            setData={setData}
            editor={{
              type: 'text',
              props: {
                'aria-label': 'City input',
                ...register(`${row.index}.${column.id}` as never, {
                  required: true,
                }),
                error: !!getFieldError(errors, row.index, column.id),
                disabled:
                  row.original?.disabledFields?.includes('city') || false,
                placeholder: 'City',
                iconEnd:
                  row.original?.disabledFields?.includes('city') || false
                    ? 'block'
                    : undefined,
                iconStart:
                  row.original?.disabledFields?.includes('city') || false
                    ? undefined
                    : 'placeholder',
              },
            }}
          />
        ),
        filterFn: 'includesString',
      },
      {
        accessorKey: 'isActive',
        header: 'Active',
        cell: ({ row, column, getValue }) => (
          <EditableTableCell
            value={getValue()}
            rowIndex={row.index}
            columnId={column.id}
            setData={setData}
            editor={{
              type: 'checkbox',
              props: {
                'aria-label': 'Active status',
                ...register(`${row.index}.${column.id}` as never, {
                  validate: (value) => {
                    return value === true;
                  },
                }),
                error: !!getFieldError(errors, row.index, column.id),
                disabled:
                  row.original?.disabledFields?.includes('isActive') || false,
              },
            }}
          />
        ),
        filterFn: 'includesString',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row, column, getValue }) => (
          <EditableTableCell
            value={getValue()}
            rowIndex={row.index}
            columnId={column.id}
            setData={setData}
            editor={{
              type: 'select',
              props: {
                'aria-label': 'Select status',
                ...register(`${row.index}.${column.id}` as never),
                options: [
                  { value: 'pending', label: 'Pending' },
                  { value: 'in progress', label: 'In Progress' },
                  { value: 'accepted', label: 'Accepted' },
                  { value: 'declined', label: 'Declined' },
                ],
                error: !!getFieldError(errors, row.index, column.id),
                disabled:
                  row.original?.disabledFields?.includes('status') || false,
              },
            }}
          />
        ),
      },
    ];
  }, [setData, register, errors, expanded]);

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { globalFilter, pagination, expanded },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'fuzzy',
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    getRowCanExpand: () => true,
    onExpandedChange: setExpanded,
  });

  useEffect(() => {
    return () => {
      debouncedUpdateData.cancel();
    };
  }, [debouncedUpdateData]);

  const statusTypeMap = {
    pending: TagTypeEnum.Info,
    accepted: TagTypeEnum.Success,
    declined: TagTypeEnum.Error,
    'in progress': TagTypeEnum.Warning,
  };

  return (
    <div className="gi-p-2">
      <div className="gi-flex gi-gap-2 gi-mb-2">
        <InputText
          value={inputGlobalFilter}
          onChange={(event) => {
            setInputGlobalFilter(event.target.value);
            debouncedUpdateData(event.target.value);
          }}
          className="w-64 justify-self-stretch"
          placeholder="Search all columns..."
        />
      </div>
      <Table layout="auto" rowSize="md" stripped className="gi-mt-4 gi-w-full">
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeader
                  id={header.id}
                  key={header.id}
                  sorted={header.column.getIsSorted()}
                  onSort={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <TableRow>
                {row.getVisibleCells().map((cell) => (
                  <TableData key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableData>
                ))}
              </TableRow>
              {row.getIsExpanded() && (
                <TableRow>
                  <TableDataSlot colSpan={columns.length + 1}>
                    <div className="gi-text-sm">
                      <Tag
                        text={row.original.status?.toLocaleUpperCase()}
                        type={
                          statusTypeMap[row.original.status] ?? TagTypeEnum.Info
                        }
                      />
                      <Label size="sm">
                        You can view additional information about this row.
                      </Label>
                      <Link href="#">View more details</Link>
                    </div>
                  </TableDataSlot>
                </TableRow>
              )}
            </Fragment>
          ))}
        </TableBody>
      </Table>
      <TanstackFooter>
        <TanstackFooterEnd className="gi-w-1/2 gi-text-right">
          <TablePagination
            currentPage={table.getState().pagination.pageIndex + 1}
            totalPages={table.getPageCount()}
            onPageChange={(page) => table.setPageIndex(page - 1)}
          />
        </TanstackFooterEnd>
      </TanstackFooter>
    </div>
  );
};

export const TanstackFooterBasic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'A basic footer for TanStack Table, demonstrating how to use the footer components with TanstackFooter, TanstackFooterStart, TanstackFooterCenter, and TanstackFooterEnd.',
      },
    },
  },
  render: () => (
    <TanstackFooter>
      <TanstackFooterStart className="gi-w-1/3">
        <span className="gi-text-md">TanStack Grid Example</span>
      </TanstackFooterStart>
      <TanstackFooterCenter className="gi-w-1/3 gi-text-center">
        <span className="gi-text-md">Showing 1 of 10</span>
      </TanstackFooterCenter>
      <TanstackFooterEnd className="gi-w-1/2 gi-text-right">
        <TablePagination
          currentPage={1}
          totalPages={10}
          onPageChange={() => null}
        />
      </TanstackFooterEnd>
    </TanstackFooter>
  ),
};

export default meta;
