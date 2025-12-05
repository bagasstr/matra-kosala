'use client'
import {
  DataTableProps,
  type IPortofolioData,
  type IPortofolioTable,
} from '@/types/type'
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  type Column,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { pagination } from './pagination'
import TambahProduk from './tambahPorto'
import { Skeleton } from '@/components/ui/skeleton'
import type { cn } from '@/lib/utils'
import { DeleteButtonMultiple } from './deleteButton'

export function PortofolioTable<TData, TValue>({
  data,
  columns,
  pagination,
  setPagination,
  isLoading,
}: DataTableProps<TData, TValue>): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  if (!data) {
    toast.error(data.message)
  }

  const porto = useMemo(() => {
    if (!data.data) return []

    return data?.data.flatMap(
      (item: IPortofolioData): IPortofolioTable => ({
        id: item.id,
        judul: item.title,
        klien: item.mitraKlien,
        tipe: item.tipeBangunan,
        lokasi: item.lokasi,
        tanggalProyek: item.tanggalPelaksanaan,
        createdAt: item.createdAt,
      })
    )
  }, [data])

  const tipeBangunan = useMemo(() => {
    const uniqueTipeBangunan = new Set(
      porto?.map((item: { tipe: string }) => item.tipe).filter(Boolean)
    )
    return Array.from(uniqueTipeBangunan)
  }, [porto])

  const table = useReactTable({
    data: porto,
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

  const tipeColumn = table.getColumn('tipe')
  const tipeFilter: string[] = (tipeColumn?.getFilterValue() as string[]) || []

  const toggleFilter = (tipe: string) => {
    if (!tipeColumn) return

    const currentFilters = (tipeColumn.getFilterValue() as string[]) || []
    const newFilters = currentFilters.includes(tipe)
      ? currentFilters.filter((c) => c !== tipe)
      : [...currentFilters, tipe]

    tipeColumn.setFilterValue(newFilters.length ? newFilters : undefined)
  }

  return (
    <div className='w-full'>
      <h1 className='text-xl font-semibold mb-4'>Data Portofolio</h1>
      <div className='flex items-center justify-between py-4'>
        <div className='flex gap-x-4 items-center'>
          {/* Filter Kategori */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='rounded-sm h-9 p-3'>
                Tipe Bangunan ({tipeFilter.length})
                <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='w-56'>
              {tipeBangunan.map((value, index) => (
                <DropdownMenuCheckboxItem
                  key={index}
                  checked={tipeFilter.includes(value as string)}
                  onCheckedChange={() => toggleFilter(value as string)}>
                  {value as string}
                </DropdownMenuCheckboxItem>
              ))}
              {tipeFilter.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={false}
                    onCheckedChange={() =>
                      tipeColumn?.setFilterValue(undefined)
                    }>
                    Clear filters
                  </DropdownMenuCheckboxItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter Porto */}
          <Input
            placeholder='Cari porto...'
            value={(table.getColumn('judul')?.getFilterValue() as string) || ''}
            onChange={(e) =>
              table.getColumn('judul')?.setFilterValue(e.target.value)
            }
            className='max-w-xs'
          />
        </div>

        <div className='flex gap-x-4'>
          <div className='flex'>
            {table.getFilteredSelectedRowModel().rows.length > 1 && (
              <DeleteButtonMultiple
                selectedIds={table
                  .getFilteredSelectedRowModel()
                  .rows.map((row: any) => row.original.id)}
                onDeleteComplete={table.resetRowSelection}
              />
            )}
          </div>
          <TambahProduk />
        </div>
      </div>

      {/* Table */}
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
