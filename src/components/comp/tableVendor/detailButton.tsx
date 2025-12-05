'use client'

import { useEffect, useState } from 'react'
import { Button } from '../../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog'
import { useRouter } from 'next/navigation'
import { Separator } from '../../ui/separator'
import { ScrollArea } from '../../ui/scroll-area'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { clientEnv } from '@/lib/client'

interface Varian {
  id: number
  namaVarian: string
  spesifikasi: string
  hargaSatuan: number
  satuanProduk: string
  hargaDiskon: number
  minPembelian: number
}

interface Pengiriman {
  tipe: string
  area: string
  jadwal: string
}

interface Pajak {
  jenisPajak: string
}

interface Pembayaran {
  jenisPembayaran: string
}

interface Produk {
  id: number
  namaProduk: string
  kategori: string
  document: string
  varian: Varian[]
  pengiriman: Pengiriman
  pajak: Pajak
  pembayaran: Pembayaran
}

interface Vendor {
  namaPerusahaan: string
  pic: string
  whatsapp: string
  produk: Produk[]
}

interface DetailData {
  vendor: Vendor
}

interface DetailButtonProps {
  rowId: any
}

export default function DetailButton({ rowId }: DetailButtonProps) {
  const [detail, setDetail] = useState<DetailData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch(`${clientEnv.API_URL}/vendor/${rowId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Data tidak ada')
        }

        const data = await response.json()

        setDetail(data)
      } catch (error) {
        console.error(error)
        setError(error instanceof Error ? error.message : 'Terjadi kesalahan')
      } finally {
        setIsLoading(false)
      }
    }

    if (open) {
      fetchData()
    }
  }, [rowId, open])

  const handleClick = () => {
    if (!detail?.vendor?.produk?.[0]?.document) return
    router.push(detail.vendor.produk[0].document)
  }

  const pembayaranTypes = (type: string) => {
    switch (type) {
      case 'CBD':
        return 'Cash Before Delivery'
      case 'COD':
        return 'Cash On Delivery'
      case 'TEMPO':
        return 'Tempo'
      default:
        return 'Lainnya'
    }
  }
  const pajakTypes = (type: string) => {
    switch (type) {
      case 'INCLPPN':
        return 'Include PPN 11%'
      case 'EXCLPPN':
        return 'Exclude PPN 11%'
      case 'NONPPN':
        return 'Non-PPN'
      default:
        return
    }
  }

  const formatCurrency = (value: number) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    })
    return formatter.format(value)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='rounded-sm px-3 h-9 text-sm'>
          Detail Vendor
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl' aria-describedby='detail-vendor'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold'>
            Detail Vendor
          </DialogTitle>
        </DialogHeader>
        <Separator />

        {isLoading ? (
          <div className='flex items-center justify-center py-8'>
            <Loader2 className='h-8 w-8 animate-spin text-gray-500' />
          </div>
        ) : error ? (
          <div className='text-center py-8 text-red-500'>{error}</div>
        ) : detail?.vendor ? (
          <div className='space-y-4'>
            <div className='grid gap-4'>
              <div>
                <h3 className='text-sm text-gray-400 font-medium'>
                  Nama Perusahaan:
                </h3>
                <h4 className='text-base font-semibold opacity-80 uppercase'>
                  {detail.vendor.namaPerusahaan}
                </h4>
              </div>
              <div>
                <h3 className='text-sm text-gray-400 font-medium'>Nama PIC:</h3>
                <h4 className='text-base font-semibold opacity-80 uppercase'>
                  {detail.vendor.pic}
                </h4>
              </div>
              <div>
                <h3 className='text-sm text-gray-400 font-medium'>WhatsApp:</h3>
                <h4 className='text-base font-semibold opacity-80 uppercase'>
                  {detail.vendor.whatsapp}
                </h4>
              </div>
            </div>

            <ScrollArea className='h-[200px] w-full rounded-sm border p-4 '>
              {detail.vendor.produk.map((item) => (
                <div key={item.id} className='space-y-4'>
                  <div>
                    <h3 className='text-sm text-gray-400 font-medium'>
                      Nama material:
                    </h3>
                    <h4 className='text-sm font-semibold opacity-80'>
                      {item.namaProduk}
                    </h4>
                  </div>
                  <div>
                    <h3 className='text-sm text-gray-400 font-medium'>
                      Kategori material:
                    </h3>
                    <h4 className='text-sm font-semibold opacity-80'>
                      {item.kategori}
                    </h4>
                  </div>

                  {item.varian.map((varian) => (
                    <div className='border-l-2 border-gray-200'>
                      <Separator className='mb-4 py-[1.2px]' />
                      <div key={varian.id} className='space-y-3 pl-4'>
                        {varian.namaVarian ? (
                          <div>
                            <h3 className='text-sm text-gray-400 font-medium'>
                              Varian:
                            </h3>
                            <h4 className='text-sm font-semibold opacity-80'>
                              {varian.namaVarian}
                            </h4>
                          </div>
                        ) : (
                          ''
                        )}
                        <div>
                          <h3 className='text-sm text-gray-400 font-medium'>
                            Spesifikasi:
                          </h3>
                          <h4 className='text-sm font-semibold opacity-80'>
                            {varian.spesifikasi}
                          </h4>
                        </div>
                        <div>
                          <h3 className='text-sm text-gray-400 font-medium'>
                            Harga per material:
                          </h3>
                          <h4 className='text-sm font-semibold opacity-80'>
                            {formatCurrency(varian?.hargaSatuan)}
                          </h4>
                        </div>
                        <div>
                          <h3 className='text-sm text-gray-400 font-medium'>
                            Satuan material:
                          </h3>
                          <h4 className='text-sm font-semibold opacity-80'>
                            {varian.satuanProduk}
                          </h4>
                        </div>
                        <div>
                          <h3 className='text-sm text-gray-400 font-medium'>
                            Harga diskon:
                          </h3>
                          {varian.hargaDiskon ? (
                            <h4 className='text-sm font-semibold opacity-80'>
                              {formatCurrency(varian.hargaDiskon)}
                            </h4>
                          ) : (
                            <h4 className='text-sm font-semibold opacity-80'>
                              -
                            </h4>
                          )}
                        </div>
                        <div>
                          <h3 className='text-sm text-gray-400 font-medium'>
                            Minimal pembelian:
                          </h3>
                          <h4 className='text-sm font-semibold opacity-80'>
                            {varian.minPembelian}
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div>
                    <h3 className='text-sm text-gray-400 font-medium'>
                      Jenis pengiriman:
                    </h3>
                    <h4 className='text-sm font-semibold opacity-80'>
                      {item.pengiriman.tipe}
                    </h4>
                  </div>
                  <div>
                    <h3 className='text-sm text-gray-400 font-medium'>
                      Area pengiriman:
                    </h3>
                    <h4 className='text-sm font-semibold opacity-80'>
                      {item.pengiriman.area}
                    </h4>
                  </div>
                  <div>
                    <h3 className='text-sm text-gray-400 font-medium'>
                      Durasi pengiriman:
                    </h3>
                    <h4 className='text-sm font-semibold opacity-80'>
                      {item.pengiriman.jadwal} Hari kerja
                    </h4>
                  </div>
                  <div>
                    <h3 className='text-sm text-gray-400 font-medium'>
                      Jenis pajak:
                    </h3>
                    <h4 className='text-sm font-semibold opacity-80'>
                      {pajakTypes(item.pajak.jenisPajak)}
                    </h4>
                  </div>
                  <div>
                    <h3 className='text-sm text-gray-400 font-medium'>
                      Jenis pembayaran:
                    </h3>
                    <h4 className='text-sm font-semibold opacity-80'>
                      {pembayaranTypes(item.pembayaran.jenisPembayaran)}
                    </h4>
                  </div>
                  <Separator className='my-4' />
                </div>
              ))}
            </ScrollArea>

            <div className='flex justify-end mt-4'>
              <Button
                onClick={handleClick}
                className={cn(
                  !detail.vendor.produk?.[0]?.document
                    ? 'hover:cursor-not-allowed'
                    : 'rounded-sm px-3 h-9'
                )}
                disabled={!detail.vendor.produk?.[0]?.document}>
                Document vendor
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
