import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import GambarProduk from './imageProduk'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import dayjs, { type Dayjs } from 'dayjs'
import DetailButton from '../tableVendor/detailButton'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import DetailProduk from './detailProduk'
import { DeleteButtonColumn } from './deleteButton'
import type { IProduk } from '@/types/type'

export const columnsProduk: ColumnDef<IProduk>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className='flex items-center justify-center w-12 mx-auto'>
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex items-center justify-center'>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'produk',
    header: ({ column }) => <div className='w-52'>Produk</div>,
    cell: ({ row }) => {
      const { thumbnail, produk } = row.original
      return (
        <div className=''>
          <div className='flex items-center gap-x-4'>
            <GambarProduk row={thumbnail} />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className='text-start'>{produk}</TooltipTrigger>
                <TooltipContent>{produk}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'harga',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='w-36 hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Harga <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const { harga } = row.original

      return (
        <div className=''>
          {harga?.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          })}
        </div>
      )
    },
  },
  // {
  //    accessorKey: 'unit',
  //    header: ({ column }) => (
  //       <Button
  //          variant='ghost'
  //          onClick={() =>
  //             column.toggleSorting(column.getIsSorted() === 'asc')
  //          }>
  //          Unit
  //       </Button>
  //    ),
  //    cell: ({ row }) => {
  //       const { unit } = row.original
  //       return (
  //          <TooltipProvider>
  //             <Tooltip>
  //                <TooltipTrigger>
  //                   <div className=''>{unit}</div>
  //                </TooltipTrigger>
  //                <TooltipContent>{unit}</TooltipContent>
  //             </Tooltip>
  //          </TooltipProvider>
  //       )
  //    },
  // },
  {
    accessorKey: 'berat',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='w-24 hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Berat <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const { berat } = row.original
      const beratInKg = berat / 1000
      return (
        <div className=''>
          {beratInKg.toLocaleString('en-US', {
            style: 'unit',
            unit: 'kilogram',
            unitDisplay: 'narrow',
          })}
        </div>
      )
    },
  },
  {
    accessorKey: 'kategori',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='w-36 hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Kategori <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => row.getValue('kategori'),
  },
  {
    accessorKey: 'subKategori',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent w-40'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Sub Kategori <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => row.getValue('subKategori'),
    filterFn: (row, columnId, filterValue) =>
      !filterValue.length || filterValue.includes(row.getValue(columnId)),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'stok',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent w-16'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Stok <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const { stok } = row.original
      return <div className=''>{stok}</div>
    },
  },
  {
    accessorKey: 'tanggal',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Tanggal Input <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      // Get the raw date value
      const date = row.getValue('tanggal') as Dayjs
      // Format using dayjs - assuming date is ISO string
      const formattedDate = dayjs(date).format('DD/MM/YYYY')
      return <div className=''>{formattedDate}</div>
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className='space-y-3 flex flex-col p-2'>
              <DetailProduk rowId={row.original.id} />
              <DeleteButtonColumn rowId={row.original.id} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
