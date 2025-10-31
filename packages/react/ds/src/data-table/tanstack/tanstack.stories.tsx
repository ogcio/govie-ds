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
import { FC, Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useForm, FieldErrors, FieldError } from 'react-hook-form';

import { Button } from '../../button/button.js';
import {
  InputCheckbox,
  InputCheckboxTableCell,
} from '../../input-checkbox/input-checkbox.js';
import { InputText } from '../../input-text/input-text.js';
import { Label } from '../../label/label.js';
import { Link } from '../../link/link.js';
import { Popover } from '../../popover/popover.js';
import { SelectItem, SelectNative } from '../../select/select-native.js';
import { SelectItemNext, SelectNext } from '../../select/select-next.js';
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
import {
  DataTableFooter,
  DataTableFooterCenter,
  DataTableFooterEnd,
  DataTableFooterStart,
} from '../data-table-footer.js';
import {
  DataTableHeader,
  DataTableHeaderActions,
  DataTableHeaderFilter,
  DataTableHeaderFilterActions,
  DataTableHeaderFilterContent,
  DataTableHeaderFilterContentTitle,
  DataTableHeaderFilterList,
  DataTableHeaderSearch,
} from '../data-table-header.js';
import { DataTableSelectedRowsBanner } from '../data-table-selected-rows.js';
import { EditableTableCell } from '../editable-table-cell.js';
import { makeData } from './tanstack-helpers.js';

declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const meta = {
  title: 'Data Table/TanStack',
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
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  city: string;
  status: 'pending' | 'in progress' | 'accepted' | 'declined';
  isActive: boolean;
  disabledFields?: string[];
};

const getFieldError = (
  errors: FieldErrors<Record<string, any>>,
  rowId: string | number,
  columnId: string,
): FieldError | undefined => {
  const rowErrors = errors?.[String(rowId)] as Record<
    string,
    FieldError | undefined
  >;
  if (rowErrors && rowErrors[columnId]) {
    return rowErrors[columnId];
  }
  return undefined;
};

const fakeData = makeData(100);

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

const statusInFilter: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue || filterValue.length === 0) {
    return true;
  }
  const value = String(row.getValue(columnId));
  for (const current of filterValue) {
    if (current === value) {
      return true;
    }
  }
  return false;
};

const booleanTrueFilter: FilterFn<any> = (row, columnId, filterValue) => {
  if (filterValue !== true) {
    return true;
  }
  return row.getValue<boolean>(columnId) === true;
};

const dateRangeFilter: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue || (!filterValue.from && !filterValue.to)) {
    return true;
  }

  const cellValue = row.getValue<string>(columnId);
  if (!cellValue) {
    return false;
  }

  const cellDate = new Date(cellValue);

  if (filterValue.from && filterValue.to) {
    const fromDate = new Date(filterValue.from);
    const toDate = new Date(filterValue.to);
    return cellDate >= fromDate && cellDate <= toDate;
  } else if (filterValue.from) {
    const fromDate = new Date(filterValue.from);
    return cellDate >= fromDate;
  } else if (filterValue.to) {
    const toDate = new Date(filterValue.to);
    return cellDate <= toDate;
  }

  return true;
};

