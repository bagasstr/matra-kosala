import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import type { ISeo } from '@/types/type'
import type { ColumnDef } from '@tanstack/react-table'
import dayjs, { type Dayjs } from 'dayjs'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import EditSeo from './editSeo'
export const columnsSeo: ColumnDef<ISeo>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className='flex items-center justify-center'>
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
    accessorKey: 'pageTitle',
    header: () => <div className={cn('flex justify-center')}>Page</div>,
    cell: ({ row }) => {
      return <div className={cn('')}>{row.getValue('pageTitle')}</div>
    },
  },
  {
    accessorKey: 'metaDescription',
    header: () => <div className={cn('')}>Description</div>,
    cell: ({ row }) => {
      return (
        <div className={cn('line-clamp-3')}>
          {row.getValue('metaDescription')}
        </div>
      )
    },
  },
  {
    accessorKey: 'keywords',
    header: () => <div className={cn('')}>keyword</div>,
    cell: ({ row }) => {
      const { keywords } = row.original
      return <div className={cn('')}>{keywords.join(' | ')}</div>
    },
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
              {/* <DetailPorto rowId={row.original.id} /> */}
              {/* <DeleteButtonColumn rowId={row.original.id} /> */}
              <EditSeo rowId={row.original.id} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
