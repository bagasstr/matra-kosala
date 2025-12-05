'use client'

import { useState } from 'react'
import DOMPurify from 'dompurify'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { X } from 'lucide-react'
import Image from 'next/image'
import Tiptap from '@/components/Tiptap'

const TipeBangunanEnum = z.enum([
  'Gedung Hunian',
  'Gedung Kesehatan',
  'Perkantoran dan Gudang',
  'Gedung Pendidikan',
])

export const FormSchema = z.object({
  title: z.string().min(1, 'Title harus diisi'),
  category: z.string().min(1, 'Kategory harus diisi'),
  content: z.string({ required_error: 'Content tidak boleh kosong' }),
  author: z.string().nullable(),
  refrensi: z.string().nullable(),
  thumbnail: z
    .custom<File>()
    .refine(
      (file) =>
        file instanceof File && ['image/jpeg', 'image/png'].includes(file.type),
      {
        message: 'File harus berupa gambar dengan format jpg, jpeg, atau png',
      }
    )
    .nullable(),
})

export type TFormSchemaArtikel = z.infer<typeof FormSchema>

const FormArtikel = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      refrensi: null,
      category: '',
      content: '',
      author: null,
      thumbnail: null,
    },
  })

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldname: 'thumbnail' | 'gambar'
  ) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter((file) =>
      ['image/jpeg', 'image/png'].includes(file.type)
    )
    if (fieldname === 'thumbnail') {
      const file = validFiles[0] || null
      form.setValue('thumbnail', file)
      setThumbnailPreview(file ? URL.createObjectURL(file) : null)
    }
  }
  const removeImage = (index: number, fieldname: 'thumbnail' | 'gambar') => {
    if (fieldname === 'thumbnail') {
      form.setValue('thumbnail', null)
      setThumbnailPreview(null)
    }
  }

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'thumbnail' && key !== 'content') {
        formData.append(key, value ? value.toString() : '')
      }
    })
    const sanitizedContent = DOMPurify.sanitize(data.content, {
      ALLOWED_TAGS: [
        'h1',
        'h2',
        'h3',
        'p',
        'strong',
        'br',
        'em',
        'mark',
        'ul',
        'ol',
        'li',
      ],
      ALLOWED_ATTR: ['class'],
    })
    formData.append('content', sanitizedContent)
    if (data.thumbnail) {
      formData.append('thumbnail', data.thumbnail)
    }

    onSubmit(formData)
  }

  return (
    <div className=''>
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='space-y-4'>
            <FormField
              name='title'
              control={form.control}
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
              name='refrensi'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Refrensi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Refrensi artikel'
                      {...field}
                      value={(field.value as string) ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Controller
              name='category'
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className='w-[180px]'>
                    <SelectValue placeholder='Kategori' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Matra_Kosala'>Matra Kosala</SelectItem>
                    <SelectItem value='seputar_konstruksi'>
                      Seputar Konstruksi
                    </SelectItem>
                    <SelectItem value='tips_dan_pedoman'>
                      Tips & Pedoman
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <Tiptap control={form.control} name={'content'} />

            <FormField
              control={form.control}
              name='thumbnail'
              render={() => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        type='file'
                        accept='image/jpeg,image/png'
                        onChange={(e) => handleImageUpload(e, 'thumbnail')}
                      />
                      {thumbnailPreview && (
                        <div className='mt-4 relative w-fit'>
                          <div className='w-fit '>
                            <Image
                              width={100}
                              height={100}
                              src={thumbnailPreview}
                              alt='Thumbnail Preview'
                              className='rounded-md'
                            />
                          </div>
                          <button
                            type='button'
                            onClick={() => removeImage(0, 'thumbnail')}
                            className='absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600'>
                            <X className='h-4 w-4' />
                          </button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full'>
              Tambah
            </Button>
          </form>
        </Form>
      </FormProvider>
    </div>
  )
}
export default FormArtikel