export const WithReactHookForm: Story = {
  tags: ['skip-playwright'],
  render: () => {
    const [data, setData] = useState(fakeData);
    const [expanded, setExpanded] = useState<ExpandedState>({});
    const [globalFilter, setGlobalFilter] = useState('');
    const [inputGlobalFilter, setInputGlobalFilter] = useState('');
    const [pagination, setPagination] = useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });
    const [columnFilters, setColumnFilters] = useState<any>([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
    const [temporarySelectedFilters, setTemporarySelectedFilters] = useState<
      string[]
    >([]);
    const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
      from: '',
      to: '',
    });
    const [temporaryDateRange, setTemporaryDateRange] = useState<{
      from: string;
      to: string;
    }>({
      from: '',
      to: '',
    });

    const triggerRef = useRef<HTMLButtonElement>(null!);

    const filterOptions = [
      { id: 'pending', label: 'Pending Status', value: 'pending' },
      { id: 'in-progress', label: 'In Progress Status', value: 'in progress' },
      { id: 'accepted', label: 'Accepted Status', value: 'accepted' },
      { id: 'declined', label: 'Declined Status', value: 'declined' },
      { id: 'active-only', label: 'Active Users Only', value: 'active' },
    ];

    const methods = useForm({
      defaultValues: data.reduce(
        (previous, current: any) => {
          previous[current.id] = current;
          return previous;
        },
        {} as Record<string, Person>,
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

    const handleTemporaryCheckboxChange = (value: string) => {
      setTemporarySelectedFilters((previous) => {
        if (previous.includes(value)) {
          return previous.filter((current) => current !== value);
        }
        return [...previous, value];
      });
    };

    const columns = useMemo<ColumnDef<Person>[]>(() => {
      return [
        {
          id: 'select',
          header: ({ table }) => (
            <InputCheckboxTableCell
              id="all"
              value="all"
              aria-label="Select all rows"
              checked={
                table.getIsAllPageRowsSelected() ||
                table.getIsSomePageRowsSelected()
              }
              onChange={table.getToggleAllPageRowsSelectedHandler()}
              indeterminate={table.getIsSomePageRowsSelected()}
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
          meta: {
            size: 'md-fixed',
          },
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
                  ...register(`${row.original.id}.${column.id}` as never, {
                    required: true,
                    pattern: /.+@.+\..+/,
                  }),
                  iconEnd:
                    row.original?.disabledFields?.includes('email') === true
                      ? 'block'
                      : undefined,
                  iconStart:
                    row.original?.disabledFields?.includes('email') === true
                      ? undefined
                      : 'edit',
                  error: !!getFieldError(errors, row.original.id, column.id),
                  disabled:
                    row.original?.disabledFields?.includes('email') === true,
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
                    row.original?.disabledFields?.includes('age') === true
                      ? undefined
                      : 'accessibility_new',
                  iconEnd:
                    row.original?.disabledFields?.includes('age') === true
                      ? 'block'
                      : undefined,
                  ...register(`${row.original.id}.${column.id}` as never, {
                    required: true,
                  }),
                  error: !!getFieldError(errors, row.original.id, column.id),
                  disabled:
                    row.original?.disabledFields?.includes('age') === true,
                  placeholder: 'Age',
                },
              }}
            />
          ),
        },
        {
          accessorKey: 'dateOfBirth',
          header: 'Date of Birth',
          cell: ({ row, column, getValue }) => (
            <EditableTableCell
              value={getValue()}
              rowIndex={row.index}
              columnId={column.id}
              setData={setData}
              editor={{
                type: 'text',
                props: {
                  'aria-label': 'Date of Birth input',
                  type: 'date',
                  ...register(`${row.original.id}.${column.id}` as never, {
                    required: true,
                  }),
                  error: !!getFieldError(errors, row.original.id, column.id),
                  disabled:
                    row.original?.disabledFields?.includes('dateOfBirth') ===
                    true,
                  placeholder: 'YYYY-MM-DD',
                },
              }}
            />
          ),
          filterFn: dateRangeFilter,
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
                  ...register(`${row.original.id}.${column.id}` as never, {
                    required: true,
                  }),
                  error: !!getFieldError(errors, row.original.id, column.id),
                  disabled:
                    row.original?.disabledFields?.includes('city') === true,
                  placeholder: 'City',
                  iconEnd:
                    row.original?.disabledFields?.includes('city') === true
                      ? 'block'
                      : undefined,
                  iconStart:
                    row.original?.disabledFields?.includes('city') === true
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
                  ...register(`${row.original.id}.${column.id}` as never, {
                    validate: (value) => {
                      return value === true;
                    },
                  }),
                  error: !!getFieldError(errors, row.original.id, column.id),
                  disabled:
                    row.original?.disabledFields?.includes('isActive') === true,
                },
              }}
            />
          ),
          filterFn: booleanTrueFilter,
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
                  ...register(`${row.original.id}.${column.id}` as never),
                  options: [
                    { value: 'pending', label: 'Pending' },
                    { value: 'in progress', label: 'In Progress' },
                    { value: 'accepted', label: 'Accepted' },
                    { value: 'declined', label: 'Declined' },
                  ],
                  error: !!getFieldError(errors, row.original.id, column.id),
                  disabled:
                    row.original?.disabledFields?.includes('status') === true,
                },
              }}
            />
          ),
          filterFn: statusInFilter,
        },
      ];
    }, [setData, register, errors, expanded]);

    const table = useReactTable({
      data,
      columns,
      getRowId: (row) => String(row.id),
      filterFns: {
        fuzzy: fuzzyFilter,
      },
      state: {
        globalFilter,
        columnFilters,
        pagination,
        expanded,
      },
      onGlobalFilterChange: setGlobalFilter,
      onColumnFiltersChange: setColumnFilters,
      globalFilterFn: 'fuzzy',
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onPaginationChange: setPagination,
      autoResetPageIndex: true,
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

    const applyFiltersToTable = (
      selected: string[],
      range: { from: string; to: string },
    ) => {
      const statusValues: string[] = [];
      let activeSelected = false;

      for (const value of selected) {
        if (value === 'active') {
          activeSelected = true;
        }
        if (
          value === 'pending' ||
          value === 'in progress' ||
          value === 'accepted' ||
          value === 'declined'
        ) {
          statusValues.push(value);
        }
      }

      const statusColumn = table.getColumn('status');
      if (statusColumn) {
        statusColumn.setFilterValue(
          statusValues.length > 0 ? statusValues : undefined,
        );
      }

      const activeColumn = table.getColumn('isActive');
      if (activeColumn) {
        activeColumn.setFilterValue(activeSelected === true ? true : undefined);
      }

      const dobColumn = table.getColumn('dateOfBirth');
      if (dobColumn) {
        dobColumn.setFilterValue(range.from || range.to ? range : undefined);
      }

      table.setPageIndex(0);
    };

    const handleApplyFilter = () => {
      setAppliedFilters([...temporarySelectedFilters]);
      setDateRange({ ...temporaryDateRange });
      applyFiltersToTable(temporarySelectedFilters, temporaryDateRange);
      setFilterOpen(false);
    };

    const handleClearFilters = () => {
      setTemporarySelectedFilters([]);
      setAppliedFilters([]);
      setTemporaryDateRange({ from: '', to: '' });
      setDateRange({ from: '', to: '' });

      const statusColumn = table.getColumn('status');
      if (statusColumn) {
        statusColumn.setFilterValue(undefined);
      }
      const activeColumn = table.getColumn('isActive');
      if (activeColumn) {
        activeColumn.setFilterValue(undefined);
      }
      const dobColumn = table.getColumn('dateOfBirth');
      if (dobColumn) {
        dobColumn.setFilterValue(undefined);
      }

      table.setPageIndex(0);
      setFilterOpen(false);
    };

    const handleRemoveFilter = (id: string) => {
      const newApplied = appliedFilters.filter((current) => current !== id);
      setAppliedFilters(newApplied);
      setTemporarySelectedFilters(newApplied);
      applyFiltersToTable(newApplied, dateRange);
    };

    const handleFilterOpen = () => {
      setTemporarySelectedFilters([...appliedFilters]);
      setTemporaryDateRange({ ...dateRange });
      setFilterOpen(true);
    };

    const handlePopoverOpenChange = (open: boolean) => {
      if (open) {
        setTemporarySelectedFilters([...appliedFilters]);
        setTemporaryDateRange({ ...dateRange });
      }
      setFilterOpen(open);
    };

    const selectedRows = table.getSelectedRowModel().rows;
    const isSelectedRows = selectedRows.length > 0;

    return (
      <div className="gi-p-2">
        {isSelectedRows && (
          <DataTableSelectedRowsBanner
            selectedCount={selectedRows.length}
            actions={
              <>
                <Button appearance="light" size="medium" variant="flat">
                  Delete
                </Button>
                <Button
                  appearance="light"
                  size="medium"
                  variant="flat"
                  onClick={() => table.resetRowSelection()}
                >
                  Clear Selection
                </Button>
              </>
            }
          />
        )}
        <DataTableHeader showHeader={!isSelectedRows}>
          <DataTableHeaderSearch className="gi-max-w-52">
            <InputText
              value={inputGlobalFilter}
              id="data-table-global-filter"
              onChange={(event) => {
                setInputGlobalFilter(event.target.value);
                debouncedUpdateData(event.target.value);
              }}
              placeholder="Search all columns..."
            />
          </DataTableHeaderSearch>

          <DataTableHeaderFilter>
            <Button
              ref={triggerRef}
              onClick={handleFilterOpen}
              variant="secondary"
              appearance="dark"
            >
              Filters
            </Button>
            <Popover
              triggerRef={triggerRef}
              open={filterOpen}
              onOpenChange={handlePopoverOpenChange}
              className="!gi-bg-white"
            >
              <div>
                <DataTableHeaderFilterContent>
                  <DataTableHeaderFilterContentTitle>
                    Date Range
                  </DataTableHeaderFilterContentTitle>
                  <div className="gi-flex gi-gap-2">
                    <InputText
                      id="from-date"
                      type="date"
                      placeholder="From"
                      value={temporaryDateRange.from}
                      onChange={(event) =>
                        setTemporaryDateRange({
                          ...temporaryDateRange,
                          from: event.target.value,
                        })
                      }
                    />
                    <InputText
                      id="to-date"
                      type="date"
                      placeholder="To"
                      value={temporaryDateRange.to}
                      onChange={(event) =>
                        setTemporaryDateRange({
                          ...temporaryDateRange,
                          to: event.target.value,
                        })
                      }
                    />
                  </div>
                  <DataTableHeaderFilterContentTitle>
                    Status & Activity
                  </DataTableHeaderFilterContentTitle>
                  {filterOptions.map((option) => (
                    <InputCheckbox
                      key={option.id}
                      id={`checkbox-${option.id}`}
                      label={option.label}
                      value={option.id}
                      checked={temporarySelectedFilters.includes(option.value)}
                      onChange={() =>
                        handleTemporaryCheckboxChange(option.value)
                      }
                      size="sm"
                    />
                  ))}
                </DataTableHeaderFilterContent>
                <DataTableHeaderFilterActions>
                  <Button
                    onClick={handleClearFilters}
                    variant="flat"
                    appearance="dark"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={handleApplyFilter}
                    variant="secondary"
                    appearance="dark"
                  >
                    Apply
                  </Button>
                </DataTableHeaderFilterActions>
              </div>
            </Popover>
          </DataTableHeaderFilter>

          <DataTableHeaderActions>
            <Button onClick={() => null} variant="secondary">
              Export table
            </Button>
            <Button onClick={() => null} variant="primary">
              Create new
            </Button>
          </DataTableHeaderActions>

          <DataTableHeaderFilterList
            filters={filterOptions
              .filter((option) => appliedFilters.includes(option.value))
              .map((option) => ({ id: option.value, label: option.label }))}
            onRemove={handleRemoveFilter}
            onClear={handleClearFilters}
          />
        </DataTableHeader>

        <Table
          layout="auto"
          rowSize="md"
          stripped
          className="gi-mt-4 gi-w-full"
        >
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeader
                    size={(header.column.columnDef.meta as any)?.size}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableData>
                  ))}
                </TableRow>
                {row.getIsExpanded() === true && (
                  <TableRow>
                    <TableDataSlot colSpan={columns.length + 1}>
                      <div className="gi-text-sm gi-px-24">
                        <Tag
                          text={row.original.status?.toLocaleUpperCase()}
                          type={
                            statusTypeMap[row.original.status] ??
                            TagTypeEnum.Info
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
          <DataTableFooter>
            <DataTableFooterStart>
              <span className="gi-text-sm gi-pr-2">Rows per page</span>
              <SelectNative
                id="data-table-rows-per-page"
                aria-label="Select"
                className="gi-data-table-footer-select"
                value={pagination.pageSize}
                onChange={(event) => {
                  const pageSize = Number(event.target.value);
                  const pageIndex = pagination.pageIndex;
                  setPagination({ pageIndex, pageSize });
                }}
              >
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="40">40</SelectItem>
              </SelectNative>
            </DataTableFooterStart>
            <DataTableFooterEnd>
              <TablePagination
                currentPage={pagination.pageIndex + 1}
                totalPages={table.getPageCount()}
                onPageChange={(page) => table.setPageIndex(page - 1)}
              />
            </DataTableFooterEnd>
          </DataTableFooter>
        </Table>
      </div>
    );
  },
};

