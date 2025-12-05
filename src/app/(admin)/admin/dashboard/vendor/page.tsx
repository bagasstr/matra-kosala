'use client'

import { columnsVendor } from '@/components/comp/tableVendor/columnsVendor'
import { VendorTable } from '@/components/comp/tableVendor/vendorTable'
import { LoaderCircle } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { clientEnv } from '@/lib/client'

const fetchVendor = async () => {
  const response = await fetch(`${clientEnv.API_URL}/vendor`)
  if (!response.ok) {
    const data = await response.json()
    if (response.status === 404) {
      return []
    }
    throw new Error(data?.message || 'Gagal mengambil data produk')
  }
  return response.json()
}
export default function DataVendor() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['vendor'],
    queryFn: fetchVendor,
  })

  return (
    <VendorTable columns={columnsVendor} data={data} isLoading={isLoading} />
  )
}
