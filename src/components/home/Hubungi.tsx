'use client'

import { Button } from '@/components/ui/button'
import { images, imageshubungi, textshubungi } from '@/lib/data'
import { Phone } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import {
  Swiper as CarouselSwiper,
  SwiperSlide,
  type SwiperRef,
} from 'swiper/react' // Swiper React components
import { Navigation, Pagination, Autoplay } from 'swiper/modules' // Swiper modules
import 'swiper/css' // Swiper styles
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import type { Swiper } from 'swiper/types'

export default function Hubungi() {
  const swiperRef = useRef<SwiperRef>(null)
  const [current, setCurrent] = useState(0)
  const handlePagination = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index)
      setCurrent(index)
    }
  }
  return (
    <div className='py-12'>
      <div className='container w-full mx-auto md:max-w-2xl lg:max-w-5xl px-4'>
        <div className='flex flex-col lg:flex-row gap-10 md:gap-0'>
          <div className='block md:hidden '>
            <h1 className='text-3xl font-bold text-center uppercase '>
              MULAI PROYEK ANDA
            </h1>
          </div>
          {/* Gambar */}
          <div className='md:w-10/12 lg:w-1/2'>
            <div className='space-y-4 md:w-full'>
              <div className='w-full'>
                <div className='space-y-4'>
                  <div className='bg-primary-content block md:hidden'>
                    <h2 className='text-center text-sm font-bold p-4 text-white'>
                      {textshubungi[current].title}
                    </h2>
                  </div>
                  <div className='w-full md:h-full'>
                    <CarouselSwiper
                      ref={swiperRef}
                      onSlideChange={(swipers: Swiper) => {
                        setCurrent(swipers.activeIndex)
                      }}
                      modules={[Navigation, Pagination, Autoplay]}
                      spaceBetween={10}
                      slidesPerView={1}
                      //  navigation
                      pagination={{
                        type: 'custom',
                        clickable: true,
                      }}
                      autoplay={{
                        delay: 3000,
                      }}>
                      {images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <div className='relative aspect-[3/2] md:aspect-[4/3]'>
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className='object-fill'
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </CarouselSwiper>
                  </div>
                  <div className='justify-center space-x-2 flex md:hidden'>
                    {imageshubungi.map((_, index) => (
                      <button
                        key={index}
                        className={cn(
                          'w-2 h-2 rounded-full transition-all duration-300 focus:outline-none',
                          current === index
                            ? 'bg-primary-dark'
                            : 'bg-gray-300 hover:bg-gray-400'
                        )}
                        onClick={() => handlePagination(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* Teks yang Bergerak Bersama Carousel */}
              <div className='space-y-4 w-full hidden md:block'>
                <div className='flex items-center justify-between bg-primary-content text-xl font-bold w-full p-4 text-white'>
                  <h2 className='text-center w-full'>
                    {textshubungi[current].title}
                  </h2>
                </div>
                {/* Navigasi Dots */}
                <div className='justify-center space-x-2 hidden md:flex'>
                  {imageshubungi.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        'w-2 h-2 rounded-full  transition-all duration-300 focus:outline-none',
                        current === index
                          ? 'bg-primary-dark'
                          : 'bg-gray-300 hover:bg-gray-400'
                      )}
                      onClick={() => handlePagination(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Konten */}
          <div className='w-full flex flex-col px-0 md:px-8 gap-y-2 md:mt-8'>
            {/* Tentang Perusahaan */}
            <div>
              <div className='hidden md:block'>
                <h1 className='text-4xl font-bold text-primary-dark uppercase '>
                  MULAI PROYEK ANDA
                </h1>
              </div>
              <p className='hidden md:block md:text-base text-sm font-normal leading-relaxed my-4'>
                Mari percayakan proyek Anda. Kami berkomitmen untuk memberikan
                solusi konstruksi yang jujur, berkualitas, dan tepat waktu.
                Dengan pengalaman kami selama 15 tahun, Anda bisa yakin bahwa
                proyek Anda akan selesai dengan hasil maksimal.
              </p>
              <p className='md:text-base text-paragraph font-normal my-2'>
                Bantuan apa yang sedang Anda butuhkan? Kami siap membantu Anda,
                mulai dari desain hingga pembangunan. Mari konsultasikan dengan
                ahli kami sekarang dan dapatkan solusi terbaik !
              </p>
            </div>

            <div className='flex justify-end md:justify-start  mt-4'>
              <Button
                className='text-white bg-primary-light border hover:border-primary-light hover:bg-white hover:text-primary-light w-fit py-6 font-medium'
                asChild>
                <Link
                  href='https://wa.me/6285697093044?text=saya%20ingin%20tahu%20lebih%20detail%20mengenai%20layanan%20Matra%20Kosala.'
                  target='_blank'
                  rel='noopener noreferrer'>
                  <Phone className='h-4 w-4' />
                  Terhubung via WhatsApp
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
