'use client'
import { DataTableProps, type IProdukTable } from '@/types/type'
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
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import type { IProduk } from '@/types/type'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown, LoaderCircle, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { DeleteButtonMultiple } from '../tableVendor/deleteButton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { pagination } from './pagination'
import TambahProduk from './tambahProduk'
import { Skeleton } from '@/components/ui/skeleton'
import type { cn } from '@/lib/utils'

export function ProdukTable<TData, TValue>({
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

  const produkList: any = useMemo(() => {
    if (!data.data) return []

    return data?.data.flatMap(
      (item: IProdukTable): IProduk => ({
        id: item.id,
        produk: item.namaBarang,
        harga: item.hargaBarang,
        berat: item.berat,
        kategori: item.kategori,
        stok: item.jumlahUnit,
        subKategori: item.subKategori,
        thumbnail: item.thumbnail,
        tanggal: item.createdAt,
      })
    )
  }, [data])

  const categories: unknown[] = useMemo((): unknown[] => {
    const uniqueCategories = new Set(
      produkList?.map((item: IProduk): string => item.kategori).filter(Boolean)
    )
    return Array.from(uniqueCategories)
  }, [produkList])

  const subCategories = useMemo(() => {
    const uniqueSubCategories = new Set(
      produkList?.map((item: IProduk) => item.subKategori).filter(Boolean)
    )
    return Array.from(uniqueSubCategories)
  }, [produkList])

  const table = useReactTable({
    data: produkList,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    pageCount: data?.totalPage ?? 0,
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

  const toggleFilter: (columnName: string, value: string) => void = (
    columnName: string,
    value: string
  ) => {
    const column: Column<TData, unknown> | undefined =
      table.getColumn(columnName)
    if (!column) return

    const currentFilters: string[] = (column.getFilterValue() as string[]) || []
    const newFilters: string[] = currentFilters.includes(value)
      ? currentFilters.filter((v: string): boolean => v !== value)
      : [...currentFilters, value]

    column.setFilterValue(newFilters.length ? newFilters : undefined)
  }
  const kategoriColumn: Column<TData, unknown> | undefined =
    table.getColumn('kategori')
  const kategoriFilter: string[] =
    (kategoriColumn?.getFilterValue() as string[]) || []
  const subKategoriColumn: Column<TData, unknown> | undefined =
    table.getColumn('subKategori')
  const subKategoriFilter: string[] =
    (subKategoriColumn?.getFilterValue() as string[]) || []

  return (
    <div className='w-full'>
      <h1 className='text-xl font-semibold mb-4'>Data Produk</h1>
      <div className='flex items-center justify-between py-4'>
        <div className='flex gap-x-4 items-center'>
          {/* Filter Kategori */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='rounded-sm h-9 p-3'>
                Kategori ({kategoriFilter.length})
                <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='w-56'>
              {categories.map((value, index) => (
                <DropdownMenuCheckboxItem
                  key={index}
                  checked={(
                    (table
                      .getColumn('kategori')
                      ?.getFilterValue() as string[]) || []
                  ).includes(value as string)}
                  onCheckedChange={() =>
                    toggleFilter('kategori', value as string)
                  }>
                  {value as string}
                </DropdownMenuCheckboxItem>
              ))}
              {kategoriFilter.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={false}
                    onCheckedChange={() =>
                      kategoriColumn?.setFilterValue(undefined)
                    }>
                    Clear filters
                  </DropdownMenuCheckboxItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter SubKategori */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='rounded-sm h-9 p-3'>
                SubKategori ({subKategoriFilter.length})
                <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='w-56'>
              {subCategories.map((value, index) => (
                <DropdownMenuCheckboxItem
                  key={index}
                  checked={(
                    (table
                      .getColumn('subKategori')
                      ?.getFilterValue() as string[]) || []
                  ).includes(value as string)}
                  onCheckedChange={() =>
                    toggleFilter('subKategori', value as string)
                  }>
                  {value as string}
                </DropdownMenuCheckboxItem>
              ))}
              {subKategoriFilter.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={false}
                    onCheckedChange={() =>
                      subKategoriColumn?.setFilterValue(undefined)
                    }>
                    Clear filters
                  </DropdownMenuCheckboxItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter Produk */}
          <Input
            placeholder='Cari produk...'
            value={
              (table.getColumn('produk')?.getFilterValue() as string) || ''
            }
            onChange={(e) =>
              table.getColumn('produk')?.setFilterValue(e.target.value)
            }
            className='max-w-xs'
          />
        </div>
        <div className=''>
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
                <TableRow key={row.id}>
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
