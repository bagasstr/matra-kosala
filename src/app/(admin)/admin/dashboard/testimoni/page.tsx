'use client'
import { columnsTesti } from '@/components/comp/tableTestimoni/columnTesti'
import TestiTable from '@/components/comp/tableTestimoni/testiTable'
import { Button } from '@/components/ui/button'
import { clientEnv } from '@/lib/client'
import { cn } from '@/lib/utils'
import type { ITestimoniTable } from '@/types/type'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

const fetchTesti = async ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number
  pageSize: number
}): Promise<ITestimoniTable[]> => {
  const res = await fetch(
    `${clientEnv.API_URL}/testimoni?page=${pageIndex + 1}&limit=${pageSize}`,
    {
      method: 'GET',
      cache: 'no-cache',
    }
  )
  if (!res.ok) {
    const data = await res.json()
    // Pastikan tetap mengembalikan array kosong jika tidak ada data.
    if (res.status === 404) {
      return []
    }
    throw new Error(data?.message || 'Gagal mengambil data produk')
  }

  return await res.json()
}

const Testimoni = () => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })
  const { data = [], isLoading } = useQuery({
    queryKey: ['testimoni', pagination.pageIndex, pagination.pageSize],
    queryFn: () =>
      fetchTesti({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      }),
    placeholderData: keepPreviousData,
  })

  return (
    <TestiTable
      columns={columnsTesti}
      data={data}
      isLoading={isLoading}
      pagination={pagination}
      setPagination={setPagination}
    />
  )
}
export default Testimoni
