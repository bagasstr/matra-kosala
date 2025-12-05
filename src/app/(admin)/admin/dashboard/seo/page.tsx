'use client'
import { columnsSeo } from '@/components/comp/tableSeo/columnsSeo'
import SeoTable from '@/components/comp/tableSeo/seoTable'
import { clientEnv } from '@/lib/client'
import { cn } from '@/lib/utils'
import type { ISeo } from '@/types/type'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

const fetchSeo = async (): Promise<ISeo[]> => {
  const res = await fetch(`${clientEnv.API_URL}/seo`, {
    method: 'GET',
  })
  if (!res.ok) {
    const error = await res.json()

    throw new Error(error.message)
  }

  return await res.json()
}
const Seo = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ['seo'],
    queryFn: fetchSeo,
    placeholderData: keepPreviousData,
  })

  return <SeoTable data={data} isLoading={isLoading} columns={columnsSeo} />
}
export default Seo
