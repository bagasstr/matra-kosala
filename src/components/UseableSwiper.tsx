'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react'
import { PhotoProvider, PhotoView } from 'react-photo-view'

import 'swiper/css' // Swiper styles
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'react-photo-view/dist/react-photo-view.css'

interface IUseableSwiper {
  slides: any
  alt: string
}
export default function UseableSwiper({ slides, alt }: IUseableSwiper) {
  const swiperRef = useRef<SwiperRef>(null)
  const [current, setCurrent] = useState(0)
  const handlePagination = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index)
      setCurrent(index)
    }
  }
  return (
    <>
      <PhotoProvider>
        <Swiper
          ref={swiperRef}
          onSlideChange={(swiper: any) => {
            setCurrent(swiper.activeIndex)
          }}
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={false}>
          {slides.map((slide: any, index: number) => (
            <SwiperSlide>
              <PhotoView
                key={index}
                src={`http://192.168.0.4:5000/${slide.url}`}>
                <div className='relative aspect-[1/1] my-7 border-2 border-primary-dark'>
                  <Image
                    src={`http://192.168.0.4:5000/${slide.url}`}
                    fill
                    alt={alt}
                    className='object-contain'
                  />
                </div>
              </PhotoView>
            </SwiperSlide>
          ))}
        </Swiper>
      </PhotoProvider>
      <div className='justify-center space-x-2 px-4 flex'>
        {slides.map((_: any, index: number) => (
          <button
            key={index}
            className={cn(
              'w-full h-1  transition-all duration-300 focus:outline-none',
              current === index
                ? 'bg-primary-dark'
                : 'bg-gray-300 hover:bg-gray-400'
            )}
            onClick={() => handlePagination(index)}
          />
        ))}
      </div>
    </>
  )
}
