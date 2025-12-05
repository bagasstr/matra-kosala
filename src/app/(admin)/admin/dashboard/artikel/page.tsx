'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useCallback, useMemo, useState } from 'react'
import { toast } from 'sonner'
import type { DataEntity, IArtikel } from './artikel'
import ArtikelTable from '@/components/comp/tableArtikel/ArtikelTable'
import { atom, useAtom, useAtomValue } from 'jotai'
import { categoryAtomArtikel, pageArtikel } from '@/hooks/jotaiHooks'
import { clientEnv } from '@/lib/client'

const kategori = ['matra_kosala', 'seputar_konstruksi', 'tips_dan_pedoman']

async function fetchData(endpoint: string) {
  try {
    const res = await fetch(`${clientEnv.BASE_URL}${endpoint}`, {
      method: 'GET',
      cache: 'no-cache',
    })
    if (!res.ok) {
      const data = await res.json()
      toast.error(data.message || 'Gagal mengambil data')
      if (res.status === 404) return []
    }
    return res.json()
  } catch (error) {
    throw new Error(`${error}`)
  }
}
export default function Artikel() {
  const page = useAtomValue(pageArtikel)
  const ITEMS_PER_PAGE = 8

  // Fetch data with pagination
  const { data, isLoading } = useQuery({
    queryKey: ['artikel', page],
    queryFn: () =>
      fetchData(`/api/artikel?page=${page}&limit=${ITEMS_PER_PAGE}`),
  })

  return (
    <ArtikelTable
      data={data || []}
      ITEMS_PER_PAGE={ITEMS_PER_PAGE}
      isLoading={isLoading}
      kategori={kategori}
    />
  )
}
