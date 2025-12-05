'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { useAtomValue } from 'jotai'
import { z } from 'zod'
import { X } from 'lucide-react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { editableSeo } from '@/hooks/jotaiHooks'
import { get } from 'http'

const TipeBangunanOptions = [
  { value: 'gedung-hunian', label: 'Gedung Hunian' },
  { value: 'gedung-kesehatan', label: 'Gedung Kesehatan' },
  { value: 'perkantoran-dan-gudang', label: 'Perkantoran dan Gudang' },
  { value: 'gedung-pendidikan', label: 'Gedung Pendidikan' },
]

const FormSchema = z.object({
  title: z.string().min(1, 'Judul halaman harus diisi'),
  description: z.string().min(1, 'Deskripsi halaman harus diisi'),
  keywords: z.array(z.string()).min(1, 'Kata kunci harus diisi'),
})

export type FormSchemaType = z.infer<typeof FormSchema>

interface IFormEditSeo {
  onSubmit: (data: FormSchemaType) => Promise<void>
}

const FormEditSeo: React.FC<IFormEditSeo> = ({ onSubmit }) => {
  const editable = useAtomValue(editableSeo)
  const [keyword, setKeyword] = useState<string>('')

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: editable?.pageTitle || '',
      description: editable?.metaDescription || '',
      keywords: [],
    },
  })

  useEffect(() => {
    if (editable) {
      form.setValue('title', editable?.pageTitle),
        form.setValue('description', editable?.metaDescription),
        form.setValue('keywords', editable?.keywords)
    }
  }, [editable, form])

  const handleSubmit = (data: FormSchemaType) => {
    onSubmit(data)
  }
  const addKeywords = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.isTrusted) {
      if (keyword.trim() !== '') return
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Title' {...field} />
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
              <FormLabel>Ringkasan</FormLabel>
              <FormControl>
                <Textarea placeholder='Ringkasan' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Controller
          name='keywords'
          control={form.control}
          render={({ field }) => (
            <div>
              <div className='flex flex-wrap gap-2'>
                {field.value.map((keys) => (
                  <span
                    key={keys}
                    className='flex items-center gap-1 bg-gray-200 text-gray-800 px-2 py-1 rounded-md'>
                    {keys}
                    <button type='button' onClick={() => removeKeywords(keys)}>
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
            </div>
          )}
        />

        <Button type='submit' className='w-full'>
          Submit
        </Button>
      </form>
    </Form>
  )
}
export default FormEditSeo
