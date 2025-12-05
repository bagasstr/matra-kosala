import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { clientEnv } from '@/lib/client'
import { serverEnv } from '@/lib/server'
import { cn } from '@/lib/utils'
import type { ITestimoniTable } from '@/types/type'
import type { ColumnDef } from '@tanstack/react-table'
import dayjs, { type Dayjs } from 'dayjs'
import { ArrowUpDown } from 'lucide-react'
import Image from 'next/image'

export const columnsTesti: ColumnDef<ITestimoniTable>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <div className='flex items-center justify-center'>
  //       <Checkbox
  //         checked={table.getIsAllPageRowsSelected()}
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label='Select all'
  //       />
  //     </div>
  //   ),
  //   cell: ({ row }) => (
  //     <div className='flex items-center justify-center'>
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label='Select row'
  //       />
  //     </div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'company',
    header: () => <div className={cn('flex justify-center')}>Perusahaan</div>,
    cell: ({ row }) => {
      const { image, company } = row.original
      return (
        <div className={cn('')}>
          <div className={cn('flex items-center gap-x-4')}>
            <div className={cn('relative aspect-square size-1/5')}>
              <Image
                src={`${clientEnv.IMAGE_URL}/${image}`}
                alt={company}
                fill
                className={cn('object-cover')}
              />
            </div>
            <h2 className={cn('')}>{company}</h2>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'author',
    header: () => <div className={cn('')}>Author</div>,
    cell: ({ row }) => {
      const { author } = row.original
      return <div className={cn('line-clamp-3')}>{author}</div>
    },
  },
  {
    accessorKey: 'title',
    header: () => <div className={cn('')}>Title</div>,
    cell: ({ row }) => {
      const { title } = row.original
      return <div className={cn('line-clamp-3')}>{title}</div>
    },
  },
  {
    accessorKey: 'testi',
    header: () => <div className={cn('')}>Testimoni</div>,
    cell: ({ row }) => {
      const { testi } = row.original
      return <div className={cn('line-clamp-3')}>{testi}</div>
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <div className=''>
        <Button
          variant='ghost'
          className='hover:bg-transparent'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Tanggal Input <ArrowUpDown />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      // Get the raw date value
      const date = row.getValue('createdAt') as Dayjs

      // Format using dayjs - assuming date is ISO string
      const formattedDate = dayjs(date).format('DD/MM/YYYY')
      return <div className=''>{formattedDate}</div>
    },
  },
]
