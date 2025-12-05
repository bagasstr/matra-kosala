'use client'
import { ChevronDown } from 'lucide-react'
import { Button } from '../../ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { Input } from '../../ui/input'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import React, { useMemo, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table'
import ExportVendorButton from './exportVendorButton'
import { DeleteButtonMultiple } from './deleteButton'
import { toast } from 'sonner'
import { DataTableProps } from '@/types/type'
import { Skeleton } from '@/components/ui/skeleton'

interface Produk {
  id: number
  namaProduk: string
  kategori: string
}

interface Perusahaan {
  id: number
  namaPerusahaan: string
  pic: string
  whatsapp: string
  createdAt: string
  produk: Produk[]
}
interface DataVendor {
  id: number
  perusahaan: string
  pic: string
  whatsapp: string
  tanggal: string
  produk: string
  kategori: string
}

export function VendorTable<TData, TValue>({
  data,
  columns,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  if (!data) {
    toast.error(data.message)
  }
  const VendorProduk = useMemo(() => {
    if (!data.data) return []

    return data?.data.flatMap((perusahaan: Perusahaan): DataVendor[] =>
      perusahaan.produk?.flatMap(
        (produk: Produk): DataVendor => ({
          id: produk.id,
          perusahaan: perusahaan.namaPerusahaan,
          pic: perusahaan.pic,
          whatsapp: perusahaan.whatsapp,
          tanggal: perusahaan.createdAt,
          produk: produk.namaProduk,
          kategori: produk.kategori,
        })
      )
    )
  }, [data])

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      VendorProduk?.map((item: { kategori: string }) => item?.kategori).filter(
        Boolean
      )
    )
    return Array.from(uniqueCategories)
  }, [VendorProduk])

  const table = useReactTable({
    data: VendorProduk,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  const kategoriColumn = table.getColumn('kategori')
  const kategoriFilter: string[] =
    (kategoriColumn?.getFilterValue() as string[]) || []

  const toggleCategory = (category: string) => {
    if (!kategoriColumn) return

    const currentFilters = (kategoriColumn.getFilterValue() as string[]) || []
    const newFilters = currentFilters.includes(category)
      ? currentFilters.filter((c) => c !== category)
      : [...currentFilters, category]

    kategoriColumn.setFilterValue(newFilters.length ? newFilters : undefined)
  }

  const produkFilter = table.getColumn('produk')
  const produkFilterValue: string =
    (produkFilter?.getFilterValue() as string) ?? ''

  return (
    <div className='w-full'>
      <h1 className='text-xl font-semibold mb-4'>Data Vendor</h1>
      <div className='flex items-center justify-between py-4'>
        <div className='flex gap-x-4 items-center'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='rounded-sm h-9 p-3'>
                Categories ({kategoriFilter.length})
                <ChevronDown className='ml-2 h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='w-56'>
              {categories.map((value, index: number) => (
                <DropdownMenuCheckboxItem
                  key={index}
                  checked={kategoriFilter.includes(value as string)}
                  onCheckedChange={() => toggleCategory(value as string)}>
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
          <Input
            placeholder='Filter produk...'
            value={produkFilterValue}
            onChange={(event) =>
              produkFilter?.setFilterValue(event.target.value)
            }
            className='max-w-48'
          />
        </div>
        <div className='flex'>
          {table.getFilteredSelectedRowModel().rows.length > 1 && (
            <DeleteButtonMultiple
              selectedIds={table
                .getFilteredSelectedRowModel()
                .rows.map((row: any) => row.original.id)}
              onDeleteComplete={table.resetRowSelection}
            />
          )}
          <ExportVendorButton
            select={table.getFilteredSelectedRowModel().rows}
            id={table
              .getFilteredSelectedRowModel()
              .rows.map((row: any) => row.original.id)}
          />
        </div>
      </div>

      <div className='rounded-md border'>
        <Table className='w-full'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {!header.isPlaceholder && (
                      <div className='flex items-center justify-center'>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
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
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  Tidak ada data vendor
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <div className='flex items-center justify-center'>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
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
