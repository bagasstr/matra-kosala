'use client'

import { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { X } from 'lucide-react'
import { useAtomValue } from 'jotai'
import { editablePorto } from '@/hooks/jotaiHooks'
import type { IPortfolio, IPortfolioResponse } from '@/types/type'

const TipeBangunanEnum = z.enum([
  'Gedung Hunian',
  'Gedung Kesehatan',
  'Perkantoran dan Gudang',
  'Gedung Pendidikan',
])

export const FormSchema = z.object({
  title: z.string().min(1, 'Title harus diisi'),
  mitraKlien: z.string().min(1, 'Mitra Klien harus diisi'),
  ringkasan: z.string().min(1, 'Ringkasan harus diisi'),
  tipeBangunan: TipeBangunanEnum,
  mulaiPelaksanaan: z
    .string()
    .regex(/^\d{4}$/, 'Harus berupa tahun (format YYYY)')
    .refine((year) => parseInt(year) >= 1900, 'Tahun minimal 1900'),
  selesaiPelaksanaan: z
    .string()
    .regex(/^\d{4}$/, 'Harus berupa tahun (format YYYY)')
    .refine((year) => parseInt(year) >= 1900, 'Tahun minimal 1900'),
  lokasi: z.string().min(1, 'Lokasi harus diisi'),
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
  gambar: z
    .array(
      z.custom<File | null>(
        (file) =>
          file instanceof File &&
          ['image/jpeg', 'image/png'].includes(file.type),
        {
          message: 'File harus berupa gambar dengan format jpg, jpeg, atau png',
        }
      )
    )
    .nullable(),
})

const FormPorto = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      mitraKlien: '',
      ringkasan: '',
      tipeBangunan: 'Gedung Hunian',
      mulaiPelaksanaan: '',
      selesaiPelaksanaan: '',
      lokasi: '',
      thumbnail: null,
      gambar: null,
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
    } else {
      form.setValue('gambar', validFiles)
      const urls = validFiles.map((file) => URL.createObjectURL(file))
      setPreviewUrls([...previewUrls, ...urls])
    }
  }

  const removeImage = (index: number, fieldname: 'thumbnail' | 'gambar') => {
    if (fieldname === 'thumbnail') {
      form.setValue('thumbnail', null)
      setThumbnailPreview(null)
    } else {
      const currentImages = form.getValues('gambar')
      const updateImages = currentImages?.filter((_, i) => i !== index || null)
      form.setValue('gambar', updateImages || null)
      setPreviewUrls((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    const formData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'gambar' && key !== 'thumbnail') {
        formData.append(key, value ? value.toString() : '')
      }
    })

    if (data.thumbnail) {
      formData.append('thumbnail', data.thumbnail)
    }
    if (data.gambar && data.gambar.length) {
      data?.gambar?.forEach((file) => {
        formData.append('gambar', file as File)
      })
    }

    onSubmit(formData)
  }

  return (
    <div className=''>
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
            name='mitraKlien'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mitra Klien</FormLabel>
                <FormControl>
                  <Input placeholder='Mitra Klien' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='ringkasan'
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
          <FormField
            control={form.control}
            name='tipeBangunan'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipe Bangunan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Pilih tipe bangunan' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(TipeBangunanEnum.Values).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='mulaiPelaksanaan'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mulai Pelaksanaan</FormLabel>
                  <FormControl>
                    <Input placeholder='YYYY' {...field} maxLength={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='selesaiPelaksanaan'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selesai Pelaksanaan</FormLabel>
                  <FormControl>
                    <Input placeholder='YYYY' {...field} maxLength={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='lokasi'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lokasi</FormLabel>
                <FormControl>
                  <Input placeholder='Lokasi' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      <div className='mt-4 relative'>
                        <img
                          src={thumbnailPreview}
                          alt='Thumbnail Preview'
                          className='w-full h-32 object-cover rounded-md'
                        />
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

          <FormField
            control={form.control}
            name='gambar'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gambar</FormLabel>
                <FormControl>
                  <div className='space-y-4'>
                    <Input
                      type='file'
                      accept='image/jpeg,image/png'
                      multiple
                      onChange={(e) => handleImageUpload(e, 'gambar')}
                      className='file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90'
                    />
                    <div className='grid grid-cols-3 gap-4'>
                      {previewUrls.map((url, index) => (
                        <div key={index} className='relative'>
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className='w-full h-32 object-cover rounded-md'
                          />
                          <button
                            type='button'
                            onClick={() => removeImage(index, 'gambar')}
                            className='absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600'>
                            <X className='h-4 w-4' />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default FormPorto