export const DataTableHeaderBasic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic usage of the DataTableHeader component with search, filter, and action buttons.',
      },
    },
  },
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null!);
    const [open, setOpen] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
    const [temporaryFilters, setTemporaryFilters] = useState<string[]>([]);

    const options = [
      { id: 'value-1', label: 'Option 1', value: 'value-1' },
      { id: 'value-2', label: 'Option 2', value: 'value-2' },
      { id: 'value-3', label: 'Option 3', value: 'value-3' },
    ];

    const handleApply = () => {
      setAppliedFilters([...temporaryFilters]);
      setOpen(false);
    };

    const handleClear = () => {
      setTemporaryFilters([]);
      setAppliedFilters([]);
      setOpen(false);
    };

    const handleRemoveFilter = (id: string) => {
      const newAppliedFilters = appliedFilters.filter((v) => v !== id);
      setAppliedFilters(newAppliedFilters);
      setTemporaryFilters(newAppliedFilters);
    };

    const handleFilterToggle = () => {
      if (!open) {
        setTemporaryFilters([...appliedFilters]);
      }
      setOpen(!open);
    };

    return (
      <DataTableHeader>
        <DataTableHeaderSearch className="gi-max-w-52">
          <InputText
            id="data-table-global-filter"
            onChange={() => null}
            placeholder="Search all columns..."
          />
        </DataTableHeaderSearch>
        <DataTableHeaderFilter>
          <Button
            ref={triggerRef}
            onClick={handleFilterToggle}
            variant="secondary"
            appearance="dark"
          >
            Filters
          </Button>
          <Popover
            triggerRef={triggerRef}
            open={open}
            onOpenChange={(open) => {
              if (open) {
                setTemporaryFilters([...appliedFilters]);
              }
              setOpen(open);
            }}
            className="!gi-bg-white"
          >
            <div>
              <DataTableHeaderFilterContent>
                <DataTableHeaderFilterContentTitle>
                  Date Range
                </DataTableHeaderFilterContentTitle>
                <div className="gi-flex gi-gap-2">
                  <InputText id="from-date" type="date" placeholder="From" />
                  <InputText id="to-date" type="date" placeholder="To" />
                </div>

                <DataTableHeaderFilterContentTitle>
                  Tags
                </DataTableHeaderFilterContentTitle>
                <SelectNext aria-label="Select" defaultValue="all">
                  <SelectItemNext value="all" hidden>
                    All
                  </SelectItemNext>
                  <SelectItemNext value="value-1">Option 1</SelectItemNext>
                  <SelectItemNext value="value-2">Option 2</SelectItemNext>
                  <SelectItemNext value="value-3">Option 3</SelectItemNext>
                </SelectNext>
              </DataTableHeaderFilterContent>
              <DataTableHeaderFilterActions>
                <Button onClick={handleClear} variant="flat" appearance="dark">
                  Clear
                </Button>
                <Button
                  onClick={handleApply}
                  variant="secondary"
                  appearance="dark"
                >
                  Apply
                </Button>
              </DataTableHeaderFilterActions>
            </div>
          </Popover>
        </DataTableHeaderFilter>
        <DataTableHeaderActions>
          <Button onClick={() => null} variant="secondary">
            Export table
          </Button>
          <Button onClick={() => null} variant="primary">
            Create new
          </Button>
        </DataTableHeaderActions>
        <DataTableHeaderFilterList
          filters={options
            .filter((opt) => appliedFilters.includes(opt.value))
            .map((opt) => ({
              id: opt.id,
              label: opt.label,
            }))}
          onRemove={handleRemoveFilter}
          onClear={handleClear}
        />
      </DataTableHeader>
    );
  },
};

