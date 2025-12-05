import { useAtomValue } from 'jotai'
import { categoryAtomArtikel, pageArtikel } from './jotaiHooks'
import { clientEnv } from '@/lib/client'
import useSWRInfinite from 'swr/infinite'
import type { IArtikel } from '@/types/type'
import debounce from 'debounce'
import { serverEnv } from '@/lib/server'

export const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message)
  }
  return response.json()
}
export const fetchArtikel = () => {
  const activeCategory = useAtomValue(categoryAtomArtikel)
  const activePage = useAtomValue(pageArtikel)
  const getKey = (
    pageIndex: number,
    previousPageData: { data: IArtikel[] }
  ) => {
    if (previousPageData && !previousPageData.data.length) return null
    const baseUrl = `${clientEnv.API_URL}/artikel?`
    const params = new URLSearchParams()
    activeCategory && params.set('category', activeCategory)
    params.set('page', activePage.toString())
    params.set('page', (pageIndex + 1).toString())
    params.set('limit', '6')
    return `${baseUrl}${params.toString()}`
  }

  const { data, size, setSize, isValidating, error } = useSWRInfinite<{
    data: IArtikel
    totalPage: number
  }>(getKey, fetcher)

  const artikel = data ? data.flatMap((page) => page.data) : []
  const hashMore = data ? size < data[0]?.totalPage : true
  const debouncedLoadMore = debounce(() => {
    setSize(size + 1)
  }, 900)
  return {
    artikel,
    debouncedLoadMore,
    hashMore,
    size,
    setSize,
    isLoading: isValidating && size === 0,
    isFetching: isValidating,
    error,
  }
}
