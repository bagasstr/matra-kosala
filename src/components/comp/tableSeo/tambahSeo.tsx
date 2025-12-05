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
import { Button } from '@/components/ui/button'
import FormTambahSeo, { type TFormSchema } from './formTambahSeo'

const TambahSeo = () => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)

  async function handleTambahSeo(formData: TFormSchema) {
    try {
      setLoading(true)

      const res = await fetch(`${clientEnv.API_URL}/seo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send FormData directly
      })
      if (!res.ok) {
        throw new Error('Gagal menambahkan SEO')
      }
      await res.json()
      toast.success('SEO berhasil ditambahkan')
      setOpen(false)
      setTimeout(() => {
        window.location.reload()
      }, 500)
      setLoading(false)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Gagal menambahkan SEO'
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
            <span>Tambah Seo</span>
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[600px] max-h-[90%] overflow-y-scroll'>
          <DialogHeader>
            <DialogTitle>Tambah Seo</DialogTitle>
          </DialogHeader>
          <FormTambahSeo onSubmit={handleTambahSeo} />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TambahSeo
