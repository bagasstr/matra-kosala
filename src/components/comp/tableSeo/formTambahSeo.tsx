import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

export const FormSchema = z.object({
  title: z.string().min(1, 'Judul halaman harus diisi'),
  description: z.string().min(1, 'Deskripsi halaman harus diisi'),
  keywords: z.array(z.string()).min(1, 'Kata kunci harus diisi'),
})

export type TFormSchema = z.infer<typeof FormSchema>

const FormTambahSeo = ({
  onSubmit,
}: {
  onSubmit: (data: TFormSchema) => void
}) => {
  const [keyword, setKeyword] = useState<string>('')
  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      keywords: [],
    },
  })
  const handleSubmit = (data: TFormSchema) => {
    onSubmit(data)
  }
  const addKeywords = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.isTrusted) {
      // if (keyword.trim() !== '') return
      const currentKey = form.getValues('keywords')
      if (currentKey) {
        form.setValue('keywords', [...currentKey, keyword])
      }
    }
    setKeyword('')
  }

  const removeKeywords = (keyRemove: string) => {
    form.setValue(
      'keywords',
      form.getValues('keywords').filter((key) => key !== keyRemove)
    )
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Title
                </FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage>{field.value.length}/200</FormMessage>
              </FormItem>
            )}
          />
          <Controller
            name='keywords'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className='flex flex-wrap gap-2'>
                  {field.value.map((keys) => (
                    <span
                      key={keys}
                      className='flex items-center gap-1 bg-gray-200 text-gray-800 px-2 py-1 rounded-md'>
                      {keys}
                      <button
                        type='button'
                        onClick={() => removeKeywords(keys)}>
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <Input
                  type='text'
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addKeywords(e)}
                  placeholder='Tambah kata kunci dan tekan enter'
                  className='mt-2'
                />
                <FormMessage>
                  {form.formState.errors.keywords?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button className={cn('mt-4')} type='submit'>
            Tambah
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default FormTambahSeo
