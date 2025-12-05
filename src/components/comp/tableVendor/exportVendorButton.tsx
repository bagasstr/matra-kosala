'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { clientEnv } from '@/lib/client'

interface Varian {
  id: number
  namaVarian: string
  spesifikasi: string
  hargaSatuan: number
  satuanProduk: string
  hargaDiskon: number
  minPembelian: number
  produkId: number
}

interface Pengiriman {
  id: number
  tipePengiriman: string
  area: string
  jadwal: number
  produkId: number
}

interface Pajak {
  id: number
  jenisPajak: string
  produkId: number
}

interface Pembayaran {
  id: number
  jenisPembayaran: string
  produkId: number
}

interface Produk {
  id: number
  namaProduk: string
  vendorId: number
  kategori: string
  document: string
  varian: Varian[]
  pengiriman: Pengiriman
  pajak: Pajak
  pembayaran: Pembayaran
}

interface VendorData {
  id: string
  namaPerusahaan: string
  pic: string
  whatsapp: string
  createdAt: string
  produk: Produk[]
}

interface ApiResponse {
  status: string
  vendor: VendorData
}

interface ExportButtonProps {
  id: number[]
  isMenuItem?: boolean
  select: any
}

const ExportVendorButton = ({
  id,
  isMenuItem = false,
  select,
}: ExportButtonProps) => {
  const [dataExport, setDataExport] = useState<ApiResponse[]>([])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const data = await Promise.all(
          id.map(async (id) => {
            const response = await fetch(`${clientEnv.API_URL}/vendor/${id}`)
            return await response.json()
          })
        )
        setDataExport(data)
      } catch (error) {
        toast.error('Failed to fetch data:', error as undefined)
      }
    }
    fetchData()
  }, [id])

  const handleExport = (): void => {
    if (!dataExport.length) {
      toast.error('Pilih data terlebih dahulu')
      return
    }

    const exportRows = dataExport.flatMap((item) => {
      const vendor = item.vendor
      return vendor.produk.flatMap((produk) =>
        produk.varian.map((varian) => ({
          id: varian.id,
          Perusahaan: vendor.namaPerusahaan,
          PIC: vendor.pic,
          WhatsApp: vendor.whatsapp,
          'Tanggal Input': new Date(vendor.createdAt).toLocaleDateString(
            'id-ID'
          ),
          'Nama Produk': produk.namaProduk,
          Kategori: produk.kategori,
          Dokumen: produk.document,
          'Nama Varian': varian.namaVarian,
          Spesifikasi: varian.spesifikasi,
          'Harga Satuan': varian.hargaSatuan,
          'Satuan Produk': varian.satuanProduk,
          'Harga Diskon': varian.hargaDiskon,
          'Minimum Pembelian': varian.minPembelian,
          'Tipe Pengiriman': produk.pengiriman.tipePengiriman,
          'Area Pengiriman': produk.pengiriman.area,
          'Jadwal Pengiriman (Hari)': produk.pengiriman.jadwal,
          'Jenis Pajak': produk.pajak.jenisPajak,
          'Jenis Pembayaran': produk.pembayaran.jenisPembayaran,
        }))
      )
    })

    if (!exportRows.length) {
      toast.error('No exportable rows found')
      return
    }

    const headers = Object.keys(exportRows[0]) as Array<
      keyof (typeof exportRows)[0]
    >
    const csvContent = [
      headers.join(','),
      ...exportRows.map((row) =>
        headers
          .map((header) => {
            const value = row[header]?.toString().replace(/"/g, '""') || ''
            return `"${value}"`
          })
          .join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute(
      'download',
      `vendor_data_${new Date().toISOString().split('T')[0]}.csv`
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  if (isMenuItem) {
    return <DropdownMenuItem onClick={handleExport}>Export</DropdownMenuItem>
  }

  return (
    <Button
      variant='outline'
      onClick={handleExport}
      className='ml-4 disabled:opacity-100 h-9 p-3 rounded-sm disabled:cursor-not-allowed disabled:hover:bg-transparent'
      disabled={select.length === 0}>
      <Download className='mr-2 h-4 w-4' />
      {select.length === 0
        ? 'Export'
        : select.length === 1
          ? `Export Selected (${select.length})`
          : `Export All`}
    </Button>
  )
}

export default ExportVendorButton
