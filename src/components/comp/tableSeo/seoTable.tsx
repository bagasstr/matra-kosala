import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { DataTableProps, ISeo } from '@/types/type'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
import { useMemo, useState } from 'react'
import TambahSeo from './tambahSeo'

const SeoTable = <TData, TValue>({
  data,
  columns,
  isLoading,
}: DataTableProps<TData, TValue>) => {
  const [rowSelection, setRowSelection] = useState({})
  const seo = useMemo(() => {
    if (!data.seo) return []

    return data?.seo.flatMap(
      (item: ISeo): ISeo => ({
        id: item.id,
        pageTitle: item.pageTitle,
        metaDescription: item.metaDescription,
        keywords: item.keywords,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })
    )
  }, [data])

  const table = useReactTable({
    data: seo,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
    },
  })
  return (
    <div className={cn('')}>
      <h1 className={cn('text-xl font-semibold mb-4')}>Data Seo</h1>
      <div className={cn('py-4 flex justify-end')}>
        <div className={cn('')}>
          <TambahSeo />
        </div>
      </div>
      <div className='rounded-md border'>
        <Table className='w-full'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className=''>
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
                    <TableCell
                      key={cell.id}
                      className={cn([
                        index === 0 && 'w-12',
                        index === 2 && 'w-[400px]',
                        index === 3 && 'w-[200px]',
                      ])}>
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
export default SeoTable
