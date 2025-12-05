'use client'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../../ui/button'
import { Checkbox } from '../../ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import DetailButton from './detailButton'
import { DeleteButtonColumn } from './deleteButton'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/id'

dayjs.locale('id')
export interface IVendor {
  id: number
  perusahaan: string
  pic: string
  whatsapp: number
  kategori: string
  produk: string[]
  tanggal: string | number
}
export const columnsVendor: ColumnDef<IVendor>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'perusahaan',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='w-full'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Perusahaan <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      return <div>{row.getValue('perusahaan')}</div>
    },
  },
  {
    accessorKey: 'pic',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        PIC <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('pic')}</div>,
  },
  {
    accessorKey: 'whatsapp',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        WhatsApp <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('whatsapp')}</div>,
  },
  {
    accessorKey: 'produk',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Produk <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('produk')}</div>,
  },
  {
    accessorKey: 'kategori',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Kategori <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('kategori')}</div>,
    filterFn: (row, columnId, filterValue) =>
      !filterValue.length || filterValue.includes(row.getValue(columnId)),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'tanggal',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Tanggal Input <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      // Get the raw date value
      const date = row.getValue('tanggal') as Dayjs
      // Format using dayjs - assuming date is ISO string
      const formattedDate = dayjs(date).format('DD/MM/YYYY')
      return <div>{formattedDate}</div>
    },
  },
  {
    id: 'actions-detail',
    enableHiding: false,
    cell: ({ row }) => <DetailButton rowId={row.original.id} />,
  },
  {
    id: 'actions-menu',
    enableHiding: false,
    cell: ({ row }) => {
      return <DeleteButtonColumn rowId={row.original.id} />
    },
  },
]
