'use client'
import { SwiperRef } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { NavigationOptions } from 'swiper/types'
import dynamic from 'next/dynamic'
import SkeletonTesti from './skeletonTesti'

const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), {
  ssr: false,
  loading: () => <SkeletonTesti />,
})
const SwiperSlide = dynamic(
  () => import('swiper/react').then((mod) => mod.SwiperSlide),
  {
    ssr: false,
  }
)
export default function SwiperComponent({
  children,
}: {
  children: React.ReactNode
}) {
  const swiperRef = useRef<any>(null)

  return (
    <>
      <div className='flex items-center'>
        <Swiper
          key={'swiper'}
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          initialSlide={2}
          breakpoints={{
            200: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              initialSlide: 2,
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              initialSlide: 2,
              slidesPerView: 2,
              spaceBetween: 50,
            },
          }}
          onSwiper={(swiper: any) => {
            swiper.slideTo(2, 0, false, true)
          }}
          pagination={{
            clickable: true,
            type: 'custom',
          }}
          autoplay={{
            delay: 3000,
          }}
          //  ref={paginationRef}
          className='mx-auto h-auto'>
          {children}
        </Swiper>
      </div>
    </>
  )
}
