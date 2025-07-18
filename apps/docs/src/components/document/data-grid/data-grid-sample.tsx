'use client';
import {
  Table as DSTable,
  Icon,
  IconButton,
  InputCheckbox,
  Pagination,
  Select,
  SelectItem,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
  TextInput,
  Tooltip,
} from '@ogcio/design-system-react';
import {
  compareItems,
  RankingInfo,
  rankItem,
} from '@tanstack/match-sorter-utils';
import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingFn,
  sortingFns,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { makeData, Person } from './sample-data';

declare module '@tanstack/react-table' {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let direction = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    direction = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank,
      rowB.columnFiltersMeta[columnId]?.itemRank,
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return direction === 0
    ? sortingFns.alphanumeric(rowA, rowB, columnId)
    : direction;
};

export function DataGridSample() {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <div className="px-[3px]">
            <InputCheckbox
              size="sm"
              id={'all'}
              value={'all'}
              {...{
                checked: table.getIsAllRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          </div>
        ),
        cell: ({ row }) => (
          <InputCheckbox
            size="sm"
            id={row.id}
            value={row.id}
            {...{
              checked: row.getIsSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: 'fullName',
        header: 'Full Name',
        cell: (info) => info.getValue(),
        filterFn: 'fuzzy', //using our custom fuzzy filter function
        // filterFn: fuzzyFilter, //or just define with the function
        sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
      },
      {
        accessorKey: 'email',
        header: () => <span>Email</span>,
        footer: (props) => props.column.id,
        filterFn: 'includesString',
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: (props) => props.column.id,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'city',
        header: 'City',
        footer: (props) => props.column.id,
        filterFn: 'includesString',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        footer: (props) => props.column.id,
        meta: {
          filterVariant: 'select',
        },
      },
      {
        id: 'actions',
        cell: () => (
          <div className="flex gap-1">
            <Tooltip text={'Show Profile'}>
              <IconButton
                icon={{
                  icon: 'visibility',
                }}
                size="large"
                appearance="light"
              />
            </Tooltip>
            <Tooltip text={'Menu'}>
              <IconButton
                icon={{
                  icon: 'more_vert',
                }}
                size="large"
                appearance="light"
              />
            </Tooltip>
          </div>
        ),
      },
    ],
    [],
  );

  const data = makeData(100_000);

  return (
    <>
      <DataGridTable
        {...{
          data,
          columns,
        }}
      />
      <hr />
    </>
  );
}

function DataGridTable({
  data,
  columns,
}: {
  data: Person[];
  columns: ColumnDef<Person>[];
}) {
  const [globalFilter, setGlobalFilter] = React.useState('');

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    },
    state: {
      globalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'fuzzy',
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <div className="p-2">
      <div className="flex gap-2">
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => {
            setGlobalFilter(String(value));
            if (value) {
              table.setSorting([{ id: 'fullName', desc: false }]);
            } else {
              table.resetSorting();
            }
          }}
        />
        <div className="grow"></div>
        <div>
          <Select
            id={'filter-status'}
            onChange={(event) => {
              table.setColumnFilters([
                {
                  id: 'status',
                  value: event.target.value.replaceAll('-', ' '),
                },
              ]);
            }}
          >
            <SelectItem value={''}>All</SelectItem>
            <SelectItem value={'pending'}>Pending</SelectItem>
            <SelectItem value={'in progress'}>In Progress</SelectItem>
            <SelectItem value={'accepted'}>Accepted</SelectItem>
            <SelectItem value={'declined'}>Declined</SelectItem>
          </Select>
        </div>
      </div>

      <DSTable layout="auto" className="my-4 w-full">
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHeader key={header.id} className="gi-align-top">
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      <div className="gi-flex">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: <Icon inline icon={'arrow_upward'} />,
                          desc: <Icon inline icon={'arrow_downward'} />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </div>
                  </TableHeader>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableData key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableData>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </DSTable>
      <div className="h-2" />

      <Pagination
        currentPage={table.getState().pagination.pageIndex + 1}
        totalPages={table.getPageCount()}
        onPageChange={function (page: number): void {
          table.setPageIndex(page - 1);
        }}
      />
    </div>
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
}) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <TextInput
      {...props}
      value={value}
      className="w-64 justify-self-stretch"
      placeholder="Search all columns..."
      onChange={(event) => setValue(event.target.value)}
    />
  );
}
