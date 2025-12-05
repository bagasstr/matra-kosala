// import { DisplayDetailContentArtikel } from '@/components/DisplayContent'

import { serverEnv } from '@/lib/server'
import { cn } from '@/lib/utils'
import type { IArtikelDetail } from '@/types/type'
import dayjs from 'dayjs'
import { ArrowLeft, ChevronLeft, Divide } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

const DisplayDetailContentArtikel = dynamic(
  () =>
    import('@/components/DisplayContent').then(
      (module) => module.DisplayDetailContentArtikel
    ),
  { ssr: false }
)

type TData = {
  artikel: IArtikelDetail
}

const fetchArtikel = async (param: string) => {
  try {
    const res = await fetch(`${serverEnv.API_URL}/artikel/${param}`)

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.message)
    }

    return await res.json()
  } catch (error) {
    console.error(error)
  }
}

const detailArtikel = async ({ params }: { params: { slug: string } }) => {
  const data = await fetchArtikel(params.slug)

  const {
    title,
    thumbnail,
    refrensi,
    slug,
    author,
    category,
    content,
    createdAt,
    id,
    seo,
  } = data.artikel as IArtikelDetail

  return (
    <>
      <section className='pt-24 md:py-10 md:pt-24'>
        <div className={cn('mx-auto px-4 lg:px-4 md:max-w-2xl lg:max-w-5xl')}>
          <div className='flex justify-center items-center lg:justify-start space-x-4 text-center mb-10'>
            <Link
              href='/artikel'
              prefetch={true}
              className={cn('bg-primary-dark p-2 text-white uppercase')}>
              <ChevronLeft className='size-9' />
            </Link>
            <h1 className='text-3xl font-bold bg-primary-light w-full p-2 mx-auto text-white uppercase lg:w-[50%] lg:mx-0'>
              Berita & Artikel
            </h1>
          </div>
          <h1 className='text-2xl lg:text-3xl md:text-2xl opacity-80 font-bold border-b-2 border-primary-light pb-4'>
            {title}
          </h1>
          <div className={cn('flex justify-between')}>
            <h1 className={cn('font-semibold opacity-80 text-sm md:text-base')}>
              Waktu Tayang
              <span className={cn('ml-2 md:ml-4 font-normal')}>
                :{' '}
                {new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(
                  new Date(createdAt)
                )}
              </span>
            </h1>
            <h1 className={cn('font-semibold opacity-80 text-sm md:text-base')}>
              Penulis{' '}
              <span className={cn('font-normal ml-2 md:ml-4')}>: {author}</span>
            </h1>
          </div>
          <div className='mt-12 '>
            <div className='relative mx-auto aspect-video size-6/7 md:size-3/4'>
              <Image
                src={`${serverEnv.IMAGE_URL}/${thumbnail}`}
                alt={title}
                fill
                className={cn('object-cover object-center')}
              />
            </div>
            <div className=' size-6/7 md:size-3/4 mb-20 mx-auto'>
              <div className='mt-4 opacity-80 bg-primary-accent p-4'>
                <DisplayDetailContentArtikel htmlContent={content} />
              </div>
              <h1 className={cn('font-semibold mt-4 opacity-80')}>
                Refrensi{' '}
                <span className={cn('font-normal ml-4')}>: {refrensi}</span>
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default detailArtikel
