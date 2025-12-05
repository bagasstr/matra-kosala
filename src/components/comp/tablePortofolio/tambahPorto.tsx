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
import FormPorto from './formPorto'
import { useRouter } from 'next/navigation'
import { clientEnv } from '@/lib/client'

export default function TambahPorto() {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  async function handleTambahPorto(formData: FormData) {
    try {
      setIsLoading(true)

      const res = await fetch(`${clientEnv.API_URL}/portfolio`, {
        method: 'POST',
        body: formData, // Send FormData directly
      })

      if (!res.ok) {
        throw new Error('Gagal menambahkan portofolio')
      }

      await res.json()

      toast.success('Portofolio berhasil ditambahkan')
      setOpen(false)
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } catch (error) {
      toast.error('Gagal menambahkan portofolio')
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
            Tambah portofolio
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[600px] max-h-[90%] overflow-y-scroll'>
          <DialogHeader>
            <DialogTitle>Tambah Portofolio</DialogTitle>
          </DialogHeader>
          <FormPorto onSubmit={handleTambahPorto} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
