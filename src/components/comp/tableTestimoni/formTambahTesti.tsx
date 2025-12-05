'use client'

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
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const FormSchema = z.object({
  company: z.string().min(1, 'Perusahaan harus diisi'),
  testi: z
    .string()
    .min(1, 'Testimoni harus diisi')
    .max(200, 'Maksimal 200 kata'),
  title: z.string().min(1, 'Title harus diisi'),
  author: z.string().min(1, 'Author harus diisi'),
  thumbnail: z
    .custom<File>()
    .refine(
      (file) =>
        file instanceof File && ['image/jpeg', 'image/png'].includes(file.type),
      {
        message: 'File must be a jpg, jpeg, or png',
      }
    ),
})

type TFormSchema = z.infer<typeof FormSchema>
const FormTambahTesti = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      company: '',
      title: '',
      author: '',
      testi: '',
      thumbnail: undefined,
    },
  })

  const handleThumbnailUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldname: 'thumbnail'
  ) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter((file) =>
      ['image/jpeg', 'image/png'].includes(file.type)
    )
    if (fieldname === 'thumbnail') {
      const file = validFiles[0] ?? undefined
      form.setValue('thumbnail', file)
      setThumbnailPreview(file ? URL.createObjectURL(file) : null)
    }
  }

  const handleSubmit = (data: TFormSchema) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'thumbnail') {
        formData.append(key, value ? value.toString() : '')
      }
    })

    if (data.thumbnail) {
      formData.append('thumbnail', data.thumbnail)
    }
    onSubmit(formData)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control}
            name='author'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='company'
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                  Company
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
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='testi'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Testimoni</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage>{field.value.length}/200</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='thumbnail'
            render={() => (
              <FormItem>
                <FormLabel>Profil</FormLabel>
                <FormControl>
                  <>
                    <Input
                      type='file'
                      accept='image/jpeg, image/png'
                      onChange={(e) => handleThumbnailUpload(e, 'thumbnail')}
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
                      </div>
                    )}
                  </>
                </FormControl>
                <FormMessage>
                  {form.formState.errors.thumbnail?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button type='submit'>Tambah</Button>
        </form>
      </Form>
    </div>
  )
}

export default FormTambahTesti
