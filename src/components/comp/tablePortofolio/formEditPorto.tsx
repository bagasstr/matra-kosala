'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { useAtomValue } from 'jotai'
import { z } from 'zod'
import Image from 'next/image'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { editablePorto } from '@/hooks/jotaiHooks'
import { clientEnv } from '@/lib/client'

const TipeBangunanOptions = [
  { value: 'gedung-hunian', label: 'Gedung Hunian' },
  { value: 'gedung-kesehatan', label: 'Gedung Kesehatan' },
  { value: 'perkantoran-dan-gudang', label: 'Perkantoran dan Gudang' },
  { value: 'gedung-pendidikan', label: 'Gedung Pendidikan' },
]

const FormSchema = z.object({
  title: z.string().min(1, 'Title harus diisi'),
  mitraKlien: z.string().min(1, 'Mitra Klien harus diisi'),
  ringkasan: z.string().min(1, 'Ringkasan harus diisi'),
  tipeBangunan: z.string(),
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
    .custom<File>(
      (file) =>
        file instanceof File && ['image/jpeg', 'image/png'].includes(file.type),
      {
        message: 'File harus berupa gambar dengan format jpg, jpeg, atau png',
      }
    )
    .nullable()
    .optional(),
  removeImage: z.array(z.string()).optional(),
  gambar: z
    .array(
      z.custom<File>(
        (file) =>
          file instanceof File &&
          ['image/jpeg', 'image/png'].includes(file.type),
        {
          message: 'File harus berupa gambar dengan format jpg, jpeg, atau png',
        }
      )
    )
    .optional(),
})

type FormSchemaType = z.infer<typeof FormSchema>

interface FormEditPortoProps {
  onSubmit: (data: FormData) => Promise<void>
}

const FormEditPorto: React.FC<FormEditPortoProps> = ({ onSubmit }) => {
  const editable = useAtomValue(editablePorto)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)
  const [removeImages, setRemoveImages] = useState<number[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: editable?.data?.title || '',
      mitraKlien: editable?.data?.mitraKlien || '',
      ringkasan: editable?.data?.ringkasan || '',
      lokasi: editable?.data?.lokasi || '',
      tipeBangunan: editable?.data?.tipeBangunan || '',
      mulaiPelaksanaan: editable?.data?.mulaiPelaksanaan || '',
      selesaiPelaksanaan: editable?.data?.selesaiPelaksanaan || '',
      thumbnail: null,
    },
  })

  useEffect(() => {
    if (editable?.data) {
      form.setValue('title', editable.data.title)
      form.setValue('mitraKlien', editable.data.mitraKlien)
      form.setValue('ringkasan', editable.data.ringkasan)
      form.setValue('lokasi', editable.data.lokasi)
      form.setValue('tipeBangunan', editable.data.tipeBangunan)
      form.setValue('mulaiPelaksanaan', editable.data?.mulaiPelaksanaan || '')
      form.setValue(
        'selesaiPelaksanaan',
        editable.data?.selesaiPelaksanaan || ''
      )

      setThumbnailPreview(`${clientEnv.IMAGE_URL}/${editable?.data?.thumbnail}`)
      setPreviewUrls(
        editable.data?.gambarProyek?.map(
          (item) => `${clientEnv.IMAGE_URL}/${item?.url || ''}`
        ) || []
      )
    }
  }, [editable, form])

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: 'thumbnail' | 'gambar'
  ) => {
    const files = Array.from(e.target.files || [])
    const validFiles = files.filter((file) =>
      ['image/jpeg', 'image/png'].includes(file.type)
    )

    if (fieldName === 'thumbnail') {
      if (validFiles.length > 0) {
        const file = validFiles[0]
        setThumbnailPreview(URL.createObjectURL(file))
        form.setValue('thumbnail', file)
      }
    }

    if (fieldName === 'gambar') {
      if (validFiles.length > 0) {
        const urls = validFiles.map((file) => URL.createObjectURL(file))
        setPreviewUrls([...previewUrls, ...urls])
        form.setValue('gambar', validFiles)
      }
    }
  }
  const removeImage = (index: number) => {
    if (index >= 0 && index < previewUrls.length) {
      const idImage = editable?.data?.gambarProyek.map((id) => id.id)[index]
      const updatedUrls = [...previewUrls]

      setRemoveImages((prev) => [...prev, idImage] as number[])
      updatedUrls.splice(index, 1)
      setPreviewUrls(updatedUrls)
    }
  }

  const jsonParse = JSON.stringify(removeImages)

  const handleSubmit = (data: FormSchemaType) => {
    const formData = new FormData()

    formData.append('title', data.title)
    formData.append('mitraKlien', data.mitraKlien)
    formData.append('ringkasan', data.ringkasan)
    formData.append('tipeBangunan', data.tipeBangunan)
    formData.append('mulaiPelaksanaan', data.mulaiPelaksanaan)
    formData.append('selesaiPelaksanaan', data.selesaiPelaksanaan)
    formData.append('lokasi', data.lokasi)
    formData.append('thumbnail', data?.thumbnail as File)
    formData.append('removeImage', jsonParse)
    if (data.gambar && data.gambar.length) {
      data?.gambar?.forEach((file) => {
        formData.append('gambar', file as File)
      })
    }

    onSubmit(formData)
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Pilih tipe bangunan' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TipeBangunanOptions.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
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
                      <Image
                        src={thumbnailPreview}
                        alt='Thumbnail preview'
                        width={200}
                        height={200}
                        className='object-cover rounded-md'
                      />
                      {/* <button
                        type='button'
                        onClick={() => removeImage(0, 'thumbnail')}
                        className='absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600'>
                        <X className='h-4 w-4' />
                      </button> */}
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
          render={() => (
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
                  {previewUrls.length > 0 && (
                    <div className='grid grid-cols-3 gap-4'>
                      {previewUrls.map((url, index) => (
                        <div key={index} className='relative'>
                          <Image
                            src={`${url}` || '/placeholder.svg'}
                            width={200}
                            height={200}
                            alt={`Preview ${index + 1}`}
                            className='object-cover rounded-md'
                          />
                          <button
                            type='button'
                            onClick={() => removeImage(index)}
                            className='absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600'>
                            <X className='h-4 w-4' />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
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
  )
}
export default FormEditPorto
