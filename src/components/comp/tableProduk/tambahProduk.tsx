import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { LoaderCircle, Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
const formSchema = z.object({
  namaBarang: z.string({ required_error: 'Nama barang tidak boleh kosong' }),
  thumbnail: z.string().endsWith('/(\.jpg|\.png|\.jpeg)$/i', {
    message: 'Format file harus .jpg, .png, atau .jpeg',
  }),
  deskripsi: z
    .string({ required_error: 'Deskripsi tidak boleh kosong' })
    .max(120, { message: 'Maksimal 120 karakter' }),
  hargaBarang: z.number({ required_error: 'Harga barang tidak boleh kosong' }),
  satuan: z.string({ required_error: 'Satuan tidak boleh kosong' }),
  minimalPembelian: z.number({
    required_error: 'Minimal pembelian tidak boleh kosong',
  }),
  kelipatanPembelian: z.number({
    required_error: 'Kelipatan pembelian tidak boleh kosong',
  }),
  dimensiUnit: z.string({ required_error: 'Dimensi unit tidak boleh kosong' }),
  berat: z.number({
    required_error: 'Berat tidak boleh kosong',
    invalid_type_error: 'Isi dengan angka',
  }),
  merek: z.string(),
  kategori: z.string({ required_error: 'Kategori tidak boleh kosong' }),
  subKategori: z.string({ required_error: 'Sub kategori tidak boleh kosong' }),
  jumlahUnit: z.number(),
  estimasiPengiriman: z.array(
    z.object({
      area: z.string(),
      durasi: z.string(),
    })
  ),
})

export interface ITambahProdukProps {
  namaBarang: string
  thumbnail: string
  slug: string
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
  estimasiPengiriman?: EstimasiPengirimanEntity[] | null
  jenisPengiriman: string
  gambar?: GambarEntity[] | null
  pasokanArea?: PasokanAreaEntity[] | null
}
export interface EstimasiPengirimanEntity {
  area: string
  durasi: string
}
export interface GambarEntity {
  url: string
}
export interface PasokanAreaEntity {
  kota: string
}

export default function TambahProduk() {
  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <div className=''>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant='default'
            className='rounded-sm h-9 p-3'
            onClick={() => setOpen(true)}>
            <Plus className='h-4 w-4' />
            Tambah produk
          </Button>
        </DialogTrigger>
        <DialogTitle>Tambah Produk</DialogTitle>
        <DialogHeader></DialogHeader>
        <DialogContent className=''></DialogContent>
      </Dialog>
    </div>
  )
}
