// TambahPorto.tsx
'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { clientEnv } from '@/lib/client'
import { useAtom } from 'jotai'
import { editableSeo } from '@/hooks/jotaiHooks'
import FormEditSeo, { type FormSchemaType } from './formEditSeo'

export default function EditSeo({ rowId }: { rowId: number }) {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [editable, setEditable] = useAtom(editableSeo)
  const router = useRouter()
  const checkPorto = async () => {
    try {
      const res = await fetch(`${clientEnv.API_URL}/seo/${rowId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) {
        if (res.status === 404) {
          toast.error('Data seo tidak ada')
        } else {
          toast.error('Terjadi kesalahan')
        }
      }

      const data = await res.json()

      setEditable(data.seo)
    } catch (error) {}
  }
  useEffect(() => {
    checkPorto()
  }, [])
  async function handleTambahSeo(formData: FormSchemaType) {
    try {
      setIsLoading(true)

      const res = await fetch(`${clientEnv.API_URL}/seo/${rowId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send FormData directly
      })

      if (!res.ok) {
        throw new Error('Gagal edit seo')
      }

      await res.json()
      toast.success('Seo berhasil diedit')
      setOpen(false)
      setTimeout(() => {
        window.location.reload()
      }, 500)
      setIsLoading(false)
    } catch (error) {
      toast.error('Gagal edit seo')
    }
  }

  return (
    <div className='w-full max-w-2xl mx-auto'>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant='default'
            className='rounded-sm h-9 p-3'
            onClick={() => setOpen(true)}>
            <Plus className='h-4 w-4 mr-2' />
            Edit seo
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[600px] max-h-[90%] overflow-y-scroll'>
          <DialogHeader>
            <DialogTitle>Edit Seo</DialogTitle>
          </DialogHeader>
          <FormEditSeo onSubmit={handleTambahSeo} />
          {/* <FormEditPorto onSubmit={handleTambahPorto} /> */}
        </DialogContent>
      </Dialog>
    </div>
  )
}
