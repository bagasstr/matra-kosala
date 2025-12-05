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
import { LoaderCircle, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import FormEditPorto from './formEditPorto'
import { useRouter } from 'next/navigation'
import { clientEnv } from '@/lib/client'
import { atom, useAtom } from 'jotai'
import { editablePorto } from '@/hooks/jotaiHooks'

export default function EditPorto({ rowId }: { rowId: number }) {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [editable, setEditable] = useAtom(editablePorto)
  const router = useRouter()
  const checkPorto = async () => {
    try {
      const res = await fetch(`${clientEnv.API_URL}/portfolio/${rowId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) {
        if (res.status === 404) {
          toast.error('Data portfolio tidak ada')
        } else {
          toast.error('Terjadi kesalahan')
        }
      }

      const data = await res.json()

      setEditable(data)
    } catch (error) {}
  }
  useEffect(() => {
    checkPorto()
  }, [])
  async function handleTambahPorto(formData: FormData) {
    try {
      setIsLoading(true)

      const res = await fetch(`${clientEnv.API_URL}/portfolio/${rowId}`, {
        method: 'PUT',
        body: formData, // Send FormData directly
      })

      if (!res.ok) {
        throw new Error('Gagal edit portofolio')
      }

      await res.json()
      toast.success('Portofolio berhasil diedit')
      setOpen(false)
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } catch (error) {
      toast.error('Gagal edit portofolio')
    } finally {
      setIsLoading(false)
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
            Edit portofolio
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[600px] max-h-[90%] overflow-y-scroll'>
          <DialogHeader>
            <DialogTitle>Edit Portofolio</DialogTitle>
          </DialogHeader>
          <FormEditPorto onSubmit={handleTambahPorto} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
