'use client'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import { clientEnv } from '@/lib/client'
import { serverEnv } from '@/lib/server'
import { useEffect } from 'react'
type gambarProyekProp = {
  id: number
  url: string
  portfolioProyekId: number
}
type imageProps = gambarProyekProp
export default function CollectionGallery({ images }: any) {
  const imageUrls = images?.map((image: gambarProyekProp) => image.url)
  return (
    <>
      <PhotoProvider>
        <div className='grid grid-cols-10 md:grid-cols-10 h-full gap-4'>
          {images?.map((image: gambarProyekProp, index: number) => (
            <PhotoView
              key={image.id}
              src={`${clientEnv.IMAGE_URL}/${image.url}`}>
              <div
                className={`${
                  index === 0
                    ? 'col-span-6 md:col-span-6'
                    : index === 1
                      ? 'col-span-4 full md:col-span-4'
                      : index === 2
                        ? 'col-span-5 md:col-span-5'
                        : index === 3
                          ? 'col-span-5 md:col-span-5'
                          : index === 4
                            ? 'col-span-4 md:col-span-4'
                            : 'col-span-6 md:col-span-6'
                }`}>
                <div className={`h-full w-full ring-2 ring-primary-accent`}>
                  <Image
                    src={`${clientEnv.IMAGE_URL}/${imageUrls.join('')}`}
                    alt='Project'
                    className='w-full h-full object-cover'
                    width={500}
                    height={500}
                  />
                </div>
              </div>
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>
    </>
  )
}