export const DataTableFooterBasic: Story = {
  parameters: {
    docs: {
      description: {
        story: `
A basic footer for \`DataTable\`, demonstrating how to use the footer components 
(\`DataTableFooter\`, \`DataTableFooterStart\`, \`DataTableFooterCenter\`, and \`DataTableFooterEnd\`).

By default, \`DataTableFooter\` is meant to be placed **inside a \`<table>\`**, where it renders a semantic 
\`<tfoot>\` row. This is useful when you want the footer to behave as part of the table structure.

However, you can also render the footer in **standalone mode** by passing the \`standalone\` prop.  
In standalone mode, the footer renders as a \`<div>\` with the same flexbox layout, which makes it 
usable outside of tables (for example, in cards, dashboards, or when showcasing controls without 
a full table context).
        `,
      },
    },
  },
  render: () => (
    <DataTableFooter standalone>
      <DataTableFooterStart className="gi-w-1/3">
        <span>Data Table Example</span>
      </DataTableFooterStart>
      <DataTableFooterCenter>
        <span className="gi-pr-2">Rows per page</span>
        <SelectNative
          className="gi-data-table-footer-select"
          id="data-table-footer-rows-per-page"
          aria-label="Select"
        >
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="40">40</SelectItem>
        </SelectNative>
      </DataTableFooterCenter>
      <DataTableFooterEnd>
        <TablePagination
          currentPage={1}
          totalPages={10}
          onPageChange={() => null}
        />
      </DataTableFooterEnd>
    </DataTableFooter>
  ),
};

export default meta;
