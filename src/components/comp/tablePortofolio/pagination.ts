import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { IProduk } from '@/types/type'
import { clientEnv } from '@/lib/client'

export const pagination = (page: number, limit: number) => {
  const res = useQuery({
    queryKey: ['produkPagintion'],
    queryFn: async () => {
      const res = await fetch(
        `${clientEnv.API_URL}/produk?page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (!res.ok) {
        if (res.status === 404) {
          toast.error('Data produk tidak ada')
        }
      }
      const result: IProduk = await res.json()
      return result
    },
  })
}
