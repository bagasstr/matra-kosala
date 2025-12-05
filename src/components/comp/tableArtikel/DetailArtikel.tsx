'use client'
import type { DataEntity } from '@/app/(admin)/admin/dashboard/artikel/artikel'
import { clientEnv } from '@/lib/client'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import EditArtikel from './EditArtikel'
import { useAtom } from 'jotai'
import { editedArtikel } from '@/hooks/jotaiHooks'
import { useCallback } from 'react'

type TDataArtikel = {
  artikel: DataEntity
}
export default function DetailArtikel({ slug }: { slug: string }) {
  const [_, setEdit] = useAtom(editedArtikel)
  const { data, isLoading } = useQuery({
    queryKey: ['artikelDetail', slug],
    queryFn: async () => {
      const res = await fetch(`${clientEnv.API_URL}/artikel/${slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) {
        if (res.status === 404) {
          toast.error('Data portfolio tidak ada')
        }
      }
      const result: TDataArtikel | undefined = await res.json()
      return result
    },
  })
  const handleEditSubmit = useCallback(async (formData: FormData) => {
    try {
      const res = await fetch(`${clientEnv.API_URL}/artikel/${slug}`, {
        method: 'PATCH',
        body: formData,
      })
      if (!res.ok) {
        throw new Error('Gagal edit artikel')
      }
      await res.json()
      toast.success('Artikel berhasil diedit')
      setEdit(false)
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }, [])

  return (
    <>
      <EditArtikel
        isLoading={isLoading}
        artikels={data}
        onSubmit={handleEditSubmit}
      />
    </>
  )
}
