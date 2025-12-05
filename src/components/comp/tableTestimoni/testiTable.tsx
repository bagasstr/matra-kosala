import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { DataTableProps, ITestimoniTable } from '@/types/type'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
import TambahTesti from './tambahTesti'

const TestiTable = <TData, TValue>({
  data,
  columns,
  pagination,
  setPagination,
  isLoading,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  if (!data) {
    toast.error(data.message)
  }

  const testi = useMemo(() => {
    if (!data.data) return []

    return data?.data.flatMap(
      (item: ITestimoniTable): ITestimoniTable => ({
        id: item.id,
        company: item.company,
        title: item.title,
        author: item.author,
        image: item.image,
        testi: item.testi,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })
    )
  }, [data])
  const table = useReactTable({
    data: testi,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: data?.totalPage || 0,
    onPaginationChange: (updater) => {
      if (setPagination) {
        setPagination(
          typeof updater === 'function'
            ? updater(pagination || { pageIndex: 0, pageSize: 5 })
            : updater
        )
      }
    },
    state: {
      pagination,
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  return (
    <div className={cn('')}>
      <h1 className={cn('text-xl font-semibold mb-4')}>Data Testimoni</h1>
      <div className={cn('py-4 flex justify-end')}>
        <div className={cn('')}>
          <TambahTesti />
        </div>
      </div>
      <div className='rounded-md border'>
        <Table className='w-full'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    className={cn([
                      index === 0 && 'w-[200px]',
                      index === 1 && 'w-[100px]',
                      index === 2 && 'w-[200px]',
                      index === 3 && 'w-[500px]',
                      index === 4 && 'w-[200px]',
                    ])}>
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <>
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='text-center space-y-2'>
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-4 w-full' />
                  </TableCell>
                </TableRow>
              </>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className='text-center'>
                  Tidak ada data.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell key={cell.id} className={cn()}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            First Page
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <span className='text-xs border px-2 py-2 rounded-sm text-gray-900'>
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </span>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            Last Page
          </Button>
        </div>
      </div>
    </div>
  )
}
export default TestiTable
