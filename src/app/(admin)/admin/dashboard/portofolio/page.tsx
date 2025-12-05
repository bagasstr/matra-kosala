'use client'

import { columnsPorto } from '@/components/comp/tablePortofolio/columnsPorto'
import { PortofolioTable } from '@/components/comp/tablePortofolio/portoTable'
import { clientEnv } from '@/lib/client'
import type { IPortofolioData } from '@/types/type'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const fetchPorto = async ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number
  pageSize: number
}): Promise<IPortofolioData[]> => {
  const response = await fetch(
    `${clientEnv.API_URL}/portfolio?page=${pageIndex + 1}&limit=${pageSize}`,
    {
      cache: 'no-cache',
    }
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
export default function DataPorto() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })
  const { data = [], isLoading } = useQuery({
    queryKey: ['portofolio', pagination.pageIndex, pagination.pageSize],
    queryFn: () =>
      fetchPorto({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      }),
    placeholderData: keepPreviousData,
  })
  return (
    <PortofolioTable
      columns={columnsPorto}
      data={data}
      isLoading={isLoading}
      pagination={pagination}
      setPagination={setPagination}
    />
  )
}
