'use client'

import { clientEnv } from '@/lib/client'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import FormTambahTesti from './formTambahTesti'
import { Button } from '@/components/ui/button'

const TambahTesti = () => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function handleTambahTesti(formData: FormData) {
    try {
      setIsLoading(true)

      const res = await fetch(`${clientEnv.API_URL}/testimoni`, {
        method: 'POST',
        body: formData, // Send FormData directly
      })
      if (!res.ok) {
        throw new Error('Gagal menambahkan testimoni')
      }
      await res.json()
      toast.success('Testimoni berhasil ditambahkan')
      setOpen(false)
      setTimeout(() => {
        window.location.reload()
      }, 500)
      setIsLoading(false)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Gagal menambahkan testimoni'
      )
    }
  }
  return (
    <div className={cn('w-full max-w-2xl mx-auto')}>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant='default'
            className='rounded-sm'
            onClick={() => setOpen(true)}>
            <Plus className='h-4 w-4 mr-2' />
            <span>Tambah testi</span>
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[600px] max-h-[90%] overflow-y-scroll'>
          <DialogHeader>
            <DialogTitle>Tambah Testimoni</DialogTitle>
          </DialogHeader>
          <FormTambahTesti onSubmit={handleTambahTesti} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TambahTesti
