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
import { useRouter } from 'next/navigation'
import { clientEnv } from '@/lib/client'
import FormArtikel from './FormArtikel'

export default function TambahArtikel() {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  async function handleTambahArtikel(formData: FormData) {
    try {
      setIsLoading(true)

      const res = await fetch(`${clientEnv.API_URL}/artikel`, {
        method: 'POST',
        body: formData, // Send FormData directly
      })

      if (!res.ok) {
        const errors = await res.json()
        throw new Error(errors.message)
      }

      await res.json()
      toast.success('Artikel berhasil ditambahkan')
      setOpen(false)
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`${error.message}`)
      }
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
            className='rounded'
            onClick={() => setOpen(true)}>
            <Plus className='h-4 w-4 mr-2' />
            Tambah portofolio
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[600px] max-h-[90%] overflow-y-scroll'>
          <DialogHeader>
            <DialogTitle>Tambah Artikel</DialogTitle>
          </DialogHeader>
          <FormArtikel onSubmit={handleTambahArtikel} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
