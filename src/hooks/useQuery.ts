'use client'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useFetch(endpoint: string) {
   return useQuery({
      queryKey: ['vendor'],
      queryFn: async () => {
         const res = await fetch(endpoint, {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
            },
         })
         if (!res.ok) {
            if (res.status === 404) {
               toast.error('Tidak ada data')
            }
         }
         const data = await res.json()
         return data || []
      },
      initialData: [],
      enabled: true,
      refetchInterval: 30 * 1000,
      refetchIntervalInBackground: false,
   })
}
