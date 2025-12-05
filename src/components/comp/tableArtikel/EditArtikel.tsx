'use client'
import type { DataEntity } from '@/app/(admin)/admin/dashboard/artikel/artikel'
import { DisplayDetailContentArtikel } from '@/components/DisplayContent'
import Tiptap from '@/components/Tiptap'
import { Button } from '@/components/ui/button'
import DOMPurify from 'dompurify'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { editedArtikel } from '@/hooks/jotaiHooks'
import { clientEnv } from '@/lib/client'
import { serverEnv } from '@/lib/server'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type TDataArtikel = {
  artikel: DataEntity
}
const editSchema = z.object({
  title: z.string().optional(),
  content: z.string(),
  thumbnail: z
    .custom<File | null>()
    .refine(
      (file) =>
        file instanceof File && ['image/jpeg', 'image/png'].includes(file.type),
      {
        message: 'File harus berupa gambar dengan format jpg, jpeg, atau png',
      }
    )
    .nullable(),
})

type TEditSchema = z.infer<typeof editSchema>
const partialSchema = editSchema.partial()
interface EditArtikelProps {
  artikels: TDataArtikel | undefined
  isLoading: boolean
  onSubmit: (data: FormData) => void
}
const EditArtikel = memo(
  ({ artikels, isLoading, onSubmit }: EditArtikelProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const [isEdit, setEdit] = useAtom(editedArtikel)
    const [fileName, setFileName] = useState('')
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
      null
    )
    const form = useForm<TEditSchema>({
      resolver: zodResolver(partialSchema),
      mode: 'onChange',
      defaultValues: {
        title: artikels?.artikel?.title || '',
        content: artikels?.artikel?.content || '',
        thumbnail: null,
      },
    })

    useEffect(() => {
      if (artikels?.artikel) {
        form.setValue('title', artikels.artikel.title)
        form.setValue('content', artikels.artikel.content)
        const imageUrl = `${clientEnv.IMAGE_URL}/${artikels.artikel.thumbnail}`
        setThumbnailPreview(
          `${clientEnv.IMAGE_URL}/${artikels.artikel.thumbnail}`
        )

        setFileName(artikels.artikel.thumbnail.replace(/upload[/]image[/]/, ''))
      }
    }, [artikels, form])

    const handleImageUpload = (
      e: React.ChangeEvent<HTMLInputElement>,
      fieldname: 'thumbnail'
    ) => {
      const files = Array.from(e.target.files || [])
      const validFiles = files.filter((file) =>
        ['image/jpeg', 'image/png'].includes(file.type)
      )
      if (fieldname === 'thumbnail') {
        const file = validFiles[0] || null
        setFileName(file.name)
        form.setValue('thumbnail', file)
        setThumbnailPreview(file ? URL.createObjectURL(file) : null)
      }
    }
    const handleSubmit = async (data: TEditSchema) => {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'thumbnail' && key !== 'content') {
          formData.append(key, value ? value.toString() : '')
        }
      })
      const sanitizedContent = DOMPurify.sanitize(
        typeof data?.content === 'string' && data.content ? data.content : '',
        {
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
        }
      )
      formData.append('content', sanitizedContent)
      if (data.thumbnail) {
        data.thumbnail && formData.append('thumbnail', data.thumbnail)
      }
      onSubmit(formData)
    }

    return (
      <>
        <Form {...form}>
          <form id='id-form' onSubmit={form.handleSubmit(handleSubmit)}>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  variant='outline'
                  className='rounded px-3 w-11/12 mx-auto text-sm'>
                  Detail Artikel
                </Button>
              </DialogTrigger>
              <DialogContent
                className='max-w-2xl'
                aria-describedby='detail-vendor'>
                <DialogHeader className='flex-row items-center justify-between'>
                  <DialogTitle className='text-xl font-semibold'>
                    Detail Artikel
                  </DialogTitle>
                  <DialogTitle>
                    {isEdit ? (
                      <div className='space-x-2'>
                        <Button
                          type='submit'
                          form='id-form'
                          className={cn('rounded')}>
                          Simpan
                        </Button>
                        <Button
                          type='button'
                          className={cn('rounded')}
                          onClick={() => setEdit(false)}>
                          Batal
                        </Button>
                      </div>
                    ) : (
                      <Button
                        type='button'
                        className={cn('rounded')}
                        onClick={() => setEdit(true)}>
                        Edit
                      </Button>
                    )}
                  </DialogTitle>
                </DialogHeader>
                <Separator />
                {isLoading ? (
                  <div className='flex items-center justify-center py-8'>
                    <Loader2 className='h-8 w-8 animate-spin text-gray-500' />
                  </div>
                ) : (
                  artikels?.artikel && (
                    <div className='space-y-4'>
                      <div className='grid gap-4'>
                        <div className='h-[200px]'>
                          {isEdit ? (
                            <FormField
                              name='thumbnail'
                              control={form.control}
                              render={() => (
                                <FormItem>
                                  <FormControl>
                                    <div className='relative mx-auto flex items-center justify-center'>
                                      {thumbnailPreview && (
                                        <div className='relative aspect-video w-3/6 mx-auto'>
                                          <Image
                                            src={thumbnailPreview}
                                            alt={thumbnailPreview}
                                            fill
                                            quality={100}
                                            className='object-cover rounded brightness-75'
                                          />
                                        </div>
                                      )}
                                      <div className='absolute right-0 left-0 top-0 bottom-0'>
                                        <Label
                                          htmlFor='inputFile'
                                          className='aspect-video mx-auto w-3/6 flex items-center justify-center rounded border border-input bg-transparent hover:cursor-pointer'>
                                          {thumbnailPreview ? (
                                            <div className='text-sm bg-primary-accent/10 w-1/2 font-medium rounded tracking-wide mx-auto text-center backdrop-blur-[2px] text-primary-accent'>
                                              {fileName}
                                            </div>
                                          ) : (
                                            <>Pilih File</>
                                          )}
                                        </Label>
                                        <Input
                                          className='file:hidden hidden'
                                          id='inputFile'
                                          type='file'
                                          accept='image/jpeg, image/png'
                                          onChange={(e) =>
                                            handleImageUpload(e, 'thumbnail')
                                          }
                                        />
                                      </div>
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          ) : (
                            <div className='relative aspect-video w-3/6 mx-auto'>
                              <Image
                                src={`${clientEnv.IMAGE_URL}/${artikels?.artikel.thumbnail}`}
                                alt={artikels?.artikel.title as string}
                                fill
                                quality={100}
                                className='object-cover'
                              />
                            </div>
                          )}
                        </div>
                        <Separator className='py-[1px]' />
                        <div className='space-y-1'>
                          {artikels.artikel.updatedAt ? (
                            <h5 className='text-sm font-medium opacity-90'>
                              Diedit:{' '}
                              <span className='underline underline-offset-4'>
                                {dayjs(artikels?.artikel.updatedAt).format(
                                  'DD MMM YYYY'
                                )}
                              </span>
                            </h5>
                          ) : (
                            <h5 className='text-sm font-medium opacity-90'>
                              Diposting:{' '}
                              <span className='underline underline-offset-4'>
                                {dayjs(artikels?.artikel.createdAt).format(
                                  'DD MMM YYYY'
                                )}
                              </span>
                            </h5>
                          )}
                          <h5 className='font-medium text-sm opacity-90'>
                            Dibuat oleh:{' '}
                            <span className='underline underline-offset-4 uppercase'>
                              {artikels?.artikel.author}
                            </span>
                          </h5>
                        </div>
                        <div>
                          {isEdit ? (
                            <FormField
                              name='title'
                              control={form.control}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input type='text' {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : (
                            <h1 className='text-xl capitalize font-bold opacity-80'>
                              {artikels?.artikel.title}
                            </h1>
                          )}
                        </div>
                      </div>
                      <ScrollArea className='h-[200px] w-full rounded-sm border p-2'>
                        {isEdit ? (
                          <>
                            <Tiptap control={form.control} name={'content'} />
                          </>
                        ) : (
                          <>
                            <DisplayDetailContentArtikel
                              htmlContent={artikels?.artikel?.content}
                            />
                          </>
                        )}
                      </ScrollArea>
                      <div className='flex justify-end mt-4'></div>
                    </div>
                  )
                )}
              </DialogContent>
            </Dialog>
          </form>
        </Form>
      </>
    )
  }
)

export default EditArtikel
