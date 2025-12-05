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
import DetailProduk from './detailPorto'
import { DeleteButtonColumn } from './deleteButton'
import type { IPortofolioTable } from '@/types/type'
import DetailPorto from './detailPorto'
import EditPorto from './editPorto'

export const columnsPorto: ColumnDef<IPortofolioTable>[] = [
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
    accessorKey: 'judul',
    header: ({ column }) => <div className='w-36 mx-auto'>Judul</div>,
    cell: ({ row }) => {
      const { judul } = row.original
      return (
        <div className='flex items-center justify-center'>
          <div className='flex items-center gap-x-4'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className='text-center'>{judul}</TooltipTrigger>
                <TooltipContent>{judul}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'klien',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='w-30 mx-auto hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Klien <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => row.getValue('klien'),
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
    accessorKey: 'tipe',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='w-24 hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Tipe <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => row.getValue('tipe'),
    filterFn: (row, columnId, filterValue) =>
      !filterValue.length || filterValue.includes(row.getValue(columnId)),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'tanggalProyek',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='w-36 hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Tanggal Proyek <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => row.getValue('tanggalProyek'),
    filterFn: (row, columnId, filterValue) =>
      !filterValue.length || filterValue.includes(row.getValue(columnId)),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'lokasi',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='hover:bg-transparent w-40'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Lokasi <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => row.getValue('lokasi'),
  },
  {
    accessorKey: 'createdAt',
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
      const date = row.getValue('createdAt') as Dayjs
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
              <DetailPorto rowId={row.original.id} />
              <DeleteButtonColumn rowId={row.original.id} />
              <EditPorto rowId={row.original.id} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
