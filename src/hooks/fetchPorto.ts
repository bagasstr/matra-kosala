import { useAtomValue } from 'jotai'
import { categoryAtom, page } from './jotaiHooks'
import useSWR from 'swr'
import type { IPortfolio, IPortfolioResponse } from '@/types/type'
import { clientEnv } from '@/lib/client'

export const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }
  return response.json()
}

interface IPorto {
  data: IPortfolio[]
  totalPage?: number
}

export const useFetchPorto = (initialData: IPortfolioResponse | null) => {
  const activeCategory = useAtomValue(categoryAtom)
  const activePage = useAtomValue(page)
  const shouldFetch = activeCategory !== 'semua' || activeCategory === 'semua'
  const constructUrl = () => {
    const baseUrl = `${clientEnv.API_URL}/portfolio`
    const params = new URLSearchParams()

    // Tambahkan parameter kategori jika tidak 'semua'
    if (activeCategory && activeCategory !== 'semua') {
      params.set('category', activeCategory)
    }

    // Tambahkan parameter halaman
    params.set('page', activePage.toString())
    params.set('limit', '6')

    return `${baseUrl}?${params.toString()}`
  }

  const { data, error } = useSWR<IPortfolioResponse | null>(
    shouldFetch ? constructUrl() : null,
    fetcher,
    { fallbackData: shouldFetch ? undefined : initialData }
  )

  return {
    data: data || initialData,
    isLoading: !data && !error,
    isError: error,
  }
}
