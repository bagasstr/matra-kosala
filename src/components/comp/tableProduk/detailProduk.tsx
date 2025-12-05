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
import { clientEnv } from '@/lib/client'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import type { NextApiResponse } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

export interface IProduct {
  id: number
  namaBarang: string
  thumbnail: string
  deskripsi: string
  hargaBarang: number
  satuan: string
  minimalPembelian: number
  kelipatanPembelian: number
  dimensiUnit: string
  berat: number
  merek: string
  kategori: string
  subKategori: string
  jumlahUnit: number
  jenisPengiriman: string
  createdAt: string
  updatedAt: string
  slug: string
  gambar?: GambarEntity[] | null
  pasokanArea?: PasokanAreaEntity[] | null
}
export interface GambarEntity {
  id: number
  url: string
  createdAt: string
  updatedAt: string
  produkMaterialId: number
}
export interface PasokanAreaEntity {
  id: number
  kota: string
  produkMaterialId: number
}

type Product = {
  product: IProduct
}

export default function DetailProduk({
  rowId,
}: {
  rowId: number
}): JSX.Element {
  const [open, setOpen] = useState<boolean>(false)
  const { data, isLoading } = useQuery({
    queryKey: ['produkDetail'],
    queryFn: async () => {
      const res = await fetch(`${clientEnv.API_URL}/produk/${rowId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) {
        if (res.status === 404) {
          toast.error('Data produk tidak ada')
        }
      }
      const result: Product | undefined = await res.json()
      return result
    },
  })
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline' className='rounded-sm px-3 h-9 text-sm'>
            Detail Produk
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-2xl' aria-describedby='detail-vendor'>
          <DialogHeader>
            <DialogTitle className='text-xl font-semibold'>
              Detail Produk
            </DialogTitle>
          </DialogHeader>
          <Separator />

          {isLoading ? (
            <div className='flex items-center justify-center py-8'>
              <Loader2 className='h-8 w-8 animate-spin text-gray-500' />
            </div>
          ) : data?.product ? (
            <div className='space-y-4'>
              <div className='grid gap-4'>
                <div>
                  <h3 className='text-sm text-gray-400 font-medium'>
                    Nama Perusahaan:
                  </h3>
                  <h4 className='text-base font-semibold opacity-80 uppercase'>
                    {data.product.namaBarang}
                  </h4>
                </div>
                <div>
                  <h3 className='text-sm text-gray-400 font-medium'>
                    Nama PIC:
                  </h3>
                  <h4 className='text-base font-semibold opacity-80 uppercase'>
                    {data.product.deskripsi}
                  </h4>
                </div>
                <div>
                  <h3 className='text-sm text-gray-400 font-medium'>
                    WhatsApp:
                  </h3>
                  <Image
                    src={`${clientEnv.API_URL}/produk/${data.product.thumbnail}`}
                    width={100}
                    height={100}
                    alt={data.product.namaBarang}
                    className='text-base font-semibold opacity-80 uppercase'
                  />
                </div>
              </div>

              <ScrollArea className='h-[200px] w-full rounded-sm border p-4'>
                {data?.product?.gambar?.map((item: GambarEntity) => (
                  <div key={item.id} className='space-y-4'>
                    <Separator className='my-4' />
                  </div>
                ))}
              </ScrollArea>

              <div className='flex justify-end mt-4'></div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
