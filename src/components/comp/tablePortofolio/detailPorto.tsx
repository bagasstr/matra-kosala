'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import type { NextApiResponse } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import type { FormSchema } from './formPorto'
import type { z } from 'zod'
import type { TPorto } from '@/types/type'
import { clientEnv } from '@/lib/client'

// type TypePorto = z.infer<typeof FormSchema>

export default function DetailPorto({ rowId }: { rowId: number }): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)
  const { data, isLoading } = useQuery({
    queryKey: ['portfolioDetail'],
    queryFn: async () => {
      const res = await fetch(`${clientEnv.API_URL}/portfolio/${rowId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) {
        if (res.status === 404) {
          toast.error('Data portfolio tidak ada')
        }
      }
      const result: TPorto | undefined = await res.json()
      return result
    },
  })

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline' className='rounded-sm px-3 h-9 text-sm'>
            Detail Portofolio
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-2xl' aria-describedby='detail-vendor'>
          <DialogHeader>
            <DialogTitle className='text-xl font-semibold'>
              Detail Portofolio
            </DialogTitle>
          </DialogHeader>
          <Separator />

          {isLoading ? (
            <div className='flex items-center justify-center py-8'>
              <Loader2 className='h-8 w-8 animate-spin text-gray-500' />
            </div>
          ) : data?.data ? (
            <div className='space-y-4'>
              <div className='grid gap-4'>
                <div className=''>
                  <h3 className=''>Thumbnail</h3>
                  <div className=''>
                    <div className='flex h-[10%]'>
                      <Image
                        src={`${clientEnv.IMAGE_URL}/${data?.data.thumbnail}`}
                        alt={data?.data.thumbnail}
                        width={50}
                        height={50}
                        objectFit='cover'
                        quality={100}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className='text-sm text-gray-400 font-medium'>
                    gambar proyek:
                  </h3>
                  <h4 className='flex gap-x-2 mt-2'>
                    {data?.data?.gambarProyek?.map((item) => (
                      <div className='flex h-[10%]'>
                        <Image
                          src={`${clientEnv.IMAGE_URL}/${item?.url}`}
                          alt={item.url}
                          width={50}
                          height={50}
                          objectFit='cover'
                          quality={100}
                        />
                      </div>
                    ))}
                  </h4>
                </div>
                <div>
                  <h3 className='text-sm text-gray-400 font-medium'>proyek:</h3>
                  <h4 className='text-sm font-medium opacity-80'>
                    {data.data.title}
                  </h4>
                </div>
                <div>
                  <h3 className='text-sm text-gray-400 font-medium'>
                    klien proyek:
                  </h3>
                  <h4 className='text-sm font-medium opacity-80'>
                    {data.data.mitraKlien}
                  </h4>
                </div>
                <div>
                  <h3 className='text-sm text-gray-400 font-medium'>
                    ringkasan:
                  </h3>
                  <h4 className='text-sm font-medium opacity-80'>
                    {data.data.ringkasan}
                  </h4>
                </div>
                <div>
                  <h3 className='text-sm text-gray-400 font-medium'>
                    tipe bangunan:
                  </h3>
                  <h4 className='text-sm font-medium opacity-80'>
                    {data.data.tipeBangunan}
                  </h4>
                </div>
                <div>
                  <h3 className='text-sm text-gray-400 font-medium'>lokasi:</h3>
                  <h4 className='text-sm font-medium opacity-80'>
                    {data.data.lokasi}
                  </h4>
                </div>
              </div>

              {/* <ScrollArea className='h-[200px] w-full rounded-sm border p-4'>
                        {data?.product?.gambar?.map((item: GambarEntity) => (
                           <div key={item.id} className='space-y-4'>
                              <Separator className='my-4' />
                           </div>
                        ))}
                     </ScrollArea> */}

              <div className='flex justify-end mt-4'></div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
