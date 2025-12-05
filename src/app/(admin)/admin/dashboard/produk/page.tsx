'use client'

import { columnsProduk } from '@/components/comp/tableProduk/columnsProduk'
import { ProdukTable } from '@/components/comp/tableProduk/produkTable'
import { clientEnv } from '@/lib/client'
import type { IProduk } from '@/types/type'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'

const fetchProduk = async ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number
  pageSize: number
}): Promise<IProduk[]> => {
  const response = await fetch(
    `${clientEnv.API_URL}/produk?page=${pageIndex + 1}&limit=${pageSize}`
  )
  if (!response.ok) {
    const data = await response.json()
    // Pastikan tetap mengembalikan array kosong jika tidak ada data.
    if (response.status === 404) {
      return []
    }
    throw new Error(data?.message || 'Gagal mengambil data produk')
  }
  return await response.json()
}
export default function DataProduk() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })
  const { data = [], isLoading } = useQuery({
    queryKey: ['produk', pagination.pageIndex, pagination.pageSize],
    queryFn: () =>
      fetchProduk({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      }),
  })
  keepPreviousData: true

  return (
    <>
      <h1 className=''>Comming Soon</h1>
      {/* <ProdukTable
        columns={columnsProduk}
        data={data}
        isLoading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
      /> */}
    </>
  )
}
